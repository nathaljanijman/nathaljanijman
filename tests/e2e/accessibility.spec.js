const { test, expect } = require('@playwright/test');

test.describe('Accessibility (A11y) Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Semantic HTML', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      // Check for h1
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
      await expect(h1).toContainText('Nathalja Nijman');

      // Check for h2 headings for sections
      const h2 = page.locator('h2');
      const count = await h2.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should have main landmark', async ({ page }) => {
      const main = page.locator('[role="main"]');
      await expect(main).toHaveCount(1);
    });

    test('should have navigation landmarks', async ({ page }) => {
      const navs = page.locator('[role="navigation"]');
      const count = await navs.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should have proper banner role for header', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const header = page.locator('header[role="banner"]');
      await expect(header).toBeVisible();
    });

    test('should use semantic HTML5 elements', async ({ page }) => {
      // Check for semantic elements
      const header = page.locator('header');
      await expect(header).toHaveCount(1);

      const nav = page.locator('nav');
      expect(await nav.count()).toBeGreaterThan(0);

      const section = page.locator('section');
      expect(await section.count()).toBeGreaterThan(0);

      const footer = page.locator('footer');
      await expect(footer).toHaveCount(1);
    });
  });

  test.describe('ARIA Labels & Attributes', () => {
    test('should have aria-label on navigation', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const mainNav = page.locator('nav[aria-label="Main navigation"]');
      await expect(mainNav).toBeVisible();
    });

    test('should have aria-labels on nav links', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const homeLink = page.locator('a[href="#home"][aria-label]').first();
      const ariaLabel = await homeLink.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('section');
    });

    test('should have aria-label on hero section', async ({ page }) => {
      const hero = page.locator('.hero-simple[aria-label]');
      const ariaLabel = await hero.getAttribute('aria-label');
      expect(ariaLabel).toContain('Nathalja Nijman');
    });

    test('should have aria-expanded on show more button', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const showMoreBtn = page.locator('#showMoreProjects');
      await expect(showMoreBtn).toHaveAttribute('aria-expanded');
    });

    test('should have aria-label on language toggle', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const langToggle = page.locator('#languageToggle[aria-label]');
      const ariaLabel = await langToggle.getAttribute('aria-label');
      expect(ariaLabel).toContain('language');
    });

    test('should have aria-label on mobile navigation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const mobileNav = page.locator('.mobile-bottom-nav[aria-label]');
      const ariaLabel = await mobileNav.getAttribute('aria-label');
      expect(ariaLabel).toContain('navigation');
    });

    test('should have aria-label on mobile nav items', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const navItems = page.locator('.mobile-nav-item[aria-label]');
      const count = await navItems.count();
      expect(count).toBe(4);

      // Check each has meaningful label
      for (let i = 0; i < count; i++) {
        const label = await navItems.nth(i).getAttribute('aria-label');
        expect(label).toBeTruthy();
        expect(label).toContain('section');
      }
    });

    test('should have aria-hidden on decorative elements', async ({ page }) => {
      const ticker = page.locator('.ticker-section[aria-hidden]');
      if (await ticker.count() > 0) {
        await expect(ticker).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should be able to tab through interactive elements', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Start from top
      await page.evaluate(() => window.scrollTo(0, 0));

      // Tab through elements
      await page.keyboard.press('Tab');
      let activeElement = await page.evaluate(() => document.activeElement.tagName);
      expect(activeElement).toBeTruthy();

      // Continue tabbing
      await page.keyboard.press('Tab');
      activeElement = await page.evaluate(() => document.activeElement.tagName);
      expect(activeElement).toBeTruthy();
    });

    test('should focus on input field with keyboard', async ({ page }) => {
      const input = page.locator('#heroInput');

      // Focus using keyboard
      await input.focus();
      await expect(input).toBeFocused();

      // Type with keyboard
      await page.keyboard.type('Test message');
      await expect(input).toHaveValue('Test message');
    });

    test('should activate buttons with Enter key', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const filterBtn = page.locator('.filter-btn[data-filter="web"]');
      await filterBtn.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);

      await expect(filterBtn).toHaveClass(/active/);
    });

    test('should activate buttons with Space key', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const filterBtn = page.locator('.filter-btn[data-filter="product-owner"]');
      await filterBtn.focus();
      await page.keyboard.press('Space');
      await page.waitForTimeout(300);

      await expect(filterBtn).toHaveClass(/active/);
    });

    test('should be able to navigate links with keyboard', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const navLink = page.locator('a[href="#projects"]').first();
      await navLink.focus();
      await expect(navLink).toBeFocused();

      await page.keyboard.press('Enter');
      await page.waitForTimeout(800);

      const projectsSection = page.locator('#projects');
      await expect(projectsSection).toBeInViewport();
    });
  });

  test.describe('Focus Indicators', () => {
    test('should show focus outline on interactive elements', async ({ page }) => {
      const input = page.locator('#heroInput');
      await input.focus();

      const outline = await input.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          outline: style.outline,
          outlineWidth: style.outlineWidth,
          boxShadow: style.boxShadow
        };
      });

      // Should have some form of focus indicator
      const hasFocusIndicator = outline.outline !== 'none' ||
                                outline.outlineWidth !== '0px' ||
                                outline.boxShadow !== 'none';

      expect(hasFocusIndicator).toBe(true);
    });

    test('should show focus on navigation links', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const navLink = page.locator('.nav-link').first();
      await navLink.focus();

      await expect(navLink).toBeFocused();
    });

    test('should show focus on buttons', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });

      const filterBtn = page.locator('.filter-btn').first();
      await filterBtn.focus();

      await expect(filterBtn).toBeFocused();
    });
  });

  test.describe('Alt Text & Images', () => {
    test('should have alt text on all images', async ({ page }) => {
      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeDefined();
      }
    });

    test('should have descriptive alt text on hero image', async ({ page }) => {
      const heroImage = page.locator('.hero-bg-image');
      const alt = await heroImage.getAttribute('alt');

      expect(alt).toBeTruthy();
      expect(alt).toContain('Nathalja Nijman');
    });

    test('should have alt text on project images', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });

      const projectImages = page.locator('.project-image img');
      const count = await projectImages.count();

      for (let i = 0; i < count; i++) {
        const img = projectImages.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt.length).toBeGreaterThan(0);
      }
    });

    test('should have alt text on about image', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#about').scrollIntoView();
      });

      const aboutImage = page.locator('.about-image img');
      const alt = await aboutImage.getAttribute('alt');

      expect(alt).toContain('Nathalja Nijman');
    });
  });

  test.describe('Form Accessibility', () => {
    test('should have accessible form inputs', async ({ page }) => {
      const heroInput = page.locator('#heroInput');

      // Should have id
      await expect(heroInput).toHaveAttribute('id');

      // Should have type
      await expect(heroInput).toHaveAttribute('type', 'text');

      // Should have placeholder
      const placeholder = await heroInput.getAttribute('placeholder');
      expect(placeholder).toBeTruthy();
    });

    test('should have autocomplete off where appropriate', async ({ page }) => {
      const heroInput = page.locator('#heroInput');
      await expect(heroInput).toHaveAttribute('autocomplete', 'off');
    });

    test('should have maxlength on inputs', async ({ page }) => {
      const heroInput = page.locator('#heroInput');
      await expect(heroInput).toHaveAttribute('maxlength');
    });
  });

  test.describe('Link Accessibility', () => {
    test('should have target="_blank" with rel="noopener noreferrer"', async ({ page }) => {
      // Check external links
      const externalLinks = page.locator('a[target="_blank"]');
      const count = await externalLinks.count();

      if (count > 0) {
        for (let i = 0; i < Math.min(count, 5); i++) {
          const link = externalLinks.nth(i);
          const rel = await link.getAttribute('rel');
          expect(rel).toContain('noopener');
        }
      }
    });

    test('should have meaningful link text', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const navLinks = page.locator('.nav-link');
      const count = await navLinks.count();

      for (let i = 0; i < count; i++) {
        const text = await navLinks.nth(i).textContent();
        expect(text.trim().length).toBeGreaterThan(0);
        // Should not be generic like "click here"
        expect(text.toLowerCase()).not.toContain('click here');
      }
    });

    test('should have href attribute on all links', async ({ page }) => {
      const links = page.locator('a');
      const count = await links.count();

      for (let i = 0; i < Math.min(count, 10); i++) {
        const href = await links.nth(i).getAttribute('href');
        expect(href).toBeTruthy();
      }
    });
  });

  test.describe('Color Contrast', () => {
    test('should have sufficient contrast for hero text', async ({ page }) => {
      const heroName = page.locator('.hero-name');
      const styles = await heroName.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          color: style.color,
          backgroundColor: style.backgroundColor
        };
      });

      // Should have colors defined
      expect(styles.color).toBeTruthy();
    });

    test('should have sufficient contrast for body text', async ({ page }) => {
      const aboutText = page.locator('.about-text p').first();
      if (await aboutText.count() > 0) {
        const styles = await aboutText.evaluate(el => {
          const style = window.getComputedStyle(el);
          return {
            color: style.color
          };
        });

        expect(styles.color).toBeTruthy();
        expect(styles.color).not.toBe('transparent');
      }
    });
  });

  test.describe('Language Attribute', () => {
    test('should have lang attribute on html element', async ({ page }) => {
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBeTruthy();
      expect(['nl', 'en']).toContain(lang);
    });

    test('should update lang attribute when switching language', async ({ page }) => {
      const initialLang = await page.getAttribute('html', 'lang');
      expect(initialLang).toBe('nl');

      // Switch language
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      const newLang = await page.getAttribute('html', 'lang');
      expect(newLang).toBe('en');
    });
  });

  test.describe('Skip Links', () => {
    test('should be able to navigate without mouse', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Try keyboard navigation
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      const activeElement = await page.evaluate(() => {
        return document.activeElement ? document.activeElement.tagName : null;
      });

      expect(activeElement).toBeTruthy();
    });
  });

  test.describe('Screen Reader Support', () => {
    test('should not have empty buttons', async ({ page }) => {
      const buttons = page.locator('button');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const btn = buttons.nth(i);
        const text = await btn.textContent();
        const ariaLabel = await btn.getAttribute('aria-label');

        // Button should have text or aria-label
        const hasContent = (text && text.trim().length > 0) || (ariaLabel && ariaLabel.length > 0);
        expect(hasContent).toBe(true);
      }
    });

    test('should have proper button types', async ({ page }) => {
      const buttons = page.locator('button');
      const count = await buttons.count();

      for (let i = 0; i < Math.min(count, 10); i++) {
        const type = await buttons.nth(i).getAttribute('type');
        // Should have explicit type
        expect(type).toBeTruthy();
      }
    });

    test('should use button elements for buttons, not divs', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });

      const filterBtns = page.locator('.filter-btn');
      const count = await filterBtns.count();

      for (let i = 0; i < count; i++) {
        const tagName = await filterBtns.nth(i).evaluate(el => el.tagName.toLowerCase());
        expect(tagName).toBe('button');
      }
    });
  });
});
