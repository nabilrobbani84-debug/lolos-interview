'use client';

import React, { useState } from 'react';
import { Grid, Plus, Edit, Trash2 } from 'lucide-react';
import { MOCK_FIELDS } from '@/lib/mock-data';

export default function AdminFieldsPage() {
  const [fields, setFields] = useState(MOCK_FIELDS);

  const handleAddField = () => {
    const name = prompt('Masukkan Nama Bidang Pekerjaan Baru:');
    if (name) {
      const newField = {
        id: `field-${Date.now()}`,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description: 'Deskripsi bidang baru.',
        icon: 'Briefcase',
        positionCount: 0,
        popularPositions: ['Posisi 1', 'Posisi 2']
      };
      setFields([...fields, newField]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Grid className="w-6 h-6 text-emerald-400" /> Manajemen Bidang Pekerjaan
          </h1>
          <p className="text-xs text-slate-400">Tambah, ubah, atau hapus kategori bidang pekerjaan.</p>
        </div>
        <button
          onClick={handleAddField}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Tambah Bidang Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((f) => (
          <div key={f.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">{f.name}</h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300">
                {f.positionCount} Posisi
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">{f.description}</p>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
              <button onClick={() => alert('Simulasi Edit Bidang')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center gap-1">
                <Edit className="w-3 h-3" /> Edit
              </button>
              <button
                onClick={() => setFields(fields.filter(item => item.id !== f.id))}
                className="px-3 py-1.5 bg-rose-950/50 hover:bg-rose-900 text-rose-400 text-xs rounded-lg flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
