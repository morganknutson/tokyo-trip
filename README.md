# Tokyo pocket guide

A mobile-first city guide for a week in Tokyo: around 400 hand-picked places to eat, see, do and shop, a drag-and-drop day planner with walking routes, and practical info on transit, money, phrases and packing.

Plain HTML, CSS and JavaScript. No build step.

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

**Want your own version?** See [REMIX.md](REMIX.md), or ask your agent to "make this guide mine". Trip details live in `config.js`, places in `data/`, and the whole look in `styles/tokens.css`. Run `node scripts/check.js` after editing to catch mistakes.
