import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import fishIconImg from "./assets/icon1.png"; // your icon

// Component to move the map when selectedWater changes
function MapMover({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { duration: 1.0 }); // zoom in to level 14
    }
  }, [position, map]);
  return null;
}

export default function MapComponent({ waters, selectedWater, setSelectedWater }) {
  const bozemanPosition = [45.676, -111.042];

  const fishIcon = L.icon({
    iconUrl: fishIconImg,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  return (
    <MapContainer
      center={bozemanPosition}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Fly to selectedWater when clicked from search */}
      <MapMover position={selectedWater ? [selectedWater.lat, selectedWater.lng] : null} />

      {waters.map((water) => (
        <Marker
          key={water.id}
          position={[water.lat, water.lng]}
          icon={fishIcon}
          eventHandlers={{
            click: () => setSelectedWater(water),
          }}
        />
      ))}
    </MapContainer>
  );
}
