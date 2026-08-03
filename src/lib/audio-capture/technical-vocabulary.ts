/**
 * Technical Vocabulary & Filler Word Dictionary
 * Enhances STT transcript accuracy for domain-specific positions and tracks filler words.
 */

export const GLOBAL_TECHNICAL_VOCABULARY = [
  'Next.js',
  'React',
  'TypeScript',
  'JavaScript',
  'Supabase',
  'PostgreSQL',
  'MySQL',
  'Kotlin',
  'Jetpack Compose',
  'REST API',
  'WebSocket',
  'Docker',
  'Kubernetes',
  'GitHub',
  'GitLab',
  'Redis',
  'Firebase',
  'Laravel',
  'Node.js',
  'Express.js',
  'Row Level Security',
  'Authentication',
  'Authorization',
  'Deployment',
  'Frontend',
  'Backend',
  'Full stack',
  'OWASP',
  'Power BI',
  'Python',
  'HTML5',
  'Tailwind CSS'
];

export const INDONESIAN_FILLER_WORDS = [
  'eee',
  'emm',
  'hmm',
  'anu',
  'jadi',
  'nah',
  'kayak',
  'gitu',
  'apa namanya',
  'bisa dibilang',
  'intinya'
];

export const ENGLISH_FILLER_WORDS = [
  'um',
  'uh',
  'like',
  'you know',
  'basically',
  'actually',
  'so',
  'i mean'
];

/**
 * Analyzes transcript text for filler words and returns counts.
 */
export function analyzeFillerWords(text: string): { totalFillers: number; breakdown: Record<string, number> } {
  if (!text) return { totalFillers: 0, breakdown: {} };

  const lower = text.toLowerCase();
  const breakdown: Record<string, number> = {};
  let totalFillers = 0;

  const allFillers = [...INDONESIAN_FILLER_WORDS, ...ENGLISH_FILLER_WORDS];

  allFillers.forEach(filler => {
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = lower.match(regex);
    if (matches && matches.length > 0) {
      breakdown[filler] = matches.length;
      totalFillers += matches.length;
    }
  });

  return { totalFillers, breakdown };
}
