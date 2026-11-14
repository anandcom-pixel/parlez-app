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
  ShieldAlert,
  LogIn,
  LogOut,
  ClipboardList,
  ShieldCheck,
  UserCheck,
  PlusCircle,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import type { UserStats } from '../types';
import type { AuthUser } from '../types/auth';
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
  currentUser: AuthUser | null;
  onOpenLogin: () => void;
  onOpenReport: () => void;
  onLogout: () => void;
  onOpenAddContent?: () => void;
}

export const Navbar: React.FC<NavbarProps> = memo(({
  activeTab,
  onSelectTab,
  onHoverTab,
  stats,
  speechRate,
  onSetSpeechRate,
  currentUser,
  onOpenLogin,
  onOpenReport,
  onLogout,
  onOpenAddContent
}) => {
  const [frenchVoices, setFrenchVoices] = useState<FrenchVoiceOption[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(soundEffects.isEnabled());
  const [showVoiceModal, setShowVoiceModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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

  const handleTabClick = (tabId: NavigationTab) => {
    soundEffects.playTap();
    onSelectTab(tabId);
    setMobileMenuOpen(false);
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo */}
          <div
            onClick={() => {
              onSelectTab('curriculum');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-600 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-blue-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 via-slate-100 to-rose-400 bg-clip-text text-transparent">
                  PA
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  ParlezApp
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  FR
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-600 hidden sm:block">ParlezApp for french learning</p>
            </div>
          </div>

          {/* Quick Stats Pill (Desktop / Tablet) */}
          <div className="hidden lg:flex items-center gap-3 bg-white/90 border border-amber-200 px-3 py-1.5 rounded-2xl shadow-sm">
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

          {/* Desktop Right Controls (Hidden on narrow mobile) */}
          <div className="hidden md:flex items-center gap-2">
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

            {/* Auth Controls & Status */}
            <div className="h-5 w-px bg-amber-300" />

            {currentUser ? (
              <div className="flex items-center gap-1.5">
                {/* User Status Badge */}
                <div
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 border shadow-sm ${
                    currentUser.role === 'admin'
                      ? 'bg-slate-950 text-amber-300 border-amber-400/60'
                      : 'bg-slate-950 text-emerald-300 border-emerald-400/60'
                  }`}
                  title={`Connecté en tant que ${currentUser.displayName} (${currentUser.role})`}
                >
                  {currentUser.role === 'admin' ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  ) : (
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  )}
                  <span className="max-w-[90px] truncate">{currentUser.displayName}</span>
                </div>

                {/* Add Content Button */}
                <button
                  type="button"
                  onClick={onOpenAddContent}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md border border-amber-500 transition-all transform hover:-translate-y-0.5 active:scale-95"
                  title="Ajouter du nouveau contenu (Leçon, Vocabulaire, Quiz, Citation)"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-slate-950" />
                  <span>+ Nouveau Contenu</span>
                </button>

                {/* Evaluation Report Trigger Button */}
                <button
                  type="button"
                  onClick={onOpenReport}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-700 hover:border-amber-400/70 text-xs font-bold text-amber-300 flex items-center gap-1.5 transition-all duration-200 shadow-sm transform hover:-translate-y-0.5"
                  title="Soumettre un rapport d'évaluation à anand.com@gmail.com"
                >
                  <ClipboardList className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden lg:inline">Rapport</span>
                </button>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={onLogout}
                  className="p-1.5 rounded-xl bg-white/90 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-amber-300 hover:border-rose-300 transition-all text-xs"
                  title="Se déconnecter"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenLogin}
                className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs font-bold text-amber-300 flex items-center gap-1.5 transition-all duration-200 shadow-sm transform hover:-translate-y-0.5 active:scale-95"
                title="Se connecter (Admin ou Testeur)"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Connexion</span>
              </button>
            )}
          </div>

          {/* Mobile Right Action Bar (Compact, fits perfectly without clipping) */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Quick Sound Toggle on Mobile */}
            <button
              type="button"
              onClick={handleToggleSound}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all shadow-sm ${
                soundEnabled
                  ? 'bg-white/95 border-amber-300 text-slate-800'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
              title={soundEnabled ? 'Mute' : 'Unmute'}
              aria-label="Toggle Sound Effects"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-700" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Quick Add Content on Mobile (when logged in) */}
            {currentUser && (
              <button
                type="button"
                onClick={onOpenAddContent}
                className="px-2.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1 shadow-sm border border-amber-500 active:scale-95"
                title="Ajouter du nouveau contenu"
              >
                <PlusCircle className="w-3.5 h-3.5 text-slate-950" />
                <span className="text-[11px]">+ Contenu</span>
              </button>
            )}

            {/* Quick Auth Trigger on Mobile */}
            {!currentUser ? (
              <button
                type="button"
                onClick={onOpenLogin}
                className="px-2.5 py-1.5 rounded-xl bg-slate-950 text-amber-300 font-bold text-xs border border-slate-700 flex items-center gap-1 shadow-sm active:scale-95"
                title="Connexion"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Connexion</span>
              </button>
            ) : (
              <div
                className={`p-1.5 rounded-xl text-xs font-bold flex items-center border shadow-sm ${
                  currentUser.role === 'admin'
                    ? 'bg-slate-950 text-amber-300 border-amber-400/60'
                    : 'bg-slate-950 text-emerald-300 border-emerald-400/60'
                }`}
                title={`Connecté: ${currentUser.displayName}`}
              >
                {currentUser.role === 'admin' ? (
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
              </div>
            )}

            {/* Prominent Hamburger / Mobile Menu Button */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className={`p-2 rounded-xl border transition-all duration-200 shadow-sm active:scale-95 flex items-center justify-center ${
                mobileMenuOpen
                  ? 'bg-amber-400 text-slate-950 border-amber-500 ring-2 ring-amber-400/50'
                  : 'bg-white/95 text-slate-800 border-amber-300 hover:bg-amber-100'
              }`}
              aria-label={mobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-950" />
              ) : (
                <Menu className="w-5 h-5 text-slate-900" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Tab Navigation Bar */}
        <nav className="hidden md:grid md:grid-cols-4 lg:flex lg:flex-wrap lg:items-center gap-1.5 sm:gap-2 py-2.5 border-t border-amber-300/70">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => onHoverTab?.(item.id)}
                onFocus={() => onHoverTab?.(item.id)}
                onClick={() => handleTabClick(item.id)}
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

        {/* Mobile Quick-Swipe Tab Bar (Visible when hamburger is closed) */}
        {!mobileMenuOpen && (
          <div className="md:hidden border-t border-amber-300/70 py-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-1 -mx-1 scroll-smooth">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabClick(item.id)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 select-none ${
                      isActive
                        ? 'bg-slate-950 text-amber-300 border border-slate-700/80 shadow-sm ring-1 ring-amber-400/50'
                        : 'bg-white/80 text-slate-800 border border-amber-300/60 hover:bg-amber-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-indigo-700'}`} />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Collapsible Mobile Menu Drawer (Smooth & Fully Reachable) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-amber-400 bg-[#ffffb3] shadow-2xl px-4 py-4 space-y-4 max-h-[calc(100vh-4.5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          {/* User & Auth Section */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-md text-slate-100 space-y-3">
            {currentUser ? (
              <>
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-base">
                      {currentUser.avatar || '👤'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{currentUser.displayName}</span>
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {currentUser.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Ajout &amp; Édition autorisés
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>Sortir</span>
                  </button>
                </div>

                {/* Quick Action Buttons for Logged-In User */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAddContent?.();
                    }}
                    className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-sm border border-amber-500 transition-all active:scale-95"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-slate-950" />
                    <span>+ Nouveau Contenu</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenReport();
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
                  >
                    <ClipboardList className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rapport d'évaluation</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <LogIn className="w-3.5 h-3.5 text-amber-400" />
                    <span>Accès Autorisé</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Admin ou Testeurs (Johnny hotbody (nick), Gayathri)</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md border border-amber-500 transition-all active:scale-95 shrink-0"
                >
                  Connexion
                </button>
              </div>
            )}
          </div>

          {/* Audio & Settings Card */}
          <div className="p-3.5 rounded-2xl bg-white/90 border border-amber-300 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-amber-200 pb-1.5">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-indigo-600" />
                <span>Paramètres Audio &amp; Voix</span>
              </span>
              <span className="text-[10px] text-slate-500">Synthèse vocale</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-0.5">
              {/* Speed Selector */}
              <button
                type="button"
                onClick={() => {
                  const nextRate = speechRate === 1.0 ? 0.75 : speechRate === 0.75 ? 1.2 : 1.0;
                  onSetSpeechRate(nextRate);
                  soundEffects.playTap();
                }}
                className="px-3 py-2 rounded-xl bg-amber-100/80 border border-amber-300 text-slate-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-amber-200 transition-all"
              >
                <Gauge className="w-3.5 h-3.5 text-indigo-700" />
                <span>Vitesse: {speechRate}x</span>
              </button>

              {/* French Voice Picker */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowVoiceModal(true);
                }}
                className="px-3 py-2 rounded-xl bg-amber-100/80 border border-amber-300 text-slate-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-amber-200 transition-all truncate"
              >
                <span>🗣️</span>
                <span className="truncate max-w-[100px]">
                  {selectedVoiceName ? selectedVoiceName.replace(/Google|Microsoft/gi, '').trim() : 'Voix FR'}
                </span>
              </button>
            </div>

            {/* Mobile Stats Summary */}
            <div className="flex items-center justify-around pt-1 text-xs font-semibold text-slate-800 bg-amber-50/80 rounded-xl p-2 border border-amber-200">
              <div className="flex items-center gap-1 text-amber-800">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{stats.streak} {stats.streak === 1 ? 'jour' : 'jours'}</span>
              </div>
              <div className="w-px h-3 bg-amber-300" />
              <div className="flex items-center gap-1 text-violet-800">
                <Zap className="w-3.5 h-3.5 fill-violet-500 text-violet-500" />
                <span>{stats.xp} XP</span>
              </div>
              <div className="w-px h-3 bg-amber-300" />
              <div
                onClick={() => handleTabClick('profile')}
                className="text-indigo-800 font-bold cursor-pointer hover:underline"
              >
                {stats.levelRank.split(' ')[0]}
              </div>
            </div>
          </div>

          {/* All 8 Navigation Modules */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 px-1 flex items-center justify-between">
              <span>Modules d'apprentissage (8 sections)</span>
              <span className="text-amber-800 font-bold">100% Tactile</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-150 border ${
                      isActive
                        ? 'bg-slate-950 text-amber-300 border-slate-700/80 shadow-md ring-2 ring-amber-400/50'
                        : 'bg-white/95 text-slate-800 border-amber-300/80 hover:bg-amber-100 hover:text-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`p-1.5 rounded-lg ${isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-amber-100 text-indigo-700'}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-left font-bold">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {isActive && (
                        <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                          Actif
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
