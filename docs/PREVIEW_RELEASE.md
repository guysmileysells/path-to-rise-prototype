# PATH to RISE preview release checkpoint

## App-wide spelling correction — 2026-11-13

- Owner direction: use **practice**, not the alternative spelling, throughout app-authored content and labels.
- Scope: wording only. Preserve task IDs, curriculum meaning, progress, completion, saved reflections, and navigation.
- Located three source occurrences in `src/dayRoadmap.ts`, in reusable morning/evening explanations shared across all 28 days.
- Regression gate: `npm run contract` scans source and public text assets for the rejected spelling. Confirmed RED before the content correction.
- Local verification: `npm test` passed (including typecheck/production build), `npm run lint` passed with zero errors/warnings, and all 26 mobile/desktop browser tests passed, including all 28 days and writing save/reload/delete.
- Exact source comparison confirmed only three spelling substitutions; no behavior or data-model changes. Source/public scan found zero remaining rejected spellings.
- Hosted verification: **PASS** for app commit `90689bf0e86e9205bf355472fec90a2c7c5d91ce`. [GitHub build/deploy run 43340712701](https://github.com/guysmileysells/path-to-rise-prototype/actions/runs/43340712701) succeeded.
- Public JavaScript and CSS returned HTTP 200 and SHA-256 matched the verified local production build. No rejected spelling remained in served JavaScript; all three corrected phrases were present.
- Live browser checks opened all three corrected panels across all 28 days on mobile and desktop viewports: 84 panels per viewport, unchanged local storage, zero console/page errors. Physical-device testing remains unverified.
- Reproducible hosted check: `node evidence/practice-spelling/verify-hosted.mjs` (requires local build and installed Playwright Chromium). Raw proof: `evidence/practice-spelling/hosted-results.json` and `evidence/practice-spelling/local-browser-results.json`.
- Existing non-blocking warnings: Node experimental type transforms, the Vite bundle-size advisory, and GitHub Actions runtime migration notices.

## Previous release checkpoint

Date: 2026-10-13 09:58 PDT

## Current non-disconnecting review URL

```txt
https://guysmileysells.github.io/path-to-rise-prototype/
```

This is a durable GitHub Pages hosted preview for owner functionality testing. It does **not** depend on the Windows local preview server or Cloudflare tunnel staying online.

## Source repository

```txt
https://github.com/guysmileysells/path-to-rise-prototype
```

Initial deployed commit (historical; current spelling release is identified above):

```txt
5110e81 ci: support in-repo source audit files
```

## Deployment path

- GitHub CLI device authorization completed for `guysmileysells`.
- Repository created and pushed: `guysmileysells/path-to-rise-prototype`.
- GitHub Pages was enabled with workflow deployment mode.
- `.github/workflows/pages.yml` runs install, tests, lint, build, and deploys `dist` to Pages.
- Vite was configured with relative asset paths so the static app works under the GitHub Pages subpath.

## Verification completed

Local verification before deploy:

- `npm test` passed.
- `npm run lint` passed with 0 warnings / 0 errors.
- `npm run build` passed.
- `npm run day-roadmap` passed with `{"scenario":"morning-evening-final-activation","result":"PASS","days":28,"dailyWins":17,"programWins":476}`.

GitHub Actions verification:

- Run `38434603130` completed successfully.
- Build job passed: checkout, Node setup, dependency install, `npm test`, `npm run lint`, `npm run build`, Pages artifact upload.
- Deploy job passed: GitHub Pages deployment completed.

Served URL verification:

- `https://guysmileysells.github.io/path-to-rise-prototype/` returned HTTP 200.
- Served title: `PATH to RISE Prototype`.
- Browser opened the hosted URL and rendered the PATH to RISE app.
- Browser smoke confirmed Morning Activation, Daily Wellness Activities, Evening Activation, Feeling Stuck, and `/476` journey total on the hosted build.
- Browser console errors: 0 during hosted smoke check.

## Vercel status

The owner selected the GitHub + Vercel direction. The GitHub side is complete and provides a durable non-disconnecting test link through GitHub Pages now. Vercel remains logged out on this machine, so a Vercel-hosted URL still requires Vercel account authorization or a Vercel token/project connection later.

## Superseded temporary links

Do not use these as the primary owner test link anymore:

```txt
https://davis-metallica-attacked-indicating.trycloudflare.com/
https://temporary-agile-aspen-q6zt546.vercel.app/
```

The Cloudflare URL depends on a local tunnel. The anonymous Vercel URL was temporary and may expire.

## Important boundaries

This preview is still a prototype checkpoint, not a production release. It has no real authentication, backend database, secure production persistence, CMS, approved clinical content, subscriptions, app-store wrapper, or legal/privacy/security sign-off.

Progress and private reflection text remain local to each tester's browser/device in this prototype.
