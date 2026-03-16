import os
import re
from pathlib import Path

base_dir = Path('c:/Users/silla/Desktop/Development 2/CME V17/frontend/connectfend/src')
count = 0

def replace_img(match):
    tag = match.group(0)
    if "loading=" in tag:
        return tag
    
    # Exclude the hero landing page image if we know it (let's assume any image in landingpage header shouldn't be lazy loaded)
    # We will just apply it universally for now minus ones that contain "Hero" in the path if possible, but the user requested it broadly.
    # Actually, let's just do all of them, the performance hit of lazy loading a hero is small compared to not doing the others,
    # and we can manually remove it from the main hero image later.
    if tag.endswith('/>'):
        new_tag = tag[:-2] + ' loading="lazy" />'
    else:
        new_tag = tag[:-1] + ' loading="lazy">'
    return new_tag

for p in base_dir.rglob('*.jsx'):
    try:
        with open(p, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to match <img ... >
        # It handles multiline tags as well because [^>] matches newlines.
        new_content = re.sub(r'<img\b[^>]*>', replace_img, content)
        
        if new_content != content:
            with open(p, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f"Added lazy loading to: {p.relative_to(base_dir)}")
    except Exception as e:
        print(f"Error processing {p.name}: {e}")

print(f"Updated {count} files total.")
