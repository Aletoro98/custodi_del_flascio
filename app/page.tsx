'use client';

import { useState, useEffect } from 'react'; // Una sola riga per tutto quello che serve da React
import { Coins, Heart, Calendar, X, AlertTriangle, Info } from 'lucide-react'; // Icone
import { STRINGS, LANG_STORAGE_KEY, type Lang, type ImpactTone, type ReportKey, type SpeciesKey } from './i18n'; // Testi IT/EN
import LanguageToggle from './LanguageToggle'; // Bandierina per cambiare lingua
//import posthog from 'posthog-js'; // L'import di PostHog

// Colore di ogni riga "Impatti" nel Report Giornaliero
const IMPACT_COLORS: Record<ImpactTone, string> = {
  positive: 'text-emerald-400',
  negative: 'text-red-400',
  critical: 'text-red-500 font-bold',
  neutral: 'text-slate-300',
};

// Trasforma *nome scientifico* e **parola chiave** nei relativi <span> colorati
function rich(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <span key={i} className="text-stone-300 font-medium">{part.slice(2, -2)}</span>;
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      return <span key={i} className="text-emerald-400 font-semibold italic">{part.slice(1, -1)}</span>;
    }
    return part;
  });
}

export default function Game() {
  const [giornoCorrente, setGiornoCorrente] = useState(1);
  const [budget, setBudget] = useState(35000);
  const [ecosistemaSalute, setEcosistemaSalute] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showDebriefing, setShowDebriefing] = useState(false);
  const [activeBioSheet, setActiveBioSheet] = useState<string | null>(null);
  // Gestione del Tutorial
  const [tutorialStep, setTutorialStep] = useState(1); // 1, 2, 3 sono i passaggi. 0 significa tutorial chiuso.

  // Lingua (it/en): all'avvio usa quella scelta l'ultima volta, altrimenti quella del browser
  const [lang, setLang] = useState<Lang>('it');
  const t = STRINGS[lang];

  useEffect(() => {
    let initial: Lang | null = null;
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'it' || saved === 'en') initial = saved;
    } catch {
      // localStorage non disponibile (es. navigazione privata): si usa la lingua del browser
    }
    if (!initial) {
      const browserLang = (navigator.languages?.[0] || navigator.language || 'it').toLowerCase();
      initial = browserLang.startsWith('it') ? 'it' : 'en';
    }
    setLang(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    const next: Lang = lang === 'it' ? 'en' : 'it';
    setLang(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // se non si puo' salvare, la lingua vale solo per questa visita
    }
  };

  // Biodiversity State
  const [petagnaeaViva, setPetagnaeaViva] = useState(true);
  const [emysViva, setEmysViva] = useState(true);
  const [euplagiaViva, setEuplagiaViva] = useState(true);
  const [rhinolophusVivo, setRhinolophusVivo] = useState(true);
  const [activeBioInfo, setActiveBioInfo] = useState<SpeciesKey | null>(null);
  // 1. Traccia l'accesso alla pagina (Landing)
//useEffect(() => {
  //posthog.capture('pagina_caricata', { gioco: 'Custodi del Flascio' });
//}, []);

// 2. Traccia quando l'utente preme effettivamente "Inizia Gioco"
//useEffect(() => {
  //if (gameStarted) {
    //posthog.capture('partita_iniziata');
  //}
//}, [gameStarted]);

// 3. Traccia il Game Over e i risultati finali
//useEffect(() => {
  //if (isGameOver) {
    //posthog.capture('partita_conclusa', {
      //giorno_finale: giornoCorrente,
      //budget_rimanente: budget,
      //salute_ecosistema: ecosistemaSalute,
      //petagnaea_sopravvissuta: petagnaeaViva
    //});
  //}
//}, [isGameOver]);

// 4. Traccia l'estinzione della Petagnaea (Il tuo obiettivo di ricerca!)
//useEffect(() => {
  //if (!petagnaeaViva) {
    //posthog.capture('estinzione_specie', { specie: 'Petagnaea gussonei' });
  //}
//}, [petagnaeaViva]);

  // Il report salva solo giorno e scelta: il testo viene letto da i18n.ts nella lingua attuale
  type DailyReportData = { day: number; choice: number };
  const [dailyReport, setDailyReport] = useState<DailyReportData | null>(null);

  const handleChoiceDay1 = (choiceId: number) => {
    setIsModalOpen(false);
    setDailyReport({ day: 1, choice: choiceId });
    if (choiceId === 1) {
      setBudget(prev => prev - 0);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 5)));
      setPetagnaeaViva(false);
    } else if (choiceId === 2) {
      setBudget(prev => prev - 12000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 12)));
      setPetagnaeaViva(true);
    }
  };

  const handleChoiceDay2 = (choiceId: number) => {
    setIsModalOpen(false);
    setDailyReport({ day: 2, choice: choiceId });
    if (choiceId === 1) {
      setBudget(prev => prev - 0);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 5)));
      setEmysViva(false);
    } else if (choiceId === 2) {
      setBudget(prev => prev - 2000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 10)));
      setEmysViva(true);
    }
  };

  const handleChoiceDay3 = (choiceId: number) => {
    setIsModalOpen(false);
    setDailyReport({ day: 3, choice: choiceId });
    if (choiceId === 1) {
      setBudget(prev => prev - 0);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 10)));
      setEuplagiaViva(false);
    } else if (choiceId === 2) {
      setBudget(prev => prev - 4000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 10)));
      setEuplagiaViva(true);
    }
  };

  const handleChoiceDay4 = (choiceId: number) => {
    setIsModalOpen(false);
    setDailyReport({ day: 4, choice: choiceId });
    if (choiceId === 1) {
      setBudget(prev => prev + 14500);
    } else if (choiceId === 2) {
    }
  };

  const handleChoiceDay5 = (choiceId: number) => {
    setIsModalOpen(false);
    setDailyReport({ day: 5, choice: choiceId });
    if (choiceId === 1) {
      setBudget(prev => prev + 3000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 5)));
    } else if (choiceId === 2) {
      setBudget(prev => prev - 1000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 10)));
    }
  };

  const handleChoiceDay6 = (choiceId: number) => {
    setIsModalOpen(false);
    setDailyReport({ day: 6, choice: choiceId });
    if (choiceId === 1) {
      setBudget(prev => prev + 2000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 15)));
      setRhinolophusVivo(false);
    } else if (choiceId === 2) {
      setBudget(prev => prev - 3000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 10)));
    }
  };

  const handleChoiceDay7 = (choiceId: number) => {
    setIsModalOpen(false);
    setDailyReport({ day: 7, choice: choiceId });
    if (choiceId === 1) {
      setBudget(prev => prev - 20000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 2)));
    } else if (choiceId === 2) {
      setBudget(prev => prev - 5000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 15)));
    } else if (choiceId === 3) {
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 50)));
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(t.locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  };

  const getGameOverResult = () => {
    const g = t.gameOver;
    if (budget < 0) {
      return { ...g.bankrupt, color: "text-red-500" };
    } else if (ecosistemaSalute < 50) {
      return {
        title: g.ecoDisaster.title,
        text: `${g.ecoDisaster.text}${!petagnaeaViva ? g.ecoDisaster.petagnaeaSuffix : ""}`,
        color: "text-red-500"
      };
    } else if (!petagnaeaViva) {
      return { ...g.biodiversityLoss, color: "text-red-500" };
    } else if (ecosistemaSalute >= 90 && emysViva && euplagiaViva && rhinolophusVivo) {
      return { ...g.victory, color: "text-emerald-400" };
    } else if (ecosistemaSalute >= 50 && (!emysViva || !euplagiaViva || !rhinolophusVivo)) {
      return { ...g.bitterVictory, color: "text-yellow-400" };
    } else {
      return { ...g.operationalVictory, color: "text-blue-400" };
    }
  };

  const resetGame = () => {
    setGiornoCorrente(1);
    setBudget(35000);
    setEcosistemaSalute(50);
    setPetagnaeaViva(true);
    setEmysViva(true);
    setEuplagiaViva(true);
    setRhinolophusVivo(true);
    setIsGameOver(false);
    setShowDebriefing(false);
    setGameStarted(false);
    setDailyReport(null);
    setIsModalOpen(false);
  };

  // Specie vive/estinte (per il messaggio a comparsa nell'HUD)
  const speciesAlive: Record<SpeciesKey, boolean> = {
    petagnaea: petagnaeaViva,
    emys: emysViva,
    euplagia: euplagiaViva,
    rhinolophus: rhinolophusVivo,
  };

  // Report del giorno nella lingua attuale
  const currentReport = dailyReport ? t.reports[`${dailyReport.day}-${dailyReport.choice}` as ReportKey] : null;
  const currentReportText = !currentReport ? '' : typeof currentReport.text === 'function' ? currentReport.text({ petagnaeaViva }) : currentReport.text;

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans flex flex-col overflow-x-hidden">
      {/* OVERLAY OBBLIGO ROTAZIONE (Solo su mobile in verticale) */}
      <div className="fixed inset-0 z-[999] bg-stone-950 flex flex-col items-center justify-center p-6 text-center portrait:flex landscape:hidden md:!hidden">
        <div className="text-7xl mb-6 animate-bounce">📱</div>
        <h2 className="text-3xl font-black text-emerald-400 mb-4 tracking-tight">{t.rotate.title}</h2>
        <p className="text-stone-300 text-lg">{t.rotate.text}</p>
      </div>

{/* HUD Fluttuante - Parametri Vitali e Biodiversità IN UN'UNICA RIGA */}
      <div className="fixed top-2 left-0 right-0 z-[40] flex flex-col items-center px-2 pointer-events-none">
        
        {/* RIGA UNICA: Tutto insieme */}
        <div className="flex flex-wrap justify-center items-center gap-2 pointer-events-auto">
          
          {/* Pillola Giorno */}
          <div className="bg-stone-900/80 backdrop-blur-md border border-stone-600 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-white">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-sm">{giornoCorrente}/7</span>
          </div>

          {/* Pillola Budget */}
          <div className={`backdrop-blur-md border px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transition-colors ${budget < 21000 ? 'bg-red-900/90 border-red-500 text-red-100' : 'bg-stone-900/80 border-stone-600 text-white'}`}>
            <Coins className={`w-4 h-4 ${budget < 21000 ? 'text-red-300' : 'text-yellow-400'}`} />
            <span className="font-bold text-sm">{formatCurrency(budget)}</span>
          </div>

          {/* Pillola Salute Ecosistema */}
          <div className={`backdrop-blur-md border px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transition-colors ${ecosistemaSalute < 40 ? 'bg-red-900/90 border-red-500 text-red-100' : 'bg-stone-900/80 border-stone-600 text-white'}`}>
            <Heart className={`w-4 h-4 ${ecosistemaSalute < 40 ? 'text-red-300' : 'text-emerald-400'}`} />
            <span className="font-bold text-sm">{ecosistemaSalute}%</span>
          </div>

          {/* Pillola Biodiversità (le faccine) */}
          <div className="bg-stone-900/80 backdrop-blur-md border border-stone-600 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-white pointer-events-auto">
            <button 
              onClick={() => {
                setActiveBioInfo(activeBioInfo === 'petagnaea' ? null : 'petagnaea');
              }} 
              className="text-lg hover:scale-110 transition-transform"
            >
              {petagnaeaViva ? '🌸' : '🥀'}
            </button>

            <button 
              onClick={() => {
                setActiveBioInfo(activeBioInfo === 'emys' ? null : 'emys');
              }} 
              className="text-lg hover:scale-110 transition-transform"
            >
              {emysViva ? '🐢' : '🦴'}
            </button>

            <button 
              onClick={() => {
                setActiveBioInfo(activeBioInfo === 'euplagia' ? null : 'euplagia');
              }} 
              className="text-lg hover:scale-110 transition-transform"
            >
              {euplagiaViva ? '🦋' : '🌪️'}
            </button>

            <button 
              onClick={() => {
                setActiveBioInfo(activeBioInfo === 'rhinolophus' ? null : 'rhinolophus');
              }} 
              className="text-lg hover:scale-110 transition-transform"
            >
              {rhinolophusVivo ? '🦇' : '🚫'}
            </button>
          </div>

          {/* Pillola Lingua (bandierina IT/EN) */}
          <LanguageToggle lang={lang} onToggle={toggleLang} />

        </div> {/* Fine della RIGA UNICA */}

        {/* Messaggio a comparsa per le info sulla biodiversità */}
        {activeBioInfo && (
          <div className="bg-stone-800/90 backdrop-blur-sm border border-stone-600 px-3 py-1 mt-2 rounded-full text-xs text-stone-200 animate-in fade-in slide-in-from-top-2 pointer-events-auto shadow-lg">
            {t.hudBio[activeBioInfo][speciesAlive[activeBioInfo] ? 'alive' : 'dead']}
          </div>
        )}

        {/* OVERLAY TUTORIAL (Visibile solo se tutorialStep è maggiore di 0) */}
      {tutorialStep > 0 && (
        <div className="fixed inset-0 z-[99999] flex justify-center pointer-events-auto transition-opacity duration-300">
          
         {/* Tasto "Salta Tutorial" visibile e staccato dalla barra */}
          <button 
            onClick={() => setTutorialStep(0)} 
            className="absolute top-20 right-4 bg-stone-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform border border-stone-600"
          >
            {t.tutorial.skip}
          </button>

          {/* STEP 1: La Plancia di Comando (punta in alto) */}
          {tutorialStep === 1 && (
            <div className="absolute top-24 md:top-28 flex flex-col items-center animate-in fade-in zoom-in duration-300 px-4">
              <div className="text-4xl animate-bounce mb-2 drop-shadow-lg">⬆️</div>
              <div className="bg-stone-100 text-stone-900 p-4 rounded-xl max-w-sm text-center shadow-2xl border-b-4 border-emerald-600">
                <h3 className="font-bold text-lg text-emerald-700 mb-2">{t.tutorial.step1Title}</h3>
                <p className="text-sm mb-4 font-medium">{t.tutorial.step1Text}</p>
                <button onClick={() => setTutorialStep(2)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold w-full transition-colors shadow-md">
                  {t.tutorial.next}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Le Info (punta al centro/basso) */}
          {tutorialStep === 2 && (
            <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center animate-in fade-in zoom-in duration-300 px-4">
              <div className="bg-stone-100 text-stone-900 p-4 rounded-xl max-w-sm text-center shadow-2xl border-b-4 border-blue-600">
                <h3 className="font-bold text-lg text-blue-700 mb-2">{t.tutorial.step2Title}</h3>
                <p className="text-sm mb-4 font-medium">{t.tutorial.step2Text}</p>
                <button onClick={() => setTutorialStep(3)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold w-full transition-colors shadow-md">
                  {t.tutorial.next}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: L'Emergenza (senza freccia) */}
          {tutorialStep === 3 && (
            <div className="absolute bottom-16 md:bottom-24 flex flex-col items-center animate-in fade-in zoom-in duration-300 px-4">
              <div className="bg-stone-100 text-stone-900 p-4 rounded-xl max-w-sm text-center shadow-2xl border-b-4 border-red-600">
                <h3 className="font-bold text-lg text-red-700 mb-2">{t.tutorial.step3Title}</h3>
                <p className="text-sm mb-4 font-medium">{t.tutorial.step3Text}</p>
                <button onClick={() => setTutorialStep(0)} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold w-full transition-colors shadow-md animate-pulse">
                  {t.tutorial.start}
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      </div>

      

      {/* Main Game Area - Map */}
      <main className="flex-1 relative overflow-hidden bg-stone-950 flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl border-2 md:border-4 border-stone-800 bg-stone-900">
          {/* Map Background */}
          <img src="/img/mappa-bosco.png" alt={t.map.alt} className="w-full h-auto block" />

         {/* Level 1: Static Species Tokens (Cliccabili) */}
          <button 
            onClick={() => setActiveBioSheet('petagnaea')}
            className="absolute top-[45%] left-[55%] w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            title="Petagnaea gussonei"
          >
            {petagnaeaViva ? (
              <img 
                src="/img/token-petagnaea.png" 
                alt="Petagnaea" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            ) : (
              <div className="w-14 h-14 mx-auto flex items-center justify-center text-4xl bg-stone-900/80 border-2 border-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)]">🥀</div>
            )}
          </button>

          <button 
            onClick={() => setActiveBioSheet('emys')}
            className="absolute top-[62%] left-[36%] w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            title="Emys trinacris"
          >
            {emysViva ? (
              <img 
                src="/img/token-tartaruga.png" 
                alt="Emys trinacris" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            ) : (
              <div className="w-14 h-14 mx-auto flex items-center justify-center text-4xl bg-stone-900/80 border-2 border-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)]">🦴</div>
            )}
          </button>

          <button 
            onClick={() => setActiveBioSheet('rhinolophus')}
            className="absolute top-[21%] left-[17%] w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            title="Rhinolophus ferrumequinum"
          >
            {rhinolophusVivo ? (
              <img 
                src="/img/token-pipistrello.png" 
                alt="Rhinolophus ferrumequinum" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            ) : (
              <div className="w-14 h-14 mx-auto flex items-center justify-center text-4xl bg-stone-900/80 border-2 border-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)]">🚫</div>
            )}
          </button>

          <button 
            onClick={() => setActiveBioSheet('euplagia')}
            className="absolute top-[25%] left-[68%] w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            title="Euplagia quadripunctaria"
          >
            {euplagiaViva ? (
              <img 
                src="/img/token-farfalla.png" 
                alt="Euplagia quadripunctaria" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            ) : (
              <div className="w-14 h-14 mx-auto flex items-center justify-center text-4xl bg-stone-900/80 border-2 border-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)]">🌪️</div>
            )}
          </button>

          {/* Level 2: Dynamic Threats */}
          {giornoCorrente === 1 && (
            <div 
              className="absolute top-[45%] left-[60%] w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-bounce hover:scale-110 transition-transform"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src="/img/token-suidi.png" 
                alt={t.map.tokens.suidi} 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
              />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 shadow-lg animate-pulse">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {giornoCorrente === 2 && (
            <div 
              className="absolute top-[62%] left-[42%] w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-bounce hover:scale-110 transition-transform"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src="/img/token-nasse.png" 
                alt={t.map.tokens.nasse} 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
              />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 shadow-lg animate-pulse">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {giornoCorrente === 3 && (
            <div 
              className="absolute top-[25%] left-[74%] w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-bounce hover:scale-110 transition-transform"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src="/img/token-ruspa.png" 
                alt={t.map.tokens.ruspa} 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
              />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 shadow-lg animate-pulse">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {giornoCorrente === 4 && (
            <div 
              className="absolute top-[73%] left-[78%] w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-bounce hover:scale-110 transition-transform"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src="/img/token-valigetta.png" 
                alt={t.map.tokens.valigetta} 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
              />
              <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1 shadow-lg animate-pulse">
                <Info className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {giornoCorrente === 5 && (
            <div 
              className="absolute top-[50%] left-[73%] w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-bounce hover:scale-110 transition-transform"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src="/img/token-ferragosto.png" 
                alt={t.map.tokens.ferragosto} 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
              />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 shadow-lg animate-pulse">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {giornoCorrente === 6 && (
            <div 
              className="absolute top-[21%] left-[23%] w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-bounce hover:scale-110 transition-transform"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src="/img/token-visite.png" 
                alt={t.map.tokens.visite} 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
              />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 shadow-lg animate-pulse">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {giornoCorrente === 7 && (
            <div 
              className="absolute top-[35%] left-[45%] w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-pulse hover:scale-110 transition-transform"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src="/img/token-evento.png" 
                alt={t.map.tokens.fuoco} 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]"
              />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 shadow-lg animate-bounce">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
            </div>
          )}

          {/* Tokens for other days (placeholders for now) */}
          {giornoCorrente > 7 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">{t.map.dayLabel(giornoCorrente)}</h2>
                <p className="text-stone-300">{t.map.waiting}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal for Day 1 Event */}
      {isModalOpen && giornoCorrente === 1 && gameStarted && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-stone-800 border border-stone-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-stone-700 flex justify-between items-start bg-stone-800/50">
              <div>
                <div className="flex items-center gap-2 text-red-400 mb-1">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wider uppercase">{t.eventTags.emergency}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{t.events[1].title}</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-stone-300 mb-6 leading-relaxed">
                {rich(t.events[1].intro)}
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay1(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">{t.events[1].choices[0].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[1].choices[0].desc)}</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay1(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{t.events[1].choices[1].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[1].choices[1].desc)}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Day 2 Event */}
      {isModalOpen && giornoCorrente === 2 && gameStarted && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-stone-800 border border-stone-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-stone-700 flex justify-between items-start bg-stone-800/50">
              <div>
                <div className="flex items-center gap-2 text-red-400 mb-1">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wider uppercase">{t.eventTags.emergency}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{t.events[2].title}</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-stone-300 mb-6 leading-relaxed">
                {rich(t.events[2].intro)}
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay2(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">{t.events[2].choices[0].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[2].choices[0].desc)}</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay2(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{t.events[2].choices[1].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[2].choices[1].desc)}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Day 3 Event */}
      {isModalOpen && giornoCorrente === 3 && gameStarted && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-stone-800 border border-stone-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-stone-700 flex justify-between items-start bg-stone-800/50">
              <div>
                <div className="flex items-center gap-2 text-red-400 mb-1">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wider uppercase">{t.eventTags.emergency}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{t.events[3].title}</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-stone-300 mb-6 leading-relaxed">
                {rich(t.events[3].intro)}
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay3(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">{t.events[3].choices[0].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[3].choices[0].desc)}</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay3(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{t.events[3].choices[1].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[3].choices[1].desc)}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Day 4 Event */}
      {isModalOpen && giornoCorrente === 4 && gameStarted && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-stone-800 border border-stone-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-stone-700 flex justify-between items-start bg-stone-800/50">
              <div>
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <Info className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wider uppercase">{t.eventTags.opportunity}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{t.events[4].title}</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-stone-300 leading-relaxed">
                {rich(t.events[4].intro)}
              </p>
              {budget < 21000 ? (
                <p className="text-orange-400 mt-2 mb-6 font-medium">{t.events[4].lowBudget}</p>
              ) : (
                <p className="text-emerald-400 mt-2 mb-6 font-medium">{t.events[4].okBudget}</p>
              )}

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay4(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{t.events[4].choices[0].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[4].choices[0].desc)}</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay4(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-stone-300 transition-colors">{t.events[4].choices[1].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[4].choices[1].desc)}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Day 5 Event */}
      {isModalOpen && giornoCorrente === 5 && gameStarted && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-stone-800 border border-stone-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-stone-700 flex justify-between items-start bg-stone-800/50">
              <div>
                <div className="flex items-center gap-2 text-red-400 mb-1">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wider uppercase">{t.eventTags.emergency}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{t.events[5].title}</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-stone-300 mb-6 leading-relaxed">
                {rich(t.events[5].intro)}
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay5(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">{t.events[5].choices[0].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[5].choices[0].desc)}</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay5(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{t.events[5].choices[1].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[5].choices[1].desc)}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Day 6 Event */}
      {isModalOpen && giornoCorrente === 6 && gameStarted && !isGameOver && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-stone-800 border border-stone-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-stone-700 flex justify-between items-start bg-stone-800/50">
              <div>
                <div className="flex items-center gap-2 text-red-400 mb-1">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wider uppercase">{t.eventTags.emergency}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{t.events[6].title}</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-stone-300 mb-6 leading-relaxed">
                {rich(t.events[6].intro)}
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay6(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">{t.events[6].choices[0].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[6].choices[0].desc)}</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay6(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{t.events[6].choices[1].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[6].choices[1].desc)}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Day 7 Event */}
      {isModalOpen && giornoCorrente === 7 && gameStarted && !isGameOver && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-stone-800 border border-stone-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-stone-700 flex justify-between items-start bg-stone-800/50">
              <div>
                <div className="flex items-center gap-2 text-red-500 mb-1">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wider uppercase">{t.eventTags.critical}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{t.events[7].title}</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-stone-300 mb-6 leading-relaxed">
                {rich(t.events[7].intro)}
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay7(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{t.events[7].choices[0].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[7].choices[0].desc)}</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay7(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">{t.events[7].choices[1].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[7].choices[1].desc)}</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay7(3)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-500 transition-colors">{t.events[7].choices[2].title}</div>
                  <div className="text-sm text-stone-400">{rich(t.events[7].choices[2].desc)}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

{/* Scheda Tecnica (Bio Sheet) Modal */}
      {activeBioSheet && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 py-8 bg-black/80 backdrop-blur-sm overflow-y-auto overscroll-none">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl w-full max-w-md my-auto flex-shrink-0 animate-in fade-in zoom-in duration-200 relative">
            <div className="p-4 border-b border-stone-700 flex justify-between items-center bg-stone-800/50">
              <h3 className="text-xl font-bold text-emerald-500 flex items-center gap-2">
                <span>📂</span> {t.bioSheet.header}
              </h3>
              <button onClick={() => setActiveBioSheet(null)} className="text-stone-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* PETAGNAEA */}
              {activeBioSheet === 'petagnaea' && (
                petagnaeaViva ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-black text-emerald-400 italic">Petagnaea gussonei</span>
                      <span className="text-xs font-bold px-2 py-1 bg-emerald-900/50 text-emerald-400 border border-emerald-500 rounded-full">{t.bioSheet.codeLabel} 6950</span>
                    </div>
                    <img src="/img/specie-petagnaea.jpg" alt="Petagnaea" className="w-full h-48 object-cover rounded-xl border-2 border-stone-700 shadow-md" />
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {t.bioSheet.species.petagnaea.desc}
                    </p>
                    <div className="bg-stone-950/50 border border-stone-600 p-3 rounded-lg mt-4">
                      <span className="block text-xs font-bold text-emerald-500 mb-1">{t.bioSheet.biologistNote}</span>
                      <span className="text-sm text-stone-300">{t.bioSheet.species.petagnaea.note}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-6xl mb-4">🥀</div>
                    <h3 className="text-xl font-bold text-red-500 mb-2">{t.bioSheet.species.petagnaea.deadTitle}</h3>
                    <p className="text-stone-400">{t.bioSheet.species.petagnaea.deadText}</p>
                  </div>
                )
              )}

              {/* EMYS */}
              {activeBioSheet === 'emys' && (
                emysViva ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-black text-emerald-400 italic">Emys trinacris</span>
                      <span className="text-xs font-bold px-2 py-1 bg-emerald-900/50 text-emerald-400 border border-emerald-500 rounded-full">{t.bioSheet.codeLabel} 5370</span>
                    </div>
                    <img src="/img/specie-emys.jpg" alt="Emys trinacris" className="w-full h-48 object-cover rounded-xl border-2 border-stone-700 shadow-md" />
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {t.bioSheet.species.emys.desc}
                    </p>
                    <div className="bg-stone-950/50 border border-stone-600 p-3 rounded-lg mt-4">
                      <span className="block text-xs font-bold text-emerald-500 mb-1">{t.bioSheet.biologistNote}</span>
                      <span className="text-sm text-stone-300">{t.bioSheet.species.emys.note}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-6xl mb-4">🦴</div>
                    <h3 className="text-xl font-bold text-red-500 mb-2">{t.bioSheet.species.emys.deadTitle}</h3>
                    <p className="text-stone-400">{t.bioSheet.species.emys.deadText}</p>
                  </div>
                )
              )}

              {/* EUPLAGIA */}
              {activeBioSheet === 'euplagia' && (
                euplagiaViva ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-black text-emerald-400 italic">Euplagia quadripunctaria</span>
                      <span className="text-xs font-bold px-2 py-1 bg-emerald-900/50 text-emerald-400 border border-emerald-500 rounded-full">{t.bioSheet.codeLabel} 6199</span>
                    </div>
                    <img src="/img/specie-euplagia.jpg" alt="Euplagia" className="w-full h-48 object-cover rounded-xl border-2 border-stone-700 shadow-md" />
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {t.bioSheet.species.euplagia.desc}
                    </p>
                    <div className="bg-stone-950/50 border border-stone-600 p-3 rounded-lg mt-4">
                      <span className="block text-xs font-bold text-emerald-500 mb-1">{t.bioSheet.biologistNote}</span>
                      <span className="text-sm text-stone-300">{t.bioSheet.species.euplagia.note}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-6xl mb-4">🌪️</div>
                    <h3 className="text-xl font-bold text-red-500 mb-2">{t.bioSheet.species.euplagia.deadTitle}</h3>
                    <p className="text-stone-400">{t.bioSheet.species.euplagia.deadText}</p>
                  </div>
                )
              )}

              {/* RHINOLOPHUS */}
              {activeBioSheet === 'rhinolophus' && (
                rhinolophusVivo ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-black text-emerald-400 italic">Rhinolophus f.</span>
                      <span className="text-xs font-bold px-2 py-1 bg-emerald-900/50 text-emerald-400 border border-emerald-500 rounded-full">{t.bioSheet.codeLabel} 1304</span>
                    </div>
                    <img src="/img/specie-rhinolophus.jpg" alt="Rhinolophus" className="w-full h-48 object-cover rounded-xl border-2 border-stone-700 shadow-md" />
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {t.bioSheet.species.rhinolophus.desc}
                    </p>
                    <div className="bg-stone-950/50 border border-stone-600 p-3 rounded-lg mt-4">
                      <span className="block text-xs font-bold text-emerald-500 mb-1">{t.bioSheet.biologistNote}</span>
                      <span className="text-sm text-stone-300">{t.bioSheet.species.rhinolophus.note}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-6xl mb-4">🚫</div>
                    <h3 className="text-xl font-bold text-red-500 mb-2">{t.bioSheet.species.rhinolophus.deadTitle}</h3>
                    <p className="text-stone-400">{t.bioSheet.species.rhinolophus.deadText}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Daily Report Modal */}
      {dailyReport && currentReport && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-800 bg-slate-800/50">
              <h2 className="text-2xl font-bold text-blue-400 tracking-wide uppercase text-center">{t.report.header}</h2>
            </div>
            
            <div className="p-6">
              <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                {currentReportText}
              </p>

              <div className="bg-slate-950/50 rounded-xl p-4 mb-8 border border-slate-800">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">{t.report.impactsLabel}</h3>
                <ul className="space-y-3">
                  {currentReport.impacts.map((impact, idx) => {
                    const textColor = IMPACT_COLORS[impact.tone];

                    return (
                      <li key={idx} className={`flex items-start gap-2 ${textColor} text-base`}>
                        <span>{impact.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <button 
                onClick={() => {
                  if (giornoCorrente === 7) {
                    setDailyReport(null);
                    setIsGameOver(true);
                  } else {
                    setDailyReport(null);
                    setGiornoCorrente(prev => prev + 1);
                  }
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all duration-200 flex items-center justify-center gap-2"
              >
                {giornoCorrente === 4 ? (
                  <><span className="text-xl">➡️</span> {t.report.toDay5}</>
                ) : giornoCorrente === 6 ? (
                  <><span className="text-xl">💤</span> {t.report.toLastDay}</>
                ) : giornoCorrente === 7 ? (
                  <><span className="text-xl">📊</span> {t.report.toFinal}</>
                ) : (
                  <><span className="text-xl">💤</span> {t.report.sleep(giornoCorrente + 1)}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {isGameOver && !showDebriefing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/95 backdrop-blur-md overflow-y-auto">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
            <div className="p-8 text-center border-b border-stone-800">
              <h1 className={`text-4xl font-black tracking-tight mb-4 ${getGameOverResult().color}`}>
                {getGameOverResult().title}
              </h1>
              <p className="text-xl text-stone-300 leading-relaxed">
                {getGameOverResult().text}
              </p>
            </div>
            
            <div className="p-8 bg-stone-800/30">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700 text-center">
                  <div className="text-stone-400 text-sm font-bold tracking-wider uppercase mb-2">{t.gameOver.finalHealth}</div>
                  <div className={`text-4xl font-black ${ecosistemaSalute >= 50 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {ecosistemaSalute}%
                  </div>
                </div>
                <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700 text-center">
                  <div className="text-stone-400 text-sm font-bold tracking-wider uppercase mb-2">{t.gameOver.remainingBudget}</div>
                  <div className={`text-4xl font-black ${budget >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatCurrency(budget)}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowDebriefing(true)}
                className="w-full bg-stone-700 hover:bg-stone-600 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">📂</span> {t.gameOver.openDossier}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Debriefing Screen */}
      {isGameOver && showDebriefing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/95 backdrop-blur-md overflow-y-auto">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-500 my-8">
            <div className="p-8 border-b border-stone-800 bg-stone-800/50">
              <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                <span>📂</span> {t.debrief.title}
              </h1>
              <p className="text-stone-400 mt-2">{t.debrief.subtitle}</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Petagnaea */}
                <div className={`p-5 rounded-2xl border ${petagnaeaViva ? 'bg-emerald-900/20 border-emerald-800/50' : 'bg-red-900/20 border-red-800/50'}`}>
                  <div className="font-bold text-white mb-2 flex items-center justify-between">
                    <span>🌱 Petagnaea gussonei</span>
                    {petagnaeaViva ? <span className="text-emerald-400 text-sm px-2 py-1 bg-emerald-900/50 rounded-full">{t.debrief.species.petagnaea.ok}</span> : <span className="text-red-400 text-sm px-2 py-1 bg-red-900/50 rounded-full">{t.debrief.species.petagnaea.ko}</span>}
                  </div>
                  <p className={`text-sm ${petagnaeaViva ? 'text-emerald-200/70' : 'text-red-200/70'}`}>
                    {petagnaeaViva ? t.debrief.species.petagnaea.okText : t.debrief.species.petagnaea.koText}
                  </p>
                </div>

                {/* Emys */}
                <div className={`p-5 rounded-2xl border ${emysViva ? 'bg-emerald-900/20 border-emerald-800/50' : 'bg-red-900/20 border-red-800/50'}`}>
                  <div className="font-bold text-white mb-2 flex items-center justify-between">
                    <span>🐢 Emys trinacris</span>
                    {emysViva ? <span className="text-emerald-400 text-sm px-2 py-1 bg-emerald-900/50 rounded-full">{t.debrief.species.emys.ok}</span> : <span className="text-red-400 text-sm px-2 py-1 bg-red-900/50 rounded-full">{t.debrief.species.emys.ko}</span>}
                  </div>
                  <p className={`text-sm ${emysViva ? 'text-emerald-200/70' : 'text-red-200/70'}`}>
                    {emysViva ? t.debrief.species.emys.okText : t.debrief.species.emys.koText}
                  </p>
                </div>

                {/* Euplagia */}
                <div className={`p-5 rounded-2xl border ${euplagiaViva ? 'bg-emerald-900/20 border-emerald-800/50' : 'bg-red-900/20 border-red-800/50'}`}>
                  <div className="font-bold text-white mb-2 flex items-center justify-between">
                    <span>🦋 Euplagia quadripunctaria</span>
                    {euplagiaViva ? <span className="text-emerald-400 text-sm px-2 py-1 bg-emerald-900/50 rounded-full">{t.debrief.species.euplagia.ok}</span> : <span className="text-red-400 text-sm px-2 py-1 bg-red-900/50 rounded-full">{t.debrief.species.euplagia.ko}</span>}
                  </div>
                  <p className={`text-sm ${euplagiaViva ? 'text-emerald-200/70' : 'text-red-200/70'}`}>
                    {euplagiaViva ? t.debrief.species.euplagia.okText : t.debrief.species.euplagia.koText}
                  </p>
                </div>

                {/* Rhinolophus */}
                <div className={`p-5 rounded-2xl border ${rhinolophusVivo ? 'bg-emerald-900/20 border-emerald-800/50' : 'bg-red-900/20 border-red-800/50'}`}>
                  <div className="font-bold text-white mb-2 flex items-center justify-between">
                    <span>🦇 Rhinolophus f.</span>
                    {rhinolophusVivo ? <span className="text-emerald-400 text-sm px-2 py-1 bg-emerald-900/50 rounded-full">{t.debrief.species.rhinolophus.ok}</span> : <span className="text-red-400 text-sm px-2 py-1 bg-red-900/50 rounded-full">{t.debrief.species.rhinolophus.ko}</span>}
                  </div>
                  <p className={`text-sm ${rhinolophusVivo ? 'text-emerald-200/70' : 'text-red-200/70'}`}>
                    {rhinolophusVivo ? t.debrief.species.rhinolophus.okText : t.debrief.species.rhinolophus.koText}
                  </p>
                </div>
              </div>

              <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700 mt-6">
                <div className="text-stone-400 text-sm font-bold tracking-wider uppercase mb-2">{t.debrief.evaluationLabel}</div>
                <div className="text-2xl font-bold text-white">
                  {budget < 0 ? t.debrief.evaluation.bankrupt : ecosistemaSalute < 50 ? t.debrief.evaluation.careless : ecosistemaSalute >= 90 ? t.debrief.evaluation.excellent : t.debrief.evaluation.good}
                </div>
              </div>

              <button 
                onClick={resetGame}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all duration-200 mt-8 flex items-center justify-center gap-2"
              >
                <span className="text-xl">🔄</span> {t.debrief.replay}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Overlay */}
      {!gameStarted && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[95vh]">
            <div className="p-8 md:p-10 overflow-y-auto">
              {/* Bandierina per cambiare lingua: sopra il titolo su schermi piccoli, nell'angolo su schermi grandi */}
              <div className="flex justify-end -mt-4 -mr-4 mb-2 md:-mt-6 md:-mr-6 lg:m-0 lg:absolute lg:top-4 lg:right-4 lg:z-10">
                <LanguageToggle lang={lang} onToggle={toggleLang} />
              </div>
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-500 mb-3 tracking-tight">{t.onboarding.title}</h1>
                <p className="text-lg md:text-xl text-emerald-200/80 font-medium">{t.onboarding.subtitle}</p>
              </div>
              
              <p className="text-stone-300 text-lg leading-relaxed mb-10 text-center max-w-3xl mx-auto">
                {t.onboarding.intro}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Card 1 */}
                <div className="bg-stone-800/60 border border-stone-700 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-stone-700 pb-3">
                    <Heart className="w-6 h-6 text-emerald-400" />
                    {t.onboarding.statsTitle}
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-2xl mt-1">💰</span>
                      <div>
                        <strong className="text-yellow-400 text-lg block mb-1">{t.onboarding.budgetLabel}</strong>
                        <span className="text-stone-400 text-sm leading-relaxed block">{t.onboarding.budgetText}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-2xl mt-1">🌲</span>
                      <div>
                        <strong className="text-emerald-400 text-lg block mb-1">{t.onboarding.healthLabel}</strong>
                        <span className="text-stone-400 text-sm leading-relaxed block">{t.onboarding.healthText}</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Card 2 */}
                <div className="bg-stone-800/60 border border-stone-700 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3 border-b border-stone-700 pb-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    {t.onboarding.bioTitle}
                  </h3>
                  <p className="text-sm text-stone-300 mb-5 leading-relaxed">
                    {t.onboarding.bioIntro} <strong className="text-red-400 block mt-2">{t.onboarding.bioWarning}</strong>
                  </p>
                  <ul className="space-y-4 text-sm">
                    <li className="flex gap-3 items-start">
                      <span className="text-lg mt-0.5">🌸</span>
                      <span className="text-stone-300 leading-relaxed"><strong className="text-white">Petagnaea gussonei:</strong> {t.onboarding.species.petagnaea}</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-lg mt-0.5">🐢</span>
                      <span className="text-stone-300 leading-relaxed"><strong className="text-white">Emys trinacris:</strong> {t.onboarding.species.emys}</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-lg mt-0.5">🦋</span>
                      <span className="text-stone-300 leading-relaxed"><strong className="text-white">Euplagia quadripunctaria:</strong> {t.onboarding.species.euplagia}</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-lg mt-0.5">🦇</span>
                      <span className="text-stone-300 leading-relaxed"><strong className="text-white">Rhinolophus ferrumequinum:</strong> {t.onboarding.species.rhinolophus}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => setGameStarted(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg md:text-xl py-4 px-10 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all duration-200"
                >
                  {t.onboarding.start}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
