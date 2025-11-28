import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import InfoPanel from "./InfoPanel";
import "./FishingMapPage.css";
import riverMapping from "./data/riverMapping.json";

export default function FishingMapPage() {
  const [waters, setWaters] = useState([]);
  const [selectedWater, setSelectedWater] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("/data/FWP_Fishing_Access.geojson")
      .then((res) => res.json())
      .then((data) => {
        const points = data.features
          .filter((f) => f.geometry?.type === "Point")
          .map((f) => ({
            id: f.id,
            name: f.properties.NAME,
            lat: Number(f.geometry.coordinates[1]),
            lng: Number(f.geometry.coordinates[0]),
            description: f.properties.BOAT_FAC || "No description",
            webPage: f.properties.WEB_PAGE,
            pdfMap: f.properties.PDFMAP,
            camping: f.properties.CAMPING,
            hunting: f.properties.HUNTING,
            acres: f.properties.ACRES,
            //type: "FWP Spot",
          }));
        setWaters(points);
      })
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

  const filteredWaters = searchText
  ? (() => {
      const lower = searchText.toLowerCase();

      // 1. Find all river names in the mapping that partially match the user input
      const matchedRivers = Object.keys(riverMapping).filter((river) =>
        river.toLowerCase().includes(lower)
      );

      // 2. If any rivers match, gather ALL their access points
      if (matchedRivers.length > 0) {
        const accessNames = matchedRivers.flatMap(
          (river) => riverMapping[river]
        );
        return waters.filter((w) => accessNames.includes(w.name));
      }

      // 3. Otherwise, fallback to matching access point names directly
      return waters.filter((w) =>
        w.name.toLowerCase().includes(lower)
      );
    })()
  : [];


  // FIXED: no longer overwrites the search bar
  const handleSelectWater = (w) => {
    setSelectedWater(w); 
  };

  return (
  <>
    <h1 className="page-title">Montana Fishing Access Map</h1>

    <div className="map-page-container">
      <div className="map-column">
        <MapComponent
          waters={waters}
          selectedWater={selectedWater}
          setSelectedWater={setSelectedWater}
        />
      </div>

      <div className="side-column">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search rivers or lakes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {filteredWaters.length > 0 && (
          <div className="search-results">
            <h3>Search Results</h3>
            <ul>
              {filteredWaters.map((w) => (
                <li key={w.id} onClick={() => handleSelectWater(w)}>
                  {w.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedWater && <InfoPanel water={selectedWater} />}
      </div>
    </div>
  </>
);

}
