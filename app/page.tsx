'use client';

import { useState, useEffect } from 'react'; // Una sola riga per tutto quello che serve da React
import { Coins, Heart, Calendar, X, AlertTriangle, Info } from 'lucide-react'; // I tuoi icone
import posthog from 'posthog-js'; // L'import di PostHog

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

  // Biodiversity State
  const [petagnaeaViva, setPetagnaeaViva] = useState(true);
  const [emysViva, setEmysViva] = useState(true);
  const [euplagiaViva, setEuplagiaViva] = useState(true);
  const [rhinolophusVivo, setRhinolophusVivo] = useState(true);
  const [activeBioInfo, setActiveBioInfo] = useState<string | null>(null);
  // 1. Traccia l'accesso alla pagina (Landing)
useEffect(() => {
  posthog.capture('pagina_caricata', { gioco: 'Custodi del Flascio' });
}, []);

// 2. Traccia quando l'utente preme effettivamente "Inizia Gioco"
useEffect(() => {
  if (gameStarted) {
    posthog.capture('partita_iniziata');
  }
}, [gameStarted]);

// 3. Traccia il Game Over e i risultati finali
useEffect(() => {
  if (isGameOver) {
    posthog.capture('partita_conclusa', {
      giorno_finale: giornoCorrente,
      budget_rimanente: budget,
      salute_ecosistema: ecosistemaSalute,
      petagnaea_sopravvissuta: petagnaeaViva
    });
  }
}, [isGameOver]);

// 4. Traccia l'estinzione della Petagnaea (Il tuo obiettivo di ricerca!)
useEffect(() => {
  if (!petagnaeaViva) {
    posthog.capture('estinzione_specie', { specie: 'Petagnaea gussonei' });
  }
}, [petagnaeaViva]);

  type DailyReportData = {
    text: string;
    impacts: string[];
  };
  const [dailyReport, setDailyReport] = useState<DailyReportData | null>(null);

  const handleChoiceDay1 = (choiceId: number) => {
    setIsModalOpen(false);
    if (choiceId === 1) {
      setBudget(prev => prev - 0);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 5)));
      setPetagnaeaViva(false);
      setDailyReport({
        text: "Hai scelto la via del risparmio. I maiali sono scappati sul momento, ma sono tornati la notte stessa. Le stazioni di Petagnaea sono state devastate dal loro passaggio. La popolazione è compromessa.",
        impacts: [
          "🥀 Biodiversità: Petagnaea distrutta!",
          "📉 Salute Bosco: -5%",
          "💰 Budget: - € 0 (Gratuito)"
        ]
      });
    } else if (choiceId === 2) {
      setBudget(prev => prev - 12000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 12)));
      setPetagnaeaViva(true);
      setDailyReport({
        text: "Hai costruito le recinzioni come previsto dalle Misure di Conservazione. La Petagnaea è al sicuro per sempre. Hai investito una somma importante, ma necessaria.",
        impacts: [
          "📈 Salute Bosco: +12%",
          "💸 Budget: - € 12.000"
        ]
      });
    }
  };

  const handleChoiceDay2 = (choiceId: number) => {
    setIsModalOpen(false);
    if (choiceId === 1) {
      setBudget(prev => prev - 0);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 5)));
      setEmysViva(false);
      setDailyReport({
        text: "Non sei intervenuto. I bracconieri hanno svuotato le nasse indisturbati. La popolazione locale di Emys trinacris è stata decimata per il mercato nero.",
        impacts: [
          "🦴 Biodiversità: Tartarughe perse!",
          "📉 Salute Bosco: -5%",
          "💰 Budget: - € 0 (Gratuito)"
        ]
      });
    } else if (choiceId === 2) {
      setBudget(prev => prev - 2000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 10)));
      setEmysViva(true);
      setDailyReport({
        text: "Le guardie hanno presidiato le sponde tutta la notte. Sono state sequestrate tre trappole e salvati due esemplari di Emys. Ottimo lavoro.",
        impacts: [
          "📈 Salute Bosco: +10%",
          "💸 Budget: - € 2.000"
        ]
      });
    }
  };

  const handleChoiceDay3 = (choiceId: number) => {
    setIsModalOpen(false);
    if (choiceId === 1) {
      setBudget(prev => prev - 0);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 10)));
      setEuplagiaViva(false);
      setDailyReport({
        text: "Le ruspe hanno rasato tutto a zero. L'acqua scorrerà veloce, ma hai distrutto il corridoio ecologico, la 'strada verde' naturale che permetteva alla fauna di spostarsi e sopravvivere. Non si vedono più farfalle in volo. La biodiversità ha subito un duro colpo.",
        impacts: [
          "📉 Salute Bosco: -10% (Habitat perso)"
        ]
      });
    } else if (choiceId === 2) {
      setBudget(prev => prev - 4000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 10)));
      setEuplagiaViva(true);
      setDailyReport({
        text: "Hai vietato le ruspe e pagato squadre di operai per tagliare solo il secco a mano. La vegetazione ripariale, il fragile ecosistema che abbraccia il fiume, è intatta. Di sera, osservi centinaia di Euplagia volare tra le foglie. Un successo per Natura 2000!",
        impacts: [
          "🦋 Biodiversità: Habitat salvato!",
          "📈 Salute Bosco: +10%",
          "💸 Budget: - € 4.000 (Costo manodopera)"
        ]
      });
    }
  };

  const handleChoiceDay4 = (choiceId: number) => {
    setIsModalOpen(false);
    if (choiceId === 1) {
      setBudget(prev => prev + 14500);
      setDailyReport({
        text: `Hai accompagnato l'ispettore nei luoghi più affascinanti. Avete avvistato tracce fresche di gatto selvatico e fotografato ${petagnaeaViva ? "la fioritura della Petagnaea" : "i maestosi alberi secolari del bosco"}. L'ispettore è rimasto colpito. Il finanziamento è approvato!`,
        impacts: [
          "🌸 Biodiversità: Valorizzata!",
          "💰 Budget: + € 14.500 (Fondi UE sbloccati)"
        ]
      });
    } else if (choiceId === 2) {
      setDailyReport({
        text: "Hai mostrato all'ispettore solo carte e mappe datate, rimanendo in sede. L'ispettore non ha trovato evidenze sufficienti dello stato di salute attuale degli habitat. La pratica di finanziamento è sospesa. Un'occasione sprecata.",
        impacts: [
          "😐 Budget: Invariato (Nessun fondo extra)"
        ]
      });
    }
  };

  const handleChoiceDay5 = (choiceId: number) => {
    setIsModalOpen(false);
    if (choiceId === 1) {
      setBudget(prev => prev + 3000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 5)));
      setDailyReport({
        text: "Hai aperto i cancelli. I turisti hanno pagato il biglietto volentieri. Il budget respira, ma a fine giornata trovi rifiuti abbandonati e tracce di calpestio fuori dai sentieri. Hai venduto un po' di natura per sopravvivere economicamente.",
        impacts: [
          "💰 Budget: + € 3.000 (Incasso Ticket)",
          "📉 Salute Bosco: -5%"
        ]
      });
    } else if (choiceId === 2) {
      setBudget(prev => prev - 1000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 10)));
      setDailyReport({
        text: "Hai schierato le pattuglie a ogni varco. Nessuno è entrato. Il bosco è rimasto silenzioso e incontaminato. È stata una scelta impopolare e costosa, ma necessaria per la natura.",
        impacts: [
          "📈 Salute Bosco: +10%",
          "💸 Budget: - € 1.000 (Straordinari)"
        ]
      });
    }
  };

  const handleChoiceDay6 = (choiceId: number) => {
    setIsModalOpen(false);
    if (choiceId === 1) {
      setBudget(prev => prev + 2000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 15)));
      setRhinolophusVivo(false);
      setDailyReport({
        text: "Hai installato i faretti. I turisti sono entusiasti e pagano il biglietto. Ma stasera, il sonar non rileva nessun segnale ultrasonico dei pipistrelli. La colonia di Rhinolophus, spaventata dalle luci, ha abbandonato il sito per sempre.",
        impacts: [
          "🦇 Biodiversità: Colonia persa!",
          "💰 Budget: + € 2.000 (Ticket)",
          "📉 Salute Bosco: -15%"
        ]
      });
    } else if (choiceId === 2) {
      setBudget(prev => prev - 3000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 10)));
      setDailyReport({
        text: "Hai installato una cancellata speciale che permette il passaggio dei pipistrelli ma non delle persone. Hai spento ogni luce. Al tramonto, vedi i Rhinolophus uscire a caccia. Il sito è sicuro.",
        impacts: [
          "🦇 Biodiversità: Colonia protetta!",
          "📈 Salute Bosco: +10%",
          "💸 Budget: - € 3.000 (Costo cancello)"
        ]
      });
    }
  };

  const handleChoiceDay7 = (choiceId: number) => {
    setIsModalOpen(false);
    if (choiceId === 1) {
      setBudget(prev => prev - 20000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 2)));
      setDailyReport({
        text: "Il rombo dei motori ha salvato la foresta. L'acqua sganciata ha spento le fiamme in poche ore. Il bosco è salvo, ma le casse del parco sono state prosciugate.",
        impacts: [
          "😐 Salute Bosco: -2% (Danni lievi)",
          "💸 Budget: - € 20.000 (Spesa enorme)"
        ]
      });
    } else if (choiceId === 2) {
      setBudget(prev => prev - 5000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 15)));
      setDailyReport({
        text: "Gli uomini hanno lavorato eroicamente con pale e battifuoco, ma il vento era troppo forte. L'incendio è stato domato solo a notte fonda. Molti ettari di faggeta sono andati in fumo.",
        impacts: [
          "📉 Salute Bosco: -15% (Danni ingenti)",
          "💰 Budget: - € 5.000 (Contenuto)"
        ]
      });
    } else if (choiceId === 3) {
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev - 50)));
      setDailyReport({
        text: "Hai lasciato bruciare il bosco. La pioggia non è mai arrivata. È un disastro ecologico senza precedenti.",
        impacts: [
          "💀 Salute Bosco: -50% (Distrutto)"
        ]
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  };

  const getGameOverResult = () => {
    if (budget < 0) {
      return {
        title: "SCONFITTA: BANCAROTTA",
        text: "Il bosco è salvo, ma le casse del parco si stanno svuotando. La Corte dei Conti ha commissariato l'Ente Parco. Gestione fallimentare.",
        color: "text-red-500"
      };
    } else if (ecosistemaSalute < 50) {
      return {
        title: "SCONFITTA: DISASTRO ECOLOGICO",
        text: `Il parco è un deserto. La salute è crollata sotto la soglia minima.${!petagnaeaViva ? " Inoltre, è andata estinta anche la rarissima Petagnaea. Fallimento totale." : ""}`,
        color: "text-red-500"
      };
    } else if (!petagnaeaViva) {
      return {
        title: "SCONFITTA: PERDITA DI BIODIVERSITÀ",
        text: "La salute generale è accettabile, MA hai fallito la missione principale. La Petagnaea è stata distrutta dalla tua incuria. L'UE ha tagliato i fondi.",
        color: "text-red-500"
      };
    } else if (ecosistemaSalute >= 90 && emysViva && euplagiaViva && rhinolophusVivo) {
      return {
        title: "🏆 VITTORIA: CUSTODE DEL FLASCIO",
        text: "Risultato eccellente! Hai difeso la natura contro ogni minaccia. Tutte le specie prosperano e la tua gestione è stata impeccabile.",
        color: "text-emerald-400"
      };
    } else if (ecosistemaSalute >= 50 && (!emysViva || !euplagiaViva || !rhinolophusVivo)) {
      return {
        title: "📉 VITTORIA AMARA",
        text: "Il bosco è vivo, ma il prezzo pagato in termini di biodiversità è alto. Hai perso alcune specie secondarie. Il parco è più povero e silenzioso.",
        color: "text-yellow-400"
      };
    } else {
      return {
        title: "👍 VITTORIA OPERATIVA",
        text: "Ottimo lavoro! Il parco è salvo e le specie protette prosperano. Hai dovuto accettare qualche duro compromesso, ma l'ecosistema regge bene.",
        color: "text-blue-400"
      };
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

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans flex flex-col overflow-x-hidden">
      {/* OVERLAY OBBLIGO ROTAZIONE (Solo su mobile in verticale) */}
      <div className="fixed inset-0 z-[999] bg-stone-950 flex flex-col items-center justify-center p-6 text-center portrait:flex landscape:hidden md:!hidden">
        <div className="text-7xl mb-6 animate-bounce">📱</div>
        <h2 className="text-3xl font-black text-emerald-400 mb-4 tracking-tight">RUOTA IL TELEFONO</h2>
        <p className="text-stone-300 text-lg">Per esplorare la mappa e giocare correttamente, ruota il dispositivo in orizzontale (Landscape).</p>
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
                const testo = petagnaeaViva ? 'Petagnaea gussonei' : 'Petagnaea - Estinta';
                setActiveBioInfo(activeBioInfo === testo ? null : testo);
              }} 
              className="text-lg hover:scale-110 transition-transform"
            >
              {petagnaeaViva ? '🌸' : '🥀'}
            </button>

            <button 
              onClick={() => {
                const testo = emysViva ? 'Emys trinacris' : 'Emys - Estinta';
                setActiveBioInfo(activeBioInfo === testo ? null : testo);
              }} 
              className="text-lg hover:scale-110 transition-transform"
            >
              {emysViva ? '🐢' : '🦴'}
            </button>

            <button 
              onClick={() => {
                const testo = euplagiaViva ? 'Euplagia quadripunctaria' : 'Euplagia - Estinta';
                setActiveBioInfo(activeBioInfo === testo ? null : testo);
              }} 
              className="text-lg hover:scale-110 transition-transform"
            >
              {euplagiaViva ? '🦋' : '🌪️'}
            </button>

            <button 
              onClick={() => {
                const testo = rhinolophusVivo ? 'Rhinolophus ferrumequinum' : 'Rhinolophus - Estinto';
                setActiveBioInfo(activeBioInfo === testo ? null : testo);
              }} 
              className="text-lg hover:scale-110 transition-transform"
            >
              {rhinolophusVivo ? '🦇' : '🚫'}
            </button>
          </div>

        </div> {/* Fine della RIGA UNICA */}

        {/* Messaggio a comparsa per le info sulla biodiversità */}
        {activeBioInfo && (
          <div className="bg-stone-800/90 backdrop-blur-sm border border-stone-600 px-3 py-1 mt-2 rounded-full text-xs text-stone-200 animate-in fade-in slide-in-from-top-2 pointer-events-auto shadow-lg">
            {activeBioInfo}
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
            Salta Tutorial ✖
          </button>

          {/* STEP 1: La Plancia di Comando (punta in alto) */}
          {tutorialStep === 1 && (
            <div className="absolute top-24 md:top-28 flex flex-col items-center animate-in fade-in zoom-in duration-300 px-4">
              <div className="text-4xl animate-bounce mb-2 drop-shadow-lg">⬆️</div>
              <div className="bg-stone-100 text-stone-900 p-4 rounded-xl max-w-sm text-center shadow-2xl border-b-4 border-emerald-600">
                <h3 className="font-bold text-lg text-emerald-700 mb-2">1. La tua Plancia di Comando</h3>
                <p className="text-sm mb-4 font-medium">Tieni d'occhio questi valori! Se i fondi (💶) o la salute dell'ecosistema (🌿) scendono a zero, la tua missione fallirà.</p>
                <button onClick={() => setTutorialStep(2)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold w-full transition-colors shadow-md">
                  Avanti ➔
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Le Info (punta al centro/basso) */}
          {tutorialStep === 2 && (
            <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center animate-in fade-in zoom-in duration-300 px-4">
              <div className="bg-stone-100 text-stone-900 p-4 rounded-xl max-w-sm text-center shadow-2xl border-b-4 border-blue-600">
                <h3 className="font-bold text-lg text-blue-700 mb-2">2. Esplora e Impara</h3>
                <p className="text-sm mb-4 font-medium">Sulla mappa troverai icone fisse (come le info sulle specie). Toccale per aprire il Database ARPA e studiare l'ambiente prima di agire.</p>
                <button onClick={() => setTutorialStep(3)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold w-full transition-colors shadow-md">
                  Avanti ➔
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: L'Emergenza (senza freccia) */}
          {tutorialStep === 3 && (
            <div className="absolute bottom-16 md:bottom-24 flex flex-col items-center animate-in fade-in zoom-in duration-300 px-4">
              <div className="bg-stone-100 text-stone-900 p-4 rounded-xl max-w-sm text-center shadow-2xl border-b-4 border-red-600">
                <h3 className="font-bold text-lg text-red-700 mb-2">3. Affronta le Emergenze</h3>
                <p className="text-sm mb-4 font-medium">I gettoni rossi che rimbalzano sono le tue missioni attive. Toccali per prendere decisioni cruciali per la riserva.</p>
                <button onClick={() => setTutorialStep(0)} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold w-full transition-colors shadow-md animate-pulse">
                  Inizia a Giocare 🎮
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
          <img src="https://i.postimg.cc/66kDhfq2/Mappa_Bosco.png" alt="Mappa Bosco del Flascio" className="w-full h-auto block" />

         {/* Level 1: Static Species Tokens (Cliccabili) */}
          <button 
            onClick={() => setActiveBioSheet('petagnaea')}
            className="absolute top-[45%] left-[55%] w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            title="Petagnaea gussonei"
          >
            {petagnaeaViva ? (
              <img 
                src="https://i.postimg.cc/44Dr1Qy4/Token_Petagnaea_Scontornato.png" 
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
                src="https://i.postimg.cc/cLqqhy16/Token_Tartaruga_Scontornato.png" 
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
                src="https://i.postimg.cc/VkcQjFhG/Token_Pipistrello_Scontornata.png" 
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
                src="https://i.postimg.cc/vTgFv2Mv/Token_Farfalla_Scontornata.png" 
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
                src="https://i.postimg.cc/Kc6d5DjZ/Token_Suidi_Scontornato.png" 
                alt="Suidi" 
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
                src="https://i.postimg.cc/qvffwVBt/Token_Nasse_Scontornato.png" 
                alt="Nasse" 
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
                src="https://i.postimg.cc/B6Cs8MHv/Token-Ruspa-Scontornato.png" 
                alt="Ruspa" 
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
                src="https://i.postimg.cc/nzC8kdYd/Token-Valigetta-Scontornato.png" 
                alt="Valigetta" 
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
                src="https://i.postimg.cc/cJMxt51m/Token-Ferragosto-Scontornato.png" 
                alt="Ferragosto" 
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
                src="https://i.postimg.cc/NG2vSfZk/Token-Visite-Scontornato.png" 
                alt="Turisti con Torce" 
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
                src="https://i.postimg.cc/HjGfTXcQ/Adobe-Express-file.png" 
                alt="Fuoco" 
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
                <h2 className="text-3xl font-bold text-white mb-4">Giorno {giornoCorrente}</h2>
                <p className="text-stone-300">In attesa dei prossimi eventi...</p>
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
                  <span className="text-sm font-bold tracking-wider uppercase">Emergenza Rilevata</span>
                </div>
                <h2 className="text-2xl font-bold text-white">GIORNO 1: L&apos;INVASIONE DEI SUIDI</h2>
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
                Il primo giorno al parco inizia con una emergenza: i ranger segnalano un branco di Suidi (maiali selvatici) che sta distruggendo le stazioni di <span className="text-emerald-400 font-semibold italic">Petagnaea gussonei</span> (Habitat prioritario). Minaccia: PA07 (Pascolo intensivo).
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay1(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Manda una squadra a scacciarli</div>
                  <div className="text-sm text-stone-400">Un intervento <span className="text-stone-300 font-medium">gratuito</span> ma provvisorio. I cinghiali torneranno. Rischio estinzione Petagnaea.</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay1(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Costruisci recinzioni rinforzate</div>
                  <div className="text-sm text-stone-400">Messa in sicurezza definitiva della Petagnaea, ma richiederà un <span className="text-stone-300 font-medium">investimento abbastanza alto</span>.</div>
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
                  <span className="text-sm font-bold tracking-wider uppercase">Emergenza Rilevata</span>
                </div>
                <h2 className="text-2xl font-bold text-white">GIORNO 2: ACQUE TORBIDE</h2>
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
                Ti svegli con una brutta notizia dal Lago del Flascio (Habitat 3150). Sono state trovate delle nasse illegali per catturare le Testuggini palustri (<span className="text-emerald-400 font-semibold italic">Emys trinacris</span>). È bracconaggio (Pressione PG10).
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay2(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Ignora e risparmia i fondi</div>
                  <div className="text-sm text-stone-400"><span className="text-stone-300 font-medium">Non spendi nulla</span>, ma i bracconieri agiranno indisturbati. Rischio estinzione Emys.</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay2(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Finanzia pattugliamenti notturni</div>
                  <div className="text-sm text-stone-400">Con una <span className="text-stone-300 font-medium">spesa contenuta</span>, le guardie sequestreranno le trappole e salveranno le testuggini.</div>
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
                  <span className="text-sm font-bold tracking-wider uppercase">Emergenza Rilevata</span>
                </div>
                <h2 className="text-2xl font-bold text-white">GIORNO 3: LE ALI TIGRATE</h2>
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
                Sei lungo il torrente. È il delicato periodo di volo dell'<span className="text-emerald-400 font-semibold italic">Euplagia quadripunctaria</span> (la rara Falena dell'Edera), rigorosamente protetta dalla Direttiva Habitat, la massima legge europea per la difesa della biodiversità. Gli ingegneri premono per 'ripulire' gli argini con le ruspe. Per loro è solo erba da tagliare, ma quell'intrico di rovi è il rifugio vitale dove questa falena vive e si riproduce.
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay3(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Autorizza la pulizia totale</div>
                  <div className="text-sm text-stone-400">L&apos;acqua scorrerà veloce e l'intervento è <span className="text-stone-300 font-medium">a costo zero</span>, ma distruggerai il corridoio ecologico.</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay3(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Imponi il taglio selettivo manuale</div>
                  <div className="text-sm text-stone-400">La vegetazione ripariale rimarrà intatta, ma i lavori manuali avranno un <span className="text-stone-300 font-medium">costo moderato</span>.</div>
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
                  <span className="text-sm font-bold tracking-wider uppercase">Opportunità Burocratica</span>
                </div>
                <h2 className="text-2xl font-bold text-white">GIORNO 4: L&apos;ISPEZIONE EUROPEA</h2>
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
                Oggi è una giornata decisiva. Un ispettore della Commissione Europea è venuto a valutare lo stato di conservazione del sito, cioè la reale salute della nostra biodiversità. Se il report sarà positivo, il Parco riceverà i Fondi Strutturali, i finanziamenti vitali per pagare le spese e continuare a proteggere l'area.
              </p>
              {budget < 21000 ? (
                <p className="text-orange-400 mt-2 mb-6 font-medium">Le casse del parco si stanno svuotando. Convincere l&apos;ispettore è l&apos;unico modo per ottenere i soldi necessari per le emergenze.</p>
              ) : (
                <p className="text-emerald-400 mt-2 mb-6 font-medium">Hai ancora fondi, ma ottenere questo finanziamento garantirebbe la sicurezza economica del parco a lungo termine.</p>
              )}

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay4(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Organizza un monitoraggio sul campo</div>
                  <div className="text-sm text-stone-400">Mostra all&apos;ispettore la vera natura del parco. Richiede una <span className="text-stone-300 font-medium">piccola spesa logistica</span>.</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay4(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-stone-300 transition-colors">Affidati ai vecchi dati d&apos;ufficio</div>
                  <div className="text-sm text-stone-400">Rimani in sede e mostra le scartoffie. <span className="text-stone-300 font-medium">Non costa nulla</span>, ma rischi una bocciatura.</div>
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
                  <span className="text-sm font-bold tracking-wider uppercase">Emergenza Rilevata</span>
                </div>
                <h2 className="text-2xl font-bold text-white">GIORNO 5: FERRAGOSTO DI FUOCO</h2>
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
                È la settimana di Ferragosto e l'assalto dei bagnanti è fuori controllo. Migliaia di turisti premono per invadere la Zona A, il cuore inviolabile della riserva dove l'accesso umano è severamente vietato, per fare picnic e bagni nel fiume. Hai un dilemma: chiudere un occhio e aprire i cancelli a pagamento per fare cassa, o schierare i ranger in straordinario per difendere la natura dalla folla?
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay5(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Consenti l&apos;accesso con ticket</div>
                  <div className="text-sm text-stone-400">Sacrifichi un po&apos; di natura, ma ti garantisce un <span className="text-stone-300 font-medium">ottimo incasso</span> per le casse dell&apos;Ente.</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay5(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Blocco Totale e sorveglianza</div>
                  <div className="text-sm text-stone-400">Proteggi la natura, ma dovrai affrontare una <span className="text-stone-300 font-medium">piccola spesa extra</span> per pagare gli straordinari.</div>
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
                  <span className="text-sm font-bold tracking-wider uppercase">Emergenza Rilevata</span>
                </div>
                <h2 className="text-2xl font-bold text-white">GIORNO 6: OMBRE NELLA GROTTA</h2>
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
                Ti trovi all'ingresso di una vecchia grotta naturale. I nostri sensori confermano che è il rifugio del Rhinolophus ferrumequinum, il raro pipistrello conosciuto come Ferro di Cavallo Maggiore. Un'associazione locale vorrebbe piazzare dei faretti per organizzare visite a pagamento, ma c'è un problema vitale: terrorizzati da luce e rumore, questi animali abbandonerebbero la grotta per sempre.
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay6(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Autorizza le visite turistiche</div>
                  <div className="text-sm text-stone-400">Metti a rischio la colonia, ma l&apos;afflusso di turisti porterà un <span className="text-stone-300 font-medium">buon guadagno</span>.</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay6(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Chiudi la grotta</div>
                  <div className="text-sm text-stone-400">Proteggi i pipistrelli con una cancellata speciale. L&apos;installazione avrà un <span className="text-stone-300 font-medium">costo significativo</span>.</div>
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
                  <span className="text-sm font-bold tracking-wider uppercase">Emergenza Critica</span>
                </div>
                <h2 className="text-2xl font-bold text-white">GIORNO 7: L&apos;INFERNO</h2>
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
                È l&apos;ultimo giorno. Soffia un forte vento di scirocco. Dalla torretta avvistano fumo denso provenire dalla Faggeta (Habitat 9210). È un INCENDIO DOLOSO (Pressione PH04). Il fuoco avanza verso il cuore del parco. Devi agire subito.
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay7(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Chiama i Canadair</div>
                  <div className="text-sm text-stone-400">Intervento aereo massiccio e immediato. È la soluzione migliore, ma ha un <span className="text-stone-300 font-medium">costo esorbitante</span>.</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay7(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">Manda le squadre di terra</div>
                  <div className="text-sm text-stone-400">Intervento manuale, più lento e rischioso. Richiede un <span className="text-stone-300 font-medium">investimento medio</span>.</div>
                </button>

                <button 
                  onClick={() => handleChoiceDay7(3)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-500 transition-colors">Non fare nulla</div>
                  <div className="text-sm text-stone-400">Aspetti la pioggia. <span className="text-stone-300 font-medium">Non spendi nulla</span>, ma le conseguenze per l'ecosistema potrebbero essere disastrose.</div>
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
                <span>📂</span> DATABASE NATURA 2000
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
                      <span className="text-xs font-bold px-2 py-1 bg-emerald-900/50 text-emerald-400 border border-emerald-500 rounded-full">COD. 6950</span>
                    </div>
                    <img src="https://top50.iucn-mpsg.org/uploads/species/38/images/m_134_2017-04-26-120950_petagnaea-gussonei.JPG" alt="Petagnaea" className="w-full h-48 object-cover rounded-xl border-2 border-stone-700 shadow-md" />
                    <p className="text-stone-300 text-sm leading-relaxed">
                      Questa pianta è un vero e proprio fossile vivente, un relitto botanico del Terziario: significa che sopravvive immutata da milioni di anni, da quando la Sicilia aveva un clima sub-tropicale. Oggi, sfuggita alle glaciazioni, riesce a crescere esclusivamente in pochissime e fragili zone umide vicine alle sorgenti dei Monti Nebrodi. Il suo rischio di estinzione è critico.
                    </p>
                    <div className="bg-stone-950/50 border border-stone-600 p-3 rounded-lg mt-4">
                      <span className="block text-xs font-bold text-emerald-500 mb-1">💡 APPUNTO DEL BIOLOGO:</span>
                      <span className="text-sm text-stone-300">Il pericolo numero uno non è il clima, ma i maiali allo stato brado e i cinghiali. Praticando il rooting (il grufolamento, ovvero l'arare profondamente il suolo con il muso per cercare radici da mangiare), rivoltano la terra e distruggono le ultime 'stazioni' di crescita della Petagnaea. L'unica barriera fisica in grado di salvare questi fiori millenari è l'installazione di recinzioni rinforzate.</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-6xl mb-4">🥀</div>
                    <h3 className="text-xl font-bold text-red-500 mb-2">SPECIE ESTINTA</h3>
                    <p className="text-stone-400">Habitat distrutto a causa del calpestio dei suidi. Specie non più studiabile.</p>
                  </div>
                )
              )}

              {/* EMYS */}
              {activeBioSheet === 'emys' && (
                emysViva ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-black text-emerald-400 italic">Emys trinacris</span>
                      <span className="text-xs font-bold px-2 py-1 bg-emerald-900/50 text-emerald-400 border border-emerald-500 rounded-full">COD. 5370</span>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Emys_trinacris_geloi_wetland.jpg/1280px-Emys_trinacris_geloi_wetland.jpg" alt="Emys trinacris" className="w-full h-48 object-cover rounded-xl border-2 border-stone-700 shadow-md" />
                    <p className="text-stone-300 text-sm leading-relaxed">
                      La Emys trinacris è una piccola testuggine palustre endemica: un rettile unico al mondo che vive esclusivamente in Sicilia. È una specie timida e schiva, che ama crogiolarsi al sole sulle rocce per poi tuffarsi nei laghetti e nei fiumi a lento scorrimento al minimo segnale di pericolo.
                    </p>
                    <div className="bg-stone-950/50 border border-stone-600 p-3 rounded-lg mt-4">
                      <span className="block text-xs font-bold text-emerald-500 mb-1">💡 APPUNTO DEL BIOLOGO:</span>
                      <span className="text-sm text-stone-300">Il pericolo maggiore è invisibile dalla superficie. I bracconieri calano sul fondo le 'nasse', trappole a rete sommerse usate per la pesca illegale. Poiché questa testuggine ha i polmoni e ha bisogno di emergere per respirare, se entra nella nassa per mangiare l'esca è condannata ad annegare. Finanziare pattugliamenti severi per sequestrare queste trappole è l'unico modo per evitare una strage silenziosa.</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-6xl mb-4">🦴</div>
                    <h3 className="text-xl font-bold text-red-500 mb-2">POPOLAZIONE PERSA</h3>
                    <p className="text-stone-400">Esemplari catturati illegalmente. Scheda biologica chiusa.</p>
                  </div>
                )
              )}

              {/* EUPLAGIA */}
              {activeBioSheet === 'euplagia' && (
                euplagiaViva ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-black text-emerald-400 italic">Euplagia quadripunctaria</span>
                      <span className="text-xs font-bold px-2 py-1 bg-emerald-900/50 text-emerald-400 border border-emerald-500 rounded-full">COD. 6199</span>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Russischer_B%C3%A4r_%28Euplagia_quadripunctaria%29-20180805-RM-112757.jpg/1280px-Russischer_B%C3%A4r_%28Euplagia_quadripunctaria%29-20180805-RM-112757.jpg" alt="Euplagia" className="w-full h-48 object-cover rounded-xl border-2 border-stone-700 shadow-md" />
                    <p className="text-stone-300 text-sm leading-relaxed">
                      Conosciuta da tutti come 'Falena dell'Edera', questo splendido insetto è un importantissimo indicatore biologico: la sua sola presenza ci garantisce che il corso d'acqua è incontaminato e che la fascia verde lungo le sponde (l'ambiente ripariale) gode di ottima salute.
                    </p>
                    <div className="bg-stone-950/50 border border-stone-600 p-3 rounded-lg mt-4">
                      <span className="block text-xs font-bold text-emerald-500 mb-1">💡 APPUNTO DEL BIOLOGO:</span>
                      <span className="text-sm text-stone-300">Le macchine pesanti sono il suo peggior nemico. Qualsiasi scavo aggressivo con le ruspe sugli argini raderebbe al suolo i cespugli in cui vive e si riproduce. Per mantenere i fiumi sicuri e proteggere la falena, è obbligatorio finanziare squadre specializzate che eseguano solo tagli manuali e 'selettivi', rimuovendo i rami morti e lasciando intatte le piante vive.</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-6xl mb-4">🌪️</div>
                    <h3 className="text-xl font-bold text-red-500 mb-2">HABITAT DISTRUTTO</h3>
                    <p className="text-stone-400">Specie sradicata da interventi meccanici invasivi sugli argini.</p>
                  </div>
                )
              )}

              {/* RHINOLOPHUS */}
              {activeBioSheet === 'rhinolophus' && (
                rhinolophusVivo ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-black text-emerald-400 italic">Rhinolophus f.</span>
                      <span className="text-xs font-bold px-2 py-1 bg-emerald-900/50 text-emerald-400 border border-emerald-500 rounded-full">COD. 1304</span>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Gro%C3%9Fe_Hufeisennase_%28Rhinolophus_ferrumequinum%29_1.jpg/1280px-Gro%C3%9Fe_Hufeisennase_%28Rhinolophus_ferrumequinum%29_1.jpg" alt="Rhinolophus" className="w-full h-48 object-cover rounded-xl border-2 border-stone-700 shadow-md" />
                    <p className="text-stone-300 text-sm leading-relaxed">
                      Il grande pipistrello conosciuto come 'Ferro di cavallo maggiore' è in drammatico declino in tutta Europa. Ha un bisogno vitale di grotte naturali nel buio più assoluto e lontane da ogni disturbo per formare le sue colonie riproduttive: dei veri e propri 'asili nido' sicuri dove le madri partoriscono e allattano i piccoli.
                    </p>
                    <div className="bg-stone-950/50 border border-stone-600 p-3 rounded-lg mt-4">
                      <span className="block text-xs font-bold text-emerald-500 mb-1">💡 APPUNTO DEL BIOLOGO:</span>
                      <span className="text-sm text-stone-300">Questa specie ha il terrore della luce e del caos. Anche una singola visita turistica con faretti e schiamazzi è sufficiente a terrorizzare gli adulti, causando l'abbandono immediato della grotta e la conseguente perdita di un'intera generazione di cuccioli. Mantenere l'area chiusa al pubblico è un imperativo</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-6xl mb-4">🚫</div>
                    <h3 className="text-xl font-bold text-red-500 mb-2">COLONIA FUGGITA</h3>
                    <p className="text-stone-400">Disturbo antropico intollerabile. Grotte abbandonate.</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Daily Report Modal */}
      {dailyReport && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-800 bg-slate-800/50">
              <h2 className="text-2xl font-bold text-blue-400 tracking-wide uppercase text-center">Report Giornaliero</h2>
            </div>
            
            <div className="p-6">
              <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                {dailyReport.text}
              </p>

              <div className="bg-slate-950/50 rounded-xl p-4 mb-8 border border-slate-800">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Impatti:</h3>
                <ul className="space-y-3">
                  {dailyReport.impacts.map((impact, idx) => {
                    const isPositive = impact.includes('+');
                    const isNegative = impact.includes('-') && !impact.includes('Gratuito');
                    
                    let textColor = 'text-slate-300';
                    if (isPositive) textColor = 'text-emerald-400';
                    if (isNegative) textColor = 'text-red-400';
                    if (impact.includes('distrutta') || impact.includes('perse')) textColor = 'text-red-500 font-bold';

                    return (
                      <li key={idx} className={`flex items-start gap-2 ${textColor} text-base`}>
                        <span>{impact}</span>
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
                  <><span className="text-xl">➡️</span> CONTINUA... (Passa al Giorno 5)</>
                ) : giornoCorrente === 6 ? (
                  <><span className="text-xl">💤</span> VAI A DORMIRE (Passa all&apos;Ultimo Giorno)</>
                ) : giornoCorrente === 7 ? (
                  <><span className="text-xl">📊</span> VAI ALLA VALUTAZIONE FINALE</>
                ) : (
                  <><span className="text-xl">💤</span> VAI A DORMIRE (Passa al Giorno {giornoCorrente + 1})</>
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
                  <div className="text-stone-400 text-sm font-bold tracking-wider uppercase mb-2">Salute Finale</div>
                  <div className={`text-4xl font-black ${ecosistemaSalute >= 50 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {ecosistemaSalute}%
                  </div>
                </div>
                <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700 text-center">
                  <div className="text-stone-400 text-sm font-bold tracking-wider uppercase mb-2">Budget Residuo</div>
                  <div className={`text-4xl font-black ${budget >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatCurrency(budget)}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowDebriefing(true)}
                className="w-full bg-stone-700 hover:bg-stone-600 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">📂</span> APRI DOSSIER SCIENTIFICO
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
                <span>📂</span> DOSSIER SCIENTIFICO
              </h1>
              <p className="text-stone-400 mt-2">Rapporto finale sullo stato di conservazione degli habitat e delle specie (Direttiva Habitat 92/43/CEE).</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Petagnaea */}
                <div className={`p-5 rounded-2xl border ${petagnaeaViva ? 'bg-emerald-900/20 border-emerald-800/50' : 'bg-red-900/20 border-red-800/50'}`}>
                  <div className="font-bold text-white mb-2 flex items-center justify-between">
                    <span>🌱 Petagnaea gussonei</span>
                    {petagnaeaViva ? <span className="text-emerald-400 text-sm px-2 py-1 bg-emerald-900/50 rounded-full">SALVA</span> : <span className="text-red-400 text-sm px-2 py-1 bg-red-900/50 rounded-full">ESTINTA</span>}
                  </div>
                  <p className={`text-sm ${petagnaeaViva ? 'text-emerald-200/70' : 'text-red-200/70'}`}>
                    {petagnaeaViva ? 'Misura IA applicata, Pressione PA07 mitigata' : 'Fallimento gestione PA07, distrutta dai suidi'}
                  </p>
                </div>

                {/* Emys */}
                <div className={`p-5 rounded-2xl border ${emysViva ? 'bg-emerald-900/20 border-emerald-800/50' : 'bg-red-900/20 border-red-800/50'}`}>
                  <div className="font-bold text-white mb-2 flex items-center justify-between">
                    <span>🐢 Emys trinacris</span>
                    {emysViva ? <span className="text-emerald-400 text-sm px-2 py-1 bg-emerald-900/50 rounded-full">SALVA</span> : <span className="text-red-400 text-sm px-2 py-1 bg-red-900/50 rounded-full">SCOMPARSA</span>}
                  </div>
                  <p className={`text-sm ${emysViva ? 'text-emerald-200/70' : 'text-red-200/70'}`}>
                    {emysViva ? 'Pressione PG10 bracconaggio contrastata' : 'Pressione PG10 sottovalutata, esemplari prelevati'}
                  </p>
                </div>

                {/* Euplagia */}
                <div className={`p-5 rounded-2xl border ${euplagiaViva ? 'bg-emerald-900/20 border-emerald-800/50' : 'bg-red-900/20 border-red-800/50'}`}>
                  <div className="font-bold text-white mb-2 flex items-center justify-between">
                    <span>🦋 Euplagia quadripunctaria</span>
                    {euplagiaViva ? <span className="text-emerald-400 text-sm px-2 py-1 bg-emerald-900/50 rounded-full">PRESENTE</span> : <span className="text-red-400 text-sm px-2 py-1 bg-red-900/50 rounded-full">PERSA</span>}
                  </div>
                  <p className={`text-sm ${euplagiaViva ? 'text-emerald-200/70' : 'text-red-200/70'}`}>
                    {euplagiaViva ? 'Habitat ripariale preservato' : 'Pressione PA05 introdotta con sfalcio meccanico'}
                  </p>
                </div>

                {/* Rhinolophus */}
                <div className={`p-5 rounded-2xl border ${rhinolophusVivo ? 'bg-emerald-900/20 border-emerald-800/50' : 'bg-red-900/20 border-red-800/50'}`}>
                  <div className="font-bold text-white mb-2 flex items-center justify-between">
                    <span>🦇 Rhinolophus f.</span>
                    {rhinolophusVivo ? <span className="text-emerald-400 text-sm px-2 py-1 bg-emerald-900/50 rounded-full">PROTETTO</span> : <span className="text-red-400 text-sm px-2 py-1 bg-red-900/50 rounded-full">FUGGITO</span>}
                  </div>
                  <p className={`text-sm ${rhinolophusVivo ? 'text-emerald-200/70' : 'text-red-200/70'}`}>
                    {rhinolophusVivo ? 'Pressione PF05 prevenuta, evitato disturbo' : 'Priorità al profitto economico, disturbo incompatibile'}
                  </p>
                </div>
              </div>

              <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700 mt-6">
                <div className="text-stone-400 text-sm font-bold tracking-wider uppercase mb-2">Valutazione Gestionale</div>
                <div className="text-2xl font-bold text-white">
                  {budget < 0 ? 'ECONOMISTA PESSIMO' : ecosistemaSalute < 50 ? 'DISATTENTO' : ecosistemaSalute >= 90 ? 'ECCELLENTE (Gestione Magistrale)' : 'BUONO (Bilanciamento corretto)'}
                </div>
              </div>

              <button 
                onClick={resetGame}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all duration-200 mt-8 flex items-center justify-center gap-2"
              >
                <span className="text-xl">🔄</span> RIGIOCA DALL&apos;INIZIO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Overlay */}
      {!gameStarted && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[95vh]">
            <div className="p-8 md:p-10 overflow-y-auto">
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-500 mb-3 tracking-tight">CUSTODI DEL FLASCIO</h1>
                <p className="text-lg md:text-xl text-emerald-200/80 font-medium">Simulatore Gestionale sulla Biodiversità di Natura 2000 (ITA070007)</p>
              </div>
              
              <p className="text-stone-300 text-lg leading-relaxed mb-10 text-center max-w-3xl mx-auto">
                Benvenuto nel cuore del Parco dei Nebrodi. Sei stato nominato Coordinatore del sito in una settimana critica. Il tuo compito non è solo amministrare, ma garantire la vita nel Bosco del Flascio.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Card 1 */}
                <div className="bg-stone-800/60 border border-stone-700 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-stone-700 pb-3">
                    <Heart className="w-6 h-6 text-emerald-400" />
                    I Tuoi Parametri Vitali
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-2xl mt-1">💰</span>
                      <div>
                        <strong className="text-yellow-400 text-lg block mb-1">Budget (€ 35.000)</strong>
                        <span className="text-stone-400 text-sm leading-relaxed block">I fondi pubblici sono limitati. Ogni intervento ha un costo. Se vai in rosso hai perso.</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-2xl mt-1">🌲</span>
                      <div>
                        <strong className="text-emerald-400 text-lg block mb-1">Salute Bosco</strong>
                        <span className="text-stone-400 text-sm leading-relaxed block">Indica la resilienza dell&apos;ecosistema. Se crolla, il parco muore.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Card 2 */}
                <div className="bg-stone-800/60 border border-stone-700 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3 border-b border-stone-700 pb-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    Obiettivo Prioritario: Biodiversità
                  </h3>
                  <p className="text-sm text-stone-300 mb-5 leading-relaxed">
                    Oltre ai numeri, hai sotto la tua custodia 4 specie protette dall&apos;UE. <strong className="text-red-400 block mt-2">⚠️ ATTENZIONE: Se un&apos;icona si spegne, la specie è estinta.</strong>
                  </p>
                  <ul className="space-y-4 text-sm">
                    <li className="flex gap-3 items-start">
                      <span className="text-lg mt-0.5">🌸</span>
                      <span className="text-stone-300 leading-relaxed"><strong className="text-white">Petagnaea gussonei:</strong> Rarissima pianta a rischio critico, si trova solo in Sicilia!</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-lg mt-0.5">🐢</span>
                      <span className="text-stone-300 leading-relaxed"><strong className="text-white">Emys trinacris:</strong> La testuggine palustre siciliana, minacciata dal bracconaggio.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-lg mt-0.5">🦋</span>
                      <span className="text-stone-300 leading-relaxed"><strong className="text-white">Euplagia quadripunctaria:</strong> La Falena dell&apos;Edera, indicatore della salute dei fiumi.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-lg mt-0.5">🦇</span>
                      <span className="text-stone-300 leading-relaxed"><strong className="text-white">Rhinolophus ferrumequinum:</strong> Pipistrello raro e sensibile che vive nelle grotte buie.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => setGameStarted(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg md:text-xl py-4 px-10 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all duration-200"
                >
                  INIZIA LA SETTIMANA (Giorno 1)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
