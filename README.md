# CFC‑SG Website (Living Covenant theme)

The internal site for **Couples for Christ – Singapore**. A 181‑page static website covering covenant, mission, leadership, formation, ministries, and chapter resources.

> **Live site:** _Set after first deploy — see [DEPLOY.md](DEPLOY.md)._

---

## What's in this repo

| Path | What it is |
|------|------------|
| `index.html` | Site landing page (the visitor's first stop) |
| `home/`, `responsibility/`, `holiness/`, `household-and-home/`, `teachings/`, `tithes/`, `chapter/`, `evangelization-and-clp/`, `ancop/`, `mission-centre/`, `zoom-tutorials/` | The 11 main sections — each with sub‑pages |
| `assets/style.css` | All styling (colors, layout, motion) |
| `assets/motion.js` | Scroll animations + counters |
| `build-site.js` | Optional generator (rebuilds all 181 pages at once) |
| `.nojekyll` | Tells GitHub Pages to serve files as‑is |
| `README.md` | This file |
| `DEPLOY.md` | **Step‑by‑step deployment guide** (start here) |
| `EDITING.md` | How to edit text, images, links |
| `DIRECTORY-GUIDE.md` | How to add, rename, or remove sections |

---

## Quick start for teammates

**Just want to read the docs?**
1. Open [DEPLOY.md](DEPLOY.md) — getting the site live
2. Open [EDITING.md](EDITING.md) — making content changes
3. Open [DIRECTORY-GUIDE.md](DIRECTORY-GUIDE.md) — restructuring sections

**Want to view the site locally?**
- Double‑click `index.html` — opens in your browser. Done.

**Want to make a small edit?**
- See [EDITING.md](EDITING.md) — you can edit directly on github.com without installing anything.

---

## How the site is built

This is a **static HTML website**. There is no database, no server, no build step required to view it. Every page is a plain `.html` file you can open or edit.

There is an optional generator (`build-site.js`) that can rewrite all 181 pages at once if you want to do a structural change (rename a section, add a new one, etc.). You only need it for big changes — see [DIRECTORY-GUIDE.md](DIRECTORY-GUIDE.md).

---

## Theme

**Living Covenant** — burgundy + gold + cream, Fraunces serif headings, Inter body text, gentle scroll animations. All motion respects the OS "Reduce Motion" setting.

---

## Need help?

- Open an **Issue** on this repo — the team will see it
- Or message the maintainer directly

— *Built with care for the CFC‑SG community.*
