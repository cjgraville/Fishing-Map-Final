// src/FishingMapPage.js
import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import InfoPanel from "./InfoPanel";
import "./FishingMapPage.css";
import riverMapping from "./data/riverMapping.json";

export default function FishingMapPage() {
  const [waters, setWaters] = useState([]);
  const [selectedWater, setSelectedWater] = useState(null);
  const [searchText, setSearchText] = useState("");

  // favorites = array of water IDs
  const [favorites, setFavorites] = useState([]);
  // notes = { [waterId]: "text" }
  const [notes, setNotes] = useState({});

  // ---- Load waters from GeoJSON ----
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
          }));
        setWaters(points);
      })
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

  // ---- Load favorites & notes from localStorage on first render ----
  useEffect(() => {
    try {
      const storedFavs = JSON.parse(localStorage.getItem("favoriteWaters"));
      if (Array.isArray(storedFavs)) {
        setFavorites(storedFavs);
      }
    } catch (e) {
      console.warn("Could not parse favoriteWaters from localStorage", e);
    }

    try {
      const storedNotes = JSON.parse(localStorage.getItem("waterNotes"));
      if (storedNotes && typeof storedNotes === "object") {
        setNotes(storedNotes);
      }
    } catch (e) {
      console.warn("Could not parse waterNotes from localStorage", e);
    }
  }, []);

  // ---- Save favorites to localStorage whenever they change ----
  useEffect(() => {
    localStorage.setItem("favoriteWaters", JSON.stringify(favorites));
  }, [favorites]);

  // ---- Save notes to localStorage whenever they change ----
  useEffect(() => {
    localStorage.setItem("waterNotes", JSON.stringify(notes));
  }, [notes]);

  // ---- Search logic (river name mapping + fallback to spot names) ----
  const filteredWaters = searchText
    ? (() => {
        const lower = searchText.toLowerCase();

        // 1. river name mapping
        const matchedRivers = Object.keys(riverMapping).filter((river) =>
          river.toLowerCase().includes(lower)
        );

        if (matchedRivers.length > 0) {
          const accessNames = matchedRivers.flatMap(
            (river) => riverMapping[river]
          );
          return waters.filter((w) => accessNames.includes(w.name));
        }

        // 2. fallback to access name search
        return waters.filter((w) =>
          w.name.toLowerCase().includes(lower)
        );
      })()
    : [];

  const handleSelectWater = (w) => {
    setSelectedWater(w);
  };

  // ---- Favorites helpers ----
  const toggleFavorite = (water) => {
    if (!water) return;

    setFavorites((prev) => {
      const exists = prev.includes(water.id);
      if (exists) {
        return prev.filter((id) => id !== water.id);
      } else {
        return [...prev, water.id];
      }
    });
  };

  const isFavorite = selectedWater
    ? favorites.includes(selectedWater.id)
    : false;

  const favoriteWaters = favorites
    .map((id) => waters.find((w) => w.id === id))
    .filter(Boolean);

  // ---- Notes helper ----
  const handleNotesChange = (waterId, value) => {
    setNotes((prev) => ({
      ...prev,
      [waterId]: value,
    }));
  };

  return (
    <>
      <h1 className="page-title">Montana Public Fishing Access Map</h1>

      <div className="map-page-container">
        <div className="map-column">
          <MapComponent
            waters={waters}
            selectedWater={selectedWater}
            setSelectedWater={setSelectedWater}
          />
        </div>

        <div className="side-column">
          {/* Search box */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search rivers or lakes..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Search results */}
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

          {/* Info panel for selected water */}
          {selectedWater && (
            <InfoPanel
              water={selectedWater}
              isFavorite={isFavorite}
              onToggleFavorite={() => toggleFavorite(selectedWater)}
              notes={notes[selectedWater.id] || ""}
              onChangeNotes={(val) =>
                handleNotesChange(selectedWater.id, val)
              }
            />
          )}

          {/* Favorites list */}
          {favoriteWaters.length > 0 && (
            <div className="favorites-panel">
              <h3>Favorites</h3>
              <ul>
                {favoriteWaters.map((w) => (
                  <li key={w.id} onClick={() => setSelectedWater(w)}>
                    {w.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
