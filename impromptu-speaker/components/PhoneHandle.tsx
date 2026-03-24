"use client";
import React from "react";
import { motion } from "framer-motion";

interface PhoneHandleProps {
  isOffHook: boolean;
  onPickUp: () => void;
  onHangUp: () => void;
}

export default function PhoneHandle({ isOffHook, onPickUp, onHangUp }: PhoneHandleProps) {
  return (
    <div className="relative flex justify-center items-center w-full cursor-pointer group">
      <motion.div
        onClick={isOffHook ? onHangUp : onPickUp}
        animate={{
          y: isOffHook ? -80 : 0,
          rotate: isOffHook ? -15 : 0,
          scale: isOffHook ? 1.05 : 1,
          boxShadow: isOffHook 
            ? "0 40px 50px rgba(0,0,0,0.8), inset 0 6px 15px rgba(255,255,255,0.3)" 
            : "0 15px 20px rgba(0,0,0,0.9), inset 0 6px 15px rgba(255,255,255,0.3)",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative w-[320px] h-[70px] bg-[#0a0a0a] rounded-full border border-[#2a2a2a] flex items-center justify-between px-[-20px]"
      >
        {/* Left Earpiece */}
        <div className="absolute -left-4 w-[90px] h-[90px] bg-gradient-to-br from-[#2a2a2a] to-black rounded-full shadow-[inset_0_-5px_15px_rgba(0,0,0,1),0_10px_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
            <div className="w-[70px] h-[70px] rounded-full bg-[#111] shadow-inner border border-[#333] flex flex-wrap justify-center content-center gap-1 p-3">
              {[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-black shadow-inner" />)}
            </div>
        </div>

        {/* Center Grip Text */}
        <div className="w-full text-center z-10 pointer-events-none">
          <span className={`font-serif text-[10px] font-bold tracking-[0.3em] transition-colors ${isOffHook ? "text-red-500" : "text-[#bda45d]"}`}>
            {isOffHook ? "HANG UP" : "LIFT TO CALL"}
          </span>
        </div>

        {/* Right Mouthpiece */}
        <div className="absolute -right-4 w-[90px] h-[90px] bg-gradient-to-bl from-[#2a2a2a] to-black rounded-full shadow-[inset_0_-5px_15px_rgba(0,0,0,1),0_10px_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
             <div className="w-[70px] h-[70px] rounded-full bg-[#111] shadow-inner border border-[#333] flex flex-wrap justify-center content-center gap-1 p-3">
              {[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-black shadow-inner" />)}
            </div>
        </div>
      </motion.div>
    </div>
  );
}