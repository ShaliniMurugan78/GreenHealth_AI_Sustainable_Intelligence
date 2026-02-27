from flask import Blueprint, jsonify
from database.models import db, SustainabilityScore
from ml.data_generator import generate_energy, generate_waste, generate_paper, generate_score, generate_department_scores

score_bp = Blueprint("score", __name__)

@score_bp.route("/live", methods=["GET"])
def get_live_score():
    energy = generate_energy()
    waste  = generate_waste()
    paper  = generate_paper()
    result = generate_score(energy, waste, paper)

    log = SustainabilityScore(
        score        = result["score"],
        grade        = result["grade"],
        energy_score = result["energy_score"],
        waste_score  = result["waste_score"],
        paper_score  = result["paper_score"]
    )
    db.session.add(log)
    db.session.commit()

    return jsonify({**result, "energy": energy, "waste": waste, "paper": paper})

@score_bp.route("/departments", methods=["GET"])
def get_department_scores():
    return jsonify(generate_department_scores())

@score_bp.route("/history", methods=["GET"])
def get_score_history():
    logs = SustainabilityScore.query.order_by(
        SustainabilityScore.timestamp.desc()).limit(30).all()
    return jsonify([l.to_dict() for l in logs])
