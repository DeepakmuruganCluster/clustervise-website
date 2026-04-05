import os, glob, re

files = glob.glob("/Users/deepak/Documents/ClusterVise website/glossary/*.html")

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Add margin-bottom to .art-header right before its closing brace if it existed,
    # but it actually doesn't exist as a rule! We will just append to style.
    
    # We will inject some global fixes into the <style> block.
    # section { margin-bottom: 44px; scroll-margin-top: 80px; }
    
    # It might be in the file already:
    content = content.replace("section { margin-bottom: 44px;", "section { margin-top: 60px; margin-bottom: 44px;")
    
    # Slightly indent lists so bullets aren't totally flush with headers
    # .bullet-list, .callout-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    content = content.replace(".bullet-list, .callout-list { list-style: none;", ".bullet-list, .callout-list { margin-left: 2px; list-style: none;")
    
    # Make sure .art-header also drops the next section down if needed:
    if ".art-header {" not in content:
        # insert it
        content = content.replace(".art-header h1 {", ".art-header { margin-bottom: 56px; }\n.art-header h1 {")

    with open(filepath, 'w') as f:
        f.write(content)
print("Done fixing vertical spacing.")
