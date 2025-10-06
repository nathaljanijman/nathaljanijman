# 🎨 CSS Theming Guide

Alle styling in dit template is gebaseerd op **CSS variabelen** (custom properties). Dit maakt het super makkelijk om het design aan te passen voor verschillende klanten.

---

## 📍 Waar zit de styling?

Alle CSS variabelen staan in `css/style.css` onder `:root`:

```css
:root {
    /* Colors */
    --primary-color: #0047AB;
    --text-primary: #ffffff;
    --background-dark: #000000;
    /* etc... */
}
```

---

## 🎨 Belangrijkste variabelen

### Kleuren

```css
/* Brand kleur (buttons, links, accents) */
--primary-color: #0047AB;
--primary-hover: #003380;

/* Tekst kleuren */
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.8);
--text-light: rgba(255, 255, 255, 0.6);
--text-dark: #000000;

/* Achtergronden */
--background-dark: #000000;
--background-light: #ffffff;
--background-card: rgba(255, 255, 255, 0.05);
--background-hover: rgba(255, 255, 255, 0.08);

/* Borders */
--border-color: rgba(255, 255, 255, 0.1);
--border-hover: rgba(255, 255, 255, 0.2);
```

### Typography

```css
/* Font families */
--font-family-primary: 'Raleway', sans-serif;
--font-family-headings: 'Raleway', sans-serif;

/* Font sizes */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.5rem;     /* 24px */
--font-size-2xl: 2rem;      /* 32px */
--font-size-3xl: 2.5rem;    /* 40px */
--font-size-4xl: 3.5rem;    /* 56px */
--font-size-5xl: 4rem;      /* 64px */

/* Font weights */
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;

/* Line heights */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### Spacing

```css
--spacing-xs: 0.5rem;    /* 8px */
--spacing-sm: 1rem;      /* 16px */
--spacing-md: 1.5rem;    /* 24px */
--spacing-lg: 2rem;      /* 32px */
--spacing-xl: 3rem;      /* 48px */
--spacing-2xl: 4rem;     /* 64px */
--spacing-3xl: 6rem;     /* 96px */
--spacing-4xl: 8rem;     /* 128px */
```

### Effects

```css
/* Border radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.25);

/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 300ms ease;
--transition-slow: 500ms ease;
```

---

## 🔧 Hoe pas je kleuren aan?

### Methode 1: Direct in style.css (Simpel)

Open `css/style.css` en pas de `:root` variabelen aan:

```css
:root {
    --primary-color: #FF6B35;  /* Was: #0047AB */
    --primary-hover: #E55A25;  /* Was: #003380 */
}
```

Sla op, refresh browser (Cmd+Shift+R) → Klaar!

### Methode 2: Custom CSS bestand (Best practice)

Maak `css/custom.css`:

```css
:root {
    /* Override brand colors */
    --primary-color: #FF6B35;
    --primary-hover: #E55A25;

    /* Override fonts */
    --font-family-primary: 'Inter', sans-serif;
    --font-family-headings: 'Playfair Display', serif;
}
```

Voeg toe aan `index.html` (na alle andere CSS):

```html
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/custom.css"> <!-- Nieuwe regel -->
```

---

## 🎯 Veelgebruikte aanpassingen

### 1. Brand kleur veranderen

```css
:root {
    --primary-color: #FF6B35;
    --primary-hover: #E55A25;
}
```

Dit past automatisch aan:
- Buttons
- Links
- Hover states
- Focus states
- Active navigation items
- Language toggle

### 2. Dark mode → Light mode

```css
:root {
    --background-dark: #ffffff;
    --background-light: #000000;
    --text-primary: #000000;
    --text-secondary: rgba(0, 0, 0, 0.8);
    --text-light: rgba(0, 0, 0, 0.6);
    --background-card: rgba(0, 0, 0, 0.05);
    --border-color: rgba(0, 0, 0, 0.1);
}
```

### 3. Typografie veranderen

```css
:root {
    --font-family-primary: 'Inter', sans-serif;
    --font-family-headings: 'Playfair Display', serif;
}
```

Vergeet niet de Google Fonts te importeren in `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
```

### 4. Spacing aanpassen

```css
:root {
    /* Meer ruime spacing */
    --spacing-xs: 1rem;
    --spacing-sm: 1.5rem;
    --spacing-md: 2rem;
    --spacing-lg: 3rem;
    --spacing-xl: 4rem;
}
```

### 5. Border radius aanpassen (scherper of ronder)

```css
:root {
    /* Scherpe hoeken */
    --radius-sm: 4px;
    --radius-md: 6px;
    --radius-lg: 8px;

    /* Zeer ronde hoeken */
    --radius-sm: 16px;
    --radius-md: 24px;
    --radius-lg: 32px;
}
```

---

## 🌈 Kleurenschema's

### Blauw Professional (Default)

```css
--primary-color: #0047AB;
--primary-hover: #003380;
```

### Oranje Energiek

```css
--primary-color: #FF6B35;
--primary-hover: #E55A25;
```

### Groen Modern

```css
--primary-color: #10B981;
--primary-hover: #059669;
```

### Paars Creatief

```css
--primary-color: #8B5CF6;
--primary-hover: #7C3AED;
```

### Roze Design

```css
--primary-color: #EC4899;
--primary-hover: #DB2777;
```

---

## 🎨 Component-specifieke styling

### Hero Section

`css/hero-simple.css`:

```css
.hero-simple {
    min-height: 100vh;
    background: var(--background-dark);
}

.hero-tagline {
    font-size: var(--font-size-xl);
    color: var(--text-secondary);
}
```

**Override in custom.css:**

```css
.hero-simple {
    min-height: 80vh; /* Korter */
}

.hero-tagline {
    font-size: 2rem; /* Groter */
    font-weight: 600; /* Dikker */
}
```

### Project Cards

`components/featured-work.css`:

```css
.project-card {
    background: var(--background-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
}
```

**Override:**

```css
.project-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
    border: 2px solid var(--primary-color);
    border-radius: var(--radius-xl);
}
```

### Buttons

`css/style.css`:

```css
.contact-button {
    background: var(--primary-color);
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-sm);
}
```

**Override:**

```css
.contact-button {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
    padding: 1rem 2rem;
    border-radius: var(--radius-full); /* Pill shape */
    box-shadow: var(--shadow-lg);
}
```

---

## 📱 Responsive aanpassingen

Media queries gebruiken ook variabelen:

```css
@media (max-width: 1024px) {
    :root {
        --font-size-4xl: 2.5rem; /* Kleinere hero text op tablet */
    }
}

@media (max-width: 768px) {
    :root {
        --font-size-4xl: 2rem; /* Nog kleiner op mobiel */
        --spacing-xl: 2rem; /* Minder spacing */
    }
}
```

---

## 🔍 Debugging tips

### Kleuren testen in browser

Open DevTools Console:

```javascript
// Check huidige primary color
getComputedStyle(document.documentElement).getPropertyValue('--primary-color')

// Wijzig direct in browser (temporary)
document.documentElement.style.setProperty('--primary-color', '#FF6B35')
```

### Alle variabelen bekijken

DevTools → Elements → :root → Computed styles → zie alle CSS variabelen

---

## ✅ Checklist voor theming

- [ ] Kies primaire kleur (--primary-color)
- [ ] Kies hover kleur (--primary-hover)
- [ ] Test op donkere achtergrond (contrast check)
- [ ] Test buttons (zichtbaar + leesbaar?)
- [ ] Test links (zichtbaar?)
- [ ] Check active navigation states
- [ ] Test op mobiel (spacing goed?)
- [ ] Check alle interactive states (hover, focus, active)
- [ ] Valideer accessibility (contrast ratio > 4.5:1)

---

## 🛠️ Tools

**Kleur kiezen:**
- [Coolors.co](https://coolors.co) - Color palette generator
- [Adobe Color](https://color.adobe.com) - Color wheel
- [Color Hunt](https://colorhunt.co) - Color palettes

**Contrast checken:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio](https://contrast-ratio.com)

**Fonts:**
- [Google Fonts](https://fonts.google.com)
- [FontPair](https://fontpair.co) - Font combinations

---

**Veel plezier met theming! 🎨**
