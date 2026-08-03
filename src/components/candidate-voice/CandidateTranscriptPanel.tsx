'use client';

import React from 'react';
import { FileText, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

interface CandidateTranscriptPanelProps {
  partialTranscript: string;
  finalTranscript: string;
  isListening: boolean;
  isSilenceTimerActive: boolean;
  totalFillerWords: number;
  wordCount: number;
}

export default function CandidateTranscriptPanel({
  partialTranscript,
  finalTranscript,
  isListening,
  isSilenceTimerActive,
  totalFillerWords,
  wordCount
}: CandidateTranscriptPanelProps) {
  return (
    <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-850 pb-2">
        <span className="font-bold text-white flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> Transkrip Suara Real-time Candidate
        </span>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-slate-400 font-mono">{wordCount} Kata</span>
          {totalFillerWords > 0 && (
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              {totalFillerWords} Filler Word
            </span>
          )}
        </div>
      </div>

      <div className="min-h-24 max-h-40 overflow-y-auto space-y-1.5 p-3 bg-slate-900/60 rounded-xl border border-slate-800 leading-relaxed font-sans">
        {finalTranscript && (
          <span className="text-slate-200">{finalTranscript} </span>
        )}
        {partialTranscript && (
          <span className="text-indigo-300 italic opacity-80 animate-pulse">{partialTranscript}</span>
        )}
        {!finalTranscript && !partialTranscript && (
          <span className="text-slate-500 italic block">
            {isListening
              ? 'Mendengarkan jawaban Anda... (Silakan bicara)'
              : 'Tunggu hingga pewawancara selesai mengajukan pertanyaan...'}
          </span>
        )}
      </div>

      {isSilenceTimerActive && (
        <div className="p-2.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl flex items-center justify-between text-[11px] text-indigo-300 animate-in fade-in duration-150">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Masih mendengarkan... (Jeda berpikir)
          </span>
          <span className="text-[10px] text-slate-400">Tekan "Saya Selesai" jika sudah cukup</span>
        </div>
      )}
    </div>
  );
}
