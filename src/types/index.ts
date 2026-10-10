export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface VocabularyItem {
  id: string;
  french: string;
  english: string;
  ipa?: string;
  gender?: 'm' | 'f' | 'pl' | 'none';
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'phrase' | 'adverb' | 'expression';
  exampleFrench: string;
  exampleEnglish: string;
  pronunciationTip?: string;
  level: CEFRLevel;
  category: string;
}

export interface DialogueLine {
  speaker: string;
  french: string;
  english: string;
  audioRate?: number;
}

export interface Dialogue {
  id: string;
  title: string;
  scenario: string;
  lines: DialogueLine[];
}

export interface Lesson {
  id: string;
  level: CEFRLevel;
  title: string;
  subtitle: string;
  theme: string;
  description: string;
  grammarFocus: {
    ruleName: string;
    explanation: string;
    examples: { fr: string; en: string }[];
  };
  culturalNote?: string;
  idiomSpotlight?: {
    french: string;
    literal: string;
    meaning: string;
    example: string;
  };
  vocabulary: VocabularyItem[];
  dialogue?: Dialogue;
}

export interface LeitnerCard {
  vocabId: string;
  french: string;
  english: string;
  level: CEFRLevel;
  box: 1 | 2 | 3 | 4 | 5; // 1: Daily, 2: 2 days, 3: 4 days, 4: 7 days, 5: 14 days
  lastReviewed: string; // ISO date
  nextReviewDate: string; // ISO date
  consecutiveCorrect: number;
  timesReviewed: number;
  timesFailed: number;
}

export interface UserStats {
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  wordsMastered: number;
  testsCompleted: number;
  voiceDrillsPassed: number;
  levelRank: string;
  badges: Badge[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface WordMatchComparison {
  word: string;
  status: 'correct' | 'partial' | 'missing' | 'unexpected';
  expectedWord?: string;
  similarity: number;
}

export interface VoiceComparisonResult {
  targetText: string;
  spokenText: string;
  accuracyScore: number; // 0 - 100
  passed: boolean;
  wordAnalysis: WordMatchComparison[];
  feedbackNotes: string[];
}

export type TestType = 'multiple-choice' | 'matching' | 'spelling';

export interface TestQuestion {
  id: string;
  type: TestType;
  prompt: string;
  subPrompt?: string;
  targetVocab: VocabularyItem;
  options?: string[]; // for multiple-choice
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

// ==========================================
// MISTAKE VAULT TYPES
// ==========================================
export type MistakeType = 'vocab' | 'pronunciation' | 'grammar';
export type MistakeStatus = 'unresolved' | 'practicing' | 'mastered';

export interface MistakeEntry {
  id: string;
  type: MistakeType;
  french: string;
  english: string;
  level: CEFRLevel;
  failedAt: string; // ISO date
  contextNote: string;
  consecutiveCorrect: number;
  status: MistakeStatus;
  phoneticTip?: string;
}

// ==========================================
// SENTENCE BUILDER TYPES
// ==========================================
export interface SentenceBuilderItem {
  id: string;
  level: CEFRLevel;
  englishPrompt: string;
  frenchCorrect: string;
  scrambledWords: string[];
  grammarHint: string;
  culturalNote?: string;
}

// ==========================================
// SPEED DRILL TYPES
// ==========================================
export interface SpeedDrillQuestion {
  id: string;
  type: 'pick_translation' | 'true_false';
  promptFrench: string;
  promptEnglish: string;
  options?: string[]; // 4 options for pick_translation
  correctAnswer: string | boolean;
  level: CEFRLevel;
}
