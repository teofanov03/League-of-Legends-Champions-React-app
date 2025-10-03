import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChampionGrid from "./components/ChampionGrid";
import ChampionPage from "./components/ChampionPage";
import Shuffle from './components/Shuffle';
import ScrollToTopButton from "./components/ScrollToTop";

function App() {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ← novo

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const res = await fetch(
          "https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion.json"
        );
        const data = await res.json();
        setChampions(Object.values(data.data));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchChampions();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading champions...</p>;

  // filtriranje šampiona po searchTerm
  const filteredChampions = champions.filter((champ) =>
    champ.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen p-6 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
              <h1 className="text-3xl font-bold text-center mb-6">
                 <Shuffle
                  text="🎮 League of Legends Champions"
                  shuffleDirection="right"
                  duration={0.8}          
                  animationMode="evenodd"
                  shuffleTimes={2}       
                  ease="power3.out"
                  stagger={0.04}           
                  threshold={0.1}
                  triggerOnce={true}       
                  triggerOnHover={true}    
                  respectReducedMotion={true}
                  className="text-4xl sm:text-5xl font-extrabold text-yellow-400 drop-shadow-lg"
                />
              </h1>

             {/* Search input sa ikonicom lupa */}
<div className="flex justify-center mb-6">
  <div className="relative w-full sm:w-1/2 md:w-1/3">
    <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      {/* Lupa ikonica */}
      <svg
        className="w-5 h-5 text-gray-300"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
        />
      </svg>
    </span>
    <input
      type="text"
      placeholder="Search champion..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full px-10 py-2 rounded-md bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
  </div>
</div>


              <ChampionGrid champions={filteredChampions} />
            </div>
          }
        />
        <Route
          path="/champion/:championId"
          element={<ChampionPage />}
        />
      </Routes>
      <ScrollToTopButton />
    </Router>
  );
}

export default App;
