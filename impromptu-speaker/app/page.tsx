"use client";
import { useState, useEffect } from "react";
import RotaryDial from "../components/RotaryDial";
import PhoneHandle from "../components/PhoneHandle";
import TopicLengthSwitch from "../components/TopicLengthSwitch"; // NEW: Import the switch

const GENRES = ["General", "Philosophy", "Tech", "Comedy", "History", "Business"];

export default function TelephoneUI() {
  const [isOffHook, setIsOffHook] = useState(false);
  const [topic, setTopic] = useState("Pick up the receiver...");
  const [timer, setTimer] = useState(60);
  const [genre, setGenre] = useState("General");
  const [loading, setLoading] = useState(false);
  
  // NEW: State for the toggle switch
  const [topicLength, setTopicLength] = useState<"word" | "phrase">("phrase");

  const playSound = (audioPath: string) => {
    const audio = new Audio(audioPath);
    audio.play().catch((err) => console.log("Audio play failed:", err));
  };

  const handlePickUp = async () => {
    // playSound("/pickup.mp3"); 
    setIsOffHook(true);
    setLoading(true);
    setTopic("Connecting to operator...");
    
    try {
      const res = await fetch("/api/generate-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // NEW: We are now sending both genre AND topicLength to the API
        body: JSON.stringify({ genre, topicLength }), 
      });
      const data = await res.json();
      setTopic(data.topic);
    } catch (error) {
      setTopic("Line busy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleHangUp = () => {
    // playSound("/hangup.mp3"); 
    setIsOffHook(false);
    setTimer(60);
    setTopic("Line Disconnected.");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOffHook && timer > 0 && !loading) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      handleHangUp();
    }
    return () => clearInterval(interval);
  }, [isOffHook, timer, loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#e2d1c3]">
      <div className="relative bg-zinc-900 p-12 rounded-[3rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.3)] border-b-[12px] border-r-[12px] border-black max-w-md w-full">
        
        <div className="absolute top-6 left-12 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <h1 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
            Model 2026-FOSS / Signal Secure
          </h1>
        </div>

        <div className="mt-4 bg-[#f0ead6] p-6 w-full h-48 mb-8 border-4 border-zinc-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center text-center">
          <p className="font-serif text-xl text-zinc-800 leading-tight italic">
            "{topic}"
          </p>
          {isOffHook && !loading && (
            <span className="mt-4 font-mono text-red-700 font-bold text-2xl">
              00:{timer < 10 ? `0${timer}` : timer}
            </span>
          )}
        </div>

        {!isOffHook && (
          // NEW: Wrapped in a fragment (<>) so React allows multiple sibling components here
          <>
            <TopicLengthSwitch 
              topicLength={topicLength} 
              onChange={setTopicLength} 
              disabled={isOffHook} 
            />
            
            <RotaryDial 
              genres={GENRES} 
              selectedGenre={genre} 
              onSelect={setGenre} 
              disabled={isOffHook} 
            />
          </>
        )}

        <PhoneHandle 
          isOffHook={isOffHook} 
          onPickUp={handlePickUp} 
          onHangUp={handleHangUp} 
        />

        <div className="mt-8 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-black shadow-inner" />
          ))}
        </div>
      </div>
      
      <p className="mt-8 text-stone-500 font-mono text-xs uppercase tracking-[0.2em]">
        Stay on the line. Do not hang up.
      </p>
    </div>
  );
}