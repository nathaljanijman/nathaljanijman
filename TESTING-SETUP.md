# E2E Testing Setup Guide

Instructiegids voor het instellen van de dagelijkse E2E tests met email notificaties.

## 📧 Email Notificaties Configureren

Om dagelijkse test resultaten per email te ontvangen, moet je GitHub Secrets configureren.

### Stap 1: Gmail App Password Aanmaken

Je hebt een Gmail-account nodig om emails te versturen. Gebruik **NOOIT** je normale wachtwoord - maak een app-specifiek wachtwoord aan.

#### A. 2-Step Verification Inschakelen

1. Ga naar [Google Account Security](https://myaccount.google.com/security)
2. Scroll naar "Signing in to Google"
3. Klik op "2-Step Verification"
4. Volg de stappen om 2-step verification in te schakelen

#### B. App Password Genereren

1. Ga terug naar [Google Account Security](https://myaccount.google.com/security)
2. Scroll naar "2-Step Verification"
3. Onderaan zie je "App passwords" - klik hierop
4. Bij "Select app" kies "Mail"
5. Bij "Select device" kies "Other" en typ "GitHub Actions"
6. Klik op "Generate"
7. **Kopieer het 16-karakter wachtwoord** (bijv: `abcd efgh ijkl mnop`)
8. Bewaar dit veilig - je kunt het maar één keer zien

### Stap 2: GitHub Secrets Toevoegen

1. Ga naar je GitHub repository
2. Klik op **Settings** → **Secrets and variables** → **Actions**
3. Klik op **New repository secret**

#### Secret 1: EMAIL_USERNAME

- **Name:** `EMAIL_USERNAME`
- **Value:** Je volledige Gmail adres (bijv. `jouw-email@gmail.com`)
- Klik op "Add secret"

#### Secret 2: EMAIL_PASSWORD

- **Name:** `EMAIL_PASSWORD`
- **Value:** Het 16-karakter app password dat je zojuist hebt gegenereerd
- **Belangrijk:** Gebruik het app password, NIET je normale Gmail wachtwoord
- Klik op "Add secret"

### Stap 3: Verificatie

Je secrets zijn nu geconfigureerd! Je kunt dit verifiëren:

1. Ga naar Settings → Secrets and variables → Actions
2. Je moet twee secrets zien:
   - `EMAIL_USERNAME`
   - `EMAIL_PASSWORD`

## ⏰ Workflow Schema

De workflow draait automatisch volgens dit schema:

- **Frequentie:** Dagelijks
- **Tijd:** 09:00 CET (07:00 UTC)
- **Cron expression:** `0 7 * * *`

### Tijdzone Opmerking

GitHub Actions gebruikt UTC tijd. Om 09:00 CET te krijgen:
- **Wintertijd (CET = UTC+1):** 07:00 UTC = 09:00 CET ✅ (huidige configuratie)
- **Zomertijd (CEST = UTC+2):** 07:00 UTC = 09:00 CEST ✅

Als je een andere tijd wilt:
- 08:00 CET → `0 6 * * *`
- 10:00 CET → `0 8 * * *`
- 12:00 CET → `0 10 * * *`

## 🚀 Handmatig Tests Draaien

Je kunt de workflow ook handmatig triggeren zonder te wachten op het schema:

1. Ga naar je repository op GitHub
2. Klik op **Actions** tab
3. Selecteer **Daily E2E Tests** in de linker sidebar
4. Klik op **Run workflow** (rechts)
5. Klik op de groene **Run workflow** button

Dit is handig voor:
- Testen van de email configuratie
- On-demand test runs
- Debugging

## 📬 Email Notificatie Inhoud

Na elke test run ontvang je een email met:

### Email Headers
- **Van:** Portfolio E2E Tests <jouw-email@gmail.com>
- **Aan:** nathaljanijman@hotmail.com
- **Onderwerp:** ✅/❌ Portfolio E2E Tests - PASSED/FAILED - 2025-01-13

### Email Body
- **Status indicator** (✅ PASSED of ❌ FAILED)
- **Test run details:**
  - Datum en tijd
  - Workflow naam
  - Branch
  - Run nummer
- **Test suite overzicht:**
  - Lijst van alle uitgevoerde test suites
- **Action button:**
  - "View Full Report on GitHub" → Directe link naar de GitHub Actions run
- **Tips en informatie:**
  - Artifacts retention (30 dagen)
  - Hoe de workflow te wijzigen

### Voorbeeld Email

```
🎭 Portfolio E2E Test Results
✅
PASSED

Test Run Details
📅 Date: 2025-01-13
⏰ Time: 09:00:15 CET
🔗 Workflow: Daily E2E Tests
🌿 Branch: main

📊 Test Status: success
🔢 Run Number: #42
💻 Runner: ubuntu-latest

What was tested?
✅ Navigation & Routing
✅ Language Switching (NL/EN)
✅ Hero Conversational Interface
✅ Project Filtering & Show More
✅ Contact Modal & Forms
✅ Responsive & Mobile Navigation
✅ Accessibility (A11y)
✅ Visual Regression Tests

[View Full Report on GitHub]

💡 Tip: Test artifacts including screenshots and detailed HTML reports are available in the GitHub Actions run for 30 days.
```

## 🔍 Troubleshooting

### Email wordt niet ontvangen

1. **Check spam folder** - Eerste keer kan email in spam terecht komen
2. **Verify secrets:**
   - Controleer of `EMAIL_USERNAME` en `EMAIL_PASSWORD` correct zijn ingesteld
   - Check of het app password juist is (16 karakters zonder spaties)
3. **Check workflow logs:**
   - Ga naar Actions → Daily E2E Tests → Select run
   - Kijk naar "Send email notification" step
   - Check voor error messages
4. **Gmail security:**
   - Zorg dat 2-Step Verification actief is
   - Gebruik een app-specifiek password
   - Check [Google Account Security](https://myaccount.google.com/security) voor blocked sign-in attempts

### Workflow draait niet

1. **Check cron schedule:**
   - Workflow draait om 07:00 UTC (09:00 CET)
   - GitHub Actions kan enkele minuten vertraging hebben
2. **Check workflow file:**
   - Verify `.github/workflows/daily-e2e-tests.yml` bestaat
   - Check of de syntax correct is (YAML formatting)
3. **Branch:**
   - Workflow draait alleen op de main/master branch (tenzij anders geconfigureerd)

### Tests falen

1. **Check test results:**
   - Ga naar Actions → Daily E2E Tests → Failed run
   - Download "playwright-report" artifact
   - Open `index.html` voor gedetailleerde resultaten
2. **Common issues:**
   - Server niet bereikbaar
   - Timeout errors (verhoog timeout in config)
   - Visual regression differences (update snapshots indien gewenst)
3. **Debug locally:**
   ```bash
   npm test
   npx playwright test --headed
   npx playwright test --debug
   ```

## 🔄 Email Adres Wijzigen

Om een ander email adres te gebruiken:

1. Open `.github/workflows/daily-e2e-tests.yml`
2. Zoek regel met `to: nathaljanijman@hotmail.com`
3. Wijzig naar gewenste email adres
4. Commit en push

## ⚙️ Workflow Aanpassen

### Andere Tijd

Edit `.github/workflows/daily-e2e-tests.yml`:

```yaml
schedule:
  - cron: '0 10 * * *'  # 10:00 UTC = 12:00 CET
```

### Andere Frequentie

```yaml
schedule:
  # Twice daily
  - cron: '0 7 * * *'   # 09:00 CET
  - cron: '0 16 * * *'  # 18:00 CET

  # Only weekdays
  - cron: '0 7 * * 1-5'  # Monday to Friday

  # Weekly (every Monday)
  - cron: '0 7 * * 1'
```

### Email Provider Wijzigen

Als je een andere email provider wilt gebruiken (niet Gmail):

Edit `.github/workflows/daily-e2e-tests.yml`:

```yaml
- name: Send email notification
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.jouw-provider.com
    server_port: 587
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    # ... rest blijft hetzelfde
```

**Populaire SMTP servers:**
- Gmail: `smtp.gmail.com:587`
- Outlook/Hotmail: `smtp-mail.outlook.com:587`
- Yahoo: `smtp.mail.yahoo.com:587`
- SendGrid: `smtp.sendgrid.net:587`

## 📝 Best Practices

1. **Gebruik app-specifieke passwords** - Nooit je echte wachtwoord
2. **Test handmatig eerst** - Gebruik "Run workflow" om email configuratie te testen
3. **Monitor spam folder** - Eerste keer kunnen emails in spam terechtkomen
4. **Check artifacts** - Download en bekijk test reports voor details
5. **Keep secrets updated** - Vernieuw app passwords periodiek
6. **Document changes** - Noteer wijzigingen in workflow of schema

## ✅ Checklist Setup

- [ ] Gmail app password aangemaakt
- [ ] `EMAIL_USERNAME` secret toegevoegd in GitHub
- [ ] `EMAIL_PASSWORD` secret toegevoegd in GitHub
- [ ] Workflow handmatig getest via "Run workflow"
- [ ] Test email ontvangen (check spam!)
- [ ] Email komt goed door in inbox (niet spam)
- [ ] Email opmaak ziet er goed uit
- [ ] Links in email werken
- [ ] Artifacts zijn beschikbaar in GitHub Actions
- [ ] Cron schedule is correct voor gewenste tijd

## 📞 Hulp Nodig?

- **GitHub Secrets:** [GitHub Docs - Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- **Gmail App Passwords:** [Google Support](https://support.google.com/accounts/answer/185833)
- **Playwright Docs:** [playwright.dev](https://playwright.dev)
- **GitHub Actions Cron:** [Crontab.guru](https://crontab.guru)

---

**Setup Datum:** 2025-01-13
**Email Ontvanger:** nathaljanijman@hotmail.com
**Test Tijd:** Dagelijks om 09:00 CET
