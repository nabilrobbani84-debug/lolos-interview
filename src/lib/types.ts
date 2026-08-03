export type Role = 'user' | 'admin';
export type SubscriptionType = 'free' | 'pro';

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  role: Role;
  subscriptionType: SubscriptionType;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  education: string;
  major: string;
  experienceLevel: string;
  skills: string[];
  targetPosition: string;
  cvUrl?: string;
}

export interface FieldCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  positionCount: number;
  popularPositions: string[];
}

export interface Position {
  id: string;
  fieldId: string;
  fieldName: string;
  name: string;
  slug: string;
  description: string;
  competencies: string[];
  questionCount: number;
  estimatedDuration: string;
  sampleQuestions: string[];
}

export type InterviewType = 'hr' | 'user' | 'teknis' | 'behavioral' | 'case_study' | 'english' | 'full';
export type ExperienceLevel = 'student' | 'fresh_grad' | 'junior' | 'mid' | 'senior' | 'manager';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type Language = 'indonesia' | 'english' | 'mixed';
export type AnswerMode = 'text' | 'voice' | 'video';

export interface Question {
  id: string;
  fieldId: string;
  positionId: string;
  fieldName?: string;
  positionName?: string;
  interviewType: InterviewType;
  experienceLevel: ExperienceLevel;
  difficulty: Difficulty;
  language: Language;
  question: string;
  objective: string;
  answerTips: string;
  sampleAnswer: string;
  avoidMistakes?: string[];
}

export interface STARAnalysis {
  situation: boolean;
  task: boolean;
  action: boolean;
  result: boolean;
  feedback: string;
}

export interface AnswerEvaluation {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
  improvedAnswer: string;
  starAnalysis: STARAnalysis;
  aspectScores: {
    communication: number;
    relevance: number;
    structure: number;
    confidence: number;
    technical: number;
    problemSolving: number;
  };
}

export interface SessionAnswer {
  questionId: string;
  questionText: string;
  answerText: string;
  audioUrl?: string;
  evaluation?: AnswerEvaluation;
}

export interface InterviewSession {
  id: string;
  userId: string;
  fieldId: string;
  positionId: string;
  fieldName: string;
  positionName: string;
  interviewType: InterviewType;
  experienceLevel: ExperienceLevel;
  difficulty: Difficulty;
  language: Language;
  answerMode: AnswerMode;
  totalQuestions: number;
  durationSeconds: number;
  overallScore: number;
  startedAt: string;
  completedAt: string;
  answers: SessionAnswer[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  readTime: string;
  publishedAt: string;
  category: string;
}

export interface InterviewCompany {
  id: string;
  name: string;
  slug: string;
  industry: string;
  description: string;
  logoUrl?: string;
  cultureDescription: string;
  technologyStack: string[];
  companySize: string;
  workSystem: string;
}

export interface Interviewer {
  id: string;
  name: string;
  role: string;
  interviewerType: 'hr' | 'technical' | 'user';
  avatarUrl?: string;
  personality: string;
  speakingStyle: string;
}

export interface TechnicalCase {
  id: string;
  positionId: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  expectedTopics: string[];
  evaluationCriteria: string[];
}

export interface CandidateJobVacancy {
  id: string;
  userId: string;
  jobTitle: string;
  companyName: string;
  companyIndustry?: string;
  location?: string;
  workArrangement: 'onsite' | 'hybrid' | 'remote';
  employmentType: string;
  seniorityLevel: string;
  sourcePlatform?: string;
  sourceUrl?: string;
  originalText: string;
  cleanedText: string;
  parsedData: string; // JSON string representing extracted structured data
  recruiterName?: string;
  recruiterRole?: string;
  applicationStatus: 'akan_dilamar' | 'sudah_dilamar' | 'interview_hr' | 'interview_teknis' | 'menunggu_hasil' | 'diterima' | 'tidak_dilanjutkan';
  isFavorite: boolean;
  actualInterviewDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VacancyRequirement {
  id: string;
  vacancyId: string;
  requirementType: 'education' | 'experience' | 'programming_language' | 'framework' | 'database' | 'devops' | 'security' | 'methodology' | 'soft_skill' | 'responsibility' | 'other';
  name: string;
  description: string;
  priority: 'must_have' | 'important' | 'nice_to_have';
  minimumYears?: number;
}

export interface VacancyCvMatch {
  id: string;
  vacancyId: string;
  overallMatchScore: number;
  technicalMatchScore: number;
  experienceMatchScore: number;
  educationMatchScore: number;
  matchedRequirements: string[];
  partiallyMatchedRequirements: string[];
  missingRequirements: string[];
  recommendations: string[];
}

export interface VacancyInterviewConfig {
  id: string;
  vacancyId: string;
  sessionId: string;
  selectedRequirements: string[];
  hrFocus: string[];
  technicalFocus: string[];
  generatedQuestions: string[];
}


