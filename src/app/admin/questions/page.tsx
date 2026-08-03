'use client';

import React, { useState } from 'react';
import { HelpCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { MOCK_QUESTIONS } from '@/lib/mock-data';

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);

  const handleAddQuestion = () => {
    const qText = prompt('Masukkan Teks Pertanyaan Baru:');
    if (qText) {
      const newQ = {
        id: `q-${Date.now()}`,
        fieldId: 'field-1',
        positionId: 'pos-1',
        fieldName: 'Teknologi Informasi',
        positionName: 'Frontend Developer',
        interviewType: 'hr' as const,
        experienceLevel: 'fresh_grad' as const,
        difficulty: 'medium' as const,
        language: 'indonesia' as const,
        question: qText,
        objective: 'Menilai pemahaman umum.',
        answerTips: 'Gunakan struktur kalimat ringkas.',
        sampleAnswer: 'Contoh jawaban standar.'
      };
      setQuestions([...questions, newQ]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-purple-400" /> Pengelolaan Bank Pertanyaan
          </h1>
          <p className="text-xs text-slate-400">Tambah, sunting, atau hapus pertanyaan interview dan rubrik penilaian.</p>
        </div>
        <button
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Tambah Soal Baru
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-4">Teks Pertanyaan</th>
              <th className="p-4">Posisi</th>
              <th className="p-4">Tipe</th>
              <th className="p-4">Kesulitan</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {questions.map((q) => (
              <tr key={q.id} className="hover:bg-slate-950/40">
                <td className="p-4 font-medium text-white max-w-sm">{q.question}</td>
                <td className="p-4 text-indigo-400">{q.positionName || 'Umum'}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                    {q.interviewType.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{q.difficulty}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => alert('Edit Pertanyaan')} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setQuestions(questions.filter(i => i.id !== q.id))} className="p-1.5 bg-rose-950/50 hover:bg-rose-900 text-rose-400 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
