// ==========================================================================
// LEXSCRIBE CHAMBERS — CLIENT APPLICATION CONTROLLER
// Chambers of Chaudhry Muhammad Zafar Iqbal (Advocate High Court & Doctor of Medicine)
// Handles: Day/Dark Theme, 100% Bilingual Urdu/English Engine, Multi-Currency,
// Interactive Triage, Bilingual Clause Tabs, Dossier & Audit Modals, and WhatsApp/Email Brief Generator
// ==========================================================================

let currentLang = localStorage.getItem('lexscribe_lang') || 'en';
let currentTheme = localStorage.getItem('lexscribe_theme') || 'dark'; // Authoritative Judicial Dark Mode by default
let currentCurrency = localStorage.getItem('lexscribe_curr') || 'USD';

// Standardized Chambers Registrar Contact Hotline (International Format)
const CHAMBERS_REGISTRAR_WHATSAPP = '923037446225'; // Chambers Desk Routing
// Public raw email is offline pending mobile 2FA verification. Inquiries route via WhatsApp hotline.

const currencyData = {
    "USD": {
        "symbol": "$",
        "rate": 1,
        "decimals": 0
    },
    "GBP": {
        "symbol": "£",
        "rate": 0.79,
        "decimals": 0
    },
    "AED": {
        "symbol": "AED ",
        "rate": 3.67,
        "decimals": 0
    },
    "SAR": {
        "symbol": "SAR ",
        "rate": 3.75,
        "decimals": 0
    },
    "CAD": {
        "symbol": "CA$ ",
        "rate": 1.36,
        "decimals": 0
    },
    "EUR": {
        "symbol": "€",
        "rate": 0.92,
        "decimals": 0
    },
    "AUD": {
        "symbol": "AU$ ",
        "rate": 1.53,
        "decimals": 0
    },
    "QAR": {
        "symbol": "QAR ",
        "rate": 3.64,
        "decimals": 0
    },
    "OMR": {
        "symbol": "OMR ",
        "rate": 0.38,
        "decimals": 1
    },
    "KWD": {
        "symbol": "KWD ",
        "rate": 0.31,
        "decimals": 1
    },
    "BHD": {
        "symbol": "BHD ",
        "rate": 0.38,
        "decimals": 1
    },
    "PKR": {
        "symbol": "Rs ",
        "rate": 278.5,
        "decimals": 0
    }
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

// Bilingual Dossier preview specifications
const dossierPreviews = {
    qabza: {
        en: {
            title: "The Overseas Property & Qabza Shield (Dossier 01)",
            content: `
                <div class="space-y-3 text-xs leading-relaxed font-sans">
                    <p><strong>Overview:</strong> Comprehensive statutory defense protocol designed for overseas owners facing illegal land grabbing, forged Patwari mutations, or armed dispossession.</p>
                    <div class="p-3 bg-amber-500/10 border-l-2 border-gold rounded">
                        <strong>Included Model Pleadings:</strong>
                        <ul class="list-disc list-inside mt-1 space-y-1">
                            <li>Emergency Sessions Court Complaint under Illegal Dispossession Act, 2005.</li>
                            <li>High Court Writ Petition under Article 199 against Police Inaction.</li>
                            <li>Revenue Court Revision Petition against Fraudulent Inteqal (Mutation).</li>
                        </ul>
                    </div>
                    <p><strong>Format:</strong> Digital PDF + Editable Microsoft Word Drafts (.docx) in English & High Court Legal Urdu.</p>
                </div>
            `
        },
        ur: {
            title: "اوورسیز جائیداد و تحفظِ قبضہ شیلڈ (دستاویز اول)",
            content: `
                <div class="space-y-3 text-xs leading-relaxed font-urdu" dir="rtl">
                    <p><strong>جائزہ:</strong> غیر قانونی قبضہ مافیا، پٹواری کے بوگس انتقالات اور مسلح قبضے کے خلاف اوورسیز پاکستانیوں کے لیے مکمل دفاعی عدالتی لائحہ عمل۔</p>
                    <div class="p-3 bg-amber-500/10 border-r-2 border-gold rounded text-right">
                        <strong>شامل شدہ عدالتی مسودات:</strong>
                        <ul class="list-disc list-inside mt-1 space-y-1">
                            <li>سیشن کورٹ میں اللیگل ڈسپوزیشن ایکٹ ۲۰۰۵ء کے تحت فوری بے دخلی کی پٹیشن۔</li>
                            <li>پولیس کی عدم کارروائی کے خلاف ہائی کورٹ رٹ پٹیشن (آرٹیکل ۱۹۹)۔</li>
                            <li>بوگس انتقال اور جعلی فرد کے خلاف ریونیو کورٹ میں ریویژن کا مسودہ۔</li>
                        </ul>
                    </div>
                    <p><strong>فارمیٹ:</strong> مصدقہ پی ڈی ایف + مائیکروسافٹ ورڈ ایڈیٹ ایبل فائلز (انگریزی و عدالتی اردو)۔</p>
                </div>
            `
        }
    },
    poa: {
        en: {
            title: "The Consular Power of Attorney Drafting Vault (Dossier 02)",
            content: `
                <div class="space-y-3 text-xs leading-relaxed font-sans">
                    <p><strong>Overview:</strong> Bilingual Special Power of Attorney templates tested across embassies in London, New York, Dubai, Jeddah, Toronto, and Frankfurt.</p>
                    <div class="p-3 bg-amber-500/10 border-l-2 border-gold rounded">
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
        ur: {
            title: "مختار نامہ مسودہ سازی والٹ (دستاویز دوم)",
            content: `
                <div class="space-y-3 text-xs leading-relaxed font-urdu" dir="rtl">
                    <p><strong>جائزہ:</strong> لندن، نیویارک، دبئی، جدہ، ٹورنٹو اور فرینکفرٹ کے پاکستانی سفارت خانوں میں آزمودہ خصوصی دو لسانی مختار نامے۔</p>
                    <div class="p-3 bg-amber-500/10 border-r-2 border-gold rounded text-right">
                        <strong>شامل شدہ حفاظتی شقیں:</strong>
                        <ul class="list-disc list-inside mt-1 space-y-1">
                            <li>فروخت، ہبہ اور رہن پر قطعی اور غیر مبہم ممانعت کی شقیں۔</li>
                            <li>قانونِ شہادت کی دفعہ ۸۵ کے تحت فوری تنسیخ کا سرکاری نوٹس۔</li>
                            <li>نادرا قونصلر تصدیق چیک لسٹ اور بائیو میٹرک تصدیق کا طریقہ۔</li>
                        </ul>
                    </div>
                    <p><strong>فارمیٹ:</strong> سرکاری مہر شدہ پی ڈی ایف + دو لسانی مائیکروسافٹ ورڈ فائلز۔</p>
                </div>
            `
        }
    },
    succession: {
        en: {
            title: "Cross-Border Succession & Inheritance Blueprint (Dossier 03)",
            content: `
                <div class="space-y-3 text-xs leading-relaxed font-sans">
                    <p><strong>Overview:</strong> Strategic blueprint for navigating foreign probate, UK/UAE letters of administration, and Pakistani legal heirship without predatory family litigation.</p>
                    <div class="p-3 bg-amber-500/10 border-l-2 border-gold rounded">
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
        ur: {
            title: "بین الاقوامی وراثت اور ترکہ رہنمائی (دستاویز سوم)",
            content: `
                <div class="space-y-3 text-xs leading-relaxed font-urdu" dir="rtl">
                    <p><strong>جائزہ:</strong> برطانیہ اور یو اے ای کی پروبیٹ عدالتوں اور پاکستان میں وارثان کے قانونی حقوق کے تحفظ کے لیے مکمل خاکہ۔</p>
                    <div class="p-3 bg-amber-500/10 border-r-2 border-gold rounded text-right">
                        <strong>شامل شدہ قانونی دستاویزات:</strong>
                        <ul class="list-disc list-inside mt-1 space-y-1">
                            <li>غیر متزلزل دو لسانی خاندانی راضی نامہ (Family Settlement Deed)۔</li>
                            <li>نادرا سکسیشن سہولت یونٹ کا فاسٹ ٹریک قانونی پروٹوکول۔</li>
                            <li>کمرشل جائیدادوں اور اراضی کی تقسیم کے لیے ہائی کورٹ ایڈمنسٹریشن سوٹ کا مسودہ۔</li>
                        </ul>
                    </div>
                    <p><strong>فارمیٹ:</strong> عدالتی پریکٹس گائیڈ + تصدیق شدہ پٹیشن ٹیمپلیٹس۔</p>
                </div>
            `
        }
    },
    lease: {
        en: {
            title: "Commercial & Residential Lease Defense Kit (Dossier 04)",
            content: `
                <div class="space-y-3 text-xs leading-relaxed font-sans">
                    <p><strong>Overview:</strong> Bulletproof tenancy agreements and eviction protocols for overseas landlords with commercial plazas, agricultural land, or residential villas in Pakistan.</p>
                    <div class="p-3 bg-amber-500/10 border-l-2 border-gold rounded">
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
        },
        ur: {
            title: "کرایہ داری و دکان/مکان خالی کروانے کی کٹ (دستاویز چہارم)",
            content: `
                <div class="space-y-3 text-xs leading-relaxed font-urdu" dir="rtl">
                    <p><strong>جائزہ:</strong> اوورسیز مالکان کے لیے نادہندہ کرایہ داروں کے خلاف قانونی معاہدات اور تیز رفتار بے دخلی کا ضابطہ۔</p>
                    <div class="p-3 bg-amber-500/10 border-r-2 border-gold rounded text-right">
                        <strong>شامل شدہ قانونی آلات:</strong>
                        <ul class="list-disc list-inside mt-1 space-y-1">
                            <li>اسپیشل رینٹ ٹربیونل کے روبرو فوری بے دخلی کی درخواست کا ماڈل۔</li>
                            <li>۳۰ روزہ لازمی قانونی نوٹس برائے نادہندگی۔</li>
                            <li>ذیلی کرایہ داری اور بغیر اجازت تعمیرات پر ممانعت کی شقیں۔</li>
                        </ul>
                    </div>
                    <p><strong>فارمیٹ:</strong> ڈیجیٹل پی ڈی ایف + ہائی کورٹ اردو کرایہ نامہ مسودات۔</p>
                </div>
            `
        }
    }
};

// ==========================================================================
// 1. THEME ENGINE (DAY COTTON PARCHMENT vs. MIDNIGHT OBSIDIAN)
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
        iconContainer.setAttribute('title', 'Switch to Day Mode (Cotton Vellum Parchment)');
    } else {
        iconContainer.innerHTML = '🌙';
        iconContainer.setAttribute('title', 'Switch to Dark Mode (Midnight Obsidian)');
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
            btn.classList.remove('text-gray-300', 'text-theme-muted');
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
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = val;
            } else {
                el.innerHTML = val;
            }
        }
    });

    // Translate bilingual tab clause content
    const activeTabIndex = window.currentBilingualTab || 1;
    switchBilingualTab(activeTabIndex);

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
    if (!currencyData[curr]) curr = 'USD';
    currentCurrency = curr;
    localStorage.setItem('lexscribe_curr', curr);

    // Sync dropdown select if present
    const selectEl = document.getElementById('currency-select');
    if (selectEl && selectEl.value !== curr) {
        selectEl.value = curr;
    }

    // Update Currency buttons if any exist
    document.querySelectorAll('.curr-btn').forEach(btn => {
        if (btn.getAttribute('data-curr') === curr) {
            btn.classList.add('bg-gold', 'text-emerald-dark', 'font-bold');
            btn.classList.remove('text-gray-300', 'text-theme-muted');
        } else {
            btn.classList.remove('bg-gold', 'text-emerald-dark', 'font-bold');
            btn.classList.add('text-gray-300');
        }
    });

    const rateInfo = currencyData[curr] || currencyData.USD;

    // Update all dynamic price-val elements
    document.querySelectorAll('.price-val').forEach(el => {
        const directAttr = el.getAttribute('data-' + curr.toLowerCase());
        if (directAttr) {
            el.textContent = rateInfo.symbol + directAttr;
        } else {
            const usdBase = parseFloat(el.getAttribute('data-usd')) || 0;
            const convertedRaw = usdBase * rateInfo.rate;
            let displayVal;
            if (curr === 'PKR') {
                displayVal = Math.round(convertedRaw / 100) * 100;
            } else if (rateInfo.decimals > 0) {
                displayVal = convertedRaw.toFixed(rateInfo.decimals);
            } else {
                displayVal = Math.round(convertedRaw);
            }
            el.textContent = rateInfo.symbol + Number(displayVal).toLocaleString();
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
    const selectedCityOption = cityEl ? cityEl.options[cityEl.selectedIndex] : null;
    const cityText = selectedCityOption ? selectedCityOption.text : "Pakistan";
    const t = translations[currentLang].triage;
    
    // Look up exact statutory solution from translations
    const resKey = 'res_' + issue;
    const rec = t[resKey] || t.res_qabza;

    const cityNotice = currentLang === 'ur'
        ? '<div class="mt-4 pt-3 border-t border-gold/30 flex items-center justify-between flex-wrap gap-2 text-xs text-gold font-urdu" dir="rtl">' +
             '<div><strong>متعلقہ ضلع / ہائی کورٹ بینچ:</strong> ' + cityText + ' میں ہمارے چیمبرز کی زیرِ نگرانی فوری رٹ پٹیشن، اسٹے آرڈر اور قانونی کارروائی میسر ہے۔</div>' +
             '<a href="https://wa.me/' + CHAMBERS_REGISTRAR_WHATSAPP + '?text=' + encodeURIComponent('السلام علیکم رجسٹرار، میں ' + cityText + ' میں اپنے جائیدادی تنازعہ (' + issue + ') کے سلسلے میں سینئر وکیل سے براہِ راست مشورہ کرنا چاہتا ہوں۔') + '" target="_blank" rel="noopener noreferrer" class="px-3 py-1 rounded bg-gold text-emerald-dark font-bold hover:bg-gold-light transition shadow text-xs">رجسٹرار سے فوری رابطہ کریں</a>' +
           '</div>'
        : '<div class="mt-4 pt-3 border-t border-gold/30 flex items-center justify-between flex-wrap gap-2 text-xs text-gold font-sans">' +
             '<div><strong>Jurisdiction Standing:</strong> Active High Court & Sessions Bar filing coverage in ' + cityText + '.</div>' +
             '<a href="https://wa.me/' + CHAMBERS_REGISTRAR_WHATSAPP + '?text=' + encodeURIComponent('Hello Registrar, I am seeking High Court legal representation in ' + cityText + ' regarding ' + issue + '.') + '" target="_blank" rel="noopener noreferrer" class="px-3 py-1 rounded bg-gold text-emerald-dark font-bold hover:bg-gold-light transition shadow text-xs">Consult Registrar on WhatsApp</a>' +
           '</div>';

    resultBox.innerHTML = rec + cityNotice;
    resultBox.classList.remove('hidden');
}

// ==========================================================================
// 5. INTERACTIVE BILINGUAL CLAUSE TABS
// ==========================================================================
function switchBilingualTab(tabIndex) {
    window.currentBilingualTab = tabIndex;

    // Update active tab button style
    document.querySelectorAll('.bilingual-tab').forEach((btn, idx) => {
        if (idx + 1 === tabIndex) {
            btn.classList.add('bg-gold', 'text-navy-dark', 'font-bold');
            btn.classList.remove('bg-theme-card-contrast', 'text-theme-muted');
        } else {
            btn.classList.remove('bg-gold', 'text-navy-dark', 'font-bold');
            btn.classList.add('bg-theme-card-contrast', 'text-theme-muted');
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
// 7. DOSSIER PREVIEW MODAL (100% BILINGUAL)
// ==========================================================================
function openDossierModal(dossierKey) {
    const modal = document.getElementById('dossier-modal');
    const titleEl = document.getElementById('dossier-modal-title');
    const bodyEl = document.getElementById('dossier-modal-body');
    if (!modal) return;

    const dossierItem = dossierPreviews[dossierKey] || dossierPreviews.qabza;
    const langData = dossierItem[currentLang] || dossierItem.en;

    if (titleEl) titleEl.textContent = langData.title;
    if (bodyEl) bodyEl.innerHTML = langData.content;

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
// 8. INTERACTIVE CASE BRIEF GENERATOR (WHATSAPP, EMAIL, & CLIPBOARD COPY)
// ==========================================================================
function buildStructuredBrief() {
    const countryEl = document.getElementById('brief-country');
    const cityEl = document.getElementById('brief-city');
    const typeEl = document.getElementById('brief-type');
    const detailsEl = document.getElementById('brief-details');

    const country = countryEl ? countryEl.value : 'Overseas';
    const city = cityEl && cityEl.value.trim() ? cityEl.value.trim() : 'Pakistan';
    const type = typeEl ? typeEl.value : 'General Advisory';
    const details = detailsEl && detailsEl.value.trim() ? detailsEl.value.trim() : 'I require legal advisory.';

    return `*CONFIDENTIAL LEGAL INTAKE — LEXSCRIBE CHAMBERS*
------------------------------------------------
*Origin Country:* ${country}
*Property / Dispute District:* ${city}
*Matter Classification:* ${type}
*Summary of Concern:* ${details}

*Attention:* Chambers of Ch. Muhammad Zafar Iqbal (Advocate High Court & Doctor of Medicine). Please advise on audit schedule and formal procedure.`;
}

function generateWhatsAppBrief(e) {
    if (e) e.preventDefault();
    const message = buildStructuredBrief();
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${CHAMBERS_REGISTRAR_WHATSAPP}?text=${encoded}`;
    window.open(waUrl, '_blank');
}

function copyFormattedBrief(e) {
    if (e) e.preventDefault();
    const message = buildStructuredBrief();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message).then(() => {
            showToast();
        }).catch(() => {
            fallbackCopyText(message);
        });
    } else {
        fallbackCopyText(message);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showToast();
    } catch (err) {
        alert("Brief ready. Please copy: \n\n" + text);
    }
    document.body.removeChild(textArea);
}

function sendEmailBrief(e) {
    if (e) e.preventDefault();
    const message = buildStructuredBrief();
    const subject = encodeURIComponent("Confidential Legal Brief — LexScribe Chambers");
    const body = encodeURIComponent(message);
    const emailTarget = (typeof CHAMBERS_REGISTRAR_EMAIL !== 'undefined' && CHAMBERS_REGISTRAR_EMAIL) ? CHAMBERS_REGISTRAR_EMAIL : '';
    if (emailTarget) {
        window.location.href = `mailto:${emailTarget}?subject=${subject}&body=${body}`;
    } else {
        generateWhatsAppBrief();
    }
}

function showToast() {
    let toast = document.getElementById('lexscribe-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'lexscribe-toast';
        toast.className = 'bg-emerald-700 text-white px-5 py-3 rounded-lg shadow-2xl text-xs font-bold border border-emerald-400 flex items-center gap-2';
        toast.innerHTML = `<span class="text-base">✓</span> <span data-i18n="brief_builder.copied_toast">Legal Brief Copied to Clipboard!</span>`;
        document.body.appendChild(toast);
    }
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

// ==========================================================================

// ==========================================================================
// 8B. $10 PRIORITY ADVISORY SLOT BOOKING CONTROLLER
// ==========================================================================
function openBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

function handleBookingSubmit(e) {
    if (e) e.preventDefault();

    const name = (document.getElementById('booking-name') || {}).value || 'Overseas Client';
    const country = (document.getElementById('booking-country') || {}).value || 'Overseas';
    const slot = (document.getElementById('booking-slot') || {}).value || 'Next Available Slot';
    const matter = (document.getElementById('booking-matter') || {}).value || 'Property & Legal Consultation';
    const summaryEl = document.getElementById('booking-notes') || document.getElementById('booking-summary');
    const summary = (summaryEl && summaryEl.value && summaryEl.value.trim()) ? summaryEl.value.trim() : 'Document Scrutiny and Advisory';

    const rawMessage = '*PRIORITY ADVISORY SLOT BOOKING ($10 CONSULTATION)*\n' +
        '• Instructing Client: ' + name + '\n' +
        '• Resident Country: ' + country + '\n' +
        '• Matter Classification: ' + matter + '\n' +
        '• Preferred Time Window: ' + slot + '\n' +
        '• Case Synopsis: ' + summary + '\n' +
        '• Priority Advisory Fee: $10.00 USD / £8 GBP / 37 AED / Rs 2,800 (Authorized)\n\n' +
        'Hello Registrar, I am submitting my $10 Priority Advisory Booking and request slot confirmation.';

    const encoded = encodeURIComponent(rawMessage);
    const waUrl = 'https://wa.me/' + CHAMBERS_REGISTRAR_WHATSAPP + '?text=' + encoded;

    closeBookingModal();
    window.open(waUrl, '_blank');
}

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
        closeBookingModal();
    }
});


// ==========================================================================
// 11. LEGENDARY COUNTER ANIMATION & GLOBAL MAP CONTROLLER
// ==========================================================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
        counters.forEach(el => {
            const target = el.getAttribute('data-target') || '0';
            const suffix = el.getAttribute('data-suffix') || '';
            el.textContent = target + suffix;
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10) || 0;
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 1800;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(ease * target);
                    el.textContent = current.toLocaleString() + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        el.textContent = target.toLocaleString() + suffix;
                    }
                }

                requestAnimationFrame(update);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(c => observer.observe(c));
}

function showMapTooltip(city, stats, waMsg) {
    const tooltip = document.getElementById('map-tooltip');
    if (!tooltip) return;
    const titleEl = document.getElementById('map-tooltip-title');
    const statsEl = document.getElementById('map-tooltip-stats');
    const linkEl = document.getElementById('map-tooltip-link');

    if (titleEl) titleEl.textContent = city;
    if (statsEl) statsEl.textContent = stats;
    if (linkEl) {
        linkEl.href = 'https://wa.me/' + CHAMBERS_REGISTRAR_WHATSAPP + '?text=' + encodeURIComponent(waMsg);
    }
    tooltip.classList.remove('hidden');
    tooltip.classList.add('active');
    tooltip.style.display = 'block';
}

function hideMapTooltip() {
    const tooltip = document.getElementById('map-tooltip');
    if (tooltip) {
        tooltip.classList.add('hidden');
        tooltip.classList.remove('active');
        tooltip.style.display = 'none';
    }
}

function initMapPins() {
    const pins = document.querySelectorAll('.map-pin');
    pins.forEach(pin => {
        pin.addEventListener('click', function(e) {
            e.stopPropagation();
            const city = pin.getAttribute('data-city');
            const stats = pin.getAttribute('data-stats');
            const msg = pin.getAttribute('data-msg');
            if (city) {
                showMapTooltip(city, stats, msg);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initMapPins();
    initTheme();
    setLanguage(currentLang);
    setCurrency(currentCurrency);
    const currSelect = document.getElementById("currency-select");
    if (currSelect) currSelect.value = currentCurrency;
});
