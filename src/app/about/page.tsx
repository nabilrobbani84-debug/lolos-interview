import React from 'react';
import { Sparkles, Target, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Tentang InterviewReady</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Membantu jutaan talenta Indonesia membangun rasa percaya diri dan meraih pekerjaan impian melalui latihan wawancara berbasis teknologi modern.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Misi Kami</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Menyediakan platform latihan wawancara kerja yang realistis, mudah diakses, dan memberikan masukan jawaban berkualitas tinggi.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Dampak Sosial</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Mendukung fresh graduate, siswa SMK, dan mahasiswa di seluruh Indonesia untuk bersaing secara adil di pasar kerja global.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Metode Teruji</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Menggunakan kerangka kerja STAR (Situation, Task, Action, Result) yang diakui secara global oleh para praktisi HR.</p>
        </div>
      </div>
    </div>
  );
}
