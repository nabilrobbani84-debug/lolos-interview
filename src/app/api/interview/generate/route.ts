import { NextResponse } from 'next/server';
import { GoogleGenAI, Type, Schema } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    interviewer_response: {
      type: Type.STRING,
      description: "Teks ucapan pewawancara yang akan disampaikan ke kandidat"
    },
    is_interview_finished: {
      type: Type.BOOLEAN,
      description: "true jika simulasi selesai (sudah 4-5 pertanyaan), false jika belum"
    },
    current_stage: {
      type: Type.STRING,
      enum: ["introduction", "technical", "behavioral", "closing"],
      description: "Tahap wawancara saat ini"
    },
    quick_feedback: {
      type: Type.STRING,
      description: "Umpan balik singkat/pujian/catatan internal tentang jawaban kandidat barusan"
    }
  },
  required: ["interviewer_response", "is_interview_finished", "current_stage", "quick_feedback"]
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { isFirstTurn, jobData, candidateData, lastQuestion, candidateAnswer } = body;

    const systemInstruction = `Kamu adalah pewawancara kerja profesional, berpengalaman, dan objektif di perusahaan terkemuka. Tugasmu adalah memandu simulasi wawancara kerja yang interaktif dan realistis.

ATURAN UTAMA INTERAKSI:
1. PERAN & NADA BICARA:
   - Bersikaplah profesional, tegas, namun tetap menyemangati kandidat.
   - Bicara dengan jelas dan menggunakan bahasa Indonesia yang baik dan lugas.

2. ALUR SIMULASI WAWANCARA:
   - Jangan memberikan semua pertanyaan sekaligus. Tanyakan SATU pertanyaan saja per giliran.
   - Berikan pertanyaan lanjutan (follow-up question) yang relevan berdasarkan jawaban kandidat sebelumnya sebelum berpindah ke topik/pertanyaan utama berikutnya.
   - Ajukan pertanyaan berdasarkan metode STAR (Situation, Task, Action, Result) untuk menguji pengalaman nyata kandidat.

3. EVALUASI JAWABAN (RELEVANSI & KRITIS):
   - Jika jawaban kandidat terlalu singkat, tidak relevan, atau terlalu umum, minta klarifikasi atau contoh spesifik dengan sopan.
   - Selalu perhatikan posisi/lowongan kerja yang dilamar dan sesuaikan tingkat kesulitan pertanyaan dengan level posisi tersebut.`;

    let userPrompt = "";

    if (isFirstTurn) {
      userPrompt = `Sesi wawancara baru dimulai. Berikut adalah data posisi dan kandidat:

[DATA POSISI/JOB VACANCY]
- Nama Posisi: ${jobData?.jobTitle || '-'}
- Tingkat Jabatan: ${jobData?.seniority || '-'}
- Deskripsi Pekerjaan: ${jobData?.description || 'Sesuai dengan standard industri'}
- Keahlian Utama: ${jobData?.skills || '-'}

[DATA KANDIDAT]
- Nama Kandidat: ${candidateData?.name || 'Kandidat'}
- Ringkasan Ringkas CV/Pengalaman: ${candidateData?.summary || 'Belum ada data spesifik'}

INSTRUKSI:
Sambut kandidat secara ramah, perkenalkan dirimu singkat sebagai AI Pewawancara, lalu ajukan PERTANYAAN PERTAMA (biasanya seputar perkenalan diri atau alasan berminat pada posisi ini). Sertakan format JSON sesuai petunjuk sistem.`;
    } else {
      userPrompt = `(Melanjutkan Percakapan / Memproses Jawaban Kandidat)

Kandidat baru saja memberikan jawaban untuk pertanyaan sebelumnya.

[RIWAYAT PERTANYAAN & JAWABAN SEBELUMNYA]
- Pertanyaan Pewawancara: "${lastQuestion || '-'}"
- Jawaban Kandidat: "${candidateAnswer || '-'}"

INSTRUKSI:
1. Evaluasi jawaban kandidat secara internal.
2. Jika jawaban butuh pendalaman (misal: kandidat menyebutkan proyek tapi belum menjelaskan hasilnya), ajukan pertanyaan follow-up.
3. Jika jawaban sudah cukup jelas, lanjutkan ke pertanyaan berikutnya sesuai alur simulasi.
4. Jika sudah mencapai 4-5 pertanyaan utama dan cukup data, kamu bisa menutup wawancara (set \`is_interview_finished\` ke true).

Kembalikan respons sesuai format JSON yang telah ditetapkan.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);

    return NextResponse.json({ success: true, data: parsed });
  } catch (err: any) {
    console.error("AI Generate Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
