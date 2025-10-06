"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslation } from 'react-i18next'
import { track } from '@vercel/analytics'
import Container from "../layout/Container"
import Header from "./Header"


function LandingSection() {
  const { t } = useTranslation()
  const [scrollPos, setScrollPos] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [_isGitHubHovering, setIsGitHubHovering] = useState(false)
  const [_isTerminalHovering, setIsTerminalHovering] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalGlow, setTerminalGlow] = useState(false)
  const bubbleRef = useRef(null)
  const buttonRef = useRef(null)
  const terminalGlowRef = useRef(null)

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

  // Easter egg: Destellos aleatorios en el botón de terminal
  useEffect(() => {
    if (!showTerminal) {
      terminalGlowRef.current = setInterval(() => {
        // 55% de probabilidad cada 3 segundos
        if (Math.random() < 0.55) {
          setTerminalGlow(true)
          setTimeout(() => setTerminalGlow(false), 1500)
        }
      }, 3000)
    }

    return () => {
      if (terminalGlowRef.current) clearInterval(terminalGlowRef.current)
    }
  }, [showTerminal])

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
    
    // Track event with Vercel Analytics
    track('LinkedIn Click', {
      location: 'landing_section',
      url: 'https://www.linkedin.com/in/osifraga'
    })
    
    handleSocialClick("https://www.linkedin.com/in/osifraga")
  }

  // GitHub click handler
  const handleGitHubClick = (e) => {
    e.preventDefault()
    
    // Track event with Vercel Analytics
    track('GitHub Click', {
      location: 'landing_section',
      url: 'https://github.com/Fraga9'
    })
    
    window.open("https://github.com/Fraga9", "_blank")
  }

  // Terminal toggle handler
  const handleTerminalClick = (e) => {
    e.preventDefault()
    
    // Track event with Vercel Analytics
    track('Terminal Toggle', {
      action: showTerminal ? 'close' : 'open',
      location: 'landing_section'
    })
    
    setShowTerminal(!showTerminal)
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
      <Container className="h-full flex items-center py-12 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 w-full">
          {/* Lado izquierdo: Texto */}
          <div className="w-full text-center md:text-left mb-12 md:mb-0">
            <div className="mb-8">
              {/* Logotipos de colaboración, como Framer x Work Louder */}
              <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/10">
                <span className="font-bold text-white">ITC</span>
                <span className="text-gray-400">×</span>
                <span className="font-bold text-white">TEC</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
                {t('hero.greeting')} <span className="text-blue-400">{t('hero.name')}</span>
              </h1>
              <p className="text-lg md:text-lg mb-8 text-gray-300 max-w-md mx-auto md:mx-0">
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
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
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>

                    <span className={`
                      font-semibold transition-all duration-300
                      ${isHovering ? 'tracking-wide' : 'tracking-normal'}
                    `}>
                      {t('hero.linkedin')}
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

                {/* GitHub button con estilo liquid glass */}
                <button
                  onClick={handleGitHubClick}
                  onMouseEnter={() => setIsGitHubHovering(true)}
                  onMouseLeave={() => setIsGitHubHovering(false)}
                  className="
                    group relative w-14 h-14 sm:w-16 sm:h-16
                    bg-white/10 backdrop-blur-xl
                    border border-white/20
                    rounded-full
                    transition-all duration-500 ease-out
                    hover:bg-white/20 hover:border-white/30
                    hover:scale-110 hover:shadow-2xl hover:shadow-white/20
                    active:scale-95
                    flex items-center justify-center
                    overflow-hidden
                  "
                >
                  {/* Liquid glass effect */}
                  <div className="
                    absolute inset-0 rounded-full
                    bg-gradient-to-br from-white/20 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  " />

                  {/* Inner glow */}
                  <div className="
                    absolute inset-1 rounded-full
                    bg-gradient-to-br from-white/10 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  " />

                  {/* GitHub icon */}
                  <svg
                    className="
                      w-6 h-6 sm:w-7 sm:h-7 text-white
                      transition-all duration-300
                      group-hover:scale-110 group-hover:text-white
                      relative z-10
                    "
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>

                  {/* Shine effect */}
                  <div className="
                    absolute top-0 left-0 w-full h-full rounded-full
                    bg-gradient-to-br from-white/30 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-all duration-500
                    transform group-hover:rotate-180
                  " />
                </button>

                {/* Terminal button con estilo liquid glass */}
                <button
                  onClick={handleTerminalClick}
                  onMouseEnter={() => setIsTerminalHovering(true)}
                  onMouseLeave={() => setIsTerminalHovering(false)}
                  className={`
                    group relative w-14 h-14 sm:w-16 sm:h-16
                    bg-white/10 backdrop-blur-xl
                    border border-white/20
                    rounded-full
                    transition-all duration-500 ease-out
                    hover:bg-white/20 hover:border-white/30
                    hover:scale-110 hover:shadow-2xl hover:shadow-white/20
                    active:scale-95
                    flex items-center justify-center
                    overflow-hidden
                    ${terminalGlow ? 'shadow-2xl shadow-[#d0ff00]/50 border-[#d0ff00]/40 bg-[#d0ff00]/10' : ''}
                  `}
                >
                  {/* Liquid glass effect */}
                  <div className="
                    absolute inset-0 rounded-full
                    bg-gradient-to-br from-white/20 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  " />

                  {/* Inner glow */}
                  <div className="
                    absolute inset-1 rounded-full
                    bg-gradient-to-br from-white/10 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  " />

                  {/* Easter egg glow effect */}
                  {terminalGlow && (
                    <div className="
                      absolute inset-0 rounded-full
                      bg-[#d0ff00]/30 blur-md
                      animate-pulse
                    " />
                  )}

                  {/* Terminal icon */}
                  <svg
                    className={`
                      w-6 h-6 sm:w-7 sm:h-7 text-white
                      transition-all duration-300
                      group-hover:scale-110 group-hover:text-white
                      relative z-10
                      ${terminalGlow ? 'text-green-300 drop-shadow-lg' : ''}
                    `}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    {/* Terminal window */}
                    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" />

                    {/* Header bar */}
                    <line x1="3" y1="9" x2="21" y2="9" strokeWidth="1" />

                    {/* Terminal dots */}
                    <circle cx="6" cy="7" r="0.5" fill="currentColor" />
                    <circle cx="8" cy="7" r="0.5" fill="currentColor" />
                    <circle cx="10" cy="7" r="0.5" fill="currentColor" />

                    {/* Prompt */}
                    <path d="m7 12 2 2-2 2" strokeWidth="2" />
                    <line x1="11" y1="16" x2="16" y2="16" strokeWidth="2" />

                    {/* Cursor */}
                    <rect x="17" y="15" width="1" height="2" fill="currentColor">
                      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                    </rect>
                  </svg>

                  {/* Shine effect */}
                  <div className="
                    absolute top-0 left-0 w-full h-full rounded-full
                    bg-gradient-to-br from-white/30 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-all duration-500
                    transform group-hover:rotate-180
                  " />
                </button>
              </div>
            </div>
          </div>

          {/* Lado derecho: Terminal interactiva */}
          <div className="relative p-4 md:p-10">
            {showTerminal && (
              <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <AnimatedAsciiArt />
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Indicador de scroll - Oculto en móvil porque puede superponerse con el contenido */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center text-white/70">
        <p className="text-sm mb-2">{t('hero.scrollIndicator')}</p>
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

// Terminal funcional estilo NERV/Evangelion
function AnimatedAsciiArt() {
  const [systemStatus, setSystemStatus] = useState('ACTIVE')
  const [errorFlash, setErrorFlash] = useState(false)
  const [currentInput, setCurrentInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState([])
  const [isInitialized, setIsInitialized] = useState(false)
  const statusRef = useRef(null)
  const inputRef = useRef(null)

  const currentPath = "C:\\Users\\osifraga"

  // Sistema de comandos disponibles
  const commands = {
    help: {
      description: "Muestra todos los comandos disponibles",
      execute: () => [
        "═══════════════════════════════════════════════════════════",
        "                    COMANDOS DISPONIBLES",
        "═══════════════════════════════════════════════════════════",
        "",
        "help        - Muestra esta lista de comandos",
        "experiencia - Educación, experiencia laboral y skills",
        "proyecto    - Proyectos destacados (SmartColonia, LABNL...)",
        "contacto    - Email, LinkedIn, GitHub, teléfono",
        "sobre       - Información personal y logros",
        "clear       - Limpia la terminal",
        "",
        "Tip: Usa las flechas ↑↓ para navegar por el historial",
        "",
        "═══════════════════════════════════════════════════════════"
      ]
    },
    experiencia: {
      description: "Muestra experiencia profesional",
      execute: () => [
        "═══════════════════════════════════════════════════════════",
        "                  EXPERIENCIA PROFESIONAL",
        "═══════════════════════════════════════════════════════════",
        "",
        "🎓 EDUCACIÓN:",
        "   • B.S. Computer Science and Technology - TEC",
        "   • Aug 2022 - June 2026 (Expected)",
        "   • GPA: 4.0",
        "   • Concentración: Advanced AI for Data Science",
        "   • 100% Academic Merit Scholarship",
        "   • Xignux Challenge 2024 - Top 3 Finalist",
        "",
        "💼 EXPERIENCIA:",
        "   • Full Stack Intern, Cemex (Feb 2025 - Aug 2025)",
        "     └─ Desarrollé 5 aplicaciones web para operaciones Promexma",
        "     └─ Sistema LLM para soporte al cliente",
        "",
        "   • InStep Internship, Infosys (Jun 2024 - Aug 2024)",
        "     └─ Sistema de caché semántico con EdgeVerve chatbot",
        "     └─ Reducción del 90% en tiempo de procesamiento",
        "",
        "🚀 SKILLS:",
        "   • Languages: Python, JavaScript, C++, SQL, Java",
        "   • Frameworks: React, FastAPI, Django, LangChain, Flask",
        "   • Tools: Supabase, AWS, Firebase, OCI, GitHub",
        "",
        "═══════════════════════════════════════════════════════════"
      ]
    },
    proyecto: {
      description: "Lista proyectos destacados",
      execute: () => [
        "═══════════════════════════════════════════════════════════",
        "                    PROYECTOS DESTACADOS",
        "═══════════════════════════════════════════════════════════",
        "",
        "🏗️ SmartColonia: Neighborhood Management Platform",
        "   └─ Tech: FastAPI + React Native + Amazon S3 + Supabase",
        "   └─ SaaS con 3 niveles de usuario (Beta: 200 users)",
        "   └─ Control de acceso, pagos, anuncios y encuestas",
        "   └─ Proyección: 1,000 usuarios en 6 meses",
        "",
        "🏗️ Topografía Cemex: Topographic Management System",
        "   └─ Tech: React + FastAPI + PostgreSQL + Supabase",
        "   └─ Control de calidad topográfico en construcción vial",
        "   └─ Cálculos automáticos con cumplimiento SCT",
        "   └─ Demo: topografia-two.vercel.app",
        "",
        "📚 Acervo Bibliográfico Digital LABNL",
        "   └─ Tech: React + Axios + Google Sheets",
        "   └─ Colección bibliográfica del Laboratorio Ciudadano NL",
        "   └─ 20,000 usuarios mensuales, 19,900 visitas (Jun 2024)",
        "   └─ Website: labnlacervo.web.app",
        "",
        "═══════════════════════════════════════════════════════════"
      ]
    },
    contacto: {
      description: "Información de contacto",
      execute: () => [
        "═══════════════════════════════════════════════════════════",
        "                    INFORMACIÓN DE CONTACTO",
        "═══════════════════════════════════════════════════════════",
        "",
        "📧 EMAIL:",
        "   └─ garzahector1013@gmail.com",
        "",
        "🔗 LINKEDIN:",
        "   └─ linkedin.com/in/héctor-garza-fraga-6b660723a/",
        "",
        "🐙 GITHUB:",
        "   └─ github.com/Fraga9",
        "",
        "💼 DEVPOST:",
        "   └─ devpost.com/garzahector1013",
        "",
        "🌐 PORTFOLIO:",
        "   └─ osifraga.vercel.app",
        "",
        "📱 TELÉFONO:",
        "   └─ +52 81 1299 5975",
        "",
        "📍 UBICACIÓN:",
        "   └─ Monterrey, MX",
        "",
        "═══════════════════════════════════════════════════════════"
      ]
    },
    sobre: {
      description: "Información personal",
      execute: () => [
        "═══════════════════════════════════════════════════════════",
        "                      SOBRE MÍ",
        "═══════════════════════════════════════════════════════════",
        "",
        "👨‍💻 Héctor Eduardo Garza Fraga",
        "",
        "Computer Science student at Tecnológico de Monterrey with",
        "a 4.0 GPA and 100% Academic Merit Scholarship.",
        "Specializing in Advanced AI for Data Science.",
        "",
        "🎯 ÁREAS DE ESPECIALIZACIÓN:",
        "   • Full Stack Development (React, FastAPI, Django)",
        "   • Artificial Intelligence & Machine Learning",
        "   • LangChain & LLM Applications",
        "   • Cloud Infrastructure (AWS, Firebase, Supabase)",
        "   • Mobile Development (React Native)",
        "",
        "🏆 LOGROS:",
        "   • Xignux Challenge 2024 - Top 3 Finalist",
        "   • 100% Academic Merit Scholarship",
        "   • Built products serving 20,000+ monthly users",
        "",
        "═══════════════════════════════════════════════════════════"
      ]
    },
    clear: {
      description: "Limpia la terminal",
      execute: () => null // Comando especial
    }
  }

  // Inicialización de la terminal
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsInitialized(true)
      setTerminalHistory([
        `NERV Terminal v3.33 [Build 2024.07.16]`,
        `Sistema operativo: MAGI OS`,
        `Usuario: osifraga`,
        `Directorio: ${currentPath}`,
        ``,
        `Escribe 'help' para ver los comandos disponibles.`,
        ``
      ])
    }, 1000)

    // Estados del sistema
    statusRef.current = setInterval(() => {
      const statuses = ['ACTIVE', 'SYNCING', 'PATTERN BLUE', 'ERROR']
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      setSystemStatus(randomStatus)

      if (randomStatus === 'ERROR') {
        setErrorFlash(true)
        setTimeout(() => setErrorFlash(false), 300)
      }
    }, 5000)

    return () => {
      clearTimeout(initTimer)
      if (statusRef.current) clearInterval(statusRef.current)
    }
  }, [])

  // Manejar entrada de comandos
  const handleCommand = (input) => {
    const command = input.toLowerCase().trim()
    const newHistory = [...terminalHistory]

    // Agregar comando ejecutado
    newHistory.push(`${currentPath}> ${input}`)

    if (command === 'clear') {
      setTerminalHistory([])
      return
    }

    if (commands[command]) {
      const output = commands[command].execute()
      if (output) {
        newHistory.push(...output)
      }
    } else if (command === '') {
      // No hacer nada con comando vacío
    } else {
      newHistory.push(`ERROR: '${input}' no es un comando reconocido.`)
      newHistory.push(`Escribe 'help' para ver los comandos disponibles.`)
    }

    newHistory.push('') // Línea en blanco
    setTerminalHistory(newHistory)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput)
      setCurrentInput('')
    }
  }

  return (
    <div className="relative w-full max-w-full">
      {/* NERV Terminal Header */}
      <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-green-500/30 rounded-t-lg p-2 mb-0">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-[#d0ff00] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <span className="text-green-300 font-bold tracking-wider">MAGI-01</span>
          </div>
          <div className={`font-bold tracking-wider ${errorFlash ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
            {systemStatus}
          </div>
        </div>
      </div>

      {/* Terminal principal */}
      <div className="relative bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-b-lg overflow-hidden">
        {/* Efectos NERV */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Escaneo vertical */}
          <div
            className={`absolute w-full h-0.5 ${errorFlash ? 'bg-red-500/60' : 'bg-green-500/40'} blur-sm`}
            style={{
              animation: 'nervScan 3s linear infinite',
              boxShadow: `0 0 20px ${errorFlash ? '#ef4444' : '#22c55e'}`
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(90deg, ${errorFlash ? '#ef4444' : '#22c55e'} 1px, transparent 1px),
                linear-gradient(${errorFlash ? '#ef4444' : '#22c55e'} 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />

          {/* Hexágonos flotantes reducidos */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 ${errorFlash ? 'text-red-400' : 'text-green-400'} opacity-10`}
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                animation: `float ${4 + i * 0.5}s ease-in-out infinite alternate`,
                fontSize: '12px'
              }}
            >
              ⬢
            </div>
          ))}
        </div>

        {/* Terminal Output */}
        <div className="relative z-10 p-3 overflow-y-auto max-h-96">
          <div
            className={`font-mono text-xs leading-relaxed transition-colors duration-300 ${errorFlash ? 'text-red-300' : 'text-green-300'
              }`}
            style={{
              fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
              fontSize: 'clamp(10px, 2vw, 14px)'
            }}
          >
            {isInitialized && terminalHistory.map((line, index) => (
              <div
                key={index}
                className="mb-1 whitespace-pre-wrap"
                style={{
                  animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`
                }}
              >
                {line}
              </div>
            ))}

            {/* Input line */}
            {isInitialized && (
              <div className="flex items-center mt-2">
                <span className={`mr-2 ${errorFlash ? 'text-red-400' : 'text-green-400'}`}>
                  {currentPath}&gt;
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-transparent outline-none flex-1 text-green-300 caret-green-400"
                  style={{ fontSize: 'clamp(10px, 2vw, 14px)' }}
                  placeholder="Escribe un comando..."
                  autoFocus
                />
                <span className={`ml-1 w-2 h-4 ${errorFlash ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}></span>
              </div>
            )}
          </div>
        </div>

        {/* Status bar inferior */}
        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-t border-green-500/30 p-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-green-400">USUARIO: osifraga</span>
            <span className="text-green-400">SESIÓN: {isInitialized ? 'ACTIVA' : 'INICIANDO...'}</span>
            <span className={`${errorFlash ? 'text-red-400' : 'text-green-400'}`}>
              COMANDOS: {Object.keys(commands).length}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes nervScan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-8px) rotate(180deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        /* Scrollbar personalizado */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.5);
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.8);
        }
      `}</style>
    </div>
  )
}

export default LandingSection