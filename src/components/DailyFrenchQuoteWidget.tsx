import React, { useState, useEffect, useMemo } from 'react';
import {
  Quote,
  Sparkles,
  Volume2,
  RefreshCw,
  Edit3,
  PlusCircle,
  BookOpen
} from 'lucide-react';
import {
  curriculumOverrideService,
  type FrenchQuote
} from '../services/curriculumOverrideService';
import { speechService } from '../services/speechService';
import { soundEffects } from '../services/soundEffects';
import type { AuthUser } from '../types/auth';
import { QuoteModal } from './QuoteModal';

interface DailyFrenchQuoteWidgetProps {
  speechRate?: number;
  currentUser?: AuthUser | null;
}

export const DailyFrenchQuoteWidget: React.FC<DailyFrenchQuoteWidgetProps> = ({
  speechRate = 1.0,
  currentUser
}) => {
  const [quotes, setQuotes] = useState<FrenchQuote[]>(() =>
    curriculumOverrideService.getQuotes()
  );

  // Pick initial quote based on day-of-year seed so it feels truly "daily", but cycles with Next button
  const [quoteIndex, setQuoteIndex] = useState<number>(() => {
    const daySeed = Math.floor(Date.now() / 86400000);
    const initialQuotes = curriculumOverrideService.getQuotes();
    return initialQuotes.length > 0 ? daySeed % initialQuotes.length : 0;
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTargetQuote, setModalTargetQuote] = useState<FrenchQuote | null>(null);

  useEffect(() => {
    const unsub = curriculumOverrideService.subscribe(() => {
      setQuotes(curriculumOverrideService.getQuotes());
    });
    return () => unsub();
  }, []);

  const activeQuote = useMemo(() => {
    if (quotes.length === 0) return null;
    return quotes[quoteIndex % quotes.length];
  }, [quotes, quoteIndex]);

  const handlePlayAudio = () => {
    if (!activeQuote) return;
    soundEffects.playTap();
    setIsPlayingAudio(true);
    speechService.speak(activeQuote.french, {
      rate: speechRate,
      onEnd: () => setIsPlayingAudio(false)
    });
  };

  const handleNextQuote = () => {
    soundEffects.playTap();
    setQuoteIndex((prev) => (prev + 1) % (quotes.length || 1));
  };

  const handleOpenEdit = () => {
    if (!activeQuote) return;
    soundEffects.playTap();
    setModalTargetQuote(activeQuote);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    soundEffects.playTap();
    setModalTargetQuote(null);
    setIsModalOpen(true);
  };

  if (!activeQuote) return null;

  return (
    <>
      <div className="rounded-3xl bg-slate-900 border border-slate-700/80 p-4 sm:p-6 shadow-xl transition-all relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5 relative z-10">
          {/* Left Column: Header Tags, French Quote, English Meaning & Author */}
          <div className="space-y-2.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Citation du Jour • Daily French Quote</span>
              </span>

              {activeQuote.category && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80">
                  {activeQuote.category}
                </span>
              )}

              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-950 text-indigo-300 border border-indigo-500/30">
                {quoteIndex + 1} / {quotes.length}
              </span>
            </div>

            {/* Quote and Translation */}
            <div className="pt-0.5 space-y-1">
              <div className="flex items-start gap-2">
                <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-1 opacity-80 rotate-180" />
                <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-snug">
                  {activeQuote.french}
                </h2>
              </div>

              <div className="pl-6 sm:pl-7">
                <p className="text-sm sm:text-base font-semibold text-emerald-300">
                  — {activeQuote.english}
                </p>
                {activeQuote.author && (
                  <p className="text-xs text-slate-400 italic mt-0.5 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-slate-500" />
                    <span>{activeQuote.author}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Audio & Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0 pl-0 sm:pl-7 lg:pl-0">
            {/* Audio Pronunciation Button */}
            <button
              type="button"
              onClick={handlePlayAudio}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 border ${
                isPlayingAudio
                  ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-lg shadow-amber-400/30 scale-105 animate-pulse font-black'
                  : 'bg-slate-950 hover:bg-slate-800 text-amber-300 border-slate-700/80 hover:border-amber-400/50 shadow-md'
              }`}
              title="Écouter la prononciation française"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
              <span>{isPlayingAudio ? 'Lecture audio...' : 'Écouter'}</span>
            </button>

            {/* Next Quote Button */}
            <button
              type="button"
              onClick={handleNextQuote}
              className="px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md"
              title="Afficher une autre citation française"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Suivante</span>
            </button>

            {/* Universal Add & Edit Controls for Authorized Users (admin, Johnny hotbody (nick), gayathri) */}
            {currentUser && (
              <>
                <button
                  type="button"
                  onClick={handleOpenEdit}
                  className="px-3 py-2 sm:py-2.5 rounded-2xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-amber-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md"
                  title="Modifier cette citation"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Éditer</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="px-3 py-2.5 rounded-2xl bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/50 text-xs font-bold flex items-center gap-1.5 transition-all duration-200 shadow-md"
                  title="Ajouter une nouvelle citation"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Citation</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quote Creation / Editing Modal */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetQuote={modalTargetQuote}
        currentUser={currentUser}
        speechRate={speechRate}
        onSaved={() => {
          setQuotes(curriculumOverrideService.getQuotes());
        }}
      />
    </>
  );
};
