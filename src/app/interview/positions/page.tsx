'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Briefcase, ArrowRight, ArrowLeft, Search, Sparkles } from 'lucide-react';
import { MOCK_POSITIONS } from '@/lib/mock-data';

export default function InterviewPositionsPage() {
  const [search, setSearch] = useState('');

  const filteredPositions = MOCK_POSITIONS.filter(pos =>
    pos.name.toLowerCase().includes(search.toLowerCase()) ||
    pos.fieldName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
      </Link>

      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          AI Interview Room
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Pilih Posisi Target Simulasi</h1>
        <p className="text-slate-400 text-sm">Pilih pekerjaan impian Anda untuk memulai simulasi interview dua pewawancara (HRD & Lead IT).</p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari posisi pekerjaan..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
        />
      </div>

      {/* Positions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPositions.map((pos) => (
          <div key={pos.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-indigo-500/50 transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700 uppercase">
                {pos.fieldName}
              </span>
              <h3 className="text-lg font-bold text-white">{pos.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-3">{pos.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                href={`/interview/companies?position=${pos.slug}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
              >
                Pilih Posisi & Lanjutkan <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
