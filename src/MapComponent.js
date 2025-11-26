import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import fishIconImg from './assets/icon1.png'; // import your icon

// Move map when selectedWater changes
function MapMover({ position }) {
  const map = useMap();
  if (position) map.setView(position, 12);
  return null;
}

export default function MapComponent({ selectedWater, setSelectedWater, waters }) {
  const bozemanPosition = [45.676, -111.042];

  // Create Leaflet icon
  const fishIcon = L.icon({
    iconUrl: fishIconImg,
    iconSize: [48, 48],       // width, height
    iconAnchor: [24, 24],     // point where marker is anchored (center of icon)
    popupAnchor: [0, -24]     // where popups appear relative to icon
  });

  return (
    <div style={{ flex: 1 }}>
      <MapContainer center={bozemanPosition} zoom={11} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapMover position={selectedWater ? [selectedWater.lat, selectedWater.lng] : null} />

        {waters.map((water, idx) => (
          <Marker
            key={idx}
            position={[water.lat, water.lng]}
            icon={fishIcon}  // use the custom icon
            eventHandlers={{
              click: () => setSelectedWater(water)
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
