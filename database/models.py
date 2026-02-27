from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# ── Energy Table ──────────────────────────────────────────
class EnergyLog(db.Model):
    __tablename__  = "energy_logs"
    id             = db.Column(db.Integer, primary_key=True)
    timestamp      = db.Column(db.DateTime, default=datetime.utcnow)
    total_kwh      = db.Column(db.Float)
    hvac_kwh       = db.Column(db.Float)
    lighting_kwh   = db.Column(db.Float)
    equipment_kwh  = db.Column(db.Float)
    cost_usd       = db.Column(db.Float)
    carbon_kg      = db.Column(db.Float)

    def to_dict(self):
        return {
            "id":            self.id,
            "timestamp":     self.timestamp.isoformat(),
            "total_kwh":     self.total_kwh,
            "hvac_kwh":      self.hvac_kwh,
            "lighting_kwh":  self.lighting_kwh,
            "equipment_kwh": self.equipment_kwh,
            "cost_usd":      self.cost_usd,
            "carbon_kg":     self.carbon_kg
        }

# ── Waste Table ───────────────────────────────────────────
class WasteLog(db.Model):
    __tablename__  = "waste_logs"
    id             = db.Column(db.Integer, primary_key=True)
    timestamp      = db.Column(db.DateTime, default=datetime.utcnow)
    total_kg       = db.Column(db.Float)
    hazardous_kg   = db.Column(db.Float)
    recyclable_kg  = db.Column(db.Float)
    general_kg     = db.Column(db.Float)
    cost_usd       = db.Column(db.Float)

    def to_dict(self):
        return {
            "id":            self.id,
            "timestamp":     self.timestamp.isoformat(),
            "total_kg":      self.total_kg,
            "hazardous_kg":  self.hazardous_kg,
            "recyclable_kg": self.recyclable_kg,
            "general_kg":    self.general_kg,
            "cost_usd":      self.cost_usd
        }

# ── Paper Table ───────────────────────────────────────────
class PaperLog(db.Model):
    __tablename__      = "paper_logs"
    id                 = db.Column(db.Integer, primary_key=True)
    timestamp          = db.Column(db.DateTime, default=datetime.utcnow)
    total_sheets       = db.Column(db.Integer)
    admin_sheets       = db.Column(db.Integer)
    clinical_sheets    = db.Column(db.Integer)
    lab_sheets         = db.Column(db.Integer)
    cost_usd           = db.Column(db.Float)

    def to_dict(self):
        return {
            "id":              self.id,
            "timestamp":       self.timestamp.isoformat(),
            "total_sheets":    self.total_sheets,
            "admin_sheets":    self.admin_sheets,
            "clinical_sheets": self.clinical_sheets,
            "lab_sheets":      self.lab_sheets,
            "cost_usd":        self.cost_usd
        }

# ── Sustainability Score Table ────────────────────────────
class SustainabilityScore(db.Model):
    __tablename__  = "sustainability_scores"
    id             = db.Column(db.Integer, primary_key=True)
    timestamp      = db.Column(db.DateTime, default=datetime.utcnow)
    score          = db.Column(db.Float)
    grade          = db.Column(db.String(5))
    energy_score   = db.Column(db.Float)
    waste_score    = db.Column(db.Float)
    paper_score    = db.Column(db.Float)

    def to_dict(self):
        return {
            "id":           self.id,
            "timestamp":    self.timestamp.isoformat(),
            "score":        self.score,
            "grade":        self.grade,
            "energy_score": self.energy_score,
            "waste_score":  self.waste_score,
            "paper_score":  self.paper_score
        }
