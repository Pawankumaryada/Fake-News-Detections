import os
import logging
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# -------------------------------------------------
# LOGGING (ADD THIS)
# -------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)

logger = logging.getLogger("veritas-ai")

# -------------------------------------------------
# DATABASE
# -------------------------------------------------

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")

# -------------------------------------------------
# CORS
# -------------------------------------------------

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")

# -------------------------------------------------
# AI / NEWS
# -------------------------------------------------

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GNEWS_API_KEY = os.getenv("VITE_GNEWS_API_KEY")

# -------------------------------------------------
# FEEDBACK (EMAIL + WHATSAPP)
# -------------------------------------------------

FEEDBACK_EMAIL = os.getenv("FEEDBACK_EMAIL")
EMAIL_APP_PASSWORD = os.getenv("EMAIL_APP_PASSWORD")
WHATSAPP_NUMBER = os.getenv("WHATSAPP_NUMBER")
