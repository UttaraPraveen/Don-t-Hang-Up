"use client";
import { useState, useEffect } from "react";
import RotaryDial from "../components/RotaryDial";
import PhoneHandle from "../components/PhoneHandle";
import TopicLengthSwitch from "../components/TopicLengthSwitch";

const GENRES = ["General", "Philosophy", "Tech", "Comedy", "History", "Business"];

export default function TelephoneUI() {
  const [isOffHook, setIsOffHook] = useState(false);
  const [topic, setTopic] = useState("AWAITING UPLINK...");
  const [timer, setTimer] = useState(60);
  const [genre, setGenre] = useState("General");
  const [loading, setLoading] = useState(false);
  const [topicLength, setTopicLength] = useState<"word" | "phrase">("phrase");

  const handlePickUp = async () => {
    setIsOffHook(true);
    setLoading(true);
    setTopic("ESTABLISHING QUANTUM LINK...");
    
    try {
      const res = await fetch("/api/generate-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre, topicLength }), 
      });
      const data = await res.json();
      setTopic(data.topic);
    } catch (error) {
      setTopic("SIGNAL INTERCEPTED. RETRY.");
    } finally {
      setLoading(false);
    }
  };

  const handleHangUp = () => {
    setIsOffHook(false);
    setTimer(60);
    setTopic("LINK SEVERED.");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden relative perspective-[2000px]">
      {/* 3D Animated Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(14,165,233,0.15),_rgba(0,0,0,1)_70%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-1000" />

      {/* Main 3D Floating Glass Card */}
      <div 
        className="relative z-10 p-8 rounded-3xl w-full max-w-lg transition-all duration-700 ease-out preserve-3d"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(14, 165, 233, 0.2)",
          boxShadow: "0 0 40px rgba(14, 165, 233, 0.1), inset 0 0 20px rgba(14, 165, 233, 0.05)",
          transform: isOffHook ? "rotateX(5deg) scale(1.02)" : "rotateX(0deg) scale(1)",
        }}
      >
        {/* HUD Header */}
        <div className="flex justify-between items-center mb-8 border-b border-cyan-500/30 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${isOffHook ? 'bg-cyan-400 text-cyan-400 animate-pulse' : 'bg-red-500 text-red-500'}`} />
            <h1 className="text-cyan-500 font-mono text-xs uppercase tracking-[0.3em]">
              Nexus Uplink
            </h1>
          </div>
          <div className="text-cyan-800 font-mono text-[10px] tracking-widest">
            v3.0.0 // OMEGA
          </div>
        </div>

        {/* 3D Holographic Display */}
        <div className="relative w-full h-40 mb-10 flex flex-col items-center justify-center text-center preserve-3d group">
          <div className="absolute inset-0 bg-cyan-950/30 rounded-2xl border border-cyan-500/20 shadow-[inset_0_0_30px_rgba(14,165,233,0.1)]" />
          
          <div 
            className="relative z-10 p-6 w-full transition-all duration-500 transform-gpu group-hover:translate-z-10"
            style={{ transform: "translateZ(30px)" }}
          >
            <p className={`font-mono text-lg leading-relaxed transition-colors duration-500 ${isOffHook ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]' : 'text-cyan-700'}`}>
              {topic}
            </p>
            {isOffHook && !loading && (
              <span className="block mt-4 font-mono text-cyan-400 font-bold text-3xl tracking-widest drop-shadow-[0_0_12px_rgba(34,211,238,1)]">
                00:{timer < 10 ? `0${timer}` : timer}
              </span>
            )}
          </div>
        </div>

        {/* Controls Segment */}
        <div className={`transition-all duration-700 preserve-3d ${isOffHook ? 'opacity-0 translate-y-8 pointer-events-none absolute' : 'opacity-100 translate-y-0 relative'}`}>
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
        </div>

        <div className="mt-8" style={{ transform: "translateZ(40px)" }}>
          <PhoneHandle 
            isOffHook={isOffHook} 
            onPickUp={handlePickUp} 
            onHangUp={handleHangUp} 
          />
        </div>
      </div>
    </div>
  );
}