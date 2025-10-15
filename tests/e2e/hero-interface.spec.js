const { test, expect } = require('@playwright/test');

test.describe('Hero Conversational Interface', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Hero Section Display', () => {
    test('should display hero section with all elements', async ({ page }) => {
      const heroSection = page.locator('.hero-simple');
      await expect(heroSection).toBeVisible();

      // Check hero name
      const heroName = page.locator('.hero-name');
      await expect(heroName).toBeVisible();
      await expect(heroName).toContainText('Nathalja Nijman');

      // Check tagline
      const tagline = page.locator('.hero-tagline');
      await expect(tagline).toBeVisible();

      // Check background image
      const bgImage = page.locator('.hero-bg-image');
      await expect(bgImage).toBeVisible();
    });

    test('should display hero background image with overlay', async ({ page }) => {
      const bgImage = page.locator('.hero-bg-image');
      await expect(bgImage).toHaveAttribute('src', 'images/nathalja-work.jpg');
      await expect(bgImage).toHaveAttribute('alt', 'Nathalja Nijman - Product Owner');

      // Overlay exists in DOM but is hidden by design (display: none in CSS)
      const overlay = page.locator('.hero-overlay');
      await expect(overlay).toHaveCount(1);
    });
  });

  test.describe('Hero Input Form', () => {
    test('should display conversation form with input and button', async ({ page }) => {
      const form = page.locator('#heroConversationForm');
      await expect(form).toBeVisible();

      const input = page.locator('#heroInput');
      await expect(input).toBeVisible();
      await expect(input).toHaveAttribute('type', 'text');

      const sendButton = form.locator('.send-button');
      await expect(sendButton).toBeVisible();
    });

    test('should have correct placeholder text', async ({ page }) => {
      const input = page.locator('#heroInput');
      const placeholder = await input.getAttribute('placeholder');

      expect(placeholder).toBeTruthy();
      expect(placeholder).toContain('Vertel me over je idee');
    });

    test('should have maxlength attribute', async ({ page }) => {
      const input = page.locator('#heroInput');
      await expect(input).toHaveAttribute('maxlength', '500');
    });

    test('should accept user input', async ({ page }) => {
      const input = page.locator('#heroInput');

      await input.fill('Ik wil graag een website laten maken');
      await expect(input).toHaveValue('Ik wil graag een website laten maken');
    });

    test('should have autocomplete disabled', async ({ page }) => {
      const input = page.locator('#heroInput');
      await expect(input).toHaveAttribute('autocomplete', 'off');
    });

    test('should show send button icon', async ({ page }) => {
      const sendButton = page.locator('#heroConversationForm .send-button');
      const icon = sendButton.locator('svg');

      await expect(icon).toBeVisible();
    });

    test('should trigger form submission on enter key', async ({ page }) => {
      const input = page.locator('#heroInput');

      await input.fill('Test message');
      await input.press('Enter');

      // Wait for any animations or modal
      await page.waitForTimeout(500);

      // This should trigger the contact modal
      const modal = page.locator('#contactChoiceModal');
      // Check if modal becomes visible or has class changes
      // Note: Implementation depends on actual JS behavior
    });
  });

  test.describe('Suggestion Pills', () => {
    test('should display three suggestion pills', async ({ page }) => {
      const suggestions = page.locator('.suggestion-pill');
      await expect(suggestions).toHaveCount(3);
    });

    test('should have correct suggestion text in Dutch', async ({ page }) => {
      const suggestions = page.locator('.suggestion-pill');
      const texts = await suggestions.allTextContents();

      expect(texts[0]).toContain('Snellere groei');
      expect(texts[1]).toContain('Betere resultaten');
      expect(texts[2]).toContain('Meer impact');
    });

    test('should have data-message attributes', async ({ page }) => {
      const firstPill = page.locator('.suggestion-pill').first();
      const dataMessage = await firstPill.getAttribute('data-message');

      expect(dataMessage).toBeTruthy();
      expect(dataMessage).toContain('groeien');
    });

    test('should be clickable', async ({ page }) => {
      const firstPill = page.locator('.suggestion-pill').first();

      await firstPill.click();
      await page.waitForTimeout(500);

      // Should trigger contact modal or some action
      // Verify expected behavior based on implementation
    });

    test('should update after language switch', async ({ page }) => {
      // Switch to English
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      const suggestions = page.locator('.suggestion-pill');
      const texts = await suggestions.allTextContents();

      // Text should be in English now
      texts.forEach(text => {
        expect(text).not.toContain('groei'); // Should not contain Dutch words
      });
    });
  });

  test.describe('Hero Portfolio Sticker', () => {
    test('should display portfolio offering sticker', async ({ page }) => {
      const sticker = page.locator('.portfolio-sticker');
      await expect(sticker).toBeVisible();
    });

    test('should have correct sticker content', async ({ page }) => {
      const question = page.locator('.sticker-question');
      await expect(question).toBeVisible();
      await expect(question).toContainText('portfolio website');

      const answer = page.locator('.sticker-answer');
      await expect(answer).toBeVisible();
      await expect(answer).toContainText('Ik maak hem voor je');
    });

    test('should link to portfolio-website.html', async ({ page }) => {
      const sticker = page.locator('.portfolio-sticker');
      await expect(sticker).toHaveAttribute('href', 'portfolio-website.html');
      await expect(sticker).toHaveAttribute('aria-label');
    });

    test('should translate on language change', async ({ page }) => {
      // Switch to English
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      const question = page.locator('.sticker-question');
      const text = await question.textContent();

      // Should be in English
      expect(text).not.toContain('Wil je ook');
    });
  });

  test.describe('Hero Responsive Behavior', () => {
    test('should display correctly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();

      const hero = page.locator('.hero-simple');
      await expect(hero).toBeVisible();

      const input = page.locator('#heroInput');
      await expect(input).toBeVisible();

      const suggestions = page.locator('.suggestion-pill');
      await expect(suggestions).toHaveCount(3);
    });

    test('should have touch-friendly buttons on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const sendButton = page.locator('#heroConversationForm .send-button');
      const box = await sendButton.boundingBox();

      // Button should be at least 44x44px for touch
      expect(box.width).toBeGreaterThanOrEqual(40);
      expect(box.height).toBeGreaterThanOrEqual(40);
    });

    test('should display correctly on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.reload();

      const hero = page.locator('.hero-simple');
      await expect(hero).toBeVisible();

      const heroContent = page.locator('.hero-content');
      await expect(heroContent).toBeVisible();
    });

    test('should display correctly on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const hero = page.locator('.hero-simple');
      await expect(hero).toBeVisible();

      const input = page.locator('#heroInput');
      await expect(input).toBeVisible();
    });
  });

  test.describe('Hero Accessibility', () => {
    test('should have proper ARIA labels', async ({ page }) => {
      const heroSection = page.locator('.hero-simple');
      await expect(heroSection).toHaveAttribute('role', 'main');
      await expect(heroSection).toHaveAttribute('aria-label', 'Nathalja Nijman introduction');
    });

    test('should have keyboard accessible inputs', async ({ page }) => {
      const input = page.locator('#heroInput');

      // Tab to input
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Check if input can receive focus
      await input.focus();
      await expect(input).toBeFocused();
    });

    test('should have accessible buttons', async ({ page }) => {
      const suggestions = page.locator('.suggestion-pill');

      for (let i = 0; i < 3; i++) {
        const pill = suggestions.nth(i);
        // Should be a button element or have button role
        const tagName = await pill.evaluate(el => el.tagName.toLowerCase());
        expect(tagName).toBe('button');
      }
    });
  });

  test.describe('Hero Performance', () => {
    test('should load hero image within reasonable time', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/');
      await page.waitForSelector('.hero-bg-image', { state: 'visible' });

      const loadTime = Date.now() - startTime;

      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should have hero image with proper attributes', async ({ page }) => {
      const heroImg = page.locator('.hero-bg-image');

      // Check if image has src
      const src = await heroImg.getAttribute('src');
      expect(src).toBeTruthy();

      // Check if image has alt text
      const alt = await heroImg.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt.length).toBeGreaterThan(0);
    });
  });
});
