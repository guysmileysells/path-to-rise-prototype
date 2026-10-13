# PATH TO RISE
## DAILY ACTION SYSTEM — FINAL TASK-BY-TASK ARCHITECTURE

Generated: 2026-10-04 PDT  
Status: **PRE-IMPLEMENTATION ARCHITECTURE ONLY — DO NOT CODE / DO NOT SCALE WITHOUT OWNER APPROVAL**  
Inspected source: `src/programContent.ts` Day 1 at commit `b0fe531154e7e34b6b6e9c31853c0c6da771d445`  
Near-term constraint: **Build the app prototype: functionality + approved/source-backed content first. Backend/auth/database/real push delivery come later.**





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
- The Day page is a roadmap/menu only: no expanded task instructions, no task science blocks, and no task completion buttons on the Day surface unless the owner explicitly reverses this rule.
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


---

## 1. CURRENT PROBLEM DIAGNOSIS

Physical iPhone testing exposed the core interaction problem:

```txt
A Day still behaves too much like a source document.
```

Day 1 currently contains valuable source-backed tasks, but the actual actionable items are packed inside one long `Continue` section. This creates:

- excessive information density;
- weak task boundaries;
- unnecessary scrolling;
- memory burden;
- unclear next action;
- completion ambiguity;
- workbook-on-phone feeling.

Rejected model:

```txt
DAY → every task fully expanded → every why → every benefit → every example → massive scroll
```

Required model:

```txt
DAY → TODAY'S PLAN → INDIVIDUAL TASK CARD → FOCUSED TASK DETAIL → COMPLETE → NEXT / TODAY
```

Non-negotiable rule:

```txt
A DAY IS A PLAN — NOT A DOCUMENT.
EVERY ACTION EARNS ITS OWN SPACE.
```

---

## 2. FINAL DAY ARCHITECTURE

Every program Day should render as a daily action plan.

Default Day structure:

```txt
DAY X
WEEK / THEME
WORDS ALONG THE WAY
TODAY'S PLAN
TASK CARDS
END-OF-DAY / REFLECTION where applicable
DAY COMPLETE state when eligible
```

The Day surface should answer first:

```txt
What do I need to do today?
What is complete?
What remains?
What is next?
```

Education, source evidence, benefits, and longer explanations remain available, but they do not dominate the first Day view.

---

## 3. FINAL TASK CARD ARCHITECTURE

Every genuine actionable task on every Day must become its own interactive task card / button.

Collapsed card information budget:

```txt
CATEGORY
TASK NAME
SHORT ACTION DESCRIPTION
DURATION if source-supported
SUGGESTED TIMING if source-supported
COMPLETION STATUS
PRIMARY ACTION
OPTIONAL REMINDER STATUS
```

Example:

```txt
PHYSICAL
Walk + Stretch
Walk steadily, then stretch key areas.
About 20 min
Suggested: within 1 hour of waking

[ Open Task ]
Reminder off
○ Not complete
```

Do not show on collapsed cards:

- full HOW;
- full WHY;
- benefits;
- examples;
- source filenames;
- source block IDs;
- extracted-line language.

---

## 4. FINAL TASK DETAIL ARCHITECTURE

A Task Detail is one focused experience for one action.

Required hierarchy:

```txt
DAY 1 • TASK N OF 6
CATEGORY
TASK NAME
DURATION / HOW LONG where supported
WHEN TO DO THIS
WHAT YOU'RE DOING
HOW TO DO IT
WHY THIS MATTERS
THE SCIENCE BEHIND IT
WHAT YOU MAY NOTICE where appropriate
MARK THIS TASK COMPLETE
BACK TO DAILY ROADMAP / NEXT TASK
```

Action comes before education. The normal user sees only this one task's content. Scientific rationale must be task-specific, conservative, and traceable through `docs/PATH_TO_RISE_DAY_1_TASK_SCIENCE_MATRIX.md`; do not repeat one generic science paragraph across tasks.

---

## 5. CONTENT CLASSIFICATION MODEL

Do not convert every source paragraph into a task.

Classify source content as:

| Type | Meaning | Becomes task card? |
|---|---|---|
| ACTION | User performs an activity. | Yes, if genuine program action. |
| REFLECTION | User writes/answers/reflection activity. | Yes, as reflection task where source requires/offers it. |
| EDUCATION | Explains purpose/context/science/benefits. | No; attach to day intro or task detail. |
| TRANSITION | Opening/closing/phase movement. | Sometimes; only if user performs/acknowledges a structured transition. |
| OPTIONAL CONTENT | Useful but not completion-critical. | No required task unless source requires. |

This distinction protects against turning educational paragraphs into fake checkboxes.

---

## 6. TASK DATA MODEL

Use one canonical task entity to power Today, Task Detail, completion, reminders, progress, My Path, and next-task logic.

Conceptual fields:

```ts
type DailyTask = {
  id: string
  week: number
  day: number
  category: 'physical' | 'emotional' | 'spiritual' | 'intellectual' | 'social' | 'environmental' | 'reflection' | 'transition'
  type: 'ACTION' | 'REFLECTION' | 'EDUCATION' | 'TRANSITION' | 'OPTIONAL_CONTENT'
  title: string
  shortDescription?: string
  instructions?: string[]
  timing?: { label: string; semantic?: string; sourceText: string }
  estimatedDuration?: string
  why?: string[]
  benefits?: string[]
  examples?: string[]
  reflectionPrompt?: string[]
  required: boolean
  optionalReason?: string
  sequenceType: 'STRICT_SEQUENCE' | 'RECOMMENDED_SEQUENCE' | 'FLEXIBLE'
  completionRule: string
  reminderEligible: boolean
  sourceReference: { sourceFile: string; sourceLocation: string; sectionId: string; sourceLines?: string[] }
}
```

Do not populate fields with invented data. `undefined/null` is better than fabricated program information.

---

## 7. TASK STATE MODEL

Minimum task state:

```txt
NOT_STARTED
COMPLETE
```

Use `IN_PROGRESS` only when there is meaningful internal state that can be saved reliably, such as a saved reflection draft.

Opening a task does not complete it.
Scrolling does not complete it.
Time on screen does not complete it.

---

## 8. DAY STATE MODEL

Day state:

```txt
NOT_STARTED
IN_PROGRESS
COMPLETE
```

Rules:

- `NOT_STARTED`: no required completion criterion satisfied.
- `IN_PROGRESS`: at least one required task/criterion complete, but Day not complete.
- `COMPLETE`: all required Day criteria satisfied.

Merely opening the Day never completes it.

---

## 9. REQUIRED VS OPTIONAL MODEL

Every source-backed element must be classified as:

```txt
REQUIRED ACTION
OPTIONAL ACTION
EDUCATION
REFLECTION
TRANSITION
```

Rules:

- Optional content cannot block Day completion.
- Educational text cannot become a required checkbox unless source/program explicitly requires acknowledgement.
- Reflections must follow the source: required writing only if the source truly requires it.
- Completion rules must be explicit and inspectable.

---

## 10. COMPLETION CONTRACT

Each task must declare a completion rule.

Examples:

- Normal action: user presses `Mark as Done` after performing it.
- Reflection with required written input: valid save may be required.
- Reflection with optional writing: user may mark done without text or skip if permitted.
- Education: no completion unless source explicitly requires acknowledgement.

Task completion updates that task only, then derived views update Today/My Path/Day progress.

No confetti, points, badges, coins, streaks, or performance language.

---

## 11. SEQUENCING MODEL

Each Day must declare sequence behavior:

| Sequence | Meaning |
|---|---|
| STRICT_SEQUENCE | Later tasks require earlier completion because canonical logic requires it. |
| RECOMMENDED_SEQUENCE | Show intended order, but do not artificially lock the user. |
| FLEXIBLE | Tasks may be completed in any order. |

Day 1 source says:

```txt
Complete all six. Order matters.
```

Therefore Day 1 should initially be modeled as `STRICT_SEQUENCE` or strong `RECOMMENDED_SEQUENCE` pending owner/content review of how rigid to enforce that sentence in UX. The UI should preserve the source intent without creating frustrating artificial locks unless approved.

---

## 12. NEXT-TASK LOGIC

After completion, identify the next appropriate action.

Language depends on sequence:

- Strict: `Next up`
- Recommended: `Suggested next`
- Flexible: `Still available today`

Day 1 recommended order from source:

1. Physical — Walk + Stretch
2. Emotional — One-Page Write
3. Spiritual — Silent Breathing
4. Intellectual — 3 Questions
5. Social — One Real Interaction
6. Environmental — 10-Minute Reset
7. End-of-Day Reflection

---

## 13. RESUME LOGIC

PATH must remember where the user left off.

Example:

```txt
DAY 1 — STABILIZE
2 of 6 activities complete

CONTINUE
Silent Breathing
[ Continue ]
```

The user should not reconstruct progress from memory. Resume state derives from canonical task state, not separate UI state.

---

## 14. DAY-COMPLETION LOGIC

Day completion must derive from required task completion rules.

Day 1 source says:

```txt
Complete all six. Order matters.
```

Therefore Day 1 completion should require the six core tasks to be complete. End-of-Day Reflection should be represented as a distinct reflection action and may be required or optional depending on owner/content decision because the source instructs “Write 3 sentences,” while earlier prototype docs treated reflection text as optional unless source specifically requires written answers.

This must be resolved explicitly before implementation.

---

## 15. DAY-ADVANCEMENT LOGIC

Only canonical Day completion may advance program state.

These must never accidentally advance a Day:

- RESET;
- Toolbox tool;
- Favourite;
- standalone tool completion;
- optional exercise;
- Words Along the Way;
- Transition Home;
- reminder setup;
- opening a task.

---

## 16. DAY 28 TERMINAL LOGIC

Day 28 remains terminal.

Rules:

- no Day 29;
- no invalid next route;
- no infinite advancement;
- after Day 28, show program-complete / maintenance experience;
- keep existing no-Day-29 protections.

---

## 17. REFLECTION UX

Reflection is its own mobile-native action where source content includes reflection.

Reflection detail:

```txt
END-OF-DAY REFLECTION
Write 3 sentences.

Prompt 1
[text area]
Prompt 2
[text area]
Prompt 3
[text area]

Saved privately on this device in this preview.
[ Save ]
[ Mark complete / Skip for now depending on rule ]
```

No simulated paper lines.
No hidden analysis.
No confusing save state.

---

## 18. REFLECTION PRIVACY

Current rule:

```txt
DO NOT ANALYZE JOURNAL TEXT.
```

Reflection text must not be used for:

- analytics;
- recommendations;
- personalization;
- engagement scoring;
- marketing;
- psychological inference;
- AI analysis.

Production privacy/storage remains future work.

---

## 19. REMINDER UX

Every appropriate task may show optional reminder UI.

Task reminder flow:

```txt
[ Set Reminder ]

When would help?
Suggested: Within 1 hour of waking
Choose time: 3:30 PM

[ Save reminder ]

Reminder set ✓
3:30 PM
[ Edit ] [ Turn off ]
```

Reminder UI must be simple, opt-in, editable, and disableable.

---

## 20. SHIFT-AWARE REMINDER MODEL

Future model: source semantic timing + user rhythm → suggested clock time.

Example:

```txt
Source: Within 1 hour of waking
User wake time: 3:00 PM
Suggested reminder: 3:30 PM
```

Near-term prototype may present the semantic suggestion and let the user choose time manually. Do not build full schedule infrastructure in Horizon 1 unless explicitly approved.

---

## 21. REMINDER TECHNICAL CAPABILITY MATRIX

Current known state from prior inspection:

| Capability | Current status | UX label |
|---|---|---|
| HTTPS preview | Available through temporary tunnel | Suitable for prototype access. |
| Browser Notification API | Desktop browser exposed it during inspection | Platform-specific, not sufficient alone. |
| Service worker/controller | No app service worker currently controlling page | Real push not implemented. |
| Manifest/PWA install | Not configured in current prototype | iPhone background delivery not verified. |
| Backend push | Not implemented | Future infrastructure. |
| Native wrapper | Not implemented | Future platform decision. |
| iPhone lock-screen delivery | Not verified | Do not claim. |
| Android background delivery | Not verified | Do not claim. |

Required status wording until proven:

```txt
REMINDER UX / ARCHITECTURE READY
REAL DELIVERY NOT VERIFIED
```

---

## 22. REMINDER DEEP-LINK ARCHITECTURE

Future reminder identity must include:

```txt
programId
dayNumber
taskId
reminderId
```

A reminder should resolve to the exact task detail when valid.

Fallbacks:

- invalid task → Today’s Plan;
- completed task → no unnecessary reminder where technically possible;
- completed program → My Path / completed program state;
- unsupported platform → preference saved only, delivery unverified.

---

## 23. PERSISTENCE MODEL

Persist only necessary prototype state:

- currentDay;
- dayTaskProgress;
- completedDays;
- saved reflections/drafts where used;
- reminder preferences;
- favourites/recents as already approved;
- local prototype metadata/version.

Do not store unnecessary sensitive data.

---

## 24. CURRENT → PROPOSED STORAGE MIGRATION

Current state includes section-based progress and localStorage prototype state.

Proposed migration:

1. Preserve existing storage keys until a versioned migration is approved.
2. Add optional `dayTaskProgress` without deleting `daySectionProgress`.
3. Derive initial task progress conservatively: do not mark tasks complete unless existing state proves completion.
4. Preserve saved reflections.
5. Preserve favourites/recents.
6. Add malformed-state recovery tests.
7. Provide rollback strategy before code changes.

No silent wipe.

---

## 25. SOURCE TRACEABILITY MODEL

Required internal chain:

```txt
PROGRAM → WEEK → DAY → TASK → SOURCE SECTION / SOURCE BLOCK
```

For Day 1:

```txt
Source file: week-01-source.docx
Source location: extracted block 87–197
Task source section: day-section-04-continue
```

Normal users should not see this metadata. Engineering/content governance must retain it.

---

## 26. SOURCE TRANSFORMATION RULES

Allowed transformations:

- headings;
- short paragraphs;
- bullets;
- numbered steps;
- accordions/disclosures;
- mobile text inputs;
- task cards;
- spacing;
- clearer grouping.

Not allowed without approval:

- substantive content changes;
- invented durations;
- invented benefits;
- strengthened health/science claims;
- deleted required content;
- fake tasks.

Flag claims such as “This tells the brain: You are safe” and “Order signals safety to the brain” for future SME review rather than embellishing.

---

## 27. ACCESSIBILITY REQUIREMENTS

Each task card must expose meaningful accessible name/state.

Example:

```txt
Walk and Stretch. Physical activity. About twenty minutes. Suggested within one hour of waking. Not complete. Open task.
```

Requirements:

- semantic headings;
- 44px+ touch targets;
- Large Text resilience;
- VoiceOver/TalkBack labels;
- no color-only completion;
- logical focus;
- reduced motion;
- visible focus;
- adequate contrast.

Human accessibility verification remains NOT VERIFIED until performed.

---

## 28. MOBILE ERGONOMIC REQUIREMENTS

Task cards/buttons must be:

- large enough to tap;
- clearly separated;
- one-hand friendly;
- vertically scannable;
- not crowded horizontally;
- resilient with mobile keyboard for reflections;
- tested at common iPhone and Android widths.

Avoid precision tapping and dense clusters.

---

## 29. DAY 1 GOLDEN DATASET MAPPING

Canonical Day 1 source content inspected from `src/programContent.ts`.

Owner correction locked 2026-10-04:

```txt
DAY PAGE = ROADMAP ONLY.
TASK PAGE = DEPTH.
EACH TASK IS A DOOR.
MARK AS DONE IS INSIDE THAT TASK.
SCIENCE IS SPECIFIC TO THAT TASK.
```

Science source of truth: `docs/PATH_TO_RISE_DAY_1_TASK_SCIENCE_MATRIX.md`.

| Seq | Type | Category | Task title | When | Duration | Required? | Completion rule | Reminder eligible | Source |
|---:|---|---|---|---|---|---|---|---|---|
| 0 | EDUCATION | intro | Objective of Day 1 / What to Expect | Before tasks | n/a | No task; day intro | Read/view only | No | `day-section-02-objective-of-day-1` |
| 1 | ACTION | physical | Walk + Stretch | Within 1 hour of waking | 15-min walk/stroll + 5-min stretching | Yes | Mark as done after performing | Yes | `day-section-04-continue` |
| 2 | REFLECTION/ACTION | emotional | Write One Page Without Stopping | After physical task | not specified | Yes as task; text requirement needs owner confirmation | Save/mark complete per approved rule | Yes | `day-section-04-continue` |
| 3 | ACTION | spiritual | 5 Minutes of Silent Breathing | After writing | 5 minutes | Yes | Mark as done after performing | Yes | `day-section-04-continue` |
| 4 | REFLECTION/ACTION | intellectual | Answer These 3 Questions | Midday | short answers; no duration | Yes | Save/mark complete per approved rule | Yes | `day-section-04-continue` |
| 5 | ACTION | social | One Real Interaction | Afternoon or evening | no duration | Yes | Mark as done after interaction | Yes | `day-section-04-continue` |
| 6 | ACTION | environmental | 10-Minute Reset | Evening | 10 minutes | Yes | Mark as done after reset | Yes | `day-section-04-continue` |
| 7 | REFLECTION | end-of-day | End-of-Day Reflection | End of day | 3 sentences | Requires owner/content rule decision | Save/mark complete per approved rule | Optional reminder maybe, not default | `day-section-04-continue` |
| 8 | EDUCATION/TRANSITION | closing | Day 1 Reminder | After Day 1 | n/a | No task unless approved as closing acknowledgement | Read/view only | No | `day-section-05-day-1-reminder` |

Important unresolved content rule:

```txt
Day 1 source says “Complete all six. Order matters.” It also instructs End-of-Day Reflection: “Write 3 sentences.” Owner/content approval is needed on whether End-of-Day Reflection is required for Day completion or a distinct optional/strongly recommended closing reflection.
```

---

## 30. DAY 1 REFERENCE EXPERIENCE

Text wireframe using actual Day 1 content:

```txt
TODAY
DAY 1 · STABILIZE
Resetting the Baseline

WORDS ALONG THE WAY
[owner-approved Day 1 thought]

TODAY'S PLAN
0 of 6 activities complete
Reflection available for end of day

NEXT UP
Walk + Stretch
About 20 min · within 1 hour of waking
[ Open Task ]

TASKS
○ Physical — Walk + Stretch
○ Emotional — One-Page Write
○ Spiritual — Silent Breathing
○ Intellectual — 3 Questions
○ Social — One Real Interaction
○ Environmental — 10-Minute Reset

END OF DAY
○ Reflection

Need something right now?
[ Reset ]
```

Open Task example:

```txt
Walk + Stretch
About 20 min · within 1 hour of waking

WHAT
A steady walk/stroll followed by slow stretching.

HOW
1. Walk at a steady, comfortable pace.
2. Do not rush.
3. Do not use your phone.
4. Breathe slowly through your nose if possible.
5. After the walk, stretch neck, shoulders, hamstrings, and lower back.
6. Move slowly.

WHY THIS MATTERS
Walking lowers stress hormones. Stretching releases stored tension. Slow movement tells the brain the threat is over. [SME review flag for claim strength]

BENEFITS
- Lower cortisol
- Less body tension
- Better focus
- Improved mood

[ Mark as Done ]
[ Remind me ]
[ Back to Today ]
```

After completion:

```txt
✓ Walk + Stretch complete
1 of 6 activities complete

NEXT UP
One-Page Write
Suggested: after movement

[ Open Next Task ]
[ Back to Today ]
```

---

## 31. DAY 1 BEFORE/AFTER COMPARISON

Current Day 1:

- tasks are embedded in one long `Continue` source section;
- all task instructions visible in one scroll;
- source metadata appears in normal UI;
- task boundaries can visually blur;
- completion is section/day-oriented;
- per-task reminder UX does not exist;
- reflection text is document-like.

Proposed Day 1:

- Today’s Plan visible first;
- each real task is a separate card;
- each card opens one focused detail;
- WHAT/HOW/WHEN/HOW LONG appear before WHY;
- completion belongs to the task;
- Today and My Path derive progress from canonical task state;
- reflection is mobile-native;
- source traceability stays internal.

---

## 32. DAY 1 OWNER TEST PLAN

Physical iPhone owner test must verify:

1. Day 1 opens clearly.
2. Every genuine task is separated.
3. Every task card/button is tappable.
4. Each task opens independently.
5. WHAT is understandable quickly.
6. HOW is easy to follow.
7. WHEN is clear when source supports it.
8. Duration appears only where supported.
9. WHY is available without dominating.
10. Benefits are accessible where source-backed.
11. Mark as Done works.
12. Completion persists.
13. Today updates correctly.
14. Next action is understandable.
15. Reminder UX is understandable and honest.
16. Reflection UX is usable.
17. Leaving/reopening preserves progress.
18. Cards do not visually run together.
19. Scroll and tap burden feel reasonable.
20. No paper or memory is needed.

---

## 33. OWNER APPROVAL GATE

Do not scale to Days 2–28 until the owner explicitly approves the physical Day 1 interaction.

Approval cannot be inferred from:

- build passing;
- tests passing;
- screenshots;
- automated accessibility checks;
- agent opinion.

Required status before scaling:

```txt
OWNER PHYSICAL IPHONE DAY 1 TASK EXPERIENCE APPROVED
```

---

## 34. DAYS 2–28 SCALING STRATEGY

After owner approval only:

1. Use the validated Day 1 data model and components.
2. Extract each Day into canonical task units.
3. Preserve Day-specific differences.
4. Do not assume six tasks per Day.
5. Do not hand-code 27 bespoke screens if reusable rendering can safely handle it.
6. Produce source-fidelity audit matrix.
7. Run automated content/state regressions.
8. Physically retest representative days before claiming full success.

---

## 35. SOURCE-FIDELITY VALIDATION STRATEGY

For Days 1–28, validate:

```txt
DAY
EXPECTED ACTIONS
IMPLEMENTED ACTIONS
EXPECTED REFLECTIONS
IMPLEMENTED REFLECTIONS
SOURCE MAPPING
REQUIRED/OPTIONAL STATUS
SEQUENCE STATUS
PASS/PARTIAL/FAIL
```

Every canonical actionable element must be accounted for.

---

## 36. AUTOMATED REGRESSION STRATEGY

Add tests where technically appropriate for:

- missing Day;
- Day 29;
- duplicate task ID;
- missing task title;
- actionable task missing instructions;
- missing source mapping;
- invalid required/optional status;
- broken completion mapping;
- Day completing prematurely;
- Today/My Path progress disagreement;
- RESET altering Day progress;
- Toolbox altering Day progress;
- optional task blocking completion;
- resume failure;
- broken next-task selection.

Reminder tests later:

- save/edit/disable;
- permission denied/revoked;
- unsupported platform;
- completed task before reminder;
- deep-link destination.

---

## 37. HUMAN VALIDATION BOUNDARY

Automation cannot prove:

- user friendly;
- low cognitive load;
- first-responder validated;
- mobile comfortable;
- accessibility verified.

Use honest statuses:

```txt
PASS / PARTIAL / FAIL / NOT VERIFIED
```

Physical/device/human validation remains separate from automated gates.

---

## 38. RISKS / FAILURE MODES

Risks:

1. Turning education into fake tasks.
2. Making optional content mandatory.
3. Inventing timings/durations.
4. Losing source fidelity during formatting.
5. Creating artificial locks from sequence wording.
6. Breaking existing persisted progress.
7. Reminder UI implying real notification delivery.
8. RESET/Toolbox accidentally advancing program Days.
9. Reflection privacy leakage.
10. Scaling a bad Day 1 pattern across 28 days.
11. State divergence between Today/My Path/Day detail.
12. Accessibility regressions from custom cards.

---

## 39. WHAT WILL NOT CHANGE

This architecture does not authorize:

- rewriting canonical program content;
- building all 28 Days now;
- backend/auth/database work;
- real push delivery claims;
- platform migration;
- AI therapist / diagnosis;
- journal analysis;
- social/community;
- employer monitoring;
- streaks/gamification;
- hidden state changes from RESET/Toolbox;
- Day 29;
- removing Support access.

---

## 40. RECOMMENDED IMPLEMENTATION SEQUENCE

After owner approval of this architecture:

1. Create clean pre-change checkpoint.
2. Implement Day 1 canonical task model only.
3. Add migration-safe task progress state.
4. Render Today’s Plan from Day 1 task state.
5. Render individual Task Cards.
6. Render Task Detail for each Day 1 task.
7. Add per-task Mark as Done.
8. Add completion feedback + next-task/back-to-Today flow.
9. Add mobile-native reflection UX.
10. Add reminder UI/status without real delivery claims.
11. Remove normal-user source metadata from Day 1 path.
12. Add source traceability internally.
13. Add tests for task IDs, completion, Day state, no RESET/Toolbox advancement, Day 28/no Day 29 unaffected.
14. Run full gates: test/lint/build/final audit/browser smoke.
15. Start fresh HTTPS preview.
16. Owner physical iPhone Day 1 test.
17. Refine Day 1 based on owner feedback.
18. Owner approval.
19. Only then plan Days 2–28 scaling.

---

## DAY 1 VISUAL SPECIFICATION

```txt
TODAY
────────────────────────
DAY 1 · STABILIZE
Resetting the Baseline

WORDS ALONG THE WAY
[Owner-approved Day 1 thought]

TODAY'S PLAN
0 of 6 activities complete
Reflection available for end of day

NEXT UP
Walk + Stretch
About 20 min · within 1 hour of waking
[ OPEN TASK ]

TASKS
○ Physical
  Walk + Stretch
  About 20 min · within 1 hour of waking
  Reminder off

○ Emotional
  One-Page Write
  Suggested: after movement
  Reminder off

○ Spiritual
  Silent Breathing
  5 min · after writing
  Reminder off

○ Intellectual
  3 Questions
  Suggested: midday
  Reminder off

○ Social
  One Real Interaction
  Suggested: afternoon/evening
  Reminder off

○ Environmental
  10-Minute Reset
  10 min · evening
  Reminder off

END OF DAY
○ Reflection
  Write 3 sentences

Need something right now?
[ RESET ]
```

Task opened:

```txt
TASK DETAIL
────────────────────────
PHYSICAL
Walk + Stretch
About 20 min
Suggested: within 1 hour of waking

WHAT
A steady walk/stroll followed by slow stretching.

HOW
1. Walk at a steady, comfortable pace.
2. Do not rush.
3. Do not use your phone.
4. Breathe slowly through your nose if possible.
5. After the walk, stretch your neck, shoulders, hamstrings, and lower back.
6. Move slowly.

WHY THIS MATTERS ▾
BENEFITS ▾

[ MARK AS DONE ]
[ REMIND ME ]
[ BACK TO TODAY ]
```

Task completed:

```txt
✓ Walk + Stretch complete
1 of 6 activities complete

NEXT UP
One-Page Write
Suggested: after movement

[ OPEN NEXT TASK ]
[ BACK TO TODAY ]
```

Return later:

```txt
TODAY
DAY 1 · STABILIZE
2 of 6 activities complete

CONTINUE
Silent Breathing
[ CONTINUE ]
```

---

## EXPLICIT CONFIRMATION CHECKLIST

- [x] Every genuine task Day 1–28 becomes its own interactive task unit after the validated scalable architecture is applied.
- [x] Every task opens independently.
- [x] Every task provides WHAT.
- [x] Every task provides HOW.
- [x] Every task provides WHEN where supported.
- [x] Every task provides duration where supported.
- [x] Every task provides WHY where supported.
- [x] Benefits remain accessible without dominating.
- [x] Every appropriate task has individual completion.
- [x] Completion persists.
- [x] Today updates from canonical task state.
- [x] Resume works.
- [x] Required and optional content are distinct.
- [x] Education is not blindly converted into tasks.
- [x] Sequencing follows source logic.
- [x] Reminders belong to individual tasks.
- [x] Reminder delivery will not be falsely claimed.
- [x] Reflections use mobile-native input.
- [x] Journal text is excluded from analytics/personalization.
- [x] Standalone tools do not accidentally advance Days.
- [x] RESET does not accidentally advance Days.
- [x] Day 28 does not create Day 29.
- [x] Existing persisted progress receives migration protection.
- [x] Day 1 is the golden implementation pattern.
- [x] Physical owner approval is required before scaling.
- [x] Days 2–28 will use reusable architecture after Day 1 approval.
- [x] Canonical source fidelity remains protected.

```txt
DAILY TASK-BY-TASK ARCHITECTURE COMPLETE —
DAY 1 REFERENCE EXPERIENCE READY FOR OWNER REVIEW
```
