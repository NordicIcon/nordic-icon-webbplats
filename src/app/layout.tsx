import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '@/providers';
import Navbar from '@/components/Navbar';
import PageLoader from '@/components/PageLoader';
import ScrollProgressBar from '@/components/ScrollProgressBar';

export const metadata: Metadata = {
  title: 'Nordic Icon — Premium hemsidor för svenska bolag',
  description:
    'Vi bygger animerade, mobilanpassade hemsidor för svenska bolag. BAS från 9 900 kr. Klart på 10 dagar.',
  metadataBase: new URL('https://nordicicon.se'),
  openGraph: {
    title: 'Nordic Icon — Premium hemsidor för svenska bolag',
    description: 'Vi bygger animerade, mobilanpassade hemsidor för svenska bolag. Klart på 10 dagar.',
    url: 'https://nordicicon.se',
    siteName: 'Nordic Icon',
    locale: 'sv_SE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        <SmoothScroll>
          <PageLoader />
          <ScrollProgressBar />
          <Navbar />
          <main>
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
