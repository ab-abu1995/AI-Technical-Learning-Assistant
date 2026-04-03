// src/components/Navbar.jsx
import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">EduLite AI</div>

      <div className="menu">
        <a href="#">Home</a>
        <a href="#">Guide</a>
        <a href="#">FAQ</a>
        <a href="#">Tools</a>
      </div>

      <button className="btn">Get Started</button>
    </nav>
  );
}

export default Navbar;