Montana Fishing Access Map

A React + Leaflet mapping application that displays Montana FWP fishing access sites using live GeoJSON data. Users can browse locations, view details, and interact with a fully responsive map UI.

📖 Table of Contents
Overview
Features
Tech Stack
Installation
Dependencies
Project Structure
GeoJSON Data
Map Rendering
Scripts
Screenshots
Future Improvements
License

🔍 Overview

This project provides an interactive map of Montana Fishing Access Sites using Leaflet and React.
It loads a .geojson file, filters out all non-point features, converts geographic coordinates properly, and renders them as clickable map markers.

Each marker displays:

Site name
Description
Boat access info
Webpage/PDF map links
Camping & hunting access info
Acreage

The project is designed for performance — GeoJSON is loaded once using useEffect() and stored in state for fast searching and filtering.

✨ Features

📍 Interactive map powered by Leaflet
🧭 Zoom, pan, markers, popups
🗂️ Loads and parses real Montana FWP GeoJSON data
🔎 Searchable list of access points
⚡ Lightweight and fast (Vite + React)
📱 Fully responsive layout
🧰 Clean, maintainable component structure

🛠️ Tech Stack
Frontend

React (w/ Hooks)
Vite (recommended for dev speed)
TypeScript (optional)
Leaflet
React-Leaflet
Data Format
GeoJSON (standard GIS format)

📦 Installation

1. Clone the Repository
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO

2. Install Node Modules
   npm install

🔧 Required Dependencies

Install Leaflet + React-Leaflet:

npm install leaflet react-leaflet

Import Leaflet CSS (required):

import "leaflet/dist/leaflet.css";

Fix Leaflet’s missing marker icons (mandatory)

Leaflet does not load icons by default in Vite or React setups.

Add this near your map setup:

import L from "leaflet";
delete L.Icon.Default.prototype.\_getIconUrl;

L.Icon.Default.mergeOptions({
iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
});

🗂️ Project Structure
/project-root
│
├── public/
│ └── data/
│ └── FWP_Fishing_Access.geojson
│
├── src/
│ ├── components/
│ │ ├── MapComponent.jsx
│ │ ├── FishingMap.jsx
│ │ └── InfoPanel.jsx
│ │
│ ├── App.jsx
│ └── main.jsx
│
└── package.json

🌍 GeoJSON Data

The app loads the dataset once:

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
});
}, []);

✔ Yes — this only runs one time.

The user search feature filters the already-loaded array, NOT the file.

🗺️ Map Rendering

Your map loads in FishingMap or MapComponent (depending on how you split it).

Minimal example:

<MapContainer center={[46.8797, -110.3626]} zoom={7} scrollWheelZoom={true}>
<TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
{waters.map((w) => (
<Marker key={w.id} position={[w.lat, w.lng]}>
<Popup>{w.name}</Popup>
</Marker>
))}
</MapContainer>

🏃 Scripts
Start Dev Server
npm run dev

Build for Production
npm run build

Preview Build
npm run preview

🖼️ Screenshots (Optional)
![Map Screenshot](./screenshots/map.png)
![Sidebar](./screenshots/sidebar.png)

🚀 Future Improvements

🐟 Fish species filters

🎣 River segment browsing

💾 Local data caching

📲 Mobile-first map redesign

🌐 Backend API integration

🧭 User GPS location + nearest access points
