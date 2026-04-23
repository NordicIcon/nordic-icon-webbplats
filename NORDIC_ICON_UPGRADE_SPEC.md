# NORDIC ICON — FULL UPGRADE SPEC
## nordicicon.se · ELITE-nivå · Awwwards-standard

> **Mål:** En potentiell kund öppnar sidan och tänker — *"om de kan göra såhär för sig själva kan de göra det för mig."*
> **Referens:** jeskojets.com · voltaskai.endover.ee · apple.com

---

## GLOBALT FÖRST — innan du rör en enda komponent

### CSS Custom Properties (globals.css)
```css
:root {
  --bg: #FAFAFA;
  --bg-secondary: #F3F2EE;
  --bg-dark: #0D1B2A;
  --text: #1A1A18;
  --text-secondary: #5A5A56;
  --text-muted: #9A9A96;
  --accent: #1B3A6B;
  --accent-hover: #152E56;
  --accent-subtle: rgba(27, 58, 107, 0.08);
  --accent-shadow: rgba(27, 58, 107, 0.2);
  --accent-glow: rgba(27, 58, 107, 0.35);
  --accent-neon: rgba(41, 98, 185, 0.8);
  --border: rgba(26, 26, 24, 0.07);
}
```

### Typsnitt
- Rubriker: `Instrument Serif`
- Body: `Plus Jakarta Sans`
- Siffror/labels: `IBM Plex Mono`

### Ta bort omedelbart
- All text med "SCROLLA" eller scroll-indikator text — bort helt
- Footer som ligger ovanpå innehåll — fixas med Footer Reveal nedan

---

## 1. CUSTOM CURSOR

**Fil:** `components/CustomCursor.tsx`

**Beteende:**
- Liten solid cirkel: 10px diameter, `background: var(--accent)`, `border-radius: 50%`
- Stor ring: 36px diameter, `border: 1.5px solid var(--accent)`, transparent fill, följer med ~120ms lerp-fördröjning (requestAnimationFrame med `lerp(current, target, 0.12)`)
- `mix-blend-mode: difference` på ringen — allt under inverteras
- Vid hover på `<a>`, `<button>`, `[data-cursor="button"]`: ringen expanderar till 60px, `background: rgba(27,58,107,0.1)`, ease 0.3s
- Vid hover på brödtext/rubriker: ringen kollapsas till en vertikal bar `width: 2px, height: 24px`
- På mobile/touch: cursorn renderas inte alls (`@media (pointer: coarse)`)

**Implementering:**
```tsx
// Lägg till data-cursor="button" på alla primära CTAs
// useEffect med mousemove listener
// Två separata divs: .cursor-dot och .cursor-ring
// GSAP quickTo för smooth lerp
```

---

## 2. SCROLL PROGRESS BAR

**Fil:** `components/ScrollProgress.tsx`

- Tunn linje, 2px höjd, längst upp på sidan, `position: fixed, top: 0, z-index: 999`
- Färg: `var(--accent)` med subtle glow: `box-shadow: 0 0 8px var(--accent-glow)`
- Bredd: räknas med `scrollY / (documentHeight - windowHeight) * 100`
- Framer Motion `useScroll` + `useSpring` för smooth rörelse
- Alltid synlig, alla sektioner

---

## 3. NAVBAR — morphing identitet

**Fil:** `components/Navbar.tsx`

**Default (top of page):**
- `background: transparent`
- Logo: "Nordic Icon" full text, `font-family: Instrument Serif, font-size: 18px`
- Nav-links: `color: var(--text)`, `font-size: 13px`, letter-spacing 0.02em
- "Boka möte"-knapp: `background: var(--accent)`, pill-shape, magnetisk

**Vid scroll (> 80px):**
- `background: rgba(250,250,250,0.8)`, `backdrop-filter: blur(20px) saturate(180%)`
- Border-bottom: `1px solid var(--border)`
- Logo morphar: "Nordic Icon" → "NI" monogram
  - GSAP SplitText, övriga bokstäver `opacity: 0, x: -8` med stagger 0.02s
  - "NI" kvar, `letter-spacing` komprimeras
- Transition: `cubic-bezier(0.76, 0, 0.24, 1)`, 0.5s

**På mörka sektioner** (lägg `data-theme="dark"` på mörka sektioner):
- Navbar-border glöder: `border-bottom: 1px solid rgba(41,98,185,0.4)`
- Länkfärger: `color: rgba(255,255,255,0.8)`

**Magnetiska knappar (alla primära CTAs):**
```tsx
// onMouseMove: beräkna offset från knappens centrum
// translateX/Y max ±12px, ease ut med GSAP
// onMouseLeave: spring tillbaka till 0,0
```

---

## 4. PAGE LOADER

**Fil:** `components/PageLoader.tsx`

- Mörk bakgrund: `#0D1B2A`, fullscreen
- Centrum: "NORDIC ICON" i IBM Plex Mono, letter-spacing 0.3em, `font-size: 11px`, `color: rgba(255,255,255,0.4)`
- Ovanför: tre horisontella linjer (SVG), `width: 120px`, vardera 1px höjd, `stroke: var(--accent)`, gap 5px
- Animation: linjerna fylls upp vänster→höger med `stroke-dashoffset`, staggered 0.15s mellan varje
- Total duration: 1.8s
- Exit: hela loadern `opacity: 0, scale: 1.02` med Framer Motion, `duration: 0.6s`
- Sidan glider in underifrån: `y: 40 → y: 0`, `opacity: 0 → 1`
- **SessionStorage:** kör bara en gång per session. Om `sessionStorage.getItem('loaded')` finns — hoppa över

---

## 5. HERO — aurora canvas

**Fil:** `components/Hero.tsx`

**Bakgrund:**
- `<canvas>` fullscreen, `position: absolute, inset: 0, z-index: 0`
- Aurora/northern lights effekt:
  ```js
  // 4-6 elliptiska gradient-blobs
  // Varje blob: radialGradient i canvas context
  // Färger: rgba(27,58,107,0.15), rgba(41,98,185,0.08), rgba(100,149,237,0.06)
  // Rör sig organiskt med sin egen sinusvåg (inte musen)
  // amplitude: 80px, period: 8-12s per blob, alla unika faser
  // requestAnimationFrame loop
  // Canvas blur: filter: blur(40px) på canvas-elementet
  ```
- Floating geometric elements (behålls men uppgraderas):
  - Tunna cirklar, `stroke: rgba(27,58,107,0.06)`, ingen fill
  - Rör sig ultralångsamt med sin egen orbit
  - 3-4 stycken, olika storlekar (80px–200px)

**Innehåll:**
- Eyebrow label: `WEBBYRÅ · SVERIGE · EST. 2025` — IBM Plex Mono, 10px, `var(--text-muted)`, letter-spacing 0.15em
- Rubrik rad 1: `Premium hemsidor` — Instrument Serif, `clamp(52px, 7vw, 96px)`, `var(--text)`
- Rubrik rad 2: `för svenska bolag.` — Instrument Serif, italic, samma storlek
  - Färg: `#1B3A6B`
  - **Glow — uppgraderat till neon:**
    ```css
    color: #2962B9;
    filter: drop-shadow(0 0 20px rgba(41,98,185,0.6))
            drop-shadow(0 0 40px rgba(41,98,185,0.3))
            drop-shadow(0 0 80px rgba(27,58,107,0.2));
    animation: glowPulse 3s ease-in-out infinite;
    
    @keyframes glowPulse {
      0%, 100% { filter: drop-shadow(0 0 20px rgba(41,98,185,0.6)) drop-shadow(0 0 40px rgba(41,98,185,0.3)); }
      50% { filter: drop-shadow(0 0 28px rgba(41,98,185,0.9)) drop-shadow(0 0 60px rgba(41,98,185,0.5)); }
    }
    ```
- Underrubrik: `Animerade. Mobilanpassade. Klara på 10 dagar.` — Plus Jakarta Sans, 17px, `var(--text-secondary)`
- CTA-knappar: "Boka ett möte →" (primär, magnetisk) + "Se våra projekt" (ghost, magnetisk)

**Hero entry animation (Framer Motion):**
- Eyebrow: `y: 20 → 0, opacity: 0 → 1`, delay 0.3s
- Rubrik rad 1: `y: 40 → 0, opacity: 0 → 1`, delay 0.5s
- Rubrik rad 2: `y: 40 → 0, opacity: 0 → 1`, delay 0.65s
- Underrubrik: delay 0.8s
- Knappar: delay 1.0s
- Alla: `duration: 0.8s, ease: [0.76, 0, 0.24, 1]`

---

## 6. CONTAINER SCROLL 3D

**Fil:** `components/ContainerScroll.tsx`

- Browser mockup (macOS chrome: tre färgprickar + URL-bar) tiltar in vid scroll
- `useScroll` + `useTransform`: `rotateX: 45deg → 0deg` när sektionen scrollas in
- Inuti mockupen: screenshot av Koppar PRO-projektet (eller placeholder)
- Label under: `KOPPAR · PRO` i IBM Plex Mono + `Specialty Coffee · Halmstad` i Plus Jakarta Sans
- Sektionens heading: `Hemsidor som` / `faktiskt imponerar.` i Instrument Serif
- Subtext: `Varje projekt byggs från grunden. Ingen mall. Ingen genväg.`

---

## 7. iPHONE MOCKUP — mobilpassad-sektion

**Fil:** `components/IPhoneMockup.tsx`

**Layout:** Split — vänster text, höger iPhone

**Vänster:**
- Eyebrow: `MOBILANPASSAD` — IBM Plex Mono
- Rubrik: `Ser lika bra ut` / `på telefonen.` — Instrument Serif, italic på rad 2
- Body: `Varje sajt vi bygger är designad mobilfirst. Inga kompromisser. Testad på alla skärmstorlekar.`
- Stats: `100%` + `Mobilresponsiv` / `90+` + `Lighthouse score` — siffrorna i IBM Plex Mono, färg `var(--accent)`

**Höger — iPhone:**
- Svart iPhone-ram med notch
- Inuti: auto-scrollande screenshot av Havets PRO (mörkt projekt = bra kontrast mot ljus bakgrund)
- **Glow:** `box-shadow: 0 0 60px 20px rgba(27,58,107,0.25), 0 0 120px 40px rgba(27,58,107,0.12)`
- iPhone lutar `rotate: -3deg` på desktop
- Framer Motion: vid scroll in → `rotate: -8deg → -3deg`, `y: 40 → 0`

---

## 8. PROCESSEN — cinematic horizontal storytelling

**Fil:** `components/Process.tsx`

**Koncept:** GSAP ScrollTrigger horizontal pin. Användaren scrollar vertikalt men sektionen är fastnålad och de fyra stegen glider horisontellt in. Varje steg tar upp ~80% av skärmbredden.

**Övergripande:**
- Sektion: `height: 500vh` (5x viewport för scroll-utrymme)
- Inner wrapper: `position: sticky, top: 0, height: 100vh, overflow: hidden`
- GSAP ScrollTrigger pinnar inner wrapper, animerar `translateX` på steps-container

**Steg 1 — Discovery:**
- Bakgrund: `--bg-dark`
- En cirkel expanderar från centrum (`scale: 0 → 1, opacity: 0.15`), SVG-ring
- Label: `01 · DISCOVERY` — IBM Plex Mono, mörkblå/dimmig
- Rubrik: `Vi lär känna ditt bolag.` — Instrument Serif, vit, 52px
- Body: `30 minuter. Inga slides. Vi lyssnar.`
- Animation: texten stagger-animeras in från `y: 30`

**Steg 2 — Brief:**
- Bakgrund: `--bg` (ljust)
- Ett minimalistiskt "dokument" byggs upp rad för rad — tunna linjer (`div` med `width: 0 → 100%`) som representerar text
- Label: `02 · BRIEF`
- Rubrik: `Vi planerar varje sektion tillsammans.`
- Body: `Du vet exakt vad du får. Ingen överraskning.`

**Steg 3 — Bygge:**
- Bakgrund: `--bg-dark`
- Bakgrundseffekt: IBM Plex Mono-kod flödar uppåt i bakgrunden, `opacity: 0.04`, vit text
  ```
  // Visa fragment av faktisk Next.js/CSS-kod — autentiskt, inte påhittat
  const Hero = () => {
  return <section className={styles.hero}>
  filter: drop-shadow(0 0 20px...
  gsap.to(element, { y: 0...
  ```
- Label: `03 · BYGGE`
- Rubrik: `Klart på 5–10 arbetsdagar.`
- Body: `Vi sätter ett datum och håller det.`

**Steg 4 — Live:**
- Bakgrund: gradient från `--bg-dark` → `--bg`
- Animation: en "power on"-effekt — ljus blink, sedan en browser-mockup som poppar in med `scale: 0.9 → 1`
- Label: `04 · LIVE`
- Rubrik: `Domän kopplad. Analytics aktivt.`
- Body: `Du är live. Vi följer upp efter 7 dagar.`

**Mobil:** Vertical scroll, varje steg 100vh, samma animationer men trigger på scroll-in

---

## 9. PORTFOLIO — halvcirkel med djup

**Fil:** `components/Portfolio.tsx`

**Behålls:** Halvcirkel-rotations-koncept med scroll-styrning

**Uppgraderas:**

**Korten:**
- Varje kort: rounded corners 16px, overflow hidden
- Aktivt kort (12 o'clock): **parallax inuti** — `onMouseMove` → bakgrunden rör sig `±8px` relativt kortet (depth illusion)
- Aktiv kort border: `1px solid rgba(255,255,255,0.15)` + subtle `box-shadow: inset 0 1px 0 rgba(255,255,255,0.2)`
- Shimmer-animation längs kanten: `@keyframes shimmer` med `background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)` som sweepas
- Inaktiva kort: `opacity: 0.45, blur(3px), scale: 0.88, rotateY: ±15deg` — 3D-perspektiv som om de lutar sig bakåt
- Hover på inaktivt kort: `opacity: 0.65, blur(1px)` med ease 0.3s

**Projekt (4 stycken):**
```
1. Koppar PRO — gradient: #8B4513 → #D4A053 (varm brun/guld)
2. Havets PRO — gradient: #0D2B4E → #1B3A6B (djupblå)
3. Strand Studio BAS — gradient: #4A5568 → #718096 (neutral grå)
4. Lindqvist VVS BAS — gradient: #1A3A2A → #2D6A4F (mörkgrön)
```

**Under aktivt kort:**
- Projekttier badge: `PRO` eller `BAS` — IBM Plex Mono, 10px, uppercase, `var(--accent)`
- Projektnamn: Instrument Serif, 24px
- Kategori · Stad: Plus Jakarta Sans, 13px, `var(--text-muted)`
- "Se projektet →" länk med underline-animation
- Dot-navigation: 4 prickar, aktiv = fylld accent

---

## 10. PRISPLANER — liquid glass + sky

**Fil:** `components/Plans.tsx`

**Bakgrund — animated gradient mesh:**
```css
.plansBackground {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #e8f4fd 0%, #f0f7ff 25%, #fafcff 50%, #eef3fb 75%, #ddeeff 100%);
  /* 4 animerade färgpunkter som orbs */
}

/* Fyra radial-gradient orbs som rör sig */
.orb1 {
  position: absolute;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(27,58,107,0.12) 0%, transparent 70%);
  animation: orbFloat1 12s ease-in-out infinite;
  top: -100px; left: -100px;
}
/* osv för orb2, orb3, orb4 med olika positioner och animationsdurationer */

@keyframes orbFloat1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(80px, 60px); }
}
```

**Korten — liquid glass:**
```css
.planCard {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(27,58,107,0.08),
    inset 0 1px 0 rgba(255,255,255,0.9);
}

/* PRO-kortet — roterande glow border */
.planCard.pro {
  border: 1px solid rgba(27,58,107,0.3);
  box-shadow: 
    0 0 0 1px rgba(27,58,107,0.15),
    0 20px 60px rgba(27,58,107,0.2),
    inset 0 1px 0 rgba(255,255,255,0.9);
  transform: scale(1.04);
  /* Roterande conic-gradient border overlay via ::before */
}

.planCard.pro::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 21px;
  background: conic-gradient(
    from var(--angle),
    transparent 70%,
    rgba(27,58,107,0.6) 80%,
    rgba(41,98,185,0.8) 90%,
    transparent 100%
  );
  animation: rotateBorder 4s linear infinite;
  z-index: -1;
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotateBorder {
  to { --angle: 360deg; }
}
```

**Innehåll per kort:**
- Tier label: `BAS` / `PRO` / `ELITE` — IBM Plex Mono, 11px, uppercase
- Pris: `9 900 kr` — siffror IBM Plex Mono, 42px; `kr` 20px
- Månadsavgift: `990 kr/mån (hosting + drift)` — 12px, muted
- Tagline: kursiv Instrument Serif
- Features: checkmarks (SVG, `var(--accent)`)
- CTA-knapp: primär (accent) för PRO, ghost för övriga

**"Mest populär" badge på PRO:**
- `background: var(--accent)`, pill-shape, `color: white`, IBM Plex Mono 10px

---

## 11. STICKY VIDEO + SCROLLANDE TEXT — dark cinema

**Fil:** `components/StickyVideo.tsx`

**Layout:** 50/50 split, sticky left panel

**Vänster panel (sticky):**
- Bakgrund: `--bg-dark`, full height 100vh
- Innehåll centrerat
- Eyebrow: `KLING VIDEO` — IBM Plex Mono, 10px, `rgba(255,255,255,0.3)`
- Video-container: `border-radius: 12px`, overflow hidden, `max-width: 380px`
  - Vignette overlay: `box-shadow: inset 0 0 60px rgba(0,0,0,0.4)`
  - Placeholder tills Kling-video finns: `background: linear-gradient(135deg, #0D1B2A, #1B3A6B)` + Nordic Icon logotyp centrerad
- **Progress bar** under video-containern: tunn linje, `width: 0 → 100%` baserat på scroll-progress genom de tre påståendena, `background: var(--accent)`

**Höger panel (scrollar):**
- Bakgrund: `--bg` (ljus — kontrasten mot mörk vänster är dramatisk)
- Tre påståenden, vardera ~100vh höjd, centrerade vertikalt

**Påstående 1:**
- Nummer: `01` — IBM Plex Mono, `var(--accent)`
- Rubrik: `Vi designar inte templates.` — Instrument Serif italic, 42px
- Body: `Varje sajt byggs från din brief. Ingen mall. Ingen genväg.`
- Animation: GSAP SplitText, bokstäver kommer in från nedre clip-path: `inset(0 0 100% 0) → inset(0 0 0% 0)`, stagger 0.015s

**Påstående 2:**
- Nummer: `02`
- Rubrik: `Varje kund pratar med oss.`
- Body: `Inte ett callcenter. Du pratar med Max eller Rasmus.`

**Påstående 3:**
- Nummer: `03`
- Rubrik: `Klart på 10 dagar.`
- Body: `Eller pengarna tillbaka. Vi sätter ett datum och håller det.`

**GSAP ScrollTrigger:**
```js
// Pin vänster panel
// Varje höger-påstående triggar när det är 50% in i viewport
// SplitText animation per påstående
// Progress bar uppdateras kontinuerligt
```

---

## 12. FAQ — editorial storlek + Jesko Jets smooth

**Fil:** `components/FAQ.tsx`

**Styling:**
- Frågorna: Instrument Serif, `28px` desktop / `22px` mobil, `font-weight: 400`
- Line-height: `1.4`
- Padding per rad: `28px 0`
- Separator: `1px solid var(--border)`
- Bakgrund alternerar: udda rader `var(--bg)`, jämna rader `var(--bg-secondary)`

**Expand-animation — exakt Jesko Jets:**
```css
/* Svar-containern */
.answer {
  overflow: hidden;
  /* Höjden animeras med clip-path, inte height */
}

/* Öppen: */
.answer.open {
  clip-path: inset(0 0 0% 0);
}
/* Stängd: */
.answer.closed {
  clip-path: inset(0 0 100% 0);
}
```
```js
// cubic-bezier(0.76, 0, 0.24, 1), duration: 0.6s
// INTE bouncy, INTE elastic — precis, kontrollerad
```

**Plus-ikonens morph — SVG path animation:**
```tsx
// SVG med två paths: horisontell linje + vertikal linje
// Vid öppen: vertikal linje scaleY: 1 → 0, rotate: 0 → 90deg
// Ser ut som: + → − (inte rotation till ×)
// duration: 0.4s, same cubic-bezier
```

**FAQ-frågor:**
1. Hur lång tid tar det att bygga?
   → BAS tar 5–7 dagar. PRO tar 7–10 dagar. ELITE tar 14–21 dagar. Vi sätter alltid ett datum och håller det.
2. Vad kostar hosting?
   → 990 kr/mån för BAS, 1 490 kr/mån för PRO, 1 990 kr/mån för ELITE. Hosting + teknisk garanti ingår alltid.
3. Kan jag byta text och bilder själv?
   → Ja, på ELITE-planen ingår Sanity CMS — ett enkelt admin-gränssnitt. På BAS och PRO skickar du ett mail och vi fixar det samma dag.
4. Äger jag koden?
   → Ja. Fullständig äganderätt. Koden lever på ditt GitHub-konto från dag ett.
5. Vad händer om jag inte är nöjd?
   → Vi jobbar tills du är nöjd. Ingår i priset. Har vi missat målet helt — pengarna tillbaka.
6. Jobbar ni med hela Sverige?
   → Ja, vi tar kunder från hela Sverige. Alla möten sker via Google Meet.

---

## 13. KONTAKT + KALENDER

**Fil:** `components/Contact.tsx` + `components/BookingCalendar.tsx`

**Layout:** Split, 50/50

**Vänster — formulär:**
- Eyebrow: `KONTAKT` — IBM Plex Mono
- Rubrik: `Redo att` / `komma igång?` — Instrument Serif, italic på rad 2
- Body: `Ring Rasmus direkt, eller fyll i formuläret nedan så hör vi av oss samma dag.`
- Kontaktinfo: telefon + mail med accent-färg

**Inputs — underline style:**
```css
.input {
  border: none;
  border-bottom: 1px solid var(--border);
  background: transparent;
  padding: 12px 0;
  font-family: 'Plus Jakarta Sans';
  font-size: 15px;
  color: var(--text);
  width: 100%;
  transition: border-color 0.3s ease;
}

.input:focus {
  outline: none;
  border-bottom-color: var(--accent);
}

/* Animated accent line vid focus */
.input::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 1px;
  background: var(--accent);
  transition: width 0.4s cubic-bezier(0.76, 0, 0.24, 1);
}
.input:focus::after { width: 100%; }
```

**Floating labels:**
```tsx
// Label sitter i input som placeholder
// Vid focus eller om värde finns: translateY(-20px), scale(0.8), color: var(--accent)
// Smooth transition: 0.3s ease
```

**Submit-knapp animation:**
```tsx
// Idle: "Skicka meddelande →"
// Hover: liquid fill från vänster — pseudoelement width: 0 → 100%
// Loading: spinner (SVG rotation)
// Success: checkmark + "Skickat! Vi hör av oss snart."
// Error: shake-animation + röd border
```

**Höger — kalender-widget:**
- Header: `BOKA ETT MÖTE` — IBM Plex Mono
- Subtext: `30 minuter · Google Meet · Kostnadsfritt`
- Kalender: månadsvy, grid med veckodagar
- Tillgängliga datum: klickbara, `hover: background: var(--accent-subtle)`
- Valt datum: `background: var(--accent), color: white`
- Otillgängliga: `opacity: 0.3, cursor: not-allowed`
- Efter val av datum: tidslots glider in med smooth animation
- API: `GET /api/available-times?date=YYYY-MM-DD`
- Bokning: `POST /api/book-meeting` → Resend skickar bekräftelse

---

## 14. PRE-FOOTER CTA

**Fil:** `components/PreFooterCTA.tsx`

**Bakgrund:** `--bg-dark`

**Innehåll:**
- Eyebrow: `KOM IGÅNG` — IBM Plex Mono, `rgba(255,255,255,0.3)`
- Rubrik rad 1: `Din nästa hemsida` — Instrument Serif, `clamp(48px, 6vw, 80px)`, vit
- Rubrik rad 2: `är ett samtal bort.` — Instrument Serif, italic, samma storlek, `opacity: 0.6`
- Body: `Vi bygger premium hemsidor för svenska bolag. Klara på 10 dagar. Från 9 900 kr.`
- Knappar: "Boka ett möte →" (primär, magnetisk, pill) + "Ring Rasmus: 070-XXX XX XX" (ghost, magnetisk)

**Bakgrundseffekt:**
- Subtle radial gradient glow centrerat: `rgba(27,58,107,0.3)` i centrum → transparent
- Samma aurora-canvas som hero men `opacity: 0.4`

---

## 15. FOOTER REVEAL — korrekt implementation

**Fil:** `components/Footer.tsx`

**KRITISKT — detta är vad som fixar footer-problemet:**

```css
/* Footer ska vara sticky i botten med lågt z-index */
.footer {
  position: sticky;
  bottom: 0;
  z-index: 0; /* Lågt z-index — innehåll scrollar ÖVEr den */
}

/* Alla sektioner ovanför footer måste ha: */
.section {
  position: relative;
  z-index: 1; /* Högre än footer */
  background: var(--bg); /* Måste ha bakgrundsfärg — annars syns footer igenom */
}

/* PreFooterCTA — sista sektionen innan footer */
.preFooterCTA {
  position: relative;
  z-index: 1;
  background: var(--bg-dark);
}
```

**Footer-innehåll:**
- Bakgrund: `--bg-dark`
- Grid: 4 kolumner — Logotyp+tagline | Sidor | Kontakt | (tom)
- Logotyp: `Nordic Icon` i Instrument Serif italic
- Tagline: `Premium hemsidor för svenska bolag. Klara på 10 dagar. Från 9 900 kr.`
- Sidor: Hem, Projekt, Planer, Om oss, Kontakt
- Kontakt: hej@nordicicon.se, 070-XXX XX XX, Sverige · Heldigitalt

**Live-indicator (urgency, diskret):**
```tsx
// Liten pulsande grön dot: width/height 6px, border-radius 50%
// background: #22C55E
// animation: pulse 2s ease-in-out infinite (scale 1 → 1.4 → 1, opacity 1 → 0.4 → 1)
// Text bredvid: "Tar emot nya kunder" — IBM Plex Mono, 10px, rgba(255,255,255,0.4)
```

**"NORDIC ICON" outline-typografi:**
```css
.footerWordmark {
  font-size: 15vw;
  font-family: 'Instrument Serif';
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.08); /* Standard opacity */
  letter-spacing: -0.02em;
  line-height: 1;
  /* Parallax: rör sig 20% långsammare än scroll via GSAP */
  /* Gradient stroke animation: */
  background: linear-gradient(90deg, 
    rgba(27,58,107,0.15), 
    rgba(41,98,185,0.3), 
    rgba(27,58,107,0.15)
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  animation: strokeShift 8s ease-in-out infinite;
}

@keyframes strokeShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**Mer padding under wordmark:**
- `padding-bottom: clamp(40px, 6vw, 80px)` — lite mer luft, inte för mycket

**Copyright:**
- `© 2026 Nordic Icon AB` vänster
- `Byggd av Nordic Icon` höger
- Båda: Plus Jakarta Sans, 12px, `rgba(255,255,255,0.25)`

---

## 16. SCROLL TRANSITIONS MELLAN SEKTIONER

**Fil:** `components/SectionTransition.tsx` eller direkt i varje sektion

**Implementering med Framer Motion + Intersection Observer:**

```tsx
// Varje sektion wrappas i en motion.section
// Initial state: clip-path eller opacity beroende på transition-typ
// Trigger: när 15% av sektionen är synlig

// Hero → ContainerScroll: ingen speciell transition (naturlig)
// ContainerScroll → iPhone: diagonal wipe från vänster
//   clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)
// iPhone → Processen: ingen (processen tar hand om sin egen)
// Portfolio → Planer: circular reveal
//   clip-path: circle(0% at 50% 50%) → circle(150% at 50% 50%)
// Planer → StickyVideo: vertical split
//   clip-path: inset(50% 0 50% 0) → inset(0% 0 0% 0)
// FAQ → Kontakt: ingen (subtilt nog redan)

// Alla transitions: cubic-bezier(0.76, 0, 0.24, 1), 0.8s
// Trigger once: true (händer bara en gång)
```

---

## 17. LENIS SMOOTH SCROLL — global

**Fil:** `app/layout.tsx` eller `components/LenisProvider.tsx`

```tsx
'use client'
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
```

---

## PRIORITETSORDNING FÖR IMPLEMENTATION

1. **Footer fix** — löser det akuta problemet, sticky z-index
2. **Globals** — CSS variables, Lenis, fonts
3. **Custom cursor** — gäller hela sidan
4. **Scroll progress bar** — alltid synlig
5. **Hero** — aurora canvas + neon glow + entry animations
6. **Navbar** — morphing + frosted glass
7. **Processen** — fullständig rebuild, horizontal GSAP pin
8. **Prisplaner** — liquid glass + animated sky
9. **Sticky video** — dark cinema layout + SplitText
10. **FAQ** — editorial storlek + smooth clip-path expand
11. **Portfolio** — parallax inuti kort + 3D inaktiva
12. **Kontakt** — underline inputs + floating labels + kalender
13. **Pre-footer CTA** — uppgradera knappar + bakgrundseffekt
14. **Footer** — wordmark parallax + live indicator
15. **Page loader** — polish
16. **Scroll transitions** — sist, när allt annat är på plats

---

## KVALITETSKONTROLL — ELITE-testet

Innan deploy, kontrollera:
- [ ] Ingen dead scroll-zone — varje pixel är intentional
- [ ] Alla primära CTAs är magnetiska
- [ ] Lenis fungerar med GSAP ScrollTrigger (gsap.ticker integration)
- [ ] Footer revealar korrekt — inte flytande ovanpå innehåll
- [ ] Aurora canvas pausar vid `prefers-reduced-motion`
- [ ] Custom cursor visas inte på touch-enheter
- [ ] Liquid glass fungerar i Safari (webkit-prefix)
- [ ] Conic-gradient border animation fungerar (kräver @property stöd — fallback för äldre)
- [ ] SplitText importeras från GSAP (kräver GSAP Club eller lokal kopia)
- [ ] Alla animationer respekterar `prefers-reduced-motion: reduce`
- [ ] Mobile: alla animationer testade på iPhone Safari
- [ ] Lighthouse score > 85 trots animationer (canvas och video lazy-loaded)

---

*Dokument version 1.0 · Nordic Icon AB · April 2026*
*Referens: jeskojets.com · voltaskai.endover.ee · apple.com*
