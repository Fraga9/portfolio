"use client"

import { useState, useEffect } from "react"
import Container from "../layout/Container"


function LandingSection() {
  const [scrollPos, setScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Fondo degradado */}
      <div
        className="fixed inset-0 z-[-2]"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #000000 70%, #0a0060 100%)",
        }}
      />

      {/* Efecto de luz/neón inferior */}
      <div
        className="fixed bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-blue-600/20 to-transparent z-[-1]"
        style={{
          transform: `translateY(${Math.min(scrollPos * 0.5, 200)}px)`,
          opacity: Math.max(1 - scrollPos / 700, 0),
        }}
      />

      {/* Haz luminoso */}
      <div
        className="fixed bottom-0 left-[50%] w-[800px] h-[400px] rounded-[100%] translate-x-[-50%] bg-blue-500/15 blur-[100px] z-[-1]"
        style={{
          transform: `translate(-50%, ${Math.min(scrollPos * 0.3, 100)}px)`,
          opacity: Math.max(1 - scrollPos / 600, 0),
        }}
      />

      {/* Barra de navegación */}
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
          scrollPos > 50 ? "py-3 bg-black/80 backdrop-blur-md" : "py-6"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/src/assets/logo.png"
                alt="Logo"
                className="h-12 w-auto"
              />
            </div>

            {/* Navegación */}
            <div className="hidden md:flex">
              <nav className="flex items-center">
                <ul className="flex space-x-1.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                  <li>
                    <a
                      href="#"
                      className="px-5 py-2 text-black bg-[#d0ff00] rounded-full text-sm font-medium block hover:bg-[#c5f000] transition-colors"
                    >
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features"
                      className="px-5 py-2 text-white hover:text-blue-300 rounded-full text-sm font-medium block transition-colors"
                    >
                      Características
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="px-5 py-2 text-white hover:text-blue-300 rounded-full text-sm font-medium block transition-colors"
                    >
                      Precios
                    </a>
                  </li>
                  <li>
                    <a
                      href="#support"
                      className="px-5 py-2 text-white hover:text-blue-300 rounded-full text-sm font-medium block transition-colors"
                    >
                      Soporte
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Botón carrito */}
            <div className="flex items-center">
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-[#d0ff00] text-black hover:bg-[#c5f000] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Contenido principal */}
      <Container className="h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lado izquierdo: Texto */}
          <div className="md:w-1/2 md:pr-8 text-center md:text-left mb-12 md:mb-0">
            <div className="mb-8">
              {/* Logotipos de colaboración, como Framer x Work Louder */}
              <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/10">
                <span className="font-bold text-white">Marca</span>
                <span className="text-gray-400">×</span>
                <span className="font-bold text-white">Colaborador</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white">
                Producto <span className="text-blue-400">Increíble</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-md">
                Nuestras herramientas hacen que el trabajo se sienta como un juego, ayudándote a crear tu mejor trabajo.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-3 bg-[#d0ff00] hover:bg-[#c5f000] text-black rounded-full font-medium transition-colors flex items-center">
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
              src="src\assets\set4.jpg"
              alt="Product"
              className="w-full rounded-xl shadow-lg relative z-10"
            />

            {/* Efecto de resplandor debajo del producto */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/4 h-1/8 bg-blue-500/30 blur-2xl rounded-full z-0"></div>
          </div>
        </div>
      </Container>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70">
        <p className="text-sm mb-2">Desplázate para más</p>
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
