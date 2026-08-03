import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6 text-slate-300">
      <h1 className="text-3xl font-extrabold text-white">Syarat dan Ketentuan Layanan</h1>
      <p className="text-xs text-slate-400">Terakhir Diperbarui: 3 Agustus 2026</p>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 text-xs leading-relaxed">
        <h2 className="text-base font-bold text-white">1. Ketentuan Penggunaan</h2>
        <p>Dengan mengakses platform InterviewReady, Anda menyetujui untuk mengoperasikan platform ini secara bijak untuk tujuan latihan persiapan kerja pribadi secara ikhlas dan sah.</p>

        <h2 className="text-base font-bold text-white">2. Hasil Penilaian & Disclaimer</h2>
        <p>Skor dan saran evaluasi yang dihasilkan oleh platform merupakan panduan edukasi untuk mengasah kualitas jawaban, namun bukan jaminan kelulusan dari proses rekrutmen perusahaan nyata.</p>
      </div>
    </div>
  );
}
