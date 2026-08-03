import { FieldCategory, Position, Question, Article, InterviewSession, User, InterviewCompany, Interviewer, TechnicalCase } from './types';

export const MOCK_FIELDS: FieldCategory[] = [
  {
    id: 'field-1',
    name: 'Teknologi Informasi',
    slug: 'teknologi-informasi',
    description: 'Pengembangan perangkat lunak, arsitektur cloud, keamanan siber, data science, dan infrastruktur IT.',
    icon: 'Code',
    positionCount: 20,
    popularPositions: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Analyst', 'DevOps Engineer']
  },
  {
    id: 'field-2',
    name: 'Desain & Industri Kreatif',
    slug: 'desain-kreatif',
    description: 'Perancangan antarmuka pengguna, grafik, animasi, videografi, dan pengarahan kreatif.',
    icon: 'Palette',
    positionCount: 12,
    popularPositions: ['UI/UX Designer', 'Graphic Designer', 'UX Researcher', 'Motion Designer', 'Video Editor']
  },
  {
    id: 'field-3',
    name: 'Marketing & Komunikasi',
    slug: 'marketing-komunikasi',
    description: 'Pemasaran digital, manajemen media sosial, SEO, penulisan konten, dan komunikasi merek.',
    icon: 'TrendingUp',
    positionCount: 11,
    popularPositions: ['Digital Marketing', 'Social Media Specialist', 'SEO Specialist', 'Content Marketing', 'Copywriter']
  },
  {
    id: 'field-4',
    name: 'Bisnis & Manajemen',
    slug: 'bisnis-manajemen',
    description: 'Pengembangan bisnis, analisis strategi, manajemen operasional, dan konsultasi bisnis.',
    icon: 'Briefcase',
    positionCount: 10,
    popularPositions: ['Business Development', 'Business Analyst', 'Management Trainee', 'Project Manager', 'Product Manager']
  },
  {
    id: 'field-5',
    name: 'Keuangan & Akuntansi',
    slug: 'keuangan-akuntansi',
    description: 'Laporan keuangan, audit, analisis investasi, perpajakan, dan perbankan.',
    icon: 'DollarSign',
    positionCount: 11,
    popularPositions: ['Accounting Staff', 'Auditor', 'Finance Staff', 'Financial Analyst', 'Tax Consultant']
  },
  {
    id: 'field-6',
    name: 'Sumber Daya Manusia (HR)',
    slug: 'sumber-daya-manusia',
    description: 'Rekrutmen, pengembangan talenta, manajemen penggajian, dan hubungan karyawan.',
    icon: 'Users',
    positionCount: 8,
    popularPositions: ['HR Staff', 'Recruiter', 'Talent Acquisition', 'Training & Development', 'Payroll Staff']
  },
  {
    id: 'field-7',
    name: 'Penjualan & Pelayanan',
    slug: 'penjualan-pelayanan',
    description: 'Penjualan eksekutif, hubungan pelanggan, telemarketing, dan layanan ritel.',
    icon: 'Headphones',
    positionCount: 11,
    popularPositions: ['Sales Executive', 'Account Executive', 'Customer Service', 'Relationship Manager', 'Store Crew']
  },
  {
    id: 'field-8',
    name: 'Teknik & Manufaktur',
    slug: 'teknik-manufaktur',
    description: 'Teknik mesin, elektro, industri, sipil, kontrol kualitas, dan operasi produksi.',
    icon: 'Settings',
    positionCount: 14,
    popularPositions: ['Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer', 'Quality Control', 'Production Staff']
  },
  {
    id: 'field-9',
    name: 'Pendidikan & Pelatihan',
    slug: 'pendidikan-pelatihan',
    description: 'Guru, dosen, tutor bahasa, konselor pendidikan, dan pengembang kurikulum.',
    icon: 'BookOpen',
    positionCount: 10,
    popularPositions: ['Guru', 'Dosen', 'Tutor Bahasa Inggris', 'Konselor Pendidikan', 'Pengajar SD/SMP/SMA']
  },
  {
    id: 'field-10',
    name: 'Kesehatan & Medis',
    slug: 'kesehatan-medis',
    description: 'Dokter, perawat, apoteker, bidan, ahli gizi, dan tenaga laboratorium.',
    icon: 'Activity',
    positionCount: 10,
    popularPositions: ['Dokter', 'Perawat', 'Apoteker', 'Ahli Gizi', 'Tenaga Laboratorium']
  },
  {
    id: 'field-11',
    name: 'Hukum & Legal',
    slug: 'hukum-legal',
    description: 'Legal officer, pengacara, notaris, paralegal, dan spesialis kepatuhan regulasi.',
    icon: 'Shield',
    positionCount: 7,
    popularPositions: ['Legal Staff', 'Legal Officer', 'Paralegal', 'Compliance Officer', 'Legal Consultant']
  },
  {
    id: 'field-12',
    name: 'Perhotelan & Pariwisata',
    slug: 'perhotelan-pariwisata',
    description: 'Resepsionis, chef, housekeeping, barista, manajer hotel, dan penyelenggara acara.',
    icon: 'Coffee',
    positionCount: 10,
    popularPositions: ['Receptionist', 'Chef', 'Waiter/Waitress', 'Barista', 'Event Organizer']
  },
  {
    id: 'field-13',
    name: 'Interview Umum (General)',
    slug: 'interview-umum',
    description: 'Latihan pertanyaan umum untuk perkenalan diri, kelebihan/kekurangan, dan kebiasaan kerja.',
    icon: 'Target',
    positionCount: 14,
    popularPositions: ['Perkenalan Diri', 'Kelebihan & Kekurangan', 'Ekspektasi Gaji', 'Motivasi Kerja', 'Kerja Sama Tim']
  }
];

export const MOCK_POSITIONS: Position[] = [
  {
    id: 'pos-1',
    fieldId: 'field-1',
    fieldName: 'Teknologi Informasi',
    name: 'Frontend Developer',
    slug: 'frontend-developer',
    description: 'Bertanggung jawab membangun tampilan antarmuka web yang responsif, cepat, dan interaktif menggunakan teknologi web modern.',
    competencies: ['HTML/CSS/Tailwind', 'JavaScript (ES6+)', 'React / Next.js', 'Responsive Web Design', 'REST API Integration', 'Web Performance & Debugging', 'Git & Version Control', 'Komunikasi & Teamwork'],
    questionCount: 45,
    estimatedDuration: '15 - 30 Menit',
    sampleQuestions: [
      'Ceritakan tentang proyek Frontend terbaik yang pernah Anda kerjakan.',
      'Bagaimana cara Anda mengoptimalkan performa halaman web yang lambat dimuat?',
      'Bagaimana Anda mengatasi kendala CORS atau error integrasi REST API?'
    ]
  },
  {
    id: 'pos-2',
    fieldId: 'field-1',
    fieldName: 'Teknologi Informasi',
    name: 'Backend Developer',
    slug: 'backend-developer',
    description: 'Mengembangkan arsitektur server, logika bisnis, API endpoints, serta pengelolaan basis data yang aman dan handal.',
    competencies: ['Node.js / Python / Go', 'Database SQL & NoSQL', 'API Design (REST / GraphQL)', 'Authentication & Security', 'System Architecture', 'Unit Testing'],
    questionCount: 40,
    estimatedDuration: '20 - 30 Menit',
    sampleQuestions: [
      'Bagaimana cara Anda merancang skema database untuk sistem skala besar?',
      'Bagaimana Anda menangani konkurensi data dan kendala keandalan API?'
    ]
  },
  {
    id: 'pos-3',
    fieldId: 'field-2',
    fieldName: 'Desain & Industri Kreatif',
    name: 'UI/UX Designer',
    slug: 'ui-ux-designer',
    description: 'Merancang pengalaman pengguna (UX) yang intuitif dan antarmuka visual (UI) yang memukau untuk produk digital.',
    competencies: ['Figma / Sketch', 'User Research & Persona', 'Wireframing & Prototyping', 'Design System Architecture', 'Usability Testing', 'Micro-interactions'],
    questionCount: 38,
    estimatedDuration: '15 - 25 Menit',
    sampleQuestions: [
      'Ceritakan proses desain Anda saat membuat produk dari ide awal hingga pengujian pengguna.',
      'Bagaimana Anda menangani perbedaan pendapat desain dengan tim Developer atau Product Manager?'
    ]
  },
  {
    id: 'pos-4',
    fieldId: 'field-3',
    fieldName: 'Marketing & Komunikasi',
    name: 'Digital Marketing Specialist',
    slug: 'digital-marketing-specialist',
    description: 'Merencanakan dan mengelola kampanye iklan digital (Meta Ads, Google Ads, TikTok Ads) untuk mendorong pertumbuhan bisnis.',
    competencies: ['Google Analytics & Meta Pixel', 'PPC & Performance Ads', 'Content Strategy & Copywriting', 'Funnel Optimization', 'ROI & Data Analysis'],
    questionCount: 35,
    estimatedDuration: '15 - 25 Menit',
    sampleQuestions: [
      'Bagaimana strategi Anda menentukan target audiens untuk produk yang baru diluncurkan?',
      'Ceritakan pengalaman Anda ketika kampanye iklan memiliki return on ad spend (ROAS) rendah.'
    ]
  },
  {
    id: 'pos-5',
    fieldId: 'field-4',
    fieldName: 'Bisnis & Manajemen',
    name: 'Business Analyst',
    slug: 'business-analyst',
    description: 'Menganalisis kebutuhan bisnis, menjembatani tim operasional dan teknologi, serta mengoptimalkan alur proses usaha.',
    competencies: ['Requirements Elicitation', 'Data Analysis & SQL/Excel', 'Process Mapping (BPMN)', 'Stakeholder Management', 'Agile / Scrum Framework'],
    questionCount: 32,
    estimatedDuration: '20 - 30 Menit',
    sampleQuestions: [
      'Bagaimana cara Anda memprioritaskan fitur atau kebutuhan pengguna yang saling bertentangan?',
      'Ceritakan tentang analisis data tersulit yang pernah Anda lakukan untuk mengambil keputusan bisnis.'
    ]
  },
  {
    id: 'pos-6',
    fieldId: 'field-13',
    fieldName: 'Interview Umum (General)',
    name: 'Pertanyaan Interview Umum',
    slug: 'pertanyaan-interview-umum',
    description: 'Pertanyaan fundamental yang pasti ditanyakan di hampir seluruh interview kerja (HR & User).',
    competencies: ['Perkenalan Diri', 'Kelebihan & Kekurangan', 'Negosiasi Gaji', 'Kerja Sama Tim', 'Problem Solving', 'Motivasi Kerja'],
    questionCount: 50,
    estimatedDuration: '10 - 20 Menit',
    sampleQuestions: [
      'Ceritakan singkat tentang diri Anda dan latar belakang karier Anda.',
      'Apa kelebihan dan kekurangan terbesar yang Anda miliki?',
      'Mengapa kami harus menerima Anda di perusahaan ini dibanding pelamar lain?'
    ]
  }
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    fieldId: 'field-1',
    positionId: 'pos-1',
    fieldName: 'Teknologi Informasi',
    positionName: 'Frontend Developer',
    interviewType: 'hr',
    experienceLevel: 'fresh_grad',
    difficulty: 'easy',
    language: 'indonesia',
    question: 'Ceritakan tentang diri Anda dan alasan mengapa Anda tertarik menjadi seorang Frontend Developer.',
    objective: 'Menilai kemampuan komunikasi awal, passion terhadap pengembangan web, serta keselarasan antara latar belakang pendidikan/proyek dengan posisi Frontend.',
    answerTips: 'Gunakan metode perkenalan ringkas: sebutkan nama, latar belakang pendidikan/proyek web terbaru, keahlian utama (React/HTML/CSS), dan motivasi spesifik memilih perusahaan ini.',
    sampleAnswer: 'Halo Bapak/Ibu, terima kasih atas kesempatannya. Saya [Nama], lulusan Teknik Informatika yang memiliki passion mendalam di bidang Frontend Development. Selama studi dan proyek akhir, saya berfokus mengembangkan aplikasi web interaktif menggunakan React dan Tailwind CSS. Saya sangat tertarik bergabung di perusahaan ini karena reputasi perusahaan dalam meluncurkan produk digital yang modern dan user-friendly.',
    avoidMistakes: ['Menceritakan hobi yang tidak relevan.', 'Terlalu lama membaca teks.', 'Tidak menyebutkan alasan tertarik pada posisi tersebut.']
  },
  {
    id: 'q-2',
    fieldId: 'field-1',
    positionId: 'pos-1',
    fieldName: 'Teknologi Informasi',
    positionName: 'Frontend Developer',
    interviewType: 'teknis',
    experienceLevel: 'junior',
    difficulty: 'medium',
    language: 'indonesia',
    question: 'Bagaimana langkah-langkah Anda saat menemukan kendala halaman web lambat dimuat (poor web performance)?',
    objective: 'Menguji pengetahuan teknis nyata tentang optimasi performa web (Core Web Vitals, lazy loading, asset compression, caching, rendering behavior).',
    answerTips: 'Sebutkan alat diagnosis terlebih dahulu (Chrome DevTools / Lighthouse), lalu jelaskan tindakan nyata yang diambil (optimasi gambar, code splitting, memoization).',
    sampleAnswer: 'Pertama, saya melakukan audit menggunakan Google Lighthouse dan Chrome DevTools Network Tab untuk mengidentifikasi bottleneck. Jika penyebabnya adalah ukuran asset gambar yang besar, saya mengonversinya ke format WebP dan menerapkan lazy loading. Untuk bundle JavaScript yang besar, saya menerapkan Route-based Code Splitting. Pada kasus aplikasi React, saya menggunakan memoization (useMemo/useCallback) untuk mencegah re-render yang tidak perlu. Hasilnya waktu pemuatan halaman bisa turun lebih dari 40%.',
    avoidMistakes: ['Hanya menjawab "mengganti koneksi internet".', 'Tidak menyebutkan tools profiling.']
  },
  {
    id: 'q-3',
    fieldId: 'field-1',
    positionId: 'pos-1',
    fieldName: 'Teknologi Informasi',
    positionName: 'Frontend Developer',
    interviewType: 'behavioral',
    experienceLevel: 'mid',
    difficulty: 'hard',
    language: 'indonesia',
    question: 'Ceritakan pengalaman Anda ketika harus menghadapi tenggat waktu (deadline) yang sangat ketat namun ada perubahan spesifikasi fitur dari Product Manager.',
    objective: 'Menilai kemampuan pengelolaan tekanan, negosiasi profesional, adaptabilitas, serta komunikasi dengan stakeholder.',
    answerTips: 'Gunakan metode STAR (Situation, Task, Action, Result). Jelaskan situasi secara objektif, tindakan negosiasi scope vs waktu, dan hasil sukses yang terukur.',
    sampleAnswer: 'Pada proyek e-commerce sebelumnya, kami memiliki deadline rilis 3 hari lagi (Situation). Namun PM meminta tambahan fitur pembayaran baru (Task). Saya segera mengadakan rapat sinkronisasi cepat untuk menganalisis dampaknya. Saya memberikan opsi breakdown: merilis versi MVP dengan fitur utama sesuai jadwal, lalu fitur tambahan disusulkan di sprint berikutnya (Action). Hasilnya, produk dapat dirilis tepat waktu tanpa bug krusial, dan fitur tambahan selesai 4 hari kemudian sesuai kesepakatan (Result).',
    avoidMistakes: ['Menyalahkan Product Manager.', 'Langsung menyetujui tanpa memperhitungkan risiko teknis.']
  },
  {
    id: 'q-4',
    fieldId: 'field-13',
    positionId: 'pos-6',
    fieldName: 'Interview Umum (General)',
    positionName: 'Pertanyaan Interview Umum',
    interviewType: 'hr',
    experienceLevel: 'junior',
    difficulty: 'easy',
    language: 'indonesia',
    question: 'Apa kelebihan dan kekurangan terbesar yang Anda miliki, dan bagaimana Anda mengelolanya?',
    objective: 'Menilai self-awareness (kesadaran diri), kejujuran, serta komitmen pengembangan diri profesional.',
    answerTips: 'Untuk kelebihan: hubungkan dengan produktivitas kerja. Untuk kekurangan: pilih hal profesional nyata namun berikan solusi konkret yang sedang Anda jalankan.',
    sampleAnswer: 'Kelebihan utama saya adalah ketelitian dan kemampuan memecahkan masalah secara sistematis. Kekurangan saya dahulu adalah merasa kurang nyaman berbicara di depan audiens besar. Untuk mengatasinya, saya aktif mengikuti kelas public speaking internal dan secara sukarela menjadi presenter dalam rapat tim teknis mingguan. Sekarang kemampuan komunikasi saya meningkat signifikan.',
    avoidMistakes: ['Menjawab tidak punya kekurangan.', 'Mengatakan kekurangan palsu seperti "saya terlalu pekerja keras".']
  },
  {
    id: 'q-5',
    fieldId: 'field-13',
    positionId: 'pos-6',
    fieldName: 'Interview Umum (General)',
    positionName: 'Pertanyaan Interview Umum',
    interviewType: 'hr',
    experienceLevel: 'fresh_grad',
    difficulty: 'medium',
    language: 'indonesia',
    question: 'Berapa ekspektasi gaji Anda untuk posisi ini dan apa dasar pertimbangannya?',
    objective: 'Menguji riset pasar pelamar, tingkat percaya diri, serta fleksibilitas negosiasi.',
    answerTips: 'Berikan rentang gaji (range) yang realistis berdasarkan standar industri untuk level Anda, lalu kaitkan dengan nilai tambah yang Anda berikan.',
    sampleAnswer: 'Berdasarkan riset pasar untuk posisi ini di kota ini serta mempertimbangkan kualifikasi dan pengalaman proyek yang saya miliki, ekspektasi gaji saya berada di kisaran Rp 6.000.000 hingga Rp 8.000.000 per bulan. Namun saya sangat terbuka untuk berdiskusi lebih lanjut menyesuaikan dengan benefit dan paket kompensasi yang berlaku di perusahaan ini.',
    avoidMistakes: ['Menyebutkan angka pasti tanpa rentang.', 'Mengaku tidak tahu standar gaji.']
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Panduan Lengkap Menguasai Metode STAR saat Behavioral Interview',
    slug: 'panduan-lengkap-metode-star-behavioral-interview',
    excerpt: 'Metode STAR (Situation, Task, Action, Result) adalah rahasia utama menjawab pertanyaan interview behavioral dengan terstruktur dan memikat recruiter.',
    content: `
### Apa itu Metode STAR?
Saat recruiter bertanya *"Ceritakan pengalaman Anda saat terjadi konflik tim"*, mereka tidak mencari cerita panjang tanpa arah. Mereka mencari struktur yang jelas melalui 4 elemen:

1. **Situation (Situasi)**: Latar belakang singkat dari kejadian nyata yang Anda alami.
2. **Task (Tugas)**: Tanggung jawab atau tantangan spesifik yang harus diselesaikan.
3. **Action (Tindakan)**: Langkah nyata yang **Anda** ambil secara personal (gunakan kata "Saya", bukan hanya "Tim").
4. **Result (Hasil)**: Dampak terukur yang didapatkan (disertai angka/persentase jika memungkinkan).

---

### Contoh Penerapan Nyata
> **Pertanyaan**: Ceritakan pengalaman Anda menangani proyek gagal.
> **Jawaban**:
> - **Situation**: Di semester akhir, sistem registrasi mahasiswa yang kami buat mengalami kecelakaan server saat trafik puncak.
> - **Task**: Saya bertugas sebagai lead developer untuk memulihkan akses database dalam waktu di bawah 2 jam.
> - **Action**: Saya melakukan isolasi query lambat, menerapkan database indexing pada tabel utama, serta menyalakan Redis caching server.
> - **Result**: Sistem kembali normal dalam 45 menit dan kapasitas tampung naik 3x lipat tanpa error.
    `,
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    author: 'Tim Pakar Karir InterviewReady',
    readTime: '5 Menit Baca',
    publishedAt: '2026-07-28',
    category: 'Tips Interview'
  },
  {
    id: 'art-2',
    title: 'Cara Menjawab Pertanyaan Kelebihan dan Kekurangan Tanpa Klise',
    slug: 'cara-menjawab-kelebihan-dan-kekurangan',
    excerpt: 'Hindari jawaban klise seperti "saya terlalu perfeksionis". Pelajari teknik menyajikan kelemahan secara profesional tanpa mengurangi nilai diri Anda.',
    content: `
### Kesalahan Umum Pelamar
Banyak kandidat membuat recruiter bosan karena menggunakan jawaban standar dari internet. Recruiter yang berpengalaman dapat langsung mendeteksi jawaban yang kurang jujur.

### Formula Jawaban Terbaik
1. **Pilih Kelemahan Nyata**: Pilih aspek kerja profesional yang sedang dalam proses perbaikan.
2. **Jelaskan Solusi Nyata**: Tunjukkan langkah aktif yang telah dan sedang Anda lakukan.
3. **Tunjukkan Kemajuan**: Berikan bukti bahwa kekurangan tersebut sudah terkendali.
    `,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    author: 'Sarah Wijaya (Senior Recruiter)',
    readTime: '4 Menit Baca',
    publishedAt: '2026-07-25',
    category: 'Strategi Karir'
  }
];

export const MOCK_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Rian Ardiansyah',
    role: 'Frontend Developer at Tech Corp',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    quote: 'Simulasi di InterviewReady sangat mirip dengan interview nyata! Analisis metode STAR dan masukan jawaban yang diperbaiki membuat saya percaya diri hingga lulus wawancara kerja.'
  },
  {
    id: 't-2',
    name: 'Nadia Putri',
    role: 'Fresh Graduate UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    quote: 'Fitur evaluasi jawaban otomatisnya luar biasa. Dulu saya selalu gugup saat ditanya kelemahan diri, sekarang saya paham cara menyusun struktur jawaban yang berbobot.'
  },
  {
    id: 't-3',
    name: 'Budi Santoso',
    role: 'Digital Marketing Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    quote: 'Sangat recommended untuk siapa saja yang ingin pindah karir! Pertanyaan berdasarkan posisi teknis sangat spesifik dan relevan dengan industri saat ini.'
  }
];

export const MOCK_DEMO_SESSIONS: InterviewSession[] = [
  {
    id: 'sess-demo-1',
    userId: 'user-demo-1',
    fieldId: 'field-1',
    positionId: 'pos-1',
    fieldName: 'Teknologi Informasi',
    positionName: 'Frontend Developer',
    interviewType: 'full',
    experienceLevel: 'fresh_grad',
    difficulty: 'medium',
    language: 'indonesia',
    answerMode: 'text',
    totalQuestions: 5,
    durationSeconds: 720,
    overallScore: 88.5,
    startedAt: '2026-08-01T10:00:00Z',
    completedAt: '2026-08-01T10:12:00Z',
    answers: [
      {
        questionId: 'q-1',
        questionText: 'Ceritakan tentang diri Anda dan alasan mengapa Anda tertarik menjadi seorang Frontend Developer.',
        answerText: 'Saya lulusan Teknik Informatika yang fokus belajar web frontend. Saya suka membangun UI yang responsif menggunakan React dan Tailwind CSS.',
        evaluation: {
          score: 85,
          strengths: ['Jawaban to the point', 'Menyebutkan teknologi relevan (React, Tailwind)'],
          weaknesses: ['Belum menyebutkan proyek konkret yang pernah dibuat'],
          recommendation: 'Tambahkan 1 kalimat contoh proyek nyata yang paling berkesan.',
          improvedAnswer: 'Saya lulusan Teknik Informatika dengan spesialisasi Frontend Development. Selama studi, saya telah menyelesaikan 3 proyek web interaktif menggunakan React dan Tailwind CSS, termasuk portal e-learning yang digunakan 500+ pengguna. Saya sangat tertarik bergabung di perusahaan ini karena reputasi produk digitalnya yang mengutamakan kualitas UX.',
          starAnalysis: {
            situation: true,
            task: true,
            action: true,
            result: false,
            feedback: 'Situasi dan tindakan sudah ada, tambahkan hasil terukur dari proyek Anda.'
          },
          aspectScores: {
            communication: 90,
            relevance: 90,
            structure: 80,
            confidence: 85,
            technical: 85,
            problemSolving: 80
          }
        }
      }
    ]
  }
];

export const CURRENT_DEMO_USER: User = {
  id: 'user-demo-1',
  fullName: 'Ahmad Fauzi',
  email: 'ahmad.fauzi@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  role: 'user',
  subscriptionType: 'free',
  createdAt: '2026-01-15'
};

export const MOCK_COMPANIES: InterviewCompany[] = [
  {
    id: 'comp-1',
    name: 'Nexora Digital',
    slug: 'nexora-digital',
    industry: 'Software & Teknologi',
    description: 'Nexora Digital adalah startup teknologi terkemuka yang mengembangkan aplikasi SaaS, portal edukasi digital, dan platform fintech untuk pasar Asia Tenggara.',
    cultureDescription: 'Kolaboratif, bergerak cepat, inovatif, dan berfokus pada kualitas kode serta kepuasan pengguna akhir.',
    technologyStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Docker', 'Tailwind CSS'],
    companySize: '50-100 Karyawan',
    workSystem: 'Remote-First'
  },
  {
    id: 'comp-2',
    name: 'Mandiri Utama Finance Tech',
    slug: 'mandiri-utama-finance',
    industry: 'Perbankan & Keuangan',
    description: 'Penyedia solusi perbankan digital modern yang mengutamakan keamanan tingkat tinggi dan performa transaksi real-time.',
    cultureDescription: 'Kritis, berorientasi detail, mengutamakan keamanan data, dan kepatuhan terhadap regulasi perbankan.',
    technologyStack: ['Go', 'Java', 'React', 'Kubernetes', 'Oracle DB', 'Kafka'],
    companySize: '500+ Karyawan',
    workSystem: 'Hybrid'
  }
];

export const MOCK_INTERVIEWERS: Interviewer[] = [
  {
    id: 'int-1',
    name: 'Sarah Wijaya',
    role: 'Human Resources Manager',
    interviewerType: 'hr',
    personality: 'Ramah, kritis, mengamati bahasa tubuh, berorientasi pada keselarasan budaya perusahaan.',
    speakingStyle: 'Profesional, hangat, terstruktur, memberikan dorongan semangat.'
  },
  {
    id: 'int-2',
    name: 'Andi Pratama',
    role: 'Lead Software Engineer',
    interviewerType: 'technical',
    personality: 'Langsung pada inti masalah, sangat logis, mengutamakan performa, keamanan, dan best practices.',
    speakingStyle: 'Teknis, mendalam, analitis, kritis terhadap efisiensi kode.'
  }
];

export const MOCK_TECHNICAL_CASES: TechnicalCase[] = [
  {
    id: 'case-1',
    positionId: 'pos-1',
    title: 'Optimasi Web Lambat & Hydration Error',
    description: 'Anda diminta memperbaiki portal web utama yang mengalami masalah kecepatan loading serta hydration error saat di-deploy menggunakan Next.js App Router.',
    difficulty: 'medium',
    expectedTopics: ['Core Web Vitals', 'Server vs Client Components', 'Code Splitting', 'Lazy Loading'],
    evaluationCriteria: ['Ketepatan analisis penyebab lambat', 'Solusi yang konkret dan terstruktur', 'Penggunaan terminologi Next.js secara benar']
  },
  {
    id: 'case-2',
    positionId: 'pos-2',
    title: 'Sistem Pembayaran dengan Konkurensi Tinggi',
    description: 'Rancanglah arsitektur backend untuk menangani antrean transaksi flash sale yang berpotensi mengalami race condition saat ribuan pengguna membeli produk yang sama.',
    difficulty: 'hard',
    expectedTopics: ['Database Locking', 'Message Queue (Kafka/RabbitMQ)', 'Redis Caching', 'Idempotency Key'],
    evaluationCriteria: ['Pencegahan race condition secara matif', 'Penggunaan sistem antrean/caching', 'Skalabilitas basis data']
  }
];

