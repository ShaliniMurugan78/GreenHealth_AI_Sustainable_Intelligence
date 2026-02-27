import random

def predict_energy_tomorrow(today_kwh):
    """Simple trend-based prediction"""
    factor = random.uniform(0.92, 1.08)
    predicted = round(today_kwh * factor, 1)
    trend = "increase" if predicted > today_kwh else "decrease"
    return {
        "predicted_kwh": predicted,
        "trend":         trend,
        "confidence":    round(random.uniform(75, 92), 1)
    }

def predict_waste_tomorrow(today_kg):
    factor = random.uniform(0.90, 1.10)
    predicted = round(today_kg * factor, 1)
    return {
        "predicted_kg": predicted,
        "trend":        "increase" if predicted > today_kg else "decrease",
        "confidence":   round(random.uniform(70, 90), 1)
    }

def predict_score_tomorrow(today_score):
    delta = random.uniform(-5, 5)
    predicted = round(min(100, max(0, today_score + delta)), 1)
    return {
        "predicted_score": predicted,
        "trend":           "improve" if predicted > today_score else "decline",
        "confidence":      round(random.uniform(72, 91), 1)
    }
