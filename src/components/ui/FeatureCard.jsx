"use client"

import { useState } from "react"

function FeatureCard({ title, description, icon, color, position, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="rounded-3xl overflow-hidden bg-zinc-800/50 backdrop-blur-sm border border-white/5 transition-all duration-300 hover:shadow-lg"
      style={{
        boxShadow: isHovered ? `0 10px 30px ${color}20` : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Sección de color con información */}
        <div
          className={`p-8 md:p-10 ${position === "left" ? "md:order-1" : "md:order-2"}`}
          style={{ backgroundColor: color }}
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center justify-center px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full mb-4">
                <span className="text-black text-xs font-bold">FEATURE {index}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black">{title}</h3>
              <p className="text-black/80 font-medium">{description}</p>
            </div>

            <div className="mt-6">
              <button className="inline-flex items-center px-5 py-2 bg-black text-white rounded-full text-sm font-medium transition-transform hover:translate-x-1">
                explorar
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
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
            </div>
          </div>
        </div>

        {/* Sección de imagen/icono */}
        <div
          className={`bg-zinc-100 p-8 md:p-0 flex items-center justify-center ${position === "left" ? "md:order-2" : "md:order-1"}`}
        >
          <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
            {/* Icono grande */}
            <div className="text-[120px] md:text-[180px] opacity-90">{icon}</div>

            {/* Círculo de acento */}
            <div
              className="absolute w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: color,
                top: position === "left" ? "20%" : "70%",
                left: position === "left" ? "70%" : "20%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="text-3xl">{icon}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard
