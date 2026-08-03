'use client';

import React from 'react';

interface SpeakingWaveformProps {
  active: boolean;
  color?: 'indigo' | 'emerald';
}

export default function SpeakingWaveform({ active, color = 'indigo' }: SpeakingWaveformProps) {
  if (!active) return null;

  const barColorClass = color === 'emerald' ? 'bg-emerald-400' : 'bg-indigo-400';

  return (
    <div className="flex items-center gap-1 h-4 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/80">
      {Array.from({ length: 5 }).map((_, idx) => (
        <span
          key={idx}
          className={`w-1 rounded-full animate-pulse ${barColorClass}`}
          style={{
            height: `${Math.floor(Math.random() * 10) + 6}px`,
            animationDelay: `${idx * 150}ms`,
            animationDuration: '600ms'
          }}
        />
      ))}
    </div>
  );
}
