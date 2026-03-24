"use client";
import React, { useState } from "react";

interface RotaryDialProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
  disabled: boolean;
}

export default function RotaryDial({ genres, selectedGenre, onSelect, disabled }: RotaryDialProps) {
  const [spinAngle, setSpinAngle] = useState(0);

  const handleDial = (genre: string, index: number) => {
    if (disabled) return;
    onSelect(genre);
    
    // Calculate rotation to pull the number to the "stopper" (right side)
    const currentAngle = (index / genres.length) * 360;
    const targetAngle = currentAngle + 180; 
    setSpinAngle(targetAngle);
    
    // Snap back animation
    setTimeout(() => {
      setSpinAngle(0);
    }, 600); 
  };

  return (
    <div className="flex flex-col items-center justify-center relative w-full">
      <div className="text-[#d4af37] font-serif text-xs mb-6 uppercase tracking-[0.2em] font-bold drop-shadow-md">
        Select Directory
      </div>
      
      {/* Outer Brass Ring */}
      <div 
        className="relative w-64 h-64 rounded-full flex items-center justify-center bg-gradient-to-br from-[#e0c266] via-[#d4af37] to-[#7a5c0d]"
        style={{ boxShadow: "0 15px 35px rgba(0,0,0,0.9), inset 0 4px 10px rgba(255,255,255,0.4)" }}
      >
        {/* Underlay (Shows through the holes) - The "Yellow Pages" paper look */}
        <div className="absolute w-[220px] h-[220px] rounded-full bg-[#fdf5e6] shadow-[inset_0_5px_15px_rgba(0,0,0,0.6)] flex items-center justify-center">
            {genres.map((genre, index) => {
              const angle = (index / genres.length) * 360 - 90; 
              const radian = angle * (Math.PI / 180);
              const radius = 80; 
              const x = Math.cos(radian) * radius;
              const y = Math.sin(radian) * radius;

              return (
                <div
                  key={`underlay-${genre}`}
                  className={`absolute font-mono text-[9px] font-bold text-center tracking-wider ${selectedGenre === genre ? "text-red-700 scale-110" : "text-black"}`}
                  style={{ transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)` }}
                >
                  {genre.toUpperCase()}
                </div>
              );
            })}
        </div>

        {/* The Spinning Black Dial */}
        <div 
          className="absolute w-[230px] h-[230px] rounded-full bg-black border-4 border-zinc-800"
          style={{ 
            boxShadow: "0 10px 20px rgba(0,0,0,0.6), inset 0 2px 10px rgba(255,255,255,0.1)",
            transform: `rotate(${spinAngle}deg)`,
            transition: spinAngle === 0 ? "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)" : "transform 0.4s ease-in-out"
          }}
        >
          {/* Finger Holes */}
          {genres.map((genre, index) => {
            const angle = (index / genres.length) * 360 - 90; 
            const radian = angle * (Math.PI / 180);
            const radius = 80; 
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;

            return (
              <button
                key={`hole-${genre}`}
                onClick={() => handleDial(genre, index)}
                disabled={disabled}
                className="absolute w-[36px] h-[36px] rounded-full bg-transparent flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                style={{
                  transform: `translate(calc(115px - 18px + ${x}px), calc(115px - 18px + ${y}px))`, // Center alignment math
                  boxShadow: "inset 0 4px 8px rgba(0,0,0,0.9), inset 0 -1px 2px rgba(255,255,255,0.2)"
                }}
                aria-label={genre}
              />
            );
          })}
          
          {/* Center Pivot (Brass) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#e0c266] to-[#7a5c0d]"
            style={{ boxShadow: "0 5px 10px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.5)" }}
          >
             <div className="w-full h-full rounded-full border border-black/50" />
          </div>
        </div>

        {/* Dial Stopper (Metal piece on the right) */}
        <div className="absolute right-2 top-[60%] w-8 h-2 bg-gradient-to-b from-gray-300 to-gray-600 rounded-l-full shadow-lg pointer-events-none z-10" />
      </div>
    </div>
  );
}