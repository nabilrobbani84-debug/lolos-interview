'use client';

import React from 'react';
import { Users, Search, Plus, Trash2, Edit } from 'lucide-react';
import { CURRENT_DEMO_USER } from '@/lib/mock-data';

export default function AdminUsersPage() {
  const users = [
    CURRENT_DEMO_USER,
    { id: 'user-2', fullName: 'Budi Santoso', email: 'budi.santoso@example.com', role: 'user', subscriptionType: 'pro', createdAt: '2026-03-10' },
    { id: 'user-3', fullName: 'Siti Aminah', email: 'siti.aminah@example.com', role: 'user', subscriptionType: 'free', createdAt: '2026-05-22' },
    { id: 'user-4', fullName: 'Admin Utama', email: 'admin@interviewready.id', role: 'admin', subscriptionType: 'pro', createdAt: '2026-01-01' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" /> Pengelolaan Pengguna
          </h1>
          <p className="text-xs text-slate-400">Daftar pengguna terdaftar dan status paket berlangganan.</p>
        </div>
        <button
          onClick={() => alert('Simulasi Tambah Pengguna Baru')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Tambah User
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-4">Nama Lengkap</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Paket</th>
              <th className="p-4">Tanggal Daftar</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-950/40">
                <td className="p-4 font-bold text-white">{u.fullName}</td>
                <td className="p-4 text-slate-400">{u.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-800 text-slate-300'}`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${u.subscriptionType === 'pro' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                    {u.subscriptionType.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{u.createdAt}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 bg-rose-950/50 hover:bg-rose-900 text-rose-400 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
