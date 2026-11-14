// ==========================================================================
// LEXSCRIBE CHAMBERS — CLIENT APPLICATION CONTROLLER
// Handles: Theme (Day/Dark), Bilingual Translations, Multi-Currency Engine,
// Interactive Triage, Bilingual Clause Tabs, Dossier & Audit Modals, and WhatsApp Brief Generator
// ==========================================================================

let currentLang = localStorage.getItem('lexscribe_lang') || 'en';
let currentTheme = localStorage.getItem('lexscribe_theme') || 'dark'; // Default to authoritative dark mode
let currentCurrency = localStorage.getItem('lexscribe_curr') || 'USD';

const currencyData = {
    USD: { symbol: '$', rate: 1 },
    GBP: { symbol: '£', rate: 0.8 },
    AED: { symbol: 'AED ', rate: 3.67 },
    PKR: { symbol: 'Rs ', rate: 280 }
};

// Clause samples for the interactive Bilingual Drafting Showcase
const bilingualClauses = {
    1: {
        en: {
            title: "Clause 4: Explicit Restriction of Sale & Gift",
            desc: '"The appointed attorney shall have authority ONLY to oversee renovation and pay utility bills. Under NO circumstances does this Power of Attorney grant the right to execute a sale agreement, accept earnest money (Bayana), gift (Hiba), mortgage, or surrender possession to third parties."',
            note: "<strong>Why This Protects You:</strong> If an agent attempts to register a fake sale in Pakistan, this clause makes the transaction void ab initio under Section 85 of Qanun-e-Shahadat."
        },
        ur: {
            title: "دفعہ نمبر 4: ممانعت بیع و ہبہ",
            desc: '"مختارِ خاص ہذا کو محض جائیداد کی دیکھ بھال، مرمت اور بلات کی ادائیگی کا اختیار ہوگا۔ مختارِ موصوف کو جائیداد متذکرہ بالا کو کسی بھی شخص کے نام بیع کرنے، بیعانہ وصول کرنے، ہبہ، رہن یا کسی قسم کا بار ڈالنے یا قبضہ چھوڑنے کا ہرگز کوئی اختیار نہ ہوگا اور ایسا کوئی بھی اقدام باطل اور کالعدم تصور ہوگا۔"',
            note: "<strong>عدالتی حوالہ:</strong> پنجاب لینڈ ریونیو رولز اور سپریم کورٹ کے اصولوں کے عین مطابق۔"
        }
    },
    2: {
        en: {
            title: "Clause 7: Bayana & Earnest Money Restriction",
            desc: '"The attorney is strictly prohibited from receiving, executing, or negotiating any earnest money (Bayana) or Token money on behalf of the Principal. Any financial covenant made without prior attested written consent from the Principal shall be non-binding and legally fraudulent."',
            note: "<strong>Why This Protects You:</strong> Land cartels frequently use nominal Bayana receipts to secure temporary injunctions (Stay Orders) that freeze overseas owners out for years."
        },
        ur: {
            title: "دفعہ نمبر 7: ممانعتِ وصولی بیعانہ و ٹوکن",
            desc: '"مختار کو اصل مالک کی پیشگی باضابطہ تحریری اجازت کے بغیر جائیداد کے بابت کسی بھی قسم کا بیعانہ، ٹوکن یا زرِ پیشگی وصول کرنے یا اقرار نامہ تحریر کرنے کا کوئی مجاز نہ ہوگا۔ بغیر اجازت کیا گیا ایسا کوئی بھی اقدام باطل اور قانوناً فراڈ متصور ہوگا۔"',
            note: "<strong>عدالتی حوالہ:</strong> معاہدہ ایکٹ اور اسپیسیفک ریلیف ایکٹ کے تحت مالک کی مکمل قانونی داد رسی۔"
        }
    },
    3: {
        en: {
            title: "Clause 9: Instant Revocation & Statutory Cancellation",
            desc: '"This Power of Attorney is revocable at will and shall stand automatically nullified upon written notification sent via registered post, consular dispatch, or email to the Sub-Registrar and relevant Revenue/PLRA Arazi Center under Section 85 Qanun-e-Shahadat."',
            note: "<strong>Why This Protects You:</strong> Neutralizes crooked claims that a Power of Attorney was 'coupled with interest' or irrevocable."
        },
        ur: {
            title: "دفعہ نمبر 9: حقِ فوری تنسیخ و منسوخی",
            desc: '"یہ مختار نامہ خاص کسی بھی وقت قابلِ تنسیخ ہے اور اصل مالک کی جانب سے سب رجسٹرار یا متعلقہ ریونیو سنٹر کو بذریعہ ڈاک، ای میل یا قونصلر نوٹس بھیجے جانے پر از خود باطل اور غیر مؤثر ہو جائے گا۔"',
            note: "<strong>عدالتی حوالہ:</strong> قانونِ شہادت کی دفعہ ۸۵ اور رجسٹریشن ایکٹ کی شق ۱۷ کے تحت مکمل تحفظ۔"
        }
    }
};

// Dossier preview details
const dossierPreviews = {
    qabza: {
        title: "The Overseas Property & Qabza Shield (Dossier 01)",
        content: `
            <div class="space-y-3 text-xs leading-relaxed">
                <p><strong>Overview:</strong> Comprehensive statutory defense protocol designed for overseas owners facing illegal land grabbing, forged Patwari mutations, or armed dispossession.</p>
                <div class="p-3 bg-gold/10 border-l-2 border-gold rounded">
                    <strong>Included Model Pleadings:</strong>
                    <ul class="list-disc list-inside mt-1 space-y-1">
                        <li>Emergency Sessions Court Complaint under Illegal Dispossession Act, 2005.</li>
                        <li>High Court Writ Petition under Article 199 against Police Non-Registration.</li>
                        <li>Revenue Court Revision Petition against Fraudulent Inteqal (Mutation).</li>
                    </ul>
                </div>
                <p><strong>Format:</strong> Digital PDF + Editable Microsoft Word Drafts (.docx) in English & High Court Legal Urdu.</p>
            </div>
        `
    },
    poa: {
        title: "The Consular Power of Attorney Drafting Vault (Dossier 02)",
        content: `
            <div class="space-y-3 text-xs leading-relaxed">
                <p><strong>Overview:</strong> Bilingual Special Power of Attorney templates tested across embassies in London, New York, Dubai, Jeddah, Toronto, and Frankfurt.</p>
                <div class="p-3 bg-gold/10 border-l-2 border-gold rounded">
                    <strong>Included Protective Covenants:</strong>
                    <ul class="list-disc list-inside mt-1 space-y-1">
                        <li>Strict Anti-Sale, Anti-Gift (Hiba), and Anti-Mortgage Restrictive Covenants.</li>
                        <li>Section 85 Qanun-e-Shahadat Express Revocation Deeds.</li>
                        <li>NADRA Consular Attestation Checklist & Biometric Verification Protocol.</li>
                    </ul>
                </div>
                <p><strong>Format:</strong> Digital PDF + Bilingual Word Document Templates.</p>
            </div>
        `
    },
    succession: {
        title: "Cross-Border Succession & Inheritance Blueprint (Dossier 03)",
        content: `
            <div class="space-y-3 text-xs leading-relaxed">
                <p><strong>Overview:</strong> Strategic blueprint for navigating foreign probate, UK/UAE letters of administration, and Pakistani legal heirship without predatory family litigation.</p>
                <div class="p-3 bg-gold/10 border-l-2 border-gold rounded">
                    <strong>Included Instruments:</strong>
                    <ul class="list-disc list-inside mt-1 space-y-1">
                        <li>Bilingual Irrevocable Family Settlement Deed (Rajinama).</li>
                        <li>NADRA Succession Certificate Fast-Track Processing Protocol.</li>
                        <li>High Court Administration Suit for Partition of Dispersed Commercial Holdings.</li>
                    </ul>
                </div>
                <p><strong>Format:</strong> Comprehensive Practice Guide + Certified Pleading Templates.</p>
            </div>
        `
    },
    lease: {
        title: "Commercial & Residential Lease Defense Kit (Dossier 04)",
        content: `
            <div class="space-y-3 text-xs leading-relaxed">
                <p><strong>Overview:</strong> Bulletproof tenancy agreements and eviction protocols for overseas landlords with commercial plazas, agricultural land, or residential villas in Pakistan.</p>
                <div class="p-3 bg-gold/10 border-l-2 border-gold rounded">
                    <strong>Included Instruments:</strong>
                    <ul class="list-disc list-inside mt-1 space-y-1">
                        <li>Expedited Eviction Petition before Special Rent Tribunal.</li>
                        <li>30-Day Mandatory Statutory Notice of Default.</li>
                        <li>Anti-Subletting and Unauthorized Alteration Restrictive Covenants.</li>
                    </ul>
                </div>
                <p><strong>Format:</strong> Digital PDF + High Court Urdu Tenancy Deeds.</p>
            </div>
        `
    }
};

// ==========================================================================
// 1. THEME ENGINE (DAY PARCHMENT vs. MIDNIGHT OBSIDIAN)
// ==========================================================================
function initTheme() {
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
        updateThemeIcon('dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.classList.remove('dark');
        updateThemeIcon('light');
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('lexscribe_theme', currentTheme);
    initTheme();
}

function updateThemeIcon(theme) {
    const iconContainer = document.getElementById('theme-icon');
    if (!iconContainer) return;
    if (theme === 'dark') {
        iconContainer.innerHTML = '☀️';
        iconContainer.setAttribute('title', 'Switch to Day Mode (Parchment)');
    } else {
        iconContainer.innerHTML = '🌙';
        iconContainer.setAttribute('title', 'Switch to Dark Mode (Obsidian)');
    }
}

// ==========================================================================
// 2. BILINGUAL TRANSLATION ENGINE (ENGLISH ⇄ HIGH COURT URDU)
// ==========================================================================
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lexscribe_lang', lang);

    const langData = translations[lang];
    if (!langData) return;

    // Update HTML dir and lang
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', langData.dir);

    // Update Language Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('bg-gold', 'text-navy-dark', 'font-bold');
            btn.classList.remove('text-gray-300');
        } else {
            btn.classList.remove('bg-gold', 'text-navy-dark', 'font-bold');
            btn.classList.add('text-gray-300');
        }
    });

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const parts = key.split('.');
        let val = langData;
        for (const part of parts) {
            if (val && val[part] !== undefined) {
                val = val[part];
            } else {
                val = null;
                break;
            }
        }
        if (val !== null) {
            el.innerHTML = val;
        }
    });

    // Re-run triage result update if active
    const resultBox = document.getElementById('triage-result');
    if (resultBox && !resultBox.classList.contains('hidden')) {
        updateTriageResult();
    }
}

// ==========================================================================
// 3. MULTI-CURRENCY CONVERTER ENGINE
// ==========================================================================
function setCurrency(curr) {
    currentCurrency = curr;
    localStorage.setItem('lexscribe_curr', curr);

    // Update Currency buttons
    document.querySelectorAll('.curr-btn').forEach(btn => {
        if (btn.getAttribute('data-curr') === curr) {
            btn.classList.add('bg-gold', 'text-navy-dark', 'font-bold');
            btn.classList.remove('text-gray-300');
        } else {
            btn.classList.remove('bg-gold', 'text-navy-dark', 'font-bold');
            btn.classList.add('text-gray-300');
        }
    });

    // Update all dynamic price-val elements
    document.querySelectorAll('.price-val').forEach(el => {
        const val = el.getAttribute(`data-${curr.toLowerCase()}`);
        if (val) {
            el.textContent = `${currencyData[curr].symbol}${val}`;
        }
    });
}

// ==========================================================================
// 4. INTERACTIVE TRIAGE LOGIC
// ==========================================================================
function handleTriage(e) {
    if (e) e.preventDefault();
    updateTriageResult();
}

function updateTriageResult() {
    const issueEl = document.getElementById('triage-issue');
    const cityEl = document.getElementById('triage-city');
    const resultBox = document.getElementById('triage-result');
    if (!issueEl || !resultBox) return;

    const issue = issueEl.value;
    const cityText = cityEl ? cityEl.options[cityEl.selectedIndex].text : "Pakistan";
    const t = translations[currentLang].triage;
    let rec = "";

    if (issue === 'poa') {
        rec = t.res_poa;
    } else if (issue === 'qabza') {
        rec = t.res_qabza;
    } else if (issue === 'inheritance') {
        rec = t.res_inheritance;
    } else if (issue === 'tenant') {
        rec = t.res_tenant;
    } else if (issue === 'fir') {
        rec = t.res_fir;
    } else {
        rec = t.res_audit;
    }

    const cityNotice = currentLang === 'ur'
        ? `<div class="mt-2.5 pt-2 border-t border-gold/30 text-[11px] text-gold font-urdu"><strong>متعلقہ ضلع:</strong> ${cityText} میں ہمارے چیمبرز کی زیرِ نگرانی مصدقہ عدالتی کارروائی میسر ہے۔</div>`
        : `<div class="mt-2.5 pt-2 border-t border-gold/30 text-[11px] text-gold font-sans"><strong>Jurisdiction Note:</strong> Chambers provides active statutory coverage and precedent filing in ${cityText}.</div>`;

    resultBox.innerHTML = rec + cityNotice;
    resultBox.classList.remove('hidden');
}

// ==========================================================================
// 5. INTERACTIVE BILINGUAL CLAUSE TABS
// ==========================================================================
function switchBilingualTab(tabIndex) {
    // Update active tab button style
    document.querySelectorAll('.bilingual-tab').forEach((btn, idx) => {
        if (idx + 1 === tabIndex) {
            btn.classList.add('bg-gold', 'text-navy-dark', 'font-bold');
            btn.classList.remove('bg-navy', 'text-gray-300');
        } else {
            btn.classList.remove('bg-gold', 'text-navy-dark', 'font-bold');
            btn.classList.add('bg-navy', 'text-gray-300');
        }
    });

    const clause = bilingualClauses[tabIndex];
    if (!clause) return;

    // Left (English) elements
    const enTitle = document.getElementById('clause-title-left');
    const enDesc = document.getElementById('clause-desc-left');
    const enNote = document.getElementById('clause-note-left');

    if (enTitle) enTitle.textContent = clause.en.title;
    if (enDesc) enDesc.textContent = clause.en.desc;
    if (enNote) enNote.innerHTML = clause.en.note;

    // Right (Urdu) elements
    const urTitle = document.getElementById('clause-title-right');
    const urDesc = document.getElementById('clause-desc-right');
    const urNote = document.getElementById('clause-note-right');

    if (urTitle) urTitle.textContent = clause.ur.title;
    if (urDesc) urDesc.textContent = clause.ur.desc;
    if (urNote) urNote.innerHTML = clause.ur.note;
}

// ==========================================================================
// 6. SAMPLE AUDIT REPORT MODAL
// ==========================================================================
function openPreviewModal() {
    const modal = document.getElementById('preview-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
}

function closePreviewModal() {
    const modal = document.getElementById('preview-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

// ==========================================================================
// 7. DOSSIER PREVIEW MODAL
// ==========================================================================
function openDossierModal(dossierKey) {
    const modal = document.getElementById('dossier-modal');
    const titleEl = document.getElementById('dossier-modal-title');
    const bodyEl = document.getElementById('dossier-modal-body');
    if (!modal) return;

    const data = dossierPreviews[dossierKey] || dossierPreviews.qabza;
    if (titleEl) titleEl.textContent = data.title;
    if (bodyEl) bodyEl.innerHTML = data.content;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function closeDossierModal() {
    const modal = document.getElementById('dossier-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

// ==========================================================================
// 8. INTERACTIVE WHATSAPP BRIEF GENERATOR
// ==========================================================================
function generateWhatsAppBrief(e) {
    if (e) e.preventDefault();
    
    const countryEl = document.getElementById('brief-country');
    const cityEl = document.getElementById('brief-city');
    const typeEl = document.getElementById('brief-type');
    const detailsEl = document.getElementById('brief-details');

    const country = countryEl ? countryEl.value : 'Overseas';
    const city = cityEl ? cityEl.value : 'Pakistan';
    const type = typeEl ? typeEl.value : 'General Advisory';
    const details = detailsEl ? detailsEl.value.trim() : 'I require legal advisory.';

    const message = 
`*CONFIDENTIAL LEGAL INTAKE — LEXSCRIBE CHAMBERS*
------------------------------------------------
*Origin Country:* ${country}
*Property / Dispute District:* ${city}
*Matter Classification:* ${type}
*Brief Summary:* ${details}

*Attention:* Chambers of Ch. Muhammad Zafar Iqbal (Advocate High Court). Please advise on audit schedule and formal procedure.`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/?text=${encoded}`;
    window.open(waUrl, '_blank');
}

// ==========================================================================
// 9. MOBILE MENU TOGGLE
// ==========================================================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// ==========================================================================
// 10. GLOBAL EVENT LISTENERS & INITIALIZATION
// ==========================================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePreviewModal();
        closeDossierModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setLanguage(currentLang);
    setCurrency(currentCurrency);
});