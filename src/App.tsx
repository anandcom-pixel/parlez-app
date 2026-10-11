import { useState, useEffect, useCallback, lazy, Suspense, startTransition } from 'react';
import { Navbar, type NavigationTab } from './components/Navbar';
import { CurriculumView } from './components/CurriculumView';
import type { Lesson, VocabularyItem, UserStats } from './types';
import { srsService } from './services/srsService';
import { A1_CURRICULUM_DATA, loadFullCurriculumData } from './data/a1InitialData';

// Dynamic chunk loaders for on-demand and hover/idle preloading
const loadVocabTestView = () => import('./components/VocabTestView').then(m => ({ default: m.VocabTestView }));
const loadSpeedDrillView = () => import('./components/SpeedDrillView').then(m => ({ default: m.SpeedDrillView }));
const loadSentenceBuilderView = () => import('./components/SentenceBuilderView').then(m => ({ default: m.SentenceBuilderView }));
const loadVoiceStudioView = () => import('./components/VoiceStudioView').then(m => ({ default: m.VoiceStudioView }));
const loadMistakeVaultView = () => import('./components/MistakeVaultView').then(m => ({ default: m.MistakeVaultView }));
const loadSRSReviewView = () => import('./components/SRSReviewView').then(m => ({ default: m.SRSReviewView }));
const loadProfileProgressView = () => import('./components/ProfileProgressView').then(m => ({ default: m.ProfileProgressView }));

const VocabTestView = lazy(loadVocabTestView);
const SpeedDrillView = lazy(loadSpeedDrillView);
const SentenceBuilderView = lazy(loadSentenceBuilderView);
const VoiceStudioView = lazy(loadVoiceStudioView);
const MistakeVaultView = lazy(loadMistakeVaultView);
const SRSReviewView = lazy(loadSRSReviewView);
const ProfileProgressView = lazy(loadProfileProgressView);

function preloadTabChunk(tab: NavigationTab) {
  switch (tab) {
    case 'tests':
      loadVocabTestView();
      break;
    case 'speed':
      loadSpeedDrillView();
      break;
    case 'builder':
      loadSentenceBuilderView();
      break;
    case 'voice':
      loadVoiceStudioView();
      break;
    case 'vault':
      loadMistakeVaultView();
      break;
    case 'srs':
      loadSRSReviewView();
      break;
    case 'profile':
      loadProfileProgressView();
      break;
    default:
      break;
  }
}

function ViewLoadingFallback() {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="w-5 h-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
    </div>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('curriculum');
  const [stats, setStats] = useState<UserStats>(() => srsService.getStats());
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [testLesson, setTestLesson] = useState<Lesson | null>(null);
  const [voiceVocab, setVoiceVocab] = useState<VocabularyItem | null>(null);

  useEffect(() => {
    const unsub = srsService.subscribe(() => {
      setStats({ ...srsService.getStats() });
    });
    return () => unsub();
  }, []);

  // Pre-warm secondary view chunks during browser idle time so tab transitions are instantaneous
  useEffect(() => {
    const scheduleIdle = window.requestIdleCallback || ((cb: () => void) => window.setTimeout(cb, 300));
    scheduleIdle(() => {
      loadVocabTestView();
      loadVoiceStudioView();
      loadSRSReviewView();
      loadSpeedDrillView();
      loadSentenceBuilderView();
      loadMistakeVaultView();
      loadProfileProgressView();
    });
  }, []);

  const handleSelectTab = useCallback((tab: NavigationTab) => {
    preloadTabChunk(tab);
    startTransition(() => {
      setActiveTab(tab);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStartTest = useCallback((lesson: Lesson) => {
    loadVocabTestView();
    setTestLesson(lesson);
    startTransition(() => {
      setActiveTab('tests');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStartVoicePractice = useCallback((vocab: VocabularyItem) => {
    loadVoiceStudioView();
    setVoiceVocab(vocab);
    startTransition(() => {
      setActiveTab('voice');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateToSRS = useCallback(() => {
    loadSRSReviewView();
    startTransition(() => {
      setActiveTab('srs');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateToVault = useCallback(() => {
    loadMistakeVaultView();
    startTransition(() => {
      setActiveTab('vault');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleVoiceFromVault = useCallback(async (frenchText: string) => {
    loadVoiceStudioView();
    const lowerText = frenchText.toLowerCase();
    let found = A1_CURRICULUM_DATA.flatMap(l => l.vocabulary).find(
      v => v.french.toLowerCase() === lowerText
    );
    if (!found) {
      const fullCurriculum = await loadFullCurriculumData();
      found = fullCurriculum.flatMap(l => l.vocabulary).find(
        v => v.french.toLowerCase() === lowerText
      );
    }
    if (found) {
      setVoiceVocab(found);
    } else {
      setVoiceVocab({
        id: `custom-${Date.now()}`,
        french: frenchText,
        english: 'Pratique de révision',
        partOfSpeech: 'expression',
        exampleFrench: frenchText,
        exampleEnglish: '',
        level: 'B1',
        category: 'Vault Error'
      });
    }
    startTransition(() => {
      setActiveTab('voice');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#ffffb3] text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-amber-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onHoverTab={preloadTabChunk}
        stats={stats}
        speechRate={speechRate}
        onSetSpeechRate={setSpeechRate}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'curriculum' && (
          <CurriculumView
            speechRate={speechRate}
            onStartTest={handleStartTest}
            onStartVoicePractice={handleStartVoicePractice}
          />
        )}

        {activeTab !== 'curriculum' && (
          <Suspense fallback={<ViewLoadingFallback />}>
            {activeTab === 'tests' && (
              <VocabTestView
                initialLesson={testLesson}
                speechRate={speechRate}
                onNavigateToSRS={handleNavigateToSRS}
              />
            )}

            {activeTab === 'speed' && (
              <SpeedDrillView
                speechRate={speechRate}
                onNavigateToVault={handleNavigateToVault}
              />
            )}

            {activeTab === 'builder' && (
              <SentenceBuilderView
                speechRate={speechRate}
                onNavigateToVault={handleNavigateToVault}
              />
            )}

            {activeTab === 'voice' && (
              <VoiceStudioView
                initialVocab={voiceVocab}
                speechRate={speechRate}
              />
            )}

            {activeTab === 'vault' && (
              <MistakeVaultView
                speechRate={speechRate}
                onNavigateToVoice={handleVoiceFromVault}
              />
            )}

            {activeTab === 'srs' && (
              <SRSReviewView
                speechRate={speechRate}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileProgressView
                stats={stats}
              />
            )}
          </Suspense>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-300/80 bg-amber-200/80 py-8 px-4 text-center text-xs text-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <span className="font-bold text-slate-900 text-sm">ParlezApp for french learning</span>
            <span className="hidden sm:inline text-amber-800">•</span>
            <span className="text-slate-700 font-medium">Plateforme Autonome d'Apprentissage & Voix</span>
          </div>

          {/* Creator & Tester Credits */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-blue-950">
            <span>Created by <strong className="font-bold text-blue-950">ANAND MOHANDAS</strong></span>
            <span className="text-blue-800/70 font-semibold">|</span>
            <span>Tester: <strong className="font-bold text-blue-950">Sreegovind</strong></span>
          </div>

          <div className="flex items-center gap-3 text-slate-600 text-xs">
            <span>CEFR A1 – C1</span>
            <span>•</span>
            <span>Web Speech API</span>
            <span>•</span>
            <span>Système Leitner SRS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
