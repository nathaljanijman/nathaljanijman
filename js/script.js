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
    // initThemeToggle(); // Disabled - theme toggle removed
    initLanguageToggle();
    initMobileMenu();
    initMobileBottomNav();
    initConversationalChat();
    initWhatsAppContact();
    initHeroWhatsApp();
    initHeroConversation();
    initContactChoiceModal();
    initInnovativeServices();

    // Navigation functionality
    function initNavigation() {
        const header = document.querySelector('.header');
        const navLinks = document.querySelectorAll('.nav-link');

        // Progressive Header Scroll Effect
        function handleHeaderScroll() {
            const scrollY = window.scrollY;

            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Throttled scroll for performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    handleHeaderScroll();
                    scrollTimeout = null;
                }, 10);
            }
        });

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');

        function updateActiveNavLink() {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`a[href="#${sectionId}"]`);

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) {
                        navLink.classList.add('active');
                    }
                }
            });
        }

        window.addEventListener('scroll', updateActiveNavLink);
        updateActiveNavLink(); // Initialize on load
    }

    // Mobile menu functionality
    function initMobileMenu() {
        // Hamburger menu removed - using bottom navigation instead
        return;
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');

                // Skip empty hash links
                if (targetId === '#' || !targetId) return;

                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 2025 Enhanced Scroll Animations with Intersection Observer
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Special handling for stats animation
                    if (entry.target.classList.contains('about-stats')) {
                        animateStats();
                    }

                    // Trigger staggered animations for child elements
                    const staggerElements = entry.target.querySelectorAll('.stagger');
                    staggerElements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Enhanced element selection for 2025
        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-in-left, .slide-in-right, .scale-in, .about-text, .about-stats, .project-card, .contact-method, .skill-category, .projects-header'
        );

        animatedElements.forEach((element, index) => {
            // Add base animation class if not already present
            if (!element.classList.contains('fade-in') &&
                !element.classList.contains('slide-in-left') &&
                !element.classList.contains('slide-in-right') &&
                !element.classList.contains('scale-in')) {
                element.classList.add('fade-in');
            }
            observer.observe(element);
        });

        // 2025 Enhanced stagger effect for project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add(`stagger-${Math.min(index + 1, 5)}`);
        });

        // Parallax scrolling for hero elements
        initParallaxScrolling();
    }

    // 2025 Parallax Scrolling Effect
    function initParallaxScrolling() {
        const parallaxElements = document.querySelectorAll('.hero-photo, .hero-content');

        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const viewport = window.innerHeight;

            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                const yPos = -(scrolled * speed);

                if (scrolled < viewport) {
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        }, 16)); // 60fps throttling
    }

    // Stats counter animation
    function initStatsCounter() {
        let statsAnimated = false;

        window.animateStats = function() {
            if (statsAnimated) return;
            statsAnimated = true;

            // Only animate stat-numbers that have data-target attribute and NOT stat-static class
            const statNumbers = document.querySelectorAll('.stat-number[data-target]:not(.stat-static)');

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const startTime = performance.now();

                function updateNumber(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function for smoother animation
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const currentNumber = Math.floor(target * easeOut);

                    stat.textContent = currentNumber;

                    if (progress < 1) {
                        requestAnimationFrame(updateNumber);
                    } else {
                        stat.textContent = target; // Ensure final number is exact
                    }
                }

                requestAnimationFrame(updateNumber);
            });
        };
    }

    // Contact form handling
    function initFormHandling() {
        const form = document.querySelector('.contact-form');
        const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

        // Add input validation and styling
        inputs.forEach(input => {
            // Add required attribute handling
            input.addEventListener('blur', function() {
                validateInput(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateInput(this);
                }
            });
        });

        // Form submission
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                let isValid = true;
                inputs.forEach(input => {
                    if (!validateInput(input)) {
                        isValid = false;
                    }
                });

                if (isValid) {
                    // Simulate form submission
                    const submitButton = form.querySelector('button[type="submit"]');
                    const originalText = submitButton.textContent;

                    submitButton.textContent = 'Versturen...';
                    submitButton.disabled = true;

                    // Simulate API call
                    setTimeout(() => {
                        showNotification('Bericht succesvol verstuurd!', 'success');
                        form.reset();
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;

                        // Reset form state
                        inputs.forEach(input => {
                            input.classList.remove('error', 'success');
                        });
                    }, 2000);
                }
            });
        }

        function validateInput(input) {
            const value = input.value.trim();
            const isEmail = input.type === 'email';
            let isValid = true;

            // Remove previous error states
            input.classList.remove('error', 'success');

            // Check if required field is empty
            if (input.required && !value) {
                input.classList.add('error');
                isValid = false;
            }
            // Email validation
            else if (isEmail && value && !isValidEmail(value)) {
                input.classList.add('error');
                isValid = false;
            }
            // Success state
            else if (value) {
                input.classList.add('success');
            }

            return isValid;
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // Dynamic viewport handling
    function initDynamicViewport() {
        function updateViewportProperties() {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

            document.documentElement.style.setProperty('--100dvw', `${vw}px`);
            document.documentElement.style.setProperty('--100dvh', `${vh}px`);
        }

        // Update on load and resize
        updateViewportProperties();
        window.addEventListener('resize', debounce(updateViewportProperties, 250));

        // Handle orientation change on mobile
        window.addEventListener('orientationchange', () => {
            setTimeout(updateViewportProperties, 100);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#6366F1'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;

        const closeButton = notification.querySelector('.notification-close');
        closeButton.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(notification);

        // Add slide in animation
        const slideInKeyframes = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;

        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = slideInKeyframes;
            document.head.appendChild(style);
        }

        // Close functionality
        closeButton.addEventListener('click', () => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto close after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Project card interactions
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Parallax effect for hero section
    function initParallaxEffect() {
        const heroSection = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');

        if (heroSection && heroContent && heroVisual) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;

                if (scrolled < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                    heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed * 0.3}px)`;
                }
            });
        }
    }

    // Utility functions
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Theme toggle functionality
    function initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const html = document.documentElement;

        // Force dark mode as default - clear any conflicting settings
        let currentTheme = localStorage.getItem('theme');

        // If no theme is saved, or if system preference was saved, force dark
        if (!currentTheme) {
            currentTheme = 'dark';
            localStorage.setItem('theme', 'dark');
        }

        // Apply theme
        html.setAttribute('data-theme', currentTheme);

        // Update theme toggle icon
        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('svg');
            if (theme === 'dark') {
                icon.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M16.24 7.76l-1.42 1.42M8.18 16.82l-1.42-1.42M21 12h-2M5 12H3M16.24 16.24l-1.42-1.42M8.18 7.18L6.76 5.76"/>';
            } else {
                icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
            }
        }

        updateThemeIcon(currentTheme);

        // Theme toggle event listener
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme);

                // Update header background on theme change
                const header = document.querySelector('.header');
                if (window.scrollY > 50) {
                    header.style.background = newTheme === 'dark'
                        ? 'rgba(0, 0, 0, 0.98)'
                        : 'rgba(255, 255, 255, 0.98)';
                    header.style.boxShadow = newTheme === 'dark'
                        ? '0 2px 20px rgba(255, 255, 255, 0.1)'
                        : '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.background = newTheme === 'dark'
                        ? 'rgba(0, 0, 0, 1)'
                        : 'rgba(255, 255, 255, 1)';
                    header.style.boxShadow = 'none';
                }
            });
        }

        // Listen for system theme changes (only if no saved theme preference)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                // Default to dark mode even when system preference changes
                html.setAttribute('data-theme', 'dark');
                updateThemeIcon('dark');
            }
        });
    }

    // Project filtering functionality
    function initProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        if (filterButtons.length === 0 || projectCards.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filter projects with animation
                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    const shouldShow = filterValue === 'all' || category === filterValue;

                    if (shouldShow) {
                        card.style.display = 'block';
                        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                    } else {
                        card.style.animation = 'fadeOut 0.3s ease-out both';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // WhatsApp integration for direct input
    function initWhatsAppInput() {
        const whatsappForm = document.getElementById('whatsappInputForm');
        const messageInput = document.getElementById('whatsappMessageInput');

        if (whatsappForm && messageInput) {
            whatsappForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const message = messageInput.value.trim();
                if (!message) return;

                // Create WhatsApp URL with pre-filled message
                const phoneNumber = '+31657591440'; // Nathalja's WhatsApp number - update with actual number
                const encodedMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;

                // Open WhatsApp in new tab
                window.open(whatsappURL, '_blank');

                // Clear the input after sending
                messageInput.value = '';

                // Show feedback to user
                messageInput.placeholder = 'Bericht verzonden! Type een nieuw bericht...';
                setTimeout(() => {
                    messageInput.placeholder = 'Waar kan ik je mee helpen? Type hier je bericht...';
                }, 3000);
            });

            // Enable/disable send button based on input
            const sendButton = whatsappForm.querySelector('.send-btn');
            if (sendButton) {
                messageInput.addEventListener('input', function() {
                    sendButton.disabled = !this.value.trim();
                });

                // Initially disable if empty
                sendButton.disabled = !messageInput.value.trim();
            }
        }
    }

    // Initialize additional features
    initProjectCards();
    initParallaxEffect();
    initWhatsAppInput();

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Trigger initial animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-content > *');
            heroElements.forEach((element, index) => {
                element.style.animationDelay = `${index * 0.2}s`;
                element.classList.add('animate-in');
            });
        }, 100);
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Enhanced accessibility
    function initAccessibility() {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10001;
        `;

        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
            this.classList.remove('sr-only');
        });

        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
            this.classList.add('sr-only');
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Improve focus management
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    initAccessibility();

    // Performance monitoring
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log('Navigation timing:', entry.toJSON());
                }
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                }
            }
        });

        observer.observe({entryTypes: ['navigation', 'largest-contentful-paint']});
    }

    // 2025 Conversational Chat Interface
    function initConversationalChat() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const chatMessages = document.getElementById('chatMessages');
        const quickBtns = document.querySelectorAll('.quick-btn');

        if (!chatInput || !sendBtn || !chatMessages) return;

        // Quick response templates
        const responses = {
            project: {
                user: "Ik ben geïnteresseerd in project samenwerking",
                bot: "Wat leuk! 🚀 Ik werk graag samen aan innovatieve projecten. Vertel me meer over je project - welke uitdagingen wil je oplossen?"
            },
            job: {
                user: "Ik heb een job opportunity",
                bot: "Interessant! 💼 Ik sta altijd open voor nieuwe kansen. Kun je me meer vertellen over de rol en het bedrijf?"
            },
            general: {
                user: "Ik heb een algemene vraag",
                bot: "Natuurlijk! 💬 Stel gerust je vraag. Ik help je graag verder!"
            }
        };

        // Smart bot responses
        const smartResponses = [
            "Dank je voor je bericht! Ik neem zo snel mogelijk contact met je op. 📧",
            "Super! Laten we binnenkort een keer bellen om dit verder te bespreken. ☎️",
            "Klinkt als een interessant gesprek! Ik stuur je een email met mijn beschikbaarheid. 📅",
            "Bedankt voor je interesse! Ik ga hier zeker op reageren. ✨"
        ];

        // Send message function
        function sendMessage(messageText, isUser = true) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

            const now = new Date();
            const time = now.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });

            messageDiv.innerHTML = `
                <div class="message-content">${messageText}</div>
                <div class="message-time">${time}</div>
            `;

            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simulate typing and response for user messages
            if (isUser) {
                setTimeout(() => {
                    const randomResponse = smartResponses[Math.floor(Math.random() * smartResponses.length)];
                    sendMessage(randomResponse, false);
                }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
            }
        }

        // Quick response buttons
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const responseType = btn.dataset.response;
                const response = responses[responseType];

                if (response) {
                    sendMessage(response.user, true);
                    setTimeout(() => {
                        sendMessage(response.bot, false);
                    }, 800);
                }

                // Hide quick responses after first use
                document.querySelector('.quick-responses').style.display = 'none';
            });
        });

        // Send button click
        sendBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                sendMessage(message, true);
                chatInput.value = '';

                // Hide quick responses
                document.querySelector('.quick-responses').style.display = 'none';
            }
        });

        // Enter key to send
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendBtn.click();
            }
        });

        // Auto-focus input
        chatInput.addEventListener('focus', () => {
            // Hide quick responses when typing
            setTimeout(() => {
                if (chatInput.value.length > 0) {
                    document.querySelector('.quick-responses').style.display = 'none';
                }
            }, 100);
        });
    }

    // 2025 WhatsApp Direct Contact
    function initWhatsAppContact() {
        const whatsappInput = document.getElementById('whatsappInput');
        const whatsappSend = document.getElementById('whatsappSend');
        const charCount = document.getElementById('charCount');
        const quickContactBtns = document.querySelectorAll('.quick-contact-btn');

        // Your WhatsApp number (replace with actual number)
        const whatsappNumber = '31657591440'; // Replace with your actual WhatsApp number

        if (!whatsappInput || !whatsappSend) return;

        // Character counter
        whatsappInput.addEventListener('input', () => {
            const count = whatsappInput.value.length;
            charCount.textContent = count;

            // Color coding
            if (count > 150) {
                charCount.style.color = '#ff6b6b';
            } else if (count > 100) {
                charCount.style.color = '#feca57';
            } else {
                charCount.style.color = 'var(--text-light)';
            }
        });

        // Send WhatsApp message
        function sendWhatsAppMessage(message) {
            if (!message.trim()) return;

            // Format the message
            const formattedMessage = `Hoi Nathalja! 👋

Ik kwam via je portfolio en wilde contact opnemen:

"${message}"

Groeten!`;

            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            // Clear input and show confirmation
            whatsappInput.value = '';
            charCount.textContent = '0';

            // Temporary success feedback
            const originalText = whatsappSend.innerHTML;
            whatsappSend.innerHTML = '✓ Verzonden!';
            whatsappSend.style.background = '#25D366';

            setTimeout(() => {
                whatsappSend.innerHTML = originalText;
                whatsappSend.style.background = '';
            }, 2000);
        }

        // Send button click
        whatsappSend.addEventListener('click', () => {
            sendWhatsAppMessage(whatsappInput.value);
        });

        // Enter key to send
        whatsappInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendWhatsAppMessage(whatsappInput.value);
            }
        });

        // Quick contact buttons
        quickContactBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.dataset.message;
                whatsappInput.value = message;
                charCount.textContent = message.length;

                // Auto-send after a moment
                setTimeout(() => {
                    sendWhatsAppMessage(message);
                }, 500);
            });
        });

        // Auto-focus on scroll into view
        const observerOptions = {
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        whatsappInput.focus();
                    }, 500);
                }
            });
        }, observerOptions);

        const whatsappContainer = document.querySelector('.whatsapp-container');
        if (whatsappContainer) {
            observer.observe(whatsappContainer);
        }
    }

    // 2025 Hero WhatsApp Contact System
    function initHeroWhatsApp() {
        const heroInput = document.getElementById('heroWhatsappInput');
        const heroSend = document.getElementById('heroWhatsappSend');

        const whatsappNumber = '31657591440'; // Replace with your actual number

        if (!heroInput || !heroSend) return;

        // Toggle expanded view
        whatsappBubble.addEventListener('click', () => {
            whatsappExpanded.style.display = 'block';
            setTimeout(() => floatInput.focus(), 300);
        });

        closeExpanded.addEventListener('click', (e) => {
            e.stopPropagation();
            whatsappExpanded.style.display = 'none';
        });

        // Send WhatsApp message
        function sendFloatMessage(message) {
            if (!message.trim()) return;

            const formattedMessage = `Hoi Nathalja! 👋

Via je portfolio: ${message}

Groeten!`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
            window.open(whatsappUrl, '_blank');

            // Close expanded view
            whatsappExpanded.style.display = 'none';
            floatInput.value = '';

            // Success animation
            whatsappBubble.style.transform = 'scale(1.2)';
            whatsappBubble.style.background = '#25D366';
            setTimeout(() => {
                whatsappBubble.style.transform = '';
                whatsappBubble.style.background = '';
            }, 500);
        }

        // Quick option buttons
        quickOptions.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.dataset.msg;
                sendFloatMessage(message);
            });
        });

        // Send button
        floatSend.addEventListener('click', () => {
            sendFloatMessage(floatInput.value);
        });

        // Enter key
        floatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendFloatMessage(floatInput.value);
            }
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!document.getElementById('whatsappFloat').contains(e.target)) {
                whatsappExpanded.style.display = 'none';
            }
        });

        // Show bubble after page load with entrance animation
        setTimeout(() => {
            const whatsappFloat = document.querySelector('.whatsapp-float');
            whatsappFloat.style.opacity = '0';
            whatsappFloat.style.transform = 'translateY(100px)';
            whatsappFloat.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

            setTimeout(() => {
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.transform = 'translateY(0)';
            }, 100);
        }, 2000); // Show after 2 seconds
    }

    // Language Toggle functionality - Uses LanguageManager from translations.js
    function initLanguageToggle() {
        const languageToggle = document.getElementById('languageToggle');
        const languageDropdown = document.getElementById('languageDropdown');
        const langOptions = document.querySelectorAll('.lang-option');
        const footerLangBtns = document.querySelectorAll('.footer-lang-btn');

        if (!languageToggle || !languageDropdown) return;

        // Toggle dropdown visibility (desktop header)
        languageToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('show');
        });

        // Footer language buttons
        footerLangBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedLang = btn.dataset.lang;

                if (window.languageManager) {
                    window.languageManager.setLanguage(selectedLang);

                    // Update active state
                    footerLangBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
            });
        });

        // Language option selection
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = option.dataset.lang;

                // Use LanguageManager to change language
                if (window.languageManager) {
                    window.languageManager.setLanguage(selectedLang);

                    // Update footer language buttons
                    footerLangBtns.forEach(btn => {
                        btn.classList.remove('active');
                        if (btn.dataset.lang === selectedLang) {
                            btn.classList.add('active');
                        }
                    });

                    // Add feedback animation
                    languageToggle.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        languageToggle.style.transform = '';
                    }, 150);
                }

                languageDropdown.classList.remove('show');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            languageDropdown.classList.remove('show');
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                languageDropdown.classList.remove('show');
            }
        });
    }

    // Enhanced Mobile Menu functionality
    // Hamburger menu removed - using bottom navigation instead

    // Hero Conversation Functionality
    function initHeroConversation() {
        const heroForm = document.getElementById('heroConversationForm');
        const heroInput = document.getElementById('heroInput');
        const sendButton = heroForm?.querySelector('.send-button');


        if (!heroForm || !heroInput) return;

        // Handle form submission
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const message = heroInput.value.trim();
            if (!message) return false;

            // Store the message for later use
            window.userMessage = message;

            // Update the modal with user's message
            const userMessagePreview = document.querySelector('.user-message-preview');
            if (userMessagePreview) {
                userMessagePreview.textContent = `"${message}"`;
            }

            // Show contact choice modal
            const contactModal = document.getElementById('contactChoiceModal');
            if (contactModal) {
                contactModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            // Clear hero input
            heroInput.value = '';
            sendButton.disabled = true;
            sendButton.style.opacity = '0.5';

            return false;
        });

        // Enable/disable send button based on input
        heroInput.addEventListener('input', () => {
            const hasText = heroInput.value.trim().length > 0;
            sendButton.disabled = !hasText;
            sendButton.style.opacity = hasText ? '1' : '0.5';
        });

        // Enter key handling
        heroInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (heroInput.value.trim()) {
                    heroForm.dispatchEvent(new Event('submit'));
                }
            }
        });

        // Initialize button state
        sendButton.disabled = true;
        sendButton.style.opacity = '0.5';

        // Handle suggestion pill clicks
        const suggestionPills = document.querySelectorAll('.suggestion-pill');
        suggestionPills.forEach(pill => {
            pill.addEventListener('click', () => {
                const message = pill.getAttribute('data-message');
                if (message) {
                    heroInput.value = message;

                    // Trigger form submission
                    setTimeout(() => {
                        heroForm.dispatchEvent(new Event('submit'));
                    }, 100);
                }
            });
        });
    }

    // Contact Choice Modal functionality
    function initContactChoiceModal() {
        const modal = document.getElementById('contactChoiceModal');
        const closeButton = document.querySelector('.modal-close');
        const backdrop = document.querySelector('.modal-backdrop');

        // Contact options
        const whatsappOption = document.querySelector('.whatsapp-option');
        const emailOption = document.querySelector('.email-option');
        const chatOption = document.querySelector('.chat-option');

        if (!modal) return;

        // Close modal function
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close button
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }

        // Click backdrop to close
        if (backdrop) {
            backdrop.addEventListener('click', closeModal);
        }

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // WhatsApp option
        if (whatsappOption) {
            whatsappOption.addEventListener('click', () => {
                const message = window.userMessage || 'Hoi Nathalja!';
                const formattedMessage = `Hoi Nathalja! 👋

Via je portfolio: ${message}

Groeten!`;
                const whatsappNumber = '31657591440';
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
                window.open(whatsappUrl, '_blank');
                closeModal();
            });
        }

        // Email option
        if (emailOption) {
            emailOption.addEventListener('click', () => {
                const message = window.userMessage || 'Hoi Nathalja!';
                const subject = 'Contact via Portfolio';
                const body = `Hoi Nathalja,

Via je portfolio: ${message}

Groeten!`;
                const emailUrl = `mailto:nathalja.nijman@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = emailUrl;
                closeModal();
            });
        }

        // Chat option - open conversation dialogue
        if (chatOption) {
            chatOption.addEventListener('click', () => {
                const message = window.userMessage || '';

                // Show conversation dialogue
                const conversationDialogue = document.getElementById('conversationDialogue');
                const chatInput = document.getElementById('chatInput');

                if (conversationDialogue && chatInput) {
                    // Close the modal first
                    closeModal();

                    // Open the conversation dialogue
                    conversationDialogue.style.display = 'block';

                    // Pre-fill the chat input with the hero message
                    chatInput.value = message;

                    // Focus the chat input
                    setTimeout(() => {
                        chatInput.focus();
                        chatInput.setSelectionRange(chatInput.value.length, chatInput.value.length);
                    }, 300);
                }
            });
        }
    }

    // Innovative Services functionality
    function initInnovativeServices() {
        // Impact Theater scenario switching
        const scenarioBtns = document.querySelectorAll('.scenario-btn');
        const scenarios = document.querySelectorAll('.scenario');

        scenarioBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and scenarios
                scenarioBtns.forEach(b => b.classList.remove('active'));
                scenarios.forEach(s => s.classList.remove('active'));

                // Add active class to clicked button and corresponding scenario
                btn.classList.add('active');
                const targetScenario = document.querySelector(`[data-scenario="${index}"]`);
                if (targetScenario) {
                    targetScenario.classList.add('active');
                }
            });
        });

        // Persona card interactions
        const personaCards = document.querySelectorAll('.persona-card');

        personaCards.forEach(card => {
            card.addEventListener('click', () => {
                const persona = card.dataset.persona;

                // Add a subtle feedback animation
                card.style.transform = 'translateY(-8px) scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);

                // You could trigger contact modal or other actions here
                console.log(`Persona selected: ${persona}`);
            });

            // Add keyboard accessibility
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });

            // Make cards focusable
            card.setAttribute('tabindex', '0');
        });

        // Add smooth scroll to sections when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe persona cards and scenarios for scroll animations
        [...personaCards, ...scenarios].forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Project Card Staggered Animations (Option B)
    function initProjectCardAnimations() {
        const projectCards = document.querySelectorAll('.project-card');

        if (projectCards.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -80px 0px'
        });

        projectCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Show More Projects functionality
    function initShowMoreProjects() {
        const showMoreBtn = document.getElementById('showMoreProjects');
        const hiddenProjects = document.querySelectorAll('.project-card.hidden-project');

        if (!showMoreBtn || hiddenProjects.length === 0) return;

        let isExpanded = false;

        showMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;

            if (isExpanded) {
                // Show hidden projects
                hiddenProjects.forEach(project => {
                    project.classList.add('revealed');
                });

                // Update button text and ARIA
                const btnText = showMoreBtn.querySelector('span');
                const currentLang = window.languageManager?.getCurrentLanguage() || 'nl';
                btnText.textContent = currentLang === 'nl' ? 'Toon minder' : 'Show less';
                showMoreBtn.setAttribute('aria-expanded', 'true');
                showMoreBtn.classList.add('expanded');
            } else {
                // Hide projects again
                hiddenProjects.forEach(project => {
                    project.classList.remove('revealed');
                });

                // Update button text and ARIA
                const btnText = showMoreBtn.querySelector('span');
                const currentLang = window.languageManager?.getCurrentLanguage() || 'nl';
                btnText.textContent = currentLang === 'nl' ? 'Toon meer projecten' : 'Show more projects';
                showMoreBtn.setAttribute('aria-expanded', 'false');
                showMoreBtn.classList.remove('expanded');

                // Scroll to projects section smoothly
                const projectsSection = document.querySelector('#projects');
                if (projectsSection) {
                    const offset = 100;
                    const elementPosition = projectsSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Mobile Bottom Navigation - Active state management
    function initMobileBottomNav() {
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

        if (mobileNavItems.length === 0) return;

        // Sections to track
        const sections = [
            { id: 'home', element: document.querySelector('#home') },
            { id: 'projects', element: document.querySelector('#projects') },
            { id: 'about', element: document.querySelector('#about') },
            { id: 'contact', element: document.querySelector('#contact') }
        ].filter(section => section.element !== null);

        function updateActiveNavItem() {
            const scrollPosition = window.scrollY + 100; // Offset for better UX

            let currentSection = 'home'; // Default

            sections.forEach(section => {
                const sectionTop = section.element.offsetTop;
                const sectionHeight = section.element.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.id;
                }
            });

            // Update active state
            mobileNavItems.forEach(item => {
                const itemSection = item.getAttribute('data-section');
                if (itemSection === currentSection) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        // Throttled scroll listener for performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    updateActiveNavItem();
                    scrollTimeout = null;
                }, 50);
            }
        });

        // Initial update
        updateActiveNavItem();
    }

    console.log('🎉 Portfolio initialized successfully!');

});