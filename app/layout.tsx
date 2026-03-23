import type { Metadata } from 'next';
import './globals.css';
import { PHProvider } from './providers'; // Importiamo il provider per la telemetria

export const metadata: Metadata = {
  title: "Custodi del Flascio",
  description: "Simulatore Gestionale sulla Biodiversità - Rete Natura 2000",
  openGraph: {
    title: "🌲 Custodi del Flascio - Gioca Ora",
    description: "Mettiti alla prova come Direttore della Riserva. Riuscirai a salvare la Petagnaea e l'ecosistema boschivo senza far fallire l'Ente?",
    url: "https://custodi-del-flascio.vercel.app/",
    siteName: "Custodi del Flascio",
    images: [
      {
        url: "https://custodi-del-flascio.vercel.app/opengraph-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Mappa del Bosco del Flascio",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="it">
      <body suppressHydrationWarning>
        {/* Avvolgiamo l'app con PostHog per tracciare gli eventi */}
        <PHProvider>
          {children}
        </PHProvider>
      </body>
    </html>
  );
}