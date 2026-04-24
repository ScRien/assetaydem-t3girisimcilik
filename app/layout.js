import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Airdus Remote — Otonom Orman Savunma Sistemi',
  description:
    'Türkiye\'nin ormanlarını korumak için yapay zeka destekli otonom sensör ağı ve drone filosu. Yangını saniyeler içinde tespit et, dakikalar içinde müdahale et.',
  keywords: 'orman yangını, otonom drone, yapay zeka, IoT, edge AI, yangın söndürme',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-textMain antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
