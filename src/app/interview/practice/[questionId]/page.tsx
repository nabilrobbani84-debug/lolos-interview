'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';
import AudioRecorder from '@/components/simulation/AudioRecorder';

export default function RePracticePage() {
  const [answer, setAnswer] = useState('');
  const [practiced, setPracticed] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300">
      
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>

      <div className="space-y-2">
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
          Mode Latihan Ulang Soal Lemah
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">"Ceritakan saat Anda menghadapi konflik dalam tim."</h1>
        <p className="text-xs text-slate-400">Jawab kembali pertanyaan ini untuk memperkuat area kelemahan Anda.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white">Masukan Jawaban Baru Anda:</h3>
        <AudioRecorder onTranscriptChange={(txt) => setAnswer(txt)} />

        <div className="flex justify-end pt-2">
          <button
            onClick={() => setPracticed(true)}
            disabled={!answer.trim()}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition disabled:opacity-50"
          >
            Evaluasi Jawaban Baru
          </button>
        </div>
      </div>

      {practiced && (
        <div className="p-6 bg-emerald-950/20 border border-emerald-500/30 rounded-3xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
            <CheckCircle2 className="w-5 h-5" /> Evaluasi Terbaru: 92 / 100 (Peningkatan Signifikan!)
          </div>
          <p className="text-xs text-slate-300">
            Hebat! Jawaban baru Anda kini menyertakan elemen <strong>Action</strong> (Tindakan personal yang Anda ambil) dan <strong>Result</strong> (Hasil pemecahan konflik) secara lengkap dan terukur.
          </p>
        </div>
      )}

    </div>
  );
}
