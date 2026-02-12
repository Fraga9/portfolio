export default async function handler(req, res) {
  const API_KEY = process.env.LASTFM_API_KEY
  const username = "Fraga9"

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" })
  }

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${API_KEY}&limit=1&format=json`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Last.fm API returned ${response.status}`)
    }

    const data = await response.json()

    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60')
    res.status(200).json(data)
  } catch (error) {
    console.error('Last.fm API error:', error)
    res.status(500).json({ error: "Failed to fetch Last.fm data" })
  }
}
