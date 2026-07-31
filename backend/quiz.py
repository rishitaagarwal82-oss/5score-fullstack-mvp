from fastapi import APIRouter
import pandas as pd

router = APIRouter()


@router.get("/questions/{ap}")
def get_questions(ap: str):
    try:
        df = pd.read_csv("backend/questions.csv")
        return df[df["ap"] == ap].to_dict(orient="records")
    except Exception as e:
        print(f"Error loading questions: {e}")
        return []
