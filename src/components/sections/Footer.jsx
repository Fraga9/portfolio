"use client"

import { useState, useEffect, useRef } from "react"
import Container from "../layout/Container"
import NeverEndingText from "../ui/NeverEndingText"

function Footer() {
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

  const links = [
    { name: "Inicio", url: "#" },
    { name: "Características", url: "#features" },
    { name: "Precios", url: "#pricing" },
    { name: "Blog", url: "#blog" },
    { name: "Contacto", url: "#contact" },
  ]

  const socialLinks = [
    { name: "Twitter", icon: "𝕏", url: "#" },
    { name: "LinkedIn", icon: "in", url: "#" },
    { name: "GitHub", icon: "⌘", url: "#" },
    { name: "Instagram", icon: "📷", url: "#" },
  ]

  return (
    <footer ref={footerRef} className="relative pt-24 pb-12 overflow-hidden bg-black text-white">
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
        <div className="relative flex justify-center mb-16">
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
              Tailwind<span className="text-[#d0ff00]">Landing</span>
            </span>
            <span className="absolute -inset-0.5 blur-sm bg-blue-400/30 rounded-lg" />
          </div>
        </div>

        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Sobre Nosotros</h3>
            <p className="text-gray-400 max-w-md">
              Creamos experiencias digitales únicas con React y Tailwind CSS. Nuestra misión es hacer que el diseño web
              sea accesible para todos.
            </p>
            <div
              className="inline-block px-4 py-2 mt-4 text-sm border rounded-full bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
              style={{ backdropFilter: "blur(8px)" }}
            >
              contacto@tailwindlanding.com
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {links.map((link, idx) => (
                <li key={idx} className="group">
                  <a href={link.url} className="relative inline-block text-gray-400 hover:text-white transition-colors">
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d0ff00] group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Conéctate</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  className="flex items-center justify-center w-10 h-10 transition-transform bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>

            <div className="pt-6">
              <p className="mb-2 text-sm text-gray-300">Suscríbete a nuestro newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/40 rounded-l-md border-0 focus:ring-2 ring-[#d0ff00]/50"
                />
                <button className="px-4 py-2 text-sm font-medium transition-colors bg-[#d0ff00] hover:bg-[#c5f000] text-black rounded-r-md">
                  Unirse
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Franja inferior con efecto de gradiente y glassmorphism */}
        <div className="flex flex-col items-center justify-between pt-12 mt-8 border-t md:flex-row border-white/10">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TailwindLanding. Todos los derechos reservados.
          </p>
          <div className="flex items-center mt-4 space-x-4 md:mt-0">
            <a href="#" className="text-xs text-gray-500 hover:text-white">
              Términos
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-white">
              Privacidad
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
