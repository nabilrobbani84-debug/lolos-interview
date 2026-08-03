'use client';

import React from 'react';
import { Send, RotateCcw, Play, FileText, CheckCircle2 } from 'lucide-react';

interface AnswerControlBarProps {
  isCandidateMicAllowed: boolean;
  isRecording: boolean;
  onFinishAnswer: () => void;
  onReRecord: () => void;
  onToggleTextMode: () => void;
  isTextMode: boolean;
}

export default function AnswerControlBar({
  isCandidateMicAllowed,
  isRecording,
  onFinishAnswer,
  onReRecord,
  onToggleTextMode,
  isTextMode
}: AnswerControlBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReRecord}
          disabled={!isCandidateMicAllowed}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Rekam Ulang
        </button>

        <button
          type="button"
          onClick={onToggleTextMode}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          {isTextMode ? 'Mode Suara' : 'Ketik Jawaban'}
        </button>
      </div>

      <button
        type="button"
        onClick={onFinishAnswer}
        disabled={!isCandidateMicAllowed}
        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
        <span>Saya Selesai & Kirim Jawaban</span>
      </button>
    </div>
  );
}
