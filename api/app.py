from flask import Flask, jsonify
from flask_cors import CORS
from database.models import db
from ml.data_generator import generate_energy, generate_waste, generate_paper, generate_alerts
import os, sys

# Fix imports from backend folder
sys.path.insert(0, os.path.dirname(__file__))

app = Flask(__name__)
CORS(app)

# ── Database Config ───────────────────────────────────────
app.config["SQLALCHEMY_DATABASE_URI"]        = "sqlite:///greenhealth.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"]                     = "greenhealth-secret-2024"

# ── Init DB ───────────────────────────────────────────────
db.init_app(app)

# ── Register Blueprints ───────────────────────────────────
from routes.energy  import energy_bp
from routes.waste   import waste_bp
from routes.paper   import paper_bp
from routes.chatbot import chatbot_bp
from routes.score   import score_bp
from routes.report  import report_bp

app.register_blueprint(energy_bp,  url_prefix="/api/energy")
app.register_blueprint(waste_bp,   url_prefix="/api/waste")
app.register_blueprint(paper_bp,   url_prefix="/api/paper")
app.register_blueprint(chatbot_bp, url_prefix="/api/chat")
app.register_blueprint(score_bp,   url_prefix="/api/score")
app.register_blueprint(report_bp,  url_prefix="/api/report")

# ── Dashboard Summary Route ───────────────────────────────
@app.route("/api/dashboard", methods=["GET"])
def dashboard():
    energy = generate_energy()
    waste  = generate_waste()
    paper  = generate_paper()
    alerts = generate_alerts(energy, waste, paper)
    return jsonify({
        "energy": energy,
        "waste":  waste,
        "paper":  paper,
        "alerts": alerts
    })

# ── Health Check ──────────────────────────────────────────
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "✅ GreenHealth AI Backend Running!"})

# ── Create DB Tables ──────────────────────────────────────
with app.app_context():
    db.create_all()
    print("✅ Database ready!")
    print("✅ GreenHealth AI Backend starting...")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
