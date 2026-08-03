'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Briefcase, ChevronRight, Play, Sparkles } from 'lucide-react';
import { MOCK_FIELDS } from '@/lib/mock-data';

export default function FieldsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  const filteredFields = MOCK_FIELDS.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.popularPositions.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedCategoryFilter === 'popular') {
      return matchesSearch && field.positionCount >= 12;
    }
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Katalog Bidang & Posisi Pekerjaan
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Pilih Bidang Pekerjaan yang Ingin Anda Latih
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Temukan 50+ posisi spesifik dari 12+ industri pekerjaan utama, atau pilih kategori Interview Umum untuk melatih kemampuan wawancara mendasar.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari bidang atau posisi pekerjaan (contoh: Frontend, HR, Marketing)..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition border whitespace-nowrap ${
                selectedCategoryFilter === 'all'
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Semua Bidang ({MOCK_FIELDS.length})
            </button>

            <button
              onClick={() => setSelectedCategoryFilter('popular')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition border whitespace-nowrap ${
                selectedCategoryFilter === 'popular'
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Paling Populer
            </button>
          </div>

        </div>
      </div>

      {/* Field Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFields.map((field) => (
          <div
            key={field.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 hover:border-indigo-500/40 transition-all group flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                  {field.positionCount} Posisi
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition">
                {field.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">{field.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Posisi Populer:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {field.popularPositions.map((pos, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                      {pos}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/fields/${field.slug}`}
                  className="flex items-center justify-center gap-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                >
                  Lihat Posisi
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/simulation/setup?field=${field.slug}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-600/30"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Mulai Simulasi
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
