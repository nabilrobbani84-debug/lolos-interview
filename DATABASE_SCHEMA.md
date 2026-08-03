# DATABASE SCHEMA - InterviewReady

Dokumen ini berisi struktur tabel basis data PostgreSQL untuk platform **InterviewReady**, lengkap dengan tipe data, relasi, dan skema Supabase Row Level Security (RLS).

---

## 🗄️ SQL Schema Migration

```sql
-- 1. USERS TABLE
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  subscription_type VARCHAR(50) DEFAULT 'free' CHECK (subscription_type IN ('free', 'pro')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER PROFILES TABLE
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  education VARCHAR(255),
  major VARCHAR(255),
  experience_level VARCHAR(50),
  skills TEXT[],
  target_position VARCHAR(255),
  cv_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. FIELDS TABLE (BIDANG)
CREATE TABLE public.fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. POSITIONS TABLE (POSISI PEKERJAAN)
CREATE TABLE public.positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  competencies TEXT[],
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. INTERVIEW QUESTIONS TABLE
CREATE TABLE public.interview_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field_id UUID REFERENCES public.fields(id) ON DELETE SET NULL,
  position_id UUID REFERENCES public.positions(id) ON DELETE SET NULL,
  interview_type VARCHAR(100) NOT NULL, -- HR, User, Teknis, Behavioral, Case Study, English, Full
  experience_level VARCHAR(50) NOT NULL, -- Student, FreshGrad, Junior, Mid, Senior, Manager
  difficulty VARCHAR(50) DEFAULT 'medium', -- Easy, Medium, Hard, Expert
  language VARCHAR(50) DEFAULT 'indonesia', -- indonesia, english, mixed
  question TEXT NOT NULL,
  objective TEXT,
  answer_tips TEXT,
  sample_answer TEXT,
  scoring_rubric JSONB,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. INTERVIEW SESSIONS TABLE
CREATE TABLE public.interview_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  field_id UUID REFERENCES public.fields(id) ON DELETE SET NULL,
  position_id UUID REFERENCES public.positions(id) ON DELETE SET NULL,
  interview_type VARCHAR(100) NOT NULL,
  experience_level VARCHAR(50) NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  language VARCHAR(50) NOT NULL,
  answer_mode VARCHAR(50) NOT NULL, -- text, voice, video
  total_questions INT NOT NULL,
  duration INT DEFAULT 0, -- seconds
  overall_score NUMERIC(5,2),
  status VARCHAR(50) DEFAULT 'completed',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. INTERVIEW ANSWERS TABLE
CREATE TABLE public.interview_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.interview_sessions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.interview_questions(id) ON DELETE SET NULL,
  question_text TEXT NOT NULL,
  answer_text TEXT,
  audio_url TEXT,
  score NUMERIC(5,2),
  strengths TEXT[],
  weaknesses TEXT[],
  recommendation TEXT,
  improved_answer TEXT,
  star_analysis JSONB, -- { situation: bool, task: bool, action: bool, result: bool, feedback: string }
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. USER FAVORITES TABLE
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.interview_questions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ARTICLES TABLE
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author VARCHAR(255) DEFAULT 'InterviewReady Team',
  status VARCHAR(50) DEFAULT 'published',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. SUBSCRIPTIONS TABLE
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  plan VARCHAR(50) NOT NULL, -- free, pro
  status VARCHAR(50) DEFAULT 'active',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expired_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔒 Row Level Security Policies (RLS)

- **users**: Setiap user dapat membaca dan mengupdate data miliknya sendiri. Admin memiliki akses seluas-luasnya.
- **fields & positions**: Pembacaan publik (Read Public). Pengubahan hanya oleh Admin.
- **interview_questions**: Pembacaan publik (Read Public). Pengubahan hanya oleh Admin.
- **interview_sessions & interview_answers**: Hanya pemilik session (`user_id = auth.uid()`) yang dapat melihat dan menyimpan jawaban.
- **articles**: Read public untuk artikel berstatus `published`. Admin dapat mengelola artikel.
