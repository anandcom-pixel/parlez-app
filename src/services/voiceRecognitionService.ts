import type { VoiceComparisonResult, WordMatchComparison } from '../types';

// SpeechRecognition type declarations for browsers
interface IWindow extends Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SpeechRecognition?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webkitSpeechRecognition?: any;
}

export type RecognitionState = 'idle' | 'listening' | 'processing' | 'error';

export interface VoiceRecognitionCallbacks {
  onInterimResult?: (transcript: string) => void;
  onFinalResult?: (result: VoiceComparisonResult) => void;
  onError?: (errorMessage: string) => void;
  onStateChange?: (state: RecognitionState) => void;
}

class VoiceRecognitionService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private recognition: any = null;
  private isSupported: boolean = false;
  private state: RecognitionState = 'idle';
  private targetPhrase: string = '';
  private currentCallbacks: VoiceRecognitionCallbacks = {};
  private finalTranscript: string = '';

  constructor() {
    if (typeof window !== 'undefined') {
      const win = window as unknown as IWindow;
      const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

      if (SpeechRec) {
        this.isSupported = true;
        try {
          this.recognition = new SpeechRec();
          this.recognition.lang = 'fr-FR';
          this.recognition.interimResults = true;
          this.recognition.continuous = false;
          this.recognition.maxAlternatives = 3;

          this.setupEventListeners();
        } catch (err) {
          console.warn('Could not initialize SpeechRecognition:', err);
          this.isSupported = false;
        }
      }
    }
  }

  public checkSupport(): boolean {
    return this.isSupported;
  }

  private setState(newState: RecognitionState) {
    this.state = newState;
    this.currentCallbacks.onStateChange?.(newState);
  }

  public getState(): RecognitionState {
    return this.state;
  }

  private setupEventListeners() {
    if (!this.recognition) return;

    this.recognition.onstart = () => {
      this.setState('listening');
      this.finalTranscript = '';
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.finalTranscript += transcriptPart;
        } else {
          interim += transcriptPart;
        }
      }

      const currentLive = this.finalTranscript || interim;
      this.currentCallbacks.onInterimResult?.(currentLive);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onerror = (event: any) => {
      console.warn('SpeechRecognition error:', event.error);
      this.setState('error');

      let errorMsg = 'Microphone error occurred.';
      if (event.error === 'not-allowed') {
        errorMsg = 'Microphone access denied. Please allow microphone permissions in your browser.';
      } else if (event.error === 'no-speech') {
        errorMsg = 'No French speech detected. Try speaking closer to the microphone.';
      } else if (event.error === 'network') {
        errorMsg = 'Speech service network error. Check your internet connection.';
      }

      this.currentCallbacks.onError?.(errorMsg);
    };

    this.recognition.onend = () => {
      if (this.state === 'listening') {
        this.setState('processing');
        // Evaluate spoken against target
        const spoken = this.finalTranscript.trim();
        const comparison = this.compareTexts(this.targetPhrase, spoken);
        this.currentCallbacks.onFinalResult?.(comparison);
        this.setState('idle');
      } else if (this.state !== 'error') {
        this.setState('idle');
      }
    };
  }

  public startListening(targetPhrase: string, callbacks: VoiceRecognitionCallbacks) {
    this.targetPhrase = targetPhrase;
    this.currentCallbacks = callbacks;
    this.finalTranscript = '';

    if (!this.isSupported || !this.recognition) {
      callbacks.onError?.('Web Speech Recognition is not natively supported in this browser. You can still test with simulated or typed speech!');
      return;
    }

    try {
      this.recognition.abort(); // Cancel previous if any
      this.recognition.start();
    } catch {
      // In case start was called while already running
      try {
        this.recognition.stop();
        setTimeout(() => {
          this.recognition.start();
        }, 150);
      } catch (err2) {
        callbacks.onError?.('Could not activate microphone: ' + String(err2));
      }
    }
  }

  public stopListening() {
    if (this.recognition && this.state === 'listening') {
      try {
        this.recognition.stop();
      } catch {
        this.setState('idle');
      }
    }
  }

  public abort() {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // ignore
      }
    }
    this.setState('idle');
  }

  // Helper: Normalize French text for comparison
  public normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[’']/g, "'") // normalize curly quotes
      .replace(/[.,!?;:«»"()\-–]/g, ' ') // replace punctuation with space
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Strip diacritics / accents for partial match tolerance
  public stripAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // Levenshtein distance calculation
  public levenshtein(a: string, b: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1 // deletion
            )
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  // Similarity ratio 0.0 to 1.0
  public stringSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 1.0;
    if (!str1.length || !str2.length) return 0.0;
    const distance = this.levenshtein(str1, str2);
    const maxLen = Math.max(str1.length, str2.length);
    return Math.max(0, 1 - distance / maxLen);
  }

  // Deep comparison of target French phrase vs spoken transcription
  public compareTexts(target: string, spoken: string): VoiceComparisonResult {
    const normTarget = this.normalizeText(target);
    const normSpoken = this.normalizeText(spoken);

    if (!normSpoken) {
      return {
        targetText: target,
        spokenText: spoken,
        accuracyScore: 0,
        passed: false,
        wordAnalysis: normTarget.split(' ').filter(Boolean).map(w => ({
          word: w,
          status: 'missing',
          expectedWord: w,
          similarity: 0
        })),
        feedbackNotes: ['No speech detected. Please speak clearly into the microphone.']
      };
    }

    const targetWords = normTarget.split(' ').filter(Boolean);
    const spokenWords = normSpoken.split(' ').filter(Boolean);

    const wordAnalysis: WordMatchComparison[] = [];
    let matchedScoreSum = 0;
    const feedbackNotes: string[] = [];

    // Track used spoken words to avoid duplicate pairings
    const usedSpokenIndices = new Set<number>();

    targetWords.forEach((expectedWord) => {
      // Look for best match in spoken words
      let bestMatchIndex = -1;
      let highestSimilarity = -1;

      spokenWords.forEach((sWord, sIndex) => {
        if (usedSpokenIndices.has(sIndex)) return;

        // Exact match
        if (sWord === expectedWord) {
          if (highestSimilarity < 1) {
            highestSimilarity = 1;
            bestMatchIndex = sIndex;
          }
        } else if (this.stripAccents(sWord) === this.stripAccents(expectedWord)) {
          // Accent variation match
          if (highestSimilarity < 0.9) {
            highestSimilarity = 0.9;
            bestMatchIndex = sIndex;
          }
        } else {
          // Approximate similarity
          const sim = this.stringSimilarity(expectedWord, sWord);
          if (sim > highestSimilarity && sim > 0.55) {
            highestSimilarity = sim;
            bestMatchIndex = sIndex;
          }
        }
      });

      if (bestMatchIndex !== -1) {
        usedSpokenIndices.add(bestMatchIndex);
        const spokenWord = spokenWords[bestMatchIndex];

        if (spokenWord === expectedWord) {
          wordAnalysis.push({
            word: expectedWord,
            status: 'correct',
            expectedWord,
            similarity: 1.0
          });
          matchedScoreSum += 1.0;
        } else if (highestSimilarity >= 0.8 || this.stripAccents(spokenWord) === this.stripAccents(expectedWord)) {
          wordAnalysis.push({
            word: spokenWord,
            status: 'partial',
            expectedWord,
            similarity: highestSimilarity
          });
          matchedScoreSum += 0.85;

          if (this.stripAccents(spokenWord) === this.stripAccents(expectedWord)) {
            feedbackNotes.push(`Watch the accent on "${expectedWord}": spoken "${spokenWord}".`);
          } else {
            feedbackNotes.push(`Slight variation on "${expectedWord}" (heard "${spokenWord}").`);
          }
        } else {
          wordAnalysis.push({
            word: spokenWord,
            status: 'partial',
            expectedWord,
            similarity: highestSimilarity
          });
          matchedScoreSum += 0.5;
          feedbackNotes.push(`Pronunciation difference on "${expectedWord}" (heard "${spokenWord}").`);
        }
      } else {
        // Missing expected word
        wordAnalysis.push({
          word: expectedWord,
          status: 'missing',
          expectedWord,
          similarity: 0
        });
        feedbackNotes.push(`The word "${expectedWord}" was omitted or unclear.`);
      }
    });

    // Check for extra unexpected spoken words
    spokenWords.forEach((sWord, sIndex) => {
      if (!usedSpokenIndices.has(sIndex)) {
        wordAnalysis.push({
          word: sWord,
          status: 'unexpected',
          similarity: 0
        });
      }
    });

    const baseAccuracy = targetWords.length > 0 ? (matchedScoreSum / targetWords.length) * 100 : 0;
    // Penalty for too many extra unexpected words
    const extraWordsCount = spokenWords.length - usedSpokenIndices.size;
    const penalty = Math.min(extraWordsCount * 5, 20);
    const finalScore = Math.max(0, Math.round(baseAccuracy - penalty));

    // Construct tailored pronunciation guidance
    if (finalScore >= 85) {
      feedbackNotes.unshift('Superbe prononciation ! Intonation and articulation are fluent and natural.');
    } else if (finalScore >= 65) {
      feedbackNotes.unshift('Bien joué ! Good rhythm. Pay close attention to nasal vowels and final consonants.');
    } else {
      feedbackNotes.unshift('À retravailler. Listen to the native TTS audio first at 0.75x speed, then try speaking again.');
    }

    // Specific French phonetic tips
    if (target.includes('ou') && target.includes('u')) {
      feedbackNotes.push('Tip: In French, distinguish "ou" (/u/ like cool) from "u" (/y/ lips rounded forward like a whistle).');
    }
    if (target.includes('r')) {
      feedbackNotes.push('Tip: The French "r" is uvular (/ʁ/): gently vibrate the back of your soft palate without rolling your tongue.');
    }
    if (/[éèêë]/.test(target)) {
      feedbackNotes.push('Tip: Keep "é" tight and smiling (/e/), and "è / ê" more open (/ɛ/).');
    }

    return {
      targetText: target,
      spokenText: spoken,
      accuracyScore: finalScore,
      passed: finalScore >= 70,
      wordAnalysis,
      feedbackNotes: Array.from(new Set(feedbackNotes))
    };
  }

  // Simulation mode for testing or when mic is disabled
  public simulateSpokenInput(target: string, simulatedSpoken: string): VoiceComparisonResult {
    return this.compareTexts(target, simulatedSpoken);
  }
}

export const voiceRecognitionService = new VoiceRecognitionService();
