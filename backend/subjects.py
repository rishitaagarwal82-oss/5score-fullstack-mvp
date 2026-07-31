from fastapi import APIRouter
import pandas as pd

router = APIRouter()

def get_all_subjects():
    try:
        q_df = pd.read_csv("backend/questions.csv")
        f_df = pd.read_csv("backend/frqs.csv")

        q_subs = q_df["ap"].unique().tolist()
        f_subs = f_df["ap"].unique().tolist()

        all_subs = sorted(list(set(q_subs + f_subs)))
        return all_subs
    except Exception as e:
        print(f"Error reading subjects: {e}")
        return ["AP Biology", "AP Calculus AB", "AP Statistics", "AP Chemistry"]

@router.get("/subjects")
def list_subjects():
    return get_all_subjects()
