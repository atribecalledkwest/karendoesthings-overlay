from argparse import ArgumentParser
from PIL import Image

a = ArgumentParser()
a.add_argument("--input")
a.add_argument("--mask")
a.add_argument("--out")

def merge_mask(fp1, fp2):
    # Image
    i = Image.open(fp1)
    # Mask
    m = Image.open(fp2)

    # Sanity check
    if not i.size == m.size:
        a.error("Image and mask sizes are not the same")

    # Copy
    c = Image.new("RGBA", i1.size, None)
    c.paste(i1, mask=i2)
    return c

p = a.parse_args()

img = merge_mask(p.input, p.mask)
img.save(p.out)
