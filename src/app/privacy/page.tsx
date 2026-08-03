import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6 text-slate-300">
      <h1 className="text-3xl font-extrabold text-white">Kebijakan Privasi (Privacy Policy)</h1>
      <p className="text-xs text-slate-400">Terakhir Diperbarui: 3 Agustus 2026</p>
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 text-xs leading-relaxed">
        <h2 className="text-base font-bold text-white">1. Pengumpulan Data</h2>
        <p>InterviewReady menghormati privasi Anda. Kami hanya mengumpulkan informasi yang Anda berikan secara langsung, seperti nama, email, riwayat simulasi, dan data CV yang Anda unggah secara sukarela untuk keperluan analisis simulasi.</p>
        
        <h2 className="text-base font-bold text-white">2. Penggunaan Data Rekaman Suara</h2>
        <p>Rekaman suara Anda diproses hanya untuk menghasilkan transkrip teks secara real-time dan evaluasi jawaban. Berkas suara tidak pernah dijual atau dibagikan kepada pihak ketiga.</p>
        
        <h2 className="text-base font-bold text-white">3. Hak Pengguna</h2>
        <p>Anda berhak memperbarui, mengunduh, atau menghapus seluruh data akun Anda kapan saja melalui menu Pengaturan Akun di Dashboard.</p>
      </div>
    </div>
  );
}
