'use client';

import React from 'react';
import { Volume2, VolumeX, Gauge, SlidersHorizontal } from 'lucide-react';

interface InterviewAudioControlsProps {
  volume: number;
  onVolumeChange: (vol: number) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
  speakingRate: number;
  onRateChange: (rate: number) => void;
}

export default function InterviewAudioControls({
  volume,
  onVolumeChange,
  isMuted,
  onMuteToggle,
  speakingRate,
  onRateChange
}: InterviewAudioControlsProps) {
  return (
    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-4 text-xs text-slate-300">
      <div className="flex items-center justify-between border-b border-slate-850 pb-2">
        <span className="font-bold text-white flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" /> Pengaturan Suara & Pemutaran
        </span>
        <button
          type="button"
          onClick={onMuteToggle}
          className={`px-3 py-1 rounded-lg border font-semibold flex items-center gap-1 transition ${
            isMuted
              ? 'bg-rose-600/20 text-rose-300 border-rose-500/40'
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
          }`}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span>{isMuted ? 'Suara Pewawancara Muted' : 'Suara Aktif'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Volume Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Volume Suara:</span>
            <span className="font-mono font-bold text-slate-200">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Speed rate selector */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Gauge className="w-3.5 h-3.5 text-indigo-400" />
            <span>Kecepatan Bicara:</span>
          </div>
          <div className="flex items-center gap-1">
            {[
              { label: '0.85x', value: 0.85 },
              { label: '1.0x', value: 1.0 },
              { label: '1.1x', value: 1.1 },
              { label: '1.2x', value: 1.2 }
            ].map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => onRateChange(r.value)}
                className={`flex-1 py-1 rounded-lg text-[10px] font-semibold border transition ${
                  speakingRate === r.value
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
