"use client";
import { useState, useEffect } from "react";
import RotaryDial from "../components/RotaryDial";
import PhoneHandle from "../components/PhoneHandle";
import TopicLengthSwitch from "../components/TopicLengthSwitch";

const GENRES = ["Gen", "Phil", "Tech", "Com", "Hist", "Bus"];

export default function TelephoneUI() {
  const [isOffHook, setIsOffHook] = useState(false);
  const [topic, setTopic] = useState("AWAITING CONNECTION...");
  const [timer, setTimer] = useState(60);
  const [genre, setGenre] = useState("Gen");
  const [loading, setLoading] = useState(false);
  const [topicLength, setTopicLength] = useState<"word" | "phrase">("phrase");

  const handlePickUp = async () => {
    setIsOffHook(true);
    setLoading(true);
    setTopic("CONNECTING TO OPERATOR...");
    
    try {
      await new Promise((res) => setTimeout(res, 1200)); // Vintage delay
      const res = await fetch("/api/generate-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre, topicLength }), 
      });
      const data = await res.json();
      setTopic(data.topic);
    } catch (error) {
      setTopic("LINE BUSY. TRY AGAIN.");
    } finally {
      setLoading(false);
    }
  };

  const handleHangUp = () => {
    setIsOffHook(false);
    setTimer(60);
    setTopic("LINE DISCONNECTED.");
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
    // Old Money Background: Deep Red/Black with radial spotlight
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a0f0f] bg-[radial-gradient(circle_at_center,_#3a1c1c_0%,_#0a0505_100%)] p-4 overflow-hidden selection:bg-red-900 selection:text-yellow-100">
      
      {/* The Telephone Base Station */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xl">
        
        {/* Output Screen (Vintage Yellow Paper/Ticker style) */}
        <div className="w-[85%] mb-8 relative p-2 rounded bg-[#0a0a0a] border-4 border-[#222] shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
          <div className="bg-[#f2d888] h-24 rounded-sm shadow-[inset_0_0_20px_rgba(150,100,0,0.6)] flex items-center justify-center p-6 border border-[#c4a955] relative overflow-hidden">
            {/* Paper grain */}
            <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
            
            <p className="relative z-10 font-mono text-xl text-black font-bold tracking-widest text-center uppercase drop-shadow-md">
              {topic}
            </p>
            
            {isOffHook && !loading && (
              <div className="absolute bottom-1 right-2 font-mono text-red-700 font-bold text-sm tracking-widest">
                00:{timer < 10 ? `0${timer}` : timer}
              </div>
            )}
          </div>
        </div>

        {/* The 3D Bakelite Telephone Body */}
        <div className="relative w-[380px] h-[340px] bg-gradient-to-b from-[#1a1a1a] to-[#000000] rounded-[4rem] rounded-t-[5rem] shadow-[0_30px_50px_rgba(0,0,0,0.9),inset_0_8px_15px_rgba(255,255,255,0.15),inset_0_-10px_20px_rgba(0,0,0,1)] border-b-8 border-black flex flex-col items-center justify-end pb-8">
          
          {/* Cradle for Handle */}
          <div className="absolute top-0 w-[200px] h-[40px] bg-black rounded-b-[2rem] shadow-[inset_0_10px_20px_rgba(0,0,0,1)]" />

          {/* Controls Container */}
          <div className="w-full flex justify-between px-8 absolute top-12 z-0">
             <TopicLengthSwitch topicLength={topicLength} onChange={setTopicLength} disabled={isOffHook} />
          </div>

          <div className="relative z-20 mt-4">
            <RotaryDial genres={GENRES} selectedGenre={genre} onSelect={setGenre} disabled={isOffHook} />
          </div>
          
          <div className="absolute -bottom-4 w-4 h-4 rounded-full bg-[#333] border-2 border-[#111] shadow-inner" />
        </div>

        {/* The Receiver (Positioned absolutely over the cradle) */}
        <div className="absolute top-[100px] z-30">
          <PhoneHandle isOffHook={isOffHook} onPickUp={handlePickUp} onHangUp={handleHangUp} />
        </div>

      </div>
    </div>
  );
}