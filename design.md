# Killybegs Seafood Shack — Design System

> Design direction for the website. Colors are **extracted from the real brand assets** (logo JPG, takeaway photos) using pixel analysis — not guessed.

**Source assets:**
- `Killybegs Seafood Shack logo.jpg` — 960×958, white background
- `Killybegs Seafood Shack takeaway.webp` — the food truck
- `Killybegs Seafood Shack takeaway menu.webp` — the kiosk with chalkboard menus

**Copy source:** `business-profile.md`

---

## 1. Brand DNA & Design Direction

**One-liner:** *Award-winning pier-side seafood, straight off the trawlers of Killybegs — nautical heritage without the kitsch.*

Three words that must drive every decision:

| Word | Meaning |
|---|---|
| **Pier-fresh** | Provenance, boat-to-fryer, the working harbour — real, not staged |
| **Craft** | Michelin-trained chef, light golden beer batter, 40 years of pedigree |
| **Heritage** | Est. 2017, rope-circle logo, chalkboard menus, All-Ireland wins |

**Aesthetic targets (high-agency, not template):**
- Editorial, cinematic, scroll-driven one-pager with short video moments.
- **Nautical restraint** — one rope/anchor motif max (the logo already carries it). No clip-art anchors, no flags, no sailor stripes overuse.
- **Real texture over decoration** — chalkboard menu boards, kraft cardboard boxes, daylight Atlantic light, film grain. Borrow from the photos, not from stock.
- **Typographic confidence** — big display headlines, numbered chapters ("01 — The Catch"), mono labels for data/prices.

---

## 2. Color Palette

### 2.1 Core brand colors (measured from the logo)

| Token | Hex | Sample | Role | Usage |
|---|---|---|---|---|
| `navy` (Harbour Navy) | `#35376B` | 🟦 | **Primary** — logo navy, deep indigo | Hero backgrounds, dark sections, primary text on light, buttons |
| `red` (Trawler Red) | `#AB3036` | 🟥 | **Accent** — logo boat red, vermilion | CTAs, prices, ratings, small highlights only (~5% of a page) |
| `blue` (Picnic Blue) | `#5B92E5` | 🟦 | **Secondary accent** — awnings, picnic tables, links | Eyebrow labels, link hovers, secondary buttons, subtle fills |
| `cream` (Truck Cream) | `#F5F3EC` | ⬜ | **Light background** — warm off-white from the truck body | Page background, light sections (contrast-safe with navy ink) |
| `ink` (Deep Ink) | `#1B1E2B` | ⬛ | Near-black, navy-tinted | Body text on light backgrounds, footers on cream |

**Why these values:** Pixel analysis of the logo returns navy clusters centred on `#35376B` (weighted mean of the rope/border/text) and red clusters centred on `#AB3036` (the boat). The cream comes from the truck body; the light blue from the awning/picnic blue in the business context.

### 2.2 Navy scale (for gradients & depth)

| Token | Hex |
|---|---|
| `navy-50` | `#F2F3F9` |
| `navy-100` | `#E3E4F2` |
| `navy-200` | `#C9CDE7` |
| `navy-300` | `#A5ACD7` |
| `navy-400` | `#7D86C3` |
| `navy-500` | `#5D65A9` |
| `navy-600` | `#4A5090` |
| `navy-700` | `#3D427B` |
| **`navy-800`** | **`#35376B`** ← brand |
| `navy-900` | `#2A2C55` |
| `navy-950` | `#1B1D3A` |

Gradient recipe for hero/video overlays: `navy-950 → navy-800` vertical, with a red radial glow at 8–12% opacity for warmth. Scrims over video: `linear-gradient(180deg, rgba(27,29,58,.55), transparent 30%, transparent 65%, rgba(27,29,58,.75))`.

### 2.3 Supporting colors

| Token | Hex | Role |
|---|---|---|
| `crimson` | `#8A0D1B` | Deep red from the kiosk photo — CTA hover state, awards seals |
| `kraft` | `#C29A6B` | Kraft cardboard boxes — menu card frames, dividers, badges |
| `kraft-dark` | `#9C7448` | Kraft text/borders on light |
| `chalk` | `#262B30` | Chalkboard surface (dark slate) — heritage/menu-board sections, price tags |
| `chalk-teal` | `#6F9C98` | Chalkboard frame teal — menu-board borders, section underlines (sparingly) |
| `gold` | `#C9A24B` | Award accents only (chowder champion seal, stars) — never decorative |

### 2.4 Palette usage ratios

| Color | Share | Where |
|---|---|---|
| Navy (+ scale) | ~55% | Hero, dark chapters, footers |
| Cream / White | ~35% | Light chapters, menu, reviews |
| Red | ~5% | CTAs, prices, ratings, one highlight per screen |
| Blue | ~3% | Eyebrows, links, secondary actions |
| Kraft / Chalk / Gold | ~2% | Texture, badges, awards |

**Rule of thumb:** one red element per viewport, one blue element per viewport. Red and blue never compete on the same screen.

### 2.5 Contrast notes (AA)

- White text on `navy-800/900/950` — ✅ passes
- `navy-800` text on `cream` — ✅ passes
- `red #AB3036` text on cream — ⚠️ borderline (≈4.6:1); use `#9C2029` for small text, keep `#AB3036` for large text/CTAs
- Blue `#5B92E5` on navy — ✅ for large text only; use `#7FA9EE` for small labels on navy

---

## 3. Typography

**Google Fonts pairing** (all free, load via `next/font`):

| Role | Font | Notes |
|---|---|---|
| Display / headlines | **Bricolage Grotesque** (700/800, +italic) | Modern grotesque with character; the "award-site" look without being cold |
| Body / UI | **Archivo** (400/500/600) | Clean, variable, pairs with Bricolage |
| Labels / prices / numbers | **IBM Plex Mono** (400/500) | Section tags ("01 — THE CATCH"), menu prices, stats, timestamps |
| Editorial accent | **Fraunces** (italic 400/500) | One italic serif word per chapter for craft feeling, e.g. *catch*, *chowder* |

**Type scale (desktop):**
- Hero display: `clamp(3rem, 8vw, 7.5rem)`, tight leading `0.95`, tracking `-0.02em`
- Chapter heading: `clamp(2.5rem, 5vw, 4.5rem)`
- Section eyebrow (mono): `0.75rem`, tracking `0.3em`, uppercase
- Body: `1.125rem`, leading `1.6`
- Price / stat (mono): `1.5rem–2rem`

**Textures to avoid:** all-caps body copy, letter-spacing on display type beyond `-0.02em`, more than two fonts per screen (display + one other; mono counts as system-ish).

---

## 4. Imagery & Texture Direction

- **Hero:** fullscreen muted video (pier, trawlers docking, chowder being poured, batter frying — 5–15s loop) with navy scrim. Poster frame = the truck photo.
- **The two real photos** are the visual anchors of the site — use them prominently (truck hero, kiosk in heritage), not buried.
- **Chalkboard menus** (from the photos) as a recurring motif: menu prices in chalk-on-slate cards.
- **Kraft boxes** as card frames for menu items (border, badge, or background tint).
- **Film grain** (subtle CSS/SVG noise overlay, 3–5% opacity) on video and navy sections for the documentary feel.
- **Lighting direction:** daylight overcast Atlantic light; string lights for dusk scenes (footer / evening hours section).
- All imagery: warm shadows, no pure-black backgrounds, no stock-photo corporate feel.

---

## 5. Motion & Interaction Principles

- **Scroll:** Lenis smooth-scroll + GSAP ScrollTrigger. Pinned chapter scenes (like the earlier hero prototype), masked text reveals, scrubbed section transitions.
- **Video discipline** (learned from the reference research — heavy scrubbing kills performance):
  - 1 hero video (preload, muted, loop, poster fallback)
  - Hover-play clips (3–5s) on menu cards — lazy-loaded, paused by default
  - Never more than 2 videos animating at once
- **Micro-motion:** hover states, staggered line reveals, number count-ups for stats (4.7★, 1,000+ reviews).
- **`prefers-reduced-motion`:** static fallback, no pinning, videos shown as poster frames.
- **Performance budget:** hero video ≤ 4MB (compress, WebM/MP4), all other video lazy; aim for Lighthouse performance ≥ 90 (it's a real business — mobile + SEO matter).

---

## 6. Layout & Core Components

**Page rhythm (alternating):**
1. Navbar (fixed, navy → cream on scroll or solid navy)
2. **Hero** — video, logo lockup, tagline, scroll cue
3. **Ticker/marquee** — "CHOWDER CHAMPION · #1 QUICK BITE DONEGAL · PIER-FRESH DAILY"
4. **Menu** — bento grid of the 5 dishes (hover video, price in mono, chalkboard cards)
5. **Provenance** — "boat to fryer" pinned scene with stats
6. **Heritage** — Chef Garry story, awards (gold seals), the kiosk photo
7. **Sister entities** — Boathouse + Harbour Apartments
8. **Reviews** — TripAdvisor/Google proof
9. **Footer** — navy, real links (phone, Maps, FB, Instagram, TripAdvisor, DishCult)

**Components:**
- Buttons: primary = red `#AB3036` (hover `#8A0D1B`); secondary = navy outline on cream; pill nav CTA
- Cards: `border-radius 1rem–1.5rem`, subtle shadow `0 8px 30px rgba(27,29,58,.08)`, 1px `navy-100` borders on cream
- Section eyebrows: mono, `0.75rem`, `tracking .3em`, `#5B92E5` on navy / `navy-800` on cream
- Logo lockup: logo inside white rounded-full medallion (as used in the hero prototype) — keeps the rope badge visible on navy

---

## 7. Dark / Light Chapter Map

| Chapter | Surface | Type |
|---|---|---|
| Hero (video) | Navy scrim over video | dark |
| Ticker | Red bg, cream text | accent |
| Menu | Cream | light |
| Provenance | Navy | dark |
| Heritage | Cream/white with chalkboard accents | light |
| Ecosystem (sisters) | Navy | dark |
| Reviews | Cream | light |
| Footer | Navy-950 | dark |

---

## 8. Open Decisions (to confirm before build)

1. **Hero video:** do we have real footage, or should the hero use the truck photo with a slow Ken Burns + film grain? (We have no video assets in the project yet.)
2. **Light-blue awning stripe** as a decorative element — use as a thin top border motif on light sections (yes/no)?
3. Chalkboard menu cards vs. kraft cards — mix both (chalk for prices, kraft for badges) or pick one?
