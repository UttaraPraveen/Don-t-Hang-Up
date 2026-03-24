"use client";

import { useState, useEffect, useRef } from "react";
import RotaryDial from "../components/RotaryDial";
import PhoneHandle from "../components/PhoneHandle";
import TopicLengthSwitch from "../components/TopicLengthSwitch";

const GENRES = ["General", "Philosophy", "Tech", "Comedy", "History", "Business"];

export default function TelephoneUI() {
  const [isOffHook, setIsOffHook] = useState(false);
  const [topic, setTopic] = useState("Pick up the receiver...");
  const [timer, setTimer] = useState(60);
  const [genre, setGenre] = useState("General");
  const [loading, setLoading] = useState(false);
  const [topicLength, setTopicLength] = useState<"word" | "phrase">("phrase");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowActive, setGlowActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: dy * -8, y: dx * 8 });
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handlePickUp = async () => {
    setIsOffHook(true);
    setLoading(true);
    setTopic("Connecting to operator...");
    setGlowActive(true);
    try {
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
    setGlowActive(false);
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #000;
          overflow-x: hidden;
        }

        .scene {
          perspective: 1200px;
          perspective-origin: 50% 40%;
        }

        .phone-body {
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
          position: relative;
        }

        .phone-face {
          background: linear-gradient(145deg, #1a1a2e 0%, #0d0d1a 40%, #16213e 100%);
          border-radius: 2.5rem;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(100, 200, 255, 0.1),
            0 30px 80px rgba(0,0,0,0.9),
            0 0 60px rgba(0, 100, 255, 0.08),
            inset 0 1px 0 rgba(255,255,255,0.05),
            inset 0 -1px 0 rgba(0,0,0,0.5);
        }

        .phone-face::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 200, 255, 0.015) 2px,
            rgba(0, 200, 255, 0.015) 4px
          );
          pointer-events: none;
          border-radius: 2.5rem;
        }

        .phone-face::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 50%;
          background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%);
          border-radius: 2.5rem 2.5rem 0 0;
          pointer-events: none;
        }

        /* 3D side edges */
        .phone-left-edge {
          position: absolute;
          left: -24px;
          top: 30px;
          bottom: 30px;
          width: 24px;
          background: linear-gradient(180deg, #0a0a1a 0%, #050510 100%);
          transform: rotateY(-90deg) translateZ(0);
          transform-origin: right center;
          border-radius: 2rem 0 0 2rem;
          box-shadow: inset 2px 0 8px rgba(0,0,0,0.8);
        }

        .phone-bottom-edge {
          position: absolute;
          bottom: -20px;
          left: 30px;
          right: 30px;
          height: 20px;
          background: linear-gradient(90deg, #050510 0%, #0a0a1a 50%, #050510 100%);
          transform: rotateX(-90deg) translateZ(0);
          transform-origin: top center;
          border-radius: 0 0 1rem 1rem;
        }

        .screen {
          background: linear-gradient(135deg, #000510 0%, #001020 100%);
          border: 1px solid rgba(0, 200, 255, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          min-height: 10rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow:
            0 0 30px rgba(0, 100, 255, 0.15) inset,
            0 0 0 1px rgba(0, 200, 255, 0.05) inset;
        }

        .screen::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(0, 200, 255, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .screen-glow {
          position: absolute;
          inset: -2px;
          border-radius: 1rem;
          background: transparent;
          border: 2px solid transparent;
          transition: all 0.5s ease;
        }

        .screen-glow.active {
          border-color: rgba(0, 255, 200, 0.6);
          box-shadow: 0 0 20px rgba(0, 255, 200, 0.3), 0 0 60px rgba(0, 255, 200, 0.1);
          animation: screenPulse 2s ease-in-out infinite;
        }

        @keyframes screenPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 200, 0.3), 0 0 60px rgba(0, 255, 200, 0.1); }
          50% { box-shadow: 0 0 40px rgba(0, 255, 200, 0.5), 0 0 100px rgba(0, 255, 200, 0.2); }
        }

        .topic-text {
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          font-weight: 700;
          color: #e0f8ff;
          text-shadow: 0 0 20px rgba(0, 200, 255, 0.5);
          letter-spacing: 0.05em;
          line-height: 1.5;
          z-index: 1;
        }

        .timer-display {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 900;
          color: #ff4466;
          text-shadow: 0 0 20px rgba(255, 50, 100, 0.6), 0 0 40px rgba(255, 50, 100, 0.3);
          letter-spacing: 0.1em;
          margin-top: 0.75rem;
          animation: timerFlicker 1s ease-in-out infinite;
        }

        @keyframes timerFlicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
        }

        .scanline {
          position: absolute;
          top: -100%;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 200, 255, 0.03) 50%, transparent 100%);
          animation: scanline 4s linear infinite;
          pointer-events: none;
        }

        @keyframes scanline {
          0% { top: -100%; }
          100% { top: 200%; }
        }

        .header-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(0, 200, 255, 0.4);
          text-transform: uppercase;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff4466;
          box-shadow: 0 0 8px rgba(255, 50, 100, 0.8);
          animation: blink 1.5s ease-in-out infinite;
        }

        .status-dot.active {
          background: #00ff88;
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.8);
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .corner-accent {
          position: absolute;
          width: 20px;
          height: 20px;
          opacity: 0.4;
        }

        .corner-accent.tl { top: 1.5rem; left: 1.5rem; border-top: 2px solid #00c8ff; border-left: 2px solid #00c8ff; }
        .corner-accent.tr { top: 1.5rem; right: 1.5rem; border-top: 2px solid #00c8ff; border-right: 2px solid #00c8ff; }
        .corner-accent.bl { bottom: 1.5rem; left: 1.5rem; border-bottom: 2px solid #00c8ff; border-left: 2px solid #00c8ff; }
        .corner-accent.br { bottom: 1.5rem; right: 1.5rem; border-bottom: 2px solid #00c8ff; border-right: 2px solid #00c8ff; }

        .speaker-grid {
          display: grid;
          grid-template-columns: repeat(5, 4px);
          gap: 4px;
        }

        .speaker-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(0, 200, 255, 0.2);
          box-shadow: inset 0 1px 0 rgba(0,0,0,0.5);
        }

        .bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 100, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 100, 255, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .bg-radial {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at 50% 50%, rgba(0, 50, 150, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .float-particle {
          position: fixed;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: rgba(0, 200, 255, 0.5);
          pointer-events: none;
          animation: floatUp linear infinite;
        }

        @keyframes floatUp {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20px) translateX(30px); opacity: 0; }
        }

        .loading-dots span {
          animation: loadDot 1.4s ease-in-out infinite;
          font-family: 'Share Tech Mono', monospace;
          color: #00c8ff;
          font-size: 2rem;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes loadDot {
          0%, 80%, 100% { opacity: 0; transform: scale(0.5); }
          40% { opacity: 1; transform: scale(1); }
        }

        .phone-entrance {
          animation: phoneEntrance 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes phoneEntrance {
          0% { opacity: 0; transform: rotateX(40deg) rotateY(-20deg) translateY(60px) scale(0.8); }
          100% { opacity: 1; transform: rotateX(0) rotateY(0) translateY(0) scale(1); }
        }

        .section-enter {
          animation: sectionEnter 0.4s ease-out forwards;
        }

        @keyframes sectionEnter {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background effects */}
      <div className="bg-grid" />
      <div className="bg-radial" />
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="float-particle"
          style={{
            left: `${10 + i * 12}%`,
            animationDuration: `${8 + i * 2}s`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem",
          fontFamily: "'Share Tech Mono', monospace",
        }}
      >
        {/* Title above */}
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <div className="header-label" style={{ marginBottom: "0.5rem", opacity: 0.6 }}>
            ◈ SECURE COMMUNICATIONS TERMINAL ◈
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
            <div className={`status-dot ${isOffHook ? "active" : ""}`} />
            <span className="header-label">{isOffHook ? "LINE ACTIVE" : "STANDBY"}</span>
          </div>
        </div>

        {/* 3D Scene */}
        <div className="scene" ref={containerRef}>
          <div
            className="phone-body phone-entrance"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              maxWidth: "420px",
              width: "100%",
              position: "relative",
            }}
          >
            {/* 3D edges */}
            <div className="phone-left-edge" />
            <div className="phone-bottom-edge" />

            <div className="phone-face">
              {/* Corner accents */}
              <div className="corner-accent tl" />
              <div className="corner-accent tr" />
              <div className="corner-accent bl" />
              <div className="corner-accent br" />

              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <div className={`status-dot ${isOffHook ? "active" : ""}`} />
                <span className="header-label">MODEL 2026-FOSS / SIGNAL SECURE</span>
              </div>

              {/* Screen */}
              <div className="screen" style={{ marginBottom: "1.5rem" }}>
                <div className={`screen-glow ${glowActive ? "active" : ""}`} />
                <div className="scanline" />

                {loading ? (
                  <div className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                ) : (
                  <p className="topic-text">"{topic}"</p>
                )}

                {isOffHook && !loading && (
                  <div className="timer-display">
                    {`00:${timer < 10 ? `0${timer}` : timer}`}
                  </div>
                )}
              </div>

              {/* Controls */}
              {!isOffHook && (
                <div className="section-enter">
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
              )}

              <PhoneHandle
                isOffHook={isOffHook}
                onPickUp={handlePickUp}
                onHangUp={handleHangUp}
              />

              {/* Speaker grid */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
                <div className="speaker-grid">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="speaker-dot" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <div className="header-label" style={{ opacity: 0.3 }}>
            STAY ON THE LINE. DO NOT HANG UP.
          </div>
        </div>
      </div>
    </>
  );
}