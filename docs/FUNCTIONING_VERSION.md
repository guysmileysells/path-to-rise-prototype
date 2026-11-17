# PATH to RISE — functioning version

## Owner label
- **Name:** functioning version.
- **URL:** https://guysmileysells.github.io/path-to-rise-prototype/#today
- Owner requested this label and a note of its current status in Discord message `1572266886320885934`.
- This is the working functional baseline/reference. The label does not switch the main design/prototype URL, authorize a redesign or deploy anything.

## Current execution status
**Approved A is live and hosted-verified, 2026-11-17.** Owner authorized this target in `1572271883523596462` and continued in `1572283371986362511`.
- Current application commit: `40d5b3a7fec1ad4684baaa7d01815583c3e432ee`; [Pages build/deploy run 44126469949](https://github.com/guysmileysells/path-to-rise-prototype/actions/runs/44126469949): success.
- Today now shows **Leave the shift. Keep yourself.**, Reset first, and real program/current-action/progress/Start-or-Continue underneath. Your space contains privacy/data/reminders; the four navigation tabs remain unchanged.
- Final local checks: aggregate/typecheck/build/lint PASS; 44 full browser tests, 18 production-preview focused tests PASS. Independent follow-up found no blocking issues.
- Live verification: 20 layouts across five widths, real Reset/Day 1 (17 tasks)/Quick Kit/settings flows, saved-active-reminder overview/focus and preserved enabled preferences PASS; no captured page/resource errors. Served JavaScript/CSS match the tested build byte-for-byte; all six SVG icons match after CRLF/LF-only normalization and decode successfully.
- Source storage keys/schemas, curriculum and existing state handlers preserved; no migration or data clearing. Synthetic QA contexts only, not inspection of the owner's device data.
- Evidence: `evidence/today-option-a-apply/hosted-verification.json`, `deployment.json`, `candidate-manifest.json`, `preservation.json`; implementation/review details in `docs/TODAY_A_IMPLEMENTATION.md`.
- Main/design reference stays unchanged. Original pre-A snapshot below is retained for history/rollback. Physical-device, manual screen-reader, clinical/legal/security sign-off and reliable closed-app notification delivery are not established by this release.

## Pre-A snapshot — checked 2026-11-17 UTC
- Live page opened successfully with title `PATH to RISE Prototype`.
- Today heading: **Start where you are.** This is the restored pre-Daily Rhythm homepage, not the approved A mock or the superseded Daily Rhythm redesign.
- The observed initial browser view showed **Resetting the Baseline**, **Next up: 1. Set your alarm**, **Start Day 1**, **Reset now**, My Path, and a **Walk + Stretch Reset** shortcut from Week 1.
- The initial browser view showed 0 of 17 Small Wins complete. This is the observed agent-browser state, not a statement about the owner's saved progress.
- Main navigation remains **Today / Reset / My Path / Support**.
- The page explicitly states that progress and saved reflections stay local to the browser for now.

## Existing implemented baseline / earlier verification
- Source-backed 28-day program with 17 required actions per day: 6 morning, 6 day-specific and 5 evening; task instructions, completion/undo and private saved writing.
- RESET/Toolbox, favourites/recent tools, transparent shortcuts, privacy/local-data controls and optional prototype reminders are part of the functional reference described in the Today parity coverage document.
- Last recorded deployed app release: `1a162eb4989424f45f7b9ad5846ba30b2b1ff9ab`; Pages run `44014685005`. The local repository HEAD at this check was the later documentation-only commit `424d3be1f90615a05ad58d5f774c9315ec9f189a`; do not conflate it with a new app release.
- Earlier rollback evidence records aggregate tests/build/lint and 26 browser tests passing, plus hosted asset parity checks. Those are historical results, not a newly executed full regression run today.

## Separate main design and pending work
- Main design/prototype remains https://path-to-rise-review.gimidaloot.chatgpt.site/.
- Originally, applying A to the ChatGPT-hosted main prototype was blocked on its editing/publishing route. The later explicit GitHub Pages target authorization supersedes that blocker for the functioning-version update; it does not authorize changing the ChatGPT-hosted page.
- No code change, deployment, storage clearing, data migration or user progress change was performed for this status note.

## Evidence boundaries
- Fresh check: live Today load, visible heading/actions/navigation and local-storage notice.
- Not re-run for this note: all-day/task journeys, notification delivery, full browser suite, real phone/accessibility testing, or clinical/privacy/security review.
- “Functioning version” is the owner's reference label, not a production-readiness or clinical-safety certification.
