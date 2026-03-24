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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '9px',
        letterSpacing: '0.45em',
        color: '#8b6914',
        textTransform: 'uppercase',
      }}>
        Transmission Mode
      </div>

      {/* Switch housing */}
      <div style={{
        display: 'flex',
        background: 'linear-gradient(160deg, #1a1008, #0d0804)',
        border: '2px solid #2a1a08',
        borderBottom: '4px solid #000',
        borderRight: '3px solid #000',
        borderRadius: '2px',
        padding: '4px',
        boxShadow: '4px 4px 0 #000, inset 0 2px 8px rgba(0,0,0,0.8)',
        gap: '4px',
        position: 'relative',
      }}>
        {/* Inner recessed track */}
        <div style={{
          position: 'absolute',
          inset: '4px',
          background: 'linear-gradient(180deg, #000 0%, #0d0804 100%)',
          borderRadius: '1px',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.9)',
          pointerEvents: 'none',
        }} />

        {/* WORD button */}
        <button
          onClick={() => handleToggle("word")}
          disabled={disabled}
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '10px 20px',
            borderRadius: '1px',
            border: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            background: topicLength === "word"
              ? 'linear-gradient(160deg, #cc1010, #7a0000)'
              : 'transparent',
            boxShadow: topicLength === "word"
              ? '0 0 0 1px #800000, inset 0 1px 0 rgba(255,80,80,0.2), 0 0 16px rgba(204,16,16,0.4), 2px 2px 0 #000'
              : 'none',
            transition: 'all 0.2s ease',
            transform: topicLength === "word" ? 'translateY(0px)' : 'translateY(-2px)',
          }}
        >
          {/* Gloss */}
          {topicLength === "word" && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '40%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              pointerEvents: 'none',
              borderRadius: '1px',
            }} />
          )}
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '12px',
            letterSpacing: '0.25em',
            color: topicLength === "word" ? '#ffaaaa' : '#3a2a10',
            textShadow: topicLength === "word" ? '0 0 10px rgba(255,100,100,0.6)' : 'none',
            position: 'relative',
            zIndex: 1,
          }}>
            SINGLE WORD
          </span>
        </button>

        {/* Divider pip */}
        <div style={{ width: '1px', background: '#1a1008', alignSelf: 'stretch', position: 'relative', zIndex: 1 }} />

        {/* PHRASE button */}
        <button
          onClick={() => handleToggle("phrase")}
          disabled={disabled}
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '10px 20px',
            borderRadius: '1px',
            border: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            background: topicLength === "phrase"
              ? 'linear-gradient(160deg, #c8880a, #7a5000)'
              : 'transparent',
            boxShadow: topicLength === "phrase"
              ? '0 0 0 1px #a06010, inset 0 1px 0 rgba(255,200,80,0.2), 0 0 16px rgba(212,160,23,0.4), 2px 2px 0 #000'
              : 'none',
            transition: 'all 0.2s ease',
            transform: topicLength === "phrase" ? 'translateY(0px)' : 'translateY(-2px)',
          }}
        >
          {/* Gloss */}
          {topicLength === "phrase" && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '40%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
              pointerEvents: 'none',
              borderRadius: '1px',
            }} />
          )}
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '12px',
            letterSpacing: '0.25em',
            color: topicLength === "phrase" ? '#f0c040' : '#3a2a10',
            textShadow: topicLength === "phrase" ? '0 0 10px rgba(240,192,64,0.6)' : 'none',
            position: 'relative',
            zIndex: 1,
          }}>
            FULL PHRASE
          </span>
        </button>
      </div>

      {/* Status LED row */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: topicLength === "word" ? '#cc1010' : '#1a0808',
          boxShadow: topicLength === "word" ? '0 0 8px rgba(204,16,16,0.8)' : 'inset 0 1px 2px rgba(0,0,0,0.8)',
          transition: 'all 0.3s ease',
          border: '1px solid #000',
        }} />
        <div style={{
          fontFamily: "'Special Elite', cursive",
          fontSize: '8px',
          color: '#3a2a10',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>
          {topicLength === "word" ? "single" : "phrase"}
        </div>
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: topicLength === "phrase" ? '#d4a017' : '#1a1000',
          boxShadow: topicLength === "phrase" ? '0 0 8px rgba(212,160,23,0.8)' : 'inset 0 1px 2px rgba(0,0,0,0.8)',
          transition: 'all 0.3s ease',
          border: '1px solid #000',
        }} />
      </div>
    </div>
  );
}