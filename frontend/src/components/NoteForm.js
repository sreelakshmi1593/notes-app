import { useState, useEffect } from "react";

function NoteForm({ editingNote, onCreate, onUpdate, onCancelEdit }) {
  const [title, setTitle]     = useState("");
  const [content, setContent] = useState("");

  // Pre-fill form when editing
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingNote) {
      onUpdate(editingNote.id, title.trim(), content.trim());
    } else {
      onCreate(title.trim(), content.trim());
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="form-card">
      <h6 className="mb-3 fw-semibold" style={{ color: "#4a90d9" }}>
        {editingNote ? "Edit Note" : "Add New Note"}
      </h6>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Write your note here..."
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary btn-sm px-4">
            {editingNote ? "Update Note" : "Add Note"}
          </button>
          {editingNote && (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
