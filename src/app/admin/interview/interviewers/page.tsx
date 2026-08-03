'use client';

import React from 'react';
import Link from 'next/link';
import { UserCheck, ArrowLeft, Plus } from 'lucide-react';
import { MOCK_INTERVIEWERS } from '@/lib/mock-data';

export default function AdminInterviewersPage() {
  return (
    <div className="space-y-6 text-slate-350">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-indigo-400" /> Admin: Profil Interviewer AI
          </h1>
          <p className="text-xs text-slate-400">Pengelolaan profil dan gaya kepribadian pewawancara virtual.</p>
        </div>
        <button
          onClick={() => alert('Simulasi Tambah Interviewer Persona')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Tambah Interviewer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOCK_INTERVIEWERS.map((i) => (
          <div key={i.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <h3 className="font-bold text-white text-base">{i.name}</h3>
            <span className="text-xs text-indigo-400 block">{i.role}</span>
            <div className="text-[11px] text-slate-450 space-y-1">
              <p><strong>Gaya Bicara:</strong> {i.speakingStyle}</p>
              <p><strong>Fokus Penilaian:</strong> {i.personality}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
