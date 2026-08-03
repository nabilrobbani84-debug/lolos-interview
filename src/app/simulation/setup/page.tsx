'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Play, Settings, Briefcase, Award, Globe, Clock, Mic, FileText, CheckCircle2 } from 'lucide-react';
import { MOCK_FIELDS, MOCK_POSITIONS } from '@/lib/mock-data';

function SimulationSetupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFieldSlug = searchParams.get('field') || 'teknologi-informasi';
  const initialPositionSlug = searchParams.get('position') || 'frontend-developer';

  const [fieldSlug, setFieldSlug] = useState(initialFieldSlug);
  const [positionSlug, setPositionSlug] = useState(initialPositionSlug);
  const [experienceLevel, setExperienceLevel] = useState('fresh_grad');
  const [interviewType, setInterviewType] = useState('full');
  const [difficulty, setDifficulty] = useState('medium');
  const [language, setLanguage] = useState('indonesia');
  const [duration, setDuration] = useState('15');
  const [questionCount, setQuestionCount] = useState(5);
  const [answerMode, setAnswerMode] = useState<'text' | 'voice'>('text');

  const selectedField = MOCK_FIELDS.find(f => f.slug === fieldSlug) || MOCK_FIELDS[0];
  const availablePositions = MOCK_POSITIONS.filter(p => p.fieldId === selectedField.id || p.fieldName === selectedField.name);
  const selectedPosition = MOCK_POSITIONS.find(p => p.slug === positionSlug) || availablePositions[0] || MOCK_POSITIONS[0];

  const handleStart = () => {
    const sessionId = `sess-${Date.now()}`;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`session_config_${sessionId}`, JSON.stringify({
        fieldId: selectedField.id,
        fieldName: selectedField.name,
        positionId: selectedPosition.id,
        positionName: selectedPosition.name,
        experienceLevel,
        interviewType,
        difficulty,
        language,
        duration: parseInt(duration),
        questionCount,
        answerMode
      }));
      window.location.href = `/simulation/session/${sessionId}`;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
      
      {/* Step 1: Field & Position */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs flex items-center justify-center">1</span>
          Bidang & Posisi Pekerjaan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Pilih Bidang Pekerjaan</label>
            <select
              value={fieldSlug}
              onChange={(e) => {
                setFieldSlug(e.target.value);
                const firstPos = MOCK_POSITIONS.find(p => p.fieldName === MOCK_FIELDS.find(f => f.slug === e.target.value)?.name);
                if (firstPos) setPositionSlug(firstPos.slug);
              }}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            >
              {MOCK_FIELDS.map(f => (
                <option key={f.id} value={f.slug}>{f.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Pilih Posisi Target</label>
            <select
              value={positionSlug}
              onChange={(e) => setPositionSlug(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            >
              {availablePositions.length > 0 ? (
                availablePositions.map(p => (
                  <option key={p.id} value={p.slug}>{p.name}</option>
                ))
              ) : (
                <option value={selectedPosition.slug}>{selectedPosition.name}</option>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Step 2: Experience & Interview Type */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs flex items-center justify-center">2</span>
          Tingkat Pengalaman & Jenis Interview
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Tingkat Pengalaman Anda</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="student">Pelajar / Mahasiswa</option>
              <option value="fresh_grad">Fresh Graduate (0-1 Tahun)</option>
              <option value="junior">Junior (1-3 Tahun)</option>
              <option value="mid">Mid-Level (3-5 Tahun)</option>
              <option value="senior">Senior (&gt;5 Tahun)</option>
              <option value="manager">Manager / Supervisor</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Jenis Simulasi Interview</label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="full">Interview Lengkap (Gabungan HR, Teknis & Behavioral)</option>
              <option value="hr">Interview HR & Motivasi</option>
              <option value="user">Interview User / Calon Atasan</option>
              <option value="teknis">Interview Keahlian Teknis</option>
              <option value="behavioral">Interview Behavioral (Metode STAR)</option>
              <option value="case_study">Interview Studi Kasus</option>
              <option value="english">Interview Bahasa Inggris</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 3: Difficulty, Language & Mode */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs flex items-center justify-center">3</span>
          Pengaturan Kesulitan & Mode Jawaban
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Tingkat Kesulitan</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="easy">Mudah</option>
              <option value="medium">Menengah</option>
              <option value="hard">Sulit</option>
              <option value="expert">Sangat Sulit (Tantangan Ekstrem)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Bahasa Wawancara</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="indonesia">Bahasa Indonesia</option>
              <option value="english">Bahasa Inggris</option>
              <option value="mixed">Campuran Indonesia & Inggris</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Jumlah Pertanyaan</label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value={5}>5 Pertanyaan (Ringkas)</option>
              <option value={10}>10 Pertanyaan (Standar)</option>
              <option value={15}>15 Pertanyaan (Mendalam)</option>
              <option value={20}>20 Pertanyaan (Simulasi Penuh)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <label className="text-xs font-semibold text-slate-300 block">Pilih Mode Input Jawaban</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setAnswerMode('text')}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition ${
                answerMode === 'text'
                  ? 'bg-indigo-950/40 border-indigo-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-xs font-bold">Jawaban Teks</div>
                <div className="text-[10px] text-slate-400">Ketik jawaban di textarea dengan word counter</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setAnswerMode('voice')}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition ${
                answerMode === 'voice'
                  ? 'bg-indigo-950/40 border-indigo-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Mic className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xs font-bold">Jawaban Suara (Voice)</div>
                <div className="text-[10px] text-slate-400">Rekam suara & transkrip otomatis</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Summary & Start Button */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Ringkasan Konfigurasi Anda:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
          <div><strong>Posisi:</strong> {selectedPosition.name}</div>
          <div><strong>Pengalaman:</strong> {experienceLevel}</div>
          <div><strong>Jumlah Soal:</strong> {questionCount} Soal</div>
          <div><strong>Mode:</strong> {answerMode === 'text' ? 'Teks' : 'Suara'}</div>
        </div>

        <button
          onClick={handleStart}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
        >
          <Play className="w-5 h-5 fill-current" />
          Mulai Interview Sekarang
        </button>
      </div>

    </div>
  );
}

export default function SimulationSetupPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Settings className="w-4 h-4 text-indigo-400" />
          Konfigurasi Sesi Interview
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Atur Parameter Simulasi Anda</h1>
        <p className="text-slate-400 text-sm">Sesuaikan kriteria latihan untuk mendapatkan pertanyaan yang paling relevan.</p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-slate-400">Memuat formulir penggalan...</div>}>
        <SimulationSetupForm />
      </Suspense>
    </div>
  );
}
