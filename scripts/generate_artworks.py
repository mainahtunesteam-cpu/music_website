import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ARTWORKS = [
    {
        'filename': 'kiss-of-life.png',
        'title': 'KISS OF LIFE',
        'artist': 'ELARA MOORE',
        'style': 'R&B / SOUL',
        'colors': [(240, 110, 40), (160, 45, 20), (30, 12, 10)],
        'type': 'sunset'
    },
    {
        'filename': 'dont-wake-the-devil.png',
        'title': "DON'T WAKE THE DEVIL",
        'artist': 'VELLUM NOIR',
        'style': 'JAZZ / BLUES',
        'colors': [(45, 45, 50), (20, 20, 25), (8, 8, 12)],
        'type': 'noir'
    },
    {
        'filename': 'hold-my-soul.png',
        'title': 'HOLD MY SOUL',
        'artist': 'ELIAS ROWE',
        'style': 'BLUES / SOUL',
        'colors': [(210, 140, 60), (120, 65, 25), (25, 15, 10)],
        'type': 'amber'
    },
    {
        'filename': 'maddie-in-heaven.png',
        'title': 'MADDIE IN HEAVEN',
        'artist': 'LUNA CREST',
        'style': 'ALTERNATIVE / ROMANCE',
        'colors': [(190, 150, 230), (100, 70, 160), (20, 15, 45)],
        'type': 'ethereal'
    },
    {
        'filename': 'sad-trap.png',
        'title': 'SAD TRAP',
        'artist': 'AFTERHOURS AUDIO',
        'style': 'EMOTIONAL RAP',
        'colors': [(160, 30, 180), (60, 15, 90), (10, 5, 20)],
        'type': 'neon'
    },
    {
        'filename': 'im-the-type.png',
        'title': "I'M THE TYPE",
        'artist': 'BIG SWERVE',
        'style': 'HIP-HOP / STREET',
        'colors': [(255, 90, 20), (20, 160, 220), (15, 20, 30)],
        'type': 'graffiti'
    },
    {
        'filename': 'side-streets-and-alley-ways.png',
        'title': 'SIDE STREETS & ALLEY WAYS',
        'artist': 'MOCHA',
        'style': 'HIP-HOP / NOIR',
        'colors': [(220, 160, 40), (70, 50, 25), (12, 14, 20)],
        'type': 'street'
    },
    {
        'filename': 'hip-hop-visual-artwork.png',
        'title': 'HIP-HOP 3D VISUAL',
        'artist': 'CREATIVE SERIES',
        'style': '3D CGI ARTWORK',
        'colors': [(0, 220, 255), (100, 50, 200), (10, 12, 35)],
        'type': 'chrome'
    },
    {
        'filename': 'most-valuable-steppa.png',
        'title': 'MOST VALUABLE STEPPA',
        'artist': 'CHAMPION SERIES',
        'style': 'LUXURY / HIP-HOP',
        'colors': [(255, 215, 0), (180, 130, 20), (15, 18, 25)],
        'type': 'gold'
    },
    {
        'filename': 'the-streets-made-me.png',
        'title': 'THE STREETS MADE ME',
        'artist': 'URBAN COLLECTIVE',
        'style': 'GRITTY RAP',
        'colors': [(200, 200, 205), (80, 80, 85), (10, 10, 12)],
        'type': 'monochrome'
    },
    {
        'filename': 'street-runner.png',
        'title': 'STREET RUNNER',
        'artist': 'NIGHTLINE VELOCITY',
        'style': 'FAST HIP-HOP',
        'colors': [(255, 40, 100), (40, 220, 255), (12, 10, 30)],
        'type': 'motion'
    },
    {
        'filename': 'ghetto-hero.png',
        'title': 'GHETTO HERO',
        'artist': 'ICON SERIES',
        'style': 'CLASSIC HIP-HOP',
        'colors': [(230, 70, 30), (190, 150, 30), (20, 20, 25)],
        'type': 'comic'
    },
    {
        'filename': 'street-life.png',
        'title': 'STREET LIFE',
        'artist': 'RAW SESSIONS',
        'style': 'DOCUMENTARY RAP',
        'colors': [(180, 140, 100), (90, 70, 50), (15, 14, 12)],
        'type': 'film'
    },
    {
        'filename': 'lost-in-the-city.png',
        'title': 'LOST IN THE CITY',
        'artist': 'MIDNIGHT LAB',
        'style': 'ATMOSPHERIC TRAP',
        'colors': [(20, 200, 220), (180, 40, 120), (8, 10, 25)],
        'type': 'cyber'
    },
    {
        'filename': 'chasing-dreams.png',
        'title': 'CHASING DREAMS',
        'artist': 'GOLDEN ERA',
        'style': 'ASPIRATIONAL RAP',
        'colors': [(255, 170, 50), (200, 80, 20), (20, 15, 30)],
        'type': 'golden'
    },
    {
        'filename': 'broken-promises.png',
        'title': 'BROKEN PROMISES',
        'artist': 'SCARLET NOIR',
        'style': 'MELODIC TRAP',
        'colors': [(220, 30, 60), (100, 15, 30), (12, 6, 12)],
        'type': 'shatter'
    },
    {
        'filename': 'voice-of-the-streets.png',
        'title': 'VOICE OF THE STREETS',
        'artist': 'BOOM BAP CHRONICLES',
        'style': 'VINTAGE HIP-HOP',
        'colors': [(240, 180, 80), (120, 70, 30), (18, 15, 12)],
        'type': 'vinyl'
    },
    {
        'filename': 'the-man-behind-the-moon.png',
        'title': 'MAN BEHIND THE MOON',
        'artist': 'NOCTURNAL LAB',
        'style': 'DARK AMBIENT',
        'colors': [(220, 230, 255), (60, 80, 140), (6, 8, 20)],
        'type': 'lunar'
    },
    {
        'filename': 'some-goodbyes-hurt-more.png',
        'title': 'SOME GOODBYES HURT MORE',
        'artist': 'TIANA BROOKS',
        'style': 'CINEMATIC SOUL',
        'colors': [(100, 150, 220), (40, 60, 110), (10, 12, 25)],
        'type': 'rain'
    }
]

def render_artwork(spec, out_dir='public/artwork', size=(1000, 1000)):
    w, h = size
    img = Image.new('RGB', (w, h), color=(10, 12, 18))
    draw = ImageDraw.Draw(img)
    
    # Generate background gradient
    c1, c2, c3 = spec['colors']
    for y in range(h):
        ratio = y / h
        if ratio < 0.5:
            local_r = ratio / 0.5
            r = int(c1[0] * (1 - local_r) + c2[0] * local_r)
            g = int(c1[1] * (1 - local_r) + c2[1] * local_r)
            b = int(c1[2] * (1 - local_r) + c2[2] * local_r)
        else:
            local_r = (ratio - 0.5) / 0.5
            r = int(c2[0] * (1 - local_r) + c3[0] * local_r)
            g = int(c2[1] * (1 - local_r) + c3[1] * local_r)
            b = int(c2[2] * (1 - local_r) + c3[2] * local_r)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
        
    # Overlay radial sun / moon / spotlight
    center_x, center_y = w // 2, h // 2 - 40
    spot_radius = 280
    for rad in range(spot_radius, 0, -6):
        alpha = int(120 * (1 - rad / spot_radius))
        col = (
            min(255, c1[0] + 50),
            min(255, c1[1] + 50),
            min(255, c1[2] + 50)
        )
        draw.ellipse(
            [center_x - rad, center_y - rad, center_x + rad, center_y + rad],
            outline=col, width=4
        )
        
    # Geometric artwork shapes
    draw.ellipse([center_x - 180, center_y - 180, center_x + 180, center_y + 180], outline=(255, 255, 255, 180), width=3)
    draw.ellipse([center_x - 120, center_y - 120, center_x + 120, center_y + 120], outline=(244, 119, 19, 200), width=4)
    draw.ellipse([center_x - 60, center_y - 60, center_x + 60, center_y + 60], fill=(244, 119, 19, 220))
    
    # Vinyl record grooves overlay
    for r_groove in range(320, 460, 18):
        draw.ellipse([center_x - r_groove, center_y - r_groove, center_x + r_groove, center_y + r_groove], outline=(255, 255, 255, 25), width=1)

    # Frame border
    draw.rectangle([30, 30, w - 30, h - 30], outline=(255, 255, 255, 70), width=2)
    draw.rectangle([40, 40, w - 40, h - 40], outline=(244, 119, 19, 90), width=1)
    
    # Top agency badge
    draw.text((60, 55), "MAINAHTUNESTEAM CREATIVE LAB", fill=(244, 119, 19))
    draw.text((w - 280, 55), "OFFICIAL MASTER / 3000PX", fill=(200, 200, 200))
    
    # Category tag
    draw.rectangle([60, 95, 240, 125], fill=(244, 119, 19))
    draw.text((75, 103), spec['style'], fill=(10, 15, 25))
    
    # Main Title & Artist at Bottom
    # Title backdrop
    draw.rectangle([40, h - 230, w - 40, h - 40], fill=(7, 13, 23))
    draw.line([(40, h - 230), (w - 40, h - 230)], fill=(244, 119, 19), width=3)
    
    # Large Title text
    draw.text((65, h - 205), spec['title'], fill=(255, 255, 255))
    draw.text((65, h - 160), f"ARTIST: {spec['artist']}", fill=(244, 119, 19))
    draw.text((65, h - 120), "EXECUTIVE CREATIVE DIRECTION · MAINAHTUNESTEAM PLATFORM", fill=(160, 175, 195))
    
    # PARENTAL ADVISORY badge bottom-right
    pa_x, pa_y = w - 230, h - 150
    draw.rectangle([pa_x, pa_y, pa_x + 160, pa_y + 85], fill=(255, 255, 255), outline=(0, 0, 0), width=2)
    draw.rectangle([pa_x + 4, pa_y + 4, pa_x + 156, pa_y + 81], outline=(0, 0, 0), width=2)
    draw.text((pa_x + 14, pa_y + 12), "PARENTAL", fill=(0, 0, 0))
    draw.text((pa_x + 14, pa_y + 34), "ADVISORY", fill=(0, 0, 0))
    draw.text((pa_x + 14, pa_y + 58), "EXPLICIT CONTENT", fill=(0, 0, 0))
    
    # Save image
    out_path = os.path.join(out_dir, spec['filename'])
    img.save(out_path, 'PNG', optimize=True)
    print(f"Rendered: {out_path} ({os.path.getsize(out_path)} bytes)")

def main():
    os.makedirs('public/artwork', exist_ok=True)
    for art in ARTWORKS:
        render_artwork(art)

if __name__ == '__main__':
    main()
