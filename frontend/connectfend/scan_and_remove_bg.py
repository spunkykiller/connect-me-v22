import os
from PIL import Image

def remove_bg(input_path, tolerance=30):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        bg_color = data[0]

        if bg_color[3] == 0: 
            return False

        if not (220 <= bg_color[0] <= 255 and 220 <= bg_color[1] <= 255 and 220 <= bg_color[2] <= 255):
             return False
        
        w, h = img.size
        corners = [
            img.getpixel((0,0)), img.getpixel((w-1,0)),
            img.getpixel((0,h-1)), img.getpixel((w-1,h-1))
        ]
        
        for c in corners:
            if abs(c[0] - bg_color[0]) > tolerance or \
               abs(c[1] - bg_color[1]) > tolerance or \
               abs(c[2] - bg_color[2]) > tolerance:
                return False

        print(f"Processing: {input_path} with bg color: {bg_color}")
        new_data = []
        import itertools
        
        for item in data:
            if abs(item[0] - bg_color[0]) <= tolerance and \
               abs(item[1] - bg_color[1]) <= tolerance and \
               abs(item[2] - bg_color[2]) <= tolerance:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        
        # save as webp or png if it was jpeg
        if input_path.endswith('.jpeg') or input_path.endswith('.jpg'):
             out_path = input_path.rsplit('.', 1)[0] + '.png'
             img.save(out_path)
             os.remove(input_path)
        else:
             img.save(input_path) 
        
        return True
    except Exception as e:
        print(f"Error on {input_path}: {e}")
        return False

folder = "src/assets/products"
processed = 0
if os.path.exists(folder):
    for filename in os.listdir(folder):
        if filename.endswith(".webp") or filename.endswith(".jpeg") or filename.endswith(".jpg") or filename.endswith(".png"):
            if remove_bg(os.path.join(folder, filename), 25):
                processed += 1

print(f"Processed {processed} images.")
