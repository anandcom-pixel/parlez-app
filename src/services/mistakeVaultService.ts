import type { MistakeEntry, MistakeType, CEFRLevel } from '../types';

const MISTAKE_VAULT_KEY = 'parlezapp_mistake_vault_v1';

class MistakeVaultService {
  private mistakes: MistakeEntry[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadState();
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  private loadState() {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(MISTAKE_VAULT_KEY);
      if (saved) {
        this.mistakes = JSON.parse(saved);
      } else {
        // Pre-populate with a couple realistic examples for instant discovery
        this.mistakes = [
          {
            id: 'mv-seed-1',
            type: 'pronunciation',
            french: 'bonjour',
            english: 'good morning / hello',
            level: 'A1',
            failedAt: new Date().toISOString(),
            contextNote: 'Nasal vowel /ɔ̃/ needs softer closure without pronouncing a hard "n".',
            consecutiveCorrect: 0,
            status: 'unresolved',
            phoneticTip: 'Keep your tongue low in the back of your mouth.'
          },
          {
            id: 'mv-seed-2',
            type: 'grammar',
            french: 'Je me réveille à sept heures.',
            english: 'I wake up at seven o’clock.',
            level: 'A2',
            failedAt: new Date().toISOString(),
            contextNote: 'Reflexive pronoun "me" was misplaced after the verb in sentence construction.',
            consecutiveCorrect: 0,
            status: 'unresolved'
          }
        ];
        this.saveState();
      }
    } catch {
      this.mistakes = [];
    }
  }

  private saveState() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(MISTAKE_VAULT_KEY, JSON.stringify(this.mistakes));
    this.notify();
  }

  public addMistake(data: {
    type: MistakeType;
    french: string;
    english: string;
    level: CEFRLevel;
    contextNote: string;
    phoneticTip?: string;
  }): void {
    // Check if an entry with the same french phrase already exists
    const cleanFrench = data.french.trim().toLowerCase();
    const existing = this.mistakes.find(
      m => m.french.trim().toLowerCase() === cleanFrench && m.type === data.type
    );

    if (existing) {
      existing.failedAt = new Date().toISOString();
      existing.contextNote = data.contextNote;
      existing.consecutiveCorrect = 0;
      existing.status = 'unresolved';
      if (data.phoneticTip) existing.phoneticTip = data.phoneticTip;
    } else {
      const newEntry: MistakeEntry = {
        id: `mv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        type: data.type,
        french: data.french,
        english: data.english,
        level: data.level,
        failedAt: new Date().toISOString(),
        contextNote: data.contextNote,
        consecutiveCorrect: 0,
        status: 'unresolved',
        phoneticTip: data.phoneticTip
      };
      this.mistakes.unshift(newEntry);
    }

    this.saveState();
  }

  public recordMistakeReview(id: string, isCorrect: boolean): void {
    const entry = this.mistakes.find(m => m.id === id);
    if (!entry) return;

    if (isCorrect) {
      entry.consecutiveCorrect += 1;
      if (entry.consecutiveCorrect >= 2) {
        entry.status = 'mastered';
      } else {
        entry.status = 'practicing';
      }
    } else {
      entry.consecutiveCorrect = 0;
      entry.status = 'unresolved';
      entry.failedAt = new Date().toISOString();
    }

    this.saveState();
  }

  public getMistakes(): MistakeEntry[] {
    return this.mistakes;
  }

  public getUnresolvedMistakes(): MistakeEntry[] {
    return this.mistakes.filter(m => m.status !== 'mastered');
  }

  public getStats() {
    const total = this.mistakes.length;
    const mastered = this.mistakes.filter(m => m.status === 'mastered').length;
    const unresolved = total - mastered;
    const vocabCount = this.mistakes.filter(m => m.type === 'vocab').length;
    const pronunciationCount = this.mistakes.filter(m => m.type === 'pronunciation').length;
    const grammarCount = this.mistakes.filter(m => m.type === 'grammar').length;

    return {
      total,
      mastered,
      unresolved,
      vocabCount,
      pronunciationCount,
      grammarCount
    };
  }

  public removeMistake(id: string): void {
    this.mistakes = this.mistakes.filter(m => m.id !== id);
    this.saveState();
  }

  public clearMastered(): void {
    this.mistakes = this.mistakes.filter(m => m.status !== 'mastered');
    this.saveState();
  }
}

export const mistakeVaultService = new MistakeVaultService();
