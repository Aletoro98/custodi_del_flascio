# 🌲 Custodi del Flascio
**Simulatore Gestionale Web-Based per l'Educazione Ambientale (Serious Game)**

🔗 **[Gioca alla Demo Live su Vercel](https://custodi-del-flascio.vercel.app)**

> **Versione di riferimento:** la build sottoposta a valutazione esperta nella sperimentazione con i docenti è taggata come [`v1.0-sperimentazione`](https://github.com/Aletoro98/custodi_del_flascio/tree/v1.0-sperimentazione). La demo online riflette invece sempre l'ultimo deploy.

## 📖 Il Progetto
"Custodi del Flascio" è un Serious Game gestionale (Edutainment) sviluppato come caso di studio. L'obiettivo non è il semplice intrattenimento, ma l'apprendimento di concetti complessi legati alla biologia della conservazione attraverso il *learning by doing*.

Il giocatore veste i panni del Coordinatore del sito **Bosco del Flascio** (Rete Natura 2000), all'interno del Parco dei Nebrodi. Il fulcro dell'esperienza è il difficile *trade-off* tra sostenibilità ecologica ed economica: la tutela dell'ambiente richiede un'attenta allocazione di risorse limitate per contrastare pressioni antropiche e naturali reali, estratte dai veri Formulari Standard europei.

## 🎯 Meccaniche di Gioco (Gameplay)
* **Gestione delle Risorse:** Il giocatore deve bilanciare un "Budget" predefinito e la "Salute dell'Ecosistema". L'esaurimento dei fondi porta al commissariamento (Game Over politico), mentre il collasso ambientale porta al Game Over ecologico.
* **Ciclo Decisionale (Turni di 7 giorni):** Ogni giorno presenta un'emergenza specifica (es. pascolo abusivo dei suidi, alterazione degli argini, bracconaggio). Ogni misura di mitigazione scelta genera un "Report Giornaliero" con le conseguenze immediate.
* **Lore Integrata e Interattiva:** Le schede scientifiche di specie protette (es. *Petagnaea gussonei*, *Rhinolophus*, *Emys*) sono integrate nella mappa. Leggerle fornisce indizi vitali per risolvere le emergenze. Se una specie si estingue, la sua scheda diventa inaccessibile, creando un forte impatto emotivo.

## 💻 Stack Tecnologico
* **Frontend:** React 19, Next.js 15 (richiede Node.js 20 o superiore)
* **Styling:** Tailwind CSS
* **UI/UX:** Mobile-First Design. L'interfaccia è responsiva e utilizza un sistema avanzato di Modals (gestione z-index e blocco dello scroll) per garantire un'esperienza fluida.
* **Contenuti:** Tutti i testi degli eventi, le schede scientifiche e i modificatori numerici sono statici e definiti a livello di codice, redatti sulla base della documentazione tecnica del sito. La scelta è deliberata: garantisce controllo scientifico sui contenuti, riproducibilità dell'esperienza e identità della sessione di gioco tra utenti diversi, requisito necessario per l'impiego del prototipo in un contesto di ricerca.

## 🗂 Struttura del Progetto
L'architettura del simulatore è volutamente consolidata per facilitare la rapida iterazione del prototipo. Il *core logic* e l'interfaccia utente (UI) risiedono principalmente all'interno della directory `/app`:

* **`/app/page.tsx`**: È il cuore pulsante dell'applicazione. Questo file centralizza l'intera logica del gioco (gestione degli stati, ciclo dei turni, calcolo del budget/salute ecosistemica, condizioni di *Game Over*), i contenuti narrativi (testi degli eventi, schede tecniche delle specie come *Petagnaea gussonei* e *Rhinolophus*) e l'integrazione dei componenti UI (modals, HUD, posizionamento degli elementi interattivi sulla mappa).
* **`/app/layout.tsx`**: Gestisce il layout radice dell'applicazione Next.js, configurando i metadati globali (titolo, descrizione) e le impostazioni base della struttura HTML.
* **`/app/globals.css`**: Contiene gli stili globali e l'inizializzazione di Tailwind CSS.

---

## 🚀 Installazione e Avvio in Locale
Per eseguire il simulatore localmente, assicurati di avere **Node.js 20 o superiore** installato sul tuo sistema.

1. **Clona il repository e installa le dipendenze:**
   ```bash
   git clone https://github.com/Aletoro98/custodi_del_flascio.git
   cd custodi_del_flascio
   npm install
   ```
2. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```
   L'app sarà disponibile all'indirizzo `http://localhost:3000`.

Il simulatore non richiede chiavi API né variabili d'ambiente per funzionare: tutti i contenuti sono statici e definiti nel codice.

---

## 🌍 Deployment (Pubblicazione Web)
L'applicazione è ottimizzata per il deployment su piattaforme cloud come **Vercel**.

1. Collega il tuo repository GitHub a Vercel.
2. Avvia il deployment. Vercel fornirà un URL pubblico e gestirà gli aggiornamenti in CI/CD.

---

## 📄 Licenze e Crediti (Credits)

**Codice Sorgente**
Il codice sorgente di questo simulatore è rilasciato sotto licenza **MIT**. Sei libero di utilizzarlo, modificarlo e distribuirlo, a patto di includere l'avviso di copyright originale.

**Fonti Scientifiche**
Il simulatore si basa sui dati reali del Sito Natura 2000 **ITA070007 "Bosco del Flascio"**.
Riferimenti normativi utilizzati per le meccaniche di gioco: *Direttiva Habitat 92/43/CEE*.

**Asset Fotografici (Schede Tecniche)**
Le fotografie utilizzate all'interno del gioco appartengono ai rispettivi autori. Quelle tratte da Wikimedia Commons sono distribuite con licenza **Creative Commons**:
* 🌸 **Petagnaea gussonei:** Immagine del Prof. Lorenzo Gianguzzi (Dipartimento SAF - UNIPA).
* 🐢 **Emys trinacris:** Foto di Taxiarchis Danelis (Wikimedia Commons, Licenza CC BY 4.0).
* 🦋 **Euplagia quadripunctaria:** Foto di Ermell (Wikimedia Commons, Licenza CC BY-SA 4.0).
* 🦇 **Rhinolophus ferrumequinum:** Foto di Klaus Krahn (Wikimedia Commons, Licenza CC BY-SA 4.0).

**Grafiche e UI**
Le grafiche ambientali e gli elementi visivi dell'interfaccia sono stati generati tramite Intelligenza Artificiale (Google Gemini, modello: Nano Banana 2).

**Sviluppo**
L'ambiente di sviluppo iniziale è stato predisposto tramite Google AI Studio, utilizzato come assistente alla programmazione durante la stesura del codice.
