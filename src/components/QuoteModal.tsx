import React, { useState, useEffect } from 'react';
import { X, Save, Volume2, CheckCircle2, Quote } from 'lucide-react';
import { curriculumOverrideService, type FrenchQuote } from '../services/curriculumOverrideService';
import { speechService } from '../services/speechService';
import { soundEffects } from '../services/soundEffects';
import type { AuthUser } from '../types/auth';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetQuote?: FrenchQuote | null;
  currentUser?: AuthUser | null;
  onSaved?: (quote: FrenchQuote) => void;
  speechRate?: number;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  targetQuote,
  currentUser,
  onSaved,
  speechRate = 1.0
}) => {
  const isEditing = !!targetQuote;

  const [french, setFrench] = useState<string>('');
  const [english, setEnglish] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [category, setCategory] = useState<string>('Proverbe & Sagesse');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (targetQuote) {
      setFrench(targetQuote.french);
      setEnglish(targetQuote.english);
      setAuthor(targetQuote.author);
      setCategory(targetQuote.category || 'Proverbe & Sagesse');
    } else {
      setFrench('');
      setEnglish('');
      setAuthor('Proverbe Français');
      setCategory('Proverbe & Sagesse');
    }
    setSavedSuccess(false);
  }, [targetQuote, isOpen]);

  if (!isOpen) return null;

  const handlePlayPreview = () => {
    if (!french.trim()) return;
    soundEffects.playTap();
    setIsPlayingAudio(true);
    speechService.speak(french.trim(), {
      rate: speechRate,
      onEnd: () => setIsPlayingAudio(false)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!french.trim() || !english.trim()) return;

    setIsSubmitting(true);
    let saved: FrenchQuote;

    if (isEditing && targetQuote) {
      saved = {
        ...targetQuote,
        french: french.trim(),
        english: english.trim(),
        author: author.trim() || 'Proverbe Français',
        category: category.trim() || 'Inspiration',
        updatedAt: Date.now()
      };
      curriculumOverrideService.saveQuote(saved);
    } else {
      saved = curriculumOverrideService.addQuote(
        french.trim(),
        english.trim(),
        author.trim() || 'Proverbe Français',
        category.trim() || 'Inspiration',
        currentUser?.username || 'utilisateur'
      );
    }

    soundEffects.playCorrect();
    setSavedSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      onSaved?.(saved);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-100 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5 text-amber-400" />
              {isEditing ? 'Modifier la Citation' : 'Nouvelle Citation Française'}
            </span>
            {currentUser && (
              <span className="text-[11px] text-slate-400 font-medium">
                Par {currentUser.displayName}
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isEditing ? 'Éditer la citation du jour' : 'Ajouter une citation inspirante'}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Les citations sont enregistrées localement et synchronisées en temps réel via la base de données cloud Vercel pour tous les utilisateurs.
          </p>
        </div>

        {savedSuccess ? (
          <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/50 text-center space-y-2 animate-in zoom-in-95">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Citation Enregistrée &amp; Synchronisée !</h3>
            <p className="text-xs text-slate-400">Mise à jour globale effectuée avec succès.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* French Quote Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">
                  Citation en Français *
                </label>
                {french.trim() && (
                  <button
                    type="button"
                    onClick={handlePlayPreview}
                    className={`text-[11px] font-semibold flex items-center gap-1 px-2 py-0.5 rounded-lg border transition-all ${
                      isPlayingAudio
                        ? 'bg-amber-400 text-slate-950 border-amber-500 font-bold'
                        : 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                    }`}
                    title="Écouter la prononciation"
                  >
                    <Volume2 className={`w-3 h-3 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                    <span>{isPlayingAudio ? 'Lecture...' : 'Écouter'}</span>
                  </button>
                )}
              </div>
              <textarea
                value={french}
                onChange={(e) => setFrench(e.target.value)}
                placeholder="ex. Petit à petit, l'oiseau fait son nid."
                rows={2}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 placeholder:text-slate-500 resize-none font-medium"
                required
              />
            </div>

            {/* English Meaning Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Signification en Anglais (English Meaning) *
              </label>
              <textarea
                value={english}
                onChange={(e) => setEnglish(e.target.value)}
                placeholder="ex. Little by little, the bird builds its nest."
                rows={2}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 placeholder:text-slate-500 resize-none font-medium"
                required
              />
            </div>

            {/* Author & Category Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Auteur ou Origine
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="ex. Proverbe Français, Victor Hugo..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Thème / Catégorie
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="Proverbe & Sagesse">Proverbe &amp; Sagesse</option>
                  <option value="Motivation">Motivation &amp; Persévérance</option>
                  <option value="Littérature">Littérature Française</option>
                  <option value="Philosophie">Philosophie</option>
                  <option value="Poésie">Poésie &amp; Amour</option>
                  <option value="Vie Quotidienne">Vie Quotidienne</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !french.trim() || !english.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg shadow-amber-400/20 disabled:opacity-50 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Sauvegarder les Modifications' : 'Ajouter la Citation'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
