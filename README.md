# Assetz — City of Palms (MERN replica)

A pixel-faithful rebuild of the **Assetz City of Palms** landing page
(`https://www.assetzproperty.com/cityofpalms/`) in the MERN stack, with every
section, animation, and interaction reproduced.

- **Fonts:** Montserrat (headings/UI) + Lora (prose) — matched to *The Roots* brochure
  type system. Swap in exact brand `.otf` files via `client/src/styles/global.css` if available.
- **Original stack** was static HTML + jQuery + Slick + Fancybox + a Laravel form.
  This rebuild uses **React (Vite)** on the front and **Express + MongoDB** on the back.

## Structure
```
client/   React + Vite front end (all sections, sliders, popups, animations)
server/   Express API — contact enquiries (MongoDB) + email + brochure download
_original_reference/   The original index.html / style.css / logic.js for reference
```

## Run it

### 1. Backend
```bash
cd server
npm install
cp .env.example .env      # set MONGODB_URI (defaults to local mongo) + optional SMTP
npm run dev               # http://localhost:5000
```

### 2. Frontend
```bash
cd client
npm install
npm run dev               # http://localhost:5173  (proxies /api -> :5000)
```

Open http://localhost:5173.

## Features reproduced
- Hero with mouse parallax + freeze/release on scroll, "Enquire now" popup
- `fade-up` scroll reveals, shrinking header, scroll-progress ring + back-to-top
- Location: 6 tabs, interactive map markers ↔ side list, video popup
- Gallery: Slick carousel + Fancybox lightbox (desktop bento + mobile)
- Experience counters, Master Plan (30 hotspots + legend hover), Clubhouse synced sliders
- Amenities/Sports & Specifications tabbed content (with image crossfade)
- Contact + Enquire forms → stored in MongoDB, emailed, then brochure auto-downloads
- Fully responsive (1024 / 768 / 600 breakpoints, matching the original)
