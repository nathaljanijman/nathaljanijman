# Nathalja Nijman - Portfolio Website

Een moderne, minimalistisch portfolio website gebouwd met vanilla JavaScript, HTML5 en CSS3. De website presenteert Nathalja's ervaring als Product Owner en digital product leader met een focus op storytelling en directe conversie.

**🌐 Live:** [nathaljanijman.com](https://nathaljanijman.com)

**📦 Want to use this template?** Check out the [Portfolio Template Project](../portfolio-template/) - build similar portfolios in 5 minutes!

---

## 🚀 Tech Stack

### Core Technologies
- **HTML5** - Semantic markup, accessibility-first
- **CSS3** - Modern styling, animations, custom properties
- **Vanilla JavaScript** - Zero dependencies, optimaal performance
- **Google Fonts** - Raleway typography

### Deployment & Hosting
- **Cloudflare Pages** - Global CDN, automatic deployments
- **GitHub** - Version control, CI/CD integration
- **Cloudflare DNS** - DNS management, SSL certificates
- **GitHub Actions CI/CD** - Automated testing & quality checks
  - E2E tests on every push
  - Critical function verification
  - Code quality checks
  - Blocks broken code from reaching production

### Analytics & Tracking
- **Google Analytics 4** (GA4) - User behavior tracking
- **Custom Event Tracking** - Conversie monitoring:
  - WhatsApp clicks
  - Email clicks
  - LinkedIn interactions
  - Project link clicks
  - Package selections (portfolio offering)
  - Language switches
  - Scroll depth (25%, 50%, 75%, 100%)
  - Page load performance

### Features & Functionaliteiten
- ✅ **Tweetalig** - Nederlands & Engels met auto-detectie
- ✅ **Fully Responsive** - Mobile-first design
- ✅ **Dark Theme** - Minimalistisch zwart met cobalt blue accenten
- ✅ **WhatsApp Integration** - Direct contact via WhatsApp
- ✅ **Contact Modal** - Meerdere contact opties
- ✅ **Project Showcase** - Filtering & expandable project grid
- ✅ **Smooth Animations** - Intersection Observer API
- ✅ **SEO Ready** - Semantic HTML, meta tags
- ✅ **Performance Optimized** - Lazy loading, optimized assets
- ✅ **Accessibility** - ARIA labels, keyboard navigation

---

## 🎨 Brand Styling

### Kleurenpalet
- **Primair Zwart**: `#000000` - Achtergrond, sterke contrasten
- **Diep Blauw**: `#0047AB` (Cobalt Blue) - Accenten, CTA's, hover states
- **Gradient Overlays**:
  - `rgba(0, 10, 20, 0.95)` - Subtiele diepte
  - `rgba(0, 71, 171, 0.03)` - Blauw tint voor secties
- **Tekst**:
  - Wit: `#FFFFFF` - Primaire content
  - Light: `rgba(255, 255, 255, 0.7-0.85)` - Body text
  - Muted: `rgba(255, 255, 255, 0.4-0.6)` - Subtitels, labels

### Typografie
- **Font Family**: Raleway (Google Fonts)
- **Gewichten**:
  - Light (100-300): Subtitels, metadata
  - Regular (400-500): Body text
  - Semi-Bold (600): Headers, stats
  - Bold (700): Titels, emphasis
  - Black (900): Impact numbers

### Design Principes
- **Minimalisme**: Clean layouts, veel witruimte, focus op content
- **Responsive**: Mobile-first approach, breakpoints op 480px, 640px, 768px, 968px
- **Microinteracties**: Subtiele hover effects, smooth transitions (0.3-0.6s cubic-bezier)
- **Toegankelijkheid**: ARIA labels, keyboard navigation, prefers-reduced-motion support
- **Performance**: CSS custom properties, Intersection Observer API, optimized animations

---

## 🏗️ Website Structuur

### Secties (in volgorde)

#### 1. **Navigation Bar**
- **Locatie**: Fixed top
- **Items**: Home | Projecten | Bio | Contact
- **Features**:
  - Scroll-triggered styling (scrolled state)
  - Active section highlighting
  - Taal toggle (NL/EN)
  - Smooth scroll naar secties
  - Mobile hamburger menu

#### 2. **Hero Section** (`#home`)
- **Type**: Full-screen hero met achtergrond afbeelding
- **Content**:
  - Naam + tagline
  - WhatsApp input field voor direct contact
  - Subtiele overlay voor leesbaarheid
- **Afbeelding**: `images/nathalja-work.jpg`
- **Functionaliteit**:
  - Direct WhatsApp contact via input
  - Pre-filled messages
  - Character counter

#### 3. **Impact Stats Ticker**
- **Type**: Infinite scroll marquee
- **Stats**:
  - 7+ jaar ervaring als product owner
  - 5+ jaar bij corporate organisatie
  - 8+ corporate internationale websites eigenaarschap
  - Internationale samenwerking
  - 25+ team members
  - 150+ stakeholders
  - 10+ jaar topsport ervaring
- **Animatie**: 60s loop (45s mobile), pause on hover
- **Styling**: Subtiel blauw gradient achtergrond

#### 4. **Selected Work** (`#projects`)
- **Type**: 2-column grid (1-column mobile)
- **Layout**: Project cards met afbeelding + info
- **Features**:
  - Staggered reveal animations
  - Show more button (innovative divider design)
  - 2 zichtbare projecten, 3 verborgen
- **Projecten**:
  1. **ABN AMRO** (2020-Present) - Product Owner
     - 11.000+ pagina's, 150+ stakeholders
     - Link: abnamro.nl
  2. **Sprint Planner** (2025) - Web App
     - 95% voorspelbaarheid, 50+ gebruikers
     - Link: sprintplanner.nl
  3. **BALR.** (2017-2020) - Product Owner (hidden)
     - 45% conversie verbetering, 12 markten
  4. **DHGate Monitor** (2025) - Web App (hidden)
  5. **SLOPEZ** (2019-2022) - Ondernemerschap (hidden)

#### 5. **About Nathalja** (`#about`)
- **Type**: 2-column layout (afbeelding + tekst)
- **Content**:
  - Profiel foto: `images/nathalja-about.jpg`
  - Personal story (topsport → Product Owner)
  - 3 static stats:
    - 7 jaar Product Owner
    - 10+ jaar topsport
    - NL | Wereldwijd remote
- **Aspect Ratio**: 3:4 voor afbeelding

#### 6. **Contact Section** (`#contact`)
- **Type**: 3-column grid (1-column mobile)
- **Opties**:
  1. **WhatsApp** - Direct contact button
     - Green accent on hover
     - "Responstijd: ~2 uur"
  2. **Email** - nathalja@example.com
     - Blue accent on hover
     - "Responstijd: ~24 uur"
  3. **LinkedIn** - linkedin.com/in/nathalja-nijman-86410389
     - LinkedIn blue on hover
     - "Bekijk profiel"
- **Card Design**: Gradient overlay on hover, icon animation

#### 7. **Footer**
- **Content**:
  - Copyright © 2025 Nathalja Nijman
  - Links: LinkedIn, Wikipedia, Email
- **Styling**: Minimaal, centered layout

---

## ⚙️ Functionaliteiten

### 1. **Meertaligheid (i18n)**
- **Talen**: Nederlands (default), Engels
- **Systeem**: `translations.js` met LanguageManager class
- **Storage**: localStorage voor taal voorkeur
- **Detectie**: Browser language fallback
- **Implementatie**: `data-translate` attributen
- **Toggle**: Dropdown in navbar

### 2. **Smooth Scrolling**
- **Behavior**: `scroll-behavior: smooth`
- **Offset**: Compenseert voor fixed navbar height
- **Targets**: Alle anchor links (`a[href^="#"]`)
- **Active State**: Scroll position tracking voor active nav link

### 3. **WhatsApp Integratie**
- **Functionaliteit**: Direct contact via WhatsApp buttons
- **Locaties**:
  - Hero input field
  - Contact sectie direct link
  - Contact modal optie
  - Portfolio offering pagina
- **Format**: `https://wa.me/[NUMBER]?text=...`
- **Pre-fill**: Context-aware messages

### 4. **Scroll Animations**
- **Library**: Intersection Observer API
- **Triggers**:
  - Fade-in on scroll
  - Staggered project card reveals
  - Stats counter (disabled voor static stats)
- **Performance**: `will-change`, `transform` GPU acceleration
- **Accessibility**: Respects `prefers-reduced-motion`

### 5. **Project Filtering & Show More**
- **Initial State**: 2 projecten zichtbaar
- **Show More**: Expandeert naar 5 projecten
- **Button Design**: Innovatieve divider met pill button
- **Animation**: Smooth reveal met scale + translate

### 6. **Contact Modal**
- **Trigger**: Hero input, contact buttons
- **Opties**: WhatsApp, Email, Chat
- **Design**: Centered modal met backdrop blur
- **Close**: X button, backdrop click, ESC key

### 7. **Mobile Menu**
- **Trigger**: Hamburger icon (< 768px)
- **Animation**: Slide-in overlay
- **Features**:
  - Body scroll lock
  - Link auto-close
  - Smooth transitions

### 8. **Stats Counter** (Disabled)
- **Selectie**: `.stat-number[data-target]:not(.stat-static)`
- **About Stats**: Static display (geen animatie)
- **Gebruikt**: Kan worden geactiveerd voor dynamische stats

---

## 📁 Bestandsstructuur

```
nathaljanijman-portfolio/
├── index.html                 # Hoofd HTML bestand
├── README.md                  # Deze file
│
├── css/
│   ├── style.css              # Globale styles, variables, utilities
│   ├── hero-simple.css        # Hero sectie styling
│   ├── contact-choice-modal.css  # Contact modal
│   ├── professional-identity.css
│   └── innovative-services.css
│
├── components/
│   ├── featured-work.css      # Project grid & cards
│   ├── ticker.css             # Impact stats marquee
│   ├── about.css              # About sectie
│   └── contact.css            # Contact sectie
│
├── js/
│   ├── script.js              # Hoofd JavaScript (nav, scroll, animations)
│   ├── translations.js        # i18n systeem (NL/EN)
│   ├── hero-whatsapp.js       # Hero WhatsApp functionaliteit
│   └── portfolio-offering.js  # Portfolio package pagina
│
└── images/
    ├── nathalja-work.jpg      # Hero achtergrond
    ├── nathalja-about.jpg     # About sectie foto
    ├── project-abn-amro.png   # 1200x600px, <500KB
    ├── project-sprintplanner.png
    ├── project-balr.png
    ├── project-dhgate.png
    ├── project-slopez.png
    └── logos/                 # (Niet in gebruik - was voor ticker)
        ├── sitecore.svg
        ├── rws.svg
        ├── abn-amro.png
        ├── balr.svg
        ├── sprintplanner.png
        ├── dhgate-monitor.png
        ├── fc-twente.png
        └── pec-zwolle.svg
```

---

## 🎯 Design Patterns

### CSS Custom Properties (Variables)
```css
:root {
    --font-family-primary: 'Raleway', sans-serif;
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-base: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-2xl: 48px;
    --spacing-3xl: 64px;
}
```

### Responsive Typography
```css
font-size: clamp(0.95rem, 1.2vw, 1.1rem);
/* Min: 0.95rem, Ideal: 1.2vw, Max: 1.1rem */
```

### Smooth Transitions
```css
transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
/* Cubic-bezier voor natuurlijke ease-out animatie */
```

### Hover Effects Pattern
```css
.element {
    transition: all 0.3s ease;
}
.element:hover {
    transform: translateY(-8px);
    border-color: rgba(0, 71, 171, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

---

## 🔧 Configuratie

### WhatsApp Nummer Aanpassen
Zoek en vervang in:
- `index.html` (regel 782): Contact sectie link
- `js/script.js` (meerdere locaties): `whatsappNumber` variabele
- `js/portfolio-offering.js` (regel 59): Package enquiries

### Email Adres Aanpassen
- `index.html` (regel 794, 831): Update `mailto:` links
- Footer links

### Project Afbeeldingen Optimaliseren
- **Formaat**: PNG of JPG
- **Afmetingen**: 1200x600px (2:1 ratio)
- **Bestandsgrootte**: < 500KB aanbevolen
- **Locatie**: `images/project-*.png`
- **Naamgeving**: `project-{naam}.png` (lowercase, hyphens)

### Translaties Toevoegen
Bewerk `js/translations.js`:
```javascript
translations = {
    nl: {
        newKey: 'Nederlandse tekst',
        // ...
    },
    en: {
        newKey: 'English text',
        // ...
    }
}
```
Voeg toe in HTML:
```html
<element data-translate="newKey">Fallback tekst</element>
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */

/* Small Mobile */
@media (max-width: 480px) { }

/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop Small */
@media (max-width: 968px) { }

/* Desktop */
@media (min-width: 1200px) { }
```

---

## ♿ Toegankelijkheid Features

1. **Semantic HTML**: `<header>`, `<nav>`, `<section>`, `<footer>`
2. **ARIA Labels**: `role`, `aria-label`, `aria-expanded`, `aria-hidden`
3. **Keyboard Navigation**: Tab order, focus states, Enter/ESC support
4. **Screen Reader Support**: Alt tags, descriptive labels
5. **Motion Preferences**:
```css
@media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
}
```
6. **Color Contrast**: WCAG AA compliant (4.5:1 minimum)
7. **Focus Indicators**: Visible outlines op interactieve elementen

---

## 🚀 Performance Optimalisatie

### Techniques
1. **Lazy Loading**: Intersection Observer voor scroll animations
2. **GPU Acceleration**: `transform`, `opacity` voor animations
3. **Debouncing**: Scroll event throttling (10ms timeout)
4. **Will-Change**: `will-change: transform` op animated elements
5. **CSS over JS**: Animations via CSS waar mogelijk
6. **Font Display**: `font-display: swap` voor Google Fonts
7. **Image Optimization**: Compressed PNGs, proper sizing

### Load Order
1. Critical CSS (inline in `<head>`)
2. Google Fonts (async)
3. Component CSS files
4. JavaScript (defer of einde `<body>`)

---

## 🎨 Key Visual Elements

### Project Cards
- **Image Height**: 200px (220px mobile)
- **Border**: `1px solid rgba(255, 255, 255, 0.1)`
- **Hover**: Blue border accent, scale image 1.05
- **Layout**: Vertical (image top, content below)

### Ticker Stats
- **Speed**: 60s loop (desktop), 45s (mobile)
- **Gap**: clamp(60px, 8vw, 100px)
- **Font Weight**: 600
- **Color**: `rgba(255, 255, 255, 0.8)`

### Contact Cards
- **Size**: Equal height grid cells
- **Icon Circle**: 80px diameter, 2px border
- **Hover**: translateY(-8px), icon scale(1.1)
- **Colors**: WhatsApp green, Email blue, LinkedIn blue

### Show More Button
- **Design**: Pill button on horizontal divider
- **Size**: 8px × 20px padding, 20px border-radius
- **Effect**: Scale(1.05) on hover
- **Arrow**: Rotates 180deg when expanded

---

## 🐛 Known Issues & Limitations

### Geen Issues
Alle functionaliteiten werken zoals verwacht.

### Future Enhancements
1. **Analytics**: Google Analytics of privacy-friendly alternative
2. **Blog Sectie**: Voor thought leadership content
3. **Case Studies**: Diepgaande project beschrijvingen
4. **Testimonials**: Client feedback sectie
5. **Dark/Light Mode**: Theme toggle (momenteel disabled)
6. **Contact Form**: Alternative voor WhatsApp (met spam protection)
7. **Project Filtering**: Filter op type (Product Owner, Web Apps, etc.)

---

## 📄 Browser Support

- **Chrome**: 90+ ✅
- **Firefox**: 88+ ✅
- **Safari**: 14+ ✅
- **Edge**: 90+ ✅
- **Mobile Safari**: iOS 14+ ✅
- **Chrome Mobile**: 90+ ✅

### Required Features
- CSS Grid & Flexbox
- CSS Custom Properties
- Intersection Observer API
- ES6 JavaScript (let/const, arrow functions, template literals)
- LocalStorage API

---

## 🧪 Playwright Test Suite

### Overview
Comprehensive end-to-end testing suite met **222 tests** verdeeld over **8 test suites**, waaronder visual regression testing, accessibility validatie, en functionele tests voor alle componenten.

### Test Configuration

**Playwright Config** (`playwright.config.js`):
```javascript
{
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'python3 -m http.server 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI
  }
}
```

**Features**:
- Automatic webserver startup (Python SimpleHTTPServer)
- CI-optimized configuration (2 retries, single worker)
- HTML reporter voor visuele test resultaten
- Trace recording bij failures

---

### Test Suites

#### 1. Visual Regression Tests (28 tests)
**File**: `tests/e2e/visual-regression.spec.js`

Uitgebreide screenshot-based testing voor visuele consistentie:

**Hero Section** (4 tests):
- Desktop NL/EN variants (1920x1080)
- Mobile layout (375x667)
- Tablet layout (768x1024)
- MaxDiffPixels: 100

**Navigation** (3 tests):
- Desktop header styling
- Mobile bottom navigation
- Language dropdown open state

**Projects Section** (5 tests):
- Default state met 2 zichtbare projecten
- Individual project card design
- Filter buttons UI
- Web filter active state
- Show more expanded state

**Contact Section** (3 tests):
- Desktop layout (1920x1080)
- Mobile layout (375x667)
- WhatsApp contact card design

**About Section** (3 tests):
- Desktop 2-column layout met foto
- Mobile vertical layout
- Stats section (7 jaar PO, 10+ jaar topsport)

**Footer** (3 tests):
- Desktop footer layout
- Mobile footer layout
- Language switcher component

**Interactive Elements** (7 tests):
- Ticker animation section
- Portfolio sticker (desktop/mobile)
- Filter button active state
- Show more expanded button
- Full page screenshots (NL/EN, desktop/mobile)

**Totaal**: 24 baseline snapshots in `tests/e2e/visual-regression.spec.js-snapshots/`

---

#### 2. Accessibility Tests (39 tests)
**File**: `tests/e2e/accessibility.spec.js`

WCAG 2.1 compliance validatie:

**Semantic HTML**:
- Proper heading hierarchy (h1 → h2 → h3)
- Main landmark (`<main>` element)
- Navigation landmarks
- Banner role voor header
- Contentinfo role voor footer

**ARIA Attributes**:
- Navigation aria-labels ("Main navigation", "Language selection")
- Button aria-labels (close buttons, toggles)
- Aria-expanded states (mobile menu, dropdowns)
- Aria-hidden op decorative elements
- Link descriptions (external links, social media)

**Keyboard Navigation**:
- Tab order validatie
- Focus visible states (outline: 2px solid white)
- Skip to content link (hidden tot focus)
- Enter/Space key support voor buttons
- ESC key closes modals

**Interactive Elements**:
- All links have descriptive text
- Buttons hebben clear purpose labels
- Form inputs hebben associated labels
- Images hebben alt text
- Focus trapping in modals

**Focus Management**:
- Visual focus indicators present
- Logical tab order door page
- Focus returns na modal close
- No keyboard traps

**Screen Reader Support**:
- Language attribute op `<html>` (`lang="nl"`)
- Section headings voor structuur
- Link text beyond "click here"
- Descriptive aria-labels

---

#### 3. Contact Modal Tests (37 tests)
**File**: `tests/e2e/contact-modal.spec.js`

Complete modal functionaliteit testing:

**Modal Trigger Scenarios**:
- Hero input field trigger (na 5 characters)
- Contact section buttons
- Direct WhatsApp links
- Multiple trigger sources

**Modal Behavior**:
- Opens with fade-in animation
- Backdrop blur effect
- Close button functionality (X icon)
- Backdrop click to close
- ESC key to close
- Body scroll lock when open
- Focus trapping inside modal

**Modal Content**:
- 3 contact options aanwezig (WhatsApp, Email, LinkedIn)
- Icons display correctly
- Response times shown ("~2 uur", "~24 uur")
- Links have correct href attributes
- WhatsApp pre-filled messages

**Contact Options Validation**:
- WhatsApp: Correct phone number, green hover
- Email: Valid mailto link, blue hover
- LinkedIn: Profile URL, LinkedIn blue hover

**Modal States**:
- Initial hidden state
- Open state (visible + aria-hidden="false")
- Close state (hidden + aria-hidden="true")
- Multiple open/close cycles

**Accessibility**:
- Modal heeft role="dialog"
- aria-modal="true" when open
- Focus moves to modal on open
- Close button heeft aria-label

---

#### 4. Responsive Mobile Tests (33 tests)
**File**: `tests/e2e/responsive-mobile.spec.js`

Mobile-first design validatie:

**Viewport Testing**:
- Small mobile: 375x667 (iPhone SE)
- Medium mobile: 414x896 (iPhone 11)
- Tablet: 768x1024 (iPad)
- Desktop: 1920x1080

**Mobile Navigation**:
- Bottom navigation bar visible < 768px
- 4 nav items (Home, Projects, About, Contact)
- Active state highlighting
- Smooth scroll to sections
- Icons + labels present

**Hamburger Menu**:
- Visible < 768px
- Opens/closes correctly
- Overlay animation
- Link auto-close on click
- Body scroll lock

**Mobile Layout Adaptations**:
- Hero: Full viewport height, centered content
- Projects: 1-column grid
- About: Vertical stack (foto boven tekst)
- Contact: 1-column cards
- Footer: Centered, stacked links

**Touch Interactions**:
- Tap targets ≥ 44x44px
- Touch feedback (active states)
- Swipe gestures (waar applicable)
- No hover dependencies

**Mobile Performance**:
- Ticker speed adjusted (45s vs 60s desktop)
- Image sizes optimized
- Font sizes readable (≥ 16px body)

---

#### 5. Hero Interface Tests (27 tests)
**File**: `tests/e2e/hero-interface.spec.js`

Hero section conversational interface:

**Hero Content Validation**:
- Heading aanwezig ("Nathalja Nijman")
- Tagline ("Product Owner & Digital Leader")
- Background image loads
- Input field present
- Character counter present

**Conversational Input**:
- Placeholder text correct
- User kan typen
- Character counter updates (0/500)
- Character limit enforcement
- Contact modal trigger (≥ 5 characters)

**WhatsApp Integration**:
- Pre-filled message format correct
- Phone number in URL
- Message encoding (URI component)
- Opens in new tab

**Input States**:
- Default state (empty, placeholder)
- Typing state (character count)
- Near limit warning (> 450 characters)
- At limit (500 characters, geen verdere input)

**Responsive Hero**:
- Desktop: Links uitlijning, grote heading
- Tablet: Centered, medium heading
- Mobile: Centered, small heading, vertical layout

---

#### 6. Projects Filtering Tests (25 tests)
**File**: `tests/e2e/projects-filtering.spec.js`

Dynamic project filtering functionaliteit:

**Filter System**:
- Filter buttons present ("Alle", "Web", "Product Owner")
- Default: "Alle" active
- Click to activate filter
- Active state styling (blue border + background)
- Animated filter transitions

**Project Visibility**:
- Initial: 2 projecten zichtbaar
- Show More: Expand to 5 projecten
- Filter applies to visible set
- Hidden projects excluded from filter

**Filter Logic**:
- "Alle": Shows all 5 projecten
- "Web": Shows Web App projecten only
- "Product Owner": Shows PO projecten only
- Filter counts update correctly

**Filter Animation**:
- Fade out hidden projecten (opacity 0)
- Fade in matching projecten (opacity 1)
- Scale animation (0.95 → 1)
- Stagger delay (100ms per card)

**Show More Button**:
- Initially shows "Meer projecten"
- Expands to show 3 extra projecten
- Button text changes to "Minder projecten"
- Arrow rotates 180deg
- Collapses back to 2 projecten

**Filter Persistence**:
- Active filter maintained na page scroll
- Filter state during expand/collapse
- No filter reset on language switch

---

#### 7. Language Switching Tests (19 tests)
**File**: `tests/e2e/language-switching.spec.js`

Volledige i18n functionaliteit:

**Language Toggle**:
- Footer language buttons (Nederlands | English)
- Header dropdown (desktop)
- Active language styling (bold, blue)
- Click to switch language

**Content Translation**:
- Hero tagline updates
- Navigation labels update
- Section headings translate
- Button text translates
- Project descriptions translate
- Contact section translates
- Footer text translates

**Translation Coverage**:
- 50+ translation keys
- All visible text heeft NL/EN variant
- Fallback naar key name bij missing translation

**Language Persistence**:
- Saves to localStorage (`language: 'nl'` or `'en'`)
- Persists across page reloads
- Browser language detection (first visit)
- Manual selection overrides auto-detect

**URL Integration**:
- Language parameter in URL (optional)
- `?lang=en` forces English
- `?lang=nl` forces Dutch
- Updates localStorage on URL change

**Dynamic Translation System**:
- `data-translate` attributes
- Real-time DOM updates
- No page reload required
- Smooth transitions

**Translation Edge Cases**:
- Missing translations show key
- Empty translations fallback
- Special characters handled (é, ñ, etc.)
- Numbers formatted correctly (decimals)

---

#### 8. Navigation Tests (14 tests)
**File**: `tests/e2e/navigation.spec.js`

Navigation flow en scroll behavior:

**Desktop Navigation**:
- Fixed top navbar
- 4 nav links (Home, Projecten, Bio, Contact)
- Active section highlighting
- Smooth scroll to sections
- Scroll offset compensation (navbar height)

**Scroll Behavior**:
- Click nav link scrolls to section
- Active link updates based on scroll position
- Intersection Observer tracking
- Scroll spy functionality

**Mobile Navigation**:
- Bottom navigation bar (< 768px)
- Fixed position
- Icon + label design
- Tap to scroll
- Active state visible

**Language Toggle**:
- Desktop: Dropdown in header
- Mobile: Footer buttons
- Globe icon present
- Current language highlighted

**Navbar Scroll State**:
- Transparent at top
- Solid background after scroll
- Box shadow on scroll
- Backdrop blur effect

---

### Test Scripts

**Available Commands** (via `package.json`):

```bash
# Run alle tests (headless)
npm test
npm run test:e2e

# Run tests met browser UI
npm run test:headed

# Playwright UI mode (interactive debugging)
npm run test:ui

# Debug mode (step through tests)
npm run test:debug

# View HTML test report
npm run test:report

# Smoke tests (critical paths only)
npm run test:smoke
```

---

### Visual Regression Workflow

**Baseline Creation**:
```bash
# Generate nieuwe baselines (first run)
npx playwright test --update-snapshots
```

**Comparison**:
- Playwright vergelijkt screenshots pixel-by-pixel
- `maxDiffPixels` threshold (30-500 per component)
- Diffs highlighted in red (HTML report)
- Failed tests genereren diff images

**Snapshot Management**:
- Baselines in `tests/e2e/visual-regression.spec.js-snapshots/`
- Committed to git voor consistency
- Update bij intentional design changes
- CI fails on regression zonder approval

---

### CI/CD Integration

**GitHub Actions** (`.github/workflows/ci.yml`):
```yaml
- Run Playwright tests on every push
- Pre-deployment smoke tests
- Auto-retry flaky tests (2x in CI)
- Single worker for consistency
- HTML report artifact upload
- Fail pipeline on test failures
```

**Pre-Deploy Hook** (`npm run predeploy`):
1. JavaScript linting (`lint:js`)
2. Critical function checks (`check:functions`)
3. Smoke tests (`test:smoke`)
4. Blocks deployment if tests fail

---

### Test Best Practices

**1. Reliable Selectors**:
- Use semantic selectors (`.hero-simple`, `#contact`)
- Avoid brittle CSS selectors
- Prefer `data-testid` voor dynamic content
- Use `getByRole`, `getByLabel` waar mogelijk

**2. Wait Strategies**:
- `page.waitForLoadState('networkidle')` voor page loads
- `page.waitForTimeout()` voor animations (minimaal)
- Avoid hard-coded sleeps waar mogelijk
- Use `page.waitForSelector()` voor dynamic content

**3. Viewport Consistency**:
- Always set viewport size
- Match common device sizes
- Test multiple breakpoints
- Consider retina displays

**4. Screenshot Stability**:
- Wait for animations to complete
- Disable animation in screenshots (waar mogelijk)
- Set `maxDiffPixels` threshold appropriately
- Scroll to element before screenshot

**5. Accessibility First**:
- Test keyboard navigation
- Verify ARIA attributes
- Check focus management
- Validate color contrast

---

### Test Coverage Summary

| Category | Tests | Coverage |
|----------|-------|----------|
| Visual Regression | 28 | 100% components |
| Accessibility | 39 | WCAG 2.1 AA |
| Contact Modal | 37 | Full user flows |
| Mobile Responsive | 33 | 4 viewports |
| Hero Interface | 27 | All interactions |
| Project Filtering | 25 | Complete logic |
| Language Switch | 19 | NL/EN full i18n |
| Navigation | 14 | Desktop/Mobile |
| **Total** | **222** | **End-to-end** |

---

### Troubleshooting Tests

**Common Issues**:

1. **Flaky Screenshot Tests**:
   - Increase `maxDiffPixels` threshold
   - Add `waitForTimeout()` na animations
   - Check font loading (Google Fonts race condition)

2. **Webserver Port Conflict**:
   - Kill existing process: `lsof -ti:8080 | xargs kill`
   - Change port in `playwright.config.js`

3. **Missing Snapshots**:
   - Run `npx playwright test --update-snapshots`
   - Commit nieuwe baselines to git

4. **CI Test Failures**:
   - Check HTML report artifact
   - View trace file voor debugging
   - Retry flaky tests (2x automatic in CI)

---

## 👨‍💻 Development

### Local Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Open `index.html` in browser (no build process)

### Testing Checklist
- [ ] Alle Playwright tests passen (`npm test`)
- [ ] Visual regressions approved
- [ ] Accessibility validatie passed
- [ ] Alle navigatie links werken
- [ ] Smooth scroll naar juiste secties
- [ ] WhatsApp links openen met juist nummer
- [ ] Taal toggle werkt (NL ↔ EN)
- [ ] Show More button toont verborgen projecten
- [ ] Mobile menu opent/sluit correct
- [ ] Hover effects werken op desktop
- [ ] Touch feedback op mobile
- [ ] Images laden correct
- [ ] No console errors

### Deployment

**Huidige Setup: Cloudflare Pages**

De website is gedeployed via Cloudflare Pages met automatische deployments:

1. **Push naar GitHub**: `git push origin master`
2. **Cloudflare Pages detecteert automatisch** de nieuwe commit
3. **Build & Deploy**: Binnen 2-3 minuten live op production
4. **Custom Domain**: nathaljanijman.com (via Cloudflare DNS)
5. **SSL**: Automatisch via Cloudflare Universal SSL

**Alternative Options:**
- **GitHub Pages**: Gratis hosting via GitHub
- **Netlify**: Drag-and-drop deployment met CI/CD
- **Vercel**: Automatic deployments met preview URLs

---

## 📞 Contact & Support

**Nathalja Nijman**
- **Website**: [nathaljanijman.com](https://nathaljanijman.com)
- **Email**: nathaljanijman@hotmail.com
- **LinkedIn**: [linkedin.com/in/nathalja-nijman-86410389](https://linkedin.com/in/nathalja-nijman-86410389)
- **GitHub**: [github.com/nathaljanijman](https://github.com/nathaljanijman)

---

## 📜 License

© 2025 Nathalja Nijman. All rights reserved.

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**
