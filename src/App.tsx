import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Navbar, type NavigationTab } from './components/Navbar';
import { CurriculumView } from './components/CurriculumView';
import type { Lesson, VocabularyItem, UserStats } from './types';
import { srsService } from './services/srsService';
import { A1_CURRICULUM_DATA, loadFullCurriculumData } from './data/a1InitialData';

// Lazy-load secondary heavy views so only the primary A1 Curriculum view loads in the initial bundle
const VocabTestView = lazy(() =>
  import('./components/VocabTestView').then(m => ({ default: m.VocabTestView }))
);
const SpeedDrillView = lazy(() =>
  import('./components/SpeedDrillView').then(m => ({ default: m.SpeedDrillView }))
);
const SentenceBuilderView = lazy(() =>
  import('./components/SentenceBuilderView').then(m => ({ default: m.SentenceBuilderView }))
);
const VoiceStudioView = lazy(() =>
  import('./components/VoiceStudioView').then(m => ({ default: m.VoiceStudioView }))
);
const MistakeVaultView = lazy(() =>
  import('./components/MistakeVaultView').then(m => ({ default: m.MistakeVaultView }))
);
const SRSReviewView = lazy(() =>
  import('./components/SRSReviewView').then(m => ({ default: m.SRSReviewView }))
);
const ProfileProgressView = lazy(() =>
  import('./components/ProfileProgressView').then(m => ({ default: m.ProfileProgressView }))
);

function ViewLoadingFallback() {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-700/80 p-8 sm:p-12 shadow-xl text-center space-y-4 animate-pulse">
      <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 mx-auto" />
      <div className="h-5 w-48 bg-slate-800 rounded-lg mx-auto" />
      <div className="h-3 w-72 max-w-full bg-slate-800/70 rounded-lg mx-auto" />
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

  const handleSelectTab = useCallback((tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStartTest = useCallback((lesson: Lesson) => {
    setTestLesson(lesson);
    setActiveTab('tests');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStartVoicePractice = useCallback((vocab: VocabularyItem) => {
    setVoiceVocab(vocab);
    setActiveTab('voice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateToSRS = useCallback(() => {
    setActiveTab('srs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateToVault = useCallback(() => {
    setActiveTab('vault');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleVoiceFromVault = useCallback(async (frenchText: string) => {
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
    setActiveTab('voice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#ffffb3] text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-amber-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
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
