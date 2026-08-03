'use client';

import React, { useState } from 'react';
import { Briefcase, Plus, Edit, Trash2 } from 'lucide-react';
import { MOCK_POSITIONS } from '@/lib/mock-data';

export default function AdminPositionsPage() {
  const [positions, setPositions] = useState(MOCK_POSITIONS);

  const handleAddPosition = () => {
    const name = prompt('Masukkan Nama Posisi Baru:');
    if (name) {
      const newPos = {
        id: `pos-${Date.now()}`,
        fieldId: 'field-1',
        fieldName: 'Teknologi Informasi',
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description: 'Deskripsi posisi baru.',
        competencies: ['Kompetensi 1', 'Kompetensi 2'],
        questionCount: 10,
        estimatedDuration: '15 Menit',
        sampleQuestions: ['Contoh soal 1']
      };
      setPositions([...positions, newPos]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-400" /> Manajemen Posisi Pekerjaan
          </h1>
          <p className="text-xs text-slate-400">Kelola posisi pekerjaan spesifik dan daftar kompetensi yang dinilai.</p>
        </div>
        <button
          onClick={handleAddPosition}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Tambah Posisi Baru
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-4">Nama Posisi</th>
              <th className="p-4">Bidang Utama</th>
              <th className="p-4">Jumlah Soal</th>
              <th className="p-4">Kompetensi</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {positions.map((p) => (
              <tr key={p.id} className="hover:bg-slate-950/40">
                <td className="p-4 font-bold text-white">{p.name}</td>
                <td className="p-4 text-indigo-400">{p.fieldName}</td>
                <td className="p-4 font-mono font-bold">{p.questionCount} Soal</td>
                <td className="p-4 text-slate-400 max-w-xs truncate">{p.competencies.join(', ')}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => alert('Simulasi Edit Posisi')} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setPositions(positions.filter(i => i.id !== p.id))} className="p-1.5 bg-rose-950/50 hover:bg-rose-900 text-rose-400 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
