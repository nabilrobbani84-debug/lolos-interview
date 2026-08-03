'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, Sparkles, Play, ShieldCheck, Zap } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Zap className="w-4 h-4 text-indigo-400" />
          Pilihan Paket Terjangkau & Transparan
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Investasikan Karier Impian Anda Hari Ini
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Pilih paket yang sesuai dengan kebutuhan persiapan wawancara kerja Anda. Mulai secara gratis atau buka akses tanpa batas dengan Paket Pro.
        </p>
      </div>

      {/* Pricing Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Free Plan */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Paket Gratis
              </span>
              <h2 className="text-2xl font-bold text-white">Latihan Dasar</h2>
              <p className="text-xs text-slate-400">Cocok untuk pencari kerja yang ingin mencoba simulasi awal.</p>
            </div>

            <div className="flex items-baseline gap-1 border-b border-slate-800 pb-6">
              <span className="text-4xl font-extrabold text-white font-mono">Rp 0</span>
              <span className="text-xs text-slate-500 font-medium">/ Selamanya</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Interview Umum & Kategori Terbatas</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Maksimal 3 Sesi Simulasi per Hari</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Mode Input Jawaban Teks</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Evaluasi Dasar & Skor 0-100</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-500">
                <XCircle className="w-4 h-4 text-slate-700 flex-shrink-0" />
                <span>Mode Suara (Voice Recording & STT)</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-500">
                <XCircle className="w-4 h-4 text-slate-700 flex-shrink-0" />
                <span>Analisis CV PDF Personal</span>
              </li>
            </ul>
          </div>

          <Link
            href="/simulation/setup"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
          >
            Mulai Simulasi Gratis
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-900 border-2 border-indigo-500/60 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-2xl relative">
          <span className="absolute -top-3.5 right-8 px-3.5 py-1 bg-indigo-600 text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-lg">
            Rekomendasi Utama
          </span>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Paket Pro
              </span>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                Simulasi Tanpa Batas <Sparkles className="w-5 h-5 text-indigo-400" />
              </h2>
              <p className="text-xs text-slate-300">Untuk profesional dan kandidat yang ingin hasil terbaik.</p>
            </div>

            <div className="flex items-baseline gap-1 border-b border-indigo-900/60 pb-6">
              <span className="text-4xl font-extrabold text-white font-mono">Rp 49.000</span>
              <span className="text-xs text-indigo-300 font-medium">/ Bulan</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Simulasi Tanpa Batas</strong> Seluruh Sesi</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Seluruh 12+ Bidang & 50+ Posisi Spesifik</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Mode Perekam Suara</strong> & Auto Speech-to-Text</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Analisis Metode STAR & Model Revisi Jawaban</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Analisis CV PDF</strong> Personal</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Unduh Laporan Evaluasi PDF & Riwayat Tanpa Batas</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => alert('Simulasi Upgrade ke Paket Pro Berhasil! Selamat menikmati akses penuh.')}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 fill-current" /> Upgrade ke Paket Pro Sekarang
          </button>
        </div>

      </div>

    </div>
  );
}
