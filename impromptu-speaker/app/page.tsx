"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
type Stage = "idle" | "selecting" | "dialing" | "ringing" | "speaking" | "result";

const GENRES = ["TECH", "POP", "ARTS", "SPORT", "FOOD", "TRAVEL", "HUMOR", "SCI"];

const PROMPTS: Record<string, string[]> = {
  TECH:   ["AI taking over your job", "Your phone is smarter than you", "The last password you'll ever need"],
  POP:    ["Cancel culture went too far", "The greatest era of music", "Social media is a highlight reel"],
  ARTS:   ["Art without suffering is incomplete", "NFTs were never art", "Cinema peaked in the 90s"],
  SPORT:  ["The GOAT debate, settled", "Esports deserve Olympic gold", "Fans are part of the team"],
  FOOD:   ["Pineapple belongs on pizza", "Brunch is overrated", "The best cuisine in the world"],
  TRAVEL: ["Overtourism ruins destinations", "Luxury travel is worth it", "Living abroad changes you"],
  HUMOR:  ["Dad jokes are peak comedy", "Puns are a high art form", "Nothing is off limits in comedy"],
  SCI:    ["We are definitely not alone", "Time travel would ruin everything", "The ocean is scarier than space"],
};

// ─── Rotary Dial ──────────────────────────────────────────────────────────────
function RotaryDial({ genres, selectedGenre, onSelect, disabled }: {
  genres: string[]; selectedGenre: string; onSelect: (g: string) => void; disabled: boolean;
}) {
  const [dialRotation, setDialRotation] = useState(0);

  const handleClick = (genre: string, index: number) => {
    if (disabled) return;
    const targetAngle = (index / genres.length) * 360;
    const spinTo = targetAngle + 90 + 120;
    setDialRotation(spinTo);
    setTimeout(() => setDialRotation(0), 700);
    onSelect(genre);
  };

  return (
    <div style={{ position: "relative", width: 200, height: 200 }}>
      {/* Outer brass ring */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "radial-gradient(circle at 38% 28%, #d4a843, #a07828 50%, #6a4e10 85%, #3d2c08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4), inset 0 2px 8px rgba(255,220,120,0.3), inset 0 -4px 12px rgba(0,0,0,0.5)",
        border: "3px solid #7a5518",
      }} />

      {/* Inner dial face that spins */}
      <motion.div
        animate={{ rotate: dialRotation }}
        transition={{ type: dialRotation === 0 ? "spring" : "tween", duration: dialRotation === 0 ? 0.7 : 0.3, stiffness: 120, damping: 14 }}
        style={{
          position: "absolute", inset: 6, borderRadius: "50%",
          background: "radial-gradient(circle at 40% 32%, #c8984a, #9a7030 55%, #5c3e0a)",
          boxShadow: "inset 0 3px 10px rgba(255,200,100,0.2), inset 0 -4px 12px rgba(0,0,0,0.5)",
        }}
      >
        {/* Finger holes */}
        {genres.map((genre, i) => {
          const angle = (i / genres.length) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const r = 64;
          const cx = 94 + Math.cos(rad) * r;
          const cy = 94 + Math.sin(rad) * r;
          return (
            <button
              key={genre}
              onClick={() => handleClick(genre, i)}
              disabled={disabled}
              aria-label={genre}
              style={{
                position: "absolute",
                left: cx - 15, top: cy - 15,
                width: 30, height: 30,
                borderRadius: "50%",
                border: "none",
                cursor: disabled ? "default" : "pointer",
                background: "radial-gradient(circle at 40% 35%, rgba(80,50,10,0.7), rgba(20,10,2,0.95))",
                boxShadow: "inset 0 3px 8px rgba(0,0,0,0.95), inset 0 -1px 3px rgba(180,130,50,0.15), 0 1px 2px rgba(0,0,0,0.5)",
              }}
            />
          );
        })}
      </motion.div>

      {/* Center label — static, does NOT spin */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 64, height: 64, borderRadius: "50%",
        background: "radial-gradient(circle at 40% 30%, #f7edcc, #e4d09a 60%, #c9b060)",
        border: "2.5px solid #a88030",
        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.3), 0 2px 5px rgba(0,0,0,0.4)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        zIndex: 10, pointerEvents: "none", gap: 3,
      }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: 6.5, letterSpacing: "0.22em", color: "#2a1a04", fontWeight: 700, textTransform: "uppercase" }}>Don't</span>
        <div style={{ width: 24, height: 0.5, background: "#7a5818", opacity: 0.7 }} />
        <span style={{ fontFamily: "Georgia, serif", fontSize: 6.5, letterSpacing: "0.22em", color: "#2a1a04", textTransform: "uppercase" }}>Hang Up</span>
      </div>

      {/* Genre labels — outside dial, static */}
      {genres.map((genre, i) => {
        const angle = (i / genres.length) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const r = 108;
        const lx = 100 + Math.cos(rad) * r;
        const ly = 100 + Math.sin(rad) * r;
        const isSelected = selectedGenre === genre;
        return (
          <div key={`lbl-${genre}`} style={{
            position: "absolute", left: lx, top: ly, transform: "translate(-50%, -50%)",
            fontFamily: "Georgia, serif", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em",
            color: isSelected ? "#ffe066" : "rgba(255, 235, 170, 0.65)",
            textShadow: isSelected ? "0 0 10px rgba(255,220,60,0.8)" : "0 1px 2px rgba(0,0,0,0.8)",
            transition: "color 0.3s, text-shadow 0.3s",
            pointerEvents: "none", whiteSpace: "nowrap",
          }}>
            {genre}
          </div>
        );
      })}

      {/* Stopper tab */}
      <div style={{
        position: "absolute", bottom: 14, right: 8,
        width: 34, height: 11, borderRadius: 999,
        background: "linear-gradient(to bottom, #e8e8e8 0%, #aaa 50%, #777 100%)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.7), inset 0 1px 2px rgba(255,255,255,0.8)",
        transform: "rotate(22deg)", zIndex: 12,
      }} />
    </div>
  );
}

// ─── Earpiece End ─────────────────────────────────────────────────────────────
function EarpieceEnd() {
  return (
    <div style={{
      width: 88, height: 88, borderRadius: "50%", flexShrink: 0,
      background: "radial-gradient(circle at 38% 30%, #2e2e2e, #111 60%, #000)",
      boxShadow: "inset 0 -6px 16px rgba(0,0,0,1), inset 0 3px 8px rgba(255,255,255,0.06), 0 6px 14px rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: 68, height: 68, borderRadius: "50%",
        background: "#0d0d0d", border: "1px solid #2a2a2a",
        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.9)",
        display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center",
        padding: 13, gap: 3,
      }}>
        {[...Array(9)].map((_, i) => (
          <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#070707", boxShadow: "inset 0 1px 2px rgba(0,0,0,1)" }} />
        ))}
      </div>
    </div>
  );
}

// ─── Handset ──────────────────────────────────────────────────────────────────
function Handset({ lifted, onToggle }: { lifted: boolean; onToggle: () => void }) {
  return (
    <motion.div
      onClick={onToggle}
      animate={{ y: lifted ? -90 : 0, rotate: lifted ? -20 : 0, x: lifted ? 10 : 0 }}
      transition={{ type: "spring", stiffness: 110, damping: 14 }}
      style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", cursor: "pointer", zIndex: 30, display: "flex", alignItems: "center" }}
    >
      <div style={{ position: "relative", display: "flex", alignItems: "center", width: 300, height: 60 }}>
        {/* SVG tapered body */}
        <svg width="300" height="60" viewBox="0 0 300 60" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a3a3a" />
              <stop offset="40%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#080808" />
            </linearGradient>
            <linearGradient id="hshine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>
          </defs>
          <path
            d="M50,8 Q60,2 80,3 L220,3 Q240,2 250,8 L296,28 Q300,30 296,32 L250,52 Q240,58 220,57 L80,57 Q60,58 50,52 L4,32 Q0,30 4,28 Z"
            fill="url(#hg)" stroke="#2a2a2a" strokeWidth="1"
          />
          <path
            d="M52,10 Q62,5 82,6 L218,6 Q238,5 248,10 L288,28 L248,12 Q238,8 218,8 L82,8 Q62,8 52,12 Z"
            fill="url(#hshine)"
          />
          {[120,130,140,150,160,170,180].map(x => (
            <line key={x} x1={x} y1="15" x2={x} y2="45" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
        </svg>
        {/* Left earpiece */}
        <div style={{ position: "absolute", left: -12, top: "50%", transform: "translateY(-50%)" }}>
          <EarpieceEnd />
        </div>
        {/* Center label */}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none", zIndex: 5 }}>
          <span style={{
            fontFamily: "Georgia, serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.35em",
            textTransform: "uppercase", color: lifted ? "#ff5555" : "#c9a840",
            textShadow: lifted ? "0 0 12px rgba(255,60,60,0.5)" : "0 0 8px rgba(200,160,40,0.4)",
            transition: "color 0.3s",
          }}>
            {lifted ? "Hang Up" : "Lift to Call"}
          </span>
        </div>
        {/* Right mouthpiece */}
        <div style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)" }}>
          <EarpieceEnd />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Phone Body ───────────────────────────────────────────────────────────────
function PhoneBody({ isRinging, children }: { isRinging: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      animate={isRinging ? { rotate: [-1.5, 1.5, -1.5, 1.5, -1, 1, 0], y: [0, -3, 0, -3, 0] } : { rotate: 0, y: 0 }}
      transition={isRinging ? { duration: 0.5, repeat: Infinity } : { duration: 0.3 }}
      style={{ position: "relative", width: 360 }}
    >
      <div style={{
        position: "relative", width: 360,
        background: [
          "radial-gradient(ellipse at 30% 20%, #8aaccb 0%, transparent 55%)",
          "radial-gradient(ellipse at 75% 75%, #2a4a62 0%, transparent 55%)",
          "linear-gradient(160deg, #6d8fa8 0%, #4a7090 25%, #3a5f7a 55%, #2c4a5e 80%, #1e3448 100%)",
        ].join(", "),
        borderRadius: "30px 30px 70px 70px / 24px 24px 60px 60px",
        padding: "16px 20px 44px",
        boxShadow: [
          "0 40px 80px rgba(0,0,0,0.6)",
          "0 16px 32px rgba(0,0,0,0.4)",
          "0 4px 8px rgba(0,0,0,0.3)",
          "inset 0 2px 12px rgba(255,255,255,0.18)",
          "inset 0 -6px 20px rgba(0,0,0,0.5)",
          "inset 2px 0 8px rgba(255,255,255,0.06)",
        ].join(", "),
        border: "1.5px solid rgba(160, 200, 230, 0.18)",
      }}>
        {/* Top edge highlight */}
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 2,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.25) 60%, transparent)",
          borderRadius: "0 0 4px 4px",
        }} />
        {/* Speaker grille */}
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginBottom: 20, paddingTop: 6 }}>
          {[...Array(9)].map((_, i) => (
            <div key={i} style={{
              width: 3, height: 18, borderRadius: 2,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7))",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.06)",
            }} />
          ))}
        </div>
        {children}
        {/* Bottom screws */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 30px", marginTop: 16, opacity: 0.4 }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%, #5a5a5a, #1a1a1a)",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.8), 0 1px 2px rgba(255,255,255,0.1)",
            }} />
          ))}
        </div>
        {/* Side shadows */}
        <div style={{ position: "absolute", top: "15%", bottom: "5%", left: 0, width: 8, background: "linear-gradient(to right, rgba(0,0,0,0.35), transparent)", borderRadius: "30px 0 0 30px" }} />
        <div style={{ position: "absolute", top: "15%", bottom: "5%", right: 0, width: 8, background: "linear-gradient(to left, rgba(0,0,0,0.35), transparent)", borderRadius: "0 30px 30px 0" }} />
      </div>
    </motion.div>
  );
}

// ─── Timer Ring ───────────────────────────────────────────────────────────────
function TimerRing({ seconds, total }: { seconds: number; total: number }) {
  const r = 26, circ = 2 * Math.PI * r, pct = seconds / total;
  const color = seconds <= 10 ? "#ff5555" : "#ffe066";
  return (
    <svg width={68} height={68}>
      <circle cx={34} cy={34} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={4} />
      <motion.circle
        cx={34} cy={34} r={r} fill="none"
        stroke={color} strokeWidth={4} strokeLinecap="round"
        strokeDasharray={circ}
        animate={{ strokeDashoffset: circ * (1 - pct) }}
        transition={{ duration: 1, ease: "linear" }}
        style={{ rotate: -90, transformOrigin: "34px 34px" }}
      />
      <text x={34} y={39} textAnchor="middle" fill="white" fontSize={17} fontFamily="Georgia, serif" fontWeight="bold">{seconds}</text>
    </svg>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Page() {
  const [stage, setStage] = useState<Stage>("idle");
  const [lifted, setLifted] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [prompt, setPrompt] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pickPrompt = (genre: string) => {
    const list = PROMPTS[genre] ?? ["Speak your mind!"];
    return list[Math.floor(Math.random() * list.length)];
  };

  const handleToggle = () => {
    if (!lifted) { setLifted(true); setStage("selecting"); }
    else resetAll();
  };

  const handleGenreSelect = (genre: string) => {
    if (stage !== "selecting") return;
    setSelectedGenre(genre);
    setStage("dialing");
    setTimeout(() => {
      setStage("ringing");
      setTimeout(() => {
        const p = pickPrompt(genre);
        setPrompt(p);
        setTimeLeft(60);
        setStage("speaking");
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) { clearInterval(timerRef.current!); setStage("result"); return 0; }
            return prev - 1;
          });
        }, 1000);
      }, 2200);
    }, 900);
  };

  const resetAll = () => {
    setLifted(false); setStage("idle"); setSelectedGenre(""); setPrompt("");
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  // Mouse parallax
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rotX = useTransform(my, [-300, 300], [6, -6]);
  const rotY = useTransform(mx, [-300, 300], [-8, 8]);
  const handleMouseMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(155deg, #f2ece0 0%, #eae2d2 40%, #ddd5c4 80%, #d5ccba 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
        padding: "44px 24px 120px",
        fontFamily: "Georgia, serif",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Paper grain */}
      <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: 4 }}
      >
        <h1 style={{
          fontFamily: "Georgia, serif", fontStyle: "italic",
          fontSize: "clamp(48px, 9vw, 80px)", fontWeight: 700,
          color: "#1a1208", letterSpacing: "-0.02em", lineHeight: 1.05, margin: 0,
        }}>
          Don't Hang Up!
        </h1>
        <p style={{
          fontSize: "clamp(13px, 2vw, 15px)", color: "#6a5c40",
          marginTop: 10, maxWidth: 400, lineHeight: 1.6, margin: "10px auto 0",
        }}>
          An impromptu speaking prompt thingy! This is for the yap girlies
          and girlies who want to get their yap game together!
        </p>
      </motion.div>

      {/* Status */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stage}
          initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 11, color: "#9a8860", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 20, marginBottom: 28, height: 18 }}
        >
          {stage === "idle"      && "↑  lift the handset to begin"}
          {stage === "selecting" && "← dial a genre hole to spin"}
          {stage === "dialing"   && `dialing ${selectedGenre}…`}
          {stage === "ringing"   && "☎  ringing…"}
          {stage === "speaking"  && "🎙  speak now!"}
          {stage === "result"    && "✓  time's up — well done!"}
        </motion.p>
      </AnimatePresence>

      {/* Phone with 3D parallax */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{ perspective: 900, perspectiveOrigin: "50% 40%" }}
      >
        <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
          <PhoneBody isRinging={stage === "ringing"}>
            <div style={{ position: "relative", height: 70, marginBottom: 16 }}>
              <Handset lifted={lifted} onToggle={handleToggle} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <RotaryDial
                genres={GENRES}
                selectedGenre={selectedGenre}
                onSelect={handleGenreSelect}
                disabled={stage !== "selecting"}
              />
            </div>
          </PhoneBody>
        </motion.div>
      </motion.div>

      {/* Speaking / Result overlay */}
      <AnimatePresence>
        {(stage === "speaking" || stage === "result") && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            style={{
              position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
              background: "rgba(12, 8, 2, 0.93)",
              backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(200, 160, 60, 0.25)",
              borderRadius: 22, padding: "28px 36px 24px",
              maxWidth: 460, width: "calc(100vw - 40px)", textAlign: "center",
              boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.4)",
              zIndex: 100,
            }}
          >
            {stage === "speaking" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a840", textTransform: "uppercase" }}>Your topic</span>
                <p style={{ fontSize: "clamp(16px, 4vw, 23px)", fontFamily: "Georgia, serif", fontStyle: "italic", color: "#fff", lineHeight: 1.35, margin: 0 }}>
                  "{prompt}"
                </p>
                <span style={{ fontSize: 10, color: "#666", letterSpacing: "0.15em" }}>GENRE: {selectedGenre}</span>
                <TimerRing seconds={timeLeft} total={60} />
                <button onClick={resetAll} style={{
                  marginTop: 2, padding: "8px 24px", borderRadius: 999,
                  border: "1px solid #ff5555", background: "transparent",
                  color: "#ff5555", fontSize: 10, letterSpacing: "0.22em",
                  cursor: "pointer", fontFamily: "Georgia, serif", textTransform: "uppercase",
                }}>
                  Hang Up
                </button>
              </div>
            )}
            {stage === "result" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 30 }}>🎉</span>
                <p style={{ fontSize: 22, fontFamily: "Georgia, serif", fontStyle: "italic", color: "#ffe066", margin: 0 }}>
                  That's a wrap!
                </p>
                <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                  You spoke on: <em style={{ color: "#ddd" }}>"{prompt}"</em>
                </p>
                <button onClick={resetAll} style={{
                  marginTop: 4, padding: "11px 30px", borderRadius: 999, border: "none",
                  background: "linear-gradient(135deg, #d4a840, #9a7820)",
                  color: "#1a0a00", fontSize: 11, letterSpacing: "0.22em",
                  cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: 700,
                  textTransform: "uppercase", boxShadow: "0 4px 12px rgba(200,140,30,0.4)",
                }}>
                  Dial Again
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}