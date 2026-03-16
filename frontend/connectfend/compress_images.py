import os
import math
import io
import urllib.parse
from pathlib import Path
from PIL import Image

MAX_SIZE = 500 * 1024 # 500 KB

base_dir = Path("c:/Users/silla/Desktop/Development 2/CME V17/frontend/connectfend")
target_dirs = [base_dir / "src", base_dir / "public"]

large_images = []
for d in target_dirs:
    if not d.exists(): continue
    for p in d.rglob("*"):
        if p.is_file() and p.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp", ".gif"]:
            try:
                if p.stat().st_size > MAX_SIZE:
                    large_images.append(p)
            except Exception:
                pass

print(f"Found {len(large_images)} images larger than 500KB.")

replacements = []

for img_path in large_images:
    print(f"Processing: {img_path.relative_to(base_dir)} ({(img_path.stat().st_size / 1024 / 1024):.2f} MB)")
    
    # We will convert to webp (we don't do gif to webp easily via PIL without frames, but let's try. If it fails, skips)
    if img_path.suffix.lower() == ".gif":
        print(" -> Skipping GIF (requires special handling for animation)")
        continue

    webp_path = img_path.with_suffix(".webp")
    
    try:
        with Image.open(img_path) as img:
            # Convert to RGB/RGBA
            if img.mode not in ("RGB", "RGBA"):
                img = img.convert("RGBA")
                
            scale = 1.0
            quality = 90
            
            while True:
                new_width = max(1, int(img.width * scale))
                new_height = max(1, int(img.height * scale))
                
                if scale < 1.0:
                    resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                else:
                    resized_img = img
                
                buf = io.BytesIO()
                resized_img.save(buf, format="WEBP", quality=quality)
                size = buf.tell()
                
                if size <= MAX_SIZE or (scale <= 0.1 and quality <= 10):
                    resized_img.save(webp_path, format="WEBP", quality=quality)
                    print(f"  -> Saved {webp_path.relative_to(base_dir)} ({(size / 1024):.2f} KB) (scale: {scale:.2f}, quality: {quality})")
                    break
                
                if quality > 50:
                    quality -= 10
                else:
                    scale *= 0.8
        
        if img_path.suffix.lower() != ".webp":
            replacements.append((img_path.name, webp_path.name))
            img_path.unlink() # delete old file
    except Exception as e:
        print(f"  -> Failed to process {img_path.relative_to(base_dir)}: {e}")

# Apply replacements in codebase
if replacements:
    print("Replacing occurrences in codebase...")
    # Sort by exact filename length descending to avoid partial word match issues
    replacements.sort(key=lambda x: len(x[0]), reverse=True)
    
    # remove duplicates
    seen = set()
    unique_replacements = []
    for old_name, new_name in replacements:
        if old_name not in seen:
            seen.add(old_name)
            unique_replacements.append((old_name, new_name))
            
    extensions_to_update = [".js", ".jsx", ".ts", ".tsx", ".css", ".html", ".json"]
    for d in target_dirs:
        for p in d.rglob("*"):
            if p.is_file() and p.suffix.lower() in extensions_to_update:
                try:
                    with open(p, "r", encoding="utf-8") as f:
                        content = f.read()
                    
                    new_content = content
                    for old_name, new_name in unique_replacements:
                        encoded_old = urllib.parse.quote(old_name)
                        encoded_new = urllib.parse.quote(new_name)
                        
                        new_content = new_content.replace(old_name, new_name)
                        if encoded_old != old_name:
                            new_content = new_content.replace(encoded_old, encoded_new)
                            
                        # Also handle CSS space replacements where spaces might not be url-encoded but handled with quotes? That's already normal replacement.
                        # Also handle react Native/Webpack requires that might encode URI components?
                        encoded_old_space = old_name.replace(" ", "%20")
                        encoded_new_space = new_name.replace(" ", "%20")
                        if encoded_old_space != old_name:
                             new_content = new_content.replace(encoded_old_space, encoded_new_space)
                            
                    if content != new_content:
                        with open(p, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        print(f"Updated references in {p.relative_to(base_dir)}")
                except Exception as e:
                    pass
    
print("Done.")
