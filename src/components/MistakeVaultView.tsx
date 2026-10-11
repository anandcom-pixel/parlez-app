import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldAlert,
  ShieldCheck,
  Volume2,
  Trash2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Mic,
  Lightbulb,
  RotateCcw
} from 'lucide-react';
import type { MistakeEntry, MistakeType } from '../types';
import { mistakeVaultService } from '../services/mistakeVaultService';
import { speechService } from '../services/speechService';
import { soundEffects } from '../services/soundEffects';
import { srsService } from '../services/srsService';

interface MistakeVaultViewProps {
  speechRate: number;
  onNavigateToVoice: (french: string) => void;
}

export const MistakeVaultView: React.FC<MistakeVaultViewProps> = ({
  speechRate,
  onNavigateToVoice
}) => {
  const [mistakes, setMistakes] = useState<MistakeEntry[]>(mistakeVaultService.getMistakes());
  const [stats, setStats] = useState(mistakeVaultService.getStats());
  const [filterType, setFilterType] = useState<MistakeType | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'unresolved' | 'mastered'>('unresolved');

  // Interactive Re-testing / Cleansing session state
  const [isCleansingSession, setIsCleansingSession] = useState<boolean>(false);
  const [cleansingQueue, setCleansingQueue] = useState<MistakeEntry[]>([]);
  const [currentCleansingIndex, setCurrentCleansingIndex] = useState<number>(0);
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [cleansingFeedback, setCleansingFeedback] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    const unsub = mistakeVaultService.subscribe(() => {
      setMistakes([...mistakeVaultService.getMistakes()]);
      setStats(mistakeVaultService.getStats());
    });
    return () => unsub();
  }, []);

  const filteredMistakes = mistakes.filter(m => {
    const matchesType = filterType === 'ALL' || m.type === filterType;
    const matchesStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'unresolved' && m.status !== 'mastered') ||
      (filterStatus === 'mastered' && m.status === 'mastered');
    return matchesType && matchesStatus;
  });

  const startCleansingSession = () => {
    soundEffects.playTap();
    const queue = mistakes.filter(m => m.status !== 'mastered');
    if (queue.length === 0) return;

    setCleansingQueue(queue);
    setCurrentCleansingIndex(0);
    setTypedAnswer('');
    setCleansingFeedback(null);
    setIsCleansingSession(true);

    if (queue[0]) {
      speechService.speak(queue[0].french, { rate: speechRate });
    }
  };

  const handleValidateCleansing = () => {
    const current = cleansingQueue[currentCleansingIndex];
    if (!current) return;

    const cleanInput = typedAnswer.trim().toLowerCase();
    const cleanTarget = current.french.trim().toLowerCase();

    // Check exact or partial match
    const isCorrect = cleanInput === cleanTarget;

    if (isCorrect) {
      soundEffects.playCorrect();
      setCleansingFeedback('correct');
      mistakeVaultService.recordMistakeReview(current.id, true);
      srsService.addXP(15);

      if (current.consecutiveCorrect + 1 >= 2) {
        try {
          confetti({ particleCount: 50, spread: 60 });
        } catch {
          // ignore
        }
      }
    } else {
      soundEffects.playIncorrect();
      setCleansingFeedback('incorrect');
      mistakeVaultService.recordMistakeReview(current.id, false);
    }
  };

  const handleNextCleansingItem = () => {
    soundEffects.playTap();
    if (currentCleansingIndex + 1 < cleansingQueue.length) {
      const nextIdx = currentCleansingIndex + 1;
      setCurrentCleansingIndex(nextIdx);
      setTypedAnswer('');
      setCleansingFeedback(null);
      setTimeout(() => {
        speechService.speak(cleansingQueue[nextIdx].french, { rate: speechRate });
      }, 200);
    } else {
      soundEffects.playVictory();
      setIsCleansingSession(false);
    }
  };

  const currentCleansingItem = cleansingQueue[currentCleansingIndex];

  return (
    <div className="space-y-8 animate-in fade-in pb-16 max-w-5xl mx-auto">
      {/* Header Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Coffre-Fort des Erreurs (Mistake Vault)
              </span>
              <span className="text-xs text-slate-400">Pédagogie de l'Erreur & Réentraînement Ciblé</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Le Coffre-Fort de Vos Erreurs
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Toute hésitation ou erreur (vocabulaire, prononciation, syntaxe) est automatiquement capturée ici. Répétez-les jusqu’à obtenir deux validations consécutives pour les archiver comme maîtrisées.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              type="button"
              disabled={stats.unresolved === 0}
              onClick={startCleansingSession}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-sm shadow-xl shadow-rose-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Purger les Erreurs ({stats.unresolved} à réviser)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-md space-y-1 text-center">
          <div className="text-2xl font-black text-rose-400">{stats.unresolved}</div>
          <div className="text-[11px] text-slate-300 font-medium">Erreurs Actives</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-md space-y-1 text-center">
          <div className="text-2xl font-black text-emerald-400">{stats.mastered}</div>
          <div className="text-[11px] text-slate-300 font-medium">Erreurs Maîtrisées</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-md space-y-1 text-center">
          <div className="text-2xl font-black text-indigo-400">{stats.vocabCount}</div>
          <div className="text-[11px] text-slate-300 font-medium">Mots de Vocabulaire</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-md space-y-1 text-center">
          <div className="text-2xl font-black text-amber-400">{stats.pronunciationCount + stats.grammarCount}</div>
          <div className="text-[11px] text-slate-300 font-medium">Voix & Syntaxe</div>
        </div>
      </div>

      {/* Active Cleansing / Re-testing Session Card */}
      {isCleansingSession && currentCleansingItem && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl space-y-6 animate-in zoom-in-95">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-2">
              <span className="text-rose-400 font-bold">Purge du Coffre :</span>
              <span>Élément {currentCleansingIndex + 1} sur {cleansingQueue.length}</span>
            </span>
            <button
              type="button"
              onClick={() => setIsCleansingSession(false)}
              className="text-rose-400 hover:text-rose-300"
            >
              Fermer la session
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                {currentCleansingItem.type === 'vocab' ? 'Vocabulaire' : currentCleansingItem.type === 'pronunciation' ? 'Prononciation' : 'Grammaire'}
              </span>
              <span className="text-xs text-indigo-400 font-bold">Niveau {currentCleansingItem.level}</span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-1">Sens attendu / Question :</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                « {currentCleansingItem.english} »
              </h3>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 max-w-lg mx-auto">
              <strong className="text-amber-400">Raison de l’échec précédent :</strong> {currentCleansingItem.contextNote}
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => speechService.speak(currentCleansingItem.french, { rate: speechRate })}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-indigo-400" />
                <span>Écouter la Prononciation Native</span>
              </button>
            </div>
          </div>

          {/* Typing re-test input */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400">
              Tapez la phrase ou le mot français corrigé :
            </div>
            <input
              type="text"
              value={typedAnswer}
              disabled={cleansingFeedback !== null}
              onChange={(e) => setTypedAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (cleansingFeedback === null) {
                    handleValidateCleansing();
                  } else {
                    handleNextCleansingItem();
                  }
                }
              }}
              placeholder="Saisissez la réponse correcte..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-white text-base focus:outline-none focus:border-indigo-500"
              autoFocus
            />

            {cleansingFeedback === 'correct' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Parfaitement Corrigé ! Progrès enregistré dans le Coffre (+15 XP).</span>
              </div>
            )}

            {cleansingFeedback === 'incorrect' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-500/50 text-rose-200 text-xs space-y-1">
                <div className="font-bold flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Encore inexact :</span>
                </div>
                <div>Réponse exacte : <strong className="text-white underline">{currentCleansingItem.french}</strong></div>
              </div>
            )}
          </div>

          {/* Cleansing Actions Footer */}
          <div className="pt-2 flex justify-between items-center">
            {currentCleansingItem.type === 'pronunciation' && (
              <button
                type="button"
                onClick={() => onNavigateToVoice(currentCleansingItem.french)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 underline font-semibold"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Tester au Microphone dans le Voice Studio</span>
              </button>
            )}

            <div className="ml-auto flex items-center gap-2">
              {cleansingFeedback === null ? (
                <button
                  type="button"
                  disabled={!typedAnswer.trim()}
                  onClick={handleValidateCleansing}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
                >
                  Vérifier
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextCleansingItem}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30"
                >
                  <span>{currentCleansingIndex + 1 < cleansingQueue.length ? 'Erreur Suivante' : 'Terminer la Purge'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Vault Browser Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-xl space-y-6">
        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/70 pb-4">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 mr-1">Catégorie :</span>
            {(['ALL', 'vocab', 'pronunciation', 'grammar'] as const).map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterType(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterType === cat
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white bg-slate-950 border border-slate-700/70'
                }`}
              >
                {cat === 'ALL' ? 'Toutes' : cat === 'vocab' ? 'Vocabulaire' : cat === 'pronunciation' ? 'Prononciation' : 'Grammaire'}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterStatus('unresolved')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === 'unresolved'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              À corriger ({stats.unresolved})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('mastered')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === 'mastered'
                  ? 'bg-slate-800 text-emerald-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Maîtrisées ({stats.mastered})
            </button>
            {stats.mastered > 0 && (
              <button
                type="button"
                onClick={() => mistakeVaultService.clearMastered()}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                title="Vider les erreurs maîtrisées"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* List of Mistake Cards */}
        {filteredMistakes.length === 0 ? (
          <div className="p-12 text-center space-y-3 rounded-2xl bg-slate-950 border border-slate-700/70">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Aucune erreur dans cette catégorie !</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Votre coffre est vide pour ce filtre. Continuez à vous entraîner dans les tests, le Voice Studio ou le Speed Drill.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredMistakes.map(item => {
              const isMastered = item.status === 'mastered';
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                    isMastered
                      ? 'bg-slate-950 border-emerald-500/30 opacity-75'
                      : 'bg-slate-950 border-slate-700/70 hover:border-slate-600'
                  }`}
                >
                  <div>
                    {/* Top Type Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.type === 'vocab'
                            ? 'bg-indigo-500/20 text-indigo-300'
                            : item.type === 'pronunciation'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-violet-500/20 text-violet-300'
                        }`}>
                          {item.type === 'vocab' ? 'Vocabulaire' : item.type === 'pronunciation' ? 'Prononciation' : 'Grammaire'}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">
                          {item.level}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isMastered
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {isMastered ? 'Maîtrisé ✓' : `${item.consecutiveCorrect}/2 Validations`}
                        </span>
                        <button
                          type="button"
                          onClick={() => mistakeVaultService.removeMistake(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-400 rounded-md"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Target Expression & Listen Button */}
                    <div className="flex items-start justify-between gap-2 mt-2">
                      <div>
                        <h4 className="text-base font-bold text-white">
                          {item.french}
                        </h4>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {item.english}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => speechService.speak(item.french, { rate: speechRate })}
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors shrink-0"
                        title="Écouter"
                      >
                        <Volume2 className="w-4 h-4 text-indigo-400" />
                      </button>
                    </div>

                    {/* Context Note */}
                    <div className="mt-2.5 p-2 rounded-xl bg-slate-900 border border-slate-700/70 text-[11px] text-slate-300">
                      <span className="text-amber-400 font-semibold">Diagnostic : </span>
                      <span>{item.contextNote}</span>
                    </div>

                    {item.phoneticTip && (
                      <div className="mt-1 text-[11px] text-indigo-300 flex items-center gap-1">
                        <Lightbulb className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span>Conseil : {item.phoneticTip}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">
                      Noté le {item.failedAt.split('T')[0]}
                    </span>

                    {item.type === 'pronunciation' ? (
                      <button
                        type="button"
                        onClick={() => onNavigateToVoice(item.french)}
                        className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>Tester la Voix</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setCleansingQueue([item]);
                          setCurrentCleansingIndex(0);
                          setTypedAnswer('');
                          setCleansingFeedback(null);
                          setIsCleansingSession(true);
                        }}
                        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-tester</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
