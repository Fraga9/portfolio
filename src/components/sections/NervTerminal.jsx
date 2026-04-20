"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// Constantes hoisted a nivel de módulo (no se recrean por render)
const CURRENT_PATH = "C:\\Users\\osifraga"

const INIT_MESSAGES = [
  `NERV Terminal v3.33 [Build 2024.07.16]`,
  `Sistema operativo: MAGI OS`,
  `Usuario: osifraga`,
  `Directorio: ${CURRENT_PATH}`,
  ``,
  `Escribe 'help' para ver los comandos disponibles.`,
  ``
]

const SYSTEM_STATUSES = ['ACTIVE', 'SYNCING', 'PATTERN BLUE', 'ERROR']

const TERMINAL_COMMANDS = {
  help: {
    description: "Muestra todos los comandos disponibles",
    execute: () => [
      "═══════════════════════════════════════════════════════════",
      "                    COMANDOS DISPONIBLES",
      "═══════════════════════════════════════════════════════════",
      "",
      "help        - Muestra esta lista de comandos",
      "experiencia - Educación, experiencia laboral y skills",
      "proyecto    - Proyectos destacados (SmartColonia, LABNL...)",
      "contacto    - Email, LinkedIn, GitHub, teléfono",
      "sobre       - Información personal y logros",
      "clear       - Limpia la terminal",
      "",
      "Tip: Usa las flechas ↑↓ para navegar por el historial",
      "",
      "═══════════════════════════════════════════════════════════"
    ]
  },
  experiencia: {
    description: "Muestra experiencia profesional",
    execute: () => [
      "═══════════════════════════════════════════════════════════",
      "                  EXPERIENCIA PROFESIONAL",
      "═══════════════════════════════════════════════════════════",
      "",
      "🎓 EDUCACIÓN:",
      "   • B.S. Computer Science and Technology - TEC",
      "   • Aug 2022 - June 2026 (Expected)",
      "   • GPA: 4.0",
      "   • Concentración: Advanced AI for Data Science",
      "   • 100% Academic Merit Scholarship",
      "   • Xignux Challenge 2024 - Top 3 Finalist",
      "",
      "💼 EXPERIENCIA:",
      "   • Full Stack Intern, Cemex (Feb 2025 - Aug 2025)",
      "     └─ Desarrollé 5 aplicaciones web para operaciones Promexma",
      "     └─ Sistema LLM para soporte al cliente",
      "",
      "   • InStep Internship, Infosys (Jun 2024 - Aug 2024)",
      "     └─ Sistema de caché semántico con EdgeVerve chatbot",
      "     └─ Reducción del 90% en tiempo de procesamiento",
      "",
      "🚀 SKILLS:",
      "   • Languages: Python, JavaScript, C++, SQL, Java",
      "   • Frameworks: React, FastAPI, Django, LangChain, Flask",
      "   • Tools: Supabase, AWS, Firebase, OCI, GitHub",
      "",
      "═══════════════════════════════════════════════════════════"
    ]
  },
  proyecto: {
    description: "Lista proyectos destacados",
    execute: () => [
      "═══════════════════════════════════════════════════════════",
      "                    PROYECTOS DESTACADOS",
      "═══════════════════════════════════════════════════════════",
      "",
      "🏗️ SmartColonia: Neighborhood Management Platform",
      "   └─ Tech: FastAPI + React Native + Amazon S3 + Supabase",
      "   └─ SaaS con 3 niveles de usuario (Beta: 200 users)",
      "   └─ Control de acceso, pagos, anuncios y encuestas",
      "   └─ Proyección: 1,000 usuarios en 6 meses",
      "",
      "🏗️ Topografía Cemex: Topographic Management System",
      "   └─ Tech: React + FastAPI + PostgreSQL + Supabase",
      "   └─ Control de calidad topográfico en construcción vial",
      "   └─ Cálculos automáticos con cumplimiento SCT",
      "   └─ Demo: topografia-two.vercel.app",
      "",
      "📚 Acervo Bibliográfico Digital LABNL",
      "   └─ Tech: React + Axios + Google Sheets",
      "   └─ Colección bibliográfica del Laboratorio Ciudadano NL",
      "   └─ 20,000 usuarios mensuales, 19,900 visitas (Jun 2024)",
      "   └─ Website: labnlacervo.web.app",
      "",
      "═══════════════════════════════════════════════════════════"
    ]
  },
  contacto: {
    description: "Información de contacto",
    execute: () => [
      "═══════════════════════════════════════════════════════════",
      "                    INFORMACIÓN DE CONTACTO",
      "═══════════════════════════════════════════════════════════",
      "",
      "📧 EMAIL:",
      "   └─ garzahector1013@gmail.com",
      "",
      "🔗 LINKEDIN:",
      "   └─ linkedin.com/in/héctor-garza-fraga-6b660723a/",
      "",
      "🐙 GITHUB:",
      "   └─ github.com/Fraga9",
      "",
      "💼 DEVPOST:",
      "   └─ devpost.com/garzahector1013",
      "",
      "🌐 PORTFOLIO:",
      "   └─ osifraga.vercel.app",
      "",
      "📱 TELÉFONO:",
      "   └─ +52 81 1299 5975",
      "",
      "📍 UBICACIÓN:",
      "   └─ Monterrey, MX",
      "",
      "═══════════════════════════════════════════════════════════"
    ]
  },
  sobre: {
    description: "Información personal",
    execute: () => [
      "═══════════════════════════════════════════════════════════",
      "                      SOBRE MÍ",
      "═══════════════════════════════════════════════════════════",
      "",
      "👨‍💻 Héctor Eduardo Garza Fraga",
      "",
      "Computer Science student at Tecnológico de Monterrey with",
      "a 4.0 GPA and 100% Academic Merit Scholarship.",
      "Specializing in Advanced AI for Data Science.",
      "",
      "🎯 ÁREAS DE ESPECIALIZACIÓN:",
      "   • Full Stack Development (React, FastAPI, Django)",
      "   • Artificial Intelligence & Machine Learning",
      "   • LangChain & LLM Applications",
      "   • Cloud Infrastructure (AWS, Firebase, Supabase)",
      "   • Mobile Development (React Native)",
      "",
      "🏆 LOGROS:",
      "   • Xignux Challenge 2024 - Top 3 Finalist",
      "   • 100% Academic Merit Scholarship",
      "   • Built products serving 20,000+ monthly users",
      "",
      "═══════════════════════════════════════════════════════════"
    ]
  },
  clear: {
    description: "Limpia la terminal",
    execute: () => null // Comando especial
  }
}

const COMMAND_COUNT = Object.keys(TERMINAL_COMMANDS).length

// Terminal funcional estilo NERV/Evangelion
function NervTerminal() {
  const [systemStatus, setSystemStatus] = useState('ACTIVE')
  const [errorFlash, setErrorFlash] = useState(false)
  const [currentInput, setCurrentInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState([])
  const [isInitialized, setIsInitialized] = useState(false)
  const statusRef = useRef(null)
  const errorTimerRef = useRef(null)
  const inputRef = useRef(null)

  // Inicialización de la terminal
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsInitialized(true)
      setTerminalHistory(INIT_MESSAGES)
    }, 1000)

    // Estados del sistema
    statusRef.current = setInterval(() => {
      const randomStatus = SYSTEM_STATUSES[Math.floor(Math.random() * SYSTEM_STATUSES.length)]
      setSystemStatus(randomStatus)

      if (randomStatus === 'ERROR') {
        setErrorFlash(true)
        // Cleanup del timer anterior si existe
        if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
        errorTimerRef.current = setTimeout(() => setErrorFlash(false), 300)
      }
    }, 5000)

    return () => {
      clearTimeout(initTimer)
      if (statusRef.current) clearInterval(statusRef.current)
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
    }
  }, [])

  // Manejar entrada de comandos — functional setState para evitar stale closures
  const handleCommand = useCallback((input) => {
    const command = input.toLowerCase().trim()

    if (command === 'clear') {
      setTerminalHistory([])
      return
    }

    setTerminalHistory(prev => {
      const newHistory = [...prev]
      // Agregar comando ejecutado
      newHistory.push(`${CURRENT_PATH}> ${input}`)

      if (TERMINAL_COMMANDS[command]) {
        const output = TERMINAL_COMMANDS[command].execute()
        if (output) {
          newHistory.push(...output)
        }
      } else if (command !== '') {
        newHistory.push(`ERROR: '${input}' no es un comando reconocido.`)
        newHistory.push(`Escribe 'help' para ver los comandos disponibles.`)
      }

      newHistory.push('') // Línea en blanco
      return newHistory
    })
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput)
      setCurrentInput('')
    }
  }

  return (
    <div className="relative w-full max-w-full">
      {/* NERV Terminal Header */}
      <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-green-500/30 rounded-t-lg p-2 mb-0">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-[#d0ff00] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <span className="text-green-300 font-bold tracking-wider">MAGI-01</span>
          </div>
          <div className={`font-bold tracking-wider ${errorFlash ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
            {systemStatus}
          </div>
        </div>
      </div>

      {/* Terminal principal */}
      <div className="relative bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-b-lg overflow-hidden">
        {/* Efectos NERV */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Escaneo vertical */}
          <div
            className={`absolute w-full h-0.5 ${errorFlash ? 'bg-red-500/60' : 'bg-green-500/40'} blur-sm`}
            style={{
              animation: 'nervScan 3s linear infinite',
              boxShadow: `0 0 20px ${errorFlash ? '#ef4444' : '#22c55e'}`
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(90deg, ${errorFlash ? '#ef4444' : '#22c55e'} 1px, transparent 1px),
                linear-gradient(${errorFlash ? '#ef4444' : '#22c55e'} 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />

          {/* Hexágonos flotantes reducidos */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 ${errorFlash ? 'text-red-400' : 'text-green-400'} opacity-10`}
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                animation: `float ${4 + i * 0.5}s ease-in-out infinite alternate`,
                fontSize: '12px'
              }}
            >
              ⬢
            </div>
          ))}
        </div>

        {/* Terminal Output */}
        <div className="relative z-10 p-3 overflow-y-auto max-h-96">
          <div
            className={`font-mono text-xs leading-relaxed transition-colors duration-300 ${errorFlash ? 'text-red-300' : 'text-green-300'
              }`}
            style={{
              fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
              fontSize: 'clamp(10px, 2vw, 14px)'
            }}
          >
            {isInitialized && terminalHistory.map((line, index) => (
              <div
                key={index}
                className="mb-1 whitespace-pre-wrap"
                style={{ animation: `fadeIn 0.3s ease-out ${index * 0.1}s both` }}
              >
                {line}
              </div>
            ))}

            {/* Input line */}
            {isInitialized && (
              <div className="flex items-center mt-2">
                <span className={`mr-2 ${errorFlash ? 'text-red-400' : 'text-green-400'}`}>
                  {CURRENT_PATH}&gt;
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent outline-none flex-1 text-green-300 caret-green-400"
                  style={{ fontSize: 'clamp(10px, 2vw, 14px)' }}
                  placeholder="Escribe un comando..."
                  autoFocus
                />
                <span className={`ml-1 w-2 h-4 ${errorFlash ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}></span>
              </div>
            )}
          </div>
        </div>

        {/* Status bar inferior */}
        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-t border-green-500/30 p-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-green-400">USUARIO: osifraga</span>
            <span className="text-green-400">SESIÓN: {isInitialized ? 'ACTIVA' : 'INICIANDO...'}</span>
            <span className={`${errorFlash ? 'text-red-400' : 'text-green-400'}`}>
              COMANDOS: {COMMAND_COUNT}
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default NervTerminal
