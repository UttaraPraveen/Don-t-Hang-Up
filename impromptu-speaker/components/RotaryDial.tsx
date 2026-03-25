"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

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
    
    const angleOfHole = (index / genres.length) * 360 - 90;
    const stopperAngle = 120;
    const requiredSpin = stopperAngle - angleOfHole;
    
    setSpinAngle(requiredSpin > 0 ? requiredSpin : requiredSpin + 360);
    setTimeout(() => setSpinAngle(0), 600); 
  };

  return (
    <div className="relative flex justify-center items-center w-[200px] h-[200px]">
      
      {/* 1. Base Plate & Numbers (Tan Color) */}
      <div className="absolute inset-0 rounded-full bg-[#E5CAA4] shadow-[inset_0_10px_20px_rgba(255,255,255,0.4),0_10px_20px_rgba(0,0,0,0.3)] border border-[#CDB18B]">
        {genres.map((genre, index) => {
          const angle = (index / genres.length) * 360 - 90; 
          const radian = angle * (Math.PI / 180);
          const radius = 62; 
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <div
              key={`text-${genre}`}
              className={`absolute font-sans text-[12px] font-bold tracking-wider text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors ${selectedGenre === genre ? "text-[#4A5D66]" : "text-[#8A7150]"}`}
              style={{ transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)` }}
            >
              {genre}
            </div>
          );
        })}

        {/* Center Detail */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#5A6D76] shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)] border-4 border-[#CDB18B]" />
      </div>

      {/* 2. Tan Plastic Dial (Spins) */}
      <motion.div 
        animate={{ rotate: spinAngle }}
        transition={{ 
          type: spinAngle === 0 ? "spring" : "tween", 
          duration: spinAngle === 0 ? 0.8 : 0.4,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full z-10 drop-shadow-md"
      >
        {genres.map((genre, index) => {
          const angle = (index / genres.length) * 360 - 90; 
          const radian = angle * (Math.PI / 180);
          const radius = 62; 
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <button
              key={`hole-${genre}`}
              onClick={() => handleDial(genre, index)}
              disabled={disabled}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full bg-[#C8AA81] cursor-pointer hover:bg-[#D4B892] shadow-[inset_0_4px_8px_rgba(0,0,0,0.4),0_2px_4px_rgba(255,255,255,0.5)]"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              aria-label={genre}
            />
          );
        })}
      </motion.div>

      {/* 3. The Stopper */}
      <div className="absolute z-20 top-[65%] right-0 w-8 h-2.5 rounded-full bg-gradient-to-b from-[#8A9CA5] to-[#4A5D66] shadow-[0_4px_6px_rgba(0,0,0,0.4)] pointer-events-none transform rotate-[30deg]" />

    </div>
  );
}