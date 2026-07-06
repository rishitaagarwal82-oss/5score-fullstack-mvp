from fastapi import APIRouter
import csv

router = APIRouter()

def load_frq():
    data = []
    with open("backend/frqs.csv", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data.append(row)
    return data

@router.get("/frq/{ap}")
def get_frq(ap: str):
    all_frq = load_frq()
    return [f for f in all_frq if f["ap"].strip() == ap.strip()]