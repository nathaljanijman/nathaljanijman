// Test Helper Functions for E2E Tests

/**
 * Wait for an element to be visible and stable
 */
export async function waitForElement(page, selector, timeout = 5000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
  // Wait a bit for animations to complete
  await page.waitForTimeout(300);
}

/**
 * Scroll to a section smoothly and wait for it
 */
export async function scrollToSection(page, sectionId) {
  await page.evaluate((id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, sectionId);
  await page.waitForTimeout(500); // Wait for smooth scroll
}

/**
 * Check if an element has an active class
 */
export async function hasActiveClass(page, selector) {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    return element ? element.classList.contains('active') : false;
  }, selector);
}

/**
 * Get current language from HTML lang attribute
 */
export async function getCurrentLanguage(page) {
  return await page.evaluate(() => document.documentElement.lang);
}

/**
 * Get translated text content
 */
export async function getTranslatedText(page, selector) {
  return await page.textContent(selector);
}

/**
 * Check if element is visible in viewport
 */
export async function isInViewport(page, selector) {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

/**
 * Count visible elements matching selector
 */
export async function countVisibleElements(page, selector) {
  return await page.evaluate((sel) => {
    const elements = document.querySelectorAll(sel);
    let count = 0;
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
        count++;
      }
    });
    return count;
  }, selector);
}

/**
 * Wait for animations to complete
 */
export async function waitForAnimations(page, timeout = 500) {
  await page.waitForTimeout(timeout);
}

/**
 * Get all ARIA labels from navigation
 */
export async function getAriaLabels(page, selector) {
  return await page.evaluate((sel) => {
    const elements = document.querySelectorAll(sel);
    return Array.from(elements).map(el => el.getAttribute('aria-label'));
  }, selector);
}

/**
 * Check if link opens in new tab
 */
export async function hasTargetBlank(page, selector) {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    return element ? element.getAttribute('target') === '_blank' : false;
  }, selector);
}

/**
 * Get viewport size
 */
export async function getViewportSize(page) {
  return await page.viewportSize();
}

/**
 * Set viewport to mobile
 */
export async function setMobileViewport(page) {
  await page.setViewportSize({ width: 375, height: 667 });
}

/**
 * Set viewport to desktop
 */
export async function setDesktopViewport(page) {
  await page.setViewportSize({ width: 1920, height: 1080 });
}

/**
 * Set viewport to tablet
 */
export async function setTabletViewport(page) {
  await page.setViewportSize({ width: 768, height: 1024 });
}
