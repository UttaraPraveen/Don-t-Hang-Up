"use client";
import React, { useState } from "react";

interface PhoneHandleProps {
  isOffHook: boolean;
  onPickUp: () => void;
  onHangUp: () => void;
}

export default function PhoneHandle({ isOffHook, onPickUp, onHangUp }: PhoneHandleProps) {
  const [pressed, setPressed] = useState(false);

  const handlePress = (fn: () => void) => {
    setPressed(true);
    fn();
    setTimeout(() => setPressed(false), 200);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&display=swap');

        .btn-3d-wrapper {
          perspective: 600px;
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .btn-3d {
          position: relative;
          width: 100%;
          max-width: 280px;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
          transform-style: preserve-3d;
          transition: transform 0.1s ease;
        }

        .btn-3d:active,
        .btn-3d.pressed {
          transform: translateY(6px) rotateX(8deg);
        }

        .btn-face {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 1.25rem 2rem;
          border-radius: 1rem;
          position: relative;
          overflow: hidden;
          transition: all 0.15s ease;
        }

        /* PICKUP */
        .btn-pickup .btn-face {
          background: linear-gradient(180deg, #0a2a1a 0%, #051510 100%);
          border: 1px solid rgba(0, 255, 100, 0.3);
          box-shadow:
            0 8px 0 rgba(0, 80, 30, 1),
            0 10px 20px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(0, 255, 100, 0.1),
            0 0 30px rgba(0, 200, 80, 0.08);
        }

        .btn-pickup:active .btn-face,
        .btn-pickup.pressed .btn-face {
          box-shadow:
            0 2px 0 rgba(0, 80, 30, 1),
            0 4px 10px rgba(0, 0, 0, 0.8),
            inset 0 2px 4px rgba(0,0,0,0.5),
            0 0 30px rgba(0, 200, 80, 0.15);
        }

        .btn-pickup .btn-face::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,255,100,0.05) 0%, transparent 60%);
        }

        .btn-pickup .btn-label {
          font-family: 'Orbitron', monospace;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.25em;
          color: #00ff88;
          text-shadow: 0 0 15px rgba(0, 255, 136, 0.6), 0 0 30px rgba(0, 255, 136, 0.2);
        }

        .btn-pickup .btn-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(0, 255, 136, 0.4);
        }

        .btn-pickup .btn-icon {
          font-size: 1.5rem;
          margin-bottom: 4px;
          animation: iconFloat 3s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        /* HANGUP */
        .btn-hangup .btn-face {
          background: linear-gradient(180deg, #2a0510 0%, #150208 100%);
          border: 1px solid rgba(255, 50, 80, 0.4);
          box-shadow:
            0 8px 0 rgba(100, 0, 20, 1),
            0 10px 20px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(255, 50, 80, 0.1),
            0 0 30px rgba(255, 50, 80, 0.1);
          animation: hangupPulse 2s ease-in-out infinite;
        }

        @keyframes hangupPulse {
          0%, 100% { box-shadow: 0 8px 0 rgba(100, 0, 20, 1), 0 10px 20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,50,80,0.1), 0 0 30px rgba(255,50,80,0.1); }
          50% { box-shadow: 0 8px 0 rgba(100, 0, 20, 1), 0 10px 20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,50,80,0.1), 0 0 50px rgba(255,50,80,0.25); }
        }

        .btn-hangup:active .btn-face,
        .btn-hangup.pressed .btn-face {
          box-shadow:
            0 2px 0 rgba(100, 0, 20, 1),
            0 4px 10px rgba(0, 0, 0, 0.8),
            inset 0 2px 4px rgba(0,0,0,0.5);
          animation: none;
        }

        .btn-hangup .btn-face::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,50,80,0.06) 0%, transparent 60%);
        }

        .btn-hangup .btn-label {
          font-family: 'Orbitron', monospace;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.25em;
          color: #ff4466;
          text-shadow: 0 0 15px rgba(255, 50, 100, 0.6), 0 0 30px rgba(255, 50, 100, 0.2);
        }

        .btn-hangup .btn-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(255, 50, 100, 0.4);
        }

        .btn-hangup .btn-icon {
          font-size: 1.5rem;
          margin-bottom: 4px;
          animation: hangIconShake 2s ease-in-out infinite;
        }

        @keyframes hangIconShake {
          0%, 90%, 100% { transform: rotate(0); }
          92% { transform: rotate(-5deg); }
          94% { transform: rotate(5deg); }
          96% { transform: rotate(-3deg); }
          98% { transform: rotate(3deg); }
        }

        /* Scan line on button */
        .btn-scan {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: btnScan 2s linear infinite;
          pointer-events: none;
        }

        @keyframes btnScan {
          0% { top: 0; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      <div className="btn-3d-wrapper">
        {!isOffHook ? (
          <button
            className={`btn-3d btn-pickup ${pressed ? "pressed" : ""}`}
            onClick={() => handlePress(onPickUp)}
          >
            <div className="btn-face">
              <div className="btn-scan" />
              <div className="btn-icon">📡</div>
              <div className="btn-label">RECEIVER</div>
              <div className="btn-sub">▲ LIFT TO CONNECT ▲</div>
            </div>
          </button>
        ) : (
          <button
            className={`btn-3d btn-hangup ${pressed ? "pressed" : ""}`}
            onClick={() => handlePress(onHangUp)}
          >
            <div className="btn-face">
              <div className="btn-scan" />
              <div className="btn-icon">☎</div>
              <div className="btn-label">TERMINATE</div>
              <div className="btn-sub">▼ DISCONNECT LINE ▼</div>
            </div>
          </button>
        )}
      </div>
    </>
  );
}