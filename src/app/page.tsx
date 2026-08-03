'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Code, 
  Palette, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Award, 
  BarChart, 
  MessageSquare, 
  Star,
  Zap,
  Globe
} from 'lucide-react';
import { MOCK_FIELDS, MOCK_TESTIMONIALS } from '@/lib/mock-data';

export default function LandingPage() {
  const [selectedFieldSlug, setSelectedFieldSlug] = useState('teknologi-informasi');

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 lg:pt-20 pb-16 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Simulasi Wawancara Kerja Berbasis AI & Rule-Engine
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Persiapkan Interview Kerja dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">Lebih Percaya Diri</span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Berlatih interview berdasarkan bidang pekerjaan, posisi spesifik, dan tingkat pengalaman Anda. Dapatkan evaluasi jawaban real-time, skor otomatis, serta rekomendasi metode STAR secara langsung.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/interview/positions"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 transition transform hover:-translate-y-0.5"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Coba AI Interview Room (Sarah & Andi)
                </Link>

                <Link
                  href="/simulation/setup"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-base border border-slate-700 transition"
                >
                  Simulasi Klasik
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Tanpa Perlu Kartu Kredit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Mendukung Bahasa Indonesia & Inggris</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Graphic */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-xs text-slate-400 font-mono ml-2">Studio Interview Simulation</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                    Live Recording
                  </span>
                </div>

                {/* Recruiter Box */}
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                      SW
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Sarah Wijaya</h4>
                      <p className="text-[11px] text-indigo-400">HR Recruitment Manager • Nusantara Digital</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 italic bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    "Ceritakan proyek terbaik yang pernah Anda selesaikan dan bagaimana Anda mengukur keberhasilannya?"
                  </p>
                </div>

                {/* Candidate Answer Box */}
                <div className="bg-indigo-950/30 rounded-2xl p-4 border border-indigo-900/50 space-y-2">
                  <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold">
                    <span>Jawaban Anda (Mode Suara)</span>
                    <span className="text-emerald-400 font-mono">STAR Analyzed ✓</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    "Di proyek e-learning, saya bertugas merancang ulang UI/UX. Hasilnya kepuasan pengguna naik 35%..."
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-indigo-900/40 text-[11px]">
                    <span className="text-slate-400">Skor Evaluasi:</span>
                    <span className="font-bold text-emerald-400 font-mono text-sm">88.5 / 100 (Sangat Baik)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATISTIK PLATFORM */}
      <section className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-white">50+</p>
            <p className="text-xs sm:text-sm font-medium text-slate-400">Bidang & Posisi Pekerjaan</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400">500+</p>
            <p className="text-xs sm:text-sm font-medium text-slate-400">Pertanyaan Interview Spesifik</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">10.000+</p>
            <p className="text-xs sm:text-sm font-medium text-slate-400">Sesi Latihan Diselesaikan</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-purple-400">100%</p>
            <p className="text-xs sm:text-sm font-medium text-slate-400">Evaluasi & Metode STAR</p>
          </div>
        </div>
      </section>

      {/* CARA KERJA (4 STEPS) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Alur Simulasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Bagaimana InterviewReady Bekerja?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Empat langkah mudah untuk meningkatkan kemampuan wawancara kerja Anda dari nol hingga siap diterima perusahaan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Pilih Bidang & Posisi', desc: 'Tentukan kategori pekerjaan (IT, Marketing, Keuangan, dll) dan tingkat pengalaman Anda.' },
            { step: '02', title: 'Atur Jenis Interview', desc: 'Pilih tipe wawancara (HR, User, Teknis, Behavioral) dan durasi sesuai kebutuhan.' },
            { step: '03', title: 'Jawab Pertanyaan', desc: 'Latih penyampaian jawaban melalui mode Teks atau Suara secara realistis.' },
            { step: '04', title: 'Dapatkan Skor & Evaluasi', desc: 'Dapatkan analisis metode STAR, kelebihan, kelemahan, dan contoh revisi jawaban.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-indigo-500/50 transition group">
              <span className="text-3xl font-extrabold text-indigo-500/40 group-hover:text-indigo-400 transition font-mono">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KATEGORI POPULER */}
      <section className="w-full px-4 sm:px-8 lg:px-12 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Kategori Pekerjaan Populer</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Pilih bidang impian Anda dan mulai simulasi posisi yang ditargetkan.</p>
          </div>
          <Link href="/fields" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            Lihat Seluruh 12+ Bidang <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_FIELDS.slice(0, 6).map((field) => (
            <div key={field.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-indigo-500/40 transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {field.positionCount} Posisi
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{field.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{field.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {field.popularPositions.slice(0, 3).map((pos, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {pos}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/fields/${field.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white text-xs font-semibold text-slate-200 transition"
                >
                  Jelajahi Posisi
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KEUNGGULAN PLATFORM */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-16">
        <div className="w-full px-4 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white">Mengapa Memilih InterviewReady?</h2>
            <p className="text-sm text-slate-400">Dirancang khusus sesuai standar rekrutmen perusahaan modern.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Briefcase, title: 'Pertanyaan Spesifik Per Posisi', desc: 'Bukan pertanyaan umum generik. Dapatkan soal teknis, HR, dan kasus nyata sesuai posisi yang Anda lamar.' },
              { icon: Zap, title: 'Evaluasi Otomatis & Metode STAR', desc: 'Sistem menganalisis jawaban Anda berdasarkan 6 kriteria utama serta mendeteksi komponen STAR secara akurat.' },
              { icon: MessageSquare, title: 'Rekomendasi Jawaban Terbaik', desc: 'Dapatkan contoh kalimat revisi yang lebih kuat, berbobot, dan diminati oleh recruiter.' },
              { icon: BarChart, title: 'Lacak Perkembangan Skor', desc: 'Pantau peningkatan rasa percaya diri dan kualitas komunikasi Anda melalui grafik analitis pribadi.' },
              { icon: Globe, title: 'Dukungan Bahasa Indonesia & Inggris', desc: 'Latih simulasi interview dalam Bahasa Indonesia, Bahasa Inggris, atau campuran keduanya.' },
              { icon: ShieldCheck, title: 'Aman & Bebas Berlatih', desc: 'Ruang aman tanpa tekanan untuk mencoba berbagai variasi jawaban sebelum menghadapi interview sesungguhnya.' }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full px-4 sm:px-8 lg:px-12 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">Apa Kata Pengguna Kami?</h2>
          <p className="text-sm text-slate-400">Ribuan pencari kerja telah membuktikan peningkatan performa interview mereka.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-800/60 rounded-3xl p-10 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Siap Menghadapi Interview Kerja Berikutnya?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Mulai latihan sekarang, ketahui bagian yang perlu Anda tingkatkan, dan melangkah dengan rasa percaya diri penuh.
            </p>
            <div className="pt-2">
              <Link
                href="/simulation/setup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-950 font-bold text-base shadow-xl hover:bg-slate-100 transition transform hover:-translate-y-0.5"
              >
                <Play className="w-5 h-5 fill-current text-indigo-600" />
                Mulai Simulasi Gratis Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
