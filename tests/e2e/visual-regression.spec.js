const { test, expect } = require('@playwright/test');

test.describe('Visual Regression Tests', () => {
  test.describe('Hero Section Screenshots', () => {
    test('should match hero section in Dutch on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000); // Wait for animations

      const hero = page.locator('.hero-simple');
      await expect(hero).toHaveScreenshot('hero-desktop-nl.png', {
        maxDiffPixels: 100
      });
    });

    test('should match hero section in English on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Switch to English
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(1000);

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const hero = page.locator('.hero-simple');
      await expect(hero).toHaveScreenshot('hero-desktop-en.png', {
        maxDiffPixels: 100
      });
    });

    test('should match hero section on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const hero = page.locator('.hero-simple');
      await expect(hero).toHaveScreenshot('hero-mobile-nl.png', {
        maxDiffPixels: 100
      });
    });

    test('should match hero section on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const hero = page.locator('.hero-simple');
      await expect(hero).toHaveScreenshot('hero-tablet-nl.png', {
        maxDiffPixels: 100
      });
    });
  });

  test.describe('Navigation Screenshots', () => {
    test('should match desktop header navigation', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const header = page.locator('.header');
      await expect(header).toHaveScreenshot('header-desktop.png', {
        maxDiffPixels: 50
      });
    });

    test('should match mobile bottom navigation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const mobileNav = page.locator('.mobile-bottom-nav');
      await expect(mobileNav).toHaveScreenshot('mobile-nav.png', {
        maxDiffPixels: 50
      });
    });

    test('should match language dropdown open state', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.click('#languageToggle');
      await page.waitForTimeout(300);

      const dropdown = page.locator('.language-toggle-wrapper');
      await expect(dropdown).toHaveScreenshot('language-dropdown-open.png', {
        maxDiffPixels: 50
      });
    });
  });

  test.describe('Projects Section Screenshots', () => {
    test('should match projects section default state', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(1000);

      const projects = page.locator('#projects');
      await expect(projects).toHaveScreenshot('projects-default.png', {
        maxDiffPixels: 200
      });
    });

    test('should match project card design', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(1000);

      const firstCard = page.locator('.project-card').first();
      await expect(firstCard).toHaveScreenshot('project-card-sample.png', {
        maxDiffPixels: 100
      });
    });

    test('should match project filters', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const filters = page.locator('.project-filters');
      await expect(filters).toHaveScreenshot('project-filters.png', {
        maxDiffPixels: 50
      });
    });

    test('should match projects with Web filter active', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(500);

      await page.click('.filter-btn[data-filter="web"]');
      await page.waitForTimeout(800);

      const projects = page.locator('#projects');
      await expect(projects).toHaveScreenshot('projects-web-filtered.png', {
        maxDiffPixels: 200
      });
    });
  });

  test.describe('Contact Section Screenshots', () => {
    test('should match contact section on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(1000);

      const contact = page.locator('#contact');
      await expect(contact).toHaveScreenshot('contact-desktop.png', {
        maxDiffPixels: 150
      });
    });

    test('should match contact section on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(1000);

      const contact = page.locator('#contact');
      await expect(contact).toHaveScreenshot('contact-mobile.png', {
        maxDiffPixels: 150
      });
    });

    test('should match contact option card', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const whatsappCard = page.locator('.contact-option-card.whatsapp');
      await expect(whatsappCard).toHaveScreenshot('contact-card-whatsapp.png', {
        maxDiffPixels: 50
      });
    });
  });

  test.describe('About Section Screenshots', () => {
    test('should match about section on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#about').scrollIntoView();
      });
      await page.waitForTimeout(1000);

      const about = page.locator('#about');
      await expect(about).toHaveScreenshot('about-desktop.png', {
        maxDiffPixels: 200
      });
    });

    test('should match about section on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#about').scrollIntoView();
      });
      await page.waitForTimeout(1000);

      const about = page.locator('#about');
      await expect(about).toHaveScreenshot('about-mobile.png', {
        maxDiffPixels: 200
      });
    });

    test('should match stats section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#about').scrollIntoView();
      });
      await page.waitForTimeout(1000);

      const stats = page.locator('.about-stats');
      await expect(stats).toHaveScreenshot('about-stats.png', {
        maxDiffPixels: 100
      });
    });
  });

  test.describe('Footer Screenshots', () => {
    test('should match footer on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      const footer = page.locator('.simple-footer');
      await expect(footer).toHaveScreenshot('footer-desktop.png', {
        maxDiffPixels: 50
      });
    });

    test('should match footer on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      const footer = page.locator('.simple-footer');
      await expect(footer).toHaveScreenshot('footer-mobile.png', {
        maxDiffPixels: 50
      });
    });

    test('should match footer language switcher', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      const langSwitcher = page.locator('.footer-language');
      await expect(langSwitcher).toHaveScreenshot('footer-language.png', {
        maxDiffPixels: 30
      });
    });
  });

  test.describe('Ticker Animation Screenshots', () => {
    test('should match ticker section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const ticker = page.locator('.ticker-section');
      await expect(ticker).toHaveScreenshot('ticker-section.png', {
        maxDiffPixels: 100
      });
    });
  });

  test.describe('Portfolio Sticker Screenshots', () => {
    test('should match portfolio sticker on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const sticker = page.locator('.portfolio-sticker');
      await expect(sticker).toHaveScreenshot('portfolio-sticker-desktop.png', {
        maxDiffPixels: 50
      });
    });

    test('should match portfolio sticker on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const sticker = page.locator('.portfolio-sticker');
      await expect(sticker).toHaveScreenshot('portfolio-sticker-mobile.png', {
        maxDiffPixels: 50
      });
    });
  });

  test.describe('Full Page Screenshots', () => {
    test('should match full page on desktop in Dutch', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);

      await expect(page).toHaveScreenshot('full-page-desktop-nl.png', {
        fullPage: true,
        maxDiffPixels: 500
      });
    });

    test('should match full page on desktop in English', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Switch to English
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(1000);

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('full-page-desktop-en.png', {
        fullPage: true,
        maxDiffPixels: 500
      });
    });

    test('should match full page on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);

      await expect(page).toHaveScreenshot('full-page-mobile-nl.png', {
        fullPage: true,
        maxDiffPixels: 500
      });
    });
  });

  test.describe('Interactive States Screenshots', () => {
    test('should match filter button active state', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(500);

      await page.click('.filter-btn[data-filter="web"]');
      await page.waitForTimeout(300);

      const webFilter = page.locator('.filter-btn[data-filter="web"]');
      await expect(webFilter).toHaveScreenshot('filter-btn-active.png', {
        maxDiffPixels: 30
      });
    });

    test('should match show more button expanded state', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(500);

      await page.click('#showMoreProjects');
      await page.waitForTimeout(800);

      const showMoreBtn = page.locator('#showMoreProjects');
      await expect(showMoreBtn).toHaveScreenshot('show-more-expanded.png', {
        maxDiffPixels: 30
      });
    });
  });
});
