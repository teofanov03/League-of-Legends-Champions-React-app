import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FadeContent from './FadeContent'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function ChampionPage() {
  const { championId } = useParams();
  const [champion, setChampion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSkin, setActiveSkin] = useState("");

  useEffect(() => {
    const fetchChampion = async () => {
      try {
        const res = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion/${championId}.json`
        );
        const data = await res.json();
        const champData = data.data[championId];
        setChampion(champData);
        setActiveSkin(champData.skins[0]?.name || "");
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchChampion();
  }, [championId]);

  if (loading) return <p className="text-center mt-10">Loading champion...</p>;
  if (!champion) return <p className="text-center mt-10">Champion not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white p-6">
    <Link
        to="/"
        className="inline-block mb-4 px-5 py-2 font-semibold rounded-lg text-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 shadow-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300"
    >
        &larr; Back
    </Link>

     
     
      
      <h1 className="text-4xl font-bold mb-2 text-center text-yellow-300">
        {champion.name} - {champion.title}
      </h1>
      
      <FadeContent blur={false} duration={1200} easing="ease-in-out" initialOpacity={0}  delay={300}>
      <p className="text-gray-300 mb-8 max-w-4xl mx-auto text-center leading-relaxed">
        {champion.lore}
      </p>
    </FadeContent>
     
      <h2 className="text-3xl font-semibold mb-6 text-yellow-300 text-center">
        Skins
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{ clickable: true }}
        className="w-full max-w-5xl mx-auto"
        onSlideChange={(swiper) =>
          setActiveSkin(champion.skins[swiper.realIndex].name)
        }
      >
        {champion.skins.map((skin) => (
          <SwiperSlide key={skin.num}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`}
              alt={skin.name}
              className="w-full h-[500px] object-fill rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      
      <div className="text-center mt-4">
        <p className="text-lg text-yellow-200 font-semibold">{activeSkin}</p>
      </div>

      
      <h2 className="text-3xl font-semibold mt-12 mb-6 text-yellow-300 text-center">
      Abilities
      </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        
        <div className="flex items-start bg-gray-800 bg-opacity-60 rounded-lg p-4 shadow-lg transition-transform duration-300 ease-out transform hover:scale-105 hover:shadow-2xl hover:bg-gray-700">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.20.1/img/passive/${champion.passive.image.full}`}
            alt={champion.passive.name}
            className="w-16 h-16 mr-4 rounded"
          />
          <div>
            <h3 className="text-xl font-bold text-yellow-200">
              Passive: {champion.passive.name}
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              {champion.passive.description}
            </p>
          </div>
        </div>

        
        {champion.spells.map((spell, index) => (
          <div
            key={spell.id}
            className="flex items-start bg-gray-800 bg-opacity-60 rounded-lg p-4 shadow-lg transition-transform duration-300 ease-out transform hover:scale-105 hover:shadow-2xl hover:bg-gray-700"
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.20.1/img/spell/${spell.image.full}`}
              alt={spell.name}
              className="w-16 h-16 mr-4 rounded"
            />
            <div>
              <h3 className="text-xl font-bold text-yellow-200">
                {["Q", "W", "E", "R"][index]}: {spell.name}
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                {spell.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
