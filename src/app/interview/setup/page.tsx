'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Settings, Play, ArrowLeft, Upload, FileText, CheckCircle2, ChevronRight, Volume2, Sparkles } from 'lucide-react';
import { MOCK_COMPANIES, MOCK_POSITIONS } from '@/lib/mock-data';
import InterviewerVoiceSelector from '@/components/audio/InterviewerVoiceSelector';
import InterviewAudioControls from '@/components/audio/InterviewAudioControls';
import VoiceConnectionStatus from '@/components/audio/VoiceConnectionStatus';

function SetupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const positionSlug = searchParams.get('position') || 'frontend-developer';
  const companySlug = searchParams.get('company') || 'nexora-digital';

  const selectedPosition = MOCK_POSITIONS.find(p => p.slug === positionSlug) || MOCK_POSITIONS[0];
  const selectedCompany = MOCK_COMPANIES.find(c => c.slug === companySlug) || MOCK_COMPANIES[0];

  const [experienceLevel, setExperienceLevel] = useState('fresh_grad');
  const [difficulty, setDifficulty] = useState('medium');
  const [language, setLanguage] = useState('indonesia');
  const [durationMode, setDurationMode] = useState('standard');
  const [cvFile, setCvFile] = useState<string | null>('CV_Ahmad_Fauzi.pdf');

  // Voice setup states
  const [hrVoiceId, setHrVoiceId] = useState('sarah-friendly');
  const [techVoiceId, setTechVoiceId] = useState('andi-professional');
  const [volume, setVolume] = useState(0.8);
  const [speakingRate, setSpeakingRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const sessionId = `ai-sess-${Date.now()}`;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`ai_session_config_${sessionId}`, JSON.stringify({
        positionId: selectedPosition.id,
        positionName: selectedPosition.name,
        companyId: selectedCompany.id,
        companyName: selectedCompany.name,
        experienceLevel,
        difficulty,
        language,
        durationMode,
        hasCv: !!cvFile,
        hrVoiceId,
        techVoiceId,
        volume,
        speakingRate,
        isMuted
      }));
      router.push(`/interview/waiting-room?id=${sessionId}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0].name);
    }
  };

  return (
    <form onSubmit={handleStart} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
      
      {/* Option to toggle own job description */}
      <div className="p-4 bg-indigo-950/40 border border-indigo-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <strong className="text-white block">Ingin memakai deskripsi lowongan pekerjaan Anda sendiri?</strong>
          <span className="text-slate-400">AI interviewer (Sarah & Andi) akan menyesuaikan total pertanyaan dari salinan lowongan Anda.</span>
        </div>
        <Link
          href="/interview/custom-vacancy"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center gap-1.5 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" /> Gunakan Lowongan Sendiri
        </Link>
      </div>

      {/* Target Details */}
      <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div>
          <span className="text-slate-400 block">Perusahaan:</span>
          <strong className="text-white">{selectedCompany.name} ({selectedCompany.industry})</strong>
        </div>
        <div>
          <span className="text-slate-400 block">Posisi:</span>
          <strong className="text-white">{selectedPosition.name}</strong>
        </div>
      </div>

      {/* Experience Level & Difficulty */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Tingkat Pengalaman</label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none"
          >
            <option value="student">Pelajar / Mahasiswa</option>
            <option value="fresh_grad">Fresh Graduate (0-1 Tahun)</option>
            <option value="junior">Junior (1-3 Tahun)</option>
            <option value="mid">Mid-Level (3-5 Tahun)</option>
            <option value="senior">Senior (&gt;5 Tahun)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Tingkat Kesulitan Interview</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none"
          >
            <option value="easy">Pemula (Ramah & Terbimbing)</option>
            <option value="medium">Menengah (Pertanyaan Lanjutan Standar)</option>
            <option value="hard">Profesional (Kritis & Mendalam)</option>
            <option value="expert">Ekstrem (Tantangan Studi Kasus Cepat)</option>
          </select>
        </div>
      </div>

      {/* Language & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Bahasa Interview</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none"
          >
            <option value="indonesia">Bahasa Indonesia</option>
            <option value="english">Bahasa Inggris (English)</option>
            <option value="mixed">Campuran (Indonesia & Inggris)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Mode & Durasi Interview</label>
          <select
            value={durationMode}
            onChange={(e) => setDurationMode(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none"
          >
            <option value="quick">Interview Cepat (5-10 menit, 5 soal)</option>
            <option value="standard">Interview Standar (20-30 menit, HR & Teknis)</option>
            <option value="complete">Interview Lengkap (45-60 menit, HR, Teknis & Studi Kasus)</option>
          </select>
        </div>
      </div>

      {/* SECTION: VOICE SELECTION & PREVIEW */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-indigo-400" /> Pilihan Karakter Suara AI Pewawancara
          </h3>
        </div>

        <VoiceConnectionStatus />

        <InterviewerVoiceSelector
          selectedHrVoice={hrVoiceId}
          selectedTechVoice={techVoiceId}
          onHrVoiceChange={(id) => setHrVoiceId(id)}
          onTechVoiceChange={(id) => setTechVoiceId(id)}
          speakingRate={speakingRate}
        />

        <InterviewAudioControls
          volume={volume}
          onVolumeChange={(v) => setVolume(v)}
          isMuted={isMuted}
          onMuteToggle={() => setIsMuted(!isMuted)}
          speakingRate={speakingRate}
          onRateChange={(r) => setSpeakingRate(r)}
        />
      </div>

      {/* CV PDF Upload (Simulated) */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <label className="text-xs font-semibold text-slate-300 block">Unggah CV Anda (Opsional)</label>
        {cvFile ? (
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-bold text-white">{cvFile}</span>
            </div>
            <button
              type="button"
              onClick={() => setCvFile(null)}
              className="text-xs text-rose-400 hover:text-rose-300"
            >
              Hapus
            </button>
          </div>
        ) : (
          <div className="border border-dashed border-slate-800 p-6 rounded-2xl text-center space-y-2 bg-slate-950/40">
            <Upload className="w-6 h-6 text-slate-500 mx-auto" />
            <span className="text-xs block text-slate-400">Pilih berkas CV format PDF</span>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="setup-cv-file"
            />
            <label
              htmlFor="setup-cv-file"
              className="inline-block px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Pilih File
            </label>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl transition"
      >
        Lanjutkan Ke Waiting Room <ChevronRight className="w-4 h-4" />
      </button>

    </form>
  );
}

export default function SetupInterviewPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back Button */}
      <Link href="/interview/companies" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-white">Konfigurasi AI Interview Room</h1>
        <p className="text-slate-400 text-sm">Sesuaikan detail wawancara dan karakter suara agar pewawancara virtual beradaptasi.</p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-slate-400">Memuat formulir...</div>}>
        <SetupForm />
      </Suspense>
    </div>
  );
}
