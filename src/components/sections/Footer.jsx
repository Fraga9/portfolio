"use client"

import { useState, useEffect, useRef } from "react"
import Container from "../layout/Container"
import NowPlaying from "../NowPlaying"
import LastFmLink from "../LastFmLink"

function Footer({ id }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const footerRef = useRef(null)

  // Rastrear posición del mouse para efectos interactivos
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Calcular ángulos para efectos basados en el mouse
  const calcRotation = (idx) => {
    const baseAngle = (mousePosition.x / window.innerWidth) * 5 - 2.5
    return baseAngle + idx * 0.2
  }

  const socialLinks = [
    { name: "Twitter", icon: "𝕏", url: "https://twitter.com/Osifraga" },
    { name: "LinkedIn", icon: "in", url: "https://www.linkedin.com/in/osifraga" },
    { name: "GitHub", icon: "⌘", url: "https://github.com/Fraga9" },
    { name: "Instagram", icon: "📷", url: "https://www.instagram.com/Osifraga" },
  ]

  return (
    <footer id={id} ref={footerRef} className="relative pt-24 pb-12 overflow-hidden bg-black text-white">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-blue-950/30 z-0" />

      {/* Efecto de "noise" para textura */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      <Container className="relative z-10">
        {/* Logo flotante con efecto 3D */}
        <div className="relative flex justify-center mb-12">
          <div
            className="text-4xl font-bold tracking-tight relative"
            style={{
              transform: `perspective(500px) rotateX(${
                (mousePosition.y / window.innerHeight) * 5 - 2.5
              }deg) rotateY(${(mousePosition.x / window.innerWidth) * 5 - 2.5}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <span className="relative z-10 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Héctor<span className="text-[#d0ff00]">Garza</span>
            </span>
            <span className="absolute -inset-0.5 blur-sm bg-blue-400/30 rounded-lg" />
          </div>
        </div>

        {/* Contenido principal del footer organizado en 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {/* Columna izquierda: Sobre mí y navegación */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Sobre Mí</h3>
              <p className="text-gray-400">
                Ingeniero en Tecnologías Computacionales con experiencia en desarrollo Fullstack. Apasionado por crear
                soluciones innovadoras utilizando las últimas tecnologías y aplicando conceptos de Inteligencia
                Artificial.
              </p>
              <div  
                className="inline-block px-4 py-2 text-sm border rounded-full bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
                style={{ backdropFilter: "blur(8px)" }}
              >
                garzahector1013@gmail.com
              </div>
            </div>

            {/* Navegación - secciones existentes */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Navegación</h3>
              <div className="grid grid-cols-2 gap-2">
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </a>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  Experiencia
                </a>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                  Proyectos
                </a>
                <a href="#support" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </a>
              </div>
            </div>
          </div>

          {/* Columna derecha: Redes sociales y Last.fm */}
          <div className="space-y-8">
            {/* Redes sociales */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Conéctate</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="flex items-center justify-center w-10 h-10 transition-transform bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl hover:scale-110"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-lg">{social.icon}</span>
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
                  Currently Listening
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
            © {new Date().getFullYear()} Héctor Garza. Todos los derechos reservados.
          </p>
          <div className="flex items-center mt-4 space-x-6 md:mt-0">
            <span className="text-xs text-gray-500">
              Hecho con <span className="text-[#d0ff00]">♥</span> en México
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
