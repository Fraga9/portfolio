"use client"

import { useState, useEffect, useRef, startTransition, lazy, Suspense } from "react"
import { useTranslation } from 'react-i18next'
import { track } from '@vercel/analytics'
import { Analytics } from '../../hooks/useAnalytics'
import Container from "../layout/Container"
import Header from "./Header"
import NervTerminal from "./NervTerminal"
const Dither = lazy(() => import('./Dither'))


function LandingSection() {
  const { t } = useTranslation()
  const [scrollPos, setScrollPos] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [showTerminal, setShowTerminal] = useState(true)
  const [terminalGlow, setTerminalGlow] = useState(false)
  const bubbleRef = useRef(null)
  const buttonRef = useRef(null)
  const terminalGlowRef = useRef(null)

  useEffect(() => {
    let rafId = null
    // Cache la consulta de secciones fuera del handler para evitar querySelectorAll por frame
    const sections = document.querySelectorAll("section[id], footer[id]")
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        setScrollPos(currentScrollY)

        const scrollPosition = currentScrollY + window.innerHeight * 0.5
        const isNearBottom = window.innerHeight + currentScrollY >= document.body.offsetHeight - 200

        let newSection = "home"
        if (isNearBottom) {
          newSection = "support"
        } else if (currentScrollY >= 100) {
          sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100
            const sectionHeight = section.offsetHeight
            const sectionId = section.getAttribute("id")

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              newSection = sectionId
            }
          })
        }

        startTransition(() => setActiveSection(newSection))
        rafId = null
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Ejecutar una vez al cargar para establecer la sección inicial
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
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
    // Guard: verificar que el ref existe antes de acceder al DOM
    if (!buttonRef.current) return
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

    // Track with Google Analytics 4
    Analytics.trackSocialClick('linkedin')

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

    // Track with Google Analytics 4
    Analytics.trackSocialClick('github')

    window.open("https://github.com/Fraga9", "_blank")
  }

  // Terminal toggle handler
  const handleTerminalClick = (e) => {
    e.preventDefault()

    const newState = !showTerminal

    // Track event with Vercel Analytics
    track('Terminal Toggle', {
      action: newState ? 'open' : 'close',
      location: 'landing_section'
    })

    // Track with Google Analytics 4
    Analytics.trackTerminalToggle(newState)

    setShowTerminal(newState)
  }

  // CV Download handler
  const handleCVClick = (e) => {
    e.preventDefault()

    // Track event with Vercel Analytics
    track('CV Download', {
      location: 'landing_section',
      file: 'cv.pdf'
    })

    // Track with Google Analytics 4
    Analytics.trackCVDownload()

    // Download CV
    const link = document.createElement('a')
    link.href = '/cv.pdf'
    link.download = 'Hector_Garza_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-16 md:pt-24">
      {/* Fondo degradado base */}
      <div
        className="fixed inset-0 z-[-2]"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #000000 70%, #0a0060 100%)",
        }}
      />

      {/* Dither Effect Background */}
      <Suspense fallback={<div className="fixed inset-0 z-[-1] bg-black" />}>
        <div
          className="fixed inset-0 z-[-1]"
          style={{
            opacity: Math.max(1 - scrollPos / 800, 0.5),
          }}
        >
          <Dither
            waveColor={[0, 0.1, 0.4]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.2}
            colorNum={4}
            waveAmplitude={0.4}
            waveFrequency={3}
            waveSpeed={0.05}
          />
        </div>
      </Suspense>

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
                  aria-label="Connect on LinkedIn"
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
                  aria-label="View GitHub profile"
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
                  aria-label={showTerminal ? "Close interactive terminal" : "Open interactive terminal"}
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

                {/* CV Download button con estilo liquid glass */}
                <button
                  onClick={handleCVClick}
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
                  aria-label="Download CV"
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

                  {/* Download icon */}
                  <svg
                    className="
                      w-6 h-6 sm:w-7 sm:h-7 text-white
                      transition-all duration-300
                      group-hover:scale-110 group-hover:text-white
                      relative z-10
                    "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    {/* Document outline */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                    {/* Folded corner */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 3v6a1 1 0 001 1h6"
                    />
                    {/* Download arrow */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 11v6m0 0l-2-2m2 2l2-2"
                      className="group-hover:translate-y-0.5 transition-transform duration-300"
                    />
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
          <div className="relative p-4 md:p-4">
            {showTerminal && (
              <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <NervTerminal onClose={() => setShowTerminal(false)} />
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

export default LandingSection