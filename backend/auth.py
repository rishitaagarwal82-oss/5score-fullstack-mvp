from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    token: str

@router.post("/auth/google")
def google_auth(request: LoginRequest):
    # Mocking Google token verification
    if request.token == "mock_google_token":
        return {
            "name": "Rishita",
            "email": "rishita@example.com",
            "provider": "google",
            "id": "12345"
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid token")
