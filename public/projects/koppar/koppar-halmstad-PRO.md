# Project Brief — Koppar
## Nordic Icon AB | PRO Plan
## Status: FICTIONAL — Portfolio example (Specialty coffee, Halmstad)

---

## 1. COMPANY OVERVIEW

```
Company name:        Koppar
Legal name:          Koppar Kafé AB
Industry/trade:      Café / Specialty coffee
Sub-category:        Specialty coffee, egenrostat, atmosfärsdrivet
Founded year:        2022
Company size:        6 anställda
Owner/founder name:  Lena Björk
Owner background:    Lena jobbade i 8 år som barista i London och
                     Amsterdam. Utbildad Q-grader (certifierad
                     kaffeprovare). Kom tillbaka till Halmstad 2022
                     och öppnade Koppar med ett enkelt mål: Halmstad
                     förtjänar ett riktigt kafé.
```

---

## 2. LOCATION & SERVICE AREA

```
Primary city:        Halmstad
Neighborhood:        Centrum, nära Stortorget
Address:             Köpmangatan 12, 302 43 Halmstad
Phone:               035-123 456
Email:               hej@kopparkafe.se
Domain:              kopparkafe.se
```

---

## 3. WHAT THEY DO

```
Primary:    Specialty coffee — espresso, filter, pour-over
            Egenrostat i källaren under kaféet

Secondary:
  - Bakverk bakade på plats varje morgon
  - Enkel lunch (smörgåsar, soppor, sallader)
  - Kaffeprovningar och workshops (boka i förväg)
  - Kaffebönor att köpa med hem (egna roster)

What they DON'T do:
  - Ingen kedjekänsla
  - Inga sockriga frappuccinos
  - Ingen mat som inte är lagad på plats
```

---

## 4. THEIR CUSTOMERS

```
Primary customer type: B2C — kaffenördar, lokalbor, besökare

Typical customer:
  Age:         25–55
  Situation:   Söker en plats att sitta, arbeta eller ha
               ett möte. Eller vill ha ett riktigt kaffe
               utan att behöva kompromissa.
  Cares about: Att kaffet är genomtänkt. Att det finns
               plats att sitta och tänka. Att personalen
               kan berätta om vad de serverar.
  Worries:     Att det är pretentiöst. Att det är dyrt
               utan anledning. Att de inte förstår menyn.

Stammisar:    Hög andel — många kommer varje dag
```

---

## 5. DIFFERENTIATORS

```
Main reason customers choose them:
  "Det är det enda stället i Halmstad där kaffet
  faktiskt smakar något. Och interiören — man vill
  inte gå därifrån."

Key differentiators:
  1. Egenrostat i källaren — ingen annan i Halmstad gör det
  2. Q-gradad ägare — kompetensen syns i koppen
  3. Interiören — koppar, trä, varmt ljus, inga fel detaljer
  4. Bakverken — bakade på plats kl 05 varje morgon

Never want customers to think:
  Att det är svårt att förstå menyn.
  Att man måste vara kaffenörd för att trivas.
  Att det är kallt och hipstigt.
```

---

## 6. COPY BRIEF — Client's Own Words

```
Q: What do most customers ask about?
A: Varifrån kaffet kommer. Och om vi har oat milk.
   Svaret på båda är ja.

Q: What do customers say after their first visit?
A: "Jag visste inte att kaffe kunde smaka såhär."
   Det är det bästa vi kan höra.

Q: What do you do that others in Halmstad don't?
A: Vi rostar själva. Varje vecka. I källaren.
   Du kan lukta det när du går förbi på morgonen.

Q: What's the worst thing a bad café does?
A: Serverar kaffe utan att bry sig om varifrån det kommer.
   Det märks i smaken.

Q: How long does a typical visit take?
A: Allt från fem minuter vid baren till tre timmar
   med en laptop. Båda är välkomna.

Q: What should someone know before visiting?
A: Att vi inte har WiFi-lösenord på menyn — man får fråga.
   Och att bakverken tar slut. Kom inte för sent.

Q: What are you most proud of?
A: Att vi fått Halmstad att bry sig om kaffe.
   Folk frågar nu varifrån bönorna kommer.
   Det hände inte för tre år sedan.

Q: Anything you want the website to say?
A: Att vi inte är svåra. Att alla är välkomna.
   Men att vi tar kaffet på allvar.
```

---

## 7. VISUAL DIRECTION

```
Plan:  PRO
Track: Mörk Premium — men varm, inte kall

Mood: Som att kliva in i ett rum med koppar i taket,
      varmt ljus och doften av nyrostat kaffe.
      Mörkt men inte dystert. Dramatiskt men inte kallt.
      Tänk: ett välbelyst museum möter ett europeiskt
      espressobar. Detaljerat. Genomtänkt.

Skillnad mot Havets:
  Havets var dramatisk och exklusiv.
  Koppar ska vara varm och inbjudande — premium men
  aldrig skrämmande. Folk ska vilja gå dit, inte imponeras.

PRO-features som MÅSTE vara med:
  - Lenis smooth scroll
  - GSAP ScrollTrigger på minst 3 sektioner
  - SplitText på hero H1
  - Parallax på minst en bild
  - Navbar: döljer vid scroll ner, visar vid scroll upp
  - Minst en PRO-bildtyp (parallax, sticky eller editorial break)
```

---

## 8. COLORS

```css
:root {
  --bg:               #0F0C09;
  --bg-secondary:     #1A1510;
  --bg-tertiary:      #241E17;
  --text:             #EDE8E0;
  --text-secondary:   #9A9088;
  --text-muted:       #5A5248;
  --accent:           #C17F3A;      /* Varm koppar — kaféets namn */
  --accent-hover:     #A86D2E;
  --accent-subtle:    rgba(193, 127, 58, 0.12);
  --accent-shadow:    rgba(193, 127, 58, 0.25);
  --border:           rgba(237, 232, 224, 0.08);
  --border-hover:     rgba(237, 232, 224, 0.16);
}
```

Accent #C17F3A = varm koppar. Refererar direkt till kaféets namn
och till rostprocessen. Varmare och mer inbjudande än Havets brons.
Bakgrunden #0F0C09 är varm mörkbrun — inte svart.

---

## 9. TYPOGRAPHY

```
Heading font:  Cormorant Garamond (elegant serif — refererar till
               europeisk kafétradition)
Body font:     General Sans (modern, läsbar, professionell)
Mono font:     IBM Plex Mono (för priser, labels, öppettider)

Google Fonts:
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet">

Fontshare:
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500&display=swap" rel="stylesheet">

IBM Plex Mono:
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

PRO-regel: Sista orden i H1/H2 ska alltid vara
Cormorant Garamond italic.
```

---

## 10. PAGES

```
[x] Startsida (index.html)
[x] Menyn (menu.html)
[x] Om oss / Rostningen (about.html)
[x] Kontakt & hitta hit (contact.html)
```

---

## 11. SEO DATA

```
Primary keyword:  Café Halmstad

Secondary:
  Specialty coffee Halmstad
  Egenrostat kaffe Halmstad
  Kafé centrum Halmstad
  Bästa kaffe Halmstad
  Kaffeprovning Halmstad

Title tags:
  index.html:   Koppar — Specialty Coffee i Halmstad
  menu.html:    Menyn | Koppar Kafé Halmstad
  about.html:   Om Koppar & Rostningen | Halmstad
  contact.html: Hitta hit | Koppar | Köpmangatan 12 Halmstad

Meta description:
  Koppar är Halmstads specialty coffee-kafé.
  Egenrostat i källaren, bakverk bakade varje morgon.
  Köpmangatan 12, centrum. Öppet mån–fre 07–18, lör–sön 08–17.

Schema: CafeOrCoffeeShop (extends FoodEstablishment)

llms.txt:
  # Koppar
  Koppar är ett specialty coffee-kafé i centrala Halmstad.
  Vi rostar vårt eget kaffe i källaren varje vecka.
  Espresso, filter, pour-over och bakverk bakade på plats.
  Ägare Lena Björk är Q-gradad kaffeprovare.
  Kaffeprovningar och workshops bokas i förväg.
  Köpmangatan 12, 302 43 Halmstad.
  035-123 456 · hej@kopparkafe.se
  Öppet: Mån–Fre 07:00–18:00, Lör–Sön 08:00–17:00
```

---

## 12. IMAGES

```
Alla bilder: Nano Banana 2. Varma toner. Mörk bakgrund.
Dramatiskt men inbjudande — aldrig kallt.

Hero (fullscreen 16/9 eller 4/3):
  "Close-up of a barista's hands pouring a perfect espresso
  into a small ceramic cup. Dark wooden counter, copper
  details visible. Single warm overhead light. Editorial
  coffee photography. Deep shadows, warm amber tones.
  Cinematic, intimate."

Roststeri-bild (3/4 eller 16/9):
  "Small coffee roastery in a basement. Vintage roasting
  machine with copper elements. Warm orange glow from the
  roaster. One person working, focused. Documentary style.
  Dramatic shadows."

Om oss / Lena (3/4 porträtt):
  "Woman in her late 30s standing at a coffee bar, holding
  a small espresso cup. Warm lighting, dark background.
  Confident, calm. Editorial portrait. Copper and wood
  details in background."

Atmospheric / editorial break (16/9):
  "Interior of a premium café at dusk. Copper pendant lights,
  dark wood tables, a few guests in soft focus. Warm amber
  light, no harsh shadows. Cinematic depth of field."

Bakverk (4/3):
  "Freshly baked pastries on a dark slate surface. Natural
  side light. Minimal styling. Editorial food photography."
```

---

## 13. FULL CONTENT

```
Menyn:
  Espresso:          35 kr
  Americano:         40 kr
  Cappuccino:        52 kr
  Flat white:        52 kr
  Filter (per kopp): 45 kr
  Pour-over:         65 kr
  Latte:             55 kr
  Oatly/havremjölk ingår utan tillägg

  Bakverk (varierar dagligen): 35–55 kr
  Smörgås:           85–95 kr
  Soppa med bröd:    115 kr

  Kaffebönor att köpa:
    250g påse:       135 kr
    500g påse:       245 kr

Öppettider:
  Måndag–Fredag: 07:00–18:00
  Lördag:        08:00–17:00
  Söndag:        09:00–16:00

Kaffeprovning:
  Privat provning (2–8 pers): 295 kr/person
  Bokas minst 48h i förväg via mail

Testimonials:
  1. "Jag visste inte att kaffe kunde smaka såhär.
     Nu förstår jag varför folk bryr sig."
     — Erik S., Halmstad

  2. "Det enda stället i Halmstad där jag faktiskt
     stannar kvar. Interiören, kaffet, allt stämmer."
     — Maja L., Göteborg

  3. "Lena förklarade varifrån bönorna kom och varför
     det spelar roll. Jag köper aldrig supermarkets-
     kaffe igen."
     — Thomas K., Halmstad
```

---

## 14. TECHNICAL

```
Domain:    kopparkafe.se
Hosting:   Vercel
GitHub:    nordic-icon-koppar-halmstad-PRO
```

---

## 15. DELIVERY NOTES

```
PRO-plan. Lenis + GSAP + ScrollTrigger + SplitText.

Viktigt för detta projekt:
- Bakgrunden är varm mörkbrun #0F0C09 — INTE svart
- Accent #C17F3A ska kännas som varmt kopparljus, inte guld
- Cormorant Garamond + General Sans — samma som Havets
  men känslan ska vara varmare och mer tillgänglig
- Alla bilder ska ha varma amber-toner — ingen kall blå
- Hero ska ha SplitText på H1 — letter-by-letter
- Minst en editorial break-sektion (fullbredds bild 60-70vh)
- Sticky scroll eller split scroll för att visa rostprocessen

Skillnad mot Havets (föregående PRO mörkt projekt):
  Havets: exklusiv, stängd, få platser, reservation krävs
  Koppar: välkomnande, öppen, alla kan komma — men premium
  Havets kändes som ett hemligt rum. Koppar ska kännas
  som det bästa rummet i stan som alla får vara i.

Testa: Vill man gå dit efter att ha sett sidan? 
Om ja — det är PRO-kvalitet.
```
