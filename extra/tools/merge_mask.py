import sys
from PIL import Image

def merge_mask(fp1, fp2):
    # Image
    i1 = Image.open(fp1)
    # Mask
    i2 = Image.open(fp2)
    # Copy
    c = Image.new("RGBA", i1.size, None)
    c.paste(i1, mask=i2)
    return c

i1, i2, out = sys.argv[1:4]
img = merge_mask(i1, i2)
img.save(out)
