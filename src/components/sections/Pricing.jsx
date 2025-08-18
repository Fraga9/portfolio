"use client"

import { useRef } from "react"
import { useTranslation } from 'react-i18next'
import { track } from '@vercel/analytics'
import Container from "../layout/Container"
import Card from "../ui/Card"
import DraggableGallery from "../DraggableGallery"

function Projects({ id }) {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const projects = getProjects(t)

  return (
    <section id={id} ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-b from-black/90 to-[#050024] relative">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('projects.title')}
          </h2>
          <p className="text-gray-300 text-lg">{t('projects.description')}</p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} variant="experience" className="p-6 md:p-8" index={index} animateIn={true}>
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    onClick={() => {
                      // Track event with Vercel Analytics
                      track('Project Link Click', {
                        project: project.title,
                        link_type: project.linkText,
                        url: project.link
                      })
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 md:mt-0 inline-flex items-center text-[#d0ff00] hover:text-[#e0ff40] transition-colors text-sm"
                  >
                    <span>{project.linkText}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
              <ul className="space-y-3 text-gray-300">
                {project.achievements.map((achievement, achievementIndex) => (
                  <li key={achievementIndex} className="flex items-start">
                    <span className="text-[#d0ff00] mr-2 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              {/* Galería de imágenes con drag and drop */}
              <DraggableGallery images={project.gallery || []} title={`${t('projects.galleryTitle')} ${project.title}`} />
            </Card>
          ))}
        </div>
      </Container>

      {/* Efecto de luz de fondo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[200px] bg-purple-500/10 blur-[100px] rounded-full"></div>
    </section>
  )
}

const getProjects = (t) => {
  const smartcoloniaAchievements = t('projects.projectList.smartcolonia.achievements', { 
    returnObjects: true,
    defaultValue: [
      "Desarrollé una aplicación SaaS con tres niveles de usuario (Guardia de Seguridad, Residente, Administrador) actualmente en fase beta con 200 usuarios, proyectando 1,000 usuarios en seis meses.",
      "Implementé módulos de control de acceso, sistema de pagos integrado, anuncios comunitarios y herramientas de encuestas para mejorar la gestión del vecindario.",
    ]
  })
  
  const cemexAchievements = t('projects.projectList.cemex.achievements', { 
    returnObjects: true,
    defaultValue: [
      "Desarrollé individualmente como Arquitecto de Software una aplicación de control de calidad topográfico para CEMEX Nacional, después de que otra consultora falló en su implementación. Diseñé el sistema para automatizar cálculos bajo tolerancias SCT en pavimentación.",
      "Eficienté y aceleré procesos críticos al generar gráficas automáticas y reportes de liberación instantáneos con un solo click, transformando un proceso manual de horas en segundos.",
    ]
  })
  
  const labnlAchievements = t('projects.projectList.labnl.achievements', { 
    returnObjects: true,
    defaultValue: [
      "Creé un sitio web para la colección bibliográfica del Laboratorio Ciudadano de Nuevo León utilizando React y Google Sheets. Diseñé el sitio para centralizar información sobre libros disponibles.",
      "Ayudé a aproximadamente 20,000 personas mensualmente a encontrar libros de interés en la colección bibliográfica digital, recibiendo 19,900 visitantes en junio de 2024.",
    ]
  })

  return [
    {
      title: t('projects.projectList.smartcolonia.title', 'SmartColonia: Comprehensive Neighborhood Management Platform'),
      technologies: ["FastAPI", "React Native", "Amazon S3", "Supabase"],
      achievements: Array.isArray(smartcoloniaAchievements) ? smartcoloniaAchievements : [
        "Desarrollé una aplicación SaaS con tres niveles de usuario (Guardia de Seguridad, Residente, Administrador) actualmente en fase beta con 200 usuarios, proyectando 1,000 usuarios en seis meses.",
        "Implementé módulos de control de acceso, sistema de pagos integrado, anuncios comunitarios y herramientas de encuestas para mejorar la gestión del vecindario.",
      ],
      gallery: [
        {
          url: "images/smartcolonia/Cover.png",
          alt: "SmartColonia",
          caption: "Smartcolonia",
        },
        {
          url: "images/smartcolonia/First.png",
          alt: "Introducción",
          caption: "SmartColonia en Acción",
        },
        {
          url: "/placeholder.svg?height=300&width=400&text=Pagos",
          alt: "Sistema de pagos",
          caption: "Sistema de pagos",
        },
        {
          url: "/placeholder.svg?height=300&width=400&text=Anuncios",
          alt: "Anuncios comunitarios",
          caption: "Anuncios comunitarios",
        },
        {
          url: "/placeholder.svg?height=300&width=400&text=Encuestas",
          alt: "Herramienta de encuestas",
          caption: "Herramienta de encuestas",
        },
      ],
    },
    {
      title: t('projects.projectList.cemex.title', 'Sistema de Topografía - CEMEX'),
      technologies: ["React", "FastAPI", "PostgreSQL", "Supabase"],
      link: "https://github.com/Fraga9/Topografia",
      linkText: t('projects.projectList.cemex.linkText', 'GitHub'),
      achievements: Array.isArray(cemexAchievements) ? cemexAchievements : [
        "Desarrollé individualmente como Arquitecto de Software una aplicación de control de calidad topográfico para CEMEX Nacional, después de que otra consultora falló en su implementación. Diseñé el sistema para automatizar cálculos bajo tolerancias SCT en pavimentación.",
        "Eficienté y aceleré procesos críticos al generar gráficas automáticas y reportes de liberación instantáneos con un solo click, transformando un proceso manual de horas en segundos.",
      ],
      gallery: [
        {
          url: "/placeholder.svg?height=300&width=400&text=Dashboard",
          alt: "Dashboard del sistema",
          caption: "Dashboard principal",
        },
        {
          url: "/placeholder.svg?height=300&width=400&text=Cálculos",
          alt: "Módulo de cálculos",
          caption: "Cálculos topográficos",
        },
        {
          url: "/placeholder.svg?height=300&width=400&text=Reportes",
          alt: "Sistema de reportes",
          caption: "Reportes de calidad",
        },
      ],
    },
    {
      title: t('projects.projectList.labnl.title', 'Acervo Bibliográfico Digital LABNL: Full Stack Developer'),
      technologies: ["React", "Axios", "Google Sheets"],
      link: "https://labnlacervo.web.app",
      linkText: t('projects.projectList.labnl.linkText', 'Sitio Web'),
      achievements: Array.isArray(labnlAchievements) ? labnlAchievements : [
        "Creé un sitio web para la colección bibliográfica del Laboratorio Ciudadano de Nuevo León utilizando React y Google Sheets. Diseñé el sitio para centralizar información sobre libros disponibles.",
        "Ayudé a aproximadamente 20,000 personas mensualmente a encontrar libros de interés en la colección bibliográfica digital, recibiendo 19,900 visitantes en junio de 2024.",
      ],
      gallery: [
        {
          url: "/placeholder.svg?height=300&width=400&text=Catálogo",
          alt: "Catálogo de libros",
          caption: "Catálogo principal",
        },
        {
          url: "/placeholder.svg?height=300&width=400&text=Búsqueda",
          alt: "Sistema de búsqueda",
          caption: "Búsqueda avanzada",
        },
        {
          url: "/placeholder.svg?height=300&width=400&text=Detalles",
          alt: "Detalles de libro",
          caption: "Detalles de libro",
        },
        {
          url: "/placeholder.svg?height=300&width=400&text=Estadísticas",
          alt: "Estadísticas de uso",
          caption: "Estadísticas de uso",
        },
      ],
    },
  ]
}

export default Projects
