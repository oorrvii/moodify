import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Results from './pages/Results';
import Favourites from './pages/Favourites';
import Navbar from './components/Navbar';

function App() {
  return (
<div>
  <Navbar />
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/results" element={<Results />} />
  <Route path="/favorites" element={<Favourites />} />
</Routes>
</div>
  )
}

export default App
