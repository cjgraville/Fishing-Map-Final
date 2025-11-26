import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Montana Fishing App</h1>
      <p className="home-subtitle">Explore rivers, lakes, and fish species near Bozeman.</p>

      <button className="enter-button" onClick={() => navigate('/map')}>
        Enter Map
      </button>
    </div>
  );
}
