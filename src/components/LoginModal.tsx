import React, { useState } from 'react';
import { Lock, UserCheck, ShieldCheck, X, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { authService, SHARED_PASSWORD, VALID_USERS } from '../services/authService';
import { soundEffects } from '../services/soundEffects';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const result = authService.login(username, password);
    if (!result.success) {
      soundEffects.playIncorrect();
      setError(result.error || 'Erreur d’authentification');
    } else {
      soundEffects.playCorrect();
      setSuccessMessage(`Bienvenue, ${result.user?.displayName} !`);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 700);
    }
  };

  const handleSelectQuickUser = (userKey: string) => {
    soundEffects.playTap();
    setUsername(userKey);
    setPassword(SHARED_PASSWORD); // Pre-fill with the shared password for convenience
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100">
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

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-600 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Lock className="w-6 h-6 text-amber-300" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Espace d'Accès ParlezApp
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Connectez-vous pour débloquer l’édition de contenu (Admin) ou les rapports d’évaluation (Testeurs).
          </p>
        </div>

        {/* Quick User Selector */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Comptes Autorisés (1-Clic)</span>
            <span className="text-amber-300 lowercase font-mono font-normal">mdp: {SHARED_PASSWORD}</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(VALID_USERS).map(([key, u]) => {
              const isSelected = username.toLowerCase() === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectQuickUser(key)}
                  className={`p-2.5 rounded-2xl border text-center transition-all duration-150 flex flex-col items-center gap-1 ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                      : 'bg-slate-950 border-slate-700/70 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-base">{u.avatar}</span>
                  <span className="text-xs font-bold capitalize">{key}</span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-tight">
                    {u.role === 'admin' ? 'Admin' : 'Testeur'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Nom d’utilisateur (Username)</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin, sreegovind ou gayathri"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mot de passe partagé</span>
              </span>
              <span className="text-[11px] text-amber-300 font-mono">parlez123</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez parlez123..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-2xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500 pr-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Account Privileges Info Box */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Privilèges du rôle sélectionné :</span>
            </div>
            <p className="text-[11px] text-slate-300">
              {username.toLowerCase() === 'admin'
                ? '⚡ Administrateur : Débloque l’édition intégrale des cours, vocabulaire, règles de grammaire et exemples.'
                : '🧪 Testeur : Accès au formulaire d’évaluation et signalement direct de bugs vers anand.com@gmail.com.'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/60 text-rose-200 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Valider la Connexion</span>
          </button>
        </form>
      </div>
    </div>
  );
};
