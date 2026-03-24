"use client";

import { useState, useEffect, useRef } from "react";
import RotaryDial from "../components/RotaryDial";
import PhoneHandle from "../components/PhoneHandle";
import TopicLengthSwitch from "../components/TopicLengthSwitch";

const GENRES = ["General", "Philosophy", "Tech", "Comedy", "History", "Business"];

export default function TelephoneUI() {
  const [isOffHook, setIsOffHook] = useState(false);
  const [topic, setTopic] = useState("Lift the receiver\nto connect...");
  const [timer, setTimer] = useState(60);
  const [genre, setGenre] = useState("General");
  const [loading, setLoading] = useState(false);
  const [topicLength, setTopicLength] = useState<"word" | "phrase">("phrase");
  const [glitch, setGlitch] = useState(false);
  const [boothOpen, setBoothOpen] = useState(false);
  const tickRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Entrance animation
    setTimeout(() => setBoothOpen(true), 300);
  }, []);

  const triggerGlitch = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 600);
  };

  const handlePickUp = async () => {
    triggerGlitch();
    setIsOffHook(true);
    setLoading(true);
    setTopic("Connecting to\noperator...");

    try {
      const res = await fetch("/api/generate-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre, topicLength }),
      });
      const data = await res.json();
      setTopic(data.topic);
    } catch {
      setTopic("Line busy.\nPlease try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleHangUp = () => {
    triggerGlitch();
    setIsOffHook(false);
    setTimer(60);
    setTopic("Line\nDisconnected.");
  };

  useEffect(() => {
    if (isOffHook && !loading && timer > 0) {
      tickRef.current = setInterval(() => setTimer((p) => p - 1), 1000);
    } else if (timer === 0) {
      handleHangUp();
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [isOffHook, timer, loading]);

  const timerPct = (timer / 60) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Special+Elite&family=Bebas+Neue&display=swap');

        :root {
          --gold: #d4a017;
          --gold-light: #f0c040;
          --gold-dark: #8b6914;
          --red: #cc1010;
          --red-dark: #7a0000;
          --cream: #f5ead0;
          --cream-dark: #e8d5a8;
          --ink: #1a1008;
          --booth-green: #1a2e1a;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--ink);
          min-height: 100vh;
          font-family: 'Special Elite', cursive;
          overflow-x: hidden;
        }

        .scene {
          perspective: 1200px;
          perspective-origin: 50% 30%;
        }

        .booth-wrap {
          transform-style: preserve-3d;
          transform: rotateY(0deg) rotateX(2deg);
          transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          animation: boothFloat 6s ease-in-out infinite;
        }

        @keyframes boothFloat {
          0%, 100% { transform: rotateY(0deg) rotateX(2deg) translateY(0px); }
          50% { transform: rotateY(0deg) rotateX(2deg) translateY(-8px); }
        }

        .booth-enter {
          animation: boothEnter 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        @keyframes boothEnter {
          from { opacity: 0; transform: rotateY(-15deg) rotateX(8deg) translateY(60px) scale(0.85); }
          to { opacity: 1; transform: rotateY(0deg) rotateX(2deg) translateY(0) scale(1); }
        }

        .booth-outer {
          background: linear-gradient(160deg, #2a1f0e 0%, #1a1008 40%, #0d0804 100%);
          border: 3px solid var(--gold-dark);
          border-radius: 4px;
          box-shadow:
            0 0 0 1px #000,
            8px 8px 0 0 #000,
            0 40px 80px rgba(0,0,0,0.9),
            0 0 60px rgba(212,160,23,0.08),
            inset 0 1px 0 rgba(212,160,23,0.3);
          position: relative;
          overflow: hidden;
        }

        .booth-outer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent);
        }

        .booth-outer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        /* GRAIN overlay */
        .grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          animation: grainAnim 0.15s steps(1) infinite;
        }

        @keyframes grainAnim {
          0% { transform: translate(0,0); }
          25% { transform: translate(-5px, 3px); }
          50% { transform: translate(3px, -2px); }
          75% { transform: translate(-2px, 5px); }
          100% { transform: translate(5px, -3px); }
        }

        /* Header plate */
        .brass-plate {
          background: linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light), var(--gold));
          clip-path: polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%);
          text-align: center;
          padding: 6px 28px;
          letter-spacing: 0.35em;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          color: var(--ink);
          text-shadow: 0 1px 0 rgba(255,255,255,0.4);
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        /* Display screen */
        .display-screen {
          background: linear-gradient(145deg, #1c1400, #0f0a00);
          border: 2px solid var(--gold-dark);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          box-shadow:
            inset 0 0 30px rgba(0,0,0,0.8),
            inset 0 0 60px rgba(212,160,23,0.04),
            0 0 0 1px #000,
            0 4px 20px rgba(0,0,0,0.6);
        }

        .display-screen::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.04) 0%,
            transparent 40%,
            rgba(0,0,0,0.2) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Scanlines */
        .display-screen::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0) 0px,
            rgba(0,0,0,0) 1px,
            rgba(0,0,0,0.15) 1px,
            rgba(0,0,0,0.15) 2px
          );
          pointer-events: none;
          z-index: 3;
        }

        .display-text {
          position: relative;
          z-index: 4;
          font-family: 'Playfair Display', serif;
          font-style: italic;
          color: var(--gold-light);
          text-shadow:
            0 0 10px rgba(240,192,64,0.6),
            0 0 30px rgba(240,192,64,0.2);
          white-space: pre-line;
          line-height: 1.5;
        }

        /* Glitch animation */
        .glitch {
          animation: glitchAnim 0.5s steps(2) forwards;
        }

        @keyframes glitchAnim {
          0% { filter: none; }
          20% { filter: hue-rotate(90deg) saturate(3); transform: translate(-2px, 0) skewX(-2deg); }
          40% { filter: hue-rotate(-90deg) saturate(5); transform: translate(3px, -1px) skewX(2deg); }
          60% { filter: brightness(2) contrast(2); transform: translate(-1px, 2px); }
          80% { filter: none; transform: translate(1px, 0); }
          100% { filter: none; transform: none; }
        }

        /* Loading pulse */
        @keyframes signalPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .signal-pulse {
          animation: signalPulse 0.8s ease-in-out infinite;
        }

        /* Timer arc */
        .timer-svg circle {
          transition: stroke-dashoffset 1s linear;
        }

        /* Decorative rules */
        .ornamental-rule {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--gold-dark);
        }

        .ornamental-rule::before,
        .ornamental-rule::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-dark), var(--gold), var(--gold-dark), transparent);
        }

        /* Phone book corner decals */
        .corner-decal {
          position: absolute;
          width: 16px;
          height: 16px;
          border-color: var(--gold-dark);
          border-style: solid;
          opacity: 0.6;
        }

        .corner-decal.tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
        .corner-decal.tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; }
        .corner-decal.bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; }
        .corner-decal.br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

        /* Red indicator light */
        @keyframes indicatorBlink {
          0%, 90%, 100% { opacity: 1; box-shadow: 0 0 6px var(--red), 0 0 12px rgba(204,16,16,0.4); }
          45% { opacity: 0.2; box-shadow: none; }
        }

        .indicator-light {
          animation: indicatorBlink 2s ease-in-out infinite;
        }

        .indicator-light.active {
          background: var(--red) !important;
          animation: indicatorBlink 0.4s ease-in-out infinite;
        }

        /* Background atmosphere */
        .bg-atmosphere {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse 60% 50% at 30% 70%, rgba(212,160,23,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 70% 30%, rgba(204,16,16,0.03) 0%, transparent 70%),
            linear-gradient(180deg, #0d0804 0%, #1a1008 50%, #0d0804 100%);
        }

        /* Yellow rain lines */
        .rain-line {
          position: fixed;
          top: -100%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(212,160,23,0.15), transparent);
          animation: rainFall linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes rainFall {
          from { top: -100%; }
          to { top: 100%; }
        }

        /* RECEIVER 3D button */
        .receiver-btn {
          perspective: 500px;
          transform-style: preserve-3d;
        }

        .receiver-btn-inner {
          transform-style: preserve-3d;
          transition: transform 0.15s ease;
          position: relative;
        }

        .receiver-btn-inner:active {
          transform: translateZ(-4px) rotateX(3deg);
        }

        .btn-face {
          background: linear-gradient(160deg, #2a1f0e, #1a1008);
          border: 2px solid var(--gold-dark);
          border-bottom: 4px solid #000;
          border-right: 3px solid #000;
          box-shadow:
            4px 4px 0 #000,
            0 0 0 1px rgba(212,160,23,0.1),
            inset 0 1px 0 rgba(212,160,23,0.2);
          transition: all 0.15s ease;
        }

        .btn-face:hover {
          border-color: var(--gold);
          box-shadow:
            4px 4px 0 #000,
            0 0 20px rgba(212,160,23,0.15),
            inset 0 1px 0 rgba(212,160,23,0.3);
        }

        .btn-face:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 #000;
          border-bottom-width: 2px;
          border-right-width: 2px;
        }

        /* Hang up button */
        .hangup-btn {
          background: linear-gradient(160deg, var(--red-dark), #500000);
          border: 2px solid #800000;
          border-bottom: 4px solid #000;
          border-right: 3px solid #000;
          box-shadow:
            4px 4px 0 #000,
            0 0 20px rgba(204,16,16,0.2),
            inset 0 1px 0 rgba(255,100,100,0.2);
          animation: redPulse 1.5s ease-in-out infinite;
        }

        @keyframes redPulse {
          0%, 100% { box-shadow: 4px 4px 0 #000, 0 0 20px rgba(204,16,16,0.2), inset 0 1px 0 rgba(255,100,100,0.2); }
          50% { box-shadow: 4px 4px 0 #000, 0 0 40px rgba(204,16,16,0.5), inset 0 1px 0 rgba(255,100,100,0.3); }
        }

        .hangup-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 #000;
        }

        /* Section divider */
        .section-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 0.4em;
          color: var(--gold-dark);
          text-transform: uppercase;
        }

        /* Rotary dial 3D shadow */
        .dial-3d-wrap {
          filter: drop-shadow(0 20px 30px rgba(0,0,0,0.8)) drop-shadow(0 0 20px rgba(212,160,23,0.1));
          transform: perspective(600px) rotateX(10deg);
          transition: transform 0.4s ease;
        }

        .dial-3d-wrap:hover {
          transform: perspective(600px) rotateX(4deg) scale(1.02);
        }

        /* Phone book strip */
        .phonebook-strip {
          background: var(--cream);
          border: 1px solid var(--cream-dark);
          box-shadow: inset 0 0 8px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }

        .phonebook-strip::before {
          content: 'TELEPHONE DIRECTORY — EST. MCMXXVI';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-1deg);
          font-family: 'Special Elite', cursive;
          font-size: 7px;
          letter-spacing: 0.3em;
          color: rgba(26,16,8,0.35);
          white-space: nowrap;
        }

        @keyframes typewrite {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0% 0 0); }
        }

        .typewrite-anim {
          animation: typewrite 1.5s steps(30) forwards;
        }

        /* Toggle switch 3D */
        .toggle-3d {
          transform: perspective(400px) rotateX(8deg);
          transform-style: preserve-3d;
        }
      `}</style>

      <div className="grain" />
      <div className="bg-atmosphere" />

      {/* Atmospheric rain lines */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="rain-line"
          style={{
            left: `${10 + i * 12}%`,
            height: `${60 + Math.random() * 40}%`,
            animationDuration: `${3 + i * 0.7}s`,
            animationDelay: `${i * 0.4}s`,
            opacity: 0.3 + (i % 3) * 0.1,
          }}
        />
      ))}

      <div className="scene relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-4">
        
        {/* Booth masthead above */}
        <div className="mb-6 text-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.6em', color: 'var(--gold-dark)', marginBottom: '4px' }}>
            ✦ CROWN IMPERIAL ✦
          </div>
          <div style={{ fontSize: '32px', letterSpacing: '0.15em', color: 'var(--gold)', textShadow: '0 0 40px rgba(212,160,23,0.3)' }}>
            TELEPHONE EXCHANGE
          </div>
          <div style={{ fontSize: '9px', letterSpacing: '0.5em', color: 'var(--gold-dark)' }}>
            PRIVATE WIRE — AUTHORISED USERS ONLY
          </div>
        </div>

        {/* Phone book strip */}
        <div className="phonebook-strip w-full max-w-sm h-8 mb-4 rounded-sm" />

        {/* Main booth */}
        <div className={`booth-wrap ${boothOpen ? 'booth-enter' : 'opacity-0'}`}
          style={{ width: '100%', maxWidth: '380px' }}>
          
          <div className="booth-outer p-0">
            {/* Corner decals */}
            <div className="corner-decal tl" />
            <div className="corner-decal tr" />
            <div className="corner-decal bl" />
            <div className="corner-decal br" />

            <div className="relative z-10 p-8 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`indicator-light w-2.5 h-2.5 rounded-full ${isOffHook ? 'active' : ''}`}
                    style={{ background: isOffHook ? 'var(--red)' : '#333' }}
                  />
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: loading ? 'var(--gold)' : '#222', boxShadow: loading ? '0 0 8px rgba(212,160,23,0.8)' : 'none', transition: 'all 0.3s' }}
                  />
                </div>

                <div className="brass-plate">Model 2026 · Signal Secure</div>

                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', color: 'var(--gold-dark)', letterSpacing: '0.2em' }}>
                  REG. Nº 7
                </div>
              </div>

              {/* Ornamental rule */}
              <div className="ornamental-rule">
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '8px', color: 'var(--gold-dark)', letterSpacing: '0.3em' }}>
                  TRANSMISSION
                </span>
              </div>

              {/* DISPLAY SCREEN */}
              <div className={`display-screen p-6 ${glitch ? 'glitch' : ''}`} style={{ minHeight: '140px' }}>
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  {loading ? (
                    <div className="signal-pulse display-text text-center" style={{ fontSize: '18px' }}>
                      ··· CONNECTING ···
                    </div>
                  ) : (
                    <p className={`display-text text-center ${isOffHook && !loading ? 'typewrite-anim' : ''}`} style={{ fontSize: '20px', fontWeight: 700 }}>
                      "{topic}"
                    </p>
                  )}

                  {isOffHook && !loading && (
                    <div className="flex flex-col items-center gap-2 mt-2">
                      {/* SVG arc timer */}
                      <svg className="timer-svg" width="60" height="60" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="24" fill="none" stroke="#1a1008" strokeWidth="4" />
                        <circle
                          cx="30" cy="30" r="24"
                          fill="none"
                          stroke={timer > 20 ? 'var(--gold)' : 'var(--red)'}
                          strokeWidth="4"
                          strokeDasharray={`${2 * Math.PI * 24}`}
                          strokeDashoffset={`${2 * Math.PI * 24 * (1 - timerPct / 100)}`}
                          strokeLinecap="round"
                          transform="rotate(-90 30 30)"
                          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease', filter: `drop-shadow(0 0 6px ${timer > 20 ? 'rgba(212,160,23,0.6)' : 'rgba(204,16,16,0.6)'})` }}
                        />
                        <text x="30" y="30" textAnchor="middle" dominantBaseline="central"
                          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', fill: timer > 20 ? 'var(--gold-light)' : 'var(--red)', letterSpacing: '0.05em' }}>
                          {timer < 10 ? `0${timer}` : timer}
                        </text>
                      </svg>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '8px', color: 'var(--gold-dark)', letterSpacing: '0.4em' }}>
                        SECONDS REMAINING
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls (only when not on hook) */}
              {!isOffHook && (
                <>
                  {/* Transmission Mode */}
                  <div className="toggle-3d">
                    <TopicLengthSwitch
                      topicLength={topicLength}
                      onChange={setTopicLength}
                      disabled={isOffHook}
                    />
                  </div>

                  {/* Rotary Dial */}
                  <div className="dial-3d-wrap">
                    <RotaryDial
                      genres={GENRES}
                      selectedGenre={genre}
                      onSelect={setGenre}
                      disabled={isOffHook}
                    />
                  </div>
                </>
              )}

              {/* Ornamental rule */}
              <div className="ornamental-rule">
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '8px', color: 'var(--gold-dark)', letterSpacing: '0.3em' }}>
                  RECEIVER
                </span>
              </div>

              {/* Phone Handle Button */}
              <PhoneHandle
                isOffHook={isOffHook}
                onPickUp={handlePickUp}
                onHangUp={handleHangUp}
              />

              {/* Footer dots */}
              <div className="flex justify-center gap-3 pt-2">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: i === 3 ? '6px' : '4px',
                      height: i === 3 ? '6px' : '4px',
                      background: i === 3 ? 'var(--gold-dark)' : '#2a2010',
                      boxShadow: i === 3 ? '0 0 6px rgba(212,160,23,0.4)' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Below tagline */}
        <div className="mt-8 text-center space-y-1">
          <div style={{ fontFamily: "'Special Elite', cursive", fontSize: '11px', color: 'var(--gold-dark)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Stay on the line. Do not hang up.
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '9px', color: '#2a2010', letterSpacing: '0.5em' }}>
            ALL CALLS MONITORED · EST. MCMXXVI
          </div>
        </div>
      </div>
    </>
  );
}