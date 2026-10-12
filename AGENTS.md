# Agent instructions

This repo is a remixable city guide. If you've been asked to make it someone's own (a new trip, a new city, or a new look), read [REMIX.md](REMIX.md) first. Start with its "Start here" section: it lists the questions to ask and the exact files to change.

Quick facts:

- Plain HTML, CSS and JavaScript. No build step, no dependencies. Serve with `python3 -m http.server 8000`.
- Trip settings: `config.js`. Places: `data/*.json`. Info pages: `data/practical.json`. Look: `styles/tokens.css`.
- `styles/app.css` uses design tokens only. Add a token in `tokens.css` instead of hardcoding a color, font size or radius.
- After any change to config or data, run `node scripts/check.js` and fix every error.
