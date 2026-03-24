"use client";
import React from "react";

interface PhoneHandleProps {
  isOffHook: boolean;
  onPickUp: () => void;
  onHangUp: () => void;
}

export default function PhoneHandle({ isOffHook, onPickUp, onHangUp }: PhoneHandleProps) {
  return (
    <div className="flex justify-center w-full mt-4 perspective-[1000px]">
      <button
        onClick={isOffHook ? onHangUp : onPickUp}
        className="group relative w-full max-w-[280px] h-20 preserve-3d outline-none"
      >
        {/* 3D Button Base (Shadow/Depth) */}
        <div 
          className={`absolute inset-0 rounded-2xl transform translate-y-3 transition-colors duration-300 ${
            isOffHook ? "bg-red-950/80" : "bg-cyan-950/80"
          }`} 
        />
        
        {/* Main 3D Button Surface */}
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-t-2 transition-all duration-200 ease-out transform group-active:translate-y-3 group-active:border-t ${
            isOffHook 
              ? "bg-red-900/40 border-red-500/50 border-t-red-400 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]" 
              : "bg-cyan-900/40 border-cyan-500/50 border-t-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
          }`}
          style={{ backdropFilter: "blur(10px)" }}
        >
          {/* Inner Glowing Core */}
          <div className="flex flex-col items-center justify-center gap-1">
            <span className={`text-xl font-mono font-bold tracking-[0.3em] transition-colors ${
              isOffHook ? "text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,1)]" : "text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,1)]"
            }`}>
              {isOffHook ? "SEVER LINK" : "INITIALIZE"}
            </span>
            <span className={`text-[9px] font-mono tracking-widest ${
              isOffHook ? "text-red-500/70" : "text-cyan-600"
            }`}>
              {isOffHook ? "WARNING: IRREVERSIBLE ACTION" : "PRESS TO ESTABLISH CONNECTION"}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}