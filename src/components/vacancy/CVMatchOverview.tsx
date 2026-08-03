'use client';

import React from 'react';
import { Award, CheckCircle2, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';
import { VacancyCvMatch } from '@/lib/types';

interface CVMatchOverviewProps {
  match: VacancyCvMatch;
}

export default function CVMatchOverview({ match }: CVMatchOverviewProps) {
  const score = match.overallMatchScore;

  const getScoreColor = (s: number) => {
    if (s >= 85) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (s >= 70) return 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10';
    return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Match score display */}
        <div className="flex items-center gap-4">
          <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center flex-shrink-0 font-mono font-black text-2xl ${
            score >= 85 ? 'border-emerald-500 text-emerald-400' : 'border-indigo-500 text-indigo-400'
          }`}>
            {score}%
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700 uppercase">
              ATS Match Score
            </span>
            <h3 className="text-lg font-bold text-white leading-tight">Analisis Kecocokan Karir</h3>
            <p className="text-xs text-slate-400">Skor kecocokan ini dianalisis berdasarkan deskripsi lowongan dan CV Anda.</p>
          </div>
        </div>

        {/* Categories Match scores */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
            <span className="text-[10px] text-slate-500 block">Keahlian</span>
            <strong className="text-white font-mono">{match.technicalMatchScore}%</strong>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
            <span className="text-[10px] text-slate-500 block">Pengalaman</span>
            <strong className="text-white font-mono">{match.experienceMatchScore}%</strong>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
            <span className="text-[10px] text-slate-500 block">Pendidikan</span>
            <strong className="text-white font-mono">{match.educationMatchScore}%</strong>
          </div>
        </div>

      </div>

      {/* Recommendations */}
      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-850 space-y-2.5">
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Kesenjangan Kemampuan & Rekomendasi Belajar:
        </span>
        <ul className="space-y-1.5 text-xs text-slate-300">
          {match.recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
