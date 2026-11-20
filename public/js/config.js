/**
 * Configuration and Constants
 * Central location for all configuration values and magic numbers
 */

// Contact Information
export const CONTACT = {
    WHATSAPP: '31657591440',
    EMAIL: 'nathaljanijman@hotmail.com'
};

// Animation Timings (in milliseconds)
export const ANIMATION_DELAYS = {
    FADE_IN: 10,
    FADE_OUT: 300,
    CARD_TRANSITION: 300,
    CHAT_RESPONSE_MIN: 1500,
    CHAT_RESPONSE_MAX: 2500,
    TYPING_INDICATOR: 1000
};

// Scroll Performance
export const SCROLL_CONFIG = {
    THROTTLE_DELAY: 16, // ~60fps
    PARALLAX_RATE: 0.3,
    SCROLL_THRESHOLD: 50
};

// Project Filtering
export const FILTER_CONFIG = {
    INITIAL_VISIBLE_COUNT: 3,
    ANIMATION_STAGGER: 100
};

// Analytics
export const ANALYTICS_CONFIG = {
    SCROLL_DEPTH_INTERVALS: [25, 50, 75, 90, 100],
    SESSION_TIMEOUT: 1800000, // 30 minutes
    DEBOUNCE_DELAY: 500
};

// Breakpoints (should match CSS)
export const BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1280
};

// CSS Class Names
export const CSS_CLASSES = {
    VISIBLE: 'visible',
    HIDDEN: 'hidden',
    ACTIVE: 'active',
    FADE_IN: 'fade-in',
    FADE_OUT: 'fade-out',
    CARD_VISIBLE: 'card-visible',
    TYPING: 'typing'
};
