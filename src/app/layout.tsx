import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AlloService - La plateforme des meilleurs professionnels',
  description: 'Trouvez, réservez et évaluez les meilleurs artisans et professionnels de service autour de vous.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
