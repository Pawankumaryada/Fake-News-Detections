import os
from motor.motor_asyncio import AsyncIOMotorClient
from urllib.parse import quote_plus

MONGO_USERNAME = quote_plus(os.getenv("MONGO_USERNAME"))
MONGO_PASSWORD = quote_plus(os.getenv("MONGO_PASSWORD"))
MONGO_CLUSTER  = os.getenv("MONGO_CLUSTER")  # e.g. veritas-ai-cluster.xxxxx
MONGO_DB       = os.getenv("MONGO_DB", "veritas")

MONGO_URL = (
    f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}"
    f"@{MONGO_CLUSTER}/{MONGO_DB}?retryWrites=true&w=majority"
)

client = AsyncIOMotorClient(MONGO_URL)
db = client[MONGO_DB]

analyses = db["analyses"]
