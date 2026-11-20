// Global Error Handler - Production Ready
(function() {
    'use strict';

    // Global error tracking
    const errorLog = [];
    const MAX_ERRORS = 10;

    // Handle uncaught errors
    window.addEventListener('error', function(event) {
        const error = {
            message: event.message,
            source: event.filename,
            line: event.lineno,
            column: event.colno,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        // Log to internal array (for debugging)
        errorLog.push(error);
        if (errorLog.length > MAX_ERRORS) {
            errorLog.shift(); // Remove oldest
        }

        // In production: send to error tracking service
        // sendToErrorService(error);

        // Prevent default browser error handling
        return false;
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        const error = {
            type: 'unhandledRejection',
            reason: event.reason,
            promise: event.promise,
            timestamp: new Date().toISOString()
        };

        errorLog.push(error);
        if (errorLog.length > MAX_ERRORS) {
            errorLog.shift();
        }

        // In production: send to error tracking service
        // sendToErrorService(error);

        // Prevent console error
        event.preventDefault();
    });

    // Graceful degradation for features
    window.safeExecute = function(fn, fallback) {
        try {
            return fn();
        } catch (error) {
            if (fallback) {
                return fallback();
            }
            return null;
        }
    };

    // Expose error log for debugging (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.getErrorLog = function() {
            return errorLog;
        };
    }
})();
