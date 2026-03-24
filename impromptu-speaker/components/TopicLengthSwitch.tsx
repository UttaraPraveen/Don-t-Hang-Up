"use client";
import React from "react";

interface Props {
  topicLength: "word" | "phrase";
  onChange: (val: "word" | "phrase") => void;
  disabled: boolean;
}

export default function TopicLengthSwitch({ topicLength, onChange, disabled }: Props) {
  const handleToggle = (val: "word" | "phrase") => {
    if (disabled || topicLength === val) return;
    onChange(val);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Share+Tech+Mono&display=swap');

        .switch-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .switch-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.35em;
          color: rgba(0, 200, 255, 0.4);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .switch-scene {
          perspective: 400px;
        }

        .switch-body {
          position: relative;
          display: flex;
          gap: 3px;
          padding: 4px;
          background: radial-gradient(circle at 50% 0%, #0a0a1a, #03030a);
          border: 1px solid rgba(0, 200, 255, 0.15);
          border-radius: 10px;
          box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.7),
            inset 0 2px 10px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255,255,255,0.02),
            0 0 0 1px rgba(0, 200, 255, 0.05);
          transform-style: preserve-3d;
        }

        /* 3D bottom edge */
        .switch-body::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 6px;
          right: 6px;
          height: 6px;
          background: linear-gradient(180deg, #020208, #000002);
          border-radius: 0 0 8px 8px;
          transform: rotateX(-90deg) translateZ(0);
          transform-origin: top;
        }

        .switch-btn {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          padding: 10px 16px;
          border-radius: 6px;
          border: 1px solid transparent;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.2s ease;
          transform-style: preserve-3d;
          outline: none;
        }

        .switch-btn::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 50%;
          background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%);
          border-radius: 4px 4px 0 0;
          pointer-events: none;
        }

        .switch-btn.inactive {
          background: transparent;
          color: rgba(0, 200, 255, 0.25);
          border-color: transparent;
          box-shadow: none;
        }

        .switch-btn.inactive:hover:not(:disabled) {
          color: rgba(0, 200, 255, 0.5);
          background: rgba(0, 200, 255, 0.03);
          border-color: rgba(0, 200, 255, 0.1);
        }

        /* WORD - active */
        .switch-btn.active-word {
          background: linear-gradient(135deg, #1a0520 0%, #2d0840 60%, #1a0520 100%);
          color: #df80ff;
          border-color: rgba(180, 50, 255, 0.4);
          box-shadow:
            0 0 20px rgba(180, 50, 255, 0.3),
            0 0 40px rgba(180, 50, 255, 0.1),
            inset 0 -3px 8px rgba(0, 0, 0, 0.4),
            0 4px 0 rgba(80, 0, 120, 0.8);
          text-shadow: 0 0 15px rgba(180, 50, 255, 0.6);
          transform: translateY(2px) translateZ(4px);
          animation: wordGlow 2s ease-in-out infinite;
        }

        @keyframes wordGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(180,50,255,0.3), 0 0 40px rgba(180,50,255,0.1), inset 0 -3px 8px rgba(0,0,0,0.4), 0 4px 0 rgba(80,0,120,0.8); }
          50% { box-shadow: 0 0 30px rgba(180,50,255,0.5), 0 0 60px rgba(180,50,255,0.2), inset 0 -3px 8px rgba(0,0,0,0.4), 0 4px 0 rgba(80,0,120,0.8); }
        }

        /* PHRASE - active */
        .switch-btn.active-phrase {
          background: linear-gradient(135deg, #0a1a20 0%, #0f3040 60%, #0a1a20 100%);
          color: #00c8ff;
          border-color: rgba(0, 200, 255, 0.4);
          box-shadow:
            0 0 20px rgba(0, 200, 255, 0.3),
            0 0 40px rgba(0, 200, 255, 0.1),
            inset 0 -3px 8px rgba(0, 0, 0, 0.4),
            0 4px 0 rgba(0, 60, 100, 0.8);
          text-shadow: 0 0 15px rgba(0, 200, 255, 0.6);
          transform: translateY(2px) translateZ(4px);
          animation: phraseGlow 2s ease-in-out infinite;
        }

        @keyframes phraseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0,200,255,0.3), 0 0 40px rgba(0,200,255,0.1), inset 0 -3px 8px rgba(0,0,0,0.4), 0 4px 0 rgba(0,60,100,0.8); }
          50% { box-shadow: 0 0 30px rgba(0,200,255,0.5), 0 0 60px rgba(0,200,255,0.2), inset 0 -3px 8px rgba(0,0,0,0.4), 0 4px 0 rgba(0,60,100,0.8); }
        }

        .switch-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* LED indicator dots */
        .led-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 0.5rem;
        }

        .led {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .led.word-led {
          background: ${topicLength === 'word' ? 'rgba(180,50,255,0.8)' : 'rgba(255,255,255,0.05)'};
          box-shadow: ${topicLength === 'word' ? '0 0 8px rgba(180,50,255,0.8)' : 'none'};
        }

        .led.phrase-led {
          background: ${topicLength === 'phrase' ? 'rgba(0,200,255,0.8)' : 'rgba(255,255,255,0.05)'};
          box-shadow: ${topicLength === 'phrase' ? '0 0 8px rgba(0,200,255,0.8)' : 'none'};
        }

        .led-sep {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          color: rgba(0, 200, 255, 0.2);
        }
      `}</style>

      <div className="switch-section">
        <div className="switch-label">◈ TRANSMISSION MODE ◈</div>
        <div className="switch-scene">
          <div className="switch-body">
            <button
              onClick={() => handleToggle("word")}
              disabled={disabled}
              className={`switch-btn ${topicLength === "word" ? "active-word" : "inactive"}`}
            >
              ▸ SINGLE WORD
            </button>
            <button
              onClick={() => handleToggle("phrase")}
              disabled={disabled}
              className={`switch-btn ${topicLength === "phrase" ? "active-phrase" : "inactive"}`}
            >
              ▸ FULL PHRASE
            </button>
          </div>
        </div>
        <div className="led-row">
          <div className="led word-led" style={{ background: topicLength === 'word' ? 'rgba(180,50,255,0.8)' : 'rgba(255,255,255,0.05)', boxShadow: topicLength === 'word' ? '0 0 8px rgba(180,50,255,0.8)' : 'none' }} />
          <span className="led-sep">◈</span>
          <div className="led phrase-led" style={{ background: topicLength === 'phrase' ? 'rgba(0,200,255,0.8)' : 'rgba(255,255,255,0.05)', boxShadow: topicLength === 'phrase' ? '0 0 8px rgba(0,200,255,0.8)' : 'none' }} />
        </div>
      </div>
    </>
  );
}