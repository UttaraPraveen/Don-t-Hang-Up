"use client";
import React, { useState } from "react";

interface RotaryDialProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
  disabled: boolean;
}

export default function RotaryDial({ genres, selectedGenre, onSelect, disabled }: RotaryDialProps) {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleDial = (genre: string) => {
    if (disabled) return;
    setIsSpinning(true);
    onSelect(genre);
    
    // Reset the spin animation after it completes
    setTimeout(() => {
      setIsSpinning(false);
    }, 500); 
  };

  return (
    <div className="flex flex-col items-center justify-center my-6">
      <div className="text-zinc-500 font-mono text-xs mb-4 uppercase tracking-widest">
        Select Frequency
      </div>
      
      {/* The Main Dial Base */}
      <div 
        className={`relative w-56 h-56 rounded-full bg-zinc-800 border-8 border-zinc-900 shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform duration-500 ease-in-out ${
          isSpinning ? "-rotate-90" : "rotate-0"
        }`}
      >
        {/* Center Pivot */}
        <div className="absolute w-12 h-12 bg-zinc-700 rounded-full border-4 border-zinc-900 shadow-xl z-10" />

        {/* Placing the Genres in a Circle using Math */}
        {genres.map((genre, index) => {
          // Calculate positions (starting from top, going clockwise)
          const angle = (index / genres.length) * 360 - 90; 
          const radian = angle * (Math.PI / 180);
          const radius = 80; // Distance from center
          
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          const isSelected = selectedGenre === genre;

          return (
            <button
              key={genre}
              onClick={() => handleDial(genre)}
              disabled={disabled}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              className={`absolute w-14 h-14 rounded-full flex items-center justify-center text-[8px] font-mono border-2 transition-all duration-200 ${
                isSelected
                  ? "bg-amber-500 border-amber-300 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:border-zinc-500"
              } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <span className="truncate w-10 text-center">{genre.substring(0, 4).toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}