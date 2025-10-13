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