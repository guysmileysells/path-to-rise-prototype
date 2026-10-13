# PATH TO RISE
## RESET SYSTEM
### MASTER CANONICAL AUDIT + ELITE PRODUCT / UX / ENGINEERING ARCHITECTURE

Generated: 2026-10-05 10:21 PDT  
Status: **AUDIT + ARCHITECTURE PHASE ONLY — DO NOT IMPLEMENT YET**  
Canonical path inspected: `C:\Users\I9-10900KF\projects\path-to-rise\app`  
Owner directive source: `C:\Users\I9-10900KF\AppData\Local\hermes\cache\documents\doc_eb260665298e_message.txt`

> This document supersedes earlier RESET planning notes where conflicts exist. It does not modify app code, Days 1–28, RESET tools, source content, or UI screens. It is a decision package for owner approval before building one reference RESET.

---

## 1. EXECUTIVE DIAGNOSIS

**Verdict:** Current PATH has a useful prototype RESET/Toolbox surface, but it is **not** the authoritative RESET system described in the new master spec.

**What exists now:**
- Four-tab app shell: `Today`, `Reset`, `My Path`, `Support` in `src/App.tsx`.
- RESET screen asks `What do you need right now?` and routes deterministic needs to existing source-backed program practices.
- Toolbox exposes **10 canonical tools** from the 28-Day Journey via `src/toolContent.ts`.
- Standalone tool completion is intentionally separate from Daily Program progress.
- Support is reachable and has Canada 9-8-8 / 9-1-1 language.
- Reminder architecture exists as browser-prototype settings, not verified real push.

**What is missing:**
- The new 11-tool canonical RESET catalogue is **not implemented**.
- Full source material for those RESET tools is **not present in the repo** as original DOCX/PDF/source files.
- `src/pathData.ts` contains historical/proposed tool titles, but not complete canonical instructions.
- `src/toolContent.ts` currently uses different tool IDs/names from the new RESET spec.
- Current ToolRunner presents source excerpt/full source, not one-step-at-a-time guided RESET action mode.
- PWA/offline architecture is **not implemented**; no manifest/service worker/cache files found.

**Recommendation:** Approve architecture only after owner reviews this report. Then build **one reference RESET**, preferably **90-Second Reset / Downshift**, only after canonical source and claims are recovered or supplied.

## 2. CURRENT RESET AUDIT

**Status:** PARTIAL / LEGACY-PROTOTYPE.

Evidence:
- `src/App.tsx` defines `ResetView = 'landing' | 'recommendation' | 'toolbox' | 'tool' | 'complete' | 'error'`.
- RESET landing shows primary needs and secondary needs from `resetNeeds`.
- Recommendation screen normally shows one highlighted primary tool but also exposes alternatives and Toolbox.
- `src/toolContent.ts` contains runtime tools such as `Mirror Breathwork`, `Hydration Reset`, `Immediate Movement`, `Evening Reset Protocol`, `Walk + Stretch Reset`.

Gap vs new spec:
- New flagship entries like `I HAVE 90 SECONDS`, `I'M HEADING HOME`, `I'M ABOUT TO REACT`, and `EVERYTHING FEELS OUT OF MY CONTROL` are not the current primary interface.
- Current routing uses older labels: `I'm overwhelmed`, `I'm stuck in my head`, `I need to ground`, etc.
- Current tools are not complete RESETs with WHAT / WHEN / TIME / WHY / STEPS / COMPLETION / SCIENCE / EVIDENCE.

## 3. CURRENT TOOLBOX AUDIT

**Status:** IMPLEMENTED AS 10 source-backed Journey practices; not the new canonical RESET catalogue.

Evidence:
- `docs/PATH_TO_RISE_PROMPT_6_CANONICAL_TOOL_MODEL_AND_MAPPING.md` lists 10 exposed tools.
- `src/toolContent.ts` has one canonical representation reused by RESET, Toolbox, favourites, recents, and Day-linked launch.
- Persisted Toolbox/RESET state is bounded to `favouriteToolIds`, `recentToolIds`, and `completedStandaloneToolIds` under `path-to-rise-toolbox-state-v1`.

Gap:
- Toolbox content is source-backed from Day 1–28, but it is not yet a production reset library.
- Browse-all design still exposes a library; RESET should remain need-first/action-first.

## 4. CURRENT SUPPORT AUDIT

**Status:** BASIC SUPPORT SURFACE IMPLEMENTED / REGIONAL CONFIG NOT PRODUCTION READY.

Evidence:
- `Support()` in `src/App.tsx` renders support levels and a crisis card.
- Copy includes: Canada only: call/text 9-8-8; immediate danger call 9-1-1; outside Canada use local emergency number/verified crisis service.

Gaps:
- No canonical support-resource configuration file.
- No jurisdiction-aware resource model.
- No SME/legal/privacy review.
- Support is accessible by tab, but tool-specific enhanced boundaries are not implemented.

## 5. CURRENT NAVIGATION AUDIT

**Status:** PASS for current locked shell; RESET master spec requires a deeper internal IA.

Current nav: `Today`, `Reset`, `My Path`, `Support`.

Recommendation:
- Keep bottom nav unchanged.
- Rebuild RESET internally as need-first routing, recommendation, preview, action mode, completion, evidence.
- Do not add a primary `Tools`, `Journal`, `AI`, `Settings`, or `Progress` tab for RESET.

## 6. CURRENT STATE / PERSISTENCE AUDIT

**Status:** IMPLEMENTED AS PROTOTYPE LOCALSTORAGE ONLY.

Current keys:
- `path-to-rise-program-progress-v1` — Day/program progress, Day 1 task progress, saved reflections.
- `path-to-rise-toolbox-state-v1` — favourites, recents, standalone completions.
- `path-to-rise-notification-preferences-v1` — reminder preferences.

Strengths:
- RESET/Toolbox completion does not mutate `currentDay` or `completedDays`.
- Need-selection history is not persisted.
- Reflection text is local-only and not analyzed.

Gaps:
- No production encryption/auth/account/delete/export model.
- No robust versioned migration layer for a future ResetTool model.
- No real backend/offline-safe persistence.

## 7. CURRENT PWA / OFFLINE AUDIT

**Status:** NOT IMPLEMENTED / NOT VERIFIED.

Evidence:
- No `manifest.json`, `sw.js`, or service-worker/cache file found in inspected repo.
- `index.html` and `vite.config.ts` contain no manifest/offline/cache implementation.
- Notification code detects `serviceWorker`/`PushManager`, but that is capability detection only.

Recommendation:
- Architect offline-compatible content/static model now.
- Do not claim offline RESET until service worker/cache behavior is implemented and tested.

## 8. CURRENT ACCESSIBILITY AUDIT

**Status:** PARTIAL AUTOMATED/STRUCTURAL FOUNDATIONS; HUMAN TESTING NOT VERIFIED.

Implemented signals:
- Semantic buttons/headings exist across many surfaces.
- CSS contains focus-visible and reduced-motion foundations per contract checks.
- Support and nav are text-labeled.

Not verified:
- iPhone VoiceOver.
- Android TalkBack.
- Large Text / dynamic text.
- One-handed real-device reach.
- 3 a.m. low-light test.
- Focus management through RESET step transitions because step mode is not implemented.

## 9. CANONICAL SOURCE INVENTORY

**Inspected source artifacts:**
- `src/programContent.ts` — generated 28-Day Journey, 28 days, source locations pointing to week DOCX blocks.
- `src/dayRoadmap.ts` — Day 1 task model + task-specific science matrix in code.
- `src/pathData.ts` — historical/proposed inventory of 20 tool titles and 7-day reset concepts.
- `src/toolContent.ts` — current runtime canonical tools (10).
- Prior docs under `docs/`, especially Prompt #6 and elite product architecture docs.

**Blocker:** Original canonical source files (`week-01-source.docx`, etc.) are **not present in this repo**. `programContent.ts` says it was generated from DOCX, but production-level source approval requires the actual documents or a locked canonical export.

## 10. HISTORICAL TOOL INVENTORY

Historical/proposed inventory in `src/pathData.ts` includes 20 titles: Reset Me Now, 90-Second Downshift, Hypervigilance Downshift, Respond vs React, Control Scan, Emotional Pressure Release, Post-Incident Grounding, End-of-Shift Reset, Car-Before-Home Transition, Difficult-Call Decompression, Sleep After Shift, Nighttime Brain Dump, Rest vs Numbing Check, Relationship Reset, Listen Without Fixing, Identity Separation, Retirement and Transition Reset, Moral Injury Grounding, Nature Reset, Get Back Up Plan.

Current runtime canonical tools in `src/toolContent.ts` are a different 10-tool set extracted from Days 1/10/15/16/20/28. This is the central catalogue mismatch.

## 11. DUPLICATE / SUPERSEDED ANALYSIS

- `Walk + Stretch Reset` overlaps with movement/nature/transition language but is currently Day 1 source-backed; do not treat it as Car-Before-Home.
- `Evening Reset Protocol` may overlap with Sleep Reset / End-of-Shift / Can't Switch Off, but should not silently replace them.
- `Post-Incident Grounding`, `Moral Injury Grounding`, and Difficult-Call Decompression may overlap in sensitive territory; enhanced boundary and source review required.
- `Relationship Reset` and `Listen Without Fixing` may belong in Toolbox/relationship support rather than core RESET.
- `Reset Me Now` may be an entry/routing label, not a separate intervention.

## 12. SOURCE CONFLICTS

**SC-RESET-001 — Catalogue conflict**
- Source A: New owner master spec requests 11 RESET tools.
- Source B: Current runtime `src/toolContent.ts` exposes 10 different source-backed Journey practices.
- Conflict: Names, purpose, model fields, source depth, and routing labels differ.
- Current behavior: RESET routes to existing Journey practices.
- Recommended resolution: Create a new canonical ResetTool registry only after source recovery; do not mutate current tools blindly.
- Owner decision required: Approve final catalogue and source authority.

**SC-RESET-002 — Source authority gap**
- Source A: `programContent.ts` references DOCX blocks.
- Source B: Original DOCX files are absent in repo.
- Conflict: Cannot fully verify exact canonical RESET instructions from source files.
- Recommended resolution: supply/recover canonical RESET source package or designate `programContent.ts` + prior docs as provisional source.

**SC-RESET-003 — Science/claims conflict**
- Source text includes overclaiming phrases such as “lowers stress hormones,” “signals safety,” etc.
- New spec forbids unsupported claims.
- Recommended resolution: preserve program instruction, but route scientific rationale through evidence registry and SME review.

## 13. FINAL PROPOSED CORE RESET CATALOGUE

Recommended primary catalogue pending source approval:

1. 90-Second Reset / Downshift
2. End-of-Shift Reset
3. Car-Before-Home Reset
4. Hypervigilance Downshift
5. Respond vs React
6. Control Scan
7. Rest vs Numbing Check
8. Emotional Pressure Release
9. Moral Injury Grounding
10. Identity Separation
11. Transition & Retirement Reset

Recommendation: keep the catalogue small. Do not add Bad Day / Midday / Sleep / Relationship / Tactical as separate production resets until source review proves uniqueness.

## 14. TOOLS NOT RECOMMENDED AS SEPARATE RESETS

- Reset Me Now — use as entry/shortcut label, not separate reset.
- Nature Reset — likely Toolbox or movement variant unless source proves a unique reset.
- Difficult-Call Decompression — likely sensitive variant/route into End-of-Shift or Moral Injury Grounding; source review required.
- Nighttime Brain Dump — likely Toolbox/Sleep support, not immediate RESET unless canonical source exists.
- Listen Without Fixing — relationship skill; likely Toolbox/support content.
- Get Back Up Plan — likely planning/content, not low-bandwidth RESET.

## 15. RESET HOME ARCHITECTURE

Primary architecture:

```txt
RESET HOME
→ human-language need/time buttons
→ ONE recommendation
→ concise preview: WHAT / WHEN / TIME / WHY
→ START
→ one step at a time
→ RESET complete
→ Done / Save as My Go-To / Why this can help / View evidence
```

Keep RESET home to a small set of flagship entries and one secondary `Help me choose`.

## 16. EXACT PROPOSED USER-FACING ENTRY LABELS

Primary labels:
- I HAVE 90 SECONDS
- I CAN'T SWITCH OFF
- I'M HEADING HOME
- I'M ABOUT TO REACT
- EVERYTHING FEELS OUT OF MY CONTROL
- HELP ME CHOOSE

Secondary / later after source approval:
- I'VE BEEN HOLDING TOO MUCH IN
- I NEED TO STEP OUT OF WORK MODE
- I'M CARRYING SOMETHING DIFFICULT

Avoid diagnostic labels like “hypervigilant,” “dysregulated,” or “trauma response” at entry.

## 17. CHOICE-COUNT ANALYSIS

Current RESET can show 5 primary needs plus 4 hidden secondary needs plus alternatives. Proposed RESET Home should show 5 flagship choices + Help Me Choose. Recommendation screen should usually show one primary recommendation and keep alternatives behind `Try something else`.

## 18. FLAGSHIP EXPERIENCE ARCHITECTURE

Flagship experiences should be fastest and clearest:
- 90 seconds → 90-Second Reset.
- Can't switch off → End-of-Shift / Identity Separation depending source.
- Heading home → Car-Before-Home.
- About to react → Respond vs React.
- Out of control → Control Scan.

Each should reach action within 2–3 meaningful taps for a new user and 1–2 taps for returning/My Go-To.

## 19. TRANSITION HOME ARCHITECTURE

Transition Home is the likely differentiator. It should combine routing, not duplicate tools:

```txt
I'M HEADING HOME
→ Recommend Car-Before-Home Reset
→ Safety: only while safely parked
→ Preview: transition ritual, not treatment
→ Start: one step at a time
→ Complete: enter home intentionally / Done
```

Do not imply the user must fix themselves before seeing family.

## 20. NEED-FIRST ROUTING MATRIX

| Entry | Primary | Status |
|---|---|---|
| I HAVE 90 SECONDS | 90-Second Reset | OWNER DECISION REQUIRED: source incomplete |
| I CAN'T SWITCH OFF | End-of-Shift or Identity Separation | OWNER DECISION REQUIRED |
| I'M HEADING HOME | Car-Before-Home | OWNER DECISION REQUIRED + vehicle safety |
| I'M ABOUT TO REACT | Respond vs React | OWNER DECISION REQUIRED |
| EVERYTHING FEELS OUT OF MY CONTROL | Control Scan | OWNER DECISION REQUIRED |
| I'VE BEEN HOLDING TOO MUCH IN | Emotional Pressure Release | OWNER DECISION REQUIRED + claims review |
| I'M CARRYING SOMETHING DIFFICULT | Moral Injury Grounding | ENHANCED BOUNDARY / SME REVIEW |

## 21. TIME-FIRST ROUTING MATRIX

| Time | Candidate | Rule |
|---|---|---|
| 30 sec | NOT APPROVED YET | Do not invent compressed version. |
| 90 sec | 90-Second Reset | Only if source duration includes reading/taps/exercise. |
| 3 min | Car-Before-Home / Respond vs React | Source timing required. |
| 5 min | Control Scan / Rest vs Numbing | Source timing required. |
| 10 min | longer reset or Toolbox | Do not overpromise immediate result. |

## 22. HELP-ME-CHOOSE LOGIC

Ask max 1–2 questions:
1. What do you need most right now? `Slow things down / Clear my head / Handle a reaction / Leave work at work / Prepare for rest`
2. How much time? `90 sec / 3 min / 5 min / 10 min`

Then return one recommendation. No mood survey, diagnosis, scoring, or profile.

## 23. MY-GO-TO LOGIC

Eligible reset can be saved explicitly by user. Store only `toolId` preference. Do not store why they used it, inferred state, emotional label, or sensitive context. My Go-To should offer `START` faster for returning use.

## 24. COMPLETE DETERMINISTIC ROUTING MATRIX

Routing model:

```ts
need + explicitTime + explicitContext + explicitPreference -> approvedToolId
```

No AI. No hidden inference. No journal analysis. No location/sensor/calendar assumptions. Invalid route falls back to RESET Home + Support.

## 25. COMPLETE INSTRUCTION MATRIX FOR EVERY PROPOSED RESET

| Reset | WHAT | WHEN | WHEN NOT / SAFETY | TIME | WHY | PREPARATION | EXACT STEPS | COMPLETION | SCIENCE/EVIDENCE | SUPPORT | STATUS |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 90-SECOND RESET / 90-Second Downshift | RESET candidate | Need-specific | Standard boundary; Support accessible | Source required | Source required | Source required | **NOT VERIFIED — source required** | Practice complete, not outcome | Evidence registry required | TBD | OWNER DECISION REQUIRED |
| END-OF-SHIFT RESET | RESET candidate | Need-specific | Standard boundary; Support accessible | Source required | Source required | Source required | **NOT VERIFIED — source required** | Practice complete, not outcome | Evidence registry required | TBD | OWNER DECISION REQUIRED |
| CAR-BEFORE-HOME RESET | RESET candidate | Need-specific | Standard; vehicle parked for vehicle-context tools; enhanced for Moral Injury | Source required | Source required | Source required | **NOT VERIFIED — source required** | Practice complete, not outcome | Evidence registry required | TBD | OWNER DECISION REQUIRED |
| HYPERVIGILANCE DOWNSHIFT | RESET candidate | Need-specific | Standard boundary; Support accessible | Source required | Source required | Source required | **NOT VERIFIED — source required** | Practice complete, not outcome | Evidence registry required | TBD | OWNER DECISION REQUIRED |
| RESPOND VS REACT | RESET candidate | Need-specific | Standard boundary; Support accessible | Source required | Source required | Source required | **NOT VERIFIED — source required** | Practice complete, not outcome | Evidence registry required | TBD | OWNER DECISION REQUIRED |
| CONTROL SCAN | RESET candidate | Need-specific | Standard boundary; Support accessible | Source required | Source required | Source required | **NOT VERIFIED — source required** | Practice complete, not outcome | Evidence registry required | TBD | OWNER DECISION REQUIRED |
| REST VS NUMBING CHECK | RESET candidate | Need-specific | Standard boundary; Support accessible | Source required | Source required | Source required | **NOT VERIFIED — source required** | Practice complete, not outcome | Evidence registry required | TBD | OWNER DECISION REQUIRED |
| EMOTIONAL PRESSURE RELEASE | RESET candidate | Need-specific | Standard boundary; Support accessible | Source required | Source required | Source required | **NOT VERIFIED — source required** | Practice complete, not outcome | Evidence registry required | TBD | OWNER DECISION REQUIRED |
| MORAL INJURY GROUNDING | RESET candidate | Need-specific | Standard; vehicle parked for vehicle-context tools; enhanced for Moral Injury | Source required | Source required | Source required | **NOT VERIFIED — source required** | Practice complete, not outcome | Evidence registry required | TBD | OWNER REVIEW REQUIRED |
| IDENTITY SEPARATION | RESET candidate | Need-specific | Standard boundary; Support accessible | Source required | Source required | Source required | **NOT VERIFIED — source required** | Practice complete, not outcome | Evidence registry required | TBD | OWNER DECISION REQUIRED |
| TRANSITION & RETIREMENT RESET | RESET candidate | Need-specific | Standard boundary; Support accessible | Source required | Source required | Source required | **NOT VERIFIED — source required** | Practice complete, not outcome | Evidence registry required | TBD | OWNER DECISION REQUIRED |

## 26. 90-SECOND RESET / 90-Second Downshift SPECIFICATION

**Status:** OWNER DECISION REQUIRED  
**Repository evidence:** Present in `src/pathData.ts` as TOOL-02 and earlier planning docs; not implemented in `src/toolContent.ts`; no full steps found in generated `programContent.ts`.  
**Recommendation:** Strong recommended reference reset, but canonical instructions/source/evidence must be supplied or recovered before build.

Required before implementation:
- Recover canonical source text.
- Fill WHAT / WHEN / WHEN NOT / TIME / WHY / PREPARATION / EXACT STEPS / COMPLETION.
- Classify science claims through evidence registry.
- Add claims-to-avoid list.
- Define support level and resume policy.
- Owner approval required.

## 27. END-OF-SHIFT RESET SPECIFICATION

**Status:** OWNER DECISION REQUIRED  
**Repository evidence:** Present in `src/pathData.ts` as TOOL-08 and planning docs; not implemented in current runtime canonical tools.  
**Recommendation:** Keep as flagship candidate; source mapping incomplete.

Required before implementation:
- Recover canonical source text.
- Fill WHAT / WHEN / WHEN NOT / TIME / WHY / PREPARATION / EXACT STEPS / COMPLETION.
- Classify science claims through evidence registry.
- Add claims-to-avoid list.
- Define support level and resume policy.
- Owner approval required.

## 28. CAR-BEFORE-HOME RESET SPECIFICATION

**Status:** OWNER DECISION REQUIRED  
**Repository evidence:** Present in `src/pathData.ts` as TOOL-09; not implemented in runtime canonical tools.  
**Recommendation:** Keep as transition-home candidate with parked-only vehicle safety.

Required before implementation:
- Recover canonical source text.
- Fill WHAT / WHEN / WHEN NOT / TIME / WHY / PREPARATION / EXACT STEPS / COMPLETION.
- Classify science claims through evidence registry.
- Add claims-to-avoid list.
- Define support level and resume policy.
- Owner approval required.

## 29. HYPERVIGILANCE DOWNSHIFT SPECIFICATION

**Status:** OWNER DECISION REQUIRED  
**Repository evidence:** Present in `src/pathData.ts` and some generated source mentions hypervigilance-related concepts, but no complete reset definition exists.  
**Recommendation:** Keep with non-diagnostic wording if source is recovered.

Required before implementation:
- Recover canonical source text.
- Fill WHAT / WHEN / WHEN NOT / TIME / WHY / PREPARATION / EXACT STEPS / COMPLETION.
- Classify science claims through evidence registry.
- Add claims-to-avoid list.
- Define support level and resume policy.
- Owner approval required.

## 30. RESPOND VS REACT SPECIFICATION

**Status:** OWNER DECISION REQUIRED  
**Repository evidence:** Present in `src/pathData.ts` as TOOL-04; no complete runtime reset.  
**Recommendation:** Keep as flagship reaction-space tool if canonical steps exist.

Required before implementation:
- Recover canonical source text.
- Fill WHAT / WHEN / WHEN NOT / TIME / WHY / PREPARATION / EXACT STEPS / COMPLETION.
- Classify science claims through evidence registry.
- Add claims-to-avoid list.
- Define support level and resume policy.
- Owner approval required.

## 31. CONTROL SCAN SPECIFICATION

**Status:** OWNER DECISION REQUIRED  
**Repository evidence:** Present in `src/pathData.ts` as TOOL-05; current runtime has Non-Dominant Hand Training routed to control need, not Control Scan.  
**Recommendation:** Keep as separate reset if source confirms exact process.

Required before implementation:
- Recover canonical source text.
- Fill WHAT / WHEN / WHEN NOT / TIME / WHY / PREPARATION / EXACT STEPS / COMPLETION.
- Classify science claims through evidence registry.
- Add claims-to-avoid list.
- Define support level and resume policy.
- Owner approval required.

## 32. REST VS NUMBING CHECK SPECIFICATION

**Status:** OWNER DECISION REQUIRED  
**Repository evidence:** Present in `src/pathData.ts` as TOOL-13; not implemented in runtime canonical tools.  
**Recommendation:** Likely keep as check-style reset; avoid shame language.

Required before implementation:
- Recover canonical source text.
- Fill WHAT / WHEN / WHEN NOT / TIME / WHY / PREPARATION / EXACT STEPS / COMPLETION.
- Classify science claims through evidence registry.
- Add claims-to-avoid list.
- Define support level and resume policy.
- Owner approval required.

## 33. EMOTIONAL PRESSURE RELEASE SPECIFICATION

**Status:** OWNER DECISION REQUIRED  
**Repository evidence:** Present in `src/pathData.ts` as TOOL-06; related generated source contains emotional-suppression material, but no complete production reset model.  
**Recommendation:** Keep only with source/evidence review and no “stored trauma/energy release” claims.

Required before implementation:
- Recover canonical source text.
- Fill WHAT / WHEN / WHEN NOT / TIME / WHY / PREPARATION / EXACT STEPS / COMPLETION.
- Classify science claims through evidence registry.
- Add claims-to-avoid list.
- Define support level and resume policy.
- Owner approval required.

## 34. MORAL INJURY GROUNDING SPECIFICATION

**Status:** OWNER REVIEW REQUIRED  
**Repository evidence:** Present in `src/pathData.ts` as TOOL-18; not implemented in runtime canonical tools; high sensitivity.  
**Recommendation:** Keep as enhanced-boundary candidate, not reference reset.

Required before implementation:
- Recover canonical source text.
- Fill WHAT / WHEN / WHEN NOT / TIME / WHY / PREPARATION / EXACT STEPS / COMPLETION.
- Classify science claims through evidence registry.
- Add claims-to-avoid list.
- Define support level and resume policy.
- Owner approval required.

## 35. IDENTITY SEPARATION SPECIFICATION

**Status:** OWNER DECISION REQUIRED  
**Repository evidence:** Present in `src/pathData.ts` as TOOL-16; not implemented in runtime canonical tools.  
**Recommendation:** Keep as life-beyond-role reset if source is complete.

Required before implementation:
- Recover canonical source text.
- Fill WHAT / WHEN / WHEN NOT / TIME / WHY / PREPARATION / EXACT STEPS / COMPLETION.
- Classify science claims through evidence registry.
- Add claims-to-avoid list.
- Define support level and resume policy.
- Owner approval required.

## 36. TRANSITION & RETIREMENT RESET SPECIFICATION

**Status:** OWNER DECISION REQUIRED  
**Repository evidence:** Present in `src/pathData.ts` as TOOL-17; not implemented in runtime canonical tools.  
**Recommendation:** Keep as later-stage / retirement-life reset, not first reference.

Required before implementation:
- Recover canonical source text.
- Fill WHAT / WHEN / WHEN NOT / TIME / WHY / PREPARATION / EXACT STEPS / COMPLETION.
- Classify science claims through evidence registry.
- Add claims-to-avoid list.
- Define support level and resume policy.
- Owner approval required.

## 37. BAD DAY RESET DETERMINATION

**Status:** NOT FOUND AS CANONICAL SOURCE IN RUNTIME. **Recommendation:** Treat as archive/owner-review until source is found.

## 38. MIDDAY RESET DETERMINATION

**Status:** NOT FOUND AS CANONICAL SOURCE IN RUNTIME. **Recommendation:** Likely routing/time context, not separate reset unless source appears.

## 39. SLEEP RESET DETERMINATION

**Status:** NOT FOUND BY THAT NAME; related `Evening Reset Protocol` exists in runtime. **Recommendation:** Determine whether sleep reset merges into Evening Reset or remains separate.

## 40. RELATIONSHIP RECONNECTION / RELATIONSHIP RESET DETERMINATION

**Status:** `Relationship Reset` exists in `src/pathData.ts` only. **Recommendation:** Owner-review; may be support/toolbox, not core RESET.

## 41. EMOTIONAL SHUTDOWN RECOVERY DETERMINATION

**Status:** NOT FOUND AS CANONICAL SOURCE IN RUNTIME. **Recommendation:** Owner-review/archive.

## 42. 5-MINUTE TACTICAL RESET DETERMINATION

**Status:** NOT FOUND AS CANONICAL SOURCE IN RUNTIME. **Recommendation:** Do not invent.

## 43. RESET PREVIEW UX

Card: Tool name, estimated time, use-this-when, what this is, why you are doing it, primary START, secondary Why this can help. No giant page.

## 44. ACTION MODE UX

After START show one step only. Hide evidence, other tools, library, settings, and long rationale.

## 45. GUIDED MODE UX

Step-by-step with progress labels, NEXT, EXIT, and Support link where appropriate.

## 46. COMPACT MODE UX

For returning users: concise sequence derived from same source, never separate content.

## 47. AUTO-ADVANCE DETERMINATION

Default manual until source/user tests support auto-advance. Never make the user race.

## 48. COMPLETION UX

Reset Complete, You completed the practice, Done, Save as My Go-To, Use again. No outcome rating.

## 49. EXIT UX

Exit anytime with neutral copy: Back / Done for now. No guilt confirmation.

## 50. QUICK-START UX

Returning users should have My Go-To and Recent; START within 1–2 taps.

## 51. FIRST-USE UX

WHAT / WHEN / TIME / WHY before START, concise and source-faithful.

## 52. TWENTIETH-USE UX

Skip education; show Start now and optional Review instructions.

## 53. PROGRESSIVE DISCLOSURE MODEL

Need → Recommendation → Preview → Action → Completion → Why/Evidence optional.

## 54. CONTEXTUAL SHORTCUTS / DEEP LINKS

Today may link to 90 seconds / Heading home / My Go-To. Deep links must validate toolId and not mutate program progress.

## 55. TAP-COUNT ANALYSIS

Target new user 2–3 meaningful taps after need; returning 1–2. Safety/clarity override.

## 56. DECISION-COUNT ANALYSIS

Avoid asking state + need + time + context unless needed. Help Me Choose max two questions.

## 57. WORD-BURDEN ANALYSIS

Before action: target under ~80–120 words for preview. Move evidence behind disclosure.

## 58. TIME-TO-ACTION ANALYSIS

Measure open RESET → first instruction. Do not count only route load; include reading/tap burden.

## 59. SCIENCE ARCHITECTURE

Science supports rationale, not source instruction. Each reset needs `scienceSummary`, `evidenceIds`, `evidenceStatus`, `claimsToAvoid`, `lastEvidenceReview`. Do not repeat generic paragraphs.

## 60. EVIDENCE REGISTRY ARCHITECTURE

Use EvidenceRecord with claim, plain summary, source citation, evidence strength, limitations, review status.

## 61. EVIDENCE GOVERNANCE LIFECYCLE

Evidence added → claim reviewed → owner/SME approved → deployed → periodic review → retain/update/remove.

## 62. CLAIMS AUDIT

Initial audit flags current source/program copy as containing overclaims; new RESET UI must use conservative language.

## 63. CONTENT VERSIONING

Each ResetTool gets contentVersion, evidenceVersion, ownerApprovalStatus, sourceVersion, last review dates.

## 64. PRIVACY MODEL

Store explicit preferences/tool IDs only. No emotional surveillance, no incident text, no employer access.

## 65. DATA-MINIMIZATION MODEL

Minimum now: favouriteToolIds, recentToolIds, completion IDs. No need history unless explicitly approved.

## 66. INTERACTION PERSONALIZATION MODEL

Convenience personalization only: My Go-To, recent, mode preference. No psychological profiling.

## 67. FAVOURITES / MY GO-TO

My Go-To is explicit and reversible. It speeds access but does not imply diagnosis.

## 68. RECENTLY USED

Use only if it reduces friction. Bound list size; store tool IDs only.

## 69. SUPPORT ARCHITECTURE

Support tab remains global. Tool-specific support level controls visibility within sensitive tools.

## 70. TOOL-SPECIFIC SUPPORT LEVELS

STANDARD, VISIBLE_SUPPORT, ENHANCED_BOUNDARY. Moral Injury and vehicle tools need stronger boundaries.

## 71. MORAL INJURY SAFETY BOUNDARY

Ground/stabilize/create space only. No narrative request, treatment claim, confession, judgment, exposure.

## 72. VEHICLE SAFETY

Vehicle-context tools require safely parked language before interactive steps.

## 73. REMINDER ARCHITECTURE

Future consent-based reminders for end-of-shift, transition home, prepare for rest. User selects timing.

## 74. REMINDER DELIVERY STATUS

Current browser prototype reminders are architecture/browser-tab only. Real lock-screen/background delivery NOT VERIFIED.

## 75. DISCREET NOTIFICATION MODEL

Use neutral copy such as “Your PATH reset is ready.” Avoid trauma/PTSD/dysregulated lock-screen copy.

## 76. SHIFT-AWARE FUTURE COMPATIBILITY

Support day/night/rotating/on-call/off-duty/retired as explicit user choices later; do not infer.

## 77. OFFLINE ARCHITECTURE

No current offline implementation. Future: static ResetTool registry cached after first load, no evidence fetch required before action.

## 78. LOW-CONNECTIVITY BEHAVIOR

Core text-based reset should function from cached app; unsupported today.

## 79. PERFORMANCE ARCHITECTURE

Do not block action on analytics, images, evidence fetch, favourites, or remote services.

## 80. INTERRUPTION RESILIENCE

Each tool declares RESTART/RESUME/ASK_TO_RESUME. Not implemented for RESET step mode yet.

## 81. RESUME / RESTART POLICIES

Short tools default RESTART; longer tools may ASK_TO_RESUME. Store minimal step index only if approved.

## 82. FAILURE STATES

Invalid route/tool, missing source, corrupted local state, offline, favourite failure, reminder unavailable all need safe recovery.

## 83. ACCESSIBILITY ARCHITECTURE

Large targets, logical headings, focus on step change, Reduced Motion, no color-only status, no sound requirement.

## 84. ONE-HANDED UX

Primary START/NEXT/DONE should be reachable and consistently placed in mobile viewport.

## 85. LARGE-TEXT UX

Must test before claiming. Avoid clipped cards and hidden buttons.

## 86. SCREEN-READER UX

Step changes need focus/announcement strategy; not verified.

## 87. REDUCED-MOTION UX

Respect existing CSS foundation; no intervention depends on animation.

## 88. NO-SOUND UX

Core RESET is text/action based; audio future only.

## 89. AUDIO-READY ARCHITECTURE

Step model can support audio later but V1 should not wait for it.

## 90. HAPTIC-READY ARCHITECTURE

Optional/subtle/future only; no core dependency.

## 91. MOBILE ERGONOMICS

Use one-screen/one-job, big buttons, minimal decision count, no library walls.

## 92. 3-SECOND TEST

RESET Home should immediately answer: where am I, what can I press, what happens next.

## 93. 10-SECOND TEST

Returning user should reach useful action via My Go-To/Recent extremely quickly.

## 94. 3 A.M. TEST

Low-light tired user should see one obvious action; verify physically later.

## 95. PARKING-GARAGE TEST

Car-Before-Home must work while safely parked with poor connection; not verified.

## 96. TIRED-FIRST-RESPONDER TEST

If the screen reads like an article, it fails. Action first.

## 97. NO-GUESSING TEST

Every reset must include exact HOW steps. Current tools often expose raw source copy, not guided instructions.

## 98. NO-WORKBOOK TEST

RESET must require no external notebook/PDF. Some current source tasks require paper; production RESET must adapt or owner decides.

## 99. NO-INSTRUCTIONS-FROM-DESIGNER TEST

Owner/user should use without explanation; pending human testing.

## 100. FIRST-USE / TWENTIETH-USE TEST

Architecture must support preview education for first use and compact fast start for repeated use.

## 101. HUMAN USABILITY TEST PLAN

Run realistic tasks: 90 seconds, heading home, about to react, find why, save My Go-To. Measure time/taps/wrong taps/questions.

## 102. FIRST-RESPONDER VALIDATION PLAN

Active, shift, retired responder review after reference reset prototype, not before source approval.

## 103. SME / EVIDENCE REVIEW PLAN

Evidence/claims reviewer must approve science summaries and claims-to-avoid before production claims.

## 104. INTERNAL QUALITY SCORECARD

Score each reset internally on time-to-action, clarity, completeness, mobile, accessibility, source fidelity, science, privacy, safety.

## 105. CANONICAL TECHNICAL ARCHITECTURE

Add `resetContent.ts` / `resetRouting.ts` / `resetEvidence.ts` only after owner approval; do not parallel duplicate Toolbox content.

## 106. DATA MODEL

Use conceptual ResetTool model from spec; implement minimally after approval.

## 107. STEP MODEL

ResetStep: id, toolId, order, title, instruction, supportingDetail, estimatedSeconds, optional, accessibilityLabel.

## 108. ROUTING MODEL

ResetRoute: userFacingNeed, aliases, contexts, timeConstraints, primaryToolId, fallback, rationale, ownerApproved.

## 109. STATE MODEL

In-memory active reset session; localStorage only for explicit favourites/recent/completion/resume if approved.

## 110. PERSISTENCE MODEL

No sensitive narrative. Store tool IDs and step index only; clear/reset controls required.

## 111. CACHE / OFFLINE MODEL

Future service worker/cache of static reset registry; not current.

## 112. COMPONENT ARCHITECTURE

ResetHome, NeedButton, RecommendationCard, ResetPreview, ActiveStep, ResetComplete, EvidencePanel, SupportBoundary.

## 113. AUTOMATED CONTENT VALIDATION

Validate no missing ID/source/WHAT/WHEN/WHY/steps/completion/support/resume/evidence status.

## 114. AUTOMATED FUNCTIONAL TEST PLAN

Need→tool, time→tool, invalid route, deep link, favourite, My Go-To, resume, completion, exit, RESET not advancing Day.

## 115. REGRESSION TEST PLAN

Verify Today, Reset, My Path, Support, Day 1 roadmap, Day 28/no Day 29, privacy/storage boundaries.

## 116. REAL-DEVICE TEST PLAN

iPhone Safari first; Android Chrome; Large Text; VoiceOver/TalkBack later.

## 117. ERROR / RECOVERY TEST PLAN

Missing tool/source, corrupt storage, unavailable notification, offline, invalid route all recover.

## 118. PRIVACY / SAFETY TEST PLAN

No incident collection, no hidden emotional state, no unsafe vehicle interaction, support reachable.

## 119. RED-TEAM FINDINGS

Biggest risk: building an impressive RESET library before source/claims are complete. Second risk: treating prior 10-tool Toolbox as the final RESET catalogue.

## 120. P0 RISKS

Wrong intervention, unsafe driving instruction, support unavailable, day progress corruption, private data exposure, unsupported clinical claim.

## 121. P1 RISKS

Too many choices, vague HOW, wrong duration, duplicate tools, science overclaim, poor Large Text/screen reader, repeated education burden.

## 122. P2 RISKS

Information density, library wall, overlong preview, confusing Toolbox/RESET difference.

## 123. WHAT SHOULD BE REMOVED

Do not expose all tool names on RESET Home; do not show alternatives by default; remove raw long source dumps from action mode.

## 124. WHAT SHOULD NOT BE BUILT

No AI therapist, diagnostics, mood scoring, streaks, wearables/GPS, social feed, employer dashboard, trauma narrative collection.

## 125. RECOMMENDED SINGLE REFERENCE RESET

90-Second Reset / Downshift, pending source recovery.

## 126. WHY IT SHOULD BE FIRST

It best tests time-to-action, need-first routing, preview/action/completion, compact mode, evidence, favourites, interruption, mobile ergonomics.

## 127. EXACT REFERENCE DEFINITION OF DONE

All source/evidence/content/safety/privacy/accessibility/test boxes from owner spec Section 129 must pass; physical iPhone owner test required before scaling.

## 128. EXACT OWNER DECISIONS REQUIRED

1) Confirm source authority package. 2) Approve final 11-tool catalogue. 3) Approve first reference reset. 4) Approve evidence wording standard and SME owner. 5) Approve whether old 10 Toolbox tools remain as Toolbox-only.

## 129. CURRENT BLOCKERS

Original DOCX/source files missing; new RESET source instructions incomplete in repo; evidence registry not built; PWA/offline not implemented; physical/accessibility/SME/legal review not verified.

## 130. EXACT FILES / COMPONENTS EXPECTED TO CHANGE DURING REFERENCE IMPLEMENTATION

Expected after approval only: `src/resetContent.ts`, `src/resetRouting.ts`, `src/resetEvidence.ts`, `src/App.tsx` RESET components, `src/App.css`, tests under `scripts/`, docs. Do not modify Days 1–28 unless owner explicitly approves.

## 131. DECISION LOG

DL-RESET-001: Do audit only now — APPROVED BY OWNER SPEC. DL-RESET-002: Recommend 90-Second Reset first — PROPOSED / OWNER APPROVAL REQUIRED. DL-RESET-003: Treat current 10 tools as legacy runtime Toolbox, not final RESET catalogue — PROPOSED. DL-RESET-004: Require source recovery before implementation — PROPOSED.

---

## MOBILE WIREFRAMES REQUIRED

```txt
RESET HOME
[PATH RESET]
What do you need right now?
[ I HAVE 90 SECONDS ]
[ I CAN'T SWITCH OFF ]
[ I'M HEADING HOME ]
[ I'M ABOUT TO REACT ]
[ EVERYTHING FEELS OUT OF MY CONTROL ]
[ HELP ME CHOOSE ]
[ Support ]
```

```txt
I HAVE 90 SECONDS
You said: I HAVE 90 SECONDS
PATH recommends: 90-SECOND RESET
About 90 seconds
[ START RESET ]
[ Why this tool ] [ Support ]
```

```txt
I CAN'T SWITCH OFF
You said: I CAN'T SWITCH OFF
PATH recommends: END-OF-SHIFT RESET or IDENTITY SEPARATION
OWNER DECISION REQUIRED until source mapping resolves primary.
[ START ] [ Try something else ]
```

```txt
I'M HEADING HOME
You said: I'M HEADING HOME
PATH recommends: CAR-BEFORE-HOME RESET
Use only while safely parked.
[ START RESET ]
```

```txt
I'M ABOUT TO REACT
PATH recommends: RESPOND VS REACT
A short pause before next action.
[ START RESET ]
```

```txt
EVERYTHING FEELS OUT OF MY CONTROL
PATH recommends: CONTROL SCAN
Find the next controllable action.
[ START RESET ]
```

```txt
HELP ME CHOOSE
What do you need most?
[ Slow things down ] [ Clear my head ]
[ Handle a reaction ] [ Leave work at work ]
[ Prepare for rest ]
Then: one recommendation.
```

```txt
RECOMMENDATION
TOOL NAME
Time
Use when
One-line why
[ START RESET ]
[ Why this can help ] [ Try something else ]
```

```txt
WHAT / WHEN / WHY
WHAT THIS IS
WHEN TO USE IT
WHEN NOT / SAFETY
HOW LONG
WHY YOU'RE DOING IT
[ START ]
```

```txt
START / ACTIVE STEP
TOOL NAME
Step 1 of N
[ canonical instruction ]
[ NEXT ]
[ Exit ] [ Support ]
```

```txt
GUIDED MODE
Step card only. One instruction. One primary NEXT.
```

```txt
COMPACT MODE
Tool name
1. Step
2. Step
3. Step
[ Done ]
```

```txt
RESET COMPLETE
You completed the practice.
[ DONE ] [ SAVE AS MY GO-TO ] [ USE AGAIN ]
```

```txt
WHY THIS CAN HELP
2–4 short sentences.
[ View evidence ]
```

```txt
VIEW EVIDENCE
Claim supported
Plain-language evidence
Limitations
References
```

```txt
MY GO-TO
Your saved reset
[ START ] [ Change ]
```

```txt
RECENT
Recently used reset IDs only.
[ START ]
```

```txt
SUPPORT ACCESS
Support is available from RESET Home, preview, active step, completion, and sensitive-tool boundaries.
```

```txt
ERROR / RECOVERY
This reset cannot be opened right now.
[ Choose another reset ] [ Toolbox ] [ Support ]
```

```txt
OFFLINE STATE
If cached: You can use saved RESET tools offline.
If not cached: Connection is needed to load PATH. Support emergency numbers remain visible where cached.
```

---

## RED TEAM + SIMPLIFICATION RESULT

Removed/rejected from immediate build scope:
- all-tool library wall on RESET Home;
- AI/generative routing;
- mood/stress scoring;
- incident narratives;
- employer/supervisor data;
- streaks/gamification;
- real push/offline claims;
- all 11 tools in one build pass.

Primary simplification:
```txt
NEED → ONE RECOMMENDATION → START → ONE STEP → DONE
```

---

## A. RECOMMENDED RESET ARCHITECTURE

Need-first, deterministic, one-recommendation RESET with progressive disclosure and source-backed one-step-at-a-time action mode. RESET must use a single canonical ResetTool registry shared with Toolbox/Favourites/Recents, but presentation differs by context.

## B. RECOMMENDED FINAL TOOL CATALOGUE

Approve the 11-tool catalogue listed in Section 13 only after source recovery. Treat old/historical tools as merge/archive/owner-review until proven unique.

## C. RECOMMENDED FIRST REFERENCE RESET

90-Second Reset / 90-Second Downshift — because it best proves speed, action mode, duration integrity, compact mode, evidence handling, favourites, interruption, and mobile ergonomics. **Do not build until canonical source/steps/evidence are recovered or owner-approved.**

## D. OWNER DECISIONS REQUIRED

1. What is the canonical source authority for RESET tools: original DOCX/source package, `src/pathData.ts`, prior docs, or a new owner-supplied source document?
2. Approve or revise the 11-tool catalogue.
3. Approve 90-Second Reset as the one reference build.
4. Decide whether existing 10 runtime tools remain Toolbox-only during RESET rebuild.
5. Assign evidence/SME review owner before science claims become production copy.

## E. BLOCKERS / NOT VERIFIED

- Original source DOCX files are missing from repo.
- Complete canonical instructions for the 11 RESET tools are not present in runtime source.
- Evidence registry is not implemented.
- Offline/PWA is not implemented.
- Physical iPhone/Android, VoiceOver/TalkBack, Large Text, clinical/SME, legal/privacy, and first-responder validation are NOT VERIFIED.
- No implementation should begin until owner approval.

RESET SYSTEM MASTER CANONICAL AUDIT + ELITE PRODUCT / UX / ENGINEERING ARCHITECTURE COMPLETE — READY FOR OWNER APPROVAL TO BUILD ONE REFERENCE RESET
