"use client"

import { useRef } from "react"
import { useTranslation } from 'react-i18next'
import Container from "../layout/Container"
import ProjectCard from "../ProjectCard"

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

        <div className="space-y-12 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              galleryTitle={`${t('projects.galleryTitle')} ${project.title}`}
              t={t}
            />
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
  
  const healthwindAchievements = t('projects.projectList.healthwind.achievements', {
    returnObjects: true,
    defaultValue: [
      "Desarrollé el backend en .NET Core y la aplicación nativa Android para monitorear la calidad del aire en el área metropolitana de Monterrey, midiendo partículas PM 2.5 y PM 10 a través de una red urbana de sensores.",
      "Implementé tres secciones principales: visualización del sensor más cercano con mediciones IMECA, mapa interactivo de sensores activos, y sistema de información detallada por sensor para aumentar la conciencia sobre la contaminación.",
    ]
  })

  const vibematchAchievements = t('projects.projectList.vibematch.achievements', {
    returnObjects: true,
    defaultValue: [
      "Desarrollé una plataforma que conecta usuarios con gustos musicales similares usando Graph Neural Networks (LightGCN) entrenada con 338K+ tracks y 6.9K+ artistas, logrando búsquedas vectoriales en menos de 10ms con Qdrant.",
      "Implementé un sistema de embeddings de 128 dimensiones con estrategia multi-temporal y cobertura del 95% de usuarios mediante coincidencias exactas, fuzzy matching y zero-shot inference, alcanzando Recall@10 de 0.64 y latencia end-to-end menor a 800ms.",
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
          url: "/images/smartcolonia/Landing.png",
          alt: "Página de inicio",
          caption: "Bienvenida",
        },
      ],
    },
    {
      title: t('projects.projectList.healthwind.title', 'Healthwind: Monitoreo de Calidad del Aire'),
      technologies: ["Android/Kotlin", ".NET/ASP.NET Core", "Sensores IoT", "API REST"],
      achievements: Array.isArray(healthwindAchievements) ? healthwindAchievements : [
        "Desarrollé el backend en .NET Core y la aplicación nativa Android para monitorear la calidad del aire en el área metropolitana de Monterrey, midiendo partículas PM 2.5 y PM 10 a través de una red urbana de sensores.",
        "Implementé tres secciones principales: visualización del sensor más cercano con mediciones IMECA, mapa interactivo de sensores activos, y sistema de información detallada por sensor para aumentar la conciencia sobre la contaminación.",
      ],
      gallery: [
        {
          url: "images/healthwind/Healthwind.png",
          alt: "Vista Home",
          caption: "Pantalla principal",
        },
        {
          url: "images/healthwind/Healthwind3.png",
          alt: "Mapa de sensores",
          caption: "Mediciones de temperatura, humedad y PM",
        },
        {
          url: "images/healthwind/Healthwind2.png",
          alt: "Detalles del sensor",
          caption: "Home, Aprender, Mapa",
        },
      ],
    },
    {
      title: t('projects.projectList.vibematch.title', 'VibeMatch: Matching Musical con Deep Learning'),
      technologies: ["Next.js", "TypeScript", "FastAPI", "PyTorch", "Qdrant", "Graph Neural Networks"],
      link: "https://vibematchs.me",
      linkText: t('projects.projectList.vibematch.linkText', 'Sitio Web'),
      achievements: Array.isArray(vibematchAchievements) ? vibematchAchievements : [
        "Desarrollé una plataforma que conecta usuarios con gustos musicales similares usando Graph Neural Networks (LightGCN) entrenada con 338K+ tracks y 6.9K+ artistas, logrando búsquedas vectoriales en menos de 10ms con Qdrant.",
        "Implementé un sistema de embeddings de 128 dimensiones con estrategia multi-temporal y cobertura del 95% de usuarios mediante coincidencias exactas, fuzzy matching y zero-shot inference, alcanzando Recall@10 de 0.64 y latencia end-to-end menor a 800ms.",
      ],
      gallery: [
        {
          url: "images/vibematch/dashboard.jpg",
          alt: "Dashboard principal",
          caption: "Landing Page",
        },
        {
          url: "images/vibematch/user.jpg",
          alt: "Resultados de matching",
          caption: "Usuarios compatibles",
        },
        {
          url: "images/vibematch/arquitectura.jpg",
          alt: "Arquitectura del sistema",
          caption: "Arquitectura de la aplicación",
        },
      ],
    },
    {
      title: t('projects.projectList.cemex.title', 'Sistema de Topografía - CEMEX'),
      technologies: ["React", "FastAPI", "PostgreSQL", "Supabase"],
      link: "https://topografia-two.vercel.app",
      linkText: t('projects.projectList.cemex.linkText', 'Github'),
      achievements: Array.isArray(cemexAchievements) ? cemexAchievements : [
        "Desarrollé individualmente como Arquitecto de Software una aplicación de control de calidad topográfico para CEMEX Nacional, después de que otra consultora falló en su implementación. Diseñé el sistema para automatizar cálculos bajo tolerancias SCT en pavimentación.",
        "Eficienté y aceleré procesos críticos al generar gráficas automáticas y reportes de liberación instantáneos con un solo click, transformando un proceso manual de horas en segundos.",
      ],
      gallery: [
        {
          url: "images/topografia/dashboard.png",
          alt: "Dashboard del sistema",
          caption: "Dashboard principal",
        },
        {
          url: "images/topografia/campo-captura.png",
          alt: "Módulo de captura de datos",
          caption: "Captura de datos",
        },
        {
          url: "images/topografia/campo-graficas.png",
          alt: "Módulo de gráficas",
          caption: "Gráficas automáticas",
        },
        {
          url: "images/topografia/campo-resultados.png",
          alt: "Módulo de resultados",
          caption: "Resultados y reportes",
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
          url: "images/acervo/acervo.png",
          alt: "Landing page",
          caption: "Página de inicio",
        },
        {
          url: "/images/acervo/busqueda.png",
          alt: "Sistema de búsqueda",
          caption: "Resultados de búsqueda",
        },
        {
          url: "/images/acervo/libro.png",
          alt: "Detalles de libro",
          caption: "Detalles de libro",
        },
      ],
    },
  ]
}

export default Projects
