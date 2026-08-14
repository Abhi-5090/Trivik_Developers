# Project guide for Claude

This is the **Trivik Courtyard** marketing landing site (React + Vite front end,
Express + MongoDB back end). **Read `README.md` first** — it has full setup, run,
deploy, and git-workflow details. This file is the quick, must-not-break summary.

## What it is
- Single-page React (Vite) marketing site. All UI is in `client/`.
- Live at https://abhi-5090.github.io/Trivik_Developers/ via GitHub Pages,
  auto-deployed by `.github/workflows/deploy.yml` on every push to `main`.
- The Express backend (`server/`, enquiry form) is **not** hosted; it's local-only.

## Where things are
- Sections: one component each in `client/src/components/` (order in `App.jsx`).
- **All CSS is in `client/src/styles/global.css`** (one big file; search by class
  prefix: `.loc2-`, `.club2-`, `.mplan-`, `.amen-`, `.spec2-`, `.verdant-`, `.footer2-`).
- Content/data arrays: `client/src/data/`.

## Rules that will break the live site if ignored
1. **Asset paths.** In JS/JSX reference images **without a leading slash**:
   `src="images/x.webp"` (the site is served under `/Trivik_Developers/`, so `/images/…` 404s
   in production). In CSS keep the leading slash (`url(/images/x.webp)`) — Vite
   rebases it. Don't touch the `base` logic in `client/vite.config.js`.
2. **New images** → webp, ≤1800px long edge, put in `client/public/images/`.
3. **Design conventions:** greens/browns/cream palette; Montserrat + Lora fonts;
   tabbed sections alternate **green/brown one colour per tab** (never per item).

## Workflow
- Run locally: `cd client && npm install && npm run dev` → http://localhost:5173
- Ship: commit → push/merge to `main` → auto-deploys in ~1–2 min.
- Prefer a branch + PR when collaborating (`gh pr create --base main --fill`,
  merge with `gh pr merge <n> --squash --delete-branch`). See README §9.
- Verify UI changes locally before pushing (the site is public).
