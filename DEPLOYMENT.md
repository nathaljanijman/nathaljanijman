# 🚀 Deployment Checklist & Guide

## Waarom dit document?

Op 13 oktober 2025 hadden we meerdere productie issues:
- Language switching was niet geïmplementeerd
- Projects section was niet zichtbaar (ontbrekende JavaScript functies)
- Hero conversation had geen event listeners
- 48/227 tests faalden

Dit checklist voorkomt dat dit opnieuw gebeurt.

---

## ✅ Pre-Deployment Checklist

### 1. **Test Lokaal** (VERPLICHT)
```bash
# Start lokale server
python3 -m http.server 8000

# Open in browser: http://localhost:8000
# Test ALLE functionaliteit handmatig:
```

**Kritieke functionaliteit om te testen:**

- [ ] **Language Switching**
  - [ ] Header dropdown werkt (NL/EN)
  - [ ] Footer buttons werken
  - [ ] Content vertaalt correct
  - [ ] HTML lang attribute update

- [ ] **Projects Section**
  - [ ] Projects zijn zichtbaar
  - [ ] Filter buttons werken (Alle, Product Owner, Web, Ondernemerschap)
  - [ ] "Toon meer" button werkt
  - [ ] Hover effecten werken

- [ ] **Hero Conversation**
  - [ ] Input field werkt
  - [ ] Suggestion pills zijn klikbaar
  - [ ] Contact modal opent
  - [ ] WhatsApp link werkt
  - [ ] Email link werkt

- [ ] **Navigation**
  - [ ] Desktop header navigation werkt
  - [ ] Mobile bottom nav werkt
  - [ ] Smooth scrolling werkt
  - [ ] Active states updaten

- [ ] **Responsive Design**
  - [ ] Desktop (1920px) looks good
  - [ ] Tablet (768px) looks good
  - [ ] Mobile (375px) looks good

---

### 2. **Run Automated Tests**
```bash
# Run smoke tests (kritieke functionaliteit)
npm run test:smoke

# Run alle tests
npm test

# Als tests falen: FIX THEM FIRST!
```

---

### 3. **Code Quality Check**
```bash
# Run pre-deployment checks
npm run precheck

# Dit checkt:
# - Geen console.log in productie code
# - Kritieke functies bestaan
# - Code syntax errors
```

---

### 4. **Safe Deployment** (AANBEVOLEN)
```bash
# Dit runt alle checks + smoke tests + deploy
npm run deploy:safe
```

Of handmatig:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

---

## 🔍 GitHub Actions CI/CD

Elke push naar `main` triggert automatisch:

### **CI Pipeline** (.github/workflows/ci.yml)
- ✅ Run alle E2E tests
- ✅ Code quality checks
- ✅ Critical function checks
- ✅ Lint checks

**Pipeline faalt bij:**
- Tests falen
- console.log in productie code
- Ontbrekende kritieke functies

### **Daily Tests** (.github/workflows/daily-e2e-tests.yml)
- Runt dagelijks om 9:00 CET
- Vangt regressies op
- Stuurt notificaties bij falen

---

## 🛡️ Preventieve Maatregelen

### **JavaScript Function Checklist**

Zorg dat deze functies ALTIJD bestaan in `js/script.js`:
```javascript
✅ initNavigation()
✅ initScrollAnimations()
✅ initStatsCounter()
✅ initFormHandling()
✅ initSmoothScrolling()
✅ initDynamicViewport()
✅ initProjectFiltering()        // KRITIEK
✅ initProjectCardAnimations()
✅ initShowMoreProjects()
✅ initHeroConversation()        // KRITIEK
```

Zorg dat deze functies ALTIJD bestaan in `js/translations.js`:
```javascript
✅ switchLanguage()              // KRITIEK
✅ applyTranslations()
✅ updateLanguageToggle()
✅ updateFooterButtons()
```

---

## 🐛 Troubleshooting

### **"Projects niet zichtbaar"**
```bash
# Check of functies bestaan
grep -q "initProjectFiltering" js/script.js && echo "✅ OK" || echo "❌ MISSING"

# Check of projecten in HTML staan
grep -q "project-card" index.html && echo "✅ OK" || echo "❌ MISSING"
```

### **"Language switching werkt niet"**
```bash
# Check of functies bestaan
grep -q "switchLanguage" js/translations.js && echo "✅ OK" || echo "❌ MISSING"

# Check of event listeners attached worden
grep -q "attachEventListeners" js/translations.js && echo "✅ OK" || echo "❌ MISSING"
```

### **"Hero conversation werkt niet"**
```bash
# Check of functie bestaat
grep -q "initHeroConversation" js/script.js && echo "✅ OK" || echo "❌ MISSING"

# Check of modal bestaat
grep -q "contactChoiceModal" index.html && echo "✅ OK" || echo "❌ MISSING"
```

---

## 📊 Test Coverage

Current test suite:
- **227 total tests**
- **179 passing** (goal: 100%)
- **48 failing** (mostly visual regression - can be updated)

Critical tests (smoke tests):
- Basic page load
- Main sections visible
- No JavaScript errors
- Meta tags correct

---

## 🔄 Rollback Procedure

Als productie broken is:
```bash
# Find last working commit
git log --oneline -10

# Revert to working commit
git revert <commit-hash>
git push origin main

# Of hard reset (ONLY IF NECESSARY)
git reset --hard <commit-hash>
git push origin main --force
```

---

## 📝 Commit Message Format

```
Type: Brief description

Detailed explanation of changes

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types:**
- `Feature:` - New functionality
- `Fix:` - Bug fix
- `Refactor:` - Code improvement
- `Test:` - Test updates
- `Docs:` - Documentation
- `Style:` - CSS/design changes

---

## 🎯 Best Practices

1. **Test lokaal VOOR je commit**
2. **Run smoke tests VOOR je push**
3. **Check GitHub Actions status NA je push**
4. **Test productie NA deployment**
5. **Monitor errors (Google Analytics / Console)**

---

## 🚨 Emergency Contacts

**Als productie down is:**
1. Check GitHub Actions status
2. Check browser console errors
3. Rollback naar laatste werkende commit
4. Fix issue op branch
5. Test thoroughly
6. Deploy fix

---

## 📅 Maintenance Schedule

- **Daily:** Automated E2E tests (9:00 CET)
- **Weekly:** Review failing tests
- **Monthly:** Update dependencies
- **Quarterly:** Full audit & optimization

---

**Last Updated:** October 13, 2025
**Maintained By:** Nathalja Nijman + Claude Code
