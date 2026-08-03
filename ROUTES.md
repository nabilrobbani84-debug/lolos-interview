# ROUTES MATRIX - InterviewReady

Dokumen ini mendaftarkan seluruh 30+ rute URL pada platform **InterviewReady** beserta fungsi dan tipe komponennya.

---

## 🗺️ Peta Rute Aplikasi

| Route Path | Deskripsi Halaman | Akses Public / Auth |
| :--- | :--- | :--- |
| `/` | Landing Page Utama | Public |
| `/login` | Halaman Masuk Akun | Public |
| `/register` | Halaman Pendaftaran Akun | Public |
| `/forgot-password` | Lupa Kata Sandi | Public |
| `/fields` | Katalog Seluruh Bidang Pekerjaan | Public |
| `/fields/[slug]` | Detail Bidang & Daftar Posisi | Public |
| `/positions/[slug]` | Detail Posisi & Ringkasan Kompetensi | Public |
| `/simulation/setup` | Formulir Pengaturan Simulasi Interview | Public / User |
| `/simulation/session/[id]` | Live Interview Studio Room | User |
| `/simulation/result/[id]` | Hasil Evaluasi & Analisis STAR | User |
| `/questions` | Bank Pertanyaan Interview | Public |
| `/questions/[id]` | Detail Pertanyaan & Tips Recruiter | Public |
| `/articles` | Hub Artikel & Tips Interview | Public |
| `/articles/[slug]` | Detail Bacaan Artikel | Public |
| `/pricing` | Paket Berlangganan (Free vs Pro) | Public |
| `/dashboard` | Dashboard Utama Pengguna | User |
| `/dashboard/history` | Riwayat Sesi Latihan | User |
| `/dashboard/progress` | Grafik & Analisis Perkembangan | User |
| `/dashboard/profile` | Profil & Simulasikan Parser CV | User |
| `/dashboard/settings` | Pengaturan Akun & Kata Sandi | User |
| `/admin` | Overview Dashboard Admin | Admin |
| `/admin/users` | Pengelolaan Pengguna | Admin |
| `/admin/fields` | Pengelolaan Bidang Pekerjaan | Admin |
| `/admin/positions` | Pengelolaan Posisi Pekerjaan | Admin |
| `/admin/questions` | Pengelolaan Bank Pertanyaan | Admin |
| `/admin/articles` | Pengelolaan Artikel & Tips | Admin |
| `/admin/sessions` | Monitoring Sesi Interview | Admin |
| `/admin/settings` | Pengaturan Sistem & Platform | Admin |
| `/privacy` | Kebijakan Privasi | Public |
| `/terms` | Syarat dan Ketentuan | Public |
| `/about` | Tentang InterviewReady | Public |
| `/contact` | Hubungi Kami | Public |
