from fastapi import APIRouter
import csv

router = APIRouter()

def load_questions():
    with open("backend/questions.csv", encoding="utf-8") as f:
        return list(csv.DictReader(f))

@router.get("/questions/{ap}")
def get_questions(ap: str):
    data = load_questions()

    return [
        q for q in data
        if q["ap"].strip().lower() == ap.strip().lower()
    ]