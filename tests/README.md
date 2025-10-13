# E2E Test Suite - Portfolio Website

Comprehensive end-to-end test suite for the Nathalja Nijman portfolio website using Playwright.

## 📋 Test Coverage

### Test Suites

1. **Navigation & Routing** (`tests/e2e/navigation.spec.js`)
   - Desktop header navigation
   - Mobile bottom navigation
   - Footer links
   - Portfolio sticker link
   - Smooth scrolling
   - ARIA labels

2. **Language Switching** (`tests/e2e/language-switching.spec.js`)
   - Header language toggle dropdown
   - Footer language buttons
   - Language synchronization between header and footer
   - Content translation (NL/EN)
   - HTML lang attribute updates
   - Language persistence

3. **Hero Interface** (`tests/e2e/hero-interface.spec.js`)
   - Hero section display
   - Input form functionality
   - Suggestion pills
   - Portfolio sticker
   - Responsive behavior
   - Accessibility

4. **Project Filtering** (`tests/e2e/projects-filtering.spec.js`)
   - Filter buttons (All, Product Owner, Web, Entrepreneurship)
   - Show more/less functionality
   - Project card content
   - Filtering animations
   - Translation

5. **Contact Modal** (`tests/e2e/contact-modal.spec.js`)
   - Contact section cards
   - Contact choice modal
   - Conversational dialogue interface
   - Response screens
   - Form validation
   - Link validation

6. **Responsive & Mobile** (`tests/e2e/responsive-mobile.spec.js`)
   - Desktop layout (>1024px)
   - Tablet layout (768-1024px)
   - Mobile layout (≤768px)
   - Small mobile (<375px)
   - Touch events
   - Landscape orientation

7. **Accessibility** (`tests/e2e/accessibility.spec.js`)
   - Semantic HTML
   - ARIA labels and attributes
   - Keyboard navigation
   - Focus indicators
   - Alt text on images
   - Form accessibility
   - Color contrast
   - Screen reader support

8. **Visual Regression** (`tests/e2e/visual-regression.spec.js`)
   - Hero section screenshots (desktop, mobile, tablet)
   - Navigation screenshots
   - Projects section screenshots
   - Contact section screenshots
   - About section screenshots
   - Footer screenshots
   - Full page screenshots (NL/EN)
   - Interactive states

## 🚀 Running Tests

### Prerequisites

```bash
npm install
npx playwright install
```

### Run All Tests

```bash
npm test
# or
npx playwright test
```

### Run Specific Test Suite

```bash
npx playwright test tests/e2e/navigation.spec.js
npx playwright test tests/e2e/language-switching.spec.js
```

### Run Tests in UI Mode

```bash
npx playwright test --ui
```

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### Run Tests on Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debug Tests

```bash
npx playwright test --debug
```

## 📊 Test Reports

### View HTML Report

```bash
npx playwright show-report
```

The HTML report includes:
- Test results overview
- Screenshots on failure
- Trace files
- Video recordings (if enabled)

### View Test Results in CI

Test reports are automatically uploaded to GitHub Actions artifacts and retained for 30 days.

## ⏰ Scheduled Tests

Tests run automatically every day at 9:00 AM CET via GitHub Actions.

### Workflow: `.github/workflows/daily-e2e-tests.yml`

**Features:**
- Runs daily at 9:00 AM CET
- Can be manually triggered
- Uploads test reports and results as artifacts
- Sends email notifications to nathaljanijman@hotmail.com with:
  - Test status (✅ PASSED / ❌ FAILED)
  - Date and time
  - Link to full report
  - Summary of test suites

### Email Notification Setup

To receive email notifications, configure GitHub Secrets:

1. Go to repository Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `EMAIL_USERNAME`: Your Gmail address (e.g., your-email@gmail.com)
   - `EMAIL_PASSWORD`: App-specific password (see setup below)

#### Gmail App Password Setup

1. Enable 2-Step Verification on your Google account
2. Go to Google Account → Security → 2-Step Verification
3. Scroll to "App passwords" and click
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Add it as `EMAIL_PASSWORD` secret in GitHub

**Note:** Use an app-specific password, never your main Gmail password.

## 🏗️ Test Structure

```
tests/
├── e2e/
│   ├── navigation.spec.js           # Navigation tests
│   ├── language-switching.spec.js   # i18n tests
│   ├── hero-interface.spec.js       # Hero section tests
│   ├── projects-filtering.spec.js   # Project filtering tests
│   ├── contact-modal.spec.js        # Contact modal tests
│   ├── responsive-mobile.spec.js    # Responsive design tests
│   ├── accessibility.spec.js        # A11y tests
│   └── visual-regression.spec.js    # Visual regression tests
├── fixtures/
│   └── translations.json            # Translation test data
├── helpers/
│   └── test-helpers.js              # Reusable test utilities
└── README.md                        # This file
```

## 🛠️ Helper Functions

Located in `tests/helpers/test-helpers.js`:

- `waitForElement()` - Wait for element to be visible and stable
- `scrollToSection()` - Smooth scroll to a section
- `hasActiveClass()` - Check if element has active class
- `getCurrentLanguage()` - Get current language from HTML lang attribute
- `getTranslatedText()` - Get translated text content
- `isInViewport()` - Check if element is in viewport
- `countVisibleElements()` - Count visible elements
- `waitForAnimations()` - Wait for animations to complete
- `getAriaLabels()` - Get ARIA labels
- `hasTargetBlank()` - Check if link opens in new tab
- `setMobileViewport()` - Set viewport to mobile size
- `setDesktopViewport()` - Set viewport to desktop size
- `setTabletViewport()` - Set viewport to tablet size

## 📝 Configuration

Test configuration is in `playwright.config.js`:

- **Base URL**: `http://localhost:8080`
- **Web Server**: Python http.server
- **Timeout**: Default Playwright timeout
- **Retries**: 2 in CI, 0 locally
- **Reporter**: HTML
- **Browsers**: Chromium (Desktop Chrome)

## 🐛 Debugging Tips

### Failed Test?

1. Check the HTML report: `npx playwright show-report`
2. Look at screenshots in `test-results/`
3. Run test in headed mode: `npx playwright test --headed`
4. Use debug mode: `npx playwright test --debug`

### Visual Regression Failures?

1. Review screenshot diffs in the HTML report
2. Update baseline if change is intentional:
   ```bash
   npx playwright test --update-snapshots
   ```

### Flaky Tests?

1. Increase timeout if needed
2. Add explicit waits: `await page.waitForTimeout(500)`
3. Wait for network idle: `await page.waitForLoadState('networkidle')`
4. Use proper selectors (data-testid, role, etc.)

## 📦 Dependencies

- `@playwright/test` - E2E testing framework
- `playwright` - Browser automation

## 🔄 CI/CD Integration

### GitHub Actions

The workflow runs:
1. Install dependencies
2. Install Playwright browsers
3. Run all tests
4. Upload reports and artifacts
5. Send email notification
6. Create summary

### Manual Trigger

You can manually trigger the workflow:
1. Go to Actions tab
2. Select "Daily E2E Tests"
3. Click "Run workflow"

## 📧 Email Notifications

After each test run, an email is sent to `nathaljanijman@hotmail.com` with:

- ✅/❌ Status indicator
- Test run details (date, time, branch)
- List of test suites executed
- Link to full GitHub Actions report
- Artifacts retention notice (30 days)

## 🎯 Best Practices

1. **Keep tests independent** - Each test should run independently
2. **Use proper selectors** - Prefer data-testid, role, aria-label over CSS classes
3. **Wait for elements** - Always wait for elements before interacting
4. **Clean test data** - Reset state between tests if needed
5. **Use test helpers** - Reuse common functions from helpers
6. **Add meaningful descriptions** - Test names should clearly describe what is tested
7. **Keep tests maintainable** - Don't duplicate code, use Page Object Model if needed

## 📞 Support

For issues or questions about the test suite:
- Check GitHub Actions logs
- Review test reports in artifacts
- Contact: nathaljanijman@hotmail.com

---

**Last Updated:** 2025-01-13
**Test Framework:** Playwright
**Node Version:** 20+
