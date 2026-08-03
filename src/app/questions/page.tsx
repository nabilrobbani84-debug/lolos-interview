'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, HelpCircle, Sparkles, Filter, ChevronRight, Eye, EyeOff, Bookmark, Play } from 'lucide-react';
import { MOCK_QUESTIONS, MOCK_FIELDS } from '@/lib/mock-data';

export default function QuestionBankPage() {
  const [search, setSearch] = useState('');
  const [selectedField, setSelectedField] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const toggleAnswer = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = MOCK_QUESTIONS.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.fieldName?.toLowerCase().includes(search.toLowerCase()) ||
      q.positionName?.toLowerCase().includes(search.toLowerCase());

    const matchesField = selectedField === 'all' || q.fieldId === selectedField;
    const matchesType = selectedType === 'all' || q.interviewType === selectedType;

    return matchesSearch && matchesField && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <HelpCircle className="w-4 h-4 text-indigo-400" />
          Koleksi Bank Pertanyaan Interview
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">500+ Pertanyaan Interview & Kriteria Penilaian</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Pelajari apa yang sebenarnya dicari oleh recruiter pada setiap pertanyaan, dapatkan tips penyusunan jawaban, dan latihan secara mandiri.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pertanyaan interview..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Semua Bidang Pekerjaan</option>
              {MOCK_FIELDS.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Semua Jenis Interview</option>
              <option value="hr">Interview HR</option>
              <option value="user">Interview User</option>
              <option value="teknis">Interview Teknis</option>
              <option value="behavioral">Interview Behavioral</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isRevealed = !!revealedAnswers[q.id];
          return (
            <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg hover:border-slate-700 transition">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
                    {q.fieldName || 'Umum'} • {q.positionName || 'Semua Posisi'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
                    {q.interviewType.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAnswer(q.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-indigo-400" />}
                    {isRevealed ? 'Sembunyikan Contoh Jawaban' : 'Lihat Contoh Jawaban'}
                  </button>

                  <Link
                    href={`/simulation/setup?questionId=${q.id}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
                  >
                    <Play className="w-3 h-3 fill-current" /> Latih Soal Ini
                  </Link>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                "{q.question}"
              </h3>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
                <span className="text-indigo-400 font-semibold block">Tujuan & Hal yang Dinilai Recruiter:</span>
                <p className="text-slate-300">{q.objective}</p>
              </div>

              {isRevealed && (
                <div className="pt-2 space-y-3 animate-in fade-in duration-200">
                  <div className="bg-indigo-950/30 border border-indigo-500/30 p-4 rounded-2xl space-y-1">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">Tips Penyusunan Jawaban:</span>
                    <p className="text-xs text-slate-200 leading-relaxed">{q.answerTips}</p>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-500/30 p-5 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Model Contoh Jawaban Terstruktur:</span>
                    <p className="text-xs text-slate-200 italic leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                      "{q.sampleAnswer}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
