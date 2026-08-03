'use client';

import React, { useState } from 'react';
import { Mic, Square, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { useMicrophonePermission } from '@/hooks/useMicrophonePermission';
import { useVoiceActivityDetection } from '@/hooks/useVoiceActivityDetection';
import MicrophoneDeviceSelector from './MicrophoneDeviceSelector';

export default function MicrophoneTestPanel() {
  const { hasPermission, stream, requestPermission, stopStream } = useMicrophonePermission();
  const [isTesting, setIsTesting] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [testAudioUrl, setTestAudioUrl] = useState<string | null>(null);

  const { audioLevel, isSpeaking } = useVoiceActivityDetection({
    enabled: isTesting,
    stream
  });

  const handleStartTest = async () => {
    const audioStream = await requestPermission();
    if (audioStream) {
      setIsTesting(true);
    }
  };

  const handleStopTest = () => {
    setIsTesting(false);
    stopStream();
  };

  const getQualityMessage = () => {
    if (!isTesting) return 'Tekan "Mulai Tes Mikrofon" untuk menguji kelayakan suara.';
    if (audioLevel < 5) return 'Suara belum terdeteksi. Silakan coba bicara atau dekatkan mikrofon.';
    if (audioLevel < 20) return 'Suara terdeteksi pelan. Tingkatkan volume mikrofon jika memungkinkan.';
    if (audioLevel < 80) return 'Suara terdengar jernih dan optimal untuk simulasi interview.';
    return 'Suara sangat keras. Pastikan tidak terjadi distorsi atau kliping.';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs text-slate-300 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h4 className="font-bold text-white flex items-center gap-2">
          <Mic className="w-4 h-4 text-indigo-400" /> Uji & Konfigurasi Mikrofon Kandidat
        </h4>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
          hasPermission ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
        }`}>
          {hasPermission ? 'Izin Diberikan' : 'Belum Diberikan'}
        </span>
      </div>

      <MicrophoneDeviceSelector
        selectedDeviceId={selectedDevice}
        onDeviceSelect={(id) => setSelectedDevice(id)}
      />

      {/* Audio Decibel Level Visual Meter */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Level Desibel Suara Real-time:</span>
          <span className="font-mono font-bold text-slate-200">{audioLevel}%</span>
        </div>
        <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-850 flex items-center">
          <div
            className={`h-full rounded-full transition-all duration-75 ${
              audioLevel > 70 ? 'bg-amber-400' : audioLevel > 15 ? 'bg-emerald-400' : 'bg-indigo-500'
            }`}
            style={{ width: `${audioLevel}%` }}
          />
        </div>
      </div>

      {/* Status Quality Message */}
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center gap-2 text-[11px]">
        {audioLevel > 15 ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
        )}
        <span className="text-slate-300">{getQualityMessage()}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 pt-1">
        {!isTesting ? (
          <button
            type="button"
            onClick={handleStartTest}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
          >
            <Mic className="w-3.5 h-3.5" /> Mulai Tes Mikrofon
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStopTest}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
          >
            <Square className="w-3.5 h-3.5 fill-current" /> Hentikan Tes
          </button>
        )}
      </div>
    </div>
  );
}
