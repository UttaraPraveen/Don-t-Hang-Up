"use client";
import React from "react";

interface PhoneHandleProps {
  isOffHook: boolean;
  onPickUp: () => void;
  onHangUp: () => void;
}

export default function PhoneHandle({ isOffHook, onPickUp, onHangUp }: PhoneHandleProps) {
  return (
    <div className="flex justify-center w-full">
      {!isOffHook ? (
        <button
          onClick={onPickUp}
          className="receiver-btn-outer w-full max-w-xs"
          style={{
            background: 'linear-gradient(160deg, #2a1f0e 0%, #1a1008 60%, #0d0804 100%)',
            border: '2px solid #8b6914',
            borderBottom: '5px solid #000',
            borderRight: '4px solid #000',
            borderRadius: '2px',
            padding: '20px 32px',
            cursor: 'pointer',
            boxShadow: '5px 5px 0 #000, 0 0 0 1px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,160,23,0.2)',
            transition: 'all 0.12s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseDown={(e) => {
            const t = e.currentTarget;
            t.style.transform = 'translate(3px, 3px)';
            t.style.boxShadow = '2px 2px 0 #000, inset 0 2px 4px rgba(0,0,0,0.6)';
            t.style.borderBottom = '2px solid #000';
            t.style.borderRight = '2px solid #000';
          }}
          onMouseUp={(e) => {
            const t = e.currentTarget;
            t.style.transform = '';
            t.style.boxShadow = '5px 5px 0 #000, 0 0 0 1px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,160,23,0.2)';
            t.style.borderBottom = '5px solid #000';
            t.style.borderRight = '4px solid #000';
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget;
            t.style.transform = '';
            t.style.boxShadow = '5px 5px 0 #000, 0 0 0 1px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,160,23,0.2)';
            t.style.borderBottom = '5px solid #000';
            t.style.borderRight = '4px solid #000';
          }}
        >
          {/* Gloss overlay */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '40%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />

          {/* Receiver icon */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 1 }}>
            <svg width="28" height="16" viewBox="0 0 28 16" fill="none" style={{ opacity: 0.6 }}>
              <path d="M2 14 C2 8 6 2 14 2 C22 2 26 8 26 14" stroke="#d4a017" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <circle cx="2" cy="14" r="2.5" fill="#d4a017" />
              <circle cx="26" cy="14" r="2.5" fill="#d4a017" />
            </svg>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '18px',
              letterSpacing: '0.35em',
              color: '#d4a017',
              textShadow: '0 0 20px rgba(212,160,23,0.3)',
            }}>
              LIFT RECEIVER
            </span>
            <span style={{
              fontFamily: "'Special Elite', cursive",
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: '#6b4f18',
              textTransform: 'uppercase',
            }}>
              to connect the line
            </span>
          </div>
        </button>
      ) : (
        <button
          onClick={onHangUp}
          className="w-full max-w-xs"
          style={{
            background: 'linear-gradient(160deg, #7a0000 0%, #500000 60%, #300000 100%)',
            border: '2px solid #800000',
            borderBottom: '5px solid #000',
            borderRight: '4px solid #000',
            borderRadius: '2px',
            padding: '20px 32px',
            cursor: 'pointer',
            boxShadow: '5px 5px 0 #000, 0 0 30px rgba(204,16,16,0.25), inset 0 1px 0 rgba(255,80,80,0.2)',
            transition: 'all 0.12s ease',
            position: 'relative',
            overflow: 'hidden',
            animation: 'hangupGlow 1.2s ease-in-out infinite',
          }}
          onMouseDown={(e) => {
            const t = e.currentTarget;
            t.style.transform = 'translate(3px, 3px)';
            t.style.boxShadow = '2px 2px 0 #000';
            t.style.borderBottom = '2px solid #000';
            t.style.borderRight = '2px solid #000';
          }}
          onMouseUp={(e) => {
            const t = e.currentTarget;
            t.style.transform = '';
            t.style.boxShadow = '5px 5px 0 #000, 0 0 30px rgba(204,16,16,0.25)';
            t.style.borderBottom = '5px solid #000';
            t.style.borderRight = '4px solid #000';
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget;
            t.style.transform = '';
            t.style.boxShadow = '5px 5px 0 #000, 0 0 30px rgba(204,16,16,0.25)';
            t.style.borderBottom = '5px solid #000';
            t.style.borderRight = '4px solid #000';
          }}
        >
          <style>{`
            @keyframes hangupGlow {
              0%, 100% { box-shadow: 5px 5px 0 #000, 0 0 20px rgba(204,16,16,0.2), inset 0 1px 0 rgba(255,80,80,0.15); border-color: #800000; }
              50% { box-shadow: 5px 5px 0 #000, 0 0 50px rgba(204,16,16,0.5), inset 0 1px 0 rgba(255,80,80,0.3); border-color: #cc2020; }
            }
          `}</style>
          {/* Gloss */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '40%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 1 }}>
            {/* Hang-up icon */}
            <svg width="28" height="16" viewBox="0 0 28 16" fill="none" style={{ opacity: 0.8, transform: 'scaleY(-1)' }}>
              <path d="M2 14 C2 8 6 2 14 2 C22 2 26 8 26 14" stroke="#cc1010" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <circle cx="2" cy="14" r="2.5" fill="#cc1010" />
              <circle cx="26" cy="14" r="2.5" fill="#cc1010" />
            </svg>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '18px',
              letterSpacing: '0.35em',
              color: '#ff6060',
              textShadow: '0 0 20px rgba(204,16,16,0.6)',
            }}>
              HANG UP
            </span>
            <span style={{
              fontFamily: "'Special Elite', cursive",
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: '#7a2020',
              textTransform: 'uppercase',
            }}>
              disconnect the line
            </span>
          </div>
        </button>
      )}
    </div>
  );
}