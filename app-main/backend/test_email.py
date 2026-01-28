import smtplib
from email.message import EmailMessage
from core.config import FEEDBACK_EMAIL, EMAIL_APP_PASSWORD

msg = EmailMessage()
msg["Subject"] = "✅ Veritas AI Email Test"
msg["From"] = FEEDBACK_EMAIL
msg["To"] = FEEDBACK_EMAIL
msg.set_content("Email test successful 🚀")

try:
    server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
    server.login(FEEDBACK_EMAIL, EMAIL_APP_PASSWORD)
    server.send_message(msg)
    server.quit()
    print("✅ EMAIL SENT SUCCESSFULLY")
except Exception as e:
    print("❌ EMAIL FAILED")
    print(e)
