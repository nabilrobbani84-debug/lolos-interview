/**
 * Voice Provider Service
 * Manages voice personas for HRD (Sarah) and Lead IT (Andi), voice previews, and Web Speech API synthesis.
 */

import { formatTextForTTS } from './pronunciation-dictionary';

export interface VoiceOption {
  id: string;
  name: string;
  interviewerType: 'hr' | 'technical';
  gender: 'female' | 'male';
  style: 'friendly' | 'professional' | 'firm' | 'senior' | 'technical_lead';
  pitch: number;
  rate: number;
  description: string;
}

export const HR_VOICE_OPTIONS: VoiceOption[] = [
  {
    id: 'sarah-friendly',
    name: 'Sarah (Perempuan Ramah)',
    interviewerType: 'hr',
    gender: 'female',
    style: 'friendly',
    pitch: 1.3,
    rate: 0.95,
    description: 'Suara perempuan hangat, sopan, dan menenangkan. Cocok untuk perkenalan.'
  },
  {
    id: 'sarah-professional',
    name: 'Sarah (Perempuan Profesional)',
    interviewerType: 'hr',
    gender: 'female',
    style: 'professional',
    pitch: 1.2,
    rate: 1.0,
    description: 'Suara perempuan formal, terstruktur, dan teratur.'
  },
  {
    id: 'sarah-firm',
    name: 'Sarah (Perempuan Tegas)',
    interviewerType: 'hr',
    gender: 'female',
    style: 'firm',
    pitch: 1.1,
    rate: 1.05,
    description: 'Suara perempuan tegas dan kritis saat menggali pengalaman konflik.'
  },
  {
    id: 'budi-hr-friendly',
    name: 'Budi (Laki-laki Ramah)',
    interviewerType: 'hr',
    gender: 'male',
    style: 'friendly',
    pitch: 1.0,
    rate: 0.95,
    description: 'Suara pria hangat dan informatif dari tim HR.'
  }
];

export const TECHNICAL_VOICE_OPTIONS: VoiceOption[] = [
  {
    id: 'andi-professional',
    name: 'Andi (Laki-laki Profesional)',
    interviewerType: 'technical',
    gender: 'male',
    style: 'professional',
    pitch: 0.85,
    rate: 1.0,
    description: 'Suara pria dewasa, tenang, analitis, dan berpengalaman.'
  },
  {
    id: 'andi-senior',
    name: 'Andi (Laki-laki Senior)',
    interviewerType: 'technical',
    gender: 'male',
    style: 'senior',
    pitch: 0.75,
    rate: 0.95,
    description: 'Suara pria senior, mendalam, dan fokus pada arsitektur sistem.'
  },
  {
    id: 'andi-firm',
    name: 'Andi (Laki-laki Tegas)',
    interviewerType: 'technical',
    gender: 'male',
    style: 'firm',
    pitch: 0.8,
    rate: 1.05,
    description: 'Suara pria kritis saat memberikan tantangan studi kasus.'
  },
  {
    id: 'dian-tech-lead',
    name: 'Dian (Perempuan Tech Lead)',
    interviewerType: 'technical',
    gender: 'female',
    style: 'technical_lead',
    pitch: 1.15,
    rate: 1.0,
    description: 'Suara perempuan technical lead yang lugas dan berfokus pada best practices.'
  }
];

export function getVoiceById(id: string): VoiceOption {
  const all = [...HR_VOICE_OPTIONS, ...TECHNICAL_VOICE_OPTIONS];
  return all.find(v => v.id === id) || HR_VOICE_OPTIONS[0];
}

/**
 * Plays speech preview using Web Speech API
 */
export function playVoicePreview(
  voiceId: string,
  text: string,
  userRate: number = 1.0,
  userVolume: number = 1.0,
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  window.speechSynthesis.cancel();
  const voiceConfig = getVoiceById(voiceId);
  const formattedText = formatTextForTTS(text);

  const utterance = new SpeechSynthesisUtterance(formattedText);
  utterance.lang = 'id-ID';
  utterance.pitch = voiceConfig.pitch;
  utterance.rate = voiceConfig.rate * userRate;
  utterance.volume = userVolume;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Stops any ongoing speech synthesis preview or playback
 */
export function stopVoiceSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
