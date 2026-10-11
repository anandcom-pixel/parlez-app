import React, { useState, useEffect, memo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Mic,
  Brain,
  Award,
  Volume2,
  VolumeX,
  Flame,
  Zap,
  Gauge,
  Puzzle,
  ShieldAlert
} from 'lucide-react';
import type { UserStats } from '../types';
import { speechService, type FrenchVoiceOption } from '../services/speechService';
import { soundEffects } from '../services/soundEffects';

export type NavigationTab = 'curriculum' | 'tests' | 'speed' | 'builder' | 'voice' | 'vault' | 'srs' | 'profile';

interface NavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onHoverTab?: (tab: NavigationTab) => void;
  stats: UserStats;
  speechRate: number;
  onSetSpeechRate: (rate: number) => void;
}

export const Navbar: React.FC<NavbarProps> = memo(({
  activeTab,
  onSelectTab,
  onHoverTab,
  stats,
  speechRate,
  onSetSpeechRate
}) => {
  const [frenchVoices, setFrenchVoices] = useState<FrenchVoiceOption[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(soundEffects.isEnabled());
  const [showVoiceModal, setShowVoiceModal] = useState<boolean>(false);

  useEffect(() => {
    const updateVoices = () => {
      const voices = speechService.getFrenchVoices();
      setFrenchVoices(voices);
      const current = speechService.getSelectedVoice();
      if (current) {
        setSelectedVoiceName(current.name);
      }
    };

    updateVoices();
    const unsub = speechService.onVoiceChange(updateVoices);
    return () => unsub();
  }, []);

  const handleToggleSound = () => {
    const newState = soundEffects.toggleSound();
    setSoundEnabled(newState);
    if (newState) {
      soundEffects.playTap();
    }
  };

  const navItems = [
    { id: 'curriculum', label: 'Curriculum & Lessons', icon: BookOpen },
    { id: 'tests', label: 'Vocab Test Lab', icon: CheckCircle2 },
    { id: 'speed', label: 'Speed Drill (30s)', icon: Zap },
    { id: 'builder', label: 'Sentence Builder', icon: Puzzle },
    { id: 'voice', label: 'Voice Studio', icon: Mic },
    { id: 'vault', label: 'Mistake Vault', icon: ShieldAlert },
    { id: 'srs', label: 'Leitner SRS Deck', icon: Brain },
    { id: 'profile', label: 'Progress & Badges', icon: Award }
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-[#ffffb3]/95 backdrop-blur-md border-b border-amber-300 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo */}
          <div
            onClick={() => onSelectTab('curriculum')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-600 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-blue-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-slate-100 to-rose-400 bg-clip-text text-transparent">
                  PA
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  ParlezApp
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  FRANÇAIS
                </span>
              </div>
              <p className="text-[11px] text-slate-600 hidden sm:block">ParlezApp for french learning</p>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden md:flex items-center gap-3 bg-white/90 border border-amber-200 px-3 py-1.5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800" title="Daily Streak">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{stats.streak} {stats.streak === 1 ? 'jour' : 'jours'}</span>
            </div>
            <div className="w-px h-3.5 bg-amber-200" />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-800" title="XP Points">
              <Zap className="w-4 h-4 fill-violet-500 text-violet-500" />
              <span>{stats.xp} XP</span>
            </div>
            <div className="w-px h-3.5 bg-amber-200" />
            <div
              onClick={() => onSelectTab('profile')}
              className="text-[11px] font-medium text-slate-700 hover:text-slate-950 cursor-pointer px-2 py-0.5 rounded-md hover:bg-amber-100 transition-colors"
            >
              {stats.levelRank.split(' ')[0]}
            </div>
          </div>

          {/* Audio & Settings Controls */}
          <div className="flex items-center gap-2">
            {/* Speed Selector */}
            <div className="flex items-center bg-white/95 border border-amber-300 rounded-xl p-1 text-xs font-semibold shadow-sm">
              <button
                type="button"
                onClick={() => {
                  const nextRate = speechRate === 1.0 ? 0.75 : speechRate === 0.75 ? 1.2 : 1.0;
                  onSetSpeechRate(nextRate);
                  soundEffects.playTap();
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-amber-100 text-slate-800 hover:text-slate-950 transition-all duration-200"
                title="Change audio playback speed"
              >
                <Gauge className="w-3.5 h-3.5 text-indigo-600" />
                <span>Speed: {speechRate}x</span>
              </button>
            </div>

            {/* French Voice Picker Button */}
            <button
              type="button"
              onClick={() => setShowVoiceModal(true)}
              className="px-3 py-1.5 rounded-xl bg-white/95 hover:bg-amber-100 border border-amber-300 text-xs font-semibold text-slate-800 hover:text-slate-950 flex items-center gap-1.5 transition-all duration-200 shadow-sm hover:shadow"
              title="Select French Native TTS Voice"
            >
              <span className="text-sm">🗣️</span>
              <span className="hidden lg:inline max-w-[110px] truncate">
                {selectedVoiceName ? selectedVoiceName.replace(/Google|Microsoft/gi, '').trim() : 'French Voice'}
              </span>
            </button>

            {/* Sound Effects Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 shadow-sm ${
                soundEnabled
                  ? 'bg-white/95 border-amber-300 text-slate-800 hover:text-slate-950 hover:bg-amber-100'
                  : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
              }`}
              title={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-600" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? 'SFX On' : 'Muted'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar — Responsive Multi-Row Grid / Flex Wrap (No Horizontal Scroll) */}
        <nav className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-wrap lg:items-center gap-1.5 sm:gap-2 py-2.5 border-t border-amber-300/70">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => onHoverTab?.(item.id)}
                onFocus={() => onHoverTab?.(item.id)}
                onClick={() => {
                  soundEffects.playTap();
                  onSelectTab(item.id);
                }}
                className={`flex items-center justify-center sm:justify-start gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 select-none transform hover:-translate-y-0.5 ${
                  isActive
                    ? 'bg-slate-950 text-amber-300 border border-slate-700/80 shadow-md font-bold'
                    : 'bg-amber-100/70 text-slate-800 border border-amber-300/60 hover:text-slate-950 hover:bg-amber-200/90 hover:border-amber-400'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-indigo-700'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Voice Selection Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🇫🇷</span> French Pronunciation Voice
                </h3>
                <p className="text-xs text-slate-300">Select the speech synthesis voice for native playback</p>
              </div>
              <button
                type="button"
                onClick={() => setShowVoiceModal(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {frenchVoices.length === 0 ? (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 text-center">
                  Standard browser default French voice will be used automatically.
                </div>
              ) : (
                frenchVoices.map(v => (
                  <button
                    key={v.name}
                    type="button"
                    onClick={() => {
                      speechService.setSelectedVoice(v.name);
                      setSelectedVoiceName(v.name);
                      speechService.speak('Bonjour, je suis votre guide de prononciation française.');
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                      selectedVoiceName === v.name
                        ? 'bg-slate-950 border-indigo-500/60 text-indigo-200'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">{v.name}</div>
                      <div className="text-[11px] text-slate-400">{v.lang} {v.isPreferred ? '• Recommandée' : ''}</div>
                    </div>
                    {selectedVoiceName === v.name && (
                      <span className="text-indigo-400 text-xs font-bold">Actif ✓</span>
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowVoiceModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30"
              >
                Terminé
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});
