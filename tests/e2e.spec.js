const { test, expect } = require('@playwright/test');

test.describe('Portfolio Website - Smoke Tests', () => {
  test('should display the main page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Nathalja Nijman - Product Owner & Digital Leader/);
  });

  test('should load all main sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check all main sections exist
    await expect(page.locator('#home')).toBeVisible();
    await expect(page.locator('#projects')).toBeAttached();
    await expect(page.locator('#about')).toBeAttached();
    await expect(page.locator('#contact')).toBeAttached();
  });

  test('should have correct meta tags', async ({ page }) => {
    await page.goto('/');

    const viewport = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="viewport"]');
      return meta ? meta.getAttribute('content') : null;
    });

    expect(viewport).toContain('width=device-width');
  });

  test('should load without console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Allow Google Analytics errors or other third-party errors
    const criticalErrors = errors.filter(err =>
      !err.includes('gtag') &&
      !err.includes('google-analytics')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('should have no broken images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');

      // Check if image loaded successfully
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});
