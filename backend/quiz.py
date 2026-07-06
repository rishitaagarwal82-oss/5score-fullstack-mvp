from fastapi import APIRouter
import pandas as pd

router = APIRouter()

df = pd.read_csv("backend/questions.csv")


@router.get("/questions/{ap}")
def get_questions(ap: str):
    return df[df["ap"] == ap].to_dict(orient="records")