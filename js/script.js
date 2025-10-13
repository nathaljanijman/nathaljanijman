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
    initNavigation();
    initScrollAnimations();
    initStatsCounter();
    initFormHandling();
    initSmoothScrolling();
    initDynamicViewport();
    initProjectFiltering();
    initProjectCardAnimations();
    initShowMoreProjects();
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

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

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
        });
    });
}

// Project Card Animations
function initProjectCardAnimations() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.display = 'block';
    });
}

// Show More Projects
function initShowMoreProjects() {
    const showMoreBtn = document.getElementById('showMoreProjects');
    const hiddenProjects = document.querySelectorAll('.project-card.hidden-project');

    if (showMoreBtn && hiddenProjects.length > 0) {
        let isExpanded = false;

        showMoreBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;

            hiddenProjects.forEach(project => {
                if (isExpanded) {
                    project.style.display = 'block';
                    setTimeout(() => project.classList.remove('hidden-project'), 10);
                } else {
                    project.classList.add('hidden-project');
                    setTimeout(() => project.style.display = 'none', 300);
                }
            });

            // Update button text
            const btnText = showMoreBtn.querySelector('span');
            if (window.languageManager) {
                const key = isExpanded ? 'showLessBtn' : 'showMoreBtn';
                const currentLang = window.languageManager.currentLanguage;
                btnText.textContent = window.languageManager.translations[currentLang][key];
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