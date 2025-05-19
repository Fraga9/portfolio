"use client"

import { useState, useEffect } from "react"

export default function NowPlayingCompact() {
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
            image: lastTrack.image[1]["#text"], // Imagen pequeña
            url: lastTrack.url,
            isNowPlaying,
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

    // Actualizar cada 60 segundos
    const intervalId = setInterval(fetchNowPlaying, 60000)

    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-xs text-gray-400">
        <div className="w-3 h-3 rounded-full bg-gray-700 animate-pulse"></div>
        <span>Cargando...</span>
      </div>
    )
  }

  if (error || !trackInfo) {
    return null
  }

  return (
    <a href={trackInfo.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 group">
      {trackInfo.isNowPlaying && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      )}

      <span className="text-xs text-gray-400 group-hover:text-[#d0ff00] transition-colors truncate max-w-[150px]">
        {trackInfo.track} - {trackInfo.artist}
      </span>
    </a>
  )
}
