"use client";
import React from "react";

interface PhoneHandleProps {
  isOffHook: boolean;
  onPickUp: () => void;
  onHangUp: () => void;
}

export default function PhoneHandle({ isOffHook, onPickUp, onHangUp }: PhoneHandleProps) {
  return (
    <div className="flex justify-center w-full mt-4">
      {!isOffHook ? (
        <button
          onClick={onPickUp}
          className="group relative w-full max-w-[250px] bg-zinc-800 border-y-[8px] border-zinc-700 text-zinc-300 py-6 rounded-3xl hover:bg-zinc-700 hover:border-zinc-600 transition-all active:translate-y-2 active:border-b-0 shadow-[0_10px_0_0_rgba(24,24,27,1)]"
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-xl font-bold tracking-widest">RECEIVER</span>
            <span className="text-[10px] text-zinc-500 font-mono">LIFT TO CONNECT</span>
          </div>
        </button>
      ) : (
        <button
          onClick={onHangUp}
          className="w-full max-w-[250px] bg-red-900 border-y-[8px] border-red-800 text-red-100 py-6 rounded-3xl hover:bg-red-800 transition-all active:translate-y-2 active:border-b-0 shadow-[0_10px_0_0_rgba(69,10,10,1)] animate-pulse"
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-xl font-bold tracking-widest">HANG UP</span>
            <span className="text-[10px] text-red-400 font-mono">DISCONNECT LINE</span>
          </div>
        </button>
      )}
    </div>
  );
}