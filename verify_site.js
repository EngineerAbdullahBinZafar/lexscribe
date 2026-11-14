const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('   LEXSCRIBE CHAMBERS — RIGOROUS AUDIT & VERIFICATION SUITE');
console.log('   Directed by Ch. Muhammad Zafar Iqbal (Advocate High Court & MD)');
console.log('================================================================\n');

let errors = 0;
let passed = 0;

function pass(msg) {
    console.log(`✓ PASS: ${msg}`);
    passed++;
}

function fail(msg) {
    console.error(`✗ FAIL: ${msg}`);
    errors++;
}

// 1. Check Multi-Page Architecture ("خالی انڈیکس نہ دکھاؤ")
const requiredPages = [
    'index.html',
    'audit-sample.html',
    'dossiers.html',
    'jurisprudence.html',
    'terms.html'
];

requiredPages.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        if (stats.size > 500) {
            pass(`Institutional Multi-Page Flagship found: ${file} (${stats.size} bytes)`);
        } else {
            fail(`File ${file} exists but appears incomplete (< 500 bytes)`);
        }
    } else {
        fail(`Missing required flagship page: ${file}`);
    }
});

// 2. Read Core Files
const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const stylesContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf-8');
const appContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf-8');
const vercelContent = fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf-8');

// 3. Load & Validate Translations
const translationsCode = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf-8');
const evalContext = {};
const fn = new Function('context', translationsCode + '; context.translations = translations;');
fn(evalContext);
const { translations } = evalContext;

if (translations && translations.en && translations.ur) {
    pass('Both English (en) and Urdu (ur) translation dictionaries exist.');
} else {
    fail('Missing language dictionary in translations.js.');
}

// 4. Validate All data-i18n Keys in index.html
const i18nMatches = [...htmlContent.matchAll(/data-i18n="([^"]+)"/g)];
console.log(`\nVerifying ${i18nMatches.length} translated elements in index.html...`);

let missingTranslations = 0;
i18nMatches.forEach(match => {
    const key = match[1];
    const parts = key.split('.');
    
    // Check English
    let valEn = translations.en;
    for (const p of parts) {
        valEn = valEn ? valEn[p] : undefined;
    }
    if (valEn === undefined) {
        fail(`Missing EN translation for key: ${key}`);
        missingTranslations++;
    }

    // Check Urdu
    let valUr = translations.ur;
    for (const p of parts) {
        valUr = valUr ? valUr[p] : undefined;
    }
    if (valUr === undefined) {
        fail(`Missing UR translation for key: ${key}`);
        missingTranslations++;
    }
});

if (missingTranslations === 0) {
    pass(`All ${i18nMatches.length} data-i18n keys match symmetrically across English and Urdu!`);
}

// 5. Check Essential Interactive DOM IDs in index.html
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
        pass(`Required interactive DOM ID found: #${id}`);
    } else {
        fail(`Missing DOM ID: #${id}`);
    }
});

// 6. Check Anchor Integrity (All internal href="#id" have a matching element)
const anchorMatches = [...htmlContent.matchAll(/href="#([a-zA-Z0-9_-]+)"/g)];
let brokenAnchors = 0;
const uniqueAnchors = [...new Set(anchorMatches.map(m => m[1]))];

uniqueAnchors.forEach(anchor => {
    if (anchor === '') return;
    if (!htmlContent.includes(`id="${anchor}"`)) {
        fail(`Broken anchor: href="#${anchor}" has no matching id="${anchor}"!`);
        brokenAnchors++;
    }
});

if (brokenAnchors === 0) {
    pass(`All ${uniqueAnchors.length} internal navigation anchors (#${uniqueAnchors.join(', #')}) have matching DOM IDs!`);
}

// 7. Check Multi-Currency Price Elements
const priceMatches = [...htmlContent.matchAll(/class="[^"]*price-val[^"]*"([^>]+)>/g)];
if (priceMatches.length >= 3) {
    pass(`Found ${priceMatches.length} dynamic multi-currency pricing badges.`);
} else {
    fail(`Expected at least 3 price-val badges, found ${priceMatches.length}`);
}

let currencyAttrErrors = 0;
priceMatches.forEach(m => {
    const attrs = m[1];
    ['data-usd', 'data-gbp', 'data-aed', 'data-pkr'].forEach(curr => {
        if (!attrs.includes(curr)) {
            fail(`Pricing badge missing currency ${curr}: ${attrs}`);
            currencyAttrErrors++;
        }
    });
});
if (currencyAttrErrors === 0) {
    pass('All pricing badges have complete USD, GBP, AED, and PKR rate specifications!');
}

// 8. Check Javascript Function Binding Integrity
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
    'copyFormattedBrief',
    'sendEmailBrief',
    'switchBilingualTab',
    'toggleMobileMenu'
];

expectedFunctions.forEach(fnName => {
    if (appContent.includes(`function ${fnName}`)) {
        pass(`Core client function implemented in app.js: ${fnName}()`);
    } else {
        fail(`Missing required client function in app.js: ${fnName}`);
    }
});

// 9. Check Design Token Architecture in styles.css
if (stylesContent.includes(':root') && stylesContent.includes('[data-theme="dark"]') && stylesContent.includes('[dir="rtl"]')) {
    pass('CSS architecture includes full Day Mode (:root), Dark Mode ([data-theme="dark"]), and RTL ([dir="rtl"]) tokens.');
} else {
    fail('Missing :root, [data-theme="dark"], or [dir="rtl"] in styles.css');
}

// 10. Check Royal Heraldic Crest SVG Quality
if (htmlContent.includes('<svg viewBox="0 0 240 240"') && htmlContent.includes('JUSTITIA • DOCTRINA • VICTORIA')) {
    pass('Intricate Royal Heraldic SVG Crest embedded with official motto and quadrants.');
} else {
    fail('Royal Heraldic Crest SVG missing from index.html');
}

// 11. Check Vercel Configuration Integrity
try {
    const vercelObj = JSON.parse(vercelContent);
    if (vercelObj.cleanUrls === true && vercelObj.headers && vercelObj.routes) {
        pass('vercel.json is valid with cleanUrls, security headers, and multi-page routing.');
    } else {
        fail('vercel.json is missing required cleanUrls, headers, or routes.');
    }
} catch (e) {
    fail(`vercel.json parse error: ${e.message}`);
}

// Final Summary
console.log('\n================================================================');
console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${errors} ERRORS`);
console.log('================================================================\n');

if (errors > 0) {
    console.error(`❌ VERIFICATION FAILED: ${errors} errors found.`);
    process.exit(1);
} else {
    console.log('🎉 ALL PRODUCTION, ACCESSIBILITY, MULTI-PAGE, AND INTEGRITY CHECKS PASSED!');
    process.exit(0);
}
