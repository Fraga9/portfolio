"use client"

import { useState } from "react"
import Container from "../layout/Container"
import Card from "../ui/Card"

function Experience({ id }) {
  const [activeExperience, setActiveExperience] = useState(0)

  return (
    <section id={id} className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Sutiles elementos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] rounded-full bg-[#d0ff00]/5 blur-[100px]"></div>
      </div>

      <Container className="px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/10">
            <span className="font-medium text-white text-sm">Experiencia</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trayectoria <span className="text-blue-400">Profesional</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Proyectos y roles en los que he aplicado mis habilidades para crear soluciones innovadoras.
          </p>
        </div>

        {/* Experiencias */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <Card
              key={index}
              variant="minimal"
              className={`p-6 md:p-8 ${activeExperience === index ? "border-[#d0ff00]/50" : ""}`}
              index={index}
              animateIn={true}
              onClick={() => setActiveExperience(index)}
            >
              <div className="flex flex-col space-y-4">
                {/* Encabezado */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-1 bg-[#d0ff00] rounded-full"></div>
                      <h3 className="text-xl font-bold text-white">
                        {experience.position} <span className="text-blue-400">@ {experience.company}</span>
                      </h3>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm md:text-right">
                    <span className="inline-flex items-center bg-black/50 px-3 py-1 rounded-full border border-white/10">
                      {experience.period}
                    </span>
                  </div>
                </div>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {experience.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-black/50 text-gray-300 px-3 py-1 rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Logros */}
                <ul className="space-y-3 text-gray-300 mt-2">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start">
                      <span className="text-[#d0ff00] mr-2 mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                {/* Métricas clave */}
                {experience.metrics && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    {experience.metrics.map((metric, metricIndex) => (
                      <div
                        key={metricIndex}
                        className="bg-black/30 rounded-lg p-3 border border-white/5 hover:border-[#d0ff00]/20 transition-colors"
                      >
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Habilidades - Versión minimalista */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-8">Habilidades principales</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{skill.name}</h4>
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#d0ff00] group-hover:bg-blue-400 transition-colors duration-300"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

const experiences = [
  {
    position: "Data Analyst",
    company: "Cemex",
    technologies: ["React", "FastAPI", "Firebase", "Supabase"],
    period: "Feb 2025 - Present",
    achievements: [
      "Desarrollé tres plataformas clave: Promexma Marketplace (distribución uniforme), Xpresa (seguimiento de satisfacción del cliente) y Permisos Promexma (gestión de documentos) para optimizar operaciones en más de 60 sucursales.",
      "Implementé un sistema basado en LLM para abordar consultas frecuentes de clientes, mejorando la experiencia del usuario y reduciendo la carga operativa en atención al cliente.",
    ],
    metrics: [
      { value: "60+", label: "Sucursales" },
      { value: "3", label: "Plataformas" },
      { value: "90%", label: "Reducción de carga" },
    ],
  },
  {
    position: "InStep Internship",
    company: "Infosys",
    technologies: ["AI Agents", "Semantic Search", "LLM", "Python", "React", "Flask"],
    period: "Jun 2024 - Aug 2024",
    achievements: [
      "Desarrollé un sistema de caché semántico integrado con el chatbot EdgeVerve para la recuperación de datos PDF, reduciendo el tiempo de proceso en un 90%.",
      "Creé un sistema para la creación de agentes y tareas impulsado por el usuario con paneles y gráficos personalizados, mejorando la eficiencia en la gestión de tareas.",
    ],
    metrics: [
      { value: "90%", label: "Reducción de tiempo" },
      { value: "2", label: "Sistemas clave" },
    ],
  },
]

const skills = [
  { name: "React", level: 95 },
  { name: "Python", level: 90 },
  { name: "FastAPI", level: 85 },
  { name: "Firebase", level: 80 },
  { name: "Supabase", level: 75 },
  { name: "AI/LLM", level: 88 },
  { name: "UI/UX", level: 82 },
  { name: "DevOps", level: 70 },
]

export default Experience
  