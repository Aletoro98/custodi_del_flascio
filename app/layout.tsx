import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: "Custodi del Plemmirio",
  description: "Simulatore Gestionale sulla Biodiversità - Stanza del Mare",
  openGraph: {
    title: "🌊 Custodi del Plemmirio - Gioca Ora",
    description: "Mettiti alla prova come Direttore dell'Area Marina Protetta. Riuscirai a salvare le specie in via di estinzione senza finire in bancarotta?",
    url: "https://custodi-del-flascio.vercel.app/", 
    siteName: "Custodi del Plemmirio",
    images: [
      {
        url: "/mappa-mare.png", // Usa l'immagine della mappa come copertina!
        width: 1200,
        height: 630,
        alt: "Mappa del Plemmirio",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
