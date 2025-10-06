#!/bin/bash

##############################################
# Portfolio Template Generator
#
# Genereer automatisch een nieuwe portfolio
# voor een klant in 30 seconden!
##############################################

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Portfolio Template Generator 🚀     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Vraag klant informatie
read -p "$(echo -e ${GREEN}Klant naam:${NC}) " CLIENT_NAME
read -p "$(echo -e ${GREEN}Klant email:${NC}) " CLIENT_EMAIL
read -p "$(echo -e ${GREEN}Klant telefoon ${YELLOW}[optioneel]:${NC}) " CLIENT_PHONE
read -p "$(echo -e ${GREEN}LinkedIn URL ${YELLOW}[optioneel]:${NC}) " CLIENT_LINKEDIN
read -p "$(echo -e ${GREEN}Brand kleur ${YELLOW}[bijv: #FF6B35]:${NC}) " BRAND_COLOR

# Defaults
if [ -z "$CLIENT_PHONE" ]; then
    CLIENT_PHONE="+31612345678"
fi

if [ -z "$CLIENT_LINKEDIN" ]; then
    CLIENT_LINKEDIN="https://linkedin.com/in/placeholder"
fi

if [ -z "$BRAND_COLOR" ]; then
    BRAND_COLOR="#0047AB"
fi

# Maak klant folder naam (lowercase, geen spaties)
FOLDER_NAME=$(echo "$CLIENT_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
PORTFOLIO_DIR="${FOLDER_NAME}-portfolio"

echo ""
echo -e "${BLUE}📁 Folder naam:${NC} $PORTFOLIO_DIR"
echo ""

# Bevestiging
read -p "$(echo -e ${YELLOW}Doorgaan? [y/n]:${NC}) " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "❌ Geannuleerd"
    exit 0
fi

echo ""
echo -e "${BLUE}🚀 Portfolio aanmaken...${NC}"

# Maak nieuwe folder
mkdir -p "../$PORTFOLIO_DIR"

# Kopieer alle bestanden BEHALVE git/node_modules/test bestanden
echo "📋 Kopiëren template bestanden..."
rsync -av --progress . "../$PORTFOLIO_DIR" \
    --exclude .git \
    --exclude node_modules \
    --exclude .DS_Store \
    --exclude check-translations.js \
    --exclude test-language.html \
    --exclude generate-portfolio.sh

# Navigeer naar nieuwe folder
cd "../$PORTFOLIO_DIR"

# Update config.js met klant informatie
echo "✏️  Config.js updaten..."
cat > config.js << EOF
/**
 * Portfolio Configuration for: $CLIENT_NAME
 * Generated: $(date +"%Y-%m-%d %H:%M")
 */

const portfolioConfig = {
    personal: {
        name: "$CLIENT_NAME",
        title: "Digital Professional", // ← PAS DIT AAN
        email: "$CLIENT_EMAIL",
        phone: "$CLIENT_PHONE",
        location: "Netherlands",

        social: {
            linkedin: "$CLIENT_LINKEDIN",
            github: null,
            twitter: null,
            instagram: null,
            wikipedia: null
        },

        whatsapp: {
            enabled: true,
            number: "${CLIENT_PHONE/+/}", // Zonder +
            defaultMessage: "Hoi! Ik kwam via je portfolio en wilde contact opnemen."
        }
    },

    branding: {
        primaryColor: "$BRAND_COLOR",
        logo: {
            type: "text",
            text: "$(echo $CLIENT_NAME | head -c 2 | tr '[:lower:]' '[:upper:]')",
            image: null,
        },
        fonts: {
            primary: "Raleway, sans-serif",
            headings: "Raleway, sans-serif"
        }
    },

    hero: {
        nl: {
            name: "$CLIENT_NAME",
            tagline: "Ik help bedrijven groeien met digitale oplossingen", // ← PAS DIT AAN
            inputPlaceholder: "Waar kan ik je mee helpen?",
            suggestions: [
                "Ik wil meer leads genereren",
                "Ik wil mijn website verbeteren",
                "Ik wil advies over digital strategy"
            ]
        },
        en: {
            name: "$CLIENT_NAME",
            tagline: "I help companies grow with digital solutions", // ← CUSTOMIZE THIS
            inputPlaceholder: "How can I help you?",
            suggestions: [
                "I want to generate more leads",
                "I want to improve my website",
                "I want advice on digital strategy"
            ]
        },
        backgroundImage: "images/hero-bg.jpg", // ← VERVANG DEZE AFBEELDING
        portfolioSticker: {
            enabled: false // Waarschijnlijk niet nodig voor klanten
        }
    },

    ticker: {
        nl: [
            "5+ jaar ervaring", // ← PAS DEZE AAN
            "50+ projecten afgerond",
            "Internationale klanten",
            "100% tevredenheid"
        ],
        en: [
            "5+ years experience",
            "50+ projects completed",
            "International clients",
            "100% satisfaction"
        ]
    },

    projects: {
        sectionTitle: {
            nl: "Mijn werk",
            en: "My Work"
        },
        sectionSubtitle: {
            nl: "Geselecteerde projecten",
            en: "Selected projects"
        },
        filters: [
            { id: "all", label_nl: "Alle projecten", label_en: "All projects" }
        ],
        items: [
            // ← VOEG HIER PROJECTEN TOE (zie TEMPLATE-SETUP.md)
            {
                id: "example-project",
                category: "all",
                featured: true,
                image: "images/project-placeholder.png",
                year: { nl: "2024", en: "2024" },
                type: { nl: "Web Development", en: "Web Development" },
                title: "Voorbeeld Project",
                description: {
                    nl: "Beschrijving van het project...",
                    en: "Project description..."
                },
                impact: [
                    { number: "500+", label_nl: "Bezoekers", label_en: "Visitors" }
                ],
                tags: ["React", "Node.js"],
                links: [
                    { type: "website", url: "#", label_nl: "Website", label_en: "Website" }
                ]
            }
        ]
    },

    about: {
        title: { nl: "Over $CLIENT_NAME", en: "About $CLIENT_NAME" },
        subtitle: { nl: "Digital professional", en: "Digital professional" },
        image: "images/about.jpg", // ← VERVANG DEZE AFBEELDING
        paragraphs: {
            nl: [
                "Eerste paragraaf over de achtergrond...", // ← PAS DIT AAN
                "Tweede paragraaf over ervaring...",
                "Derde paragraaf over skills en aanpak..."
            ],
            en: [
                "First paragraph about background...",
                "Second paragraph about experience...",
                "Third paragraph about skills and approach..."
            ]
        },
        stats: [
            { number: "5+", label_nl: "Jaar ervaring", label_en: "Years experience" },
            { number: "50+", label_nl: "Projecten", label_en: "Projects" },
            { number: "NL", label_nl: "Based in Nederland", label_en: "Based in Netherlands" }
        ]
    },

    contact: {
        title: { nl: "Neem contact op", en: "Get in touch" },
        subtitle: { nl: "Ik help je graag verder", en: "I'd love to help" },
        options: [
            {
                type: "email",
                enabled: true,
                title: "Email",
                description: { nl: "Stuur me een email", en: "Send me an email" },
                responseTime: { nl: "Responstijd: ~24 uur", en: "Response time: ~24 hours" }
            },
            {
                type: "linkedin",
                enabled: $([ "$CLIENT_LINKEDIN" != "https://linkedin.com/in/placeholder" ] && echo "true" || echo "false"),
                title: "LinkedIn",
                description: { nl: "Connect op LinkedIn", en: "Connect on LinkedIn" },
                responseTime: { nl: "Bekijk profiel", en: "View profile" }
            }
        ]
    },

    footer: {
        copyrightYear: $(date +"%Y"),
        links: [
            { label: "Email", url: "mailto:$CLIENT_EMAIL", external: false }
        ]
    },

    features: {
        analytics: {
            enabled: false, // ← ENABLE EN VOEG TRACKING ID TOE
            trackingId: "G-XXXXXXXXXX"
        },
        languages: {
            enabled: true,
            default: "nl",
            available: ["nl", "en"]
        },
        mobileNav: { enabled: true },
        contactModal: { enabled: true }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioConfig;
}
EOF

# Update page title in index.html
sed -i '' "s/<title>.*<\/title>/<title>$CLIENT_NAME - Portfolio<\/title>/" index.html

# Maak TODO list
cat > TODO.txt << EOF
Portfolio Setup Checklist voor: $CLIENT_NAME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Content
  [ ] Update config.js → hero.tagline (huidige: "Ik help bedrijven...")
  [ ] Update config.js → about.paragraphs (3 paragrafen)
  [ ] Update config.js → projects.items (voeg echte projecten toe)
  [ ] Update config.js → ticker stats

🖼️  Afbeeldingen (vervang deze!)
  [ ] images/hero-bg.jpg         - Hero achtergrond (1920x1080)
  [ ] images/about.jpg            - About foto (800x800)
  [ ] images/project-1.png        - Project screenshots

🎨 Design
  [ ] Check brand kleur in browser: $BRAND_COLOR
  [ ] Test responsive design (mobile/tablet/desktop)

🔧 Technical
  [ ] Google Analytics toevoegen (config.js → features.analytics)
  [ ] Test contact formulier/WhatsApp
  [ ] Test language switch (NL ↔ EN)

🚀 Deploy
  [ ] Test lokaal: python3 -m http.server 8080
  [ ] Git repository aanmaken
  [ ] Push naar GitHub/hosting
  [ ] Domain koppelen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 TIP: Zie TEMPLATE-SETUP.md voor gedetailleerde uitleg!
EOF

# Initialize git
echo "📦 Git repository initialiseren..."
git init
git add .
git commit -m "Initial portfolio setup for $CLIENT_NAME

Generated with Portfolio Template Generator
- Basic config setup complete
- Ready for customization
- See TODO.txt for next steps
"

echo ""
echo -e "${GREEN}✅ Portfolio succesvol aangemaakt!${NC}"
echo ""
echo -e "${BLUE}📁 Locatie:${NC} ../$PORTFOLIO_DIR"
echo ""
echo -e "${YELLOW}📋 Volgende stappen:${NC}"
echo "   1. cd ../$PORTFOLIO_DIR"
echo "   2. cat TODO.txt                    (checklist bekijken)"
echo "   3. open TEMPLATE-SETUP.md          (uitgebreide docs)"
echo "   4. Edit config.js                  (content aanpassen)"
echo "   5. Vervang afbeeldingen in images/"
echo "   6. python3 -m http.server 8080     (lokaal testen)"
echo ""
echo -e "${GREEN}🎉 Succes met het bouwen van de portfolio!${NC}"
echo ""
