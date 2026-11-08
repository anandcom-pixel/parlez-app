import React, { useState } from 'react';
import {
  X,
  Mail,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Bug,
  Send
} from 'lucide-react';
import type { AuthUser, EvaluationCategory, EvaluationSeverity } from '../types/auth';
import { evaluationReportService, ROUTE_DESTINATION_EMAIL } from '../services/evaluationReportService';
import { soundEffects } from '../services/soundEffects';

interface EvaluationReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser;
  activeModuleTitle?: string;
}

export const EvaluationReportModal: React.FC<EvaluationReportModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  activeModuleTitle = 'Curriculum & Lessons'
}) => {
  const [category, setCategory] = useState<EvaluationCategory>('bug');
  const [severity, setSeverity] = useState<EvaluationSeverity>('medium');
  const [activeModule, setActiveModule] = useState<string>(activeModuleTitle);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [stepsToReproduce, setStepsToReproduce] = useState<string>('');
  const [expectedBehavior, setExpectedBehavior] = useState<string>('');
  const [actualBehavior, setActualBehavior] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [submittedReport, setSubmittedReport] = useState<{
    mailtoUrl: string;
    formattedText: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    soundEffects.playCorrect();

    const result = evaluationReportService.createReport({
      testerUsername: currentUser.username,
      testerDisplayName: currentUser.displayName,
      category,
      activeModule,
      severity,
      title,
      description,
      stepsToReproduce,
      expectedBehavior,
      actualBehavior
    });

    setSubmittedReport({
      mailtoUrl: result.mailtoUrl,
      formattedText: result.formattedText
    });

    // Automatically trigger mailto link to route directly to anand.com@gmail.com
    window.location.href = result.mailtoUrl;
  };

  const handleCopyClipboard = async () => {
    if (!submittedReport) return;
    const ok = await evaluationReportService.copyToClipboard(submittedReport.formattedText);
    if (ok) {
      soundEffects.playTap();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleResetForm = () => {
    setSubmittedReport(null);
    setTitle('');
    setDescription('');
    setStepsToReproduce('');
    setExpectedBehavior('');
    setActualBehavior('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100">
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
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5">
              <Bug className="w-3.5 h-3.5" />
              Rapport d’Évaluation &amp; Signalement de Bug
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              Route Directe : <strong>{ROUTE_DESTINATION_EMAIL}</strong>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Formulaire d'Évaluation Testeur
          </h2>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>Testeur identifié :</span>
            <span className="font-semibold text-emerald-300 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30">
              {currentUser.avatar} {currentUser.displayName}
            </span>
          </div>
        </div>

        {submittedReport ? (
          /* Submission Confirmation View */
          <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/50 space-y-5 animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Rapport Transmis avec Succès !</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Votre client de messagerie a été ouvert avec un brouillon pré-formaté adressé directement à{' '}
                <strong className="text-amber-300 underline">{ROUTE_DESTINATION_EMAIL}</strong>.
              </p>
            </div>

            {/* Formatted Report Preview */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Contenu du rapport transmis :</span>
                <button
                  type="button"
                  onClick={handleCopyClipboard}
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-bold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copié !' : 'Copier dans le presse-papier'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                {submittedReport.formattedText}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <a
                href={submittedReport.mailtoUrl}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 transition-all shadow-md shadow-amber-500/30"
              >
                <Send className="w-4 h-4" />
                <span>Rouvri l’Email vers anand.com@gmail.com</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  Nouveau Rapport
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Terminer
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Main Evaluation Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category and Severity Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Catégorie du Signalement</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EvaluationCategory)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="bug">🐛 Bug Technique / Erreur Script</option>
                  <option value="audio">🗣️ Audio &amp; Synthèse Vocale (TTS)</option>
                  <option value="translation">📖 Traduction / Vocabulaire Incorrect</option>
                  <option value="grammar">💡 Règle de Grammaire &amp; Syntaxe</option>
                  <option value="ui">🎨 Interface &amp; Affichage Graphique</option>
                  <option value="suggestion">✨ Suggestion d'Amélioration</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Niveau de Sévérité</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as EvaluationSeverity)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="low">🟢 Faible (Cosmétique / Mineur)</option>
                  <option value="medium">🟡 Moyenne (Gênant mais contournable)</option>
                  <option value="high">🟠 Élevée (Fonctionnalité dégradée)</option>
                  <option value="critical">🔴 Critique (Blocage complet)</option>
                </select>
              </div>
            </div>

            {/* Module Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Module ou Écran Concerné</span>
                <span className="text-[10px] text-slate-400">Ex: Curriculum, Test Lab, Voice Studio</span>
              </label>
              <input
                type="text"
                value={activeModule}
                onChange={(e) => setActiveModule(e.target.value)}
                placeholder="Ex: Lektion A1-1, Test QCM, Voice Studio..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            {/* Title / Summary */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Titre Synthétique du Problème</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Le bouton écoute ne prononce pas la phrase sur Safari mobile..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-sm focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Description Détaillée &amp; Constatations</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Expliquez en détail ce que vous avez observé durant le test..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500 placeholder:text-slate-500 leading-relaxed"
                required
              />
            </div>

            {/* Steps to Reproduce */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Étapes pour Reproduire (Facultatif)</label>
              <textarea
                value={stepsToReproduce}
                onChange={(e) => setStepsToReproduce(e.target.value)}
                rows={2}
                placeholder="1. Aller sur A1 Débutant&#10;2. Cliquer sur le Test de vocabulaire&#10;3. ..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500 placeholder:text-slate-500 leading-relaxed font-mono"
              />
            </div>

            {/* Expected vs Actual */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Résultat Attendu</label>
                <input
                  type="text"
                  value={expectedBehavior}
                  onChange={(e) => setExpectedBehavior(e.target.value)}
                  placeholder="Ex: La voix devrait prononcer avec un accent standard..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Résultat Observé</label>
                <input
                  type="text"
                  value={actualBehavior}
                  onChange={(e) => setActualBehavior(e.target.value)}
                  placeholder="Ex: Aucun son n'est émis ou coupure au milieu..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Routing Assurance Notice */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 text-xs flex items-start gap-2.5 text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                Ce rapport sera instantanément dirigé vers{' '}
                <strong className="text-white underline">{ROUTE_DESTINATION_EMAIL}</strong> avec toutes les métadonnées
                système nécessaires à sa résolution rapide.
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-xl shadow-red-600/25 flex items-center gap-2 transform active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Transmettre à anand.com@gmail.com</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
