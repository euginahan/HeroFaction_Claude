# Hero Faction Screen
**AI 201 — Project 1 | SCAD Spring 2026**

Live URL: https://euginahan.github.io/HeroFaction_Claude/

---

## Design Intent

**Written before AI engagement — Session 2, Wed March 25, 2026**

### Concept
A playful, educational food world designed for young children (ages 5–7). The experience centers around a child interacting with different food characters, each representing a "faction" of nutrition (healthy vs. treat foods). The world feels bright, friendly, and slightly animated — like a children's learning app or interactive storybook.

**Mood:** A bright, playful, and friendly interactive experience that teaches kids about food in a fun, positive, and visually engaging way.

---

### Characters (4 Foods)

| Character | Role | Fun Fact | Recommendation |
|-----------|------|----------|----------------|
| Apple | Healthy / energy / strong body | "Gives you energy to play!" | "Great anytime snack!" |
| Broccoli | Healthy / growth / vitamins | "Helps you grow strong!" | "Eat often to stay healthy!" |
| Chips | Treat / occasional food | "Crunchy and yummy!" | "Enjoy sometimes!" |
| Ice Cream | Treat / fun but not everyday | "Sweet and fun!" | "A treat, not every day!" |

---

### Default State

No food is pre-selected at load. The scene is calm and inviting — storybook-like.

**Background scene:**
- Warm-toned interior wall
- Window with trees visible outside
- Yellow curtains framing the window
- Couch in the background
- Simple family painting on the wall

**Child character:** A small girl with black hair in pigtails, bow, and pink t-shirt. Soft smile. Style: rounded soft 3D/cartoon — big expressive eyes, friendly proportions. Use a placeholder initially; final must match this polished character style.

**Table:**
- Soft brown wooden texture
- A plate centered in front of the child
- Fork on the left, spoon on the right
- 4 foods arranged naturally on the plate in a 2×2 layout (slight rotation, not rigid)

---

### Layout

**Scene:** Cozy home interior. Child sits center as the permanent focal point, table in front.

**Food arrangement:** 2×2 grid on the plate/table, styled naturally — slight rotation and organic spacing so it feels like real food placement, not a rigid CSS grid. Child stays center anchor at all times.

---

### Color Palettes

**Apple**
- Primary: `#F46F6F`
- Light highlight: `#FFD4CE`
- Shadow: `#BD3E44`
- Deep accent: `#440000`
- Hover glow: `#FF8281`

**Broccoli**
- Primary: `#50A846`
- Secondary: `#2B8827`
- Rich green: `#006702`
- Dark base: `#004800`

**Chips**
- Primary yellow: `#E5E16A`
- Light warm: `#FFC6A4`
- Accent orange: `#F88F70`
- Shadow: `#BB5B3F`

**Ice Cream**
- Lavender base: `#D5AEE4`
- Pink accent: `#FFACD8`
- Soft blush: `#FFB0BB`
- Peach highlight: `#FFBF96`

---

### Typography

**Headers / Food Names:** Alphabet Soup (Red Rooster Collection) — playful, rounded, child-friendly
- Size: 64–72px
- Loaded via Adobe Fonts: `https://use.typekit.net/lgt6kjj.css`
- Fallback: `"Comic Neue", "Nunito", sans-serif`

**Body / Fun Facts + Recommendations:** BC Civitas (Briefcase Type) — clean, readable, slightly softer serif
- Size: 20–24px
- Fallback: `"Georgia", serif`

---

### Hover Behavior

**Transition timing:** 400–500ms, `ease-out`. Background shift slightly slower (~500ms). Nothing abrupt.

When a food is hovered:
- Selected food **scales up** (1.2–1.4×), smooth ease-out
- Other foods **fade to ~30% opacity** and slightly shrink
- Background **shifts to the food's color palette** (~500ms)
- Selected food gets a **simple animated face:**
  - Two small dot eyes + curved smiling mouth
  - Eyes gently blink (slow, subtle)
  - Face fades in smoothly on hover
- **Text appears in separate screen areas** (fades in on hover, fades out on leave, never overlaps child or food):
  - Top center → Food name
  - Left side → Fun fact
  - Right side → Recommendation
- **Sound plays on hover** (short, subtle, non-overlapping):
  - Apple → soft crunch
  - Broccoli → light pop/boing
  - Chips → crispy crunch
  - Ice Cream → soft playful chime

---

### What I Will Not Compromise On

1. The tone must always feel **safe, positive, and fun** for children.
2. Nothing should feel scary, harsh, overly complex, or boring.
3. The experience must feel like a **playful story or game**, not a lecture.

---

## Mermaid Diagram

> _System flow diagram to be added._

---

## AI Direction Log

> _3–5 entries documenting what was asked, what AI produced, and what was changed/rejected/kept and why._

---

## Records of Resistance

> _3 documented moments where AI output was rejected or significantly revised._

---

## Five Questions Reflection

> _Short paragraph answering: Can I defend this? Is this mine? Did I verify? Would I teach this? Is my documentation honest?_
