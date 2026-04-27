# Directory guide — adding, renaming, or removing sections

For changes to the **structure** of the site — not just content. Use this when you want to:

- Add a brand‑new top‑level section (e.g. *Youth Ministry*)
- Remove a section that's no longer used
- Rename a section
- Move pages between sections
- Bulk‑remove unwanted sub‑pages

> For text/image edits inside an existing page, use [EDITING.md](EDITING.md) instead — that's much simpler.

---

## Two ways to do this

### 🟢 Quick path — for small, isolated changes

Edit folders and files directly. Works well when:
- Removing **one or two** unwanted sub‑pages
- Renaming a single page
- Adding a single new sub‑page (covered in [EDITING.md](EDITING.md))

### 🔵 Generator path — for structural changes (recommended for sections)

Use the included `build-site.js` script. This rebuilds all 181 pages from a single sitemap, so the sidebar, breadcrumbs, and navigation stay consistent everywhere. Required if:
- Adding/removing a whole top‑level section
- Renaming a section that appears in the sidebar
- Doing many changes at once

You'll need **Node.js** installed (one‑time download from <https://nodejs.org> — pick the LTS version).

---

# 🟢 Quick path

## Remove an unwanted sub‑page

Example: remove `home/agt-and-mission-areas/global-missions-partnerships/`

1. **Delete the folder on github.com:**
   - Navigate to `home/agt-and-mission-areas/global-missions-partnerships/`
   - Click `index.html`
   - Click the **trash 🗑️ icon** (top right) → write a commit message → confirm
   - GitHub will delete the file. Once the folder has no files left, GitHub auto‑removes the folder.

2. **Remove links pointing to it.** Search the repo for `global-missions-partnerships`:
   - On the repo page, press `/` to open the search box, type the folder name
   - Open each file that matches and remove the `<a href="...">...</a>` line that points at the deleted folder
   - Commit each one (or do them locally in batch — see below)

3. **Update the parent page's card grid.** Open `home/agt-and-mission-areas/index.html` and remove the `<a class="card">` block for the deleted page.

4. **Sidebar links remain on every page** until rebuilt with the generator. If that's not acceptable for your release window, run the generator path below — it's faster than editing 181 files.

> **Faster locally:** clone the repo, then run a find‑and‑replace across all files:
>
> ```bash
> # macOS / Linux:
> grep -rl "global-missions-partnerships" . | xargs sed -i '' 's|<a href="[^"]*global-missions-partnerships/[^"]*">[^<]*</a>||g'
>
> # Then commit and push.
> ```
>
> **But honestly** — for anything that touches the sidebar, just use the generator. It's faster and safer.

## Rename a sub‑page

GitHub web UI doesn't have a clean "rename folder" button. Two options:

**Web UI (slow):**
- Open the page's `index.html` → click the pencil → in the path field at top, change the folder name → commit → GitHub creates the new path and the old one becomes empty (delete it)
- Then update every link pointing to the old name (search the repo)

**Locally (recommended):**
```bash
git mv home/old-name home/new-name
# update links — search & replace 'old-name' → 'new-name' across files
git commit -am "Rename old-name to new-name"
git push
```

Or just **use the generator** — change the slug in the sitemap and re‑run.

---

# 🔵 Generator path (recommended for sections)

The whole site is built from a sitemap defined inside `build-site.js`. Edit the sitemap, run the script, and all 181 pages regenerate with consistent sidebars, breadcrumbs, and navigation.

## One‑time setup

1. Install Node.js LTS from <https://nodejs.org>. Verify in Terminal:
   ```bash
   node --version
   ```
2. Clone the repo locally (you only need to do this once):
   ```bash
   git clone https://github.com/YOUR-USERNAME/cfc-sg-site.git
   cd cfc-sg-site
   ```

## Editing the sitemap

Open `build-site.js` in any text editor (TextEdit, Notepad, VS Code — any will do). Near the top you'll see:

```js
const sitemap = [
  { title: "Home", slug: "home", icon: "🏠", intent: "...",
    children: [
      { title: "CFC-SG Organizational Structure", slug: "cfc-sg-organizational-structure" },
      { title: "National Council and Regional Heads", slug: "national-council-and-regional-heads",
        children: [
          { title: "GOL National Core Team", slug: "gol-national-core-team" },
          { title: "PFO National Core Team", slug: "pfo-national-core-team" },
          // ...
        ]
      },
      // ...
    ]
  },
  // ... more sections
];
```

Each `{ ... }` is a page. Required keys:
- `title` — what shows in the sidebar and headings
- `slug` — the URL path segment (lowercase, hyphens, no spaces)

Optional:
- `icon` — emoji shown next to top‑level sections
- `intent` — short description (used on landing pages)
- `children` — an array of sub‑pages (omit for leaf pages)

## Common operations

### Add a new top‑level section

Add a new object to the top‑level array:

```js
{ title: "Youth Ministry", slug: "youth-ministry", icon: "🎒",
  intent: "Programs and resources for YFC members.",
  children: [
    { title: "YFC Singapore", slug: "yfc-singapore" },
    { title: "YFC Camp", slug: "yfc-camp" }
  ]
},
```

### Add a new sub‑page

Find the parent's `children` array and add another object:

```js
{ title: "2026 Theme", slug: "2026-theme" }
```

### Rename a section

Change the `title` (what users see) and/or the `slug` (the URL).

> **Warning about slug changes:** if you change a slug, the old URL stops working. Anyone with a bookmark to the old URL will hit a 404. Do this rarely.

### Remove a section or sub‑page

Just delete the `{ ... }` line from the sitemap. The folder will be removed from the next build.

### Reorder sections

Move the lines around — the order in the file is the order they appear in the sidebar.

## Run the generator

In Terminal, in the repo folder:

```bash
node build-site.js
```

You'll see:
```
Total pages: 181
Wrote 181 pages to /Users/.../cfc-sg-site
```

The generator **only touches generated paths** (`assets/`, `index.html`, and the 11 section folders). It will **not** delete your `README.md`, `DEPLOY.md`, `.git/`, or anything else. Safe to re‑run any time.

## Verify, commit, push

```bash
# Open index.html in a browser to spot‑check
open index.html              # macOS
start index.html             # Windows

# If it looks good:
git add .
git commit -m "Restructure: added Youth Ministry section"
git push
```

The live site updates in ~1 minute.

---

## What the generator changes

| Path | Owned by generator? |
|------|---------------------|
| `index.html` | ✅ wiped & rewritten |
| `assets/style.css` | ✅ wiped & rewritten |
| `assets/motion.js` | ✅ wiped & rewritten |
| `home/`, `chapter/`, etc. (the 11 section folders) | ✅ wiped & rewritten |
| `README.md`, `DEPLOY.md`, `EDITING.md`, `DIRECTORY-GUIDE.md` | ❌ left alone |
| `build-site.js` | ❌ left alone |
| `.git/`, `.nojekyll`, `.gitignore` | ❌ left alone |
| Anything else you add (e.g. uploaded PDFs, custom images at root) | ⚠️ left alone — but make sure their paths don't collide with section slugs |

**Don't put custom files inside `home/`, `chapter/`, etc.** — they'll be wiped on next build. Put them in `assets/` or in a custom top‑level folder like `media/`.

---

## Bulk remove sections you don't want

To trim the site down (e.g. for a smaller chapter):

1. Open `build-site.js`
2. Comment out or delete the sections / sub‑pages you don't need
3. Run `node build-site.js`
4. Commit & push

Example — keeping only Home, Chapter, and Holiness:

```js
const sitemap = [
  { title: "Home", slug: "home", /* ... */ },
  // { title: "Responsibility", slug: "responsibility", /* ... */ },
  { title: "Holiness", slug: "holiness", /* ... */ },
  // { title: "Household and Home", slug: "household-and-home", /* ... */ },
  // { title: "Teachings", slug: "teachings", /* ... */ },
  // { title: "Tithes", slug: "tithes", /* ... */ },
  { title: "Chapter", slug: "chapter", /* ... */ },
  // ... etc.
];
```

The deleted folders disappear from the site on next build.

---

## Customising the theme (advanced)

The look (colors, fonts, spacing, motion) is controlled by the `CSS` constant inside `build-site.js`. To change a colour:

1. Find the `:root { --burgundy: #6E1423; ... }` block
2. Change the hex values
3. Re‑run the generator

> If you're not comfortable editing CSS, open an Issue describing what you want changed and the maintainer can help.

---

## Recovering from a bad rebuild

The generator only writes files — it never touches Git history. If a rebuild breaks something:

```bash
git checkout .                 # discard uncommitted changes
node build-site.js             # rebuild from clean sitemap
```

Or revert the sitemap edit and run again.

---

**Need help?** Open an Issue on the repo. Tag `@YOUR-USERNAME` (the maintainer) and describe what you're trying to do.
