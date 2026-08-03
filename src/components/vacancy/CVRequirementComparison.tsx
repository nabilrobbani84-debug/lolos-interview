'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, XCircle } from 'lucide-react';
import { VacancyCvMatch } from '@/lib/types';

interface CVRequirementComparisonProps {
  match: VacancyCvMatch;
}

export default function CVRequirementComparison({ match }: CVRequirementComparisonProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      <h3 className="text-base font-bold text-white">Bandingan Persyaratan Lowongan vs CV</h3>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="p-4">Persyaratan Lowongan</th>
              <th className="p-4">Status Pencocokan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {match.matchedRequirements.map((req, idx) => (
              <tr key={`matched-${idx}`} className="hover:bg-slate-900/20">
                <td className="p-4 font-bold text-white">{req}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Cocok
                  </span>
                </td>
              </tr>
            ))}

            {match.partiallyMatchedRequirements.map((req, idx) => (
              <tr key={`partial-${idx}`} className="hover:bg-slate-900/20">
                <td className="p-4 font-bold text-white">{req}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-indigo-300 font-semibold bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    <AlertTriangle className="w-3.5 h-3.5" /> Sebagian Cocok
                  </span>
                </td>
              </tr>
            ))}

            {match.missingRequirements.map((req, idx) => (
              <tr key={`missing-${idx}`} className="hover:bg-slate-900/20">
                <td className="p-4 font-bold text-white">{req}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-rose-400 font-semibold bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                    <XCircle className="w-3.5 h-3.5" /> Belum Ditemukan
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
