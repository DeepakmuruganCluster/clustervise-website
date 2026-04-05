import os, glob, re

glossary_files = glob.glob("/Users/deepak/Documents/ClusterVise website/glossary/*.html")

correct_nav_css = """nav{position:sticky;top:0;z-index:100;background:rgba(8,18,30,.86);backdrop-filter:blur(16px);border-bottom:1px solid rgba(89,227,255,.16);height:62px;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 32px rgba(0,0,0,.26);}
.nav-inner{width:100%;max-width:var(--max);padding:0 40px;display:flex;align-items:center;justify-content:space-between;margin:0 auto;}
.nav-left{display:flex;align-items:center;gap:28px;}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;}
.logo-lockup{display:inline-flex;align-items:center;justify-content:center;height:36px;width:206px;background:transparent;border:none;border-radius:0;overflow:hidden;box-shadow:none;}
.logo-lockup img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;transform:scale(1.015);}
.nav-links{display:flex;gap:2px;}
.nav-links a{font-size:13px;font-weight:600;color:#9CB1C8;text-decoration:none;padding:7px 13px;border-radius:7px;transition:all .15s;letter-spacing:.01em;}
.nav-links a:hover,.nav-links a[data-active]{color:#F4FAFF;background:rgba(89,227,255,.10);}
.nav-dropdown{position:relative;display:inline-flex;align-items:center;}
.nav-dropdown>a{font-size:13px;font-weight:600;color:#9CB1C8;text-decoration:none;padding:7px 13px;border-radius:7px;transition:all .15s;letter-spacing:.01em;cursor:pointer;}
.nav-dropdown:hover>a{color:#F4FAFF;background:rgba(89,227,255,.10);}
.dropdown-menu{display:none;position:absolute;top:100%;left:50%;transform:translateX(-50%);background:rgba(8,18,30,.96);backdrop-filter:blur(12px);border:1px solid rgba(89,227,255,.12);border-radius:12px;padding:8px;flex-direction:column;gap:4px;min-width:200px;box-shadow:0 12px 32px rgba(0,0,0,.3);}
.nav-dropdown:hover .dropdown-menu{display:flex;}
.dropdown-menu a{padding:8px 12px;font-size:12.5px;color:#C6D7E8;border-radius:6px;transition:all .15s;white-space:nowrap;}
.dropdown-menu a:hover{color:#fff;background:rgba(89,227,255,.12);}
.nav-right{display:flex;align-items:center;gap:10px;}
.btn{display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:600;font-family:inherit;padding:8px 18px;border-radius:8px;cursor:pointer;transition:all .18s;text-decoration:none;border:none;}
.btn-brand{background:linear-gradient(90deg,#6FEAFF 0%,#59E3FF 60%,#39C9EA 100%);color:#032638;box-shadow:0 10px 28px rgba(31,190,220,.24);transition:all 0.3s cubic-bezier(0.16,1,0.3,1);}
.btn-brand:hover{filter:brightness(1.1);box-shadow:0 0 24px rgba(89,227,255,.5), 0 14px 30px rgba(31,190,220,.34);transform:translateY(-2px);}"""

correct_nav_html = """<nav>
  <div class="nav-inner">
    <div class="nav-left">
    <a href="/" class="nav-logo">
      <span class="logo-lockup">
        <img src="../assets/ClusterVise_Logo_white.svg" alt="ClusterVise logo"/>
      </span>
    </a>
    <div class="nav-links">
      <a href="/#how-it-works">How it works</a>
      <a href="/#pricing">Pricing</a>
      <a href="/glossary/" data-active>Glossary</a>
      <div class="nav-dropdown">
        <a href="/#solutions">Solutions ▾</a>
        <div class="dropdown-menu">
          <a href="/solutions/auto-bom/">Auto BOM</a>
          <a href="/solutions/training-module/">Training Module</a>
          <a href="/solutions/parts-component-library/">Parts &amp; Component Library</a>
        </div>
      </div>
    </div>
  </div>
  <div class="nav-right">
    <button onclick="location.href='/contact/'" class="btn btn-brand">Get in touch</button>
  </div>
  </div>
</nav>"""

for filepath in glossary_files:
    if filepath.endswith("index.html"):
        continue  # skip glossary/index.html since it's already correct

    with open(filepath, 'r') as f:
        content = f.read()

    # Replace CSS block. In these files it goes from `nav{` to `.btn-brand:hover{...}`
    css_pattern = r"nav\{position:sticky;[^}]+\}.*?\.btn-brand:hover\{[^\}]+\}"
    content = re.sub(css_pattern, correct_nav_css.replace('\\', '\\\\'), content, flags=re.DOTALL)
    
    # Replace HTML block
    html_pattern = r"<nav>.*?</nav>"
    content = re.sub(html_pattern, correct_nav_html.replace('\\', '\\\\'), content, flags=re.DOTALL)

    with open(filepath, 'w') as f:
        f.write(content)
print("Finished syncing nav to 35 glossary sub-pages")
