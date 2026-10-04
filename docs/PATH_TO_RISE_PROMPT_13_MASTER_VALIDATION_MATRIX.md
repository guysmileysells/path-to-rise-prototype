# PATH TO RISE — PROMPT #13 MASTER VALIDATION MATRIX

Statuses must be one of: PASS, PARTIAL, FAIL, NOT VERIFIED.

## Validation matrix

| Validation item | Status | Device/browser | Evidence | Human/automated | Owner | Blocking? | Notes |
|---|---|---|---|---|---|---|---|
| Checkpoint recoverable | PASS | Git | tag resolves to `045af500ff6901fa56494d33512cfd6e8d3c8311` | Automated/tool | Engineering | Yes | Verified at Prompt #13 start. |
| Working tree clean at start | PASS | Git | `git status -sb` = `## master` | Automated/tool | Engineering | Yes | Start state only. |
| iPhone physical device | NOT VERIFIED | iPhone Safari | Pending tester evidence | Human | Owner/QA | Stage 1 yes | Do not substitute viewport. |
| Android physical device | NOT VERIFIED | Android Chrome | Pending tester evidence | Human | Owner/QA | Stage 1 yes | Do not substitute viewport. |
| Tablet | NOT VERIFIED | Tablet TBD | Pending if support claimed | Human | Owner/QA | No unless supported | Secondary target. |
| Safari/WebKit | NOT VERIFIED | iPhone Safari | Pending | Human | Owner/QA | Stage 1 yes | Physical iPhone required. |
| Chrome Android | NOT VERIFIED | Android Chrome | Pending | Human | Owner/QA | Stage 1 yes | Physical Android required. |
| Large Text / font scaling | NOT VERIFIED | iPhone/Android | Pending | Human | Accessibility owner | Stage 1/2 yes | Device setting. |
| VoiceOver | NOT VERIFIED | iPhone | Pending | Human | Accessibility owner | Public yes | Basic nav required. |
| TalkBack | NOT VERIFIED | Android | Pending | Human | Accessibility owner | Public yes | Basic nav required. |
| Reduced Motion | NOT VERIFIED | iPhone/Android | Pending | Human | Accessibility owner | Stage 1/2 | Device setting. |
| Today/Home | NOT VERIFIED for real device | iPhone/Android | Pending | Human | Owner/QA | Stage 1 yes | Local automated PASS already exists. |
| Days 1–28 | NOT VERIFIED for real device | iPhone/Android | Pending | Human | Owner/QA | Stage 1/2 | Implementation PASS already exists. |
| Week transitions | NOT VERIFIED for real device | iPhone/Android | Pending | Human | Owner/QA | Stage 1/2 | Use test state if needed. |
| Day 28 / no Day 29 | NOT VERIFIED for real device | iPhone/Android | Pending | Human | Owner/QA | Stage 1/2 | Use test state if needed. |
| RESET | NOT VERIFIED for real device | iPhone/Android | Pending | Human | Owner/QA | Stage 1 yes | Low-cognitive-bandwidth task. |
| Toolbox | NOT VERIFIED for real device | iPhone/Android | Pending | Human | Owner/QA | Stage 1/2 | Favourite persistence. |
| Reflections | NOT VERIFIED for real device | iPhone/Android | Pending | Human | Owner/QA | Stage 1 yes | Synthetic text only. |
| My Path | NOT VERIFIED for real device | iPhone/Android | Pending | Human | Owner/QA | Stage 1 yes | Non-punitive check. |
| Support | NOT VERIFIED for real device | iPhone/Android | Pending | Human | Owner/QA | Stage 1 yes | P1 if confusing/inaccessible. |
| Notifications/settings | NOT VERIFIED for real device | iPhone/Android | Pending | Human | Owner/QA | Stage 1/2 | No fake push claim. |
| Persistence | NOT VERIFIED for real device | iPhone/Android | Pending | Human | Owner/QA | Stage 1 yes | Refresh/close/reopen. |
| Performance observation | NOT VERIFIED | iPhone/Android | Pending | Human | Owner/QA | Stage 1/2 | Observe lag/jank/load. |
| First-responder usability | NOT VERIFIED | Human feedback | Pending | Human | Product owner | Stage 2 yes | Voluntary, no trauma collection. |
| Shift-work usability | NOT VERIFIED | Human feedback | Pending | Human | Product owner | Stage 2 yes | Night/missed-day scenarios. |
| SME/content review | NOT VERIFIED | Human SME | Pending | Human/external | SME/content owner | Public yes | Agent cannot mark PASS. |
| Privacy/legal review | NOT VERIFIED | Qualified reviewer | Pending | Human/external | Privacy/legal | Public yes | Agent cannot mark PASS. |
| Security review beyond dependency audit | NOT VERIFIED | External/appsec | Pending | Human/external | Security owner | Public yes | npm audit is not pen test. |
| Production infrastructure | NOT VERIFIED | Deployment/monitoring/rollback | Pending | Human/engineering | Release owner | Public yes | Not in Prompt #13 required pass. |

## Per-device core journey matrix

| Journey | iPhone Safari | Android Chrome | Tablet if tested | Notes |
|---|---|---|---|---|
| 1. Fresh open → Today → Day 1 | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 2. Partial day → leave → return → resume | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 3. Complete Day → Today/My Path update | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 4. Day 7 → Week 2 | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 5. Day 14 → Week 3 | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 6. Day 21 → Week 4 | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 7. Day 28 → Complete → no Day 29 | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 8. RESET → need → tool → exit | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 9. Toolbox → favourite → reopen | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 10. Synthetic reflection save/retrieve | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 11. My Path non-punitive | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 12. Support reachable | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 13. Notifications/settings copy | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
| 14. Invalid route/refresh/interruption recovery | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |  |
