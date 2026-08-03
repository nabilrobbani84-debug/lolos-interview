'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Briefcase, ArrowLeft, Play, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { MOCK_FIELDS, MOCK_POSITIONS } from '@/lib/mock-data';

export default function FieldDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const field = MOCK_FIELDS.find(f => f.slug === slug) || MOCK_FIELDS[0];
  const positions = MOCK_POSITIONS.filter(p => p.fieldId === field.id || p.fieldName === field.name);
  const displayPositions = positions.length ? positions : MOCK_POSITIONS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back Button */}
      <Link href="/fields" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Seluruh Bidang
      </Link>

      {/* Field Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Kategori Bidang Pekerjaan
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{field.name}</h1>
            <p className="text-slate-300 text-sm max-w-2xl">{field.description}</p>
          </div>

          <Link
            href={`/simulation/setup?field=${field.slug}`}
            className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-indigo-600/30 whitespace-nowrap"
          >
            <Play className="w-4 h-4 fill-current" />
            Mulai Simulasi Bidang Ini
          </Link>
        </div>
      </div>

      {/* Positions List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          Daftar Posisi Pekerjaan ({displayPositions.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayPositions.map((pos) => (
            <div
              key={pos.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-indigo-500/40 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{pos.name}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                    {pos.questionCount} Pertanyaan
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{pos.description}</p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-slate-300 block">Kemampuan yang Dinilai:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {pos.competencies.map((comp, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <Link
                  href={`/positions/${pos.slug}`}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  Detail Posisi <ChevronRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/simulation/setup?field=${field.slug}&position=${pos.slug}`}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Mulai Latihan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
