// Portfolio JavaScript - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {

    // Remove header completely on mobile
    if (window.innerWidth <= 1024) {
        const header = document.querySelector('.header');
        if (header) {
            header.remove();
        }
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
    }, 150);
});

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-item');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

// Stats Counter
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                // Simple animation placeholder
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// Form Handling
function initFormHandling() {
    const form = document.querySelector('.hero-input-form');
    if (form) {
        form.addEventListener('submit', function(e) {
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
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
}

// Project Filtering
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    const filterProjects = function(button) {
        const filter = button.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    };

    filterButtons.forEach(button => {
        // Click event
        button.addEventListener('click', function() {
            filterProjects(this);
        });

        // Keyboard support (Enter and Space)
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                filterProjects(this);
            }
        });

        // Additional keyboard support for browsers that don't fire keydown on buttons
        button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                filterProjects(this);
            }
        });
    });
}

// Project Card Animations
function initProjectCardAnimations() {
    // Only animate visible project cards, not hidden ones
    const cards = document.querySelectorAll('.project-card:not(.hidden-project)');
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.display = 'block';
    });
}

// Show More Projects
function initShowMoreProjects() {
    const showMoreBtn = document.getElementById('showMoreProjects');
    const allProjects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (showMoreBtn && allProjects.length > 0) {
        let isExpanded = false;

        showMoreBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;

            if (isExpanded) {
                // Show ALL projects (same behavior as "Alle projecten" filter)
                allProjects.forEach(project => {
                    project.classList.remove('hidden-project');
                    project.style.display = 'block';
                    project.style.opacity = '1';
                });

                // Update filter buttons to show "all" as active
                filterButtons.forEach(btn => {
                    if (btn.getAttribute('data-filter') === 'all') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            } else {
                // Reset to default view (hide hidden-project cards again)
                allProjects.forEach(project => {
                    if (project.classList.contains('hidden-project')) {
                        project.style.opacity = '0';
                        setTimeout(() => project.style.display = 'none', 300);
                    }
                });
            }

            // Update button text
            const btnText = showMoreBtn.querySelector('span');
            if (window.languageManager && window.languageManager.translations) {
                const key = isExpanded ? 'showLessBtn' : 'showMoreBtn';
                const currentLang = window.languageManager.currentLanguage;
                const translationsObj = window.languageManager.translations;
                if (translationsObj && translationsObj[currentLang] && translationsObj[currentLang][key]) {
                    btnText.textContent = translationsObj[currentLang][key];
                }
            }

            // Update aria-expanded
            showMoreBtn.setAttribute('aria-expanded', isExpanded);

            // Rotate chevron
            const icon = showMoreBtn.querySelector('svg');
            if (icon) {
                icon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    }
}

// Hero Conversation Interface
function initHeroConversation() {
    const heroForm = document.getElementById('heroConversationForm');
    const heroInput = document.getElementById('heroInput');
    const suggestionPills = document.querySelectorAll('.suggestion-pill');
    const contactChoiceModal = document.getElementById('contactChoiceModal');
    const conversationDialogue = document.getElementById('conversationDialogue');
    const chatInput = document.getElementById('chatInput');
    const messagePreview = document.querySelector('.user-message-preview');

    let pendingMessage = '';

    // Function to open contact choice modal
    function openContactChoiceModal(message) {
        if (!contactChoiceModal) return;

        // Store the message
        pendingMessage = message;

        // Show message preview
        if (messagePreview && message) {
            messagePreview.textContent = `"${message}"`;
            messagePreview.style.display = 'block';
        }

        // Show modal
        contactChoiceModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Track in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_choice_modal_open', {
                event_category: 'Engagement',
                event_label: message.substring(0, 50)
            });
        }
    }

    // Function to close contact choice modal
    function closeContactChoiceModal() {
        if (!contactChoiceModal) return;
        contactChoiceModal.classList.remove('active');
        document.body.style.overflow = '';
        pendingMessage = '';
    }

    // Function to open conversation dialogue (chat)
    function openConversationDialogue(initialMessage = '') {
        if (!conversationDialogue) return;

        // Close choice modal first
        closeContactChoiceModal();

        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'dialogue-backdrop';
        backdrop.id = 'dialogueBackdrop';
        document.body.appendChild(backdrop);

        // Show dialogue
        conversationDialogue.style.display = 'block';

        // Pre-fill chat input if there's an initial message
        if (initialMessage && chatInput) {
            chatInput.value = initialMessage;
            // Auto-submit the initial message after a short delay
            setTimeout(() => {
                chatInput.focus();
                const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                const chatForm = document.getElementById('chatForm');
                if (chatForm) {
                    chatForm.dispatchEvent(submitEvent);
                }
            }, 300);
        } else if (chatInput) {
            setTimeout(() => chatInput.focus(), 100);
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    // Handle suggestion pill clicks
    suggestionPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            if (message) {
                openContactChoiceModal(message);
            }
        });
    });

    // Handle hero form submission
    if (heroForm && heroInput) {
        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = heroInput.value.trim();

            if (message) {
                openContactChoiceModal(message);
                heroInput.value = '';
            }
        });
    }

    // Handle contact choice modal options
    const modalClose = document.getElementById('modalClose');
    const chooseWhatsApp = document.getElementById('chooseWhatsApp');
    const chooseEmail = document.getElementById('chooseEmail');

    if (modalClose) {
        modalClose.addEventListener('click', closeContactChoiceModal);
    }

    if (chooseWhatsApp) {
        chooseWhatsApp.addEventListener('click', function() {
            const whatsappNumber = '31657591440';
            const whatsappText = encodeURIComponent(`Hi Nathalja! ${pendingMessage}`);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

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

    if (chooseEmail) {
        chooseEmail.addEventListener('click', function() {
            const emailSubject = encodeURIComponent('Project aanvraag via portfolio');
            const emailBody = encodeURIComponent(`Hi Nathalja,\n\n${pendingMessage}\n\nGroet,`);
            const emailUrl = `mailto:nathaljanijman@hotmail.com?subject=${emailSubject}&body=${emailBody}`;

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
    if (contactChoiceModal) {
        contactChoiceModal.querySelector('.modal-backdrop')?.addEventListener('click', closeContactChoiceModal);
    }

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactChoiceModal?.classList.contains('active')) {
            closeContactChoiceModal();
        }
    });
}