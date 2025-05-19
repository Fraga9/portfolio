// src/App.jsx
import LandingSection from './components/sections/LandingSection';
import Features from './components/sections/Features';
import Pricing from './components/sections/Pricing';
import Footer from './components/sections/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <LandingSection />
      <Features id="features" />
      <Pricing id="pricing" />
      <Footer />
    </div>
  );
}

export default App;