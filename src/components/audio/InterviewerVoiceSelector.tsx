'use client';

import React from 'react';
import { UserCheck, Sparkles } from 'lucide-react';
import { HR_VOICE_OPTIONS, TECHNICAL_VOICE_OPTIONS } from '@/lib/tts/voice-provider-service';
import VoicePreviewButton from './VoicePreviewButton';

interface InterviewerVoiceSelectorProps {
  selectedHrVoice: string;
  selectedTechVoice: string;
  onHrVoiceChange: (voiceId: string) => void;
  onTechVoiceChange: (voiceId: string) => void;
  speakingRate: number;
}

export default function InterviewerVoiceSelector({
  selectedHrVoice,
  selectedTechVoice,
  onHrVoiceChange,
  onTechVoiceChange,
  speakingRate
}: InterviewerVoiceSelectorProps) {
  return (
    <div className="space-y-6">
      
      {/* HRD Voice Selector */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              HR
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Suara Pewawancara 1: Sarah (HRD)</h4>
              <p className="text-[10px] text-slate-400">Fokus: Behavioral, latar belakang, & keselarasan budaya</p>
            </div>
          </div>
          <VoicePreviewButton voiceId={selectedHrVoice} rate={speakingRate} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HR_VOICE_OPTIONS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => onHrVoiceChange(v.id)}
              className={`p-3 rounded-xl text-left border transition ${
                selectedHrVoice === v.id
                  ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{v.name}</span>
                {selectedHrVoice === v.id && <UserCheck className="w-4 h-4 text-indigo-400" />}
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">{v.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Lead IT Voice Selector */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              IT
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Suara Pewawancara 2: Andi (Lead IT)</h4>
              <p className="text-[10px] text-slate-400">Fokus: Arsitektur sistem, studi kasus, & keahlian teknis</p>
            </div>
          </div>
          <VoicePreviewButton voiceId={selectedTechVoice} rate={speakingRate} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TECHNICAL_VOICE_OPTIONS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => onTechVoiceChange(v.id)}
              className={`p-3 rounded-xl text-left border transition ${
                selectedTechVoice === v.id
                  ? 'bg-emerald-600/15 border-emerald-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{v.name}</span>
                {selectedTechVoice === v.id && <UserCheck className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">{v.description}</p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
