from flask import Blueprint, jsonify
from database.models import db, EnergyLog
from ml.data_generator import generate_energy, generate_weekly_trend

energy_bp = Blueprint("energy", __name__)

@energy_bp.route("/live", methods=["GET"])
def get_live_energy():
    data = generate_energy()
    log  = EnergyLog(**{k: v for k, v in data.items() if k != "timestamp"})
    db.session.add(log)
    db.session.commit()
    return jsonify(data)

@energy_bp.route("/history", methods=["GET"])
def get_energy_history():
    logs = EnergyLog.query.order_by(EnergyLog.timestamp.desc()).limit(20).all()
    return jsonify([l.to_dict() for l in logs])

@energy_bp.route("/weekly", methods=["GET"])
def get_weekly_energy():
    return jsonify(generate_weekly_trend())

@energy_bp.route("/summary", methods=["GET"])
def get_energy_summary():
    data = generate_energy()
    return jsonify({
        "total_kwh":  data["total_kwh"],
        "cost_usd":   data["cost_usd"],
        "carbon_kg":  data["carbon_kg"],
        "breakdown": {
            "hvac":      data["hvac_kwh"],
            "lighting":  data["lighting_kwh"],
            "equipment": data["equipment_kwh"]
        }
    })
