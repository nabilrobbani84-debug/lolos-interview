'use client';

import React from 'react';
import Link from 'next/link';
import { BarChart2, ArrowLeft, TrendingUp, Award, Target } from 'lucide-react';

export default function ProgressPage() {
  const chartData = [
    { session: 'Sesi 1', score: 72 },
    { session: 'Sesi 2', score: 78 },
    { session: 'Sesi 3', score: 80 },
    { session: 'Sesi 4', score: 85 },
    { session: 'Sesi 5', score: 88 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <BarChart2 className="w-8 h-8 text-indigo-400" /> Analisis Perkembangan Kemampuan
        </h1>
        <p className="text-slate-400 text-sm">Visualisasi grafik perkembangan skor dan distribusi aspek keahlian Anda.</p>
      </div>

      {/* Progress Evolution Bar Visualizer */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> Tren Peningkatan Skor Interview
        </h3>

        <div className="h-64 bg-slate-950 rounded-2xl border border-slate-800 p-6 flex items-end justify-between gap-4">
          {chartData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <span className="font-mono text-xs font-bold text-emerald-400">{d.score} Pts</span>
              <div
                className="w-full max-w-[48px] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-xl transition-all duration-500 hover:opacity-90"
                style={{ height: `${(d.score / 100) * 100}%` }}
              ></div>
              <span className="text-[11px] text-slate-400 font-medium">{d.session}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
