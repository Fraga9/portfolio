"use client"

import { useState, useEffect } from "react"
import Container from "../layout/Container"
import Header from "./Header"

function LandingSection() {
  const [scrollPos, setScrollPos] = useState(0)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY)

      // Detectar qué sección está visible actualmente
      const sections = document.querySelectorAll("section[id], footer[id]");

      // Verificar dónde estamos en la página
      const scrollPosition = window.scrollY + window.innerHeight * 0.5;

      // Verificar si estamos cerca del final de la página
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (isNearBottom) {
        // Si estamos cerca del final, activar la sección support (footer)
        setActiveSection("support");
      } else {
        // Detección normal
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute("id");

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(sectionId);
          }
        });
      }

      // Si estamos al inicio de la página, establecer "home" como activo
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    }

    window.addEventListener("scroll", handleScroll);

    // Ejecutar una vez al cargar para establecer la sección inicial
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-16 md:pt-24">
      {/* Fondo degradado */}
      <div
        className="fixed inset-0 z-[-2]"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #000000 70%, #0a0060 100%)",
        }}
      />

      {/* Efecto de luz/neón inferior */}
      <div
        className="fixed bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-blue-600/20 to-transparent z-[-1]"
        style={{
          transform: `translateY(${Math.min(scrollPos * 0.5, 200)}px)`,
          opacity: Math.max(1 - scrollPos / 700, 0),
        }}
      />

      {/* Haz luminoso */}
      <div
        className="fixed bottom-0 left-[50%] w-[800px] h-[400px] rounded-[100%] translate-x-[-60%] bg-blue-500/15 blur-[100px] z-[-1]"
        style={{
          transform: `translate(-50%, ${Math.min(scrollPos * 0.3, 100)}px)`,
          opacity: Math.max(1 - scrollPos / 600, 0),
        }}
      />

      {/* Barra de navegación */}
      <Header scrollPos={scrollPos} activeSection={activeSection} />

      {/* Contenido principal */}
      <Container className="h-full flex items-center py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Lado izquierdo: Texto */}
          <div className="w-full text-center md:text-left mb-12 md:mb-0">
            <div className="mb-8">
              {/* Logotipos de colaboración, como Framer x Work Louder */}
              <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/10">
                <span className="font-bold text-white">ITC</span>
                <span className="text-gray-400">×</span>
                <span className="font-bold text-white">TEC</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white">
                Héctor <span className="text-blue-400">Garza</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-md mx-auto md:mx-0">
                Nuestras herramientas hacen que el trabajo se sienta como un juego, ayudándote a crear tu mejor trabajo.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="w-full sm:w-auto px-8 py-3 bg-[#d0ff00] hover:bg-[#c5f000] text-black rounded-full font-medium transition-colors flex items-center justify-center sm:justify-start">
                  Pre-ordenar ahora
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="text-gray-400 text-sm">
                  Desde <span className="text-white font-medium">$149</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lado derecho: Imagen del producto */}
          <div className="md:w-1/2 relative">
            <img
              src="src/assets/set4.jpg"
              alt="Product"
              className="w-full mx-auto rounded-xl shadow-lg relative z-10"
              width="600"
              height="400"
              loading="eager"
            />
          </div>
        </div>
      </Container>

      {/* Indicador de scroll - Oculto en móvil porque puede superponerse con el contenido */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center text-white/70">
        <p className="text-sm mb-2">Desplázate para ver más</p>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div
            className="w-1 bg-[#d0ff00] rounded-full animate-pulse"
            style={{ height: "30%", animationDuration: "1.5s" }}
          />
        </div>
      </div>
    </section>
  )
}

export default LandingSection