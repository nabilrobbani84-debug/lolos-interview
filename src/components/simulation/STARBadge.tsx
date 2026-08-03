import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { STARAnalysis } from '@/lib/types';

interface STARBadgeProps {
  star: STARAnalysis;
}

export default function STARBadge({ star }: STARBadgeProps) {
  const items = [
    { label: 'Situation', key: 'S', active: star.situation, desc: 'Latar belakang kejadian' },
    { label: 'Task', key: 'T', active: star.task, desc: 'Tantangan / Tanggung jawab' },
    { label: 'Action', key: 'A', active: star.action, desc: 'Tindakan personal spesifik' },
    { label: 'Result', key: 'R', active: star.result, desc: 'Hasil & dampak terukur' }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 text-white space-y-3 shadow-lg">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
          Deteksi Metode STAR (Situation, Task, Action, Result)
        </h4>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-400 font-mono border border-slate-700">
          {[star.situation, star.task, star.action, star.result].filter(Boolean).length} / 4 Terpenuhi
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        {items.map((item) => (
          <div
            key={item.key}
            className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
              item.active
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-950/40 border-slate-800 text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold font-mono text-base">{item.key}</span>
              {item.active ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-slate-600" />
              )}
            </div>
            <div>
              <div className="text-xs font-semibold text-white">{item.label}</div>
              <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 italic pt-1 border-t border-slate-800">
        💡 <strong className="text-slate-300">Saran STAR:</strong> {star.feedback}
      </p>
    </div>
  );
}
