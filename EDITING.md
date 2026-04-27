# Editing guide — making content changes

For teammates who want to update text, swap an image, or add a new page. **You do not need to know how to code.**

> Already deployed? See [DEPLOY.md](DEPLOY.md). For adding/removing whole sections, see [DIRECTORY-GUIDE.md](DIRECTORY-GUIDE.md).

---

## The easiest way — edit on github.com

You don't need to install anything. Everything below happens in your web browser.

### Edit existing text on a page

1. Go to the repo on github.com (e.g. `https://github.com/YOUR-USERNAME/cfc-sg-site`)
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
- `assets/motion.js` — controls scroll animations
- The `<head>` section of any HTML file (the part before `<body>`)
- The `<header>` and `<footer>` sections — they're the same on every page

If you need a colour or layout change, open an Issue describing what you want and the maintainer can help.

---

**Next:** [DIRECTORY-GUIDE.md](DIRECTORY-GUIDE.md) — how to add, rename, or remove whole sections.
