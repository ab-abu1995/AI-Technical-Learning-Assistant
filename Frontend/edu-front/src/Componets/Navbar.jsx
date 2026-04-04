// src/components/Navbar.jsx
import React from "react";
import "../Css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">EduAI</div>

      <div className="menu">
        <a href="#hero">Home</a>
        <a href="#tool">Toolkit</a>
        {/* <a href="#">Guide</a>
        <a href="#">FAQ</a> */}
      </div>

      <button className="btn">Get Started</button>
    </nav>
  );
}

export default Navbar;