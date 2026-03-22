"use client";
import { useState, useEffect } from "react";

export default function TelephoneUI() {
  const [isOffHook, setIsOffHook] = useState(false);
  const [topic, setTopic] = useState("Pick up the receiver...");
  const [timer, setTimer] = useState(60);
  const [genre, setGenre] = useState("General");

  // Trigger when phone is picked up
  const handlePickUp = async () => {
    setIsOffHook(true);
    setTopic("Connecting...");
    
    // Fetch from the Gemini API route we discussed
    const res = await fetch("/api/generate-topic", {
      method: "POST",
      body: JSON.stringify({ genre }),
    });
    const data = await res.json();
    setTopic(data.topic);
  };

  const handleHangUp = () => {
    setIsOffHook(false);
    setTimer(60);
    setTopic("Line Disconnected.");
  };

  // Timer Countdown Logic
  useEffect(() => {
    let interval;
    if (isOffHook && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      handleHangUp(); // Auto-hangup when time is up
    }
    return () => clearInterval(interval);
  }, [isOffHook, timer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-200">
      {/* Visual Phone Base */}
      <div className="bg-zinc-900 p-10 rounded-3xl shadow-2xl border-b-8 border-black">
        <h1 className="text-red-600 font-mono text-xs mb-4">DON'T HANG UP v1.0</h1>
        
        {/* The Display Screen */}
        <div className="bg-amber-100 p-4 w-64 h-32 mb-6 border-4 border-zinc-700 shadow-inner flex items-center justify-center text-center">
          <p className="font-serif text-zinc-800 italic">{topic}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around">
          {!isOffHook ? (
            <button 
              onClick={handlePickUp}
              className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-600 active:scale-95 transition"
            >
              📞 Pick Up
            </button>
          ) : (
            <button 
              onClick={handleHangUp}
              className="bg-red-700 text-white px-6 py-2 rounded-full animate-pulse"
            >
              🛑 Hang Up ({timer}s)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}