"use client";
import React from "react";

interface Props {
  topicLength: "word" | "phrase";
  onChange: (val: "word" | "phrase") => void;
  disabled: boolean;
}

export default function TopicLengthSwitch({ topicLength, onChange, disabled }: Props) {
  const handleToggle = (val: "word" | "phrase") => {
    if (disabled || topicLength === val) return;
    onChange(val);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full my-4">
      <div className="text-[#d4af37] font-serif text-[10px] mb-3 uppercase tracking-[0.2em] font-bold drop-shadow-md">
        Transmission Mode
      </div>
      
      {/* 3D Metal Plate */}
      <div 
        className="relative flex items-center bg-gradient-to-b from-zinc-800 to-black p-2 rounded-xl border-2 border-zinc-700"
        style={{ boxShadow: "0 10px 15px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1)" }}
      >
        {/* Screw Details */}
        <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-zinc-600 shadow-inner" />
        <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-zinc-600 shadow-inner" />

        <div className="flex relative z-10 gap-2">
          <button
            onClick={() => handleToggle("word")}
            disabled={disabled}
            className={`w-28 py-3 font-serif text-xs font-bold uppercase transition-all duration-300 rounded-lg ${
              topicLength === "word"
                ? "bg-gradient-to-b from-[#d4af37] to-[#8a6813] text-black shadow-[inset_0_2px_5px_rgba(255,255,255,0.5),0_5px_10px_rgba(0,0,0,0.5)] translate-y-0"
                : "bg-zinc-900 text-zinc-500 shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] translate-y-[2px]"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Word
          </button>
          
          <button
            onClick={() => handleToggle("phrase")}
            disabled={disabled}
            className={`w-28 py-3 font-serif text-xs font-bold uppercase transition-all duration-300 rounded-lg ${
              topicLength === "phrase"
                ? "bg-gradient-to-b from-[#d4af37] to-[#8a6813] text-black shadow-[inset_0_2px_5px_rgba(255,255,255,0.5),0_5px_10px_rgba(0,0,0,0.5)] translate-y-0"
                : "bg-zinc-900 text-zinc-500 shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] translate-y-[2px]"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Phrase
          </button>
        </div>
      </div>
    </div>
  );
}