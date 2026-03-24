"use client";
import React from "react";

interface PhoneHandleProps {
  isOffHook: boolean;
  onPickUp: () => void;
  onHangUp: () => void;
}

export default function PhoneHandle({ isOffHook, onPickUp, onHangUp }: PhoneHandleProps) {
  return (
    <div className="flex justify-center w-full mt-2 perspective-1000">
      {!isOffHook ? (
        <button
          onClick={onPickUp}
          className="group relative w-full bg-[#111] rounded-[3rem] transition-all duration-150 ease-out flex items-center justify-center"
          style={{ 
            height: "90px",
            boxShadow: `
              0 20px 0 #000, 
              0 25px 20px rgba(0,0,0,0.8), 
              inset 0 4px 10px rgba(255,255,255,0.1),
              inset 0 -4px 10px rgba(0,0,0,0.8)
            `,
            transform: "translateY(-10px) translateZ(30px)"
          }}
        >
          {/* Receiver Details */}
          <div className="absolute left-4 w-16 h-16 rounded-full bg-black shadow-[inset_0_4px_15px_rgba(255,255,255,0.1)] border-2 border-zinc-800" />
          <div className="absolute right-4 w-16 h-16 rounded-full bg-black shadow-[inset_0_4px_15px_rgba(255,255,255,0.1)] border-2 border-zinc-800" />
          
          <div className="flex flex-col items-center justify-center gap-1 z-10">
            <span className="text-[#d4af37] text-xl font-serif font-bold tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              LIFT RECEIVER
            </span>
          </div>
        </button>
      ) : (
        <button
          onClick={onHangUp}
          className="group relative w-full bg-red-900 rounded-[3rem] transition-all duration-150 ease-out flex items-center justify-center"
          style={{ 
            height: "90px",
            boxShadow: `
              0 4px 0 #450a0a, 
              0 10px 10px rgba(0,0,0,0.8),
              inset 0 4px 10px rgba(255,100,100,0.2)
            `,
            transform: "translateY(10px) translateZ(10px)"
          }}
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-[#ffcccc] text-xl font-serif font-bold tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              HANG UP
            </span>
            <span className="text-[10px] text-red-300 font-mono tracking-widest uppercase">
              End Transmission
            </span>
          </div>
        </button>
      )}
    </div>
  );
}