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
| P13-F0001 | USABILITY FRICTION | P2 | MITIGATED / RETEST NEEDED | `eca3eb403487fcb4801ce413f7c447a12c7f4551` | Physical iPhone Safari | Owner screenshot + P13-E0005/P13-E0006 | Opening `http://192.168.1.65:4173/` on iPhone Safari with HTTPS-Only enabled | Owner could not load app via HTTP LAN URL | Created temporary HTTPS tunnel `https://aaf62eedc0e33f.lhr.life/`; owner must retry first app-load test | Retest iPhone Safari Home/Today/Day flow through the latest verified active HTTPS URL | Access method changed, app code unchanged | NOT VERIFIED until owner retries |
| P13-F0002 | USABILITY FRICTION | P2 | MITIGATED / OWNER PHYSICAL-IPHONE RETEST NEEDED | refinement checkpoint commit | Physical iPhone Safari + rendered preview inspection + local production preview | Owner real-device report + P13-E0008 + P13-E0010 + P13-E0012 + `docs/PATH_TO_RISE_PROMPT_13_MOBILE_UX_DENSITY_AUDIT.md` + `docs/PATH_TO_RISE_PROMPT_13_CONTROLLED_MOBILE_UX_REFINEMENT_REPORT.md` | Buttons and primary controls appeared functional/tappable, but several screens felt too busy / somewhat all over the place, with lots of information presented at once. | Mobile experience may feel less calm/clear for tired, overloaded, distracted, or low-bandwidth users. | One owner-approved controlled mobile calm/progressive-disclosure pass implemented: My Path overview/detail split, Toolbox catalogue disclosure, RESET reduced first-view choices, Today secondary settings disclosure, Day orientation strip. | Retest updated app on physical iPhone Safari through current active HTTPS URL `https://5aff8862367f82.lhr.life/`; do not close until owner confirms calmer/clearer/less crowded/easier navigation. | Automated regression and browser QA passed; source-backed content preserved. | NOT VERIFIED until owner retests updated build |
| P13-F0003 | DEFECT | P1 | MITIGATED / OWNER PHYSICAL-IPHONE RETEST NEEDED | pending Open Day 1 fix commit | Physical iPhone Safari via active HTTPS tunnel + browser smoke | P13-E0014 owner report + P13-E0015 implementation evidence | Owner reports pressing Open Day 1 does nothing while other buttons work. Agent browser reproduction showed the state changed, but Day detail rendered below overview disclosures, making the iPhone tap appear ineffective. | Blocks the owner mobile UX retest because the main Day detail path may appear inaccessible on iPhone. | Day detail now renders immediately under the primary progress card and scrolls into view when opened. | Retest Today Start Day 1 and My Path Open Day 1 on physical iPhone Safari through current active HTTPS URL `https://5aff8862367f82.lhr.life/`. | Automated regression and browser affected-path smoke passed; physical iPhone confirmation still required. | NOT VERIFIED until owner retests |

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
