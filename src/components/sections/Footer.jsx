"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslation } from 'react-i18next'
import { track } from '@vercel/analytics'
import Container from "../layout/Container"
import NowPlaying from "../NowPlaying"
import LastFmLink from "../LastFmLink"

function Footer({ id }) {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [_scrollY, setScrollY] = useState(0)
  const footerRef = useRef(null)

  // Rastrear posición del mouse para efectos interactivos y scroll profundo
  useEffect(() => {
    let footerViewTracked = false

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Track deep scroll (footer visible) only once per session
      if (!footerViewTracked && footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect()
        const isFooterVisible = footerRect.top < window.innerHeight && footerRect.bottom > 0

        if (isFooterVisible) {
          footerViewTracked = true
          // Track event with Vercel Analytics
          track('Deep Scroll', {
            section: 'footer',
            scrolled_to_bottom: true
          })
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Calcular ángulos para efectos basados en el mouse
  const _calcRotation = (idx) => {
    const baseAngle = (mousePosition.x / window.innerWidth) * 5 - 2.5
    return baseAngle + idx * 0.2
  }

  const socialLinks = [
    {
      name: "Devpost",
      url: "https://devpost.com/garzahector1013",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 280 280" fill="currentColor">
          {/* 1. Este es el path del HEXÁGONO (reemplaza tu círculo) */}
          <path d="M140 0L259.76 70L259.76 210L140 280L20.24 210L20.24 70Z" transform="rotate(30 140 140)" />


          {/* 2. Este es el path de la "D", con el fill cambiado a "black" */}
          <g transform="translate(25, 17) scale(0.85, 0.85)">
            <path fill="black" d="M63.4 56h70.8c51.52 0 93.4 41.88 93.4 93.4s-41.88 93.4-93.4 93.4H63.4V56zm36.32 150.48h33.08c34.28 0 62.08-27.8 62.08-62.08s-27.8-62.08-62.08-62.08H99.72v124.16z" />
          </g>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/osifraga",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: "GitHub",
      url: "https://github.com/Fraga9",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      )
    }
  ]

  return (
    <footer id={id} ref={footerRef} className="relative pt-24 pb-12 overflow-hidden bg-black text-white">


      <Container className="relative z-10">


        {/* Contenido principal del footer organizado en 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {/* Columna izquierda: Sobre mí y navegación */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">{t('footer.aboutMe')}</h3>
              <p className="text-gray-400">
                {t('footer.aboutDescription')}
              </p>
              <a
                href="mailto:garzahector1013@gmail.com"
                onClick={() => {
                  // Track event with Vercel Analytics
                  track('Email Click', {
                    location: 'footer',
                    email: 'garzahector1013@gmail.com'
                  })
                }}
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 text-sm
                  border rounded-full
                  bg-white/5 hover:bg-white/10
                  border-white/10 hover:border-white/20
                  transition-all duration-300
                  hover:scale-105
                  group
                  cursor-pointer
                "
                style={{ backdropFilter: "blur(8px)" }}
                aria-label="Send email to garzahector1013@gmail.com"
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>garzahector1013@gmail.com</span>
              </a>
            </div>

            {/* Navegación - secciones existentes */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">{t('footer.navigation')}</h3>
              <div className="grid grid-cols-2 gap-2">
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.home')}
                </a>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.experience')}
                </a>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.projects')}
                </a>
                <a href="#support" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.contact')}
                </a>
              </div>
            </div>
          </div>

          {/* Columna derecha: Redes sociales y Last.fm */}
          <div className="space-y-8">
            {/* Redes sociales */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">{t('footer.connect')}</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    onClick={() => {
                      // Track event with Vercel Analytics
                      track('Social Link Click', {
                        platform: social.name,
                        location: 'footer',
                        url: social.url
                      })
                    }}
                    className="
                      group relative
                      flex items-center justify-center
                      w-12 h-12
                      text-white
                      bg-white/5 hover:bg-white/15
                      backdrop-blur-sm
                      rounded-xl
                      transition-all duration-300 ease-out
                      hover:scale-110 hover:shadow-lg hover:shadow-white/10
                      active:scale-95
                      border border-white/10 hover:border-white/20
                    "
                    aria-label={`Visit ${social.name} profile`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Icon */}
                    <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                      {social.icon}
                    </div>

                    {/* Hover glow effect */}
                    <div className="
                      absolute inset-0 rounded-xl
                      bg-gradient-to-br from-white/10 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                    " />
                  </a>
                ))}
              </div>
            </div>

            {/* Currently Listening */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-[#d0ff00]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                  {t('footer.currentlyListening')}
                </span>
              </h3>
              <div>
                <NowPlaying />
                <LastFmLink />
              </div>
            </div>
          </div>
        </div>

        {/* Franja inferior con copyright */}
        <div className="flex flex-col items-center justify-between pt-8 mt-12 border-t md:flex-row border-white/10">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Héctor Garza. {t('footer.rights')}
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
