"use client"

import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function ImageGalleryModal({ images, initialIndex, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [isOpen, initialIndex])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        navigatePrev()
      } else if (e.key === "ArrowRight") {
        navigateNext()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex])

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

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  const navigateNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }
  const navigatePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm">
      {/* Header con botón cerrar y contador - Mejorado para móvil */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex justify-between items-center p-3 sm:p-6">
          <div className="text-white">
            <span className="text-xs sm:text-sm font-medium">
              {currentIndex + 1} de {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200 touch-manipulation"
            aria-label="Cerrar galería"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Navegación lateral - Mejorada para móvil */}
      {images.length > 1 && (
        <>
          <button
            onClick={navigatePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-black/70 active:bg-black/80 transition-all duration-200 touch-manipulation"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={navigateNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-black/70 active:bg-black/80 transition-all duration-200 touch-manipulation"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
        </>
      )}

      {/* Contenedor principal de la imagen - Ajustado para móvil */}
      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 pt-16 sm:pt-20 pb-20 sm:pb-32">
        <img
          src={currentImage.url || "/placeholder.svg"}
          alt={currentImage.alt || `Imagen ${currentIndex + 1}`}
          className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
          style={{ 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
            filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))"
          }}
        />
      </div>

      {/* Caption centrada - Responsive */}
      {currentImage.caption && (
        <div className="absolute bottom-16 sm:bottom-24 left-0 right-0 z-20">
          <div className="text-center px-3 sm:px-6">
            <div className="inline-block bg-black/70 backdrop-blur-md rounded-lg px-3 py-2 sm:px-6 sm:py-3 border border-white/10 max-w-[90%] sm:max-w-none">
              <p className="text-white text-sm sm:text-lg font-medium">{currentImage.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnails en la parte inferior - Mejorado para móvil */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
          <div className="px-2 sm:px-4 py-2 sm:py-4">
            <div className="flex justify-center gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-2">
              <div className="flex gap-1 sm:gap-2 min-w-max">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all duration-200 touch-manipulation ${
                      index === currentIndex 
                        ? "border-blue-400 scale-105 sm:scale-110 shadow-lg ring-1 sm:ring-2 ring-blue-400/50" 
                        : "border-white/20 opacity-60 hover:opacity-100 hover:border-white/40 active:opacity-80"
                    }`}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para cerrar al hacer clic fuera de la imagen */}
      <div 
        className="absolute inset-0 z-10" 
        onClick={onClose}
      />
    </div>
  )
}