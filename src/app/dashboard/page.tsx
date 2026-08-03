'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Play, 
  BarChart2, 
  Clock, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  TrendingUp, 
  User, 
  FileText,
  Settings,
  History
} from 'lucide-react';
import { MOCK_DEMO_SESSIONS, CURRENT_DEMO_USER } from '@/lib/mock-data';

export default function UserDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Greeting Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={CURRENT_DEMO_USER.avatarUrl}
            alt={CURRENT_DEMO_USER.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-lg"
          />
          <div className="space-y-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Paket Gratis (3/3 Sesi Hari Ini)
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Halo, {CURRENT_DEMO_USER.fullName}! 👋
            </h1>
            <p className="text-xs text-slate-400">Siap melanjutkan latihan interview kerja hari ini?</p>
          </div>
        </div>

        <Link
          href="/simulation/setup"
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 whitespace-nowrap"
        >
          <Play className="w-4 h-4 fill-current" />
          Mulai Simulasi Baru
        </Link>
      </div>

      {/* Metrics Counter Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Total Sesi Latihan</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white font-mono">12</span>
            <span className="text-xs text-emerald-400 font-semibold">+3 Minggu Ini</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Rata-Rata Skor</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-indigo-400 font-mono">86.4</span>
            <span className="text-xs text-indigo-300 font-medium">Sangat Baik</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Skor Tertinggi</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">94.0</span>
            <span className="text-xs text-slate-400">Frontend Dev</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Total Waktu Latihan</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-purple-400 font-mono">2.4j</span>
            <span className="text-xs text-slate-400">144 Menit</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2-Cols: Recent Practice & Personal Recommendations */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Last Exercises List */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-400" />
                Latihan Terakhir
              </h3>
              <Link href="/dashboard/history" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                Lihat Seluruh Riwayat →
              </Link>
            </div>

            <div className="space-y-3">
              {MOCK_DEMO_SESSIONS.map((sess) => (
                <div key={sess.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{sess.positionName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                        {sess.interviewType.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {new Date(sess.completedAt).toLocaleDateString('id-ID')} • {sess.answers.length} Pertanyaan • {Math.floor(sess.durationSeconds / 60)} Menit
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Skor</span>
                      <span className="font-bold font-mono text-emerald-400 text-lg">{sess.overallScore}</span>
                    </div>
                    <Link
                      href={`/simulation/result/${sess.id}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
                    >
                      Hasil
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Rekomendasi Personal Peningkatan
            </h3>

            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong className="text-amber-300 font-semibold">Fokus Utama Anda saat Ini:</strong> Skor komunikasi dan relevansi Anda sudah sangat baik (&gt;88%), namun kemampuan memberikan jawaban terstruktur masih dapat ditingkatkan (Metode STAR).
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <Link
                  href="/simulation/setup?interview_type=behavioral"
                  className="px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 hover:bg-amber-500/30 transition"
                >
                  Latih Behavioral Interview (Metode STAR)
                </Link>
                <Link
                  href="/articles/panduan-lengkap-metode-star-behavioral-interview"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition"
                >
                  Baca Artikel Metode STAR
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Right 1-Col: Navigation Links & Target Settings */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white">Menu Navigasi Pengguna</h3>
            <div className="space-y-2">
              {[
                { label: 'Riwayat Latihan Lengkap', href: '/dashboard/history', icon: History },
                { label: 'Grafik Perkembangan Skor', href: '/dashboard/progress', icon: BarChart2 },
                { label: 'Profil Saya & Simulasikan CV', href: '/dashboard/profile', icon: User },
                { label: 'Pengaturan Akun', href: '/dashboard/settings', icon: Settings },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 hover:border-indigo-500/40 hover:bg-slate-800/80 transition"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-indigo-400" />
                      {item.label}
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
