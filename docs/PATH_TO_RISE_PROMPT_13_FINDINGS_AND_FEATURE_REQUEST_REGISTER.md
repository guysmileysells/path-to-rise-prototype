# PATH TO RISE — PROMPT #13 FINDINGS + FEATURE-REQUEST REGISTER

Use one canonical register for Prompt #13. Do not scatter issues across chat, screenshots, or private notes without copying them here.

## Severity definitions

- P0 — STOP TESTING / CRITICAL
- P1 — HIGH / MUST FIX
- P2 — MEDIUM
- P3 — LOW / POLISH

## Primary categories

Assign exactly one primary category:

- DEFECT
- USABILITY FRICTION
- ACCESSIBILITY ISSUE
- PRIVACY/SAFETY CONCERN
- CONTENT CONCERN
- PERFORMANCE ISSUE
- PERSONAL PREFERENCE
- FEATURE REQUEST

## Stopping rules

If a P0 appears:

1. Stop testing.
2. Do not expand tester group.
3. Preserve privacy-safe reproduction evidence.
4. Determine scope.
5. Fix on a controlled branch if code change is required.
6. Run targeted tests, full automated regression, and critical smoke regression.
7. Repeat failed real-device test.
8. Document before/after evidence before resuming.

If a P1 appears:

1. Pause expansion.
2. Do not move to broader external testing.
3. Fix before scale-up.
4. Rerun affected journey, core smoke path, relevant device, and regression tests.
5. Document resolution.

## Findings register

| ID | Category | Severity | Status | Build | Device/browser | Evidence | Steps / context | User impact | Assigned action | Regression requirement | Resolution | Retest result |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P13-F0001 | USABILITY FRICTION | P2 | MITIGATED / RETEST NEEDED | `eca3eb403487fcb4801ce413f7c447a12c7f4551` | Physical iPhone Safari | Owner screenshot + P13-E0005/P13-E0006 | Opening `http://192.168.1.65:4173/` on iPhone Safari with HTTPS-Only enabled | Owner could not load app via HTTP LAN URL | Created temporary HTTPS tunnel `https://aaf62eedc0e33f.lhr.life/`; owner must retry first app-load test | Retest iPhone Safari Home/Today/Day flow through current active HTTPS URL | Access method changed, app code unchanged | NOT VERIFIED until owner retries |
| P13-F0002 | USABILITY FRICTION | P2 | OPEN — REQUIRES EVALUATION | current private preview / `f02dd5fb38fd56fae800b161bff22bdf1a58edc4` | Physical iPhone Safari | Owner real-device report + P13-E0008 + `docs/PATH_TO_RISE_PROMPT_13_MOBILE_DENSITY_EVALUATION.md` | Buttons and primary controls appear functional/tappable, but several screens feel too busy / somewhat all over the place, with lots of information presented at once. | Mobile experience may feel less calm/clear for tired or activated users. | Evaluate highest-density screens and likely causes; recommend smallest UX improvements only; do not implement yet. | If later changed, run automated gates and retest affected screens on iPhone. | Not changed. | OPEN |

## Feature-request quarantine

Do not implement feature requests during Prompt #13. Record and defer.

| ID | Request | Tester type | User reason | Frequency | Affected workflow | Expected benefit | Possible complexity | Conflicts with product principles? | Disposition |
|---|---|---|---|---|---|---|---|---|---|
| P13-R0001 | TEMPLATE |  |  |  |  |  |  |  | Deferred pending validation phase completion |

## Personal preferences

Personal preference is not automatically a defect.

| ID | Preference | Tester type | Affected screen/flow | Frequency | Notes | Disposition |
|---|---|---|---|---|---|---|
| P13-P0001 | TEMPLATE |  |  |  |  | Log only unless repeated/evidence-backed |
