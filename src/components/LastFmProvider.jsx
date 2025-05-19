"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Crear el contexto
const LastFmContext = createContext(null)

// Hook personalizado para usar el contexto
export function useLastFm() {
  const context = useContext(LastFmContext)
  if (!context) {
    throw new Error("useLastFm debe ser usado dentro de un LastFmProvider")
  }
  return context
}

export function LastFmProvider({ children, apiKey, username = "Fraga9" }) {
  const [trackInfo, setTrackInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNowPlaying = async () => {
    try {
      setLoading(true)
      
      // Endpoint para obtener la información de la última canción
      const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&limit=1&format=json`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error("Error al obtener datos de Last.fm")
      }
      
      const data = await response.json()
      
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

  useEffect(() => {
    if (!apiKey) {
      setError("API Key no proporcionada")
      setLoading(false)
      return
    }
    
    fetchNowPlaying()
    
    // Actualizar cada 60 segundos
    const intervalId = setInterval(fetchNowPlaying, 60000)
    
    return () => clearInterval(intervalId)
  }, [apiKey, username])

  return (
    <LastFmContext.Provider value={{ trackInfo, loading, error, refetch: fetchNowPlaying }}>
      {children}
    </LastFmContext.Provider>
  )
}
