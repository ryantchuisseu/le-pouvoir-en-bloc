"""Miniature verticale 1080x1920 : fond 3D + gros titre jaune + accroche.
Usage : python3 -I thumbnail.py <fond.jpg> <sortie.png> "TITRE" "ACCROCHE (2 lignes max, | = saut)" <font.woff>
Le fond se rend avec : SIZE=1080x1920 PROJ=<dossier sans words.json> node render.js preview <t>
"""
import sys
from PIL import Image, ImageDraw, ImageFilter
bg, out, title, hook, font = sys.argv[1:6]
from PIL import ImageFont
im = Image.open(bg).convert('RGB').resize((1080, 1920))
W, H = im.size
# darken top & bottom for legibility
grad = Image.new('L', (W, H), 0); g = ImageDraw.Draw(grad)
for y in range(H):
    t = max(0, 1 - y / 620) if y < 620 else max(0, (y - 1250) / 670)
    g.line([(0, y), (W, y)], fill=int(190 * t ** 1.3))
im = Image.composite(Image.new('RGB', (W, H), (0, 0, 0)), im, grad)
d = ImageDraw.Draw(im)
def fit(text, maxw, size):
    while size > 30:
        f = ImageFont.truetype(font, size)
        if d.textlength(text, font=f) <= maxw: return f
        size -= 4
    return ImageFont.truetype(font, size)
def draw(text, y, f, fill, stroke=14):
    w = d.textlength(text, font=f)
    d.text(((W - w) / 2 + 8, y + 10), text, font=f, fill=(0, 0, 0), stroke_width=stroke, stroke_fill=(0, 0, 0))
    d.text(((W - w) / 2, y), text, font=f, fill=fill, stroke_width=stroke, stroke_fill=(0, 0, 0))
ft = fit(title.upper(), W - 90, 190)
draw(title.upper(), 150, ft, (255, 210, 63), 16)
y = 1440
for ln in hook.upper().split('|'):
    fh = fit(ln, W - 110, 104); draw(ln, y, fh, (255, 255, 255), 12); y += int(fh.size * 1.18)
im.save(out); im.resize((540, 960)).save(out.replace('.png', '_apercu.jpg'))
print(out)
