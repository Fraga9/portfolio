import Container from "../layout/Container"
import Card from "../ui/card"

function Experience({ id }) {
  return (
    <section id={id} className="py-20 md:py-32 bg-black/90 relative">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Mi <span className="text-blue-400">Experiencia</span>
          </h2>
          <p className="text-gray-300 text-lg">Trayectoria profesional y proyectos en los que he trabajado</p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <Card key={index} variant="experience" className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {experience.position}, <span className="text-blue-400">{experience.company}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-gray-400 text-sm mt-2 md:mt-0 md:text-right whitespace-nowrap">
                  {experience.period}
                </div>
              </div>
              <ul className="space-y-3 text-gray-300">
                {experience.achievements.map((achievement, achievementIndex) => (
                  <li key={achievementIndex} className="flex items-start">
                    <span className="text-[#d0ff00] mr-2 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>

      {/* Efecto de luz de fondo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[200px] bg-blue-500/10 blur-[100px] rounded-full"></div>
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
  },
]

export default Experience
