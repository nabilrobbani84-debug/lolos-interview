/**
 * Job Vacancy Customizer Interview Question & Case Study Generator
 */

import { ExtractedVacancyData } from './parser';

export interface CustomQuestion {
  id: string;
  question: string;
  category: 'hr' | 'technical' | 'security' | 'performance' | 'case_study';
  skill: string;
  objective: string;
}

export function generateVacancyQuestions(vacancy: ExtractedVacancyData): CustomQuestion[] {
  const questions: CustomQuestion[] = [];

  // 1. HR / Behavioral Questions
  questions.push({
    id: 'vc-q-1',
    question: `Apa yang membuat Anda tertarik melamar posisi ${vacancy.jobTitle} di ${vacancy.companyName}?`,
    category: 'hr',
    skill: 'Motivation',
    objective: 'Mengukur ketertarikan dan pemahaman kandidat terhadap visi perusahaan.'
  });

  questions.push({
    id: 'vc-q-2',
    question: `Lowongan ini mensyaratkan minimal ${vacancy.experienceYearsMin} tahun pengalaman. Ceritakan pengalaman kerja Anda yang paling relevan dengan kualifikasi tersebut.`,
    category: 'hr',
    skill: 'Experience',
    objective: 'Memvalidasi rekam jejak profesional kandidat.'
  });

  if (vacancy.workArrangement === 'onsite') {
    questions.push({
      id: 'vc-q-3',
      question: `Pekerjaan ini berlokasi di ${vacancy.location} dengan sistem kerja Di Kantor (Onsite). Apakah Anda bersedia bekerja sepenuhnya dari kantor?`,
      category: 'hr',
      skill: 'Availability',
      objective: 'Memastikan kecocokan kandidat terhadap sistem kerja Onsite.'
    });
  }

  // 2. Technical Framework & Language Questions
  const allTech = [
    ...vacancy.technicalSkills.mustHave,
    ...vacancy.technicalSkills.important
  ];

  let qCount = 4;
  allTech.forEach(tech => {
    if (tech === 'PHP') {
      questions.push({
        id: `vc-q-${qCount++}`,
        question: 'Bagaimana cara Anda menstrukturkan aplikasi berbasis PHP agar mudah dipelihara (maintainable) saat skala proyek membesar?',
        category: 'technical',
        skill: 'PHP',
        objective: 'Menguji kemampuan arsitektur backend PHP.'
      });
    } else if (tech === 'Laravel') {
      questions.push({
        id: `vc-q-${qCount++}`,
        question: 'Bagaimana cara Anda menangani background process, queue, atau event handling di framework Laravel?',
        category: 'technical',
        skill: 'Laravel',
        objective: 'Menguji pemahaman fitur backend Laravel tingkat lanjut.'
      });
    } else if (tech === 'React' || tech === 'Next.js') {
      questions.push({
        id: `vc-q-${qCount++}`,
        question: 'Apa perbedaan mendasar antara React Server Component dan Client Component pada Next.js, dan kapan Anda memilih menggunakannya?',
        category: 'technical',
        skill: tech,
        objective: 'Menguji pengetahuan frontend rendering modern.'
      });
    } else if (tech === 'SQL' || tech === 'PostgreSQL') {
      questions.push({
        id: `vc-q-${qCount++}`,
        question: 'Bagaimana strategi Anda dalam mengoptimalkan database query yang lambat dan kapan database indexing sebaiknya digunakan?',
        category: 'technical',
        skill: tech,
        objective: 'Menguji keterampilan optimasi basis data.'
      });
    } else if (tech === 'Go' || tech === 'Golang') {
      questions.push({
        id: `vc-q-${qCount++}`,
        question: 'Bagaimana cara Go menangani concurrency secara efisien menggunakan goroutine dan channel?',
        category: 'technical',
        skill: 'Golang',
        objective: 'Menguji pemahaman konkurensi di Go.'
      });
    }
  });

  // 3. Security & Caching
  if (lowerIncludesAny(allTech, ['Secure Programming', 'Security', 'Laravel', 'Next.js'])) {
    questions.push({
      id: `vc-q-${qCount++}`,
      question: 'Bagaimana cara Anda mengamankan endpoint API dari serangan SQL Injection dan Cross-Site Scripting (XSS)?',
      category: 'security',
      skill: 'Application Security',
      objective: 'Memvalidasi secure coding practices kandidat.'
    });
  }

  if (lowerIncludesAny(allTech, ['Caching', 'Redis', 'Performance'])) {
    questions.push({
      id: `vc-q-${qCount++}`,
      question: 'Bagaimana strategi Anda dalam menangani cache invalidation agar data yang ditampilkan tetap konsisten tanpa membebani server database?',
      category: 'performance',
      skill: 'Caching Strategy',
      objective: 'Mengukur keahlian caching manajemen.'
    });
  }

  // 4. Case Study
  questions.push({
    id: `vc-q-${qCount++}`,
    question: `Studi Kasus: Perusahaan memiliki portal web utama yang lambat saat di-render karena perbedaan data hydration di server dan client. Sebagai ${vacancy.jobTitle}, langkah diagnosis dan optimasi apa yang akan Anda lakukan?`,
    category: 'case_study',
    skill: 'Problem Solving',
    objective: 'Menguji kemampuan analisis masalah kompleks secara terstruktur.'
  });

  return questions;
}

function lowerIncludesAny(arr: string[], search: string[]): boolean {
  const lowerArr = arr.map(a => a.toLowerCase());
  return search.some(s => lowerArr.includes(s.toLowerCase()));
}
