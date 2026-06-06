# green-site

A personal portfolio website that measures and publishes its own energy and carbon footprint.

Built with [Astro](https://astro.build) — static output, system fonts, dark-mode-first.
Hosted on Cloudflare Pages (Phase 1) and later self-hosted on a Raspberry Pi 5 (Phase 2).

## Structure

```
green-site/
├── site/        # Astro site — this is what deploys
├── metering/    # Python data collector (Phase 3)
├── docs/        # Planning notes and measurement methodology
└── CLAUDE.md    # Project brief for Claude Code sessions
```

## Local development

```bash
cd site
npm install
npm run dev      # starts dev server at localhost:4321
npm run build    # build to site/dist/
```

## Phases

- **Phase 0** — prerequisites (done)
- **Phase 1** — static site on Cloudflare Pages ← *current*
- **Phase 2** — self-host on Raspberry Pi 5 + Nginx + Cloudflare Tunnel
- **Phase 3** — real wattage + grid carbon intensity + live dashboard
- **Phase 4** — polish, blog, Lighthouse CI, resume integration
