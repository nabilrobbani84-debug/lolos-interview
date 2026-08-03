'use client';

import React from 'react';
import { Mic, ShieldCheck, FileText, CheckCircle2, X } from 'lucide-react';

interface MicrophonePermissionDialogProps {
  isOpen: boolean;
  onAllow: () => void;
  onTextMode: () => void;
  onClose: () => void;
}

export default function MicrophonePermissionDialog({
  isOpen,
  onAllow,
  onTextMode,
  onClose
}: MicrophonePermissionDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
          <Mic className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Izinkan Akses Mikrofon</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Mikrofon digunakan untuk menangkap jawaban Anda selama simulasi interview. Suara akan diubah menjadi teks real-time agar pewawancara AI (Sarah & Andi) dapat memahami dan memberikan tanggapan lanjutan.
          </p>
        </div>

        <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-850 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Mikrofon hanya aktif setelah pewawancara selesai berbicara.</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Audio tidak disimpan secara publik dan dapat dihapus kapan saja.</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={onAllow}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl transition flex items-center justify-center gap-2"
          >
            <Mic className="w-4 h-4" />
            Izinkan Mikrofon & Lanjutkan
          </button>

          <button
            type="button"
            onClick={onTextMode}
            className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Gunakan Mode Input Teks Manual
          </button>
        </div>
      </div>
    </div>
  );
}
