function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="note-card">
      <h5>{note.title}</h5>
      <p>{note.content}</p>

      <div className="d-flex justify-content-between align-items-center">
        <span className="timestamp">{formatDate(note.created_at)}</span>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onEdit(note)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
