export type SubjectId = 
  | 'cdp' 
  | 'telugu' 
  | 'english' 
  | 'mathematics' 
  | 'physical_science' 
  | 'biology';

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  teluguName: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  borderColor: string;
  badgeBg: string;
  totalAvailable: number;
}

export interface StepExplanation {
  formulaOrConcept: string;
  givenData: string;
  stepByStepCalc: string[];
  conclusion: string;
}

export interface Question {
  id: number;
  subjectId: SubjectId;
  pdfQuestionNo: number; // Exact question number as in the PDF
  topic?: string;
  questionEn?: string;
  questionTe?: string;
  options: {
    key: number; // 1, 2, 3, 4
    textEn?: string;
    textTe?: string;
  }[];
  correctAnswer: number; // 1 | 2 | 3 | 4
  explanation?: string;
  // Step-by-step explanation for Mathematics & Physical Science
  stepExplanation?: StepExplanation;
  // Memory Trick / Mnemonic for CDP, Telugu, English, Biology
  memoryTrick?: string;
  briefExplanation?: string;
}

export type QuizMode = 'practice' | 'mastery' | 'timed_exam' | 'flashcard';

export interface QuizAttempt {
  id: string;
  userId: string;
  subjectId: SubjectId;
  subjectName: string;
  mode: QuizMode;
  date: string;
  startPdfNo: number;
  endPdfNo: number;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  xpEarned: number;
  syncedToSheets?: boolean;
}

export interface SubjectProgress {
  subjectId: SubjectId;
  quizzesTaken: number;
  totalAnswered: number;
  correctAnswered: number;
  bestScorePercentage: number;
  lastPracticed?: string;
  masteryLevel: 'Novice' | 'Intermediate' | 'Proficient' | 'Master';
  lastQuestionIndex: number;
  answeredQuestionIds: number[];
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  registeredAt: string;
  isGoogleLinked?: boolean;
}

export interface UserStats {
  totalXp: number;
  quizzesCompleted: number;
  totalQuestionsAnswered: number;
  correctAnswersTotal: number;
  currentStreakDays: number;
  lastActiveDate: string;
  achievements: string[];
}

export interface StudyReminder {
  id: string;
  userId: string;
  subjectId: SubjectId;
  title: string;
  time: string; // "18:30"
  days: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[];
  enabled: boolean;
  notes?: string;
  createdAt: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  quizzesTaken: number;
  accuracy: number;
  isCurrentUser?: boolean;
  badge?: string;
  rank?: number;
  streak: number;
}

export interface GoogleSheetsConfig {
  spreadsheetId: string | null;
  spreadsheetUrl: string | null;
  lastSyncedAt: string | null;
  isAutoSyncEnabled: boolean;
}
