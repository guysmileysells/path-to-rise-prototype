# PATH TO RISE — MASTER PROJECT HANDOFF

Generated: 2026-10-05 16:26 PDT  
Purpose: project preservation / disaster-recovery / AI engineering handoff.  
Scope: repository evidence only. This document is not a feature implementation and does not authorize new app code.

---

## 1. Executive project identity

**Product:** PATH to RISE Wellness for First Responders  
**Core program:** 4-Week / 28-Day Nervous System Reset  
**Primary audience:** first responders and related users, including active, shift-working, transitioning, and retired personnel; supportive/loved-one use is secondary and must remain within product evidence and safety boundaries.

**Core product principle:**

```txt
MAKE EVERY TAP EARN ITS PLACE.
```

**Operating principle:**

```txt
THE APP REMEMBERS THE PLAN.
THE USER ONLY NEEDS TO TAKE THE NEXT STEP.

THE USER CARRIES THE LIFE.
PATH CARRIES THE LOGISTICS.
```

**Positioning:** PATH is intended to function as a practical daily operating system for life in — and after — the uniform, not as a generic wellness content library.

**Boundaries:** wellness, education, skill-building, and self-guided practices only. PATH is not therapy, diagnosis, medical treatment, emergency care, or a replacement for professional/crisis support.

---

## 2. Repository authority rule

Future agents must treat the repository, canonical source files, verified Git history, and current owner instructions as higher authority than remembered or reconstructed chat context.

If this handoff conflicts with current canonical source or a current owner instruction:

```txt
STOP AND RESOLVE THE CONFLICT.
```

Never trust chat memory over repository evidence.

---

## 3. Current Git state

**Branch:** `master`

**HEAD:**

```txt
b0fe531154e7e34b6b6e9c31853c0c6da771d445
b0fe531 Record Prompt 13 tunnel rotation after feedback
```

**Verified tag/checkpoint:**

```txt
path-to-rise-prompt-1-12-rc1
→ 045af500ff6901fa56494d33512cfd6e8d3c8311
→ 045af50 chore: checkpoint prompt 1-12 release candidate
```

**Other verified historical commits:**

```txt
d4286a34a25adcb068e613aba7b3ffd0c49f5047 — docs: add controlled private preview handoff
ad65585fe38bbbf6f96b1ad940e932d245ca7266 — docs: record prompt 13 final decision package
d7beca6af09e34ad9162f6f69c73d8b8a2bee23b — docs: record active stage 1 tunnel rotation
```

**Recent history at handoff:**

```txt
b0fe531 (HEAD -> master) Record Prompt 13 tunnel rotation after feedback
e97b2c3 Record Prompt 13 task separation request
d7f48a4 Record Prompt 13 tunnel restart
6aa17f8 Fix Prompt 13 Day detail visibility
89e0b93 Record Prompt 13 tunnel rotation
943ed2a Refine Prompt 13 mobile density
d7beca6 docs: record active stage 1 tunnel rotation
e22dba7 docs: add prompt 13 mobile ux density audit
03053cb docs: record active stage 1 tunnel rotation
51b51c8 docs: record stage 1 mobile density finding
f02dd5f docs: record stage 1 https access workaround
eca3eb4 docs: prepare prompt 13 stage 1 owner access
ad65585 docs: record prompt 13 final decision package
f0f9da5 docs: prepare prompt 13 validation package
d4286a3 docs: add controlled private preview handoff
045af50 (tag: path-to-rise-prompt-1-12-rc1) chore: checkpoint prompt 1-12 release candidate
cf8882d Create PATH to RISE shareable prototype preview
```

---

## 4. Current working tree classification

The worktree is dirty. Do not clean, reset, revert, stash, discard, or overwrite uncommitted work without explicit owner approval.

### Configuration

- `.gitignore` — modified.

### Documentation

- `docs/PATH_TO_RISE_PROMPT_13_EVIDENCE_REGISTER.md` — modified.
- `docs/PATH_TO_RISE_PROMPT_13_FINDINGS_AND_FEATURE_REQUEST_REGISTER.md` — modified.
- `docs/PATH_TO_RISE_PROMPT_13_STAGE_1_OWNER_ACCESS.md` — modified.
- `docs/PREVIEW_RELEASE.md` — modified.

### DAY 1 WORK — PROTECT

These files represent current uncommitted Day 1 / Daily Action / mobile UX / task-roadmap work and must not be overwritten or discarded:

- `package.json` — modified; adds/uses `day-roadmap` test script.
- `src/App.css` — modified; Day 1 roadmap/task UI styling.
- `src/App.tsx` — modified; Day 1 roadmap/task UI and completion behavior.
- `src/progressContent.ts` — modified; progress model integration.
- `.hermes/plans/2026-10-04-daily-action-system-plan.md` — untracked.
- `.hermes/plans/2026-10-04-day-1-ordered-roadmap-plan.md` — untracked.
- `docs/PATH_TO_RISE_DAILY_ACTION_SYSTEM_IMPLEMENTATION_PLAN.md` — untracked.
- `docs/PATH_TO_RISE_DAILY_TASK_BY_TASK_ARCHITECTURE.md` — untracked.
- `docs/PATH_TO_RISE_DAY_1_ORDERED_ROADMAP_IMPLEMENTATION_PLAN.md` — untracked.
- `docs/PATH_TO_RISE_DAY_1_TASK_SCIENCE_MATRIX.md` — untracked.
- `docs/PATH_TO_RISE_ELITE_PRODUCT_DIFFERENTIATION_ARCHITECTURE.md` — untracked.
- `docs/PATH_TO_RISE_ELITE_UX_PRODUCT_EXPERIENCE_BLUEPRINT.md` — untracked.
- `docs/PATH_TO_RISE_WORDS_ALONG_THE_WAY_VALIDATION_REPORT.md` — untracked.
- `scripts/day-roadmap-scenarios.mjs` — untracked.
- `src/dayRoadmap.ts` — untracked.

### RESET / preservation docs

- `docs/PATH_TO_RISE_RESET_SYSTEM_MASTER_CANONICAL_AUDIT_ARCHITECTURE.md` — untracked RESET audit/architecture report.
- `docs/PATH_TO_RISE_MASTER_HANDOFF.md` — this preservation handoff.

### Current checkpoint status

```txt
CHECKPOINT REQUIRES SEPARATION OF EXISTING WORK
```

Reason: the working tree mixes uncommitted Day 1 application work, RESET documentation, Prompt #13 preview/evidence docs, configuration, and this preservation handoff. Do not blindly commit everything as a single clean checkpoint without owner approval.

---

## 5. Product architecture status

| Area | Current status | Evidence / notes |
|---|---|---|
| Home / Today | IMPLEMENTED / modified by uncommitted Day 1 work | `src/App.tsx`; current runtime not freshly browser-verified in this preservation pass. |
| Days 1–28 | IMPLEMENTED from generated source content; Day 1 has uncommitted roadmap refactor | `src/programContent.ts`, `src/dayRoadmap.ts`, `src/App.tsx`. |
| Daily Tasks | PARTIAL / Day 1 WIP | Day 1 task-roadmap files exist; Days 2–28 are not confirmed as scaled to the same architecture. |
| Task Detail | PARTIAL / Day 1 WIP | `DayExperience` and `src/dayRoadmap.ts`; protect current WIP. |
| My Path | IMPLEMENTED / modified | `MyPath` in `src/App.tsx`; progress logic in `src/progressContent.ts`. |
| RESET | IMPLEMENTED LEGACY PROTOTYPE; new RESET system not implemented | `ResetExperience`, `ResetView`, `src/toolContent.ts`. |
| Toolbox | IMPLEMENTED as 10 Journey/source-backed tools | `src/toolContent.ts`, `Toolbox`, `ToolRunner`. |
| Words Along the Way | PLANNED / documentation present; not verified as complete runtime feature | `docs/PATH_TO_RISE_WORDS_ALONG_THE_WAY_VALIDATION_REPORT.md`, Day 1 roadmap data includes a Day 1 entry. |
| Support | IMPLEMENTED basic support surface | `Support()` in `src/App.tsx`; crisis copy remains region-bound and not production-reviewed. |
| Reminders | PARTIAL prototype architecture | `src/notificationContent.ts`; browser/prototype only; real push not verified. |
| Persistence | IMPLEMENTED prototype localStorage only | `path-to-rise-program-progress-v1`, `path-to-rise-toolbox-state-v1`, `path-to-rise-prompt4-progress`; notification preference key exists in notification architecture. |
| Routing | IMPLEMENTED inside single-page app component state/views | `src/App.tsx`; no production route audit performed here. |
| PWA / offline | NOT IMPLEMENTED / NOT VERIFIED | No manifest/service worker files found; do not claim offline support. |
| Accessibility | PARTIAL foundations / NOT manually verified | CSS/focus/reduced-motion foundations referenced by tests/docs; real screen-reader/device validation not verified. |

---

## 6. 28-Day Program handoff

**Canonical content location:** `src/programContent.ts`.

File header states it is auto-generated from source DOCX and should not be edited without rechecking DOCX provenance.

**Source DOCX refs in generated content:**

```txt
week-01-source.docx
week-02-source.docx
week-03-source.docx
week-04-source.docx
```

**Verified program structure from `src/pathData.ts`:**

- Week 1 — Stabilize / reset baseline — Days 1–7.
- Week 2 — Awareness and Honesty — Days 8–14.
- Week 3 — Acceptance and Letting Go — Days 15–21.
- Week 4 — Identity and Purpose — Days 22–28.

**Day model:** `ProgramDay` includes day, week, week label/theme, title, source file/location/status, purpose, sections, and completion groups.

**Section model:** `ProgramSection` includes id, label, kind (`read`, `do`, `reflect`, `complete`), content, and source mode.

**Progress/storage:** Program progress is stored locally under `path-to-rise-program-progress-v1` in the current prototype.

**Reflection handling:** Reflections are program-local/private-writing state in the browser prototype. Reflection text must not be used for hidden scoring, analytics, personalization, diagnosis, or AI interpretation.

**Day 28 terminal behavior:** No Day 29 should be created or presented as actionable. Current terminal behavior was not freshly browser-verified in this preservation pass.

```txt
NO DAY 29.
```

---

## 7. Daily Action UX principle

Intended architecture where owner-approved/project evidence supports it:

```txt
DAY
→ TODAY'S PLAN / ROADMAP
→ INDIVIDUAL TASK
→ FOCUSED TASK DETAIL
→ MARK TASK DONE
→ RETURN TO ROADMAP
→ NEXT TASK
```

The Day page is the roadmap. The Task page is the depth. Avoid reverting to:

```txt
DAY → GIANT CONTINUOUS WORKBOOK PAGE
```

Implementation status: Day 1 has uncommitted protected work toward this model. Days 2–28 must not be modified or scaled into this architecture until owner approval.

---

## 8. DAY 1 WORK — PROTECTED

Current uncommitted Day 1 work includes:

- granular Day 1 roadmap model: `src/dayRoadmap.ts`.
- Day 1 scenario tests: `scripts/day-roadmap-scenarios.mjs`.
- Day 1 UI/task-detail behavior: `src/App.tsx`.
- Day 1 roadmap/task styles: `src/App.css`.
- progress integration: `src/progressContent.ts`.
- test script integration: `package.json`.
- Day 1 planning/science docs listed in section 4.

Verified source basis from `src/programContent.ts` Day 1:

```txt
Complete all six. Order matters.
```

Day 1 source table lists six areas/tasks:

1. Physical — 15-minute nature walk + stretching.
2. Emotional — one-page writing exercise.
3. Spiritual — 5 minutes of breathing.
4. Intellectual — clarity questions.
5. Social — one simple connection.
6. Environmental — 10-minute reset.

Reflection is separate from the six required Day 1 tasks in protected Day 1 architecture evidence. Do not overwrite or discard this work without explicit owner approval.

---

## 9. RESET system handoff

### Current runtime RESET

Evidence from `src/App.tsx`:

```ts
type ResetView = 'landing' | 'recommendation' | 'toolbox' | 'tool' | 'complete' | 'error'
```

Current components:

- `ResetExperience`
- `Toolbox`
- `ToolRunner`
- `Support`
- `NotificationSettings`

### Current runtime Toolbox / RESET catalogue

Evidence from `src/toolContent.ts`: the runtime has 10 canonical Journey/source-backed tools:

- `mirror-breathwork`
- `hydration-reset`
- `non-dominant-training`
- `mirror-work`
- `gratitude-reflection`
- `immediate-movement`
- `evening-reset`
- `safe-check-in`
- `integration-reflection`
- `nature-walk-stretch`

Current needs:

- `overwhelmed`
- `cant-switch-off`
- `stuck-in-head`
- `coming-home`
- `ground`
- `sleep`
- `numb`
- `control`
- `connect`

Current RESET is a legacy/prototype routing layer over these tools. It does not yet implement the new canonical RESET system or 90-Second Reset.

### Historical/proposed RESET source material

Evidence from `src/pathData.ts` includes 20 historical/proposed tool titles, including:

- Reset Me Now
- 90-Second Downshift
- Hypervigilance Downshift
- Respond vs React
- Control Scan
- Emotional Pressure Release
- Post-Incident Grounding
- End-of-Shift Reset
- Car-Before-Home Transition
- Difficult-Call Decompression
- Sleep After Shift
- Nighttime Brain Dump
- Rest vs Numbing Check
- Relationship Reset
- Listen Without Fixing
- Identity Separation
- Retirement and Transition Reset
- Moral Injury Grounding
- Nature Reset
- Get Back Up Plan

`src/pathData.ts` also includes a 7-day reset action:

```txt
Day 2 — Breathe — Complete the 90-Second Downshift
```

### RESET audit/report location

Last completed RESET audit/report:

```txt
docs/PATH_TO_RISE_RESET_SYSTEM_MASTER_CANONICAL_AUDIT_ARCHITECTURE.md
```

This document recommends 90-Second Reset / Downshift as the preferred reference candidate but marks source/instructions as incomplete and owner-decision-required.

### RESET separations

Maintain these boundaries:

```txt
RESET ≠ TOOLBOX
RESET ≠ DAILY PROGRAM
RESET ≠ WORDS ALONG THE WAY
RESET ≠ MY PATH
RESET ≠ SUPPORT
```

RESET use must not advance `currentDay`, complete a Daily Task, complete a Day, change Day 28 terminal logic, create Day 29, or corrupt My Path.

---

## 10. Current RESET next gate

Next intended product gate:

```txt
90-SECOND RESET
CANONICAL CONTENT + REFERENCE ARCHITECTURE LOCK
```

The 90-Second Reset / Downshift is the preferred reference RESET unless repository evidence or a current owner decision changes this.

Do not state that it has been approved for implementation. Current state is:

```txt
DO NOT CODE THE REFERENCE RESET YET.
```

Required process:

```txt
CANONICAL LOCK
→ OWNER REVIEW
→ IMPLEMENT ONE REFERENCE RESET
→ AUTOMATED TESTS
→ REGRESSION
→ PRIVATE HTTPS PREVIEW
→ PHYSICAL IPHONE VALIDATION
→ HUMAN VALIDATION
→ OWNER APPROVAL
→ ONLY THEN CONSIDER SCALING TO OTHER RESET TOOLS
```

---

## 11. RESET product principle

Target interaction philosophy:

```txt
NEED
→ ONE APPROPRIATE TOOL
→ WHAT / WHEN / TIME / WHY
→ START
→ ONE STEP AT A TIME
→ DONE
→ RETURN TO LIFE
```

Optimize for time to appropriate action.

Do not optimize for time in app, engagement, content consumption, streaks, or gamification. Returning use should become substantially faster than first use.

---

## 12. Safety boundaries

Critical prohibitions:

- No AI therapist.
- No diagnosis.
- No trauma diagnosis/scoring.
- No nervous-system scoring.
- No mood surveillance.
- No analysis of private journal/reflection content.
- No employer monitoring.
- No incident narrative collection unless explicitly approved by a future safety/privacy gate.
- No gamification around mental-health/wellness completion.
- No shame-based missed-task language.
- No fake clinical claims.
- No unsupported neuroscience.
- No requirement to disclose traumatic events to use RESET.
- No medical/emergency-care representation.
- Support access must not depend on program completion.
- Vehicle-transition tools must require the user to be safely parked/stationary before phone interaction.

---

## 13. Privacy principle

```txt
MINIMIZE DATA.
```

Do not collect information merely because it may be useful later.

Private reflection/journal content must not silently become analytics, personalization data, AI training/context, psychological profiling, or employer-visible data.

Current storage is prototype localStorage, not production security:

- `path-to-rise-program-progress-v1`
- `path-to-rise-toolbox-state-v1`
- `path-to-rise-prompt4-progress`
- notification preference storage exists in the notification architecture; verify exact key before editing.

Production authentication, encryption, secure storage, account deletion/export, and backend privacy controls are NOT VERIFIED.

---

## 14. Evidence standard

Prefer evidence in this order:

1. systematic reviews/meta-analyses;
2. controlled research;
3. peer-reviewed evidence;
4. major professional/public-health sources;
5. appropriate expert consensus.

Avoid marketing claims, viral neuroscience, and unsourced wellness claims.

Flag or avoid claims such as:

- “rewires the brain”
- “resets the nervous system”
- “activates the vagus nerve”
- “releases stored trauma”
- “turns off fight-or-flight”
- “heals PTSD”
- “reduces cortisol”

Never invent citations. Evidence language must be proportional to evidence strength.

---

## 15. Accessibility standard

Intended requirements:

- mobile-first;
- large touch targets;
- Large Text support;
- screen-reader semantics;
- logical focus order;
- visible focus;
- Reduced Motion support;
- sufficient contrast;
- no color-only meaning;
- no sound-only instruction;
- one-handed usability;
- low cognitive load.

Current status: PARTIAL structural foundations / NOT manually verified. Do not claim full accessibility, WCAG conformance, VoiceOver success, TalkBack success, or real-device accessibility verification unless actually tested.

---

## 16. Reminder principles

If reminders are used or expanded:

- user-controlled;
- optional;
- editable;
- disableable;
- shift-aware where applicable;
- event-relative where appropriate;
- discreet notification copy;
- deep-link to correct task/tool.

Do not claim real push delivery unless verified. Distinguish reminder UX/architecture from actual OS-level notification delivery.

---

## 17. Quality / release language

Do not use these labels unless evidence justifies them:

```txt
PRODUCTION READY
LAUNCH READY
FULLY ACCESSIBLE
FULLY OFFLINE
SECURE
VALIDATED
```

Prefer precise labels:

```txt
IMPLEMENTED
AUTOMATED TESTED
LOCALLY VERIFIED
PRIVATE PREVIEW VERIFIED
PHYSICAL DEVICE VERIFIED
HUMAN VALIDATED
NOT VERIFIED
```

Repository evidence from Prompt #13 says:

```txt
PROMPT #13 EXIT GATE NOT PASSED
LEVEL B — INTERNAL TESTING READY
```

Do not upgrade readiness without new evidence.

---

## 18. Verified vs not verified

### Verified from repository evidence

- Branch: `master`.
- HEAD: `b0fe531154e7e34b6b6e9c31853c0c6da771d445`.
- Tag `path-to-rise-prompt-1-12-rc1` exists and resolves to `045af500ff6901fa56494d33512cfd6e8d3c8311`.
- Worktree is dirty and contains protected Day 1 WIP.
- `src/programContent.ts` contains generated 28-day source-backed program content.
- `src/toolContent.ts` contains current 10-tool runtime Toolbox/RESET catalogue.
- `src/pathData.ts` contains historical/proposed 20-tool inventory including `90-Second Downshift`.
- `docs/PATH_TO_RISE_RESET_SYSTEM_MASTER_CANONICAL_AUDIT_ARCHITECTURE.md` exists.
- PWA manifest/service-worker files were not found at the checked candidate paths.

### NOT VERIFIED in this preservation pass

- Current browser runtime behavior.
- Current live HTTPS tunnel/preview.
- `npm test` result after all current WIP.
- iPhone Safari real-device behavior.
- Android Chrome real-device behavior.
- Tablet behavior.
- Manual VoiceOver / TalkBack.
- Large Text real-device behavior.
- Production authentication/storage/encryption.
- Real push notifications.
- Permanent HTTPS domain.
- Production monitoring/rollback.
- TestFlight readiness.
- Human first-responder validation.
- Complete canonical 90-Second Reset steps and duration honesty.

---

## 19. Known risks / conflicts

| Risk | Severity | Notes |
|---|---|---|
| Mixed dirty worktree | P1 | Day 1 app WIP, docs, RESET audit, and config changes coexist. Checkpoint requires separation/owner review. |
| Day 1 WIP could be overwritten | P1 | Protect files listed in section 8. |
| RESET catalogue conflict | P1 | `src/pathData.ts` lists 20 historical/proposed tools; `src/toolContent.ts` implements different 10-tool runtime catalogue. |
| 90-Second Reset source gap | P1 | Title/action exists; complete source-backed instructions not verified. |
| Prompt #13 not passed | P1 | Do not claim broader validation. |
| PWA/offline not implemented | P2 | Do not claim offline RESET. |
| Manual accessibility not verified | P2 | Do not claim full accessibility. |
| Temporary preview/tunnel instability | P2 | Verify any link before sharing. |

---

## 20. Document index

| File path | Purpose | Authority level | When to read |
|---|---|---|---|
| `docs/PATH_TO_RISE_MASTER_HANDOFF.md` | Current preservation handoff | High for project orientation; lower than source/current owner instruction | First. |
| `src/programContent.ts` | Generated 28-day source-backed program content | High for current app content; recheck original DOCX for production source disputes | Any Day/program work. |
| `src/pathData.ts` | Historical/proposed states, needs, 20 tool inventory, 7-day reset, 28-day outline | Medium; not current runtime catalogue | RESET source recovery and history. |
| `src/toolContent.ts` | Current runtime canonical Toolbox/RESET tool model | High for current implemented RESET/Toolbox behavior | Any RESET/Toolbox code work. |
| `src/dayRoadmap.ts` | Protected Day 1 roadmap/task/science model | High for current uncommitted Day 1 WIP | Day 1 work only; protect. |
| `docs/PATH_TO_RISE_RESET_SYSTEM_MASTER_CANONICAL_AUDIT_ARCHITECTURE.md` | RESET Phase-1 audit/architecture | High for RESET planning; not implementation approval | Before 90-Second Reset lock. |
| `docs/PATH_TO_RISE_PROMPT_6_CANONICAL_TOOL_MODEL_AND_MAPPING.md` | Prompt #6 current 10-tool runtime model and RESET mapping | High for current implemented tool model | RESET/Toolbox work. |
| `docs/PATH_TO_RISE_PROMPT_13_FINAL_DECISION_PACKAGE.md` | Prompt #13 decision: not passed, Level B internal | High for validation/readiness status | Any release/preview claim. |
| `docs/PATH_TO_RISE_DAY_1_ORDERED_ROADMAP_IMPLEMENTATION_PLAN.md` | Day 1 roadmap plan | High for Day 1 WIP intent | Protect/continue Day 1 only. |
| `docs/PATH_TO_RISE_DAY_1_TASK_SCIENCE_MATRIX.md` | Day 1 task science/evidence matrix | High for Day 1 science wording | Day 1 task science. |
| `../handoff-package/PATH_to_RISE_Agent_Handoff/docs/02_CONTENT_AND_PROGRAMS.md` | Handoff package content/tool inventory | Source-like historical evidence | RESET source recovery. |
| `../handoff-package/PATH_to_RISE_Agent_Handoff/source/BRIEF_EXTRACT.md` | Handoff package brief extract | Source-like historical evidence | RESET source recovery. |

---

## 21. Code map

| Path | Responsibility | Key dependencies | State ownership | Do-not-break notes |
|---|---|---|---|---|
| `src/App.tsx` | Main SPA shell, Today, RESET, Toolbox, My Path, Day, Support, localStorage orchestration | `programContent`, `toolContent`, `progressContent`, `notificationContent`, `dayRoadmap` | program + toolbox localStorage orchestration | Do not modify during preservation; protect Day 1 WIP. |
| `src/App.css` | Main UI styling, mobile layout, Day 1 roadmap styles | App component class names | none | Do not remove accessibility/focus/reduced-motion styles. |
| `src/programContent.ts` | Generated 28-day content | source DOCX provenance | none | Do not hand-edit source-backed program text without source review. |
| `src/toolContent.ts` | Current canonical runtime tools and RESET needs | `programContent` source refs | tool IDs used by app state | Do not create duplicate RESET system blindly. |
| `src/pathData.ts` | Historical/proposed source inventory | none | none | Not current runtime catalogue; use for source recovery only. |
| `src/dayRoadmap.ts` | Protected Day 1 roadmap/task model | Day 1 source and task-science matrix | Day 1 task IDs | WIP; protect. |
| `src/progressContent.ts` | Progress view model / My Path insights | program progress and Day 1 roadmap | derived, not separate source of truth | WIP; protect. |
| `src/notificationContent.ts` | Reminder scenarios/preferences/copy | app capabilities | notification preferences | Real push not verified. |
| `scripts/*.mjs` | Contract/scenario/build-gate tests | source files | none | Run before claims; do not weaken tests to pass. |

---

## 22. Commands

Use commands from `package.json`.

```bash
npm install
npm run dev
npm run lint
npm run contract
npm run personalization
npm run progress
npm run day-roadmap
npm run hardening
npm run notifications
npm run production-qa
npm run final-audit
npm test
npm run build
npm run preview
```

`npm test` currently expands to:

```bash
npm run contract && npm run personalization && npm run progress && npm run day-roadmap && npm run hardening && npm run notifications && npm run production-qa && npm run final-audit && npm run build
```

Runtime/tooling from `package.json`:

- React `^19.2.8`
- Vite `^8.3.0`
- TypeScript `~6.0.2`
- oxlint `^1.81.0`

No secrets or credentials are required in this handoff.

---

## 23. Decision log

| Decision | Status | Rationale | Source / authority | Date |
|---|---|---|---|---|
| Preserve Prompt #1–#12 checkpoint as Level B internal baseline | VERIFIED | Tag exists and resolves | Git tag `path-to-rise-prompt-1-12-rc1` | verified 2026-10-05 |
| Prompt #13 exit gate not passed | VERIFIED | Real-device/human validation incomplete | `docs/PATH_TO_RISE_PROMPT_13_FINAL_DECISION_PACKAGE.md` | 2026-10-03 doc |
| Do not modify Days 1–28 during RESET work | ACTIVE | Prevent source-backed program drift and protect Day 1 WIP | Owner directives + RESET docs | current |
| Day 1 roadmap/task WIP is protected | ACTIVE | Worktree contains uncommitted source/test/doc files | Git status + source files | verified 2026-10-05 |
| RESET should be need-first/action-first, not a browsable library | ACTIVE | Reduce cognitive load and avoid content overload | RESET audit/doc evidence | current |
| 90-Second Reset / Downshift is preferred reference candidate | PROVISIONAL / NOT BUILD APPROVAL | Source and exact steps not locked | RESET audit + owner direction | current |
| Do not claim offline/PWA support | ACTIVE | Manifest/service worker not found | repo file check | verified 2026-10-05 |
| Do not claim real push notifications | ACTIVE | Prototype reminder architecture only | notification docs/source | current |

---

## 24. Owner decisions required

Only material decisions are listed here:

1. Whether/how to preserve current mixed WIP in Git: commit all WIP, split by topic, create patch/archive, or continue uncommitted.
2. Canonical 90-Second Reset content: exact source-backed steps, timing, safety note, completion condition, science wording, and whether `90-Second Reset` and `90-Second Downshift` are the same canonical tool.
3. Approval to implement one reference RESET after the canonical lock is complete.
4. Approval before scaling any RESET architecture to additional tools.
5. Approval before scaling Day 1 roadmap/task architecture to Days 2–28.
6. Any clinical/SME/privacy/legal claims or evidence wording that materially affects safety or product scope.

Routine component naming, file organization, test implementation details, and refactor mechanics should be handled by a senior engineer without escalating unless they alter product scope, privacy, safety, evidence claims, or program progression.

---

## 25. NEW AGENT START HERE

1. Read `docs/PATH_TO_RISE_MASTER_HANDOFF.md`.
2. Run:
   ```bash
   cd '/c/Users/I9-10900KF/projects/path-to-rise/app'
   git status -sb
   git diff --name-status
   git ls-files --others --exclude-standard
   ```
3. Verify branch and HEAD match this handoff, or update the handoff if the repo changed.
4. Protect all uncommitted work, especially Day 1 files listed in sections 4 and 8.
5. Read these before RESET work:
   - `src/pathData.ts`
   - `src/toolContent.ts`
   - `docs/PATH_TO_RISE_RESET_SYSTEM_MASTER_CANONICAL_AUDIT_ARCHITECTURE.md`
   - `docs/PATH_TO_RISE_PROMPT_6_CANONICAL_TOOL_MODEL_AND_MAPPING.md`
   - `../handoff-package/PATH_to_RISE_Agent_Handoff/docs/02_CONTENT_AND_PROGRAMS.md`
   - `../handoff-package/PATH_to_RISE_Agent_Handoff/source/BRIEF_EXTRACT.md`
6. For source recovery, run:
   ```bash
   git grep -n -i -E '90[- ]?second|90 second|downshift|90-second reset|90-second tool' -- . ':!node_modules' ':!dist' ':!.vercel'
   git grep -n -i -E '90[- ]?second|90 second|downshift|90-second reset|90-second tool' $(git rev-list --all) -- . ':!node_modules' ':!dist' ':!.vercel' | head -n 200
   ```
7. Confirm the requested task scope before editing.
8. Do not modify unrelated areas.
9. Report conflicts before destructive changes.
10. Current next task, when authorized:
    ```txt
    90-SECOND RESET CANONICAL CONTENT + REFERENCE ARCHITECTURE LOCK
    ```

Do not begin implementation until owner approval follows the canonical lock.

---

## 26. Handoff validation result

Scenario: a new senior AI coding agent receives only the repository and this handoff.

Result: PASS, with one caveat. The new agent can determine product identity, current Git state, protected WIP, architecture, current RESET/Toolbox model, 28-day program source location, safety/privacy constraints, commands, risks, next task, and owner decisions required. The caveat is that full canonical 90-Second Reset content is not currently verified in the repository; the next agent must recover or escalate that source gap.

---

## 27. Preservation checkpoint plan

Current status:

```txt
CHECKPOINT REQUIRES SEPARATION OF EXISTING WORK
```

Recommended strategy before any commit/tag:

1. Owner reviews this handoff.
2. Decide whether to commit only the handoff doc, split commits by topic, or preserve current WIP through a dedicated WIP branch/patch.
3. Do not commit a misleading “complete” checkpoint that bundles unfinished Day 1 application work with RESET docs.
4. If a preservation commit is approved, use wording similar to:
   ```txt
   docs: add PATH to RISE master preservation handoff
   ```
5. If owner approves a tag after appropriate separation, use:
   ```txt
   path-to-rise-preservation-2026-10-05
   ```
   Meaning: preservation checkpoint for current verified PATH project state and master AI handoff. It must not imply feature completion.

Do not tag or commit mixed unfinished work without explicit owner approval.

---

## 28. Final preservation rules

Never do these as part of preservation or RESET source recovery:

```txt
git reset --hard
git clean -fd
force push
rewrite history
delete branches
delete tags
discard local changes
overwrite unknown files
```

If destructive action appears necessary:

```txt
STOP. OWNER APPROVAL REQUIRED.
```
