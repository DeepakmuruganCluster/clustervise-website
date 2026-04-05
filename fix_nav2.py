import os, glob

files = glob.glob("/Users/deepak/Documents/ClusterVise website/glossary/*.html") + ["/Users/deepak/Documents/ClusterVise website/index.html"]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Simple string replace for CSS
    old_css = "nav{position:sticky;top:0;z-index:100;background:rgba(8,18,30,.86);backdrop-filter:blur(16px);border-bottom:1px solid rgba(89,227,255,.16);height:62px;padding:0 40px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 12px 32px rgba(0,0,0,.26);}"
    # In some glossary pages, it might not have 'padding:0 40px', but let's assume it does.
    new_css = "nav{position:sticky;top:0;z-index:100;background:rgba(8,18,30,.86);backdrop-filter:blur(16px);border-bottom:1px solid rgba(89,227,255,.16);height:62px;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 32px rgba(0,0,0,.26);}\n.nav-inner{width:100%;max-width:var(--max);padding:0 40px;display:flex;align-items:center;justify-content:space-between;margin:0 auto;}"
    
    content = content.replace(old_css, new_css)
    
    # HTML replacement
    if '<div class="nav-inner">' not in content:
        content = content.replace('<nav>\n  <div class="nav-left">', '<nav>\n  <div class="nav-inner">\n    <div class="nav-left">')
        content = content.replace('<nav>\r\n  <div class="nav-left">', '<nav>\n  <div class="nav-inner">\n    <div class="nav-left">')
        
        # In glossary files:
        if '  </div>\n</nav>' in content:
            content = content.replace('  </div>\n</nav>', '  </div>\n  </div>\n</nav>')
        elif '<div class="nav-right">' in content:
            # Need to close nav-inner right before </nav>
            content = content.replace('</nav>', '  </div>\n</nav>', 1)
        
    with open(filepath, 'w') as f:
        f.write(content)

print("Done")
