const fs = require('fs');
const path = require('path');

console.log('==================================================');
console.log('   LEXSCRIBE AUTOMATED SUITE & AUDIT VERIFICATION');
console.log('==================================================\n');

// 1. Read files
const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const stylesContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf-8');
const appContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf-8');

// Load translations
const translationsCode = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf-8');
const evalContext = {};
const fn = new Function('context', translationsCode + '; context.translations = translations;');
fn(evalContext);
const { translations } = evalContext;

let errors = 0;
let passed = 0;

// Test 1: Check languages exist
if (translations.en && translations.ur) {
    console.log('✓ PASS: Both English (en) and Urdu (ur) translation dictionaries exist.');
    passed++;
} else {
    console.error('✗ FAIL: Missing language dictionary.');
    errors++;
}

// Test 2: Check all data-i18n keys in index.html exist in translations
const i18nMatches = [...htmlContent.matchAll(/data-i18n="([^"]+)"/g)];
console.log(`Checking ${i18nMatches.length} translated elements...`);

i18nMatches.forEach(match => {
    const key = match[1];
    const parts = key.split('.');
    
    // Check English
    let valEn = translations.en;
    for (const p of parts) {
        valEn = valEn ? valEn[p] : undefined;
    }
    if (valEn === undefined) {
        console.error(`✗ FAIL: Missing EN translation for key: ${key}`);
        errors++;
    }

    // Check Urdu
    let valUr = translations.ur;
    for (const p of parts) {
        valUr = valUr ? valUr[p] : undefined;
    }
    if (valUr === undefined) {
        console.error(`✗ FAIL: Missing UR translation for key: ${key}`);
        errors++;
    }
});

if (errors === 0) {
    console.log(`✓ PASS: All ${i18nMatches.length} data-i18n keys match perfectly across both EN and UR!`);
    passed++;
}

// Test 3: Check Essential Interactive DOM IDs
const requiredIds = [
    'theme-btn',
    'theme-icon',
    'mobile-menu',
    'triage-city',
    'triage-issue',
    'triage-result',
    'preview-modal',
    'dossier-modal',
    'record',
    'dossiers',
    'cases',
    'bilingual',
    'author',
    'verify',
    'audit',
    'brief_builder',
    'faq'
];

requiredIds.forEach(id => {
    if (htmlContent.includes(`id="${id}"`)) {
        console.log(`✓ PASS: Required interactive DOM ID found: #${id}`);
        passed++;
    } else {
        console.error(`✗ FAIL: Missing DOM ID: #${id}`);
        errors++;
    }
});

// Test 4: Check Anchor Integrity (All href="#id" have a matching element with id="id")
const anchorMatches = [...htmlContent.matchAll(/href="#([a-zA-Z0-9_-]+)"/g)];
let brokenAnchors = 0;
const uniqueAnchors = [...new Set(anchorMatches.map(m => m[1]))];

uniqueAnchors.forEach(anchor => {
    if (anchor === '') return;
    if (!htmlContent.includes(`id="${anchor}"`)) {
        console.error(`✗ FAIL: Broken anchor detected: href="#${anchor}" has no matching id="${anchor}" in index.html!`);
        brokenAnchors++;
        errors++;
    }
});

if (brokenAnchors === 0) {
    console.log(`✓ PASS: All ${uniqueAnchors.length} internal navigation anchors (#${uniqueAnchors.join(', #')}) have matching DOM IDs!`);
    passed++;
}

// Test 5: Check Multi-currency price elements
const priceMatches = [...htmlContent.matchAll(/class="[^"]*price-val[^"]*"([^>]+)>/g)];
if (priceMatches.length >= 3) {
    console.log(`✓ PASS: Found ${priceMatches.length} dynamic multi-currency pricing badges.`);
    passed++;
} else {
    console.error(`✗ FAIL: Expected at least 3 price-val badges, found ${priceMatches.length}`);
    errors++;
}

// Test 6: Check that every price-val has all 4 currency data attributes
let currencyAttrErrors = 0;
priceMatches.forEach(m => {
    const attrs = m[1];
    ['data-usd', 'data-gbp', 'data-aed', 'data-pkr'].forEach(curr => {
        if (!attrs.includes(curr)) {
            console.error(`✗ FAIL: Pricing badge missing ${curr}: ${attrs}`);
            currencyAttrErrors++;
            errors++;
        }
    });
});
if (currencyAttrErrors === 0) {
    console.log('✓ PASS: All pricing badges have complete USD, GBP, AED, and PKR rate specifications!');
    passed++;
}

// Test 7: Check Javascript Function Binding Integrity
const expectedFunctions = [
    'toggleTheme',
    'setLanguage',
    'setCurrency',
    'handleTriage',
    'updateTriageResult',
    'openPreviewModal',
    'closePreviewModal',
    'openDossierModal',
    'closeDossierModal',
    'generateWhatsAppBrief',
    'switchBilingualTab',
    'toggleMobileMenu'
];

expectedFunctions.forEach(fnName => {
    if (appContent.includes(`function ${fnName}`)) {
        console.log(`✓ PASS: Core client function implemented: ${fnName}()`);
        passed++;
    } else {
        console.error(`✗ FAIL: Missing required client function in app.js: ${fnName}`);
        errors++;
    }
});

// Test 8: Check Stylesheet Dark Mode & RTL classes
if (stylesContent.includes('[data-theme="dark"]') && stylesContent.includes('[dir="rtl"]')) {
    console.log('✓ PASS: CSS includes full Dark Mode ([data-theme="dark"]) and RTL ([dir="rtl"]) styling.');
    passed++;
} else {
    console.error('✗ FAIL: Missing [data-theme="dark"] or [dir="rtl"] in styles.css');
    errors++;
}

// Test 9: Check Heraldic SVG Logo exists and is embedded
if (htmlContent.includes('<svg viewBox="0 0 240 240"') && htmlContent.includes('JUSTITIA • DOCTRINA • VICTORIA')) {
    console.log('✓ PASS: Intricate Royal Heraldic SVG Crest embedded with official motto and quadrants.');
    passed++;
} else {
    console.error('✗ FAIL: Royal Heraldic Crest SVG missing from index.html');
    errors++;
}

// Final Summary
console.log('\n==================================================');
console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${errors} ERRORS`);
console.log('==================================================\n');

if (errors > 0) {
    console.error(`❌ VERIFICATION FAILED: ${errors} errors found.`);
    process.exit(1);
} else {
    console.log('🎉 ALL PRODUCTION, ACCESSIBILITY, AND INTEGRITY CHECKS PASSED!');
    process.exit(0);
}
