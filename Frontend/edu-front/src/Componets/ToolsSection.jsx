import ToolCard from "./ToolCard";
import "../Css/ToolsSection.css";
function ToolsSection() {
  return (
    <div  className="tools-section" id="tool">
      
      {/* Top Badge */}
      <div className="badge">AI STUDY TOOLS</div>

      {/* Title */}
      <h1 className="title">
        EVERYTHING YOU NEED TO <span>ACE YOUR CLASSES</span>
      </h1>

      <p className="subtitle">
        Powerful AI tools designed for every part of your academic journey
      </p>

      {/* Cards */}
      <div className="tools-grid">
        <ToolCard 
          icon="📂"
          title="Offline Learning Power"
          description="Upload your study materials "
        />

        <ToolCard 
          icon="📗"
          title="Teachers Source Uploader"
          description="Comprehensive study materials"
        />

        <ToolCard 
          icon="🟨"
          title="Personalized Assistance"
          description="Memorize concepts faster"
        />

        <ToolCard 
          icon="✅"
          title="AI PRACTICE TEST"
          description="Prepare for any exam"
        />

       
      </div>

    </div>
  );
}

export default ToolsSection;