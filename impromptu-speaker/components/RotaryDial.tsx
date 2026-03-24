"use client";
import React, { useState } from "react";

interface RotaryDialProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
  disabled: boolean;
}

export default function RotaryDial({ genres, selectedGenre, onSelect, disabled }: RotaryDialProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);
  const [ripple, setRipple] = useState<string | null>(null);

  const handleDial = (genre: string) => {
    if (disabled) return;
    setIsSpinning(true);
    setRipple(genre);
    onSelect(genre);
    setSpinAngle((prev) => prev - 72);
    setTimeout(() => setIsSpinning(false), 600);
    setTimeout(() => setRipple(null), 500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&display=swap');

        .dial-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 0;
        }

        .dial-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.35em;
          color: rgba(0, 200, 255, 0.4);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .dial-scene {
          perspective: 500px;
        }

        .dial-outer-ring {
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: transparent;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Decorative outer ring */
        .dial-outer-ring::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(0, 200, 255, 0.15);
          box-shadow: 
            0 0 0 1px rgba(0, 200, 255, 0.05),
            0 0 20px rgba(0, 200, 255, 0.05);
        }

        .dial-outer-ring::after {
          content: '';
          position: absolute;
          inset: 4px;
          border-radius: 50%;
          border: 1px dashed rgba(0, 200, 255, 0.1);
        }

        .dial-disk {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #1a1a2e 0%, #050510 70%, #000005 100%);
          border: 2px solid rgba(0, 100, 200, 0.3);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 0 1px rgba(0, 200, 255, 0.08),
            0 20px 60px rgba(0, 0, 0, 0.8),
            0 0 40px rgba(0, 100, 255, 0.05),
            inset 0 2px 10px rgba(0, 200, 255, 0.05),
            inset 0 -4px 10px rgba(0, 0, 0, 0.5);
          transition: transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1);
          transform-style: preserve-3d;
        }

        .dial-disk.spin {
          transform: rotate(-60deg) rotateX(15deg);
        }

        /* 3D depth effect on disk */
        .dial-disk::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: 
            radial-gradient(circle at 30% 25%, rgba(255,255,255,0.04) 0%, transparent 50%),
            radial-gradient(circle at 70% 75%, rgba(0,0,0,0.3) 0%, transparent 50%);
          pointer-events: none;
        }

        .dial-center {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 35%, #1e1e3a, #050510);
          border: 2px solid rgba(0, 200, 255, 0.25);
          box-shadow:
            0 0 0 4px rgba(0, 0, 0, 0.5),
            0 0 15px rgba(0, 200, 255, 0.1),
            inset 0 2px 4px rgba(0, 200, 255, 0.05),
            inset 0 -2px 4px rgba(0, 0, 0, 0.5);
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: rgba(0, 200, 255, 0.3);
          font-family: 'Share Tech Mono', monospace;
          letter-spacing: 0;
          animation: centerRotate 20s linear infinite;
        }

        @keyframes centerRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .dial-btn {
          position: absolute;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
          transition: all 0.2s ease;
          padding: 0;
        }

        .dial-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: inherit;
          transform: translateZ(-8px);
          filter: brightness(0.4);
          border-radius: 50%;
        }

        .dial-btn:not(.selected) {
          background: radial-gradient(circle at 35% 30%, #1a1a2e 0%, #08080f 100%);
          border: 1px solid rgba(0, 100, 200, 0.2);
          box-shadow:
            0 4px 8px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(0, 200, 255, 0.05),
            inset 0 1px 0 rgba(255,255,255,0.03);
        }

        .dial-btn:not(.selected):hover {
          background: radial-gradient(circle at 35% 30%, #1e2040 0%, #0a0a18 100%);
          border-color: rgba(0, 200, 255, 0.4);
          box-shadow:
            0 4px 8px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(0, 200, 255, 0.15),
            inset 0 1px 0 rgba(255,255,255,0.05);
          transform: translateZ(4px) scale(1.05);
        }

        .dial-btn.selected {
          background: radial-gradient(circle at 35% 30%, #00c8ff 0%, #0050aa 60%, #003070 100%);
          border: 1px solid rgba(0, 255, 255, 0.5);
          box-shadow:
            0 0 25px rgba(0, 200, 255, 0.5),
            0 0 50px rgba(0, 200, 255, 0.2),
            0 4px 8px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255,255,255,0.2);
          transform: translateZ(6px) scale(1.08);
          animation: selectedPulse 2s ease-in-out infinite;
        }

        @keyframes selectedPulse {
          0%, 100% { box-shadow: 0 0 25px rgba(0, 200, 255, 0.5), 0 0 50px rgba(0, 200, 255, 0.2), 0 4px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2); }
          50% { box-shadow: 0 0 35px rgba(0, 200, 255, 0.7), 0 0 70px rgba(0, 200, 255, 0.35), 0 4px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2); }
        }

        .dial-btn-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.05em;
          text-align: center;
          line-height: 1.2;
          font-weight: bold;
          z-index: 1;
          pointer-events: none;
        }

        .dial-btn:not(.selected) .dial-btn-text {
          color: rgba(0, 180, 220, 0.6);
        }

        .dial-btn.selected .dial-btn-text {
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255,255,255,0.5);
        }

        .dial-btn.disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Tick marks around the dial */
        .tick {
          position: absolute;
          width: 3px;
          height: 8px;
          background: rgba(0, 200, 255, 0.15);
          border-radius: 1px;
          transform-origin: center 110px;
        }

        .ripple-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(0, 200, 255, 0.6);
          animation: rippleOut 0.5s ease-out forwards;
          pointer-events: none;
        }

        @keyframes rippleOut {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>

      <div className="dial-section">
        <div className="dial-label">◈ SELECT FREQUENCY ◈</div>

        <div className="dial-scene">
          <div className="dial-outer-ring">
            {/* Tick marks */}
            {[...Array(36)].map((_, i) => (
              <div
                key={i}
                className="tick"
                style={{
                  transform: `rotate(${i * 10}deg) translateY(-106px)`,
                  opacity: i % 3 === 0 ? 0.3 : 0.1,
                  height: i % 3 === 0 ? "10px" : "5px",
                }}
              />
            ))}

            <div className={`dial-disk ${isSpinning ? "spin" : ""}`}>
              {genres.map((genre, index) => {
                const angle = (index / genres.length) * 360 - 90;
                const radian = angle * (Math.PI / 180);
                const radius = 80;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;
                const isSelected = selectedGenre === genre;

                return (
                  <button
                    key={genre}
                    onClick={() => handleDial(genre)}
                    disabled={disabled}
                    className={`dial-btn ${isSelected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
                    style={{
                      transform: `translate(${x}px, ${y}px) ${isSelected ? "translateZ(6px) scale(1.08)" : ""}`,
                    }}
                  >
                    {ripple === genre && <div className="ripple-ring" />}
                    <span className="dial-btn-text">
                      {genre.substring(0, 4).toUpperCase()}
                    </span>
                  </button>
                );
              })}

              {/* Center hub */}
              <div className="dial-center">◎</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}