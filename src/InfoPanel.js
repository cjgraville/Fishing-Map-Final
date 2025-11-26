export default function InfoPanel({ water, fish }) {
  // Map water.fish IDs to actual fish objects
  const fishList = water.fish.map(fid => fish.find(f => f.id === fid));

  return (
    <div style={{ display: 'flex', borderTop: '1px solid gray', height: '180px' }}>
      <div style={{ flex: 1, padding: '10px', borderRight: '1px solid gray' }}>
        <h2>{water.name}</h2>
        <p>{water.description}</p>
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        <h3>Fish Species</h3>
        <ul>
          {fishList.map((f, idx) => (
            <li key={idx}><strong>{f.common_name}:</strong> {f.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
