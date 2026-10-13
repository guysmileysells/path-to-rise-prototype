# PATH TO RISE — DAILY ACTION SYSTEM IMPLEMENTATION PLAN

Generated: 2026-10-04 08:48 PDT  
Status: **PLAN ONLY — OWNER APPROVAL REQUIRED BEFORE CODE**  
Current inspected commit: `b0fe531154e7e34b6b6e9c31853c0c6da771d445`  
Authorized scope: Daily Action System, Day 1 high-fidelity prototype first, optional task-reminder foundation, Daily Motivation / Words Along the Way architecture.  
Explicit stop condition: **Do not implement until owner approves this plan.**

Owner correction recorded after review:

```txt
We are building an app prototype.
Backend stuff comes later.
The near-term job is building functionality and adding/source-refining content.
```

Practical implication: implementation should prioritize front-end prototype behavior, local prototype state, mobile task interactions, and approved content. Backend/auth/database/push-delivery infrastructure may be documented as future architecture, but should not be built in this phase.






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
- `Open Task` is the Day-page action; `Mark Task N as Done` belongs inside that task's focused detail screen.
- The Day page must remain a roadmap/menu. It must not render every task's instructions/science on one giant page.
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
- For Day 1, the required internal evidence artifact is `docs/PATH_TO_RISE_DAY_1_TASK_SCIENCE_MATRIX.md`; each task needs its own science mapping before implementation.


---

## Locked addendum — task-by-task Daily Action System

Source of truth: `docs/PATH_TO_RISE_DAILY_TASK_BY_TASK_ARCHITECTURE.md`.

Non-negotiable UX rule:

```txt
A DAY IS A PLAN — NOT A DOCUMENT.
EVERY ACTION EARNS ITS OWN SPACE.
ONE TASK OPENS ONE FOCUSED EXPERIENCE.
```

Implementation consequence:

- Every genuine actionable task on Days 1–28 must become its own interactive task unit after the validated architecture is scaled.
- Do not convert education/background paragraphs into fake tasks.
- Day 1 is the golden implementation dataset and golden interaction.
- Do not scale to Days 2–28 until the owner physically tests and explicitly approves Day 1 on iPhone.
- Backend/auth/database/real push delivery remain later; current work is app-prototype functionality and source-backed content presentation.

---

## 0. TL;DR

The current app is source-faithful but still behaves too much like a workbook rendered on a phone. Day 1’s six actual actions are present, but they are buried inside one long source section called `Continue`. The next build should create a Day 1-first **Daily Action System**:

```txt
Today / Day intro
→ one brief Daily Motivation
→ Today's Plan
→ distinct task cards
→ one task detail at a time
→ complete task
→ next task / back to plan
```

The work should **not** transform all 28 days immediately. Build the full pattern on **actual Day 1 source content**, verify on physical iPhone, then scale only after the interaction is accepted.

---

## 1. Screenshot / current-state diagnosis

Owner physical-iPhone screenshots and report show:

- Day/task content is visually lumped together.
- Several actions, source instructions, WHY/BENEFIT copy, reflection prompts, and completion controls compete at once.
- The user has to scroll and mentally organize the day.
- Source traceability metadata appears in the consumer path, including source-backed language and source-block style UI.
- Source formatting issues appear in the UI, e.g. `Stretch neck Stretch shoulders Stretch hamstrings Stretch lower back` as a dense line.
- The current experience can answer “what is in the source?” better than “what do I need to do next?”

Inspected evidence:

- `src/programContent.ts` Day 1 contains six real actions inside one long `Continue` section.
- `src/App.tsx` `DayExperience` currently renders `day.sections.map(...)` through `ProgramSectionCard`.
- `ProgramSectionCard` shows section kind/source mode and raw source-copy previews.
- `ToolRunner` similarly shows `Source-backed`, source location, and `Read full source instructions` inside the user path.
- `PATH_TO_RISE_PROMPT_13_FINDINGS_AND_FEATURE_REQUEST_REGISTER.md` now records `P13-F0004` / `P13-R0002` for task separation and reminder foundation.

Diagnosis: this is a validated usability finding, not personal aesthetic preference.

---

## 2. Highest-friction issues

1. **No daily action model.** Existing data is section-based, not task/action-based.
2. **Day 1 actions are trapped in a long source block.** Physical, emotional, spiritual, intellectual, social, environmental, and reflection actions need first-class structure.
3. **Consumer UI exposes internal source evidence.** Source traceability must remain, but not dominate the normal user experience.
4. **Completion state is section-based.** The app can mark source sections done, but not individual Day 1 tasks.
5. **Reminders are category/tool-level, not task-level.** Existing reminder model supports program/practice/return/post-program; it does not yet support Day task reminders.
6. **Reflection prompts still resemble paper workbook blanks.** Mobile inputs should replace simulated lines where appropriate.
7. **Today/Home is not yet a true daily command center.** It points to a day, but does not yet carry the user’s daily plan.
8. **Daily Motivation is not yet modeled.** It should be a brief emotional thread without adding clutter.

---

## 3. Competitor/product pattern lessons

Use these as product-reference patterns only; do not clone them.

### Calm / Calm Health

Useful lessons:

- short daily activity entry points;
- clear card hierarchy;
- user-controlled reminders;
- calm completion language.

Avoid:

- generic meditation-app feel;
- paid-wellness gloss that weakens first-responder specificity.

### Finch

Useful lessons:

- Today’s goals shown as separate actionable items;
- visible completion state;
- one task at a time;
- optional reminders per goal/task.

Avoid:

- childish gamification;
- rewards/currency;
- streak pressure.

### VA / DoD wellness and coach apps

Useful lessons:

- structured skills/tools;
- self-paced exercises;
- reminders and goal support;
- easy access to support.

Avoid:

- medical-portal appearance;
- clinical treatment framing beyond what the product can prove.

---

## 4. Proposed Day architecture

Introduce a canonical task-view layer derived from `programContent`, starting with Day 1 only.

Conceptual types:

```ts
type DailyTaskCategory =
  | 'physical'
  | 'emotional'
  | 'spiritual'
  | 'intellectual'
  | 'social'
  | 'environmental'
  | 'reflection'

type DailyTask = {
  taskId: string
  day: number
  week: number
  category: DailyTaskCategory
  title: string
  shortDescription?: string
  estimatedDuration?: string
  suggestedTimeLabel?: string
  relativeTiming?: string
  instructions: string[]
  why?: string[]
  benefits?: string[]
  examples?: string[]
  reflectionPrompt?: string[]
  sourceSectionId: string
  sourceLocation: string
  sourceMode: 'STRUCTURED_FROM_SOURCE' | 'SOURCE_DIRECT_WITH_FORMATTING'
}

type DailyPlan = {
  day: number
  week: number
  weekTheme: string
  title: string
  purpose: string
  motivation?: DailyMotivation
  tasks: DailyTask[]
}
```

Implementation principle:

- Do not create separate drifting content for Today, My Path, reminders, and progress.
- Create one derived/canonical Daily Task model and render multiple views from it.
- Start with Day 1 high-fidelity extraction from actual source.
- Later, scale extraction day-by-day only after Day 1 is accepted.

Likely files:

- Create: `src/dailyActionContent.ts`
- Modify: `src/programContent.ts` only if generated source structure needs additional metadata; avoid editing raw source text casually.
- Modify: `src/App.tsx` to consume `DailyPlan` for Day 1 path.
- Modify: `src/App.css` for mobile-first cards/detail states.
- Add scenario tests under `scripts/`.

---

## 5. Proposed Today’s Plan

Today’s Plan should be the orientation layer.

For Day 1 it should show:

```txt
DAY 1
STABILIZE

TODAY'S PLAN
0 of 7 complete

○ Physical — Walk + Stretch
○ Emotional — One-Page Write
○ Spiritual — Silent Breathing
○ Intellectual — 3 Questions
○ Social — One Real Interaction
○ Environmental — 10-Minute Reset
○ Reflection — End-of-Day Reflection

NEXT
Walk + Stretch — 20 min
Suggested: within 1 hour of waking
[Start]
```

Rules:

- no score;
- no streak;
- no failure/red states;
- no “overdue”;
- no “missed again”;
- suggested timing is guidance, not command;
- source details stay behind “More detail” / internal debug path, not default view.

Likely component:

```txt
DailyPlan
DailyProgress
NextTask
```

---

## 6. Proposed Task Card

Collapsed card shows only what the user needs to decide what to do.

Example Day 1 card:

```txt
PHYSICAL
Walk + Stretch
20 minutes
Suggested: within 1 hour of waking

[Start]
[Remind me]
○ Complete
```

Rules:

- one card per task;
- 44px+ touch targets;
- no long HOW/WHY/BENEFIT paragraphs in collapsed state;
- completion state visible but non-punitive;
- reminder control visible but secondary;
- “Remind me” never auto-subscribes.

Likely component:

```txt
TaskCard
```

---

## 7. Proposed Task Detail

Task detail opens one action at a time.

Hierarchy:

```txt
Walk + Stretch
Suggested: within 1 hour of waking
20 minutes

WHAT TO DO
1. Walk at a steady, comfortable pace.
2. Do not rush.
3. Do not use your phone.
4. Breathe slowly through your nose if possible.

AFTER THE WALK
- Stretch neck
- Stretch shoulders
- Stretch hamstrings
- Stretch lower back
- Move slowly.

[Mark Complete]
[Set Reminder]

WHY THIS HELPS  ▾
BENEFITS        ▾
SOURCE NOTE     internal/debug only or quiet disclosure
```

Rules:

- `WHAT`, `WHEN`, `HOW` appear quickly.
- `WHY`, `BENEFITS`, `EXAMPLES`, and source traceability are optional/secondary.
- Use semantic mobile formatting: bullets, numbered steps, short paragraphs, spacing.
- Do not rewrite substantive source meaning.

Likely component:

```txt
TaskDetail
```

---

## 8. Completion model

Current state:

- `ProgramProgress.daySectionProgress: Record<string, string[]>`
- `ProgramProgress.completedDays: number[]`

Proposed extension:

```ts
type ProgramProgress = {
  currentDay: number
  status: ProgramStatus
  completedDays: number[]
  daySectionProgress: Record<string, string[]>
  dayTaskProgress?: Record<string, string[]>
  savedReflections: Record<string, string>
  lastReturn: 'today' | 'after_break'
}
```

Task completion should:

- mark only that task complete;
- update Today’s Plan immediately;
- not automatically complete the Day unless defined Day completion rules are met;
- preserve section completion for backward compatibility during transition;
- support Day 1 prototype without breaking Days 2–28.

Day completion should remain explicit and calm:

```txt
Day 1 complete.
You showed up today.
[Back to Today]
[Continue when ready]
```

No fireworks, points, streaks, guilt, or forced continuation.

---

## 9. Next-task model

After completing a task:

```txt
Done.

NEXT UP
One-Page Write
Suggested: after movement

[Open Next Task]
[Back to Today's Plan]
```

Rules:

- Do not dump the user back into a giant document.
- Do not force immediate continuation.
- If the next task depends on a previous task, show relative timing.
- If the day is complete, show calm day-complete state.

Likely component:

```txt
TaskCompletion
NextTask
```

---

## 10. Reflection interaction

Replace workbook-style blank lines with mobile input where appropriate.

For Day 1:

- One-Page Write can be represented as a task with guidance and optional private writing field.
- End-of-Day Reflection can be a task with 3 prompts and mobile text inputs.

Rules:

- Keep reflection storage prototype-local and clearly labeled.
- Encourage synthetic data during testing.
- Do not use reflection text for hidden personalization, notification payloads, analytics, or insights.
- Do not expose reflection text on Home or lock screen.
- Allow save/delete controls.

Likely component:

```txt
ReflectionTaskInput
```

---

## 11. Daily Motivation / “Words Along the Way”

Daily Motivation is part of this same Daily Action System scope, not a separate phase.

Purpose:

- one powerful thought to carry through the day;
- a subtle emotional thread through the 28 days;
- not generic motivation;
- not content bloat.

Placement recommendation:

1. **Best initial placement:** Day Introduction / Today intro above Today’s Plan, but visually compact.
2. Avoid pushing Today’s Plan too far down.
3. Consider a two-line card:

```txt
DAILY MOTIVATION
“You don't have to rebuild everything today.
You only have to take the next step.”
```

Optional second line:

```txt
CARRY THIS WITH YOU
Start smaller than your stress wants you to.
```

Rules:

- one day, one thought, then the work;
- no quote carousel;
- no social sharing;
- no gamification;
- no cheesy motivation;
- no “warrior” clichés;
- no exaggerated neuroscience or healing promises;
- no future-day spoilers if progression should remain gated.

### Required separate content artifact before product entry

Create a separate owner-review document before adding any motivations to product UI:

```txt
docs/PATH_TO_RISE_28_DAYS_OF_WORDS_ALONG_THE_WAY.md
```

Required format per day:

```txt
DAY:
WEEK/THEME:
DAILY MOTIVATION:
OPTIONAL CARRY THIS WITH YOU:
CONNECTION TO THAT DAY'S ACTUAL SOURCE CONTENT:
OWNER STATUS: Draft / Approved / Revise / Rejected
```

Important: do **not** invent all 28 and ship them directly. Draft them for owner review and approval first.

Likely types:

```ts
type DailyMotivation = {
  day: number
  week: number
  dailyMotivation: string
  carryThisWithYou?: string
  sourceConnection: string
  approvalStatus: 'draft' | 'approved' | 'revise' | 'rejected'
}
```

Only approved motivations should enter `src/dailyMotivationContent.ts`.

---

## 12. Words Along the Way archive

Optional quiet section:

```txt
WORDS ALONG THE WAY
Day 1 — [motivation already encountered]
Day 2 — [after encountered]
```

Rules:

- revisit only encountered/approved motivations;
- do not reveal future-day content unless owner approves;
- not a feed;
- not gamified;
- not another nav destination unless later evidence requires it;
- candidate placement: inside My Path, collapsed under reflections/progress.

Likely component:

```txt
WordsAlongTheWay
```

---

## 13. Reminder UX

Task reminders should reduce memory burden without creating pressure.

Collapsed card control:

```txt
[Remind me]
```

Reminder editor:

```txt
Walk + Stretch
Suggested: within 1 hour of waking

Reminder time
[ 08:30 ]

[Save reminder]
[Cancel]
```

States:

```txt
Reminder off
Reminder set ✓ 8:30 AM
Permission needed
Notifications unavailable here
Delivery not verified on this device
```

Rules:

- optional;
- explicit;
- editable;
- disableable;
- no automatic six-task notification setup;
- no guilt copy;
- Daily Motivation reminder, if ever added, is lower priority than task reminders.

Central reminder management:

```txt
My Reminders
Walk + Stretch — 8:30 AM [Edit] [Off]
3 Questions — 1:00 PM [Edit] [Off]
```

Candidate placement: Today secondary disclosure or My Path settings area, not primary bottom nav.

Likely components:

```txt
ReminderControl
ReminderEditor
ReminderList
```

---

## 14. Reminder technical capability matrix

Inspected current live HTTPS preview from desktop Headless Chrome:

| Capability | Observed | Meaning |
|---|---:|---|
| Secure context | yes | Required for browser notifications; current tunnel qualifies for inspection. |
| Notification API | yes | Browser exposes `Notification`. |
| Permission | default / not determined | User has not granted permission in inspected browser. |
| Service worker API | yes | Browser supports service workers. |
| Service worker controller | no | App currently has no active service worker controlling the page. |
| PushManager | yes | Browser exposes push primitives. |
| Manifest link | no | Current app is not configured as installable PWA. |
| Standalone display mode | false | Running in browser, not installed app. |
| Backend push service | none inspected | No push backend currently implemented. |
| Native wrapper | none inspected | No native scheduler currently implemented. |

Current implementation reality:

- `src/notificationContent.ts` contains reminder preference architecture, safe copy registry, quiet hours, and scenario tests.
- No actual reliable push delivery is implemented.
- Browser-tab/foreground reminder demo may be possible, but must be labeled limited.
- Real closed-app / lock-screen delivery remains **NOT VERIFIED**.

---

## 15. iOS Safari / PWA limitations

Current iPhone testing is through Safari + temporary HTTPS tunnel.

Plan assumptions:

- iOS Safari notification behavior is more restrictive than desktop browsers.
- Reliable iPhone lock-screen/background reminders likely require PWA install support and platform-specific verification, or a native wrapper.
- Without a service worker / manifest / push subscription / backend or native scheduler, do not claim iPhone background delivery.
- For owner testing, mark task reminder UI/architecture separately from real notification delivery.

Required future verification before PASS:

1. iPhone Safari capability check.
2. iPhone installed-to-Home-Screen PWA check, if PWA path chosen.
3. Permission request and denial/allow flows.
4. App closed/background delivery.
5. Lock-screen copy.
6. Notification tap deep-link to correct task.
7. Disable/edit behavior.

Until then:

```txt
REMINDER UI/ARCHITECTURE READY
REAL DELIVERY NOT VERIFIED
```

---

## 16. Android Chrome limitations

Android Chrome is more likely to support web push/PWA notifications, but still needs:

- manifest;
- service worker;
- push subscription or local scheduling strategy;
- permission handling;
- real-device verification;
- app-closed/background test;
- timezone/DST test;
- disabled reminder non-delivery test.

Do not infer Android support from desktop Chrome.

---

## 17. Proposed reminder architecture

Extend the reminder model from category/tool reminders toward task reminders.

Potential types:

```ts
type TaskReminderPreference = {
  taskId: string
  enabled: boolean
  userSelectedTime?: string
  relativeTimePreference?: string
  timezone?: string
  permissionState?: NotificationPermissionState
  deliveryCapability?: NotificationPlatformCapability['currentSupport']
  lastScheduledAt?: string
  lastDeliveredAt?: string
}

type NotificationPreferences = {
  schemaVersion: 2
  permissionExplained: boolean
  privacyMode: 'discreet'
  quietHours: QuietHours
  programReminder: ReminderSetting
  practiceReminder: PracticeReminderSetting
  taskReminders: Record<string, TaskReminderPreference>
  motivationReminder?: ReminderSetting
  returnReminder: ReturnReminderSetting
  postProgramReminder: ReminderSetting
}
```

Rules:

- preserve v1 parsing and migrate to v2 safely;
- app preference, system permission, and actual delivery state stay separate;
- notification payloads must not include reflection text, RESET need, emotional state, or private source detail;
- deep-link resolves to current task if valid, otherwise Today/Plan fallback;
- Day 28 must not create Day 29 reminders.

---

## 18. Privacy implications

Sensitive data boundaries:

- Reflection text remains private prototype-local data.
- Task completion and reminder preferences are wellness-related behavior data.
- Reminder payloads must be generic and discreet.
- No hidden inference from task state into emotional state.
- No “we noticed” language.
- No clinical/diagnostic copy.
- No lock-screen mention of trauma, nervous-system dysregulation, anxiety, PTSD, crisis, missed tasks, or falling behind.

Required UI copy:

```txt
This prototype stores task progress and reminder preferences locally in this browser. Real production reminders need platform/privacy/security hardening before launch.
```

---

## 19. Accessibility implications

Task cards, task details, reminders, and motivation cards must support:

- Large Text and reflow;
- semantic headings;
- screen-reader labels for status and controls;
- touch targets at least 44px;
- visible focus states;
- reduced motion;
- adequate contrast;
- no color-only completion cues;
- clear button labels like `Start Walk + Stretch`, `Set reminder for Walk + Stretch`, `Mark Walk + Stretch complete`.

Do not shrink font size to fit more content.

---

## 20. State/schema changes

Current storage keys:

- `path-to-rise-program-progress-v1`
- `path-to-rise-toolbox-state-v1`
- `path-to-rise-notification-preferences-v1`

Proposed changes:

- Keep existing keys if possible during Day 1 prototype.
- Add optional `dayTaskProgress` to `ProgramProgress` while preserving old state.
- Move notification preferences to schema v2 only if task reminders are implemented.
- Parse missing task/reminder fields safely.
- Never wipe saved reflections/favourites/progress during migration.

Migration strategy:

1. Read existing v1 state.
2. Add missing optional fields in memory.
3. Write back only when user changes task/reminder state.
4. Keep section progress compatible with current tests.
5. Add malformed-state tests.

---

## 21. Source-fidelity safeguards

Source of truth remains:

```txt
Original DOCX → src/programContent.ts → derived DailyTask model → UI
```

Safeguards:

- Every `DailyTask` must include `sourceSectionId` and `sourceLocation`.
- Formatting can change; substantive content cannot.
- Do not strengthen health/science claims.
- Flag categorical claims for SME review instead of embellishing.
- Preserve all meaningful tasks, timing, WHY, benefits, examples, reflections, and sequencing.
- Keep internal source evidence available in docs/debug/admin context.
- Remove source metadata from normal consumer UI unless behind a quiet disclosure.

Tests should verify:

- Day 1 task count and expected labels;
- each Day 1 source task maps to one task card;
- source refs exist for every task;
- no source-location strings dominate normal consumer UI;
- source-backed content is not dropped.

---

## 22. Day 1 prototype scope

Implement Day 1 only as the high-fidelity proof.

Day 1 tasks derived from current source:

1. Physical — `15-Minute Walk/Stroll + 5 Minutes Stretching`
2. Emotional — `Write One Page Without Stopping`
3. Spiritual — `5 Minutes of Silent Breathing`
4. Intellectual — `Answer These 3 Questions`
5. Social — `One Real Interaction`
6. Environmental — `10-Minute Reset`
7. Reflection — `End-of-Day Reflection`

Day 1 also needs:

- Today’s Plan;
- Daily Motivation slot, using owner-approved content only;
- distinct task cards;
- focused task detail view;
- task completion;
- next-task flow;
- mobile reflection input;
- reminder UI/architecture with honest capability labels;
- source traceability internally;
- Day complete state.

Do not scale across all 28 until Day 1 is physically accepted.

---

## 23. Acceptance criteria

Owner must be able to open Day 1 and immediately answer:

- What do I need to do today?
- What is next?
- How many actions are left?
- What is the one thought/motivation for today?
- How do I open only one task?
- What, when, and how do I do that task?
- Where do I see why/benefits if I want them?
- How do I mark the task complete?
- What comes next?
- How do I return to Today’s Plan?
- How do I set/edit/disable a task reminder, if supported?
- Is real notification delivery verified or not?

Technical acceptance:

- `npm test` passes.
- `npm run lint` passes.
- `npm run build` passes.
- `npm run final-audit` passes.
- Browser affected-path smoke passes.
- No console errors.
- No horizontal overflow at iPhone width.
- Day 1 source-task traceability verified.
- Existing Day 2–28 behavior not broken.
- Support remains accessible.
- No Day 29.
- No streak/score/failure language.
- Real iPhone owner retest remains required before closing the UX finding.

Reminder acceptance:

- If real delivery is not verified, final status must say:

```txt
REMINDER UI/ARCHITECTURE READY
REAL DELIVERY NOT VERIFIED
```

Daily Motivation acceptance:

- Owner-approved motivation content only enters UI.
- No 28-day motivation set ships without owner review.
- Motivation does not push Today’s Plan too far down.

---

## 24. Regression risks

| Risk | Mitigation |
|---|---|
| Source content accidentally changed | Keep raw `programContent.ts` as source input; derive Day 1 task model with source references. |
| Day task completion breaks Day completion | Add tests for task vs day completion separation. |
| Reminder UI implies real push delivery | Capability labels and tests must keep delivery unverified unless actually proven. |
| Motivation adds clutter | Keep one brief card; owner reviews placement. |
| Future-day motivation spoilers | Words Along the Way only reveals encountered/approved days by default. |
| Existing progress state breaks | Optional schema fields and migration tests. |
| ToolRunner still feels source-heavy | Include standalone tool task-card/detail pattern after Day 1 proof, or at least hide source metadata behind disclosure. |
| Accessibility regressions | Browser geometry + semantic heading/control-label checks. |

---

## 25. What will NOT change

This plan does **not** authorize:

- backend/auth/database infrastructure work;
- rewriting the 28-day program;
- deleting source-backed depth;
- inventing source content;
- shipping 28 generated motivations without owner approval;
- fake notifications;
- automatic notification opt-in;
- streaks, scores, rewards, currency, guilt, or pressure;
- clinical treatment claims;
- diagnosis or hidden inference;
- employer monitoring;
- social feed/community features;
- new bottom-nav destinations;
- Support removal or paywalling;
- public-launch claims;
- production privacy/security claims from localStorage.

---

## 26. Proposed implementation sequence after owner approval

### Step 1 — Create Day 1 task extraction model

Files:

- Create `src/dailyActionContent.ts`
- Add Day 1 `DailyTask` data derived from `programContent.ts`
- Include source refs and source-connection metadata

Validation:

- Add script test verifying Day 1 expected tasks exist.

### Step 2 — Add task progress parsing

Files:

- Modify `src/App.tsx`
- Possibly create `src/dailyActionState.ts`

Validation:

- Existing progress state parses without task fields.
- Completing a task does not complete a Day.

### Step 3 — Build Day 1 DailyPlan + TaskCard UI

Files:

- Modify `src/App.tsx`
- Modify `src/App.css`

Validation:

- Day 1 plan shows distinct tasks.
- No long source paragraphs in collapsed cards.

### Step 4 — Build TaskDetail + completion + next-task flow

Files:

- Modify `src/App.tsx`
- Modify `src/App.css`

Validation:

- User can open one task, complete it, see next task, return to Today’s Plan.

### Step 5 — Add mobile reflection interactions

Files:

- Modify `src/App.tsx`
- Modify `src/App.css`

Validation:

- Reflection prompts become mobile inputs.
- Saved text remains local and deleteable.

### Step 6 — Add task-reminder foundation

Prototype boundary: this is UI/state/copy/capability truth only. Backend delivery comes later.

Files:

- Modify `src/notificationContent.ts`
- Modify `scripts/notification-scenarios.mjs`
- Modify `src/App.tsx`

Validation:

- App preference, permission, and delivery capability remain separate.
- Disable/edit works.
- Payload copy remains discreet.
- Real delivery remains NOT VERIFIED unless actually tested.

### Step 7 — Add Daily Motivation architecture

Files:

- Create `docs/PATH_TO_RISE_28_DAYS_OF_WORDS_ALONG_THE_WAY.md`
- After owner approval only: create `src/dailyMotivationContent.ts`

Validation:

- No unapproved motivation appears in product.
- Motivation is short and does not dominate Today’s Plan.

### Step 8 — Browser/mobile QA and owner retest package

Commands:

```bash
npm test
npm run lint
npm run build
npm run final-audit
```

Additional checks:

- rendered iPhone-width DOM geometry;
- no console errors;
- active HTTPS preview verified;
- owner physical-iPhone retest.

---

## 27. Decision needed before implementation

Approve, revise, or reject this plan.

If approved, the first build target is:

```txt
Day 1 Daily Action System prototype only
```

Not all 28 days.

Implementation must stop again after Day 1 is ready for physical iPhone retest.
