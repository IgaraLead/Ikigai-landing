#!/usr/bin/env python3
"""Render Ikigai flower (from Logo.jsx) to 300x300 PNG with transparency."""
from __future__ import annotations

from PIL import Image, ImageDraw

W = 300
# viewBox="-5 -5 110 110" -> user coords: width 110, origin at -5
S = W / 110.0


def u(c: float) -> float:
    return (c + 5) * S


# Center and petal reference point (cx=50, cy=24) and radii — same as React
CX, CY = u(50), u(50)
PX, PY = u(50), u(24)
RX, RY = 15 * S, 26 * S

PETALS = [
    (0, 0x45, 0x50, 0x3B, 0.86),
    (72, 0x9A, 0x9C, 0x96, 0.76),
    (144, 0xB8, 0xA8, 0xB2, 0.73),
    (216, 0xB0, 0x98, 0xA4, 0.78),
    (288, 0x82, 0x8E, 0x78, 0.80),
]


def main() -> None:
    out = Image.new("RGBA", (W, W), (0, 0, 0, 0))

    for angle_cw, r, g, b, a in PETALS:
        layer = Image.new("RGBA", (W, W), (0, 0, 0, 0))
        d = ImageDraw.Draw(layer)
        box = [PX - RX, PY - RY, PX + RX, PY + RY]
        d.ellipse(box, fill=(r, g, b, int(255 * a + 0.5)))
        # SVG: positive degrees = clockwise. PIL: positive = CCW.
        layer = layer.rotate(-angle_cw, center=(CX, CY), resample=Image.BICUBIC)
        out = Image.alpha_composite(out, layer)

    # Center dot (r=5.5 in user units)
    cr = 5.5 * S
    d = ImageDraw.Draw(out)
    d.ellipse(
        [CX - cr, CY - cr, CX + cr, CY + cr],
        fill=(255, 255, 255, 255),
    )

    out.save("public/ikigai-flower-300.png", "PNG", optimize=True)
    print("Wrote public/ikigai-flower-300.png")


if __name__ == "__main__":
    main()
