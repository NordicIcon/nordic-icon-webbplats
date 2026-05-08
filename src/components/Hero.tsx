import ResponsiveHeroBanner from '@/components/ui/responsive-hero-banner';

const stats = [
  { value: '100%', label: 'Mobilresponsiv' },
  { value: '90+',  label: 'Lighthouse score' },
  { value: '5–10', label: 'Dagar till live' },
];

export default function Hero() {
  return (
    <div style={{ background: 'radial-gradient(ellipse at 70% 45%, rgba(27,58,107,0.55) 0%, #0a1628 55%, #08111f 100%)' }}>
      <ResponsiveHeroBanner
        hideNav
        badgeLabel="Nytt"
        badgeText="Tar emot nya kunder"
        title="Premium hemsidor"
        titleLine2="för svenska bolag."
        description="Animerade. Mobilanpassade. Klara på 5–10 dagar."
        primaryButtonText="Boka ett möte"
        primaryButtonHref="/kontakt"
        secondaryButtonText="Se våra projekt"
        secondaryButtonHref="/projekt"
        statsContent={
          <div className="animate-fade-slide-in-1">
            <p className="text-sm text-white/70 text-center mb-6">Byggt för att prestera</p>
            <div className="flex items-center justify-center gap-12">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-semibold text-white" style={{ fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '-0.02em' }}>
                    {s.value}
                  </div>
                  <div className="text-sm text-white/50 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
}
