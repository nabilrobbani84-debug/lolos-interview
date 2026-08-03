import React from 'react';
import { UserCheck, ShieldCheck, Sparkles } from 'lucide-react';

interface InterviewerAvatarProps {
  name?: string;
  role?: string;
  company?: string;
  style?: string;
  difficulty?: string;
}

export default function InterviewerAvatar({
  name = 'Sarah Wijaya',
  role = 'Senior HR Recruitment Manager',
  company = 'Nusantara Digital Corp',
  style = 'Profesional, Berwawasan & Komunikatif',
  difficulty = 'Menengah'
}: InterviewerAvatarProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-xl flex items-start gap-4">
      <div className="relative flex-shrink-0">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
          SW
        </div>
        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" title="Virtual Recruiter Active"></span>
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg text-white leading-tight">{name}</h3>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 font-medium border border-slate-700">
            {difficulty}
          </span>
        </div>

        <p className="text-xs font-medium text-indigo-300">{role} • <span className="text-slate-300">{company}</span></p>
        
        <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>Gaya Pewawancara: <strong className="text-slate-200">{style}</strong></span>
        </div>
      </div>
    </div>
  );
}
