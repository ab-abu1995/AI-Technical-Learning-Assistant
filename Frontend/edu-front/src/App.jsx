import Navbar from "./Componets/Navbar";
import Hero from "./Componets/Hero";
import ToolsSection from "./Componets/ToolsSection";
import StatsSection from "./Componets/StatsSection";
import UserRatings from "./Componets/UserRatings";
import Footer from "./Componets/Footer";
function App() {
  return (
    <div>
      <Navbar />
      <Hero /> 
      <ToolsSection /> 
      <StatsSection />
      <UserRatings/>
      <Footer/>
    </div>
  );
}

export default App;