# Independent adversarial acceptance — ten support tools

## Verdict

**PASS — limited technical checkpoint; overall exhaustive acceptance NOT VERIFIED.** No reproducible implementation defect was found in the independently exercised subset. This is **not public-release approval**: all five new adapted flows remain clinically/SME NOT APPROVED, intentionally. Public release remains BLOCKED by that separate gate.

Scope: read-only implementation inspection plus one successfully executed inline Playwright browser session against the existing production preview, 320 × 568, Chromium. No source/test modifications, builds, servers, commits or broad regression suites. Only this evidence file was written. Parent-reported 16 browser cases and npm test/lint success are context, not independently rerun evidence.

## Sources inspected

- `docs/REAL_TIME_SUPPORT_EXPANSION.md`
- `src/AdditionalPractice.tsx`
- `src/supportFavourites.ts`
- `src/additionalSupportState.ts`
- `src/RealTimeSupport.tsx`
- Relevant `src/App.tsx` hash navigation, mounting, and confirmed clearing functions.

Direct source findings: PMR uses elapsed performance time, 5-second tension/10-second release slots, skipped areas retain duration as natural rest; pause snapshots accumulated time. Interval cleanup clears the active interval. Speech cleanup invalidates queued microtasks and ignores stale error callbacks via a closed flag. Speech selects local English voices and uses fixed content only. Hidden-tab logic pauses and disables audio. Stop clears ratings, skips and activity. Switching/collapsing removes the selected practice; app hash handler closes the toolbox. Favourites are allowlisted, deduplicated IDs with reserved prototype keys excluded and no rating/activity fields. App clear-all asks for confirmation before removing the favourites key (App.tsx lines 527–542); Toolbox clear also removes it. These are source-review observations, not substitutes for unexecuted runtime tests.

## Independently observed browser results

Successful command: `node --input-type=module -e "…"` importing the existing `@playwright/test`, launching Chromium and using `http://127.0.0.1:4183/`. Exit code **0**. No dependencies installed.

| Check | Actual result |
|---|---|
| Served candidate | `http://127.0.0.1:4183/assets/index-Dlf1Qiwh.js` |
| Tool inventory | Exactly 10 expansion triggers, original five followed by five new tools |
| All ten headings | Every tool independently opened and checked: What / When / How / Why / Benefits / Duration / Adaptations / Scientific References, exact order |
| PMR 2-minute skipped hands | With Skip hands selected, after 10,100 ms clock advance: `data-phase=rest`, `data-area=hands` |
| PMR 5-minute skipped hands | With Skip hands selected, after 20,100 ms clock advance: `data-phase=rest`, `data-area=hands` |
| Pause, both durations | Displayed remaining time unchanged after another 6,000 ms while paused |
| Stop, both durations | Skip hands checkbox cleared after Stop practice |
| Urge transient rating | Select intensity 9, switch to Re-Engagement, switch back: rating is blank |
| Favourite payload | Saving Physical Tension Reset wrote exactly `["physical-tension-reset"]` to the dedicated key |
| Favourite reload | Reload and reopen toolbox: Favourite tools (1) |
| Allowlist/deduplication | Inject `["physical-tension-reset","bad","__proto__",9,"physical-tension-reset"]`, reload: Favourite tools (1) |
| Blocked storage writes | Override Storage.prototype.setItem to throw; toggling existing favourite produces honest “Favourites could not be saved.” notice |
| Direct hash navigation | While Urge tool open, set location.hash to #support: actual #support-title becomes visible and #rts-title is absent |
| 320px overflow | document.documentElement.scrollWidth <= 320 |
| Sample setup touch geometry | Urge detail buttons: Save favourite 50px high; Connect With Support 50px; Start Guided Practice 48px; each right edge 304px |

Reproduction details: open Real-Time Support; expand Physical Tension Reset; install Playwright page.clock; select duration and Skip hands; confirm stationary safety checkbox; Start Guided Practice; Next step; clock.runFor(10100) for 2-minute or 20100 for 5-minute. Read `.rts-pmr` attributes. Pause practice, record `[aria-label="Practice time remaining"]`, advance 6000ms and compare. Stop practice and inspect Skip hands checked state. Favourite pollution and write-block checks use isolated browser-local synthetic data only.

## NOT VERIFIED / coverage limits

- Full 2-/5-minute completion and every 5-/10-second boundary; runtime skip-current-area, skip-timed practice and timer resume continuity.
- Runtime hidden-tab transition, active timer collapse/switch/navigation cleanup, optional speech cancellation and deliberately delayed stale speech callbacks. Source cleanup reviewed, but not exercised with a speech double.
- Activity selection, after-rating reset, full unexpected-unmount/re-entry privacy matrix and all storage/network/log output channels.
- Confirmed clear-all accept/cancel UI flow and blocked-storage clear-all. Clear functions were inspected only.
- Active PMR runner stop/exit touch geometry and bottom-navigation overlap on the short phone. Reported dimensions are setup buttons, not whole-app touch-target certification.
- Independent original-five exact fixture comparison and protected hashes. Owner states these passed; this review checked inventory/order/headings, not exact original text bytes.
- Reference endpoint validity, clinical evidence quality, physical-device audible speech, screen readers, Safari/WebKit, legal/privacy reviews and public deployment.
- Parent's broad suite: intentionally not run concurrently by this reviewer.

## Issues / severity

No product bug or severity-rated blocker reproduced in this limited run. Coverage gaps above are NOT VERIFIED, not assumed defects. One initial longer shell command failed before running (`unexpected EOF while looking for matching quote`); it was replaced by a shorter successful inline browser command, with no repository script created. The file-search wrapper also failed to resolve the Windows path; direct file reads and a targeted Python read supplied the relevant source instead.

**Gate:** scoped technical PASS; complete independent adversarial coverage NOT VERIFIED; clinical/public release BLOCKED pending explicit approval.
