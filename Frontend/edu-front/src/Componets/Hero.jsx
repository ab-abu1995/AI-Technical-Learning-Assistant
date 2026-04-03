import React from "react";
import "./Hero.css";
import videoPreview from "../assets/preview.mp4"; // replace with your video file

function Hero() {
  return (
    <div className="hero">
      <div className="left">
        <p className="tag">⚡ AI-Powered Study Platform</p>

        <h1>
          Edu <span>Lite</span> for <span>education</span>
        </h1>

        <p className="desc">
          AI assistant for homework solving and smart learning.
        </p>

        <div className="buttons">
          <button className="primary">Try Now</button>
          <button className="secondary">Learn More</button>
        </div>
      </div>

      <div className="right">
        <div className="iphone-video">
          <video src={videoPreview} autoPlay loop muted />
        </div>
      </div>
    </div>
  );
}

export default Hero;