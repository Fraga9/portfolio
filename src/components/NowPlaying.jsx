"use client"

import { useState, useEffect } from "react"

export default function NowPlaying() {
  const [trackInfo, setTrackInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        setLoading(true)
        const API_KEY = import.meta.env.VITE_LASTFM_API_KEY
        const username = "Fraga9" // Usuario de Last.fm

        // Endpoint para obtener la información de la última canción
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${API_KEY}&limit=1&format=json`
        
        const response = await fetch(url)
        console.log("response", response)
        
        if (!response.ok) {
          throw new Error("Error al obtener datos de Last.fm")

        }
        
        const data = await response.json()
        console.log("data", data)
        
        // Verificar si hay tracks en la respuesta
        if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length > 0) {
          const lastTrack = data.recenttracks.track[0]
          
          // Verificar si la canción está sonando actualmente
          const isNowPlaying = lastTrack["@attr"] && lastTrack["@attr"].nowplaying === "true"
          
          setTrackInfo({
            artist: lastTrack.artist["#text"],
            track: lastTrack.name,
            album: lastTrack.album["#text"],
            image: lastTrack.image[2]["#text"], // Imagen mediana
            url: lastTrack.url,
            isNowPlaying
          })
        } else {
          throw new Error("No se encontraron canciones recientes")
        }
      } catch (err) {
        console.error("Error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNowPlaying()

    // Actualizar cada 30 segundos
    const intervalId = setInterval(fetchNowPlaying, 30000)
    
    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <div className="w-4 h-4 rounded-full bg-gray-700 animate-pulse"></div>
        <span>Cargando música...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-sm text-gray-400">
        No se pudo cargar la información musical
      </div>
    )
  }

  if (!trackInfo) return null

  return (
    <a 
      href={trackInfo.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center space-x-3 p-3 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/40 transition-all group"
    >
      <div className="relative flex-shrink-0">
        {trackInfo.image ? (
          <img 
            src={trackInfo.image || "/placeholder.svg"} 
            alt={`${trackInfo.album} cover`} 
            className="w-12 h-12 rounded-md object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-md bg-gray-800 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
        )}
        
        {trackInfo.isNowPlaying && (
          <div className="absolute -top-1 -right-1 flex items-center justify-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col min-w-0">
        <div className="flex items-center">
          <span className="text-xs uppercase tracking-wider text-gray-500 mr-2">
            {trackInfo.isNowPlaying ? "Escuchando ahora" : "Última canción"}
          </span>
          {trackInfo.isNowPlaying && (
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></div>
              <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "200ms" }}></div>
              <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "400ms" }}></div>
            </div>
          )}
        </div>
        <p className="text-sm font-medium text-white truncate group-hover:text-[#d0ff00] transition-colors">
          {trackInfo.track}
        </p>
        <p className="text-xs text-gray-400 truncate">
          {trackInfo.artist} • {trackInfo.album}
        </p>
      </div>
    </a>
  )
}
