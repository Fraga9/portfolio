// src/App.jsx
import { useEffect } from 'react';
import LandingSection from './components/sections/LandingSection';
import Projects from './components/sections/Pricing';
import Footer from './components/sections/Footer';
import Experience from './components/sections/Features';

function App() {
  // Aseguramos que los enlaces de anclaje funcionen correctamente con offset
  useEffect(() => {
    // Función para manejar los clics en enlaces de anclaje
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      
      // Solo procesar enlaces de anclaje internos
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Aplicar un desplazamiento para compensar el header fijo
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };
    
    // Agregar event listeners a todos los enlaces con anclas
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
    
    // Limpieza
    return () => {
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <LandingSection />
      <Experience id="features" />
      <Projects id="pricing" />
      <Footer id="support" />
    </div>
  );
}

export default App;