// app/LanguageToggle.tsx
// Bandierina per cambiare lingua. Mostra la lingua in cui si passa cliccando
// (in italiano mostra 🇬🇧 EN, in inglese mostra 🇮🇹 IT).
// Le bandiere sono in SVG perché su Windows le emoji bandiera non vengono disegnate.

import type { Lang } from './i18n';
import { STRINGS } from './i18n';

function FlagIT() {
  return (
    <svg viewBox="0 0 3 2" className="w-6 h-4 rounded-[3px] shadow-sm" aria-hidden="true">
      <rect width="1" height="2" x="0" fill="#009246" />
      <rect width="1" height="2" x="1" fill="#ffffff" />
      <rect width="1" height="2" x="2" fill="#ce2b37" />
    </svg>
  );
}

function FlagGB() {
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className="w-6 h-4 rounded-[3px] shadow-sm" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30,0 V30 M0,15 H60" stroke="#ffffff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

type Props = {
  lang: Lang;
  onToggle: () => void;
  className?: string;
};

export default function LanguageToggle({ lang, onToggle, className = '' }: Props) {
  const { label, title } = STRINGS[lang].toggle;
  return (
    <button
      type="button"
      onClick={onToggle}
      title={title}
      aria-label={title}
      className={`bg-stone-900/80 backdrop-blur-md border border-stone-600 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-white hover:scale-105 hover:border-stone-400 transition-all ${className}`}
    >
      {lang === 'it' ? <FlagGB /> : <FlagIT />}
      <span className="font-bold text-sm">{label}</span>
    </button>
  );
}
