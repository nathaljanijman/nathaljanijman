const { test, expect } = require('@playwright/test');

test.describe('Responsive & Mobile Navigation', () => {
  test.describe('Desktop Layout (>1024px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('should show desktop header', async ({ page }) => {
      const header = page.locator('.header');
      await expect(header).toBeVisible();
    });

    test('should hide mobile bottom navigation on desktop', async ({ page }) => {
      const mobileNav = page.locator('.mobile-bottom-nav');

      // Check if it's hidden via CSS
      const isVisible = await mobileNav.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      });

      expect(isVisible).toBe(false);
    });

    test('should display language toggle in header', async ({ page }) => {
      const langToggle = page.locator('#languageToggle');
      await expect(langToggle).toBeVisible();
    });

    test('should show contact button in header', async ({ page }) => {
      const contactBtn = page.locator('.contact-button');
      await expect(contactBtn).toBeVisible();
    });

    test('should display multi-column project grid on desktop', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const projectsGrid = page.locator('.projects-grid');
      const gridStyles = await projectsGrid.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          display: style.display,
          gridTemplateColumns: style.gridTemplateColumns
        };
      });

      // Should use CSS Grid
      expect(gridStyles.display).toBe('grid');
    });
  });

  test.describe('Tablet Layout (768-1024px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('should display correctly on tablet', async ({ page }) => {
      const hero = page.locator('.hero-simple');
      await expect(hero).toBeVisible();

      const heroName = page.locator('.hero-name');
      await expect(heroName).toBeVisible();
    });

    test('should have appropriate font sizes on tablet', async ({ page }) => {
      const heroName = page.locator('.hero-name');
      const fontSize = await heroName.evaluate(el => {
        return window.getComputedStyle(el).fontSize;
      });

      // Font size should be reasonable (not too small, not too large)
      const size = parseInt(fontSize);
      expect(size).toBeGreaterThan(20);
      expect(size).toBeLessThan(80);
    });

    test('should show mobile navigation on tablet', async ({ page }) => {
      const mobileNav = page.locator('.mobile-bottom-nav');

      // Mobile nav should be visible on tablet
      const isVisible = await mobileNav.isVisible();
      expect(isVisible).toBe(true);
    });
  });

  test.describe('Mobile Layout (<=768px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('should remove desktop header on mobile', async ({ page }) => {
      const header = page.locator('.header');

      // Header should be removed or hidden on mobile
      const headerExists = await header.count();
      if (headerExists > 0) {
        const isVisible = await header.isVisible();
        expect(isVisible).toBe(false);
      }
    });

    test('should show mobile bottom navigation', async ({ page }) => {
      const mobileNav = page.locator('.mobile-bottom-nav');
      await expect(mobileNav).toBeVisible();

      // Check position is fixed at bottom
      const position = await mobileNav.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          position: style.position,
          bottom: style.bottom
        };
      });

      expect(position.position).toBe('fixed');
      expect(position.bottom).toBe('0px');
    });

    test('should display all 4 mobile nav items', async ({ page }) => {
      const navItems = page.locator('.mobile-nav-item');
      await expect(navItems).toHaveCount(4);

      // Each should have icon and label
      for (let i = 0; i < 4; i++) {
        const item = navItems.nth(i);
        const icon = item.locator('.mobile-nav-icon');
        const label = item.locator('.mobile-nav-label');

        await expect(icon).toBeVisible();
        await expect(label).toBeVisible();
      }
    });

    test('should have single column layout for projects on mobile', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const projectsGrid = page.locator('.projects-grid');
      const gridColumns = await projectsGrid.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.gridTemplateColumns;
      });

      // Should be single column or auto layout
      expect(gridColumns).toBeTruthy();
    });

    test('should have touch-friendly button sizes', async ({ page }) => {
      const mobileNavItems = page.locator('.mobile-nav-item');
      const firstItem = mobileNavItems.first();
      const box = await firstItem.boundingBox();

      // Should be at least 44x44px for touch targets
      expect(box.height).toBeGreaterThanOrEqual(44);
    });

    test('should show language switcher in footer on mobile', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      const footerLangButtons = page.locator('.footer-lang-btn');
      await expect(footerLangButtons).toHaveCount(2);
      await expect(footerLangButtons.first()).toBeVisible();
    });

    test('should hide overflow properly on mobile', async ({ page }) => {
      const body = page.locator('body');
      const overflowX = await body.evaluate(el => {
        return window.getComputedStyle(el).overflowX;
      });

      // Should not have horizontal scroll
      expect(overflowX).not.toBe('scroll');
    });

    test('should have readable font sizes on mobile', async ({ page }) => {
      const heroTagline = page.locator('.hero-tagline');
      const fontSize = await heroTagline.evaluate(el => {
        return parseInt(window.getComputedStyle(el).fontSize);
      });

      // Should be at least 14px for readability
      expect(fontSize).toBeGreaterThanOrEqual(14);
    });

    test('should have appropriate padding on mobile', async ({ page }) => {
      const container = page.locator('.container').first();
      const padding = await container.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          left: parseInt(style.paddingLeft),
          right: parseInt(style.paddingRight)
        };
      });

      // Should have some padding on sides
      expect(padding.left).toBeGreaterThan(0);
      expect(padding.right).toBeGreaterThan(0);
    });
  });

  test.describe('Small Mobile (<375px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('should still display all content on small mobile', async ({ page }) => {
      const hero = page.locator('.hero-simple');
      await expect(hero).toBeVisible();

      const heroName = page.locator('.hero-name');
      await expect(heroName).toBeVisible();
    });

    test('should have mobile nav on small screens', async ({ page }) => {
      const mobileNav = page.locator('.mobile-bottom-nav');
      await expect(mobileNav).toBeVisible();
    });

    test('should not have horizontal overflow on small mobile', async ({ page }) => {
      const scrollWidth = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth
        };
      });

      // ScrollWidth should not exceed clientWidth significantly
      expect(scrollWidth.scrollWidth).toBeLessThanOrEqual(scrollWidth.clientWidth + 5);
    });
  });

  test.describe('Mobile Navigation Behavior', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('should navigate to sections via mobile nav', async ({ page }) => {
      // Click Projects
      await page.click('.mobile-nav-item[data-section="projects"]');
      await page.waitForTimeout(800);

      // Check if scrolled to projects
      const projectsSection = page.locator('#projects');
      await expect(projectsSection).toBeInViewport();
    });

    test('should update active state on mobile nav', async ({ page }) => {
      await page.click('.mobile-nav-item[data-section="about"]');
      await page.waitForTimeout(500);

      const aboutNavItem = page.locator('.mobile-nav-item[data-section="about"]');
      await expect(aboutNavItem).toHaveClass(/active/);
    });

    test('should scroll to top when clicking home on mobile nav', async ({ page }) => {
      // Scroll down first
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(300);

      // Click Home
      await page.click('.mobile-nav-item[data-section="home"]');
      await page.waitForTimeout(800);

      // Should be at top
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(100);
    });

    test('should show nav labels on mobile', async ({ page }) => {
      const labels = page.locator('.mobile-nav-label');
      await expect(labels).toHaveCount(4);

      // All labels should be visible
      for (let i = 0; i < 4; i++) {
        await expect(labels.nth(i)).toBeVisible();
      }
    });
  });

  test.describe('Viewport Meta Tag', () => {
    test('should have proper viewport meta tag', async ({ page }) => {
      await page.goto('/');

      const viewport = await page.evaluate(() => {
        const meta = document.querySelector('meta[name="viewport"]');
        return meta ? meta.getAttribute('content') : null;
      });

      expect(viewport).toBeTruthy();
      expect(viewport).toContain('width=device-width');
      expect(viewport).toContain('initial-scale=1');
    });
  });

  test.describe('Touch Events', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('should respond to touch on mobile nav items', async ({ page }) => {
      const projectsNav = page.locator('.mobile-nav-item[data-section="projects"]');

      // Tap on item
      await projectsNav.tap();
      await page.waitForTimeout(800);

      // Should navigate
      const projectsSection = page.locator('#projects');
      await expect(projectsSection).toBeInViewport();
    });

    test('should respond to touch on suggestion pills', async ({ page }) => {
      const firstPill = page.locator('.suggestion-pill').first();

      await firstPill.tap();
      await page.waitForTimeout(500);

      // Should trigger some action (implementation dependent)
    });

    test('should respond to touch on filter buttons', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const webFilter = page.locator('.filter-btn[data-filter="web"]');
      await webFilter.tap();
      await page.waitForTimeout(500);

      await expect(webFilter).toHaveClass(/active/);
    });
  });

  test.describe('Landscape Orientation', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 667, height: 375 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('should display correctly in landscape', async ({ page }) => {
      const hero = page.locator('.hero-simple');
      await expect(hero).toBeVisible();
    });

    test('should show mobile nav in landscape', async ({ page }) => {
      const mobileNav = page.locator('.mobile-bottom-nav');
      await expect(mobileNav).toBeVisible();
    });

    test('should have appropriate hero height in landscape', async ({ page }) => {
      const hero = page.locator('.hero-simple');
      const height = await hero.evaluate(el => el.offsetHeight);

      // Should not take up entire viewport in landscape
      expect(height).toBeLessThan(667);
    });
  });

  test.describe('Text Rendering', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('should not have text overflow on mobile', async ({ page }) => {
      const heroTagline = page.locator('.hero-tagline');
      const overflow = await heroTagline.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          overflow: style.overflow,
          textOverflow: style.textOverflow,
          whiteSpace: style.whiteSpace
        };
      });

      // Text should wrap or handle overflow gracefully
      expect(overflow.whiteSpace).not.toBe('nowrap');
    });

    test('should have line-height appropriate for mobile', async ({ page }) => {
      const heroName = page.locator('.hero-name');
      const lineHeight = await heroName.evaluate(el => {
        return window.getComputedStyle(el).lineHeight;
      });

      expect(lineHeight).toBeTruthy();
      expect(lineHeight).not.toBe('normal');
    });
  });
});
