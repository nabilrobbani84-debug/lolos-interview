'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Grid, Briefcase, HelpCircle, FileText, PlayCircle, Settings, ArrowLeft } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menu = [
    { name: 'Dashboard Admin', href: '/admin', icon: LayoutDashboard },
    { name: 'Pengguna', href: '/admin/users', icon: Users },
    { name: 'Bidang Pekerjaan', href: '/admin/fields', icon: Grid },
    { name: 'Posisi Pekerjaan', href: '/admin/positions', icon: Briefcase },
    { name: 'Bank Pertanyaan', href: '/admin/questions', icon: HelpCircle },
    { name: 'Artikel Tips', href: '/admin/articles', icon: FileText },
    { name: 'Sesi Interview', href: '/admin/sessions', icon: PlayCircle },
    { name: 'Pengaturan Sistem', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen border-r border-slate-800 flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-white text-lg">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs">
              AD
            </div>
            Admin Panel
          </Link>
        </div>

        <nav className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Platform Utama
        </Link>
      </div>
    </aside>
  );
}
