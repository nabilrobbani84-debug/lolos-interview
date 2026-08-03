import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'InterviewReady - Platform Simulasi Interview Kerja Interactive & Modern',
  description: 'Latihan interview kerja interaktif berdasarkan bidang, posisi, dan tingkat pengalaman. Dapatkan skor, analisis metode STAR, dan saran perbaikan langsung.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
