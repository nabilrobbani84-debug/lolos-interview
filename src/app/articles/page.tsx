'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { MOCK_ARTICLES } from '@/lib/mock-data';

export default function ArticlesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          Panduan & Artikel Tips Interview
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Strategi & Tips Sukses Wawancara Kerja</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Kumpulan panduan praktis penulisan jawaban, teknik mengatasi rasa gugup, perkenalan diri, hingga negosiasi gaji.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_ARTICLES.map((art) => (
          <div key={art.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-indigo-500/40 transition">
            <div className="space-y-4">
              <div className="h-52 overflow-hidden relative">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-slate-900/90 backdrop-blur-md text-indigo-300 text-xs font-semibold rounded-full border border-slate-700">
                  {art.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{art.author}</span> •
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-400" /> {art.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{art.excerpt}</p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/articles/${art.slug}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white text-xs font-semibold text-slate-200 transition"
              >
                Baca Artikel Selengkapnya <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
