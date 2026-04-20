"use client"

import { useEffect, useMemo, useRef, useState } from "react"

const COMMANDS = {
  help: {
    description: "List available commands",
    execute: () => [
      "AVAILABLE COMMANDS",
      "help        Show this help list",
      "experience  Show professional experience",
      "projects    Show highlighted projects",
      "contact     Show contact information",
      "about       Show profile summary",
      "clear       Clear terminal output"
    ]
  },
  experience: {
    description: "Show professional experience",
    execute: () => [
      "EXPERIENCE",
      "CEMEX - Full Stack Intern (Feb 2025 - Aug 2025)",
      "Built 5 internal web apps for Promexma operations.",
      "Implemented LLM-assisted customer support workflows.",
      "",
      "INFOSYS - InStep Internship (Jun 2024 - Aug 2024)",
      "Developed semantic cache for chatbot PDF retrieval.",
      "Reduced processing time by 90 percent."
    ]
  },
  projects: {
    description: "Show highlighted projects",
    execute: () => [
      "PROJECTS",
      "SmartColonia: SaaS neighborhood platform (beta users: 200).",
      "Topografia CEMEX: quality-control system for road construction.",
      "LABNL Digital Library: platform used by 20,000+ monthly users."
    ]
  },
  contact: {
    description: "Show contact information",
    execute: () => [
      "CONTACT",
      "Email: garzahector1013@gmail.com",
      "LinkedIn: linkedin.com/in/osifraga",
      "GitHub: github.com/Fraga9",
      "Devpost: devpost.com/garzahector1013",
      "Location: Monterrey, Mexico"
    ]
  },
  about: {
    description: "Show profile summary",
    execute: () => [
      "ABOUT",
      "Computer Science student at Tecnologico de Monterrey.",
      "Focus: Full Stack, AI systems, and developer tooling.",
      "Built products serving 20,000+ monthly users.",
      "Open to software engineering opportunities."
    ]
  },
  clear: {
    description: "Clear terminal output",
    execute: () => []
  }
}

const ALIASES = {
  experiencia: "experience",
  proyecto: "projects",
  contacto: "contact",
  sobre: "about"
}

const COMMAND_NAMES = Object.keys(COMMANDS)
const MAX_HISTORY_LINES = 220
const PROMPT = "osifraga@cli:~$"

const ASCII_LOGO = `   ____       _ ____                               ___
  / __ \\_____(_) __/________ _____ _____ _   _____/ (_)
 / / / / ___/ / /_/ ___/ __ \`/ __ \`/ __ \`/  / ___/ / /
/ /_/ (__  ) / __/ /  / /_/ / /_/ / /_/ /  / /__/ / /
\\____/____/_/_/ /_/   \\__,_/\\__, /\\__,_/   \\___/_/_/
                            /____/                      `

function normalizeCommand(input) {
  const value = input.trim().toLowerCase()
  if (!value) return ""
  const [head, ...rest] = value.split(/\s+/)
  const resolved = ALIASES[head] || head
  return [resolved, ...rest].join(" ")
}

function getSuggestions(value) {
  const query = value.trim().toLowerCase()
  if (!query) return []

  return COMMAND_NAMES
    .map((name) => {
      if (name === query) return { name, score: 3 }
      if (name.startsWith(query)) return { name, score: 2 }
      if (name.includes(query)) return { name, score: 1 }
      return null
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .map((item) => item.name)
}

function pushLines(prev, lines) {
  const next = [...prev, ...lines]
  if (next.length <= MAX_HISTORY_LINES) return next
  return next.slice(next.length - MAX_HISTORY_LINES)
}

export default function NervTerminal({ onClose }) {
  const [isReady, setIsReady] = useState(false)
  const [status, setStatus] = useState("READY")
  const [minimized, setMinimized] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [input, setInput] = useState("")
  const [output, setOutput] = useState([])
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const outputRef = useRef(null)

  const suggestions = useMemo(() => getSuggestions(input), [input])
  const activeSuggestion = suggestions[suggestionIndex] || suggestions[0] || ""
  const ghostText =
    input.trim() &&
      activeSuggestion &&
      activeSuggestion.startsWith(input.trim().toLowerCase())
      ? activeSuggestion.slice(input.trim().length)
      : ""

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsReady(true)
      setOutput([
        "OSIFRAGA CLI v1.0",
        "Type 'help' to view available commands.",
        ""
      ])
    }, 450)

    const statusTimer = setInterval(() => {
      setStatus((prev) => (prev === "READY" ? "ACTIVE" : "READY"))
    }, 6000)

    return () => {
      clearTimeout(initTimer)
      clearInterval(statusTimer)
    }
  }, [])

  useEffect(() => {
    if (!outputRef.current) return
    outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [output])

  useEffect(() => {
    setSuggestionIndex(0)
  }, [input])

  const runCommand = (rawInput) => {
    const trimmed = rawInput.trim()
    const resolved = normalizeCommand(trimmed)
    const [command] = resolved.split(/\s+/)

    if (!trimmed) {
      setOutput((prev) => pushLines(prev, [""]))
      return
    }

    setCommandHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    if (command === "clear") {
      setOutput([])
      return
    }

    if (!COMMANDS[command]) {
      const hint = getSuggestions(command)[0]
      setOutput((prev) =>
        pushLines(prev, [
          `${PROMPT} ${trimmed}`,
          hint
            ? `Command not found: '${trimmed}'. Did you mean '${hint}'?`
            : `Command not found: '${trimmed}'. Type 'help'.`,
          ""
        ])
      )
      return
    }

    const lines = COMMANDS[command].execute()
    setOutput((prev) => pushLines(prev, [`${PROMPT} ${trimmed}`, ...lines, ""]))
  }

  const applySuggestion = () => {
    if (!activeSuggestion) return false
    setInput(activeSuggestion)
    return true
  }

  const onKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault()
      applySuggestion()
      return
    }

    if (e.key === "ArrowRight") {
      if (ghostText) {
        e.preventDefault()
        applySuggestion()
      }
      return
    }

    if (e.key === "ArrowDown") {
      if (suggestions.length > 0 && input.trim()) {
        e.preventDefault()
        setSuggestionIndex((prev) => (prev + 1) % suggestions.length)
        return
      }

      if (commandHistory.length > 0) {
        e.preventDefault()
        if (historyIndex <= 0) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          const nextIndex = historyIndex - 1
          setHistoryIndex(nextIndex)
          setInput(commandHistory[nextIndex])
        }
      }
      return
    }

    if (e.key === "ArrowUp") {
      if (commandHistory.length > 0) {
        e.preventDefault()
        const nextIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.min(commandHistory.length - 1, historyIndex + 1)
        setHistoryIndex(nextIndex)
        setInput(commandHistory[nextIndex])
      }
      return
    }

    if (e.key === "Enter") {
      e.preventDefault()
      runCommand(input)
      setInput("")
    }
  }

  const shell = (
    <div
      className={
        fullscreen
          ? "fixed inset-4 md:inset-10 z-[200] rounded-xl border border-blue-500/30 bg-[#060b17] shadow-[0_0_80px_rgba(17,24,39,0.9)] overflow-hidden flex flex-col"
          : "w-full rounded-xl border border-blue-500/30 bg-[#060b17] shadow-[0_0_40px_rgba(17,24,39,0.45)] overflow-hidden flex flex-col " +
          (minimized ? "h-9" : "h-[380px] md:h-[320px]")
      }
    >
      {/* Title bar */}
      <div className="h-9 flex-shrink-0 px-3 border-b border-blue-500/25 bg-[#0d1117] flex items-center justify-center relative">
        <div className="absolute left-3 flex items-center gap-1.5 group/btns">
          {/* Red — close */}
          <button
            onClick={onClose}
            title="Close"
            aria-label="Close terminal"
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center"
          >
            <svg className="opacity-0 group-hover/btns:opacity-100 transition-opacity" width="6" height="6" viewBox="0 0 6 6" fill="none">
              <line x1="1.2" y1="1.2" x2="5.2" y2="5.2" stroke="#7f0000" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="5.2" y1="1.2" x2="1.2" y2="5.2" stroke="#7f0000" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          {/* Yellow — minimize */}
          <button
            onClick={() => setMinimized(m => !m)}
            title={minimized ? "Restore" : "Minimize"}
            aria-label={minimized ? "Restore terminal" : "Minimize terminal"}
            className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors flex items-center justify-center"
          >
            <svg className="opacity-0 group-hover/btns:opacity-100 transition-opacity" width="6" height="2" viewBox="0 0 6 2" fill="none">
              <rect x="0.4" y="0.3" width="6" height="2" rx="0.5" fill="#78500a" />
            </svg>
          </button>
          {/* Green — fullscreen */}
          <button
            onClick={() => { setFullscreen(f => !f); setMinimized(false) }}
            title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center"
          >
            <svg className="opacity-0 group-hover/btns:opacity-100 transition-opacity" width="6" height="6" viewBox="0 0 8 8" fill="none">
              <rect x="0" y="4" width="3.8" height="3.8" fill="#155228" />
              <rect x="4.2" y="0.2" width="3.8" height="3.8" fill="#155228" />
              <line x1="0.5" y1="7.5" x2="7.5" y2="0.5" stroke="#155228" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
        <span className="font-mono text-[11px] text-blue-200/70 tracking-wide">
          osifraga@cli: ~/portfolio/{status.toLowerCase()}
        </span>
      </div>

      {/* Body — hidden when minimized */}
      {!minimized && (
        <>
          <div
            className="relative flex-1 overflow-hidden flex flex-col"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          >
            <div className="flex-shrink-0 px-3 pt-3 pb-2 border-b border-blue-500/15 overflow-x-auto">
              <pre
                className="font-mono text-blue-300/90 leading-none select-none"
                style={{ fontSize: fullscreen ? "clamp(7px, 1.6vw, 13px)" : "clamp(5px, 1.4vw, 9px)" }}
                aria-hidden="true"
              >{ASCII_LOGO}</pre>
            </div>

            <div
              ref={outputRef}
              className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-blue-100"
              role="log"
              aria-live="polite"
            >
              {!isReady && <div className="text-blue-200/80">Booting osifraga cli...</div>}
              {isReady && output.map((line, idx) => (
                <div key={`${idx}-${line}`} className="whitespace-pre-wrap" style={{ animation: `fadeIn 0.2s ease-out ${idx * 0.01}s both` }}>
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[42px] px-4 border-t border-blue-500/25 bg-[#0b1224] flex items-center font-mono text-sm">
            <span className="text-green-300 mr-2 select-none">{PROMPT}</span>
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="w-full bg-transparent text-blue-100 outline-none"
                placeholder="Type a command..."
                autoFocus
                spellCheck={false}
              />
              {ghostText && (
                <span className="absolute left-0 top-0 pointer-events-none text-blue-300/40 select-none">
                  {input}
                  <span className="text-green-300/70">{ghostText}</span>
                </span>
              )}
            </div>

            {suggestions.length > 0 && input.trim() && (
              <div className="absolute left-[145px] right-4 bottom-[44px] bg-[#0a1020] border border-blue-500/30 rounded-md shadow-lg overflow-hidden z-20">
                {suggestions.slice(0, 5).map((item, idx) => (
                  <div
                    key={item}
                    className={`px-3 py-1.5 text-xs font-mono ${idx === suggestionIndex ? "bg-blue-500/20 text-green-300" : "text-blue-100/90"}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )

  return (
    <>
      {fullscreen && (
        <div
          className="fixed inset-0 z-[199] bg-black/70 backdrop-blur-sm"
          onClick={() => setFullscreen(false)}
        />
      )}
      {shell}
    </>
  )
}
