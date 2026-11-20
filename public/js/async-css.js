// Loads non-critical stylesheets without blocking render.
// Replaces the inline onload="this.rel='stylesheet'" trick so the CSP
// does not need 'unsafe-inline'. A print-media stylesheet does not block
// rendering; once loaded it is switched to all media.
(function () {
    document.querySelectorAll('link[rel="preload"][as="style"][data-async-css]').forEach(function (link) {
        link.media = 'print';
        link.addEventListener('load', function () { link.media = 'all'; }, { once: true });
        link.rel = 'stylesheet';
    });
})();
