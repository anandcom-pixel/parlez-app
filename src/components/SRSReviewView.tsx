import React, { useState, useEffect } from 'react';
import {
  Brain,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCw,
  Sparkles,
  Layers,
  Search
} from 'lucide-react';
import type { LeitnerCard } from '../types';
import { srsService } from '../services/srsService';
import { speechService } from '../services/speechService';
import { soundEffects } from '../services/soundEffects';

interface SRSReviewViewProps {
  speechRate: number;
}

export const SRSReviewView: React.FC<SRSReviewViewProps> = ({ speechRate }) => {
  const [cards, setCards] = useState<LeitnerCard[]>(srsService.getCards());
  const [boxCounts, setBoxCounts] = useState(srsService.getBoxCounts());
  const [isReviewSessionActive, setIsReviewSessionActive] = useState<boolean>(false);
  const [reviewQueue, setReviewQueue] = useState<LeitnerCard[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBoxFilter, setSelectedBoxFilter] = useState<number | 'all'>('all');

  useEffect(() => {
    const unsub = srsService.subscribe(() => {
      setCards([...srsService.getCards()]);
      setBoxCounts(srsService.getBoxCounts());
    });
    return () => unsub();
  }, []);

  const dueCards = srsService.getDueCards();

  const startReviewSession = () => {
    soundEffects.playTap();
    const queue = dueCards.length > 0 ? dueCards : cards.slice(0, 10);
    setReviewQueue(queue);
    setCurrentQueueIndex(0);
    setIsCardFlipped(false);
    setIsReviewSessionActive(true);

    if (queue[0]) {
      speechService.speak(queue[0].french, { rate: speechRate });
    }
  };

  const handleCardResult = (knewIt: boolean) => {
    const currentCard = reviewQueue[currentQueueIndex];
    if (!currentCard) return;

    if (knewIt) {
      soundEffects.playCorrect();
      srsService.recordResult(currentCard.vocabId, true);
    } else {
      soundEffects.playIncorrect();
      srsService.recordResult(currentCard.vocabId, false);
    }

    if (currentQueueIndex + 1 < reviewQueue.length) {
      const nextIndex = currentQueueIndex + 1;
      setCurrentQueueIndex(nextIndex);
      setIsCardFlipped(false);
      setTimeout(() => {
        speechService.speak(reviewQueue[nextIndex].french, { rate: speechRate });
      }, 250);
    } else {
      soundEffects.playVictory();
      setIsReviewSessionActive(false);
    }
  };

  const currentReviewCard = reviewQueue[currentQueueIndex];

  // Filtering cards for the deck browser
  const filteredCards = cards.filter(c => {
    const matchesSearch =
      c.french.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.english.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBox = selectedBoxFilter === 'all' || c.box === selectedBoxFilter;
    return matchesSearch && matchesBox;
  });

  const BOX_INFO = [
    { box: 1, title: 'Boîte 1', interval: 'Quotidien (1j)', cardStyle: 'bg-slate-950 border-rose-500/50 text-rose-300', badgeColor: 'border-rose-500/40 bg-rose-950/60 text-rose-300' },
    { box: 2, title: 'Boîte 2', interval: 'Tous les 2j', cardStyle: 'bg-slate-950 border-amber-500/50 text-amber-300', badgeColor: 'border-amber-500/40 bg-amber-950/60 text-amber-300' },
    { box: 3, title: 'Boîte 3', interval: 'Tous les 4j', cardStyle: 'bg-slate-950 border-blue-500/50 text-blue-300', badgeColor: 'border-blue-500/40 bg-blue-950/60 text-blue-300' },
    { box: 4, title: 'Boîte 4', interval: 'Tous les 7j', cardStyle: 'bg-slate-950 border-indigo-500/50 text-indigo-300', badgeColor: 'border-indigo-500/40 bg-indigo-950/60 text-indigo-300' },
    { box: 5, title: 'Boîte 5', interval: 'Tous les 14j', cardStyle: 'bg-slate-950 border-emerald-500/50 text-emerald-300', badgeColor: 'border-emerald-500/40 bg-emerald-950/60 text-emerald-300' }
  ] as const;

  return (
    <div className="space-y-8 animate-in fade-in pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" />
                Moteur de Répétition Espacée (SRS)
              </span>
              <span className="text-xs text-slate-300">Algorithme des 5 Boîtes de Leitner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pont de Révision &amp; Ancrage Cognitif
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Les expressions échouées lors des tests ou enregistrements vocaux retombent automatiquement en Boîte 1. Réussissez vos révisions pour les faire progresser jusqu&apos;à la mémoire à long terme (Boîte 5).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={startReviewSession}
              disabled={cards.length === 0}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {dueCards.length > 0 ? `Réviser (${dueCards.length} à revoir)` : 'Session d’Entraînement'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Leitner 5 Boxes Visualizer */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {BOX_INFO.map(b => {
          const count = boxCounts[b.box as 1 | 2 | 3 | 4 | 5];
          const isSelected = selectedBoxFilter === b.box;
          return (
            <div
              key={b.box}
              onClick={() => setSelectedBoxFilter(isSelected ? 'all' : b.box)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-lg ${
                isSelected ? 'ring-2 ring-indigo-400 scale-[1.02]' : 'hover:border-slate-600'
              } ${b.cardStyle}`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-white">{b.title}</span>
                <span className="text-lg font-black">{count}</span>
              </div>
              <div className="text-[11px] text-slate-300">{b.interval}</div>
              <div className="mt-3 w-full h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-current transition-all"
                  style={{ width: `${cards.length > 0 ? Math.min((count / cards.length) * 100, 100) : 0}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Interactive Review Session (Flashcards) */}
      {isReviewSessionActive && currentReviewCard && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl space-y-6 animate-in zoom-in-95">
          <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
            <span>
              Carte {currentQueueIndex + 1} sur {reviewQueue.length} (Boîte {currentReviewCard.box})
            </span>
            <button
              type="button"
              onClick={() => setIsReviewSessionActive(false)}
              className="text-rose-400 hover:text-rose-300 font-semibold"
            >
              Quitter la session
            </button>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsCardFlipped(!isCardFlipped)}
            className="cursor-pointer min-h-[220px] sm:min-h-[260px] p-8 rounded-3xl bg-slate-950 border border-slate-700/80 hover:border-indigo-500/60 transition-all flex flex-col items-center justify-center text-center space-y-4 group relative shadow-inner"
          >
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300">
              {isCardFlipped ? '🇬🇧 Traduction & Sens' : '🇫🇷 Mot Français (Cliquez pour retourner)'}
            </span>

            {!isCardFlipped ? (
              <div className="space-y-2">
                <h3 className="text-3xl sm:text-4xl font-black text-white group-hover:text-indigo-200 transition-colors">
                  {currentReviewCard.french}
                </h3>
                <span className="text-xs text-indigo-400 font-semibold block">
                  Niveau {currentReviewCard.level}
                </span>
              </div>
            ) : (
              <div className="space-y-2 animate-in fade-in">
                <h3 className="text-2xl sm:text-3xl font-black text-emerald-300">
                  {currentReviewCard.english}
                </h3>
                <p className="text-xs text-slate-300">
                  {currentReviewCard.french}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundEffects.playTap();
                  speechService.speak(currentReviewCard.french, { rate: speechRate });
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Écouter le mot"
              >
                <Volume2 className="w-4 h-4 text-indigo-400" />
                <span>Listen</span>
              </button>
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <RotateCw className="w-3 h-3" /> Retourner la carte
              </span>
            </div>
          </div>

          {/* Review Decision Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleCardResult(false)}
              className="p-4 rounded-2xl bg-slate-950 border border-rose-500/50 hover:bg-rose-950/60 text-rose-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
            >
              <XCircle className="w-4 h-4" />
              <span>À revoir (Retour Boîte 1)</span>
            </button>
            <button
              type="button"
              onClick={() => handleCardResult(true)}
              className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/50 hover:bg-emerald-950/60 text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Su / Maîtrisé (+10 XP)</span>
            </button>
          </div>
        </div>
      )}

      {/* SRS Deck Browser & Search Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Deck de Répétition Espacée ({cards.length} expressions suivies)
          </h2>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrer un mot..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {selectedBoxFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedBoxFilter('all')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-slate-200 hover:text-white flex items-center gap-1"
              >
                <span>Filtre: B{selectedBoxFilter}</span>
                <span className="text-slate-400">✕</span>
              </button>
            )}
          </div>
        </div>

        {/* Cards Table Inner Container */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-300">
                <th className="py-3 px-4">Expression Française</th>
                <th className="py-3 px-4">Sens en Anglais</th>
                <th className="py-3 px-4">Niveau</th>
                <th className="py-3 px-4">Boîte Leitner</th>
                <th className="py-3 px-4 text-right">Audio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredCards.map(card => {
                const boxMeta = BOX_INFO[card.box - 1];
                return (
                  <tr key={card.vocabId} className="hover:bg-slate-900/70 transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-white">
                      {card.french}
                    </td>
                    <td className="py-2.5 px-4 text-slate-200">
                      {card.english}
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-[10px] font-bold text-slate-200">
                        {card.level}
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${boxMeta.badgeColor}`}>
                        Boîte {card.box} ({boxMeta.interval})
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          soundEffects.playTap();
                          speechService.speak(card.french, { rate: speechRate });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white hover:bg-indigo-600 transition-colors inline-flex items-center gap-1 font-semibold"
                        title="Écouter"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Listen</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
