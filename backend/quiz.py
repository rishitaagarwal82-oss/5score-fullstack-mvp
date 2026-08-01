from fastapi import APIRouter, Depends
import pandas as pd
from backend.routes.auth import get_current_user_id

router = APIRouter()


@router.get("/questions/{ap}")
def get_questions(ap: str, google_id: str = Depends(get_current_user_id)):
    try:
        df = pd.read_csv("backend/questions.csv")
        return df[df["ap"] == ap].to_dict(orient="records")
    except Exception as e:
        print(f"Error loading questions: {e}")
        return []
