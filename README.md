# Trivik Courtyard — Landing Site

A premium marketing landing page for **Trivik Courtyard**, a ~23.5-acre plotted
residential development in Devanahalli, North Bengaluru. Built on the MERN stack
(originally scaffolded from an Assetz "City of Palms" replica, now fully
rebranded and redesigned for Trivik).

- **Live site:** https://akhilesh-varanasi-18.github.io/Assetz/
- **Repo:** https://github.com/Akhilesh-Varanasi-18/Assetz (branch: `main`)
- **Hosting:** GitHub Pages, auto-deployed by GitHub Actions on every push to `main`.

> ⚠️ The **live site is frontend-only** (static). The Express backend (enquiry
> form API) is **not** hosted, so the "Pre-book / Enquire" form won't submit on
> the live URL. That's fine for design review/sharing. To run the form end-to-end,
> run the backend locally (see below).

---

## 1. Tech stack

| Layer | Tech |
|---|---|
| Front end | **React 18** + **Vite 5** (JS, not TS) |
| Styling | One global stylesheet: `client/src/styles/global.css` |
| Fonts | Google Fonts — **Montserrat** (headings/UI) + **Lora** (prose) |
| Sliders | `react-slick` + `slick-carousel` (Clubhouse / Gallery mobile) |
| Back end | **Express 4** + **Mongoose 8** (MongoDB) + **Nodemailer** |
| Deploy | GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`) |
| Image tooling | `sharp` (used offline in a scratchpad, **not** a project dependency) |

Node **20+** recommended (CI uses Node 20).

---

## 2. Repository structure

```
Assetz/
├─ client/                     # React + Vite front end (this is 95% of the work)
│  ├─ index.html
│  ├─ vite.config.js           # base-path logic for GitHub Pages (see §6)
│  ├─ public/
│  │  ├─ images/               # all site images (webp) + 2 videos — OPTIMIZED
│  │  └─ fonts/
│  └─ src/
│     ├─ App.jsx               # section order for the whole page
│     ├─ main.jsx
│     ├─ components/           # one file per section (see §7)
│     ├─ data/                 # content/data arrays (contentData.js, locationLandmarks.js…)
│     ├─ hooks/useSiteEffects.js  # scroll effects: header, fade-ups, progress ring
│     └─ styles/global.css     # ALL styles live here
├─ server/                     # Express API — enquiry form (MongoDB) + email
│  ├─ index.js
│  ├─ routes/ , models/
│  └─ .env.example             # copy to .env and fill in to run the backend
├─ .github/workflows/deploy.yml
└─ README.md                   # you are here
```

**Not in git (by design):** `node_modules/` (reinstall), `dist/` (built by CI),
`server/.env` (secrets), and the raw design sources `data/` & `data2/` (not needed
to build). If a teammate needs the raw design renders, transfer them separately.

---

## 3. First-time setup (for a new collaborator)

```bash
# 1. clone
git clone https://github.com/Akhilesh-Varanasi-18/Assetz.git
cd Assetz

# 2. install front-end deps
cd client
npm install

# 3. (optional) install back-end deps — only if working on the enquiry form
cd ../server
npm install
cp .env.example .env      # then edit .env with a MongoDB URI
```

You now have the exact code + all images. Everything to build/run the front end
is present.

---

## 4. Running locally (start / stop)

### Front end (the main app)
```bash
cd client
npm run dev          # starts Vite dev server → http://localhost:5173
```
- **Stop:** press `Ctrl + C` in that terminal.
- Hot-reloads on save. This is what you use 99% of the time.

### Back end (only needed for the enquiry form)
```bash
cd server
npm run dev          # nodemon-style, node --watch → http://localhost:5000
# or: npm start      # plain node, no watch
```
- Requires MongoDB running (local `mongodb://127.0.0.1:27017/...` or Atlas URI in `.env`).
- The Vite dev server proxies `/api` → `http://localhost:5000` automatically.
- **Stop:** `Ctrl + C`.

### If a port is stuck (Windows / PowerShell)
```powershell
# find & kill whatever holds port 5173 (or 5000)
Get-NetTCPConnection -LocalPort 5173 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

---

## 5. Building & previewing production

```bash
cd client
npm run build                       # outputs to client/dist  (base = "/")
npm run preview                     # serves the build locally

# To reproduce the GitHub Pages build exactly (base = "/Assetz/"):
VITE_PAGES=true npm run build
VITE_PAGES=true npm run preview     # → http://localhost:4173/Assetz/
```

---

## 6. Deployment — how changes go live

**Deployment is automatic.** Any push (or merged PR) to `main` triggers
`.github/workflows/deploy.yml`, which runs `npm ci && VITE_PAGES=true npm run build`
in `client/` and publishes `client/dist` to GitHub Pages. Takes ~1–2 minutes.

```bash
# watch the deploy from the terminal
gh run list  --repo Akhilesh-Varanasi-18/Assetz --limit 3
gh run watch --repo Akhilesh-Varanasi-18/Assetz --exit-status
```
Or view it in the repo's **Actions** tab. After it succeeds, hard-refresh the
live URL (`Ctrl + F5`) to bypass cache.

### ⚠️ Critical: asset paths & the `/Assetz/` sub-path
The live site is served under a sub-path (`/Assetz/`), so **asset paths matter**:
- In **JS/JSX**, reference images **without a leading slash**: `src="images/foo.webp"`
  (document-relative). A leading slash (`/images/…`) will **404 on the live site**.
- In **CSS**, keep the leading slash: `url(/images/foo.webp)` — Vite rebases these
  with the base path automatically.
- `vite.config.js` sets `base: '/Assetz/'` only when `VITE_PAGES=true` (CI sets it);
  local `npm run dev` stays at `/`. Don't remove this logic.

---

## 7. The page, section by section

`client/src/App.jsx` renders these in order (each is a component in
`src/components/`, styled in `global.css`):

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Hero (first screen) | `Hero.jsx` | Editorial layout, logo in `Header.jsx`, stats bar, "Experience the View" → scrolls to video |
| 2 | Intro | `Intro.jsx` | |
| 3 | Proximity / Location | `Location.jsx` | **Redesigned** dark "connectivity atlas": animated stats, tabbed map, synced list. Tabs alternate **green/brown** per tab. Data: `data/locationLandmarks.js` |
| 4 | Video | `VideoSection.jsx` | `trivik-teaser.mp4`; hero play button triggers it |
| 5 | Gallery | `Gallery.jsx` | Bento grid (desktop) / slick carousel (mobile) |
| 6 | Experience | `Experience.jsx` | |
| 7 | Master Plan | `MasterPlan.jsx` + `PlanGraphic.jsx` | **Redesigned**: hand-drawn **SVG site plan** (roads/plots/park), Site Analysis / Land Use tabs auto-rotate |
| 8 | Clubhouse | `Clubhouse.jsx` | **Redesigned**: branded glamour renders + Ground/First floor-plan explorer |
| 9 | Amenities | `Amenities.jsx` | **Redesigned** "Layers of luxury": crossfade mosaic + Clubhouse/Outdoor tabs |
| 10 | Landscape | `Landscape.jsx` | **Redesigned** "A verdant welcome": avenue banner + rotating road diagrams + chat bubbles |
| 11 | Specifications | `Specifications.jsx` | **Redesigned**: glass image frame, auto-rotating tabs (no timer UI) |
| 12 | Contact | `Contact.jsx` | |
| — | Footer | `Footer.jsx` | **Redesigned** compact footer with ghosted Trivik watermark |
| — | Header / nav | `Header.jsx` | Fixed header; logo visible on hero, dark bar on scroll |
| — | Popups | `Popups.jsx` | Enquiry modal (posts to `/api`) |

**Design conventions to keep:**
- Brand colours are greens/browns/cream; Montserrat + Lora only.
- Location & similar tabbed sections alternate **green → brown** *per tab* (one colour per tab), never per-item.
- Section backgrounds and animations are all in `global.css` (search the section's class prefix, e.g. `.loc2-`, `.club2-`, `.mplan-`, `.amen-`, `.spec2-`, `.verdant-`, `.footer2-`).

---

## 8. Images & performance

All images live in `client/public/images/` as **webp** (2 videos too). They were
optimized (capped to 1800px long-edge, webp q80) — the folder is ~21 MB.

**When adding new images:** export as webp, keep them ≤1800px on the long edge,
and reference them **without a leading slash** in JS (`src="images/new.webp"`).
`sharp` was used offline for optimization; it is **not** a project dependency.

---

## 9. Git workflow — branch → PR → review → merge → live

We work on `main` via pull requests so changes are reviewed before going live.

```bash
# 0. start from the latest main
git checkout main
git pull

# 1. create a feature branch
git checkout -b feature/short-description

# 2. make changes, then stage & commit
git add -A
git commit -m "Clear message describing the change"

# 3. push the branch
git push -u origin feature/short-description

# 4. open a pull request (uses the GitHub CLI, `gh`)
gh pr create --base main --fill
#   ...or open it from the link GitHub prints after the push.
```

**Reviewing a teammate's PR:**
```bash
gh pr list                       # see open PRs
gh pr view <number>              # read description
gh pr diff <number>              # inspect the changes
gh pr review <number> --approve  # or: --request-changes --body "…"
```

**Merging (this triggers the auto-deploy):**
```bash
gh pr merge <number> --squash --delete-branch
#   ...or click "Squash and merge" in the GitHub UI.
```
Merging to `main` kicks off the Pages deploy automatically (§6).

**After a merge, sync your local main:**
```bash
git checkout main
git pull
```

> Small solo fix and no review needed? You *can* commit straight to `main`
> (`git checkout main && git commit && git push`) and it deploys — but prefer PRs
> when collaborating.

---

## 10. Adding a collaborator

Repo owner: **GitHub → repo → Settings → Collaborators → Add people** and invite
their GitHub username. Or via CLI:
```bash
gh api -X PUT /repos/Akhilesh-Varanasi-18/Assetz/collaborators/THEIR_USERNAME -f permission=push
```
They accept the emailed invite, then `git clone` and follow §3.

---

## 11. Quick reference

| I want to… | Command |
|---|---|
| Run the site locally | `cd client && npm run dev` → http://localhost:5173 |
| Stop a dev server | `Ctrl + C` (or kill the port, §4) |
| Run the backend | `cd server && npm run dev` (needs MongoDB + `.env`) |
| Build for production | `cd client && npm run build` |
| Preview the Pages build | `cd client && VITE_PAGES=true npm run preview` |
| Ship a change live | push/merge to `main` → auto-deploys in ~1–2 min |
| Watch the deploy | `gh run watch --repo Akhilesh-Varanasi-18/Assetz --exit-status` |
| New feature branch | `git checkout -b feature/x` |
| Open a PR | `gh pr create --base main --fill` |
| Merge a PR | `gh pr merge <n> --squash --delete-branch` |

**Current status:** Hero, Location, Master Plan, Clubhouse, Amenities, Landscape,
Specifications, Gallery, Video and Footer are redesigned and live. Backend enquiry
API exists but is not hosted. Next candidates: Contact/Intro polish, custom domain,
hosting the backend if the enquiry form is needed in production.
