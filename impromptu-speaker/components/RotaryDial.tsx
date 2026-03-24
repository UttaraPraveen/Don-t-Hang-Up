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
    
    // Calculate how far to spin to hit the stopper (bottom right)
    const angleOfHole = (index / genres.length) * 360 - 90;
    const stopperAngle = 120; // Stopper position
    const requiredSpin = stopperAngle - angleOfHole;
    
    setSpinAngle(requiredSpin > 0 ? requiredSpin : requiredSpin + 360);
    
    // Spring back
    setTimeout(() => setSpinAngle(0), 600); 
  };

  return (
    <div className="relative flex justify-center items-center w-[220px] h-[220px]">
      
      {/* 1. Base Plate & Numbers (Does not spin) */}
      <div className="absolute inset-0 rounded-full bg-black border-[6px] border-[#111] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8),0_5px_15px_rgba(0,0,0,0.5)]">
        {genres.map((genre, index) => {
          const angle = (index / genres.length) * 360 - 90; 
          const radian = angle * (Math.PI / 180);
          const radius = 68; 
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <div
              key={`text-${genre}`}
              className={`absolute font-serif text-[11px] font-bold tracking-widest text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${selectedGenre === genre ? "text-red-500 drop-shadow-[0_0_2px_red]" : "text-white"}`}
              style={{ transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)` }}
            >
              {genre.toUpperCase()}
            </div>
          );
        })}

        {/* Center Paper Label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#f4eacc] shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)] border border-[#d3c295] flex flex-col items-center justify-center">
            <span className="font-serif text-[6px] text-black uppercase tracking-widest font-bold">Signal</span>
            <div className="w-8 h-[1px] bg-black my-1 opacity-50" />
            <span className="font-serif text-[6px] text-black uppercase tracking-widest">Secure</span>
        </div>
      </div>

      {/* 2. Transparent Plastic Dial (Spins) */}
      <motion.div 
        animate={{ rotate: spinAngle }}
        transition={{ 
          type: spinAngle === 0 ? "spring" : "tween", 
          duration: spinAngle === 0 ? 0.8 : 0.4,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full border border-white/20 z-10"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)",
          backdropFilter: "blur(1px)",
          boxShadow: "inset 0 4px 10px rgba(255,255,255,0.3), inset 0 -4px 10px rgba(0,0,0,0.6)"
        }}
      >
        {genres.map((genre, index) => {
          const angle = (index / genres.length) * 360 - 90; 
          const radian = angle * (Math.PI / 180);
          const radius = 68; 
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <button
              key={`hole-${genre}`}
              onClick={() => handleDial(genre, index)}
              disabled={disabled}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-transparent cursor-pointer hover:bg-white/10"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.4)"
              }}
              aria-label={genre}
            />
          );
        })}
      </motion.div>

      {/* 3. The Metal Stopper (Curved metal piece bottom right) */}
      <div className="absolute z-20 top-[65%] right-2 w-10 h-3 rounded-full bg-gradient-to-b from-[#e0e0e0] to-[#777] shadow-[0_2px_5px_rgba(0,0,0,0.8),inset_0_1px_1px_white] pointer-events-none transform rotate-[30deg]" />

    </div>
  );
}