// 2025 Conversational Dialogue System - Optimized
function initConversationalDialogue() {
    // Configuration constants
    const CHAT_CONFIG = {
        TIMING: {
            FOCUS_DELAY: 100,
            TYPING_MIN: 1500,
            TYPING_MAX: 2500
        },
        CSS_CLASSES: {
            HIDDEN: 'hidden',
            VISIBLE: 'visible',
            ACTIVE: 'active'
        }
    };

    // Cache DOM elements
    const DOM = {
        conversationTrigger: document.getElementById('conversationTrigger'),
        conversationDialogue: document.getElementById('conversationDialogue'),
        closeDialogue: document.getElementById('closeDialogue'),
        mainScreen: document.getElementById('mainScreen'),
        chatConversation: document.getElementById('chatConversation'),
        chatForm: document.getElementById('chatForm'),
        chatInput: document.getElementById('chatInput'),
        sendButton: document.getElementById('sendButton'),
        typingIndicator: document.getElementById('typingIndicator'),
        quickSuggestions: document.getElementById('quickSuggestions')
    };

    let conversationState = 'initial';
    let userMessages = [];
    let awaitingResponse = false;

    // Show dialogue
    function showDialogue() {
        try {
            // Create backdrop
            const backdrop = document.createElement('div');
            backdrop.className = 'dialogue-backdrop';
            backdrop.id = 'dialogueBackdrop';
            document.body.appendChild(backdrop);

            // Show dialogue using CSS class
            if (DOM.conversationDialogue) {
                DOM.conversationDialogue.classList.remove(CHAT_CONFIG.CSS_CLASSES.HIDDEN);
                DOM.conversationDialogue.classList.add(CHAT_CONFIG.CSS_CLASSES.VISIBLE);
            }

            setTimeout(() => DOM.chatInput?.focus(), CHAT_CONFIG.TIMING.FOCUS_DELAY);

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } catch (error) {
            // console.error('Error showing dialogue:', error);
        }
    }

    // Hide dialogue
    function hideDialogue() {
        try {
            // Hide dialogue using CSS class
            if (DOM.conversationDialogue) {
                DOM.conversationDialogue.classList.add(CHAT_CONFIG.CSS_CLASSES.HIDDEN);
                DOM.conversationDialogue.classList.remove(CHAT_CONFIG.CSS_CLASSES.VISIBLE);
            }

            // Remove backdrop
            const backdrop = document.getElementById('dialogueBackdrop');
            if (backdrop) {
                backdrop.remove();
            }

            // Restore body scroll
            document.body.style.overflow = '';

            resetConversation();
        } catch (error) {
            // console.error('Error hiding dialogue:', error);
        }
    }

    // Reset conversation to initial state
    function resetConversation() {
        conversationState = 'initial';
        userMessages = [];
        awaitingResponse = false;

        // Clear chat except first message
        if (DOM.chatConversation) {
            const messages = DOM.chatConversation.querySelectorAll('.chat-message');
            for (let i = 1; i < messages.length; i++) {
                messages[i].remove();
            }
        }

        // Show suggestions again using CSS class
        if (DOM.quickSuggestions) {
            DOM.quickSuggestions.classList.remove(CHAT_CONFIG.CSS_CLASSES.HIDDEN);
        }

        // Clear input
        if (DOM.chatInput) {
            DOM.chatInput.value = '';
        }
    }

    // Add message to conversation (XSS-safe)
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'nathalja-message'}`;

        // Create avatar container
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        const avatarImg = document.createElement('img');
        avatarImg.src = 'images/nathalja-about.jpg';
        avatarImg.alt = isUser ? 'User' : 'Nathalja';
        avatarDiv.appendChild(avatarImg);

        // Create message content (safe - uses textContent)
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        const paragraph = document.createElement('p');
        paragraph.textContent = content; // XSS-safe: textContent escapes HTML
        contentDiv.appendChild(paragraph);

        // Assemble message
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        chatConversation.appendChild(messageDiv);
        chatConversation.scrollTop = chatConversation.scrollHeight;

        return messageDiv;
    }

    // Show typing indicator
    function showTypingIndicator() {
        if (DOM.typingIndicator) {
            DOM.typingIndicator.classList.remove(CHAT_CONFIG.CSS_CLASSES.HIDDEN);
            DOM.typingIndicator.classList.add(CHAT_CONFIG.CSS_CLASSES.VISIBLE);
            if (DOM.chatConversation) {
                DOM.chatConversation.scrollTop = DOM.chatConversation.scrollHeight;
            }
        }
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        if (DOM.typingIndicator) {
            DOM.typingIndicator.classList.add(CHAT_CONFIG.CSS_CLASSES.HIDDEN);
            DOM.typingIndicator.classList.remove(CHAT_CONFIG.CSS_CLASSES.VISIBLE);
        }
    }

    // Generate response based on user message
    function generateResponse(userMessage) {
        const message = userMessage.toLowerCase();

        // Contact related
        if (message.includes('contact') || message.includes('bereiken') || message.includes('email') || message.includes('telefoon')) {
            return `Leuk dat je contact wilt! Je kunt me bereiken via:

Email: nathaljanijman@hotmail.com
LinkedIn: linkedin.com/in/nathalja-nijman-86410389
Voor urgente zaken kun je ook WhatsApp gebruiken

Wat voor project heb je in gedachten?`;
        }

        // About/personal info
        if (message.includes('over je') || message.includes('wie ben') || message.includes('vertel') || message.includes('achtergrond')) {
            return `Ik ben Nathalja, Product Owner bij ABN AMRO.

Ik help teams en bedrijven met:
• Product Strategy & Roadmapping
• User Experience Design
• Agile Product Development
• Stakeholder Management

Met 3+ jaar ervaring zorg ik ervoor dat producten écht waarde toevoegen voor gebruikers. Waar kan ik jou mee helpen?`;
        }

        // Project related
        if (message.includes('project') || message.includes('samenwerk') || message.includes('idee') || message.includes('hulp nodig')) {
            return `Geweldig! Ik hoor graag over je project.

Om je goed te kunnen helpen, zou ik graag wat meer details willen weten:
• Wat voor soort project is het?
• In welke fase zit je nu?
• Waar loop je tegenaan?

Deel gerust wat je op je hart hebt, dan kan ik je de beste advice geven!`;
        }

        // Rates/pricing
        if (message.includes('tarief') || message.includes('kosten') || message.includes('prijs') || message.includes('budget')) {
            return `Mijn tarieven zijn afhankelijk van het type project:

Consultancy & Strategy: €95 - €125 per uur
UX Design Projects: Vanaf €2.500 per project
Workshops & Training: €750 - €1.250 per dag

Voor langere samenwerkingen bespreek ik graag aangepaste tarieven. Vertel me meer over je situatie, dan kunnen we kijken wat het beste past!`;
        }

        // Expertise/services
        if (message.includes('wat doe') || message.includes('expertise') || message.includes('services') || message.includes('specialisatie')) {
            return `Ik focus me op verschillende aspecten van productbeheer:

Product Strategy - Van visie tot roadmap
User Experience - Onderzoek en design voor betere producten
Agile Development - Scrum en Kanban voor efficiënte teams
Stakeholder Management - Afstemming tussen business, tech en design

Welk gebied interesseert je het meest?`;
        }

        // Availability
        if (message.includes('beschikbaar') || message.includes('tijd') || message.includes('planning')) {
            return `Ik ben momenteel beschikbaar voor nieuwe projecten.

Mijn responstijd is meestal binnen 24 uur. Voor grotere projecten plan ik graag een kennismakingsgesprek in.

Wanneer zou jij willen starten en wat is je timeline?`;
        }

        // Default response for other messages
        return `Bedankt voor je bericht! ${userMessage.includes('?') ? 'Interessante vraag!' : ''}

Ik help graag met:
• Product strategy en roadmapping
• UX design en gebruikersonderzoek
• Project consultancy
• Team workshops

Kun je me wat meer vertellen over je specifieke situatie? Dan kan ik je beter helpen!`;
    }

    // Handle chat submission
    function handleChatSubmission(e) {
        e.preventDefault();

        if (awaitingResponse) return;

        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        userMessages.push(message);

        // Clear input and hide suggestions
        DOM.chatInput.value = '';
        if (DOM.quickSuggestions) {
            DOM.quickSuggestions.classList.add(CHAT_CONFIG.CSS_CLASSES.HIDDEN);
        }

        // Show typing indicator
        awaitingResponse = true;
        showTypingIndicator();

        // Simulate typing delay with random time between min and max
        const typingDelay = CHAT_CONFIG.TIMING.TYPING_MIN +
            Math.random() * (CHAT_CONFIG.TIMING.TYPING_MAX - CHAT_CONFIG.TIMING.TYPING_MIN);

        setTimeout(() => {
            hideTypingIndicator();
            const response = generateResponse(message);
            addMessage(response);
            awaitingResponse = false;
        }, typingDelay)
    }

    // Handle suggestion chip clicks
    function handleSuggestionClick(e) {
        const message = e.target.getAttribute('data-message');
        if (message && DOM.chatInput) {
            DOM.chatInput.value = message;
            handleChatSubmission(e);
        }
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Handle project form submission
    function handleProjectSubmission(e) {
        e.preventDefault();

        const name = document.getElementById('projectName').value.trim();
        const email = document.getElementById('projectEmail').value.trim();
        const type = document.getElementById('projectType').value;
        const description = document.getElementById('projectDescription').value.trim();

        if (!name || !email || !type) {
            alert('Vul alle verplichte velden in.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Vul een geldig emailadres in.');
            return;
        }

        // Store form data
        formData = {
            name,
            email,
            type,
            description,
            timestamp: new Date().toISOString()
        };

        // Send to backend
        sendProjectData(formData);

        // Show success message
        alert('Bedankt! Ik neem binnen 24 uur contact met je op.');
        hideDialogue();
    }

    // Send project data to backend (placeholder)
    function sendProjectData(data) {
        // Integration with backend service would go here
    }

    // Event listeners
    if (conversationTrigger) {
        conversationTrigger.addEventListener('click', showDialogue);
    }

    if (closeDialogue) {
        closeDialogue.addEventListener('click', hideDialogue);
    }

    // Chat form submission
    if (chatForm) {
        chatForm.addEventListener('submit', handleChatSubmission);
    }

    // Suggestion chip listeners
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', handleSuggestionClick);
    });

    // Input field listeners
    if (chatInput) {
        // Auto-resize input (if needed)
        chatInput.addEventListener('input', () => {
            // Enable/disable send button based on input
            if (sendButton) {
                sendButton.disabled = awaitingResponse || !chatInput.value.trim();
            }
        });

        // Enter key handling
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!awaitingResponse && chatInput.value.trim()) {
                    handleChatSubmission(e);
                }
            }
        });
    }

    // Send button
    if (sendButton) {
        sendButton.addEventListener('click', handleChatSubmission);
    }

    // Close on backdrop click
    document.addEventListener('click', (e) => {
        const backdrop = document.getElementById('dialogueBackdrop');
        if (backdrop && e.target === backdrop) {
            hideDialogue();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && conversationDialogue && conversationDialogue.style.display === 'block') {
            hideDialogue();
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initConversationalDialogue();
});
// Dialogue Screen Navigation - Event Delegation (No inline handlers)
document.addEventListener("click", function(event) {
    const action = event.target.closest("[data-action]")?.dataset.action;
    
    if (!action) return;
    
    switch(action) {
        case "show-main-screen":
            showMainScreen();
            break;
        case "show-contact-screen":
            showContactScreen();
            break;
        case "show-project-screen":
            showProjectScreen();
            break;
    }
});

function showMainScreen() {
    document.querySelectorAll(".dialogue-screen").forEach(screen => {
        screen.style.display = "none";
    });
    document.getElementById("mainScreen")?.style.removeProperty("display");
}

function showContactScreen() {
    document.querySelectorAll(".dialogue-screen").forEach(screen => {
        screen.style.display = "none";
    });
    document.getElementById("contactScreen")?.style.removeProperty("display");
}

function showProjectScreen() {
    document.querySelectorAll(".dialogue-screen").forEach(screen => {
        screen.style.display = "none";
    });
    document.getElementById("projectScreen")?.style.removeProperty("display");
}

