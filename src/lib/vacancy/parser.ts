/**
 * Job Vacancy Parser & Text Cleaner Service
 * Cleans job description noise and structures position properties.
 */

import { CandidateJobVacancy } from '../types';

/**
 * Removes non-relevant web/app copy from typical job posts
 */
export function cleanVacancyText(text: string): string {
  if (!text) return '';
  let cleaned = text;

  // List of typical job board noise phrases
  const noisePatterns = [
    /apply\s*(now|here|on\s*company\s*site)?/gi,
    /lamar\s*(sekarang|mudah)?/gi,
    /save\s*(job|this\s*job)?/gi,
    /simpan\s*(pekerjaan)?/gi,
    /easy\s*apply/gi,
    /tampilkan\s*opsi\s*selengkapnya/gi,
    /show\s*more\s*options/gi,
    /report\s*this\s*job/gi,
    /laporkan\s*pekerjaan\s*ini/gi,
    /premium\s*member/gi,
    /cookie\s*notice/gi,
    /privacy\s*policy/gi,
    /share\s*(this\s*job)?/gi,
    /bagikan\s*(pekerjaan\s*ini)?/gi,
  ];

  noisePatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });

  // Strip excessive spaces & empty lines
  return cleaned
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

export interface ExtractedVacancyData {
  jobTitle: string;
  companyName: string;
  location: string;
  workArrangement: 'onsite' | 'hybrid' | 'remote';
  seniority: 'internship' | 'fresh_grad' | 'junior' | 'mid' | 'senior' | 'lead';
  experienceYearsMin: number;
  educationMin: string;
  technicalSkills: {
    mustHave: string[];
    important: string[];
    niceToHave: string[];
  };
  softSkills: string[];
  responsibilities: string[];
}

/**
 * Parses and extracts structured features from raw/cleaned vacancy text
 */
export function parseVacancyText(text: string): ExtractedVacancyData {
  const cleaned = cleanVacancyText(text);
  const lower = cleaned.toLowerCase();

  // 1. Resolve Work Arrangement
  let workArrangement: 'onsite' | 'hybrid' | 'remote' = 'onsite';
  if (lower.includes('remote') || lower.includes('bekerja dari rumah') || lower.includes('wfh')) {
    workArrangement = 'remote';
  } else if (lower.includes('hybrid') || lower.includes('hibrida')) {
    workArrangement = 'hybrid';
  }

  // 2. Resolve Seniority Level
  let seniority: 'internship' | 'fresh_grad' | 'junior' | 'mid' | 'senior' | 'lead' = 'junior';
  if (lower.includes('intern') || lower.includes('magang') || lower.includes('internship')) {
    seniority = 'internship';
  } else if (lower.includes('fresh graduate') || lower.includes('entry level') || lower.includes('lulusan baru')) {
    seniority = 'fresh_grad';
  } else if (lower.includes('senior') || lower.includes('lead engineer') || lower.includes('manager') || lower.includes('arsitek')) {
    seniority = 'senior';
  } else if (lower.includes('lead') || lower.includes('principal') || lower.includes('kepala')) {
    seniority = 'lead';
  } else if (lower.includes('middle') || lower.includes('mid') || lower.includes('3 tahun') || lower.includes('4 tahun')) {
    seniority = 'mid';
  }

  // 3. Resolve Experience Years Min
  let experienceYearsMin = 1;
  const expMatch = lower.match(/(\d+)\s*-\s*(\d+)\s*(year|tahun)/) || lower.match(/(\d+)\s*(year|tahun)/);
  if (expMatch) {
    experienceYearsMin = parseInt(expMatch[1]);
  }

  // 4. Resolve Job Title & Company (Mock defaults or extract simple lines)
  let jobTitle = 'Full Stack Engineer';
  let companyName = 'PT Siaga Abdi Utama';
  let location = 'Jakarta Raya, Indonesia';

  // Attempt to parse first lines
  const lines = cleaned.split('\n');
  if (lines.length > 0 && lines[0].length < 60) jobTitle = lines[0];
  if (lines.length > 1 && lines[1].length < 60) companyName = lines[1];
  if (lines.length > 2 && lines[2].length < 60) location = lines[2];

  // 5. Extract skills from pre-defined lists
  const techList = [
    'PHP', 'CodeIgniter', 'Laravel', 'Go', 'Golang', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 
    'React', 'Vue.js', 'Express.js', 'SQL', 'NoSQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase',
    'Supabase', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub', 'GitLab', 'REST API', 'GraphQL', 'WebSocket',
    'Kotlin', 'Android', 'Jetpack Compose', 'Power BI', 'Python', 'Tailwind CSS', 'Secure Programming', 'RLS'
  ];

  const softList = [
    'analytical thinking', 'problem solving', 'communication', 'collaboration', 'continuous learning',
    'teamwork', 'leadership', 'time management', 'presentation'
  ];

  const matchedTech = techList.filter(tech => {
    const regex = new RegExp(`\\b${tech.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
    return regex.test(lower);
  });

  const matchedSoft = softList.filter(soft => lower.includes(soft));

  // Determine Priorities (mustHave, important, niceToHave)
  const mustHave = matchedTech.slice(0, 5);
  const important = matchedTech.slice(5, 10);
  const niceToHave = matchedTech.slice(10);

  // Extract Responsibilities
  const responsibilities: string[] = [];
  lines.forEach(line => {
    if (line.trim().startsWith('-') || line.trim().startsWith('*') || /develop|maintain|build|optimize|collaborate|mengembangkan|memelihara/i.test(line)) {
      if (line.length > 15 && line.length < 150) {
        responsibilities.push(line.replace(/^[-*]\s*/, '').trim());
      }
    }
  });

  if (responsibilities.length === 0) {
    responsibilities.push('Mengembangkan aplikasi web.', 'Memelihara & meningkatkan fitur aplikasi.', 'Berkolaborasi dengan tim lintas fungsi.');
  }

  return {
    jobTitle,
    companyName,
    location,
    workArrangement,
    seniority,
    experienceYearsMin,
    educationMin: lower.includes('sarjana') || lower.includes('bachelor') || lower.includes('s1') ? 'S1 Teknik Informatika / Ilmu Komputer' : 'Diploma / SMK',
    technicalSkills: {
      mustHave,
      important,
      niceToHave
    },
    softSkills: matchedSoft.length > 0 ? matchedSoft : ['Communication', 'Problem Solving', 'Teamwork'],
    responsibilities: responsibilities.slice(0, 8)
  };
}
