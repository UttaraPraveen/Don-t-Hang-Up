"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type Stage = "idle" | "selecting" | "dialing" | "ringing" | "speaking" | "result";

// ─── Data ─────────────────────────────────────────────────────────────────────
const GENRES = ["TECH", "POP", "ARTS", "SPORT", "FOOD", "TRAVEL", "HUMOR", "SCI"];
const PROMPTS: Record<string, string[]> = {
  TECH:   ["AI taking over your job",  "Your phone is smarter than you", "The last password you'll ever need"],
  POP:    ["Cancel culture went too far", "The greatest era of music", "Social media is a highlight reel"],
  ARTS:   ["Art without suffering is incomplete", "NFTs were never art", "Cinema peaked in the 90s"],
  SPORT:  ["The GOAT debate, settled", "Esports deserve Olympic gold", "Fans are part of the team"],
  FOOD:   ["Pineapple belongs on pizza", "Brunch is overrated", "The best cuisine in the world"],
  TRAVEL: ["Overtourism ruins destinations", "Luxury travel is worth it", "Living abroad changes you"],
  HUMOR:  ["Dad jokes are peak comedy", "Puns are a high art form", "Nothing is off limits in comedy"],
  SCI:    ["We are definitely not alone", "Time travel would ruin everything", "The ocean is scarier than space"],
};

// ─── Rotary Dial ──────────────────────────────────────────────────────────────
function RotaryDial({
  genres, selectedGenre, onSelect, disabled,
}: { genres: string[]; selectedGenre: string; onSelect: (g: string) => void; disabled: boolean }) {
  const [spinAngle, setSpinAngle] = useState(0);

  const handleDial = (genre: string, index: number) => {
    if (disabled) return;
    onSelect(genre);
    const angleOfHole = (index / genres.length) * 360 - 90;
    const stopperAngle = 120;
    const req = stopperAngle - angleOfHole;
    setSpinAngle(req > 0 ? req : req + 360);
    setTimeout(() => setSpinAngle(0), 650);
  };

  return (
    <div className="relative flex justify-center items-center" style={{ width: 240, height: 240 }}>
      {/* Base plate */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 30%, #b8914a, #7a5820 60%, #4a3210)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.5), inset 0 4px 12px rgba(255,255,255,0.15), inset 0 -6px 16px rgba(0,0,0,0.6)",
          border: "6px solid #5a3e18",
        }}
      >
        {/* Finger holes labels */}
        {genres.map((genre, i) => {
          const angle = (i / genres.length) * 360 - 90;
          const rad = angle * (Math.PI / 180);
          const r = 78;
          const x = Math.cos(rad) * r;
          const y = Math.sin(rad) * r;
          return (
            <div
              key={`lbl-${genre}`}
              className="absolute font-serif font-bold text-center"
              style={{
                fontSize: 9,
                letterSpacing: "0.12em",
                top: "50%",
                left: "50%",
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%)) rotate(${angle + 90}deg)`,
                color: selectedGenre === genre ? "#ffe066" : "rgba(255,230,180,0.75)",
                textShadow: selectedGenre === genre ? "0 0 8px #ffe066" : "none",
                transition: "color 0.3s",
              }}
            >
              {genre}
            </div>
          );
        })}

        {/* Center label disc */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center"
          style={{
            width: 74, height: 74,
            background: "radial-gradient(circle at 40% 30%, #f5e8c8, #e0cfa0)",
            border: "2px solid #c9a95a",
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          <span style={{ fontFamily: "Georgia, serif", fontSize: 7, letterSpacing: "0.25em", color: "#3a2a0a", fontWeight: 700 }}>DON'T</span>
          <div style={{ width: 28, height: 1, background: "#9a7a3a", margin: "3px 0", opacity: 0.7 }} />
          <span style={{ fontFamily: "Georgia, serif", fontSize: 7, letterSpacing: "0.25em", color: "#3a2a0a" }}>HANG UP</span>
        </div>
      </div>

      {/* Spinning transparent dial */}
      <motion.div
        animate={{ rotate: spinAngle }}
        transition={{ type: spinAngle === 0 ? "spring" : "tween", duration: spinAngle === 0 ? 0.75 : 0.35, ease: "easeInOut", stiffness: 120, damping: 14 }}
        className="absolute inset-0 rounded-full z-10"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.05) 100%)",
          boxShadow: "inset 0 4px 12px rgba(255,255,255,0.25), inset 0 -4px 12px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {genres.map((genre, i) => {
          const angle = (i / genres.length) * 360 - 90;
          const rad = angle * (Math.PI / 180);
          const r = 78;
          const x = Math.cos(rad) * r;
          const y = Math.sin(rad) * r;
          return (
            <button
              key={`hole-${genre}`}
              onClick={() => handleDial(genre, i)}
              disabled={disabled}
              aria-label={genre}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: 36, height: 36,
                borderRadius: "50%",
                border: "none",
                cursor: disabled ? "default" : "pointer",
                background: "rgba(60,30,10,0.55)",
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                boxShadow: "inset 0 3px 8px rgba(0,0,0,0.9), inset 0 -1px 3px rgba(255,200,100,0.2)",
              }}
            />
          );
        })}
      </motion.div>

      {/* Metal stopper */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          top: "64%", right: 6,
          width: 42, height: 13,
          borderRadius: "999px",
          background: "linear-gradient(to bottom, #e8e8e8, #888)",
          boxShadow: "0 3px 8px rgba(0,0,0,0.7), inset 0 1px 2px rgba(255,255,255,0.9)",
          transform: "rotate(30deg)",
        }}
      />
    </div>
  );
}

// ─── Phone Body (3D SVG‑style CSS) ────────────────────────────────────────────
function PhoneBody({ children, isRinging }: { children: React.ReactNode; isRinging: boolean }) {
  return (
    <motion.div
      animate={isRinging ? { rotate: [-2, 2, -2, 2, 0], y: [0, -4, 0, -4, 0] } : {}}
      transition={{ repeat: isRinging ? Infinity : 0, duration: 0.4 }}
      className="relative flex flex-col items-center"
      style={{
        width: 340,
        background: "linear-gradient(145deg, #5e7d96 0%, #3a5f78 40%, #2c4a5e 100%)",
        borderRadius: "28px 28px 60px 60px",
        padding: "24px 24px 36px",
        boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.3), inset 0 2px 8px rgba(255,255,255,0.15), inset 0 -4px 12px rgba(0,0,0,0.4)",
        border: "1.5px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Top speaker grille */}
      <div className="flex gap-1 mb-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} style={{ width: 3, height: 14, borderRadius: 2, background: "rgba(0,0,0,0.4)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)" }} />
        ))}
      </div>
      {children}
      {/* Bottom decor */}
      <div className="mt-4 flex gap-2 opacity-30">
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ width: 2, height: 8, borderRadius: 1, background: "rgba(255,255,255,0.4)" }} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Handset ──────────────────────────────────────────────────────────────────
function Handset({ lifted, onClick }: { lifted: boolean; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      animate={{ y: lifted ? -70 : 0, rotate: lifted ? -18 : 0, scale: lifted ? 1.04 : 1 }}
      transition={{ type: "spring", stiffness: 130, damping: 15 }}
      className="relative flex items-center justify-center cursor-pointer"
      style={{
        width: 300, height: 64,
        background: "linear-gradient(145deg, #1a1a1a, #0a0a0a)",
        borderRadius: 999,
        border: "1.5px solid #2a2a2a",
        boxShadow: lifted
          ? "0 40px 60px rgba(0,0,0,0.8), inset 0 4px 12px rgba(255,255,255,0.15)"
          : "0 8px 24px rgba(0,0,0,0.8), inset 0 4px 12px rgba(255,255,255,0.1)",
      }}
    >
      {/* Left earpiece */}
      <Earpiece side="left" />
      <span style={{ fontFamily: "Georgia, serif", fontSize: 9, letterSpacing: "0.35em", color: lifted ? "#ff4d4d" : "#c9a840", fontWeight: 700, textTransform: "uppercase" }}>
        {lifted ? "Hang Up" : "Lift to Call"}
      </span>
      {/* Right mouthpiece */}
      <Earpiece side="right" />
    </motion.div>
  );
}

function Earpiece({ side }: { side: "left" | "right" }) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        [side === "left" ? "left" : "right"]: -10,
        width: 84, height: 84,
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 30%, #2a2a2a, #000)",
        boxShadow: "inset 0 -4px 12px rgba(0,0,0,1), 0 6px 12px rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="flex flex-wrap justify-center content-center gap-1 p-3"
        style={{ width: 66, height: 66, borderRadius: "50%", background: "#111", border: "1px solid #333" }}
      >
        {[...Array(9)].map((_, i) => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#0a0a0a", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.9)" }} />
        ))}
      </div>
    </div>
  );
}

// ─── Timer Ring ───────────────────────────────────────────────────────────────
function TimerRing({ seconds, total }: { seconds: number; total: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const frac = seconds / total;
  return (
    <svg width={72} height={72}>
      <circle cx={36} cy={36} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={4} />
      <motion.circle
        cx={36} cy={36} r={r} fill="none"
        stroke={seconds <= 10 ? "#ff4d4d" : "#ffe066"}
        strokeWidth={4} strokeLinecap="round"
        strokeDasharray={circ}
        animate={{ strokeDashoffset: circ * (1 - frac) }}
        transition={{ duration: 1, ease: "linear" }}
        style={{ rotate: -90, transformOrigin: "36px 36px" }}
      />
      <text x={36} y={41} textAnchor="middle" fill="white" fontSize={18} fontFamily="Georgia, serif" fontWeight="bold">{seconds}</text>
    </svg>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Page() {
  const [stage, setStage] = useState<Stage>("idle");
  const [lifted, setLifted] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [topicLength, setTopicLength] = useState<"word" | "phrase">("phrase");
  const [prompt, setPrompt] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalTime] = useState(60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Pick a prompt from the selected genre
  const pickPrompt = (genre: string) => {
    const list = PROMPTS[genre] ?? ["Speak your mind!"];
    return list[Math.floor(Math.random() * list.length)];
  };

  const handlePickUp = () => {
    if (stage !== "idle") return;
    setLifted(true);
    setStage("selecting");
  };

  const handleHangUp = () => {
    setLifted(false);
    setStage("idle");
    setSelectedGenre("");
    setPrompt("");
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleGenreSelect = (genre: string) => {
    if (stage !== "selecting") return;
    setSelectedGenre(genre);
    setStage("dialing");

    // After dial animation, go ringing → speaking
    setTimeout(() => {
      setStage("ringing");
      setTimeout(() => {
        const p = pickPrompt(genre);
        setPrompt(p);
        setTimeLeft(60);
        setStage("speaking");
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timerRef.current!);
              setStage("result");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 2000);
    }, 800);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f0ebe0 0%, #e8e0d0 50%, #ddd5c5 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "48px 24px 80px",
        fontFamily: "Georgia, serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle paper grain overlay */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.5, pointerEvents: "none" }} />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-2"
      >
        <h1 style={{ fontSize: "clamp(42px, 8vw, 72px)", fontFamily: "'Georgia', serif", fontStyle: "italic", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.1, margin: 0, letterSpacing: "-0.01em" }}>
          Don't Hang Up!
        </h1>
        <p style={{ fontSize: "clamp(13px, 2vw, 16px)", color: "#5a5040", marginTop: 10, maxWidth: 420, lineHeight: 1.5 }}>
          An impromptu speaking prompt thingy! This is for the yap girlies
          and girlies who want to get their yap game together!
        </p>
      </motion.div>

      {/* Mode toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-3 mb-8"
      >
        <span style={{ fontSize: 11, color: "#7a6a50", letterSpacing: "0.15em", textTransform: "uppercase" }}>Topic Mode:</span>
        <button
          onClick={() => setTopicLength(topicLength === "word" ? "phrase" : "word")}
          disabled={stage !== "idle"}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.15)",
            borderRadius: 999, padding: "4px 14px", cursor: "pointer", fontSize: 11,
            letterSpacing: "0.12em", color: "#3a2a10", fontFamily: "Georgia, serif",
            fontWeight: 600,
          }}
        >
          <span style={{ opacity: topicLength === "word" ? 1 : 0.3 }}>WORD</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ opacity: topicLength === "phrase" ? 1 : 0.3 }}>PHRASE</span>
        </button>
      </motion.div>

      {/* Status hint */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stage}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 12, color: "#8a7a60", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, height: 20 }}
        >
          {stage === "idle" && "↑  lift the handset to begin"}
          {stage === "selecting" && "← dial a genre to spin"}
          {stage === "dialing" && `dialing ${selectedGenre}…`}
          {stage === "ringing" && "☎  ringing…"}
          {stage === "speaking" && "🎙  speak now!"}
          {stage === "result" && "✓  time's up — well done!"}
        </motion.p>
      </AnimatePresence>

      {/* ── The Phone ── */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ position: "relative" }}
      >
        <PhoneBody isRinging={stage === "ringing"}>
          {/* Rotary dial on body */}
          <div style={{ marginBottom: 20 }}>
            <RotaryDial
              genres={GENRES}
              selectedGenre={selectedGenre}
              onSelect={handleGenreSelect}
              disabled={stage !== "selecting"}
            />
          </div>

          {/* Handset — sits on top of phone body */}
          <Handset lifted={lifted} onClick={lifted ? handleHangUp : handlePickUp} />
        </PhoneBody>
      </motion.div>

      {/* ── Overlay panel: speaking / result ── */}
      <AnimatePresence>
        {(stage === "speaking" || stage === "result") && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            style={{
              position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
              background: "rgba(20,12,4,0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(200,160,60,0.3)",
              borderRadius: 20,
              padding: "28px 36px",
              maxWidth: 460, width: "calc(100vw - 48px)",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {stage === "speaking" && (
              <div className="flex flex-col items-center gap-4">
                <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a840", textTransform: "uppercase" }}>Your topic</div>
                <div style={{ fontSize: "clamp(18px, 4vw, 26px)", fontFamily: "Georgia, serif", fontStyle: "italic", color: "#fff", lineHeight: 1.3 }}>"{prompt}"</div>
                <div style={{ fontSize: 10, color: "#888", letterSpacing: "0.15em" }}>GENRE: {selectedGenre}</div>
                <TimerRing seconds={timeLeft} total={totalTime} />
                <button
                  onClick={handleHangUp}
                  style={{ marginTop: 4, padding: "8px 24px", borderRadius: 999, border: "1px solid #ff4d4d", background: "transparent", color: "#ff4d4d", fontSize: 11, letterSpacing: "0.2em", cursor: "pointer", fontFamily: "Georgia, serif" }}
                >
                  HANG UP
                </button>
              </div>
            )}
            {stage === "result" && (
              <div className="flex flex-col items-center gap-4">
                <div style={{ fontSize: 32 }}>🎉</div>
                <div style={{ fontSize: 22, fontFamily: "Georgia, serif", fontStyle: "italic", color: "#ffe066" }}>That's a wrap!</div>
                <div style={{ fontSize: 14, color: "#aaa" }}>You spoke on: <span style={{ color: "#fff", fontStyle: "italic" }}>"{prompt}"</span></div>
                <button
                  onClick={handleHangUp}
                  style={{ marginTop: 4, padding: "10px 28px", borderRadius: 999, border: "none", background: "linear-gradient(135deg, #c9a840, #9a7a20)", color: "#1a0a00", fontSize: 12, letterSpacing: "0.2em", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: 700 }}
                >
                  DIAL AGAIN
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}