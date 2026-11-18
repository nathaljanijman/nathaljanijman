// Google Analytics init with bot detection and opt-out.
// Kept in a separate file so the Content-Security-Policy needs no 'unsafe-inline'.
// Comprehensive bot detection
function isBot() {
    const ua = navigator.userAgent.toLowerCase();

    // Bekende bot patterns
    const botPatterns = [
        // Search engine bots
        'googlebot', 'bingbot', 'yandexbot', 'baiduspider', 'duckduckbot',
        // Social media bots
        'facebookexternalhit', 'twitterbot', 'linkedinbot', 'slackbot', 'telegrambot',
        // Monitoring & Analytics
        'lighthouse', 'gtmetrix', 'pingdom', 'uptimerobot', 'statuscake',
        'pagespeed', 'speed insights', 'web page test',
        // Crawlers
        'crawler', 'spider', 'scraper', 'bot', 'monitoring',
        // Headless browsers
        'headless', 'phantom', 'selenium', 'puppeteer', 'playwright',
        // Other common bots
        'ahrefsbot', 'semrushbot', 'mj12bot', 'dotbot', 'rogerbot',
        'screaming frog', 'majestic', 'archive.org_bot'
    ];

    // Check user agent
    if (botPatterns.some(pattern => ua.includes(pattern))) {
        return true;
    }

    // Check for headless browsers
    if (navigator.webdriver) {
        return true;
    }

    // Check for missing features (common in bots)
    if (!navigator.language || !navigator.languages) {
        return true;
    }

    // Check for Lighthouse specifically
    if (window.performance && window.performance.getEntriesByType) {
        const resources = window.performance.getEntriesByType('resource');
        if (resources.some(r => r.name.includes('lighthouse'))) {
            return true;
        }
    }

    return false;
}

// Check if user has opted out of tracking
const gaOptOut = localStorage.getItem('ga-opt-out') === 'true';
const detectedBot = isBot();

// Only load GA if not opted out AND not a bot
if (!gaOptOut && !detectedBot) {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-JMLD724KEM');
} else if (detectedBot) {
    console.log('🤖 Bot detected - Analytics disabled');
}

// Admin opt-out function - toegankelijk via console
window.gaOptOut = function() {
    localStorage.setItem('ga-opt-out', 'true');
    console.log('✅ Google Analytics tracking uitgeschakeld voor deze browser');
    console.log('⚠️  Refresh de pagina om effect te zien');
};

window.gaOptIn = function() {
    localStorage.removeItem('ga-opt-out');
    console.log('✅ Google Analytics tracking ingeschakeld voor deze browser');
    console.log('⚠️  Refresh de pagina om effect te zien');
};

window.gaStatus = function() {
    const optOutStatus = localStorage.getItem('ga-opt-out') === 'true';
    const botStatus = isBot();
    console.log('Google Analytics Status:');
    console.log('  Opt-out:', optOutStatus ? '🔴 UIT' : '🟢 AAN');
    console.log('  Bot detection:', botStatus ? '🤖 BOT DETECTED' : '👤 HUMAN');
    console.log('  Tracking:', (!optOutStatus && !botStatus) ? '🟢 ACTIEF' : '🔴 INACTIEF');
};
