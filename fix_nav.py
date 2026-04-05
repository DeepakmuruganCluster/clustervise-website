import os, glob, re

for filepath in glob.glob("/Users/deepak/Documents/ClusterVise website/glossary/*.html") + ["/Users/deepak/Documents/ClusterVise website/index.html"]:
    with open(filepath, 'r') as f:
        content = f.read()

    # Apply CSS fixes
    # Old nav CSS:
    old_nav_css_regex = r"nav\{position:sticky;top:0;z-index:100;background:rgba\(8,18,30,\.86\);backdrop-filter:blur\(16px\);border-bottom:1px solid rgba\(89,227,255,\.16\);height:62px;padding:0 40px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 12px 32px rgba\(0,0,0,\.26\);\}"
    new_nav_css = "nav{position:sticky;top:0;z-index:100;background:rgba(8,18,30,.86);backdrop-filter:blur(16px);border-bottom:1px solid rgba(89,227,255,.16);height:62px;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 32px rgba(0,0,0,.26);}\n.nav-inner{width:100%;max-width:var(--max);padding:0 40px;display:flex;align-items:center;justify-content:space-between;margin:0 auto;}"
    
    content = re.sub(old_nav_css_regex, new_nav_css, content)

    # Note: If it didn't find the exact regex, maybe the spacing is different.
    # Let's do a more robust replacement for nav CSS if needed, but first let's do the HTML replacement.
    
    # HTML replacement: Find <nav>...</nav> and inject <div class="nav-inner">
    if '<div class="nav-inner">' not in content:
        # For index.html and glossary files
        content = content.replace('<nav>\n  <div class="nav-left">', '<nav>\n  <div class="nav-inner">\n    <div class="nav-left">')
        # Close the nav-inner right before </nav>
        content = content.replace('  </div>\n</nav>', '  </div>\n  </div>\n</nav>')

    with open(filepath, 'w') as f:
        f.write(content)
print("Done fixing nav alignment.")
