import React, { useState } from 'react';
import MapComponent from './MapComponent';
import InfoPanel from './InfoPanel';
import rivers from './data/rivers.json';
import spots from './data/spots.json';
import fish from './data/fish.json';
import './FishingMapPage.css';

export default function FishingMapPage() {
  const [selectedWater, setSelectedWater] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Flatten river segments + add spots
  const waters = [
    ...rivers.flatMap(river =>
      river.segments.map(seg => ({
        id: seg.segment_id,
        name: seg.name,
        lat: seg.coordinates[0],
        lng: seg.coordinates[1],
        description: seg.description,
        fish: seg.fish,
        type: 'river_segment'
      }))
    ),
    ...spots.map(spot => ({
      id: spot.id,
      name: spot.name,
      lat: spot.coordinates[0],
      lng: spot.coordinates[1],
      description: spot.description,
      fish: spot.fish,
      type: spot.type
    }))
  ];

  // Filtered search results
  const filteredWaters = searchText
    ? waters.filter(w =>
        w.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left: Map + InfoPanel */}
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '10px' }}>
          <h1>Bozeman Fishing Map</h1>
          <input
            type="text"
            placeholder="Search for river or lake..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: '100%', padding: '5px', fontSize: '16px' }}
          />
        </div>

        <MapComponent
          waters={waters}
          selectedWater={selectedWater}
          setSelectedWater={setSelectedWater}
        />

        {selectedWater && <InfoPanel water={selectedWater} fish={fish} />}
      </div>

      {/* Right: Search Results */}
      <div
        style={{
          flex: 1,
          borderLeft: '1px solid gray',
          padding: '10px',
          overflowY: 'auto'
        }}
      >
        <h3>Search Results</h3>
        {filteredWaters.length === 0 ? (
          <p>No results</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredWaters.map((w) => (
              <li
                key={w.id}
                onClick={() => setSelectedWater(w)}
                style={{
                  cursor: 'pointer',
                  padding: '5px 0',
                  borderBottom: '1px solid #ccc'
                }}
              >
                {w.name} ({w.type})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
