const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: "https://notes-app-mocha-two.vercel.app/"}));
app.use(express.json());

const db = new Database(path.join(__dirname, "notes.db"));

db.exec(`CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL
)`);

app.get("/api/notes", (req, res) => {
  const notes = db.prepare("SELECT * FROM notes").all();
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;
  const stmt = db.prepare("INSERT INTO notes (title, content) VALUES (?, ?)");
  const result = stmt.run(title, content);
  res.json({ id: result.lastInsertRowid, title, content });
});

app.put("/api/notes/:id", (req, res) => {
  const { title, content } = req.body;
  db.prepare("UPDATE notes SET title=?, content=? WHERE id=?").run(title, content, req.params.id);
  res.json({ id: req.params.id, title, content });
});

app.delete("/api/notes/:id", (req, res) => {
  db.prepare("DELETE FROM notes WHERE id=?").run(req.params.id);
  res.json({ message: "Note deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));