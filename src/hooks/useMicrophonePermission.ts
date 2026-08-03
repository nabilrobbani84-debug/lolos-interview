'use client';

import { useState, useCallback } from 'react';

export function useMicrophonePermission() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      setError(null);
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      setStream(audioStream);
      setHasPermission(true);
      return audioStream;
    } catch (err: any) {
      console.warn('Microphone permission denied:', err);
      setHasPermission(false);
      setError('Izin mikrofon ditolak atau tidak tersedia.');
      return null;
    }
  }, []);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  return {
    hasPermission,
    stream,
    error,
    requestPermission,
    stopStream
  };
}
