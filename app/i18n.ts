// app/i18n.ts
// Tutti i testi del gioco, in italiano e in inglese.
// Per correggere o modificare un testo basta cambiarlo qui: page.tsx legge da questo file.
//
// Mini-formattazione usata nei testi degli eventi:
//   *testo*   -> nome scientifico evidenziato (verde, corsivo)
//   **testo** -> parola chiave evidenziata (grassetto chiaro)

export type Lang = 'it' | 'en';

export const LANG_STORAGE_KEY = 'cdf-lang';

// Colore di ogni riga "Impatti" nel Report Giornaliero.
export type ImpactTone = 'positive' | 'negative' | 'critical' | 'neutral';
export type Impact = { text: string; tone: ImpactTone };

export type ReportKey =
  | '1-1' | '1-2'
  | '2-1' | '2-2'
  | '3-1' | '3-2'
  | '4-1' | '4-2'
  | '5-1' | '5-2'
  | '6-1' | '6-2'
  | '7-1' | '7-2' | '7-3';

export type ReportEntry = {
  // Il Giorno 4 cambia testo in base allo stato della Petagnaea, quindi il testo può essere una funzione.
  text: string | ((ctx: { petagnaeaViva: boolean }) => string);
  impacts: Impact[];
};

export type SpeciesKey = 'petagnaea' | 'emys' | 'euplagia' | 'rhinolophus';

type Choice = { title: string; desc: string };
type GameEvent = { title: string; intro: string; choices: Choice[] };
type Ending = { title: string; text: string };

export type Dict = {
  locale: string; // formato di numeri e valuta
  toggle: { label: string; title: string }; // bandierina: mostra la lingua in cui si passa
  rotate: { title: string; text: string };
  hudBio: Record<SpeciesKey, { alive: string; dead: string }>;
  tutorial: {
    skip: string; next: string; start: string;
    step1Title: string; step1Text: string;
    step2Title: string; step2Text: string;
    step3Title: string; step3Text: string;
  };
  map: {
    alt: string;
    tokens: { suidi: string; nasse: string; ruspa: string; valigetta: string; ferragosto: string; visite: string; fuoco: string };
    dayLabel: (n: number) => string;
    waiting: string;
  };
  eventTags: { emergency: string; opportunity: string; critical: string };
  events: {
    1: GameEvent; 2: GameEvent; 3: GameEvent;
    4: GameEvent & { lowBudget: string; okBudget: string };
    5: GameEvent; 6: GameEvent; 7: GameEvent;
  };
  bioSheet: {
    header: string;
    codeLabel: string; // etichetta prima del codice Natura 2000 della specie
    biologistNote: string;
    species: Record<SpeciesKey, { desc: string; note: string; deadTitle: string; deadText: string }>;
  };
  report: {
    header: string;
    impactsLabel: string;
    toDay5: string;
    toLastDay: string;
    toFinal: string;
    sleep: (nextDay: number) => string;
  };
  reports: Record<ReportKey, ReportEntry>;
  gameOver: {
    bankrupt: Ending;
    ecoDisaster: Ending & { petagnaeaSuffix: string };
    biodiversityLoss: Ending;
    victory: Ending;
    bitterVictory: Ending;
    operationalVictory: Ending;
    finalHealth: string;
    remainingBudget: string;
    openDossier: string;
  };
  debrief: {
    title: string;
    subtitle: string;
    species: Record<SpeciesKey, { ok: string; ko: string; okText: string; koText: string }>;
    evaluationLabel: string;
    evaluation: { bankrupt: string; careless: string; excellent: string; good: string };
    replay: string;
  };
  onboarding: {
    title: string;
    subtitle: string;
    intro: string;
    statsTitle: string;
    budgetLabel: string;
    budgetText: string;
    healthLabel: string;
    healthText: string;
    bioTitle: string;
    bioIntro: string;
    bioWarning: string;
    species: Record<SpeciesKey, string>;
    start: string;
  };
};

// ============================================================
// ITALIANO (testi originali)
// ============================================================
const it: Dict = {
  locale: 'it-IT',
  toggle: { label: 'EN', title: 'Switch to English' },
  rotate: {
    title: 'RUOTA IL TELEFONO',
    text: 'Per esplorare la mappa e giocare correttamente, ruota il dispositivo in orizzontale (Landscape).',
  },
  hudBio: {
    petagnaea: { alive: 'Petagnaea gussonei', dead: 'Petagnaea - Estinta' },
    emys: { alive: 'Emys trinacris', dead: 'Emys - Estinta' },
    euplagia: { alive: 'Euplagia quadripunctaria', dead: 'Euplagia - Estinta' },
    rhinolophus: { alive: 'Rhinolophus ferrumequinum', dead: 'Rhinolophus - Estinto' },
  },
  tutorial: {
    skip: 'Salta Tutorial ✖',
    next: 'Avanti ➔',
    start: 'Inizia a Giocare 🎮',
    step1Title: '1. La tua Plancia di Comando',
    step1Text: "Tieni d'occhio questi valori! Se i fondi (💶) o la salute dell'ecosistema (🌿) scendono a zero, la tua missione fallirà.",
    step2Title: '2. Esplora e Impara',
    step2Text: "Sulla mappa troverai icone fisse (come le info sulle specie). Toccale per aprire il Database ARPA e studiare l'ambiente prima di agire.",
    step3Title: '3. Affronta le Emergenze',
    step3Text: 'I gettoni rossi che rimbalzano sono le tue missioni attive. Toccali per prendere decisioni cruciali per la riserva.',
  },
  map: {
    alt: 'Mappa Bosco del Flascio',
    tokens: {
      suidi: 'Suidi',
      nasse: 'Nasse',
      ruspa: 'Ruspa',
      valigetta: 'Valigetta',
      ferragosto: 'Ferragosto',
      visite: 'Turisti con Torce',
      fuoco: 'Fuoco',
    },
    dayLabel: (n) => `Giorno ${n}`,
    waiting: 'In attesa dei prossimi eventi...',
  },
  eventTags: {
    emergency: 'Emergenza Rilevata',
    opportunity: 'Opportunità Burocratica',
    critical: 'Emergenza Critica',
  },
  events: {
    1: {
      title: "GIORNO 1: L'INVASIONE DEI SUIDI",
      intro: 'Il primo giorno al parco inizia con una emergenza: i ranger segnalano un branco di Suidi (maiali selvatici) che sta distruggendo le stazioni di *Petagnaea gussonei* (Habitat prioritario). Minaccia: PA07 (Pascolo intensivo).',
      choices: [
        { title: 'Manda una squadra a scacciarli', desc: 'Un intervento **gratuito** ma provvisorio. I cinghiali torneranno. Rischio estinzione Petagnaea.' },
        { title: 'Costruisci recinzioni rinforzate', desc: 'Messa in sicurezza definitiva della Petagnaea, ma richiederà un **investimento abbastanza alto**.' },
      ],
    },
    2: {
      title: 'GIORNO 2: ACQUE TORBIDE',
      intro: 'Ti svegli con una brutta notizia dal Lago del Flascio (Habitat 3150). Sono state trovate delle nasse illegali per catturare le Testuggini palustri (*Emys trinacris*). È bracconaggio (Pressione PG10).',
      choices: [
        { title: 'Ignora e risparmia i fondi', desc: '**Non spendi nulla**, ma i bracconieri agiranno indisturbati. Rischio estinzione Emys.' },
        { title: 'Finanzia pattugliamenti notturni', desc: 'Con una **spesa contenuta**, le guardie sequestreranno le trappole e salveranno le testuggini.' },
      ],
    },
    3: {
      title: 'GIORNO 3: LE ALI TIGRATE',
      intro: "Sei lungo il torrente. È il delicato periodo di volo dell'*Euplagia quadripunctaria* (la rara Falena dell'Edera), rigorosamente protetta dalla Direttiva Habitat, la massima legge europea per la difesa della biodiversità. Gli ingegneri premono per 'ripulire' gli argini con le ruspe. Per loro è solo erba da tagliare, ma quell'intrico di rovi è il rifugio vitale dove questa falena vive e si riproduce.",
      choices: [
        { title: 'Autorizza la pulizia totale', desc: "L'acqua scorrerà veloce e l'intervento è **a costo zero**, ma distruggerai il corridoio ecologico." },
        { title: 'Imponi il taglio selettivo manuale', desc: 'La vegetazione ripariale rimarrà intatta, ma i lavori manuali avranno un **costo moderato**.' },
      ],
    },
    4: {
      title: "GIORNO 4: L'ISPEZIONE EUROPEA",
      intro: "Oggi è una giornata decisiva. Un ispettore della Commissione Europea è venuto a valutare lo stato di conservazione del sito, cioè la reale salute della nostra biodiversità. Se il report sarà positivo, il Parco riceverà i Fondi Strutturali, i finanziamenti vitali per pagare le spese e continuare a proteggere l'area.",
      lowBudget: "Le casse del parco si stanno svuotando. Convincere l'ispettore è l'unico modo per ottenere i soldi necessari per le emergenze.",
      okBudget: 'Hai ancora fondi, ma ottenere questo finanziamento garantirebbe la sicurezza economica del parco a lungo termine.',
      choices: [
        { title: 'Organizza un monitoraggio sul campo', desc: "Mostra all'ispettore la vera natura del parco. Richiede una **piccola spesa logistica**." },
        { title: "Affidati ai vecchi dati d'ufficio", desc: 'Rimani in sede e mostra le scartoffie. **Non costa nulla**, ma rischi una bocciatura.' },
      ],
    },
    5: {
      title: 'GIORNO 5: FERRAGOSTO DI FUOCO',
      intro: "È la settimana di Ferragosto e l'assalto dei bagnanti è fuori controllo. Migliaia di turisti premono per invadere la Zona A, il cuore inviolabile della riserva dove l'accesso umano è severamente vietato, per fare picnic e bagni nel fiume. Hai un dilemma: chiudere un occhio e aprire i cancelli a pagamento per fare cassa, o schierare i ranger in straordinario per difendere la natura dalla folla?",
      choices: [
        { title: "Consenti l'accesso con ticket", desc: "Sacrifichi un po' di natura, ma ti garantisce un **ottimo incasso** per le casse dell'Ente." },
        { title: 'Blocco Totale e sorveglianza', desc: 'Proteggi la natura, ma dovrai affrontare una **piccola spesa extra** per pagare gli straordinari.' },
      ],
    },
    6: {
      title: 'GIORNO 6: OMBRE NELLA GROTTA',
      intro: "Ti trovi all'ingresso di una vecchia grotta naturale. I nostri sensori confermano che è il rifugio del Rhinolophus ferrumequinum, il raro pipistrello conosciuto come Ferro di Cavallo Maggiore. Un'associazione locale vorrebbe piazzare dei faretti per organizzare visite a pagamento, ma c'è un problema vitale: terrorizzati da luce e rumore, questi animali abbandonerebbero la grotta per sempre.",
      choices: [
        { title: 'Autorizza le visite turistiche', desc: "Metti a rischio la colonia, ma l'afflusso di turisti porterà un **buon guadagno**." },
        { title: 'Chiudi la grotta', desc: "Proteggi i pipistrelli con una cancellata speciale. L'installazione avrà un **costo significativo**." },
      ],
    },
    7: {
      title: "GIORNO 7: L'INFERNO",
      intro: "È l'ultimo giorno. Soffia un forte vento di scirocco. Dalla torretta avvistano fumo denso provenire dalla Faggeta (Habitat 9210). È un INCENDIO DOLOSO (Pressione PH04). Il fuoco avanza verso il cuore del parco. Devi agire subito.",
      choices: [
        { title: 'Chiama i Canadair', desc: 'Intervento aereo massiccio e immediato. È la soluzione migliore, ma ha un **costo esorbitante**.' },
        { title: 'Manda le squadre di terra', desc: 'Intervento manuale, più lento e rischioso. Richiede un **investimento medio**.' },
        { title: 'Non fare nulla', desc: "Aspetti la pioggia. **Non spendi nulla**, ma le conseguenze per l'ecosistema potrebbero essere disastrose." },
      ],
    },
  },
  bioSheet: {
    header: 'DATABASE NATURA 2000',
    codeLabel: 'COD.',
    biologistNote: '💡 APPUNTO DEL BIOLOGO:',
    species: {
      petagnaea: {
        desc: 'Questa pianta è un vero e proprio fossile vivente, un relitto botanico del Terziario: significa che sopravvive immutata da milioni di anni, da quando la Sicilia aveva un clima sub-tropicale. Oggi, sfuggita alle glaciazioni, riesce a crescere esclusivamente in pochissime e fragili zone umide vicine alle sorgenti dei Monti Nebrodi. Il suo rischio di estinzione è critico.',
        note: "Il pericolo numero uno non è il clima, ma i maiali allo stato brado e i cinghiali. Praticando il rooting (il grufolamento, ovvero l'arare profondamente il suolo con il muso per cercare radici da mangiare), rivoltano la terra e distruggono le ultime 'stazioni' di crescita della Petagnaea. L'unica barriera fisica in grado di salvare questi fiori millenari è l'installazione di recinzioni rinforzate.",
        deadTitle: 'SPECIE ESTINTA',
        deadText: 'Habitat distrutto a causa del calpestio dei suidi. Specie non più studiabile.',
      },
      emys: {
        desc: 'La Emys trinacris è una piccola testuggine palustre endemica: un rettile unico al mondo che vive esclusivamente in Sicilia. È una specie timida e schiva, che ama crogiolarsi al sole sulle rocce per poi tuffarsi nei laghetti e nei fiumi a lento scorrimento al minimo segnale di pericolo.',
        note: "Il pericolo maggiore è invisibile dalla superficie. I bracconieri calano sul fondo le 'nasse', trappole a rete sommerse usate per la pesca illegale. Poiché questa testuggine ha i polmoni e ha bisogno di emergere per respirare, se entra nella nassa per mangiare l'esca è condannata ad annegare. Finanziare pattugliamenti severi per sequestrare queste trappole è l'unico modo per evitare una strage silenziosa.",
        deadTitle: 'POPOLAZIONE PERSA',
        deadText: 'Esemplari catturati illegalmente. Scheda biologica chiusa.',
      },
      euplagia: {
        desc: "Conosciuta da tutti come 'Falena dell'Edera', questo splendido insetto è un importantissimo indicatore biologico: la sua sola presenza ci garantisce che il corso d'acqua è incontaminato e che la fascia verde lungo le sponde (l'ambiente ripariale) gode di ottima salute.",
        note: "Le macchine pesanti sono il suo peggior nemico. Qualsiasi scavo aggressivo con le ruspe sugli argini raderebbe al suolo i cespugli in cui vive e si riproduce. Per mantenere i fiumi sicuri e proteggere la falena, è obbligatorio finanziare squadre specializzate che eseguano solo tagli manuali e 'selettivi', rimuovendo i rami morti e lasciando intatte le piante vive.",
        deadTitle: 'HABITAT DISTRUTTO',
        deadText: 'Specie sradicata da interventi meccanici invasivi sugli argini.',
      },
      rhinolophus: {
        desc: "Il grande pipistrello conosciuto come 'Ferro di cavallo maggiore' è in drammatico declino in tutta Europa. Ha un bisogno vitale di grotte naturali nel buio più assoluto e lontane da ogni disturbo per formare le sue colonie riproduttive: dei veri e propri 'asili nido' sicuri dove le madri partoriscono e allattano i piccoli.",
        note: "Questa specie ha il terrore della luce e del caos. Anche una singola visita turistica con faretti e schiamazzi è sufficiente a terrorizzare gli adulti, causando l'abbandono immediato della grotta e la conseguente perdita di un'intera generazione di cuccioli. Mantenere l'area chiusa al pubblico è un imperativo",
        deadTitle: 'COLONIA FUGGITA',
        deadText: 'Disturbo antropico intollerabile. Grotte abbandonate.',
      },
    },
  },
  report: {
    header: 'Report Giornaliero',
    impactsLabel: 'Impatti:',
    toDay5: 'CONTINUA... (Passa al Giorno 5)',
    toLastDay: "VAI A DORMIRE (Passa all'Ultimo Giorno)",
    toFinal: 'VAI ALLA VALUTAZIONE FINALE',
    sleep: (n) => `VAI A DORMIRE (Passa al Giorno ${n})`,
  },
  reports: {
    '1-1': {
      text: 'Hai scelto la via del risparmio. I maiali sono scappati sul momento, ma sono tornati la notte stessa. Le stazioni di Petagnaea sono state devastate dal loro passaggio. La popolazione è compromessa.',
      impacts: [
        { text: '🥀 Biodiversità: Petagnaea distrutta!', tone: 'critical' },
        { text: '📉 Salute Bosco: -5%', tone: 'negative' },
        { text: '💰 Budget: - € 0 (Gratuito)', tone: 'neutral' },
      ],
    },
    '1-2': {
      text: 'Hai costruito le recinzioni come previsto dalle Misure di Conservazione. La Petagnaea è al sicuro per sempre. Hai investito una somma importante, ma necessaria.',
      impacts: [
        { text: '📈 Salute Bosco: +12%', tone: 'positive' },
        { text: '💸 Budget: - € 12.000', tone: 'negative' },
      ],
    },
    '2-1': {
      text: 'Non sei intervenuto. I bracconieri hanno svuotato le nasse indisturbati. La popolazione locale di Emys trinacris è stata decimata per il mercato nero.',
      impacts: [
        { text: '🦴 Biodiversità: Tartarughe perse!', tone: 'critical' },
        { text: '📉 Salute Bosco: -5%', tone: 'negative' },
        { text: '💰 Budget: - € 0 (Gratuito)', tone: 'neutral' },
      ],
    },
    '2-2': {
      text: 'Le guardie hanno presidiato le sponde tutta la notte. Sono state sequestrate tre trappole e salvati due esemplari di Emys. Ottimo lavoro.',
      impacts: [
        { text: '📈 Salute Bosco: +10%', tone: 'positive' },
        { text: '💸 Budget: - € 2.000', tone: 'negative' },
      ],
    },
    '3-1': {
      text: "Le ruspe hanno rasato tutto a zero. L'acqua scorrerà veloce, ma hai distrutto il corridoio ecologico, la 'strada verde' naturale che permetteva alla fauna di spostarsi e sopravvivere. Non si vedono più farfalle in volo. La biodiversità ha subito un duro colpo.",
      impacts: [
        { text: '📉 Salute Bosco: -10% (Habitat perso)', tone: 'negative' },
      ],
    },
    '3-2': {
      text: 'Hai vietato le ruspe e pagato squadre di operai per tagliare solo il secco a mano. La vegetazione ripariale, il fragile ecosistema che abbraccia il fiume, è intatta. Di sera, osservi centinaia di Euplagia volare tra le foglie. Un successo per Natura 2000!',
      impacts: [
        { text: '🦋 Biodiversità: Habitat salvato!', tone: 'neutral' },
        { text: '📈 Salute Bosco: +10%', tone: 'positive' },
        { text: '💸 Budget: - € 4.000 (Costo manodopera)', tone: 'negative' },
      ],
    },
    '4-1': {
      text: ({ petagnaeaViva }) =>
        `Hai accompagnato l'ispettore nei luoghi più affascinanti. Avete avvistato tracce fresche di gatto selvatico e fotografato ${petagnaeaViva ? 'la fioritura della Petagnaea' : 'i maestosi alberi secolari del bosco'}. L'ispettore è rimasto colpito. Il finanziamento è approvato!`,
      impacts: [
        { text: '🌸 Biodiversità: Valorizzata!', tone: 'neutral' },
        { text: '💰 Budget: + € 14.500 (Fondi UE sbloccati)', tone: 'positive' },
      ],
    },
    '4-2': {
      text: "Hai mostrato all'ispettore solo carte e mappe datate, rimanendo in sede. L'ispettore non ha trovato evidenze sufficienti dello stato di salute attuale degli habitat. La pratica di finanziamento è sospesa. Un'occasione sprecata.",
      impacts: [
        { text: '😐 Budget: Invariato (Nessun fondo extra)', tone: 'neutral' },
      ],
    },
    '5-1': {
      text: "Hai aperto i cancelli. I turisti hanno pagato il biglietto volentieri. Il budget respira, ma a fine giornata trovi rifiuti abbandonati e tracce di calpestio fuori dai sentieri. Hai venduto un po' di natura per sopravvivere economicamente.",
      impacts: [
        { text: '💰 Budget: + € 3.000 (Incasso Ticket)', tone: 'positive' },
        { text: '📉 Salute Bosco: -5%', tone: 'negative' },
      ],
    },
    '5-2': {
      text: 'Hai schierato le pattuglie a ogni varco. Nessuno è entrato. Il bosco è rimasto silenzioso e incontaminato. È stata una scelta impopolare e costosa, ma necessaria per la natura.',
      impacts: [
        { text: '📈 Salute Bosco: +10%', tone: 'positive' },
        { text: '💸 Budget: - € 1.000 (Straordinari)', tone: 'negative' },
      ],
    },
    '6-1': {
      text: 'Hai installato i faretti. I turisti sono entusiasti e pagano il biglietto. Ma stasera, il sonar non rileva nessun segnale ultrasonico dei pipistrelli. La colonia di Rhinolophus, spaventata dalle luci, ha abbandonato il sito per sempre.',
      impacts: [
        { text: '🦇 Biodiversità: Colonia persa!', tone: 'neutral' },
        { text: '💰 Budget: + € 2.000 (Ticket)', tone: 'positive' },
        { text: '📉 Salute Bosco: -15%', tone: 'negative' },
      ],
    },
    '6-2': {
      text: 'Hai installato una cancellata speciale che permette il passaggio dei pipistrelli ma non delle persone. Hai spento ogni luce. Al tramonto, vedi i Rhinolophus uscire a caccia. Il sito è sicuro.',
      impacts: [
        { text: '🦇 Biodiversità: Colonia protetta!', tone: 'neutral' },
        { text: '📈 Salute Bosco: +10%', tone: 'positive' },
        { text: '💸 Budget: - € 3.000 (Costo cancello)', tone: 'negative' },
      ],
    },
    '7-1': {
      text: 'Il rombo dei motori ha salvato la foresta. L\'acqua sganciata ha spento le fiamme in poche ore. Il bosco è salvo, ma le casse del parco sono state prosciugate.',
      impacts: [
        { text: '😐 Salute Bosco: -2% (Danni lievi)', tone: 'negative' },
        { text: '💸 Budget: - € 20.000 (Spesa enorme)', tone: 'negative' },
      ],
    },
    '7-2': {
      text: "Gli uomini hanno lavorato eroicamente con pale e battifuoco, ma il vento era troppo forte. L'incendio è stato domato solo a notte fonda. Molti ettari di faggeta sono andati in fumo.",
      impacts: [
        { text: '📉 Salute Bosco: -15% (Danni ingenti)', tone: 'negative' },
        { text: '💰 Budget: - € 5.000 (Contenuto)', tone: 'negative' },
      ],
    },
    '7-3': {
      text: 'Hai lasciato bruciare il bosco. La pioggia non è mai arrivata. È un disastro ecologico senza precedenti.',
      impacts: [
        { text: '💀 Salute Bosco: -50% (Distrutto)', tone: 'negative' },
      ],
    },
  },
  gameOver: {
    bankrupt: {
      title: 'SCONFITTA: BANCAROTTA',
      text: "Il bosco è salvo, ma le casse del parco si stanno svuotando. La Corte dei Conti ha commissariato l'Ente Parco. Gestione fallimentare.",
    },
    ecoDisaster: {
      title: 'SCONFITTA: DISASTRO ECOLOGICO',
      text: 'Il parco è un deserto. La salute è crollata sotto la soglia minima.',
      petagnaeaSuffix: ' Inoltre, è andata estinta anche la rarissima Petagnaea. Fallimento totale.',
    },
    biodiversityLoss: {
      title: 'SCONFITTA: PERDITA DI BIODIVERSITÀ',
      text: "La salute generale è accettabile, MA hai fallito la missione principale. La Petagnaea è stata distrutta dalla tua incuria. L'UE ha tagliato i fondi.",
    },
    victory: {
      title: '🏆 VITTORIA: CUSTODE DEL FLASCIO',
      text: 'Risultato eccellente! Hai difeso la natura contro ogni minaccia. Tutte le specie prosperano e la tua gestione è stata impeccabile.',
    },
    bitterVictory: {
      title: '📉 VITTORIA AMARA',
      text: 'Il bosco è vivo, ma il prezzo pagato in termini di biodiversità è alto. Hai perso alcune specie secondarie. Il parco è più povero e silenzioso.',
    },
    operationalVictory: {
      title: '👍 VITTORIA OPERATIVA',
      text: "Ottimo lavoro! Il parco è salvo e le specie protette prosperano. Hai dovuto accettare qualche duro compromesso, ma l'ecosistema regge bene.",
    },
    finalHealth: 'Salute Finale',
    remainingBudget: 'Budget Residuo',
    openDossier: 'APRI DOSSIER SCIENTIFICO',
  },
  debrief: {
    title: 'DOSSIER SCIENTIFICO',
    subtitle: 'Rapporto finale sullo stato di conservazione degli habitat e delle specie (Direttiva Habitat 92/43/CEE).',
    species: {
      petagnaea: { ok: 'SALVA', ko: 'ESTINTA', okText: 'Misura IA applicata, Pressione PA07 mitigata', koText: 'Fallimento gestione PA07, distrutta dai suidi' },
      emys: { ok: 'SALVA', ko: 'SCOMPARSA', okText: 'Pressione PG10 bracconaggio contrastata', koText: 'Pressione PG10 sottovalutata, esemplari prelevati' },
      euplagia: { ok: 'PRESENTE', ko: 'PERSA', okText: 'Habitat ripariale preservato', koText: 'Pressione PA05 introdotta con sfalcio meccanico' },
      rhinolophus: { ok: 'PROTETTO', ko: 'FUGGITO', okText: 'Pressione PF05 prevenuta, evitato disturbo', koText: 'Priorità al profitto economico, disturbo incompatibile' },
    },
    evaluationLabel: 'Valutazione Gestionale',
    evaluation: {
      bankrupt: 'ECONOMISTA PESSIMO',
      careless: 'DISATTENTO',
      excellent: 'ECCELLENTE (Gestione Magistrale)',
      good: 'BUONO (Bilanciamento corretto)',
    },
    replay: "RIGIOCA DALL'INIZIO",
  },
  onboarding: {
    title: 'CUSTODI DEL FLASCIO',
    subtitle: 'Simulatore Gestionale sulla Biodiversità di Natura 2000 (ITA070007)',
    intro: 'Benvenuto nel cuore del Parco dei Nebrodi. Sei stato nominato Coordinatore del sito in una settimana critica. Il tuo compito non è solo amministrare, ma garantire la vita nel Bosco del Flascio.',
    statsTitle: 'I Tuoi Parametri Vitali',
    budgetLabel: 'Budget (€ 35.000)',
    budgetText: 'I fondi pubblici sono limitati. Ogni intervento ha un costo. Se vai in rosso hai perso.',
    healthLabel: 'Salute Bosco',
    healthText: "Indica la resilienza dell'ecosistema. Se crolla, il parco muore.",
    bioTitle: 'Obiettivo Prioritario: Biodiversità',
    bioIntro: "Oltre ai numeri, hai sotto la tua custodia 4 specie protette dall'UE.",
    bioWarning: "⚠️ ATTENZIONE: Se un'icona si spegne, la specie è estinta.",
    species: {
      petagnaea: 'Rarissima pianta a rischio critico, si trova solo in Sicilia!',
      emys: 'La testuggine palustre siciliana, minacciata dal bracconaggio.',
      euplagia: "La Falena dell'Edera, indicatore della salute dei fiumi.",
      rhinolophus: 'Pipistrello raro e sensibile che vive nelle grotte buie.',
    },
    start: 'INIZIA LA SETTIMANA (Giorno 1)',
  },
};

// ============================================================
// ENGLISH
// ============================================================
const en: Dict = {
  locale: 'en-GB',
  toggle: { label: 'IT', title: "Passa all'italiano" },
  rotate: {
    title: 'ROTATE YOUR PHONE',
    text: 'To explore the map and play properly, turn your device sideways (landscape).',
  },
  hudBio: {
    petagnaea: { alive: 'Petagnaea gussonei', dead: 'Petagnaea - Extinct' },
    emys: { alive: 'Emys trinacris', dead: 'Emys - Extinct' },
    euplagia: { alive: 'Euplagia quadripunctaria', dead: 'Euplagia - Extinct' },
    rhinolophus: { alive: 'Rhinolophus ferrumequinum', dead: 'Rhinolophus - Extinct' },
  },
  tutorial: {
    skip: 'Skip Tutorial ✖',
    next: 'Next ➔',
    start: 'Start Playing 🎮',
    step1Title: '1. Your Control Panel',
    step1Text: "Keep an eye on these values! If your funds (💶) or the ecosystem's health (🌿) drop to zero, your mission will fail.",
    step2Title: '2. Explore and Learn',
    step2Text: 'On the map you will find fixed icons (like the species info). Tap them to open the ARPA Database and study the environment before you act.',
    step3Title: '3. Face the Emergencies',
    step3Text: 'The bouncing red tokens are your active missions. Tap them to make crucial decisions for the reserve.',
  },
  map: {
    alt: 'Map of the Bosco del Flascio',
    tokens: {
      suidi: 'Feral pigs',
      nasse: 'Fish traps',
      ruspa: 'Bulldozer',
      valigetta: 'Briefcase',
      ferragosto: 'Ferragosto',
      visite: 'Tourists with torches',
      fuoco: 'Fire',
    },
    dayLabel: (n) => `Day ${n}`,
    waiting: 'Waiting for the next events...',
  },
  eventTags: {
    emergency: 'Emergency Detected',
    opportunity: 'Bureaucratic Opportunity',
    critical: 'Critical Emergency',
  },
  events: {
    1: {
      title: 'DAY 1: THE FERAL PIG INVASION',
      intro: 'Your first day at the park starts with an emergency: the rangers report a herd of feral pigs (wild suids) destroying the sites where *Petagnaea gussonei* grows (priority habitat). Threat: PA07 (intensive grazing).',
      choices: [
        { title: 'Send a team to chase them away', desc: 'A **free** but temporary fix. The wild boars will come back. Risk of Petagnaea extinction.' },
        { title: 'Build reinforced fences', desc: 'Makes the Petagnaea permanently safe, but it will require a **fairly high investment**.' },
      ],
    },
    2: {
      title: 'DAY 2: MURKY WATERS',
      intro: 'You wake up to bad news from Flascio Lake (Habitat 3150). Illegal fish traps have been found, set to catch pond turtles (*Emys trinacris*). This is poaching (Pressure PG10).',
      choices: [
        { title: 'Ignore it and save money', desc: '**You spend nothing**, but the poachers will act undisturbed. Risk of Emys extinction.' },
        { title: 'Fund night patrols', desc: 'For a **modest cost**, the guards will seize the traps and save the turtles.' },
      ],
    },
    3: {
      title: 'DAY 3: TIGER WINGS',
      intro: "You are walking along the stream. It is the delicate flight season of *Euplagia quadripunctaria* (the rare Jersey tiger moth), strictly protected by the Habitats Directive, Europe's highest law for the defence of biodiversity. The engineers are pushing to 'clean up' the riverbanks with bulldozers. To them it is just grass to cut, but that tangle of brambles is the vital shelter where this moth lives and breeds.",
      choices: [
        { title: 'Authorise a full clearance', desc: 'The water will flow fast and the work **costs nothing**, but you will destroy the ecological corridor.' },
        { title: 'Require selective cutting by hand', desc: 'The riverside vegetation will stay intact, but the manual work will have a **moderate cost**.' },
      ],
    },
    4: {
      title: 'DAY 4: THE EUROPEAN INSPECTION',
      intro: "Today is a decisive day. An inspector from the European Commission has come to assess the site's conservation status, that is, the real health of our biodiversity. If the report is positive, the Park will receive the Structural Funds, the vital funding needed to cover its costs and keep protecting the area.",
      lowBudget: "The park's coffers are running dry. Convincing the inspector is the only way to get the money you need for emergencies.",
      okBudget: "You still have funds, but securing this grant would guarantee the park's financial security in the long term.",
      choices: [
        { title: 'Organise field monitoring', desc: 'Show the inspector the real nature of the park. It requires a **small logistics cost**.' },
        { title: 'Rely on the old office data', desc: 'Stay at headquarters and show the paperwork. **It costs nothing**, but you risk being turned down.' },
      ],
    },
    5: {
      title: 'DAY 5: A SCORCHING FERRAGOSTO',
      intro: "It is Ferragosto week (Italy's mid-August holiday) and the rush of bathers is out of control. Thousands of tourists are pushing to get into Zone A, the untouchable heart of the reserve where human access is strictly forbidden, to have picnics and swim in the river. You face a dilemma: turn a blind eye and open the gates for a fee to raise money, or deploy the rangers on overtime to defend nature from the crowd?",
      choices: [
        { title: 'Allow access with tickets', desc: "You sacrifice a bit of nature, but it guarantees **great income** for the Park Authority's coffers." },
        { title: 'Total lockdown and surveillance', desc: 'You protect nature, but you will face a **small extra cost** to pay for overtime.' },
      ],
    },
    6: {
      title: 'DAY 6: SHADOWS IN THE CAVE',
      intro: 'You are at the entrance of an old natural cave. Our sensors confirm it is the roost of Rhinolophus ferrumequinum, the rare bat known as the Greater Horseshoe Bat. A local association would like to install spotlights to run paid tours, but there is a vital problem: terrified by light and noise, these animals would abandon the cave forever.',
      choices: [
        { title: 'Authorise the guided tours', desc: 'You put the colony at risk, but the flow of tourists will bring **good earnings**.' },
        { title: 'Close the cave', desc: 'You protect the bats with a special gate. Installing it will have a **significant cost**.' },
      ],
    },
    7: {
      title: 'DAY 7: INFERNO',
      intro: 'It is the last day. A strong sirocco wind is blowing. From the watchtower, they spot thick smoke rising from the beech forest (Habitat 9210). It is ARSON (Pressure PH04). The fire is advancing towards the heart of the park. You must act now.',
      choices: [
        { title: 'Call in the Canadair water bombers', desc: 'A massive, immediate aerial response. It is the best solution, but it has an **exorbitant cost**.' },
        { title: 'Send the ground crews', desc: 'A manual response, slower and riskier. It requires a **medium investment**.' },
        { title: 'Do nothing', desc: 'You wait for the rain. **You spend nothing**, but the consequences for the ecosystem could be disastrous.' },
      ],
    },
  },
  bioSheet: {
    header: 'NATURA 2000 DATABASE',
    codeLabel: 'CODE',
    biologistNote: "💡 BIOLOGIST'S NOTE:",
    species: {
      petagnaea: {
        desc: 'This plant is a true living fossil, a botanical relic of the Tertiary period: it has survived unchanged for millions of years, ever since Sicily had a subtropical climate. Today, having escaped the ice ages, it can only grow in a handful of fragile wetlands near the springs of the Nebrodi Mountains. Its risk of extinction is critical.',
        note: "The number one danger is not the climate, but free-roaming pigs and wild boars. By rooting (ploughing deep into the soil with their snouts to look for roots to eat), they turn the earth over and destroy the last places where the Petagnaea grows. The only physical barrier that can save these ancient flowers is the installation of reinforced fences.",
        deadTitle: 'SPECIES EXTINCT',
        deadText: 'Habitat destroyed by the trampling of the pigs. The species can no longer be studied.',
      },
      emys: {
        desc: 'Emys trinacris is a small endemic pond turtle: a reptile found nowhere else in the world, living only in Sicily. It is a shy, elusive species that loves to bask in the sun on rocks, then dive into ponds and slow-flowing rivers at the slightest sign of danger.',
        note: 'The greatest danger is invisible from the surface. Poachers sink fish traps to the bottom: submerged net cages used for illegal fishing. Since this turtle has lungs and needs to come up to breathe, if it swims into a trap to eat the bait it is doomed to drown. Funding strict patrols to seize these traps is the only way to prevent a silent massacre.',
        deadTitle: 'POPULATION LOST',
        deadText: 'Specimens captured illegally. Biological record closed.',
      },
      euplagia: {
        desc: "Widely known as the 'Jersey tiger', this beautiful insect is a very important bioindicator: its mere presence tells us that the watercourse is unpolluted and that the green strip along the banks (the riparian environment) is in excellent health.",
        note: "Heavy machinery is its worst enemy. Any aggressive digging with bulldozers on the riverbanks would flatten the bushes where it lives and breeds. To keep the rivers safe and protect the moth, it is mandatory to fund specialised teams that carry out only manual, 'selective' cutting, removing dead branches and leaving living plants intact.",
        deadTitle: 'HABITAT DESTROYED',
        deadText: 'Species wiped out by invasive mechanical works on the riverbanks.',
      },
      rhinolophus: {
        desc: "This large bat, known as the 'Greater Horseshoe Bat', is in dramatic decline all over Europe. It vitally needs natural caves in total darkness, far from any disturbance, to form its breeding colonies: true safe 'nurseries' where mothers give birth to and nurse their young.",
        note: 'This species is terrified of light and chaos. Even a single guided tour with spotlights and noise is enough to frighten the adults, causing them to abandon the cave immediately and leading to the loss of an entire generation of young. Keeping the area closed to the public is an absolute must.',
        deadTitle: 'COLONY FLED',
        deadText: 'Intolerable human disturbance. Caves abandoned.',
      },
    },
  },
  report: {
    header: 'Daily Report',
    impactsLabel: 'Impacts:',
    toDay5: 'CONTINUE... (Go to Day 5)',
    toLastDay: 'GO TO SLEEP (Go to the Last Day)',
    toFinal: 'GO TO THE FINAL ASSESSMENT',
    sleep: (n) => `GO TO SLEEP (Go to Day ${n})`,
  },
  reports: {
    '1-1': {
      text: 'You chose the cheap option. The pigs ran off at first, but came back that same night. The Petagnaea sites were devastated as they passed through. The population is compromised.',
      impacts: [
        { text: '🥀 Biodiversity: Petagnaea destroyed!', tone: 'critical' },
        { text: '📉 Forest Health: -5%', tone: 'negative' },
        { text: '💰 Budget: -€0 (Free)', tone: 'neutral' },
      ],
    },
    '1-2': {
      text: 'You built the fences as required by the Conservation Measures. The Petagnaea is safe for good. You invested a large sum, but a necessary one.',
      impacts: [
        { text: '📈 Forest Health: +12%', tone: 'positive' },
        { text: '💸 Budget: -€12,000', tone: 'negative' },
      ],
    },
    '2-1': {
      text: 'You did not step in. The poachers emptied their traps undisturbed. The local Emys trinacris population has been decimated for the black market.',
      impacts: [
        { text: '🦴 Biodiversity: Turtles lost!', tone: 'critical' },
        { text: '📉 Forest Health: -5%', tone: 'negative' },
        { text: '💰 Budget: -€0 (Free)', tone: 'neutral' },
      ],
    },
    '2-2': {
      text: 'The guards kept watch over the banks all night. Three traps were seized and two Emys specimens were saved. Great work.',
      impacts: [
        { text: '📈 Forest Health: +10%', tone: 'positive' },
        { text: '💸 Budget: -€2,000', tone: 'negative' },
      ],
    },
    '3-1': {
      text: "The bulldozers flattened everything. The water will flow fast, but you destroyed the ecological corridor, the natural 'green road' that let wildlife move around and survive. Not a single moth can be seen flying any more. Biodiversity has taken a heavy blow.",
      impacts: [
        { text: '📉 Forest Health: -10% (Habitat lost)', tone: 'negative' },
      ],
    },
    '3-2': {
      text: 'You banned the bulldozers and paid work crews to cut only the dead growth by hand. The riparian vegetation, the fragile ecosystem that hugs the river, is intact. In the evening, you watch hundreds of Euplagia flying among the leaves. A success for Natura 2000!',
      impacts: [
        { text: '🦋 Biodiversity: Habitat saved!', tone: 'neutral' },
        { text: '📈 Forest Health: +10%', tone: 'positive' },
        { text: '💸 Budget: -€4,000 (Labour cost)', tone: 'negative' },
      ],
    },
    '4-1': {
      text: ({ petagnaeaViva }) =>
        `You took the inspector to the most fascinating spots. You spotted fresh wildcat tracks and photographed ${petagnaeaViva ? 'the Petagnaea in bloom' : "the forest's majestic ancient trees"}. The inspector was impressed. The funding is approved!`,
      impacts: [
        { text: '🌸 Biodiversity: Showcased!', tone: 'neutral' },
        { text: '💰 Budget: +€14,500 (EU funds unlocked)', tone: 'positive' },
      ],
    },
    '4-2': {
      text: 'You stayed at headquarters and showed the inspector only outdated papers and maps. The inspector did not find enough evidence of the current health of the habitats. The funding application has been put on hold. A wasted opportunity.',
      impacts: [
        { text: '😐 Budget: Unchanged (No extra funds)', tone: 'neutral' },
      ],
    },
    '5-1': {
      text: 'You opened the gates. The tourists happily paid for their tickets. The budget can breathe again, but at the end of the day you find litter left behind and trampled ground off the trails. You sold a little piece of nature to survive financially.',
      impacts: [
        { text: '💰 Budget: +€3,000 (Ticket sales)', tone: 'positive' },
        { text: '📉 Forest Health: -5%', tone: 'negative' },
      ],
    },
    '5-2': {
      text: 'You posted patrols at every entrance. Nobody got in. The forest stayed quiet and unspoiled. It was an unpopular and costly choice, but a necessary one for nature.',
      impacts: [
        { text: '📈 Forest Health: +10%', tone: 'positive' },
        { text: '💸 Budget: -€1,000 (Overtime)', tone: 'negative' },
      ],
    },
    '6-1': {
      text: 'You installed the spotlights. The tourists are thrilled and pay for their tickets. But tonight, the sonar picks up no ultrasonic bat signals. Frightened by the lights, the Rhinolophus colony has abandoned the site forever.',
      impacts: [
        { text: '🦇 Biodiversity: Colony lost!', tone: 'neutral' },
        { text: '💰 Budget: +€2,000 (Tickets)', tone: 'positive' },
        { text: '📉 Forest Health: -15%', tone: 'negative' },
      ],
    },
    '6-2': {
      text: 'You installed a special gate that lets bats through but not people. You switched off every light. At sunset, you watch the Rhinolophus fly out to hunt. The site is safe.',
      impacts: [
        { text: '🦇 Biodiversity: Colony protected!', tone: 'neutral' },
        { text: '📈 Forest Health: +10%', tone: 'positive' },
        { text: '💸 Budget: -€3,000 (Gate cost)', tone: 'negative' },
      ],
    },
    '7-1': {
      text: "The roar of the engines saved the forest. The water they dropped put out the flames in a few hours. The forest is safe, but the park's coffers have been drained.",
      impacts: [
        { text: '😐 Forest Health: -2% (Minor damage)', tone: 'negative' },
        { text: '💸 Budget: -€20,000 (Huge expense)', tone: 'negative' },
      ],
    },
    '7-2': {
      text: 'The crews worked heroically with shovels and fire beaters, but the wind was too strong. The fire was only brought under control late at night. Many hectares of beech forest went up in smoke.',
      impacts: [
        { text: '📉 Forest Health: -15% (Heavy damage)', tone: 'negative' },
        { text: '💰 Budget: -€5,000 (Contained)', tone: 'negative' },
      ],
    },
    '7-3': {
      text: 'You let the forest burn. The rain never came. It is an unprecedented ecological disaster.',
      impacts: [
        { text: '💀 Forest Health: -50% (Destroyed)', tone: 'negative' },
      ],
    },
  },
  gameOver: {
    bankrupt: {
      title: 'DEFEAT: BANKRUPTCY',
      text: "The forest is safe, but the park's coffers are running dry. The Court of Auditors has placed the Park Authority under external administration. A management failure.",
    },
    ecoDisaster: {
      title: 'DEFEAT: ECOLOGICAL DISASTER',
      text: 'The park is a wasteland. Its health has collapsed below the minimum threshold.',
      petagnaeaSuffix: ' On top of that, the extremely rare Petagnaea has gone extinct too. Total failure.',
    },
    biodiversityLoss: {
      title: 'DEFEAT: LOSS OF BIODIVERSITY',
      text: 'Overall health is acceptable, BUT you failed the main mission. The Petagnaea was destroyed by your neglect. The EU has cut the funding.',
    },
    victory: {
      title: '🏆 VICTORY: GUARDIAN OF THE FLASCIO',
      text: 'Excellent result! You defended nature against every threat. All species are thriving and your management was flawless.',
    },
    bitterVictory: {
      title: '📉 BITTER VICTORY',
      text: 'The forest is alive, but the price paid in biodiversity is high. You lost some secondary species. The park is poorer and quieter.',
    },
    operationalVictory: {
      title: '👍 OPERATIONAL VICTORY',
      text: 'Great work! The park is safe and the protected species are thriving. You had to accept some tough compromises, but the ecosystem is holding up well.',
    },
    finalHealth: 'Final Health',
    remainingBudget: 'Remaining Budget',
    openDossier: 'OPEN SCIENTIFIC DOSSIER',
  },
  debrief: {
    title: 'SCIENTIFIC DOSSIER',
    subtitle: 'Final report on the conservation status of habitats and species (Habitats Directive 92/43/EEC).',
    species: {
      petagnaea: { ok: 'SAFE', ko: 'EXTINCT', okText: 'Measure IA applied, Pressure PA07 mitigated', koText: 'PA07 management failed, destroyed by the pigs' },
      emys: { ok: 'SAFE', ko: 'GONE', okText: 'Pressure PG10 (poaching) countered', koText: 'Pressure PG10 underestimated, specimens taken' },
      euplagia: { ok: 'PRESENT', ko: 'LOST', okText: 'Riparian habitat preserved', koText: 'Pressure PA05 introduced by mechanical mowing' },
      rhinolophus: { ok: 'PROTECTED', ko: 'FLED', okText: 'Pressure PF05 prevented, disturbance avoided', koText: 'Profit put first, incompatible disturbance' },
    },
    evaluationLabel: 'Management Assessment',
    evaluation: {
      bankrupt: 'VERY POOR ECONOMIST',
      careless: 'CARELESS',
      excellent: 'EXCELLENT (Masterful management)',
      good: 'GOOD (Well balanced)',
    },
    replay: 'PLAY AGAIN FROM THE START',
  },
  onboarding: {
    title: 'CUSTODI DEL FLASCIO',
    subtitle: 'Natura 2000 Biodiversity Management Simulator (ITA070007)',
    intro: 'Welcome to the heart of the Nebrodi Park. You have been appointed Site Coordinator during a critical week. Your job is not just to manage, but to safeguard life in the Bosco del Flascio.',
    statsTitle: 'Your Vital Stats',
    budgetLabel: 'Budget (€35,000)',
    budgetText: 'Public funds are limited. Every action has a cost. If you go into the red, you lose.',
    healthLabel: 'Forest Health',
    healthText: 'It shows how resilient the ecosystem is. If it collapses, the park dies.',
    bioTitle: 'Top Priority: Biodiversity',
    bioIntro: 'Beyond the numbers, you are the guardian of 4 species protected by the EU.',
    bioWarning: '⚠️ WARNING: If an icon goes dark, the species is extinct.',
    species: {
      petagnaea: 'An extremely rare, critically endangered plant found only in Sicily!',
      emys: 'The Sicilian pond turtle, threatened by poaching.',
      euplagia: 'The Jersey tiger moth, an indicator of river health.',
      rhinolophus: 'A rare, sensitive bat that lives in dark caves.',
    },
    start: 'START THE WEEK (Day 1)',
  },
};

export const STRINGS: Record<Lang, Dict> = { it, en };
