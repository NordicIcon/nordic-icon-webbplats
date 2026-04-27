import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { SmoothScroll } from '@/providers';
import Navbar from '@/components/Navbar';
import PageLoader from '@/components/PageLoader';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CookieBanner from '@/components/CookieBanner';

const GA_ID = 'G-FNBZMN283L';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Nordic Icon — Premium hemsidor för svenska bolag',
  description:
    'Vi bygger animerade, mobilanpassade hemsidor för svenska bolag. BAS från 7 900 kr. Klart på 14–30 dagar.',
  metadataBase: new URL('https://nordicicon.se'),
  openGraph: {
    title: 'Nordic Icon — Premium hemsidor för svenska bolag',
    description: 'Vi bygger animerade, mobilanpassade hemsidor för svenska bolag. Klart på 14–30 dagar.',
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
        <SmoothScroll>
          <PageLoader />
          <CookieBanner />
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
