"use client";
import React, { useState } from "react";

interface RotaryDialProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
  disabled: boolean;
}

export default function RotaryDial({ genres, selectedGenre, onSelect, disabled }: RotaryDialProps) {
  const [spinDeg, setSpinDeg] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleDial = (genre: string) => {
    if (disabled || isSpinning) return;
    setIsSpinning(true);
    setSpinDeg((prev) => prev - 80);
    onSelect(genre);
    setTimeout(() => {
      setSpinDeg((prev) => prev + 80);
      setTimeout(() => setIsSpinning(false), 400);
    }, 300);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '9px',
        letterSpacing: '0.45em',
        color: '#8b6914',
        textTransform: 'uppercase',
      }}>
        Select Frequency
      </div>

      {/* Outer bezel ring */}
      <div style={{
        position: 'relative',
        width: '220px',
        height: '220px',
        borderRadius: '50%',
        background: 'linear-gradient(145deg, #3a2a10, #1a1008, #2a1a08)',
        border: '3px solid #8b6914',
        boxShadow: `
          0 0 0 1px #000,
          0 0 0 6px #1a1008,
          0 0 0 8px #2a1a08,
          0 8px 30px rgba(0,0,0,0.8),
          inset 0 0 20px rgba(0,0,0,0.6),
          inset 0 2px 0 rgba(212,160,23,0.2)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Tick marks on bezel */}
        {[...Array(36)].map((_, i) => {
          const a = (i / 36) * 360;
          const r = a * (Math.PI / 180);
          const big = i % 6 === 0;
          return (
            <div key={i} style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: big ? '2px' : '1px',
              height: big ? '8px' : '4px',
              background: big ? '#8b6914' : '#3a2a10',
              transformOrigin: '50% 104px',
              transform: `translateX(-50%) rotate(${a}deg)`,
              marginTop: '-104px',
            }} />
          );
        })}

        {/* Spinning inner disc */}
        <div style={{
          position: 'relative',
          width: '168px',
          height: '168px',
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #251a08, #1a1008)',
          border: '2px solid #2a1a08',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 0 0 1px #000',
          transform: `rotate(${spinDeg}deg)`,
          transition: isSpinning ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Genre buttons around the disc */}
          {genres.map((genre, index) => {
            const angle = (index / genres.length) * 360 - 90;
            const radian = angle * (Math.PI / 180);
            const radius = 58;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;
            const isSelected = selectedGenre === genre;

            return (
              <button
                key={genre}
                onClick={() => handleDial(genre)}
                disabled={disabled}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  background: isSelected
                    ? 'linear-gradient(145deg, #d4a017, #a07010)'
                    : 'linear-gradient(145deg, #1a1008, #0d0804)',
                  border: isSelected
                    ? '2px solid #f0c040'
                    : '2px solid #2a1a08',
                  boxShadow: isSelected
                    ? '0 0 0 1px #000, 0 0 16px rgba(212,160,23,0.6), inset 0 1px 0 rgba(255,255,255,0.2)'
                    : '0 0 0 1px #000, inset 0 0 8px rgba(0,0,0,0.6)',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s ease',
                  // Counter-rotate labels so they stay upright
                  // (children need their own counter-rotate)
                }}
              >
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '8px',
                  letterSpacing: '0.1em',
                  color: isSelected ? '#1a1008' : '#6b4f18',
                  transform: `rotate(${-spinDeg}deg)`,
                  transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  pointerEvents: 'none',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  display: 'block',
                  width: '38px',
                }}>
                  {genre.toUpperCase()}
                </span>
              </button>
            );
          })}

          {/* Center hub */}
          <div style={{
            position: 'absolute',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #3a2a10, #1a1008)',
            border: '2px solid #8b6914',
            boxShadow: '0 0 0 1px #000, inset 0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(212,160,23,0.15)',
            zIndex: 10,
          }}>
            {/* Center pip */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#8b6914',
              boxShadow: '0 0 6px rgba(212,160,23,0.4)',
            }} />
          </div>
        </div>

        {/* Selector notch at top */}
        <div style={{
          position: 'absolute',
          top: '-2px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '10px solid #d4a017',
          filter: 'drop-shadow(0 0 4px rgba(212,160,23,0.6))',
          zIndex: 20,
        }} />
      </div>

      {/* Selected indicator */}
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '11px',
        letterSpacing: '0.35em',
        color: '#d4a017',
        textShadow: '0 0 10px rgba(212,160,23,0.4)',
        textTransform: 'uppercase',
      }}>
        ✦ {selectedGenre} ✦
      </div>
    </div>
  );
}