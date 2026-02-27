from datetime import datetime

THRESHOLDS = {
    "energy_kwh":    {"warning": 5000, "danger": 5300},
    "waste_kg":      {"warning": 900,  "danger": 1050},
    "paper_sheets":  {"warning": 14000,"danger": 15500},
    "hazardous_kg":  {"warning": 200,  "danger": 250},
}

def check_alerts(energy, waste, paper):
    alerts = []
    ts = datetime.now().isoformat()

    # Energy alerts
    if energy["total_kwh"] >= THRESHOLDS["energy_kwh"]["danger"]:
        alerts.append({"type": "danger",  "category": "⚡ Energy",
            "message": f"CRITICAL: Energy at {energy['total_kwh']} kWh. Immediate action needed!", "time": ts})
    elif energy["total_kwh"] >= THRESHOLDS["energy_kwh"]["warning"]:
        alerts.append({"type": "warning", "category": "⚡ Energy",
            "message": f"High energy usage: {energy['total_kwh']} kWh. Check HVAC systems.", "time": ts})

    # Waste alerts
    if waste["hazardous_kg"] >= THRESHOLDS["hazardous_kg"]["danger"]:
        alerts.append({"type": "danger",  "category": "🏥 Waste",
            "message": f"CRITICAL: Hazardous waste at {waste['hazardous_kg']} kg!", "time": ts})
    elif waste["total_kg"] >= THRESHOLDS["waste_kg"]["warning"]:
        alerts.append({"type": "warning", "category": "🏥 Waste",
            "message": f"Waste generation high: {waste['total_kg']} kg today.", "time": ts})

    # Paper alerts
    if paper["total_sheets"] >= THRESHOLDS["paper_sheets"]["danger"]:
        alerts.append({"type": "danger",  "category": "📄 Paper",
            "message": f"CRITICAL: Paper usage at {paper['total_sheets']} sheets!", "time": ts})
    elif paper["total_sheets"] >= THRESHOLDS["paper_sheets"]["warning"]:
        alerts.append({"type": "warning", "category": "📄 Paper",
            "message": f"High paper usage: {paper['total_sheets']} sheets today.", "time": ts})

    if not alerts:
        alerts.append({"type": "success", "category": "✅ System",
            "message": "All sustainability metrics within normal range.", "time": ts})

    return alerts
