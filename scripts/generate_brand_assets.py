from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "images"
FONT_DIR = Path("/System/Library/Fonts/Supplemental")


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / name), size=size)


def social_card(
    headline: tuple[str, str],
    deck: tuple[str, str],
    output_name: str,
    badge: str | None = None,
) -> Path:
    width, height = 1200, 630
    image = Image.new("RGB", (width, height), "#F7F2EA")
    draw = ImageDraw.Draw(image)

    draw.ellipse((955, -155, 1335, 225), fill="#EAD1D3")
    draw.ellipse((-130, 480, 170, 780), fill="#DCE2D7")
    draw.ellipse((102, 102, 124, 124), fill="#8F4059")

    draw.text((92, 72), "VILLAGE FOR HER", fill="#5B2E46", font=font("Trebuchet MS Bold.ttf", 23))
    draw.text((92, 182), headline[0], fill="#35262D", font=font("Georgia Bold.ttf", 70))
    draw.text((92, 263), headline[1], fill="#35262D", font=font("Georgia Bold.ttf", 70))
    draw.text(
        (96, 387),
        deck[0],
        fill="#665957",
        font=font("Trebuchet MS.ttf", 29),
    )
    draw.text((96, 430), deck[1], fill="#665957", font=font("Trebuchet MS.ttf", 29))

    if badge:
        badge_font = font("Trebuchet MS Bold.ttf", 20)
        badge_width = int(draw.textlength(badge, font=badge_font)) + 52
        draw.rounded_rectangle((92, 518, 92 + badge_width, 570), radius=5, fill="#5B2E46")
        draw.text((118, 530), badge, fill="#FFFDF9", font=badge_font)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output = OUTPUT_DIR / output_name
    image.save(output, format="PNG", optimize=True)
    return output


def main() -> None:
    outputs = [
        social_card(
            ("Every woman", "deserves a village."),
            ("Practical tools that make care easier to ask for,", "organize, give, and receive."),
            "brand-social-card.png",
        ),
        social_card(
            ("The Village Kit", "makes care clearer."),
            ("A 16-page practical support-planning toolkit.", "For yourself or as a thoughtful digital gift."),
            "social-card.png",
            "THE VILLAGE KIT  ·  $12",
        ),
        social_card(
            ("10 Ways to Actually", "Help a New Mom"),
            ("Concrete ways to make life lighter — without", "asking her to manage the help."),
            "free-guide-social-card.png",
            "FREE PRACTICAL GUIDE",
        ),
    ]
    for output in outputs:
        print(f"Created {output}")


if __name__ == "__main__":
    main()
