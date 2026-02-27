import random
from datetime import datetime

def rand(a, b):  return random.randint(a, b)
def randf(a, b): return round(random.uniform(a, b), 2)

# ── Energy ────────────────────────────────────────────────
def generate_energy():
    total = rand(3500, 5500)
    return {
        "timestamp":     datetime.now().isoformat(),
        "total_kwh":     total,
        "hvac_kwh":      int(total * 0.42),
        "lighting_kwh":  int(total * 0.28),
        "equipment_kwh": int(total * 0.30),
        "cost_usd":      round(total * 0.12, 2),
        "carbon_kg":     round(total * 0.45, 2)
    }

# ── Waste ─────────────────────────────────────────────────
def generate_waste():
    total = rand(600, 1100)
    return {
        "timestamp":     datetime.now().isoformat(),
        "total_kg":      total,
        "hazardous_kg":  int(total * 0.23),
        "recyclable_kg": int(total * 0.45),
        "general_kg":    int(total * 0.32),
        "cost_usd":      round(total * 1.8, 2)
    }

# ── Paper ─────────────────────────────────────────────────
def generate_paper():
    total = rand(9000, 16000)
    return {
        "timestamp":       datetime.now().isoformat(),
        "total_sheets":    total,
        "admin_sheets":    int(total * 0.55),
        "clinical_sheets": int(total * 0.35),
        "lab_sheets":      int(total * 0.10),
        "cost_usd":        round(total * 0.005, 2)
    }

# ── Score ─────────────────────────────────────────────────
def generate_score(energy, waste, paper):
    e = max(0, 100 - ((energy["total_kwh"]    - 3500) / 2000) * 40)
    w = max(0, 100 - ((waste["total_kg"]       - 600)  / 500)  * 40)
    p = max(0, 100 - ((paper["total_sheets"]  - 9000)  / 7000) * 20)
    total = round((e + w + p) / 3, 1)

    grade = "A+" if total >= 90 else "A" if total >= 80 else \
            "B+" if total >= 70 else "B" if total >= 60 else \
            "C"  if total >= 50 else "D"

    return {
        "score":        total,
        "grade":        grade,
        "energy_score": round(e, 1),
        "waste_score":  round(w, 1),
        "paper_score":  round(p, 1)
    }

# ── Weekly Trend ──────────────────────────────────────────
def generate_weekly_trend():
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return [{"day": d, "energy": rand(3500, 5500),
             "waste": rand(600, 1100), "paper": rand(9000, 16000),
             "score": randf(60, 95)} for d in days]

# ── Department Leaderboard ────────────────────────────────
def generate_department_scores():
    depts = ["ICU", "OT", "Admin", "Lab", "Pharmacy", "Radiology"]
    return [{"department": d, "score": randf(50, 98),
             "energy_kwh": rand(400, 900), "waste_kg": rand(80, 200),
             "paper": rand(1000, 3000)} for d in depts]

# ── Alerts ────────────────────────────────────────────────
def generate_alerts(energy, waste, paper):
    alerts = []
    if energy["total_kwh"] > 5000:
        alerts.append({"type": "warning", "category": "energy",
            "message": f"High energy: {energy['total_kwh']} kWh",
            "time": datetime.now().isoformat()})
    if waste["hazardous_kg"] > 200:
        alerts.append({"type": "danger", "category": "waste",
            "message": f"Hazardous waste exceeded: {waste['hazardous_kg']} kg",
            "time": datetime.now().isoformat()})
    if paper["total_sheets"] > 14000:
        alerts.append({"type": "warning", "category": "paper",
            "message": f"Paper usage high: {paper['total_sheets']} sheets",
            "time": datetime.now().isoformat()})
    if not alerts:
        alerts.append({"type": "success", "category": "general",
            "message": "All systems within normal range ✅",
            "time": datetime.now().isoformat()})
    return alerts
