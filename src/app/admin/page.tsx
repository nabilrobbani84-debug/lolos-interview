'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Grid, Briefcase, HelpCircle, FileText, PlayCircle, TrendingUp, DollarSign } from 'lucide-react';
import { MOCK_FIELDS, MOCK_POSITIONS, MOCK_QUESTIONS, MOCK_ARTICLES, MOCK_DEMO_SESSIONS } from '@/lib/mock-data';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Panel Kontrol Admin</h1>
        <p className="text-xs text-slate-400">Ringkasan statistik data platform simulasi InterviewReady.</p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
            Total Pengguna <Users className="w-4 h-4 text-indigo-400" />
          </span>
          <p className="text-2xl font-extrabold text-white font-mono">1,420</p>
          <span className="text-[11px] text-emerald-400 font-medium">+14% Bulan Ini</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
            Bidang Aktif <Grid className="w-4 h-4 text-emerald-400" />
          </span>
          <p className="text-2xl font-extrabold text-white font-mono">{MOCK_FIELDS.length}</p>
          <span className="text-[11px] text-slate-400">12 Industri Utama</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
            Total Posisi <Briefcase className="w-4 h-4 text-amber-400" />
          </span>
          <p className="text-2xl font-extrabold text-white font-mono">52</p>
          <span className="text-[11px] text-slate-400">Tersedia untuk Simulasi</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
            Bank Soal <HelpCircle className="w-4 h-4 text-purple-400" />
          </span>
          <p className="text-2xl font-extrabold text-white font-mono">540+</p>
          <span className="text-[11px] text-slate-400">Pertanyaan Terverifikasi</span>
        </div>
      </div>

      {/* Sesi Interview Monitoring */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-indigo-400" /> Sesi Interview Terbaru
          </h2>
          <Link href="/admin/sessions" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
            Kelola Sesi →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">User ID</th>
                <th className="p-3">Posisi</th>
                <th className="p-3">Tipe</th>
                <th className="p-3">Skor</th>
                <th className="p-3">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {MOCK_DEMO_SESSIONS.map((s) => (
                <tr key={s.id} className="hover:bg-slate-950/40">
                  <td className="p-3 font-mono text-slate-400">{s.userId}</td>
                  <td className="p-3 font-bold text-white">{s.positionName}</td>
                  <td className="p-3">{s.interviewType.toUpperCase()}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">{s.overallScore}</td>
                  <td className="p-3 text-slate-400">{new Date(s.completedAt).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
