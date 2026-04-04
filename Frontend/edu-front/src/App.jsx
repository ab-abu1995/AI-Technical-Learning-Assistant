import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Check these paths carefully (Components vs Componets)
import Navbar from "./Componets/Navbar"; 
import Hero from "./Componets/Hero";
import ToolsSection from "./Componets/ToolsSection";
import StatsSection from "./Componets/StatsSection";
import UserRatings from "./Componets/UserRatings";
import Footer from "./Componets/Footer";
import AIInterface from "./Componets/AIInterface";
import Login from "./Componets/Login"; 

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <Router>
      <Navbar onGetStarted={openLogin} /> 

      <Routes>
        <Route path="/" element={
            <>
              <Hero />
              <ToolsSection />
              <StatsSection />
              <UserRatings />
              <Footer />
            </>
          }
        />
        <Route path="/ai" element={<AIInterface />} />
      </Routes>

      <Login isOpen={isLoginOpen} onClose={closeLogin} />
    </Router>
  );
}

export default App;