# Measurement methodology

> This document will grow as the project builds toward Phase 3.
> For now it captures the intent and early estimates.

## What we want to measure

1. **Page weight** — total transfer size of each page (HTML + CSS + JS + images).
   Target: homepage under 100 kB.
2. **Server wattage** — real-time power draw of the Pi 5 host, measured by a
   TP-Link Kasa smart plug via the local `python-kasa` API (no cloud intermediary).
3. **Grid carbon intensity** — gCO₂eq per kWh at the Pi's grid location, polled
   from the [Electricity Maps API](https://www.electricitymaps.com/) every ~60 s.
4. **CO₂ per visit** — (watt-hours per request) × (carbon intensity) = gCO₂ per visit.

## Phase 1 estimates (Cloudflare Pages, no Pi yet)

- Cloudflare runs on renewable-matched energy; exact per-request energy is not
  publicly disclosed.  We use the Sustainable Web Design model as a rough proxy
  until real measurements are possible.
- Page weight is measured in browser DevTools → Network → disable cache → reload.

## Known limitations

- Smart-plug power readings include the Pi's full draw (OS, Nginx, idle tasks),
  not just the web-serving fraction.  We will divide by average concurrent
  requests to approximate per-request cost — this is an over-estimate.
- Grid carbon intensity is a regional average, not the marginal intensity of the
  specific generator running at that moment.  We note this in the UI.
- Cloudflare CDN edge energy is not included in Phase 2 measurements.

## Tools

| Tool | Purpose |
|------|---------|
| Browser DevTools | Page weight, waterfall, cache headers |
| [WebPageTest](https://www.webpagetest.org) | Third-party page weight & performance audit |
| `python-kasa` | Local smart-plug polling |
| Electricity Maps API | Grid carbon intensity |
| SQLite | Time-series log on the Pi |
