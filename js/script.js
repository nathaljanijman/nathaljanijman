// Portfolio JavaScript - Interactive Functionality
// Optimized version with performance improvements and code quality fixes

// Configuration constants
const CONFIG = {
    CONTACT: {
        WHATSAPP: '31657591440',
        EMAIL: 'nathaljanijman@hotmail.com'
    },
    TIMING: {
        INIT_DELAY: 150,
        FADE_IN: 10,
        FADE_OUT: 300,
        CHAT_FOCUS: 100,
        CHAT_SUBMIT: 300
    },
    BREAKPOINTS: {
        MOBILE: 1024
    },
    CSS_CLASSES: {
        ACTIVE: 'active',
        HIDDEN: 'hidden',
        VISIBLE: 'visible',
        FADE_IN: 'fade-in',
        FADE_OUT: 'fade-out'
    }
};

// DOM Element Cache
const DOM = {};

// Cache DOM elements once on load
function cacheDOMElements() {
    DOM.header = document.querySelector('.header');
    DOM.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-item');
    DOM.projectCards = document.querySelectorAll('.project-card');
    DOM.statCards = document.querySelectorAll('.stat-card');
    DOM.stats = document.querySelectorAll('.stat-number');
    DOM.form = document.querySelector('.hero-input-form');
    DOM.filterButtons = document.querySelectorAll('.filter-btn');
    DOM.showMoreBtn = document.getElementById('showMoreProjects');
    DOM.heroForm = document.getElementById('heroConversationForm');
    DOM.heroInput = document.getElementById('heroInput');
    DOM.suggestionPills = document.querySelectorAll('.suggestion-pill');
    DOM.contactChoiceModal = document.getElementById('contactChoiceModal');
    DOM.conversationDialogue = document.getElementById('conversationDialogue');
    DOM.chatInput = document.getElementById('chatInput');
    DOM.messagePreview = document.querySelector('.user-message-preview');
    DOM.modalClose = document.getElementById('modalClose');
    DOM.chooseWhatsApp = document.getElementById('chooseWhatsApp');
    DOM.chooseEmail = document.getElementById('chooseEmail');
}

document.addEventListener('DOMContentLoaded', function() {
    // Cache all DOM elements first
    cacheDOMElements();

    // Remove header completely on mobile
    if (window.innerWidth <= CONFIG.BREAKPOINTS.MOBILE && DOM.header) {
        DOM.header.remove();
    }

    // Initialize all functionality
    // Wait a bit to ensure languageManager is initialized
    setTimeout(() => {
        initNavigation();
        initScrollAnimations();
        initStatsCounter();
        initFormHandling();
        initSmoothScrolling();
        initDynamicViewport();
        initProjectFiltering();
        initProjectCardAnimations();
        initShowMoreProjects();
        initHeroConversation();
    }, CONFIG.TIMING.INIT_DELAY);
});

// Navigation
function initNavigation() {
    if (!DOM.navLinks.length) return;

    DOM.navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            DOM.navLinks.forEach(l => l.classList.remove(CONFIG.CSS_CLASSES.ACTIVE));
            // Add active class to clicked link
            this.classList.add(CONFIG.CSS_CLASSES.ACTIVE);
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(CONFIG.CSS_CLASSES.VISIBLE);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

// Stats Counter
function initStatsCounter() {
    if (!DOM.stats.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation can be implemented here if needed
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    DOM.stats.forEach(stat => observer.observe(stat));
}

// Form Handling
function initFormHandling() {
    if (DOM.form) {
        DOM.form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Dynamic Viewport
function initDynamicViewport() {
    function updateViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
}

// Utility function for keyboard activation
function handleKeyboardActivation(element, callback) {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            callback(element);
        }
    });
}

// Project Filtering
function initProjectFiltering() {
    if (!DOM.filterButtons.length || !DOM.projectCards.length) return;

    const filterProjects = function(button) {
        const filter = button.getAttribute('data-filter');

        // Update active button
        DOM.filterButtons.forEach(btn => btn.classList.remove(CONFIG.CSS_CLASSES.ACTIVE));
        button.classList.add(CONFIG.CSS_CLASSES.ACTIVE);

        // Filter projects using CSS classes instead of inline styles
        DOM.projectCards.forEach(card => {
            const shouldShow = filter === 'all' || card.getAttribute('data-category') === filter;

            if (shouldShow) {
                card.classList.remove(CONFIG.CSS_CLASSES.HIDDEN);
                card.classList.add(CONFIG.CSS_CLASSES.VISIBLE);
            } else {
                card.classList.add(CONFIG.CSS_CLASSES.FADE_OUT);
                setTimeout(() => {
                    card.classList.remove(CONFIG.CSS_CLASSES.FADE_OUT, CONFIG.CSS_CLASSES.VISIBLE);
                    card.classList.add(CONFIG.CSS_CLASSES.HIDDEN);
                }, CONFIG.TIMING.FADE_OUT);
            }
        });

        // Announce to screen readers
        announceFilterChange(filter);
    };

    DOM.filterButtons.forEach(button => {
        // Click event
        button.addEventListener('click', function() {
            filterProjects(this);
        });

        // Keyboard support (consolidated)
        handleKeyboardActivation(button, filterProjects);
    });
}

// Announce filter changes to screen readers
function announceFilterChange(filter) {
    const announcement = document.getElementById('filterAnnouncement');
    if (announcement) {
        const filterText = filter === 'all' ? 'all projects' : filter;
        announcement.textContent = `Showing ${filterText} projects`;
    }
}

// Project Card Animations
function initProjectCardAnimations() {
    // Only animate visible project cards, not hidden ones
    const cards = document.querySelectorAll('.project-card:not(.hidden-project)');
    cards.forEach(card => {
        card.classList.add(CONFIG.CSS_CLASSES.VISIBLE);
    });
}

// Show More Projects
function initShowMoreProjects() {
    if (!DOM.showMoreBtn || !DOM.projectCards.length) return;

    let isExpanded = false;

    DOM.showMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;

        if (isExpanded) {
            // Show ALL projects
            DOM.projectCards.forEach(project => {
                project.classList.remove('hidden-project', CONFIG.CSS_CLASSES.HIDDEN);
                project.classList.add(CONFIG.CSS_CLASSES.VISIBLE);
            });

            // Update filter buttons to show "all" as active
            DOM.filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === 'all') {
                    btn.classList.add(CONFIG.CSS_CLASSES.ACTIVE);
                } else {
                    btn.classList.remove(CONFIG.CSS_CLASSES.ACTIVE);
                }
            });
        } else {
            // Reset to default view
            DOM.projectCards.forEach(project => {
                if (project.classList.contains('hidden-project')) {
                    project.classList.add(CONFIG.CSS_CLASSES.FADE_OUT);
                    setTimeout(() => {
                        project.classList.remove(CONFIG.CSS_CLASSES.FADE_OUT, CONFIG.CSS_CLASSES.VISIBLE);
                        project.classList.add(CONFIG.CSS_CLASSES.HIDDEN);
                    }, CONFIG.TIMING.FADE_OUT);
                }
            });
        }

        // Update button text
        updateShowMoreButtonText(isExpanded);

        // Update aria-expanded
        DOM.showMoreBtn.setAttribute('aria-expanded', isExpanded);

        // Rotate chevron using CSS class instead of inline style
        const icon = DOM.showMoreBtn.querySelector('svg');
        if (icon) {
            icon.classList.toggle('rotated', isExpanded);
        }
    });
}

// Update Show More button text based on language
function updateShowMoreButtonText(isExpanded) {
    const btnText = DOM.showMoreBtn.querySelector('span');
    if (!btnText) return;

    if (window.languageManager?.translations) {
        const key = isExpanded ? 'showLessBtn' : 'showMoreBtn';
        const currentLang = window.languageManager.currentLanguage;
        const translation = window.languageManager.translations[currentLang]?.[key];
        if (translation) {
            btnText.textContent = translation;
        }
    }
}

// Hero Conversation Interface
function initHeroConversation() {
    let pendingMessage = '';

    // Function to open contact choice modal
    function openContactChoiceModal(message) {
        if (!DOM.contactChoiceModal) return;

        try {
            // Store the message
            pendingMessage = message;

            // Show message preview
            if (DOM.messagePreview && message) {
                DOM.messagePreview.textContent = `"${message}"`;
                DOM.messagePreview.classList.remove(CONFIG.CSS_CLASSES.HIDDEN);
            }

            // Show modal
            DOM.contactChoiceModal.classList.add(CONFIG.CSS_CLASSES.ACTIVE);
            document.body.style.overflow = 'hidden';

            // Track in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_choice_modal_open', {
                    event_category: 'Engagement',
                    event_label: message.substring(0, 50)
                });
            }
        } catch (error) {
            console.error('Error opening contact modal:', error);
        }
    }

    // Function to close contact choice modal
    function closeContactChoiceModal() {
        if (!DOM.contactChoiceModal) return;

        DOM.contactChoiceModal.classList.remove(CONFIG.CSS_CLASSES.ACTIVE);
        document.body.style.overflow = '';
        pendingMessage = '';
    }

    // Function to open conversation dialogue (chat)
    function openConversationDialogue(initialMessage = '') {
        if (!DOM.conversationDialogue) return;

        try {
            // Close choice modal first
            closeContactChoiceModal();

            // Create backdrop
            const backdrop = document.createElement('div');
            backdrop.className = 'dialogue-backdrop';
            backdrop.id = 'dialogueBackdrop';
            document.body.appendChild(backdrop);

            // Show dialogue
            DOM.conversationDialogue.classList.remove(CONFIG.CSS_CLASSES.HIDDEN);

            // Pre-fill chat input if there's an initial message
            if (initialMessage && DOM.chatInput) {
                DOM.chatInput.value = initialMessage;
                // Auto-submit the initial message after a short delay
                setTimeout(() => {
                    DOM.chatInput.focus();
                    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                    const chatForm = document.getElementById('chatForm');
                    if (chatForm) {
                        chatForm.dispatchEvent(submitEvent);
                    }
                }, CONFIG.TIMING.CHAT_SUBMIT);
            } else if (DOM.chatInput) {
                setTimeout(() => DOM.chatInput.focus(), CONFIG.TIMING.CHAT_FOCUS);
            }

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Error opening conversation dialogue:', error);
        }
    }

    // Handle suggestion pill clicks
    if (DOM.suggestionPills) {
        DOM.suggestionPills.forEach(pill => {
            pill.addEventListener('click', function() {
                const message = this.getAttribute('data-message');
                if (message) {
                    openContactChoiceModal(message);
                }
            });
        });
    }

    // Handle hero form submission
    if (DOM.heroForm && DOM.heroInput) {
        DOM.heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = DOM.heroInput.value.trim();

            if (message) {
                openContactChoiceModal(message);
                DOM.heroInput.value = '';
            }
        });
    }

    // Handle contact choice modal options
    if (DOM.modalClose) {
        DOM.modalClose.addEventListener('click', closeContactChoiceModal);
    }

    if (DOM.chooseWhatsApp) {
        DOM.chooseWhatsApp.addEventListener('click', function() {
            const whatsappText = encodeURIComponent(`Hi Nathalja! ${pendingMessage}`);
            const whatsappUrl = `https://wa.me/${CONFIG.CONTACT.WHATSAPP}?text=${whatsappText}`;

            window.open(whatsappUrl, '_blank');
            closeContactChoiceModal();

            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_choice_whatsapp', {
                    event_category: 'Conversion',
                    event_label: pendingMessage.substring(0, 50)
                });
            }
        });
    }

    if (DOM.chooseEmail) {
        DOM.chooseEmail.addEventListener('click', function() {
            const emailSubject = encodeURIComponent('Project aanvraag via portfolio');
            const emailBody = encodeURIComponent(`Hi Nathalja,\n\n${pendingMessage}\n\nGroet,`);
            const emailUrl = `mailto:${CONFIG.CONTACT.EMAIL}?subject=${emailSubject}&body=${emailBody}`;

            window.location.href = emailUrl;
            closeContactChoiceModal();

            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_choice_email', {
                    event_category: 'Conversion',
                    event_label: pendingMessage.substring(0, 50)
                });
            }
        });
    }

    // Close modal on backdrop click
    if (DOM.contactChoiceModal) {
        const backdrop = DOM.contactChoiceModal.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', closeContactChoiceModal);
        }
    }

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && DOM.contactChoiceModal?.classList.contains(CONFIG.CSS_CLASSES.ACTIVE)) {
            closeContactChoiceModal();
        }
    });
}
