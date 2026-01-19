"use client"

import { useEffect, useRef } from "react"

const technologies = [
  // Frontend
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "React Native", category: "Mobile" },
  { name: "Svelte", category: "Frontend" },
  { name: "Astro", category: "Frontend" },

  // Backend
  { name: "FastAPI", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: ".NET Core", category: "Backend" },
  { name: "Node.js", category: "Backend" },

  // Databases
  { name: "PostgreSQL", category: "Database" },
  { name: "Firebase", category: "Database" },
  { name: "Supabase", category: "Database" },

  // AI/ML
  { name: "PyTorch", category: "AI/ML" },
  { name: "LLMs", category: "AI/ML" },
  { name: "Qdrant", category: "AI/ML" },
  { name: "Semantic Search", category: "AI/ML" },
  { name: "TensorFlow", category: "AI/ML" },

  // Mobile/Other
  { name: "Android/Kotlin", category: "Mobile" },
  { name: "Expo", category: "Mobile" },
  { name: "Amazon S3", category: "Cloud" },
  { name: "Vercel", category: "Cloud" },
]

export default function TechCarousel() {
  const scrollRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollPosition = 0
    const scrollSpeed = 0.5 // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed

      // Cuando llegamos al final del primer conjunto, reiniciamos
      const maxScroll = scrollContainer.scrollWidth / 2
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0
      }

      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Duplicar el array para seamless loop
  const duplicatedTechs = [...technologies, ...technologies]

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient overlays para fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Carousel container */}
      <div
        ref={scrollRef}
        className="flex gap-4 will-change-transform"
        style={{
          width: 'fit-content',
        }}
      >
        {duplicatedTechs.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="group relative flex-shrink-0 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0ff00]/50 rounded-xl transition-all duration-300 cursor-default"
          >
            {/* Tech name */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white group-hover:text-[#d0ff00] transition-colors">
                {tech.name}
              </span>
            </div>

            {/* Category badge - aparece en hover */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-[10px] bg-[#d0ff00] text-black px-2 py-0.5 rounded-full font-medium">
                {tech.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
