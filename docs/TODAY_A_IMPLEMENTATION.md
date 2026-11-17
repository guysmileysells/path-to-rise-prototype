# Today A — functioning-version implementation

## Current execution scope
Owner message `1572271883523596462` explicitly targets https://guysmileysells.github.io/path-to-rise-prototype/#today for the already-approved A / Your space / optional reminder design. This supersedes the earlier restriction against applying A to the functional-reference repo. The ChatGPT-hosted site stays unchanged and its editor-access blocker does not block this GitHub Pages release.

Baseline: repository `guysmileysells/path-to-rise-prototype`, HEAD `424d3be1f90615a05ad58d5f774c9315ec9f189a`; previous deployed application `1a162eb4989424f45f7b9ad5846ba30b2b1ff9ab`. Preserve unrelated working files, the pre-A status note and rollback history. Use a feature branch; no force push.

## Goal and approach
Apply the selected forest/cream Reset-first Today hierarchy to the functioning React/Vite app, not a screenshot or fake interactive mock. Reuse its actual program progress, canonical tool shortcuts, task continuation, browser-local writing, notification preferences/permission/timers and confirmed data controls. Keep all 28 source-backed days and other screen behavior unchanged.

## Work sequence
1. Baseline `npm test`, `npm run lint`; write and run a failing `tests/browser/today-a.spec.ts` real-browser hierarchy/Start path assertion.
2. Implement Today A and Today-local Your space/Reminders states in `src/App.tsx`; scope appearance in `src/App.css`. Reuse approved target SVG icon assets locally; no network/font dependency. Header Your space becomes reachable by keyboard. Keep four nav destinations, fixed navigation/content separation and honest local-storage/capability notice.
3. Reconcile existing disclosure tests with the approved settings entry/navigation, preserving their assertions and native expansion/data/focus guarantees. Add regression cases for real completion/count continuation, saved writing exclusion, reminder controls and clear-action cancellation.
4. Run exact aggregate, lint, mobile/desktop browser suite, responsive and hosted verifier. Inspect screenshots; review scoped diff independently. Stage only intended files (not global regenerated reports, caches or unrelated evidence).
5. Publish through existing Pages Actions, require terminal success, verify actual hosted UI/assets/navigation/settings, then update release/functioning-version records.

## Acceptance and safety
- Reset card precedes Your path; headline/brand/palette reflect A. Day/week/title/next task and counts come from canonical state, never 3/17 mock constants.
- Start/Continue reaches real day/action. Returning state is nonpunitive. Completed program exposes review/reusable practices; no actionable Day 29.
- Quick Kit reaches real Toolbox; shortcut resolves the existing recommendation. Four nav labels remain unchanged.
- Your space holds personalization explanation, reminder entry and three separately confirmed destructive actions. Reflections never appear on Today or enter suggestion logic.
- All four reminders, practice selector/times, finite return timing, quiet hours and explicit permission control retain their real handlers/limits. Preferences are not delivery; no new push/backend and no automatic permission request.
- Opening/changing screens does not alter progress/writing. No storage-key/schema/migration changes. Synthetic QA contexts only; no owner data reset.
- Full source/content engines unchanged. Automated checks do not imply phone/human/accessibility/clinical/production approval.

## Final local acceptance
- Frozen runtime/test/config manifest: `evidence/today-option-a-apply/candidate-manifest.json`; source digest verified unchanged after the run.
- Aggregate source/privacy/reminder audits, TypeScript and production build: PASS (`release-aggregate.txt`). Existing Node experimental-transform and >500 kB bundle advisories remain non-blocking.
- Lint: 0 warnings / 0 errors (`release-lint.txt`).
- Full mobile + desktop browser suite: 44 passed (`release-browser.txt`), including both saved-active-reminder focus regressions and final Today navigation.
- Built production-preview focused suite: 18 passed (`release-production-browser.txt`).
- Production-preview renderer: 20 layout states across 320/375/390/430/1280 widths, canonical Day 1/17 actions, Reset, Quick Kit, saved-active-reminder header entry and preserved consent PASS; no captured page/resource errors (`local-verification.json`). Home and overview screenshots visually inspected. Additional data-clear controls are reachable by scrolling; fixed bottom navigation does not overlay the scrollable content.
- Preservation check: 48 existing functions, 38 App state/handler declarations and 10 engine/package/workflow files unchanged (`preservation.json`). Intentional legacy-complete selector guard is separately regression-tested.
- Staged credential-pattern scan and whitespace check: PASS. Follow-up independent review found no blocking issues; deployment and hosted acceptance subsequently passed (below).

## Status
The remaining independent-review P2 was reproduced with a failing browser test (`red-header-focus.txt`). Header Your space now closes only the nested Reminders disclosure before opening/focusing the overview; it does not change consent or saved preferences. New tests cover entry from Support and already-open Reminders at mobile/desktop sizes, preserved enabled/time settings, visible keyboard focus and Today return. Focused verification: 18 passed (`green-header-focus.txt`). The reload preference test explicitly opens Reminders from the overview instead of expecting a bypass.

The latest Today/brand navigation closes settings and returns to the Reset-first home; completed/legacy program states review Day 28 without fabricated task records. Owner continue authorization: `1572283371986362511`.

## Hosted release — verified
- Application merge commit `40d5b3a7fec1ad4684baaa7d01815583c3e432ee` (PR #1); Pages run `44126469949` build and deploy jobs succeeded. Later documentation/evidence-only commits do not represent a new application deployment.
- Live target: https://guysmileysells.github.io/path-to-rise-prototype/#today. ChatGPT-hosted main/design reference untouched.
- Hosted verifier PASS: 20 layout states / five widths; Reset, canonical Day 1 with 17 tasks, Quick Kit, Today return and both saved-active-reminder header-entry cases. Consent remains enabled; no captured page/resource errors; all icons decode. Raw proof: `hosted-verification.json` and `deployment.json` under `evidence/today-option-a-apply/`.
- Served JS/CSS SHA-256 match the tested production build exactly. Six SVG text assets differ only by Git's Windows CRLF versus Linux LF checkouts; normalized content equality was explicitly proved before the verifier was corrected. Hosted image checks wait for decoding rather than misclassifying in-flight requests as broken. These verifier-only corrections do not change the deployed app or weaken JS/CSS comparison.
- Final source manifest remains unchanged after publication; scoped read-only follow-up review verdict: no blocking findings (`follow-up-review.md`). Lint re-run after verifier changes: 0 warnings/errors.
- No owner browser data inspected or cleared. Physical-device, actual screen-reader, external safety/privacy/security sign-off and closed-app delivery remain unverified/not implemented as applicable.
