'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-white">Hubungi Kami</h1>
        <p className="text-slate-400 text-sm">Ada pertanyaan, saran, atau peluang kemitraan? Kami siap mendengar dari Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white">Informasi Kontak</h3>
          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>support@interviewready.id</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+62 812 3456 7890</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Jakarta South Quarter, Tower A Lt 15, Jakarta Selatan, Indonesia</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Nama Anda</label>
                <input type="text" required placeholder="Ahmad Fauzi" className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Email</label>
                <input type="email" required placeholder="nama@email.com" className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Pesan</label>
                <textarea rows={4} required placeholder="Tuliskan pesan atau pertanyaan Anda di sini..." className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"></textarea>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg">
                Kirim Pesan
              </button>
            </form>
          ) : (
            <div className="p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-emerald-300">Pesan Terkirim!</h3>
              <p className="text-xs text-slate-300">Terima kasih telah menghubungi kami. Tim kami akan membalas pesan Anda segera.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
