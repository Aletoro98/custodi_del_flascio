'use client';

import { useState } from 'react';
import { Coins, Heart, Calendar, X, AlertTriangle, Info } from 'lucide-react';

export default function Game() {
  const [giornoCorrente, setGiornoCorrente] = useState(1);
  const [budget, setBudget] = useState(35000);
  const [ecosistemaSalute, setEcosistemaSalute] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showDebriefing, setShowDebriefing] = useState(false);

  // Biodiversity State
  const [petagnaeaViva, setPetagnaeaViva] = useState(true);
  const [emysViva, setEmysViva] = useState(true);
  const [euplagiaViva, setEuplagiaViva] = useState(true);
  const [rhinolophusVivo, setRhinolophusVivo] = useState(true);
  const [activeBioInfo, setActiveBioInfo] = useState<string | null>(null);

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
        text: "Hai scelto la via del risparmio. I maiali sono scappati sul momento, ma sono tornati la notte stessa. Le stazioni di Petagnaea sono state devastate dal calpestio. La popolazione è compromessa.",
        impacts: [
          "🥀 Biodiversità: Petagnaea distrutta!",
          "📉 Salute Bosco: -5%",
          "💰 Budget: - € 0 (Gratuito)"
        ]
      });
    } else if (choiceId === 2) {
      setBudget(prev => prev - 12000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 5)));
      setPetagnaeaViva(true);
      setDailyReport({
        text: "Hai costruito le recinzioni come previsto dalle Misure di Conservazione. La Petagnaea è al sicuro per sempre. Hai investito una somma importante, ma necessaria.",
        impacts: [
          "📈 Salute Bosco: +5%",
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
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 5)));
      setEmysViva(true);
      setDailyReport({
        text: "Le guardie hanno presidiato le sponde tutta la notte. Sono state sequestrate tre trappole e salvati due esemplari di Emys. Ottimo lavoro.",
        impacts: [
          "📈 Salute Bosco: +5%",
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
        text: "Le ruspe hanno rasato tutto a zero. L'acqua scorrerà veloce, ma hai distrutto il corridoio ecologico. Non si vedono più farfalle in volo. La biodiversità ha subito un duro colpo.",
        impacts: [
          "📉 Salute Bosco: -10% (Habitat perso)"
        ]
      });
    } else if (choiceId === 2) {
      setBudget(prev => prev - 4000);
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 8)));
      setEuplagiaViva(true);
      setDailyReport({
        text: "Hai vietato le ruspe e pagato squadre di operai per tagliare solo il secco a mano. La vegetazione ripariale è intatta. Di sera, osservi centinaia di Euplagia volare tra le foglie. Un successo per Natura 2000!",
        impacts: [
          "🦋 Biodiversità: Habitat salvato!",
          "📈 Salute Bosco: +8%",
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
        text: `Hai accompagnato l'ispettore nei luoghi più impervi. Avete avvistato tracce fresche di gatto selvatico e fotografato ${petagnaeaViva ? "la fioritura della Petagnaea" : "i maestosi alberi secolari del bosco"}. L'ispettore è rimasto colpito. Il finanziamento è approvato!`,
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
      setEcosistemaSalute(prev => Math.min(100, Math.max(0, prev + 2)));
      setDailyReport({
        text: "Hai schierato le pattuglie a ogni varco. Nessuno è entrato. Il bosco è rimasto silenzioso e incontaminato. È stata una scelta impopolare e costosa, ma necessaria per la tutela integrale.",
        impacts: [
          "📈 Salute Bosco: +2%",
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
        text: "Hai installato i faretti. I turisti sono entusiasti e pagano il biglietto. Ma stasera, il sonar non rileva nessun segnale ultrasonico. La colonia di Rhinolophus, spaventata dalle luci, ha abbandonato il sito per sempre.",
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
        text: "Hai installato una cancellata speciale che permette il passaggio dei pipistrelli ma non delle persone. Hai spento ogni luce. Al tramonto, vedi i ferri di cavallo uscire a caccia. Il sito è sicuro.",
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
    } else if (ecosistemaSalute < 40) {
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
    } else if (ecosistemaSalute >= 75 && emysViva && euplagiaViva && rhinolophusVivo) {
      return {
        title: "🏆 VITTORIA: CUSTODE DEL FLASCIO",
        text: "Risultato perfetto! Hai difeso la natura contro ogni minaccia. Tutte le specie prosperano.",
        color: "text-emerald-400"
      };
    } else if (ecosistemaSalute >= 40 && (!emysViva || !euplagiaViva || !rhinolophusVivo)) {
      return {
        title: "📉 VITTORIA AMARA",
        text: "Il bosco è vivo, ma il prezzo pagato in termini di biodiversità è alto. Hai perso alcune specie secondarie. Il parco è più povero e silenzioso.",
        color: "text-yellow-400"
      };
    } else {
      return {
        title: "😐 VITTORIA OPERATIVA",
        text: "Il parco è sopravvissuto. Hai dovuto fare compromessi, ma l'ecosistema regge e le specie protette sono salve. Serviranno più fondi in futuro.",
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
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans flex flex-col">
      {/* Header / HUD */}
      <header className="bg-stone-800 p-4 shadow-md flex flex-col gap-4 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-emerald-400">ARPA - Bosco del Flascio</h1>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-stone-700 px-3 py-1.5 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="font-mono font-medium uppercase">Giorno {giornoCorrente} di 7</span>
            </div>
            <div className={`flex items-center gap-2 bg-stone-700 px-3 py-1.5 rounded-lg ${budget < 0 ? 'text-red-500' : ''}`}>
              <Coins className={`w-5 h-5 ${budget < 0 ? 'text-red-500' : 'text-yellow-400'}`} />
              <span className="font-mono font-medium">{formatCurrency(budget)}</span>
            </div>
            <div className={`flex items-center gap-2 bg-stone-700 px-3 py-1.5 rounded-lg ${ecosistemaSalute < 40 ? 'text-red-500' : ''}`}>
              <Heart className={`w-5 h-5 ${ecosistemaSalute < 40 ? 'text-red-500' : 'text-red-400'}`} />
              <span className="font-mono font-medium">{ecosistemaSalute}%</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-700 px-3 py-1.5 rounded-lg">
              <span className="font-medium text-sm">
                {budget < 21000 ? '⚠️ Fondi in esaurimento!' : '✅ Gestione operativa'}
              </span>
            </div>
          </div>
        </div>

        {/* Biodiversity Panel */}
        <div className="flex items-center gap-4 bg-stone-900/50 p-2 rounded-lg border border-stone-700">
          <span className="text-sm font-semibold text-stone-400 uppercase tracking-wider">Biodiversità Protetta:</span>
          <div className="flex gap-3">
            <button 
              onClick={() => setActiveBioInfo(petagnaeaViva ? 'Petagnaea gussonei - Rarissima pianta endemica' : 'Petagnaea gussonei - Estinta in questa zona')}
              className="text-3xl hover:scale-110 transition-transform"
              title="Petagnaea gussonei"
            >
              {petagnaeaViva ? '🌸' : '🥀'}
            </button>
            <button 
              onClick={() => setActiveBioInfo(emysViva ? 'Emys trinacris - Testuggine palustre siciliana' : 'Emys trinacris - Estinta in questa zona')}
              className="text-3xl hover:scale-110 transition-transform"
              title="Emys trinacris"
            >
              {emysViva ? '🐢' : '🦴'}
            </button>
            <button 
              onClick={() => setActiveBioInfo(euplagiaViva ? 'Euplagia quadripunctaria - Falena dell\'Edera' : 'Euplagia quadripunctaria - Estinta in questa zona')}
              className="text-3xl hover:scale-110 transition-transform"
              title="Euplagia quadripunctaria"
            >
              {euplagiaViva ? '🦋' : '🌪️'}
            </button>
            <button 
              onClick={() => setActiveBioInfo(rhinolophusVivo ? 'Rhinolophus ferrumequinum - Pipistrello raro' : 'Rhinolophus ferrumequinum - Estinto in questa zona')}
              className="text-3xl hover:scale-110 transition-transform"
              title="Rhinolophus ferrumequinum"
            >
              {rhinolophusVivo ? '🦇' : '🚫'}
            </button>
          </div>
          {activeBioInfo && (
            <div className="ml-4 px-4 py-2 bg-stone-800 border border-stone-600 rounded-md text-sm text-stone-200 animate-in fade-in slide-in-from-left-2">
              {activeBioInfo}
            </div>
          )}
        </div>
      </header>

      {/* Main Game Area - Map */}
      <main className="flex-1 relative overflow-hidden bg-stone-950 flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-4 border-stone-800 bg-stone-900">
          {/* Map Background */}
          <img 
            src="https://i.postimg.cc/66kDhfq2/Mappa_Bosco.png" 
            alt="Mappa Bosco del Flascio" 
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Level 1: Static Species Tokens */}
          {petagnaeaViva && (
            <div className="absolute top-[45%] left-[55%] w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 transition-opacity">
              <img 
                src="https://i.postimg.cc/44Dr1Qy4/Token_Petagnaea_Scontornato.png" 
                alt="Petagnaea" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          )}
          {emysViva && (
            <div className="absolute top-[62%] left-[36%] w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 transition-opacity">
              <img 
                src="https://i.postimg.cc/cLqqhy16/Token_Tartaruga_Scontornato.png" 
                alt="Emys trinacris" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          )}
          {rhinolophusVivo && (
            <div className="absolute top-[21%] left-[12%] w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 transition-opacity">
              <img 
                src="https://i.postimg.cc/VkcQjFhG/Token_Pipistrello_Scontornata.png" 
                alt="Rhinolophus ferrumequinum" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          )}
          {euplagiaViva && (
            <div className="absolute top-[25%] left-[68%] w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 transition-opacity">
              <img 
                src="https://i.postimg.cc/vTgFv2Mv/Token_Farfalla_Scontornata.png" 
                alt="Euplagia quadripunctaria" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          )}

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
              className="absolute top-[21%] left-[18%] w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-bounce hover:scale-110 transition-transform"
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
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
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
                  <div className="text-sm text-stone-400 mb-2">I cinghiali torneranno. Rischio estinzione Petagnaea.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-stone-400"><Coins className="w-4 h-4"/> Gratuito</span>
                    <span className="flex items-center gap-1 text-red-400"><Heart className="w-4 h-4"/> -5%</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleChoiceDay1(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Costruisci recinzioni rinforzate</div>
                  <div className="text-sm text-stone-400 mb-2">Messa in sicurezza definitiva della Petagnaea.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-yellow-400"><Coins className="w-4 h-4"/> -€ 12.000</span>
                    <span className="flex items-center gap-1 text-emerald-400"><Heart className="w-4 h-4"/> +5%</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Day 2 Event */}
      {isModalOpen && giornoCorrente === 2 && gameStarted && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
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
                  <div className="text-sm text-stone-400 mb-2">I bracconieri agiranno indisturbati. Rischio estinzione Emys.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-stone-400"><Coins className="w-4 h-4"/> Gratuito</span>
                    <span className="flex items-center gap-1 text-red-400"><Heart className="w-4 h-4"/> -5%</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleChoiceDay2(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Finanzia pattugliamenti notturni</div>
                  <div className="text-sm text-stone-400 mb-2">Le guardie sequestreranno le trappole e salveranno le testuggini.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-yellow-400"><Coins className="w-4 h-4"/> -€ 2.000</span>
                    <span className="flex items-center gap-1 text-emerald-400"><Heart className="w-4 h-4"/> +5%</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Day 3 Event */}
      {isModalOpen && giornoCorrente === 3 && gameStarted && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
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
                Sei lungo il torrente. È il periodo di volo dell&apos;<span className="text-emerald-400 font-semibold italic">Euplagia quadripunctaria</span> (Falena dell&apos;Edera), protetta dalla Direttiva Habitat. Gli ingegneri ti chiedono di &quot;ripulire&quot; gli argini con le ruspe. Quei rovi però sono l&apos;habitat essenziale per la falena.
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay3(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Autorizza la pulizia totale</div>
                  <div className="text-sm text-stone-400 mb-2">L&apos;acqua scorrerà veloce, ma distruggerai il corridoio ecologico.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-stone-400"><Coins className="w-4 h-4"/> Gratuito</span>
                    <span className="flex items-center gap-1 text-red-400"><Heart className="w-4 h-4"/> -10%</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleChoiceDay3(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Imponi il taglio selettivo manuale</div>
                  <div className="text-sm text-stone-400 mb-2">La vegetazione ripariale rimarrà intatta.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-yellow-400"><Coins className="w-4 h-4"/> -€ 4.000</span>
                    <span className="flex items-center gap-1 text-emerald-400"><Heart className="w-4 h-4"/> +8%</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Day 4 Event */}
      {isModalOpen && giornoCorrente === 4 && gameStarted && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
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
                Oggi è una giornata decisiva. Un ispettore della Commissione Europea è venuto a valutare lo stato di conservazione del sito. Se il report sarà positivo, il Parco riceverà i Fondi Strutturali.
              </p>
              {budget < 21000 ? (
                <p className="text-orange-400 mt-2 mb-6 font-medium">Le casse del parco si stanno svuotando. Convincere l&apos;ispettore è l&apos;unico modo per ottenere la liquidità necessaria per le emergenze.</p>
              ) : (
                <p className="text-emerald-400 mt-2 mb-6 font-medium">Hai ancora fondi, ma ottenere questo finanziamento garantirebbe la sicurezza economica del parco a lungo termine.</p>
              )}

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay4(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Organizza un monitoraggio sul campo</div>
                  <div className="text-sm text-stone-400 mb-2">Mostra all&apos;ispettore la vera natura del parco.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-yellow-400"><Coins className="w-4 h-4"/> -€ 500</span>
                    <span className="flex items-center gap-1 text-stone-400"><Heart className="w-4 h-4"/> Invariata</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleChoiceDay4(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-stone-300 transition-colors">Affidati ai vecchi dati d&apos;ufficio</div>
                  <div className="text-sm text-stone-400 mb-2">Rimani in sede e mostra le scartoffie.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-stone-400"><Coins className="w-4 h-4"/> Gratuito</span>
                    <span className="flex items-center gap-1 text-stone-400"><Heart className="w-4 h-4"/> Invariata</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Day 5 Event */}
      {isModalOpen && giornoCorrente === 5 && gameStarted && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
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
                È la settimana di Ferragosto. La pressione antropica è al massimo. Migliaia di turisti premono per entrare nelle Zone A (Riserva Integrale) per fare picnic e bagni nel fiume. Hai un dilemma: aprire i cancelli a pagamento per fare cassa, o mantenere il blocco per proteggere la natura pagando gli straordinari ai ranger?
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay5(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Consenti l&apos;accesso con ticket</div>
                  <div className="text-sm text-stone-400 mb-2">Fai cassa ma sacrifichi un po&apos; di natura.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-emerald-400"><Coins className="w-4 h-4"/> +€ 3.000</span>
                    <span className="flex items-center gap-1 text-red-400"><Heart className="w-4 h-4"/> -5%</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleChoiceDay5(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Blocco Totale e sorveglianza</div>
                  <div className="text-sm text-stone-400 mb-2">Proteggi la natura a costo di pagare gli straordinari.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-yellow-400"><Coins className="w-4 h-4"/> -€ 1.000</span>
                    <span className="flex items-center gap-1 text-emerald-400"><Heart className="w-4 h-4"/> +2%</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Day 6 Event */}
      {isModalOpen && giornoCorrente === 6 && gameStarted && !isGameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
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
                Ti trovi all&apos;ingresso di una vecchia grotta naturale. I monitoraggi confermano che è un rifugio del Rhinolophus ferrumequinum (Ferro di Cavallo Maggiore). Un&apos;associazione locale vorrebbe illuminare la grotta per fare cassa, ma i pipistrelli abbandonano i rifugi se c&apos;è luce o rumore.
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleChoiceDay6(1)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Autorizza le visite turistiche</div>
                  <div className="text-sm text-stone-400 mb-2">Fai cassa ma metti a rischio la colonia.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-emerald-400"><Coins className="w-4 h-4"/> +€ 2.000</span>
                    <span className="flex items-center gap-1 text-red-400"><Heart className="w-4 h-4"/> -15%</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleChoiceDay6(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Chiudi la grotta</div>
                  <div className="text-sm text-stone-400 mb-2">Proteggi i pipistrelli con una cancellata speciale.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-yellow-400"><Coins className="w-4 h-4"/> -€ 3.000</span>
                    <span className="flex items-center gap-1 text-emerald-400"><Heart className="w-4 h-4"/> +10%</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Day 7 Event */}
      {isModalOpen && giornoCorrente === 7 && gameStarted && !isGameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
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
                  <div className="text-sm text-stone-400 mb-2">Intervento aereo massiccio e immediato.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-red-400"><Coins className="w-4 h-4"/> -€ 20.000</span>
                    <span className="flex items-center gap-1 text-yellow-400"><Heart className="w-4 h-4"/> -2%</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleChoiceDay7(2)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">Manda le squadre di terra</div>
                  <div className="text-sm text-stone-400 mb-2">Intervento manuale, più lento e rischioso.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-yellow-400"><Coins className="w-4 h-4"/> -€ 5.000</span>
                    <span className="flex items-center gap-1 text-red-400"><Heart className="w-4 h-4"/> -15%</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleChoiceDay7(3)}
                  className="w-full text-left p-4 rounded-xl border border-stone-600 bg-stone-700/50 hover:bg-stone-700 hover:border-stone-500 transition-all group"
                >
                  <div className="font-semibold text-white mb-1 group-hover:text-red-500 transition-colors">Non fare nulla</div>
                  <div className="text-sm text-stone-400 mb-2">Lascia che il fuoco faccia il suo corso.</div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-stone-400"><Coins className="w-4 h-4"/> Gratis</span>
                    <span className="flex items-center gap-1 text-red-500"><Heart className="w-4 h-4"/> -50%</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Report Modal */}
      {dailyReport && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
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
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto">
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
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto">
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
                  {budget < 0 ? 'ECONOMISTA PESSIMO' : ecosistemaSalute < 40 ? 'DISATTENTO' : 'EQUILIBRATO (Bilanciamento corretto)'}
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
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
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
