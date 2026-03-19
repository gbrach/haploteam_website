import os
from pathlib import Path
from PIL import Image

# config
MAX_WIDTH, MAX_HEIGHT = 600, 400
INPUT_DIR = Path("assets/papers_thumbnails/full_size")
OUTPUT_DIR = Path("assets/papers_thumbnails")

# making sure output dir exists
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

valid_extensions = (".jpg",".jpeg",".png",".bmp",".tiff",".gif",".webp")

image_files = [p for p in INPUT_DIR.iterdir() if p.is_file() and p.suffix.lower() in valid_extensions]

print(f"found {len(image_files)} images in {INPUT_DIR.resolve()}")

for img_path in image_files:
    try:
        with Image.open(img_path) as img:
            orig_size = img.size  # (width, height)

            # handling weird modes before saving to webp
            if img.mode not in ("RGB","RGBA"):
                img = img.convert("RGB")

            # resizing in place, keeping aspect ratio
            img.thumbnail((MAX_WIDTH,MAX_HEIGHT)) # not exceeding box

            base_name = img_path.stem
            output_path = OUTPUT_DIR / f"{base_name}.webp"

            img.save(output_path, "WEBP", optimize=True, quality=90)

            new_size = img.size
            print(f"{img_path.name}: {orig_size} -> {new_size} -> {output_path.name}")
    except Exception as e:
        print(f"error processing {img_path}: {e}")
