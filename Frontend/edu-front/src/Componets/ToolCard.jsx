import React from "react";
import { useNavigate } from "react-router-dom";

function ToolCard({ icon, title, description }) {
  const navigate = useNavigate();

  return (
    <div
      className="tool-card"
      onClick={() => navigate("/ai")}  // 👈 THIS LINE
      style={{ cursor: "pointer" }}
    >
      <div className="tool-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default ToolCard;