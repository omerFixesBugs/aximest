```
commit:    a93ab6c      verified: 2026-10-27      method: grep scan + browser
level:     unknown (ask the dev; public marketing site, no user data seen)
type:      frontend (marketing site)
flags:     public ui
stack:     Next.js 16.3 App Router, React 19, Tailwind 4, three.js, lenis, swiper
src dirs:  app/
project rules that override level: read node_modules/next/dist/docs before Next.js code (AGENTS.md)
docs:      brief=missing arch=missing essentials=missing agents-claude=ok rules=none yet
```

## Routing
| Path glob | Modules | Topic file |
|---|---|---|
| app/**/*.tsx, app/**/*.css | ux perf qa | |
| app/layout.tsx, app/opengraph-image.tsx, metadata | seo ux | |
| package.json, next.config.ts | sec ops qa | |

## Decisions (do not re-ask)
- 2026-10-27: low-end phone perf: on touch devices the 3D logo renders at ≤1.5x DPR without MSAA, and Lenis is skipped. Tornado card filter still runs per frame on phones; lightening it changes visuals, ask first.
- Dev server on :3000 is usually another project (PenWeb CMS); run this one on another port.
