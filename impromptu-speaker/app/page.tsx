"use client";
import { useState, useEffect } from "react";
import RotaryDial from "../components/RotaryDial";
import PhoneHandle from "../components/PhoneHandle";
import TopicLengthSwitch from "../components/TopicLengthSwitch";

const GENRES = ["General", "Philos", "Tech", "Comedy", "History", "Finance"];

export default function TelephoneUI() {
  const [isOffHook, setIsOffHook] = useState(false);
  const [topic, setTopic] = useState("Awaiting connection...");
  const [timer, setTimer] = useState(60);
  const [genre, setGenre] = useState("General");
  const [loading, setLoading] = useState(false);
  const [topicLength, setTopicLength] = useState<"word" | "phrase">("phrase");

  const handlePickUp = async () => {
    setIsOffHook(true);
    setLoading(true);
    setTopic("Connecting to operator...");
    
    try {
      // Simulate network delay for the vintage feel
      await new Promise((res) => setTimeout(res, 800));
      const res = await fetch("/api/generate-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    // Background: Deep red velvet booth
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-4" style={{ perspective: "1200px" }}>
      
      {/* 3D Main Telephone Unit */}
      <div 
        className="relative flex flex-col items-center w-full max-w-lg bg-black rounded-[2rem] p-8 pb-12 transition-transform duration-700 ease-out"
        style={{ 
          boxShadow: `
            inset 0 0 20px rgba(255,255,255,0.1), 
            0 20px 40px rgba(0,0,0,0.8),
            0 30px 60px rgba(0,0,0,0.9),
            -10px 0 20px rgba(0,0,0,0.5)
          `,
          transform: "rotateX(5deg) rotateY(-2deg)",
          transformStyle: "preserve-3d"
        }}
      >
        
        {/* Brass Plaque (Header) */}
        <div 
          className="absolute top-0 -translate-y-1/2 px-8 py-2 bg-gradient-to-b from-[#d4af37] to-[#aa7c11] border-2 border-[#5c4002] rounded-md flex items-center gap-3"
          style={{ boxShadow: "0 5px 15px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,255,255,0.5)", transform: "translateZ(30px)" }}
        >
          <div className={`w-3 h-3 rounded-full border border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] ${isOffHook ? 'bg-red-500 animate-pulse shadow-[0_0_10px_red]' : 'bg-red-950'}`} />
          <h1 className="text-black font-serif font-bold text-xs uppercase tracking-[0.3em] opacity-80 mix-blend-color-burn">
            Bell System • 1926
          </h1>
        </div>

        {/* Yellow Pages Display Screen (Paper Texture) */}
        <div 
          className="relative mt-8 bg-[#f5deb3] w-full h-40 mb-10 rounded-sm border-[6px] border-[#3b3b3b] flex flex-col items-center justify-center text-center overflow-hidden"
          style={{ 
            boxShadow: "inset 0 10px 20px rgba(0,0,0,0.4), 0 5px 10px rgba(255,255,255,0.1)",
            transform: "translateZ(20px)"
          }}
        >
          {/* Paper Grain Overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:4px_4px]" />
          
          <p className="relative font-serif text-2xl text-black leading-tight italic px-6 z-10 drop-shadow-sm font-semibold tracking-wide">
            "{topic}"
          </p>
          
          {isOffHook && !loading && (
            <div className="absolute bottom-2 right-4 font-mono text-red-700 font-bold text-lg opacity-80 z-10">
              00:{timer < 10 ? `0${timer}` : timer}
            </div>
          )}
        </div>

        {/* Main Interface Group */}
        <div className="flex flex-col items-center w-full gap-8 z-10" style={{ transform: "translateZ(40px)" }}>
          {!isOffHook && (
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

          <div className="mt-4 w-full" style={{ transform: "translateZ(50px)" }}>
            <PhoneHandle 
              isOffHook={isOffHook} 
              onPickUp={handlePickUp} 
              onHangUp={handleHangUp} 
            />
          </div>
        </div>

        {/* Speaker / Microphone Vents */}
        <div className="absolute bottom-6 flex justify-center gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-black shadow-[inset_0_3px_5px_rgba(255,255,255,0.2),0_1px_1px_rgba(255,255,255,0.1)]" />
          ))}
        </div>
      </div>
      
      <p className="mt-12 text-[#d4af37] font-serif text-sm uppercase tracking-[0.3em] opacity-60 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        Public Telephone • Local Calls Only
      </p>
    </div>
  );
}