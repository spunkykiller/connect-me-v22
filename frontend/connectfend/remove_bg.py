import sys
from rembg import remove
from PIL import Image

def remove_background(input_path, output_path):
    try:
        input_image = Image.open(input_path)
        output_image = remove(input_image)
        output_image.save(output_path)
        print(f"Successfully processing {input_path} and saved to {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python remove_bg.py <input> <output>")
        sys.exit(1)
    
    in_p = sys.argv[1]
    out_p = sys.argv[2]
    remove_background(in_p, out_p)
