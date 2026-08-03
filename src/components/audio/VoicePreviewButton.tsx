'use client';

import React, { useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import { playVoicePreview, stopVoiceSpeech } from '@/lib/tts/voice-provider-service';

interface VoicePreviewButtonProps {
  voiceId: string;
  previewText?: string;
  rate?: number;
  volume?: number;
}

export default function VoicePreviewButton({
  voiceId,
  previewText = 'Selamat datang di simulasi interview. Suara ini akan digunakan oleh pewawancara selama sesi berlangsung.',
  rate = 1.0,
  volume = 1.0
}: VoicePreviewButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (isPlaying) {
      stopVoiceSpeech();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playVoicePreview(voiceId, previewText, rate, volume, () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
        isPlaying
          ? 'bg-rose-600/20 text-rose-300 border-rose-500/40 hover:bg-rose-600/30'
          : 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
      }`}
    >
      {isPlaying ? (
        <>
          <Square className="w-3.5 h-3.5 fill-current" />
          <span>Hentikan Preview</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5" />
          <span>Putar Preview Suara</span>
        </>
      )}
    </button>
  );
}
