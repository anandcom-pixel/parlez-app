import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  RefreshCw,
  Trophy,
  ArrowRight,
  Brain,
  Sparkles,
  Layers,
  Keyboard,
  Shuffle
} from 'lucide-react';
import type { Lesson, VocabularyItem, TestType, TestQuestion } from '../types';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { speechService } from '../services/speechService';
import { soundEffects } from '../services/soundEffects';
import { srsService } from '../services/srsService';
import { mistakeVaultService } from '../services/mistakeVaultService';
import { FrenchKeyboardHelper } from './FrenchKeyboardHelper';

interface VocabTestViewProps {
  initialLesson?: Lesson | null;
  speechRate: number;
  onNavigateToSRS: () => void;
}

export const VocabTestView: React.FC<VocabTestViewProps> = ({
  initialLesson,
  speechRate,
  onNavigateToSRS
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    initialLesson?.id || CURRICULUM_DATA[0].id
  );
  const [selectedTestType, setSelectedTestType] = useState<TestType | 'mixed'>('multiple-choice');
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedSpelling, setTypedSpelling] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [testSummary, setTestSummary] = useState<{
    total: number;
    correct: number;
    percentage: number;
    xpEarned: number;
    failedItems: VocabularyItem[];
  } | null>(null);

  // Matching game state
  const [matchingCards, setMatchingCards] = useState<{
    id: string;
    text: string;
    type: 'french' | 'english';
    vocabId: string;
    isMatched: boolean;
  }[]>([]);
  const [selectedMatchingCard, setSelectedMatchingCard] = useState<{
    id: string;
    type: 'french' | 'english';
    vocabId: string;
  } | null>(null);
  const [matchingPairsLeft, setMatchingPairsLeft] = useState<number>(0);

  const currentLesson = CURRICULUM_DATA.find(l => l.id === selectedLessonId) || CURRICULUM_DATA[0];

  useEffect(() => {
    if (initialLesson) {
      setSelectedLessonId(initialLesson.id);
    }
  }, [initialLesson]);

  // Generate Questions for the chosen lesson and test type
  const startTest = () => {
    soundEffects.playTap();
    const vocabPool = [...currentLesson.vocabulary];
    if (vocabPool.length === 0) return;

    // Shuffle pool
    const shuffledVocab = [...vocabPool].sort(() => 0.5 - Math.random());

    if (selectedTestType === 'matching') {
      // Setup matching game cards
      const selectedSubset = shuffledVocab.slice(0, 6);
      const cards: {
        id: string;
        text: string;
        type: 'french' | 'english';
        vocabId: string;
        isMatched: boolean;
      }[] = [];

      selectedSubset.forEach((item, index) => {
        cards.push({
          id: `fr-${index}`,
          text: item.french,
          type: 'french',
          vocabId: item.id,
          isMatched: false
        });
        cards.push({
          id: `en-${index}`,
          text: item.english,
          type: 'english',
          vocabId: item.id,
          isMatched: false
        });
      });

      // Shuffle cards randomly
      setMatchingCards(cards.sort(() => 0.5 - Math.random()));
      setMatchingPairsLeft(selectedSubset.length);
      setIsTestActive(true);
      setTestSummary(null);
      setCurrentQuestionIndex(0);
      setScore(0);
      return;
    }

    // Generate Multiple Choice and/or Spelling questions
    const generated: TestQuestion[] = shuffledVocab.map((item, index) => {
      let qType: TestType = 'multiple-choice';
      if (selectedTestType === 'mixed') {
        qType = index % 2 === 0 ? 'multiple-choice' : 'spelling';
      } else {
        qType = selectedTestType;
      }

      if (qType === 'multiple-choice') {
        // Distractors from other vocabulary items
        const allOtherVocabs = CURRICULUM_DATA.flatMap(l => l.vocabulary).filter(v => v.id !== item.id);
        const distractors = allOtherVocabs
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(v => v.english);

        const options = [item.english, ...distractors].sort(() => 0.5 - Math.random());

        return {
          id: `q-${item.id}-${index}`,
          type: 'multiple-choice',
          prompt: item.french,
          subPrompt: item.gender && item.gender !== 'none' ? `Genre: ${item.gender === 'm' ? 'Masculin' : 'Féminin'}` : undefined,
          targetVocab: item,
          options,
          correctAnswer: item.english
        };
      } else {
        // Spelling / Dictation question
        return {
          id: `q-${item.id}-${index}`,
          type: 'spelling',
          prompt: `Écoutez et écrivez l’expression française correspondant à : « ${item.english} »`,
          targetVocab: item,
          correctAnswer: item.french
        };
      }
    });

    setQuestions(generated);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setTypedSpelling('');
    setIsAnswerSubmitted(false);
    setScore(0);
    setTestSummary(null);
    setIsTestActive(true);

    // Auto-play audio prompt if first question is spelling
    if (generated[0]?.type === 'spelling') {
      setTimeout(() => {
        speechService.speak(generated[0].targetVocab.french, { rate: speechRate });
      }, 300);
    }
  };

  const handleMultipleChoiceSelect = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (isAnswerSubmitted) return;
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    let isCorrect = false;

    if (currentQ.type === 'multiple-choice') {
      if (!selectedAnswer) return;
      isCorrect = selectedAnswer === currentQ.correctAnswer;
    } else if (currentQ.type === 'spelling') {
      if (!typedSpelling.trim()) return;
      // Compare normalized text
      const cleanTyped = typedSpelling.trim().toLowerCase();
      const cleanTarget = currentQ.correctAnswer.trim().toLowerCase();
      isCorrect = cleanTyped === cleanTarget;
    }

    currentQ.isCorrect = isCorrect;
    currentQ.userAnswer = currentQ.type === 'multiple-choice' ? selectedAnswer || '' : typedSpelling;

    if (isCorrect) {
      soundEffects.playCorrect();
      setScore(prev => prev + 1);
      srsService.recordResult(currentQ.targetVocab.id, true, currentQ.targetVocab);
    } else {
      soundEffects.playIncorrect();
      // Automatic SRS loopback: failed item added to Leitner Box 1
      srsService.queueFailedItem(currentQ.targetVocab);

      // Route immediately into the Mistake Vault
      mistakeVaultService.addMistake({
        type: 'vocab',
        french: currentQ.targetVocab.french,
        english: currentQ.targetVocab.english,
        level: currentQ.targetVocab.level,
        contextNote: currentQ.type === 'multiple-choice'
          ? `Échec QCM : sélectionné "${selectedAnswer}" au lieu de "${currentQ.correctAnswer}".`
          : `Échec Dictée : écrit "${typedSpelling}". Réponse exacte : "${currentQ.correctAnswer}".`,
        phoneticTip: currentQ.targetVocab.pronunciationTip
      });
    }

    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    soundEffects.playTap();
    if (currentQuestionIndex + 1 < questions.length) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setTypedSpelling('');
      setIsAnswerSubmitted(false);

      if (questions[nextIndex]?.type === 'spelling') {
        setTimeout(() => {
          speechService.speak(questions[nextIndex].targetVocab.french, { rate: speechRate });
        }, 200);
      }
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    const total = questions.length;
    const correct = score + (questions[currentQuestionIndex]?.isCorrect ? 1 : 0);
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const failedItems = questions.filter(q => !q.isCorrect).map(q => q.targetVocab);

    const xpEarned = 30 + Math.round((percentage / 100) * 20);
    srsService.recordTestCompleted(percentage);

    setTestSummary({
      total,
      correct,
      percentage,
      xpEarned,
      failedItems
    });
    setIsTestActive(false);

    if (percentage >= 70) {
      soundEffects.playVictory();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  // Matching game handler
  const handleSelectMatchingCard = (card: {
    id: string;
    type: 'french' | 'english';
    vocabId: string;
  }) => {
    if (card.id === selectedMatchingCard?.id) {
      setSelectedMatchingCard(null);
      return;
    }

    soundEffects.playTap();

    if (!selectedMatchingCard) {
      setSelectedMatchingCard(card);
      // Play audio if French card selected
      if (card.type === 'french') {
        const found = matchingCards.find(c => c.id === card.id);
        if (found) speechService.speak(found.text, { rate: speechRate });
      }
      return;
    }

    // Different type check (must pair French with English)
    if (selectedMatchingCard.type === card.type) {
      setSelectedMatchingCard(card);
      return;
    }

    // Check if matching pair
    if (selectedMatchingCard.vocabId === card.vocabId) {
      soundEffects.playCorrect();
      setMatchingCards(prev =>
        prev.map(c =>
          c.vocabId === card.vocabId ? { ...c, isMatched: true } : c
        )
      );
      setSelectedMatchingCard(null);
      const remaining = matchingPairsLeft - 1;
      setMatchingPairsLeft(remaining);
      setScore(prev => prev + 1);

      if (remaining === 0) {
        // Complete matching game
        soundEffects.playVictory();
        srsService.recordTestCompleted(100);
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
        setTestSummary({
          total: 6,
          correct: 6,
          percentage: 100,
          xpEarned: 50,
          failedItems: []
        });
        setIsTestActive(false);
      }
    } else {
      soundEffects.playIncorrect();
      const failedVocab = currentLesson.vocabulary.find(v => v.id === card.vocabId);
      if (failedVocab) {
        srsService.queueFailedItem(failedVocab);
        mistakeVaultService.addMistake({
          type: 'vocab',
          french: failedVocab.french,
          english: failedVocab.english,
          level: failedVocab.level,
          contextNote: 'Association erronée lors du Jeu de Paires.'
        });
      }
      setSelectedMatchingCard(null);
    }
  };

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="space-y-8 animate-in fade-in pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-violet-500/20 text-violet-300 border border-violet-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Générateur d'Évaluations
            </span>
            <span className="text-xs text-slate-400">Évaluation & Ancrage Mémoriel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Laboratoire de Tests & Vocabulaire
          </h1>
        </div>

        {/* Test Type Selectors */}
        {!isTestActive && !testSummary && (
          <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap();
                setSelectedTestType('multiple-choice');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedTestType === 'multiple-choice'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>QCM</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap();
                setSelectedTestType('matching');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedTestType === 'matching'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Paires</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap();
                setSelectedTestType('spelling');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedTestType === 'spelling'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>Dictée</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap();
                setSelectedTestType('mixed');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedTestType === 'mixed'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Mixte</span>
            </button>
          </div>
        )}
      </div>

      {/* Configuration Screen (when no test is running and no summary) */}
      {!isTestActive && !testSummary && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sélectionnez le Module à Évaluer :
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CURRICULUM_DATA.map(lesson => {
                const isSelected = lesson.id === selectedLessonId;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      soundEffects.playTap();
                      setSelectedLessonId(lesson.id);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500 shadow-lg ring-1 ring-indigo-500/50'
                        : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                        {lesson.level}
                      </span>
                      <span className="text-slate-400">{lesson.vocabulary.length} mots</span>
                    </div>
                    <div className="mt-2 font-bold text-sm text-white">{lesson.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{lesson.theme}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 flex items-start gap-3">
            <Brain className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Boucle de Répétition Espacée Intelligente (SRS) :</strong> Tout mot manqué ou hésité lors de cette évaluation sera automatiquement réinjecté dans la boîte de révision Leitner n°1 pour consolidation immédiate.
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={startTest}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transform active:scale-95 transition-all"
            >
              <span>Lancer l’Évaluation ({currentLesson.title})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Active Matching Pairs Test Mode */}
      {isTestActive && selectedTestType === 'matching' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Jeu d'Association de Paires
              </span>
              <h2 className="text-xl font-bold text-white">Reliez chaque mot français à sa traduction anglaise</h2>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 text-indigo-300">
              Paires restantes : {matchingPairsLeft}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {matchingCards.map(card => {
              const isSelected = selectedMatchingCard?.id === card.id;
              if (card.isMatched) {
                return (
                  <div
                    key={card.id}
                    className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center text-center opacity-40 select-none text-xs sm:text-sm font-semibold"
                  >
                    <span>✓ {card.text}</span>
                  </div>
                );
              }

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleSelectMatchingCard(card)}
                  className={`p-4 sm:p-5 rounded-2xl border text-center transition-all duration-150 transform active:scale-95 select-none font-bold text-xs sm:text-sm flex flex-col items-center justify-center min-h-[90px] ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/40 ring-2 ring-indigo-400'
                      : card.type === 'french'
                      ? 'bg-slate-950/70 border-slate-800 text-white hover:border-indigo-500/60'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-indigo-500/60'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">
                    {card.type === 'french' ? '🇫🇷 Français' : '🇬🇧 Anglais'}
                  </span>
                  <span>{card.text}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
            <span>Cliquez sur une carte pour la sélectionner, puis cliquez sur sa correspondance.</span>
            <button
              type="button"
              onClick={() => setIsTestActive(false)}
              className="text-rose-400 hover:text-rose-300"
            >
              Abandonner
            </button>
          </div>
        </div>
      )}

      {/* Active QCM or Spelling Test Question */}
      {isTestActive && selectedTestType !== 'matching' && currentQ && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          {/* Progress Bar & Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-2 text-indigo-400">
                <span>Question {currentQuestionIndex + 1} sur {questions.length}</span>
                <span>•</span>
                <span className="capitalize">{currentQ.type === 'multiple-choice' ? 'Choix Multiple' : 'Dictée & Orthographe'}</span>
              </span>
              <span>Score : {score} / {questions.length}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Prompt */}
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  {currentQ.type === 'multiple-choice' ? 'Que signifie cette expression ?' : 'Écoutez et orthographiez :'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {currentQ.type === 'multiple-choice' ? currentQ.prompt : currentQ.prompt}
                </h3>
                {currentQ.subPrompt && (
                  <p className="text-xs text-indigo-400 font-mono mt-1">{currentQ.subPrompt}</p>
                )}
              </div>

              {/* Native Voice Audio Button */}
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap();
                  speechService.speak(currentQ.targetVocab.french, { rate: speechRate });
                }}
                className="p-3.5 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all shadow-md shrink-0"
                title="Écouter la prononciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Question Body: Multiple Choice Options */}
          {currentQ.type === 'multiple-choice' && currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                let optionStyle = 'bg-slate-950/60 border-slate-800 text-slate-200 hover:bg-slate-800/80 hover:border-slate-700';

                if (isAnswerSubmitted) {
                  if (option === currentQ.correctAnswer) {
                    optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/40 font-bold';
                  } else if (isSelected && option !== currentQ.correctAnswer) {
                    optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-200 ring-1 ring-rose-500/40';
                  } else {
                    optionStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-50';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-indigo-600/30 border-indigo-500 text-white ring-1 ring-indigo-500/50 font-bold';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswerSubmitted}
                    onClick={() => handleMultipleChoiceSelect(option)}
                    className={`p-4 rounded-2xl border text-left text-sm transition-all duration-150 flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswerSubmitted && option === currentQ.correctAnswer && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {isAnswerSubmitted && isSelected && option !== currentQ.correctAnswer && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Question Body: Spelling / Dictation Input */}
          {currentQ.type === 'spelling' && (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={typedSpelling}
                  disabled={isAnswerSubmitted}
                  onChange={(e) => setTypedSpelling(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (!isAnswerSubmitted) {
                        handleSubmitAnswer();
                      } else {
                        handleNextQuestion();
                      }
                    }
                  }}
                  placeholder="Tapez le mot ou l'expression en français..."
                  className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white text-base focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  autoFocus
                />
              </div>

              {/* French Special Accent Characters Keyboard Helper */}
              {!isAnswerSubmitted && (
                <FrenchKeyboardHelper
                  onInsertChar={(char) => setTypedSpelling(prev => prev + char)}
                />
              )}

              {/* Instant feedback on answer */}
              {isAnswerSubmitted && (
                <div className={`p-4 rounded-2xl border text-sm ${
                  currentQ.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                }`}>
                  <div className="font-bold flex items-center gap-2">
                    {currentQ.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>{currentQ.isCorrect ? 'Orthographe Parfaite !' : 'Orthographe Incorrecte'}</span>
                  </div>
                  {!currentQ.isCorrect && (
                    <div className="mt-1 text-xs">
                      Bonne réponse : <strong className="text-white underline">{currentQ.correctAnswer}</strong> (vous avez écrit : "{typedSpelling}")
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsTestActive(false)}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Quitter le Test
            </button>

            {!isAnswerSubmitted ? (
              <button
                type="button"
                disabled={currentQ.type === 'multiple-choice' ? !selectedAnswer : !typedSpelling.trim()}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:pointer-events-none text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
              >
                Vérifier
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30"
              >
                <span>{currentQuestionIndex + 1 < questions.length ? 'Question Suivante' : 'Voir les Résultats'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Test Summary Modal / Screen */}
      {testSummary && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 animate-in zoom-in-95">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-0.5 shadow-xl shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Évaluation Terminée !
            </h2>
            <p className="text-sm text-slate-300">
              {testSummary.percentage >= 80
                ? 'Excellent travail ! Vous maîtrisez parfaitement ce vocabulaire.'
                : testSummary.percentage >= 50
                ? 'Bon effort ! Quelques mots nécessitent encore un peu de révision.'
                : 'Poursuivez vos efforts. Les expressions manquées ont été ajoutées à votre boîte de révision.'}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">{testSummary.percentage}%</div>
              <div className="text-[11px] text-slate-400 font-medium">Précision</div>
            </div>
            <div className="border-x border-slate-800">
              <div className="text-xl sm:text-2xl font-black text-indigo-400">+{testSummary.xpEarned}</div>
              <div className="text-[11px] text-slate-400 font-medium">XP Gagnés</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">{testSummary.correct}/{testSummary.total}</div>
              <div className="text-[11px] text-slate-400 font-medium">Réponses Exactes</div>
            </div>
          </div>

          {/* Failed Items Notification & Leitner Loopback */}
          {testSummary.failedItems.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Brain className="w-4 h-4" />
                <span>Répétition Espacée Leitner : {testSummary.failedItems.length} mot(s) à réviser</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {testSummary.failedItems.map(item => (
                  <span
                    key={item.id}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-rose-300"
                  >
                    {item.french} ({item.english})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Summary Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={startTest}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Recommencer le Test</span>
            </button>

            <div className="flex items-center gap-2">
              {testSummary.failedItems.length > 0 && (
                <button
                  type="button"
                  onClick={onNavigateToSRS}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600/30 border border-indigo-500/50 hover:bg-indigo-600/40 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>Réviser les Cartes SRS</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setTestSummary(null)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
              >
                Terminer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
