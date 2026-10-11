// Speech Synthesis (TTS) Service for authentic French pronunciation

export interface FrenchVoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
  isPreferred: boolean;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isSpeaking: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<(isSpeaking: boolean) => void> = new Set();
  private voiceChangeListeners: Set<() => void> = new Set();

  private initialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      // Defer initial voice enumeration so it never blocks the initial render
      const scheduleInit = window.requestIdleCallback || ((cb: () => void) => window.setTimeout(cb, 50));
      scheduleInit(() => {
        this.ensureInitialized();
      });
    }
  }

  private ensureInitialized() {
    if (this.initialized || !this.synth) return;
    this.initialized = true;
    this.loadVoices();

    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();

    const frenchVoices = this.getFrenchVoices();
    if (frenchVoices.length > 0) {
      // Restore previously chosen voice from localStorage if valid
      const savedVoiceName = localStorage.getItem('parlezapp_selected_voice') || localStorage.getItem('lingoflow_selected_voice');
      const savedVoice = frenchVoices.find(v => v.voice.name === savedVoiceName);

      if (savedVoice) {
        this.selectedVoice = savedVoice.voice;
      } else {
        // Prefer natural / google / premium voices if available
        const preferred = frenchVoices.find(v => v.isPreferred);
        this.selectedVoice = preferred ? preferred.voice : frenchVoices[0].voice;
      }
    }

    this.voiceChangeListeners.forEach(listener => listener());
  }

  public getFrenchVoices(): FrenchVoiceOption[] {
    if (!this.synth) return [];
    if (!this.initialized) {
      this.initialized = true;
    }

    const allVoices = this.synth.getVoices();
    const french = allVoices.filter(v => v.lang.toLowerCase().startsWith('fr'));

    return french.map(voice => {
      const nameLower = voice.name.toLowerCase();
      const isPreferred =
        nameLower.includes('google') ||
        nameLower.includes('natural') ||
        nameLower.includes('thomas') ||
        nameLower.includes('amélie') ||
        nameLower.includes('amelie') ||
        nameLower.includes('hortense') ||
        nameLower.includes('paul') ||
        nameLower.includes('premium');

      return {
        voice,
        name: voice.name,
        lang: voice.lang,
        isPreferred
      };
    });
  }

  public setSelectedVoice(voiceName: string) {
    const found = this.voices.find(v => v.name === voiceName);
    if (found) {
      this.selectedVoice = found;
      localStorage.setItem('parlezapp_selected_voice', voiceName);
      this.voiceChangeListeners.forEach(listener => listener());
    }
  }

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    return this.selectedVoice;
  }

  public onVoiceChange(callback: () => void): () => void {
    this.voiceChangeListeners.add(callback);
    return () => this.voiceChangeListeners.delete(callback);
  }

  public onSpeakingChange(callback: (isSpeaking: boolean) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifySpeakingState(speaking: boolean) {
    this.isSpeaking = speaking;
    this.listeners.forEach(cb => cb(speaking));
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notifySpeakingState(false);
      this.currentUtterance = null;
    }
  }

  public speak(
    text: string,
    options: {
      rate?: number; // 0.7 for slow, 1.0 for normal, 1.2 for fast
      pitch?: number;
      onEnd?: () => void;
    } = {}
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        console.warn('SpeechSynthesis is not supported on this device/browser.');
        resolve();
        return;
      }

      // Stop any ongoing speech
      this.stop();

      // Clean text: strip markdown if any
      const cleanText = text.replace(/[*_#`]/g, '').trim();
      if (!cleanText) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'fr-FR';

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      utterance.rate = options.rate ?? 0.95;
      utterance.pitch = options.pitch ?? 1.0;

      utterance.onstart = () => {
        this.notifySpeakingState(true);
      };

      utterance.onend = () => {
        this.notifySpeakingState(false);
        this.currentUtterance = null;
        options.onEnd?.();
        resolve();
      };

      utterance.onerror = (e) => {
        console.warn('TTS error event:', e);
        this.notifySpeakingState(false);
        this.currentUtterance = null;
        options.onEnd?.();
        resolve();
      };

      this.currentUtterance = utterance;

      // Chrome bug workaround for longer utterances
      try {
        this.synth.speak(utterance);
      } catch (err) {
        console.error('Failed to trigger speech:', err);
        this.notifySpeakingState(false);
        resolve();
      }
    });
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public getCurrentUtterance(): SpeechSynthesisUtterance | null {
    return this.currentUtterance;
  }
}

export const speechService = new SpeechService();
