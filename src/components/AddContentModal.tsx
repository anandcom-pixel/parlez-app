import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  BookOpen,
  Sparkles,
  Volume2,
  CheckCircle2,
  Cloud,
  Puzzle,
  Lightbulb,
  MessageSquare
} from 'lucide-react';
import type { Lesson, VocabularyItem, CEFRLevel } from '../types';
import { curriculumOverrideService } from '../services/curriculumOverrideService';
import { speechService } from '../services/speechService';
import { soundEffects } from '../services/soundEffects';

type ContentCreationTab = 'vocab' | 'lesson' | 'quiz';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableLessons: Lesson[];
  defaultLessonId?: string;
  defaultLevel?: CEFRLevel;
  onSuccess?: (type: ContentCreationTab, id: string) => void;
}

export const AddContentModal: React.FC<AddContentModalProps> = ({
  isOpen,
  onClose,
  availableLessons,
  defaultLessonId,
  defaultLevel = 'A1',
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState<ContentCreationTab>('vocab');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Tab 1: Vocabulary State
  const [vocabLessonId, setVocabLessonId] = useState<string>(
    defaultLessonId || availableLessons[0]?.id || ''
  );
  const [vocabFrench, setVocabFrench] = useState<string>('');
  const [vocabEnglish, setVocabEnglish] = useState<string>('');
  const [vocabIpa, setVocabIpa] = useState<string>('');
  const [vocabGender, setVocabGender] = useState<'m' | 'f' | 'pl' | 'none'>('none');
  const [vocabLevel, setVocabLevel] = useState<CEFRLevel>(defaultLevel);
  const [vocabCategory, setVocabCategory] = useState<string>('Vocabulaire Essentiel');
  const [vocabExampleFr, setVocabExampleFr] = useState<string>('');
  const [vocabExampleEn, setVocabExampleEn] = useState<string>('');
  const [vocabTip, setVocabTip] = useState<string>('');

  // Tab 2: Full Lesson State
  const [lessonLevel, setLessonLevel] = useState<CEFRLevel>(defaultLevel);
  const [lessonTitle, setLessonTitle] = useState<string>('');
  const [lessonSubtitle, setLessonSubtitle] = useState<string>('');
  const [lessonTheme, setLessonTheme] = useState<string>('');
  const [lessonDesc, setLessonDesc] = useState<string>('');
  const [grammarRule, setGrammarRule] = useState<string>('');
  const [grammarExp, setGrammarExp] = useState<string>('');
  const [grammarExFr, setGrammarExFr] = useState<string>('');
  const [grammarExEn, setGrammarExEn] = useState<string>('');
  const [culturalNote, setCulturalNote] = useState<string>('');
  const [idiomFr, setIdiomFr] = useState<string>('');
  const [idiomEn, setIdiomEn] = useState<string>('');
  const [dialogueScenario, setDialogueScenario] = useState<string>('Conversation courante');
  const [dialogueAFr, setDialogueAFr] = useState<string>('');
  const [dialogueAEn, setDialogueAEn] = useState<string>('');
  const [dialogueBFr, setDialogueBFr] = useState<string>('');
  const [dialogueBEn, setDialogueBEn] = useState<string>('');

  // Tab 3: Sentence & Quiz State
  const [quizLessonId, setQuizLessonId] = useState<string>(
    defaultLessonId || availableLessons[0]?.id || ''
  );
  const [quizLevel, setQuizLevel] = useState<CEFRLevel>(defaultLevel);
  const [quizType, setQuizType] = useState<'quiz' | 'sentence'>('quiz');
  const [quizPromptFr, setQuizPromptFr] = useState<string>('');
  const [quizAnswerEn, setQuizAnswerEn] = useState<string>('');
  const [quizDistractors, setQuizDistractors] = useState<string>('');
  const [quizExplanation, setQuizExplanation] = useState<string>('');

  if (!isOpen) return null;

  const handlePreviewAudio = (text: string) => {
    if (!text.trim()) return;
    soundEffects.playTap();
    speechService.speak(text);
  };

  const handleCreateVocabulary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vocabFrench.trim() || !vocabEnglish.trim() || !vocabLessonId) return;

    setIsSubmitting(true);
    const newItem: VocabularyItem = {
      id: `custom-voc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      french: vocabFrench.trim(),
      english: vocabEnglish.trim(),
      ipa: vocabIpa.trim() || undefined,
      gender: vocabGender,
      partOfSpeech: vocabGender === 'none' ? 'expression' : 'noun',
      exampleFrench: vocabExampleFr.trim() || vocabFrench.trim(),
      exampleEnglish: vocabExampleEn.trim() || vocabEnglish.trim(),
      pronunciationTip: vocabTip.trim() || undefined,
      level: vocabLevel,
      category: vocabCategory.trim() || 'Vocabulaire'
    };

    curriculumOverrideService.addVocabularyItem(vocabLessonId, newItem);
    soundEffects.playCorrect();
    setSuccessMessage(`Expression "${newItem.french}" ajoutée avec succès et synchronisée sur le Cloud !`);
    setIsSubmitting(false);

    setTimeout(() => {
      onSuccess?.('vocab', newItem.id);
      onClose();
    }, 700);
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim()) return;

    setIsSubmitting(true);
    const newLessonId = `custom-lesson-${lessonLevel.toLowerCase()}-${Date.now()}`;
    const newLesson: Lesson = {
      id: newLessonId,
      level: lessonLevel,
      title: lessonTitle.trim(),
      subtitle: lessonSubtitle.trim() || `Module Thématique ${lessonLevel}`,
      theme: lessonTheme.trim() || 'Pratique & Communication',
      description: lessonDesc.trim() || 'Module d’apprentissage créé par l’administrateur.',
      grammarFocus: {
        ruleName: grammarRule.trim() || 'Structure et Syntaxe',
        explanation: grammarExp.trim() || 'Observation et application des règles en contexte.',
        examples: grammarExFr.trim()
          ? [{ fr: grammarExFr.trim(), en: grammarExEn.trim() }]
          : [{ fr: 'Exemple pratique en contexte.', en: 'Practical context example.' }]
      },
      culturalNote: culturalNote.trim() || undefined,
      idiomSpotlight: idiomFr.trim()
        ? {
            french: idiomFr.trim(),
            literal: idiomFr.trim(),
            meaning: idiomEn.trim() || 'Expression idiomatique française',
            example: `« ${idiomFr.trim()} » : ${idiomEn.trim() || 'Expression courante'}.`
          }
        : undefined,
      dialogue: dialogueAFr.trim()
        ? {
            id: `dlg-${newLessonId}`,
            title: `Dialogue : ${lessonTitle.trim()}`,
            scenario: dialogueScenario.trim(),
            lines: [
              {
                speaker: 'Locuteur A',
                french: dialogueAFr.trim(),
                english: dialogueAEn.trim()
              },
              {
                speaker: 'Locuteur B',
                french: dialogueBFr.trim() || 'Très bien, merci pour ces informations !',
                english: dialogueBEn.trim() || 'Very well, thank you for this information!'
              }
            ]
          }
        : undefined,
      vocabulary: [
        {
          id: `voc-${newLessonId}-1`,
          french: lessonTitle.trim(),
          english: lessonSubtitle.trim() || 'Titre du module',
          partOfSpeech: 'expression',
          exampleFrench: `Nous étudions : ${lessonTitle.trim()}.`,
          exampleEnglish: `We are studying: ${lessonSubtitle.trim() || lessonTitle.trim()}.`,
          level: lessonLevel,
          category: lessonTheme.trim() || 'Général'
        }
      ]
    };

    curriculumOverrideService.addCustomLesson(newLesson);
    soundEffects.playCorrect();
    setSuccessMessage(`Leçon "${newLesson.title}" (${lessonLevel}) créée et synchronisée sur le Cloud !`);
    setIsSubmitting(false);

    setTimeout(() => {
      onSuccess?.('lesson', newLesson.id);
      onClose();
    }, 700);
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizPromptFr.trim() || !quizAnswerEn.trim()) return;

    setIsSubmitting(true);
    const optionsArray = quizDistractors
      .split('\n')
      .map(o => o.trim())
      .filter(Boolean);

    const newQuizItem = {
      id: `custom-quiz-${Date.now()}`,
      lessonId: quizLessonId,
      level: quizLevel,
      type: quizType,
      questionFr: quizPromptFr.trim(),
      answerEn: quizAnswerEn.trim(),
      options: optionsArray.length > 0 ? [quizAnswerEn.trim(), ...optionsArray] : undefined,
      frenchTokens: quizType === 'sentence' ? quizPromptFr.trim().split(/\s+/) : undefined,
      explanation: quizExplanation.trim() || undefined,
      createdAt: Date.now()
    };

    curriculumOverrideService.addCustomQuizItem(newQuizItem);
    soundEffects.playCorrect();
    setSuccessMessage(`Exercice (${quizType === 'quiz' ? 'Quiz' : 'Phrase'}) ajouté et synchronisé sur le Cloud !`);
    setIsSubmitting(false);

    setTimeout(() => {
      onSuccess?.('quiz', newQuizItem.id);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40">
                <PlusCircle className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-black text-white">
                Ajouter du Contenu Pédagogique
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                <Cloud className="w-3 h-3" />
                Vercel Cloud Sync Actif
              </span>
              <span className="text-slate-400 hidden sm:inline">• Persiste et se synchronise pour tous les utilisateurs</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-4 pb-2 bg-slate-900/90 border-b border-slate-800 flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap();
              setActiveTab('vocab');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'vocab'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Nouveau Vocabulaire</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap();
              setActiveTab('lesson');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'lesson'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nouvelle Leçon / Module</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap();
              setActiveTab('quiz');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Puzzle className="w-3.5 h-3.5" />
            <span>Phrase & Quiz</span>
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: ADD VOCABULARY */}
          {activeTab === 'vocab' && (
            <form onSubmit={handleCreateVocabulary} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Module de Rattachement</label>
                  <select
                    value={vocabLessonId}
                    onChange={(e) => setVocabLessonId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                    required
                  >
                    {availableLessons.map(l => (
                      <option key={l.id} value={l.id}>
                        [{l.level}] {l.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Niveau CECR</label>
                    <select
                      value={vocabLevel}
                      onChange={(e) => setVocabLevel(e.target.value as CEFRLevel)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="A1">A1 Débutant</option>
                      <option value="A2">A2 Élémentaire</option>
                      <option value="B1">B1 Intermédiaire</option>
                      <option value="B2">B2 Avancé</option>
                      <option value="C1">C1 Maîtrise</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Genre Grammatical</label>
                    <select
                      value={vocabGender}
                      onChange={(e) => setVocabGender(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="none">Aucun / Expression</option>
                      <option value="m">Masculin (m.)</option>
                      <option value="f">Féminin (f.)</option>
                      <option value="pl">Pluriel (pl.)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* French Word + Listen Preview */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Terme / Expression en Français *</span>
                  {vocabFrench.trim() && (
                    <button
                      type="button"
                      onClick={() => handlePreviewAudio(vocabFrench)}
                      className="text-indigo-400 hover:text-indigo-300 text-[11px] font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Écouter la voix native</span>
                    </button>
                  )}
                </label>
                <input
                  type="text"
                  value={vocabFrench}
                  onChange={(e) => setVocabFrench(e.target.value)}
                  placeholder="ex : Le savoir-faire, La gastronomie..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* English Translation & IPA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Traduction en Anglais *</label>
                  <input
                    type="text"
                    value={vocabEnglish}
                    onChange={(e) => setVocabEnglish(e.target.value)}
                    placeholder="ex : The know-how / expertise"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Phonétique IPA (Optionnel)</label>
                  <input
                    type="text"
                    value={vocabIpa}
                    onChange={(e) => setVocabIpa(e.target.value)}
                    placeholder="ex : /lə sa.vwaʁ fɛʁ/"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Example Sentences */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Phrase d'Exemple en Contexte</span>
                </span>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={vocabExampleFr}
                    onChange={(e) => setVocabExampleFr(e.target.value)}
                    placeholder="Phrase en français (ex : C'est un savoir-faire reconnu.)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/70 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={vocabExampleEn}
                    onChange={(e) => setVocabExampleEn(e.target.value)}
                    placeholder="Traduction anglaise (ex : It is a recognized expertise.)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/70 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Pronunciation Tip & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Astuce de Prononciation</label>
                  <input
                    type="text"
                    value={vocabTip}
                    onChange={(e) => setVocabTip(e.target.value)}
                    placeholder="ex : Bien prononcer le r roulé doux"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Catégorie Thématique</label>
                  <input
                    type="text"
                    value={vocabCategory}
                    onChange={(e) => setVocabCategory(e.target.value)}
                    placeholder="ex : Culture, Voyage, Cuisine..."
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
                >
                  <Cloud className="w-4 h-4" />
                  <span>Enregistrer &amp; Synchroniser sur le Cloud</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: ADD FULL LESSON */}
          {activeTab === 'lesson' && (
            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Niveau CECR *</label>
                  <select
                    value={lessonLevel}
                    onChange={(e) => setLessonLevel(e.target.value as CEFRLevel)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="A1">A1 Débutant</option>
                    <option value="A2">A2 Élémentaire</option>
                    <option value="B1">B1 Intermédiaire</option>
                    <option value="B2">B2 Avancé</option>
                    <option value="C1">C1 Maîtrise</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-300">Titre du Module en Français *</label>
                  <input
                    type="text"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="ex : Les Saveurs et la Gastronomie Française"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Sous-titre / Objectif</label>
                  <input
                    type="text"
                    value={lessonSubtitle}
                    onChange={(e) => setLessonSubtitle(e.target.value)}
                    placeholder="ex : Commander au restaurant et comprendre le menu"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Thématique Globale</label>
                  <input
                    type="text"
                    value={lessonTheme}
                    onChange={(e) => setLessonTheme(e.target.value)}
                    placeholder="ex : Gastronomie & Art de Vivre"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Description Complète</label>
                <textarea
                  value={lessonDesc}
                  onChange={(e) => setLessonDesc(e.target.value)}
                  placeholder="Décrivez les compétences acquises dans ce cours..."
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Grammar Spotlight Section */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 text-xs">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Grammaire &amp; Règles Associées</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={grammarRule}
                    onChange={(e) => setGrammarRule(e.target.value)}
                    placeholder="Nom de la règle (ex : L'Article Partitif)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/70 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={grammarExp}
                    onChange={(e) => setGrammarExp(e.target.value)}
                    placeholder="Explication claire de la règle"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/70 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={grammarExFr}
                    onChange={(e) => setGrammarExFr(e.target.value)}
                    placeholder="Exemple français (ex : Je prends du pain.)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/70 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={grammarExEn}
                    onChange={(e) => setGrammarExEn(e.target.value)}
                    placeholder="Exemple anglais (ex : I take some bread.)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/70 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Cultural & Idiom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Point Culturel (Optionnel)</label>
                  <input
                    type="text"
                    value={culturalNote}
                    onChange={(e) => setCulturalNote(e.target.value)}
                    placeholder="ex : L'importance du fromage et du pain à table"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Expression Idiomatique</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={idiomFr}
                      onChange={(e) => setIdiomFr(e.target.value)}
                      placeholder="Idiome (ex : Avoir du pain sur la planche)"
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-[11px] focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      value={idiomEn}
                      onChange={(e) => setIdiomEn(e.target.value)}
                      placeholder="Sens anglais"
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-[11px] focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Dialogue */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-indigo-300 text-xs">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Dialogue Interactif de Mise en Pratique</span>
                </div>
                <input
                  type="text"
                  value={dialogueScenario}
                  onChange={(e) => setDialogueScenario(e.target.value)}
                  placeholder="Scénario (ex : Commander au café)"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700/70 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={dialogueAFr}
                    onChange={(e) => setDialogueAFr(e.target.value)}
                    placeholder="Locuteur A (Français)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/70 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={dialogueAEn}
                    onChange={(e) => setDialogueAEn(e.target.value)}
                    placeholder="Locuteur A (Anglais)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/70 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={dialogueBFr}
                    onChange={(e) => setDialogueBFr(e.target.value)}
                    placeholder="Locuteur B (Français)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/70 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={dialogueBEn}
                    onChange={(e) => setDialogueBEn(e.target.value)}
                    placeholder="Locuteur B (Anglais)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/70 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
                >
                  <Cloud className="w-4 h-4" />
                  <span>Publier la Leçon sur le Cloud</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: ADD QUIZ & SENTENCE ITEM */}
          {activeTab === 'quiz' && (
            <form onSubmit={handleCreateQuiz} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Format d'Exercice</label>
                  <select
                    value={quizType}
                    onChange={(e) => setQuizType(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="quiz">Question Choix Multiple (QCM)</option>
                    <option value="sentence">Constructeur de Phrase (Tokens)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Niveau CECR</label>
                  <select
                    value={quizLevel}
                    onChange={(e) => setQuizLevel(e.target.value as CEFRLevel)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="A1">A1 Débutant</option>
                    <option value="A2">A2 Élémentaire</option>
                    <option value="B1">B1 Intermédiaire</option>
                    <option value="B2">B2 Avancé</option>
                    <option value="C1">C1 Maîtrise</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Module Lié</label>
                  <select
                    value={quizLessonId}
                    onChange={(e) => setQuizLessonId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    {availableLessons.map(l => (
                      <option key={l.id} value={l.id}>
                        [{l.level}] {l.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Phrase ou Question en Français *</span>
                  {quizPromptFr.trim() && (
                    <button
                      type="button"
                      onClick={() => handlePreviewAudio(quizPromptFr)}
                      className="text-indigo-400 hover:text-indigo-300 text-[11px] font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Écouter</span>
                    </button>
                  )}
                </label>
                <input
                  type="text"
                  value={quizPromptFr}
                  onChange={(e) => setQuizPromptFr(e.target.value)}
                  placeholder="ex : Nous allons visiter le musée demain."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Réponse Correcte (Traduction en Anglais) *</label>
                <input
                  type="text"
                  value={quizAnswerEn}
                  onChange={(e) => setQuizAnswerEn(e.target.value)}
                  placeholder="ex : We are going to visit the museum tomorrow."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {quizType === 'quiz' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Options Leurre / Distracteurs (1 par ligne)
                  </label>
                  <textarea
                    value={quizDistractors}
                    onChange={(e) => setQuizDistractors(e.target.value)}
                    placeholder="We visited the museum yesterday.&#10;They will visit the park soon.&#10;I like to visit museums on Sundays."
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Explication / Note Pédagogique</label>
                <input
                  type="text"
                  value={quizExplanation}
                  onChange={(e) => setQuizExplanation(e.target.value)}
                  placeholder="ex : Futur proche avec le verbe aller + infinitif"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
                >
                  <Cloud className="w-4 h-4" />
                  <span>Enregistrer l'Exercice sur le Cloud</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
