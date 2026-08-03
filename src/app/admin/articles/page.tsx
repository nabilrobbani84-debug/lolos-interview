'use client';

import React, { useState } from 'react';
import { FileText, Plus, Edit, Trash2 } from 'lucide-react';
import { MOCK_ARTICLES } from '@/lib/mock-data';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState(MOCK_ARTICLES);

  const handleAddArticle = () => {
    const title = prompt('Masukkan Judul Artikel Baru:');
    if (title) {
      const newArt = {
        id: `art-${Date.now()}`,
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        excerpt: 'Ringkasan artikel baru.',
        content: 'Isi artikel lengkap.',
        coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
        author: 'Admin Team',
        readTime: '3 Menit Baca',
        publishedAt: '2026-08-02',
        category: 'Tips Interview'
      };
      setArticles([...articles, newArt]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" /> Pengelolaan Artikel & Tips
          </h1>
          <p className="text-xs text-slate-400">Buat artikel panduan baru atau edit materi pembelajaran.</p>
        </div>
        <button
          onClick={handleAddArticle}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Tulis Artikel Baru
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-4">Judul Artikel</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Penulis</th>
              <th className="p-4">Tanggal Rilis</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {articles.map((a) => (
              <tr key={a.id} className="hover:bg-slate-950/40">
                <td className="p-4 font-bold text-white max-w-sm">{a.title}</td>
                <td className="p-4 text-indigo-400">{a.category}</td>
                <td className="p-4 text-slate-400">{a.author}</td>
                <td className="p-4 text-slate-400">{a.publishedAt}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => alert('Edit Artikel')} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setArticles(articles.filter(i => i.id !== a.id))} className="p-1.5 bg-rose-950/50 hover:bg-rose-900 text-rose-400 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
