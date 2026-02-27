from flask import Blueprint, jsonify
from database.models import db, PaperLog
from ml.data_generator import generate_paper

paper_bp = Blueprint("paper", __name__)

@paper_bp.route("/live", methods=["GET"])
def get_live_paper():
    data = generate_paper()
    log  = PaperLog(**{k: v for k, v in data.items() if k != "timestamp"})
    db.session.add(log)
    db.session.commit()
    return jsonify(data)

@paper_bp.route("/history", methods=["GET"])
def get_paper_history():
    logs = PaperLog.query.order_by(PaperLog.timestamp.desc()).limit(20).all()
    return jsonify([l.to_dict() for l in logs])

@paper_bp.route("/summary", methods=["GET"])
def get_paper_summary():
    data = generate_paper()
    return jsonify({
        "total_sheets": data["total_sheets"],
        "cost_usd":     data["cost_usd"],
        "breakdown": {
            "admin":    data["admin_sheets"],
            "clinical": data["clinical_sheets"],
            "lab":      data["lab_sheets"]
        }
    })
