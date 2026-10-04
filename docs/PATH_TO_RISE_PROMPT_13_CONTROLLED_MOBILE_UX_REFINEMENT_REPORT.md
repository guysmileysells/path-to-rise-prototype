# PATH TO RISE — PROMPT #13 CONTROLLED MOBILE UX REFINEMENT REPORT

Generated: 2026-10-03 23:50 PDT
Status: IMPLEMENTED + AUTOMATED REGRESSION PASSED / OWNER PHYSICAL-IPHONE RETEST REQUIRED

## Scope honored

This was one controlled mobile UX refinement pass only.

Not authorized and not performed:

- No redesign.
- No new features.
- No PATH to RISE program rewrite.
- No removal of source-backed content.
- No Support hiding.
- No bottom-nav label/count change.
- No Prompt #14 work.

## Screens changed

1. Today/Home
2. RESET
3. Toolbox
4. My Path
5. Day experience inside My Path

Support was intentionally not structurally changed.

## Exact UX changes

### Today/Home

- Kept the primary journey card and Reset action visible.
- Grouped secondary/admin material into `Privacy, reminders + local data` disclosure.
- Preserved personalization transparency, notification settings, and local-data controls underneath that disclosure.

### RESET

- Kept all 9 RESET need routes.
- Shows 5 primary need choices immediately.
- Moves 4 additional needs behind `More RESET needs` disclosure.
- Keeps Toolbox and Support visible from RESET.

### Toolbox

- Keeps current-week/source-relevant tools first.
- Moves saved/recent shortcuts into `Saved + recent practices` disclosure.
- Moves the full 10-tool browse catalogue into `Browse all Toolbox practices` disclosure.
- Keeps all canonical tool cards reachable and source-backed.

### My Path

- Keeps the progress summary visible.
- Adds one obvious primary action: open/review the selected Day.
- Keeps full day content out of the default overview until the user deliberately opens it.
- Groups path map/insights, practices/reflections, and progress privacy into disclosures.
- Bottom-nav My Path now returns to the calm overview; explicit Start/Open Day flows still open Day detail.

### Day experience

- Preserved all source-backed Day sections.
- Added a compact `Now / Progress / Next` orientation strip.
- Preserved section toggles, source disclosure, reflection field, save/delete controls, and complete-day control.

## What was intentionally NOT changed

- 28 Days unchanged.
- 311 source-backed sections unchanged.
- 10 canonical Toolbox tools unchanged.
- 9 RESET need mappings unchanged.
- Day 28/no Day 29 logic unchanged.
- Support bottom-nav access unchanged.
- Crisis/support copy unchanged.
- Reflection localStorage limitation copy unchanged.
- Notification architecture unchanged.
- No streaks, scores, rankings, pressure, or engagement manipulation added.

## Content/source fidelity confirmation

Automated final audit passed with:

- `dayCount: 28`
- `sectionCount: 311`
- `canonicalToolCount: 10`
- `resetNeedCount: 9`
- Day 28 terminal/no actionable Day 29: PASS
- Reflection privacy gate: PASS
- Approved four primary destinations: PASS

## Accessibility impact

Preserved/improved:

- No smaller text used as the density solution.
- Existing touch-target sizes preserved.
- Disclosures use native semantic `<details>/<summary>` controls.
- Focus-visible styling remains in place.
- Reduced-motion CSS remains in place.
- Bottom navigation remains four persistent labeled destinations.
- Support remains reachable from persistent nav.

Not verified here:

- Physical iPhone Large Text behavior.
- VoiceOver/screen-reader testing.
- Manual accessibility review.

## Regression results

Fresh post-fix command set passed:

```bash
npm test
npm run lint
npm run build
npm run final-audit
```

Key automated evidence:

- Contract check: PASS
- Personalization scenarios: PASS
- Progress scenarios: PASS
- Hardening scenarios: PASS
- Notification scenarios: PASS
- Production QA scenarios: PASS
- Final launch audit: PASS
- Lint: PASS
- Build/typecheck: PASS

Build warning retained:

- Vite reports one chunk over 500 kB. This is an existing bundle-size warning, not a failing gate.

## Browser/mobile preview QA

Verified in local production preview after rebuild:

- No browser console messages/errors.
- No horizontal overflow detected on checked screens.
- Today collapsed: 4 visible buttons, 2 visible cards, 1 disclosure.
- RESET collapsed: 8 visible buttons, 7 visible cards, 1 disclosure.
- Toolbox collapsed: 3 visible buttons, 3 visible cards, 2 disclosures.
- My Path overview: 3 visible buttons, 5 visible cards, 3 disclosures.
- Day detail remains long by design because full source-backed content is preserved.
- Bottom-nav My Path returns to overview after opening Day detail.
- Support remains reachable and visible.

## Remaining known issues / limitations

- P13-F0002 is not closed. It is mitigated and awaiting owner physical-iPhone retest.
- Physical iPhone Safari updated-experience feel is NOT VERIFIED.
- Physical iPhone Large Text, VoiceOver, and long-text resilience remain NOT VERIFIED.
- This remains a temporary private preview, not production deployment.

## Owner retest gate

Do not continue Prompt #13 validation or start Prompt #14 until owner reports physical-device result.

Target owner success feeling:

> I can tell immediately where I am and what I should do next.

Not sufficient:

- There is less content.
- Everything has simply been hidden behind extra taps.

## Addendum — Open Day 1 iPhone tap report

Owner reported that pressing Open Day 1 on iPhone appeared to do nothing while other buttons worked. Investigation found the app state did open the Day detail, but the detail appeared below folded overview sections/without clear visible feedback on iPhone.

Mitigation implemented after the controlled refinement checkpoint:

- Day detail now renders immediately below the primary program/progress card.
- Opening a Day scrolls that detail into view.
- The folded overview sections remain available below the Day detail.
- Source-backed Day content, Support, bottom nav, privacy boundaries and program rules were not changed.

Verification run after this addendum: `npm test`, `npm run lint`, `npm run build`, `npm run final-audit`, and affected-path browser smoke through the active HTTPS tunnel. Physical iPhone retest remains required before closing P13-F0003.

## Addendum — Task separation and per-task reminders request

Owner real-device screenshots show that source-backed Day/tool task instructions can still feel lumped together even after the Day detail visibility fix. The owner requested a clearer task model: each task should appear as its own separate tap-to-open unit with its own instructions, and each task should be able to offer a reminder to complete it.

Feasibility classification:

- Separate task cards/details: feasible in the current web prototype as a source-preserving UI/model change.
- Per-task reminder preferences and in-app/browser-tab reminders: feasible as prototype-limited logic if clearly labelled.
- Reliable iPhone lock-screen/background notifications: not honestly claimable in the current browser-only preview without PWA/service-worker push or a native wrapper/push scheduler and real-device verification.

This request is recorded as P13-F0004/P13-R0002 and should be treated as a next scoped UX/reminder phase, not an unplanned Prompt #13 hotfix.
