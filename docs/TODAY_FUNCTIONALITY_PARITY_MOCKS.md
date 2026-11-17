# Today functionality parity — mock review

> **Current execution update:** owner explicitly requested applying A to the GitHub **functioning version** (`1572271883523596462`). This is now the authorized implementation/deployment target; the ChatGPT-hosted site stays untouched. Earlier main-host access restrictions below remain historical context, not a blocker for this release. See `docs/TODAY_A_IMPLEMENTATION.md`.

## Owner direction and boundary
- Main prototype/design reference: https://path-to-rise-review.gimidaloot.chatgpt.site/
- **Functioning version / functionality reference:** https://guysmileysells.github.io/path-to-rise-prototype/#today — owner-named working baseline; current status in `docs/FUNCTIONING_VERSION.md`.
- Request: all functionality available from the source Today page must be available from the main prototype Today page. Show mock screenshots here before implementation.
- Owner selected **A — Reset first** in response to the labelled A/B/C/D screenshots. A is the approved Today visual hierarchy; B is not selected. Privacy/data and reminder functionality remain required shared parts of the parity scope, not extra primary destinations. This selection does not authorize backend expansion, real delivery, data transfer or deployment to an unverified host.
- Preserve the main prototype's cream/sage/forest-green palette, Georgia headline, target brand and SVG navigation icons, supportive headline and Today/Reset/My Path/Support navigation. Do not reapply the rejected lavender Daily Rhythm design.

## Implementation authorization
- Owner subsequently said **ok apply** in message `1572264775516430347`, replying to selected A plus the shared Your space/Reminders screenshots. This authorizes applying the approved Today A functionality to the main prototype; no need to ask again for layout approval.
- Preserve the frontend/local-prototype scope, curriculum, privacy and notification limits. No unrelated backend, data transfer or replacement-host pivot is implied.
- Implementation is not yet applied: access to the main prototype editable project/publishing route must be established. Public app loads, but its outer page exposes an iframe and no links, buttons or forms for editing; the local Git remote is the secondary GitHub Pages repository.

## Direct inspection
- Main prototype rendered `Leave the shift. Keep yourself.`, Reset me now, sample Seven-Day Reset Day 3 of 7, My Quick Kit and four bottom destinations. Inspected its actual embedded HTML/CSS and captured its mobile view.
- Source live Today and local `src/App.tsx` Today/NotificationSettings/LocalDataControls, getHomeModel and `src/personalizationContent.ts` rules inspected. Source Today is an entry/continuation page; the full task roadmap is downstream in My Path, not an inline Today feature.
- Source functionality and curriculum win over the target's seven-day sample card: mock program card uses actual 28-day structure. Day 1, 3/17 actions is labelled illustrative review state, not claimed live progress. No seventh-day/28-day progress mixing.

## Coverage contract
| Source Today functionality | Proposed location/behavior |
|---|---|
| Current day/week, day title, next ordered action | Your path module on both home options |
| True task-derived completed count | 3 of 17 illustrative state; real implementation must derive from canonical progress, not parallel counters |
| Start Day 1 / Begin current day / Continue unfinished day | Primary day button; opens existing My Path at correct saved day/action; mock shows destination preview only |
| Returning after a break without penalties | Resume actual saved position; no reset, score or streak pressure |
| Completed 28-day program | Completed-state view, review path and Reset/reusable-practice entry; no actionable Day 29 |
| One transparent favourite/recent/current-week shortcut | Within reach row with reason; no reflection analysis |
| No-shortcut/source-content fallback | Non-actionable source-backed note replaces optional shortcut |
| Reset now | Existing Reset me now action; stays available without finishing anything |
| My Path/program entry | Your path / View program + existing bottom My Path |
| Privacy/reminder/local-data disclosure | Header Your space button + visible Today settings row; shared sheet within Today, not fifth bottom tab |
| Transparent personalization | Privacy sheet explains functional program state, explicit favourites, bounded recents; writing is excluded |
| Browser-local state limitation | Privacy sheet and concise home note; no encryption/account-sync/offline-security promises |
| Notification platform truth | Reminders sheet: tab-open prototype only, no reliable closed-app/background delivery |
| Permission state + explicit explain/request action | Permission row and explanation dialog; mock does not ask actual browser permission |
| Discreet privacy mode and neutral copy previews | Reminders detail; no private writing, RESET need or diagnosis in messages |
| Program reminder enable/time, stop after Day 28 | Program reminder disclosure, Off default; terminal-state control disabled |
| User-scheduled practice reminder enable/practice/time | Practice selector from canonical source names; independent explicit Off toggle; favourites are not consent |
| Return reminder enable/after-days/time/finite attempts | Return disclosure; range 3–30, one gentle return then stop; disabled after completion |
| Post-program reminder enable/time | Post-program disclosure; only active after Day 28; reusable practices, no next day |
| Quiet hours enable/start/end, cross midnight, delay to end | Quiet-hours controls and readable rule in Reminders sheet |
| Clear progress + reflections | Separate destructive action + scope-specific confirmation |
| Clear Toolbox preferences/history | Separate destructive action + scope-specific confirmation |
| Clear all local prototype data | Separate destructive action + explicit all-data confirmation |
| Four global destinations/Support always reachable | Existing bottom navigation retained; mock destination previews, not fake wellness functionality |

## Proposed alternatives
- **A — Reset first:** keep the current reset-led hierarchy; strengthen Your path with day/week, current action, honest count and Continue button. Add one suggested-practice row. Your space opens settings. Closest to the current target hierarchy; Quick Kit/settings need a short scroll in the tall review view.
- **B — Continue first (not selected; retained for history):** put the day/next action first and make Continue the single dominant button. Keep immediate Reset directly below as a quieter but obvious action. Same feature coverage as A, with all primary Today rows visible in the 390 × 960 review render; shorter phones scroll while keeping navigation fixed.
- **C — Privacy + local data:** shared Today settings state: local-storage truth, personalization boundaries, Reminders entry and three separate destructive controls.
- **D — Reminders:** shared Today settings state: permission vs preference vs delivery, four reminder categories, practice/time/return controls, quiet hours and neutral copy preview. Detail controls expand instead of crowding Today.

## Artifacts and reproducibility
- Disposable editable HTML under `.planning/sketches/today-parity/`; each main option is self-contained, with embedded styles, icons and mock interactions.
- Source/reference snapshots are observations only; no external embedded scripts executed by the mock itself.
- Labels A/B/C/D and `DESIGN MOCK` are baked into screenshots outside the app surface so the options cannot be confused with live screenshots.
- Phone render target 390 × 960; narrow-layout check 320px. Shared settings remain Today states, not new navigation tabs.
- Render/interaction verification **PASS**: 12 geometry cases (four views at 390×960, 390×844 and 320×844), no horizontal overflow, no content/nav overlap, reachable original four navigation buttons and visible controls at least 44px. Ten mock interaction scenarios passed: fresh/partial/returning/complete primary states for both options, settings/reminder access, three scoped confirmation/cancel previews, permission explanation, neutral copy, practice consent/selection, four time fields, return-day input and quiet-hours inputs. No page errors were captured. These are mock checks, not validation of the externally hosted application.
- Visually inspected all four final 390×960 PNGs against the captured target mobile reference. Forest/cream/sage tokens, Georgia headline and original SVGs preserved. A needs a short scroll for lower rows; B shows more of the functionality at a glance. Settings controls remain inside Today. No live/runtime source files changed (`git diff --exit-code HEAD -- src scripts package.json package-lock.json tests .github/workflows`).
- Reproduce: `python .planning/sketches/today-parity/generate.py` then `node .planning/sketches/today-parity/render-verify.mjs`. Machine-readable evidence: `.planning/sketches/today-parity/mock-validation.json`. Delivered images: `a-reset-first.png`, `b-continue-first.png`, `c-privacy-data.png`, `d-reminders.png`. Additional local review images show practice selection/time editing and the all-data confirmation.

## Unknowns / future implementation gates
- Editable access, export/source of the ChatGPT-hosted prototype and safe publishing method are unverified. They block implementation, not mock creation.
- Real data cannot be assumed to transfer across GitHub Pages and the ChatGPT host: browser storage is origin-specific. Any transfer needs its own explicit design/consent and verification.
- The main prototype's claims of offline tools/no personal data saved cannot be carried over unchanged if persistence is added. Proposed wording is browser-local prototype state only.
- No live app modifications, clinical approval, working delivery, actual account sync, real-device testing or production privacy/security claim is made by these mockups.
- Layout gate passed: A selected. Next gate is implementation handoff and establishing the editable main-prototype project/publishing route. Build-ready checklist: `docs/TODAY_OPTION_A_HANDOFF.md`. Do not silently implement against the secondary GitHub Pages app or re-open the A/B choice.
