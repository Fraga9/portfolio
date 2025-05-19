"use client"

import { useState } from "react"
import Container from "../layout/Container"
import PricingCard from "../ui/PricingCard"

function Pricing({ id }) {
  const [isAnnual, setIsAnnual] = useState(true)

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Para proyectos personales y experimentación",
      features: [
        "Componentes básicos",
        "Documentación completa",
        "Soporte comunitario",
        "1 proyecto",
        "Exportación limitada",
      ],
      cta: "Comenzar gratis",
      color: "#00c8ff", // Azul
      accent: "#d0ff00", // Amarillo/lima
      position: "left",
      highlight: false,
      tag: null,
    },
    {
      name: "Pro",
      price: { monthly: 12, annual: 96 },
      description: "Para diseñadores y desarrolladores",
      features: [
        "Todos los componentes",
        "Actualizaciones prioritarias",
        "Soporte por email",
        "Proyectos ilimitados",
        "Exportación a cualquier formato",
        "Personalización avanzada",
      ],
      cta: "Elegir Pro",
      color: "#d0ff00", // Amarillo/lima
      accent: "#ff5500", // Naranja
      position: "right",
      highlight: true,
      tag: "Popular",
    },
    {
      name: "Teams",
      price: { monthly: 49, annual: 468 },
      description: "Para equipos y agencias",
      features: [
        "Todo en Pro",
        "Panel de administración",
        "Soporte prioritario 24/7",
        "Colaboración en tiempo real",
        "Controles de acceso",
        "Onboarding personalizado",
      ],
      cta: "Contactar ventas",
      color: "#ff5500", // Naranja
      accent: "#00c8ff", // Azul
      position: "left",
      highlight: false,
      tag: null,
    },
  ]

  return (
    <section id={id} className="py-24 bg-black relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-blue-950/30 z-0" />

      {/* Círculos decorativos */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-lime-500/10 blur-3xl" />

      <Container className="relative z-10">
        {/* Encabezado */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/10">
            <span className="text-white text-sm font-medium">Precios</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Precios <span className="text-[#d0ff00]">transparentes</span>
          </h2>

          <p className="text-xl text-gray-400 mb-8">
            Elige el plan que se ajuste a tus necesidades. Sin cargos sorpresa.
          </p>

          {/* Switch para cambiar entre mensual y anual */}
          <div className="inline-flex p-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all ${
                !isAnnual ? "bg-[#d0ff00] text-black shadow-lg shadow-[#d0ff00]/20" : "text-white hover:bg-white/10"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all ${
                isAnnual ? "bg-[#d0ff00] text-black shadow-lg shadow-[#d0ff00]/20" : "text-white hover:bg-white/10"
              }`}
            >
              Anual <span className="text-xs opacity-90">(20% dto.)</span>
            </button>
          </div>
        </div>

        {/* Tarjetas de precio */}
        <div className="space-y-12 md:space-y-16">
          {plans.map((plan, idx) => (
            <PricingCard
              key={idx}
              name={plan.name}
              price={isAnnual ? (plan.price.annual / 12).toFixed(2) : plan.price.monthly}
              annualPrice={plan.price.annual}
              isAnnual={isAnnual}
              description={plan.description}
              features={plan.features}
              cta={plan.cta}
              color={plan.color}
              accent={plan.accent}
              position={plan.position}
              highlight={plan.highlight}
              tag={plan.tag}
            />
          ))}
        </div>

        {/* Preguntas frecuentes resumidas */}
        <div className="mt-24 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">¿Tienes preguntas?</h3>

          <p className="text-gray-400 mb-8">
            Consulta nuestras{" "}
            <a href="#" className="text-[#d0ff00] hover:underline font-medium">
              preguntas frecuentes
            </a>{" "}
            o{" "}
            <a href="#" className="text-[#d0ff00] hover:underline font-medium">
              contáctanos
            </a>
          </p>

          {/* Nota sobre garantía */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/10">
            <svg className="w-5 h-5 mr-3 text-[#d0ff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-sm font-medium">Garantía de devolución de 30 días, sin preguntas</span>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Pricing
