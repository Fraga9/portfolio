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
      {/* Header con botón cerrar y contador */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex justify-between items-center p-6">
          <div className="text-white">
            <span className="text-sm font-medium">
              {currentIndex + 1} de {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            aria-label="Cerrar galería"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navegación lateral */}
      {images.length > 1 && (
        <>
          <button
            onClick={navigatePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-all duration-200"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={navigateNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-all duration-200"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </>
      )}

      {/* Contenedor principal de la imagen */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pt-20 pb-32">
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

      {/* Caption centrada */}
      {currentImage.caption && (
        <div className="absolute bottom-26 left-0 right-0 z-20">
          <div className="text-center px-6">
            <div className="inline-block bg-black/60 backdrop-blur-md rounded-lg px-6 py-3 border border-white/10">
              <p className="text-white text-lg font-medium mb-1">{currentImage.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnails en la parte inferior */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
          <div className="px-4 py-4">
            <div className="flex justify-center gap-2 overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentIndex 
                        ? "border-blue-400 scale-110 shadow-lg ring-2 ring-blue-400/50" 
                        : "border-white/20 opacity-60 hover:opacity-100 hover:border-white/40"
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