// ===== PROCESS PREVIEW INTERACTIONS =====

document.addEventListener('DOMContentLoaded', function() {
    initAccordion();
    initProgressBar();
    initMobileTimeline();
});

// ===== ACCORDION FUNCTIONALITY =====
function initAccordion() {
    const accordionSteps = document.querySelectorAll('.accordion-step');

    accordionSteps.forEach(step => {
        const header = step.querySelector('.accordion-header');
        const toggle = step.querySelector('.accordion-toggle');

        header.addEventListener('click', () => {
            // Toggle current step
            const isActive = step.classList.contains('active');

            // Close all other steps
            accordionSteps.forEach(s => s.classList.remove('active'));

            // Toggle current step
            if (!isActive) {
                step.classList.add('active');
            }
        });
    });
}

// ===== PROGRESS BAR SCROLL ANIMATION =====
function initProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressSection = document.querySelector('.progress-timeline');

    if (!progressFill || !progressSection) return;

    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar();
                animateSteps();
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(progressSection);

    function animateProgressBar() {
        // Animate from 0% to 100% over 2 seconds
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            progressFill.style.width = progress + '%';

            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 20);
    }

    function animateSteps() {
        progressSteps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('active');
            }, 300 * index);
        });
    }
}

// ===== MOBILE TIMELINE EXPAND =====
function initMobileTimeline() {
    const milestones = document.querySelectorAll('.timeline-milestone');

    // Only enable on mobile
    if (window.innerWidth <= 768) {
        milestones.forEach(milestone => {
            const dot = milestone.querySelector('.milestone-dot');

            dot.addEventListener('click', (e) => {
                e.stopPropagation();

                // Toggle current milestone
                const isExpanded = milestone.classList.contains('mobile-expanded');

                // Close all others
                milestones.forEach(m => m.classList.remove('mobile-expanded'));

                // Toggle current
                if (!isExpanded) {
                    milestone.classList.add('mobile-expanded');
                }
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.timeline-milestone')) {
                milestones.forEach(m => m.classList.remove('mobile-expanded'));
            }
        });
    }
}

// Re-init mobile timeline on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initMobileTimeline();
    }, 250);
});
