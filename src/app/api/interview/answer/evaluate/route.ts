import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { answerTranscript, questionText, interviewerType, positionName } = body;

    const text = (answerTranscript || '').trim();
    const lower = text.toLowerCase();
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    let followUpRequired = false;
    let followUpText = '';
    let speaker: 'sarah' | 'andi' = interviewerType === 'technical' ? 'andi' : 'sarah';

    // 1. Brief Answer Handling
    if (wordCount > 0 && wordCount < 15) {
      followUpRequired = true;
      if (speaker === 'sarah') {
        followUpText = `Bisa dijelaskan lebih detail dan diberikan contoh konkretnya mengenai "${text}"?`;
      } else {
        followUpText = `Bisa dijelaskan pendekatan teknis atau arsitektur yang Anda gunakan untuk "${text}" secara lebih mendalam?`;
      }
    } 
    // 2. Uncertainty / "Tidak tahu" Handling
    else if (lower.includes('tidak tahu') || lower.includes('belum pernah') || lower.includes('lupa')) {
      followUpRequired = true;
      if (speaker === 'sarah') {
        followUpText = `Tidak masalah jika belum pernah mengalaminya. Berdasarkan pemahaman Anda saat ini, bagaimana pendekatan yang akan Anda ambil?`;
      } else {
        followUpText = `Tidak masalah jika belum pernah menggunakannya secara langsung. Menurut sudut pandang teknis Anda, bagaimana langkah awal menyelesaikan masalah tersebut?`;
      }
    }

    return NextResponse.json({
      success: true,
      followUpRequired,
      followUpText,
      speaker,
      evaluatedScore: Math.min(95, Math.max(60, 65 + Math.min(30, wordCount / 3)))
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
