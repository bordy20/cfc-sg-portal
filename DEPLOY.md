# Deploy guide — getting the site live

Plain‑English steps. No coding experience needed beyond typing a few commands.

> **Goal:** put this site on the internet at a URL you can share with your team and manager so they can review and suggest changes.

---

## Part 1 — One‑time setup (the maintainer does this once)

### Step 1. Install the tools you need

You only need two things on your computer:

1. **Git** — the tool that uploads files to GitHub
   - macOS: open Terminal, type `git --version`. If it asks to install, say yes.
   - Windows: download from <https://git-scm.com/download/win>
2. **A GitHub account** — sign up free at <https://github.com/signup> if you don't already have one

> **Optional but easier:** install **GitHub Desktop** instead — a button‑click app that does the same thing. Download: <https://desktop.github.com>. The rest of this guide assumes the command‑line; GitHub Desktop has equivalent buttons for every step.

### Step 2. Create the GitHub repository

1. Go to <https://github.com/new>
2. Repository name: `cfc-sg-site`
3. Description: *Couples for Christ — Singapore website*
4. Visibility: **Private** *(only people you invite can see it — recommended)*
5. **Do NOT** check "Add a README", "Add .gitignore", or "Add a license". You already have those in this folder.
6. Click **Create repository**
7. Leave that browser tab open — you'll see commands to copy in a moment.

### Step 3. Upload the files

Open Terminal (macOS) or Git Bash (Windows). Navigate to the unzipped `cfc-sg-site` folder:

```bash
cd path/to/cfc-sg-site
```

Then run these commands one by one (replace `YOUR-USERNAME` with your GitHub username):

```bash
git init
git add .
git commit -m "Initial site upload"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/cfc-sg-site.git
git push -u origin main
```

Git will ask for your GitHub username and password the first time. For the password, **use a Personal Access Token** instead of your real password — generate one at <https://github.com/settings/tokens> (give it the `repo` scope). Paste it when git asks for the password.

> **Doing this in GitHub Desktop instead?** Click *File → Add Local Repository*, point it at the `cfc-sg-site` folder, then click *Publish repository*. Uncheck "Keep this code private" only if you want it public.

### Step 4. Turn on GitHub Pages (the public website)

1. On your repo page, click **Settings** (top right tab)
2. In the left sidebar, click **Pages**
3. Under "Build and deployment" → "Source", choose **Deploy from a branch**
4. Under "Branch", pick **main** and the **/(root)** folder. Click **Save**.
5. Wait 1–2 minutes. Refresh the Pages settings page. You'll see:

   > Your site is live at `https://YOUR-USERNAME.github.io/cfc-sg-site/`

That's the URL to share. Done.

---

> ## ⚠️ Important note about Private repos and GitHub Pages
>
> GitHub Pages works on **private** repos only if your account is on a paid plan (**GitHub Pro**, **Team**, or **Enterprise**). On a **Free** account, GitHub Pages requires the repo to be **Public**.
>
> If you're on a Free account, you have three options:
>
> 1. **Make the repo Public** — the source code is visible to anyone, but the site URL is the same. The content is just CFC‑SG info, so this is usually fine.
> 2. **Upgrade to GitHub Pro** ($4/month) — keeps the repo private and Pages working.
> 3. **Use Netlify instead** (free, works with private repos) — see *Part 4* below.

---

## Part 2 — Invite your team (so they can edit)

1. On your repo page → **Settings** → **Collaborators** (left sidebar)
2. Click **Add people**
3. Type the teammate's GitHub username or email → send invite
4. They'll get an email — once they accept, they can edit content

For your manager (review only): add them the same way. They can leave comments via Issues even without making edits.

---

## Part 3 — Day‑to‑day updates (every time you change something)

Whenever you (or any teammate) edits a file:

**Easy way — directly on github.com (no install needed):**
1. Open the file on github.com
2. Click the pencil ✏️ icon (top right of the file view)
3. Make your edits
4. Scroll down → enter a short message like "Updated First Fruits page" → click **Commit changes**
5. The site rebuilds automatically. Refresh the live URL after ~1 minute.

**Local way — for big edits or batch changes:**
```bash
cd cfc-sg-site
git pull                              # get latest changes from teammates
# ... make your edits in any editor ...
git add .
git commit -m "Describe what changed"
git push
```

The live site updates automatically every time you push.

---

## Part 4 — Alternative: Netlify (works with Private repos on Free)

If you'd rather use Netlify (or you're on GitHub Free and don't want to make the repo public):

1. Sign up free at <https://app.netlify.com/signup>
2. Click **Add new site** → **Import an existing project** → **GitHub**
3. Authorize Netlify, pick the `cfc-sg-site` repo
4. Build settings:
   - Build command: *(leave blank)*
   - Publish directory: `.`
5. Click **Deploy site**
6. Netlify gives you a URL like `https://magnificent-cfc-sg.netlify.app` — share that.

Every push to GitHub auto‑redeploys to Netlify.

---

## Part 5 — Custom domain (optional, later)

If you own a domain like `cfc-sg.org`:

- **GitHub Pages:** Settings → Pages → Custom domain → enter your domain → follow the DNS instructions
- **Netlify:** Site settings → Domain management → Add custom domain → follow the DNS instructions

Both come with free HTTPS automatically.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `git push` asks for a password and rejects mine | Use a Personal Access Token, not your real password. Generate at <https://github.com/settings/tokens> with `repo` scope. |
| Pages says "404 — File not found" | Make sure `index.html` is at the **root** of the repo (not inside a subfolder). Wait 2 minutes after enabling Pages. |
| Site loads but looks unstyled | Make sure the `.nojekyll` file is in the root. It tells GitHub Pages not to process your CSS through Jekyll. |
| I see my changes locally but not on the live site | After pushing, GitHub Pages takes ~1 minute to rebuild. Refresh hard with `Cmd/Ctrl + Shift + R`. |
| Editor on github.com asks me to "fork" the repo | That means you're not yet a collaborator. Ask the maintainer to add you (Settings → Collaborators). |

---

**Next:** see [EDITING.md](EDITING.md) for what to edit and how, or [DIRECTORY-GUIDE.md](DIRECTORY-GUIDE.md) for adding/removing sections.
