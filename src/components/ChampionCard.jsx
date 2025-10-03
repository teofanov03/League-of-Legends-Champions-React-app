import React from "react";
import { Link } from "react-router-dom";
import TiltedCard from "./TiltedCard";

export default function ChampionCard({ champion }) {
  return (
    <Link
      to={`/champion/${champion.id}`}
      className="block w-full h-full" 
       title="Click to view champion details"
    >
     <TiltedCard
      imageSrc={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
      altText={champion.name}
      captionText={champion.name}
      containerHeight="300px"
      containerWidth="100%"
      imageHeight="300px"
      imageWidth="100%"
      rotateAmplitude={12}
      scaleOnHover={1.05}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={true}
      overlayContent={
        <div className="absolute top-35 left-53 w-full h-full flex items-center justify-center bg-black text-white text-center text-lg sm:text-xl md:text-2xl font-bold">
          {champion.name}
        </div>
      }
    />

    </Link>
  );
}
