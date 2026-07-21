(function () {
  'use strict';

  var root = document.documentElement;
  var STORE_KEY = 'cv-theme';
  var styleId = 'cv-light-theme';

  function getStoredTheme() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function storeTheme(theme) {
    try { localStorage.setItem(STORE_KEY, theme); } catch (e) {}
  }

  function swapLogos(theme) {
    document.querySelectorAll('.logo-lockup img, img[alt*="ClusterVise"]').forEach(function (img) {
      if (!img.dataset.lightSrc) {
        img.dataset.darkSrc = img.getAttribute('src');
        img.dataset.lightSrc = img.getAttribute('src').replace(
          /ClusterVise_Logo_white(_v2)?\.svg/,
          'ClusterVise_Logo_dark.svg'
        );
      }
      var target = theme === 'light' ? img.dataset.lightSrc : img.dataset.darkSrc;
      if (target && img.getAttribute('src') !== target) img.setAttribute('src', target);
    });
  }

  function updateToggleUI(btn, theme) {
    if (!btn) return;
    btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    btn.innerHTML = theme === 'light' ? ICON_MOON : ICON_SUN;
  }

  var ICON_SUN = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  var ICON_MOON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function applyTheme(theme, animate) {
    if (animate) {
      root.classList.add('cv-theme-transition');
      window.setTimeout(function () { root.classList.remove('cv-theme-transition'); }, 260);
    }
    root.setAttribute('data-theme', theme);
    swapLogos(theme);
    updateToggleUI(document.querySelector('.theme-switch'), theme);
  }

  function injectToggleButton(theme) {
    var navRight = document.querySelector('.nav-right');
    if (!navRight || navRight.querySelector('.theme-switch')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-switch';
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      storeTheme(next);
      applyTheme(next, true);
    });
    navRight.insertBefore(btn, navRight.firstChild);
    updateToggleUI(btn, theme);
  }

  function injectMobileNav() {
    var nav = document.querySelector('nav');
    var navLinks = document.querySelector('.nav-links');
    var navRight = document.querySelector('.nav-right');
    var ctaBtn = navRight ? navRight.querySelector('.btn-brand') : null;
    if (!nav || !navLinks || !navRight || document.querySelector('.cv-mnav-toggle')) return;

    var panel = document.createElement('div');
    panel.className = 'cv-mnav-panel';

    Array.prototype.forEach.call(navLinks.children, function (el) {
      if (el.tagName === 'A') {
        panel.appendChild(el.cloneNode(true));
      } else if (el.classList.contains('nav-dropdown')) {
        var trigger = el.querySelector(':scope > a');
        var label = document.createElement('div');
        label.className = 'cv-mnav-label';
        label.textContent = trigger ? trigger.textContent.replace('▾', '').trim() : '';
        panel.appendChild(label);
        Array.prototype.forEach.call(el.querySelectorAll('.dropdown-menu a'), function (sub) {
          var clone = sub.cloneNode(true);
          clone.classList.add('cv-mnav-sublink');
          panel.appendChild(clone);
        });
      }
    });

    if (ctaBtn) {
      var ctaWrap = document.createElement('div');
      ctaWrap.className = 'cv-mnav-cta';
      ctaWrap.appendChild(ctaBtn.cloneNode(true));
      panel.appendChild(ctaWrap);
    }

    var backdrop = document.createElement('div');
    backdrop.className = 'cv-mnav-backdrop';

    document.body.appendChild(panel);
    document.body.appendChild(backdrop);

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'cv-mnav-toggle';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    function closePanel() {
      panel.classList.remove('open');
      backdrop.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function openPanel() {
      var navRect = nav.getBoundingClientRect();
      panel.style.top = navRect.bottom + 'px';
      backdrop.style.top = navRect.bottom + 'px';
      panel.classList.add('open');
      backdrop.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
    toggle.addEventListener('click', function () {
      if (panel.classList.contains('open')) closePanel(); else openPanel();
    });
    backdrop.addEventListener('click', closePanel);
    panel.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closePanel();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closePanel();
    });

    navRight.insertBefore(toggle, navRight.firstChild);
  }

  function injectStyles() {
    if (document.getElementById(styleId)) return;
    var style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
/* Logo lockup was cropped top/bottom: the 206x36 container is narrower
   (aspect 5.7:1) than the logo SVG (aspect 3.1:1), and object-fit:cover
   scaled to fill the width, cropping ~23% off the top and bottom.
   Keep the production width (206px, so the logo reads at its established
   size) but grow the box height to the SVG's true aspect so nothing gets
   cropped. */
.logo-lockup{ height:66px !important; }
.logo-lockup img{
  width:100% !important;
  height:100% !important;
  object-fit:contain !important;
  object-position:center !important;
  transform:none !important;
}

.theme-switch{
  display:inline-flex;align-items:center;justify-content:center;
  width:34px;height:34px;flex:0 0 auto;
  border-radius:999px;
  border:1px solid var(--border-2,var(--border,rgba(89,227,255,.18)));
  background:rgba(255,255,255,.03);
  color:var(--text-2,#AABDD3);
  cursor:pointer;
  transition:background-color .15s ease,color .15s ease,border-color .15s ease,transform .15s ease;
}
.theme-switch:hover{ color:var(--text,#EAF4FF); border-color:var(--brand,#59E3FF); transform:translateY(-1px); }
.theme-switch:focus-visible{ outline:2px solid var(--brand,#59E3FF); outline-offset:2px; }
.theme-switch svg{ display:block; }

html.cv-theme-transition,
html.cv-theme-transition *{
  transition:background-color .22s ease,color .22s ease,border-color .22s ease,box-shadow .22s ease,fill .22s ease !important;
}

/* Pages cap content at 1120px, leaving large empty gutters on wide screens.
   Widen it a bit — applies to both themes since it's a layout issue, not a
   color one. Every section/nav already reads this via var(--max). */
:root{ --max:1280px !important; }

/* Step-number circles sat flush against the top edge of their card with no
   breathing room — pre-existing in both themes, just more visible now that
   light mode gives the steps banner a visible border. */
.step{ padding-top:28px !important; padding-bottom:24px !important; }

/* ═══════════════════════════════════════════════════════
   MOBILE NAV — nav-links is simply display:none below ~900px on every
   template (some at 960px, glossary at 640px) with no replacement, so
   phone users lose all navigation. Add a hamburger + slide-down panel,
   built from each page's own nav-links so hrefs stay correct regardless
   of relative path depth.
   ═══════════════════════════════════════════════════════ */
@media (max-width:900px){
  .nav-links{ display:none !important; }
  .cv-mnav-toggle{ display:inline-flex !important; }
  .nav-right>.btn-brand{ display:none !important; }
}
.cv-mnav-toggle{
  display:none;
  align-items:center;justify-content:center;
  width:34px;height:34px;flex:0 0 auto;
  border-radius:999px;
  border:1px solid var(--border-2,var(--border,rgba(89,227,255,.18)));
  background:rgba(255,255,255,.03);
  color:var(--text,#EDEDEF);
  cursor:pointer;
  margin-right:6px;
}
.cv-mnav-toggle span{
  display:block;width:14px;height:1.5px;background:currentColor;
  transition:transform .2s ease,opacity .2s ease;
}
.cv-mnav-toggle span+span{ margin-top:3px; }
.cv-mnav-toggle[aria-expanded="true"] span:nth-child(1){ transform:translateY(4.5px) rotate(45deg); }
.cv-mnav-toggle[aria-expanded="true"] span:nth-child(2){ opacity:0; }
.cv-mnav-toggle[aria-expanded="true"] span:nth-child(3){ transform:translateY(-4.5px) rotate(-45deg); }

.cv-mnav-backdrop{
  position:fixed;inset:0;background:rgba(5,9,15,.35);z-index:140;
  opacity:0;pointer-events:none;transition:opacity .2s ease;
}
.cv-mnav-backdrop.open{ opacity:1;pointer-events:auto; }

.cv-mnav-panel{
  position:fixed;left:0;right:0;z-index:150;
  background:var(--bg-2,#0a0a0c);
  border-bottom:1px solid var(--border,rgba(255,255,255,.08));
  box-shadow:0 20px 50px rgba(0,0,0,.30);
  max-height:0;overflow:hidden;
  transition:max-height .25s ease;
}
.cv-mnav-panel.open{ max-height:80vh;overflow-y:auto; }
.cv-mnav-panel a{
  display:block;padding:14px 24px;
  color:var(--text,#EDEDEF);text-decoration:none;
  font-size:15px;font-weight:600;
  border-bottom:1px solid var(--border,rgba(255,255,255,.06));
}
.cv-mnav-panel a.cv-mnav-sublink{
  padding-left:40px;font-size:14px;font-weight:500;color:var(--text-2,#8A8F98);
}
.cv-mnav-label{
  padding:14px 24px 6px;
  font-family:var(--mono,monospace);font-size:11px;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;color:var(--text-3,#71879E);
}
.cv-mnav-cta{ padding:18px 24px; }
.cv-mnav-cta .btn-brand{ width:100%;text-align:center; }

/* ═══════════════════════════════════════════════════════
   LIGHT THEME — token layer
   ═══════════════════════════════════════════════════════ */
html[data-theme="light"]{
  --brand:#4F46E5;
  --brand-dk:#4338CA;
  --brand-lt:rgba(79,70,229,.08);
  --brand-border:rgba(79,70,229,.20);
  --accent:#4F46E5;
  --accent-dk:#4338CA;
  --accent-lt:rgba(79,70,229,.08);
  --warn:#B45309;
  --warn-lt:rgba(180,83,9,.08);
  --green:#059669;
  --green-lt:rgba(5,150,105,.08);
  --red:#DC2626;
  --orange:#B45309;
  --navy:#F3F4F9;
  --navy-2:#E9EBF5;
  --bg:#F8F9FC;
  --bg-2:#FFFFFF;
  --bg-3:#F0F1F8;
  --bg-4:#E5E7F2;
  --text:#14162B;
  --text-2:#585C75;
  --text-3:#83869C;
  --border:#E1E3EF;
  --border-2:#CDD0E3;
  --glass:linear-gradient(180deg,rgba(255,255,255,.92),rgba(255,255,255,.72));
  --glass-strong:linear-gradient(180deg,rgba(255,255,255,.98),rgba(255,255,255,.86));
  --surface-ring:inset 0 1px 0 rgba(255,255,255,.9);
  --card:#FFFFFF;
  --cardForeground:#14162B;
  --ring:#4F46E5;
  --shadow:0 1px 3px rgba(20,22,50,.07);
  --shadow-md:0 18px 44px rgba(20,22,50,.09);
  --shadow-lg:0 32px 84px rgba(20,22,50,.13);
  color-scheme:light;
}

/* Base surfaces */
html[data-theme="light"] body{
  background:
    radial-gradient(circle at 14% 0%, rgba(79,70,229,.07), transparent 22%),
    radial-gradient(circle at 86% 8%, rgba(79,70,229,.045), transparent 18%),
    linear-gradient(180deg,#FFFFFF 0%,#F8F9FC 44%,#F4F5FA 100%) !important;
  color:var(--text) !important;
}
html[data-theme="light"] body::before{
  background:
    linear-gradient(rgba(20,22,50,.026) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20,22,50,.026) 1px, transparent 1px) !important;
  opacity:.5 !important;
}
html[data-theme="light"] #cv-blobs{ opacity:.28; }
html[data-theme="light"] ::selection{ background:rgba(79,70,229,.18) !important; color:#14162B !important; }
html[data-theme="light"] ::-webkit-scrollbar-thumb{ background:rgba(79,70,229,.30) !important; }

/* Nav */
html[data-theme="light"] nav{
  background:rgba(255,255,255,.86) !important;
  border-bottom-color:rgba(79,70,229,.14) !important;
  box-shadow:0 12px 32px rgba(20,22,50,.07) !important;
  backdrop-filter:blur(16px);
}
html[data-theme="light"] .nav-links a,
html[data-theme="light"] .nav-dropdown>a{ color:var(--text-2) !important; }
html[data-theme="light"] .nav-links a:hover,
html[data-theme="light"] .nav-links a[data-active],
html[data-theme="light"] .nav-dropdown:hover>a{
  color:#14162B !important;
  background:rgba(79,70,229,.08) !important;
}
html[data-theme="light"] .dropdown-menu{
  background:rgba(255,255,255,.98) !important;
  border-color:rgba(79,70,229,.14) !important;
  box-shadow:0 20px 50px rgba(20,22,50,.12) !important;
}
html[data-theme="light"] .dropdown-menu a{ color:var(--text-2) !important; }
html[data-theme="light"] .dropdown-menu a:hover{
  color:#14162B !important;
  background:rgba(79,70,229,.07) !important;
}

/* Headline emphasis — pages hardcode a brand→mint→accent gradient tuned
   for a dark background; on white it read as a muddy yellow-green. Swap in
   an indigo→violet→magenta gradient: stays out of yellow/green territory,
   but spans a wide enough hue range to feel as lively as dark mode's
   cyan→green sweep instead of reading as a flat single-hue wash. */
html[data-theme="light"] h1 em,
html[data-theme="light"] .hero h1 em{
  background:linear-gradient(90deg, #4338CA 0%, #7C3AED 55%, #C026D3 100%) !important;
  -webkit-background-clip:text !important;
  background-clip:text !important;
  color:transparent !important;
}

/* Buttons */
html[data-theme="light"] .btn-ghost{
  background:#FFFFFF !important;
  color:var(--text) !important;
  border-color:var(--border-2) !important;
}
html[data-theme="light"] .btn-ghost:hover{
  border-color:var(--brand) !important;
  color:#0C1B2A !important;
}
html[data-theme="light"] .btn-outline{
  background:transparent !important;
  color:var(--text) !important;
  border-color:var(--border-2) !important;
}
html[data-theme="light"] .btn-brand,
html[data-theme="light"] .pc-btn,
html[data-theme="light"] .cta-btn,
html[data-theme="light"] .modal-submit{
  background:linear-gradient(90deg,#6D64F0 0%,#4F46E5 60%,#4338CA 100%) !important;
  color:#FFFFFF !important;
  box-shadow:0 10px 28px rgba(79,70,229,.28) !important;
}
html[data-theme="light"] .btn-brand:hover,
html[data-theme="light"] .pc-btn:hover,
html[data-theme="light"] .cta-btn:hover,
html[data-theme="light"] .modal-submit:hover{
  box-shadow:0 14px 34px rgba(79,70,229,.36) !important;
}

/* Glass surfaces: hero panels, cards, widgets.
   .hero itself is NOT included here on purpose. On solutions/glossary
   pages the card's text content (paragraph max-width, no right-side
   element) doesn't fill the card's full width — invisible in dark mode
   since .hero has no background there, but boxing it in white in light
   mode exposed that as a big dead patch of empty card. Leaving .hero
   transparent (matching dark mode) avoids the problem entirely; the
   .hero-stats boxes inside it still get their own card treatment below.
   .hero-left/.hero-right (homepage's two-column hero) are a separate,
   genuinely card-shaped case and keep their styling. */
html[data-theme="light"] :is(
  .hero-left,.hero-right,.hero-band,.hero-stats>div,.card,.feat,.feat-card,.sol-card,.pricing-card,.pc,
  .trust-card,.module-card,.step,.step-card,.compare-card,.use-card,.res-card,.roi-card,
  .output-card,.cta-card,.faq-item,.term-wrap,.modal-box,.search-box,.filter-row,
  .lede,.callout,.workflow,.sidebar,.toc,.photo-card,.sb-card,.example-block,
  .ba,.stat-card,.showcase,.hstat){
  background:#FFFFFF !important;
  border-color:var(--border) !important;
  box-shadow:0 2px 20px rgba(15,35,60,.06) !important;
}
/* .hero itself stays card-free (see note above), but the glossary page's
   own CSS hardcodes a dark navy gradient directly on .hero — without an
   override that leaks straight through in light mode. Neutralize just the
   background, not the whole card treatment. */
html[data-theme="light"] .hero{
  background:transparent !important;
  border-color:transparent !important;
  box-shadow:none !important;
}
/* Solutions pages give .hero 72px of top padding — sized for when it was
   a padded card. With no card left to justify it, that reads as a huge
   dead gap between the breadcrumb and the content. Glossary's .hero
   already used a much smaller 34px, so this also just brings solutions
   pages in line with that instead of introducing a third value. Applies
   to both themes — this was never actually card-dependent, dark mode's
   hero never had a card either and had the exact same oversized gap. */
.hero{ padding-top:32px !important; padding-bottom:40px !important; }
/* Dark theme gives hovered cards/buttons a soft brand-colored glow
   (e.g. .feat:hover box-shadow:0 0 30px rgba(89,227,255,.15)). Mirror that
   here with the indigo brand color instead of cyan. */
html[data-theme="light"] :is(.card,.feat,.feat-card,.sol-card,.pricing-card,.pc,.res-card,.roi-card,.output-card,.trust-card,.module-card,.step-card,.compare-card,.use-card,.faq-item,.sb-card):hover{
  border-color:var(--brand-border) !important;
  box-shadow:0 12px 34px rgba(15,35,60,.10), 0 0 32px rgba(79,70,229,.16) !important;
  transform:translateY(-2px);
}
/* .step items tile edge-to-edge with no gap to form one continuous banner.
   A glow on a hovered item gets painted UNDER its later-DOM siblings unless
   it's lifted into its own stacking context, so it needs position:relative
   for z-index to actually take effect — without it the glow was being
   silently clipped by the neighboring step's opaque background. */
html[data-theme="light"] .step{ position:relative; }
html[data-theme="light"] .step:hover{
  z-index:2;
  box-shadow:0 0 0 1px rgba(79,70,229,.18), 0 0 26px rgba(79,70,229,.32), 0 0 56px rgba(79,70,229,.22) !important;
}
html[data-theme="light"] .step:hover .step-num{
  box-shadow:0 0 0 5px var(--bg-2), 0 0 0 7px rgba(79,70,229,.35), 0 0 24px 4px rgba(79,70,229,.45) !important;
}

/* Steps banner reads narrower than it needs to next to the section copy
   above it — break it out clearly wider than the text column. Not on
   narrow screens: a fixed -64px breakout would push it past the viewport
   edge and cause horizontal scroll on phones. */
@media (min-width:701px){
  html[data-theme="light"] .steps{
    margin-left:-64px !important;
    margin-right:-64px !important;
  }
}
html[data-theme="light"] .feat-icon,
html[data-theme="light"] .trust-icon,
html[data-theme="light"] .faq-icon{
  background:var(--brand-lt) !important;
  border-color:var(--brand-border) !important;
  color:var(--brand-dk) !important;
}

/* Hero band bars */
html[data-theme="light"] .bar-track{ background:var(--bg-3) !important; }
html[data-theme="light"] .bar-before{ background:var(--border-2) !important; }
html[data-theme="light"] .bar-after{ background:var(--brand) !important; }

/* Term / chat widget */
html[data-theme="light"] .term-bar{ background:var(--bg-2) !important; border-bottom:1px solid var(--border) !important; }
html[data-theme="light"] .tres{ background:var(--brand-lt) !important; border-color:var(--brand-border) !important; }
html[data-theme="light"] .tav.e,
html[data-theme="light"] .tav.a{ background:var(--bg-3) !important; color:var(--text) !important; border:1px solid var(--border) !important; }

/* Hardcoded light-on-dark body copy → flip to dark-on-light */
html[data-theme="light"] :is(.hero-desc,.sec-sub,.lede,.hero .lead,.card-desc,.tbubble,.filter-label,.grid-count,.dropdown-menu a){
  color:var(--text-2) !important;
}
html[data-theme="light"] .tres-val{ color:var(--text) !important; }
html[data-theme="light"] .tres-hdr{ color:var(--green) !important; }
html[data-theme="light"] .cta-band h2{ color:var(--text) !important; }
html[data-theme="light"] .cta-band p{ color:var(--text-2) !important; }

/* Tags / pills / labels — bumped from the base brand-lt/brand-border tint
   (8%/20% alpha) so they carry some visual weight instead of nearly
   disappearing against a white page. */
html[data-theme="light"] :is(.term-chip,.meta-pill,.hero-eyebrow,.pill,.ex-tag,.output-tag,.photo-tag,.card-cat,.modal-plan-badge){
  background:rgba(79,70,229,.10) !important;
  border-color:rgba(79,70,229,.30) !important;
  color:var(--brand-dk) !important;
}
html[data-theme="light"] .section-label,
html[data-theme="light"] .label,
html[data-theme="light"] .hero-band-title{ color:var(--brand-dk) !important; }

/* Glossary category tags used 7 unrelated hues (violet/orange/pink/amber/...)
   — reads as noisy rainbow on white. Flatten to one consistent brand tone. */
html[data-theme="light"] .card-cat{ color:var(--brand-dk) !important; }
html[data-theme="light"] .toc-link:hover,
html[data-theme="light"] .toc-link.active{ color:var(--brand-dk) !important; border-left-color:var(--brand) !important; }

/* Tables */
html[data-theme="light"] table,
html[data-theme="light"] .comp-table,
html[data-theme="light"] .bom-table{
  background:#FFFFFF !important;
  color:var(--text) !important;
  border-color:var(--border) !important;
}
html[data-theme="light"] th,
html[data-theme="light"] .comp-table th{
  background:var(--bg-3) !important;
  color:var(--text) !important;
  border-color:var(--border) !important;
}
html[data-theme="light"] td{ border-color:var(--border) !important; }
html[data-theme="light"] tr:hover td,
html[data-theme="light"] .comp-table tr:hover td{ background:var(--bg-3) !important; }
html[data-theme="light"] .comp-table tr.us td{ background:var(--brand-lt) !important; }

/* Filters / search */
html[data-theme="light"] .filter-row,
html[data-theme="light"] .search-box{ background:#FFFFFF !important; border-color:var(--border) !important; }
html[data-theme="light"] .filter-btn{ background:var(--bg-3) !important; border-color:var(--border) !important; color:var(--text-2) !important; }
html[data-theme="light"] .filter-btn:hover{ border-color:var(--brand-border) !important; color:var(--text) !important; }
html[data-theme="light"] .filter-btn.active{ background:var(--brand-lt) !important; border-color:var(--brand-border) !important; color:var(--brand-dk) !important; }
html[data-theme="light"] .search-box:focus-within{ border-color:var(--brand-border) !important; }

/* Pricing */
html[data-theme="light"] .pc.pop{ border-color:var(--brand) !important; box-shadow:0 0 0 1px var(--brand-border),0 24px 60px rgba(15,35,60,.14) !important; }
html[data-theme="light"] .ck-on{ color:var(--brand-dk) !important; }

/* CTA band */
html[data-theme="light"] .cta-band{
  background:linear-gradient(135deg, var(--brand-lt) 0%, var(--accent-lt) 100%) !important;
  border-top-color:var(--brand-border) !important;
  border-bottom-color:var(--brand-border) !important;
}

/* Modal */
html[data-theme="light"] .modal-overlay{ background:rgba(12,27,42,.45) !important; }
html[data-theme="light"] .modal-box{ background:#FFFFFF !important; border-color:var(--border) !important; box-shadow:0 32px 80px rgba(15,35,60,.20) !important; }
html[data-theme="light"] .modal-close{ background:var(--bg-3) !important; color:var(--text) !important; }
html[data-theme="light"] .modal-close:hover{ background:var(--border-2) !important; }

/* Photo cards — captions are white text over a dark scrim baked into the
   photo itself (.photo-overlay); that scrim must stay dark regardless of
   page theme or the caption text becomes unreadable. Only the card frame
   adapts. */
html[data-theme="light"] .photo-card{ border-color:var(--border) !important; }
html[data-theme="light"] .photo-card img,
html[data-theme="light"] .hw-photo img{ filter:none !important; }

/* Footer */
html[data-theme="light"] footer,
html[data-theme="light"] .footer{
  background:#FFFFFF !important;
  border-top-color:var(--border) !important;
}
html[data-theme="light"] .footer-col a{ color:var(--text-2) !important; }
html[data-theme="light"] .footer-col a:hover{ color:var(--brand-dk) !important; }
html[data-theme="light"] .footer-bottom,
html[data-theme="light"] .grid-count,
html[data-theme="light"] .card-arrow{ color:var(--text-3) !important; }

/* Inputs */
html[data-theme="light"] :is(input,select,textarea){
  background:#FFFFFF !important;
  color:var(--text) !important;
  border-color:var(--border-2) !important;
}
html[data-theme="light"] :is(input,select,textarea)::placeholder{ color:var(--text-3) !important; }
html[data-theme="light"] :is(input,select,textarea):focus{ border-color:var(--brand) !important; }

/* Focus ring */
html[data-theme="light"] :is(a,button,input,select,textarea,summary,[tabindex]):focus-visible{
  outline:2px solid var(--brand) !important;
  outline-offset:2px !important;
}
`;
    document.head.appendChild(style);
  }

  function init() {
    var theme = getStoredTheme() || 'dark';
    injectStyles();
    root.setAttribute('data-theme', theme);
    swapLogos(theme);
    injectToggleButton(theme);
    injectMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
