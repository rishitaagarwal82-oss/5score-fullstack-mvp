import sqlite3
import json
import os

DB_PATH = "backend/utils/database.db"

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            google_id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            name TEXT,
            picture TEXT,
            xp INTEGER DEFAULT 0,
            total_score INTEGER DEFAULT 0,
            streak INTEGER DEFAULT 0,
            level INTEGER DEFAULT 1,
            purchased_upgrades TEXT DEFAULT '[]'
        )
    """)
    conn.commit()
    conn.close()

# Initialize database
init_db()

def get_user(google_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE google_id = ?", (google_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        user = dict(row)
        user["purchased_upgrades"] = json.loads(user["purchased_upgrades"])
        return user
    return None

def create_or_update_google_user(google_id: str, email: str, name: str, picture: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE google_id = ?", (google_id,))
    row = cursor.fetchone()
    if not row:
        cursor.execute("""
            INSERT INTO users (google_id, email, name, picture, xp, total_score, streak, level, purchased_upgrades)
            VALUES (?, ?, ?, ?, 0, 0, 0, 1, '[]')
        """, (google_id, email, name, picture))
        conn.commit()
    else:
        # Update name/picture if changed
        cursor.execute("""
            UPDATE users SET name = ?, picture = ? WHERE google_id = ?
        """, (name, picture, google_id))
        conn.commit()
    conn.close()
    return get_user(google_id)

def update_user_progress(google_id: str, xp: int, total_score: int, streak: int, level: int, purchased_upgrades: list):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE users
        SET xp = ?, total_score = ?, streak = ?, level = ?, purchased_upgrades = ?
        WHERE google_id = ?
    """, (xp, total_score, streak, level, json.dumps(purchased_upgrades), google_id))
    conn.commit()
    conn.close()
    return get_user(google_id)
