'use client';

import React from 'react';
import Link from 'next/link';
import { PlayCircle, ArrowLeft, ExternalLink, Calendar, Award } from 'lucide-react';

export default function AIInterviewHistoryPage() {
  const sessions = [
    {
      id: 'ai-sess-1',
      positionName: 'Frontend Developer',
      companyName: 'Nexora Digital',
      completedAt: '2026-08-02',
      overallScore: 86,
      hrScore: 88,
      techScore: 84
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300">
      
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <PlayCircle className="w-8 h-8 text-indigo-400" /> Riwayat AI Interview Room
        </h1>
        <Link
          href="/interview/positions"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
        >
          Mulai Interview Baru
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        {sessions.map((sess) => (
          <div key={sess.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{sess.positionName}</h3>
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold border border-indigo-500/30">
                  {sess.companyName}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Selesai pada: {sess.completedAt}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Skor HR</span>
                  <strong className="text-indigo-400 font-mono">{sess.hrScore}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Skor Tech</span>
                  <strong className="text-emerald-400 font-mono">{sess.techScore}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Skor Total</span>
                  <strong className="text-white font-mono text-base">{sess.overallScore}</strong>
                </div>
              </div>

              <Link
                href={`/interview/result/${sess.id}`}
                className="flex items-center gap-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-750 text-xs font-semibold rounded-xl transition"
              >
                Hasil <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
