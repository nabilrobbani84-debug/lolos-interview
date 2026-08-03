import React from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="w-full px-4 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Interview<span className="text-indigo-400">Ready</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Platform simulasi wawancara kerja terdepan di Indonesia. Latih komunikasi, kuasai teknik STAR, dan dapatkan evaluasi otomatis untuk meraih karier impian Anda.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Navigasi Utama</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/fields" className="hover:text-indigo-400 transition">Pilihan Bidang</Link></li>
              <li><Link href="/simulation/setup" className="hover:text-indigo-400 transition">Simulasi Interview</Link></li>
              <li><Link href="/questions" className="hover:text-indigo-400 transition">Bank Pertanyaan</Link></li>
              <li><Link href="/articles" className="hover:text-indigo-400 transition">Tips & Artikel</Link></li>
              <li><Link href="/pricing" className="hover:text-indigo-400 transition">Paket Berlangganan</Link></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Bidang Populer</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/fields/teknologi-informasi" className="hover:text-indigo-400 transition">Teknologi Informasi</Link></li>
              <li><Link href="/fields/desain-kreatif" className="hover:text-indigo-400 transition">Desain & Kreatif</Link></li>
              <li><Link href="/fields/marketing-komunikasi" className="hover:text-indigo-400 transition">Digital Marketing</Link></li>
              <li><Link href="/fields/keuangan-akuntansi" className="hover:text-indigo-400 transition">Keuangan & Akuntansi</Link></li>
              <li><Link href="/fields/interview-umum" className="hover:text-indigo-400 transition">Interview Umum</Link></li>
            </ul>
          </div>

          {/* Information & Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Informasi & Akses</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-indigo-400 transition">Tentang Kami</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition">Hubungi Kami</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-400 transition">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-400 transition">Syarat & Ketentuan</Link></li>
              <li><Link href="/admin" className="hover:text-indigo-400 text-slate-500 transition">Portal Admin</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 InterviewReady. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-400">Privasi</Link>
            <Link href="/terms" className="hover:text-slate-400">Ketentuan</Link>
            <Link href="/contact" className="hover:text-slate-400">Bantuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
