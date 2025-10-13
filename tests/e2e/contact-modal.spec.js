const { test, expect } = require('@playwright/test');

test.describe('Contact Modal & Forms', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Contact Section', () => {
    test('should display contact section with all cards', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeVisible();

      const title = page.locator('[data-translate="contactTitle"]');
      await expect(title).toBeVisible();
      await expect(title).toContainText('Klaar voor de volgende stap');
    });

    test('should display three contact option cards', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const cards = page.locator('.contact-option-card');
      await expect(cards).toHaveCount(3);
    });

    test('should have WhatsApp contact card', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const whatsappCard = page.locator('.contact-option-card.whatsapp');
      await expect(whatsappCard).toBeVisible();
      await expect(whatsappCard).toContainText('WhatsApp');

      // Should have link to WhatsApp
      const href = await whatsappCard.getAttribute('href');
      expect(href).toContain('wa.me');
      expect(href).toContain('31657591440');
    });

    test('should have Email contact card', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const emailCard = page.locator('.contact-option-card.email');
      await expect(emailCard).toBeVisible();
      await expect(emailCard).toContainText('Email');

      const href = await emailCard.getAttribute('href');
      expect(href).toContain('mailto:nathaljanijman@hotmail.com');
    });

    test('should have LinkedIn contact card', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const linkedinCard = page.locator('.contact-option-card.linkedin');
      await expect(linkedinCard).toBeVisible();
      await expect(linkedinCard).toContainText('LinkedIn');

      const href = await linkedinCard.getAttribute('href');
      expect(href).toContain('linkedin.com');

      // Should open in new tab
      await expect(linkedinCard).toHaveAttribute('target', '_blank');
    });

    test('should display response time for each option', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const responseTimes = page.locator('.contact-option-card .response-time');
      await expect(responseTimes).toHaveCount(3);

      // Check content exists
      const firstTime = await responseTimes.first().textContent();
      expect(firstTime).toBeTruthy();
    });
  });

  test.describe('Contact Choice Modal', () => {
    test('should have contact choice modal in DOM', async ({ page }) => {
      const modal = page.locator('#contactChoiceModal');
      await expect(modal).toBeAttached();
    });

    test('should display modal elements', async ({ page }) => {
      const modal = page.locator('#contactChoiceModal');

      // Check modal structure
      const modalContent = modal.locator('.modal-content');
      await expect(modalContent).toBeAttached();

      const backdrop = modal.locator('.modal-backdrop');
      await expect(backdrop).toBeAttached();

      const closeBtn = modal.locator('#modalClose');
      await expect(closeBtn).toBeAttached();
    });

    test('should have modal avatar', async ({ page }) => {
      const modal = page.locator('#contactChoiceModal');
      const avatar = modal.locator('.modal-avatar img');

      await expect(avatar).toBeAttached();
      const src = await avatar.getAttribute('src');
      expect(src).toContain('nathalja-about.jpg');
    });

    test('should have status indicator', async ({ page }) => {
      const modal = page.locator('#contactChoiceModal');
      const indicator = modal.locator('.status-indicator');

      await expect(indicator).toBeAttached();
    });

    test('should display three contact options in modal', async ({ page }) => {
      const modal = page.locator('#contactChoiceModal');
      const options = modal.locator('.contact-option');

      await expect(options).toHaveCount(3);
    });

    test('should have WhatsApp option in modal', async ({ page }) => {
      const modal = page.locator('#contactChoiceModal');
      const whatsappOption = modal.locator('#chooseWhatsApp');

      await expect(whatsappOption).toBeAttached();
      await expect(whatsappOption).toContainText('Whatsapp chat');
      await expect(whatsappOption).toContainText('Direct en persoonlijk bespreken');
    });

    test('should have Email option in modal', async ({ page }) => {
      const modal = page.locator('#contactChoiceModal');
      const emailOption = modal.locator('#chooseEmail');

      await expect(emailOption).toBeAttached();
      await expect(emailOption).toContainText('Email contact');
      await expect(emailOption).toContainText('Stuur me alle details');
    });

    test('should have Chat Continue option (disabled) in modal', async ({ page }) => {
      const modal = page.locator('#contactChoiceModal');
      const chatOption = modal.locator('#chooseChatContinue');

      await expect(chatOption).toBeAttached();
      await expect(chatOption).toBeDisabled();
      await expect(chatOption).toContainText('Direct doorpakken');
      await expect(chatOption).toContainText('Binnenkort beschikbaar');
    });

    test('should show response times for each modal option', async ({ page }) => {
      const modal = page.locator('#contactChoiceModal');
      const responseTimes = modal.locator('.response-time');

      await expect(responseTimes).toHaveCount(3);

      const texts = await responseTimes.allTextContents();
      expect(texts[0]).toContain('uur'); // "binnen 2 uur"
      expect(texts[1]).toContain('uur'); // "binnen 24 uur"
    });

    test('should have close button', async ({ page }) => {
      const modal = page.locator('#contactChoiceModal');
      const closeBtn = modal.locator('#modalClose');

      await expect(closeBtn).toBeAttached();
      await expect(closeBtn).toContainText('×');
    });

    test('should have user message preview area', async ({ page }) => {
      const modal = page.locator('#contactChoiceModal');
      const preview = modal.locator('.user-message-preview');

      await expect(preview).toBeAttached();
    });

    test('should have modal footer', async ({ page }) => {
      const modal = page.locator('#contactChoiceModal');
      const footer = modal.locator('.modal-footer');

      await expect(footer).toBeAttached();
      await expect(footer).toContainText('Kies de manier die het beste bij je past');
    });
  });

  test.describe('Conversational Dialogue Interface', () => {
    test('should have conversation dialogue in DOM', async ({ page }) => {
      const dialogue = page.locator('#conversationDialogue');
      await expect(dialogue).toBeAttached();
    });

    test('should have dialogue header elements', async ({ page }) => {
      const dialogue = page.locator('#conversationDialogue');

      const avatar = dialogue.locator('.dialogue-avatar img');
      await expect(avatar).toBeAttached();

      const greeting = dialogue.locator('.dialogue-greeting');
      await expect(greeting).toBeAttached();

      const closeBtn = dialogue.locator('#closeDialogue');
      await expect(closeBtn).toBeAttached();
    });

    test('should have main screen with chat interface', async ({ page }) => {
      const dialogue = page.locator('#conversationDialogue');
      const mainScreen = dialogue.locator('#mainScreen');

      await expect(mainScreen).toBeAttached();

      const chatConversation = mainScreen.locator('#chatConversation');
      await expect(chatConversation).toBeAttached();

      const chatForm = mainScreen.locator('#chatForm');
      await expect(chatForm).toBeAttached();
    });

    test('should have initial Nathalja message', async ({ page }) => {
      const dialogue = page.locator('#conversationDialogue');
      const initialMessage = dialogue.locator('.chat-message.nathalja-message');

      await expect(initialMessage).toBeAttached();
      await expect(initialMessage).toContainText('Hey! Waar kan ik je mee helpen');
    });

    test('should have chat input field', async ({ page }) => {
      const dialogue = page.locator('#conversationDialogue');
      const input = dialogue.locator('#chatInput');

      await expect(input).toBeAttached();
      await expect(input).toHaveAttribute('type', 'text');
      await expect(input).toHaveAttribute('maxlength', '500');

      const placeholder = await input.getAttribute('placeholder');
      expect(placeholder).toContain('Type je bericht');
    });

    test('should have send button in chat', async ({ page }) => {
      const dialogue = page.locator('#conversationDialogue');
      const sendBtn = dialogue.locator('#sendButton');

      await expect(sendBtn).toBeAttached();
      await expect(sendBtn).toHaveAttribute('type', 'submit');
    });

    test('should have quick suggestions', async ({ page }) => {
      const dialogue = page.locator('#conversationDialogue');
      const suggestions = dialogue.locator('#quickSuggestions');

      await expect(suggestions).toBeAttached();

      const chips = suggestions.locator('.suggestion-chip');
      await expect(chips).toHaveCount(4);

      const texts = await chips.allTextContents();
      expect(texts).toContain('Over jou');
      expect(texts).toContain('Contact');
      expect(texts).toContain('Project bespreken');
      expect(texts).toContain('Tarieven');
    });

    test('should have typing indicator', async ({ page }) => {
      const dialogue = page.locator('#conversationDialogue');
      const typingIndicator = dialogue.locator('#typingIndicator');

      await expect(typingIndicator).toBeAttached();

      // Should have 3 dots
      const dots = typingIndicator.locator('.typing-dots span');
      await expect(dots).toHaveCount(3);
    });
  });

  test.describe('Response Screens', () => {
    test('should have About screen', async ({ page }) => {
      const aboutScreen = page.locator('#aboutScreen');
      await expect(aboutScreen).toBeAttached();
      await expect(aboutScreen).toContainText('Nathalja Nijman');
      await expect(aboutScreen).toContainText('Product Owner');
    });

    test('should have Contact screen', async ({ page }) => {
      const contactScreen = page.locator('#contactScreen');
      await expect(contactScreen).toBeAttached();

      // Check for email link
      const emailLink = contactScreen.locator('a[href*="mailto"]');
      await expect(emailLink).toBeAttached();

      // Check for LinkedIn link
      const linkedinLink = contactScreen.locator('a[href*="linkedin"]');
      await expect(linkedinLink).toBeAttached();
    });

    test('should have Project screen with form', async ({ page }) => {
      const projectScreen = page.locator('#projectScreen');
      await expect(projectScreen).toBeAttached();

      const form = projectScreen.locator('#projectForm');
      await expect(form).toBeAttached();

      // Check form fields
      const nameField = form.locator('#projectName');
      await expect(nameField).toBeAttached();

      const emailField = form.locator('#projectEmail');
      await expect(emailField).toBeAttached();

      const typeField = form.locator('#projectType');
      await expect(typeField).toBeAttached();

      const descField = form.locator('#projectDescription');
      await expect(descField).toBeAttached();
    });

    test('should have Expertise screen', async ({ page }) => {
      const expertiseScreen = page.locator('#expertiseScreen');
      await expect(expertiseScreen).toBeAttached();

      const expertiseItems = expertiseScreen.locator('.expertise-item');
      await expect(expertiseItems).toHaveCount(4);
    });

    test('should have Rates screen', async ({ page }) => {
      const ratesScreen = page.locator('#ratesScreen');
      await expect(ratesScreen).toBeAttached();

      const rateItems = ratesScreen.locator('.rate-item');
      await expect(rateItems).toHaveCount(3);

      // Check for pricing info
      await expect(ratesScreen).toContainText('€');
    });
  });

  test.describe('Contact Links Validation', () => {
    test('should have correct WhatsApp link format', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const whatsappCard = page.locator('.contact-option-card.whatsapp');
      const href = await whatsappCard.getAttribute('href');

      expect(href).toMatch(/https:\/\/wa\.me\/\d+/);
    });

    test('should have correct email format', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });

      const emailCard = page.locator('.contact-option-card.email');
      const href = await emailCard.getAttribute('href');

      expect(href).toMatch(/mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    });

    test('should have valid LinkedIn URL', async ({ page }) => {
      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });

      const linkedinCard = page.locator('.contact-option-card.linkedin');
      const href = await linkedinCard.getAttribute('href');

      expect(href).toMatch(/https:\/\/linkedin\.com\//);
    });
  });

  test.describe('Contact Section Responsive', () => {
    test('should display contact cards correctly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();

      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const cards = page.locator('.contact-option-card');
      await expect(cards).toHaveCount(3);

      // Check if cards are stacked vertically on mobile
      const firstCard = cards.first();
      await expect(firstCard).toBeVisible();
    });

    test('should have touch-friendly contact cards on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const firstCard = page.locator('.contact-option-card').first();
      const box = await firstCard.boundingBox();

      // Should be large enough for touch
      expect(box.height).toBeGreaterThanOrEqual(60);
    });
  });

  test.describe('Contact Translation', () => {
    test('should translate contact section when switching language', async ({ page }) => {
      // Switch to English
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.click('.footer-lang-btn[data-lang="en"]');
      await page.waitForTimeout(500);

      // Scroll to contact
      await page.evaluate(() => {
        document.querySelector('#contact').scrollIntoView();
      });
      await page.waitForTimeout(500);

      const title = page.locator('[data-translate="contactTitle"]');
      const text = await title.textContent();

      // Should be in English
      expect(text).not.toContain('Klaar voor de volgende stap');
    });
  });
});
