'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { analyzeFillerWords } from '@/lib/audio-capture/technical-vocabulary';

interface RecorderOptions {
  language?: string; // 'id-ID' or 'en-US'
  onPartialTranscript?: (text: string) => void;
  onFinalTranscript?: (text: string) => void;
}

export function useCandidateRecorder(options?: RecorderOptions) {
  const [isRecording, setIsRecording] = useState(false);
  const [partialTranscript, setPartialTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  const startRecording = useCallback(async (stream: MediaStream) => {
    try {
      setPartialTranscript('');
      setFinalTranscript('');
      setRecordedAudioUrl(null);
      audioChunksRef.current = [];

      // Start MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';
      
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
      };

      recorder.start(250); // Emit 250ms chunks
      setIsRecording(true);

      // Start SpeechRecognition for Real-time Transcription
      if (typeof window !== 'undefined') {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          const rec = new SpeechRecognition();
          rec.continuous = true;
          rec.interimResults = true;
          rec.lang = options?.language === 'english' ? 'en-US' : 'id-ID';

          rec.onresult = (event: any) => {
            let interim = '';
            let final = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                final += event.results[i][0].transcript + ' ';
              } else {
                interim += event.results[i][0].transcript;
              }
            }

            if (interim) {
              setPartialTranscript(interim);
              if (options?.onPartialTranscript) options.onPartialTranscript(interim);
            }

            if (final) {
              setFinalTranscript(prev => {
                const updated = (prev + ' ' + final).trim();
                if (options?.onFinalTranscript) options.onFinalTranscript(updated);
                return updated;
              });
              setPartialTranscript('');
            }
          };

          rec.onerror = (err: any) => {
            console.warn('SpeechRecognition error:', err);
          };

          rec.start();
          recognitionRef.current = rec;
        }
      }
    } catch (err) {
      console.warn('Failed to start candidate recorder:', err);
    }
  }, [options]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
      recognitionRef.current = null;
    }
    setIsRecording(false);
  }, []);

  const clearRecording = useCallback(() => {
    stopRecording();
    setPartialTranscript('');
    setFinalTranscript('');
    setRecordedAudioUrl(null);
    audioChunksRef.current = [];
  }, [stopRecording]);

  const combinedText = (finalTranscript + ' ' + partialTranscript).trim();
  const fillerAnalysis = analyzeFillerWords(combinedText);

  return {
    isRecording,
    partialTranscript,
    finalTranscript,
    combinedText,
    recordedAudioUrl,
    fillerAnalysis,
    startRecording,
    stopRecording,
    clearRecording
  };
}
