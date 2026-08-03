'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowLeft, Plus } from 'lucide-react';
import { MOCK_QUESTIONS } from '@/lib/mock-data';

export default function AdminInterviewQuestionsPage() {
  return (
    <div className="space-y-6 text-slate-350">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-400" /> Admin: Soal AI Interview
          </h1>
          <p className="text-xs text-slate-400">Pengelolaan bank pertanyaan AI Interview Room.</p>
        </div>
        <button
          onClick={() => alert('Simulasi Tambah Pertanyaan')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Tambah Soal
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400">
            <tr>
              <th className="p-4">Pertanyaan</th>
              <th className="p-4">Posisi</th>
              <th className="p-4">Tipe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_QUESTIONS.map((q) => (
              <tr key={q.id} className="hover:bg-slate-950/40">
                <td className="p-4 font-bold text-white max-w-sm">{q.question}</td>
                <td className="p-4 text-indigo-400">{q.positionName || 'Umum'}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-slate-850 text-slate-300 font-mono text-[10px]">
                    {q.interviewType.toUpperCase()}
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
