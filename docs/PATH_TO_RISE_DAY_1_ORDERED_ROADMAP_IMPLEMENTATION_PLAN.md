# PATH TO RISE — DAY 1 ORDERED ROADMAP IMPLEMENTATION PLAN

Generated: 2026-10-04 PDT  
Status: **PLAN ONLY — DO NOT IMPLEMENT UNTIL OWNER APPROVES**  
Inspected commit: `b0fe531154e7e34b6b6e9c31853c0c6da771d445`  
Canonical source inspected: `src/programContent.ts` Day 1, `week-01-source.docx · extracted block 87–197`  
Current code inspected: `src/App.tsx`, `src/progressContent.ts`, `package.json`, `scripts/progress-scenarios.mjs`, `scripts/contract-check.mjs`

## Executive correction

The Day experience must change from:

```txt
Here are several things to do today.
```

to:

```txt
Here is your ordered roadmap for the day.
Start here. Then this. Then this. PATH remembers what is done and what is next.
```

For Day 1, the source explicitly supports this correction:

```txt
Complete all six. Order matters.
```

Therefore Day 1 should use **STRICT_SEQUENCE** for the six canonical tasks. End-of-Day Reflection is source-present and should be shown after the six tasks; its required/optional completion role needs explicit owner approval because previous docs flagged it as unresolved.

---

## 1. Current Day 1 problem

Current implementation problem found in `src/App.tsx`:

- `DayExperience` renders Day 1 as source sections, not as an ordered task roadmap.
- `ProgramSectionCard` previews source text and hides remaining lines behind `Read full source section`, so individual tasks still live inside one long source block.
- Completion is section/day oriented:
  - `daySectionProgress: Record<string, string[]>`
  - `completedDays: number[]`
  - manual `completeDay(day)`
- Current UI has a whole-day completion card:

```tsx
<section className="completion-card" aria-label="Complete day">
  ...
  <button ... onClick={() => onCompleteDay(day.day)}>
    {complete ? 'Already complete' : `Complete Day ${day.day}`}
  </button>
</section>
```

This violates the new requirement because a user can mark the whole Day complete after only one source section is marked done. It also fails to communicate first/second/third/later/end-of-day order quickly.

Current `progressContent.ts` derives current Day from `completedDays`, not from granular task completion. Today/Home can say “Start Day 1” or “Continue Day N,” but it cannot yet say “Next up: Task 4 — Three Questions.”

---

## 2. Actual canonical Day 1 tasks

Source location: `src/programContent.ts`, Day 1, `day-section-04-continue`.

Source table:

```txt
Area | Task
1. Physical | 15-minute nature walk + stretching
2. Emotional | One-page writing exercise
3. Spiritual | 5 minutes of breathing
4. Intellectual | Clarity questions
5. Social | One simple connection
6. Environmental | 10-minute reset
```

Source sequence language:

```txt
Complete all six. Order matters.
```

Source also includes:

```txt
End-of-Day Reflection
Write 3 sentences.
```

Day 1 educational/source context that should **not** become roadmap tasks:

- Today's Focus / PATH to RISE protocol label
- Objective of Day 1
- What to Expect Today
- Source table itself
- Day 1 Reminder / closing message
- WHY/BENEFITS/science lines, which belong inside task detail, not as tasks
- Source metadata, which belongs in internal traceability, not normal user UX

---

## 3. Proposed exact Day 1 order

| Order | Roadmap group | Category | Task title | User-facing short label | Source timing | Duration | Required? | Sequence type | Source reference |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | START OF DAY | Physical | 15-Minute Walk/Stroll + 5 Minutes Stretching | Walk + Stretch | Within 1 hour of waking | 15-min walk/stroll + 5-min stretching | Required | STRICT | `day-section-04-continue` lines: Physical Task / WHEN / HOW / WHY / BENEFIT |
| 2 | AFTER MOVEMENT | Emotional | Write One Page Without Stopping | One-Page Write | After the physical task | Not specified | Required | STRICT | `day-section-04-continue` lines: Emotional Task / WHEN / HOW / Prompt / WHY / BENEFIT |
| 3 | AFTER WRITING | Spiritual | 5 Minutes of Silent Breathing | Silent Breathing | After writing | 5 minutes | Required | STRICT | `day-section-04-continue` lines: Spiritual Task / WHEN / HOW / WHY / BENEFIT |
| 4 | MIDDAY | Intellectual | Answer These 3 Questions | Three Questions | Midday | Short answers; no precise duration | Required | STRICT | `day-section-04-continue` lines: Intellectual Task / WHEN / questions / WHY / BENEFIT |
| 5 | LATER TODAY | Social | One Real Interaction | One Real Interaction | Afternoon or evening | Not specified | Required | STRICT | `day-section-04-continue` lines: Social Task / WHEN / HOW / examples / WHY / BENEFIT |
| 6 | EVENING | Environmental | 10-Minute Reset | Environment Reset | Evening | 10 minutes | Required | STRICT | `day-section-04-continue` lines: Environmental Task / WHEN / HOW / WHY / BENEFIT |
| 7 | END OF DAY | Reflection | End-of-Day Reflection | Reflection | End of Day | 3 sentences | **Owner decision required** | AFTER_REQUIRED_TASKS | `day-section-04-continue` lines: End-of-Day Reflection / Write 3 sentences |

Recommended decision for Day 1 implementation:

- Count the six source tasks as the required Day completion set: `0 of 6`, `1 of 6`, etc.
- Show Reflection separately under `END OF DAY`.
- Owner decision locked: Reflection is separate from the six required tasks and does **not** block Day 1 completion.

Because the source says “Complete all six” immediately before the six task sequence, and then separately includes an End-of-Day Reflection, the approved implementation is **six required tasks + visible separate reflection**.

---

## 4. Which ordering is source-mandated

Source-mandated order:

- The six core tasks are STRICT_SEQUENCE because Day 1 source says:

```txt
Complete all six. Order matters.
```

Additional source-supported timing/order:

- Task 1: `WHEN: Within 1 hour of waking`
- Task 2: `WHEN: After the physical task`
- Task 3: `WHEN: After writing`
- Task 4: `WHEN: Midday`
- Task 5: `WHEN: Afternoon or evening`
- Task 6: `WHEN: Evening`
- Reflection: `End-of-Day Reflection`

Implementation consequence:

- The Day 1 UI may number tasks 1–6 without pretending that the order is arbitrary.
- The UI should still avoid harsh locks unless owner approves strict locking. Recommended first build: make order very clear, highlight NEXT UP, but do not fully block opening later tasks; do not allow Day completion until required tasks are done.

---

## 5. Which ordering is only recommended

For Day 1, the six task order is source-mandated, not merely recommended.

Only these are implementation/UX recommendations rather than source mandates:

- Group labels such as `START OF DAY`, `AFTER MOVEMENT`, `LATER TODAY`.
- Showing subtle timeline/connector visuals.
- Allowing later task review even before prior tasks are marked done.
- Keeping Reflection outside the `0 of 6` required count until owner decides.
- Showing `Mark as Done` on both Roadmap card and Task Detail is now rejected by owner correction. Final Day 1 model: Day page has `Open Task N`; task-specific `Mark Task N as Done` lives inside the focused task screen.

For Days 2–28 later, each Day must be audited separately and assigned `STRICT_SEQUENCE`, `RECOMMENDED_SEQUENCE`, or `FLEXIBLE` based on its own source text.

---

## 6. Timing for each task

Use relative/shift-compatible timing only. No 8 AM / noon / 5 PM assumptions.

| Task | Timing to show | Notes |
|---|---|---|
| Walk + Stretch | Within 1 hour of waking | Works for day shift, night shift, on-call, retired users. |
| One-Page Write | After movement | Source says after physical task. |
| Silent Breathing | After writing | Source says after writing. |
| Three Questions | Midday | Do not convert to 12:00 PM. |
| One Real Interaction | Afternoon or evening | Source-supported broad timing. |
| Environment Reset | Evening | Keep relative; do not assume bedtime. |
| Reflection | End of day | Source-supported closing timing. |

---

## 7. Required vs optional

Day 1 required:

1. Physical — Walk + Stretch
2. Emotional — One-Page Write
3. Spiritual — Silent Breathing
4. Intellectual — Three Questions
5. Social — One Real Interaction
6. Environmental — 10-Minute Reset

Day 1 unresolved / owner decision:

- End-of-Day Reflection: source says `Write 3 sentences`, but previous architecture flagged completion requirement as unresolved.

Day 1 not required / not completion-affecting:

- Words Along the Way
- RESET standalone use
- Toolbox/favourite/recent tools
- Objective/education/source metadata
- Reading WHY/BENEFITS separately from completing task
- Opening a task
- Scrolling the page

---

## 8. Completion rule for each task

| Task | Proposed completion rule | Validation boundary |
|---|---|---|
| Walk + Stretch | User presses `Mark as Done` after doing walk + stretching. | App cannot verify movement; trust explicit user action. |
| One-Page Write | User presses `Mark as Done` after writing. Optional in-app private input can be offered, but source says paper/note pad. | Owner decision: require saved input or allow external writing + mark done. Recommended: allow mark done; do not force sensitive text. |
| Silent Breathing | User presses `Mark as Done` after 5 minutes. | Do not force timer unless later approved. |
| Three Questions | User presses `Mark as Done` after answering. Optional in-app input can be offered; do not analyze text. | Owner decision: require saved answers or explicit self-attestation. Recommended: mark done; optional local notes. |
| One Real Interaction | User presses `Mark as Done` after interaction. | Do not collect person/contact. |
| Environment Reset | User presses `Mark as Done` after 10-minute reset. | Do not require photos/evidence. |
| Reflection | If required: save/mark reflection complete after 3-sentence input or explicit mark done. If optional: save independently and do not block Day. | Owner decision required before final Day-complete calculation. |

Undo / accidental completion:

- Every completed task should show `Marked complete ✓` plus subtle `Undo` / `Mark not complete`.
- Undo changes only that task.
- If undo makes required set incomplete, Day state returns from `COMPLETE` to `IN_PROGRESS` unless owner prefers completed Days to stay locked.

---

## 9. Day completion calculation

Remove/refactor manual whole-day completion.

Conceptual calculation:

```ts
const requiredTasks = dayTasks.filter((task) => task.required)
const completedRequiredTasks = requiredTasks.filter((task) => completion[task.id])
const dayComplete = completedRequiredTasks.length === requiredTasks.length
```

Day 1 states:

```txt
NOT_STARTED: 0 required tasks complete
IN_PROGRESS: 1–5 required tasks complete
COMPLETE: all required tasks complete
```

Opening the Day, opening a task, opening Words Along the Way, using RESET, using Toolbox, saving a favourite, or reading source education must not complete Day 1.

When final required task is completed:

```txt
DAY 1 COMPLETE
You completed today's PATH.
[ Review Today ]
[ Return Home ]
```

Do not force Day 2 immediately.

---

## 10. Proposed Day 1 mobile wireframe

Collapsed/normal Day view:

```txt
TODAY
DAY 1 · STABILIZE
Resetting the Baseline

WORDS ALONG THE WAY
Start Where You Are
"You don't need to fix your whole life today..."
[ Read Today's Edge ]

TODAY'S ROADMAP
0 of 6 tasks complete

NEXT UP
1. Walk + Stretch
20 min · Within 1 hour of waking
[ Open Task ]

START HERE
① Physical
Walk + Stretch
20 min · When: Within 1 hour of waking
○ Not complete
[ Open Task ] [ Mark as Done ]

│

② Emotional
One-Page Write
When: After movement
○ Not complete
[ Open Task ] [ Mark as Done ]

│

③ Spiritual
Silent Breathing
5 min · When: After writing
○ Not complete
[ Open Task ] [ Mark as Done ]

│

④ Intellectual
Three Questions
When: Midday
○ Not complete
[ Open Task ] [ Mark as Done ]

│

⑤ Social
One Real Interaction
When: Afternoon or evening
○ Not complete
[ Open Task ] [ Mark as Done ]

│

⑥ Environmental
Environment Reset
10 min · When: Evening
○ Not complete
[ Open Task ] [ Mark as Done ]

END OF DAY
Reflection
Write 3 sentences
○ Not complete / Available
[ Open Reflection ] [ Mark as Done ]

Need something right now?
[ RESET ]
```

After completing Task 1:

```txt
TODAY'S ROADMAP
1 of 6 tasks complete

NEXT UP
2. One-Page Write
When: After movement
[ Open Task ]

✓ 1. Walk + Stretch
[ Review ] [ Undo ]

○ 2. One-Page Write
[ Open Task ] [ Mark as Done ]
...
```

Today/Home resume state:

```txt
DAY 1 · STABILIZE
3 of 6 complete

NEXT UP
4. Three Questions
When: Midday
[ Continue ]
```

---

## 11. Task Detail wireframe

```txt
TASK 1 OF 6
Physical

Walk + Stretch
20 min · Within 1 hour of waking

WHAT
A steady walk/stroll followed by slow stretching.

HOW
1. Walk at a steady, comfortable pace.
2. Do not rush.
3. Do not use your phone.
4. Breathe slowly through your nose if possible.
5. After the walk, stretch neck, shoulders, hamstrings, and lower back.
6. Move slowly.

WHEN
Within 1 hour of waking.

HOW LONG
15-minute walk/stroll + 5 minutes stretching.

WHY THIS MATTERS
Walking lowers stress hormones. Stretching releases stored tension. Slow movement tells the brain the threat is over.
[SME review flag: claim strength before production]

BENEFITS
- Lower cortisol
- Less body tension
- Better focus
- Improved mood

[ Mark as Done ]
[ Remind Me ]
[ Back to Day 1 ]
```

After Mark as Done:

```txt
✓ WALK + STRETCH COMPLETE
1 of 6 complete

NEXT UP
2. One-Page Write
When: After movement

[ Open Next Task ]
[ Back to Day 1 ]
[ Undo ]
```

---

## 12. State architecture

Current state:

```ts
type ProgramProgress = {
  currentDay: number
  status: 'not_started' | 'in_progress' | 'program_complete'
  completedDays: number[]
  daySectionProgress: Record<string, string[]>
  savedReflections: Record<string, string>
  lastReturn: 'today' | 'after_break'
}
```

Proposed additive prototype state:

```ts
type ProgramProgress = {
  currentDay: number
  status: ProgramStatus
  completedDays: number[] // derived/maintained for backwards display compatibility during migration
  daySectionProgress: Record<string, string[]> // legacy compatibility
  dayTaskProgress: Record<string, string[]> // day number -> completed task IDs
  savedReflections: Record<string, string>
  lastReturn: 'today' | 'after_break'
}
```

Proposed domain model:

```ts
type DaySequenceType = 'STRICT_SEQUENCE' | 'RECOMMENDED_SEQUENCE' | 'FLEXIBLE'
type TaskType = 'ACTION' | 'REFLECTION'

type ProgramTask = {
  id: string
  day: number
  order: number
  category: 'Physical' | 'Emotional' | 'Spiritual' | 'Intellectual' | 'Social' | 'Environmental' | 'Reflection'
  type: TaskType
  title: string
  shortTitle: string
  timingLabel: string | null
  durationLabel: string | null
  required: boolean
  sequenceType: DaySequenceType
  instructions: string[]
  why?: string
  benefits?: string[]
  sourceReference: string
  reminderEligible: boolean
}
```

Recommended file split:

- Create `src/dayRoadmap.ts` for Day 1 task extraction/model and helpers.
- Update `src/progressContent.ts` to consume granular task state for current/next task summary.
- Update `src/App.tsx` to render Day 1 roadmap/task detail and to store task completion.
- Keep `src/programContent.ts` source-backed text unchanged unless provenance is rechecked.

---

## 13. Persistence changes

Current storage key:

```txt
path-to-rise-program-progress-v1
```

Recommended safe approach:

- Keep the same key for prototype continuity if adding optional field `dayTaskProgress` is backwards compatible.
- `parseProgress` should default missing `dayTaskProgress` to `{}`.
- `safeTaskProgress` should validate task IDs against canonical task IDs.
- Do not wipe `completedDays`, `daySectionProgress`, or `savedReflections`.
- During Day 1 implementation, derive Day 1 complete from `dayTaskProgress['1']` rather than manual whole-day button.
- For already completed legacy Day 1 state, choose one migration rule before implementation:
  - Conservative: if `completedDays` includes `1` but no task progress exists, show Day 1 as legacy-complete with an integrity note and allow review/reset, or
  - Strict: keep completedDays but do not populate task progress automatically; user can re-walk Day 1 roadmap.

Recommended first-owner-test rule:

```txt
Do not auto-mark all Day 1 tasks complete from legacy whole-day completion. Preserve old value, show a migration note if detected, and let owner clear/reset local prototype data for clean iPhone testing.
```

---

## 14. Migration risks

Main risks:

1. Existing `completedDays` can conflict with new `dayTaskProgress`.
2. Today/Home may calculate current Day from `completedDays` while Day view calculates from tasks.
3. My Path may show Day complete while Roadmap shows incomplete tasks.
4. Saved reflections currently key to source sections, not task IDs.
5. Existing scenario scripts assume day-level completion.
6. Contract script currently expects `Complete Day` copy; this must be updated when manual whole-day completion is removed.
7. Owner physical-iPhone test may be affected by old localStorage unless reset or migration note is shown.

Rollback plan:

- Keep old `completedDays` and `daySectionProgress` fields during Day 1 prototype.
- Implement Day 1 roadmap behind reusable model code but without deleting source sections from `programContent.ts`.
- If the roadmap has a critical bug, render legacy `DayExperience` for non-Day-1 and optionally for Day 1 behind a simple fallback.

---

## 15. Reminder integration

Day 1 implementation should architect reminder targets but not claim verified delivery.

Conceptual target:

```ts
type ReminderTarget = {
  kind: 'program-task'
  day: 1
  taskId: 'day-1-task-04-three-questions'
}
```

UX:

- Each appropriate task card/detail can show `Remind Me` as architecture-ready.
- Reminder state must belong to the task, not merely to Day 1.
- Deep link target should be Day 1 → Task N.
- Current status must remain:

```txt
REMINDER UX / ARCHITECTURE READY
REAL DELIVERY NOT VERIFIED
```

Do not schedule automatic reminders for every task.

---

## 16. Accessibility

Requirements:

- Each task card has a meaningful accessible name:

```txt
Task 1 of 6, Walk and Stretch, Physical, approximately 20 minutes, within one hour of waking, not complete, open task.
```

- Completion state must not rely on color alone.
- Number/order must be text-readable, not only decorative circles.
- `Open Task` and `Mark as Done` must be separate buttons with clear labels.
- Completed task `Review` must be understandable.
- Undo must be reachable but visually secondary.
- Focus should move predictably when opening task detail and returning to Day 1.
- Large Text should not create horizontal scroll.
- Reduced Motion should be respected if timeline connectors animate.
- Human accessibility verification remains NOT VERIFIED until tested.

---

## 17. Tests

Add/modify scenario tests rather than introducing a new framework unless necessary.

Recommended files:

- Create `scripts/day-roadmap-scenarios.mjs`
- Modify `scripts/contract-check.mjs`
- Modify `scripts/progress-scenarios.mjs`
- Update `package.json` `test` script to include day-roadmap scenarios

Required assertions:

- Day 1 has six required roadmap tasks plus separate Reflection.
- Day 1 task orders are exactly 1–6.
- Day 1 sequence type is `STRICT_SEQUENCE`.
- Task 1 completion only marks Task 1.
- Task 2 completion only marks Task 2.
- Opening a task does not complete it.
- Completing 5 of 6 required tasks does not complete Day 1.
- Completing all 6 required tasks completes Day 1 if Reflection is not required.
- If owner makes Reflection required, 6 of 7 does not complete Day 1.
- Optional/non-task content does not block Day completion.
- RESET does not complete Day 1.
- Toolbox does not complete Day 1.
- Words Along the Way does not complete Day 1.
- Refresh/persistence preserves task state through `parseProgress`.
- Resume identifies the correct next task.
- Today/Home can display next task.
- My Path/Day page agree on Day state.
- Day 28 still does not produce Day 29.
- Contract no longer requires `Complete Day` copy when Day 1 roadmap is active; it should require granular completion copy instead.

Run gates after implementation:

```bash
npm run contract
npm run progress
npm run test
npm run lint
npm run build
```

Then browser QA:

- Day 1 first view at mobile width.
- Open each task.
- Mark one task done from card.
- Mark one task done from detail.
- Undo a task.
- Refresh and confirm state persists.
- Confirm console errors: 0.
- Confirm no horizontal overflow.

---

## 18. Exact files/components expected to change

Expected source files:

| File | Expected change |
|---|---|
| `src/dayRoadmap.ts` | New canonical Day 1 task model, helpers for required tasks, next task, day completion. Later reusable for Days 2–28. |
| `src/App.tsx` | Add `dayTaskProgress`; replace Day 1 legacy source-section view with ordered roadmap; remove/refactor manual whole-day completion for Day 1; add task detail state; add task completion/undo handlers. |
| `src/progressContent.ts` | Extend progress model/view model to understand task completion and next task without reading private content. |
| `src/App.css` | Add roadmap/timeline/task-card/task-detail/complete-state styles, mobile-first. |
| `src/notificationContent.ts` | Possibly add task-level reminder target types/copy only if needed for architecture; no fake delivery. |
| `scripts/day-roadmap-scenarios.mjs` | New regression scenarios for Day 1 roadmap/task completion. |
| `scripts/progress-scenarios.mjs` | Add task-derived current/next/day-completion cases. |
| `scripts/contract-check.mjs` | Update required/forbidden copy checks away from manual `Complete Day` toward granular completion. |
| `package.json` | Add scenario script if new file is created. |
| `docs/PATH_TO_RISE_DAY_1_ORDERED_ROADMAP_IMPLEMENTATION_PLAN.md` | This plan. |
| `docs/PATH_TO_RISE_DAILY_TASK_BY_TASK_ARCHITECTURE.md` | Reference ordered roadmap correction as implementation-specific source of truth. |
| `docs/PATH_TO_RISE_DAILY_ACTION_SYSTEM_IMPLEMENTATION_PLAN.md` | Reference ordered roadmap correction. |
| `docs/PATH_TO_RISE_ELITE_UX_PRODUCT_EXPERIENCE_BLUEPRINT.md` | Reference ordered roadmap correction. |

Expected components/functions in `App.tsx`:

- `DayExperience` should branch or be refactored for `DayRoadmapExperience`.
- Add `DayRoadmap` component.
- Add `RoadmapTaskCard` component.
- Add `TaskDetail` component.
- Add `TaskCompletionFeedback` component if useful.
- Existing `ProgramSectionCard` can remain for non-Day-1 legacy view during the prototype phase.
- Remove or bypass `completion-card` manual whole-day button for Day 1.

---

## 19. What will NOT change

Do not change:

- Bottom nav: `Today | Reset | My Path | Support`.
- Day 1 canonical source meaning.
- `src/programContent.ts` source-backed text without provenance review.
- RESET as a separate immediate-use area.
- Toolbox/favourites/recent tools as separate from Day completion.
- Words Along the Way as separate from numbered roadmap.
- Reflection privacy: no analysis, scoring, personalization, or recommendations from journal text.
- No gamification: no streaks, coins, badges, points, leaderboards, shame, overdue, failure language.
- No fake notification delivery claims.
- No Days 2–28 scaling before Day 1 physical iPhone owner approval.
- No Day 29 after Day 28.
- No production privacy/security claims while prototype uses localStorage.

---

## 20. Owner acceptance criteria

Day 1 does not pass until owner physically tests it on iPhone and can say:

```txt
I immediately know what to do first.
I know what to do second.
I know what comes later.
I can see the whole Day without reading all the instructions.
Every task has its own button.
I can open each task separately.
I can see how to do it.
I can see why I'm doing it.
I can see when to do it.
I can mark ONLY that task done.
I can see exactly what I have completed.
I can see exactly what is left.
If I close PATH, it remembers where I stopped.
I don't need paper.
I don't need to memorize the Day.
```

Implementation is not accepted from automated tests alone. Automated tests can prove state logic; only owner iPhone testing can prove the roadmap feels clear enough.

---

## Implementation sequence after approval

```txt
OWNER APPROVES THIS PLAN
→ implement Day 1 roadmap model only
→ add task completion state and migration-safe parsing
→ replace Day 1 manual completion with calculated required-task completion
→ add Today/Home next-task resume
→ add tests/scenarios
→ run full gates
→ rebuild preview
→ verify public HTTPS link in browser
→ owner physical iPhone test
→ refine Day 1
→ owner approves Day 1
→ only then audit/scale Days 2–28
```

## Stop line

```txt
DAY 1 ORDERED ROADMAP PLAN COMPLETE —
READY FOR OWNER APPROVAL TO IMPLEMENT
```
