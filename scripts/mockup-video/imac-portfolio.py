"""
Portfolio intro video: a real photo of an iMac with keyboard (Unsplash,
"Silver iMac with Apple Magic Keyboard on white surface", Unsplash License)
with Novatech's own pages scrolling on its screen.

    python3 scripts/mockup-video/imac-portfolio.py PHOTO HOME_SCREENSHOT

PHOTO is the 3200px-wide download of
https://unsplash.com/photos/3xQ65cknLPk (photo-1527443195645-1133f7f28990);
HOME_SCREENSHOT is a full-page capture of the home page at 1440px wide.
Writes public/media/portfolio-imac.{webm,mp4} and -poster.webp. Needs ffmpeg.
"""
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "public"
OUT = PUBLIC / "media" / "portfolio-imac"

FPS = 25
OUT_W, OUT_H = 1024, 808          # same 1024:808 box as the portfolio intro media
CROP = (598, 444, 598 + 2048, 444 + 1616)  # in the 3200×2134 photo; 2× the output
SCREEN = (907 - 598, 643 - 444, 1439, 810)  # x, y, w, h of the lit screen inside CROP

SEG = 4.0      # seconds per page
HOLD = 0.7     # pause at the top before scrolling
FADE = 0.5     # cross-fade into the next page


def ease(t: float) -> float:
    return 4 * t * t * t if t < 0.5 else 1 - (-2 * t + 2) ** 3 / 2


def page(path: Path, width: int) -> Image.Image:
    im = Image.open(path).convert("RGB")
    return im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)


def stack(paths: list[Path], width: int) -> Image.Image:
    parts = [page(p, width) for p in paths]
    out = Image.new("RGB", (width, sum(p.height for p in parts)), "white")
    y = 0
    for p in parts:
        out.paste(p, (0, y))
        y += p.height
    return out


def main(photo_path: str, home_path: str) -> None:
    _, _, sw, sh = SCREEN
    mashal = PUBLIC / "images" / "mashal"
    portfolio = PUBLIC / "images" / "portfolio"
    pages = [
        page(Path(home_path), sw),
        stack([mashal / f"mashal-{n}.webp" for n in ("dashboard-overview", "storage-tanks", "chart-of-accounts", "contract-cycle-flow")], sw),
        page(portfolio / "ariana-desktop.jpg", sw),
        page(portfolio / "noor-desktop.jpg", sw),
    ]
    # how far each page scrolls (screen heights), capped by its length
    travel = [min(p.height - sh, round(sh * k)) for p, k in zip(pages, (2.6, 2.4, 2.6, 2.6))]

    base = Image.open(photo_path).convert("RGB").crop(CROP)
    sheen = Image.new("L", (sw, sh), 0)
    ImageDraw.Draw(sheen).polygon([(0, 0), (sw * 0.42, 0), (sw * 0.18, sh), (0, sh)], fill=16)
    sheen = sheen.filter(ImageFilter.GaussianBlur(60))
    white = Image.new("RGB", (sw, sh), "white")

    def view(i: int, t: float) -> Image.Image:
        p = (t - HOLD) / (SEG - FADE - HOLD)
        y = round(travel[i] * ease(min(1.0, max(0.0, p))))
        return pages[i].crop((0, y, sw, y + sh))

    total = SEG * len(pages)
    ff = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{OUT_W}x{OUT_H}",
         "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "slow", "-crf", "22", "-pix_fmt", "yuv420p",
         "-movflags", "+faststart", "-an", f"{OUT}.mp4"],
        stdin=subprocess.PIPE,
    )
    for n in range(round(total * FPS)):
        t = n / FPS
        i = int(t // SEG)
        local = t - i * SEG
        screen = view(i, local)
        if local > SEG - FADE:  # blend into the next page's first frame (wraps to the first)
            nxt = view((i + 1) % len(pages), 0)
            screen = Image.blend(screen, nxt, (local - (SEG - FADE)) / FADE)
        screen = Image.composite(white, screen, sheen)
        frame = base.copy()
        frame.paste(screen, SCREEN[:2])
        frame = frame.resize((OUT_W, OUT_H), Image.LANCZOS)
        if n == 0:
            frame.save(f"{OUT}-poster.webp", quality=88)
        ff.stdin.write(frame.tobytes())
    ff.stdin.close()
    if ff.wait():
        sys.exit("ffmpeg failed")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{OUT}.mp4", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "32",
                    "-row-mt", "1", "-an", f"{OUT}.webm"], check=True)


if __name__ == "__main__":
    main(*sys.argv[1:3])
