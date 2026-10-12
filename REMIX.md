# Remixing this guide

This is a pocket city guide: places to eat, see, do and shop, a drag-and-drop day planner with a walking-route map, and practical info pages. It ships as a complete Tokyo guide (about 400 places) that you can make your own: a different trip, a different city, a different look.

It's plain HTML, CSS and JavaScript with no build step and no dependencies.

## Start here (for agents)

When someone asks you to make this guide theirs, work out which kind of remix they want, ask the questions for that kind in one message, then follow the matching steps. Don't start editing until you know the city and dates; everything else can take a sensible default you mention in your reply.

### A. Same city, their own trip

They're going to Tokyo too. Keep the ~400 places and replace everything about the original traveler's trip.

Ask:
1. What are your dates?
2. Where are you staying? (Hotel name or neighborhood.)
3. Any fixed commitments, like a conference, wedding or work days? Which days?
4. Which airport are you flying into, and where are you flying home to?
5. Anything you especially love or want to skip (food, nightlife, shopping, museums…)?
6. Do you want the current look, or a new one? (See C.)

Then fill in `days` and `stays` in `config.js` (both start empty), rewrite every item in [What's specific to the original trip](#whats-specific-to-the-original-trip), and change `storagePrefix`. Leave the place files alone unless they ask; you can trim categories they want to skip.

### B. New city

Ask everything in A, plus:
- Which city? Roughly what budget?
- How many places per tab do you want? (The original has 60–100 per tab. 20–40 is plenty for a first pass.)

Then:
1. Research and write new place files in the [place format](#place-format). Keep `nameJa` for a local-script name if the city has one, or leave it out.
2. Rewrite `data/practical.json` for the new city. Drop sections that don't apply.
3. Update `config.js`: `city` (including `bounds` for the map), `days`, `stays`, `baseArea`, `storagePrefix`, `categoryTones` and `transitLines`.
4. Optionally rename the `--tone-*` tokens after the new city's transit lines (see [Design system](#design-system)).
5. Update `README.md`, the `<title>` fallback in `index.html`, and the icon.

### C. New look only

Ask:
1. What mood or reference should it feel like? Any brand colors or fonts?
2. Light, dark, or follow the phone?

Then change only `styles/tokens.css`, `theme` in `config.js`, and the icon. Don't put raw colors or sizes in `app.css`.

### When you're done

1. Run `node scripts/check.js` and fix every error. Read the warnings.
2. Serve the folder (see [Run it](#run-it)) and click through Plan, each place tab, and every page under More.
3. Tell the person what you changed, what you assumed, and anything they still need to do (like adding a Maps API key).

## What's specific to the original trip

The places in `data/` are general Tokyo recommendations. These parts describe one person's February 2026 trip (a conference in Shibuya, a hotel in Akasaka, flying home to Portland) and need rewriting for anyone else, even someone going to Tokyo:

**`config.js`**
- `days` and `stays` ship empty, and so does `itineraries` in `data/practical.json`, so the app shows empty states for the schedule, the planner's days, the Stay page and Suggested day plans until you add a trip. The header date line, page title and day labels are all generated from the dates in `days`.
- `baseArea`: `'Akasaka'`
- `storagePrefix`: change it so the original guide's saved data doesn't carry over

**`data/practical.json`**
- `neighborhoods`: written around the hotel (Akasaka) and the conference venue (Shibuya); `afterConference` and `nearTrunk` are conference-specific
- `airportDirections`: every route ends at the Akasaka hotel
- `keyStations`: `from` and `note` assume the traveler starts in Akasaka and commutes to the conference
- `weather` and `packingList`: written for late February; `packingList` mentions the conference
- `reservations`, `transportation.lastTrains`, `luggage`, `connectivity.wifi`: mention "your hotel"; check the wording still fits

Everything else in `practical.json` (phrases, etiquette, money, budget, apps, links, emergency numbers) is general Tokyo information.

## Run it

The app loads JSON with `fetch`, so open it through a local server rather than as a file:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

To publish, upload the folder to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

## Where things live

| To change… | Edit |
|---|---|
| City, dates, daily schedule, hotel, tabs, category colors | `config.js` |
| Places (the cards on Food, See, Do, Shop) | `data/food.json`, `data/sights.json`, `data/nightlife.json`, `data/hidden.json`, `data/shopping.json` |
| Info pages (transport, money, phrases, packing…) | `data/practical.json` |
| Colors, fonts, spacing, corner radii, dark mode | `styles/tokens.css` |
| Component styling | `styles/app.css` (uses tokens only) |
| App icon | `icon.svg` and `apple-touch-icon.png` (180×180) |
| Behavior | `app.js` (rarely needed) |
| Checking your changes | `node scripts/check.js` |

`research/` holds earlier raw research in the same format as `data/`. The app doesn't load it. Delete it or use it as source material.

## Making it yours: checklist

1. **`config.js`**: set `city`, `days`, `stays` and `baseArea`. Each day needs only a `date` (YYYY-MM-DD); add a `theme` and a `plan` line if you like. Dates and labels like "Sun, Feb 15" are generated, so don't type them anywhere. Change `storagePrefix` (e.g. `'lisbon'`) so favorites and plans saved by the original guide don't carry over.
2. **Places**: replace or edit the files in `data/`. Keep the fields below. To add a tab or rename one, edit `tabs` in `config.js`; each tab lists the data files it shows. `defaultTab` sets which page the app opens on.
3. **Categories**: every place has a `category`. Map each one to a tone in `categoryTones` in `config.js`. Unmapped categories get a tone automatically, so this is optional.
4. **Info pages**: edit `data/practical.json`. Any section whose key is missing is skipped, so remove what you don't need.
5. **Look**: change values in `styles/tokens.css` (see below). Update the icon to match.
6. **Check**: run `node scripts/check.js` and fix any errors.
7. **Map (optional)**: put a Google Maps API key in `mapsApiKey`. Enable the Maps JavaScript, Geocoding and Directions APIs and restrict the key to your domain. Without a key, everything works except the Plan > Map view, which explains how to add one.

## Place format

Each data file is an array of places. Only `name`, `category` and `neighborhood` are required; everything else is shown when present.

```json
{
  "name": "Fuunji",
  "nameJa": "風雲児",
  "category": "Ramen",
  "neighborhood": "Shinjuku",
  "nearestStation": "Shinjuku Station",
  "description": "Legendary tsukemen shop with an almost permanent queue.",
  "priceRange": "¥850-1100",
  "hours": "11:00-15:00, 17:00-21:00",
  "whatToOrder": "Tsukemen with ajitama.",
  "tips": "Expect a 30-60 min wait.",
  "tags": ["must-visit", "budget"],
  "vibeRating": 4,
  "mapsQuery": "Fuunji Shinjuku Tokyo"
}
```

| Field | Shown as |
|---|---|
| `nameJa` | Local-language name beside the title. Use it for any second script. |
| `vibeRating` | 1–5 dots (0 or missing hides it) |
| `weirdnessLevel` | 1–5 bar labeled "weird" (0 or missing hides it) |
| `priceRange`, `admissionCost`, `hours`, `timeNeeded`, `whatToOrder`, `whatToBuy`, `howToFind`, `tips` | Labeled rows when the card is expanded. Labels are in `DETAIL_FIELDS` in `app.js`. |
| `mapsQuery` | Google Maps search for directions and the map. Falls back to `name` + `city.geocodeSuffix`. |

A place's identity is its `name` + `neighborhood`. Changing either one disconnects it from existing favorites and plans. The same place can appear under two tabs (Tsukiji Outer Market is in both Food and See); both copies share one favorite and one plan entry. If one tab combines files that list the same place, only the first copy is shown.

## Info page format (`data/practical.json`)

Top-level keys and what reads them:

- **Stay**: `neighborhoods` → `{ key: { title, description, stations?, …lists and notes } }`. Array fields render as lists; other text fields render as labeled notes.
- **Transport**: `airportDirections` → `{ key: { title, options: [{ method, time, cost, steps, recommended? }] } }`, `keyStations` → `[{ line, from, note }]` (line colors come from `transitLines` in `config.js`), `transportation` → `{ suica, trainTips, lastTrains }`.
- **Day plans**: `itineraries` → `[{ day, theme, slots: [{ time, activity }] }]`.
- **Money**: `reservations` → `[{ name, price, urgency, how }]`, `budget` → `{ daily: { tier: { amount, usd, description } }, references: ["Label: value"] }`, `money` → `{ cashVsCard, tipping, taxFree }`.
- **Packing**: `weather`, `packingList` → `{ group: [items] }`, `rainyDay` → `[{ activity, why }]`.
- **Phrases**: `language` → `[{ phrase, japanese, pronunciation }]`, `etiquette` → `[text]`.
- **Essentials**: `connectivity` → `{ wifi, esim }`, `luggage`, `electrical`, `emergencyNumbers`, `apps` → `[{ name, description }]`, `usefulLinks` → `[{ name, url }]`.

## Design system

`styles/tokens.css` has four layers:

1. **Primitives**: raw palette (`--gray-*`, `--indigo-*`), type scale (`--text-*`), spacing (`--space-*`), radii, motion. Change these to rebrand.
2. **Semantic tokens**: what each value is for: `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-border` and so on, plus map colors. Components only use these.
3. **Tones**: `--tone-*`, the category marker colors. They're named after Tokyo Metro lines; for another city, rename them after its transit lines and update `categoryTones` in `config.js` and `TONES` in `app.js`.
4. **Dark theme**: semantic overrides under `:root[data-theme='dark']`. `theme` in `config.js` picks `auto`, `light` or `dark`.

Rules that keep it easy to change:

- `app.css` contains no raw colors, font sizes or radii. Add a token first, then use it.
- To swap the accent, change `--color-accent` (and its `-hover`, `-soft` and `-ring` variants) in both themes.
- To change the font, edit the `@import` at the top of `tokens.css` and `--font-sans`. Pick a family that covers the local script if your data has `nameJa`-style names. Then check `--font-sans-optical-shift` and `--font-sans-optical-shift-mixed`, which nudge lowercase labels (like "rating" and "weird") and mixed-case text (like the search placeholder) so they sit centered on nearby icons and scales. It depends on the font; most system fonts need `0`.
- The map style, markers and route line read tokens at runtime, so they follow the theme automatically.

## Suggested prompts for your agent

- "Make this a guide for Lisbon, May 3–10. Replace the Tokyo data with researched places in the same format, and update config.js and practical.json."
- "Reskin this with a warm, sunny palette and a rounded font. Only change styles/tokens.css and the icon."
- "Add a Coffee tab using a new data/coffee.json."
- "I'm in Tokyo June 2–9, staying near Ueno. Fill in my days and hotel."
