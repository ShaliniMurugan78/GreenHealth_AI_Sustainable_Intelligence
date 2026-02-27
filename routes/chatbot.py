from flask import Blueprint, jsonify, request
from groq import Groq
import os
from dotenv import load_dotenv
from ml.data_generator import generate_energy, generate_waste, generate_paper, generate_score

load_dotenv()

chatbot_bp = Blueprint("chatbot", __name__)

# ── Load from .env ────────────────────────────────────────
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL   = os.getenv("GROQ_MODEL", "llama3-8b-8192")

SYSTEM_PROMPT = """You are GreenHealth AI, an expert hospital sustainability assistant.
You analyze real-time hospital data and provide specific, actionable recommendations.
Always be concise, data-driven, and practical. Use bullet points for recommendations.
Focus on: energy efficiency, waste reduction, paper digitization, cost savings, and ESG compliance."""


@chatbot_bp.route("/ask", methods=["POST"])
def ask():
    body    = request.get_json()
    message = body.get("message", "")

    if not message:
        return jsonify({"error": "No message provided"}), 400

    # Generate live data for context
    energy = generate_energy()
    waste  = generate_waste()
    paper  = generate_paper()
    score  = generate_score(energy, waste, paper)

    context = f"""
Current Hospital Sustainability Data:
- Energy: {energy['total_kwh']} kWh | Cost: ${energy['cost_usd']} | Carbon: {energy['carbon_kg']} kg CO2
  • HVAC: {energy['hvac_kwh']} kWh | Lighting: {energy['lighting_kwh']} kWh | Equipment: {energy['equipment_kwh']} kWh
- Waste: {waste['total_kg']} kg | Hazardous: {waste['hazardous_kg']} kg | Recyclable: {waste['recyclable_kg']} kg
- Paper: {paper['total_sheets']} sheets | Cost: ${paper['cost_usd']}
- Sustainability Score: {score['score']}/100 (Grade: {score['grade']})
  • Energy Score: {score['energy_score']} | Waste Score: {score['waste_score']} | Paper Score: {score['paper_score']}

User Question: {message}
"""

    try:
        client   = Groq(api_key=GROQ_API_KEY)
        response = client.chat.completions.create(
            model       = GROQ_MODEL,
            messages    = [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user",   "content": context}
            ],
            temperature = 0.7,
            max_tokens  = 600
        )
        answer = response.choices[0].message.content
        return jsonify({
            "answer":  answer,
            "context": {
                "energy": energy,
                "waste":  waste,
                "paper":  paper,
                "score":  score
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@chatbot_bp.route("/recommend", methods=["GET"])
def auto_recommend():
    energy = generate_energy()
    waste  = generate_waste()
    paper  = generate_paper()
    score  = generate_score(energy, waste, paper)

    prompt = f"""
Hospital data: Energy={energy['total_kwh']}kWh, Waste={waste['total_kg']}kg,
Paper={paper['total_sheets']} sheets, Score={score['score']}/100.
Give exactly 3 specific, actionable recommendations to improve sustainability today.
Format as numbered list. Be direct and specific.
"""
    try:
        client   = Groq(api_key=GROQ_API_KEY)
        response = client.chat.completions.create(
            model       = GROQ_MODEL,
            messages    = [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user",   "content": prompt}
            ],
            temperature = 0.7,
            max_tokens  = 400
        )
        return jsonify({
            "recommendations": response.choices[0].message.content,
            "score":           score
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@chatbot_bp.route("/test", methods=["GET"])
def test_groq():
    """Test endpoint to verify Groq connection"""
    try:
        client   = Groq(api_key=GROQ_API_KEY)
        response = client.chat.completions.create(
            model    = GROQ_MODEL,
            messages = [{"role": "user", "content": "Say: GreenHealth AI is connected!"}],
            max_tokens = 50
        )
        return jsonify({
            "status":  "✅ Groq Connected!",
            "model":   GROQ_MODEL,
            "message": response.choices[0].message.content
        })
    except Exception as e:
        return jsonify({
            "status": "❌ Groq Connection Failed",
            "error":  str(e),
            "tip":    "Check your GROQ_API_KEY in .env file"
        }), 500
