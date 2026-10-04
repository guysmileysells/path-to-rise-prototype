# PATH TO RISE — PROMPT #13 OWNER / INTERNAL TESTER GUIDE

Use this with the first 3–5 internal/owner-side testers. Keep testing privacy-safe and non-technical.

## Before you start

PATH to RISE is currently a prototype wellness support / self-guided reset tool. It is not therapy, diagnosis, emergency support, clinical treatment, or a production-secure health record.

Use only synthetic reflection text such as:

```txt
TEST REFLECTION — private preview validation only.
```

Do not enter or send:

- trauma experiences;
- diagnoses;
- medical history;
- patient/public/coworker names;
- employer-sensitive or incident details;
- crisis disclosures;
- private journal material.

If you take a screenshot, redact private information first.

## Tester metadata to record

```txt
Tester ID / initials:
Tester type: owner / internal / active first responder / retired first responder / shift worker / non-technical / accessibility reviewer
Date:
Build/link/tag: path-to-rise-prompt-1-12-rc1 unless otherwise stated
Device:
OS version:
Browser:
Browser version if available:
Text size setting:
Reduced motion setting:
Assistive technology used: none / VoiceOver / TalkBack / other
Network condition if notable:
```

## 10-minute owner smoke test

| # | Action | Expected result | Problem indicator | Severity if failed |
|---:|---|---|---|---|
| 1 | Open the app fresh. | Today loads; product purpose is understandable. | Blank/error screen or unclear start. | P1/P0 if unusable. |
| 2 | Find and start Day 1 or Continue. | Day content opens clearly. | Cannot find next action. | P1 if blocked; P2 if confusing. |
| 3 | Scroll Day content. | Text/buttons readable; no horizontal scroll/clipping. | Content hidden, too cramped, or buttons blocked. | P1/P2. |
| 4 | Complete part of a day, leave, return. | App resumes understandably. | Lost state or false completion. | P1/P2. |
| 5 | Save synthetic reflection text. | Save/retrieve works; no sensitive prompts. | Save fails or private text appears unexpectedly. | P0/P1. |
| 6 | Open RESET. | RESET is easy to find and understand. | Too hard to find or too much reading. | P1/P2. |
| 7 | Select a need and open tool. | A relevant canonical tool opens; no diagnosis. | Tool missing, wrong, or diagnostic language. | P1/P2. |
| 8 | Open Toolbox and favourite a tool. | Favourite persists after reopen. | Favourite lost or hard to understand. | P2. |
| 9 | Open My Path. | Progress is clear and non-punitive. | Shame/streak/score/failure framing. | P1/P2. |
| 10 | Open Support. | Support is reachable without obstruction. | Cannot find support or crisis boundary is unclear. | P1. |
| 11 | Refresh browser. | State remains understandable. | Unexpected loss/corruption. | P1/P2. |
| 12 | Close and reopen browser. | App returns safely. | Broken route or unusable state. | P1/P2. |

## Core 14-journey checklist

Record PASS / PARTIAL / FAIL / NOT VERIFIED for each.

| # | Journey | Result | Notes |
|---:|---|---|---|
| 1 | Fresh open → Today → Day 1 |  |  |
| 2 | Complete part of a day → leave → return → resume |  |  |
| 3 | Complete Day → confirm Today/My Path update |  |  |
| 4 | Day 7 → Week 2 transition |  |  |
| 5 | Day 14 → Week 3 transition |  |  |
| 6 | Day 21 → Week 4 transition |  |  |
| 7 | Day 28 → program complete → no Day 29 |  |  |
| 8 | RESET → need → canonical tool → exit |  |  |
| 9 | Toolbox → tool → favourite → reopen |  |  |
| 10 | Reflection → synthetic text → save → leave → return → retrieve |  |  |
| 11 | My Path → understandable and non-punitive |  |  |
| 12 | Support → reachable without obstruction |  |  |
| 13 | Notifications/settings → discreet, optional, no fake push claim |  |  |
| 14 | Invalid route / refresh / interruption → safe recovery |  |  |

## Real-device questions

Ask testers:

1. Did you know what to tap first?
2. Could you understand the next action within a few seconds?
3. Was RESET quick enough for a low-cognitive-bandwidth moment?
4. Did anything feel shamey, clinical, patronizing, pushy, or generic?
5. Did My Path feel supportive rather than evaluative?
6. Was Support easy to find?
7. Did the app explain prototype/local privacy clearly enough?
8. Did any layout, scrolling, keyboard, or button behaviour get in the way?
9. Did large text or assistive technology reveal any blockers?
10. Would anything prevent you from continuing privately for 28 days?

## Issue report template

```txt
Issue ID:
Issue title:
Category: DEFECT / USABILITY FRICTION / ACCESSIBILITY ISSUE / PRIVACY/SAFETY CONCERN / CONTENT CONCERN / PERFORMANCE ISSUE / PERSONAL PREFERENCE / FEATURE REQUEST
Severity: P0 / P1 / P2 / P3
Build:
Device:
OS:
Browser:
Where it happened:
Preconditions:
Steps to reproduce:
Expected result:
Actual result:
Reproducible?:
Screenshot/video available?:
Private information redacted?:
Accessibility setting if relevant:
Regression risk:
Notes:
```

## Stop rules

Stop testing immediately for any P0:

- meaningful privacy exposure;
- destructive data loss across primary workflow;
- app unusable on supported target device;
- dangerous support/safety failure;
- severe security issue.

Pause expansion for any unresolved P1:

- blocked primary journey;
- RESET materially inaccessible;
- Support materially inaccessible/confusing;
- serious accessibility barrier;
- repeated persistence failure;
- privacy promise mismatch;
- major real-device usability failure.
