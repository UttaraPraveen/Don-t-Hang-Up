"use client";
import React from "react";

interface Props {
  topicLength: "word" | "phrase";
  onChange: (val: "word" | "phrase") => void;
  disabled: boolean;
}

export default function TopicLengthSwitch({ topicLength, onChange, disabled }: Props) {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="text-cyan-600/70 font-mono text-[10px] mb-3 uppercase tracking-[0.3em]">
        Data Packet Size
      </div>
      
      <div className="relative flex bg-black/60 p-1.5 rounded-xl border border-cyan-950 shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)]">
        {/* The sliding neon highlight */}
        <div 
          className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-cyan-500/20 border border-cyan-400/50 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 ease-out z-0"
          style={{
            left: topicLength === "word" ? "6px" : "calc(50% + 6px)"
          }}
        />

        <button
          onClick={() => onChange("word")}
          disabled={disabled}
          className={`relative z-10 px-6 py-2.5 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 w-32 ${
            topicLength === "word" ? "text-cyan-300 font-bold" : "text-cyan-800 hover:text-cyan-600"
          }`}
        >
          Micro (Word)
        </button>
        
        <button
          onClick={() => onChange("phrase")}
          disabled={disabled}
          className={`relative z-10 px-6 py-2.5 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 w-32 ${
            topicLength === "phrase" ? "text-cyan-300 font-bold" : "text-cyan-800 hover:text-cyan-600"
          }`}
        >
          Macro (Phrase)
        </button>
      </div>
    </div>
  );
}