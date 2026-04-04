import React from "react";
import { NavHashLink } from "react-router-hash-link"; // 👈 Import this
import "../Css/Navbar.css";

function Navbar({ onGetStarted }) {
  return (
    <nav className="navbar">
      <div className="logo">EduAI</div>

      <div className="menu">
        {/* Use to="/#id" to ensure it works from any page */}
        <NavHashLink 
          smooth 
          to="/#hero" 
          activeClassName="active"
        >Home</NavHashLink>

        <NavHashLink 
          smooth 
          to="/#tool"
        >Toolkit</NavHashLink>

        <NavHashLink 
          smooth 
          to="/#aboutus"
        >About us</NavHashLink>

        <NavHashLink 
          smooth 
          to="/#faq"
        >FAQ</NavHashLink> 
      </div>

      <button className="btn" onClick={onGetStarted}>
        Get Started
      </button>
    </nav>
  );
}

export default Navbar;