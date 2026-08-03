/**
 * Pronunciation Dictionary for Technical Terms & Frameworks
 * Ensures Web Speech API and TTS engines pronounce IT terms accurately in Indonesian & English contexts.
 */

const TECHNICAL_PRONUNCIATION_MAP: Record<string, string> = {
  // Frameworks & Libraries
  'Next.js': 'Next J S',
  'Node.js': 'Node J S',
  'React.js': 'React J S',
  'Vue.js': 'View J S',
  'Express.js': 'Express J S',
  'React': 'Riyek',
  'TypeScript': 'Taipe Script',
  'JavaScript': 'Java Script',
  
  // DevOps & Cloud
  'CI/CD': 'C I slash C D',
  'Docker': 'Doker',
  'Kubernetes': 'Kubernetis',
  'Supabase': 'Supa base',
  'Firebase': 'Fair base',
  'AWS': 'A W S',
  'GCP': 'G C P',
  'DevOps': 'Dev Ops',
  
  // Databases & APIs
  'SQL': 'S Q L',
  'NoSQL': 'No S Q L',
  'PostgreSQL': 'Postgres Q L',
  'MySQL': 'Mai S Q L',
  'MongoDB': 'Mongo D B',
  'Redis': 'Redis',
  'API': 'A P I',
  'REST API': 'Rest A P I',
  'RESTful': 'Rest ful',
  'GraphQL': 'Graph Q L',
  'WebSocket': 'Web Socket',
  'JSON': 'Jason',
  'JWT': 'J W T',
  
  // Architecture & Security
  'Authentication': 'Autentikasi',
  'Authorization': 'Otorisasi',
  'OAuth': 'O Auth',
  'Row Level Security': 'Row Level Sekuriti',
  'RLS': 'R L S',
  'Frontend': 'Front end',
  'Backend': 'Back end',
  'Fullstack': 'Full stack',
  'UI/UX': 'U I U X',
  'UI': 'U I',
  'UX': 'U X',
  'HTML': 'H T M L',
  'CSS': 'C S S',
  
  // Programming Languages
  'C++': 'C plus plus',
  'C#': 'C sharp',
  'PHP': 'P H P',
  'Python': 'Paiton',
  'Golang': 'Go lang',
};

/**
 * Pre-processes text for TTS engines by substituting technical acronyms
 * with readable phonetic representations.
 */
export function formatTextForTTS(text: string): string {
  if (!text) return '';
  let formatted = text;

  // Replace exact match terms
  Object.entries(TECHNICAL_PRONUNCIATION_MAP).forEach(([term, phonetic]) => {
    const regex = new RegExp(`\\b${term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'gi');
    formatted = formatted.replace(regex, phonetic);
  });

  return formatted;
}
