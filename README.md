# CFC‑SG Website

The official website for **Couples for Christ – Singapore**. A 181‑page static website with a professional blue/indigo-themed landing page, covering covenant, mission, leadership, formation, ministries, and chapter resources.

> **Live site:** https://bordy20.github.io/cfc-sg-portal/
>
> **Repository:** https://github.com/bordy20/cfc-sg-portal

---

## What's in this repo

| Path | What it is |
|------|------------|
| `index.html` | **Landing page** — the public-facing hero page with blue/indigo theme, SVG art, ministry cards, events, and community stories |
| `assets/style.css` | Landing page styles (blue/gold palette, Lora + Nunito fonts, responsive layout) |
| `assets/main.js` | Landing page interactions (nav toggle, scroll animations, fade-ins) |
| `home/`, `responsibility/`, `holiness/`, `household-and-home/`, `teachings/`, `tithes/`, `chapter/`, `evangelization-and-clp/`, `ancop/`, `mission-centre/`, `zoom-tutorials/` | The 11 main content sections — each with sub‑pages (181 pages total) |
| `build-site.js` | Site generator — rebuilds all 181 content pages at once |
| `.nojekyll` | Tells GitHub Pages to serve files as‑is (no Jekyll processing) |
| `.github/workflows/pages.yml` | GitHub Actions workflow for automatic deployment |
| `README.md` | This file |
| `DEPLOY.md` | Step‑by‑step deployment guide |
| `EDITING.md` | **How to edit text, images, links, add/delete pages** |
| `DIRECTORY-GUIDE.md` | How to add, rename, or remove whole sections |

---

## Quick start

| I want to… | Go to… |
|------------|--------|
| **Edit text on an existing page** | [EDITING.md](EDITING.md) — you can do this directly on github.com |
| **Add a new page** | [EDITING.md](EDITING.md#adding-a-new-sub-page) |
| **Delete a page** | [EDITING.md](EDITING.md#deleting-a-page) |
| **Add or remove a whole section** | [DIRECTORY-GUIDE.md](DIRECTORY-GUIDE.md) |
| **Edit the landing page** | [EDITING.md](EDITING.md#editing-the-landing-page) |
| **Deploy or set up hosting** | [DEPLOY.md](DEPLOY.md) |
| **View the site locally** | Just double‑click `index.html` — it opens in your browser |

---

## Site architecture

```
cfc-sg-portal/
├── index.html                    ← Landing page (blue theme, public-facing)
├── assets/
│   ├── style.css                 ← Landing page CSS
│   └── main.js                   ← Landing page JS
├── home/                         ← 🏠 Home section
│   ├── index.html                ← Section landing (card grid)
│   ├── cfc-vision/index.html     ← Sub-page
│   ├── cfc-mission/index.html
│   └── ...
├── chapter/                      ← ⛪ Chapter section
│   ├── family-ministries/
│   │   ├── yfc/                  ← Youth for Christ
│   │   ├── kfc/                  ← Kids for Christ
│   │   └── sfc/                  ← Singles for Christ
│   └── ...
├── holiness/                     ← ✝ Holiness section
├── evangelization-and-clp/       ← 📖 Evangelization & CLP
├── ancop/                        ← 🤝 ANCOP
├── responsibility/               ← 🕊 Responsibility
├── teachings/                    ← 🎓 Teachings
├── tithes/                       ← 💰 Tithes
├── household-and-home/           ← 👪 Household & Home
├── mission-centre/               ← 🏢 Mission Centre
├── zoom-tutorials/               ← 💻 Zoom Tutorials
├── build-site.js                 ← Generator (optional — for structural changes)
└── .github/workflows/pages.yml   ← Auto-deploy on push
```

---

## How it works

This is a **static HTML website** — no database, no server, no build step required. Every page is a plain `.html` file.

**Two layers:**
1. **Landing page** (`index.html` + `assets/`) — the beautiful blue-themed public page with hero, ministries, events, and community stories
2. **Content pages** (the 11 section folders) — 181 internal pages with sidebar navigation, breadcrumbs, and detailed CFC content

The landing page links to the content pages. Content pages have their own styling (Living Covenant theme with sidebar navigation).

**Automatic deployment:** every push to `main` triggers GitHub Actions, which deploys the site to GitHub Pages within ~1 minute.

---

## Theme

**Landing page:** Blue/indigo + gold palette, Lora serif headings, Nunito body text, SVG sacred art, scroll fade animations. Fully responsive.

**Content pages:** Living Covenant theme — Fraunces headings, Inter body text, collapsible sidebar, gentle scroll animations. All motion respects the OS "Reduce Motion" setting.

---

## Need help?

- Open an **Issue** on this repo — the team will see it
- Or message the maintainer directly

— *Built with care for the CFC‑SG community.*
