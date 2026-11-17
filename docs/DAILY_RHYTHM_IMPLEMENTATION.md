# Daily Rhythm homepage — implementation contract

## Authority and baseline
- Owner requested implementation of `START_HERE_AGENT.md` from the supplied Daily Rhythm ZIP, with all existing functionality preserved and tests before handoff.
- Unchanged source package is preserved in `docs/handoffs/daily-rhythm/` (seven files). Written specification is authoritative; its HTML is illustrative, not an exact redesign mandate.
- Repository: `guysmileysells/path-to-rise-prototype`; app: `C:/Users/I9-10900KF/projects/path-to-rise/app`; baseline commit `8045621`; branch `feat/daily-rhythm-home`.
- Baseline `npm test` and `npm run lint`: PASS; existing Node type-transform and bundle-size warnings remain non-blocking.
- Local baseline app verified at HTTP 200; screenshots in `evidence/daily-rhythm/before-mobile.png` and `before-desktop.png`.
- Pre-existing untracked completion-review document and global-expansion evidence are unrelated and must remain untouched.

## Approved bounded implementation
1. Replace Today homepage hierarchy with `Today, in three parts.`, supportive subtitle, accurate current day/program state, compact action progress, and ordered Morning / Daily / Evening cards.
2. Derive all values from existing `dayRoadmap` tasks and `dayTaskProgress`: 6 morning + 6 day-specific daily + 5 evening actions. Preserve exact IDs, order, instructions, reflections, and completion/undo mutations. No parallel persisted counters or new backend.
3. Exactly one next incomplete phase, identified in canonical task order, has the dominant `Open next step` CTA. Display readable Complete / Up next / Upcoming status; completed tasks remain reviewable and future phases are not falsely completed. Zero/missing content gets an honest non-actionable fallback.
4. Open the real existing TaskDetail UI for the actual selected day/task. Reuse completion, next-task, writing save/delete/undo, keyboard focus and inline-expansion behavior. Home updates derive immediately from existing state after completion.
5. Keep current progression rules: first incomplete canonical day; completing 17 actions advances as today; historical days remain in My Path; program completion has useful review/Reset and no Day 29. Legacy whole-day completion must not fabricate individual task completion.
6. Navigation remains Today / Reset / My Path / Support, preserving existing `#today`, `#reset`, `#path`, `#support` behavior. My Path is the handoff's Journey destination, not a new fifth tab or rename. Keep settings/privacy/reminders/data controls and favourite/recent tools accessible.
7. Add clear settings access near Home header; preserve the existing settings disclosure and its controls. Support/Reset stay explicitly labeled and ungated.
8. Use existing typography with soft lavender Home accents and warm off-white surfaces, rounded cards, restrained motion. Scope changes so other screens are not inadvertently reskinned. Comfortable centered desktop width; phone layouts must work at 320/375/430px.
9. Preserve prototype-local storage/privacy warnings; private writing must not become homepage glanceable content or selector input.

## Acceptance and evidence plan
- RED→GREEN selector scenarios for fresh/partial/out-of-order completions, phase boundaries, all 28 days, invalid IDs, absent data, complete day/program, and no next phase when terminal. Add to aggregate `npm test`.
- Browser tests: correct real task, completion/undo, immediate card/total update, persistence/reflections, day advancement, completed-program maintenance, old-day review, navigation, settings/reminders/data access.
- Existing browser suites must remain passing without weakening their contracts.
- Responsive geometry: 320, 375, 430px and desktop; touch targets >=44px, no horizontal overflow or obscured navigation; keyboard visible focus, semantic labels/status and reduced motion; programmatic contrast check of new text/background pairs.
- Full `npm test`, `npm run lint`, Playwright browser suite, production-preview smoke, console/resource errors, source-content identity comparisons, and final diff review.
- Before/after screenshots; fresh independent read-only acceptance review after a committed builder checkpoint; host re-verification of any findings.
- Commit scoped changes, publish existing GitHub Pages preview only after gates, verify actual served assets and rendered homepage/action paths.

## Limits
Physical iPhone/Android testing, real screen-reader usability, external accessibility/SME/legal/security sign-off remain NOT VERIFIED. No claims of production readiness, secure production persistence, or reliable closed-app push are added.

## Progress
Implementation preserved from the previous session. Recovery mismatch reproduced: terminal status displayed completion while firstIncompleteDay selected Day 1 from missing records. Today now chooses Day 28 for terminal review; saved records and task counts are not rewritten. Targeted browser regression failed before and passed after (`evidence/daily-rhythm/recovery-red.txt`, `recovery-green.txt`). Aggregate tests, lint, build and preservation comparisons passed. Final expanded suite: 52 passed, zero skipped/flaky/unexpected. Independent review passed; suggested keyboard phase-transition checks were added and passed. Published app commit `d9f9133`; GitHub Pages run `44012408616` succeeded. Hosted viewport/navigation/keyboard/recovery tests passed and served JS/CSS match the tested build. See `docs/DAILY_RHYTHM_VERIFICATION.md`. Stopped for owner review.
