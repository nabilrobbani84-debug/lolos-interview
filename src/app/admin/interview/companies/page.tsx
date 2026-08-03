'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ArrowLeft, Plus } from 'lucide-react';
import { MOCK_COMPANIES } from '@/lib/mock-data';

export default function AdminInterviewCompaniesPage() {
  return (
    <div className="space-y-6 text-slate-350">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-400" /> Admin: Perusahaan Simulasi
          </h1>
          <p className="text-xs text-slate-400">Pengelolaan profil perusahaan simulasi.</p>
        </div>
        <button
          onClick={() => alert('Simulasi Tambah Perusahaan')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Tambah Perusahaan
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOCK_COMPANIES.map((c) => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <h3 className="font-bold text-white text-base">{c.name}</h3>
            <span className="text-xs text-indigo-400 block">{c.industry}</span>
            <p className="text-xs text-slate-400 line-clamp-2">{c.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
