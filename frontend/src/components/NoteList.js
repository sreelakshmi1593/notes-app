import NoteCard from "./NoteCard";

function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">📝</div>
        <p>No notes found. Add your first note above!</p>
      </div>
    );
  }

  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default NoteList;
