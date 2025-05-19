"use client"

import { useState } from "react"

function PricingCard({
  name,
  price,
  annualPrice,
  isAnnual,
  description,
  features,
  cta,
  color,
  accent,
  position,
  highlight,
  tag,
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`rounded-3xl overflow-hidden transition-all duration-300 ${highlight ? "shadow-xl" : ""}`}
      style={{
        boxShadow: isHovered ? `0 20px 40px ${color}20` : highlight ? `0 10px 30px ${color}10` : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Sección de color con información */}
        <div
          className={`p-8 md:p-10 ${position === "left" ? "md:order-1" : "md:order-2"} ${
            position === "left" ? "md:col-span-2" : "md:col-span-3"
          }`}
          style={{ backgroundColor: color }}
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              {tag && (
                <div className="inline-flex items-center justify-center px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full mb-4">
                  <span className="text-black text-xs font-bold">{tag}</span>
                </div>
              )}

              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-black">{name}</h3>
              <p className="text-black/80 font-medium mb-6">{description}</p>

              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-black">${price}</span>
                <span className="ml-2 text-black/70">/mes</span>
              </div>

              {isAnnual && annualPrice > 0 && (
                <div className="mt-1 text-black/70 text-sm font-medium">${annualPrice} facturado anualmente</div>
              )}
            </div>

            <div className="mt-8">
              <button
                className="w-full py-3.5 px-6 bg-black text-white rounded-full text-sm font-medium transition-transform hover:translate-y-[-2px] flex items-center justify-center"
                style={{
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                {cta}
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
            </div>
          </div>
        </div>

        {/* Sección de características */}
        <div
          className={`bg-zinc-900 border border-white/5 p-8 md:p-10 ${
            position === "left" ? "md:order-2 md:col-span-3" : "md:order-1 md:col-span-2"
          }`}
        >
          <div className="h-full flex flex-col">
            <h4 className="text-lg font-semibold text-white mb-6">Lo que obtienes:</h4>

            <ul className="space-y-4 mb-8">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                    style={{ backgroundColor: accent }}
                  >
                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Círculos decorativos */}
            <div className="mt-auto relative h-16">
              <div
                className="absolute w-16 h-16 rounded-full opacity-20"
                style={{
                  backgroundColor: color,
                  top: position === "left" ? "50%" : "30%",
                  left: position === "left" ? "20%" : "70%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="absolute w-8 h-8 rounded-full opacity-40"
                style={{
                  backgroundColor: accent,
                  top: position === "left" ? "30%" : "70%",
                  left: position === "left" ? "60%" : "30%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="absolute w-4 h-4 rounded-full opacity-60"
                style={{
                  backgroundColor: color,
                  top: position === "left" ? "70%" : "40%",
                  left: position === "left" ? "80%" : "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingCard
