import { NextResponse } from 'next/server';
import { HR_VOICE_OPTIONS, TECHNICAL_VOICE_OPTIONS } from '@/lib/tts/voice-provider-service';

export async function GET() {
  return NextResponse.json({
    success: true,
    hrVoices: HR_VOICE_OPTIONS,
    technicalVoices: TECHNICAL_VOICE_OPTIONS,
    defaultLanguage: 'id-ID',
    provider: process.env.TTS_PROVIDER || 'web-speech-api'
  });
}
