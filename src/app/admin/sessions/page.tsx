'use client';

import React from 'react';
import { PlayCircle, Eye, Trash2 } from 'lucide-react';
import { MOCK_DEMO_SESSIONS } from '@/lib/mock-data';

export default function AdminSessionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <PlayCircle className="w-6 h-6 text-indigo-400" /> Monitoring Sesi Interview Real-Time
        </h1>
        <p className="text-xs text-slate-400">Pantau seluruh sesi wawancara yang diselesaikan pengguna.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-4">Session ID</th>
              <th className="p-4">Posisi</th>
              <th className="p-4">Mode</th>
              <th className="p-4">Skor Akhir</th>
              <th className="p-4">Durasi</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_DEMO_SESSIONS.map((s) => (
              <tr key={s.id} className="hover:bg-slate-950/40">
                <td className="p-4 font-mono text-slate-400">{s.id}</td>
                <td className="p-4 font-bold text-white">{s.positionName}</td>
                <td className="p-4 font-mono uppercase">{s.answerMode}</td>
                <td className="p-4 font-mono font-bold text-emerald-400">{s.overallScore} Pts</td>
                <td className="p-4 text-slate-400">{Math.floor(s.durationSeconds / 60)} Menit</td>
                <td className="p-4 text-right space-x-2">
                  <a href={`/simulation/result/${s.id}`} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg inline-flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> Detail
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
