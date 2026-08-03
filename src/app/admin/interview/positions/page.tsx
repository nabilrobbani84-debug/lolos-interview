'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, ArrowLeft, Plus } from 'lucide-react';
import { MOCK_POSITIONS } from '@/lib/mock-data';

export default function AdminInterviewPositionsPage() {
  return (
    <div className="space-y-6 text-slate-350">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-400" /> Admin: Posisi AI Interview
          </h1>
          <p className="text-xs text-slate-400">Pengelolaan opsi posisi pekerjaan untuk AI Interview Room.</p>
        </div>
        <button
          onClick={() => alert('Simulasi Tambah Posisi AI Room')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Tambah Posisi
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400">
            <tr>
              <th className="p-4">Nama Posisi</th>
              <th className="p-4">Bidang Utama</th>
              <th className="p-4">Durasi Estimasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_POSITIONS.map((p) => (
              <tr key={p.id} className="hover:bg-slate-950/40">
                <td className="p-4 font-bold text-white">{p.name}</td>
                <td className="p-4 text-indigo-400">{p.fieldName}</td>
                <td className="p-4 text-slate-400">{p.estimatedDuration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
