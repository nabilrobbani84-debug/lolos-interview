'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Award, Star, Download, ArrowRight, RotateCcw, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export default function AIInterviewRoomResultPage() {
  const params = useParams();
  const sessionId = params?.id as string;
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(`ai_session_result_${sessionId}`);
      if (stored) {
        setReport(JSON.parse(stored));
      } else {
        // Fallback default mock report
        setReport({
          sessionId,
          config: {
            positionName: 'Frontend Developer',
            companyName: 'Nexora Digital'
          },
          evaluation: {
            overall_score: 86,
            summary: 'Kandidat menunjukkan pemahaman yang baik secara keseluruhan.',
            strengths: ['Komunikasi yang jelas', 'Pengetahuan teknis React yang baik'],
            areas_for_improvement: ['Perlu pengalaman nyata lebih banyak di CI/CD'],
            star_method_assessment: {
              situation: 'Cukup baik dalam menjelaskan konteks.',
              task: 'Tugas dijelaskan secara terukur.',
              action: 'Tindakan yang diambil sangat spesifik.',
              result: 'Kurang menyebutkan hasil berupa data angka.'
            },
            recommendation: 'Direkomendasikan'
          }
        });
      }
    }
  }, [sessionId]);

  if (!report) return <div className="p-12 text-center text-slate-400">Memuat Laporan AI Room...</div>;

  const evaluation = report.evaluation || {};
  const score = evaluation.overall_score || 0;

  const getRecommendationBadge = (rec: string) => {
    if (rec === 'Sangat Direkomendasikan') return { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (rec === 'Direkomendasikan') return { color: 'text-indigo-400', bg: 'bg-indigo-500/15 border-indigo-500/30' };
    if (rec === 'Perlu Pertimbangan') return { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    return { color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
  };

  const recBadge = getRecommendationBadge(evaluation.recommendation);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-300">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Award className="w-4 h-4 text-emerald-400" />
          AI Interview Room Scorecard
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Hasil Evaluasi & Rekomendasi Kerja</h1>
        <p className="text-slate-400 text-sm">Hasil penilaian mendalam dari AI Pewawancara untuk posisi {report.config?.positionName}.</p>
      </div>

      {/* Main Stats Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2 flex flex-col justify-center items-center">
            <span className="text-xs text-slate-400 block font-semibold">Skor Keseluruhan</span>
            <div className="text-6xl font-black text-white font-mono">{score}</div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-center items-center">
            <span className="text-xs text-slate-400 block font-semibold">Rekomendasi Akhir</span>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold border ${recBadge.bg} ${recBadge.color}`}>
              {evaluation.recommendation || 'Menunggu'}
            </span>
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
              <Download className="w-4 h-4 inline-block mr-1"/> Unduh Hasil PDF
            </button>
          </div>

          <Link href="/dashboard" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            Lihat Dashboard Perkembangan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Summary and Strengths/Weaknesses */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Ringkasan Performa</h3>
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            {evaluation.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Kelebihan Utama
            </h4>
            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
              {evaluation.strengths?.map((str: string, idx: number) => (
                <li key={idx}>{str}</li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Area Perbaikan
            </h4>
            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
              {evaluation.areas_for_improvement?.map((wk: string, idx: number) => (
                <li key={idx}>{wk}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* STAR Assessment */}
      {evaluation.star_method_assessment && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" /> Penilaian Berdasarkan Metode STAR
          </h3>
          <p className="text-xs text-slate-400 mb-4">Evaluasi cara kandidat dalam menyusun jawaban terstruktur atas pengalamannya.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2">Situation (Situasi)</h4>
              <p className="text-sm text-slate-300">{evaluation.star_method_assessment.situation}</p>
            </div>
            
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2">Task (Tugas)</h4>
              <p className="text-sm text-slate-300">{evaluation.star_method_assessment.task}</p>
            </div>
            
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2">Action (Tindakan)</h4>
              <p className="text-sm text-slate-300">{evaluation.star_method_assessment.action}</p>
            </div>
            
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2">Result (Hasil)</h4>
              <p className="text-sm text-slate-300">{evaluation.star_method_assessment.result}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
