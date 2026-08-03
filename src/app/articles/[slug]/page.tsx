'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark, Play } from 'lucide-react';
import { MOCK_ARTICLES } from '@/lib/mock-data';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const article = MOCK_ARTICLES.find(a => a.slug === slug) || MOCK_ARTICLES[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/articles" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Hub Artikel
      </Link>

      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
          {article.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">{article.title}</h1>
        
        <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-800 pb-4">
          <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-indigo-400" /> {article.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-500" /> {article.publishedAt}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-400" /> {article.readTime}</span>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <img src={article.coverImage} alt={article.title} className="w-full h-80 object-cover" />
      </div>

      {/* Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 text-slate-300 leading-relaxed text-sm shadow-xl">
        <p className="text-base font-semibold text-white leading-relaxed">{article.excerpt}</p>
        <div className="prose prose-invert max-w-none space-y-4 whitespace-pre-line">
          {article.content}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 border border-indigo-800/60 rounded-3xl p-8 text-center space-y-4 shadow-xl">
        <h3 className="text-xl font-bold text-white">Langsung Praktikkan Pengetahuan Ini dalam Simulasi Realistis</h3>
        <p className="text-xs text-slate-300">Coba jawab pertanyaan interview behavioral dan dapatkan analisis metode STAR secara otomatis.</p>
        <Link
          href="/simulation/setup"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg"
        >
          <Play className="w-4 h-4 fill-current" /> Mulai Simulasi Sekarang
        </Link>
      </div>

    </div>
  );
}
