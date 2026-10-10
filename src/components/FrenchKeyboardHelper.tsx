import React from 'react';

interface FrenchKeyboardHelperProps {
  onInsertChar: (char: string) => void;
  className?: string;
}

const ACCENT_CHARS = [
  'é', 'è', 'ê', 'ë',
  'à', 'â', 'ù', 'û',
  'ô', 'î', 'ï', 'ç',
  'œ', 'æ'
];

export const FrenchKeyboardHelper: React.FC<FrenchKeyboardHelperProps> = ({ onInsertChar, className = '' }) => {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 p-2 bg-slate-900/80 rounded-xl border border-slate-800 backdrop-blur-sm ${className}`}>
      <span className="text-xs font-medium text-slate-400 px-1 select-none flex items-center gap-1">
        <span>🇫🇷</span> Accents:
      </span>
      <div className="flex flex-wrap gap-1">
        {ACCENT_CHARS.map(char => (
          <button
            key={char}
            type="button"
            onClick={() => onInsertChar(char)}
            className="w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-lg bg-slate-800 text-indigo-200 hover:bg-indigo-600 hover:text-white active:scale-95 transition-all border border-slate-700/60 shadow-sm"
            title={`Insert ${char}`}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};
