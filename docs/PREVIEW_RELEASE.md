# PATH to RISE preview release checkpoint

> **Verified live release — 2026-11-17:** Approved A is published to the GitHub **functioning version**. Application commit `40d5b3a7fec1ad4684baaa7d01815583c3e432ee`; [Pages run 44126469949](https://github.com/guysmileysells/path-to-rise-prototype/actions/runs/44126469949) succeeded. Hosted assets and real flows passed at five widths (20 layout states), including saved-active-reminder overview/focus. ChatGPT-hosted main/design reference is unchanged. Earlier main-host restrictions below are historical, not this release's status. See `docs/TODAY_A_IMPLEMENTATION.md` and `evidence/today-option-a-apply/hosted-verification.json`.

## Functioning version — owner-named functional baseline

- **Functioning version:** https://guysmileysells.github.io/path-to-rise-prototype/#today
- Owner explicitly requested this name and a status record. Approved A is now live and hosted-verified: `Leave the shift. Keep yourself.`, Reset-first hierarchy, real program continuation and Your space settings. The pre-A `Start where you are.` snapshot is preserved in `docs/FUNCTIONING_VERSION.md`.
- Detailed status, earlier verification and limits: `docs/FUNCTIONING_VERSION.md`. This label does not change the main design/prototype designation below or authorize code/deployment changes.

## Main prototype — owner-designated

- **Primary prototype:** https://path-to-rise-review.gimidaloot.chatgpt.site/
- Owner explicitly selected this URL as the main PATH to RISE prototype. It supersedes GitHub Pages as the default prototype/review link and version reference for future discussions.
- Direct browser check: page title `PATH to RISE — Interactive Concept`; rendered heading `Leave the shift. Keep yourself.`, `Reset me now`, `Your path`, `My Quick Kit`, and navigation Today / Reset / My Path / Support.
- This is a choice of prototype/version, not a deployment, source-code migration or authorization to rebuild it. Source ownership, editable project access, repository linkage, persistence, and full functionality of this external host have NOT been verified. Earlier GitHub Pages test results do not certify this separate prototype.
- GitHub Pages is the owner-named **functioning version** and functional baseline, not the main design prototype. Keep the two references distinct and do not reintroduce Daily Rhythm without explicit direction.
- **Current selected direction: A — Reset first.** Keep the main prototype’s visual style and Reset-led Today hierarchy; add the full GitHub Today functionality, with day/progress/Continue underneath and privacy/data/reminders accessible through Your space. B is not selected. Coverage and decision: `docs/TODAY_FUNCTIONALITY_PARITY_MOCKS.md`; implementation handoff: `docs/TODAY_OPTION_A_HANDOFF.md`. Owner subsequently authorized applying A plus the shared settings screens (`ok apply`). Main-host edit/publish access is still unverified and that page remains unchanged; the separately authorized GitHub functioning-version A release is now published. No data migration or backend expansion was introduced.

## Historical owner decision — restore the previous GitHub Pages homepage

- Owner requested returning to the version before Daily Rhythm.
- Restored application source, scripts, test configuration and package manifest exactly to baseline `8045621` (including the earlier **practice** spelling correction and inline-expansion improvements).
- Removed Daily Rhythm-only selector/tests from the active application. Historical handoff, implementation and verification artifacts remain preserved; their acceptance results describe the superseded design, not the current homepage.
- No browser-storage schema/migration, clearing operation or user-data reset is included. Existing progress and saved writing remain on each browser/device.
- Local verification: `npm test` (including production build) PASS; `npm run lint` PASS with zero warnings/errors; all 26 original mobile/desktop Playwright tests PASS. Exact source parity proof and test log: `evidence/homepage-rollback/`.
- Hosted rollback verification: **PASS**. Restored app commit `1a162eb4989424f45f7b9ad5846ba30b2b1ff9ab`; [GitHub build/deploy run 44014685005](https://github.com/guysmileysells/path-to-rise-prototype/actions/runs/44014685005) succeeded.
- Live preview: https://guysmileysells.github.io/path-to-rise-prototype/ — verified old `Start where you are.` heading and journey card on mobile/desktop; Daily Rhythm heading absent. Served JS/CSS SHA-256 match the tested restored build.
- Hosted checks revisited all 28 days and 84 corrected-writing panels per viewport; storage was unchanged during those checks and zero console/page errors were captured. Raw proof: `evidence/homepage-rollback/hosted-results.json`, `deployment.txt`; repeat with `node evidence/homepage-rollback/verify-hosted.mjs`.
- Daily Rhythm remains in Git history and historical docs/evidence only. Physical-device and real screen-reader testing were not repeated for this rollback.

## Superseded Daily Rhythm homepage — verified 2026-11-17 UTC

- Live preview: https://guysmileysells.github.io/path-to-rise-prototype/
- App commit `d9f91339490c188eba10cec5af0b40311f001247`; [build and deploy run 44012408616](https://github.com/guysmileysells/path-to-rise-prototype/actions/runs/44012408616) passed.
- Today now presents Morning / Daily / Evening with real saved-task counts and one next-step action. Existing task instructions, writing, completion/undo, navigation, settings and storage are preserved.
- Fixed terminal recovery: older program-complete records missing completed-day entries review Day 28, not Day 1. No fabricated task completions or storage migration.
- Local aggregate tests, lint/build, all 52 mobile/desktop browser cases and independent review passed.
- Hosted JS/CSS HTTP 200 and SHA-256 exactly match the tested build. Four widths (320/375/430/1280), navigation/reload, keyboard task opening and recovery-state review passed; zero captured console/resource errors.
- Automated contrast checks: 85 checked pairs, no failures. Physical phones, actual screen-reader usability and external approvals remain NOT VERIFIED.
- Full acceptance: `docs/DAILY_RHYTHM_VERIFICATION.md`; reproducible raw evidence and before/after screenshots: `evidence/daily-rhythm/`.
- Stop for owner review; no production-readiness claim.


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

## Historical GitHub Pages review URL (secondary)

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
