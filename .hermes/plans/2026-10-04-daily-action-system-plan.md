# PATH TO RISE — Daily Action System Plan Handoff

Status: **PLAN ONLY — DO NOT IMPLEMENT UNTIL OWNER APPROVES**

Canonical doc: `docs/PATH_TO_RISE_DAILY_ACTION_SYSTEM_IMPLEMENTATION_PLAN.md`

## Owner-authorized scope

- Build this as an app prototype: functionality and approved/source-refined content first; backend/auth/database/real push delivery comes later.
- Transform Day 1 into a high-fidelity Daily Action System prototype.
- Separate Day 1 tasks into task cards and focused task detail views.
- Add task completion and next-task flow.
- Add reminder UI/architecture honestly, without claiming real push delivery unless verified.
- Incorporate Daily Motivation / Words Along the Way architecture.
- Create owner-review workflow for 28 Daily Motivations before any approved content enters product.

## Do not implement yet

The owner explicitly requested implementation planning only. No app code changes are authorized until plan approval.

## Current evidence from inspection

- Current commit inspected: `b0fe531154e7e34b6b6e9c31853c0c6da771d445`.
- Day rendering path: `src/App.tsx` `DayExperience` maps `day.sections` to `ProgramSectionCard`.
- Day 1 tasks are present but buried in source-section rendering.
- Reminder architecture exists in `src/notificationContent.ts`, but real push delivery is not verified.
- Live browser capability check found secure context, Notification API, serviceWorker and PushManager support in desktop Chrome, but no manifest link and no active service worker controller.

## First build target after approval

Build **Day 1 only**:

1. `DailyPlan`
2. `TaskCard`
3. `TaskDetail`
4. `TaskCompletion`
5. `NextTask`
6. mobile reflection interaction
7. task reminder foundation
8. Daily Motivation slot using owner-approved content only

Do not scale to all 28 days until owner physically accepts Day 1 on iPhone.

## Required gates

- `npm test`
- `npm run lint`
- `npm run build`
- browser smoke / console check
- active HTTPS preview verification
- owner physical-iPhone retest

## Critical constraints

- Keep source fidelity.
- Do not invent source content.
- Do not fake notifications.
- No streaks, scores, shame, pressure, or failure language.
- Keep Support accessible.
- No new bottom nav without owner approval.
- Daily Motivation must stay brief and must not recreate information density.
- Do not switch the next build into backend infrastructure; document future backend needs, but prove prototype functionality/content first.


## Locked task-by-task rule

A DAY IS A PLAN — NOT A DOCUMENT. Every genuine actionable task gets its own interactive card and opens its own focused task detail. Do not scale beyond Day 1 until physical iPhone owner approval. See `docs/PATH_TO_RISE_DAILY_TASK_BY_TASK_ARCHITECTURE.md`.




---

## Locked addendum — Day 1 ordered roadmap correction

Source of truth: `docs/PATH_TO_RISE_DAY_1_ORDERED_ROADMAP_IMPLEMENTATION_PLAN.md`.

Non-negotiable implementation rule:

```txt
A DAY IS AN ORDERED ROADMAP — NOT A RANDOM COLLECTION OF ACTIVITIES.
TASK COMPLETION IS GRANULAR.
DAY COMPLETION IS CALCULATED FROM REQUIRED TASKS, NOT MANUALLY CLAIMED.
```

Implementation consequence:

- Day 1 must show the full ordered roadmap using actual source-backed Day 1 content.
- Day 1 source explicitly says `Complete all six. Order matters.`, so the six core tasks use `STRICT_SEQUENCE`.
- `Open Task` and `Mark as Done` are separate actions.
- Remove/refactor manual whole-day completion for Day 1.
- Today/Home and My Path must derive next task and Day state from the same canonical task state.
- Words Along the Way, RESET, Toolbox, education, source metadata, and opening a task do not affect roadmap completion.
- Do not scale this architecture to Days 2–28 until Day 1 is implemented, tested, physically reviewed on iPhone, refined, and explicitly approved.


---

## Locked addendum — Words Along the Way

Source of truth: `docs/PATH_TO_RISE_WORDS_ALONG_THE_WAY_VALIDATION_REPORT.md`.

Non-negotiable UX/product rule:

```txt
WORDS ALONG THE WAY IS PERSPECTIVE, NOT TASK COMPLETION.
ONE DAY, ONE THOUGHT, THEN TODAY'S PLAN.
DO NOT LET DAILY MOTIVATION PUSH THE PRACTICAL WORK DOWN THE SCREEN.
```

Implementation consequence:

- Every program Day may receive one unique Words Along the Way entry after validation.
- It must remain separate from Daily Tasks, RESET, Toolbox, Reflection, and Day completion.
- Opening an entry and pressing `Carry This With Me` must not complete a task, complete a Day, advance the program, or change progress percentages.
- Day 1 placement must be physically tested on iPhone before scaling the pattern across Days 2–28.
- Science/psychology wording needs an internal evidence registry and SME/content review before production approval.
