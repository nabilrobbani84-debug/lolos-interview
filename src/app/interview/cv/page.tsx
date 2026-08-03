'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AIInterviewCVPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300">
      
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      <h1 className="text-3xl font-extrabold text-white">Analisis CV & Riwayat Unggah</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600/20 text-indigo-400 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">CV_Ahmad_Fauzi_Frontend_Dev.pdf</h4>
              <p className="text-[10px] text-emerald-400">Aktif • 1.2 MB</p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
            Parsed
          </span>
        </div>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
          <strong className="text-slate-300 block">Keahlian yang Diekstrak untuk Pertanyaan AI:</strong>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST API', 'Git', 'HTML5', 'CSS3'].map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-355 font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
