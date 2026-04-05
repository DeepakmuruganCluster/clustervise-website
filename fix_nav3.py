import os, glob, re

files = glob.glob("/Users/deepak/Documents/ClusterVise website/glossary/*.html") + ["/Users/deepak/Documents/ClusterVise website/index.html"]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Regex to match nav styling loosely
    pattern = r"nav\s*\{[^}]*justify-content:\s*space-between[^}]*\}"
    
    def repl_css(m):
        orig = m.group(0)
        new_nav = orig.replace("padding:0 40px;", "").replace("justify-content:space-between;", "justify-content:center;")
        return new_nav + "\n.nav-inner{width:100%;max-width:1120px;padding:0 40px;display:flex;align-items:center;justify-content:space-between;margin:0 auto;}"

    content = re.sub(pattern, repl_css, content)
    
    # HTML replace:
    if '<div class="nav-inner">' not in content:
        content = re.sub(r'<nav>\s*<div class="nav-left">', '<nav>\n  <div class="nav-inner">\n    <div class="nav-left">', content)
        
        # Closing it: we'll find </nav> and replace it
        content = content.replace('</nav>', '  </div>\n</nav>')

    with open(filepath, 'w') as f:
        f.write(content)
print("done")
