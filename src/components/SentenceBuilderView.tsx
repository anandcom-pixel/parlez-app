import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Puzzle,
  CheckCircle2,
  XCircle,
  Volume2,
  RefreshCw,
  ArrowRight,
  Lightbulb,
  ShieldAlert
} from 'lucide-react';
import type { SentenceBuilderItem, CEFRLevel } from '../types';
import { SENTENCE_BUILDER_DATA } from '../data/sentenceBuilderData';
import { speechService } from '../services/speechService';
import { soundEffects } from '../services/soundEffects';
import { srsService } from '../services/srsService';
import { mistakeVaultService } from '../services/mistakeVaultService';

interface SentenceBuilderViewProps {
  speechRate: number;
  onNavigateToVault: () => void;
}

export const SentenceBuilderView: React.FC<SentenceBuilderViewProps> = ({
  speechRate,
  onNavigateToVault
}) => {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'ALL'>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [assembledWords, setAssembledWords] = useState<string[]>([]);
  const [draggedWordIndex, setDraggedWordIndex] = useState<{ source: 'available' | 'assembled'; index: number } | null>(null);
  const [validationState, setValidationState] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Filter items based on level
  const filteredData = SENTENCE_BUILDER_DATA.filter(
    item => selectedLevel === 'ALL' || item.level === selectedLevel
  );

  const currentItem: SentenceBuilderItem | undefined = filteredData[currentIndex] || filteredData[0];

  useEffect(() => {
    if (currentItem) {
      // Shuffle scrambled words
      const shuffled = [...currentItem.scrambledWords].sort(() => 0.5 - Math.random());
      setAvailableWords(shuffled);
      setAssembledWords([]);
      setValidationState(null);
      setShowHint(false);
    }
  }, [currentIndex, selectedLevel]);

  if (!currentItem) {
    return null;
  }

  // Click handlers
  const handleWordClickAvailable = (word: string, index: number) => {
    soundEffects.playTap();
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
    setAssembledWords(prev => [...prev, word]);
    setValidationState(null);
  };

  const handleWordClickAssembled = (word: string, index: number) => {
    soundEffects.playTap();
    setAssembledWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
    setValidationState(null);
  };

  const handleReset = () => {
    soundEffects.playTap();
    const shuffled = [...currentItem.scrambledWords].sort(() => 0.5 - Math.random());
    setAvailableWords(shuffled);
    setAssembledWords([]);
    setValidationState(null);
  };

  // Drag-and-drop HTML5 handlers
  const handleDragStart = (source: 'available' | 'assembled', index: number) => {
    setDraggedWordIndex({ source, index });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnAssembled = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    if (!draggedWordIndex) return;

    soundEffects.playTap();
    setValidationState(null);

    if (draggedWordIndex.source === 'available') {
      const word = availableWords[draggedWordIndex.index];
      setAvailableWords(prev => prev.filter((_, i) => i !== draggedWordIndex.index));

      if (targetIndex !== undefined) {
        setAssembledWords(prev => {
          const next = [...prev];
          next.splice(targetIndex, 0, word);
          return next;
        });
      } else {
        setAssembledWords(prev => [...prev, word]);
      }
    } else if (draggedWordIndex.source === 'assembled' && targetIndex !== undefined) {
      // Reorder within assembled
      setAssembledWords(prev => {
        const next = [...prev];
        const [moved] = next.splice(draggedWordIndex.index, 1);
        next.splice(targetIndex, 0, moved);
        return next;
      });
    }

    setDraggedWordIndex(null);
  };

  const handleDropOnAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedWordIndex || draggedWordIndex.source !== 'assembled') return;

    soundEffects.playTap();
    setValidationState(null);
    const word = assembledWords[draggedWordIndex.index];
    setAssembledWords(prev => prev.filter((_, i) => i !== draggedWordIndex.index));
    setAvailableWords(prev => [...prev, word]);
    setDraggedWordIndex(null);
  };

  const handleValidate = () => {
    if (assembledWords.length === 0) return;

    const assembledSentence = assembledWords.join(' ').trim().toLowerCase();
    const targetSentence = currentItem.frenchCorrect.trim().toLowerCase();

    const isCorrect = assembledSentence === targetSentence;

    if (isCorrect) {
      soundEffects.playCorrect();
      setValidationState('correct');
      srsService.addXP(20);

      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    } else {
      soundEffects.playIncorrect();
      setValidationState('incorrect');

      // Route grammar failure immediately to Mistake Vault!
      mistakeVaultService.addMistake({
        type: 'grammar',
        french: currentItem.frenchCorrect,
        english: currentItem.englishPrompt,
        level: currentItem.level,
        contextNote: `Incorrect word sequence. Assembled: "${assembledWords.join(' ')}". Rule: ${currentItem.grammarHint}`
      });
    }
  };

  const handleNext = () => {
    soundEffects.playTap();
    if (currentIndex + 1 < filteredData.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePlayAudio = () => {
    soundEffects.playTap();
    speechService.speak(currentItem.frenchCorrect, { rate: speechRate });
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-16 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Puzzle className="w-3.5 h-3.5" />
                Atelier Syntaxique & Grammaire
              </span>
              <span className="text-xs text-slate-400">Glisser-Déposer & Assemblage de Phrases</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Constructeur de Phrases Interactif
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Glissez ou cliquez sur les blocs de mots français pour reconstituer la structure grammaticale exacte. Toute hésitation est analysée et enregistrée.
            </p>
          </div>

          {/* Level Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-700/80 shrink-0">
            {(['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map(lvl => (
              <button
                key={lvl}
                type="button"
                onClick={() => {
                  soundEffects.playTap();
                  setSelectedLevel(lvl);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedLevel === lvl
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Sentence Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-xl space-y-6">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between border-b border-slate-700/70 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Niveau {currentItem.level}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Défi {currentIndex + 1} sur {filteredData.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>{showHint ? 'Masquer l’Indice' : 'Indice Grammaire'}</span>
            </button>
            <button
              type="button"
              onClick={handlePlayAudio}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Écouter la prononciation"
            >
              <Volume2 className="w-4 h-4 text-indigo-400" />
            </button>
          </div>
        </div>

        {/* English Prompt */}
        <div className="text-center space-y-1 py-1">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Traduisez et ordonnez cette phrase :
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            « {currentItem.englishPrompt} »
          </h2>
        </div>

        {/* Grammar Hint Banner */}
        {showHint && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 text-xs text-amber-300 flex items-start gap-2.5 animate-in fade-in">
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <strong className="text-white">Règle de syntaxe :</strong> {currentItem.grammarHint}
            </div>
          </div>
        )}

        {/* DROPZONE: Assembled Sentence Blocks */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Votre phrase assemblée (glissez ou cliquez pour retirer) :</span>
            <span className="text-indigo-400">{assembledWords.length} / {currentItem.scrambledWords.length} mots placés</span>
          </div>

          <div
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDropOnAssembled(e)}
            className={`min-h-[100px] p-4 sm:p-6 rounded-2xl border-2 border-dashed transition-all flex flex-wrap gap-2.5 items-center content-center bg-slate-950 ${
              assembledWords.length === 0
                ? 'border-slate-700/70 justify-center'
                : validationState === 'correct'
                ? 'border-emerald-500/80'
                : validationState === 'incorrect'
                ? 'border-rose-500/80'
                : 'border-indigo-500/50'
            }`}
          >
            {assembledWords.length === 0 ? (
              <span className="text-xs text-slate-400 select-none">
                Glissez des mots ici ou cliquez sur les étiquettes ci-dessous pour construire la phrase...
              </span>
            ) : (
              assembledWords.map((word, idx) => (
                <div
                  key={`${word}-${idx}`}
                  draggable
                  onDragStart={() => handleDragStart('assembled', idx)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropOnAssembled(e, idx)}
                  onClick={() => handleWordClickAssembled(word, idx)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-sm select-none cursor-pointer transition-all transform active:scale-95 shadow-md flex items-center gap-1.5 border ${
                    validationState === 'correct'
                      ? 'bg-emerald-600 text-white border-emerald-400'
                      : validationState === 'incorrect'
                      ? 'bg-rose-900/60 text-rose-200 border-rose-500'
                      : 'bg-indigo-600/30 text-indigo-200 hover:bg-rose-900/40 hover:text-rose-200 border-indigo-500/50'
                  }`}
                  title="Cliquez pour retirer ce mot"
                >
                  <span>{word}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* AVAILABLE WORD BANK */}
        <div
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDropOnAvailable(e)}
          className="space-y-2 pt-2"
        >
          <span className="text-xs font-bold text-slate-400 block">
            Banque de mots disponibles :
          </span>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-700/70 flex flex-wrap gap-2.5 items-center min-h-[70px]">
            {availableWords.length === 0 ? (
              <span className="text-xs text-slate-400 italic select-none">
                Tous les blocs ont été placés dans la zone de construction !
              </span>
            ) : (
              availableWords.map((word, idx) => (
                <button
                  key={`${word}-${idx}`}
                  type="button"
                  draggable
                  onDragStart={() => handleDragStart('available', idx)}
                  onClick={() => handleWordClickAvailable(word, idx)}
                  className="px-4 py-2.5 rounded-xl font-bold text-sm bg-slate-800 text-slate-200 hover:bg-indigo-600 hover:text-white border border-slate-700/80 shadow-md transition-all transform active:scale-95 cursor-grab"
                  title="Glissez ou cliquez pour insérer"
                >
                  {word}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Validation Result Notifications */}
        {validationState === 'correct' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/50 text-emerald-200 space-y-1 animate-in zoom-in-95">
            <div className="font-bold text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Excellente Syntaxe ! (+20 XP)</span>
            </div>
            <p className="text-xs text-slate-300">
              {currentItem.grammarHint}
            </p>
          </div>
        )}

        {validationState === 'incorrect' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-rose-500/50 text-rose-200 space-y-2 animate-in zoom-in-95">
            <div className="font-bold text-sm flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-400" />
              <span>Ordre Syntaxique Incorrect</span>
            </div>
            <div className="text-xs text-slate-300">
              Ordre attendu : <strong className="text-white underline">{currentItem.frenchCorrect}</strong>
            </div>
            <div className="text-xs text-rose-300 flex items-center justify-between gap-1.5 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Cette structure a été ajoutée à votre Coffre-Fort des Erreurs.</span>
              </span>
              <button
                type="button"
                onClick={onNavigateToVault}
                className="text-xs text-rose-300 hover:text-white underline font-semibold flex items-center gap-1 shrink-0"
              >
                <span>Voir le Coffre</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-slate-700/70 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Réinitialiser les Blocs</span>
          </button>

          <div className="flex items-center gap-2">
            {validationState !== 'correct' ? (
              <button
                type="button"
                disabled={assembledWords.length === 0}
                onClick={handleValidate}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
              >
                Vérifier la Syntaxe
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30"
              >
                <span>Phrase Suivante</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
