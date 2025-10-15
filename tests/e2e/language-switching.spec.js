const { test, expect } = require('@playwright/test');
const translations = require('../fixtures/translations.json');

test.describe('Language Switching (URL-based i18n)', () => {

  // Clear localStorage before each test to ensure clean state
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.waitForTimeout(100);
  });

  test.describe('Language Detection from Query Parameters', () => {
    test('should load Dutch content with ?lang=nl', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.waitForLoadState('networkidle');

      // Check lang attribute
      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('nl');

      // Check Dutch content
      const projectsTitle = page.locator('[data-translate="projectsTitle"]');
      await expect(projectsTitle).toContainText('Geselecteerd werk');

      const navProjects = page.locator('[data-translate="navProjects"]').first();
      await expect(navProjects).toContainText('Projecten');
    });

    test('should load English content with ?lang=en', async ({ page }) => {
      await page.goto('/?lang=en');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500); // Wait for translations to apply

      // Check lang attribute
      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('en');

      // Check English content
      const projectsTitle = page.locator('[data-translate="projectsTitle"]');
      await expect(projectsTitle).toContainText('Selected Work');

      const navProjects = page.locator('[data-translate="navProjects"]').first();
      await expect(navProjects).toContainText('Work');
    });

    test('should default to Dutch when no language specified', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Should default to Dutch
      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('nl');

      const projectsTitle = page.locator('[data-translate="projectsTitle"]');
      await expect(projectsTitle).toContainText('Geselecteerd werk');
    });
  });

  test.describe('Portfolio Website Page with Query Parameters', () => {
    test('should load portfolio page in Dutch with ?lang=nl', async ({ page }) => {
      await page.goto('/portfolio-website?lang=nl');
      await page.waitForLoadState('networkidle');

      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('nl');

      const heroTitle = page.locator('[data-translate="portfolioHeroTitle"]');
      await expect(heroTitle).toContainText('Ook zo\'n fancy lead generator website?');
    });

    test('should load portfolio page in English with ?lang=en', async ({ page }) => {
      await page.goto('/portfolio-website?lang=en');
      await page.waitForLoadState('networkidle');

      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('en');

      const heroTitle = page.locator('[data-translate="portfolioHeroTitle"]');
      await expect(heroTitle).toContainText('Want a fancy lead generator website like this?');
    });
  });

  test.describe('Header Language Toggle', () => {
    test('should display language toggle in header on desktop', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForLoadState('networkidle');

      const langToggle = page.locator('#languageToggle');
      await expect(langToggle).toBeVisible({ timeout: 5000 });

      // Check current language display
      const currentLang = page.locator('.lang-current');
      await expect(currentLang).toContainText('NL');
    });

    test('should open dropdown when clicking language toggle', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForLoadState('networkidle');

      const langToggle = page.locator('#languageToggle');
      await expect(langToggle).toBeVisible({ timeout: 5000 });

      const dropdown = page.locator('#languageDropdown');

      // Dropdown should be hidden initially
      await expect(dropdown).not.toHaveClass(/active/);

      // Click toggle
      await langToggle.click();
      await page.waitForTimeout(300);

      // Dropdown should be visible
      await expect(dropdown).toHaveClass(/active/);
    });

    test('should show both language options in dropdown', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForLoadState('networkidle');

      const langToggle = page.locator('#languageToggle');
      await expect(langToggle).toBeVisible({ timeout: 5000 });

      await langToggle.click();
      await page.waitForTimeout(300);

      // Check NL option
      const nlOption = page.locator('.lang-option[data-lang="nl"]');
      await expect(nlOption).toBeVisible();
      await expect(nlOption).toContainText('Nederlands');

      // Check EN option
      const enOption = page.locator('.lang-option[data-lang="en"]');
      await expect(enOption).toBeVisible();
      await expect(enOption).toContainText('English');
    });

    test('should navigate when clicking English option', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForLoadState('networkidle');

      const langToggle = page.locator('#languageToggle');
      await expect(langToggle).toBeVisible({ timeout: 5000 });

      // Open dropdown
      await langToggle.click();
      await page.waitForTimeout(300);

      // Click English option - this will navigate
      await page.click('.lang-option[data-lang="en"]');
      await page.waitForLoadState('networkidle');

      // Check HTML lang attribute
      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('en');

      // Check translated content
      const projectsTitle = page.locator('[data-translate="projectsTitle"]');
      await expect(projectsTitle).toContainText('Selected Work');
    });

    test('should update language indicator when on English page', async ({ page }) => {
      await page.goto('/?lang=en');
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForLoadState('networkidle');

      const currentLang = page.locator('.lang-current');
      await expect(currentLang).toBeVisible({ timeout: 5000 });
      await expect(currentLang).toContainText('EN');
    });
  });

  test.describe('Footer Language Buttons', () => {
    test('should display language buttons in footer', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);

      const nlBtn = page.locator('.footer-lang-btn[data-lang="nl"]');
      const enBtn = page.locator('.footer-lang-btn[data-lang="en"]');

      await expect(nlBtn).toBeVisible();
      await expect(nlBtn).toContainText('NL');

      await expect(enBtn).toBeVisible();
      await expect(enBtn).toContainText('EN');
    });

    test('should have active state on current language in footer', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);

      // NL should be active
      const nlBtn = page.locator('.footer-lang-btn[data-lang="nl"]');
      await expect(nlBtn).toHaveClass(/active/);

      const enBtn = page.locator('.footer-lang-btn[data-lang="en"]');
      await expect(enBtn).not.toHaveClass(/active/);
    });

    test('should navigate when clicking EN footer button', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);

      // Click EN button
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForLoadState('networkidle');

      // Check language changed
      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('en');

      // Check English content
      const heroTagline = page.locator('[data-translate="heroTagline"]');
      const text = await heroTagline.textContent();
      expect(text).toContain('years'); // English version
    });

    test('should show active state on EN button when viewing English', async ({ page }) => {
      await page.goto('/?lang=en');
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);

      const enBtn = page.locator('.footer-lang-btn[data-lang="en"]');
      await expect(enBtn).toHaveClass(/active/);

      const nlBtn = page.locator('.footer-lang-btn[data-lang="nl"]');
      await expect(nlBtn).not.toHaveClass(/active/);
    });

    test('should show language separator between buttons', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);

      const separator = page.locator('.footer-lang-separator');
      await expect(separator).toBeVisible();
      await expect(separator).toContainText('|');
    });
  });

  test.describe('Content Translation', () => {
    test('should translate all navigation items in English', async ({ page }) => {
      await page.goto('/?lang=en');
      await page.waitForLoadState('networkidle');

      // Check nav translations
      const navHome = page.locator('[data-translate="navHome"]').first();
      await expect(navHome).toContainText(translations.en.navHome);

      const navProjects = page.locator('[data-translate="navProjects"]').first();
      await expect(navProjects).toContainText(translations.en.navProjects);

      const navAbout = page.locator('[data-translate="navAbout"]').first();
      await expect(navAbout).toContainText(translations.en.navAbout);
    });

    test('should translate hero section in English', async ({ page }) => {
      await page.goto('/?lang=en');
      await page.waitForLoadState('networkidle');

      const heroName = page.locator('[data-translate="heroName"]');
      await expect(heroName).toContainText(translations.en.heroName);

      // Check placeholder is translated
      const input = page.locator('#heroInput');
      const placeholder = await input.getAttribute('placeholder');
      expect(placeholder).toContain('Tell me about your idea');
    });

    test('should translate projects section in English', async ({ page }) => {
      await page.goto('/?lang=en');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(300);

      const projectsTitle = page.locator('[data-translate="projectsTitle"]');
      await expect(projectsTitle).toContainText(translations.en.projectsTitle);

      const filterAll = page.locator('[data-translate="filterAll"]');
      await expect(filterAll).toContainText(translations.en.filterAll);
    });

    test('should translate about section in English', async ({ page }) => {
      await page.goto('/?lang=en');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#about').scrollIntoView();
      });
      await page.waitForTimeout(300);

      const aboutTitle = page.locator('[data-translate="aboutTitle"]');
      await expect(aboutTitle).toContainText(translations.en.aboutTitle);
    });

    test('should translate contact section in English', async ({ page }) => {
      await page.goto('/?lang=en');
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(300);

      const contactTitle = page.locator('[data-translate="contactTitle"]');
      await expect(contactTitle).toContainText(translations.en.contactTitle);
    });

    test('should translate portfolio sticker in English', async ({ page }) => {
      await page.goto('/?lang=en');
      await page.waitForLoadState('networkidle');

      const stickerQuestion = page.locator('[data-translate="stickerQuestion"]');
      const text = await stickerQuestion.textContent();
      expect(text).toContain('Want a portfolio website like this?');
    });

    test('should keep Dutch content when language is Dutch', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.waitForLoadState('networkidle');

      const projectsTitle = page.locator('[data-translate="projectsTitle"]');
      await expect(projectsTitle).toContainText('Geselecteerd werk');

      const stickerQuestion = page.locator('[data-translate="stickerQuestion"]');
      await expect(stickerQuestion).toContainText('Wil je ook zo\'n portfolio website?');
    });
  });

  test.describe('Portfolio Website Page Translation', () => {
    test('should translate portfolio page to English', async ({ page }) => {
      await page.goto('/portfolio-website?lang=en');
      await page.waitForLoadState('networkidle');

      // Check hero section
      const heroTitle = page.locator('[data-translate="portfolioHeroTitle"]');
      await expect(heroTitle).toContainText('Want a fancy lead generator website like this?');

      const heroSubtitle = page.locator('[data-translate="portfolioHeroSubtitle"]');
      await expect(heroSubtitle).toContainText('I\'ll build it for you!');

      // Check package titles
      const quickStart = page.locator('[data-translate="packageQuickStart"]');
      await expect(quickStart).toContainText('Quick Start');

      const allIn = page.locator('[data-translate="packageAllIn"]');
      await expect(allIn).toContainText('All-In');

      const premium = page.locator('[data-translate="packagePremium"]');
      await expect(premium).toContainText('Premium');
    });

    test('should keep Dutch on portfolio page when Dutch selected', async ({ page }) => {
      await page.goto('/portfolio-website?lang=nl');
      await page.waitForLoadState('networkidle');

      const heroTitle = page.locator('[data-translate="portfolioHeroTitle"]');
      await expect(heroTitle).toContainText('Ook zo\'n fancy lead generator website?');

      const heroSubtitle = page.locator('[data-translate="portfolioHeroSubtitle"]');
      await expect(heroSubtitle).toContainText('Die bouw ik voor je!');
    });

    test('should translate process section on portfolio page', async ({ page }) => {
      await page.goto('/portfolio-website?lang=en');
      await page.waitForLoadState('networkidle');

      // Wait for element to be present before scrolling
      await page.waitForSelector('.process-section', { timeout: 5000 });

      await page.evaluate(() => {
        const section = document.querySelector('.process-section');
        if (section) section.scrollIntoView();
      });
      await page.waitForTimeout(300);

      const processTitle = page.locator('[data-translate="processTitle"]');
      await expect(processTitle).toContainText('How does it work?');

      const milestone1 = page.locator('[data-translate="processMilestone1"]');
      await expect(milestone1).toContainText('Intake meeting');
    });
  });

  test.describe('Dynamic Links', () => {
    test('should update portfolio sticker link for English', async ({ page }) => {
      await page.goto('/?lang=en');
      await page.waitForLoadState('networkidle');

      const portfolioSticker = page.locator('#portfolioStickerLink');
      const href = await portfolioSticker.getAttribute('href');

      // Should contain /en/ prefix
      expect(href).toContain('/en');
    });

    test('should update portfolio sticker link for Dutch', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.waitForLoadState('networkidle');

      const portfolioSticker = page.locator('#portfolioStickerLink');
      const href = await portfolioSticker.getAttribute('href');

      // Should contain /nl/ prefix
      expect(href).toContain('/nl');
    });
  });

  test.describe('Language Persistence', () => {
    test('should maintain English language after page refresh', async ({ page }) => {
      await page.goto('/?lang=en');
      await page.waitForLoadState('networkidle');

      // Check we're in English
      let htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('en');

      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Should still be in English (via localStorage)
      htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('en');
    });

    test('should maintain Dutch language after page refresh', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.waitForLoadState('networkidle');

      // Check we're in Dutch
      let htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('nl');

      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Should still be in Dutch
      htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('nl');
    });
  });

  test.describe('SEO and Accessibility', () => {
    test('should have correct html lang attribute for Dutch', async ({ page }) => {
      await page.goto('/?lang=nl');
      await page.waitForLoadState('networkidle');

      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('nl');
    });

    test('should have correct html lang attribute for English', async ({ page }) => {
      await page.goto('/?lang=en');
      await page.waitForLoadState('networkidle');

      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('en');
    });
  });
});
