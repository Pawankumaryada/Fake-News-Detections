from fastapi import APIRouter
from pydantic import BaseModel
from groq import Groq
import os

router = APIRouter(prefix="/chat", tags=["Chat"])

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class Chat(BaseModel):
    message: str

@router.post("")
def chat_ai(data: Chat):
    res = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {"role": "system", "content": "You are a fact-checking AI."},
            {"role": "user", "content": data.message}
        ]
    )
    return {"reply": res.choices[0].message.content}
