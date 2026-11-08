import type { Lesson, VocabularyItem } from '../types';

const CURRICULUM_OVERRIDES_KEY = 'parlez_curriculum_overrides_v1';

export interface CurriculumOverrides {
  lessons: Record<string, Partial<Lesson>>;
  vocabulary: Record<string, Partial<VocabularyItem>>;
  newVocabulary: Record<string, VocabularyItem[]>; // lessonId -> new items
}

class CurriculumOverrideService {
  private overrides: CurriculumOverrides = {
    lessons: {},
    vocabulary: {},
    newVocabulary: {}
  };
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadOverrides();
  }

  private loadOverrides() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(CURRICULUM_OVERRIDES_KEY);
      if (stored) {
        this.overrides = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse curriculum overrides:', e);
    }
  }

  private saveOverrides() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CURRICULUM_OVERRIDES_KEY, JSON.stringify(this.overrides));
    this.notify();
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
    return hasLessonOverrides || hasVocabOverrides || hasNewVocab;
  }

  public applyOverrides(lessons: Lesson[]): Lesson[] {
    return lessons.map(lesson => {
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
  }

  public saveLessonOverride(lessonId: string, partial: Partial<Lesson>) {
    this.overrides.lessons[lessonId] = {
      ...(this.overrides.lessons[lessonId] || {}),
      ...partial
    };
    this.saveOverrides();
  }

  public saveVocabOverride(vocabId: string, partial: Partial<VocabularyItem>) {
    this.overrides.vocabulary[vocabId] = {
      ...(this.overrides.vocabulary[vocabId] || {}),
      ...partial
    };
    this.saveOverrides();
  }

  public addVocabularyItem(lessonId: string, item: VocabularyItem) {
    if (!this.overrides.newVocabulary[lessonId]) {
      this.overrides.newVocabulary[lessonId] = [];
    }
    this.overrides.newVocabulary[lessonId].push(item);
    this.saveOverrides();
  }

  public resetAllOverrides() {
    this.overrides = {
      lessons: {},
      vocabulary: {},
      newVocabulary: {}
    };
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CURRICULUM_OVERRIDES_KEY);
    }
    this.notify();
  }
}

export const curriculumOverrideService = new CurriculumOverrideService();
