"use client";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  topicLength: "word" | "phrase";
  onChange: (val: "word" | "phrase") => void;
  disabled: boolean;
}

export default function TopicLengthSwitch({ topicLength, onChange, disabled }: Props) {
  const isWord = topicLength === "word";

  return (
    <div className="flex flex-col items-center">
      <span className="text-[#a88a42] font-serif text-[8px] uppercase tracking-[0.2em] mb-2 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
        Mode
      </span>
      
      {/* Metal Base Plate */}
      <div className="relative w-12 h-20 bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] rounded-sm border-2 border-[#111] shadow-[0_4px_10px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.1)] flex flex-col items-center justify-between py-1 cursor-pointer"
           onClick={() => !disabled && onChange(isWord ? "phrase" : "word")}>
        
        <span className={`text-[8px] font-mono ${isWord ? "text-yellow-500" : "text-zinc-600"}`}>W</span>
        
        {/* The Toggle Track */}
        <div className="relative w-4 h-10 bg-black rounded-full shadow-inner flex items-center justify-center overflow-visible">
          
          {/* The Brass Switch (Animated) */}
          <motion.div
            animate={{ y: isWord ? -10 : 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-[#e0c266] via-[#d4af37] to-[#7a5c0d] shadow-[0_4px_6px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.6)] border border-[#5c4002]"
          />
        </div>

        <span className={`text-[8px] font-mono ${!isWord ? "text-yellow-500" : "text-zinc-600"}`}>P</span>
        
        {/* Screws */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#111] shadow-inner" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#111] shadow-inner" />
      </div>
    </div>
  );
}