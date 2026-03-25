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
          rotate: isOffHook ? -5 : 0,
          scale: isOffHook ? 1.05 : 1,
          boxShadow: isOffHook 
            ? "0 40px 50px rgba(0,0,0,0.15), inset 0 6px 15px rgba(255,255,255,0.5)" 
            : "0 20px 30px rgba(0,0,0,0.2), inset 0 6px 15px rgba(255,255,255,0.5)",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative w-[340px] h-[75px] bg-gradient-to-r from-[#6B7D86] via-[#7A8C95] to-[#6B7D86] rounded-full flex items-center justify-between px-[-20px] z-50"
      >
        {/* Left Earpiece */}
        <div className="absolute -left-2 w-[95px] h-[95px] bg-gradient-to-br from-[#8A9CA5] to-[#5A6D76] rounded-full shadow-[inset_0_-5px_15px_rgba(0,0,0,0.3),0_10px_15px_rgba(0,0,0,0.2)] flex items-center justify-center">
            <div className="w-[75px] h-[75px] rounded-full bg-[#4A5D66] shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] flex flex-wrap justify-center content-center gap-1.5 p-3">
              {[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#2A3D46] shadow-inner" />)}
            </div>
        </div>

        {/* Center Grip Text (Optional - removed to match clean aesthetic of image, but kept invisible for hit area) */}
        <div className="w-full text-center z-10 pointer-events-none opacity-0">
          <span className="font-sans text-[10px] font-bold tracking-[0.3em]">
            {isOffHook ? "HANG UP" : "LIFT TO CALL"}
          </span>
        </div>

        {/* Right Mouthpiece */}
        <div className="absolute -right-2 w-[95px] h-[95px] bg-gradient-to-bl from-[#8A9CA5] to-[#5A6D76] rounded-full shadow-[inset_0_-5px_15px_rgba(0,0,0,0.3),0_10px_15px_rgba(0,0,0,0.2)] flex items-center justify-center">
             <div className="w-[75px] h-[75px] rounded-full bg-[#4A5D66] shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] flex flex-wrap justify-center content-center gap-1.5 p-3">
              {[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#2A3D46] shadow-inner" />)}
            </div>
        </div>
      </motion.div>
    </div>
  );
}