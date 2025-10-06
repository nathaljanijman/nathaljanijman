# Portfolio Template - Setup Guide

Dit portfolio template maakt het super makkelijk om snel professionele portfolio websites te bouwen voor klanten.

## 🚀 Quick Start (5 minuten)

### Stap 1: Kopieer het template
```bash
# Maak een nieuwe folder voor je klant
cp -r nathaljanijman-portfolio nieuwe-klant-portfolio
cd nieuwe-klant-portfolio
```

### Stap 2: Pas config.js aan
Open `config.js` en verander de belangrijkste gegevens:

```javascript
const portfolioConfig = {
    personal: {
        name: "Jan Jansen",                          // ← Naam van je klant
        title: "UX Designer & Developer",            // ← Hun functie
        email: "jan@janjansen.nl",                  // ← Email
        phone: "+31612345678",                      // ← Telefoon

        social: {
            linkedin: "https://linkedin.com/in/janjansen",
            github: "https://github.com/janjansen",
            // ... etc
        }
    },

    branding: {
        primaryColor: "#FF6B35",  // ← Verander de brand kleur
    },

    hero: {
        nl: {
            name: "Jan Jansen",
            tagline: "Ik ontwerp gebruiksvriendelijke digitale ervaringen",
            // ... etc
        }
    }
    // ... rest blijft hetzelfde qua structuur
};
```

### Stap 3: Vervang afbeeldingen
```
images/
  ├── nathalja-work.jpg     → vervang met klant-hero.jpg
  ├── nathalja-about.jpg    → vervang met klant-about.jpg
  ├── project-abn-amro.png  → vervang met klant-project-1.png
  └── ...
```

### Stap 4: Test lokaal
```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

### Stap 5: Deploy
```bash
git init
git add .
git commit -m "Initial portfolio setup for [Klant Naam]"
git push
```

## 📋 Wat kun je aanpassen?

### 1. Content & Teksten
Alles in `config.js`:
- ✅ Persoonlijke info (naam, email, telefoon)
- ✅ Social media links
- ✅ Hero teksten (tagline, call-to-action)
- ✅ About sectie (3 paragrafen)
- ✅ Projects (onbeperkt aantal)
- ✅ Contact opties (WhatsApp, Email, LinkedIn)

### 2. Design & Kleuren
In `config.js` → `branding`:
```javascript
branding: {
    primaryColor: "#0047AB",  // Hoofdkleur
    fonts: {
        primary: "Raleway, sans-serif",
        headings: "Raleway, sans-serif"
    }
}
```

Of direct in `css/style.css` → CSS variabelen:
```css
:root {
    --primary-color: #0047AB;
    --text-primary: #ffffff;
    --background-dark: #000000;
    /* ... meer variabelen */
}
```

### 3. Talen
Automatisch tweetalig (NL/EN). Alle vertalingen in `config.js`:
```javascript
hero: {
    nl: { tagline: "Nederlands" },
    en: { tagline: "English" }
}
```

### 4. Features aan/uit
```javascript
features: {
    analytics: { enabled: true },
    languages: { enabled: true },
    mobileNav: { enabled: true },
    contactModal: { enabled: true }
}
```

## 🎨 Componenten

Het template bestaat uit herbruikbare componenten:

```
components/
├── navigation-bar.css      → Header navigatie
├── mobile-bottom-nav.css   → Mobile bottom menu
├── featured-work.css       → Project cards
├── about.css               → About sectie
├── contact.css             → Contact opties
└── ticker.css              → Stats ticker

css/
├── hero-simple.css         → Hero sectie
├── contact-choice-modal.css → Contact modal
└── style.css               → Base styles + variabelen
```

Elk component werkt standalone - verwijder wat je niet nodig hebt!

## 📦 Project structuur toevoegen

Projects toevoegen in `config.js`:

```javascript
projects: {
    items: [
        {
            id: "nieuw-project",
            category: "web",           // of: product-owner, entrepreneurship
            featured: true,            // Toon direct (niet hidden)
            image: "images/project-naam.png",

            year: {
                nl: "2024 - Heden",
                en: "2024 - Present"
            },

            title: "Project Titel",

            description: {
                nl: "Nederlandse beschrijving...",
                en: "English description..."
            },

            impact: [
                { number: "500K+", label_nl: "Bezoekers", label_en: "Visitors" },
                { number: "95%", label_nl: "Tevredenheid", label_en: "Satisfaction" }
            ],

            tags: ["React", "Node.js", "MongoDB"],

            links: [
                {
                    type: "website",
                    url: "https://example.com",
                    label_nl: "Live site",
                    label_en: "Live site"
                }
            ]
        }
    ]
}
```

## 🎯 Veelgebruikte aanpassingen

### Wijzig primary color
`config.js`:
```javascript
branding: { primaryColor: "#FF6B35" }
```

### Verander aantal featured projects
Standaard: 2 featured, rest hidden achter "Show more"
```javascript
{
    featured: true  // Direct zichtbaar
}
```

### WhatsApp uitschakelen
```javascript
personal: {
    whatsapp: { enabled: false }
}
```

### Analytics wijzigen
```javascript
features: {
    analytics: {
        enabled: true,
        trackingId: "G-NIEUWE-CODE"
    }
}
```

## 🔧 Geavanceerd

### Custom CSS toevoegen
Maak `css/custom.css`:
```css
/* Klant-specifieke styles */
.hero-simple {
    background: linear-gradient(45deg, #FF6B35, #F7931E);
}
```

Voeg toe aan `index.html`:
```html
<link rel="stylesheet" href="css/custom.css">
```

### Extra sectie toevoegen
Kopieer een bestaande sectie uit `index.html` en pas aan:
```html
<section id="services" class="services-section">
    <div class="container">
        <h2>Diensten</h2>
        <!-- Content hier -->
    </div>
</section>
```

## ✅ Checklist voor nieuwe klant

- [ ] `config.js` aanpassen (naam, email, social links)
- [ ] Hero afbeelding vervangen (`images/hero-bg.jpg`)
- [ ] About foto vervangen (`images/about.jpg`)
- [ ] Project afbeeldingen toevoegen
- [ ] Projects toevoegen in `config.js`
- [ ] Primary color aanpassen
- [ ] Testen op desktop + mobile
- [ ] Google Analytics code vervangen
- [ ] Domain koppelen
- [ ] Live zetten!

## 🚨 Veelvoorkomende fouten

**Afbeeldingen laden niet**
- Check of paths kloppen: `images/naam.jpg`
- Gebruik lowercase bestandsnamen
- Ondersteunde formaten: jpg, png, webp

**Kleuren updaten niet**
- Hard refresh: Cmd+Shift+R (Mac) of Ctrl+F5 (Windows)
- Check CSS variabelen in `style.css`

**WhatsApp werkt niet**
- Telefoonnummer zonder spaties/streepjes: `31612345678`
- Landcode zonder +: `31` (niet `+31`)

## 💡 Tips

1. **Start met config.js** - 90% van je content staat daar
2. **Test altijd lokaal eerst** - `python3 -m http.server 8080`
3. **Gebruik dezelfde afbeelding ratio's** - Hero: 16:9, About: 1:1
4. **Houd het simpel** - Niet elke klant heeft alle secties nodig
5. **Version control** - Gebruik git voor elke klant

## 🎓 Volgende stappen

- [ ] Bekijk `config.js` - alle opties
- [ ] Test met dummy klant data
- [ ] Maak je eerste klant portfolio!

---

**Vragen?** Check de `config.js` comments voor meer info!
