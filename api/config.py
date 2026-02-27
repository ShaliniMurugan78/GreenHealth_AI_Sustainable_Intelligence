import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    GROQ_API_KEY                  = os.getenv("GROQ_API_KEY")
    SQLALCHEMY_DATABASE_URI       = "sqlite:///greenhealth.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG                         = True
    SECRET_KEY                    = "greenhealth-secret-2024"
