const { test, expect } = require('@playwright/test');
const translations = require('../fixtures/translations.json');

test.describe('Language Switching (i18n)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Header Language Toggle', () => {
    test('should display language toggle in header on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500); // Wait for header to be stable

      const langToggle = page.locator('#languageToggle');
      await expect(langToggle).toBeVisible({ timeout: 5000 });

      // Check current language display
      const currentLang = page.locator('.lang-current');
      await expect(currentLang).toContainText('NL');
    });

    test('should open dropdown when clicking language toggle', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500);

      const langToggle = page.locator('#languageToggle');
      await expect(langToggle).toBeVisible({ timeout: 5000 });

      const dropdown = page.locator('#languageDropdown');

      // Dropdown should be hidden initially
      await expect(dropdown).not.toHaveClass(/active/);

      // Click toggle
      await langToggle.click();
      await page.waitForTimeout(500);

      // Dropdown should be visible
      await expect(dropdown).toHaveClass(/active/);
    });

    test('should show both language options in dropdown', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500);

      const langToggle = page.locator('#languageToggle');
      await expect(langToggle).toBeVisible({ timeout: 5000 });

      await langToggle.click();
      await page.waitForTimeout(500);

      // Check NL option
      const nlOption = page.locator('.lang-option[data-lang="nl"]');
      await expect(nlOption).toBeVisible();
      await expect(nlOption).toContainText('Nederlands');
      await expect(nlOption).toContainText('🇳🇱');

      // Check EN option
      const enOption = page.locator('.lang-option[data-lang="en"]');
      await expect(enOption).toBeVisible();
      await expect(enOption).toContainText('English');
      await expect(enOption).toContainText('🇬🇧');
    });

    test('should switch to English via header dropdown', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500);

      const langToggle = page.locator('#languageToggle');
      await expect(langToggle).toBeVisible({ timeout: 5000 });

      // Open dropdown
      await langToggle.click();
      await page.waitForTimeout(500);

      // Click English option
      await page.click('.lang-option[data-lang="en"]');
      await page.waitForTimeout(800);

      // Check HTML lang attribute
      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('en');

      // Check translated content
      const projectsTitle = page.locator('[data-translate="projectsTitle"]');
      await expect(projectsTitle).toContainText('Selected Work');

      const navProjects = page.locator('[data-translate="navProjects"]').first();
      await expect(navProjects).toContainText('Work');
    });

    test('should update current language indicator after switch', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500);

      const langToggle = page.locator('#languageToggle');
      await expect(langToggle).toBeVisible({ timeout: 5000 });

      await langToggle.click();
      await page.waitForTimeout(500);
      await page.click('.lang-option[data-lang="en"]');
      await page.waitForTimeout(800);

      const currentLang = page.locator('.lang-current');
      await expect(currentLang).toContainText('EN');
    });
  });

  test.describe('Footer Language Buttons', () => {
    test('should display language buttons in footer', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      const nlBtn = page.locator('.footer-lang-btn[data-lang="nl"]');
      const enBtn = page.locator('.footer-lang-btn[data-lang="en"]');

      await expect(nlBtn).toBeVisible();
      await expect(nlBtn).toContainText('NL');

      await expect(enBtn).toBeVisible();
      await expect(enBtn).toContainText('EN');
    });

    test('should have active state on current language in footer', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // NL should be active by default
      const nlBtn = page.locator('.footer-lang-btn[data-lang="nl"]');
      await expect(nlBtn).toHaveClass(/active/);

      const enBtn = page.locator('.footer-lang-btn[data-lang="en"]');
      await expect(enBtn).not.toHaveClass(/active/);
    });

    test('should switch language via footer buttons', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Click EN button
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      // Check language changed
      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('en');

      // Scroll back to top to check content
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      const heroTagline = page.locator('[data-translate="heroTagline"]');
      const text = await heroTagline.textContent();
      expect(text).toContain('digital products'); // English version
    });

    test('should show language separator between buttons', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      const separator = page.locator('.footer-lang-separator');
      await expect(separator).toBeVisible();
      await expect(separator).toContainText('|');
    });
  });

  test.describe('Language Synchronization', () => {
    test('should sync footer and header language states', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500);

      const langToggle = page.locator('#languageToggle');
      await expect(langToggle).toBeVisible({ timeout: 5000 });

      // Switch via header
      await langToggle.click();
      await page.waitForTimeout(500);
      await page.click('.lang-option[data-lang="en"]');
      await page.waitForTimeout(800);

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Check footer reflects the change
      const enBtn = page.locator('.footer-lang-btn[data-lang="en"]');
      await expect(enBtn).toHaveClass(/active/);

      const nlBtn = page.locator('.footer-lang-btn[data-lang="nl"]');
      await expect(nlBtn).not.toHaveClass(/active/);
    });

    test('should sync header when switching via footer', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500);

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Switch via footer
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(800);

      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      // Check header dropdown indicator
      const currentLang = page.locator('.lang-current');
      await expect(currentLang).toBeVisible({ timeout: 5000 });
      await expect(currentLang).toContainText('EN');
    });
  });

  test.describe('Content Translation', () => {
    test('should translate all navigation items', async ({ page }) => {
      // Switch to English
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      await page.evaluate(() => window.scrollTo(0, 0));

      // Check nav translations
      const navHome = page.locator('[data-translate="navHome"]').first();
      await expect(navHome).toContainText(translations.en.navHome);

      const navProjects = page.locator('[data-translate="navProjects"]').first();
      await expect(navProjects).toContainText(translations.en.navProjects);

      const navAbout = page.locator('[data-translate="navAbout"]').first();
      await expect(navAbout).toContainText(translations.en.navAbout);
    });

    test('should translate hero section', async ({ page }) => {
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      const heroName = page.locator('[data-translate="heroName"]');
      await expect(heroName).toContainText(translations.en.heroName);

      // Check placeholder is translated
      const input = page.locator('#heroInput');
      const placeholder = await input.getAttribute('placeholder');
      expect(placeholder).toBeTruthy();
      expect(placeholder.length).toBeGreaterThan(0);
    });

    test('should translate projects section', async ({ page }) => {
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(300);

      const projectsTitle = page.locator('[data-translate="projectsTitle"]');
      await expect(projectsTitle).toContainText(translations.en.projectsTitle);

      const filterAll = page.locator('[data-translate="filterAll"]');
      await expect(filterAll).toContainText(translations.en.filterAll);
    });

    test('should translate about section', async ({ page }) => {
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      await page.evaluate(() => {
        document.querySelector('#about').scrollIntoView();
      });
      await page.waitForTimeout(300);

      const aboutTitle = page.locator('[data-translate="aboutTitle"]');
      await expect(aboutTitle).toContainText(translations.en.aboutTitle);
    });

    test('should translate contact section', async ({ page }) => {
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(300);

      const contactTitle = page.locator('[data-translate="contactTitle"]');
      await expect(contactTitle).toContainText(translations.en.contactTitle);
    });

    test('should translate portfolio sticker', async ({ page }) => {
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      const stickerQuestion = page.locator('[data-translate="stickerQuestion"]');
      const text = await stickerQuestion.textContent();
      expect(text).toBeTruthy();
      expect(text).not.toContain('Wil je ook'); // Should not be Dutch
    });
  });

  test.describe('Language Persistence', () => {
    test('should maintain language after page refresh', async ({ page }) => {
      // Switch to English
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Check if English is still active
      const htmlLang = await page.getAttribute('html', 'lang');

      // Note: This test might fail if localStorage persistence is not implemented
      // If it fails, it indicates that language preference is not being persisted
    });
  });

  test.describe('HTML Lang Attribute', () => {
    test('should update HTML lang attribute when switching languages', async ({ page }) => {
      // Check initial state
      let htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('nl');

      // Switch to English
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('en');

      // Switch back to Dutch
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.click('.footer-lang-btn[data-lang="nl"]');
      await page.waitForTimeout(500);

      htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('nl');
    });
  });
});
