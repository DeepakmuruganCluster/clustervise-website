/* ClusterVise — Linear/Modern Design System
   Establishes the dark-theme design tokens, ambient background,
   and component overrides. Load before theme-toggle.js.
   ─────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Inject CSS ──────────────────────────────────────────── */
  var style = document.createElement('style');
  style.id = 'cv-design-system-styles';
  style.textContent = `

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════ */
:root {
  --brand:       #5E6AD2;
  --brand-dk:    #4A56C0;
  --brand-lt:    rgba(94,106,210,0.14);
  --accent:      #8FD65E;
  --accent-dk:   #6FB640;
  --accent-lt:   rgba(143,214,94,0.10);
  --navy:        #0a0a0c;
  --navy-2:      #111116;
  --bg:          #050506;
  --bg-2:        #0a0a0c;
  --bg-3:        rgba(255,255,255,0.05);
  --text:        #EDEDEF;
  --text-2:      #8A8F98;
  --text-3:      rgba(255,255,255,0.38);
  --border:      rgba(255,255,255,0.06);
  --border-2:    rgba(255,255,255,0.10);
  --glass:       linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02));
  --glass-strong:linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.04));
  --surface-ring:inset 0 1px 0 rgba(255,255,255,0.08);
  --shadow:      0 0 0 1px rgba(255,255,255,0.06),0 2px 20px rgba(0,0,0,0.40);
  --shadow-md:   0 0 0 1px rgba(255,255,255,0.06),0 8px 40px rgba(0,0,0,0.50),0 0 80px rgba(94,106,210,0.06);
  --shadow-lg:   0 0 0 1px rgba(255,255,255,0.08),0 24px 80px rgba(0,0,0,0.60),0 0 120px rgba(94,106,210,0.08);
}

/* ═══════════════════════════════════════════════════════
   BODY — near-black base with vertical depth radial
   ═══════════════════════════════════════════════════════ */
body {
  background: radial-gradient(ellipse at 50% 0%, #0d0d14 0%, #050506 55%, #020203 100%) !important;
  color: var(--text);
}

/* Grid overlay — replaces teal grid with near-invisible white */
body::before {
  background:
    linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px) !important;
  background-size: 64px 64px !important;
  mask-image: none !important;
  opacity: 0.28 !important;
}

/* ═══════════════════════════════════════════════════════
   AMBIENT BLOBS
   ═══════════════════════════════════════════════════════ */
#cv-blobs {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
.cv-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.cv-blob-1 {
  width: 1000px; height: 1200px;
  top: -300px; left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center,
    rgba(94,106,210,0.20) 0%,
    rgba(94,106,210,0.07) 40%,
    transparent 70%);
  filter: blur(100px);
  animation: cvBlob1 10s ease-in-out infinite;
}
.cv-blob-2 {
  width: 700px; height: 900px;
  top: 5%; left: -180px;
  background: radial-gradient(ellipse at center,
    rgba(124,58,237,0.13) 0%,
    rgba(99,30,200,0.05) 45%,
    transparent 70%);
  filter: blur(90px);
  animation: cvBlob2 12s ease-in-out infinite;
}
.cv-blob-3 {
  width: 620px; height: 800px;
  top: 15%; right: -150px;
  background: radial-gradient(ellipse at center,
    rgba(67,97,238,0.12) 0%,
    rgba(37,99,235,0.04) 50%,
    transparent 70%);
  filter: blur(80px);
  animation: cvBlob3 9s ease-in-out infinite;
}
.cv-blob-4 {
  width: 800px; height: 500px;
  bottom: -80px; left: 15%;
  background: radial-gradient(ellipse at center,
    rgba(94,106,210,0.09) 0%,
    transparent 60%);
  filter: blur(80px);
  animation: cvBlob1 14s ease-in-out infinite reverse;
}
@keyframes cvBlob1 {
  0%,100% { transform: translateX(-50%) translateY(0) rotate(0deg); }
  50%      { transform: translateX(-50%) translateY(-22px) rotate(1deg); }
}
@keyframes cvBlob2 {
  0%,100% { transform: translateY(0) rotate(0deg); }
  33%     { transform: translateY(-18px) rotate(-1deg); }
  66%     { transform: translateY(-8px) rotate(1deg); }
}
@keyframes cvBlob3 {
  0%,100% { transform: translateY(0) rotate(0deg); }
  40%     { transform: translateY(-20px) rotate(1deg); }
  70%     { transform: translateY(-9px) rotate(-0.5deg); }
}
@media (prefers-reduced-motion: reduce) {
  .cv-blob { animation: none !important; }
}
/* Hide blobs in light mode */
html[data-theme="light"] #cv-blobs { display: none; }

/* ═══════════════════════════════════════════════════════
   GLOBAL SELECTIONS & SCROLLBAR
   ═══════════════════════════════════════════════════════ */
::selection { background: rgba(94,106,210,0.30) !important; }
::-webkit-scrollbar-thumb { background: rgba(94,106,210,0.40) !important; }

/* ═══════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════ */
nav {
  background: rgba(5,5,6,0.85) !important;
  border-bottom-color: rgba(255,255,255,0.06) !important;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.45) !important;
  position: relative;
  z-index: 100;
}
.nav-links a:hover {
  color: #EDEDEF !important;
  background: rgba(94,106,210,0.12) !important;
}
.nav-dropdown:hover > a {
  color: #EDEDEF !important;
  background: rgba(94,106,210,0.12) !important;
}
.dropdown-menu {
  background: rgba(10,10,12,0.98) !important;
  border-color: rgba(94,106,210,0.20) !important;
}
.dropdown-menu a:hover {
  color: #818CF8 !important;
  background: rgba(94,106,210,0.10) !important;
}

/* ═══════════════════════════════════════════════════════
   BUTTONS
   ═══════════════════════════════════════════════════════ */
.btn-brand {
  background: #5E6AD2 !important;
  color: #fff !important;
  box-shadow:
    0 0 0 1px rgba(94,106,210,0.50),
    0 4px 14px rgba(94,106,210,0.32),
    inset 0 1px 0 rgba(255,255,255,0.18) !important;
  transition: all 0.2s cubic-bezier(0.16,1,0.3,1) !important;
}
.btn-brand:hover {
  background: #6872D9 !important;
  box-shadow:
    0 0 0 1px rgba(94,106,210,0.60),
    0 8px 28px rgba(94,106,210,0.40),
    0 0 48px rgba(94,106,210,0.20),
    inset 0 1px 0 rgba(255,255,255,0.22) !important;
  transform: translateY(-2px) !important;
  filter: none !important;
}
.btn-ghost {
  background: rgba(255,255,255,0.04) !important;
  border-color: rgba(255,255,255,0.10) !important;
  color: #EDEDEF !important;
}
.btn-ghost:hover {
  background: rgba(255,255,255,0.08) !important;
  border-color: rgba(255,255,255,0.16) !important;
  color: #fff !important;
}

/* ═══════════════════════════════════════════════════════
   HERO PANELS
   ═══════════════════════════════════════════════════════ */
.hero-left, .hero-right {
  background: linear-gradient(180deg,
    rgba(255,255,255,0.065) 0%,
    rgba(255,255,255,0.020) 100%) !important;
  border-color: rgba(255,255,255,0.07) !important;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.05),
    0 24px 60px rgba(0,0,0,0.50),
    0 0 80px rgba(94,106,210,0.06) !important;
}
.hero-left::before, .hero-right::before {
  background: linear-gradient(135deg,
    rgba(94,106,210,0.07),
    transparent 40%,
    transparent 65%,
    rgba(124,58,237,0.04) 100%) !important;
}
.hero-eyebrow {
  background: rgba(94,106,210,0.12) !important;
  border-color: rgba(94,106,210,0.24) !important;
  color: #818CF8 !important;
}
.blink { background: #5E6AD2 !important; }

/* ═══════════════════════════════════════════════════════
   TYPOGRAPHY — indigo gradient on key headlines
   ═══════════════════════════════════════════════════════ */
h1 em {
  background: linear-gradient(90deg, #5E6AD2 0%, #818CF8 45%, #C084FC 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  color: transparent !important;
}

/* ═══════════════════════════════════════════════════════
   STAT / HERO-BAND CARDS
   ═══════════════════════════════════════════════════════ */
.stat-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02)) !important;
  border-color: rgba(255,255,255,0.07) !important;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.40) !important;
}
.stat-val { color: #818CF8 !important; }
.hero-band {
  background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01)) !important;
  border-color: rgba(255,255,255,0.06) !important;
}
.bar-after { background: #5E6AD2 !important; }
.bar-before { background: rgba(255,255,255,0.12) !important; }

/* ═══════════════════════════════════════════════════════
   PHOTO CARDS
   ═══════════════════════════════════════════════════════ */
.photo-card {
  border-color: rgba(255,255,255,0.06) !important;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 18px 40px rgba(0,0,0,0.40) !important;
}

/* ═══════════════════════════════════════════════════════
   FEATURE / RESULT / MODULE CARDS — uniform glass surface
   ═══════════════════════════════════════════════════════ */
.feat-card, .feat,
.res-card,
.ba,
.pc,
.trust-card,
.module-card,
.pricing-card,
.tier,
.spec-card,
.use-card,
.compare-card,
.step-card,
.faq-item,
.roi-card,
.sb-card,
.lede,
.output-card,
.example-block,
.cta-card {
  background: linear-gradient(180deg,
    rgba(255,255,255,0.07) 0%,
    rgba(255,255,255,0.02) 100%) !important;
  border-color: rgba(255,255,255,0.07) !important;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04),
    0 2px 20px rgba(0,0,0,0.36) !important;
  transition: border-color 0.2s cubic-bezier(0.16,1,0.3,1),
              box-shadow 0.2s cubic-bezier(0.16,1,0.3,1),
              transform 0.2s cubic-bezier(0.16,1,0.3,1) !important;
}
.feat:hover, .feat-card:hover,
.res-card:hover,
.ba:hover,
.pc:hover,
.trust-card:hover,
.module-card:hover,
.roi-card:hover,
.output-card:hover {
  border-color: rgba(94,106,210,0.28) !important;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.08),
    0 8px 40px rgba(0,0,0,0.50),
    0 0 60px rgba(94,106,210,0.09) !important;
  transform: translateY(-4px) !important;
}
.feat-icon {
  background: rgba(94,106,210,0.12) !important;
  border-color: rgba(94,106,210,0.18) !important;
}

/* ═══════════════════════════════════════════════════════
   SOLUTION CARDS (.sol-card)
   ═══════════════════════════════════════════════════════ */
.sol-card {
  background: linear-gradient(180deg,
    rgba(255,255,255,0.07) 0%,
    rgba(255,255,255,0.02) 100%) !important;
  border-color: rgba(255,255,255,0.07) !important;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04),
    0 8px 32px rgba(0,0,0,0.36) !important;
}
.sol-card:hover {
  border-color: rgba(94,106,210,0.30) !important;
  box-shadow:
    0 0 0 1px rgba(94,106,210,0.20),
    0 8px 40px rgba(0,0,0,0.50),
    0 0 60px rgba(94,106,210,0.10) !important;
}

/* ═══════════════════════════════════════════════════════
   GLOSSARY INDEX CARDS
   ═══════════════════════════════════════════════════════ */
.card {
  background: linear-gradient(180deg,
    rgba(255,255,255,0.07) 0%,
    rgba(255,255,255,0.02) 100%) !important;
  border-color: rgba(255,255,255,0.07) !important;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04),
    0 2px 20px rgba(0,0,0,0.35) !important;
  transition: border-color 0.2s cubic-bezier(0.16,1,0.3,1),
              box-shadow 0.2s cubic-bezier(0.16,1,0.3,1),
              transform 0.2s cubic-bezier(0.16,1,0.3,1) !important;
}
.card:hover {
  border-color: rgba(94,106,210,0.28) !important;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.08),
    0 8px 40px rgba(0,0,0,0.50),
    0 0 60px rgba(94,106,210,0.09) !important;
  transform: translateY(-4px) !important;
}

/* ═══════════════════════════════════════════════════════
   CHAT / TERM WIDGET
   ═══════════════════════════════════════════════════════ */
.term-wrap {
  background: linear-gradient(180deg,
    rgba(255,255,255,0.07) 0%,
    rgba(255,255,255,0.02) 100%) !important;
  border-color: rgba(255,255,255,0.07) !important;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04),
    0 24px 60px rgba(0,0,0,0.50) !important;
}
.tres { border-color: rgba(94,106,210,0.18) !important; background: rgba(94,106,210,0.05) !important; }

/* ═══════════════════════════════════════════════════════
   COMPARISON TABLE
   ═══════════════════════════════════════════════════════ */
.comp-table {
  border-color: rgba(255,255,255,0.06) !important;
}
.comp-table th {
  background: rgba(255,255,255,0.04) !important;
  border-bottom-color: rgba(255,255,255,0.06) !important;
}
.comp-table tr.us td { background: rgba(94,106,210,0.07) !important; }
.comp-table tr:hover td { background: rgba(94,106,210,0.04) !important; }

/* ═══════════════════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════════════════ */
.pc.pop {
  border-color: rgba(94,106,210,0.50) !important;
  box-shadow:
    0 0 0 1px rgba(94,106,210,0.30),
    0 0 60px rgba(94,106,210,0.15),
    0 24px 60px rgba(0,0,0,0.50) !important;
}
.ck-on { color: #818CF8 !important; }

/* ═══════════════════════════════════════════════════════
   CTA BAND
   ═══════════════════════════════════════════════════════ */
.cta-band {
  background: linear-gradient(135deg,
    rgba(94,106,210,0.08) 0%,
    rgba(124,58,237,0.06) 100%) !important;
  border-top-color: rgba(94,106,210,0.14) !important;
  border-bottom-color: rgba(94,106,210,0.14) !important;
}

/* ═══════════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════════ */
.modal-box {
  background: #0a0a0c !important;
  border-color: rgba(94,106,210,0.22) !important;
  box-shadow:
    0 0 0 1px rgba(94,106,210,0.15),
    0 32px 80px rgba(0,0,0,0.70) !important;
}
.modal-close { background: rgba(255,255,255,0.06) !important; }
.modal-close:hover { background: rgba(255,255,255,0.10) !important; }

/* ═══════════════════════════════════════════════════════
   SECTION LABELS & ACCENTS
   ═══════════════════════════════════════════════════════ */
.section-label, .label, .hero-band-title { color: #5E6AD2 !important; }
.section-label { color: #818CF8 !important; }

/* ═══════════════════════════════════════════════════════
   HOW-IT-WORKS & STEPS
   ═══════════════════════════════════════════════════════ */
.hw-num {
  background: #5E6AD2 !important;
  box-shadow: 0 0 0 5px var(--bg), 0 0 0 7px rgba(94,106,210,0.30) !important;
}
.step-num {
  box-shadow: 0 0 0 5px var(--bg), 0 0 0 7px rgba(94,106,210,0.30) !important;
}

/* ═══════════════════════════════════════════════════════
   DEMO ACCORDION
   ═══════════════════════════════════════════════════════ */
.ds.on .ds-num {
  background: #5E6AD2 !important;
  border-color: #5E6AD2 !important;
}
.ds:hover .ds-title, .ds.on .ds-title { color: #818CF8 !important; }

/* ═══════════════════════════════════════════════════════
   GLOSSARY FILTER & SEARCH
   ═══════════════════════════════════════════════════════ */
.filter-row {
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)) !important;
  border-color: rgba(255,255,255,0.06) !important;
}
.filter-btn {
  background: rgba(255,255,255,0.04) !important;
  border-color: rgba(255,255,255,0.08) !important;
}
.filter-btn:hover {
  border-color: rgba(94,106,210,0.30) !important;
  color: #EDEDEF !important;
}
.filter-btn.active {
  background: rgba(94,106,210,0.14) !important;
  border-color: rgba(94,106,210,0.40) !important;
  color: #818CF8 !important;
}
.search-box {
  background: rgba(255,255,255,0.04) !important;
  border-color: rgba(255,255,255,0.08) !important;
}
.search-box:focus-within {
  border-color: rgba(94,106,210,0.40) !important;
}

/* ═══════════════════════════════════════════════════════
   TOC LINKS
   ═══════════════════════════════════════════════════════ */
.toc-link:hover, .toc-link.active {
  color: #818CF8 !important;
  border-left-color: #5E6AD2 !important;
}

/* ═══════════════════════════════════════════════════════
   BREADCRUMBS
   ═══════════════════════════════════════════════════════ */
.breadcrumb a { color: #5E6AD2 !important; }

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
footer, .footer {
  background: #020203 !important;
  border-top-color: rgba(255,255,255,0.06) !important;
}
.footer-col a:hover { color: #818CF8 !important; }

  `;

  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(style);

  /* ── Inject ambient blob elements ───────────────────────── */
  function injectBlobs() {
    if (document.getElementById('cv-blobs')) return;
    var container = document.createElement('div');
    container.id = 'cv-blobs';
    container.setAttribute('aria-hidden', 'true');
    container.innerHTML =
      '<div class="cv-blob cv-blob-1"></div>' +
      '<div class="cv-blob cv-blob-2"></div>' +
      '<div class="cv-blob cv-blob-3"></div>' +
      '<div class="cv-blob cv-blob-4"></div>';
    var body = document.body;
    if (body) body.insertBefore(container, body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectBlobs);
  } else {
    injectBlobs();
  }
})();
