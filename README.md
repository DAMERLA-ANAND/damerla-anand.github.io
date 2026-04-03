# Wedding Website — Complete Build Prompt
## Lakshmi Naga Saisree weds Sri Anoop
### For GitHub / AI Code Generation

---

## YOUR ROLE

You are a senior full-stack developer who specialises in Telugu / Andhra Pradesh
South Indian wedding websites. You will build a premium, cinematic, immersive
single-page wedding invitation website with a simple live attendance counter
backed by a Node.js API. The visual design must feel like a decorated South
Indian temple mandapam — warm cream tones, burgundy, aged temple gold, soft
and traditional, not dark or Mughal.

This is a Telugu-speaking, Andhra Pradesh family wedding. Every cultural
reference, every script, every ritual name, every decoration must be
specifically South Indian / Telugu. Do not use any North Indian (Hindi,
Rajasthani, Mughal, Punjabi) elements anywhere.

---

## PART 1 — REAL WEDDING DATA (USE EXACTLY AS WRITTEN)

```
BRIDE :  Lakshmi Naga Saisree
         Daughter of : Komperla Venkata Subba Rao & Meher Jyothi

GROOM :  Sri Anoop
         Son of : Devaganugula V R K Murthy & Chandrika

OPENING BLESSING : Om Shree Ganeshaya Namah
MONOGRAM : S & A
           (S in dusty rose-pink, A in tulsi-green, a small lotus between them)
```

### The 3 Events — Exactly These, No More, No Renaming

| # | Telugu Name | English Name | Date | Time | Venue |
|---|---|---|---|---|---|
| 1 | మంగళస్నానం | Mangalasnanam (Haldi Function) | Saturday, 11th April 2026 | 7:30 AM Onwards | At Home — Sri Rama Krishna Traders, Machilipatnam |
| 2 | పెళ్లికూతురు వేడుక | Pellikuthuru Veduka (Bride-Making Ceremony) | Saturday, 11th April 2026 | 10:30 AM Onwards · Followed by Lunch | At Home — Sri Rama Krishna Traders, Machilipatnam |
| 3 | పెళ్లి | Pelli — The Wedding Ceremony (Sumuhurtham) | Sunday, 12th April 2026 | **07:11 AM SHARP** | Gold Conventions, Machilipatnam |

**Critical rules about the events:**
- Never rename Mangalasnanam to "Haldi Ceremony" in the heading — show both names, Telugu first
- Never rename Pellikuthuru Veduka to "Mehndi" — show both names, Telugu first
- Never rename Pelli to "Wedding Reception" — it is the wedding ceremony itself
- The 07:11 AM muhurtham time is astrologically precise. Never round it to 7:00 AM or 7:15 AM
- Event 2 (Pellikuthuru Veduka) must show "Followed by Lunch" prominently
- Events 1 and 2 are at the home address. Event 3 is at Gold Conventions

---

## PART 2 — PROVIDED IMAGE ASSETS

Three images are provided. Reference them at these exact relative paths.
Place them in an `assets/` folder beside the HTML file.

```
assets/bride.png
  → Anime/illustration style South Indian bride
  → Wearing orange Kanjivaram silk saree with teal pattern
  → Gold jewellery, gold waist belt, bangles
  → Jasmine flower garland in hair, bindi, maang tikka
  → Pure BLACK background — handle with mix-blend-mode: screen
    on a dark-coloured container so the black vanishes cleanly

assets/groom.png
  → Anime/illustration style South Indian groom
  → Wearing navy blue sherwani, cream churidar trousers
  → Pearl necklace with a Ganesha pendant
  → Pure BLACK background — same mix-blend-mode: screen treatment

assets/couple-real.jpg
  → Real photograph of the couple
  → Both seated on a decorated royal sofa / throne chair
  → Floral mandap backdrop (white drapes, red and white flowers)
  → Groom in dark navy sherwani, bride in orange Kanjivaram saree
  → Use in the gallery / couple section as the real photo moment
```

**All other visuals** (temple architecture, Ganesha, kolam, banana leaves,
deepam lamp, lotus, garlands, knotted saree, Saptapadi couple) must be
**drawn entirely as inline SVG elements in the HTML code**. Zero external
image dependencies beyond these 3 files.

---

## PART 3 — TECH STACK

### Frontend
- **Language :** Vanilla HTML5 + CSS3 + Vanilla JavaScript
- **Output :** A single `index.html` file with all CSS and JS written inline
  inside `<style>` and `<script>` tags. No separate .css or .js files.
- **3D :** Three.js r128, loaded from `cdnjs.cloudflare.com`
- **Animations :** GSAP 3 free tier + ScrollTrigger plugin, from `cdnjs.cloudflare.com`
- **Smooth scroll :** Lenis, loaded from `cdn.jsdelivr.net`
- **Fonts :** Google Fonts only:
  - `Playfair Display` — English display headings
  - `Cormorant Garamond` — English body text
  - `Noto Sans Telugu` — all Telugu script text
  - `Yatra One` — decorative display accent
- **CDN rule :** Only load libraries from `cdnjs.cloudflare.com` or
  `cdn.jsdelivr.net`. No npm, no node_modules, no build step for the frontend.
  The HTML file must open correctly by just double-clicking it locally, or
  serving it from any static host (GitHub Pages, Netlify, Vercel static).

### Backend
- **Runtime :** Node.js + Express
- **Database :** `lowdb` v3 (tiny JSON file database — zero setup, no MongoDB,
  no PostgreSQL, no Redis, no external service needed)
- **Only 2 API endpoints** (see Part 5 for full spec)
- **CORS :** Enable so the frontend HTML file can call the API from any domain
- **Hosting :** Must be deployable to Railway, Render, or Vercel serverless with
  minimal configuration. Include a `package.json` with all dependencies and
  exact versions, and a `Procfile` (for Railway/Render): `web: node server.js`

### Delivered File Structure
```
/
├── index.html                  ← entire frontend (CSS + JS inline)
├── assets/
│   ├── bride.png               ← provided illustration
│   ├── groom.png               ← provided illustration
│   └── couple-real.jpg         ← provided real photo
├── server/
│   ├── server.js               ← Express + lowdb backend
│   ├── db.json                 ← auto-created data file (start as shown below)
│   └── package.json            ← { express, lowdb, cors }
├── Procfile                    ← web: node server/server.js
└── README.md                   ← local dev + deployment steps
```

---

## PART 4 — DESIGN SYSTEM

### Colour Palette (CSS Custom Properties)

```css
:root {
  /* ── Page base ── inspired by the soft pink/cream of the real invitation ── */
  --cream:          #F9EDE8;   /* main page background — warm cream parchment */
  --mauve:          #C17070;   /* dusty rose-red — border accents, dividers   */
  --burgundy:       #6B1A1A;   /* primary text colour, Telugu script headings */
  --deep-maroon:    #3D0A0A;   /* dark section backgrounds, 3D canvas bg      */

  /* ── Temple gold ── aged South Indian brass, NOT bright Mughal gold ── */
  --temple-gold:    #C8960C;
  --gold-light:     #E8C060;
  --gold-dark:      #7A5500;

  /* ── Kanjivaram silk ── pulled from the bride's saree colours ── */
  --saree-teal:     #1B6B5A;   /* teal pattern in the saree */
  --sherwani-navy:  #1A2B5A;   /* groom's sherwani colour   */
  --saree-orange:   #D4671A;   /* main body orange of saree */

  /* ── Ceremony specific ── */
  --lotus-pink:     #D4607A;   /* S monogram, lotus petals  */
  --tulsi-green:    #4A7A3A;   /* A monogram, banana leaves */
  --turmeric:       #E8A000;   /* Mangalasnanam yellow      */
  --kumkum:         #C0282E;   /* sacred red, fire          */
  --jasmine-white:  #FDF8F0;   /* ivory text on dark bg     */
  --sandal:         #D4A574;   /* palm-leaf manuscript tone */
}
```

### Background Rules
- **Default page background :** `--cream` (#F9EDE8) — matching the real invitation
- **3D canvas sections :** `--deep-maroon` behind the canvas
- **Contrast sections (couple, footer) :** `--deep-maroon`
- Apply a subtle CSS `repeating-linear-gradient` diagonal stripe at 3% opacity
  over the cream background to simulate woven silk brocade texture

### Typography Rules
| Content type | Font | Colour | Style |
|---|---|---|---|
| Telugu text | Noto Sans Telugu | `--burgundy` | Normal weight, never italic |
| English display headings | Playfair Display | `--burgundy` | Italic |
| English body | Cormorant Garamond | `--deep-maroon` | Normal, 18px, line-height 1.9 |
| Gold shimmer headings | Playfair Display | CSS shimmer (see below) | Italic |
| Monogram letters | Playfair Display | S=`--lotus-pink`, A=`--tulsi-green` | Bold |

Gold shimmer effect for key headings:
```css
.gold-shimmer {
  background: linear-gradient(
    90deg, var(--gold-dark), var(--gold-light), var(--gold-dark)
  );
  background-size: 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 3s ease-in-out infinite;
}
@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}
```

---

## PART 5 — BACKEND SPECIFICATION (SIMPLE ATTENDANCE COUNTER)

### What it does — in plain English
When a guest visits the website and clicks "I'm Coming!" on any event card,
the server increments a count for that event by 1. Every visitor to the site
sees a live number like "42 people are already on their way! 🎉". That is all.
No login. No email. No passwords. No OTP. No accounts.

### Data stored in `db.json`
```json
{
  "attendance": {
    "mangalasnanam": 0,
    "pellikuthuru":  0,
    "pelli":         0
  }
}
```

### API Endpoints — only 2

**GET /api/attendance**
Returns the current attendance count for all three events.
```
Response 200:
{
  "mangalasnanam": 42,
  "pellikuthuru":  38,
  "pelli":         120
}
```

**POST /api/attend**
Increments the count for one event by 1 and returns the new count.
```
Request body:  { "event": "pelli" }

Response 200:  { "event": "pelli", "count": 121 }
Response 400:  { "error": "Invalid event name" }
               (if event is not one of the 3 valid keys)
```

### Anti-spam logic (browser side — simple localStorage flag)
- After a guest clicks "I'm Coming!" for an event, store a flag in their
  browser's localStorage: key = `attended_pelli` (or `_mangalasnanam` or
  `_pellikuthuru`), value = `"true"`
- On page load, check this flag for each event
- If flag exists: show the button as already-clicked state — gold filled,
  text "You're Coming! ✓", disabled, cursor: default
- If flag does not exist: show the normal "I'm Coming!" button
- This is not foolproof (clears if browser is wiped) but is perfectly
  sufficient for a family wedding with trusted guests

### Frontend API calls (write exactly this pattern in index.html)

```javascript
// ─── IMPORTANT ──────────────────────────────────────────────────────────────
// Replace this URL with your deployed backend URL after hosting on Render/Railway
// While running locally: use http://localhost:3000
const API_BASE = 'https://YOUR-BACKEND-URL-HERE.onrender.com';
// ────────────────────────────────────────────────────────────────────────────

// Load all counts on page open
async function loadAttendanceCounts() {
  try {
    const res  = await fetch(`${API_BASE}/api/attendance`);
    const data = await res.json();

    ['mangalasnanam', 'pellikuthuru', 'pelli'].forEach(eventKey => {
      const el = document.getElementById(`count-${eventKey}`);
      if (el) animateCountUp(el, data[eventKey]);

      // Restore already-clicked button state
      if (localStorage.getItem(`attended_${eventKey}`)) {
        setButtonConfirmed(eventKey);
      }
    });
  } catch (err) {
    // Backend offline — hide counters silently, never show NaN or errors
    document.querySelectorAll('.attend-counter').forEach(el => {
      el.style.display = 'none';
    });
  }
}

// Animate the number counting up from 0
function animateCountUp(element, targetCount) {
  let current = 0;
  const step  = Math.ceil(targetCount / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, targetCount);
    element.textContent = current;
    if (current >= targetCount) clearInterval(timer);
  }, 30);
}

// Called when a guest clicks I'm Coming
async function markAttending(eventKey) {
  if (localStorage.getItem(`attended_${eventKey}`)) return;

  try {
    const res  = await fetch(`${API_BASE}/api/attend`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ event: eventKey })
    });
    const data = await res.json();

    // Update the displayed count
    const countEl = document.getElementById(`count-${eventKey}`);
    if (countEl) animateCountUp(countEl, data.count);

    // Save flag + update button
    localStorage.setItem(`attended_${eventKey}`, 'true');
    setButtonConfirmed(eventKey);

  } catch (err) {
    // If server is unreachable, at least save locally and update button
    localStorage.setItem(`attended_${eventKey}`, 'true');
    setButtonConfirmed(eventKey);
  }
}

// Switch the button to confirmed state
function setButtonConfirmed(eventKey) {
  const btn = document.getElementById(`btn-${eventKey}`);
  if (!btn) return;
  btn.textContent  = "You're Coming! ✓";
  btn.disabled     = true;
  btn.style.background = 'var(--temple-gold)';
  btn.style.color      = 'var(--deep-maroon)';
  btn.style.cursor     = 'default';
  btn.style.borderColor = 'var(--gold-dark)';
}

window.addEventListener('load', loadAttendanceCounts);
```

### Attendance component HTML (repeat this pattern inside each event card)

```html
<!-- Use the correct eventKey per card:
     mangalasnanam / pellikuthuru / pelli  -->

<div class="attend-block">

  <p class="attend-counter" id="counter-line-pelli">
    <span class="count-number" id="count-pelli">—</span>
    <span class="count-label"> people are already on their way! 🎉</span>
  </p>

  <button
    class="attend-btn"
    id="btn-pelli"
    onclick="markAttending('pelli')"
  >
    I'm Coming to Pelli! 🙏
  </button>

</div>
```

### Attendance component styling rules
- The count number: Playfair Display bold, 28px, `--temple-gold`, animated count-up
- "people are already on their way!" : Cormorant Garamond 14px italic, `--burgundy`
- Button shape: pill (`border-radius: 32px`), padding `11px 28px`
- Button default state: `--deep-maroon` background, `--gold-light` text,
  1.5px solid `--temple-gold` border, Cormorant Garamond 16px
- Button hover: background → `--temple-gold`, text → `--deep-maroon`,
  `transform: scale(1.03)`, `transition: all 0.25s ease`
- Button confirmed state: `--temple-gold` background, `--deep-maroon` text,
  disabled, no hover scale effect
- If backend is offline on load: hide `.attend-counter` paragraph entirely,
  still show the button (clicking it still saves localStorage even if API fails)
- On mobile: button full-width, counter text centered

---

## PART 6 — NAVIGATION BAR

- Position: fixed top, full width, z-index 1000
- Background: `rgba(61, 10, 10, 0.97)`, `backdrop-filter: blur(10px)`
- Height: 64px
- Left side: SVG South Indian brass deepam (villakku) oil lamp with
  CSS animated flickering flame. Gold body, orange-red flame.
- Centre: `"Lakshmi Naga Saisree  ❈  Sri Anoop"` — Playfair Display italic,
  `--gold-light`, font-size 20px
- Right side: mirror deepam lamp SVG
- Navigation links (between left lamp and centre, and centre and right lamp):
  `Mangalasnanam · Pellikuthuru Veduka · Pelli · Couple · Venue · RSVP`
  All in Cormorant Garamond 13px, `--mauve`, letter-spacing 0.12em,
  hover: colour → `--gold-light`, underline expands from centre
- On scroll past 80px: nav solidifies to `rgba(61, 10, 10, 1)` via CSS transition 0.4s
- Mobile (below 768px): hide nav links, show a hamburger icon (3 horizontal
  lines in `--temple-gold`). Clicking opens a full-width dropdown menu of the
  same links, implemented with a CSS checkbox toggle (no JS needed for this).

---

## PART 7 — SECTION-BY-SECTION BUILD SPECIFICATION

---

### SECTION A — LOADING SPLASH SCREEN

On first page load, a full-screen splash appears for 2 seconds, then exits.

- Background: `--deep-maroon`
- Centre: SVG Ganesha silhouette (60px) spinning in from scale(0) → scale(1)
  with `ease: back.out(1.4)` over 0.8s using GSAP
- Below Ganesha: `"Om Shree Ganeshaya Namah"` fading in, Cormorant Garamond
  italic, `--gold-light`, letter-spacing 0.25em
- A circular progress ring in `--temple-gold` (SVG `<circle>` with
  `stroke-dasharray` and `stroke-dashoffset`) animates from 0% to 100% over 1.8s
- At 2s: entire splash div exits with GSAP `scaleY: 1 → 0`,
  `transform-origin: top center`, `ease: power3.in`, 0.6s duration
- Hero section becomes visible underneath

---

### SECTION B — HERO

**Background:** Three.js canvas filling the full viewport (100vw × 100vh).

**Three.js scene — Dravidian Gopuram Temple (South Indian style):**
Build a South Indian Dravidian-style gopuram tower using Three.js primitives.

Architecture notes (read carefully — this is NOT a North Indian temple):
- A gopuram is a tall rectangular gateway tower, widest at the base,
  narrowing in tiers toward the top, capped with a barrel-vault shaped
  roof (vimana). It has many horizontal tiers, each with decorative
  miniature sculptures (simulate with smaller BoxGeometry protrusions).
- Build it from stacked `THREE.BoxGeometry` boxes:
  - Tier 1 (base, widest):  width 7, height 2.5, depth 3.5
  - Tier 2:                 width 5.8, height 2.0, depth 3.0
  - Tier 3:                 width 4.6, height 1.8, depth 2.5
  - Tier 4:                 width 3.4, height 1.6, depth 2.0
  - Tier 5:                 width 2.4, height 1.4, depth 1.6
  - Tier 6 (top):           width 1.4, height 1.0, depth 1.0
  - Finial (kalasam):       CylinderGeometry, radius 0.3, height 1.5, gold material
- Each tier stacks directly on top of the previous (y position = sum of heights below)
- Add 2 smaller side gopurams at x = ±9, at 60% scale
- Material for stone tiers: MeshPhongMaterial, colour #2A1008, emissive #0A0400
- Material for gold finial: MeshPhongMaterial, colour #C8960C, emissive #3A2000,
  specular #E8C060, shininess 60
- Add small decorative box protrusions on each tier to simulate sculptures:
  Place 4–6 BoxGeometry boxes (width 0.25, height 0.4, depth 0.5) evenly
  spaced along the front face of each tier, same stone material
- Temple plinth (base platform): BoxGeometry width 24, height 1.0, depth 10,
  at y = 0, stone material
- Ground plane: PlaneGeometry 80×50, rotated -π/2, dark reddish `#1A0800`
- Floating particles: 150 BufferGeometry points, gold colour #C8960C,
  PointsMaterial size 0.06, scattered in a 60×30×20 volume, slowly drift upward
  by incrementing their y position by 0.003 per frame, wrapping back to bottom
  when they exceed a height limit

**Lighting:**
- AmbientLight: colour #3A1800, intensity 1.0
- DirectionalLight (sun): colour #D4A030, intensity 1.6, position (8, 20, 12)
- PointLight (lamp glow from base): colour #FF6600, intensity 2.5, distance 30,
  position (0, 2, 6). Animate its intensity: `Math.sin(time * 2) * 0.4 + 2.5`
  to simulate flickering lamp glow
- PointLight (side warm): colour #8B3000, intensity 1.0, position (-10, 8, 0)

**Camera:**
- Initial position: x=0, y=8, z=32
- On page load: GSAP animates z from 32 → 20 over 4 seconds, ease: power2.out
- After load: camera x slowly oscillates: `Math.sin(time * 0.25) * 3`
- Camera always looks at (0, 6, 0)
- On scroll (GSAP ScrollTrigger, scrub: 1.5, trigger: #hero):
  camera rotates: `camera.rotation.y` from 0 to 0.15 rad

**Scene fog:** THREE.FogExp2, colour #1A0808, density 0.022

**Canvas resize:** Add window resize listener updating renderer size and camera aspect.

**Overlay content** (absolutely positioned on top of canvas, centred, z-index 10):

```
[SVG Ganesha — 58px — --burgundy fill]
[thin kolam ornament line — SVG — 200px wide]

"Om Shree Ganeshaya Namah"
  Cormorant Garamond italic, 15px, --mauve, letter-spacing 0.3em

[S & A monogram SVG — 90px — S in --lotus-pink, A in --tulsi-green, lotus between]

"Lakshmi Naga Saisree"
  Playfair Display italic, 58px (clamp 38px–72px), --jasmine-white
  GSAP: y 50→0, opacity 0→1, delay 0.4s, ease power3.out

"weds"
  Cormorant Garamond italic, 22px, --mauve, letter-spacing 0.2em
  GSAP: opacity 0→1, delay 0.75s

"Sri Anoop"
  Playfair Display italic, 58px (clamp 38px–72px), gold-shimmer class
  GSAP: y -50→0, opacity 0→1, delay 1.0s, ease power3.out

[thin lotus SVG divider]

"Sunday · 12th April 2026 · 07:11 AM"
  Cormorant Garamond, 18px, --gold-light, letter-spacing 0.15em
  GSAP: opacity 0→1, delay 1.3s

"Gold Conventions, Machilipatnam"
  Cormorant Garamond italic, 16px, --mauve
  GSAP: opacity 0→1, delay 1.5s
```

**Below hero — marquee strip:**
- Background: `--burgundy`
- Border top and bottom: 1px solid `rgba(200,150,12,0.4)`
- Text (infinite scrolling left, CSS `animation: marquee 28s linear infinite`):
  `❈ మంగళస్నానం ❈ పెళ్లికూతురు వేడుక ❈ పెళ్లి ❈ Mangalasnanam ❈ Pellikuthuru Veduka ❈ Pelli ❈`
- Font: Cormorant Garamond 14px, colour `--jasmine-white`, letter-spacing 0.2em
- Duplicate the text string so the loop is seamless

---

### SECTION C — THE 3 EVENTS

**Section ID:** `#events`
**Background:** `--cream` (#F9EDE8)

**Section header:**
```
[SVG Ganesha small — 40px]
"Our Sacred Ceremonies"           Playfair Display italic 44px, --burgundy
"మన పవిత్ర వేడుకలు"              Noto Sans Telugu 20px, --burgundy
[lotus SVG divider, 100px wide]
```

**Marigold garland SVG** spanning full section width, hanging at the top,
gentle CSS sway: `animation: sway 4s ease-in-out infinite alternate`,
`transform-origin: top center`, swaying ±2 degrees.

**Kolam border SVG** (drawn as a horizontal band using dot-grid geometry):
- Use repeating `<circle r="2">` dots in a grid, connected by `<line>` elements
  forming a chain of diamonds and 6-pointed stars
- Colour: `--temple-gold` at 35% opacity
- Animate: `stroke-dashoffset` counting down on scroll (GSAP ScrollTrigger) so
  the kolam pattern appears to draw itself left-to-right as the section enters view

**3 event cards** — CSS grid: `repeat(3, 1fr)` on desktop, `1fr` on mobile.
Gap: 28px. Max-width: 1100px, centred with auto margins. Padding: 0 40px 80px.

#### Common card structure and styling:
```
border: 1.5px solid var(--temple-gold)
border-radius: 6px
background: linear-gradient(160deg, #FFF8F2, var(--cream))
padding: 36px 32px
position: relative
transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            box-shadow 0.4s ease
```

On hover:
```
transform: translateY(-8px)
box-shadow: 0 24px 64px rgba(107,26,26,0.15),
            0 0 0 1px rgba(200,150,12,0.3)
```

SVG corner ornaments: small 5-petal lotus at each of the 4 corners,
`--temple-gold`, positioned absolute at each corner (top:8px, left:8px etc.)

SVG banana leaf: one on the left card edge (vertical, pointing down, 80px tall),
one on the right edge (mirror), `--tulsi-green`, 20% opacity, `position: absolute`.

GSAP scroll animation (apply to all 3 cards):
```javascript
gsap.from('.event-card', {
  scrollTrigger: {
    trigger: '#events',
    start: 'top 75%',
  },
  duration: 0.9,
  y: 50,
  opacity: 0,
  rotateX: 10,
  transformPerspective: 1000,
  stagger: 0.18,
  ease: 'power3.out'
});
```

#### Card 1 — Mangalasnanam

SVG illustration (draw inline, 80×80px):
- A round brass bowl (ellipse, `--temple-gold`) filled with yellow turmeric
  (smaller yellow ellipse inside)
- 3 marigold flowers beside the bowl: round orange/yellow circles with petal
  rings (series of ellipses rotated around centre)
- A few turmeric dots/chunks (small yellow ovals) scattered around

Card content:
```
[SVG turmeric bowl illustration, 80px]

"మంగళస్నానం"                Noto Sans Telugu 26px bold, --burgundy
"Mangalasnanam"              Playfair Display italic 16px, --mauve
"Haldi Function"             Cormorant Garamond 14px, --mauve, letter-spacing 0.1em

[thin --mauve horizontal line, 60px]

"Saturday, 11th April 2026"  Playfair Display 18px, --burgundy
"7:30 AM Onwards"            Cormorant Garamond italic 16px, --temple-gold

"At Home"                    Playfair Display 15px, --burgundy
"Sri Rama Krishna Traders"   Cormorant Garamond 14px, --deep-maroon
"Machilipatnam"              Cormorant Garamond 14px, --deep-maroon

[Attendance component — eventKey: "mangalasnanam"]
```

#### Card 2 — Pellikuthuru Veduka

SVG illustration (draw inline, 80×80px):
- A young woman in profile, simplified: oval head, hair bun with a jasmine
  flower, wearing a half-saree (skirt + drape), hands folded in namaste.
  Draw with `<path>` curves and `<ellipse>` shapes in `--saree-orange`
  and `--lotus-pink` and `--tulsi-green`
- A small hummingbird beside her (two wing ovals + small body oval + beak line)
  as seen in the real pellikuthuru invitation

Card content:
```
[SVG pellikuthuru girl illustration, 80px]

"పెళ్లికూతురు వేడుక"          Noto Sans Telugu 22px bold, --burgundy
"Pellikuthuru Veduka"          Playfair Display italic 16px, --mauve
"Bride-Making Ceremony"        Cormorant Garamond 14px, --mauve, letter-spacing 0.1em

[thin --lotus-pink horizontal line, 60px]

"Saturday, 11th April 2026"    Playfair Display 18px, --burgundy
"10:30 AM Onwards"             Cormorant Garamond italic 16px, --temple-gold
"Followed by Lunch 🍽"         Cormorant Garamond italic 14px, --kumkum
                               (make this line stand out — it's important)

"At Home"                      Playfair Display 15px, --burgundy
"Sri Rama Krishna Traders"     Cormorant Garamond 14px, --deep-maroon
"Machilipatnam"                Cormorant Garamond 14px, --deep-maroon

[Attendance component — eventKey: "pellikuthuru"]
```

#### Card 3 — Pelli

SVG illustration (draw inline, 80×80px):
- The knotted saree motif from the real invitation cover:
  Two fabric drapes (one in `--mauve`/rose from the left, one in `--temple-gold`
  from the right) crossing and tying into a decorative knot at the centre.
  Draw with `<path>` using curved Bezier commands. Add small tassels (vertical
  lines with dots at end) hanging from the knot.

Card content:
```
[SVG knotted saree illustration, 80px]

"పెళ్లి"                       Noto Sans Telugu 28px bold, --burgundy
"Pelli — The Wedding Ceremony" Playfair Display italic 16px, --mauve
"Sumuhurtham"                  Cormorant Garamond 14px, --mauve, letter-spacing 0.1em

[thin --temple-gold horizontal line, 60px]

"Sunday, 12th April 2026"      Playfair Display 18px, --burgundy
"07:11 AM"                     Playfair Display bold 24px, gold-shimmer class
"(Auspicious Muhurtham)"       Cormorant Garamond italic 13px, --mauve

"Gold Conventions"             Playfair Display 16px, --burgundy
"Machilipatnam"                Cormorant Garamond 14px, --deep-maroon

[Attendance component — eventKey: "pelli"]
```

---

### SECTION D — THE COUPLE

**Section ID:** `#couple`
**Background:** `--deep-maroon`

**Section header:**
```
"Two Families, One Sacred Bond"     Playfair Display italic 40px, --jasmine-white
"రెండు కుటుంబాలు, ఒక పవిత్ర బంధం"   Noto Sans Telugu 18px, --gold-light
[kolam SVG line drawing itself on scroll]
```

**Main layout:** CSS Grid, `1fr auto 1fr`, gap 48px, max-width 1100px centred.
Stack to single column on mobile (768px breakpoint).

**Left column — Bride:**
```
[assets/bride.png]
  width: 280px, height: auto
  display: block, margin: 0 auto
  mix-blend-mode: screen
  Parent container background: --deep-maroon (so black bg vanishes)
  GSAP parallax on scroll: y moves at 0.88× scroll speed

[Below image]
"Lakshmi Naga Saisree"         Playfair Display italic 28px, --jasmine-white
"D/o Sri Komperla Venkata Subba Rao"
"& Smt. Meher Jyothi"          Cormorant Garamond 16px, --gold-light, line-height 1.8
```

**Centre column:**
```
[S & A monogram SVG — 110px]
  S: Playfair Display bold, --lotus-pink
  A: Playfair Display bold, --tulsi-green
  Small lotus SVG between the letters: --lotus-pink petals

"❈  వివాహ  ❈"                  Noto Sans Telugu 20px, --temple-gold

A vertical line from monogram down: 1px solid, gradient top=--temple-gold to bottom=transparent

A horizontal kolam ornament SVG (small, 80px) at midpoint
```

**Right column — Groom:**
```
[assets/groom.png]
  width: 280px, height: auto
  display: block, margin: 0 auto
  mix-blend-mode: screen
  Parent container background: --deep-maroon
  GSAP parallax on scroll: y moves at 1.12× scroll speed (opposite direction)

[Below image]
"Sri Anoop"                    Playfair Display italic 28px, --jasmine-white
"S/o Sri Devaganugula V R K Murthy"
"& Smt. Chandrika"             Cormorant Garamond 16px, --gold-light, line-height 1.8
```

**Real couple photo below the grid:**
```
[assets/couple-real.jpg]
  width: 100%, max-width: 900px, margin: 48px auto 0
  max-height: 460px, object-fit: cover, object-position: top
  border-top: 2px solid --temple-gold
  border-bottom: 2px solid --temple-gold
  display: block

Gradient overlay (CSS ::after pseudo-element):
  position: absolute, bottom 0, left 0, right 0
  height: 80px
  background: linear-gradient(0deg, --deep-maroon, transparent)

Caption (over gradient):
  "Together at Our Engagement"    Cormorant Garamond italic 18px, --jasmine-white
  Position: absolute, bottom 16px, left 24px
```

---

### SECTION E — VENUE

**Section ID:** `#venue`
**Background:** `--cream`

**Section header:**
```
[SVG Ganesha 40px]
"The Sacred Venue"               Playfair Display italic 40px, --burgundy
"వేడుక స్థలం"                    Noto Sans Telugu 18px, --burgundy
[lotus divider]
```

**Layout:** CSS Grid, `1fr 1fr`, gap 40px, max-width 960px centred.
Stack to 1 column on mobile.

**Left — Three.js venue mini-scene (400px tall canvas):**

Build a simplified South Indian kalyana mandapam / convention hall:
- Front facade: wide BoxGeometry building (width 16, height 8, depth 8),
  whitish material `#EDE0C8`
- Two smaller entrance gopuram towers flanking the gate:
  each built from 3 stacked tiers (BoxGeometry), stone material `#4A3020`,
  with small gold CylinderGeometry finial on top
- Entrance archway: torus or two thin vertical boxes with a horizontal box
  across the top, gold material
- Simple ground plane: dark reddish `#2A1000`
- Warm interior glow: PointLight orange `#FF8030` placed inside the building
  (behind the facade, shining through) to suggest warm lit interior
- Auto-rotating camera orbit: camera x = sin(time × 0.5) × 10,
  z = cos(time × 0.5) × 18, always looking at (0, 3, 0)
- Dispose renderer and cancel animation frame on page unload

**Right — Venue information:**
```
"Gold Conventions"               Playfair Display italic 32px, --burgundy
"Machilipatnam, Andhra Pradesh"  Cormorant Garamond 16px, --deep-maroon

"Wedding Day: Sunday, 12th April 2026"   Playfair Display 18px, --burgundy
"Auspicious Time: 07:11 AM sharp"        Cormorant Garamond italic 16px, --temple-gold

[Accordion — CSS only, no JS, using <details>/<summary>]

▸ By Air
  Vijayawada Airport (VGA) is approximately 65 km away, about 1 hour
  by car. Taxis and cabs are readily available at the airport.

▸ By Train
  Machilipatnam Railway Station (MTM) is 3 km from Gold Conventions.
  Several trains connect from Vijayawada, Hyderabad, and Chennai.

▸ By Road
  Located on NH-216 in Machilipatnam city centre. Ample parking
  available at the venue. GPS: Machilipatnam, Krishna District, AP.
```

Style the `<details>` accordions:
- `summary`: Playfair Display 15px, `--burgundy`, cursor pointer,
  list-style none, padding 12px 0, border-bottom 1px solid `rgba(107,26,26,0.15)`
- `summary::marker` display none (hide the default triangle)
- Custom ▸ chevron (rotates to ▾ when `[open]`) via CSS `content` on `::before`
- Body text: Cormorant Garamond 15px, `--deep-maroon`, padding 10px 0 14px 16px,
  line-height 1.7

**Google Maps embed below the grid:**
```html
<!-- Replace the q= parameter with the exact venue address for the embed URL -->
<div style="border: 1.5px solid var(--temple-gold); margin: 32px auto 0;
            max-width: 960px; height: 300px; overflow: hidden;">
  <iframe
    src="https://www.google.com/maps?q=Gold+Conventions+Machilipatnam&output=embed"
    width="100%" height="300" style="border:0; filter: sepia(0.3) saturate(0.8);"
    allowfullscreen loading="lazy"
    title="Gold Conventions Machilipatnam">
  </iframe>
</div>
```

---

### SECTION F — RSVP

**Section ID:** `#rsvp`
**Background:** `--deep-maroon`

**Section header:**
```
[SVG Ganesha 40px, --gold-light]
"Join Our Celebration"             Playfair Display italic 40px, --jasmine-white
"మీ రాక మాకు ఆనందం"               Noto Sans Telugu 18px, --gold-light
"Please respond by 1st April 2026" Cormorant Garamond 15px, --mauve
[lotus divider — --temple-gold]
```

**The palm-leaf manuscript container:**
- Styled to resemble a South Indian palm leaf manuscript (tala patra)
- Background: `--sandal` (#D4A574) — brownish-gold
- Worn edge effect: CSS `box-shadow: inset 0 0 30px rgba(0,0,0,0.2)`,
  slight `border-radius: 4px`
- Horizontal format: max-width 680px, margin: 32px auto
- On section enter (IntersectionObserver threshold 0.3):
  animate `scaleX: 0 → 1` from `transform-origin: center center` over 1.0s
  `ease: power3.out` — simulates the palm leaf unfurling open

**Form fields inside the leaf:**
```
Name (text input)
Phone (tel input)
Number of Guests (number input, min 1 max 10)
Dietary Preference (select: Vegetarian / Jain Vegetarian / Non-Vegetarian)
Events Attending (checkboxes):
  ☐ Mangalasnanam (11 Apr, 7:30 AM)
  ☐ Pellikuthuru Veduka (11 Apr, 10:30 AM)
  ☐ Pelli — Wedding Ceremony (12 Apr, 7:11 AM)
Special Message for the Couple (text input, optional)
```

Input field styling (on the sandal/parchment background):
- No box border — only a bottom border: `2px solid rgba(107,26,26,0.4)`
- Background: transparent
- Text colour: `--deep-maroon`
- Font: Cormorant Garamond 17px
- Focus state: bottom border colour → `--burgundy`, `outline: none`
- Labels: Playfair Display 13px, `--burgundy`, letter-spacing 0.06em,
  display block, margin-bottom 4px, margin-top 18px

**Submit button — Sudarshana Chakra style:**
- Shape: circle, width 90px, height 90px, `border-radius: 50%`
- Background: radial-gradient from `--kumkum` centre to `--deep-maroon` edge
- Border: 2px solid `--temple-gold`
- Inside: draw a 16-spoke wheel using SVG `<line>` elements radiating from centre
  (the Sudarshana Chakra), all lines in `--temple-gold`, length from r=12 to r=38
- Text: "CONFIRM" in Cormorant Garamond 11px, letter-spacing 0.15em,
  `--gold-light`, centred below the spokes
- On click: GSAP `rotation: 0 → 360, duration: 0.5, ease: power2.out`
  then burst animation: 12 lotus petal SVG elements radiate outward
  (`x` and `y` GSAP to 12 directions, `opacity: 1 → 0`, `scale: 1 → 0.2`)
- After animation: show success message replacing the form:

```
[SVG deepam lamp with bright animated flame]
"🙏 Dhanyavaadalu!"               Playfair Display italic 28px, --gold-light
"ధన్యవాదాలు!"                    Noto Sans Telugu 22px, --temple-gold
"We await your presence with great joy."
                                   Cormorant Garamond italic 16px, --jasmine-white
```

---

### SECTION G — FOOTER

**Background:** `--deep-maroon`
**Border-top:** 2px solid `rgba(200,150,12,0.3)`

Layout: centred column, padding 60px 40px.

```
[SVG banana leaves framing left and right, large, 120px tall each, --tulsi-green]

[SVG Saptapadi illustration — centred, 140px wide]:
  Two simplified human silhouettes in profile (facing each other, hands joined)
  A stylised sacred fire (agni kund) between them — triangle flame shapes in --kumkum
  Seven small footstep marks below them (the seven steps)
  All drawn in --temple-gold line art

"Om Shree Ganeshaya Namah"          Cormorant Garamond italic 16px, --gold-light
                                    letter-spacing 0.3em, margin-bottom 20px

"Lakshmi Naga Saisree"              Playfair Display italic 28px, gold-shimmer
"weds"                              Cormorant Garamond italic 16px, --mauve
"Sri Anoop"                         Playfair Display italic 28px, gold-shimmer

"12th April 2026 · 07:11 AM"        Cormorant Garamond 16px, --gold-light
"Gold Conventions, Machilipatnam"   Cormorant Garamond 16px, --mauve

[thin kolam SVG line]

"శుభ వివాహ శుభాకాంక్షలు"            Noto Sans Telugu 18px, --temple-gold
"With love & blessings from both families"
                                    Cormorant Garamond italic 14px, --mauve
                                    margin-top 24px, opacity 0.7
```

---

## PART 8 — GLOBAL ANIMATIONS & INTERACTIONS

### Custom Cursor (desktop only — hide on touch devices)
```javascript
// Gold dot follows mouse exactly
// Trailing ring follows with lerp smoothing
const dot  = document.getElementById('cursor-dot');   // 10px, --temple-gold, border-radius 50%
const ring = document.getElementById('cursor-ring');  // 28px, border 1px solid --gold-light, transparent fill

let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
// Hide on mobile: if (window.matchMedia('(hover: none)').matches) hide both elements
```

### Floating Flowers Particle System (Canvas 2D, fixed overlay)
- Canvas: `position: fixed, inset: 0, pointer-events: none, z-index: 100`
- 30 particles on desktop, 14 on mobile
- 3 types, drawn per frame:
  - **Jasmine** (white): draw as 5 small ellipses rotated 72° each around a centre
  - **Marigold** (orange): draw as a filled circle with 8 petal ellipses around it
  - **Lotus** (pink): draw as 6 ellipses pointing outward from centre
- Each particle has: x, y, speedX (±0.8), speedY (0.6–1.8), rotation, rotSpeed,
  opacity (0.2–0.5), type, size (5–12px)
- Per frame: move y += speedY, x += speedX + sin(time + y×0.01)×0.4,
  rotation += rotSpeed. Reset to top when y > canvas.height + 20
- `requestAnimationFrame` loop, clear canvas each frame

### Scroll Reveal (GSAP ScrollTrigger)
Apply to every `.section-heading`, `.venue-details`, `.person-card`, `.how-we-met`:
```javascript
gsap.from(element, {
  scrollTrigger: { trigger: element, start: 'top 80%' },
  y: 35, opacity: 0, duration: 0.8, ease: 'power2.out'
});
```

Section headings: additionally split the heading text into individual character
`<span>` elements (do this via JavaScript looping over `element.textContent`,
wrapping each character in `<span style="display:inline-block">`), then stagger:
```javascript
gsap.from(chars, {
  scrollTrigger: { trigger: heading, start: 'top 80%' },
  rotationX: 90, y: 30, opacity: 0,
  stagger: 0.03, duration: 0.6, ease: 'back.out(1.4)'
});
```

### Deepam Flame Flicker (CSS)
```css
@keyframes flicker {
  0%, 100% { transform: scaleY(1) scaleX(1); opacity: 1; }
  20%       { transform: scaleY(1.18) scaleX(0.88); opacity: 0.88; }
  40%       { transform: scaleY(0.92) scaleX(1.08); opacity: 1; }
  60%       { transform: scaleY(1.12) scaleX(0.92); opacity: 0.92; }
  80%       { transform: scaleY(0.96) scaleX(1.04); opacity: 1; }
}
.flame { animation: flicker 0.9s ease-in-out infinite; transform-origin: bottom center; }
```

### Kolam SVG Self-Draw Animation
For every kolam border SVG, calculate total `stroke-dasharray` length
(use SVG `getTotalLength()` or set a fixed value), then:
```javascript
gsap.fromTo(kolam, {
  strokeDashoffset: 800
}, {
  strokeDashoffset: 0, duration: 2, ease: 'power2.out',
  scrollTrigger: { trigger: kolam, start: 'top 80%' }
});
```

### Garland Sway
```css
@keyframes garlandSway {
  from { transform: rotate(-2deg); }
  to   { transform: rotate(2deg); }
}
.garland {
  animation: garlandSway 4s ease-in-out infinite alternate;
  transform-origin: top center;
}
```

---

## PART 9 — SOUTH INDIAN CULTURAL ACCURACY — STRICT RULES

Never use any of these North Indian elements anywhere in the design or code:
- Hindi / Devanagari script (शुभ विवाह etc.) — this is a Telugu wedding
- Paisley / mehndi patterns — those are North Indian; use kolam (dot-grid geometry)
- North Indian "diya" clay lamp — use South Indian brass deepam (villakku)
- Haldi as the event name in headings — it is called Mangalasnanam here
- Mehndi as an event — there is no Mehndi event in this wedding
- Sangeet as an event — there is no Sangeet in this wedding
- Baraat procession references — not part of Telugu weddings
- Mughal / Rajput gold motifs — use Dravidian temple gold, aged brass
- North Indian shikhara dome (beehive top) — use Dravidian gopuram (tiered tower)
- "Shubh Vivah" (Hindi) — use "శుభ వివాహ" (Telugu) or "Shubha Vivaha"

Always use these correctly:
- Telugu script via Noto Sans Telugu font — load it from Google Fonts
- Sumuhurtham = the auspicious wedding time (07:11 AM) — not "lagna"
- Pellikuthuru = bride-to-be — it is a Telugu specific term, keep it
- Mangalasnanam = the sacred bath / haldi equivalent in Telugu tradition
- Pelli = the wedding ceremony itself (the main event)
- Deepam / villakku = South Indian oil lamp (brass, not clay)
- Kolam = South Indian geometric floor art (dot-grid pattern)
- Banana tree = South Indian auspicious symbol (not a North Indian element)
- Saptapadi = seven steps around the sacred fire (used in Telugu ceremonies too)

---

## PART 10 — RESPONSIVE DESIGN

### Breakpoints
```
Desktop  : 1024px and above — all 3 event cards in a row, couple section 3-col
Tablet   : 768px–1023px — event cards 2 columns, couple section stacked
Mobile   : below 768px — everything single column, nav hamburger shows
```

### Mobile-specific rules
- Nav links hidden, hamburger icon shown (CSS checkbox toggle, no JS)
- Hero names: clamp 38px minimum
- Couple images: max-width 220px each, centred
- Real couple photo: height 280px, object-fit cover
- Gallery if present: 1 column
- Event cards: full width, margin 0 16px
- 3D canvases (hero + venue): reduce to 50vh height on mobile
- Floating particles: reduce to 14 max on mobile
- GSAP animations: run at 70% intensity (use `gsap.globalTimeline.timeScale(0.7)`)
- Custom cursor: disable entirely on touch devices

### prefers-reduced-motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
Also pause all GSAP timelines when this media query matches.

---

## PART 11 — README.md CONTENTS

The README must include exactly these sections:

### Local Development
```
1. Clone the repository
2. Open index.html directly in a browser — the frontend works immediately
3. For the attendance counter backend:
   cd server
   npm install
   node server.js
   Server starts on http://localhost:3000
4. In index.html, change API_BASE to http://localhost:3000 while testing locally
```

### Replacing the API URL for Production
```
After deploying the backend to Render/Railway:
1. Copy the deployed URL (e.g. https://wedding-api.onrender.com)
2. Open index.html
3. Find the line: const API_BASE = 'https://YOUR-BACKEND-URL-HERE.onrender.com';
4. Replace with your actual deployed URL
5. Re-upload index.html to your static host (GitHub Pages / Netlify)
```

### Deploying the Backend to Render (Free Tier)
```
1. Push the entire project to a GitHub repository
2. Go to render.com → New Web Service → Connect GitHub repo
3. Root directory: server
4. Build command: npm install
5. Start command: node server.js
6. Environment: Node
7. Deploy — note your public URL
```

### Replacing Placeholder Assets
```
assets/bride.png       → Replace with final bride illustration (keep filename)
assets/groom.png       → Replace with final groom illustration (keep filename)
assets/couple-real.jpg → Replace with the actual couple photo (keep filename)
```

### Customising Wedding Data
```
All wedding details (names, dates, times, venues) are written directly in
index.html. Search for the text you want to change and update it in place.
The 07:11 AM time appears in multiple places — search for "07:11" to find all.
```

---

## PART 12 — FINAL CHECKLIST FOR THE AI/DEVELOPER

Before considering the build complete, verify every item below:

**Data accuracy:**
- [ ] Bride name: Lakshmi Naga Saisree (not Lakshmi Naga Sai Sri or any variation)
- [ ] Groom name: Sri Anoop
- [ ] Bride parents: Komperla Venkata Subba Rao & Meher Jyothi
- [ ] Groom parents: Devaganugula V R K Murthy & Chandrika
- [ ] Event 1: Mangalasnanam, 11 Apr, 7:30 AM, At Home
- [ ] Event 2: Pellikuthuru Veduka, 11 Apr, 10:30 AM, At Home, Followed by Lunch
- [ ] Event 3: Pelli, 12 Apr, 07:11 AM, Gold Conventions, Machilipatnam
- [ ] Venue: Gold Conventions, Machilipatnam (not Masulipatnam, not Chennai)
- [ ] Time: 07:11 AM (not rounded, not changed)

**Cultural accuracy:**
- [ ] All Telugu text uses Noto Sans Telugu font loaded from Google Fonts
- [ ] No Hindi / Devanagari script anywhere
- [ ] No North Indian ritual names (Sangeet, Mehndi, Baraat, Haldi in headings)
- [ ] Lamp SVG is a South Indian brass deepam, not a North Indian clay diya
- [ ] Temple SVG/3D is Dravidian gopuram (tiered rectangular tower), not Nagara dome
- [ ] Kolam pattern is geometric dot-grid, not paisley
- [ ] Banana leaf SVG appears (auspicious South Indian element)

**Backend:**
- [ ] GET /api/attendance returns counts for all 3 events
- [ ] POST /api/attend increments correctly and validates event name
- [ ] localStorage prevents repeat clicks per event per browser
- [ ] If backend is offline, counter hides gracefully — no error shown to guests
- [ ] API_BASE URL is clearly commented with instructions to replace it
- [ ] db.json initial structure is correct with all 3 event keys at 0
- [ ] package.json includes: express, lowdb, cors with exact versions
- [ ] Procfile present: `web: node server/server.js`

**Frontend:**
- [ ] Single index.html file (all CSS and JS inline)
- [ ] assets/ folder with 3 image files at correct paths
- [ ] bride.png and groom.png both use mix-blend-mode: screen on dark container
- [ ] GSAP free tier only — no SplitText, no Flip, no MorphSVG plugins
- [ ] All CDN links use cdnjs.cloudflare.com or cdn.jsdelivr.net only
- [ ] Three.js disposes geometries, materials, renderer on page unload
- [ ] Mobile responsive at 768px and 480px breakpoints
- [ ] prefers-reduced-motion handled
- [ ] Custom cursor disabled on touch/mobile devices
- [ ] Loading splash screen works and exits cleanly before hero shows
- [ ] Marquee text includes both Telugu and English event names
- [ ] Attendance counter animates from 0 to the fetched number on load
- [ ] RSVP Sudarshana Chakra button spins on submit
- [ ] Success message shows after RSVP in Telugu + English
- [ ] All 3 event cards have correct eventKey in their attendance component

---

*End of prompt. Build exactly as specified.*
