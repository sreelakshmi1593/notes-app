import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";

const API_URL = "https://notes-app-0svv.onrender.com";

function App() {
  const [notes, setNotes]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ── Fetch all notes on mount ──────────────────────────────────────────────
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/notes`);
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError("Could not connect to server. Make sure the backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  // ── Create a new note ─────────────────────────────────────────────────────
  const handleCreate = async (title, content) => {
    try {
      const res = await fetch(`${API_URL}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error("Failed to create note");
      const newNote = await res.json();
      setNotes([newNote, ...notes]);
    } catch (err) {
      alert("Error creating note. Please try again.");
    }
  };

  // ── Update an existing note ───────────────────────────────────────────────
  const handleUpdate = async (id, title, content) => {
    try {
      const res = await fetch(`${API_URL}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error("Failed to update note");
      const updated = await res.json();
      setNotes(notes.map((n) => (n.id === id ? updated : n)));
      setEditingNote(null);
    } catch (err) {
      alert("Error updating note. Please try again.");
    }
  };

  // ── Delete a note ─────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      const res = await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete note");
      setNotes(notes.filter((n) => n.id !== id));
      if (editingNote?.id === id) setEditingNote(null);
    } catch (err) {
      alert("Error deleting note. Please try again.");
    }
  };

  // ── Filter notes by search query ──────────────────────────────────────────
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="app-header">
        <div className="container">
          <h1>My Notes</h1>
          <p>A full stack app built with React.js, Node.js, Express &amp; SQLite</p>
        </div>
      </header>

      <div className="container" style={{ maxWidth: 720 }}>
        {/* Create / Edit Form */}
        <NoteForm
          editingNote={editingNote}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancelEdit={() => setEditingNote(null)}
        />

        {/* Search Bar */}
        <SearchBar query={searchQuery} onChange={setSearchQuery} />

        {/* Stats */}
        {!loading && !error && (
          <div className="stats-bar">
            {filteredNotes.length} note{filteredNotes.length !== 1 ? "s" : ""}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2 text-muted">Loading notes...</p>
          </div>
        )}

        {/* Notes list */}
        {!loading && !error && (
          <NoteList
            notes={filteredNotes}
            onEdit={setEditingNote}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;
