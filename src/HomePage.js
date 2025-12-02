import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

// Import about images so the bundler knows about them
import AnthonyImg from "./assets/AnthonyAbout.jpg";
import ConnorImg from "./assets/ConnorAbout.JPEG";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-img-left" />

      <div className="home-container">
        {/* Top hero section */}
        <div className="hero-section">
          <h1 className="home-title">Montana Fishing App</h1>
          <p className="home-subtitle">
            Explore rivers, lakes, and public fishing access across Montana.
          </p>
          <button className="enter-button" onClick={() => navigate("/map")}>
            Enter Map
          </button>
        </div>

        <hr className="home-divider" />

        {/* About us section */}
        <section className="about-section">
          <h2 className="about-title">About Us</h2>

          <div className="about-grid">
            {/* Anthony card */}
            <div className="about-card">
              <img
                src={AnthonyImg}
                alt="Anthony Nania"
                className="about-avatar"
              />
              <h3 className="about-name">Anthony Nania</h3>
              <p className="about-role">Developer & Designer</p>
              <p className="about-text">
                My name is Anthony Nania. I am a junior at msu majoring in Computer Science with a minor in Business. This page is from both my parnter and I's passion for fishing
              </p>
            </div>

            {/* Connor card */}
            <div className="about-card">
              <img
                src={ConnorImg}
                alt="Connor Graville"
                className="about-avatar"
              />
              <h3 className="about-name">Connor Graville</h3>
              <p className="about-role">Data Engineer & Researcher</p>
              <p className="about-text">
                I am a computer science major at Montana State Univeristy. I enjoy data and fishing.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="home-img-right" />
    </div>
  );
}
