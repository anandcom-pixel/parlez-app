import type { Lesson, VocabularyItem, CEFRLevel } from '../types';

const CURRICULUM_OVERRIDES_KEY = 'parlez_curriculum_overrides_v1';
const CLOUD_SYNC_CHANNEL = 'parlez_cloud_sync_v1';

export interface CustomQuizItem {
  id: string;
  lessonId: string;
  level: CEFRLevel;
  type: 'quiz' | 'sentence';
  questionFr: string;
  answerEn: string;
  options?: string[]; // for multiple choice
  frenchTokens?: string[]; // for sentence builder
  explanation?: string;
  createdAt: number;
}

export interface FrenchQuote {
  id: string;
  french: string;
  english: string;
  author: string;
  category?: string;
  createdAt: number;
  updatedAt?: number;
  createdBy?: string;
}

export const isPessimisticQuote = (q: FrenchQuote | any): boolean => {
  if (!q) return false;
  if (q.id === 'quote-6') return true;
  const fr = (q.french || '').toLowerCase();
  const en = (q.english || '').toLowerCase();
  return fr.includes('qui vivra verra') || en.includes('time will tell');
};

export const DEFAULT_FRENCH_QUOTES: FrenchQuote[] = [
  {
    id: 'quote-1',
    french: "Petit à petit, l'oiseau fait son nid.",
    english: "Little by little, the bird builds its nest.",
    author: "Proverbe Français",
    category: "Proverbe & Sagesse",
    createdAt: 1700000000000
  },
  {
    id: 'quote-2',
    french: "Vouloir, c'est pouvoir.",
    english: "Where there is a will, there is a way.",
    author: "Proverbe Français",
    category: "Motivation",
    createdAt: 1700000001000
  },
  {
    id: 'quote-3',
    french: "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.",
    english: "One sees clearly only with the heart. What is essential is invisible to the eyes.",
    author: "Antoine de Saint-Exupéry",
    category: "Littérature",
    createdAt: 1700000002000
  },
  {
    id: 'quote-4',
    french: "Il n'y a pas de réussite facile ni d'échecs définitifs.",
    english: "There are no easy successes nor definitive failures.",
    author: "Marcel Proust",
    category: "Philosophie",
    createdAt: 1700000003000
  },
  {
    id: 'quote-5',
    french: "La vie est une fleur dont l'amour est le miel.",
    english: "Life is a flower of which love is the honey.",
    author: "Victor Hugo",
    category: "Poésie",
    createdAt: 1700000004000
  },
  {
    id: 'quote-7',
    french: "Mieux vaut tard que jamais.",
    english: "Better late than never.",
    author: "Proverbe Français",
    category: "Proverbe",
    createdAt: 1700000006000
  },
  {
    id: 'quote-8',
    french: "Le temps est un grand maître, il règle bien des choses.",
    english: "Time is a great teacher, it resolves many things.",
    author: "Pierre Corneille",
    category: "Littérature Classique",
    createdAt: 1700000007000
  }
];

export interface CurriculumOverrides {
  lessons: Record<string, Partial<Lesson>>;
  vocabulary: Record<string, Partial<VocabularyItem>>;
  newVocabulary: Record<string, VocabularyItem[]>; // lessonId -> new items
  customLessons: Lesson[]; // dynamically created full lessons
  customQuizItems: CustomQuizItem[]; // dynamically created quiz items
  customQuotes: FrenchQuote[]; // dynamically created or edited quotes
  lastSyncedAt?: number;
}

class CurriculumOverrideService {
  private overrides: CurriculumOverrides = {
    lessons: {},
    vocabulary: {},
    newVocabulary: {},
    customLessons: [],
    customQuizItems: [],
    customQuotes: [],
    lastSyncedAt: Date.now()
  };
  private listeners: Set<() => void> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;
  private isSyncing: boolean = false;

  constructor() {
    this.loadOverrides();
    this.initBroadcastChannel();
    this.initCloudSync();
  }

  private loadOverrides() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(CURRICULUM_OVERRIDES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const storedQuotes: any[] = Array.isArray(parsed.customQuotes) ? parsed.customQuotes : [];
        const cleanQuotes: FrenchQuote[] = storedQuotes.filter((q: any) => !isPessimisticQuote(q));
        this.overrides = {
          lessons: parsed.lessons || {},
          vocabulary: parsed.vocabulary || {},
          newVocabulary: parsed.newVocabulary || {},
          customLessons: Array.isArray(parsed.customLessons) ? parsed.customLessons : [],
          customQuizItems: Array.isArray(parsed.customQuizItems) ? parsed.customQuizItems : [],
          customQuotes: cleanQuotes,
          lastSyncedAt: parsed.lastSyncedAt || Date.now()
        };
        if (cleanQuotes.length !== storedQuotes.length) {
          localStorage.setItem(CURRICULUM_OVERRIDES_KEY, JSON.stringify(this.overrides));
        }
      }
    } catch (e) {
      console.warn('Failed to parse curriculum overrides:', e);
    }
  }

  private initBroadcastChannel() {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;
    try {
      this.broadcastChannel = new BroadcastChannel(CLOUD_SYNC_CHANNEL);
      this.broadcastChannel.onmessage = (event) => {
        if (event.data?.type === 'SYNC_OVERWRITE') {
          this.loadOverrides();
          this.notify();
        }
      };
    } catch (e) {
      console.warn('BroadcastChannel initialization error:', e);
    }
  }

  private initCloudSync() {
    if (typeof window === 'undefined') return;

    // Initial cloud sync after short delay
    setTimeout(() => {
      this.syncWithCloud();
    }, 400);

    // Re-sync on window focus to ensure instant multi-user synchronization
    window.addEventListener('focus', () => {
      this.syncWithCloud();
    });
  }

  private async saveOverrides(syncToCloud: boolean = true) {
    if (typeof window === 'undefined') return;
    this.overrides.lastSyncedAt = Date.now();
    localStorage.setItem(CURRICULUM_OVERRIDES_KEY, JSON.stringify(this.overrides));
    this.notify();

    // Broadcast update across local browser tabs
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ type: 'SYNC_OVERWRITE', timestamp: Date.now() });
      } catch (e) {
        console.warn('BroadcastChannel postMessage error:', e);
      }
    }

    if (syncToCloud) {
      this.pushToCloud();
    }
  }

  public async syncWithCloud(): Promise<boolean> {
    if (typeof window === 'undefined' || this.isSyncing) return false;
    this.isSyncing = true;
    try {
      const res = await fetch('/api/content', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        const result = await res.json();
        if (result && result.data) {
          const cloudData = result.data;

          // Merge cloud data with local store (union of custom lessons and new vocabulary)
          const localCustomLessonMap = new Map(this.overrides.customLessons.map(l => [l.id, l]));
          (cloudData.customLessons || []).forEach((cl: Lesson) => {
            localCustomLessonMap.set(cl.id, cl);
          });

          const localQuizItemMap = new Map(this.overrides.customQuizItems.map(q => [q.id, q]));
          (cloudData.customQuizItems || []).forEach((q: CustomQuizItem) => {
            localQuizItemMap.set(q.id, q);
          });

          const localQuoteMap = new Map(
            (this.overrides.customQuotes || [])
              .filter(q => !isPessimisticQuote(q))
              .map(q => [q.id, q])
          );
          (cloudData.customQuotes || [])
            .filter((cq: FrenchQuote) => !isPessimisticQuote(cq))
            .forEach((cq: FrenchQuote) => {
              localQuoteMap.set(cq.id, cq);
            });

          // Merge new vocabulary records
          const mergedNewVocab: Record<string, VocabularyItem[]> = { ...this.overrides.newVocabulary };
          if (cloudData.newVocabulary) {
            Object.entries(cloudData.newVocabulary).forEach(([lessonId, list]) => {
              const existing = mergedNewVocab[lessonId] || [];
              const existingIds = new Set(existing.map(v => v.id));
              const additions = (list as VocabularyItem[]).filter(v => !existingIds.has(v.id));
              mergedNewVocab[lessonId] = [...existing, ...additions];
            });
          }

          this.overrides = {
            lessons: { ...(cloudData.lessons || {}), ...this.overrides.lessons },
            vocabulary: { ...(cloudData.vocabulary || {}), ...this.overrides.vocabulary },
            newVocabulary: mergedNewVocab,
            customLessons: Array.from(localCustomLessonMap.values()),
            customQuizItems: Array.from(localQuizItemMap.values()),
            customQuotes: Array.from(localQuoteMap.values()),
            lastSyncedAt: Date.now()
          };

          localStorage.setItem(CURRICULUM_OVERRIDES_KEY, JSON.stringify(this.overrides));
          this.notify();
          this.isSyncing = false;
          return true;
        }
      }
    } catch (e) {
      console.warn('Cloud sync error, running in local-first mode:', e);
    }
    this.isSyncing = false;
    return false;
  }

  public async pushToCloud(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.overrides)
      });
      return res.ok;
    } catch (e) {
      console.warn('Failed to push curriculum overrides to Vercel cloud:', e);
      return false;
    }
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public getOverrides(): CurriculumOverrides {
    return this.overrides;
  }

  public hasOverrides(): boolean {
    const hasLessonOverrides = Object.keys(this.overrides.lessons).length > 0;
    const hasVocabOverrides = Object.keys(this.overrides.vocabulary).length > 0;
    const hasNewVocab = Object.values(this.overrides.newVocabulary).some(list => list.length > 0);
    const hasCustomLessons = this.overrides.customLessons.length > 0;
    const hasCustomQuiz = this.overrides.customQuizItems.length > 0;
    return hasLessonOverrides || hasVocabOverrides || hasNewVocab || hasCustomLessons || hasCustomQuiz;
  }

  public applyOverrides(lessons: Lesson[]): Lesson[] {
    const existingIds = new Set(lessons.map(l => l.id));

    // 1. Apply overrides to existing lessons and inject newly added vocabulary
    const updatedLessons = lessons.map(lesson => {
      const lessonOverride = this.overrides.lessons[lesson.id] || {};
      const newItems = this.overrides.newVocabulary[lesson.id] || [];

      const updatedVocabulary = lesson.vocabulary.map(v => {
        const vocabOverride = this.overrides.vocabulary[v.id];
        return vocabOverride ? { ...v, ...vocabOverride } : v;
      });

      return {
        ...lesson,
        ...lessonOverride,
        grammarFocus: {
          ...lesson.grammarFocus,
          ...(lessonOverride.grammarFocus || {})
        },
        vocabulary: [...updatedVocabulary, ...newItems]
      };
    });

    // 2. Append dynamically created custom lessons
    const customLessonsToAdd = (this.overrides.customLessons || []).filter(
      cl => !existingIds.has(cl.id)
    ).map(cl => {
      const newItems = this.overrides.newVocabulary[cl.id] || [];
      const lessonOverride = this.overrides.lessons[cl.id] || {};
      return {
        ...cl,
        ...lessonOverride,
        grammarFocus: {
          ...cl.grammarFocus,
          ...(lessonOverride.grammarFocus || {})
        },
        vocabulary: [...cl.vocabulary, ...newItems]
      };
    });

    return [...updatedLessons, ...customLessonsToAdd];
  }

  public saveLessonOverride(lessonId: string, partial: Partial<Lesson>) {
    this.overrides.lessons[lessonId] = {
      ...(this.overrides.lessons[lessonId] || {}),
      ...partial
    };
    this.saveOverrides(true);
  }

  public saveVocabOverride(vocabId: string, partial: Partial<VocabularyItem>) {
    this.overrides.vocabulary[vocabId] = {
      ...(this.overrides.vocabulary[vocabId] || {}),
      ...partial
    };
    this.saveOverrides(true);
  }

  public addVocabularyItem(lessonId: string, item: VocabularyItem) {
    if (!this.overrides.newVocabulary[lessonId]) {
      this.overrides.newVocabulary[lessonId] = [];
    }
    // Prevent duplicate entries by id
    const existing = this.overrides.newVocabulary[lessonId];
    if (!existing.some(v => v.id === item.id)) {
      this.overrides.newVocabulary[lessonId].push(item);
    }
    this.saveOverrides(true);
  }

  public addCustomLesson(lesson: Lesson) {
    const existingIdx = this.overrides.customLessons.findIndex(l => l.id === lesson.id);
    if (existingIdx >= 0) {
      this.overrides.customLessons[existingIdx] = lesson;
    } else {
      this.overrides.customLessons.push(lesson);
    }
    this.saveOverrides(true);
  }

  public addCustomQuizItem(item: CustomQuizItem) {
    const existingIdx = this.overrides.customQuizItems.findIndex(q => q.id === item.id);
    if (existingIdx >= 0) {
      this.overrides.customQuizItems[existingIdx] = item;
    } else {
      this.overrides.customQuizItems.push(item);
    }
    this.saveOverrides(true);
  }

  public getCustomLessons(): Lesson[] {
    return this.overrides.customLessons || [];
  }

  public getCustomQuizItems(): CustomQuizItem[] {
    return this.overrides.customQuizItems || [];
  }

  public getQuotes(): FrenchQuote[] {
    const customQuotes = (this.overrides.customQuotes || []).filter(q => !isPessimisticQuote(q));
    const customMap = new Map(customQuotes.map(q => [q.id, q]));

    const result: FrenchQuote[] = [];
    DEFAULT_FRENCH_QUOTES.filter(q => !isPessimisticQuote(q)).forEach(base => {
      if (customMap.has(base.id)) {
        result.push(customMap.get(base.id)!);
        customMap.delete(base.id);
      } else {
        result.push(base);
      }
    });

    customMap.forEach(newQuote => {
      result.push(newQuote);
    });

    return result.filter(q => !isPessimisticQuote(q));
  }

  public saveQuote(quote: FrenchQuote) {
    if (!this.overrides.customQuotes) {
      this.overrides.customQuotes = [];
    }
    const existingIndex = this.overrides.customQuotes.findIndex(q => q.id === quote.id);
    if (existingIndex >= 0) {
      this.overrides.customQuotes[existingIndex] = { ...quote, updatedAt: Date.now() };
    } else {
      this.overrides.customQuotes.push({ ...quote, updatedAt: Date.now() });
    }
    this.saveOverrides(true);
  }

  public addQuote(french: string, english: string, author?: string, category?: string, createdBy?: string): FrenchQuote {
    if (!this.overrides.customQuotes) {
      this.overrides.customQuotes = [];
    }
    const newQuote: FrenchQuote = {
      id: `quote-${Date.now()}`,
      french: french.trim(),
      english: english.trim(),
      author: (author && author.trim()) || 'Proverbe Français',
      category: (category && category.trim()) || 'Inspiration',
      createdAt: Date.now(),
      createdBy: createdBy || 'utilisateur'
    };
    this.overrides.customQuotes.push(newQuote);
    this.saveOverrides(true);
    return newQuote;
  }

  public resetAllOverrides() {
    this.overrides = {
      lessons: {},
      vocabulary: {},
      newVocabulary: {},
      customLessons: [],
      customQuizItems: [],
      customQuotes: [],
      lastSyncedAt: Date.now()
    };
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CURRICULUM_OVERRIDES_KEY);
    }
    this.saveOverrides(true);
  }
}

export const curriculumOverrideService = new CurriculumOverrideService();
