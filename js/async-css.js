// Turn <link rel="preload" as="style" data-async-css> into stylesheets once loaded
// (replaces inline onload handlers so the CSP needs no 'unsafe-inline').
(function () {
    document.querySelectorAll('link[data-async-css]').forEach(function (link) {
        function apply() { link.rel = 'stylesheet'; }
        if (link.sheet) { apply(); } else { link.addEventListener('load', apply); }
    });
})();
