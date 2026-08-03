'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, ArrowLeft, Upload, FileText, CheckCircle2, Save, Trash2 } from 'lucide-react';
import { CURRENT_DEMO_USER } from '@/lib/mock-data';

export default function ProfilePage() {
  const [fullName, setFullName] = useState(CURRENT_DEMO_USER.fullName);
  const [education, setEducation] = useState('S1 Teknik Informatika - Universitas Indonesia');
  const [targetPos, setTargetPos] = useState('Frontend Developer');
  const [cvUploaded, setCvUploaded] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSimulateCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvUploaded(true);
      alert(`Berkas CV "${e.target.files[0].name}" berhasil diunggah. Sistem telah membaca 8 keahlian utama Anda untuk personalisasi pertanyaan.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <User className="w-8 h-8 text-indigo-400" /> Profil Profesional & Unggah CV
        </h1>
        <p className="text-slate-400 text-sm">Kelola informasi diri Anda agar pertanyaan interview dapat dibuat secara lebih personal.</p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Data profil berhasil disimpan!
        </div>
      )}

      {/* CV PDF Upload Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" /> Unggah Curiculum Vitae (CV) PDF
        </h3>
        <p className="text-xs text-slate-400">
          Sistem AI dapat menganalisis CV Anda untuk memunculkan pertanyaan interview khusus seputar proyek dan pengalaman kerja nyata Anda.
        </p>

        {cvUploaded ? (
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">CV_Ahmad_Fauzi_Frontend_Dev.pdf</h4>
                <p className="text-[11px] text-emerald-400">Tersinkronisasi • PDF (1.2 MB)</p>
              </div>
            </div>
            <button
              onClick={() => setCvUploaded(false)}
              className="p-2 text-rose-400 hover:text-rose-300 hover:bg-slate-900 rounded-lg transition"
              title="Hapus Berkas CV"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-8 text-center space-y-3 bg-slate-950/50 transition">
            <Upload className="w-8 h-8 text-slate-500 mx-auto" />
            <div>
              <p className="text-xs font-bold text-white">Pilih Berkas CV Anda (Hanya Format PDF)</p>
              <p className="text-[11px] text-slate-500">Maksimal ukuran berkas 5MB</p>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleSimulateCVUpload}
              className="hidden"
              id="cv-file-input"
            />
            <label
              htmlFor="cv-file-input"
              className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer transition shadow-md"
            >
              Unggah PDF CV
            </label>
          </div>
        )}
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Informasi Diri</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Nama Lengkap</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Target Posisi Pekerjaan</label>
            <input
              type="text"
              value={targetPos}
              onChange={(e) => setTargetPos(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-300">Pendidikan & Jurusan</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/30"
        >
          <Save className="w-4 h-4" /> Simpan Perubahan Profil
        </button>
      </form>

    </div>
  );
}
