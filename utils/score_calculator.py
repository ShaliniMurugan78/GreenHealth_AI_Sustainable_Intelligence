def calculate_score(energy_kwh, waste_kg, paper_sheets):
    e = max(0, 100 - ((energy_kwh   - 3500) / 2000) * 40)
    w = max(0, 100 - ((waste_kg     - 600)  / 500)  * 40)
    p = max(0, 100 - ((paper_sheets - 9000) / 7000) * 20)
    total = round((e + w + p) / 3, 1)

    grade = "A+" if total >= 90 else "A" if total >= 80 else \
            "B+" if total >= 70 else "B" if total >= 60 else \
            "C"  if total >= 50 else "D"

    tips = []
    if energy_kwh > 5000:  tips.append("Reduce HVAC usage during off-peak hours")
    if waste_kg   > 900:   tips.append("Improve medical waste segregation")
    if paper_sheets > 13000: tips.append("Switch to digital documentation")

    return {
        "score":        total,
        "grade":        grade,
        "energy_score": round(e, 1),
        "waste_score":  round(w, 1),
        "paper_score":  round(p, 1),
        "tips":         tips
    }
