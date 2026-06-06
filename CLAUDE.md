# Green personal website — project brief

This file orients Claude Code (and me) on what this project is, why it exists, and how it's structured. Read it at the start of each session.

## What this is

A personal portfolio website built around green / low-power web principles. It serves three purposes at once:

1. A portfolio to share on a resume/CV and with recruiters and advisors.
2. A hands-on web development learning project (web dev is relatively new to me — I'm comfortable with software and hardware generally, and have a research background in sensing).
3. A real, technical application of sustainability principles, which ties into my civil and environmental engineering background.

The site's distinguishing feature is honesty about its own resource use: rather than claiming to be "eco-friendly," it measures and displays real data about its energy and carbon footprint.

## Guiding principles

- **Measured over claimed.** Prefer real, defensible numbers (page weight in kB, watts drawn, gCO2/visit) over vague green badges. Document methodology transparently, including the limits of any estimate.
- **Lightweight by default.** Minimal JavaScript, system fonts (no web font downloads), compressed next-gen images (WebP/AVIF), dark mode default. Target homepage under 100kB total transfer.
- **Static first.** No server-side compute on each request where avoidable. Pre-built static files served from CDN edge or a low-power local server.
- **Portable.** The built site is plain static files in a `dist/` folder, so it runs identically on Cloudflare Pages or on self-hosted hardware. Avoid coupling to any host-specific feature.
- **Learning is a goal, not just shipping.** When making structural or tooling choices, explain the reasoning so I learn the "why," not just the "what."

## Tech stack

- **Site generator:** Astro (static output)
- **Styling:** plain CSS with custom properties / design tokens (Tailwind optional, only if it earns its place)
- **Hosting, phase 1:** Cloudflare Pages (free tier, renewable-matched energy, CDN edge)
- **Hosting, phase 2:** self-hosted on a Raspberry Pi 5 running Nginx, exposed via Cloudflare Tunnel (no open router ports)
- **Metering, phase 3:** Python data collector on the Pi (smart plug for watts + Electricity Maps API for grid carbon intensity + analytics for request volume), logging to SQLite, exposing a small JSON endpoint the site fetches
- **Source control:** Git + GitHub
- **CI (later):** GitHub Actions running Lighthouse on each deploy

## Folder structure

```
green-site/
├── site/                        # the Astro site (this is what deploys)
│   ├── src/
│   │   ├── pages/               # routes: index.astro, about.astro, etc.
│   │   ├── components/          # reusable pieces (Nav, Footer, CarbonBadge)
│   │   ├── layouts/             # page shells
│   │   └── styles/              # global CSS, design tokens
│   ├── public/                  # static assets (images, favicon)
│   ├── .env                     # local dev secrets — GITIGNORED
│   ├── .env.example             # template with empty keys — committed
│   ├── .gitignore
│   ├── astro.config.mjs
│   └── package.json
│
├── metering/                    # the Pi data collector (phase 3)
│   ├── collector.py             # polls smart plug + Electricity Maps
│   ├── api.py                   # exposes JSON endpoint
│   ├── data/                    # SQLite db lives here — GITIGNORED
│   ├── .env                     # Pi runtime secrets — GITIGNORED
│   ├── .env.example             # committed template
│   └── requirements.txt
│
├── docs/                        # planning notes, measurement methodology
│   └── measurement-methodology.md
│
├── CLAUDE.md                    # this file
└── README.md                    # public-facing project overview
```

Single repo for now, with `site/` and `metering/` as sibling folders. They're genuinely different things (different languages, machines, deploy targets) but live together for a coherent project story. The folder split means they can become two repos later with no restructuring.

## Secrets handling — important

- **Never commit secrets.** No API keys in code, ever. All secrets go in `.env` files that are listed in `.gitignore`.
- **Always commit a `.env.example`** — same variable names, blank/placeholder values. It documents what secrets exist without exposing them.
- **Build-time / site secrets** (anything Astro needs at build) go in the Cloudflare Pages dashboard under Settings → Environment Variables for production, mirrored locally in `site/.env`.
- **Runtime secrets** (Electricity Maps key, smart-plug credentials) live only in `metering/.env` on the Pi, readable by the service user, loaded when the systemd service starts. They never touch the laptop or the public site.
- **Keys stay server-side.** The Electricity Maps key is only ever called from the Pi. The Pi exposes the *computed result* (watts, gCO2) to the site — never the key itself. A key in frontend code is visible to anyone who views source.
- Add to `.gitignore` from the very first commit: `.env`, `node_modules/`, `dist/`, `data/`, `*.db`.

## Build phases (do in order)

**Phase 0 — prerequisites:** GitHub + Cloudflare accounts, Node.js via nvm, Git, VS Code. Domain name (deferred — buying later). Electricity Maps API key (free tier) when phase 3 approaches.

**Phase 1 — build & deploy the static site:** Astro scaffold, the four core pages (home, about, projects, contact), green design choices (system fonts, dark mode, WebP, page-weight budget), deploy to Cloudflare Pages, point domain, enable Cloudflare Web Analytics.

**Phase 2 — self-host on hardware:** Pi 5 (4GB) + SSD + official PSU + passive case. Flash Pi OS Lite, install Nginx, deploy the same `dist/` files, set up Cloudflare Tunnel as a systemd service, swap DNS.

**Phase 3 — measurement layer (the differentiator):** TP-Link Kasa smart plug for real wattage via local API (`python-kasa`, no cloud account). Python collector polling every ~60s, logging to SQLite, exposing JSON. A `/green` dashboard page showing live wattage, live grid carbon intensity, cumulative CO2 served, and a human-scale comparison. A methodology/colophon writeup.

**Phase 4 — polish & resume integration:** blog/notes section, a case study about the site itself, Lighthouse CI, resume lines with real metrics, links from LinkedIn and GitHub.

## Content to feature

- Bio / about, with CEE + sensing research background
- Projects: the multi-node Jetson Orin Nano sensing system, the geophone analog signal-conditioning chain, the AI/ML internship work, and this website itself as a documented case study
- Contact: email, GitHub, LinkedIn

## Working style notes for Claude Code

- Treat me as someone learning web dev — explain reasoning behind structural and tooling choices, don't just emit code.
- Keep things lightweight and avoid pulling in heavy dependencies without a clear reason (it conflicts with the project's whole premise).
- When in doubt about a green/sustainability claim, flag the uncertainty rather than overstating it. Transparency is the point.
