'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Award, Star, BookOpen, Download, Share2, ArrowRight, RotateCcw, CheckCircle2, AlertTriangle, Sparkles, ShieldCheck } from 'lucide-react';
import STARBadge from '@/components/simulation/STARBadge';

export default function AIInterviewRoomResultPage() {
  const params = useParams();
  const sessionId = params?.id as string;
  const [report, setReport] = useState<any>(null);
  const [activeQuestionTab, setActiveQuestionTab] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(`ai_session_result_${sessionId}`);
      if (stored) {
        setReport(JSON.parse(stored));
      } else {
        // Fallback default mock report
        setReport({
          sessionId,
          overallScore: 86,
          hrScore: 88,
          technicalScore: 84,
          communicationScore: 85,
          confidenceScore: 90,
          durationSeconds: 780,
          config: {
            positionName: 'Frontend Developer',
            companyName: 'Nexora Digital'
          },
          answers: [
            {
              questionText: 'Silakan perkenalkan diri Anda secara singkat dan ceritakan latar belakang profesional Anda.',
              answerText: 'Saya Ahmad, lulusan Teknik Informatika UI. Saya menyukai frontend dan telah membuat beberapa proyek web responsive menggunakan React.',
              evaluation: {
                score: 85,
                strengths: ['Memperkenalkan latar belakang pendidikan secara singkat', 'Menyebutkan fokus keahlian React secara jelas'],
                weaknesses: ['Belum menyebutkan proyek spesifik atau hasil terukur yang dicapai.'],
                recommendation: 'Jelaskan minimal 1 proyek portofolio dengan data pengguna aktif.',
                improvedAnswer: 'Saya Ahmad, lulusan Teknik Informatika Universitas Indonesia. Spesialisasi saya adalah Frontend Development dengan pengalaman membangun e-learning portal menggunakan React dan Tailwind CSS yang telah melayani 500+ pengguna aktif.',
                starAnalysis: { situation: true, task: true, action: true, result: false, feedback: 'Bagus, tambahkan hasil.' }
              }
            },
            {
              questionText: 'Bagaimana cara Anda mengoptimalkan performa React server component dan menangani hydration error?',
              answerText: 'Hydration error terjadi karena perbedaan server HTML dan client render. Saya mengatasinya dengan useEffect atau dynamic imports.',
              evaluation: {
                score: 87,
                strengths: ['Memahami akar masalah hydration error', 'Menyebutkan solusi dynamic imports (SSR: false) secara tepat'],
                weaknesses: ['Kurang menjelaskan detail optimasi performa React Server Component.'],
                recommendation: 'Jelaskan konsep Code Splitting dan React Suspense untuk optimasi render.',
                improvedAnswer: 'Hydration error terjadi saat markup render pertama client berbeda dengan HTML server. Saya mengatasinya dengan lazy loading component menggunakan dynamic imports Next.js atau membungkus block dinamis di dalam client-only wrapper menggunakan state mounted.',
                starAnalysis: { situation: true, task: true, action: true, result: true, feedback: 'Analisis teknis sudah lengkap.' }
              }
            }
          ]
        });
      }
    }
  }, [sessionId]);

  if (!report) return <div className="p-12 text-center text-slate-400">Memuat Laporan AI Room...</div>;

  const score = report.overallScore || 85;

  const getRecommendationBadge = (s: number) => {
    if (s >= 90) return { label: 'Sangat Direkomendasikan', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (s >= 80) return { label: 'Direkomendasikan (Recommended)', color: 'text-emerald-300', bg: 'bg-emerald-500/15 border-emerald-500/30' };
    if (s >= 70) return { label: 'Dipertimbangkan (Considered)', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    return { label: 'Perlu Peningkatan', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
  };

  const recBadge = getRecommendationBadge(score);
  const currentAnswer = report.answers?.[activeQuestionTab] || report.answers?.[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-300">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Award className="w-4 h-4 text-emerald-400" />
          AI Interview Room Scorecard
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Hasil Evaluasi & Rekomendasi Kerja</h1>
        <p className="text-slate-400 text-sm">Hasil penilaian mendalam dari Sarah Wijaya (HR) dan Andi Pratama (Lead IT).</p>
      </div>

      {/* Main Stats Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 block font-semibold">Skor Keseluruhan</span>
            <div className="text-4xl font-black text-white font-mono">{score} / 100</div>
            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${recBadge.bg} ${recBadge.color}`}>
              {recBadge.label}
            </span>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 block font-semibold">Penilaian HRD (Sarah)</span>
            <div className="text-4xl font-black text-indigo-400 font-mono">{report.hrScore || 88}</div>
            <span className="text-[10px] text-slate-400">Komunikasi & Kecocokan Budaya</span>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 block font-semibold">Penilaian Lead IT (Andi)</span>
            <div className="text-4xl font-black text-emerald-400 font-mono">{report.technicalScore || 84}</div>
            <span className="text-[10px] text-slate-400">Keahlian Teknis & Pemecahan Masalah</span>
          </div>

        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/interview/positions"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-md"
            >
              <RotateCcw className="w-4 h-4" /> Ulangi Interview
            </Link>

            <button
              onClick={() => alert('Laporan evaluasi AI Room berhasil diunduh (PDF).')}
              className="px-4 py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold rounded-xl transition"
            >
              Unduh Hasil PDF
            </button>
          </div>

          <Link href="/dashboard" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            Lihat Dashboard Perkembangan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Job vacancy Customizer readiness section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-1">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700 uppercase">
            Hasil Penilaian Kesiapan Karir
          </span>
          <h3 className="text-xl font-bold text-white">Analisis Kualifikasi & Gaps Terhadap Lowongan</h3>
          <p className="text-xs text-slate-400">Berikut adalah gap pemenuhan CV Anda terhadap deskripsi lowongan kustom.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gaps list */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Kualifikasi Kuat Teridentifikasi:</h4>
            <div className="flex flex-wrap gap-1.5">
              {['PHP', 'React', 'Next.js', 'SQL', 'CodeIgniter', 'Agile Teamwork'].map((s, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>

            <h4 className="text-xs font-bold text-slate-350 uppercase tracking-wider pt-2">Kualifikasi Kurang / Belum Terbukti:</h4>
            <div className="flex flex-wrap gap-1.5">
              {['Laravel', 'Golang', 'NoSQL', 'Caching Strategy', 'CI/CD Pipeline', 'Secure Programming'].map((s, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* 7-day plan */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-3">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Rencana Belajar 7 Hari:
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <strong className="text-indigo-300 whitespace-nowrap">Hari 1-2:</strong>
                <span className="text-slate-300">Pelajari dasar framework Laravel & routing.</span>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-indigo-300 whitespace-nowrap">Hari 3-4:</strong>
                <span className="text-slate-300">Pelajari goroutine concurrency & syntax dasar Go.</span>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-indigo-300 whitespace-nowrap">Hari 5-6:</strong>
                <span className="text-slate-300">Review indexing SQL, Caching strategy, & secure coding.</span>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-indigo-300 whitespace-nowrap">Hari 7:</strong>
                <span className="text-slate-300">Buat CI/CD pipeline sederhana di GitHub Actions.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answer detail Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Analisis Detail Jawaban Per Tahap</h3>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-850">
          {report.answers?.map((ans: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setActiveQuestionTab(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition border whitespace-nowrap ${
                activeQuestionTab === idx
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-450 hover:text-white'
              }`}
            >
              Tahap #{idx + 1} ({ans.evaluation?.score || 80} Pts)
            </button>
          ))}
        </div>

        {currentAnswer && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Question */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-indigo-400 font-bold block mb-1">PERTANYAAN:</span>
              <p className="text-sm font-bold text-white">"{currentAnswer.questionText}"</p>
            </div>

            {/* Answer */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-400">Jawaban Kandidat:</span>
              <p className="p-4 bg-slate-950 text-slate-200 rounded-2xl border border-slate-800 text-xs italic leading-relaxed">
                "{currentAnswer.answerText}"
              </p>
            </div>

            {/* STAR Badge */}
            {currentAnswer.evaluation?.starAnalysis && (
              <STARBadge star={currentAnswer.evaluation.starAnalysis} />
            )}

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Kelebihan
                </h4>
                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {currentAnswer.evaluation?.strengths?.map((str: string, idx: number) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-2">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Area Perbaikan
                </h4>
                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {currentAnswer.evaluation?.weaknesses?.map((wk: string, idx: number) => (
                    <li key={idx}>{wk}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Improved Model Answer */}
            <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-5 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Saran Model Jawaban yang Disempurnakan:
              </span>
              <p className="text-xs text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono leading-relaxed">
                {currentAnswer.evaluation?.improvedAnswer || currentAnswer.sampleAnswer}
              </p>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
