function SearchBar({ query, onChange }) {
  return (
    <div className="search-box">
      <input
        type="text"
        className="form-control"
        placeholder="Search notes by title or content..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
