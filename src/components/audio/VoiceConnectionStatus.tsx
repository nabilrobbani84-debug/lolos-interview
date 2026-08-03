'use client';

import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export default function VoiceConnectionStatus() {
  return (
    <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between text-[11px] text-slate-400">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Suara pewawancara merupakan <strong>suara sintetis berbasis AI</strong>.</span>
      </div>
      <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-350">
        AI Voice Active
      </span>
    </div>
  );
}
