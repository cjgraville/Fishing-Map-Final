import React, { useState } from "react";
import MapComponent from "./MapComponent";
import InfoPanel from "./InfoPanel";
import rivers from "./data/rivers.json";
import spots from "./data/spots.json";
import fish from "./data/fish.json";
import "./FishingMapPage.css";

export default function FishingMapPage() {
  const [selectedWater, setSelectedWater] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Flat map data from both sources
  const waters = [
    ...rivers.flatMap((river) =>
      river.segments.map((seg) => ({
        id: seg.segment_id,
        name: seg.name,
        lat: seg.coordinates[0],
        lng: seg.coordinates[1],
        description: seg.description,
        fish: seg.fish,
        type: "river_segment",
      }))
    ),
    ...spots.map((spot) => ({
      id: spot.id,
      name: spot.name,
      lat: spot.coordinates[0],
      lng: spot.coordinates[1],
      description: spot.description,
      fish: spot.fish,
      type: spot.type,
    })),
  ];

  // Filtered search results
  const filteredWaters = searchText
    ? waters.filter((w) =>
        w.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const handleSelectWater = (w) => {
    setSelectedWater(w);
    setSearchText(w.name);
  };

  return (
    <div className="map-page-container">
      {/* Header */}
      <div className="map-header">
        <h1 className="map-title">Bozeman Fishing Map</h1>
        <p className="map-subtitle">
          Search for rivers, lakes, and access points around Bozeman.
        </p>

        <div className="search-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="Search for river or lake..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Map */}
      <div className="map-card">
        <div className="map-view">
          <MapComponent
            waters={waters}
            selectedWater={selectedWater}
            setSelectedWater={setSelectedWater}
          />
        </div>
      </div>

      {/* Info panels */}
      <div className="info-row">
        {selectedWater && (
          <div className="info-card">
            <InfoPanel water={selectedWater} fish={fish} />
          </div>
        )}

        <div className="info-card">
          <h3 className="info-card-title">Search Results</h3>
          {filteredWaters.length === 0 ? (
            <p className="info-empty">No results found.</p>
          ) : (
            <ul className="results-list">
              {filteredWaters.map((w) => (
                <li
                  key={w.id}
                  className="result-item"
                  onClick={() => handleSelectWater(w)}
                >
                  <span>{w.name}</span>
                  <span className="result-type">
                    {w.type === "river_segment" ? "River segment" : "Spot"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
