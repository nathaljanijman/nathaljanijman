// Google Analytics Event Tracking
// Track important user interactions

// Helper function to send events
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventParams);
    }
}

// Track WhatsApp clicks
document.addEventListener('DOMContentLoaded', function() {

    // WhatsApp button clicks
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('contact_whatsapp', {
                event_category: 'Contact',
                event_label: 'WhatsApp Click',
                page_location: window.location.pathname
            });
        });
    });

    // Email button clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('contact_email', {
                event_category: 'Contact',
                event_label: 'Email Click',
                page_location: window.location.pathname
            });
        });
    });

    // LinkedIn clicks
    const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
    linkedinLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('social_linkedin', {
                event_category: 'Social',
                event_label: 'LinkedIn Click',
                page_location: window.location.pathname
            });
        });
    });

    // Project link clicks
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function() {
            const projectName = this.closest('.project-card')?.querySelector('h3')?.textContent || 'Unknown';
            trackEvent('project_view', {
                event_category: 'Projects',
                event_label: projectName,
                page_location: window.location.pathname
            });
        });
    });

    // Package selection (portfolio website page)
    const packageButtons = document.querySelectorAll('.package-cta');
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.closest('.package-card')?.querySelector('h3')?.textContent || 'Unknown';
            trackEvent('package_select', {
                event_category: 'Portfolio Website',
                event_label: packageName,
                page_location: window.location.pathname
            });
        });
    });

    // Language switch tracking
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const language = this.getAttribute('data-lang');
            trackEvent('language_switch', {
                event_category: 'User Preference',
                event_label: language.toUpperCase(),
                page_location: window.location.pathname
            });
        });
    });

    // Portfolio sticker click
    const portfolioSticker = document.querySelector('.portfolio-sticker');
    if (portfolioSticker) {
        portfolioSticker.addEventListener('click', function() {
            trackEvent('portfolio_sticker_click', {
                event_category: 'Navigation',
                event_label: 'Portfolio Website CTA',
                page_location: window.location.pathname
            });
        });
    }

    // Show more projects
    const showMoreBtn = document.getElementById('showMoreProjects');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            trackEvent('show_more_projects', {
                event_category: 'Projects',
                event_label: expanded ? 'Show Less' : 'Show More',
                page_location: window.location.pathname
            });
        });
    }

    // Hero conversation input
    const heroInput = document.getElementById('heroInput');
    if (heroInput) {
        const heroForm = document.getElementById('heroConversationForm');
        heroForm?.addEventListener('submit', function(e) {
            const message = heroInput.value;
            if (message.trim()) {
                trackEvent('hero_conversation_start', {
                    event_category: 'Engagement',
                    event_label: 'Hero Input Submit',
                    page_location: window.location.pathname,
                    message_length: message.length
                });
            }
        });
    }

    // Contact modal opens
    const contactChoiceModal = document.getElementById('contactChoiceModal');
    if (contactChoiceModal) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.classList.contains('active')) {
                    trackEvent('contact_modal_open', {
                        event_category: 'Contact',
                        event_label: 'Modal Opened',
                        page_location: window.location.pathname
                    });
                }
            });
        });
        observer.observe(contactChoiceModal, { attributes: true, attributeFilter: ['class'] });
    }

    // Track scroll depth with optimized throttling using requestAnimationFrame
    let scrollDepth = 0;
    let scrollTicking = false;

    function updateScrollDepth() {
        const currentScroll = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);

        // Track at 25%, 50%, 75%, 100%
        const depths = [
            { threshold: 25, label: '25%' },
            { threshold: 50, label: '50%' },
            { threshold: 75, label: '75%' },
            { threshold: 95, label: '100%', depth: 100 }
        ];

        for (const { threshold, label, depth = threshold } of depths) {
            if (currentScroll >= threshold && scrollDepth < depth) {
                scrollDepth = depth;
                trackEvent('scroll_depth', {
                    event_category: 'Engagement',
                    event_label: label,
                    page_location: window.location.pathname
                });
                break;
            }
        }

        scrollTicking = false;
    }

    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            requestAnimationFrame(updateScrollDepth);
            scrollTicking = true;
        }
    }, { passive: true });
});

// Track page load time
window.addEventListener('load', function() {
    setTimeout(function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

        trackEvent('page_performance', {
            event_category: 'Performance',
            event_label: 'Page Load Time',
            value: Math.round(pageLoadTime / 1000), // in seconds
            page_location: window.location.pathname
        });
    }, 0);
});
