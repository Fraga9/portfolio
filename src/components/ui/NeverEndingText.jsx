"use client"

import { useRef, useEffect } from "react"

function NeverEndingText({ text, speed = 50, direction = "left", className = "" }) {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const animationRef = useRef(null)
  const positionRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    const textElement = textRef.current

    if (!container || !textElement) return

    // Asegurarse de que el texto sea lo suficientemente largo para crear el efecto continuo
    const textWidth = textElement.offsetWidth
    const containerWidth = container.offsetWidth

    // Duplicar el texto hasta que sea al menos 3 veces el ancho del contenedor
    let repeats = Math.ceil((containerWidth * 3) / textWidth)
    repeats = Math.max(repeats, 3) // Al menos 3 repeticiones

    textElement.innerHTML = text.repeat(repeats)

    // Configurar la animación
    const animate = () => {
      if (!container) return

      const speed = direction === "left" ? -1 : 1
      positionRef.current += speed * 0.5

      // Reiniciar la posición cuando el texto se haya desplazado completamente
      const fullTextWidth = textElement.offsetWidth / repeats
      if (Math.abs(positionRef.current) >= fullTextWidth) {
        positionRef.current = 0
      }

      textElement.style.transform = `translateX(${positionRef.current}px)`
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [text, direction])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden whitespace-nowrap">
      <div ref={textRef} className={`inline-block ${className}`} style={{ willChange: "transform" }}>
        {text}
      </div>
    </div>
  )
}

export default NeverEndingText
