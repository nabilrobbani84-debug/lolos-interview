'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Lupa Kata Sandi?</h1>
          <p className="text-xs text-slate-400">Masukkan email Anda untuk menerima instruksi pemulihan kata sandi.</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Alamat Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30"
            >
              Kirim Tautan Pemulihan
            </button>
          </form>
        ) : (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-3 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-semibold text-emerald-300">Email Pemulihan Terkirim!</h3>
            <p className="text-xs text-slate-300">
              Silakan periksa kotak masuk email <strong className="text-white">{email}</strong> untuk mengatur ulang kata sandi Anda.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 hover:text-indigo-300">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Halaman Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}
