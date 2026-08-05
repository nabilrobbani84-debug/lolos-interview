import { NextResponse } from 'next/server';
import { GoogleGenAI, Type, Schema } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    overall_score: {
      type: Type.INTEGER,
      description: "Skor angka dari 1-100"
    },
    summary: {
      type: Type.STRING,
      description: "Ringkasan performa kandidat secara keseluruhan"
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Daftar kelebihan kandidat"
    },
    areas_for_improvement: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Daftar hal yang perlu ditingkatkan"
    },
    star_method_assessment: {
      type: Type.OBJECT,
      properties: {
        situation: { type: Type.STRING, description: "Penilaian seberapa baik mendeskripsikan situasi" },
        task: { type: Type.STRING, description: "Penilaian seberapa baik menjelaskan tugas" },
        action: { type: Type.STRING, description: "Penilaian seberapa jelas tindakan yang diambil" },
        result: { type: Type.STRING, description: "Penilaian keberadaan hasil yang terukur" }
      }
    },
    recommendation: {
      type: Type.STRING,
      enum: ["Sangat Direkomendasikan", "Direkomendasikan", "Perlu Pertimbangan", "Tidak Direkomendasikan"],
      description: "Rekomendasi akhir"
    }
  },
  required: ["overall_score", "summary", "strengths", "areas_for_improvement", "star_method_assessment", "recommendation"]
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullTranscript } = body;

    const systemInstruction = `Kamu adalah sistem penilai wawancara kerja otomatis. Tugasmu adalah memberikan laporan evaluasi komprehensif berdasarkan transkrip wawancara berikut.`;

    const userPrompt = `[TRANSKRIP WAWANCARA LENGKAP]
${fullTranscript}

Berikan output dalam format JSON sesuai spesifikasi.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.2,
      }
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);

    return NextResponse.json({ success: true, data: parsed });
  } catch (err: any) {
    console.error("AI Evaluate Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
