import {useEffect,useState} from 'react'

function Results() {
const [result, setResult] = useState(null)
const [loading, setLoading] = useState(true)
useEffect(() => {
  const answers = JSON.parse(localStorage.getItem('answers'))
  
  
  const fetchResult = async () => {
    try{
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [
          { role: 'user', content: 
            `Based on these quiz answers: ${JSON.stringify(answers)}

The possible music moods are: Melancholic, Chill/Lofi, Energetic, Intense/Rock, Romantic, Party, Gym, Focus/Study, Heartbreak, Nostalgic, Spiritual/Peace.

Analyze the answers and return a JSON object with exactly this structure and nothing else, no extra text:
{
  "mood": "one of the 11 moods above",
  "personality": "a fun 2-3 line description of this person's vibe",
  "songs": [
    {"title": "song name", "artist": "artist name", "spotifySearch": "song name artist name"},
    ... 8 more songs
  ]
}`
           }
        ]
      })
    })
    const data = await response.json()
    const text = data.choices[0].message.content
    const parsed = JSON.parse(text)
    setResult(parsed)
    setLoading(false)
  }
  catch (error) {
    console.error(error)
    setLoading(false)
  }
}
  fetchResult()
}, [])


if(loading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-5xl mb-4 animate-pulse">🎵</div>
      <h2 className="text-white text-xl font-medium">Finding your vibe...</h2>
      <p className="text-white/40 text-sm mt-2">Analyzing your personality</p>
    </div>
  )
}

if(!result) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-5xl mb-4">😢</div>
      <h2 className="text-white text-xl font-medium">Something went wrong</h2>
      <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 rounded-xl border border-white/10 text-white/60 hover:text-white text-sm transition-colors">
        Try again
      </button>
    </div>
  )
}

return (
  <div className="min-h-screen flex flex-col items-center px-4 pt-28 pb-16">
    <div className="w-full max-w-xl">
      <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 mb-4">
        <span className="text-xs text-purple-400 font-medium tracking-widest uppercase">Your vibe</span>
        <h2 className="text-white text-3xl font-semibold mt-2 mb-3">{result.mood}</h2>
        <p className="text-white/50 text-sm leading-relaxed">{result.personality}</p>
      </div>

      <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 mb-4">
        <h3 className="text-white/40 text-xs font-medium tracking-widest uppercase mb-4">Your playlist</h3>
        <div className="flex flex-col">
          {result.songs.map((song, index) => (
            <a
              key={index}
              href={`https://open.spotify.com/search/${encodeURIComponent(song.spotifySearch)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between py-3 border-b border-white/5 last:border-none group"
            >
              <div>
                <p className="text-white text-sm font-medium group-hover:text-purple-400 transition-colors">{song.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{song.artist}</p>
              </div>
              <span className="text-white/20 group-hover:text-purple-400 text-xs transition-colors">Play ↗</span>
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={() => saveResult()}
        className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors mb-3"
      >
        Save to favorites
      </button>
      <button
        onClick={() => navigate('/')}
        className="w-full py-3 rounded-xl border border-white/10 text-white/40 hover:text-white text-sm transition-colors"
      >
        Retake quiz
      </button>
    </div>
  </div>
)
}

export default Results