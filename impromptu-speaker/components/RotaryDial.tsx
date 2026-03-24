"use client";
import React from "react";

interface RotaryDialProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
  disabled: boolean;
}

export default function RotaryDial({ genres, selectedGenre, onSelect, disabled }: RotaryDialProps) {
  const selectedIndex = genres.indexOf(selectedGenre);
  const anglePerItem = 360 / genres.length;
  // Rotate the carousel in the opposite direction so the selected item faces front
  const carouselRotation = selectedIndex * -anglePerItem;

  return (
    <div className="flex flex-col items-center justify-center my-12 perspective-[1000px]">
      <div className="text-cyan-600/70 font-mono text-[10px] mb-8 uppercase tracking-[0.3em]">
        Select Frequency Protocol
      </div>
      
      {/* 3D Scene Container */}
      <div className="relative w-full h-24 flex items-center justify-center">
        {/* The Rotating Cylinder */}
        <div 
          className="relative w-40 h-16 preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `rotateY(${carouselRotation}deg)` }}
        >
          {genres.map((genre, index) => {
            const angle = index * anglePerItem;
            const isSelected = selectedGenre === genre;
            // The magic Z-translation that pushes items out into a 3D circle
            const translateZ = 120; 

            return (
              <button
                key={genre}
                onClick={() => !disabled && onSelect(genre)}
                disabled={disabled}
                className={`absolute inset-0 m-auto w-32 h-12 flex items-center justify-center font-mono text-xs tracking-wider transition-all duration-500 ${
                  isSelected 
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.4)]" 
                    : "bg-black/40 text-cyan-800 border border-cyan-900/50 hover:text-cyan-500 hover:border-cyan-700"
                }`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                  backfaceVisibility: "hidden", // Hide items when they rotate to the back
                  clipPath: "polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)" // Cool sci-fi hexagon shape
                }}
              >
                {genre.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}