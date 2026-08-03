'use client';

import React from 'react';
import Link from 'next/link';
import { PlayCircle, ArrowLeft } from 'lucide-react';
import { MOCK_DEMO_SESSIONS } from '@/lib/mock-data';

export default function AdminInterviewSessionsPage() {
  return (
    <div className="space-y-6 text-slate-350">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <PlayCircle className="w-6 h-6 text-indigo-400" /> Admin: Sesi AI Interview Room
        </h1>
        <p className="text-xs text-slate-400">Monitoring daftar lengkap sesi interview berbasis AI.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400">
            <tr>
              <th className="p-4">Session ID</th>
              <th className="p-4">Posisi</th>
              <th className="p-4">Skor Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_DEMO_SESSIONS.map((s) => (
              <tr key={s.id} className="hover:bg-slate-950/40">
                <td className="p-4 font-mono text-slate-400">{s.id}</td>
                <td className="p-4 font-bold text-white">{s.positionName}</td>
                <td className="p-4 font-mono font-bold text-emerald-400">{s.overallScore} Pts</td>
                <td className="p-4">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                    Selesai
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
