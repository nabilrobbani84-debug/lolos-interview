'use client';

import React from 'react';
import Link from 'next/link';
import { History, ArrowLeft, RotateCcw, ExternalLink } from 'lucide-react';
import { MOCK_DEMO_SESSIONS } from '@/lib/mock-data';

export default function HistoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <History className="w-8 h-8 text-indigo-400" /> Riwayat Sesi Latihan
        </h1>
        <Link href="/simulation/setup" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition">
          + Mulai Sesi Baru
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        {MOCK_DEMO_SESSIONS.map((sess) => (
          <div key={sess.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{sess.positionName}</h3>
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                  {sess.interviewType.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tanggal: {new Date(sess.completedAt).toLocaleDateString('id-ID')} • {sess.answers.length} Pertanyaan • Bahasa: {sess.language}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Skor Akhir</span>
                <span className="font-bold font-mono text-emerald-400 text-xl">{sess.overallScore}</span>
              </div>
              <Link
                href={`/simulation/result/${sess.id}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                Lihat Detail <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
