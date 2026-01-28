import os
import smtplib
from email.message import EmailMessage
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/feedback", tags=["Feedback"])

EMAIL = os.getenv("FEEDBACK_EMAIL")
PASSWORD = os.getenv("EMAIL_APP_PASSWORD")

class Feedback(BaseModel):
    name: str
    company: str | None = None
    email: EmailStr | None = None
    rating: int | None = None
    message: str

@router.post("")
def send_feedback(data: Feedback):
    try:
        msg = EmailMessage()
        msg["Subject"] = "📩 New Feedback – Veritas AI"
        msg["From"] = EMAIL
        msg["To"] = EMAIL

        msg.set_content(f"""
New feedback received:

Name: {data.name}
Company: {data.company}
Email: {data.email}
Rating: {data.rating}/5

Message:
{data.message}
""")

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL, PASSWORD)
            smtp.send_message(msg)

        return {"success": True}

    except Exception as e:
        raise HTTPException(500, str(e))
