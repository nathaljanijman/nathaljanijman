const { test, expect } = require('@playwright/test');

test.describe('Projects Filtering & Show More', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to projects section
    await page.evaluate(() => {
      document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(800);
  });

  test.describe('Projects Section Display', () => {
    test('should display projects section with header', async ({ page }) => {
      const projectsSection = page.locator('#projects');
      await expect(projectsSection).toBeVisible();

      const title = page.locator('[data-translate="projectsTitle"]');
      await expect(title).toBeVisible();
      await expect(title).toContainText('Geselecteerd werk');

      const subtitle = page.locator('.section-subtitle');
      await expect(subtitle).toBeVisible();
    });

    test('should display all visible project cards initially', async ({ page }) => {
      // Count visible project cards (not hidden-project)
      const visibleCards = page.locator('.project-card:not(.hidden-project)');
      const count = await visibleCards.count();

      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThanOrEqual(5);
    });

    test('should have hidden project cards', async ({ page }) => {
      const hiddenCards = page.locator('.project-card.hidden-project');
      const count = await hiddenCards.count();

      // There should be some hidden cards
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Project Filter Buttons', () => {
    test('should display all filter buttons', async ({ page }) => {
      const filters = page.locator('.filter-btn');
      await expect(filters).toHaveCount(4);

      const texts = await filters.allTextContents();
      expect(texts).toContain('Alle projecten');
      expect(texts).toContain('Product Owner');
      expect(texts).toContain('Web Apps');
      expect(texts).toContain('Ondernemerschap');
    });

    test('should have "All" filter active by default', async ({ page }) => {
      const allFilter = page.locator('.filter-btn[data-filter="all"]');
      await expect(allFilter).toHaveClass(/active/);
    });

    test('should switch active state when clicking filter', async ({ page }) => {
      const webFilter = page.locator('.filter-btn[data-filter="web"]');

      await webFilter.click();
      await page.waitForTimeout(500);

      await expect(webFilter).toHaveClass(/active/);

      // "All" should no longer be active
      const allFilter = page.locator('.filter-btn[data-filter="all"]');
      await expect(allFilter).not.toHaveClass(/active/);
    });

    test('should filter projects by Product Owner category', async ({ page }) => {
      const poFilter = page.locator('.filter-btn[data-filter="product-owner"]');
      await poFilter.click();
      await page.waitForTimeout(500);

      // Count visible PO projects
      const visiblePOCards = await page.evaluate(() => {
        const cards = document.querySelectorAll('.project-card[data-category="product-owner"]');
        let visibleCount = 0;
        cards.forEach(card => {
          const style = window.getComputedStyle(card);
          if (style.display !== 'none') visibleCount++;
        });
        return visibleCount;
      });

      expect(visiblePOCards).toBeGreaterThan(0);

      // Other categories should be hidden
      const visibleWebCards = await page.evaluate(() => {
        const cards = document.querySelectorAll('.project-card[data-category="web"]');
        let visibleCount = 0;
        cards.forEach(card => {
          const style = window.getComputedStyle(card);
          if (style.display !== 'none') visibleCount++;
        });
        return visibleCount;
      });

      expect(visibleWebCards).toBe(0);
    });

    test('should filter projects by Web category', async ({ page }) => {
      const webFilter = page.locator('.filter-btn[data-filter="web"]');
      await webFilter.click();
      await page.waitForTimeout(500);

      const visibleWebCards = await page.evaluate(() => {
        const cards = document.querySelectorAll('.project-card[data-category="web"]');
        let visibleCount = 0;
        cards.forEach(card => {
          const style = window.getComputedStyle(card);
          if (style.display !== 'none') visibleCount++;
        });
        return visibleCount;
      });

      expect(visibleWebCards).toBeGreaterThan(0);
    });

    test('should filter projects by Entrepreneurship category', async ({ page }) => {
      const entreFilter = page.locator('.filter-btn[data-filter="entrepreneurship"]');
      await entreFilter.click();
      await page.waitForTimeout(500);

      const visibleEntreCards = await page.evaluate(() => {
        const cards = document.querySelectorAll('.project-card[data-category="entrepreneurship"]');
        let visibleCount = 0;
        cards.forEach(card => {
          const style = window.getComputedStyle(card);
          if (style.display !== 'none') visibleCount++;
        });
        return visibleCount;
      });

      expect(visibleEntreCards).toBeGreaterThan(0);
    });

    test('should show all projects when clicking "All" filter', async ({ page }) => {
      // First filter to Web
      await page.click('.filter-btn[data-filter="web"]');
      await page.waitForTimeout(500);

      // Then click "All"
      await page.click('.filter-btn[data-filter="all"]');
      await page.waitForTimeout(500);

      // Count all visible project cards
      const visibleCards = await page.evaluate(() => {
        const cards = document.querySelectorAll('.project-card:not(.hidden-project)');
        let visibleCount = 0;
        cards.forEach(card => {
          const style = window.getComputedStyle(card);
          if (style.display !== 'none') visibleCount++;
        });
        return visibleCount;
      });

      expect(visibleCards).toBeGreaterThan(1);
    });
  });

  test.describe('Show More Projects Button', () => {
    test('should display show more button', async ({ page }) => {
      const showMoreBtn = page.locator('#showMoreProjects');
      await expect(showMoreBtn).toBeVisible();

      const btnText = page.locator('#showMoreProjects [data-translate="showMoreBtn"]');
      await expect(btnText).toContainText('Toon meer projecten');
    });

    test('should have chevron icon', async ({ page }) => {
      const showMoreBtn = page.locator('#showMoreProjects');
      const icon = showMoreBtn.locator('svg');

      await expect(icon).toBeVisible();
    });

    test('should reveal hidden projects when clicked', async ({ page }) => {
      // Count hidden projects before click
      const hiddenBefore = await page.evaluate(() => {
        const cards = document.querySelectorAll('.project-card.hidden-project');
        let hiddenCount = 0;
        cards.forEach(card => {
          const style = window.getComputedStyle(card);
          if (style.display === 'none') hiddenCount++;
        });
        return hiddenCount;
      });

      expect(hiddenBefore).toBeGreaterThan(0);

      // Click show more
      await page.click('#showMoreProjects');
      await page.waitForTimeout(800);

      // Count hidden projects after click
      const hiddenAfter = await page.evaluate(() => {
        const cards = document.querySelectorAll('.project-card.hidden-project');
        let hiddenCount = 0;
        cards.forEach(card => {
          const style = window.getComputedStyle(card);
          if (style.display === 'none') hiddenCount++;
        });
        return hiddenCount;
      });

      // Should have fewer hidden projects after clicking
      expect(hiddenAfter).toBeLessThan(hiddenBefore);
    });

    test('should change button text to "Show less" after expanding', async ({ page }) => {
      await page.click('#showMoreProjects');
      await page.waitForTimeout(800);

      const btnText = await page.locator('#showMoreProjects span').textContent();
      expect(btnText).toContain('minder'); // "Toon minder"
    });

    test('should rotate chevron icon when expanded', async ({ page }) => {
      const icon = page.locator('#showMoreProjects svg');

      // Click to expand
      await page.click('#showMoreProjects');
      await page.waitForTimeout(300);

      // Check if icon has rotation (check transform or class)
      const transform = await icon.evaluate(el => window.getComputedStyle(el).transform);

      // Should have some transform applied
      expect(transform).not.toBe('none');
    });

    test('should collapse projects when clicking "Show less"', async ({ page }) => {
      // Expand first
      await page.click('#showMoreProjects');
      await page.waitForTimeout(800);

      // Count visible projects when expanded
      const visibleExpanded = await page.evaluate(() => {
        const cards = document.querySelectorAll('.project-card');
        let visibleCount = 0;
        cards.forEach(card => {
          const style = window.getComputedStyle(card);
          if (style.display !== 'none') visibleCount++;
        });
        return visibleCount;
      });

      // Click again to collapse
      await page.click('#showMoreProjects');
      await page.waitForTimeout(800);

      // Count visible projects when collapsed
      const visibleCollapsed = await page.evaluate(() => {
        const cards = document.querySelectorAll('.project-card:not(.hidden-project)');
        let visibleCount = 0;
        cards.forEach(card => {
          const style = window.getComputedStyle(card);
          if (style.display !== 'none') visibleCount++;
        });
        return visibleCount;
      });

      expect(visibleCollapsed).toBeLessThan(visibleExpanded);
    });

    test('should update aria-expanded attribute', async ({ page }) => {
      const btn = page.locator('#showMoreProjects');

      // Initially collapsed
      await expect(btn).toHaveAttribute('aria-expanded', 'false');

      // Click to expand
      await btn.click();
      await page.waitForTimeout(300);

      // Should be expanded
      await expect(btn).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test.describe('Project Cards Content', () => {
    test('should display project card with all elements', async ({ page }) => {
      const firstCard = page.locator('.project-card').first();

      // Check image
      const image = firstCard.locator('.project-image img');
      await expect(image).toBeVisible();

      // Check title
      const title = firstCard.locator('h3');
      await expect(title).toBeVisible();

      // Check description
      const description = firstCard.locator('.project-info p').first();
      await expect(description).toBeVisible();

      // Check meta info
      const year = firstCard.locator('.project-year');
      await expect(year).toBeVisible();

      const type = firstCard.locator('.project-type');
      await expect(type).toBeVisible();
    });

    test('should display project tags', async ({ page }) => {
      const firstCard = page.locator('.project-card').first();
      const tags = firstCard.locator('.tag');

      const count = await tags.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display project impact metrics', async ({ page }) => {
      const firstCard = page.locator('.project-card').first();
      const impactItems = firstCard.locator('.impact-item');

      const count = await impactItems.count();
      expect(count).toBeGreaterThanOrEqual(2);

      // Check structure
      const number = impactItems.first().locator('.impact-number');
      await expect(number).toBeVisible();

      const text = impactItems.first().locator('.impact-text');
      await expect(text).toBeVisible();
    });

    test('should have external project links', async ({ page }) => {
      const links = page.locator('.project-link');
      const count = await links.count();

      if (count > 0) {
        const firstLink = links.first();
        // Should have target="_blank" for external links
        const href = await firstLink.getAttribute('href');
        expect(href).toBeTruthy();
      }
    });
  });

  test.describe('Project Filtering Animation', () => {
    test('should animate projects when filtering', async ({ page }) => {
      // Click filter
      await page.click('.filter-btn[data-filter="web"]');

      // Wait for animation
      await page.waitForTimeout(600);

      // Projects should be visible
      const webCards = page.locator('.project-card[data-category="web"]');
      const firstCard = webCards.first();
      await expect(firstCard).toBeVisible();
    });
  });

  test.describe('Projects Responsive Behavior', () => {
    test('should display projects correctly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();

      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const projectsGrid = page.locator('.projects-grid');
      await expect(projectsGrid).toBeVisible();

      const cards = page.locator('.project-card:not(.hidden-project)');
      const count = await cards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should have touch-friendly filter buttons on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const filterBtn = page.locator('.filter-btn').first();
      const box = await filterBtn.boundingBox();

      // Should be touch-friendly size
      expect(box.height).toBeGreaterThanOrEqual(40);
    });
  });

  test.describe('Projects Translation', () => {
    test('should translate project section when switching language', async ({ page }) => {
      // Scroll to footer and switch to English
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      // Scroll back to projects
      await page.evaluate(() => {
        document.querySelector('#projects').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const title = page.locator('[data-translate="projectsTitle"]');
      await expect(title).toContainText('Selected Work');

      const filterAll = page.locator('[data-translate="filterAll"]');
      await expect(filterAll).toContainText('All projects');
    });
  });
});
