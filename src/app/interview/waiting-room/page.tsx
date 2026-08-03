'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Camera, Mic, Play, ShieldAlert, CheckCircle2, Video, VideoOff, MicOff } from 'lucide-react';
import MicrophoneTestPanel from '@/components/candidate-voice/MicrophoneTestPanel';

function WaitingRoomForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('id') || 'ai-sess-demo';

  const [sessionConfig, setSessionConfig] = useState<any>(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(`ai_session_config_${sessionId}`);
      if (stored) {
        setSessionConfig(JSON.parse(stored));
      } else {
        setSessionConfig({
          positionName: 'Frontend Developer',
          companyName: 'Nexora Digital',
          difficulty: 'medium',
          language: 'indonesia',
          durationMode: 'standard'
        });
      }
    }

    // Start camera stream
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn('Webcam/Mic access denied or unavailable: ', err);
        setCameraActive(false);
      }
    }
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [sessionId]);

  const toggleCamera = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCameraActive(videoTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicActive(audioTrack.enabled);
      }
    }
  };

  const handleEnterRoom = () => {
    router.push(`/interview/session/${sessionId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left 7-Cols: Video Stream & Media Checks */}
      <div className="lg:col-span-7 space-y-6">
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center shadow-xl">
          {cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
          ) : (
            <div className="text-center space-y-2 text-slate-500">
              <VideoOff className="w-12 h-12 mx-auto text-rose-500" />
              <p className="text-xs font-semibold">Kamera Dinonaktifkan atau Tidak Tersedia</p>
            </div>
          )}

          {/* Quick status indicator overlays */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-full border transition ${
                micActive
                  ? 'bg-slate-900/90 text-white border-slate-700 hover:bg-slate-800'
                  : 'bg-rose-600/90 text-white border-rose-500 hover:bg-rose-500'
              }`}
              title={micActive ? 'Mute Mic' : 'Unmute Mic'}
            >
              {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleCamera}
              className={`p-3 rounded-full border transition ${
                cameraActive
                  ? 'bg-slate-900/90 text-white border-slate-700 hover:bg-slate-800'
                  : 'bg-rose-600/90 text-white border-rose-500 hover:bg-rose-500'
              }`}
              title={cameraActive ? 'Turn Off Cam' : 'Turn On Cam'}
            >
              {cameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Microphone Test & Decibel Level Visual Panel */}
        <MicrophoneTestPanel />
      </div>

      {/* Right 5-Cols: Session Checklist & Entry Button */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
              {sessionConfig?.companyName || 'Nexora Digital'} Room
            </span>
            <h2 className="text-xl font-bold text-white leading-tight">
              Interview Anda Siap Dimulai
            </h2>
            <p className="text-xs text-slate-400">Sarah Wijaya (HRD) dan Andi Pratama (Lead IT) sudah menunggu Anda di ruang rapat virtual.</p>
          </div>

          {/* Checklist */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold text-slate-300 block">Checklist Persiapan:</span>
            {[
              'Kamera sejajar dengan mata untuk kontak visual.',
              'Suara mikrofon terdeteksi jernih tanpa gema.',
              'Ruangan tenang dengan pencahayaan yang cukup.',
              'Koneksi internet stabil dan lancar.'
            ].map((check, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{check}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleEnterRoom}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl transition"
          >
            <Play className="w-5 h-5 fill-current" />
            Masuk Interview Sekarang
          </button>
        </div>
      </div>

    </div>
  );
}

export default function WaitingRoomPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-white">Ruang Tunggu Virtual</h1>
        <p className="text-slate-400 text-sm">Lakukan pengecekan kamera dan mikrofon sebelum memasuki sesi wawancara.</p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-slate-400 font-medium">Memuat ruang tunggu...</div>}>
        <WaitingRoomForm />
      </Suspense>
    </div>
  );
}
