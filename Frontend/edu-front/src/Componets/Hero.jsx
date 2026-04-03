import React from "react";
import "../Css/Hero.css";
import videoPreview from "../assets/preview.mp4"; // replace with your video file

function Hero() {
  return (
    <div className="hero">
      <div className="left">
        <p className="tag">AI-Powered Study Platform</p>

        <h1>
          AI <span>Technical</span> Learning <span>Assistance</span>
        </h1>

        <p className="desc">
          Experience a personalized education journey that follows you from the classroom to your home. Our AI assistant provides 24/7 support, bridging the gap between offline study and online excellence.
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