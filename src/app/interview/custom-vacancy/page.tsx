'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, FileText, Upload, Globe, HelpCircle, ChevronRight, Check } from 'lucide-react';
import CVMatchOverview from '@/components/vacancy/CVMatchOverview';
import CVRequirementComparison from '@/components/vacancy/CVRequirementComparison';

export default function CustomVacancyPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'paste' | 'manual' | 'upload' | 'url'>('paste');
  const [cvText, setCvText] = useState('React, Next.js, TypeScript, Tailwind CSS, SQL, Git, HTML5, CSS3');
  const [customCompany, setCustomCompany] = useState('');
  const [customPosition, setCustomPosition] = useState('');
  const [vacancyText, setVacancyText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [parsedResult, setParsedResult] = useState<any>(null);
  const [cvMatchReport, setCvMatchReport] = useState<any>(null);

  const handleUseExample = () => {
    setVacancyText(`Full Stack Engineer
PT Siaga Abdi Utama
Jakarta Raya, Indonesia
Di Kantor

Requirements:
- Pengalaman 1-2 tahun sebagai Fullstack Developer
- Menguasai PHP, CodeIgniter, Laravel, Go
- Menguasai JavaScript, React.js, Next.js
- Pemahaman Relational Database SQL dan NoSQL
- Berpengalaman dengan Caching, CI/CD, dan Secure Programming
- Terbiasa bekerja dalam Agile development environment`);
    setCustomCompany('PT Siaga Abdi Utama');
    setCustomPosition('Full Stack Engineer');
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/vacancies/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: vacancyText })
      });
      const data = await res.json();
      if (data.success) {
        setParsedResult(data.parsed);
        if (data.parsed.companyName && !customCompany) {
          setCustomCompany(data.parsed.companyName);
        }
        if (data.parsed.jobTitle && !customPosition) {
          setCustomPosition(data.parsed.jobTitle);
        }

        // Fetch CV match report based on dynamic cvText input
        const cleanCvSkills = cvText.split(',').map(s => s.trim()).filter(Boolean);
        const matchRes = await fetch('/api/vacancies/custom-vac-1/match-cv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vacancyText,
            cvSkills: cleanCvSkills.length > 0 ? cleanCvSkills : ['React', 'Next.js', 'TypeScript']
          })
        });
        const matchData = await matchRes.json();
        if (matchData.success) {
          setCvMatchReport(matchData.matchReport);
        }
      }
    } catch (err) {
      console.error('Error analyzing vacancy:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleConfirm = () => {
    if (typeof window !== 'undefined') {
      const sessionId = `ai-sess-custom-${Date.now()}`;
      sessionStorage.setItem(`ai_session_config_${sessionId}`, JSON.stringify({
        positionId: 'pos-custom-1',
        positionName: customPosition || parsedResult?.jobTitle || 'Full Stack Engineer',
        companyId: 'comp-custom-1',
        companyName: customCompany || parsedResult?.companyName || 'Perusahaan Kustom',
        experienceLevel: 'junior',
        difficulty: 'medium',
        language: 'indonesia',
        durationMode: 'standard',
        hrVoiceId: 'sarah-friendly',
        techVoiceId: 'andi-professional',
        customVacancyText: vacancyText,
        cvSkills: cvText.split(',').map(s => s.trim()).filter(Boolean)
      }));
      router.push(`/interview/waiting-room?id=${sessionId}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-300">
      
      <Link href="/interview/positions" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          Flagship Feature
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Tambahkan Lowongan yang Anda Lamar</h1>
        <p className="text-slate-400 text-sm">Sesuaikan simulasi wawancara dengan posisi, perusahaan, teknologi, dan tanggung jawab sebenarnya.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
        {[
          { id: 'paste', label: 'Tempel Teks', icon: FileText },
          { id: 'manual', label: 'Isi Manual', icon: Upload },
          { id: 'upload', label: 'Unggah Dokumen', icon: Upload },
          { id: 'url', label: 'Masukkan URL', icon: Globe }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold border-t border-x border-transparent transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-900 border-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-350'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Input */}
        <div className="lg:col-span-6 space-y-6">
          {activeTab === 'paste' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white">Detail Target Lowongan & Perusahaan:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Nama Perusahaan</label>
                  <input
                    type="text"
                    value={customCompany}
                    onChange={(e) => setCustomCompany(e.target.value)}
                    placeholder="Contoh: PT Tokopedia"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Posisi Pekerjaan</label>
                  <input
                    type="text"
                    value={customPosition}
                    onChange={(e) => setCustomPosition(e.target.value)}
                    placeholder="Contoh: Frontend Developer"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <h3 className="text-sm font-bold text-white pt-2">Tempel Deskripsi Lowongan & Kualifikasi Wajib:</h3>
              <textarea
                rows={6}
                value={vacancyText}
                onChange={(e) => setVacancyText(e.target.value)}
                placeholder={`Requirements:\n- PHP, CodeIgniter, Laravel\n- React, Next.js`}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 font-sans"
              ></textarea>

              <h3 className="text-sm font-bold text-white pt-2">Keahlian di CV Anda (Pisahkan dengan koma):</h3>
              <textarea
                rows={3}
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="React, Next.js, TypeScript, Tailwind CSS, SQL, Git..."
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 font-sans"
              ></textarea>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleUseExample}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-indigo-300 text-xs font-semibold border border-slate-700 transition"
                  >
                    Gunakan Contoh
                  </button>
                  <button
                    type="button"
                    onClick={() => setVacancyText('')}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-700 transition"
                  >
                    Hapus Semua
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !vacancyText.trim()}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
                >
                  {isAnalyzing ? 'Menganalisis...' : 'Analisis Lowongan'}
                </button>
              </div>
            </div>
          )}

          {activeTab !== 'paste' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-xl">
              <FileText className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Metode Input Terbatas</h3>
              <p className="text-xs text-slate-400">Silakan gunakan tab **"Tempel Teks"** untuk melakukan salin/tempel lowongan kerja secara instan dari LinkedIn/Glints/JobStreet.</p>
              <button
                onClick={() => setActiveTab('paste')}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 hover:bg-slate-750 transition"
              >
                Kembali ke Tempel Teks
              </button>
            </div>
          )}
        </div>

        {/* Right Form: Extraction & Match Results */}
        <div className="lg:col-span-6 space-y-6">
          {isAnalyzing ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <div className="w-8 h-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mx-auto" />
              <h4 className="text-sm font-bold text-white pt-2">AI Sedang Menganalisis Lowongan</h4>
              <p className="text-xs text-slate-400">Membersihkan bar iklan, mengekstrak kualifikasi, dan mengidentifikasi persyaratan wajib...</p>
            </div>
          ) : parsedResult ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Parsed summary card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-850 text-indigo-300 border border-slate-800 uppercase">
                    Hasil Analisis AI
                  </span>
                  <h3 className="text-lg font-bold text-white pt-1">{parsedResult.jobTitle}</h3>
                  <p className="text-xs text-slate-400">{parsedResult.companyName} • {parsedResult.location}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-3 border-t border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Sistem Kerja:</span>
                    <strong className="text-white capitalize">{parsedResult.workArrangement}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Minimal Pengalaman:</span>
                    <strong className="text-white">{parsedResult.experienceYearsMin} Tahun</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Teknologi Must-Have:</span>
                  <div className="flex flex-wrap gap-1">
                    {parsedResult.technicalSkills.mustHave.map((tech: string, i: number) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-emerald-500/20 font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CV match circular overview & gaps */}
              {cvMatchReport && (
                <>
                  <CVMatchOverview match={cvMatchReport} />
                  <CVRequirementComparison match={cvMatchReport} />
                </>
              )}

              {/* Confirm & start */}
              <button
                onClick={handleConfirm}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl transition"
              >
                Konfirmasi & Mulai Simulasi <ChevronRight className="w-5 h-5" />
              </button>

            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500 shadow-xl">
              <Sparkles className="w-10 h-10 text-slate-700 mx-auto mb-2" />
              <p className="text-xs">Hasil analisis persyaratan lowongan dan perbandingan CV akan muncul di sini setelah dianalisis.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
