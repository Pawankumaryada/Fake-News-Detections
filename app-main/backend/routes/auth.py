from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from backend.core.database import users
from backend.auth.password import hash_password, verify_password
from auth.jwt import create_token

router = APIRouter(prefix="/auth", tags=["Auth"])

class Signup(BaseModel):
    name: str
    email: EmailStr
    password: str

class Login(BaseModel):
    email: EmailStr
    password: str

@router.post("/signup")
async def signup(data: Signup):
    if await users.find_one({"email": data.email}):
        raise HTTPException(400, "User already exists")

    user = {
        "name": data.name,
        "email": data.email,
        "password": hash_password(data.password),
        "role": "user"
    }

    await users.insert_one(user)

    token = create_token({"email": data.email, "role": "user"})

    return {
        "user": {
            "name": data.name,
            "email": data.email,
            "role": "user"
        },
        "access_token": token
    }

@router.post("/login")
async def login(data: Login):
    user = await users.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(401, "Invalid credentials")

    token = create_token({"email": user["email"], "role": user["role"]})

    return {
        "user": {
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        },
        "access_token": token
    }
