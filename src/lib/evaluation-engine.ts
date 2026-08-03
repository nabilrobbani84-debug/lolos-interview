import { AnswerEvaluation, STARAnalysis, Question } from './types';

export function analyzeSTAR(answer: string): STARAnalysis {
  const text = answer.toLowerCase();

  const situationKeywords = ['saat', 'ketika', 'pada proyek', 'di perusahaan', 'sewaktu', 'dulu', 'pengalaman', 'di semester', 'when', 'at', 'during', 'tahun lalu'];
  const taskKeywords = ['tugas', 'bertugas', 'tanggung jawab', 'tantangan', 'target', 'diharuskan', 'diminta', 'task', 'goal', 'responsible', 'objective'];
  const actionKeywords = ['saya merancang', 'saya menerapkan', 'saya membuat', 'saya berdiskusi', 'saya menggunakan', 'saya melakukan', 'i implemented', 'i built', 'i analyzed', 'i organized', 'saya mengambil'];
  const resultKeywords = ['hasilnya', 'berhasil', 'mencapai', 'meningkat', 'turun', '%', 'persen', 'menjadi', 'result', 'achieved', 'dampak', 'sukses'];

  const hasSituation = situationKeywords.some(kw => text.includes(kw)) || text.length > 40;
  const hasTask = taskKeywords.some(kw => text.includes(kw)) || text.length > 80;
  const hasAction = actionKeywords.some(kw => text.includes(kw)) || text.includes('saya') || text.includes('i ');
  const hasResult = resultKeywords.some(kw => text.includes(kw)) || /\d+/.test(text);

  let feedback = 'Jawaban Anda telah tersusun dengan baik.';
  if (!hasResult) {
    feedback = 'Jawaban Anda sudah menjelaskan situasi dan tindakan, tetapi belum menyoroti hasil terukur (Result). Tambahkan dampak atau angka pencapaian agar jawaban lebih berbobot.';
  } else if (!hasAction) {
    feedback = 'Fokuskan lebih banyak pada tindakan spesifik yang ANDA ambil secara personal (Action), bukan hanya tindakan tim secara umum.';
  } else if (!hasSituation || !hasTask) {
    feedback = 'Berikan latar belakang situasi (Situation) dan tantangan spesifik (Task) yang lebih jelas di awal jawaban Anda.';
  }

  return {
    situation: hasSituation,
    task: hasTask,
    action: hasAction,
    result: hasResult,
    feedback
  };
}

export function evaluateAnswer(answerText: string, question: Question): AnswerEvaluation {
  const wordCount = answerText.trim().split(/\s+/).filter(Boolean).length;
  const star = analyzeSTAR(answerText);

  let baseScore = 70;

  // Length check
  if (wordCount >= 40 && wordCount <= 180) {
    baseScore += 10;
  } else if (wordCount < 20) {
    baseScore -= 15;
  }

  // STAR compliance score
  const starCount = [star.situation, star.task, star.action, star.result].filter(Boolean).length;
  baseScore += starCount * 4;

  // Keywords check
  if (question.objective && question.objective.split(' ').some(w => answerText.toLowerCase().includes(w.toLowerCase()))) {
    baseScore += 5;
  }

  const finalScore = Math.min(98, Math.max(45, baseScore));

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (wordCount >= 30) strengths.push('Penjelasan cukup mendalam dan tidak terlalu singkat.');
  if (star.action) strengths.push('Menyoroti kontribusi dan tindakan pribadi secara spesifik.');
  if (star.result) strengths.push('Menyertakan dampak atau hasil nyata dari tindakan.');

  if (wordCount < 25) weaknesses.push('Jawaban terlalu singkat dan kurang memberikan konteks pendukung.');
  if (!star.result) weaknesses.push('Belum menyampaikan hasil akhir yang terukur (angka/pencapaian).');
  if (!star.task) weaknesses.push('Tujuan atau tanggung jawab spesifik belum terdefinisi secara jelas.');

  let recommendation = 'Pertahankan kejelasan struktur jawaban Anda.';
  if (finalScore >= 85) {
    recommendation = 'Jawaban Anda sangat kuat dan profesional! Siap digunakan pada interview nyata.';
  } else if (finalScore >= 70) {
    recommendation = 'Jawaban sudah bagus. Latih penyampaian elemen Result (hasil terukur) untuk skor maksimal.';
  } else {
    recommendation = 'Perlu latihan lebih lanjut. Coba ikuti struktur metode STAR dan berikan contoh konkret.';
  }

  // Generate improved answer model
  const improvedAnswer = `[Model Jawaban Direvisi] ${question.sampleAnswer || answerText}`;

  return {
    score: Math.round(finalScore),
    strengths: strengths.length ? strengths : ['Gaya penyampaian sopan dan jelas.'],
    weaknesses: weaknesses.length ? weaknesses : ['Dapat ditingkatkan dengan variasi kosakata teknis.'],
    recommendation,
    improvedAnswer,
    starAnalysis: star,
    aspectScores: {
      communication: Math.min(99, Math.round(finalScore + (star.action ? 3 : -2))),
      relevance: Math.min(99, Math.round(finalScore + 2)),
      structure: Math.min(99, Math.round(finalScore + (starCount >= 3 ? 5 : -4))),
      confidence: Math.min(99, Math.round(finalScore - (wordCount < 20 ? 10 : 0))),
      technical: Math.min(99, Math.round(finalScore + 1)),
      problemSolving: Math.min(99, Math.round(finalScore + (star.result ? 4 : -3)))
    }
  };
}
