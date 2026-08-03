import { NextResponse } from 'next/server';
import { analyzeFillerWords } from '@/lib/audio-capture/technical-vocabulary';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, questionId, transcriptText, language } = body;

    const fillerAnalysis = analyzeFillerWords(transcriptText || '');

    return NextResponse.json({
      success: true,
      transcriptId: `tr-${Date.now()}`,
      finalTranscript: transcriptText || '',
      wordCount: transcriptText ? transcriptText.trim().split(/\s+/).length : 0,
      fillerAnalysis,
      confidenceScore: 0.95,
      language: language || 'id-ID'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
