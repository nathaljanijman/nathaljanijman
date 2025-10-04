// Portfolio Offering Page Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
    // Tooltip Functionality
    const infoTriggers = document.querySelectorAll('.price-info-trigger');
    let activeTooltip = null;

    infoTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const tooltipId = this.dataset.tooltip;
            const tooltip = document.getElementById(tooltipId);

            // Close previous tooltip if different
            if (activeTooltip && activeTooltip !== tooltip) {
                activeTooltip.classList.remove('active');
            }

            // Toggle current tooltip
            if (tooltip.classList.contains('active')) {
                tooltip.classList.remove('active');
                activeTooltip = null;
            } else {
                // Position tooltip
                const rect = trigger.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.bottom + 10) + 'px';

                tooltip.classList.add('active');
                activeTooltip = tooltip;
            }
        });
    });

    // Close tooltip when clicking outside
    document.addEventListener('click', function(e) {
        if (activeTooltip && !e.target.closest('.price-info-trigger') && !e.target.closest('.tooltip')) {
            activeTooltip.classList.remove('active');
            activeTooltip = null;
        }
    });

    // Package CTA Click Handlers
    const packageCTAs = document.querySelectorAll('.package-cta');

    packageCTAs.forEach(cta => {
        cta.addEventListener('click', function() {
            const packageCard = this.closest('.package-card');
            const packageType = packageCard.dataset.package;

            // Get package info
            const packageName = packageCard.querySelector('h3').textContent;
            const price = packageCard.querySelector('.price').textContent;

            // Construct WhatsApp message
            const message = `Hoi Nathalja, ik wil graag meer weten over het ${packageName} package (${price})`;
            const whatsappUrl = `https://wa.me/31657591440?text=${encodeURIComponent(message)}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    });

    // Smooth scroll for back link
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', function(e) {
            // Only prevent default if it's a hash link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Add animation on scroll for package cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe package cards and timeline milestones
    document.querySelectorAll('.package-card, .timeline-milestone').forEach(card => {
        observer.observe(card);
    });

    // Add subtle parallax effect to hero section
    const hero = document.querySelector('.offering-hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Mobile Timeline Expand functionality
    const milestones = document.querySelectorAll('.timeline-milestone');

    // Only proceed if timeline exists on page
    if (milestones.length === 0) return;

    let mobileListenersAttached = false;

    function initMobileTimeline() {
        const isMobile = window.innerWidth <= 768;

        console.log('initMobileTimeline - Width:', window.innerWidth, 'isMobile:', isMobile, 'listeners attached:', mobileListenersAttached);

        if (isMobile && !mobileListenersAttached) {
            // Attach mobile listeners
            milestones.forEach(milestone => {
                const dot = milestone.querySelector('.milestone-dot');
                if (dot) {
                    dot.addEventListener('click', handleMilestoneClick);
                    console.log('Mobile listener attached to:', milestone.querySelector('.milestone-title')?.textContent);
                }
            });

            // Close when clicking outside
            document.addEventListener('click', handleOutsideClick);
            mobileListenersAttached = true;
            console.log('Mobile mode activated');

        } else if (!isMobile && mobileListenersAttached) {
            // Remove mobile listeners and classes on desktop
            milestones.forEach(milestone => {
                const dot = milestone.querySelector('.milestone-dot');
                dot.removeEventListener('click', handleMilestoneClick);
                milestone.classList.remove('mobile-expanded');
            });

            document.removeEventListener('click', handleOutsideClick);
            mobileListenersAttached = false;
        }
    }

    function handleMilestoneClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const milestone = e.currentTarget.closest('.timeline-milestone');
        if (!milestone) {
            console.error('Milestone not found');
            return;
        }

        const isExpanded = milestone.classList.contains('mobile-expanded');

        // Close all others
        milestones.forEach(m => m.classList.remove('mobile-expanded'));

        // Toggle current
        if (!isExpanded) {
            milestone.classList.add('mobile-expanded');
            console.log('Milestone expanded:', milestone.querySelector('.milestone-title').textContent);
        } else {
            console.log('Milestone collapsed');
        }
    }

    function handleOutsideClick(e) {
        if (!e.target.closest('.timeline-milestone')) {
            milestones.forEach(m => m.classList.remove('mobile-expanded'));
        }
    }

    // Init on load
    initMobileTimeline();

    // Re-init on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initMobileTimeline();
        }, 250);
    });

});
