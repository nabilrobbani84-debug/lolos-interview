'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface VADOptions {
  enabled: boolean;
  stream: MediaStream | null;
  speechStartThreshold?: number; // Volume threshold 0-100
  silenceTimeoutMs?: number; // Silence buffer before triggering paused/stop
  onSpeechStart?: () => void;
  onSpeechStop?: () => void;
  onSilenceTimeout?: () => void;
}

export function useVoiceActivityDetection({
  enabled,
  stream,
  speechStartThreshold = 12,
  silenceTimeoutMs = 2200,
  onSpeechStart,
  onSpeechStop,
  onSilenceTimeout
}: VADOptions) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0); // 0-100
  const [isSilenceTimerActive, setIsSilenceTimerActive] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cleanUpAudio = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }
    audioContextRef.current = null;
    analyserRef.current = null;
    setIsSpeaking(false);
    setAudioLevel(0);
    setIsSilenceTimerActive(false);
  }, []);

  useEffect(() => {
    if (!enabled || !stream) {
      cleanUpAudio();
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setAudioLevel(normalized);

        if (normalized >= speechStartThreshold) {
          if (!isSpeaking) {
            setIsSpeaking(true);
            if (onSpeechStart) onSpeechStart();
          }
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
            setIsSilenceTimerActive(false);
          }
        } else if (isSpeaking && !silenceTimerRef.current) {
          setIsSilenceTimerActive(true);
          silenceTimerRef.current = setTimeout(() => {
            setIsSpeaking(false);
            setIsSilenceTimerActive(false);
            if (onSpeechStop) onSpeechStop();
            if (onSilenceTimeout) onSilenceTimeout();
          }, silenceTimeoutMs);
        }

        animFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.warn('VAD AudioContext error:', err);
    }

    return () => {
      cleanUpAudio();
    };
  }, [enabled, stream, speechStartThreshold, silenceTimeoutMs, cleanUpAudio, isSpeaking, onSpeechStart, onSpeechStop, onSilenceTimeout]);

  return {
    isSpeaking,
    audioLevel,
    isSilenceTimerActive
  };
}
