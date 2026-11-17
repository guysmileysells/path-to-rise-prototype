# Daily Rhythm acceptance and verification

## Baseline and provenance
- Baseline `8045621`; existing PATH to RISE React/Vite repository, not a replacement app.
- Original ZIP SHA-256 `54707eac44053c82a30b9c906900d82981871cd3ead99314e780a41ed16500de`; seven handoff files preserved unchanged in `docs/handoffs/daily-rhythm/`.
- Evidence paths below are relative to `evidence/daily-rhythm/`.

## Current status: superseded by owner rollback

The owner requested restoring the pre-Daily Rhythm homepage. The acceptance evidence below remains a historical record of that redesign; it does not describe the active restored interface. Current rollback source parity, regression and deployment evidence are recorded in `docs/PREVIEW_RELEASE.md`. Do not run the Daily Rhythm-specific reproduction commands against the restored application or count their expected design mismatch as a regression.

## Historical Daily Rhythm result
Published and hosted engineering acceptance PASS, verified 2026-11-17 UTC. App commit `d9f91339490c188eba10cec5af0b40311f001247`; [build/deploy run 44012408616](https://github.com/guysmileysells/path-to-rise-prototype/actions/runs/44012408616) succeeded. Preview: https://guysmileysells.github.io/path-to-rise-prototype/

Hosted JavaScript/CSS returned HTTP 200 and SHA-256 matched the tested local build. All four viewport/navigation/keyboard checks passed with zero captured console/resource errors. The missing-records recovery fixture opens actual Day 28 content without fabricated completions or storage mutation. Proof: `hosted-verification.json`, `hosted-smoke.txt`, `hosted-after-*.png`, `deployment.txt`. Physical-device and external approvals remain NOT VERIFIED.

## Acceptance matrix
| Requirement | Verified evidence | Result |
|---|---|---|
| Heading, Morning / Daily / Evening order, real next step | Browser tests and local-after screenshots | PASS |
| Honest counts, canonical next phase, out-of-order completions, all 28 days | `scripts/daily-rhythm-scenarios.mjs`, aggregate `final-tests.txt` | PASS |
| Existing TaskDetail, completion/undo, immediate summary update | `final-browser.txt`, `final-browser-results.json` | PASS |
| Writing save/reload/delete, draft preservation and privacy | Existing and new browser cases; source identity comparisons | PASS |
| Day advancement, historical review, Day 28/no Day 29 | Normal and legacy browser fixtures | PASS |
| Terminal status with missing per-day records | `recovery-red.txt` fails before fix; `recovery-green.txt` passes after; final suite includes regression on mobile and desktop | PASS |
| Existing four navigation routes and deep links | Browser suite and `local-verification.json` | PASS |
| Settings, privacy, reminders, data controls, Reset, tools and My Path | Existing regression cases and `preservation-results.json` | PASS |
| Curriculum, task IDs, storage schema and progression handlers unchanged | `preservation-results.json`: eight source comparisons and seven code-region comparisons | PASS |
| Widths 320/375/430/1280, no horizontal overflow, reachable navigation | `local-verification.json`, `local-after-*.png` | PASS |
| Touch targets, keyboard focus and accessible labels; reduced motion | Browser tests and production geometry; explicit cross-phase continuation focus tests | PASS for automated checks |
| New text contrast | `contrast-results.json`: 85 checks, no skips/failures | PASS for checked pairs |
| Console/page/resource errors | Production smoke: zero errors across four widths | PASS |
| Final regression, lint and build | `final-tests.txt`, `final-lint.txt`, `final-build.txt`; 52 browser tests passed, zero skipped/flaky/unexpected | PASS |
| Independent acceptance review | `review-final.json`: passed, empty security/logic lists. Suggested cross-phase keyboard tests subsequently added and passed | PASS |
| Committed preview and actual hosted assets/flows | Commit `d9f9133`, successful run `44012408616`, `hosted-verification.json` | PASS |

## Recovery fix and test precision
Completed-program heading used terminal status while task selection independently used the first missing completed-day record. The fix selects Day 28 for terminal homepage review without modifying storage, adding completions, or changing progression rules elsewhere.

One full run reported a 44px Settings button as 43.999992px during CSS translation. The measurement assertion now compares to hundredth-pixel precision; actual undersized targets still fail. No product layout was changed to address test measurement noise. The final 52-test run passes without retries.

## Reproduction
- `npm test`
- `npm run lint`
- `npm run build`
- `npx playwright test --project=mobile --project=desktop`
- `node evidence/daily-rhythm/verify-preservation.mjs`
- `node evidence/daily-rhythm/verify-contrast.mjs`
- `node evidence/daily-rhythm/verify-preview.mjs http://127.0.0.1:4177/` (serve freshly built dist there)
- Hosted counterpart: same command with the public URL; verifies asset SHA-256 equality, layouts, navigation, keyboard task opening and terminal recovery review without storage mutation.

## Boundaries and residual warnings
This is prototype engineering acceptance, not production-readiness certification. Physical iPhone/Android tests, manual screen-reader usability, comprehensive accessibility conformance and external SME/legal/privacy/security approval remain NOT VERIFIED. Browser-local storage and tab-open reminder limitations are unchanged. Existing Node type-transform and bundle-size warnings remain non-blocking; no dependency changes were made.

## Files
App implementation: `src/App.tsx`, `src/App.css`, `src/dailyRhythm.ts`. Automated coverage: `scripts/daily-rhythm-scenarios.mjs`, `package.json`, `tests/browser/daily-rhythm.spec.ts`, `tests/browser/daily-rhythm-state.spec.ts`. Scope: `docs/DAILY_RHYTHM_IMPLEMENTATION.md`; source handoff: `docs/handoffs/daily-rhythm/`; reproducible evidence: `evidence/daily-rhythm/`.
