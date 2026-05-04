import Hero from '@/components/Hero';
import ContainerScroll from '@/components/ContainerScroll';
import IPhoneMockup from '@/components/IPhoneMockup';
import BookingSection from '@/components/BookingSection';
import Process from '@/components/Process';
import Portfolio from '@/components/Portfolio';
import Plans from '@/components/Plans';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import PreFooterCTA from '@/components/PreFooterCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* 01 — Hero */}
      <Hero />

      {/* 02 — Container Scroll 3D */}
      <ContainerScroll />

      {/* 03 — iPhone Mockup */}
      <IPhoneMockup />

      {/* 04 — Booking Calendar */}
      <BookingSection />

      {/* 05 — Processen */}
      <Process />

      {/* 06 — Portfolio Halvcirkel */}
      <Portfolio />

      {/* 07 — Tre Planer (Glassmorphism) */}
      <Plans />

      {/* 08 — FAQ */}
      <FAQ />

      {/* 09 — Kontakt + Google Kalender */}
      <Contact />

      {/* 10 — Pre-footer CTA */}
      <PreFooterCTA />

      {/* 11 — Footer Reveal */}
      <Footer />
    </>
  );
}
