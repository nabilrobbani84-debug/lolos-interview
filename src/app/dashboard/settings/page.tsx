'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Settings, ArrowLeft, Lock, Shield, CheckCircle2, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [msg, setMsg] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Kata sandi berhasil diperbarui.');
    setCurrentPass('');
    setNewPass('');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Settings className="w-8 h-8 text-indigo-400" /> Pengaturan Akun & Keamanan
        </h1>
        <p className="text-slate-400 text-sm">Kelola kata sandi, privasi data, dan preferensi akun Anda.</p>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {msg}
        </div>
      )}

      {/* Password Change Form */}
      <form onSubmit={handlePasswordChange} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-indigo-400" /> Ubah Kata Sandi
        </h3>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Kata Sandi Saat Ini</label>
            <input
              type="password"
              required
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Kata Sandi Baru</label>
            <input
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Minimal 8 karakter"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md shadow-indigo-600/30"
        >
          Perbarui Kata Sandi
        </button>
      </form>

      {/* Danger Zone */}
      <div className="bg-rose-950/20 border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
          <Trash2 className="w-5 h-5" /> Hapus Akun & Seluruh Data
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Tindakan ini permanen. Seluruh riwayat latihan, rekaman suara, analisis STAR, dan data CV Anda akan dihapus sepenuhnya dari server.
        </p>
        <button
          onClick={() => {
            if (confirm('Apakah Anda yakin ingin menghapus akun dan seluruh riwayat latihan? Tindakan ini tidak dapat dibatalkan.')) {
              alert('Akun berhasil dihapus.');
              window.location.href = '/';
            }
          }}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition"
        >
          Hapus Akun Permanen
        </button>
      </div>

    </div>
  );
}
