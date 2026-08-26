from __future__ import annotations

from pathlib import Path
import shutil

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DOWNLOAD_DIR = ROOT / "public" / "downloads"

PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN = 54

IVORY = HexColor("#F7F2EA")
PAPER = HexColor("#FFFDF9")
INK = HexColor("#35262D")
PLUM = HexColor("#5B2E46")
ROSE = HexColor("#B46777")
BLUSH = HexColor("#EAD1D3")
SAGE = HexColor("#73816E")
SAGE_LIGHT = HexColor("#DCE2D7")
SAND = HexColor("#D8C8B7")
TAUPE = HexColor("#786B68")
WHITE = HexColor("#FFFFFF")


def register_fonts() -> None:
    font_dir = Path("/System/Library/Fonts/Supplemental")
    pdfmetrics.registerFont(TTFont("Editorial", str(font_dir / "Georgia.ttf")))
    pdfmetrics.registerFont(TTFont("Editorial-Bold", str(font_dir / "Georgia Bold.ttf")))
    pdfmetrics.registerFont(TTFont("Editorial-Italic", str(font_dir / "Georgia Italic.ttf")))
    pdfmetrics.registerFont(TTFont("Sans", str(font_dir / "Trebuchet MS.ttf")))
    pdfmetrics.registerFont(TTFont("Sans-Bold", str(font_dir / "Trebuchet MS Bold.ttf")))


def split_lines(text: str, font: str, size: float, width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if pdfmetrics.stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def wrapped(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    *,
    font: str = "Sans",
    size: float = 10.2,
    leading: float = 15,
    color=INK,
) -> float:
    c.setFillColor(color)
    c.setFont(font, size)
    for line in split_lines(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def page_base(c: canvas.Canvas, page_number: int, label: str = "THE VILLAGE KIT") -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    c.setFillColor(BLUSH)
    c.circle(PAGE_WIDTH - 22, PAGE_HEIGHT - 18, 62, fill=1, stroke=0)
    c.setFillColor(SAGE_LIGHT)
    c.circle(-14, 8, 50, fill=1, stroke=0)
    c.setFillColor(PLUM)
    c.setFont("Sans-Bold", 7.8)
    c.drawString(MARGIN, PAGE_HEIGHT - 31, "VILLAGE FOR HER")
    c.setFillColor(TAUPE)
    c.setFont("Sans", 7.3)
    c.drawRightString(PAGE_WIDTH - MARGIN, 28, f"{label}  /  {page_number}")


def title_block(
    c: canvas.Canvas,
    eyebrow: str,
    title: str,
    intro: str,
    *,
    title_size: float = 25,
) -> float:
    y = PAGE_HEIGHT - 73
    c.setFillColor(ROSE)
    c.setFont("Sans-Bold", 8.2)
    c.drawString(MARGIN, y, eyebrow.upper())
    y -= 27
    c.setFillColor(INK)
    c.setFont("Editorial-Bold", title_size)
    for line in split_lines(title, "Editorial-Bold", title_size, PAGE_WIDTH - 2 * MARGIN):
        c.drawString(MARGIN, y, line)
        y -= title_size + 6
    y -= 2
    y = wrapped(c, intro, MARGIN, y, PAGE_WIDTH - 2 * MARGIN, size=10.5, leading=15.5, color=TAUPE)
    return y - 15


def section_label(c: canvas.Canvas, text: str, x: float, y: float) -> None:
    c.setFillColor(PLUM)
    c.setFont("Sans-Bold", 9)
    c.drawString(x, y, text.upper())


def checkbox(c: canvas.Canvas, x: float, y: float, label: str, width: float = 210) -> float:
    c.setStrokeColor(SAND)
    c.setLineWidth(0.8)
    c.roundRect(x, y - 8, 12, 12, 2, fill=0, stroke=1)
    return wrapped(c, label, x + 20, y + 1, width - 20, size=9.3, leading=13.2)


def writing_lines(
    c: canvas.Canvas,
    x: float,
    y: float,
    width: float,
    count: int,
    *,
    gap: float = 24,
) -> float:
    c.setStrokeColor(SAND)
    c.setLineWidth(0.65)
    for _ in range(count):
        c.line(x, y, x + width, y)
        y -= gap
    return y


def soft_box(c: canvas.Canvas, x: float, y: float, width: float, height: float, fill=IVORY) -> None:
    c.setFillColor(fill)
    c.setStrokeColor(SAND)
    c.setLineWidth(0.6)
    c.roundRect(x, y - height, width, height, 8, fill=1, stroke=1)


def prompt_box(
    c: canvas.Canvas,
    title: str,
    prompt: str,
    x: float,
    y: float,
    width: float,
    height: float,
    *,
    lines: int = 2,
) -> None:
    soft_box(c, x, y, width, height)
    c.setFillColor(PLUM)
    c.setFont("Sans-Bold", 9)
    c.drawString(x + 14, y - 21, title.upper())
    next_y = wrapped(c, prompt, x + 14, y - 40, width - 28, size=8.6, leading=12.5, color=TAUPE)
    writing_lines(c, x + 14, min(next_y - 6, y - 58), width - 28, lines, gap=18)


def numbered_item(
    c: canvas.Canvas,
    number: str,
    title: str,
    body: str,
    x: float,
    y: float,
    width: float,
) -> float:
    c.setFillColor(PLUM)
    c.circle(x + 13, y - 3, 13, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Sans-Bold", 9)
    c.drawCentredString(x + 13, y - 6.5, number)
    c.setFillColor(INK)
    c.setFont("Editorial-Bold", 14)
    c.drawString(x + 38, y + 1, title)
    end_y = wrapped(c, body, x + 38, y - 18, width - 38, size=9.1, leading=13.3, color=TAUPE)
    return end_y - 13


def kit_cover(c: canvas.Canvas) -> None:
    c.setFillColor(IVORY)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    c.setFillColor(BLUSH)
    c.circle(PAGE_WIDTH + 20, PAGE_HEIGHT - 25, 148, fill=1, stroke=0)
    c.setFillColor(SAGE_LIGHT)
    c.circle(34, 8, 110, fill=1, stroke=0)
    c.setFillColor(ROSE)
    c.circle(90, PAGE_HEIGHT - 112, 9, fill=1, stroke=0)
    c.setFillColor(PLUM)
    c.setFont("Sans-Bold", 9.5)
    c.drawString(66, PAGE_HEIGHT - 72, "VILLAGE FOR HER")
    c.setFont("Editorial-Bold", 41)
    c.drawString(66, PAGE_HEIGHT - 215, "The Village Kit")
    c.setFont("Editorial-Italic", 17)
    c.setFillColor(ROSE)
    c.drawString(68, PAGE_HEIGHT - 252, "Care, made easier to coordinate.")
    c.setFillColor(INK)
    c.setFont("Sans", 12)
    y = PAGE_HEIGHT - 316
    for line in split_lines(
        "A practical support-planning toolkit for asking, organizing, giving, and receiving meaningful help.",
        "Sans",
        12,
        420,
    ):
        c.drawString(68, y, line)
        y -= 19
    soft_box(c, 68, 322, 416, 116, PAPER)
    c.setFillColor(PLUM)
    c.setFont("Sans-Bold", 9)
    c.drawString(86, 300, "USE IT FOR")
    c.setFillColor(TAUPE)
    c.setFont("Sans", 10)
    cover_items = [
        "clarifying what would help",
        "sharing boundaries without over-explaining",
        "giving supporters concrete next steps",
        "building a week of care that feels manageable",
    ]
    item_y = 280
    for item in cover_items:
        c.setFillColor(ROSE)
        c.circle(91, item_y + 3, 2.5, fill=1, stroke=0)
        c.setFillColor(TAUPE)
        c.drawString(101, item_y, item)
        item_y -= 19
    c.setFillColor(TAUPE)
    c.setFont("Sans", 8)
    c.drawString(68, 72, "A printable digital workbook  |  Personal-use license")


def build_village_kit(path: Path) -> None:
    c = canvas.Canvas(str(path), pagesize=letter, pageCompression=1)
    c.setTitle("The Village Kit")
    c.setAuthor("Village For Her")
    c.setSubject("A practical support-planning toolkit")

    kit_cover(c)
    c.showPage()

    page_base(c, 2)
    y = title_block(
        c,
        "Start here",
        "You do not need a perfect plan.",
        "Use only the pages that lower the mental load today. Write briefly, leave blanks, change your mind, and invite one trusted person to help coordinate.",
    )
    steps = [
        ("1", "Name the need", "Circle what feels hardest to hold right now. A specific need is easier for someone else to meet."),
        ("2", "Choose a point person", "If possible, ask one supporter to share updates, coordinate offers, or protect your boundaries."),
        ("3", "Send one clear message", "Use the ready-to-send language in this kit. You do not have to compose the perfect request."),
        ("4", "Review, do not manage", "Let the plan carry information so you can spend less energy repeating yourself."),
    ]
    for num, title, body in steps:
        y = numbered_item(c, num, title, body, MARGIN, y, PAGE_WIDTH - 2 * MARGIN)
    soft_box(c, MARGIN, 185, PAGE_WIDTH - 2 * MARGIN, 82, BLUSH)
    c.setFillColor(PLUM)
    c.setFont("Editorial-Bold", 13)
    c.drawString(MARGIN + 16, 158, "A useful first question")
    wrapped(
        c,
        '"What would make the next 24 hours feel a little lighter?"',
        MARGIN + 16,
        134,
        PAGE_WIDTH - 2 * MARGIN - 32,
        font="Editorial-Italic",
        size=11,
        color=INK,
    )
    c.showPage()

    page_base(c, 3)
    y = title_block(
        c,
        "Worksheet 01",
        "What I Actually Need",
        "Circle or check anything that would genuinely help. Cross out anything that would create more work. There is no correct list.",
    )
    columns = [
        (
            "PRACTICAL CARE",
            ["A meal ready to eat", "Groceries or essentials", "Laundry or dishes", "A school or activity run", "An errand handled", "A quiet hour at home"],
        ),
        (
            "CONNECTION",
            ["A text with no reply needed", "A short phone call", "Company without hosting", "Help updating others", "A walk or fresh air", "Space without questions"],
        ),
    ]
    col_width = 238
    for index, (heading, items) in enumerate(columns):
        x = MARGIN + index * (col_width + 26)
        soft_box(c, x, y, col_width, 260)
        section_label(c, heading, x + 15, y - 22)
        item_y = y - 50
        for item in items:
            checkbox(c, x + 15, item_y, item, col_width - 30)
            item_y -= 33
    section_label(c, "SOMETHING ELSE I NEED", MARGIN, 300)
    writing_lines(c, MARGIN, 278, PAGE_WIDTH - 2 * MARGIN, 4, gap=27)
    section_label(c, "WHAT WOULD NOT HELP RIGHT NOW", MARGIN, 146)
    writing_lines(c, MARGIN, 124, PAGE_WIDTH - 2 * MARGIN, 3, gap=27)
    c.showPage()

    page_base(c, 4)
    y = title_block(
        c,
        "Worksheet 02",
        "My right-now priorities",
        "A short list protects your energy. Choose the few things that matter most this week, not everything that could be done.",
    )
    prompts = [
        ("If only one thing gets easier", "The one task, worry, or decision that would create the most breathing room:"),
        ("Three helpful actions", "Specific things another person can take ownership of without waiting for instructions:"),
        ("What can wait", "Tasks or expectations that are allowed to be unfinished for now:"),
        ("Who can coordinate", "A person who can answer questions or connect offers of help to this plan:"),
    ]
    heights = [108, 126, 108, 92]
    for (heading, prompt), height in zip(prompts, heights, strict=True):
        prompt_box(c, heading, prompt, MARGIN, y, PAGE_WIDTH - 2 * MARGIN, height, lines=2)
        y -= height + 14
    c.showPage()

    page_base(c, 5)
    y = title_block(
        c,
        "Worksheet 03",
        "Meals and groceries",
        "Make food support easier to give and easier to receive. Share this page with the person coordinating meals.",
    )
    prompt_box(c, "Foods that work well", "Meals, snacks, drinks, or grocery staples we would genuinely use:", MARGIN, y, 315, 142, lines=4)
    prompt_box(c, "Please avoid", "Allergies, intolerances, strong dislikes, or foods we already have too much of:", 385, y, 173, 142, lines=4)
    y -= 159
    prompt_box(c, "Delivery details", "Best drop-off days/times, where to leave food, and whether a visit is welcome:", MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 116, lines=3)
    y -= 133
    section_label(c, "A SIMPLE OFFER SUPPORTERS CAN SEND", MARGIN, y)
    soft_box(c, MARGIN, y - 14, PAGE_WIDTH - 2 * MARGIN, 83, BLUSH)
    wrapped(
        c,
        '"I can bring dinner Tuesday or Thursday. Would either help? I can leave it at the door, and no reply beyond the day is needed."',
        MARGIN + 16,
        y - 42,
        PAGE_WIDTH - 2 * MARGIN - 32,
        font="Editorial-Italic",
        size=10.2,
        leading=15,
        color=INK,
    )
    y -= 115
    prompt_box(c, "Who is coordinating meals?", "Name and preferred contact method:", MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 90, lines=2)
    c.showPage()

    page_base(c, 6)
    y = title_block(
        c,
        "Worksheet 04",
        "Home, errands, and logistics",
        "Support is often most useful when someone owns a complete task. Choose only what feels comfortable to hand off.",
    )
    left_items = ["Laundry from hamper to folded", "Dishes and kitchen reset", "Trash and recycling", "Pet care", "School or activity pickup"]
    right_items = ["Grocery pickup", "Pharmacy or store run", "Package return", "Appointment ride", "Update family or friends"]
    soft_box(c, MARGIN, y, 238, 221)
    soft_box(c, 320, y, 238, 221)
    section_label(c, "AT HOME", MARGIN + 15, y - 22)
    section_label(c, "OUT AND ABOUT", 335, y - 22)
    item_y = y - 52
    for left, right in zip(left_items, right_items, strict=True):
        checkbox(c, MARGIN + 15, item_y, left, 208)
        checkbox(c, 335, item_y, right, 208)
        item_y -= 35
    y -= 241
    prompt_box(c, "Helpful details", "Keys, access, preferences, timing, or instructions that prevent follow-up questions:", MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 132, lines=4)
    y -= 149
    prompt_box(c, "A task someone can fully own", "From start to finish, without asking me to manage each step:", MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 108, lines=3)
    c.showPage()

    page_base(c, 7)
    y = title_block(
        c,
        "Worksheet 05",
        "Visitors and boundaries",
        "A boundary is useful information. It helps caring people show up in a way that protects the household instead of adding decisions.",
    )
    soft_box(c, MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 126)
    section_label(c, "RIGHT NOW, VISITS FEEL", MARGIN + 15, y - 22)
    options = ["Welcome", "Welcome if planned", "Helpful only for a task", "Not right now"]
    option_y = y - 52
    x_positions = [MARGIN + 15, MARGIN + 132, MARGIN + 290, MARGIN + 410]
    for x, option in zip(x_positions, options, strict=True):
        checkbox(c, x, option_y, option, 104)
    wrapped(c, "Best visit length or time of day:", MARGIN + 15, y - 88, 210, size=8.7, color=TAUPE)
    c.setStrokeColor(SAND)
    c.line(MARGIN + 195, y - 92, PAGE_WIDTH - MARGIN - 15, y - 92)
    y -= 144
    prompt_box(c, "Before coming over", "Please text/call, bring something, avoid ringing the bell, or know this first:", MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 118, lines=3)
    y -= 135
    prompt_box(c, "While you are here", "What would feel caring? What would create extra work? What topics are off-limits today?", MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 136, lines=4)
    y -= 153
    section_label(c, "READY-TO-SEND BOUNDARY", MARGIN, y)
    soft_box(c, MARGIN, y - 14, PAGE_WIDTH - 2 * MARGIN, 92, BLUSH)
    wrapped(
        c,
        '"We would love to see you, and short planned visits work best right now. Please text before coming. We may need to reschedule, and we appreciate your flexibility."',
        MARGIN + 16,
        y - 41,
        PAGE_WIDTH - 2 * MARGIN - 32,
        font="Editorial-Italic",
        size=9.8,
        leading=14.5,
    )
    c.showPage()

    page_base(c, 8)
    y = title_block(
        c,
        "Worksheet 06",
        "Check-ins that feel supportive",
        "The best kind of contact can change from day to day. Give supporters a few simple ways to stay connected without creating pressure to respond.",
    )
    prompt_box(c, "Contact that works", "Text, call, voice note, brief visit, group update, or something else:", MARGIN, y, 245, 116, lines=3)
    prompt_box(c, "A useful rhythm", "Daily, every few days, weekly, or only when I reach out:", 313, y, 245, 116, lines=3)
    y -= 134
    section_label(c, "MESSAGES THAT ASK LESS AND OFFER MORE", MARGIN, y)
    messages = [
        '"Thinking of you. No reply needed."',
        '"I am at the store. Send one item if you want; silence is okay too."',
        '"Would a 10-minute call feel good, or would you rather have quiet?"',
        '"I can handle school pickup Wednesday. May I take that off your list?"',
    ]
    box_y = y - 16
    for message in messages:
        soft_box(c, MARGIN, box_y, PAGE_WIDTH - 2 * MARGIN, 58, IVORY)
        wrapped(c, message, MARGIN + 15, box_y - 22, PAGE_WIDTH - 2 * MARGIN - 30, font="Editorial-Italic", size=9.5, leading=13.5)
        box_y -= 69
    prompt_box(c, "What I want people to know", "A short update one person can share so I do not have to repeat it:", MARGIN, box_y - 3, PAGE_WIDTH - 2 * MARGIN, 118, lines=3)
    c.showPage()

    page_base(c, 9)
    y = title_block(
        c,
        "Support-person guide",
        "How to be the point person",
        "Your job is not to fix everything. It is to reduce questions, translate offers into useful action, and protect the person's stated preferences.",
    )
    guide_items = [
        ("Ask once, record the answer", "Keep the plan somewhere supporters can use it. Avoid making her repeat preferences to each person."),
        ("Turn vague offers into options", 'Instead of "Let me know," offer two concrete choices with a graceful way to decline.'),
        ("Own the follow-through", "If you take a task, complete the planning, reminders, and cleanup unless she asks to be involved."),
        ("Protect changing boundaries", "A yes yesterday can be a no today. Share updates without asking her to justify the change."),
        ("Notice the invisible work", "Look for coordination, messages, supplies, cleanup, and decisions that can be carried by someone else."),
    ]
    for index, (title, body) in enumerate(guide_items, start=1):
        y = numbered_item(c, str(index), title, body, MARGIN, y, PAGE_WIDTH - 2 * MARGIN)
    soft_box(c, MARGIN, 130, PAGE_WIDTH - 2 * MARGIN, 70, BLUSH)
    wrapped(
        c,
        "Helpful support respects consent, privacy, culture, household routines, and the right to change course.",
        MARGIN + 16,
        102,
        PAGE_WIDTH - 2 * MARGIN - 32,
        font="Editorial-Bold",
        size=10.5,
        leading=15,
        color=PLUM,
    )
    c.showPage()

    page_base(c, 10)
    y = title_block(
        c,
        "Worksheet 07",
        "My weekly village",
        "Put names next to complete, realistic actions. Leave room for rest and change. A small reliable plan is more helpful than a crowded one.",
    )
    x0 = MARGIN
    table_width = PAGE_WIDTH - 2 * MARGIN
    row_height = 57
    col_widths = [74, 148, 112, 170]
    headers = ["DAY", "WHO", "WHAT THEY OWN", "DETAILS / TIME"]
    table_top = y
    c.setFillColor(PLUM)
    c.roundRect(x0, table_top - 32, table_width, 32, 7, fill=1, stroke=0)
    x = x0
    c.setFillColor(WHITE)
    c.setFont("Sans-Bold", 7.7)
    for header, width in zip(headers, col_widths, strict=True):
        c.drawString(x + 8, table_top - 20, header)
        x += width
    days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
    top = table_top - 32
    for index, day in enumerate(days):
        row_top = top - index * row_height
        c.setFillColor(IVORY if index % 2 == 0 else PAPER)
        c.rect(x0, row_top - row_height, table_width, row_height, fill=1, stroke=0)
        c.setStrokeColor(SAND)
        c.setLineWidth(0.5)
        c.line(x0, row_top - row_height, x0 + table_width, row_top - row_height)
        c.setFillColor(PLUM)
        c.setFont("Sans-Bold", 8.5)
        c.drawString(x0 + 8, row_top - 31, day)
        x = x0
        for width in col_widths[:-1]:
            x += width
            c.line(x, row_top, x, row_top - row_height)
    bottom = top - len(days) * row_height
    c.setStrokeColor(SAND)
    c.rect(x0, bottom, table_width, 32 + len(days) * row_height, fill=0, stroke=1)
    prompt_box(c, "Backup plan", "If plans change, who should be contacted and what can be skipped?", MARGIN, bottom - 18, PAGE_WIDTH - 2 * MARGIN, 84, lines=2)
    c.showPage()

    page_base(c, 11)
    y = title_block(
        c,
        "Copy, edit, send",
        "Ready-to-send messages",
        "Use these words as a starting point. Clear is kind. Short is enough. You never need to share more than feels comfortable.",
    )
    scripts = [
        ("ASKING ONE PERSON TO COORDINATE", "Could you help me coordinate support this week? I would send you the few things that would help, and you could be the point person for anyone who offers."),
        ("ACCEPTING A SPECIFIC OFFER", "Yes, that would help. Thursday around 5 works. Please leave it at the door, and no visit is needed this time."),
        ("TURNING A VAGUE OFFER INTO ACTION", "Thank you. The most helpful options right now are a grocery pickup or taking care of laundry. Would either work for you?"),
        ("DECLINING WITHOUT EXPLAINING", "Thank you for thinking of us. That is not what we need right now, but I appreciate the care behind the offer."),
    ]
    for heading, body in scripts:
        soft_box(c, MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 108, IVORY)
        c.setFillColor(PLUM)
        c.setFont("Sans-Bold", 8)
        c.drawString(MARGIN + 15, y - 20, heading)
        wrapped(c, body, MARGIN + 15, y - 43, PAGE_WIDTH - 2 * MARGIN - 30, font="Editorial-Italic", size=9.2, leading=13.8, color=INK)
        y -= 120
    c.showPage()

    page_base(c, 12)
    y = title_block(
        c,
        "Copy, edit, send",
        "More messages for changing days",
        "Support plans should flex with real life. These notes make it easier to update people without reopening every decision.",
    )
    scripts = [
        ("PAUSING VISITS", "We are taking a quieter few days and pausing visits. We will reach out when that changes. Doorstep drop-offs are still welcome."),
        ("ASKING FOR A CHECK-IN", "Could you text me tomorrow afternoon? I may not reply right away, but knowing you will check in would feel supportive."),
        ("FOR A LONG-DISTANCE SUPPORTER", "If you would like to help from afar, a grocery delivery or taking one phone call off my list would be genuinely useful."),
        ("SHARING THE PLAN", "We made a simple support plan so we do not have to coordinate each offer from scratch. Here is what would help and who to contact."),
    ]
    for heading, body in scripts:
        soft_box(c, MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 108, IVORY)
        c.setFillColor(PLUM)
        c.setFont("Sans-Bold", 8)
        c.drawString(MARGIN + 15, y - 20, heading)
        wrapped(c, body, MARGIN + 15, y - 43, PAGE_WIDTH - 2 * MARGIN - 30, font="Editorial-Italic", size=9.2, leading=13.8, color=INK)
        y -= 120
    c.showPage()

    page_base(c, 13)
    y = title_block(
        c,
        "Worksheet 08",
        "A practical wishlist",
        "Useful care can be small, local, delivered, or done from far away. List options at different effort and price levels so supporters can choose honestly.",
    )
    categories = [
        ("NO-COST HELP", "Calls to make, messages to send, errands, rides, pet care, laundry, or a check-in:"),
        ("UNDER $20", "A grocery staple, prepared food, delivery fee, household essential, or small comfort:"),
        ("GROUP GIFT", "A larger need several people could share, without creating extra management for us:"),
        ("FROM FAR AWAY", "Delivery, a local service, coordinating the schedule, or another task that does not require a visit:"),
    ]
    for heading, prompt in categories:
        prompt_box(c, heading, prompt, MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 118, lines=3)
        y -= 132
    c.showPage()

    page_base(c, 14)
    y = title_block(
        c,
        "Worksheet 09",
        "Important contacts",
        "Keep only the contacts you want a trusted support person to have. Store this page somewhere private and update it when needed.",
    )
    headers = ["PERSON / ROLE", "BEST CONTACT", "WHEN TO REACH THEM"]
    col_widths = [160, 164, 180]
    x0 = MARGIN
    table_width = sum(col_widths)
    table_top = y
    c.setFillColor(PLUM)
    c.roundRect(x0, table_top - 34, table_width, 34, 7, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Sans-Bold", 7.4)
    x = x0
    for header, width in zip(headers, col_widths, strict=True):
        c.drawString(x + 9, table_top - 21, header)
        x += width
    row_height = 58
    rows = 7
    for row in range(rows):
        row_top = table_top - 34 - row * row_height
        c.setFillColor(IVORY if row % 2 == 0 else PAPER)
        c.rect(x0, row_top - row_height, table_width, row_height, fill=1, stroke=0)
        c.setStrokeColor(SAND)
        c.setLineWidth(0.55)
        c.line(x0, row_top - row_height, x0 + table_width, row_top - row_height)
        x = x0
        for width in col_widths[:-1]:
            x += width
            c.line(x, row_top, x, row_top - row_height)
    bottom = table_top - 34 - rows * row_height
    c.rect(x0, bottom, table_width, 34 + rows * row_height, fill=0, stroke=1)
    prompt_box(c, "Where this plan lives", "Who has access, and where is the current version kept?", MARGIN, bottom - 20, PAGE_WIDTH - 2 * MARGIN, 95, lines=2)
    c.showPage()

    page_base(c, 15)
    y = title_block(
        c,
        "Bring it together",
        "One small next step",
        "A village can begin with one person, one honest need, and one concrete action. You do not have to coordinate the whole future today.",
    )
    prompt_box(c, "The need I want to name", "What would make the next day or week feel lighter?", MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 126, lines=4)
    y -= 143
    prompt_box(c, "The person I can ask", "Who feels safe, reliable, and able to hear a specific request?", MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 108, lines=3)
    y -= 125
    prompt_box(c, "The message I will send", "Keep it short. Use one of the scripts in this kit if words feel hard.", MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 126, lines=4)
    y -= 151
    soft_box(c, MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 88, BLUSH)
    c.setFillColor(PLUM)
    c.setFont("Editorial-Bold", 13)
    c.drawString(MARGIN + 16, y - 28, "Plans can change. Needs can change. Boundaries can change.")
    wrapped(c, "The purpose of this kit is to carry information, not create another standard to meet.", MARGIN + 16, y - 51, PAGE_WIDTH - 2 * MARGIN - 32, size=9.3, leading=14, color=TAUPE)
    c.showPage()

    page_base(c, 16)
    y = title_block(
        c,
        "Keep nearby",
        "A note to the people showing up",
        "Practical care is not about doing the most. It is about paying attention, asking clearly, following through, and respecting the answer.",
    )
    soft_box(c, MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 268, IVORY)
    c.setFillColor(INK)
    c.setFont("Editorial-Italic", 15)
    quote = (
        "Offer something specific. Make no the easiest answer. Take ownership of the details. "
        "Do not require gratitude, updates, or a visit in return. Let care feel like less to carry."
    )
    quote_y = y - 50
    for line in split_lines(quote, "Editorial-Italic", 15, PAGE_WIDTH - 2 * MARGIN - 64):
        c.drawString(MARGIN + 32, quote_y, line)
        quote_y -= 24
    c.setFillColor(ROSE)
    c.rect(MARGIN + 16, y - 230, 3, 178, fill=1, stroke=0)
    soft_box(c, MARGIN, 253, PAGE_WIDTH - 2 * MARGIN, 116, BLUSH)
    c.setFillColor(PLUM)
    c.setFont("Sans-Bold", 9)
    c.drawString(MARGIN + 16, 225, "PERSONAL-USE LICENSE")
    wrapped(
        c,
        "This digital kit is for the purchaser, their household, or one gift recipient. You may print and share completed planning pages with the people supporting you. Please do not resell, upload, or distribute the blank kit.",
        MARGIN + 16,
        202,
        PAGE_WIDTH - 2 * MARGIN - 32,
        size=8.7,
        leading=13.2,
        color=TAUPE,
    )
    c.setFillColor(PLUM)
    c.setFont("Editorial-Bold", 17)
    c.drawCentredString(PAGE_WIDTH / 2, 91, "Every woman deserves a village.")
    c.setFillColor(TAUPE)
    c.setFont("Sans", 8.4)
    c.drawCentredString(PAGE_WIDTH / 2, 69, "thevillageforher.com")
    c.save()


def guide_cover(c: canvas.Canvas) -> None:
    c.setFillColor(IVORY)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    c.setFillColor(SAGE_LIGHT)
    c.circle(PAGE_WIDTH - 26, PAGE_HEIGHT - 36, 135, fill=1, stroke=0)
    c.setFillColor(BLUSH)
    c.circle(20, 52, 116, fill=1, stroke=0)
    c.setFillColor(PLUM)
    c.setFont("Sans-Bold", 9.5)
    c.drawString(66, PAGE_HEIGHT - 72, "VILLAGE FOR HER")
    c.setFillColor(ROSE)
    c.setFont("Sans-Bold", 11)
    c.drawString(66, PAGE_HEIGHT - 175, "A PRACTICAL GUIDE")
    c.setFillColor(INK)
    c.setFont("Editorial-Bold", 38)
    title = "10 Ways to Actually Help a New Mom"
    y = PAGE_HEIGHT - 222
    for line in split_lines(title, "Editorial-Bold", 38, 430):
        c.drawString(66, y, line)
        y -= 49
    c.setFillColor(TAUPE)
    c.setFont("Sans", 11.2)
    y -= 12
    for line in split_lines(
        "Concrete ways to make life lighter - without asking her to manage the help.",
        "Sans",
        11.2,
        395,
    ):
        c.drawString(68, y, line)
        y -= 18
    soft_box(c, 68, 320, 416, 101, PAPER)
    c.setFillColor(PLUM)
    c.setFont("Editorial-Italic", 12.5)
    quote_y = 276
    for line in split_lines(
        "The kindest question is often not, 'What do you need?' but, 'Would one of these two things help?'",
        "Editorial-Italic",
        12.5,
        376,
    ):
        c.drawString(88, quote_y, line)
        quote_y -= 20
    c.setFillColor(TAUPE)
    c.setFont("Sans", 8)
    c.drawString(68, 72, "A free resource from Village For Her")


def build_free_guide(path: Path) -> None:
    c = canvas.Canvas(str(path), pagesize=letter, pageCompression=1)
    c.setTitle("10 Ways to Actually Help a New Mom")
    c.setAuthor("Village For Her")
    c.setSubject("A practical guide for friends, family, partners, and coworkers")

    guide_cover(c)
    c.showPage()

    page_base(c, 2, "10 WAYS TO HELP")
    y = title_block(
        c,
        "Before you offer",
        "Make the help easier to receive.",
        "Many people care. The hidden burden is that the person who needs support is often asked to identify the need, assign the task, explain the details, and follow up. A better offer carries some of that work.",
    )
    comparisons = [
        ("LESS HELPFUL", '"Let me know if you need anything."', "MORE USEFUL", '"I can bring dinner Tuesday or do a grocery pickup Thursday. Would either help?"'),
        ("LESS HELPFUL", '"When can I come see the baby?"', "MORE USEFUL", '"Would a short visit help, or would a doorstep drop-off feel better this week?"'),
        ("LESS HELPFUL", '"You should rest."', "MORE USEFUL", '"I can take care of the dishes and laundry while you rest. Is that okay?"'),
    ]
    for left_label, left, right_label, right in comparisons:
        soft_box(c, MARGIN, y, 238, 118, IVORY)
        soft_box(c, 320, y, 238, 118, SAGE_LIGHT)
        section_label(c, left_label, MARGIN + 14, y - 20)
        section_label(c, right_label, 334, y - 20)
        wrapped(c, left, MARGIN + 14, y - 46, 210, font="Editorial-Italic", size=9.7, leading=14.5, color=TAUPE)
        wrapped(c, right, 334, y - 46, 210, font="Editorial-Italic", size=9.7, leading=14.5, color=INK)
        y -= 133
    soft_box(c, MARGIN, 138, PAGE_WIDTH - 2 * MARGIN, 72, BLUSH)
    wrapped(
        c,
        "Always leave room for no. An offer is supportive when declining it does not create guilt, an explanation, or a new task.",
        MARGIN + 16,
        109,
        PAGE_WIDTH - 2 * MARGIN - 32,
        font="Editorial-Bold",
        size=10.2,
        leading=15,
        color=PLUM,
    )
    c.showPage()

    page_base(c, 3, "10 WAYS TO HELP")
    y = title_block(c, "Ways 01 - 03", "Start with daily life.", "Choose one action you can fully own. Ask permission, confirm the key detail, and follow through without needing reminders.")
    items = [
        ("1", "Bring food with a clear plan", "Offer two possible days. Ask about allergies or strong dislikes. Use disposable or clearly labeled containers, and make a doorstep drop-off an easy option."),
        ("2", "Handle a complete household task", "Laundry means gather, wash, dry, fold, and put somewhere agreed. Dishes means load, run, unload, and wipe the counter. Completion matters."),
        ("3", "Take one errand off the list", "Pick up groceries, return a package, refill a household essential, walk the dog, or manage a school run. Offer the specific task you can do."),
    ]
    for num, title, body in items:
        soft_box(c, MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 142, IVORY)
        y = numbered_item(c, num, title, body, MARGIN + 16, y - 27, PAGE_WIDTH - 2 * MARGIN - 32) - 38
    soft_box(c, MARGIN, 119, PAGE_WIDTH - 2 * MARGIN, 62, BLUSH)
    wrapped(c, 'Try: "I can do a grocery pickup tomorrow. Send a list by noon if that would help; no pressure if not."', MARGIN + 15, 94, PAGE_WIDTH - 2 * MARGIN - 30, font="Editorial-Italic", size=9.5, leading=14, color=INK)
    c.showPage()

    page_base(c, 4, "10 WAYS TO HELP")
    y = title_block(c, "Ways 04 - 06", "Protect her time and attention.", "Care can mean fewer messages, fewer decisions, and less social performance. Let the household set the pace.")
    items = [
        ("4", "Coordinate other helpers", "With permission, become the point person. Share the meal plan, answer routine questions, and route offers toward needs she has already named."),
        ("5", "Make visits useful and optional", "Ask before coming. Arrive on time. Keep the visit short unless invited to stay. Offer to do a task, and be ready to leave without taking it personally."),
        ("6", "Check in without requiring a reply", 'A simple "thinking of you; no reply needed" keeps the connection open. If you offer a call, give a short window and an easy way to decline.'),
    ]
    for num, title, body in items:
        soft_box(c, MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 142, IVORY)
        y = numbered_item(c, num, title, body, MARGIN + 16, y - 27, PAGE_WIDTH - 2 * MARGIN - 32) - 38
    soft_box(c, MARGIN, 119, PAGE_WIDTH - 2 * MARGIN, 62, SAGE_LIGHT)
    wrapped(c, "A changed plan is information, not rejection. Respond with flexibility and keep the relationship safe.", MARGIN + 15, 94, PAGE_WIDTH - 2 * MARGIN - 30, font="Editorial-Bold", size=9.5, leading=14, color=PLUM)
    c.showPage()

    page_base(c, 5, "10 WAYS TO HELP")
    y = title_block(c, "Ways 07 - 10", "Help can travel any distance.", "You do not have to live nearby to reduce the load. Useful support is about ownership and attention, not proximity.")
    items = [
        ("7", "Support the whole household", "Bring enough food for others, help with siblings, replenish essentials, or take a routine responsibility off a partner's list."),
        ("8", "Send a practical delivery", "Ask what would be used. Consider a grocery credit, prepared meal, household supply, or local service instead of guessing what the family needs."),
        ("9", "Remember after the first few weeks", "Set a reminder to check in later. Offer the same concrete help when the first wave of attention has passed."),
        ("10", "Believe what she says helps", "Respect her preferences, culture, privacy, household routines, and changing boundaries. Care should feel like support, not supervision."),
    ]
    for num, title, body in items:
        soft_box(c, MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 112, IVORY)
        y = numbered_item(c, num, title, body, MARGIN + 16, y - 25, PAGE_WIDTH - 2 * MARGIN - 32) - 31
    c.showPage()

    page_base(c, 6, "10 WAYS TO HELP")
    y = title_block(
        c,
        "A simple next step",
        "Choose one thing and offer it clearly.",
        "Write the message now. Two options are enough. Make no easy. Then do the full task if she says yes.",
    )
    prompt_box(c, "What I can genuinely offer", "A meal, an errand, a household task, a check-in, coordination, or support from far away:", MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 128, lines=4)
    y -= 147
    prompt_box(c, "The message I will send", "Name the action and timing. Include an easy way to say no:", MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 128, lines=4)
    y -= 158
    soft_box(c, MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 176, BLUSH)
    c.setFillColor(PLUM)
    c.setFont("Sans-Bold", 8.2)
    c.drawString(MARGIN + 17, y - 25, "WHEN SUPPORT NEEDS A PLAN")
    c.setFillColor(INK)
    c.setFont("Editorial-Bold", 18)
    c.drawString(MARGIN + 17, y - 55, "Meet The Village Kit")
    wrapped(
        c,
        "The Village Kit helps a woman and the people around her make care easier to ask for, organize, give, and receive - with planning pages, boundaries, schedules, and ready-to-send messages.",
        MARGIN + 17,
        y - 82,
        PAGE_WIDTH - 2 * MARGIN - 34,
        size=9.2,
        leading=14,
        color=TAUPE,
    )
    c.setFillColor(PLUM)
    c.setFont("Sans-Bold", 9.2)
    c.drawString(MARGIN + 17, y - 149, "Learn more at thevillageforher.com/village-kit")
    c.save()


def main() -> None:
    register_fonts()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

    kit_path = OUTPUT_DIR / "the-village-kit.pdf"
    guide_path = OUTPUT_DIR / "10-ways-to-actually-help-a-new-mom.pdf"
    build_village_kit(kit_path)
    build_free_guide(guide_path)

    shutil.copy2(guide_path, PUBLIC_DOWNLOAD_DIR / guide_path.name)
    print(f"Created {kit_path}")
    print(f"Created {guide_path}")


if __name__ == "__main__":
    main()
