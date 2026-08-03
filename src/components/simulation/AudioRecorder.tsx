'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, RefreshCw, CheckCircle2, Volume2 } from 'lucide-react';

interface AudioRecorderProps {
  onTranscriptChange: (text: string) => void;
}

export default function AudioRecorder({ onTranscriptChange }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sampleTranscripts = [
    "Saya memiliki pengalaman 2 tahun mengembangkan web responsive dengan React. Dalam proyek terakhir saya bertugas mengoptimalkan performa halaman sehingga waktu loading berkurang 45 persen.",
    "Saya selalu menggunakan metode STAR saat menyelesaikan kendala tim. Saya mengidentifikasi akar masalah komunikasi dan membagi tugas berdasarkan keahlian masing-masing anggota.",
    "Untuk kelebihan utama saya, saya sangat teliti dalam mengelola tugas dan selalu memastikan dokumentasi kode bersih dan mudah dipahami oleh anggota tim lainnya."
  ];

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Pick a realistic simulated STT transcript
    const randomTx = sampleTranscripts[Math.floor(Math.random() * sampleTranscripts.length)];
    setTranscript(randomTx);
    onTranscriptChange(randomTx);
  };

  const resetRecording = () => {
    setIsRecording(false);
    setRecordingSeconds(0);
    setTranscript('');
    onTranscriptChange('');
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-indigo-400" />
          <h4 className="font-semibold text-sm text-slate-200">Perekam Suara & Speech-to-Text</h4>
        </div>
        {isRecording && (
          <span className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/30 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Merekam: {formatTime(recordingSeconds)}
          </span>
        )}
      </div>

      {/* Waveform graphic representation */}
      <div className="h-16 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-300 ${
              isRecording
                ? 'bg-indigo-500 animate-pulse'
                : transcript
                ? 'bg-emerald-500'
                : 'bg-slate-800'
            }`}
            style={{
              height: isRecording
                ? `${Math.max(15, Math.floor(Math.sin(i + recordingSeconds) * 45 + 50))}%`
                : transcript
                ? `${(i % 5) * 15 + 20}%`
                : '20%'
            }}
          ></div>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3 pt-2">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-600/30"
          >
            <Mic className="w-5 h-5" />
            {transcript ? 'Rekam Ulang Suara' : 'Mulai Rekam Suara'}
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition shadow-lg shadow-red-600/30 pulse-recording"
          >
            <Square className="w-5 h-5 fill-current" />
            Hentikan & Transkripsikan
          </button>
        )}

        {transcript && !isRecording && (
          <button
            onClick={resetRecording}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition"
            title="Reset Rekaman"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Live STT Transcript preview */}
      {transcript && (
        <div className="mt-4 p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Transkripsi Otomatis Berhasil
            </span>
            <span className="text-slate-500">Auto STT Engine</span>
          </div>
          <p className="text-sm text-slate-300 italic leading-relaxed">"{transcript}"</p>
        </div>
      )}
    </div>
  );
}
