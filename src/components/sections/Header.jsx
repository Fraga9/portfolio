// components/sections/Header.jsx
import { useState, useEffect, useRef } from "react"
import Container from "../layout/Container"

function Header({ scrollPos, activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(scrollPos > 50)
  const menuRef = useRef(null)
  const mobileButtonRef = useRef(null)
  
  // Variables para rastrear el scroll previo
  const prevScrollPosRef = useRef(scrollPos);
  
  // Cerrar el menú móvil solo cuando hay un cambio de scroll significativo
  useEffect(() => {
    // Solo cerrar el menú si hay un cambio real en el scroll (no al hacer clic)
    const hasScrolled = Math.abs(scrollPos - prevScrollPosRef.current) > 5;
    
    if (scrollPos > 10 && mobileMenuOpen && hasScrolled) {
      setMobileMenuOpen(false);
    }
    
    // Actualizar estado de scroll para animaciones
    setIsScrolled(scrollPos > 50);
    
    // Actualizar la referencia de la posición anterior
    prevScrollPosRef.current = scrollPos;
  }, [scrollPos, mobileMenuOpen])
  
  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        !mobileButtonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mobileMenuOpen])
  
  // Cerrar el menú al presionar Escape
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [mobileMenuOpen])
  
  // Lista de elementos de navegación para mantener DRY
  const navItems = [
    { href: "#home", label: "Inicio", section: "home" },
    { href: "#features", label: "Experiencia", section: "features" },
    { href: "#pricing", label: "Proyectos", section: "pricing" },
    { href: "#support", label: "Contacto", section: "support" }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
        isScrolled 
          ? "py-2 bg-black/80 backdrop-blur-md shadow-lg" 
          : "py-4 md:py-6"
      }`}
      role="banner"
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#home" 
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d0ff00] rounded-lg"
              aria-label="Ir a inicio"
            >
              <img
                src="images/logo.png"
                alt="Logo"
                className="h-10 md:h-12 w-auto"
                width="auto"
                height="48"
              />
            </a>
          </div>

          {/* Navegación para escritorio - Centrada */}
          <div className="hidden md:block mx-auto">
            <nav className="flex items-center" aria-label="Navegación principal">
              <ul className="flex space-x-1.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                {navItems.map((item) => (
                  <li key={item.section}>
                    <a
                      href={item.href}
                      className={`px-5 py-2 rounded-full text-sm font-medium block transition-colors ${
                        activeSection === item.section
                          ? "text-black bg-[#d0ff00] shadow-sm"
                          : "text-white hover:text-[#d0ff00] focus:text-[#d0ff00]"
                      }`}
                      aria-current={activeSection === item.section ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Botón de menú móvil - Alineado a la derecha */}
          <div className="md:hidden ml-auto">
            <button
              ref={mobileButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white border border-white/10 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d0ff00]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Elemento vacío para mantener la disposición en escritorio */}
          <div className="hidden md:block"></div>
        </div>

        {/* Menú móvil */}
        <div 
          id="mobile-menu"
          ref={menuRef}
          className={`md:hidden mt-4 bg-black/90 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden transition-all duration-300 origin-top ${
            mobileMenuOpen 
              ? 'max-h-64 opacity-100 scale-y-100 translate-y-0' 
              : 'max-h-0 opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
          }`}
        >
          <nav className="py-2" aria-label="Navegación móvil">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={`mobile-${item.section}`}>
                  <a
                    href={item.href}
                    className={`px-5 py-3 block text-sm font-medium transition-colors ${
                      activeSection === item.section
                        ? "text-[#d0ff00] bg-white/5"
                        : "text-white hover:bg-white/5"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={activeSection === item.section ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}

export default Header