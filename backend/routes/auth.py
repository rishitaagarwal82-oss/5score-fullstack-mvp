from fastapi import APIRouter, HTTPException, Header, Depends
from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import jwt
from datetime import datetime, timedelta
import os

from backend.utils.db import get_user, create_or_update_google_user, update_user_progress

router = APIRouter(prefix="/auth", tags=["auth"])

import uuid

GOOGLE_CLIENT_ID = "651804252340-rmhgrbc1apu1v560mrq4fuqvi288gdv0.apps.googleusercontent.com"
JWT_SECRET = os.getenv("JWT_SECRET", "super-secret-key-for-development")
JWT_ALGORITHM = "HS256"

class GoogleLoginRequest(BaseModel):
    id_token: str

class SyncProgressRequest(BaseModel):
    xp: int
    total_score: int
    streak: int
    level: int
    purchased_upgrades: list

def create_access_token(google_id: str) -> str:
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode = {"sub": google_id, "exp": expire}
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

def get_current_user_id(authorization: str = Header(None)) -> str:
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization Header")
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid authorization scheme")
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        google_id = payload.get("sub")
        if not google_id:
            raise HTTPException(status_code=401, detail="Invalid token subject")
        return google_id
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired session token")

@router.post("/guest")
def guest_auth():
    try:
        # Generate a unique guest user identifier
        guest_id = f"guest_{uuid.uuid4().hex[:12]}"
        email = f"{guest_id}@5score.local"
        name = "Guest Scholar"

        # Save guest user in the SQLite database
        user = create_or_update_google_user(guest_id, email, name, "")

        # Issue a secure JWT token
        token = create_access_token(guest_id)

        return {
            "token": token,
            "user": user
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Guest login failed: {str(e)}")

@router.post("/google")
def google_auth(req: GoogleLoginRequest):
    try:
        # Verify Google ID Token
        id_info = id_token.verify_oauth2_token(
            req.id_token,
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )

        google_id = id_info.get("sub")
        email = id_info.get("email")
        name = id_info.get("name", "Scholar")
        picture = id_info.get("picture", "")

        if not google_id or not email:
            raise HTTPException(status_code=400, detail="Incomplete Google user profile info")

        # Save/update user in SQLite
        user = create_or_update_google_user(google_id, email, name, picture)

        # Create secure JWT
        token = create_access_token(google_id)

        return {
            "token": token,
            "user": user
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Google ID Token verification failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Authentication error: {str(e)}")

@router.get("/me")
def get_me(google_id: str = Depends(get_current_user_id)):
    user = get_user(google_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/sync")
def sync_progress(req: SyncProgressRequest, google_id: str = Depends(get_current_user_id)):
    user = update_user_progress(
        google_id,
        req.xp,
        req.total_score,
        req.streak,
        req.level,
        req.purchased_upgrades
    )
    return user

@router.post("/logout")
def logout():
    return {"message": "Logged out successfully"}
