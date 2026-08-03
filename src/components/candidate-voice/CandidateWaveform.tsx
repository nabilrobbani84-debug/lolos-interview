'use client';

import React from 'react';

interface CandidateWaveformProps {
  isSpeaking: boolean;
  audioLevel: number;
}

export default function CandidateWaveform({ isSpeaking, audioLevel }: CandidateWaveformProps) {
  if (!isSpeaking) return null;

  return (
    <div className="flex items-center gap-1 h-4 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40">
      {Array.from({ length: 6 }).map((_, idx) => (
        <span
          key={idx}
          className="w-1 bg-emerald-400 rounded-full animate-pulse"
          style={{
            height: `${Math.min(14, Math.max(4, Math.floor((audioLevel / 100) * 14)))}px`,
            animationDelay: `${idx * 120}ms`,
            animationDuration: '500ms'
          }}
        />
      ))}
    </div>
  );
}
