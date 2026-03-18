# 🌲 Custodi del Flascio
**Simulatore Gestionale Web-Based per l'Educazione Ambientale (Serious Game)**

🔗 **[Gioca alla Demo Live su Vercel](https://custodi-del-flascio.vercel.app)**

## 📖 Il Progetto
"Custodi del Flascio" è un Serious Game gestionale (Edutainment) sviluppato come caso di studio. L'obiettivo non è il semplice intrattenimento, ma l'apprendimento di concetti complessi legati alla biologia della conservazione attraverso il *learning by doing*.

Il giocatore veste i panni del Direttore dell'Area Protetta terrestre/boschiva **Bosco del Flascio** (Rete Natura 2000). Il fulcro dell'esperienza è il difficile *trade-off* tra sostenibilità ecologica ed economica: la tutela dell'ambiente richiede un'attenta allocazione di risorse limitate per contrastare pressioni antropiche e naturali reali, estratte dai veri Formulari Standard europei.

## 🎯 Meccaniche di Gioco (Gameplay)
* **Gestione delle Risorse:** Il giocatore deve bilanciare un "Budget" predefinito e la "Salute dell'Ecosistema". L'esaurimento dei fondi porta al commissariamento (Game Over politico), mentre il collasso ambientale porta al Game Over ecologico.
* **Ciclo Decisionale (Turni di 7 giorni):** Ogni giorno presenta un'emergenza specifica (es. pascolo abusivo dei suidi, alterazione degli argini, bracconaggio). Ogni misura di mitigazione scelta genera un "Report Giornaliero" con le conseguenze immediate.
* **Lore Integrata e Interattiva:** Le schede scientifiche di specie protette (es. *Petagnaea gussonei*, *Rhinolophus*, *Emys*) sono integrate nella mappa. Leggerle fornisce indizi vitali per risolvere le emergenze. Se una specie si estingue, la sua scheda diventa inaccessibile, creando un forte impatto emotivo.

## 💻 Stack Tecnologico
* **Frontend:** React, Next.js (si consiglia Node.js v18.x o superiore)
* **Styling:** Tailwind CSS
* **UI/UX:** Mobile-First Design. L'interfaccia è responsiva e utilizza un sistema avanzato di Modals (gestione z-index e blocco dello scroll) per garantire un'esperienza fluida.
* **AI Integration:** Google Gemini API (utilizzata per la generazione dinamica dei contenuti).

## 🗂 Struttura del Progetto
Per gli sviluppatori o gli enti che desiderano personalizzare il simulatore:
* `/app`: Contiene le pagine e le logiche di routing di Next.js.
* `/lib`: Contiene i file di configurazione, i dati strutturati (es. schede delle specie) e le chiamate API verso Gemini. Modificare questi file per aggiornare la "lore" o i parametri biologici.
* `/public`: Asset statici, icone e immagini.

---

## 🚀 Installazione e Avvio in Locale
Per eseguire il simulatore localmente, assicurati di avere **Node.js** installato sul tuo sistema.

1. **Clona il repository e installa le dipendenze:**
   ```bash
   git clone [https://github.com/Aletoro98/custodi_del_flascio.git](https://github.com/Aletoro98/custodi_del_flascio.git)
   cd custodi_del_flascio
   npm install
   ```
2. **Configura le Variabili d'Ambiente:**
   Il simulatore richiede una chiave API di Google Gemini per funzionare.
   Crea un file chiamato `.env.local` nella directory root del progetto e inserisci la tua chiave:
   ```env
   GEMINI_API_KEY=inserisci_qui_la_tua_chiave_api_valida
   ```
3. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```
   L'app sarà disponibile all'indirizzo `http://localhost:3000`.

---

## 🌍 Deployment (Pubblicazione Web)
L'applicazione è ottimizzata per il deployment su piattaforme cloud come **Vercel**.

1. Collega il tuo repository GitHub a Vercel.
2. Nelle impostazioni del progetto su Vercel, vai su **Environment Variables**.
3. Aggiungi la variabile `GEMINI_API_KEY` con il rispettivo valore. **Attenzione:** omettere questo passaggio causerà il crash dell'applicazione in produzione.
4. Avvia il deployment. Vercel fornirà un URL pubblico e gestirà gli aggiornamenti in CI/CD.

---

## 📄 Licenza
Questo progetto è rilasciato sotto licenza **MIT**. Sei libero di utilizzarlo, modificarlo e distribuirlo, a patto di includere l'avviso di copyright originale. (Per i dettagli, consultare il file `LICENSE` se presente nel repository).
