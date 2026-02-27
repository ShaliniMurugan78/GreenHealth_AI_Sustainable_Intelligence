from flask import Blueprint, jsonify
from database.models import db, WasteLog
from ml.data_generator import generate_waste

waste_bp = Blueprint("waste", __name__)

@waste_bp.route("/live", methods=["GET"])
def get_live_waste():
    data = generate_waste()
    log  = WasteLog(**{k: v for k, v in data.items() if k != "timestamp"})
    db.session.add(log)
    db.session.commit()
    return jsonify(data)

@waste_bp.route("/history", methods=["GET"])
def get_waste_history():
    logs = WasteLog.query.order_by(WasteLog.timestamp.desc()).limit(20).all()
    return jsonify([l.to_dict() for l in logs])

@waste_bp.route("/summary", methods=["GET"])
def get_waste_summary():
    data = generate_waste()
    return jsonify({
        "total_kg":   data["total_kg"],
        "cost_usd":   data["cost_usd"],
        "breakdown": {
            "hazardous":  data["hazardous_kg"],
            "recyclable": data["recyclable_kg"],
            "general":    data["general_kg"]
        }
    })
