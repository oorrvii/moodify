import { useState, useEffect } from 'react'

function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('moodify-favorites') || '[]')
    setFavorites(saved)
  }, [])

  if(favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-5xl mb-4">🎵</div>
        <h2 className="text-white text-xl font-medium">No favorites yet!</h2>
        <p className="text-white/40 text-sm mt-2">Complete the quiz to get your playlist</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-28 pb-16">
      <div className="w-full max-w-xl">
        <h2 className="text-white text-2xl font-semibold mb-6">Your saved vibes</h2>
        <div className="flex flex-col gap-4">
          {favorites.map((fav, index) => (
            <div key={index} className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
              <span className="text-xs text-purple-400 font-medium tracking-widest uppercase">Vibe</span>
              <h3 className="text-white text-xl font-semibold mt-1 mb-2">{fav.mood}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{fav.personality}</p>
              <div className="flex flex-col">
                {fav.songs.map((song, songIndex) => (
                  <a
                    key={songIndex}
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default Favorites