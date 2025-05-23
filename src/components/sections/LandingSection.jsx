"use client"

import { useState, useEffect, useRef } from "react"
import Container from "../layout/Container"
import Header from "./Header"

function LandingSection() {
  const [scrollPos, setScrollPos] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const bubbleRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY)

      // Detectar qué sección está visible actualmente
      const sections = document.querySelectorAll("section[id], footer[id]")

      // Verificar dónde estamos en la página
      const scrollPosition = window.scrollY + window.innerHeight * 0.5

      // Verificar si estamos cerca del final de la página
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200

      if (isNearBottom) {
        // Si estamos cerca del final, activar la sección support (footer)
        setActiveSection("support")
      } else {
        // Detección normal
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 100
          const sectionHeight = section.offsetHeight
          const sectionId = section.getAttribute("id")

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId)
          }
        })
      }

      // Si estamos al inicio de la página, establecer "home" como activo
      if (window.scrollY < 100) {
        setActiveSection("home")
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Ejecutar una vez al cargar para establecer la sección inicial
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Generic function to handle any social media click with animation
  const handleSocialClick = (url) => {
    if (isAnimating) return

    setIsAnimating(true)

    // Get the click position for animation centering
    const buttonRect = buttonRef.current.getBoundingClientRect()
    const buttonCenterX = buttonRect.left + buttonRect.width / 2
    const buttonCenterY = buttonRect.top + buttonRect.height / 2

    // Calculate maximum size to cover the screen
    const maxSize = Math.sqrt(
      Math.pow(Math.max(buttonCenterX, window.innerWidth - buttonCenterX) * 2, 2) +
        Math.pow(Math.max(buttonCenterY, window.innerHeight - buttonCenterY) * 2, 2),
    )

    // Configure initial bubble position
    if (bubbleRef.current) {
      bubbleRef.current.style.top = `${buttonCenterY}px`
      bubbleRef.current.style.left = `${buttonCenterX}px`
      bubbleRef.current.style.width = "0"
      bubbleRef.current.style.height = "0"
      bubbleRef.current.style.opacity = "1"

      // Force reflow to make animation work
      bubbleRef.current.offsetWidth

      // Expand the bubble
      bubbleRef.current.style.width = `${maxSize}px`
      bubbleRef.current.style.height = `${maxSize}px`

      // After a moment, collapse bubble and redirect
      setTimeout(() => {
        bubbleRef.current.style.opacity = "0"

        // Redirect after animation completes
        setTimeout(() => {
          window.open(url, "_blank")
          setIsAnimating(false)
        }, 300)
      }, 400)
    }
  }

  // Replace the LinkedIn click handler to use the generic social click handler
  const handleLinkedInClick = (e) => {
    e.preventDefault()
    handleSocialClick("https://www.linkedin.com/in/osifraga")
  }

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

      {/* Elemento de burbuja para la animación */}
      <div
        ref={bubbleRef}
        className="fixed rounded-full bg-[#d0ff00] pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
      ></div>

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
                Ingeniero en Tecnologías Computacionales con experiencia en Fullstack, especializado en desarrollo web y
                móvil. Apasionado por la tecnología, la innovación y la Inteligencia Artificial.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  ref={buttonRef}
                  onClick={handleLinkedInClick}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  disabled={isAnimating}
                  className={`
                    cursor-pointer
                    group w-full sm:w-auto px-8 py-3.5 
                    bg-gradient-to-r from-[#d0ff00] via-[#c5f000] to-[#d0ff00] 
                    hover:from-[#c5f000] hover:via-[#b8e000] hover:to-[#c5f000]
                    active:from-[#b8e000] active:via-[#abd000] active:to-[#b8e000]
                    text-black rounded-full font-semibold 
                    transition-all duration-300 ease-out
                    transform hover:scale-105 active:scale-95
                    hover:shadow-lg hover:shadow-[#d0ff00]/30
                    border-2 border-transparent hover:border-[#d0ff00]/20
                    backdrop-blur-sm
                    flex items-center justify-center sm:justify-start 
                    relative overflow-hidden
                    disabled:opacity-70 disabled:cursor-not-allowed
                    disabled:hover:scale-100 disabled:hover:shadow-none
                    before:absolute before:inset-0 before:bg-gradient-to-r 
                    before:from-transparent before:via-white/20 before:to-transparent
                    before:translate-x-[-100%] hover:before:translate-x-[100%]
                    before:transition-transform before:duration-1200
                    ${isAnimating ? 'animate-pulse' : ''}
                  `}
                >
                  {/* Background glow effect */}
                  <div className={`
                    absolute inset-0 rounded-full bg-[#d0ff00]/30 blur-md
                    transition-all duration-300 ease-out
                    ${isHovering ? 'scale-110 opacity-100' : 'scale-100 opacity-0'}
                  `} />
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center">
                    <svg
                      className={`
                        w-5 h-5 mr-2.5 transition-all duration-300
                        ${isHovering ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
                      `}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    
                    <span className={`
                      font-semibold transition-all duration-300
                      ${isHovering ? 'tracking-wide' : 'tracking-normal'}
                    `}>
                      LinkedIn
                    </span>
                    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`
                        h-4 w-4 ml-2 transition-all duration-300 ease-out
                        ${isHovering ? 'translate-x-1 scale-110' : 'translate-x-0 scale-100'}
                      `}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>

                  {/* Ripple effect on click */}
                  <div className={`
                    absolute inset-0 rounded-full 
                    ${isAnimating ? 'animate-ping bg-[#d0ff00]/40' : ''}
                  `} />
                </button>
              </div>
            </div>
          </div>

          {/* Lado derecho: Imagen del producto */}
          <div className="relative p-10">
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