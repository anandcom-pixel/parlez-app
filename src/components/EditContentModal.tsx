import React, { useState } from 'react';
import { X, Save, Edit3, CheckCircle2 } from 'lucide-react';
import type { Lesson, VocabularyItem } from '../types';
import { curriculumOverrideService } from '../services/curriculumOverrideService';
import { soundEffects } from '../services/soundEffects';

interface EditContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetLesson?: Lesson;
  targetVocab?: VocabularyItem;
  onSaved?: () => void;
}

export const EditContentModal: React.FC<EditContentModalProps> = ({
  isOpen,
  onClose,
  targetLesson,
  targetVocab,
  onSaved
}) => {
  // Vocabulary state
  const [french, setFrench] = useState<string>(targetVocab?.french || '');
  const [english, setEnglish] = useState<string>(targetVocab?.english || '');
  const [ipa, setIpa] = useState<string>(targetVocab?.ipa || '');
  const [gender, setGender] = useState<'m' | 'f' | 'pl' | 'none'>(targetVocab?.gender || 'none');
  const [exampleFrench, setExampleFrench] = useState<string>(targetVocab?.exampleFrench || '');
  const [exampleEnglish, setExampleEnglish] = useState<string>(targetVocab?.exampleEnglish || '');
  const [pronunciationTip, setPronunciationTip] = useState<string>(targetVocab?.pronunciationTip || '');

  // Lesson state
  const [lessonTitle, setLessonTitle] = useState<string>(targetLesson?.title || '');
  const [lessonSubtitle, setLessonSubtitle] = useState<string>(targetLesson?.subtitle || '');
  const [lessonDescription, setLessonDescription] = useState<string>(targetLesson?.description || '');
  const [ruleName, setRuleName] = useState<string>(targetLesson?.grammarFocus.ruleName || '');
  const [ruleExplanation, setRuleExplanation] = useState<string>(targetLesson?.grammarFocus.explanation || '');

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (targetVocab) {
      curriculumOverrideService.saveVocabOverride(targetVocab.id, {
        french: french.trim(),
        english: english.trim(),
        ipa: ipa.trim(),
        gender,
        exampleFrench: exampleFrench.trim(),
        exampleEnglish: exampleEnglish.trim(),
        pronunciationTip: pronunciationTip.trim()
      });
    } else if (targetLesson) {
      curriculumOverrideService.saveLessonOverride(targetLesson.id, {
        title: lessonTitle.trim(),
        subtitle: lessonSubtitle.trim(),
        description: lessonDescription.trim(),
        grammarFocus: {
          ...targetLesson.grammarFocus,
          ruleName: ruleName.trim(),
          explanation: ruleExplanation.trim()
        }
      });
    }

    soundEffects.playCorrect();
    setSavedSuccess(true);
    setTimeout(() => {
      onSaved?.();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            soundEffects.playTap();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5" />
              Édition Administrateur
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {targetVocab ? `Modifier l'expression : ${targetVocab.french}` : `Modifier la Lektion : ${targetLesson?.title}`}
          </h2>
          <p className="text-xs text-slate-300">
            Les modifications sont immédiatement sauvegardées et appliquées à travers l'application.
          </p>
        </div>

        {savedSuccess ? (
          <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/50 text-center space-y-2 animate-in zoom-in-95">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Contenu Mis à Jour avec Succès !</h3>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            {targetVocab ? (
              /* Vocabulary Item Edit Fields */
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Expression en Français</label>
                    <input
                      type="text"
                      value={french}
                      onChange={(e) => setFrench(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-sm focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Traduction Anglaise</label>
                    <input
                      type="text"
                      value={english}
                      onChange={(e) => setEnglish(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-sm focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Transcription Phonétique (API / IPA)</label>
                    <input
                      type="text"
                      value={ipa}
                      onChange={(e) => setIpa(e.target.value)}
                      placeholder="/.../"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Genre Grammatical</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as 'm' | 'f' | 'pl' | 'none')}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="none">Aucun (expression / verbe)</option>
                      <option value="m">Masculin (m)</option>
                      <option value="f">Féminin (f)</option>
                      <option value="pl">Pluriel (pl)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Exemple en Français</label>
                  <input
                    type="text"
                    value={exampleFrench}
                    onChange={(e) => setExampleFrench(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Traduction de l'Exemple</label>
                  <input
                    type="text"
                    value={exampleEnglish}
                    onChange={(e) => setExampleEnglish(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Astuce de Prononciation</label>
                  <input
                    type="text"
                    value={pronunciationTip}
                    onChange={(e) => setPronunciationTip(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </>
            ) : (
              /* Lesson Edit Fields */
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Titre de la Lektion</label>
                  <input
                    type="text"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-sm focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Sous-titre Thématique</label>
                  <input
                    type="text"
                    value={lessonSubtitle}
                    onChange={(e) => setLessonSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Description Globale</label>
                  <textarea
                    value={lessonDescription}
                    onChange={(e) => setLessonDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Règle de Grammaire Focus</label>
                  <input
                    type="text"
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Explication Grammaticale</label>
                  <textarea
                    value={ruleExplanation}
                    onChange={(e) => setRuleExplanation(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </>
            )}

            {/* Actions */}
            <div className="pt-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer les Modifications</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
