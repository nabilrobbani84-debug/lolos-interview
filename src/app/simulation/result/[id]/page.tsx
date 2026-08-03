'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Award, 
  RotateCcw, 
  Download, 
  Share2, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Star, 
  TrendingUp, 
  BarChart2, 
  FileText,
  Sparkles
} from 'lucide-react';
import STARBadge from '@/components/simulation/STARBadge';

export default function ResultPage() {
  const params = useParams();
  const sessionId = params?.id as string;
  const [report, setReport] = useState<any>(null);
  const [activeQuestionTab, setActiveQuestionTab] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(`session_result_${sessionId}`);
      if (stored) {
        setReport(JSON.parse(stored));
      } else {
        // Mock fallback report
        setReport({
          sessionId,
          config: {
            positionName: 'Frontend Developer',
            interviewType: 'full',
            difficulty: 'medium',
            language: 'indonesia'
          },
          overallScore: 88,
          durationSeconds: 650,
          completedAt: new Date().toISOString(),
          answers: [
            {
              questionText: 'Ceritakan tentang diri Anda dan proyek Frontend terbaik yang pernah Anda kerjakan.',
              answerText: 'Saya lulusan Teknik Informatika yang menyukai web dev. Saya pernah membangun aplikasi e-commerce dengan React dan Tailwind CSS.',
              evaluation: {
                score: 88,
                strengths: ['Jawaban relevan dengan posisi Frontend', 'Menyebutkan stack teknologi modern (React, Tailwind)'],
                weaknesses: ['Belum menyebutkan angka hasil atau dampak dari aplikasi tersebut'],
                recommendation: 'Tambahkan data kuantitatif pengguna atau statistik efisiensi.',
                improvedAnswer: 'Saya lulusan Teknik Informatika dengan spesialisasi Frontend Development. Saya telah membangun aplikasi e-commerce menggunakan React dan Tailwind CSS yang mampu mengoperasikan 500+ transaksi harian dengan waktu pemuatan di bawah 1.5 detik.',
                starAnalysis: {
                  situation: true,
                  task: true,
                  action: true,
                  result: false,
                  feedback: 'Latar belakang dan tindakan sudah jelas, tinggal tambahkan hasil terukur (Result).'
                },
                aspectScores: {
                  communication: 90,
                  relevance: 92,
                  structure: 84,
                  confidence: 86,
                  technical: 88,
                  problemSolving: 85
                }
              }
            }
          ]
        });
      }
    }
  }, [sessionId]);

  if (!report) return <div className="p-12 text-center text-slate-400">Memuat Laporan Evaluasi...</div>;

  const score = report.overallScore || 85;

  const getScoreCategory = (s: number) => {
    if (s >= 90) return { label: 'Sangat Baik (Excellent)', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (s >= 80) return { label: 'Baik (Good)', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (s >= 70) return { label: 'Cukup Baik (Fair)', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    if (s >= 60) return { label: 'Perlu Ditingkatkan', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
    return { label: 'Perlu Banyak Latihan', color: 'text-rose-500', bg: 'bg-rose-500/10 border-rose-500/30' };
  };

  const scoreCat = getScoreCategory(score);
  const currentAnswer = report.answers?.[activeQuestionTab] || report.answers?.[0];
  const evalData = currentAnswer?.evaluation;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Award className="w-4 h-4 text-emerald-400" />
          Laporan Evaluasi Wawancara Kerja Selesai
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Hasil Simulasi & Analisis Jawaban</h1>
        <p className="text-slate-400 text-sm">Berikut rincian skor, analisis metode STAR, serta rekomendasi perbaikan untuk Anda.</p>
      </div>

      {/* Main Score Hero Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Big Score Circle */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Skor Keseluruhan</span>
            <div className="text-6xl font-black text-white font-mono tracking-tight">
              {score}
              <span className="text-xl text-slate-500 font-sans"> / 100</span>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${scoreCat.bg} ${scoreCat.color}`}>
              {scoreCat.label}
            </span>
          </div>

          {/* Quick Details */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-xl font-bold text-white">Ringkasan Sesi Interview</h3>
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 block">Posisi Target</span>
                <strong className="text-white font-medium">{report.config?.positionName || 'Frontend Developer'}</strong>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 block">Jenis Interview</span>
                <strong className="text-white font-medium">{report.config?.interviewType?.toUpperCase() || 'FULL'}</strong>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 block">Jumlah Soal</span>
                <strong className="text-white font-medium">{report.answers?.length || 5} Pertanyaan</strong>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 block">Total Durasi</span>
                <strong className="text-white font-medium">{Math.floor((report.durationSeconds || 600) / 60)} Menit</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/simulation/setup"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-md shadow-indigo-600/30"
            >
              <RotateCcw className="w-4 h-4" /> Ulangi Simulasi
            </Link>

            <button
              onClick={() => alert('Laporan hasil interview disimulasikan berhasil diunduh (PDF).')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition"
            >
              <Download className="w-4 h-4" /> Unduh Laporan PDF
            </button>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Kembali ke Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Aspect Scores Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-indigo-400" />
          Grafik Penilaian 6 Aspek Wawancara
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Komunikasi', score: evalData?.aspectScores?.communication || 88 },
            { label: 'Relevansi Jawaban', score: evalData?.aspectScores?.relevance || 90 },
            { label: 'Struktur (STAR)', score: evalData?.aspectScores?.structure || 82 },
            { label: 'Kepercayaan Diri', score: evalData?.aspectScores?.confidence || 85 },
            { label: 'Pengetahuan Teknis', score: evalData?.aspectScores?.technical || 88 },
            { label: 'Problem Solving', score: evalData?.aspectScores?.problemSolving || 84 }
          ].map((asp, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300">{asp.label}</span>
                <span className="text-indigo-400 font-mono font-bold">{asp.score}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${asp.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Per-Question Detailed Feedback */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
        <h3 className="text-xl font-bold text-white">Evaluasi Detail Per Pertanyaan</h3>

        {/* Question Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {report.answers?.map((ans: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setActiveQuestionTab(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition border whitespace-nowrap ${
                activeQuestionTab === idx
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Soal #{idx + 1} ({ans.evaluation?.score || 80} Pts)
            </button>
          ))}
        </div>

        {currentAnswer && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Question Title */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-indigo-400 font-semibold uppercase tracking-wider">Pertanyaan #{activeQuestionTab + 1}:</span>
              <p className="text-base font-bold text-white">"{currentAnswer.questionText}"</p>
            </div>

            {/* User Answer */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400">Jawaban Anda:</span>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs leading-relaxed italic">
                "{currentAnswer.answerText}"
              </div>
            </div>

            {/* STAR Analysis Badge */}
            {evalData?.starAnalysis && <STARBadge star={evalData.starAnalysis} />}

            {/* Strengths vs Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Hal yang Sudah Baik
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {evalData?.strengths?.map((str: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Hal yang Perlu Ditingkatkan
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {evalData?.weaknesses?.map((wk: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400">•</span>
                      <span>{wk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Improved Model Answer */}
            <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Contoh Jawaban yang Direvisi (Lebih Berbobot):
              </div>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-indigo-900/40 font-mono">
                {evalData?.improvedAnswer || currentAnswer.sampleAnswer}
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
