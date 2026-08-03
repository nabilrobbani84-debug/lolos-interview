import { NextResponse } from 'next/server';
import { formatTextForTTS } from '@/lib/tts/pronunciation-dictionary';
import { getVoiceById } from '@/lib/tts/voice-provider-service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, voiceId, interviewerType, language, speakingRate } = body;

    if (!text) {
      return NextResponse.json({ success: false, error: 'Text parameter is required' }, { status: 400 });
    }

    const voiceConfig = getVoiceById(voiceId || (interviewerType === 'hr' ? 'sarah-friendly' : 'andi-professional'));
    const formattedText = formatTextForTTS(text);

    return NextResponse.json({
      success: true,
      originalText: text,
      formattedText,
      voice: voiceConfig,
      language: language || 'id-ID',
      speakingRate: speakingRate || 1.0,
      provider: process.env.TTS_PROVIDER || 'web-speech-api'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'TTS Error' }, { status: 500 });
  }
}
