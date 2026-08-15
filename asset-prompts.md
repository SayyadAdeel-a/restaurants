# Killybegs Seafood Shack — Hero Asset Prompts

Ready-to-paste prompts for generating the hero video and imagery.

The hero is a **scroll-scrubbed frame sequence** (a canvas draws frames 001→040 as you scroll), not a plain `<video>` tag. Workflow:
1. Generate the 12s loop video with the prompt below.
2. Convert it to **40 still frames** (use ezgif.com — "Video to GIF" style export at ~640px wide, or ffmpeg: `ffmpeg -i hero.mp4 -vf fps=3.3 -qscale:v 4 frames/ezgif-frame-%03d.jpg`).
3. Save them as `public/frames/hero-signature-box/ezgif-frame-001.jpg` … `ezgif-frame-040.jpg`.
4. The hero pins for 2 viewport-heights of scroll and scrubs through all 40 frames; the site falls back to `truck.webp` until the frames exist.

Brand lock for every prompt: deep harbour navy `#35376B`, cream `#F5F3EC`, accent red `#AB3036`, kraft-paper boxes, authentic working-pier energy — no cartoonish nautical clichés.

---

## 1. Hero background video (Veo 3 / Sora / Runway Gen-4 / Kling)

> Cinematic 16:9 vertical-hero background video, 12 seconds, designed to loop seamlessly. A working fishing pier at first light on the wild Atlantic coast of Donegal, Ireland. Golden dawn light breaks through low coastal mist as a deep-navy-and-white food truck sits on the old pier, its striped awning catching the breeze. In the foreground, a chef lifts a fresh tray of beer-battered cod from a sizzling fryer — golden steam rising, battered fish glistening with oil sheen. A heavy ceramic bowl of creamy seafood chowder is ladled, mussels and pink salmon chunks visible. Seagulls glide past trawlers bobbing on slate-grey water. Slow, deliberate 24fps camera drift — subtle parallax from wide to slightly closer, never cutting. Mood: warm, salt-air, cinematic, high-end food documentary. Color palette locked to deep navy, warm cream, and one red accent (the truck's logo). No text, no logos, no watermark, no people's faces. Muted audio (no dialogue). The final frame must visually match the first frame so the loop is seamless — keep wave motion, steam, and gulls subtle and periodic.

**Loop tip:** generate with "seamless loop" if the tool supports it; otherwise pick a clip where the opening and closing frames are near-identical (calm water, no fast-moving objects).

---

## 2. Hero poster / fallback image (Midjourney v6 / Flux)

> Editorial 16:9 photograph of the Killybegs Seafood Shack food truck on the Old Pier at golden hour. Deep navy-blue and white food truck with a striped awning and warm string lights, parked beside the working harbour where commercial trawlers are moored. In the foreground, a brown kraft-paper box of golden beer-battered fish and chips with a lemon wedge, next to a ceramic bowl of creamy seafood chowder with mussels and fresh dill. Moody Atlantic light, soft haze, film grain, 35mm, shallow depth of field, photorealistic, high-end food-magazine quality. Palette: deep navy, warm cream, red accents. No text, no people's faces, no watermark.

---

## 3. (Optional) Menu-card hover clips — 3–5s each

> 5-second close-up macro clip of [DISH], 16:9, no camera shake. [DISH] on kraft-paper lined cardboard box / ceramic bowl, steam rising slowly, soft directional light, deep navy background, film grain, muted audio, seamless loop. Dishes: 1) beer-battered cod & chips, 2) creamy seafood chowder with soda bread, 3) golden breaded scampi with lemon, 4) salt & chili calamari rings, 5) crab claws in garlic butter.
