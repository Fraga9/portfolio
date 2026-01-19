"use client"

import { useState, useCallback, memo } from "react"
import { ChevronDown, ExternalLink } from "lucide-react"
import { track } from '@vercel/analytics'
import DraggableGallery from "./DraggableGallery"

function ProjectCard({ project, index, galleryTitle, t }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleExpanded = useCallback(() => {
    if (isExpanded) {
      // Al colapsar: primero animar salida, luego colapsar
      setIsAnimating(true)
      // Esperar a que termine la animación de fade-out antes de colapsar
      setTimeout(() => {
        setIsExpanded(false)
        setIsAnimating(false)
      }, 300) // Duración del fade-out
    } else {
      setIsExpanded(true)
    }
  }, [isExpanded])

  const handleLinkClick = useCallback(() => {
    track('Project Link Click', {
      project: project.title,
      link_type: project.linkText,
      url: project.link
    })
  }, [project.title, project.linkText, project.link])

  const heroImage = project.gallery?.[0]

  // Estado visual: expandido visualmente mientras anima el cierre
  const isVisuallyExpanded = isExpanded || isAnimating
  // Estado de contenido: mostrar contenido con fade-out durante animación
  const showContent = isExpanded && !isAnimating

  return (
    <article
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-white/5"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Hero Section */}
      <div className="relative">
        {/* Imagen Hero */}
        <div
          className={`relative overflow-hidden transition-all duration-500 ease-out ${
            isVisuallyExpanded 
              ? 'h-0 opacity-0 scale-95' 
              : 'h-auto opacity-100 scale-100'
          }`}
        >
          {heroImage && (
            <div className="absolute inset-0">
              <img
                src={heroImage.url}
                alt={heroImage.alt || project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)'
                }}
              />
            </div>
          )}

          <div className="relative min-h-[450px] md:min-h-[520px] flex flex-col justify-end p-8 md:p-10">
            <div className="space-y-5">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl">
                {project.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs font-medium bg-blue-500/20 backdrop-blur-md text-blue-200 px-3 py-1.5 rounded-full border border-blue-400/30 shadow-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 flex-wrap pt-4">
                <button
                  onClick={toggleExpanded}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="font-medium">
                    {t('projects.showDetails', 'Ver detalles')}
                  </span>
                  <ChevronDown className="w-5 h-5" />
                </button>

                {project.link && (
                  <a
                    href={project.link}
                    onClick={handleLinkClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-[#d0ff00] hover:bg-[#e0ff40] text-black font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#d0ff00]/20 hover:scale-105 active:scale-95"
                  >
                    <span>{project.linkText}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Header compacto cuando está expandido */}
        <div
          className={`transition-all duration-500 ease-out ${
            isVisuallyExpanded 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-4 absolute pointer-events-none'
          }`}
        >
          <div className="p-6 md:p-8 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {heroImage && (
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden ring-2 ring-white/20">
                  <img
                    src={heroImage.url}
                    alt={heroImage.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido expandible */}
      <div
        className={`grid transition-all duration-500 ease-out ${
          isVisuallyExpanded 
            ? 'grid-rows-[1fr]' 
            : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div 
            className={`px-8 md:px-10 pb-8 md:pb-10 pt-6 transition-all duration-300 ${
              showContent 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Achievements */}
            <div className="mb-10">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5">
                {t('projects.achievements', 'Logros destacados')}
              </h4>
              <ul className="space-y-5">
                {project.achievements.map((achievement, achievementIndex) => (
                  <li
                    key={achievementIndex}
                    className={`flex items-start gap-3 text-gray-300 transition-all duration-300 ${
                      showContent 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-2'
                    }`}
                    style={{
                      transitionDelay: showContent ? `${achievementIndex * 75}ms` : '0ms',
                    }}
                  >
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#d0ff00] mt-2" />
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Galería */}
            {project.gallery && project.gallery.length > 0 && (
              <div
                className={`mb-10 transition-all duration-300 ${
                  showContent 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-2'
                }`}
                style={{
                  transitionDelay: showContent ? '200ms' : '0ms',
                }}
              >
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5">
                  {t('projects.gallery', 'Galería')}
                </h4>
                <DraggableGallery
                  images={project.gallery}
                  title={galleryTitle}
                />
              </div>
            )}

            {/* Botón Ver menos */}
            <div
              className={`flex justify-center pt-4 transition-all duration-300 ${
                showContent 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-2'
              }`}
              style={{
                transitionDelay: showContent ? '300ms' : '0ms',
              }}
            >
              <button
                onClick={toggleExpanded}
                disabled={isAnimating}
                className="flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <span className="font-medium">{t('projects.showLess', 'Ver menos')}</span>
                <ChevronDown className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default memo(ProjectCard)