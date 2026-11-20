/**
 * Cloudflare Pages middleware: password protection for everything except the live site.
 *
 * - nathaljanijman.com / www.nathaljanijman.com: passes straight through (public).
 * - Everything else (staging.nathaljanijman.com, *.nathaljanijman.pages.dev previews):
 *   asks for a password (HTTP Basic Auth). The username doesn't matter.
 *
 * The password lives in the Cloudflare Pages environment variable STAGING_PASSWORD
 * (Settings > Variables and Secrets, as a "Secret"). Without that variable,
 * non-live hosts stay locked (503): fail closed, never accidentally public.
 */

const PRODUCTION_HOSTS = ['nathaljanijman.com', 'www.nathaljanijman.com'];

const PRIVATE_HEADERS = {
    'X-Robots-Tag': 'noindex, nofollow',
    'Cache-Control': 'private, no-store'
};

async function sha256(text) {
    return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
}

// Constant-time comparison on hashes, so the response time leaks nothing about the password
async function safeEqual(a, b) {
    const [ha, hb] = await Promise.all([sha256(a), sha256(b)]);
    if (crypto.subtle.timingSafeEqual) {
        return crypto.subtle.timingSafeEqual(ha, hb);
    }
    let diff = 0;
    for (let i = 0; i < ha.length; i++) diff |= ha[i] ^ hb[i];
    return diff === 0;
}

function suppliedPassword(authHeader) {
    if (!authHeader || !authHeader.startsWith('Basic ')) return null;
    try {
        const bytes = Uint8Array.from(atob(authHeader.slice(6).trim()), c => c.charCodeAt(0));
        const decoded = new TextDecoder().decode(bytes);
        const sep = decoded.indexOf(':');
        return sep === -1 ? null : decoded.slice(sep + 1);
    } catch {
        return null;
    }
}

export async function onRequest({ request, env, next }) {
    const host = new URL(request.url).hostname;
    if (PRODUCTION_HOSTS.includes(host)) {
        return next();
    }

    // TEMPORARY PROBE: check whether _headers/_redirects still apply after next(). Will be removed.
    const probePath = new URL(request.url).pathname;
    if (probePath === '/css/style.css' || probePath === '/nl') {
        return next();
    }

    const expected = env.STAGING_PASSWORD;
    if (!expected) {
        return new Response('Staging is vergrendeld: STAGING_PASSWORD is niet ingesteld in Cloudflare Pages.', {
            status: 503,
            headers: { ...PRIVATE_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' }
        });
    }

    const supplied = suppliedPassword(request.headers.get('Authorization'));
    if (supplied === null || !(await safeEqual(supplied, expected))) {
        return new Response('Wachtwoord vereist.', {
            status: 401,
            headers: {
                ...PRIVATE_HEADERS,
                'Content-Type': 'text/plain; charset=utf-8',
                'WWW-Authenticate': 'Basic realm="Staging", charset="UTF-8"'
            }
        });
    }

    const response = await next();
    const protectedResponse = new Response(response.body, response);
    for (const [name, value] of Object.entries(PRIVATE_HEADERS)) {
        protectedResponse.headers.set(name, value);
    }
    return protectedResponse;
}
