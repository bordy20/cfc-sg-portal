# Editing guide — making content changes

For teammates who want to update text, swap an image, add a page, or delete a page. **You do not need to know how to code.**

> **Live site:** https://bordy20.github.io/cfc-sg-portal/
>
> Already deployed? See [DEPLOY.md](DEPLOY.md). For adding/removing whole sections, see [DIRECTORY-GUIDE.md](DIRECTORY-GUIDE.md).

## Quick reference

| I want to… | Jump to… |
|------------|----------|
| Edit text on a page | [Edit existing text](#edit-existing-text-on-a-page) |
| Add a new sub-page | [Adding a new sub-page](#adding-a-new-sub-page) |
| Delete a page | [Deleting a page](#deleting-a-page) |
| Add an image | [Adding an image](#adding-an-image) |
| Edit the landing page | [Editing the landing page](#editing-the-landing-page) |
| Edit links or headings | [Edit a heading](#edit-a-heading-or-section-title) / [Edit a link](#edit-a-link) |

---

## The easiest way — edit on github.com

You don't need to install anything. Everything below happens in your web browser.

### Edit existing text on a page

1. Go to the repo on github.com (e.g. `https://github.com/bordy20/cfc-sg-portal`)
2. Click into the folder for the section you want, e.g. `home/cfc-vision/`
3. Click `index.html`
4. Click the **pencil ✏️ icon** (top right of the file)
5. The file opens for editing. Find the text you want to change.

   The HTML looks like this — the parts inside the angle brackets are tags, the part **between them** is what shows on the page:

   ```html
   <h1>Vision</h1>
   <p>Families in the Holy Spirit, renewing the face of the earth.</p>
   ```

   Just change the words between the tags. **Leave the angle brackets alone.**

6. Scroll down. Under "Commit changes":
   - Top box: a short summary, e.g. *"Updated Vision statement"*
   - Bottom box: optional details
7. Click **Commit changes**. Done — the live site updates in about a minute.

> **Made a mistake?** Every edit is saved as a "commit" — you can always go back. Just open the file, click the **History** button, find the previous version, and click "Revert this commit". GitHub will offer to undo.

### Edit a heading or section title

Same as above. Headings look like `<h1>...</h1>`, `<h2>...</h2>`, `<h3>...</h3>`. Just change the text inside.

### Edit a link

Links look like:

```html
<a href="https://example.com">Click here</a>
```

- Change `https://example.com` to update where the link goes
- Change `Click here` to update what the visitor sees

### Edit a list

```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

- `<ul>` = bullet list. `<ol>` = numbered list.
- Each `<li>...</li>` is one item. Add or remove `<li>` lines to change the list.

---

## Adding an image

1. Make sure your image is small (under 500 KB ideally — use <https://tinypng.com> to compress)
2. Name it sensibly: `vision-2026.jpg`, no spaces, lowercase
3. Upload it: on github.com, navigate to the page's folder (e.g. `home/cfc-vision/`), then **Add file → Upload files**, drag your image in, commit.
4. Insert it into the page: open `index.html` in that folder, in the place you want the image, type:

   ```html
   <img src="vision-2026.jpg" alt="CFC-SG vision banner" />
   ```

   `alt` is what screen readers and slow connections show. Always describe the image briefly.

### Tip: shared images go in `assets/`

If the same image is used on multiple pages, upload it once to the top‑level `assets/` folder. Then refer to it from any page using the right number of `../`:

| From | Path |
|------|------|
| `home/cfc-vision/index.html` | `<img src="../../assets/logo.png" />` |
| `chapter/family-ministries/yfc/index.html` | `<img src="../../../assets/logo.png" />` |

The pattern: one `../` for each folder you have to climb out of to get back to the root.

---

## Adding a new sub‑page

Say you want to add a "2026 Theme" page under `home/`:

### Option A — duplicate an existing page (easiest)

1. Pick a page that's structurally similar (same section). For example, copy `home/cfc-vision/index.html`.
2. On github.com, open it, click **Raw** (top right of the file view), then save the page as a file on your computer (`Cmd/Ctrl + S`).
3. Rename it locally and re‑upload it into a new folder, e.g.:
   - Create folder `home/2026-theme/`
   - Upload your saved file as `index.html` inside it
4. Edit `home/2026-theme/index.html`:
   - Change the `<title>` tag
   - Change the `<h1>` heading
   - Change the breadcrumb (look for `<nav class="crumbs">`)
   - Replace the body content
5. **Add a link to your new page** from the section landing. Open `home/index.html` and add a new card in the grid:

   ```html
   <a href="2026-theme/" class="card">
     <h3>2026 Theme</h3>
     <p>This year's theme and rallying call.</p>
   </a>
   ```

6. Commit. The page is live.

### Option B — use the generator (cleaner for many pages at once)

See [DIRECTORY-GUIDE.md](DIRECTORY-GUIDE.md) — easier when you're adding several pages or restructuring.

---

## Deleting a page

### Delete a single sub-page (Web UI)

Example: delete the page at `home/vatican-recognition/`

1. On github.com, navigate to `home/vatican-recognition/`
2. Click `index.html`
3. Click the **trash 🗑️ icon** (top right of the file view)
4. Write a commit message like *"Removed Vatican Recognition page"*
5. Click **Commit changes**
6. GitHub auto-removes the folder once all its files are gone

**Important — clean up links pointing to the deleted page:**

7. On the repo page, press `/` to open search. Type `vatican-recognition`
8. Open each file that matches and remove the `<a href="...">...</a>` or `<a class="card">` block pointing to the deleted page
9. Commit each fix

**Pages to check:**
- The parent section's `index.html` (e.g. `home/index.html`) — remove the card from the grid
- The landing page `index.html` — if the deleted page was linked from the footer or ministries section
- Other content pages that may cross-link to it

### Delete a sub-page (Local / batch)

Faster when removing multiple pages:

```bash
cd cfc-sg-portal

# Delete the folder
rm -rf home/vatican-recognition/

# Find and review all files that link to it
grep -rl "vatican-recognition" .

# Remove those links, then commit
git add .
git commit -m "Removed Vatican Recognition page and cleaned up links"
git push
```

### Delete an entire section

If you want to remove a whole top-level section (e.g. all of `zoom-tutorials/`), use the generator — see [DIRECTORY-GUIDE.md](DIRECTORY-GUIDE.md). Doing it manually means editing the sidebar in 181 files.

---

## Editing the landing page

The landing page (`index.html` in the root) is the public-facing hero page visitors see first. It has its own styling separate from the content pages.

### Structure of the landing page

| Section | What it shows | Where to edit |
|---------|---------------|---------------|
| **Top bar** | "Building God's Kingdom..." tagline | Lines 14–19 |
| **Navigation** | Logo + nav links (About, Holy Family, Ministries, Events, Community, Join CLP) | Lines 22–49 |
| **Hero** | Big heading "Where Every Family Belongs" + description + buttons | Lines 92–111 |
| **Welcome strip** | 4 pillars: Faith-Centred, Family-Focused, Community-Driven, Mission-Minded | Lines 115–125 |
| **About** | "A Community Rooted in Love" — who CFC is, 40+ years stat | Lines 128–190 |
| **Holy Family** | Jesus, Mary, Joseph section with dark blue background | Lines 193–250 |
| **Ministries** | 6 cards — CFC Couples, Youth, Kids, Singles, Seniors, Handmaids | Lines 253–322 |
| **Events** | Upcoming events — CLP, Families in Prayer, Youth Camp, Family Day | Lines 325–376 |
| **Community stories** | Testimonials from members | Lines 379–417 |
| **Footer** | Links to all sections, scripture verse, copyright | Lines 421–477 |

### Common landing page edits

**Change an event:**
Find the events section (look for `<!-- ===== EVENTS ====== -->`). Each event has:
```html
<div class="ev-s-date"><span>JUL</span><span>20</span></div>  <!-- month + day -->
<h4>Families in Prayer</h4>                                     <!-- event name -->
<p>Monthly community gathering — worship, prayer, fellowship.</p> <!-- description -->
<span class="ev-where small">📍 Multiple Venues</span>          <!-- location -->
```
Just change the text between the tags.

**Change a ministry card link:**
Each ministry card has a link like:
```html
<a href="chapter/family-ministries/yfc/" class="min-cta">Learn More →</a>
```
Change the `href` to point to a different page, or update the text.

**Change the hero heading or description:**
```html
<h1 class="hero-heading">
  Where Every<br/>
  <span class="heading-warm">Family Belongs</span>
</h1>
<p class="hero-body">CFC Singapore is a warm, welcoming community...</p>
```

**Change footer links:**
Footer links look like `<a href="home/">About CFC</a>`. Change the `href` or the visible text.

**Change colors:**
Edit `assets/style.css`. The color palette is defined at the top:
```css
:root {
  --blue-deep: #1a1a6e;    /* darkest blue */
  --blue-dark: #2d2da8;    /* dark blue */
  --blue-primary: #3838b8; /* main blue */
  --gold: #c9a84c;         /* accent gold */
}
```

---

## Editing the sidebar navigation

The left sidebar appears on every page and is **embedded in each HTML file**. So if you add a top‑level page and want it in the sidebar of every page, you have two options:

- **Quick (one page only):** edit the `<aside class="sidebar">` block in the page where you want the link. Useful if a link should only show in one section.
- **Site‑wide (every page):** use the generator — see [DIRECTORY-GUIDE.md](DIRECTORY-GUIDE.md). Editing 181 files by hand is not realistic.

---

## What if I break something?

Don't worry. Every change is reversible.

1. On github.com, go to the file you edited
2. Click **History**
3. Find the version that was working, click it
4. Click the **`...`** menu → **Revert**

Or: just edit the file again and fix it. Nothing is lost.

---

## Editing best practices

- **Make small, focused commits.** "Updated First Fruits date" is better than "Lots of changes".
- **Write descriptive commit messages.** Future you (and the team) will thank you.
- **Check the live site after pushing.** Wait ~1 minute, hard‑refresh (`Cmd/Ctrl + Shift + R`).
- **Don't paste rich text from Word/Google Docs directly into HTML.** It pulls in invisible formatting that breaks layout. Paste into a plain text editor first to strip styling.
- **Ask before deleting things you didn't write.** Use Issues on the repo to discuss.

---

## Things you should NOT edit (unless you know HTML/CSS)

- `assets/style.css` — controls colors, fonts, spacing for the whole site
- `assets/main.js` — controls landing page interactions and scroll animations
- The `<head>` section of any HTML file (the part before `<body>`)
- The `<header>` and `<footer>` sections — they're the same on every page

If you need a colour or layout change, open an Issue describing what you want and the maintainer can help.

---

**Next:** [DIRECTORY-GUIDE.md](DIRECTORY-GUIDE.md) — how to add, rename, or remove whole sections.
