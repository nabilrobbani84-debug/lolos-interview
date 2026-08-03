/**
 * Audio Queue & State Coordination Service
 * Manages non-overlapping playback, natural pauses, candidate mic gating, and status events.
 */

import { formatTextForTTS } from './pronunciation-dictionary';
import { getVoiceById } from './voice-provider-service';

export type AudioPlaybackState =
  | 'idle'
  | 'generating'
  | 'buffering'
  | 'playing'
  | 'paused'
  | 'completed'
  | 'failed';

export interface QueueItem {
  id: string;
  speaker: 'sarah' | 'andi';
  voiceId: string;
  text: string;
  priority?: number;
  onStart?: () => void;
  onEnd?: () => void;
}

export class AudioQueueService {
  private queue: QueueItem[] = [];
  private isProcessing = false;
  private currentState: AudioPlaybackState = 'idle';
  private currentItem: QueueItem | null = null;
  private volume = 0.8;
  private speakingRate = 1.0;
  private isMuted = false;
  private stateChangeListeners: ((state: AudioPlaybackState, current: QueueItem | null) => void)[] = [];
  private micGatingListeners: ((isCandidateMicAllowed: boolean) => void)[] = [];

  constructor() {
    this.queue = [];
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public setSpeakingRate(rate: number) {
    this.speakingRate = rate;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.setState('idle');
    }
  }

  public subscribeState(listener: (state: AudioPlaybackState, current: QueueItem | null) => void) {
    this.stateChangeListeners.push(listener);
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter(l => l !== listener);
    };
  }

  public subscribeMicGating(listener: (isCandidateMicAllowed: boolean) => void) {
    this.micGatingListeners.push(listener);
    return () => {
      this.micGatingListeners = this.micGatingListeners.filter(l => l !== listener);
    };
  }

  public enqueue(item: QueueItem) {
    this.queue.push(item);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  public clearQueue() {
    this.queue = [];
    this.stopCurrent();
  }

  public stopCurrent() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.setState('idle');
    this.notifyMicGating(true);
  }

  private setState(state: AudioPlaybackState) {
    this.currentState = state;
    this.stateChangeListeners.forEach(l => l(state, this.currentItem));
  }

  private notifyMicGating(isCandidateMicAllowed: boolean) {
    this.micGatingListeners.forEach(l => l(isCandidateMicAllowed));
  }

  private async processQueue() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      this.currentItem = null;
      this.setState('idle');
      // Natural 500ms delay before opening candidate mic
      setTimeout(() => {
        this.notifyMicGating(true);
      }, 500);
      return;
    }

    this.isProcessing = true;
    this.currentItem = this.queue.shift()!;
    this.notifyMicGating(false); // Disable candidate mic while interviewer speaks

    if (this.isMuted) {
      if (this.currentItem.onStart) this.currentItem.onStart();
      if (this.currentItem.onEnd) this.currentItem.onEnd();
      this.processQueue();
      return;
    }

    this.setState('playing');
    if (this.currentItem.onStart) this.currentItem.onStart();

    const textToSpeak = formatTextForTTS(this.currentItem.text);
    const voiceConfig = getVoiceById(this.currentItem.voiceId);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'id-ID';
      utterance.pitch = voiceConfig.pitch;
      utterance.rate = voiceConfig.rate * this.speakingRate;
      utterance.volume = this.volume;

      utterance.onend = () => {
        if (this.currentItem && this.currentItem.onEnd) {
          this.currentItem.onEnd();
        }
        this.setState('completed');
        // Natural pause between dialogue items (600ms)
        setTimeout(() => {
          this.processQueue();
        }, 600);
      };

      utterance.onerror = () => {
        this.setState('failed');
        if (this.currentItem && this.currentItem.onEnd) {
          this.currentItem.onEnd();
        }
        this.processQueue();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback for environments without Web Speech API
      setTimeout(() => {
        if (this.currentItem && this.currentItem.onEnd) {
          this.currentItem.onEnd();
        }
        this.processQueue();
      }, 2000);
    }
  }
}

export const globalAudioQueue = new AudioQueueService();
