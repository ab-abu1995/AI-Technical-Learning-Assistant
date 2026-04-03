import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Componets/Navbar";
import Hero from "./Componets/Hero";
import ToolsSection from "./Componets/ToolsSection";
import StatsSection from "./Componets/StatsSection";
import UserRatings from "./Componets/UserRatings";
import Footer from "./Componets/Footer";
import AIInterface from "./Componets/AIInterface";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar stays fixed for all pages */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ToolsSection />
              <StatsSection />
              <UserRatings />
              <Footer />
            </>
          }
        />

        {/* AI Interface Page */}
        <Route
          path="/ai"
          element={
            <>
              <AIInterface />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;