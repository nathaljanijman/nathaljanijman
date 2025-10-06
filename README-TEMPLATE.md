# 🚀 Portfolio Template

**Professionele portfolio websites bouwen in 5 minuten!**

Dit template systeem maakt het super makkelijk om snel portfolio sites te bouwen voor jezelf of klanten. Alles is modulair, aanpasbaar en tweetalig (NL/EN).

---

## ⚡ Quick Start

### Optie 1: Automatisch (Aanbevolen)

Gebruik de portfolio generator om automatisch een nieuwe site op te zetten:

```bash
./generate-portfolio.sh
```

De generator vraagt om:
- Klant naam
- Email
- Telefoon (optioneel)
- LinkedIn URL (optioneel)
- Brand kleur (optioneel)

En genereert automatisch een complete portfolio setup! 🎉

### Optie 2: Handmatig

```bash
# 1. Kopieer template
cp -r nathaljanijman-portfolio nieuwe-klant-portfolio
cd nieuwe-klant-portfolio

# 2. Pas config.js aan
nano config.js

# 3. Test lokaal
python3 -m http.server 8080
```

---

## 📁 Wat zit er in het template?

```
portfolio-template/
├── 📄 index.html              # Hoofdpagina
├── ⚙️  config.js               # Alle content & instellingen (EDIT DIT!)
├── 🧩 components/              # Herbruikbare componenten
│   ├── navigation-bar.css
│   ├── mobile-bottom-nav.css
│   ├── featured-work.css
│   ├── about.css
│   ├── contact.css
│   └── ticker.css
├── 🎨 css/                    # Styling
│   ├── style.css              # Base styles + CSS variabelen
│   ├── hero-simple.css
│   └── ...
├── 🖼️  images/                 # Afbeeldingen (VERVANG DEZE!)
├── 💬 js/                      # JavaScript
│   ├── translations.js        # Taal management
│   └── script.js              # Interactiviteit
├── 📖 TEMPLATE-SETUP.md       # Uitgebreide handleiding
├── 🤖 generate-portfolio.sh   # Auto-generator script
└── 📋 README-TEMPLATE.md      # Dit bestand
```

---

## 🎯 Gebruiksscenario's

### Scenario 1: Portfolio voor klant "Jan Jansen"

```bash
# Run generator
./generate-portfolio.sh

# Vul in:
#   Naam: Jan Jansen
#   Email: jan@janjansen.nl
#   Telefoon: +31612345678
#   LinkedIn: https://linkedin.com/in/janjansen
#   Kleur: #FF6B35

# Klaar! Portfolio staat in: jan-jansen-portfolio/
```

Nu alleen nog:
1. Afbeeldingen vervangen in `images/`
2. Content aanpassen in `config.js`
3. Projecten toevoegen
4. Deployen!

### Scenario 2: Eigen portfolio updaten

Pas gewoon `config.js` aan in je huidige portfolio:

```javascript
// config.js
const portfolioConfig = {
    personal: {
        name: "Nieuwe Naam",  // ← Verander dit
        email: "nieuw@email.com"
    },

    hero: {
        nl: {
            tagline: "Nieuwe tagline hier"  // ← En dit
        }
    }
    // etc...
};
```

Refresh de pagina - klaar!

---

## 🎨 Styling aanpassen

### Methode 1: Via config.js (Simpel)

```javascript
branding: {
    primaryColor: "#FF6B35",  // ← Hoofdkleur
}
```

### Methode 2: CSS Variabelen (Geavanceerd)

`css/style.css`:
```css
:root {
    --primary-color: #FF6B35;
    --text-primary: #ffffff;
    --background-dark: #0a0a0a;
    --font-size-xl: 3.5rem;
    /* etc... */
}
```

Alle componenten gebruiken deze variabelen!

---

## 📦 Componenten

Elk component is standalone en kan gebruikt worden:

| Component | Bestand | Beschrijving |
|-----------|---------|--------------|
| **Navigation** | `components/navigation-bar.css` | Desktop header met logo + menu |
| **Mobile Nav** | `components/mobile-bottom-nav.css` | Bottom navigation voor mobile |
| **Hero** | `css/hero-simple.css` | Hero sectie met background + CTA |
| **Ticker** | `components/ticker.css` | Scrollende stats banner |
| **Projects** | `components/featured-work.css` | Project grid met filters |
| **About** | `components/about.css` | About sectie met foto + tekst |
| **Contact** | `components/contact.css` | Contact opties (cards) |
| **Modal** | `css/contact-choice-modal.css` | Contact keuze modal |

### Component niet nodig?

Verwijder gewoon de CSS import uit `index.html`:

```html
<!-- VOOR: -->
<link rel="stylesheet" href="components/ticker.css">

<!-- NA (commented out): -->
<!-- <link rel="stylesheet" href="components/ticker.css"> -->
```

En verwijder de HTML sectie. Klaar!

---

## 🌍 Tweetalig (NL/EN)

Alle content is automatisch tweetalig. Vertalingen zitten in `config.js`:

```javascript
hero: {
    nl: {
        tagline: "Nederlandse tekst"
    },
    en: {
        tagline: "English text"
    }
}
```

Bezoekers kunnen zelf switchen met de NL/EN toggle in de footer.

**Default taal instellen:**
```javascript
features: {
    languages: {
        enabled: true,
        default: "nl",  // ← of "en"
        available: ["nl", "en"]
    }
}
```

---

## 📸 Afbeeldingen

### Aanbevolen formaten:

| Afbeelding | Afmetingen | Ratio | Locatie |
|------------|------------|-------|---------|
| Hero background | 1920×1080 | 16:9 | `images/hero-bg.jpg` |
| About foto | 800×800 | 1:1 | `images/about.jpg` |
| Project screenshots | 1200×800 | 3:2 | `images/project-*.png` |

### Afbeeldingen optimaliseren:

```bash
# ImageMagick (brew install imagemagick)
convert hero.jpg -resize 1920x1080 -quality 85 hero-bg.jpg
convert about.jpg -resize 800x800 -quality 85 about.jpg
```

Of gebruik online tools zoals [TinyPNG](https://tinypng.com) of [Squoosh](https://squoosh.app).

---

## 🔧 Features aan/uit

Alles is configureerbaar in `config.js`:

```javascript
features: {
    analytics: {
        enabled: true,
        trackingId: "G-XXXXXXXXXX"  // Google Analytics
    },

    languages: {
        enabled: true,  // Taal switching
        default: "nl"
    },

    mobileNav: {
        enabled: true  // Mobile bottom nav
    },

    contactModal: {
        enabled: true  // Contact choice modal
    }
}
```

---

## 🚀 Deployen

### Optie 1: GitHub Pages (Gratis)

```bash
# In je portfolio folder:
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/username/portfolio.git
git push -u origin main

# GitHub → Settings → Pages → Source: main branch → Save
# Portfolio live op: username.github.io/portfolio
```

### Optie 2: Vercel (Gratis)

1. Push naar GitHub (zie boven)
2. Ga naar [vercel.com](https://vercel.com)
3. Import je repository
4. Deploy! (automatisch HTTPS + custom domain support)

### Optie 3: Netlify (Gratis)

1. Drag & drop je portfolio folder op [netlify.com/drop](https://app.netlify.com/drop)
2. Klaar! Live in 30 seconden

---

## 💡 Tips & Tricks

### 1. **Hard refresh voor updates**
CSS/JS cache? Cmd+Shift+R (Mac) of Ctrl+F5 (Windows)

### 2. **Test op mobiel**
- Chrome DevTools → Toggle device toolbar (Cmd+Shift+M)
- Of gebruik [BrowserStack](https://www.browserstack.com)

### 3. **SEO optimalisatie**
Pas `<title>` en `<meta>` tags aan in `index.html`:

```html
<title>Jan Jansen - UX Designer</title>
<meta name="description" content="UX Designer gespecialiseerd in...">
```

### 4. **Custom domain**
- Koop domain bij [TransIP](https://transip.nl) of [Namecheap](https://namecheap.com)
- Koppel aan je hosting via DNS settings

### 5. **Performance**
- Comprimeer afbeeldingen (zie [Afbeeldingen](#-afbeeldingen))
- Gebruik WebP formaat waar mogelijk
- Lazy loading voor images

---

## ❓ Veelgestelde vragen

**Q: Moet ik programmeren kunnen?**
A: Nee! Pas `config.js` aan (copy/paste), vervang afbeeldingen, en je bent klaar.

**Q: Kan ik extra secties toevoegen?**
A: Ja! Kopieer een bestaande sectie uit `index.html` en pas aan. Styling werkt automatisch.

**Q: WhatsApp werkt niet?**
A: Check `config.js` → `personal.whatsapp.number` (zonder + of spaties: `31612345678`)

**Q: Kleuren veranderen niet?**
A: Hard refresh (Cmd+Shift+R). Check CSS variabelen in `style.css`.

**Q: Kan ik het design compleet veranderen?**
A: Ja! Pas `css/style.css` en component CSS bestanden aan. Alles is overschrijfbaar.

**Q: Hoeveel kost hosting?**
A: €0! GitHub Pages, Vercel en Netlify zijn gratis voor statische sites.

---

## 📚 Documentatie

- **TEMPLATE-SETUP.md** - Uitgebreide setup guide
- **config.js** - Inline comments voor alle opties
- Deze README - Quick reference

---

## 🎉 Voorbeelden

Portfolios gebouwd met dit template:

- [Nathalja Nijman](https://nathaljanijman.nl) - Original template
- *Jouw portfolio kan hier staan!*

---

## 🤝 Support

Vragen? Check:
1. `TEMPLATE-SETUP.md` voor gedetailleerde uitleg
2. Comments in `config.js`
3. Deze README

---

## 📝 Checklist

Voor nieuwe portfolio:

- [ ] Run `./generate-portfolio.sh` OF kopieer template
- [ ] Pas `config.js` aan (naam, email, content)
- [ ] Vervang afbeeldingen in `images/`
- [ ] Voeg projecten toe
- [ ] Test lokaal (`python3 -m http.server 8080`)
- [ ] Test mobile responsive
- [ ] Check taal switching (NL ↔ EN)
- [ ] Deploy naar hosting
- [ ] Koppel custom domain (optioneel)
- [ ] Google Analytics toevoegen (optioneel)

---

**Ready to build amazing portfolios? Let's go! 🚀**

---

*Template created by Nathalja Nijman - Feel free to use and customize!*
