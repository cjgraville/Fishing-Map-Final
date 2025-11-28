export default function InfoPanel({ water }) {
  return (
    <div className="info-panel">
      <h2>{water.name}</h2>
      <p>{water.description}</p>
      <p><strong>Camping:</strong> {water.camping}</p>
      <p><strong>Hunting:</strong> {water.hunting}</p>
      <p><strong>Acres:</strong> {water.acres || "Unknown"}</p>
      {water.webPage && (
        <p>
          <a href={water.webPage} target="_blank" rel="noopener noreferrer">
            FWP Info Page
          </a>
        </p>
      )}
      {water.pdfMap && (
        <p>
          <a href={water.pdfMap} target="_blank" rel="noopener noreferrer">
            PDF Map
          </a>
        </p>
      )}
    </div>
  );
}
