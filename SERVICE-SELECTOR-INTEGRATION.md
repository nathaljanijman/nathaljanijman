# Service Selector - Integratie Handleiding

## 🎯 Overzicht

De Service Selector is een interactieve decision tree die bezoekers helpt de juiste service te vinden. Het component is volledig **brand-compliant** met je portfolio design:

- ✅ Cobalt blue accent colors (#0047AB, #1E5FBF)
- ✅ Raleway typography
- ✅ Clean, professional icons (geen emoji's)
- ✅ Consistent spacing en transitions
- ✅ Responsive & accessible

## 📁 Bestanden

```
/services-decision-tree.html          # Standalone decision tree
/components/service-selector-modal.html   # Modal wrapper
/components/service-selector-cta.html     # CTA button component
```

## 🚀 Integratie in je landingspagina

### Stap 1: Voeg de modal toe aan index.html

Voeg dit toe **vóór de sluitende `</body>` tag**:

```html
<!-- Service Selector Modal -->
<?php include 'components/service-selector-modal.html'; ?>

<!-- OF als je geen PHP gebruikt: -->
<div class="service-selector-modal" id="serviceSelectorModal">
    <div class="service-selector-backdrop" onclick="closeServiceSelector()"></div>
    <div class="service-selector-container">
        <button class="service-selector-close" onclick="closeServiceSelector()">×</button>
        <iframe src="services-decision-tree.html" width="100%" height="600px" frameborder="0"></iframe>
    </div>
</div>

<script>
    function openServiceSelector() {
        document.getElementById('serviceSelectorModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeServiceSelector() {
        document.getElementById('serviceSelectorModal').classList.remove('active');
        document.body.style.overflow = '';
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeServiceSelector();
    });
</script>
```

### Stap 2: Voeg CTA button toe in About sectie

Vervang in **index.html**, in de About sectie, na de about-stats:

```html
<!-- About Me Section -->
<section id="about" class="about-section">
    <div class="about-container">
        <!-- ... existing about content ... -->

        <div class="about-text">
            <p>...</p>
            <p>...</p>
            <p>...</p>

            <!-- Stats Grid -->
            <div class="about-stats">
                <!-- ... existing stats ... -->
            </div>

            <!-- ✨ VOEG HIER TOE ✨ -->
            <div class="service-selector-cta-wrapper" style="margin-top: 48px;">
                <button class="service-selector-cta" onclick="openServiceSelector()" type="button">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <span>Welke service past bij jou?</span>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
                <span style="display: block; font-size: 0.95rem; color: rgba(255,255,255,0.6); margin-top: 12px;">
                    2 minuten • Persoonlijk advies op maat
                </span>
            </div>
            <!-- ✨ EINDE TOEVOEGING ✨ -->

        </div>
    </div>
</section>
```

### Stap 3: Voeg CSS toe

Voeg dit toe aan je `css/style.css` of maak een nieuw bestand `css/service-selector.css`:

```css
/* Service Selector Modal */
.service-selector-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
}

.service-selector-modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
}

.service-selector-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
}

.service-selector-container {
    position: relative;
    max-width: 900px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    background: #000;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px;
    padding: 40px;
    z-index: 10001;
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.service-selector-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 24px;
}

.service-selector-close:hover {
    background: rgba(255,255,255,0.1);
    transform: rotate(90deg);
}

/* Service Selector CTA */
.service-selector-cta-wrapper {
    text-align: center;
}

.service-selector-cta {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 20px 32px;
    background: linear-gradient(135deg, #0047AB 0%, #1E5FBF 50%, #0066FF 100%);
    color: #fff;
    border: none;
    border-radius: 16px;
    font-family: 'Raleway', sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 20px rgba(0, 71, 171, 0.3);
}

.service-selector-cta:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 71, 171, 0.5);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 640px) {
    .service-selector-container {
        width: 100%;
        max-height: 100vh;
        border-radius: 0;
        padding: 24px;
    }

    .service-selector-cta {
        width: 100%;
        justify-content: center;
    }
}
```

## 🎨 Alternatieve plaatsingen

### Optie A: Hero sectie (direct na ticker)

```html
<div class="ticker-section stats">
    <!-- ... ticker content ... -->
</div>

<!-- Service CTA -->
<div style="text-align: center; padding: 60px 20px; background: #080808;">
    <button class="service-selector-cta" onclick="openServiceSelector()">
        <span>Welke service past bij jou?</span>
        <svg>...</svg>
    </button>
</div>

<iframe src="services-improved.html" ...>
```

### Optie B: Als sticky button (always visible)

```html
<button
    class="service-selector-sticky"
    onclick="openServiceSelector()"
    style="position: fixed; bottom: 24px; right: 24px; z-index: 9999;">
    <svg>...</svg>
    Service vinder
</button>
```

### Optie C: In plaats van services-improved iframe

Vervang het huidige iframe op regel 296:

```html
<!-- WAS: -->
<iframe src="services-improved.html" width="100%" height="800px"></iframe>

<!-- WORDT: -->
<section style="padding: 100px 20px; background: #000;">
    <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
        <h2 style="font-size: 3rem; margin-bottom: 24px;">Hoe kan ik je helpen?</h2>
        <p style="color: rgba(255,255,255,0.6); margin-bottom: 48px; font-size: 1.25rem;">
            Laat me je de perfecte service aanbevelen
        </p>
        <button class="service-selector-cta" onclick="openServiceSelector()">
            <svg>...</svg>
            Start de service selector
            <svg>...</svg>
        </button>
    </div>
</section>
```

## ✅ Checklist

- [ ] `services-decision-tree.html` staat in de root
- [ ] Modal HTML toegevoegd aan index.html
- [ ] CSS toegevoegd
- [ ] JavaScript functies toegevoegd
- [ ] CTA button geplaatst in About sectie
- [ ] Getest op desktop
- [ ] Getest op mobile
- [ ] Escape toets sluit modal
- [ ] Click op backdrop sluit modal

## 🔧 Aanpassingen

### Kleuren aanpassen

Alle cobalt blue kleuren staan in de CSS variables:
- `#0047AB` - Primary cobalt
- `#1E5FBF` - Light cobalt
- `#0066FF` - Bright cobalt

### Teksten aanpassen

Alle teksten staan in `services-decision-tree.html` en zijn makkelijk aan te passen.

### Flow aanpassen

De decision tree logic staat in het JavaScript onderaan `services-decision-tree.html`.

## 🎯 Aanbeveling

**Beste plaatsing:** In de About sectie, na de stats.

**Waarom:**
- Bezoeker kent je al (heeft over je gelezen)
- Natuurlijk moment voor "next step"
- Niet te opdringerig
- Hoge intent op dit punt in de journey

**Call-to-action:**
"Welke service past bij jou?" met subtitle "2 minuten • Persoonlijk advies op maat"

Dit geeft vertrouwen (quick) en waarde (persoonlijk).
