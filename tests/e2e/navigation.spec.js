const { test, expect } = require('@playwright/test');
const { scrollToSection, hasActiveClass, waitForElement } = require('../helpers/test-helpers');

test.describe('Navigation & Routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Desktop Header Navigation', () => {
    test('should display header navigation on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const header = page.locator('.header');
      await expect(header).toBeVisible();

      // Check all nav links are present
      const navLinks = page.locator('.nav-link');
      await expect(navLinks).toHaveCount(3);

      const navTexts = await navLinks.allTextContents();
      expect(navTexts).toEqual(['Home', 'Projecten', 'Bio']);
    });

    test('should navigate to sections via header links', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Navigate to Projects
      await page.click('a[href="#projects"]');
      await page.waitForTimeout(800); // Wait for smooth scroll

      // Check if projects section is in view
      const projectsSection = page.locator('#projects');
      await expect(projectsSection).toBeInViewport();

      // Navigate to About
      await page.click('a[href="#about"]');
      await page.waitForTimeout(800);

      const aboutSection = page.locator('#about');
      await expect(aboutSection).toBeInViewport();
    });

    test('should highlight active navigation link', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Home should be active initially
      const homeLink = page.locator('a[href="#home"].nav-link');
      await expect(homeLink).toHaveClass(/active/);

      // Click projects and check active state
      await page.click('a[href="#projects"].nav-link');
      await page.waitForTimeout(1000);

      const projectsLink = page.locator('a[href="#projects"].nav-link');
      await expect(projectsLink).toHaveClass(/active/);
    });

    test('should have contact button in header', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const contactBtn = page.locator('.contact-button');
      await expect(contactBtn).toBeVisible();
      await expect(contactBtn).toContainText('Contact');

      // Click and verify navigation
      await contactBtn.click();
      await page.waitForTimeout(800);

      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeInViewport();
    });
  });

  test.describe('Mobile Bottom Navigation', () => {
    test('should display mobile bottom navigation on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const mobileNav = page.locator('.mobile-bottom-nav');
      await expect(mobileNav).toBeVisible();

      // Check all nav items
      const navItems = page.locator('.mobile-nav-item');
      await expect(navItems).toHaveCount(4);
    });

    test('should navigate via mobile bottom nav', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Click on Projects
      await page.click('.mobile-nav-item[data-section="projects"]');
      await page.waitForTimeout(800);

      const projectsSection = page.locator('#projects');
      await expect(projectsSection).toBeInViewport();

      // Check active state
      const projectsNavItem = page.locator('.mobile-nav-item[data-section="projects"]');
      await expect(projectsNavItem).toHaveClass(/active/);
    });

    test('should show correct icons and labels in mobile nav', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const navLabels = page.locator('.mobile-nav-label');
      const labels = await navLabels.allTextContents();

      expect(labels).toEqual(['Home', 'Projecten', 'Bio', 'Contact']);

      // Check icons exist
      const icons = page.locator('.mobile-nav-icon svg');
      await expect(icons).toHaveCount(4);
    });
  });

  test.describe('Footer Navigation', () => {
    test('should display footer links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      const footer = page.locator('.simple-footer');
      await expect(footer).toBeVisible();

      // Check footer links
      const linkedInLink = page.locator('footer a[href*="linkedin.com"]');
      await expect(linkedInLink).toBeVisible();
      await expect(linkedInLink).toHaveAttribute('target', '_blank');

      const wikiLink = page.locator('footer a[href*="wikipedia.org"]');
      await expect(wikiLink).toBeVisible();

      const emailLink = page.locator('footer a[href^="mailto:"]');
      await expect(emailLink).toBeVisible();
    });

    test('should have correct footer copyright text', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      const copyright = page.locator('.footer-rights');
      await expect(copyright).toContainText('2025 Nathalja Nijman');
    });
  });

  test.describe('Portfolio Sticker Link', () => {
    test('should display portfolio sticker on hero section', async ({ page }) => {
      const sticker = page.locator('.portfolio-sticker');
      await expect(sticker).toBeVisible();
      // Portfolio sticker link is now dynamically generated with language prefix
      await expect(sticker).toHaveAttribute('href', '/nl/portfolio-website');
    });

    test('should have correct sticker text', async ({ page }) => {
      const stickerQuestion = page.locator('.sticker-question');
      await expect(stickerQuestion).toContainText('Wil je ook zo\'n portfolio website?');

      const stickerAnswer = page.locator('.sticker-answer');
      await expect(stickerAnswer).toContainText('Ik maak hem voor je!');
    });
  });

  test.describe('Smooth Scrolling', () => {
    test('should scroll smoothly between sections', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Get initial scroll position
      const initialScroll = await page.evaluate(() => window.scrollY);

      // Click on about section
      await page.click('a[href="#about"]');
      await page.waitForTimeout(100);

      // Check that scroll position is changing (animation in progress)
      const midScroll = await page.evaluate(() => window.scrollY);
      expect(midScroll).toBeGreaterThan(initialScroll);

      // Wait for scroll to complete
      await page.waitForTimeout(800);

      // Verify we're at the about section
      const aboutSection = page.locator('#about');
      await expect(aboutSection).toBeInViewport();
    });
  });

  test.describe('ARIA Labels', () => {
    test('should have proper ARIA labels on navigation', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Check main navigation
      const nav = page.locator('nav[role="navigation"]');
      await expect(nav.first()).toHaveAttribute('aria-label', 'Main navigation');

      // Check nav links have aria-labels
      const homeLink = page.locator('a[href="#home"].nav-link');
      await expect(homeLink).toHaveAttribute('aria-label', 'Home section');
    });

    test('should have ARIA labels on mobile navigation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const mobileNav = page.locator('.mobile-bottom-nav');
      await expect(mobileNav).toHaveAttribute('role', 'navigation');
      await expect(mobileNav).toHaveAttribute('aria-label', 'Mobile bottom navigation');
    });
  });
});
