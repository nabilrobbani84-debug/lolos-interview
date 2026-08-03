# PROJECT PLAN - InterviewReady

Dokumen ini memetakan tahapan pengembangan platform **InterviewReady** dari perencanaan awal hingga rilis siap produksi.

---

## 📌 Rencana Tahapan Pengembangans

### Tahap 1: Fondasi & Dokumentasi System (Selesai)
- [x] Perencanaan arsitektur dan penyiapan berkas dokumentasi (`README.md`, `PROJECT_PLAN.md`, `DATABASE_SCHEMA.md`, `DESIGN_SYSTEM.md`, `STYLE_GUIDE.md`, `FEATURES.md`, `ROUTES.md`).
- [x] Desain skema basis data PostgreSQL & Supabase client integration layer.

### Tahap 2: UI Design System & Landing Page
- [ ] Penyiapan token desain Tailwind CSS (Deep Slate, Indigo Primary, Emerald Success, Rose Danger, Amber Warning).
- [ ] Pengemasan komponen dasar (Navbar, Footer, Modal, Card, Button, Badge, Skeleton).
- [ ] Halaman Utama (Hero Section, Statistics, Workflow, Popular Categories, Platform Benefits, Testimonials, CTA).

### Tahap 3: Directory & Position Detail Explorer
- [ ] Halaman Katalog Bidang (`/fields`) dengan filter pencarian dan kategori populer.
- [ ] Halaman Detail Bidang (`/fields/[slug]`) menampilkan daftar posisi dan kompetensi.
- [ ] Halaman Detail Posisi (`/positions/[slug]`) dengan ringkasan keahlian yang dinilai, estimasi durasi, dan contoh pertanyaan.

### Tahap 4: Interview Setup & Live Simulation Studio
- [ ] Formulir Pengaturan Simulasi (`/simulation/setup`) multi-step (Bidang, Posisi, Exp, Jenis Interview, Kesulitan, Bahasa, Durasi, Mode Teks/Suara).
- [ ] Live Simulation Studio (`/simulation/session/[id]`):
  - Pewawancara virtual avatar (Interviewer Persona).
  - Timer interaktif & indikator progress.
  - Textarea interaktif dengan word counter.
  - Live Audio Recorder dengan waveform visualizer & STT transcription logic.
  - Petunjuk jawaban (Hint) & fitur lewati pertanyaan.

### Tahap 5: Dynamic Evaluation Engine & Result Page
- [ ] Engine evaluasi jawaban (Analisis Relevansi, Kejelasan, Pengetahuan Teknis, Problem Solving, & Komunikasi).
- [ ] Detector Metode STAR (Situation, Task, Action, Result).
- [ ] Halaman Hasil Evaluasi (`/simulation/result/[id]`):
  - Radar chart 6 aspek penilaian.
  - Status pencapaian STAR.
  - Detail per-pertanyaan, contoh jawaban yang diperbaiki, & tips perbaikan.
  - Ekspor laporan & bagikan skor.

### Tahap 6: User Dashboard, Question Bank & Content Hub
- [ ] Dashboard Pengguna (`/dashboard`): Statistik latihan, streak, grafik perkembangan nilai, rekomendasi personal, riwayat latihan (`/dashboard/history`), dan chart kemampuan (`/dashboard/progress`).
- [ ] Profil Pengguna & Upload CV PDF (`/dashboard/profile`).
- [ ] Bank Pertanyaan (`/questions` & `/questions/[id]`) dengan filter bidang, tingkat pengalaman, dan toggle contoh jawaban.
- [ ] Hub Tips & Artikel Interview (`/articles` & `/articles/[slug]`).
- [ ] Halaman Paket Berlangganan Gratis vs Pro (`/pricing`).

### Tahap 7: Complete Admin Suite
- [ ] Admin Dashboard overview (`/admin`).
- [ ] Pengelolaan Bidang & Posisi (`/admin/fields`, `/admin/positions`).
- [ ] Pengelolaan Pertanyaan & Artikel (`/admin/questions`, `/admin/articles`).
- [ ] Pengelolaan Sesi & Pengguna (`/admin/sessions`, `/admin/users`).

---

## 📐 Target Kualitas Proyek
- **Zero Runtime Error**: Semua route dan interaksi bebas dari exception.
- **Instant Demo Accessibility**: Dapat langsung dicoba tanpa hambatan API Key eksternal.
- **Mobile-First Responsive**: Tampilan presisi di Smartphone, Tablet, dan Desktop.
