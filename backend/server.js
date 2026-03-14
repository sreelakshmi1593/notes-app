const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(path.join(__dirname, "notes.db"));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')))`);
  db.get("SELECT COUNT(*) as count FROM notes", (err, row) => {
    if (!err && row.count === 0) {
      db.run("INSERT INTO notes (title, content) VALUES (?, ?)", ["Welcome!", "Your first note. Edit or delete it!"]);
      db.run("INSERT INTO notes (title, content) VALUES (?, ?)", ["About this app", "Built with React, Node.js, Express and SQLite."]);
    }
  });
});

app.get("/notes", (req, res) => {
  db.all("SELECT * FROM notes ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed" });
    res.json(rows);
  });
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  db.run("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content], function(err) {
    if (err) return res.status(500).json({ error: "Failed" });
    db.get("SELECT * FROM notes WHERE id = ?", [this.lastID], (err, row) => res.status(201).json(row));
  });
});

app.put("/notes/:id", (req, res) => {
  const { title, content } = req.body;
  db.run("UPDATE notes SET title = ?, content = ? WHERE id = ?", [title, content, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: "Failed" });
    db.get("SELECT * FROM notes WHERE id = ?", [req.params.id], (err, row) => res.json(row));
  });
});

app.delete("/notes/:id", (req, res) => {
  db.run("DELETE FROM notes WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: "Failed" });
    res.json({ message: "Deleted" });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
