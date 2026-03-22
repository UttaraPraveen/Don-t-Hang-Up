"use client";
import React from "react";

interface Props {
  topicLength: "word" | "phrase";
  onChange: (val: "word" | "phrase") => void;
  disabled: boolean;
}

export default function TopicLengthSwitch({ topicLength, onChange, disabled }: Props) {
  // Mechanical click sound for the toggle
  const playClick = () => {
    // const audio = new Audio("/click.mp3"); // Uncomment if you add a click sound later
    // audio.play().catch(() => {});
  };

  const handleToggle = (val: "word" | "phrase") => {
    if (disabled || topicLength === val) return;
    playClick();
    onChange(val);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="text-zinc-500 font-mono text-[9px] mb-2 uppercase tracking-widest">
        Transmission Mode
      </div>
      
      {/* The Physical Switch Body */}
      <div className="flex bg-zinc-900 border-4 border-zinc-800 rounded-sm p-1 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]">
        <button
          onClick={() => handleToggle("word")}
          disabled={disabled}
          className={`px-4 py-2 font-mono text-xs transition-all duration-200 ${
            topicLength === "word"
              ? "bg-red-800 text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
              : "text-zinc-600 hover:text-zinc-400"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          SINGLE WORD
        </button>
        
        <button
          onClick={() => handleToggle("phrase")}
          disabled={disabled}
          className={`px-4 py-2 font-mono text-xs transition-all duration-200 ${
            topicLength === "phrase"
              ? "bg-amber-600 text-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
              : "text-zinc-600 hover:text-zinc-400"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          FULL PHRASE
        </button>
      </div>
    </div>
  );
}