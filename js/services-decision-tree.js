let currentStep = 1;
let stepHistory = [];
const totalSteps = 3;

// Map results to their target elements
const resultMap = {
    'step2-starter': document.querySelectorAll('[data-step="2"]')[0],
    'step2-existing': document.querySelectorAll('[data-step="2"]')[1],
    'result-portfolio': document.querySelectorAll('[data-step="3"]')[0],
    'result-mvp': document.querySelectorAll('[data-step="3"]')[1],
    'result-full-product': document.querySelectorAll('[data-step="3"]')[2],
    'result-optimize': document.querySelectorAll('[data-step="3"]')[3],
    'result-consultancy': document.querySelectorAll('[data-step="3"]')[4],
    'result-scale': document.querySelectorAll('[data-step="3"]')[5],
    'result-unsure': document.querySelectorAll('[data-step="3"]')[6]
};

// Initialize - Improved touch handling
document.querySelectorAll('.option-card').forEach(card => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let hasMoved = false;
    let isProcessing = false;

    const handleTouchStart = function(e) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchStartTime = Date.now();
        hasMoved = false;
    };

    const handleTouchMove = function(e) {
        if (!e.touches[0]) return;
        const touch = e.touches[0];
        const moveX = Math.abs(touch.clientX - touchStartX);
        const moveY = Math.abs(touch.clientY - touchStartY);

        // If moved more than 10px, consider it a scroll
        if (moveX > 10 || moveY > 10) {
            hasMoved = true;
        }
    };

    const handleCardInteraction = function(e) {
        // Prevent double-processing
        if (isProcessing) {
            e.preventDefault();
            return;
        }

        // Check if it was a scroll gesture
        if (hasMoved) {
            return;
        }

        // Debounce: minimum 300ms between interactions
        const now = Date.now();
        const timeSinceStart = now - touchStartTime;
        if (timeSinceStart < 100) {
            // Too fast, likely accidental
            return;
        }

        // Prevent default to avoid double-firing
        e.preventDefault();
        e.stopPropagation();

        // Mark as processing
        isProcessing = true;

        const next = this.getAttribute('data-next');
        const currentStepEl = document.querySelector('.step.active');

        // Save current step to history
        stepHistory.push(currentStepEl);

        // Hide current step
        currentStepEl.classList.remove('active');

        // Show next step
        const nextStep = resultMap[next];
        if (nextStep) {
            nextStep.classList.add('active');

            // Update progress
            const stepNum = parseInt(nextStep.getAttribute('data-step'));
            currentStep = stepNum;
            updateProgress();
            updateStepIndicators();
        }

        // Reset processing flag after animation
        setTimeout(() => {
            isProcessing = false;
        }, 500);
    };

    // iOS: Use touch events with proper handling
    if ('ontouchstart' in window) {
        card.addEventListener('touchstart', handleTouchStart, { passive: true });
        card.addEventListener('touchmove', handleTouchMove, { passive: true });
        card.addEventListener('touchend', handleCardInteraction, { passive: false });
    } else {
        // Desktop: Use click
        card.addEventListener('click', handleCardInteraction);
    }
});

function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function updateStepIndicators() {
    const dots = document.querySelectorAll('.step-dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        if (index < currentStep - 1) {
            dot.classList.add('completed');
        } else if (index === currentStep - 1) {
            dot.classList.add('active');
        }
    });
}

// Debounce helper for button clicks
let lastActionTime = 0;
const ACTION_COOLDOWN = 500; // 500ms cooldown between actions

function goBack() {
    // Debounce to prevent accidental double-taps
    const now = Date.now();
    if (now - lastActionTime < ACTION_COOLDOWN) {
        return;
    }
    lastActionTime = now;

    if (stepHistory.length > 0) {
        // Hide current step
        document.querySelector('.step.active').classList.remove('active');

        // Show previous step
        const previousStep = stepHistory.pop();
        previousStep.classList.add('active');

        // Update progress
        currentStep = parseInt(previousStep.getAttribute('data-step'));
        updateProgress();
        updateStepIndicators();
    }
}

function restart() {
    // Debounce to prevent accidental double-taps
    const now = Date.now();
    if (now - lastActionTime < ACTION_COOLDOWN) {
        return;
    }
    lastActionTime = now;

    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });

    // Show first step
    document.querySelector('[data-step="1"]').classList.add('active');

    // Reset state
    currentStep = 1;
    stepHistory = [];
    updateProgress();
    updateStepIndicators();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize progress
updateProgress();

// Button actions (replaces inline onclick handlers)
document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    if (btn.dataset.action === 'back') goBack();
    if (btn.dataset.action === 'restart') restart();
});
