"use client"

import { useEffect, useRef, useState } from "react"

function Card({ children, className = "", variant = "default", index = 0, animateIn = false, onClick }) {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [_isHovered, setIsHovered] = useState(false)

  const variantClasses = {
    default: "bg-white rounded-xl shadow-md overflow-hidden",
    experience:
      "bg-black/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300",
    minimal:
      "bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer",
  }

  const selectedVariant = variantClasses[variant] || variantClasses.default

  useEffect(() => {
    if (!animateIn) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.disconnect()
      }
    }
  }, [animateIn])

  // Determinar la dirección de la animación basada en el índice
  const initialTransform = "translateY(40px)"
  const initialOpacity = 0

  const animationStyle = animateIn
    ? {
        transform: isVisible ? "translateY(0)" : initialTransform,
        opacity: isVisible ? 1 : initialOpacity,
        transition: isVisible
          ? `transform 0.6s cubic-bezier(0.17, 0.67, 0.23, 0.98) ${index * 0.1}s, opacity 0.6s ease-out ${index * 0.1}s`
          : "none",
      }
    : {}

  return (
    <div
      ref={cardRef}
      className={`${selectedVariant} ${className} ${animateIn ? "will-change-transform" : ""}`}
      style={animationStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}

export default Card
