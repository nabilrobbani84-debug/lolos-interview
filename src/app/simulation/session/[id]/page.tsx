'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  LogOut, 
  Lightbulb, 
  Send, 
  CheckCircle2,
  Sparkles,
  Volume2
} from 'lucide-react';
import InterviewerAvatar from '@/components/simulation/InterviewerAvatar';
import AudioRecorder from '@/components/simulation/AudioRecorder';
import { MOCK_QUESTIONS, MOCK_POSITIONS } from '@/lib/mock-data';
import { Question, SessionAnswer } from '@/lib/types';
import { evaluateAnswer } from '@/lib/evaluation-engine';

export default function SessionStudioPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params?.id as string;

  const [sessionConfig, setSessionConfig] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<SessionAnswer[]>([]);
  
  const [currentTextAnswer, setCurrentTextAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load config & setup questions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(`session_config_${sessionId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSessionConfig(parsed);

        // Filter matching questions or fallback
        const matching = MOCK_QUESTIONS.filter(q => q.positionId === parsed.positionId || q.fieldName === parsed.fieldName);
        const activeList = matching.length >= parsed.questionCount 
          ? matching.slice(0, parsed.questionCount)
          : [...matching, ...MOCK_QUESTIONS].slice(0, parsed.questionCount);

        setQuestions(activeList);
      } else {
        // Default fallback session
        setQuestions(MOCK_QUESTIONS.slice(0, 5));
        setSessionConfig({
          positionName: 'Frontend Developer',
          interviewType: 'full',
          questionCount: 5,
          answerMode: 'text'
        });
      }
    }

    timerRef.current = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionId]);

  const currentQuestion = questions[currentIndex] || MOCK_QUESTIONS[0];
  const isLastQuestion = currentIndex === questions.length - 1;

  const speakCurrentQuestion = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.pitch = 1.1;
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (currentQuestion?.question) {
      speakCurrentQuestion(currentQuestion.question);
    }
  }, [currentIndex, questions]);

  const wordCount = currentTextAnswer.trim().split(/\s+/).filter(Boolean).length;

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (!currentTextAnswer.trim()) return;

    // Evaluate answer instantly
    const evalResult = evaluateAnswer(currentTextAnswer, currentQuestion);

    const newAnswer: SessionAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      answerText: currentTextAnswer,
      evaluation: evalResult
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Calculate overall score
      const totalScore = updatedAnswers.reduce((acc, curr) => acc + (curr.evaluation?.score || 75), 0);
      const avgScore = Math.round(totalScore / updatedAnswers.length);

      const finalReport = {
        sessionId,
        config: sessionConfig,
        overallScore: avgScore,
        durationSeconds: secondsElapsed,
        answers: updatedAnswers,
        completedAt: new Date().toISOString()
      };

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`session_result_${sessionId}`, JSON.stringify(finalReport));
        window.location.href = `/simulation/result/${sessionId}`;
      }
    } else {
      setCurrentIndex(prev => prev + 1);
      setCurrentTextAnswer('');
      setShowHint(false);
    }
  };

  const handleSkipQuestion = () => {
    const skippedAnswer: SessionAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      answerText: '(Pertanyaan Dilewati)',
      evaluation: {
        score: 50,
        strengths: [],
        weaknesses: ['Pertanyaan ini dilewati oleh pengguna.'],
        recommendation: 'Latih kembali pertanyaan ini untuk memperkuat area pemahaman Anda.',
        improvedAnswer: currentQuestion.sampleAnswer,
        starAnalysis: { situation: false, task: false, action: false, result: false, feedback: 'Pertanyaan dilewati.' },
        aspectScores: { communication: 50, relevance: 50, structure: 50, confidence: 50, technical: 50, problemSolving: 50 }
      }
    };

    const updatedAnswers = [...userAnswers, skippedAnswer];
    setUserAnswers(updatedAnswers);

    if (isLastQuestion) {
      if (typeof window !== 'undefined') {
        window.location.href = `/simulation/result/${sessionId}`;
      }
    } else {
      setCurrentIndex(prev => prev + 1);
      setCurrentTextAnswer('');
      setShowHint(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header Controls & Progress */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin keluar dari sesi interview?')) {
                router.push('/simulation/setup');
              }
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            title="Keluar Sesi"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <div>
            <div className="text-xs font-semibold text-indigo-400">
              Posisi: {sessionConfig?.positionName || 'Frontend Developer'}
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              Pertanyaan {currentIndex + 1} dari {questions.length}
            </div>
          </div>
        </div>

        {/* Progress Bar & Timer */}
        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
          <div className="w-32 sm:w-48 bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / (questions.length || 1)) * 100}%` }}
            ></div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
            <Clock className="w-4 h-4" />
            {formatTimer(secondsElapsed)}
          </div>
        </div>
      </div>

      {/* Recruiter Avatar Persona */}
      <InterviewerAvatar
        name="Sarah Wijaya"
        role="HR Recruitment Manager"
        company="Nusantara Digital"
        style="Profesional, Konstruktif & Berpengalaman"
      />

      {/* Question Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            {currentQuestion?.interviewType?.toUpperCase()} INTERVIEW
          </span>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 transition"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? 'Sembunyikan Petunjuk' : 'Minta Petunjuk Recruiter'}
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
          "{currentQuestion?.question}"
        </h2>

        {/* Hint Dropdown */}
        {showHint && (
          <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-2xl space-y-1 animate-in fade-in duration-200">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" /> Tips Menjawab dari Recruiter:
            </div>
            <p className="text-xs text-slate-300 italic">{currentQuestion?.answerTips}</p>
          </div>
        )}
      </div>

      {/* Answer Mode Section (Text vs Voice) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        
        {sessionConfig?.answerMode === 'voice' ? (
          <AudioRecorder onTranscriptChange={(txt) => setCurrentTextAnswer(txt)} />
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Kolom Jawaban Anda (Mode Teks):</span>
              <span className={wordCount >= 40 ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                {wordCount} Kata {wordCount < 40 && '(Disarankan minimal 40 kata)'}
              </span>
            </div>

            <textarea
              rows={6}
              value={currentTextAnswer}
              onChange={(e) => setCurrentTextAnswer(e.target.value)}
              placeholder="Tuliskan jawaban Anda secara terstruktur menggunakan metode STAR (Situation, Task, Action, Result)..."
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 leading-relaxed transition resize-y"
            ></textarea>
          </div>
        )}

        {/* Bottom Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handleSkipQuestion}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition border border-slate-700"
          >
            Lewati Pertanyaan Ini
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={!currentTextAnswer.trim()}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition shadow-lg ${
              currentTextAnswer.trim()
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            {isLastQuestion ? 'Selesaikan Interview & Lihat Hasil' : 'Simpan & Pertanyaan Berikutnya'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
