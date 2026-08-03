'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Play, Clock, HelpCircle, CheckCircle2, ShieldAlert, Award, Star } from 'lucide-react';
import { MOCK_POSITIONS } from '@/lib/mock-data';

export default function PositionDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const position = MOCK_POSITIONS.find(p => p.slug === slug) || MOCK_POSITIONS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Back Link */}
      <Link href="/fields" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Posisi
      </Link>

      {/* Main Position Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              {position.fieldName}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Simulasi Interview {position.name}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">{position.description}</p>
          </div>

          <Link
            href={`/simulation/setup?position=${position.slug}`}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-base shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Play className="w-5 h-5 fill-current" />
            Mulai Simulasi Posisi Ini
          </Link>
        </div>

        {/* Quick Meta Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">Estimasi Durasi</span>
            <p className="text-sm font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-400" /> {position.estimatedDuration}
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">Jumlah Soal Bank</span>
            <p className="text-sm font-bold text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-emerald-400" /> {position.questionCount}+ Soal
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">Tingkat Kesulitan</span>
            <p className="text-sm font-bold text-white flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400" /> Mudah - Sangat Sulit
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">Evaluasi Fitur</span>
            <p className="text-sm font-bold text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-400" /> STAR + 6 Aspect
            </p>
          </div>
        </div>
      </div>

      {/* Competencies Evaluated */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          Kemampuan & Kompetensi yang Dinilai Recruiter
        </h2>
        <p className="text-xs text-slate-400">
          Untuk posisi <strong className="text-slate-200">{position.name}</strong>, pertanyaan interview dirancang untuk mengevaluasi aspek berikut:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {position.competencies.map((comp, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              {comp}
            </div>
          ))}
        </div>
      </div>

      {/* Sample Questions Preview */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-white">Contoh Pertanyaan yang Sering Muncul</h2>
        <div className="space-y-3">
          {position.sampleQuestions.map((q, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-indigo-400">Pertanyaan #{idx + 1}:</span>
              <p className="text-sm font-medium text-white">"{q}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center pt-4">
        <Link
          href={`/simulation/setup?position=${position.slug}`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-base shadow-xl shadow-indigo-600/30 transition"
        >
          <Play className="w-5 h-5 fill-current" />
          Mulai Latihan Simulasi {position.name} Now
        </Link>
      </div>

    </div>
  );
}
