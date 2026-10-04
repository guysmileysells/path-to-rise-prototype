# PATH TO RISE — PROMPT #13 BASELINE + VALIDATION PLAN

Generated: 2026-10-03 22:06 PDT
Phase: Prompt #13 — Controlled Private Preview + Real-Device Validation

## 1. Locked baseline

```txt
Branch: master
Verified Prompt #1–#12 checkpoint commit: 045af500ff6901fa56494d33512cfd6e8d3c8311
Tag: path-to-rise-prompt-1-12-rc1
Current handoff commit: d4286a34a25adcb068e613aba7b3ffd0c49f5047
Working tree at Prompt #13 start: clean
Remote: none configured
Starting classification: LEVEL B — INTERNAL TESTING READY
```

The Prompt #1–#12 checkpoint must remain recoverable throughout Prompt #13. Do not move, rewrite, delete, or retag `path-to-rise-prompt-1-12-rc1`.

## 2. Prompt #13 scope

Prompt #13 is an evidence-gathering phase. It is not a feature phase, redesign phase, public launch, TestFlight launch, or production launch.

Allowed work:

- Prepare tester instructions, evidence registers, validation matrices, and review packages.
- Run/record real-device and human validation evidence.
- Triage defects and feedback.
- Fix only evidence-backed defects using the smallest safe change.
- Retest after any fix.

Not allowed without a separate owner decision:

- New features.
- Redesigns.
- Engagement mechanics, streaks, scores, gamification, or AI features.
- Rewriting Days 1–28.
- Changing RESET/Toolbox architecture without defect evidence.
- Beginning public launch, TestFlight, or a pilot.
- Treating feature requests as implementation instructions.

## 3. Starting evidence status

| Area | Starting status | Evidence / reason |
|---|---|---|
| Checkpoint recoverability | PASS | `path-to-rise-prompt-1-12-rc1` resolves to `045af500ff6901fa56494d33512cfd6e8d3c8311`. |
| Working tree at start | PASS | `git status -sb` returned `## master`. |
| Home / Today | PASS for local verified prototype | Prompt #12 runtime/automated evidence. |
| Days 1–28 | PASS for source-backed implementation | 28 days, 311 sections, final audit PASS. |
| Week transitions | PASS for automated/model checks | Week 1: 1–7; Week 2: 8–14; Week 3: 15–21; Week 4: 22–28. |
| Day 28 / no Day 29 | PASS for automated/runtime checks | Final audit + Prompt #12 runtime evidence. |
| RESET / Toolbox | PASS for implemented model | Canonical tool mapping and state-separation tests. |
| Reflections | PARTIAL | Local save/retrieve verified; production privacy/storage unresolved. |
| Notifications/reminders | PARTIAL | Prototype preferences/copy only; no real push/native delivery. |
| Physical iPhone | NOT VERIFIED | No physical device evidence yet. |
| Physical Android | NOT VERIFIED | No physical device evidence yet. |
| VoiceOver / TalkBack | NOT VERIFIED | Manual assistive-technology testing not completed. |
| First-responder / shift-worker validation | NOT VERIFIED | Requires real human feedback. |
| SME/content review | NOT VERIFIED | Requires qualified human review. |
| Privacy/legal review | NOT VERIFIED | Requires qualified human review. |
| Security review beyond dependency audit | NOT VERIFIED | npm audit is not a penetration test. |
| Production infrastructure | NOT VERIFIED | No permanent HTTPS deployment/domain/monitoring/rollback. |

## 4. Stage 1 — owner/internal real-device preview gate

Do not expand to external testers until all Stage 1 gate items are complete:

| Gate item | Required result before expansion |
|---|---|
| Owner smoke test | PASS or documented PARTIAL with no P0/P1 blocker. |
| Modern iPhone Safari smoke | PASS or documented PARTIAL with no P0/P1 blocker. |
| Modern Android Chrome smoke | PASS or documented PARTIAL with no P0/P1 blocker. |
| P0 register | 0 unresolved. |
| P1 register | 0 unresolved affecting primary journeys/privacy/support/device usability. |
| Prototype/privacy disclosure | Tester understood. |
| Reflection test data | Synthetic only. |
| Support | Reachable and understandable. |
| RESET | Findable and usable. |
| Primary nav | Usable. |
| Accessibility blockers | Identified honestly; no hidden assumption. |
| Findings | Triaged in canonical register. |

If this gate fails, remain at Internal Testing Ready.

## 5. Stage 2 — controlled external private preview

Only after Stage 1 passes, invite approximately 5–8 controlled external testers.

Preferred representation:

- active first responder if voluntary and appropriate;
- retired first responder if available;
- shift worker / irregular schedule user;
- non-technical user;
- iPhone user;
- Android user;
- different phone sizes;
- accessibility-friction reporter if available.

Do not recruit people because they are in crisis or acute distress. Do not solicit trauma disclosures.

## 6. Prompt #13 exit conditions

Prompt #13 may pass only if:

1. Owner smoke test is complete.
2. Physical iPhone smoke test is complete.
3. Physical Android smoke test is complete.
4. Safari/iPhone critical path is validated.
5. Android Chrome critical path is validated.
6. No unresolved P0 exists.
7. No unresolved P1 exists.
8. Testers understand prototype/privacy limits.
9. Support is findable and understandable.
10. RESET is fast/clear enough for tested users.
11. My Path is experienced as non-punitive.
12. Reflection privacy boundaries remain intact.
13. Synthetic reflection data was used in structured testing.
14. Defects are separated from preferences and feature requests.
15. Major accessibility blockers are tested or honestly identified.
16. First-responder/shift-worker feedback is collected where available.
17. Every unperformed human/external validation remains NOT VERIFIED.
18. Accepted fixes pass regression.
19. Checkpoint remains recoverable.
20. Next-stage readiness is classified honestly.

## 7. Release classification choices after Prompt #13

Use exactly one:

- LEVEL A — NOT READY
- LEVEL B — INTERNAL TESTING READY
- LEVEL C — CONTROLLED PRIVATE PREVIEW VALIDATED
- LEVEL D — CLOSED BETA / PILOT READY
- LEVEL E — PUBLIC/PRODUCTION LAUNCH READY

LEVEL D/E require evidence beyond internal smoke testing and must not be awarded by optimism.
