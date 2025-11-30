export default function InfoPanel({
  water,
  isFavorite,
  onToggleFavorite,
  notes,
  onChangeNotes,
}) {
  return (
    <div className="info-panel">
      {/* header row: name + favorite button */}
      <div className="info-header-row">
        <h2>{water.name}</h2>
        <button
          type="button"
          className={
            "favorite-btn" +
            (isFavorite ? " favorite-btn--active" : "")
          }
          onClick={onToggleFavorite}
        >
          {isFavorite ? "★ Favorited" : "☆ Add Favorite"}
        </button>
      </div>

      <p><strong>Access: </strong>{water.description}</p>
      <p>
        <strong>Camping:</strong> {water.camping}
      </p>
      <p>
        <strong>Hunting:</strong> {water.hunting}
      </p>
      <p>
        <strong>Acres:</strong> {water.acres || "Unknown"}
      </p>

      {water.webPage && (
        <p>
          <a
            href={water.webPage}
            target="_blank"
            rel="noopener noreferrer"
          >
            FWP Info Page
          </a>
        </p>
      )}
      {water.pdfMap && (
        <p>
          <a
            href={water.pdfMap}
            target="_blank"
            rel="noopener noreferrer"
          >
            PDF Map
          </a>
        </p>
      )}

      {/* Notes section */}
      <div className="notes-section">
        <div className="notes-title">Your Notes</div>
        <textarea
          className="notes-textarea"
          placeholder="Add notes about access, fish caught, fly/bait used, water conditions, weather data, etc"
          value={notes}
          onChange={(e) => onChangeNotes(e.target.value)}
        />
      </div>
    </div>
  );
}
