"use client"

import { useState, useRef } from "react"
import { useTranslation } from 'react-i18next'
import ImageLightbox from "./ImageLightbox"

export default function DraggableGallery({ images = [], title }) {
  const { t } = useTranslation()
  const displayTitle = title || t('gallery.title')
  const [draggingIndex, setDraggingIndex] = useState(null)
  const [imageList, setImageList] = useState(images)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const dragStartPosRef = useRef(null)
  const dragNodeRef = useRef(null)

  // Estado para la galería modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Referencia para detectar si es un clic o un arrastre
  const clickTimeoutRef = useRef(null)
  const isDraggingRef = useRef(false)

  // Si no hay imágenes, mostrar un mensaje
  if (imageList.length === 0) {
    return (
      <div className="mt-6 p-4 rounded-lg border border-white/10 bg-black/30 text-center">
        <p className="text-gray-400">{t('gallery.noImages')}</p>
      </div>
    )
  }

  const handleDragStart = (e, index) => {
    // Marcar que estamos arrastrando para evitar abrir la galería
    isDraggingRef.current = true

    // Guardar la posición inicial y el índice
    dragStartPosRef.current = { x: e.clientX, y: e.clientY }
    dragNodeRef.current = e.target

    // Añadir clase para estilo durante el arrastre
    setTimeout(() => {
      setDraggingIndex(index)
    }, 0)

    // Establecer datos para el arrastre
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", index.toString())

    // Crear una imagen fantasma personalizada para el arrastre
    const ghostImage = e.target.cloneNode(true)
    ghostImage.style.position = "absolute"
    ghostImage.style.top = "-1000px"
    ghostImage.style.opacity = "0.5"
    document.body.appendChild(ghostImage)
    e.dataTransfer.setDragImage(
      ghostImage,
      e.clientX - e.target.getBoundingClientRect().left,
      e.clientY - e.target.getBoundingClientRect().top,
    )

    // Eliminar la imagen fantasma después
    setTimeout(() => {
      document.body.removeChild(ghostImage)
    }, 0)
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"

    if (index !== dragOverIndex) {
      setDragOverIndex(index)
    }
  }

  const handleDragEnd = () => {
    setDraggingIndex(null)
    setDragOverIndex(null)
    dragStartPosRef.current = null

    // Resetear el estado de arrastre después de un breve tiempo
    setTimeout(() => {
      isDraggingRef.current = false
    }, 100)
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()

    const dragIndex = Number(e.dataTransfer.getData("text/plain"))

    if (dragIndex === dropIndex) return

    // Reordenar la lista
    const newList = [...imageList]
    const draggedItem = newList[dragIndex]

    // Eliminar el elemento arrastrado
    newList.splice(dragIndex, 1)

    // Insertar en la nueva posición
    newList.splice(dropIndex, 0, draggedItem)

    setImageList(newList)
    setDraggingIndex(null)
    setDragOverIndex(null)
  }

  // Manejar el clic en una imagen para abrir la galería
  const handleImageClick = (index) => {
    // Si estamos arrastrando, no abrir la galería
    if (isDraggingRef.current) return

    // Configurar un timeout para detectar si es un clic o un arrastre
    clickTimeoutRef.current = setTimeout(() => {
      setSelectedImageIndex(index)
      setIsModalOpen(true)
    }, 100)
  }

  // Cancelar el timeout si comenzamos a arrastrar
  const handleMouseDown = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }
  }

  return (
    <div className="mt-6">
      <h4 className="text-white font-medium mb-3">{displayTitle}</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {imageList.map((image, index) => (
          <div
            key={index}
            className={`relative rounded-lg overflow-hidden border ${
              draggingIndex === index
                ? "border-[#d0ff00] opacity-50 scale-95"
                : dragOverIndex === index
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-white/10 hover:border-white/30"
            } transition-all duration-200 cursor-pointer group`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, index)}
            onClick={() => handleImageClick(index)}
            onMouseDown={handleMouseDown}
          >
            <img
              src={image.url || "/placeholder.svg"}
              alt={image.alt || `Imagen ${index + 1}`}
              className="w-full h-32 md:h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <p className="text-white text-xs truncate w-full">{image.caption || `Imagen ${index + 1}`}</p>
            </div>

            {/* Indicador de arrastre */}
            <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </div>

            {/* Indicador de clic para ampliar */}
            <div className="absolute top-2 left-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {t('gallery.dragDropInstructions')}
      </p>

      {/* Lightbox minimalista */}
      <ImageLightbox
        images={imageList}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
} 