import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Check these paths carefully (Components vs Componets)
import Navbar from "./Componets/Navbar"; 
import Hero from "./Componets/Hero";
import ToolsSection from "./Componets/ToolsSection";

import Footer from "./Componets/Footer";
import AIInterface from "./Componets/AIInterface";
import Login from "./Componets/Login"; 

import AboutUs from "./Componets/AboutUs"; 
 import FAQ from "./Componets/FAQ";
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
              <AboutUs/>
              <FAQ/> 
              <Footer />
            </>
          }
        />
        <Route path="/ai-interface" element={<AIInterface />} />
      </Routes>

      <Login isOpen={isLoginOpen} onClose={closeLogin} />
    </Router>
  );
}

export default App;