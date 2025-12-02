
import React from "react";

export default function InfoPanel({
  water,
  isFavorite,
  onToggleFavorite,
  notes,
  onChangeNotes,
}) {
  return (
    <div className="info-panel">
      <div className="info-header-row">
        <h2 className="info-title">{water.name}</h2>
        <button
          type="button"
          className={
            "favorite-btn" + (isFavorite ? " favorite-btn--active" : "")
          }
          onClick={onToggleFavorite}
        >
          {isFavorite ? "★ Favorite" : "☆ Favorite"}
        </button>
      </div>
      <p className="info-description">
        <strong>Access: </strong>
        {water.description}</p>
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

      <div className="notes-section">
        <label htmlFor="notes-textarea" className="notes-label">
          Notes for this spot
        </label>
        <textarea
          id="notes-textarea"
          className="notes-textarea"
          placeholder="Flows, preferred flies, access tips, fishing buddies, etc."
          value={notes}
          onChange={(e) => onChangeNotes(e.target.value)}
        />
      </div>
    </div>
  );
}
