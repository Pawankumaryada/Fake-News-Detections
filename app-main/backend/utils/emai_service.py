import smtplib
from email.message import EmailMessage
from core.config import FEEDBACK_EMAIL, EMAIL_APP_PASSWORD

def send_feedback_email(name, email, rating, message):
    msg = EmailMessage()
    msg["Subject"] = "📩 New Veritas AI Feedback"
    msg["From"] = FEEDBACK_EMAIL
    msg["To"] = FEEDBACK_EMAIL

    msg.set_content(f"""
New Feedback Received 🚀

Name: {name}
User Email: {email}
Rating: {rating}/5

Message:
{message}
""")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(FEEDBACK_EMAIL, EMAIL_APP_PASSWORD)
        server.send_message(msg)
