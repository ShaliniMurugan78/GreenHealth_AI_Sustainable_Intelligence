from flask import Blueprint, jsonify, send_file
from ml.data_generator import generate_energy, generate_waste, generate_paper, generate_score
from datetime import datetime
import os

report_bp = Blueprint("report", __name__)

@report_bp.route("/generate", methods=["GET"])
def generate_report():
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib import colors
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch

        energy = generate_energy()
        waste  = generate_waste()
        paper  = generate_paper()
        score  = generate_score(energy, waste, paper)

        filename = f"GreenHealth_Report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        filepath = os.path.join("reports", filename)
        os.makedirs("reports", exist_ok=True)

        doc    = SimpleDocTemplate(filepath, pagesize=A4)
        styles = getSampleStyleSheet()
        story  = []

        # Title
        title_style = ParagraphStyle("title", parent=styles["Title"],
                                     textColor=colors.HexColor("#16a34a"), fontSize=22)
        story.append(Paragraph("🌿 GreenHealth AI — Sustainability Report", title_style))
        story.append(Paragraph(f"Generated: {datetime.now().strftime('%B %d, %Y %H:%M')}", styles["Normal"]))
        story.append(Spacer(1, 0.3*inch))

        # Score
        story.append(Paragraph(f"Overall Sustainability Score: {score['score']}/100 (Grade: {score['grade']})", styles["Heading1"]))
        story.append(Spacer(1, 0.2*inch))

        # Data Table
        data = [
            ["Metric",          "Value",                    "Cost"],
            ["⚡ Energy Usage",  f"{energy['total_kwh']} kWh", f"${energy['cost_usd']}"],
            ["🏥 Medical Waste", f"{waste['total_kg']} kg",    f"${waste['cost_usd']}"],
            ["📄 Paper Usage",   f"{paper['total_sheets']} sheets", f"${paper['cost_usd']}"],
            ["🌍 Carbon Footprint", f"{energy['carbon_kg']} kg CO2", "-"],
        ]
        table = Table(data, colWidths=[2.5*inch, 2*inch, 1.5*inch])
        table.setStyle(TableStyle([
            ("BACKGROUND",  (0,0), (-1,0), colors.HexColor("#16a34a")),
            ("TEXTCOLOR",   (0,0), (-1,0), colors.white),
            ("FONTNAME",    (0,0), (-1,0), "Helvetica-Bold"),
            ("ALIGN",       (0,0), (-1,-1), "CENTER"),
            ("GRID",        (0,0), (-1,-1), 0.5, colors.grey),
            ("ROWBACKGROUNDS", (0,1), (-1,-1), [colors.white, colors.HexColor("#f0fdf4")]),
        ]))
        story.append(table)
        story.append(Spacer(1, 0.3*inch))

        # Score breakdown
        story.append(Paragraph("Score Breakdown", styles["Heading2"]))
        score_data = [
            ["Category", "Score"],
            ["⚡ Energy Score", f"{score['energy_score']}/100"],
            ["🏥 Waste Score",  f"{score['waste_score']}/100"],
            ["📄 Paper Score",  f"{score['paper_score']}/100"],
        ]
        score_table = Table(score_data, colWidths=[3*inch, 2*inch])
        score_table.setStyle(TableStyle([
            ("BACKGROUND",  (0,0), (-1,0), colors.HexColor("#15803d")),
            ("TEXTCOLOR",   (0,0), (-1,0), colors.white),
            ("ALIGN",       (0,0), (-1,-1), "CENTER"),
            ("GRID",        (0,0), (-1,-1), 0.5, colors.grey),
        ]))
        story.append(score_table)

        doc.build(story)
        return send_file(filepath, as_attachment=True, download_name=filename)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
