'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Building2, ArrowRight, ArrowLeft, Users, Briefcase, Network, Globe, Sparkles } from 'lucide-react';
import { MOCK_COMPANIES, MOCK_POSITIONS } from '@/lib/mock-data';

function CompanySelectionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const positionSlug = searchParams.get('position') || 'frontend-developer';

  const selectedPosition = MOCK_POSITIONS.find(p => p.slug === positionSlug) || MOCK_POSITIONS[0];

  const handleSelectCompany = (companySlug: string) => {
    router.push(`/interview/setup?position=${positionSlug}&company=${companySlug}`);
  };

  return (
    <div className="space-y-8">
      {/* Target Position Info Banner */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between text-xs text-slate-300">
        <div>
          <span>Posisi Terpilih: </span>
          <strong className="text-white font-bold">{selectedPosition.name}</strong>
        </div>
        <Link href="/interview/positions" className="text-indigo-400 hover:text-indigo-300 font-semibold">
          Ganti Posisi
        </Link>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_COMPANIES.map((company) => (
          <div
            key={company.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-6 shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{company.name}</h3>
                  <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">{company.industry}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{company.description}</p>

              {/* Company Meta */}
              <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Ukuran: {company.companySize}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Network className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kerja: {company.workSystem}</span>
                </div>
              </div>

              {/* Culture Description */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px]">
                <strong className="text-slate-300 block mb-0.5">Budaya Perusahaan:</strong>
                <p className="text-slate-400 italic">"{company.cultureDescription}"</p>
              </div>

              {/* Tech Stack */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Teknologi yang Digunakan:</span>
                <div className="flex flex-wrap gap-1">
                  {company.technologyStack.map((tech, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectCompany(company.slug)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg"
            >
              Pilih & Lanjutkan Ke Setup <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Custom Company Option */}
      <div className="bg-slate-900/60 border border-dashed border-indigo-500/30 rounded-3xl p-8 hover:border-indigo-500 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl mt-8">
        <div className="space-y-2 max-w-xl text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Kustomisasi Penuh
          </div>
          <h3 className="text-xl font-bold text-white">Gunakan Lowongan & Ketentuan Kustom</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ingin melamar ke perusahaan spesifik yang tidak ada di daftar? Tempel deskripsi lowongan kerja (dari LinkedIn, Glints, JobStreet, dll.) dan sesuaikan langsung dengan CV/kualifikasi Anda.
          </p>
        </div>
        <Link
          href={`/interview/custom-vacancy?position=${positionSlug}`}
          className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-lg whitespace-nowrap"
        >
          Sesuaikan Lowongan & CV <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function InterviewCompaniesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back Button */}
      <Link href="/interview/positions" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Pilihan Posisi
      </Link>

      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white">Pilih Perusahaan Wawancara</h1>
        <p className="text-slate-400 text-sm">Pilih jenis lingkungan perusahaan yang ingin Anda simulasikan.</p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-slate-400 font-medium">Memuat daftar perusahaan...</div>}>
        <CompanySelectionForm />
      </Suspense>
    </div>
  );
}
