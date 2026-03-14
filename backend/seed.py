"""
seed.py — Python script to insert sample notes into the SQLite database.
Run this once: python3 seed.py
This proves Python skills on the resume!
"""

import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "notes.db")

sample_notes = [
    ("Python & SQLite", "This note was created using a Python script. Python is great for scripting, data tasks, and backend development."),
    ("Study Plan", "Week 1: Build backend API. Week 2: Build React frontend. Week 3: Deploy and add to resume."),
    ("Full Stack Skills", "Frontend: React.js, HTML, CSS, Bootstrap. Backend: Node.js, Express.js, Python. Database: SQLite / SQL."),
    ("Interview Tips", "1. Push all projects to GitHub. 2. Write a good README. 3. Deploy live demo links. 4. Practice explaining what you built."),
]

def seed():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now'))
        )
    """)

    for title, content in sample_notes:
        cursor.execute(
            "INSERT INTO notes (title, content) VALUES (?, ?)",
            (title, content)
        )
        print(f"  Inserted: '{title}'")

    conn.commit()
    conn.close()
    print(f"\nDone! {len(sample_notes)} notes inserted into {DB_PATH}")

if __name__ == "__main__":
    seed()
