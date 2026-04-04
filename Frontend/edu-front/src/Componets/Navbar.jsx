import React from "react";
import "../Css/Navbar.css";

function Navbar({ onGetStarted }) {
  return (
    <nav className="navbar">
      <div className="logo">EduAI</div>

      <div className="menu">
        <a href="#hero">Home</a>
        <a href="#tool">Toolkit</a>
      </div>

      {/* This calls the function passed from App.jsx */}
      <button className="btn" onClick={onGetStarted}>
        Get Started
      </button>
    </nav>
  );
}

export default Navbar;