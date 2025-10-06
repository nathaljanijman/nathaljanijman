/**
 * Portfolio Template Configuration
 *
 * Edit this file to customize the portfolio for different clients.
 * All content, links, and personal information can be changed here.
 */

const portfolioConfig = {
    // =======================
    // PERSONAL INFORMATION
    // =======================
    personal: {
        name: "Nathalja Nijman",
        title: "Product Owner & Digital Strategist",
        email: "nathaljanijman@hotmail.com",
        phone: "+31657591440",
        location: "Amsterdam, Netherlands",

        // Social Links
        social: {
            linkedin: "https://linkedin.com/in/nathalja-nijman-86410389",
            github: null, // Set to null if not applicable
            twitter: null,
            instagram: null,
            wikipedia: "https://nl.wikipedia.org/wiki/Nathalja_Nijman"
        },

        // WhatsApp Configuration
        whatsapp: {
            enabled: true,
            number: "31657591440", // Without + or spaces
            defaultMessage: "Hoi! Ik kwam via je portfolio en wilde contact opnemen."
        }
    },

    // =======================
    // BRANDING & DESIGN
    // =======================
    branding: {
        // Primary brand color (used for buttons, links, accents)
        primaryColor: "#0047AB",

        // Logo configuration
        logo: {
            type: "text", // "text" or "image"
            text: "NN", // Used if type is "text"
            image: null, // Path to logo image if type is "image"
        },

        // Font settings
        fonts: {
            primary: "Raleway, sans-serif",
            headings: "Raleway, sans-serif"
        }
    },

    // =======================
    // HERO SECTION
    // =======================
    hero: {
        nl: {
            name: "Nathalja Nijman",
            tagline: "Ik maak digitale producten, los complexe vraagstukken op, en help mensen groeien",
            inputPlaceholder: "Waar kan ik je mee helpen?",
            suggestions: [
                "Ik wil sneller groeien zonder chaos",
                "Ik wil betere resultaten met minder stress",
                "Ik wil meer impact maken in mijn werk"
            ]
        },
        en: {
            name: "Nathalja Nijman",
            tagline: "I create digital products, solve complex challenges, and help people grow",
            inputPlaceholder: "How can I help you?",
            suggestions: [
                "I want faster growth without chaos",
                "I want better results with less stress",
                "I want to make more impact at work"
            ]
        },

        // Background image
        backgroundImage: "images/nathalja-work.jpg",

        // Portfolio offering sticker
        portfolioSticker: {
            enabled: true,
            link: "portfolio-website.html"
        }
    },

    // =======================
    // TICKER STATS
    // =======================
    ticker: {
        nl: [
            "7+ jaar ervaring als product owner",
            "5+ jaar bij corporate organisatie",
            "8+ corporate internationale websites eigenaarschap",
            "Internationale samenwerking",
            "25+ team members",
            "150+ stakeholders",
            "10+ jaar topsport ervaring"
        ],
        en: [
            "7+ years experience as product owner",
            "5+ years at corporate organization",
            "8+ corporate international websites ownership",
            "International collaboration",
            "25+ team members",
            "150+ stakeholders",
            "10+ years top athlete experience"
        ]
    },

    // =======================
    // PROJECTS
    // =======================
    projects: {
        sectionTitle: {
            nl: "Geselecteerd werk",
            en: "Selected Work"
        },
        sectionSubtitle: {
            nl: "5+ jaar digital product leadership",
            en: "5+ years of digital product leadership"
        },

        // Project filters
        filters: [
            { id: "all", label_nl: "Alle projecten", label_en: "All projects" },
            { id: "product-owner", label_nl: "Product Owner", label_en: "Product Owner" },
            { id: "web", label_nl: "Web Apps", label_en: "Web Apps" },
            { id: "entrepreneurship", label_nl: "Ondernemerschap", label_en: "Entrepreneurship" }
        ],

        // Project items
        items: [
            {
                id: "abn-amro",
                category: "product-owner",
                featured: true,
                image: "images/project-abn-amro.png",
                year: { nl: "2020 - Heden", en: "2020 - Present" },
                type: { nl: "Product Owner", en: "Product Owner" },
                title: "ABN AMRO - Website & Content Platform",
                description: {
                    nl: "Leiding over 2 teams (25+ professionals) voor website en content management. Verantwoordelijk voor CMS (Tridion), DAM, Content API en OWA front-end applicatie. 11.000+ pagina's over 8 domeinen, NL & NW Europa.",
                    en: "Leading 2 teams (25+ professionals) for website and content management. Responsible for CMS (Tridion), DAM, Content API and OWA front-end application. 11,000+ pages across 8 domains, NL & NW Europe."
                },
                impact: [
                    { number: "11.000+", label_nl: "Pagina's beheerd", label_en: "Pages managed" },
                    { number: "150+", label_nl: "Stakeholders", label_en: "Stakeholders" }
                ],
                tags: ["Tridion CMS", "Content API", "Agile", "Stakeholder Management"],
                links: [
                    { type: "website", url: "https://www.abnamro.nl", label_nl: "Website", label_en: "Website" }
                ]
            },
            {
                id: "sprint-planner",
                category: "web",
                featured: true,
                image: "images/project-sprintplanner.png",
                year: { nl: "2025", en: "2025" },
                type: { nl: "Web App Development", en: "Web App Development" },
                title: "Sprint Planner",
                description: {
                    nl: "Agile sprint planning tool voor teams. Plan sprints, track velocity en visualiseer team capacity in één intuïtieve interface.",
                    en: "Agile sprint planning tool for teams. Plan sprints, track velocity and visualize team capacity in one intuitive interface."
                },
                impact: [
                    { number: "95%", label_nl: "Voorspelbaarheid", label_en: "Predictability" },
                    { number: "50+", label_nl: "Actief gebruik", label_en: "Active usage" }
                ],
                tags: ["Vue.js", "Agile", "Team Collaboration", "Planning"],
                links: [
                    { type: "demo", url: "https://sprintplanner.nl", label_nl: "Live App", label_en: "Live App" }
                ]
            },
            // Add more projects as needed...
        ]
    },

    // =======================
    // ABOUT SECTION
    // =======================
    about: {
        title: { nl: "Over Nathalja", en: "About Nathalja" },
        subtitle: { nl: "Van topsport naar digital product leadership", en: "From top athlete to digital product leadership" },
        image: "images/nathalja-about.jpg",

        paragraphs: {
            nl: [
                "Na jaren als topsporter leerde ik wat het betekent om onder druk te presteren, in teams te excelleren, en altijd focused te blijven op het doel. Die mindset breng ik nu in als Product Owner bij ABN AMRO.",
                "Van luxury e-commerce bij BALR. tot enterprise platforms bij ABN AMRO - ik help teams betere digitale producten bouwen. Of het nu gaat om 11.000+ content pagina's beheren, offshore teams coördineren, of API integraties opzetten: ik geloof in data-driven leadership en producten die écht werken.",
                "Als entrepreneur heb ik mijn eigen ski goggles merk SLOPEZ opgezet, en als \"vibe coder\" bouw ik regelmatig side projects zoals Sprint Planner en DHGate Monitor. Ik combineer strategisch denken met hands-on uitvoering - van visie tot shipped product."
            ],
            en: [
                "After years as a top athlete, I learned what it means to perform under pressure, excel in teams, and always stay focused on the goal. I bring that mindset into my role as Product Owner at ABN AMRO.",
                "From luxury e-commerce at BALR. to enterprise platforms at ABN AMRO - I help teams build better digital products. Whether it's managing 11,000+ content pages, coordinating offshore teams, or setting up API integrations: I believe in data-driven leadership and products that truly work.",
                "As an entrepreneur, I founded my own ski goggles brand SLOPEZ, and as a \"vibe coder\" I regularly build side projects like Sprint Planner and DHGate Monitor. I combine strategic thinking with hands-on execution - from vision to shipped product."
            ]
        },

        stats: [
            { number: "7", label_nl: "Jaar Product Owner", label_en: "Years Product Owner" },
            { number: "10+", label_nl: "Jaar Topsport", label_en: "Years Top Athlete" },
            { number: "NL", label_nl: "Wereldwijd Remote", label_en: "Remote Worldwide" }
        ]
    },

    // =======================
    // CONTACT SECTION
    // =======================
    contact: {
        title: { nl: "Klaar voor de volgende stap?", en: "Ready for the next step?" },
        subtitle: { nl: "Ik help je verder", en: "I'll help you move forward" },

        options: [
            {
                type: "whatsapp",
                enabled: true,
                title: "WhatsApp",
                description: { nl: "Direct en persoonlijk bespreken", en: "Direct and personal discussion" },
                responseTime: { nl: "Responstijd: ~2 uur", en: "Response time: ~2 hours" }
            },
            {
                type: "email",
                enabled: true,
                title: "Email",
                description: { nl: "Gedetailleerde project bespreking", en: "Detailed project discussion" },
                responseTime: { nl: "Responstijd: ~24 uur", en: "Response time: ~24 hours" }
            },
            {
                type: "linkedin",
                enabled: true,
                title: "LinkedIn",
                description: { nl: "Netwerk en professioneel contact", en: "Network and professional contact" },
                responseTime: { nl: "Bekijk profiel", en: "View profile" }
            }
        ]
    },

    // =======================
    // FOOTER
    // =======================
    footer: {
        copyrightYear: 2025,
        links: [
            { label: "LinkedIn", url: "https://linkedin.com/in/nathalja-nijman-86410389", external: true },
            { label: "Wikipedia", url: "https://nl.wikipedia.org/wiki/Nathalja_Nijman", external: true },
            { label: "Email", url: "mailto:nathaljanijman@hotmail.com", external: false }
        ]
    },

    // =======================
    // FEATURES
    // =======================
    features: {
        // Google Analytics
        analytics: {
            enabled: true,
            trackingId: "G-JMLD724KEM"
        },

        // Language switching
        languages: {
            enabled: true,
            default: "nl",
            available: ["nl", "en"]
        },

        // Mobile bottom navigation
        mobileNav: {
            enabled: true
        },

        // Contact modal
        contactModal: {
            enabled: true
        }
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioConfig;
}
