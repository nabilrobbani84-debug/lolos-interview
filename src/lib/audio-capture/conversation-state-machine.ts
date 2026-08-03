/**
 * Interview Conversation State Machine
 * Defines all valid conversation states and active speaker designations.
 */

export type InterviewConversationState =
  | 'idle'
  | 'interviewer_generating'
  | 'interviewer_speaking'
  | 'candidate_ready'
  | 'candidate_listening'
  | 'candidate_speaking'
  | 'candidate_paused'
  | 'candidate_reviewing'
  | 'processing_transcript'
  | 'evaluating_answer'
  | 'generating_follow_up'
  | 'completed'
  | 'error';

export type ActiveSpeaker =
  | 'hr'
  | 'technical_lead'
  | 'candidate'
  | 'system'
  | null;

export interface StateTransitionEvent {
  previousState: InterviewConversationState;
  nextState: InterviewConversationState;
  activeSpeaker: ActiveSpeaker;
  timestamp: string;
}

export function getActiveSpeakerForState(state: InterviewConversationState, activeInterviewer: 'sarah' | 'andi'): ActiveSpeaker {
  switch (state) {
    case 'interviewer_generating':
    case 'interviewer_speaking':
      return activeInterviewer === 'sarah' ? 'hr' : 'technical_lead';
    case 'candidate_ready':
    case 'candidate_listening':
    case 'candidate_speaking':
    case 'candidate_paused':
    case 'candidate_reviewing':
      return 'candidate';
    case 'processing_transcript':
    case 'evaluating_answer':
    case 'generating_follow_up':
      return 'system';
    default:
      return null;
  }
}
