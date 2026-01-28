import urllib.parse
from core.config import WHATSAPP_NUMBER

def get_whatsapp_link(name, rating):
    text = f"""
📩 New Veritas AI Feedback

Name: {name}
Rating: {rating}/5
"""
    encoded = urllib.parse.quote(text)
    return f"https://wa.me/{WHATSAPP_NUMBER}?text={encoded}"
