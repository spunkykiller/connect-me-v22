from PIL import Image

def remove_bg(input_path, output_path, tolerance=30):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()

    # Get the background color from top-left pixel
    bg_color = data[0]
    print(f"Detected background color: {bg_color}")

    new_data = []
    for item in data:
        # Check if pixel is within tolerance of background color
        if abs(item[0] - bg_color[0]) <= tolerance and \
           abs(item[1] - bg_color[1]) <= tolerance and \
           abs(item[2] - bg_color[2]) <= tolerance:
            new_data.append((255, 255, 255, 0)) # Transparent
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path)
    print(f"Saved {output_path}")

remove_bg("src/assets/products/Smart compact switch.webp", "src/assets/products/Smart compact switch_new.webp", 25)
