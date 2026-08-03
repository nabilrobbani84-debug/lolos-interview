'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Folder, Calendar, Award, Star, Search, Filter } from 'lucide-react';

export default function ApplicationsDashboardPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const applications = [
    {
      id: 'app-1',
      jobTitle: 'Full Stack Engineer',
      companyName: 'PT Siaga Abdi Utama',
      location: 'Jakarta Raya · Di Kantor',
      status: 'akan_dilamar',
      matchScore: 78,
      lastSimScore: 88,
      actualInterviewDate: '2026-08-12',
      isFavorite: true
    },
    {
      id: 'app-2',
      jobTitle: 'Frontend Developer',
      companyName: 'Nexora Digital',
      location: 'Remote-First',
      status: 'interview_teknis',
      matchScore: 85,
      lastSimScore: 86,
      actualInterviewDate: '2026-08-08',
      isFavorite: false
    }
  ];

  const getStatusLabel = (s: string) => {
    switch (s) {
      case 'akan_dilamar': return { label: 'Akan Dilamar', color: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' };
      case 'sudah_dilamar': return { label: 'Sudah Dilamar', color: 'bg-blue-500/10 text-blue-300 border-blue-500/20' };
      case 'interview_hr': return { label: 'Interview HR', color: 'bg-amber-500/10 text-amber-300 border-amber-500/20' };
      case 'interview_teknis': return { label: 'Interview Teknis', color: 'bg-purple-500/10 text-purple-300 border-purple-500/20' };
      case 'menunggu_hasil': return { label: 'Menunggu Hasil', color: 'bg-slate-800 text-slate-300 border-slate-700' };
      case 'diterima': return { label: 'Diterima', color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' };
      default: return { label: 'Tidak Dilanjutkan', color: 'bg-rose-500/10 text-rose-300 border-rose-500/20' };
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(search.toLowerCase()) || app.companyName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-350">
      
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Folder className="w-8 h-8 text-indigo-400" /> Dashboard Lamaran Pekerjaan
          </h1>
          <p className="text-xs text-slate-400 mt-1">Lacak lamaran aktif Anda dan mulai simulasi interview tersinkronisasi.</p>
        </div>

        <Link
          href="/interview/custom-vacancy"
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Tambah Lowongan Baru
        </Link>
      </div>

      {/* Filter and Search controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Search */}
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari lowongan atau perusahaan..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter status */}
        <div className="md:col-span-6 flex items-center gap-2 justify-end">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Semua Status Lamaran</option>
            <option value="akan_dilamar">Akan Dilamar</option>
            <option value="sudah_dilamar">Sudah Dilamar</option>
            <option value="interview_hr">Interview HR</option>
            <option value="interview_teknis">Interview Teknis</option>
            <option value="menunggu_hasil">Menunggu Hasil</option>
            <option value="diterima">Diterima</option>
          </select>
        </div>

      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredApps.map((app) => {
          const badge = getStatusLabel(app.status);
          return (
            <div key={app.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-indigo-500/50 transition flex flex-col justify-between shadow-xl">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>
                    {badge.label}
                  </span>
                  {app.isFavorite && <Star className="w-4 h-4 text-amber-400 fill-current" />}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white leading-snug">{app.jobTitle}</h3>
                  <span className="text-xs text-indigo-400 font-semibold">{app.companyName}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{app.location}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[11px] bg-slate-950 p-3 rounded-xl border border-slate-850">
                  <div>
                    <span className="text-slate-500 block">Kecocokan ATS:</span>
                    <strong className="text-emerald-400 font-mono">{app.matchScore}% Match</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Skor Sesi Latihan:</span>
                    <strong className="text-indigo-400 font-mono">{app.lastSimScore} Pts</strong>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>Jadwal Wawancara Nyata: {app.actualInterviewDate}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      const sessionId = `ai-sess-custom-${Date.now()}`;
                      sessionStorage.setItem(`ai_session_config_${sessionId}`, JSON.stringify({
                        positionId: 'pos-custom-1',
                        positionName: app.jobTitle,
                        companyId: 'comp-custom-1',
                        companyName: app.companyName,
                        experienceLevel: 'junior',
                        difficulty: 'medium',
                        language: 'indonesia',
                        durationMode: 'standard',
                        hrVoiceId: 'sarah-friendly',
                        techVoiceId: 'andi-professional'
                      }));
                      window.location.href = `/interview/waiting-room?id=${sessionId}`;
                    }
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1"
                >
                  <Award className="w-3.5 h-3.5" /> Mulai Simulasi Latihan
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
