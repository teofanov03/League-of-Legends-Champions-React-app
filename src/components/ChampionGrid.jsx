import React from "react";
import ChampionCard from "./ChampionCard";

export default function ChampionGrid({ champions, onChampionClick }) {
  if (!champions || champions.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No champions to display.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {champions.map((champ) => (
        <ChampionCard
          key={champ.id}
          champion={champ}
          onClick={() => onChampionClick(champ.id)}
        />
      ))}
    </div>
  );
}
