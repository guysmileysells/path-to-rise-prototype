# App-wide expansion verification — 2026-11-10

## Status
Implementation and local acceptance complete. Hosted publication/verification pending; do not treat the old Pages build as evidence of this change yet. Owner review is the exit gate, not production approval.

Approved behavior: [GLOBAL_EXPANSION_CONTRACT.md](GLOBAL_EXPANSION_CONTRACT.md). Baseline commit: `ba81cd5e6110a0a3ec0f1b26630df729c9d2cf69`.

## What changed
- `src/InlineExpansion.tsx`: shared trigger positioning, reduced-motion behavior, native nested disclosure handling, accessible custom expand/collapse controls.
- `src/App.tsx`: task details now appear within their triggering cards/shortcut, not as replacement screens; Feeling Stuck responds below each selected option; all native disclosure families use the shared behavior. Last-task shortcut collapse restores keyboard focus to its surviving task card.
- `src/App.css`: spacing and one-column choice/panel layout. Existing curriculum, program/storage models and navigation are preserved.
- `tests/browser/`, `playwright.config.ts`, `scripts/expansion-cross-browser.mjs`: repeatable browser checks. Pages workflow now gates publishing on mobile/desktop browser tests.

## Evidence
Paths below are under `evidence/`.

| Check | Actual result | Evidence |
|---|---|---|
| Existing regression/source audits | `npm test` passed, including production build | `global-expansion/regression.txt` |
| Lint/typecheck/build | Lint clean; TypeScript and Vite build passed | `global-expansion/lint.txt`, `build.txt` |
| Mobile/desktop browser regression | **26 passed**, none skipped or failed | `global-expansion/green-final.txt`, `latest-results.json` |
| All 28 days | Each day's 17 action cards and original reflection opened inline; introduction disclosure checked where present; expansion-only actions leave persisted data unchanged | `tests/browser/coverage.spec.ts`, results above |
| Program/writing continuity | Completion, next-task navigation, undo, single/multiple-field drafts, save/reload/delete, final Day 28 completion/undo, final-task collapse via both controls | `tests/browser/coverage.spec.ts`, `edge-cases.spec.ts` |
| Built app, separate browser engines | Chromium/Pixel 7 emulation, WebKit/iPhone 13 emulation and Firefox desktop passed; no captured page errors | `global-expansion/cross-browser/results.json` and screenshots |
| Curriculum/model preservation | All tracked non-UI source files match baseline after line-ending normalization | `global-expansion/content-integrity.json` |
| RED before GREEN | Task replacement, native placement and Feeling Stuck failures reproduced before fixes | `global-expansion/red-task.txt`, `red-native.txt`, `red-stuck.txt` |
| Independent review | First review found final-shortcut focus loss; separate fix with failing then passing regression; independent re-review PASS with no security or logic errors | `global-expansion/review-initial.json`, `review-final.json`; `final-win-focus/red-results.json`, `green-results.json` |
| Runtime dependency audit | Zero reported vulnerabilities in production dependencies | `global-expansion/runtime-dependency-audit.json` |

## Coverage boundaries
- Verified native families: Today privacy/reminders/local-data (including initially enabled reminders), RESET more needs, Toolbox saved/recent and browse, tool full instructions, My Path map/practices/privacy and individual saved-reflection disclosures, day introduction where present.
- Legacy `ProgramSectionCard` full-source disclosure shares the same helper but is not reachable for current 28-day roadmaps; source-reviewed, not claimed as a separately exercised live screen.
- `Open next: …`, the My Path day picker, primary tabs and RESET/tool navigation remain navigation, not recursively nested accordions.
- Existing My Path saved-reflection index recognizes legacy source-section keys; newer roadmap writing remains available in its task editor. That pre-existing indexing limitation is unchanged, not fixed by this interaction task.

## Remaining limits / warnings
- No physical iPhone/Android test, screen-reader audit, clinical/content certification or production privacy approval. Mobile browser emulation is not physical-device evidence.
- Existing build warning: JavaScript bundle over 500 kB. Existing development-tool audit reports two high findings (`vite`, `source-map-js`); dependency versions were not changed by this feature. Do not expose the development server publicly. The hosted preview serves static build files only.
- Public GitHub repository and Pages URL are not access-controlled. Tests use synthetic data in isolated browser contexts; no owner storage was cleared or uploaded.

## Reproduce
```sh
npm ci
npx playwright install chromium webkit firefox
npm test
npm run lint
npx playwright test
npm run build
npm run preview -- --host 127.0.0.1 --port 4176 --strictPort
# In another terminal:
node scripts/expansion-cross-browser.mjs
# For the hosted preview after publishing:
PREVIEW_URL=https://guysmileysells.github.io/path-to-rise-prototype/ EVIDENCE_DIR=evidence/global-expansion/hosted node scripts/expansion-cross-browser.mjs
```

## Owner check after publication
Open a Morning, Daily and Evening task, switch to another, then collapse. Check Feeling Stuck and nested settings. The triggering control and beginning of the selected content should remain easy to find. Stop for owner feedback; do not broaden this into a production release.
