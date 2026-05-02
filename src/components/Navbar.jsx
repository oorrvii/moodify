import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0F0F0F] border-b border-white/10">
      <span className="text-white text-xl font-semibold tracking-tight">Moodify 🎵</span>
      <div className="flex gap-6">
        <Link to="/" className="text-white/60 hover:text-white text-sm transition-colors">Home</Link>
        <Link to="/favorites" className="text-white/60 hover:text-white text-sm transition-colors">Favorites</Link>
      </div>
    </nav>
  )
}

export default Navbar