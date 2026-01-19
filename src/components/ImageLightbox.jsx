"use client"

import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function ImageLightbox({ images, initialIndex, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const touchStartRef = useRef({ x: 0, y: 0 })
  const touchEndRef = useRef({ x: 0, y: 0 })

  // Verificar que estamos en el cliente (para SSR)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Actualizar índice cuando cambie el inicial
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [isOpen, initialIndex])

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Navegación por teclado
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose()
      } else if (e.key === "ArrowLeft") {
        navigatePrev()
      } else if (e.key === "ArrowRight") {
        navigateNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex])

  if (!isOpen || !images.length || !isMounted) return null

  const currentImage = images[currentIndex]

  const handleClose = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onClose()
      setIsAnimating(false)
    }, 150)
  }

  const navigateNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      setIsAnimating(false)
    }, 250)
  }

  const navigatePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      setIsAnimating(false)
    }, 250)
  }

  // Touch handlers para swipe gestures
  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }

  const handleTouchMove = (e) => {
    touchEndRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }

  const handleTouchEnd = () => {
    const deltaX = touchStartRef.current.x - touchEndRef.current.x
    const deltaY = touchStartRef.current.y - touchEndRef.current.y
    const minSwipeDistance = 50

    // Swipe horizontal (cambiar imagen)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        navigateNext() // Swipe left
      } else {
        navigatePrev() // Swipe right
      }
    }
    // Swipe vertical hacia abajo (cerrar)
    else if (deltaY < -minSwipeDistance && Math.abs(deltaY) > Math.abs(deltaX)) {
      handleClose()
    }
  }

  // Renderizar usando Portal directamente en document.body
  // Esto evita problemas con transforms/filters de componentes padres
  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-200 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Overlay backdrop - Clic para cerrar */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
        onClick={handleClose}
        aria-label="Cerrar lightbox"
      />

      {/* Controles superiores - FIXED */}
      <div className="fixed top-0 left-0 right-0 z-[10001] pointer-events-none">
        <div className="flex justify-between items-center p-4 sm:p-6">
          {/* Contador */}
          <div className="pointer-events-auto">
            <span className="text-white/90 text-sm font-medium bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-black transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
            aria-label="Cerrar galería"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Navegación lateral - Solo si hay más de una imagen */}
      {images.length > 1 && (
        <>
          {/* Botón anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigatePrev()
            }}
            className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[10001] p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
            aria-label="Imagen anterior"
            style={{
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            }}
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>

          {/* Botón siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateNext()
            }}
            className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[10001] p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
            aria-label="Imagen siguiente"
            style={{
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            }}
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* Contenedor de imagen con gestures */}
      <div
        className="fixed inset-0 flex items-center justify-center p-4 sm:p-8 pt-20 pb-24"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          key={currentIndex}
          src={currentImage.url || "/placeholder.svg"}
          alt={currentImage.alt || `Imagen ${currentIndex + 1}`}
          className={`max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl transition-all duration-250 ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
          }}
        />
      </div>

      {/* Caption minimalista - FIXED */}
      {currentImage.caption && (
        <div className="fixed bottom-0 left-0 right-0 z-[10001] pointer-events-none">
          <div className="flex justify-center p-4 sm:p-6">
            <div className="bg-black/50 backdrop-blur-md rounded-lg px-4 py-2.5 sm:px-6 sm:py-3 border border-white/10 max-w-[90%] sm:max-w-2xl">
              <p className="text-white text-sm sm:text-base text-center">
                {currentImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  )
}
