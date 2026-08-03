'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Mic, MicOff, Video, VideoOff, LogOut, FileText, CheckCircle2, 
  HelpCircle, Sparkles, Send, Volume2, UserCheck, Clock, ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { evaluateAnswer } from '@/lib/evaluation-engine';
import { globalAudioQueue, AudioPlaybackState } from '@/lib/tts/audio-queue-service';
import SpeakingWaveform from '@/components/audio/SpeakingWaveform';
import CandidateWaveform from '@/components/candidate-voice/CandidateWaveform';
import CandidateTranscriptPanel from '@/components/candidate-voice/CandidateTranscriptPanel';
import AnswerControlBar from '@/components/candidate-voice/AnswerControlBar';
import { useCandidateRecorder } from '@/hooks/useCandidateRecorder';
import { useVoiceActivityDetection } from '@/hooks/useVoiceActivityDetection';
import { InterviewConversationState, getActiveSpeakerForState } from '@/lib/audio-capture/conversation-state-machine';

export default function AIInterviewRoomSessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params?.id as string;

  const [sessionConfig, setSessionConfig] = useState<any>(null);
  const [stage, setStage] = useState<'pembukaan' | 'perkenalan' | 'hr' | 'teknis' | 'case' | 'kandidat_tanya' | 'penutup'>('pembukaan');
  const [activeInterviewer, setActiveInterviewer] = useState<'sarah' | 'andi'>('sarah');
  const [conversationState, setConversationState] = useState<InterviewConversationState>('interviewer_speaking');

  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  const [notepadText, setNotepadText] = useState('');
  const [showNotepad, setShowNotepad] = useState(false);
  const [subtitles, setSubtitles] = useState('');
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [isTextMode, setIsTextMode] = useState(false);

  // Audio queue and mic gating states
  const [audioPlaybackState, setAudioPlaybackState] = useState<AudioPlaybackState>('idle');
  const [isCandidateMicAllowed, setIsCandidateMicAllowed] = useState(false);

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [answersLog, setAnswersLog] = useState<any[]>([]);

  // Video feed handles
  const candidateVideoRef = useRef<HTMLVideoElement | null>(null);
  const candidateStreamRef = useRef<MediaStream | null>(null);

  // Candidate Voice Recorder Hook
  const {
    isRecording,
    partialTranscript,
    finalTranscript,
    combinedText,
    fillerAnalysis,
    startRecording,
    stopRecording,
    clearRecording
  } = useCandidateRecorder({
    language: sessionConfig?.language,
    onFinalTranscript: (txt) => {
      setAnswerInput(txt);
    }
  });

  // Candidate Voice Activity Detection (VAD) Hook
  const { isSpeaking: isCandidateSpeaking, audioLevel, isSilenceTimerActive } = useVoiceActivityDetection({
    enabled: isCandidateMicAllowed && !micMuted,
    stream: candidateStreamRef.current,
    speechStartThreshold: 12,
    silenceTimeoutMs: 2500,
    onSpeechStart: () => {
      setConversationState('candidate_speaking');
    },
    onSpeechStop: () => {
      setConversationState('candidate_paused');
    }
  });

  // Sync combined text to input
  useEffect(() => {
    if (combinedText) {
      setAnswerInput(combinedText);
    }
  }, [combinedText]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(`ai_session_config_${sessionId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSessionConfig(parsed);
        if (parsed.volume !== undefined) globalAudioQueue.setVolume(parsed.volume);
        if (parsed.speakingRate !== undefined) globalAudioQueue.setSpeakingRate(parsed.speakingRate);
        if (parsed.isMuted !== undefined) globalAudioQueue.setMuted(parsed.isMuted);
      } else {
        setSessionConfig({
          positionName: 'Frontend Developer',
          companyName: 'Nexora Digital',
          difficulty: 'medium',
          language: 'indonesia',
          hrVoiceId: 'sarah-friendly',
          techVoiceId: 'andi-professional'
        });
      }
    }

    // Subscribe to AudioQueue state and Candidate Mic gating
    const unsubState = globalAudioQueue.subscribeState((state) => {
      setAudioPlaybackState(state);
      if (state === 'playing') setConversationState('interviewer_speaking');
    });

    const unsubGating = globalAudioQueue.subscribeMicGating((allowed) => {
      setIsCandidateMicAllowed(allowed);
      if (allowed) {
        setConversationState('candidate_listening');
        // Auto-start candidate recording when allowed
        if (candidateStreamRef.current && !micMuted) {
          startRecording(candidateStreamRef.current);
        }
      } else {
        stopRecording();
      }
    });

    // Timer
    const tInterval = setInterval(() => {
      setSecondsElapsed(p => p + 1);
    }, 1000);

    // Initial webcam & mic connection
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        candidateStreamRef.current = stream;
        if (candidateVideoRef.current) {
          candidateVideoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.warn('Camera/Mic access error: ', err));

    return () => {
      clearInterval(tInterval);
      unsubState();
      unsubGating();
      globalAudioQueue.clearQueue();
      stopRecording();
      if (candidateStreamRef.current) {
        candidateStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [sessionId, startRecording, stopRecording, micMuted]);

  // Stage Dialogue Trigger
  useEffect(() => {
    triggerStageDialogue();
  }, [stage]);

  const triggerStageDialogue = () => {
    let text = '';
    let speaker: 'sarah' | 'andi' = 'sarah';

    if (sessionConfig?.customVacancyText) {
      const positionName = sessionConfig.positionName || 'Full Stack Engineer';
      const companyName = sessionConfig.companyName || 'PT Siaga Abdi Utama';

      if (stage === 'pembukaan') {
        speaker = 'sarah';
        text = `Selamat pagi. Terima kasih sudah hadir untuk interview posisi ${positionName} di ${companyName}. Saya Sarah dari tim HRD, dan bersama saya ada Pak Andi selaku Lead Engineer.`;
      } else if (stage === 'perkenalan') {
        speaker = 'sarah';
        text = `Silakan perkenalkan diri Anda secara singkat dan jelaskan mengapa Anda tertarik melamar posisi ${positionName} di perusahaan kami.`;
      } else if (stage === 'hr') {
        speaker = 'sarah';
        text = `Posisi ini mensyaratkan kolaborasi tim yang kuat. Ceritakan pengalaman Anda saat bekerja sama dalam lingkungan Agile atau menyelesaikan konflik tim.`;
      } else if (stage === 'teknis') {
        speaker = 'andi';
        text = `Halo, saya Andi. Mari kita bahas kompetensi teknis. Mengacu pada persyaratan kustom Anda: bagaimana cara Anda mendesain database SQL/NoSQL dan menangani secure coding pada Next.js atau Laravel?`;
      } else if (stage === 'case') {
        speaker = 'andi';
        text = `Untuk studi kasus teknis: bagaimana strategi Anda dalam menerapkan CI/CD pipeline dan caching management menggunakan Redis agar backend service scalable?`;
      } else if (stage === 'kandidat_tanya') {
        speaker = 'sarah';
        text = `Sebelum kita menutup sesi, apakah Anda memiliki pertanyaan untuk kami berdua mengenai kultur kerja di ${companyName} atau teknis tim?`;
      } else if (stage === 'penutup') {
        speaker = 'sarah';
        text = `Terima kasih atas penjelasan Anda. Evaluasi kesiapan karir Anda terhadap posisi ${positionName} di ${companyName} telah siap diakses.`;
      }
    } else {
      if (stage === 'pembukaan') {
        speaker = 'sarah';
        text = `Selamat pagi. Terima kasih sudah meluangkan waktu untuk mengikuti interview hari ini. Saya Sarah dari tim HRD, dan bersama saya ada Pak Andi selaku Lead Software Engineer.`;
      } else if (stage === 'perkenalan') {
        speaker = 'sarah';
        text = `Silakan perkenalkan diri Anda secara singkat dan ceritakan latar belakang profesional Anda yang paling relevan.`;
      } else if (stage === 'hr') {
        speaker = 'sarah';
        text = `Di CV Anda tertulis kemampuan bekerja di bawah tekanan. Ceritakan pengalaman nyata ketika Anda menghadapi konflik dalam tim developer.`;
      } else if (stage === 'teknis') {
        speaker = 'andi';
        text = `Halo, saya Andi. Saya ingin membahas aspek teknis. Bagaimana cara Anda mengoptimalkan performa React server component dan menangani hydration error pada Next.js?`;
      } else if (stage === 'case') {
        speaker = 'andi';
        text = `Untuk studi kasus teknis: Anda diminta membuat fitur API dengan konkurensi tinggi. Bagaimana cara Anda mengamankan endpoint dari race condition?`;
      } else if (stage === 'kandidat_tanya') {
        speaker = 'sarah';
        text = `Sebelum kita menutup sesi, apakah Anda memiliki pertanyaan untuk kami berdua mengenai perusahaan atau tim teknis kami?`;
      } else if (stage === 'penutup') {
        speaker = 'sarah';
        text = `Terima kasih atas jawaban Anda yang sangat komprehensif. Sesi interview hari ini selesai. Evaluasi lengkap dan transkrip Anda dapat diakses di halaman berikutnya.`;
      }
    }

    setActiveInterviewer(speaker);
    setSubtitles(text);
    setCurrentQuestionText(text);

    const voiceId = speaker === 'sarah' 
      ? (sessionConfig?.hrVoiceId || 'sarah-friendly')
      : (sessionConfig?.techVoiceId || 'andi-professional');

    globalAudioQueue.clearQueue();
    globalAudioQueue.enqueue({
      id: `dialogue-${stage}`,
      speaker,
      voiceId,
      text
    });
  };

  const handleReplayQuestion = () => {
    const voiceId = activeInterviewer === 'sarah'
      ? (sessionConfig?.hrVoiceId || 'sarah-friendly')
      : (sessionConfig?.techVoiceId || 'andi-professional');

    globalAudioQueue.clearQueue();
    globalAudioQueue.enqueue({
      id: `replay-${Date.now()}`,
      speaker: activeInterviewer,
      voiceId,
      text: currentQuestionText
    });
  };

  const handleFinishCandidateAnswer = async () => {
    stopRecording();
    setConversationState('evaluating_answer');
    globalAudioQueue.clearQueue();

    const currentAnswerText = answerInput || '(Jawaban lisan diberikan)';

    // Evaluate answer and check if AI follow-up is needed
    try {
      const res = await fetch('/api/interview/answer/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answerTranscript: currentAnswerText,
          questionText: currentQuestionText,
          interviewerType: activeInterviewer === 'sarah' ? 'hr' : 'technical',
          positionName: sessionConfig?.positionName || 'Frontend Developer'
        })
      });
      const data = await res.json();

      if (data.success && data.followUpRequired && data.followUpText) {
        // AI Follow-up triggered
        setConversationState('generating_follow_up');
        setSubtitles(data.followUpText);
        setCurrentQuestionText(data.followUpText);

        const voiceId = data.speaker === 'sarah'
          ? (sessionConfig?.hrVoiceId || 'sarah-friendly')
          : (sessionConfig?.techVoiceId || 'andi-professional');

        globalAudioQueue.enqueue({
          id: `followup-${Date.now()}`,
          speaker: data.speaker,
          voiceId,
          text: data.followUpText
        });
        setAnswerInput('');
        return;
      }
    } catch (err) {
      console.warn('AI Answer Evaluation error:', err);
    }

    // Save answer evaluation
    if (stage !== 'pembukaan' && stage !== 'penutup') {
      const evaluation = evaluateAnswer(currentAnswerText, {
        id: `q-${stage}`,
        fieldId: 'field-1',
        positionId: 'pos-1',
        interviewType: stage === 'hr' ? 'hr' : 'teknis',
        experienceLevel: 'fresh_grad',
        difficulty: 'medium',
        language: 'indonesia',
        question: currentQuestionText,
        objective: 'Mengevaluasi kompetensi kandidat.',
        answerTips: 'Gunakan struktur yang jelas.',
        sampleAnswer: 'Ini adalah model jawaban revisi standar.'
      });
      setAnswersLog(prev => [...prev, {
        questionText: currentQuestionText,
        answerText: currentAnswerText,
        evaluation
      }]);
    }

    setAnswerInput('');
    clearRecording();

    setTimeout(() => {
      if (stage === 'pembukaan') setStage('perkenalan');
      else if (stage === 'perkenalan') setStage('hr');
      else if (stage === 'hr') setStage('teknis');
      else if (stage === 'teknis') setStage('case');
      else if (stage === 'case') setStage('kandidat_tanya');
      else if (stage === 'kandidat_tanya') setStage('penutup');
      else if (stage === 'penutup') {
        const finalReport = {
          sessionId,
          config: sessionConfig,
          overallScore: 88,
          hrScore: 90,
          technicalScore: 86,
          communicationScore: 88,
          confidenceScore: 90,
          durationSeconds: secondsElapsed,
          completedAt: new Date().toISOString(),
          answers: answersLog.length > 0 ? answersLog : [
            {
              questionText: 'Silakan perkenalkan diri Anda secara singkat dan ceritakan latar belakang profesional Anda.',
              answerText: currentAnswerText,
              evaluation: {
                score: 86,
                strengths: ['Jelas', 'Menjelaskan posisi secara relevan'],
                weaknesses: ['Dapat ditingkatkan dengan angka proyek terukur'],
                recommendation: 'Jelaskan lebih detail pencapaian proyek Anda.',
                improvedAnswer: 'Saya lulusan IT dengan spesialisasi pengembangan web. Saya berpengalaman membangun 3 aplikasi produktif menggunakan React.',
                starAnalysis: { situation: true, task: true, action: true, result: true, feedback: 'Bagus, jawaban terstruktur.' },
                aspectScores: { communication: 88, relevance: 86, structure: 85, confidence: 88, technical: 86, problemSolving: 85 }
              }
            }
          ]
        };
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(`ai_session_result_${sessionId}`, JSON.stringify(finalReport));
          window.location.href = `/interview/result/${sessionId}`;
        }
      }
    }, 600);
  };

  const handleReRecordAnswer = () => {
    clearRecording();
    setAnswerInput('');
    if (candidateStreamRef.current) {
      startRecording(candidateStreamRef.current);
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStageName = () => {
    switch (stage) {
      case 'pembukaan': return 'Pembukaan';
      case 'perkenalan': return 'Perkenalan Kandidat';
      case 'hr': return 'Interview HR';
      case 'teknis': return 'Interview Teknis';
      case 'case': return 'Studi Kasus Teknis';
      case 'kandidat_tanya': return 'Tanya Jawab Kandidat';
      case 'penutup': return 'Penutup';
    }
  };

  const wordCount = answerInput.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-white min-h-[90vh] flex flex-col justify-between">
      
      {/* Top Header Meeting Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('Keluar dari interview virtual? Progress Anda tidak akan disimpan.')) {
                globalAudioQueue.clearQueue();
                stopRecording();
                router.push('/interview/setup');
              }
            }}
            className="p-2.5 rounded-xl bg-rose-950/80 text-rose-400 hover:text-rose-300 border border-rose-900 transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <LogOut className="w-4 h-4" /> Keluar Rapat
          </button>
          <div>
            <h2 className="text-xs text-indigo-400 font-semibold">{sessionConfig?.companyName || 'Nexora Digital'} Room</h2>
            <p className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Posisi: {sessionConfig?.positionName || 'Frontend Developer'}</span>
            </p>
          </div>
        </div>

        {/* Stage & Mic Gating Status */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="px-3 py-1 bg-slate-800 rounded-xl border border-slate-700 text-slate-300">
            Tahap: {getStageName()}
          </span>
          <span className={`px-3 py-1 rounded-xl border font-bold flex items-center gap-1.5 ${
            isCandidateMicAllowed
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
          }`}>
            <Mic className="w-3.5 h-3.5" />
            {isCandidateMicAllowed ? 'Silakan Jawab' : 'Pewawancara Berbicara...'}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl font-mono">
            <Clock className="w-4 h-4" /> {formatTimer(secondsElapsed)}
          </span>
        </div>
      </div>

      {/* Main Conference Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow items-stretch">
        
        {/* Left 9-Cols: 3-Way Video Tiles */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Tile 1: Sarah Wijaya (HRD) */}
          <div className={`relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border-2 transition ${
            activeInterviewer === 'sarah' ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' : 'border-slate-800'
          }`}>
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-950 to-indigo-950 relative">
              <div className="text-center space-y-3">
                <div className={`w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center font-bold text-2xl shadow-lg ${
                  activeInterviewer === 'sarah' && audioPlaybackState === 'playing' ? 'animate-bounce' : ''
                }`}>
                  SW
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Sarah Wijaya</h4>
                  <p className="text-[10px] text-slate-400">Human Resources Manager</p>
                </div>
              </div>

              {/* Talking status indicator */}
              {activeInterviewer === 'sarah' && audioPlaybackState === 'playing' && (
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-[10px] font-bold tracking-wider uppercase border border-indigo-400 flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> Sarah Berbicara
                  </span>
                  <SpeakingWaveform active={true} color="indigo" />
                </div>
              )}
            </div>
          </div>

          {/* Tile 2: Andi Pratama (Lead IT) */}
          <div className={`relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border-2 transition ${
            activeInterviewer === 'andi' ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-slate-800'
          }`}>
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-950 to-indigo-950 relative">
              <div className="text-center space-y-3">
                <div className={`w-20 h-20 rounded-3xl bg-emerald-600 flex items-center justify-center font-bold text-2xl shadow-lg ${
                  activeInterviewer === 'andi' && audioPlaybackState === 'playing' ? 'animate-bounce' : ''
                }`}>
                  AP
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Andi Pratama</h4>
                  <p className="text-[10px] text-slate-400">Lead Software Engineer</p>
                </div>
              </div>

              {/* Talking status indicator */}
              {activeInterviewer === 'andi' && audioPlaybackState === 'playing' && (
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-[10px] font-bold tracking-wider uppercase border border-emerald-400 flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> Andi Berbicara
                  </span>
                  <SpeakingWaveform active={true} color="emerald" />
                </div>
              )}
            </div>
          </div>

          {/* Tile 3: Candidate Camera & Waveform display */}
          <div className={`relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border-2 md:col-span-2 max-w-lg mx-auto w-full transition ${
            isCandidateMicAllowed ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-slate-800'
          }`}>
            {!cameraOff ? (
              <video
                ref={candidateVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                <p className="text-xs">Kamera Anda Dimatikan</p>
              </div>
            )}

            {/* Candidate Voice Waveform Indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border flex items-center gap-1 ${
                isCandidateSpeaking
                  ? 'bg-emerald-600 border-emerald-400 text-white'
                  : 'bg-slate-900/80 border-slate-700 text-slate-400'
              }`}>
                <Mic className="w-3.5 h-3.5" /> {isCandidateSpeaking ? 'Anda Berbicara' : 'Kandidat (Anda)'}
              </span>
              <CandidateWaveform isSpeaking={isCandidateSpeaking} audioLevel={audioLevel} />
            </div>
          </div>

        </div>

        {/* Right 3-Cols: Subtitle & Control Panel / Notepad */}
        <div className="lg:col-span-3 flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-6">
          
          <div className="space-y-4 flex-grow">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Subtitle</h3>
              <button
                onClick={() => setShowNotepad(!showNotepad)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                {showNotepad ? 'Tutup Catatan' : 'Buka Catatan'}
              </button>
            </div>

            {showNotepad ? (
              <textarea
                value={notepadText}
                onChange={(e) => setNotepadText(e.target.value)}
                placeholder="Tulis coretan atau poin-poin penting jawaban Anda di sini..."
                className="w-full h-44 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
              ></textarea>
            ) : (
              <div className="space-y-2">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-850 h-36 overflow-y-auto text-xs text-slate-300 leading-relaxed italic">
                  "{subtitles}"
                </div>
                <button
                  type="button"
                  onClick={handleReplayQuestion}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Ulangi Suara Pertanyaan
                </button>
              </div>
            )}
          </div>

          {/* Quick controls */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setMicMuted(!micMuted)}
                className={`p-3 rounded-xl border transition ${
                  !micMuted ? 'bg-slate-850 text-white border-slate-700 hover:bg-slate-800' : 'bg-rose-600 text-white border-rose-500 hover:bg-rose-500'
                }`}
                title={!micMuted ? 'Mute' : 'Unmute'}
              >
                {!micMuted ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setCameraOff(!cameraOff)}
                className={`p-3 rounded-xl border transition ${
                  !cameraOff ? 'bg-slate-850 text-white border-slate-700 hover:bg-slate-800' : 'bg-rose-600 text-white border-rose-500 hover:bg-rose-500'
                }`}
                title={!cameraOff ? 'Matikan Kamera' : 'Aktifkan Kamera'}
              >
                {!cameraOff ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Control Room: Candidate Voice Capture & Live Transcript Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        
        {/* Real-time Partial & Final Candidate Transcript Panel */}
        <CandidateTranscriptPanel
          partialTranscript={partialTranscript}
          finalTranscript={finalTranscript}
          isListening={isCandidateMicAllowed}
          isSilenceTimerActive={isSilenceTimerActive}
          totalFillerWords={fillerAnalysis.totalFillers}
          wordCount={wordCount}
        />

        {/* Text Input Mode Fallback */}
        {isTextMode && (
          <textarea
            rows={3}
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            disabled={!isCandidateMicAllowed}
            placeholder="Ketik jawaban Anda secara terstruktur menggunakan metode STAR..."
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
          ></textarea>
        )}

        {/* Candidate Control Bar */}
        <AnswerControlBar
          isCandidateMicAllowed={isCandidateMicAllowed}
          isRecording={isRecording}
          onFinishAnswer={handleFinishCandidateAnswer}
          onReRecord={handleReRecordAnswer}
          onToggleTextMode={() => setIsTextMode(!isTextMode)}
          isTextMode={isTextMode}
        />

      </div>

    </div>
  );
}
