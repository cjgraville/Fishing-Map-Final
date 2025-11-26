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

  const handleSearch = () => {
    const found = waters.find(
      w => w.name.toLowerCase() === searchText.toLowerCase()
    );

    if (found) setSelectedWater(found);
    else alert('Water body not found!');
  };

  return (
    <div className="map-page-container">
      <h1 className="map-title">Bozeman Fishing Map</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter river or lake..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <MapComponent
        waters={waters}
        selectedWater={selectedWater}
        setSelectedWater={setSelectedWater}
      />

      {selectedWater && <InfoPanel water={selectedWater} fish={fish} />}
    </div>
  );
}
