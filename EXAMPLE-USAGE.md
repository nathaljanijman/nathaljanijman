# 🎯 Praktisch Voorbeeld: Portfolio voor Jan Jansen

Dit is een stap-voor-stap voorbeeld hoe je in **5 minuten** een portfolio bouwt voor een klant.

---

## Scenario

**Klant:** Jan Jansen
**Beroep:** UX Designer
**Email:** jan@janjansen.nl
**Brand kleur:** Oranje (#FF6B35)

---

## Stap 1: Portfolio genereren (30 seconden)

```bash
./generate-portfolio.sh
```

**Input:**
```
Klant naam: Jan Jansen
Klant email: jan@janjansen.nl
Klant telefoon: +31612345678
LinkedIn URL: https://linkedin.com/in/janjansen
Brand kleur: #FF6B35
```

**Output:**
```
✅ Portfolio succesvol aangemaakt!
📁 Locatie: ../jan-jansen-portfolio
```

---

## Stap 2: Content aanpassen (2 minuten)

Open `config.js` en pas aan:

```javascript
hero: {
    nl: {
        name: "Jan Jansen",
        tagline: "Ik ontwerp gebruiksvriendelijke digitale ervaringen",  // ← AANGEPAST
        inputPlaceholder: "Waar kan ik je mee helpen?",
        suggestions: [
            "Ik wil een betere user experience",            // ← AANGEPAST
            "Ik wil mijn app redesignen",                   // ← AANGEPAST
            "Ik wil een UX audit"                           // ← AANGEPAST
        ]
    },
    en: {
        // ... Engelse versie
    }
}
```

Projects toevoegen:

```javascript
projects: {
    items: [
        {
            id: "app-redesign",
            category: "ux-design",
            featured: true,
            image: "images/project-app.png",
            year: { nl: "2024", en: "2024" },
            type: { nl: "UX Design", en: "UX Design" },
            title: "Mobile App Redesign - FinTech Startup",
            description: {
                nl: "Complete UX overhaul van een fintech app. Van 2.1★ naar 4.7★ rating door gebruikersonderzoek en iteratief design.",
                en: "Complete UX overhaul of a fintech app. From 2.1★ to 4.7★ rating through user research and iterative design."
            },
            impact: [
                { number: "120%", label_nl: "Meer conversie", label_en: "More conversion" },
                { number: "4.7★", label_nl: "App rating", label_en: "App rating" }
            ],
            tags: ["Figma", "User Research", "Prototyping", "A/B Testing"],
            links: [
                { type: "demo", url: "#", label_nl: "Case Study", label_en: "Case Study" }
            ]
        }
        // ... meer projecten
    ]
}
```

About sectie:

```javascript
about: {
    paragraphs: {
        nl: [
            "Als UX designer help ik bedrijven betere digitale producten maken. Met 8+ jaar ervaring in tech startups en corporate, weet ik wat werkt - en wat niet.",
            "Van gebruikersonderzoek tot high-fidelity prototypes, ik begeleid het hele UX proces. Data-driven design is mijn stokpaardje: elke keuze wordt gevalideerd met échte gebruikers.",
            "Gewerkt met klanten als Booking.com, ING, en diverse scale-ups. Ik geloof in iteratief design, continue testing, en producten die mensen écht fijn vinden om te gebruiken."
        ],
        en: [
            // ... Engelse versie
        ]
    },
    stats: [
        { number: "8+", label_nl: "Jaar UX Design", label_en: "Years UX Design" },
        { number: "50+", label_nl: "Projecten", label_en: "Projects" },
        { number: "NL", label_nl: "Based in Amsterdam", label_en: "Based in Amsterdam" }
    ]
}
```

---

## Stap 3: Afbeeldingen vervangen (2 minuten)

```bash
cd jan-jansen-portfolio/images/

# Vervang deze:
mv ~/Downloads/jan-hero.jpg hero-bg.jpg
mv ~/Downloads/jan-about.jpg about.jpg
mv ~/Downloads/project-1.png project-app.png
```

Of gebruik placeholders:
- https://unsplash.com (gratis stock foto's)
- https://placeholder.com (tijdelijke placeholders)

---

## Stap 4: Test lokaal (30 seconden)

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

**Checklist:**
- [ ] Naam klopt
- [ ] Email link werkt
- [ ] Projecten tonen
- [ ] About sectie leest goed
- [ ] Language switch werkt (NL ↔ EN)
- [ ] Mobile responsive (Cmd+Shift+M in Chrome)
- [ ] Brand kleur zichtbaar (#FF6B35 oranje)

---

## Stap 5: Deploy (1 minuut)

### GitHub Pages:

```bash
git add .
git commit -m "Portfolio for Jan Jansen"
git remote add origin https://github.com/janjansen/portfolio.git
git push -u origin main

# GitHub → Settings → Pages → Source: main → Save
# Live op: janjansen.github.io/portfolio
```

### Vercel (nog sneller):

```bash
# Install Vercel CLI (eenmalig)
npm i -g vercel

# Deploy
vercel

# Klaar! Live in 30 seconden
# URL: https://jan-jansen-portfolio.vercel.app
```

---

## 🎉 Klaar!

**Totale tijd:** ~5 minuten
**Resultaat:** Professionele, tweetalige, responsive portfolio

**Live URL voor klant:**
`https://janjansen.github.io/portfolio`

**Custom domain koppelen:**
1. Koop domein: `janjansen.nl`
2. GitHub Pages → Custom domain → janjansen.nl
3. Update DNS bij domein provider
4. Klaar! Live op: `www.janjansen.nl`

---

## 📊 Wat kan je aanpassen zonder code?

✅ Alle teksten (via `config.js`)
✅ Alle kleuren (via `config.js` → branding.primaryColor)
✅ Projecten (add/remove)
✅ Contact opties (WhatsApp aan/uit, etc.)
✅ Social media links
✅ Features (analytics, language switch, etc.)
✅ Afbeeldingen (drag & drop in `images/`)

## 🎨 Wat vereist design kennis?

⚠️ Layout aanpassen (HTML/CSS)
⚠️ Nieuwe componenten toevoegen
⚠️ Animaties wijzigen
⚠️ Complexe styling changes

**Maar:** 95% van portfolios kan je maken zonder deze kennis!

---

## 💼 Gebruik voor klanten

### Pricing suggestie:

**Package 1: Quick Start** - €350
- Template customization
- Content input (jij schrijft teksten)
- 3 projecten
- Basic afbeeldingen
- Domain setup
- 2 revisie rondes

**Package 2: Premium** - €750
- Alles van Quick Start +
- Custom kleuren/branding
- 8+ projecten
- Professional fotografie (of image sourcing)
- SEO optimalisatie
- Google Analytics setup
- 1 maand support

**Package 3: Enterprise** - €1500+
- Alles van Premium +
- Custom components
- Unique design aanpassingen
- Content writing (copywriting)
- 3 maanden support
- Hosting + maintenance (1 jaar)

---

## ⚡ Tips voor snelheid

1. **Maak een intake form** - Vraag klant om content vooraf
2. **Stock photos database** - Unsplash, Pexels bookmark list
3. **Template presets** - Bewaar kleurenschema's
4. **Checklist** - Gebruik TODO.txt uit generator
5. **Batch processing** - Doe 3-5 portfolios per week

---

**Met dit template systeem kan je elke week meerdere portfolios shippen! 🚀**
