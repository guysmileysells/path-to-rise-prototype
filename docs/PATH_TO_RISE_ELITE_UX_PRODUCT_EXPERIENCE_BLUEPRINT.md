# PATH TO RISE
## ELITE UX + PRODUCT EXPERIENCE BLUEPRINT

Generated: 2026-10-04 PDT  
Status: **UX / PRODUCT EXPERIENCE BLUEPRINT ONLY — DO NOT IMPLEMENT WITHOUT OWNER APPROVAL**  
Current inspected commit: `b0fe531154e7e34b6b6e9c31853c0c6da771d445`  
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

## 1. Executive UX verdict

PATH to RISE should win by being the easiest first-responder wellness app to understand at the moment of use.

The target experience is not “lots of wellness content.” It is:

```txt
I opened it and immediately knew what to do.
```

Current verdict:

- The product direction is strong.
- The four-tab shell is still the right base.
- The source-backed program depth is valuable.
- The largest UX failure risk is **information density**: the app can become a workbook, dashboard, settings page, and content library all at once.
- Horizon 1 should not chase every differentiated idea. It should make **Day 1** feel exceptional: Today’s Plan, separate task cards, focused task detail, completion, next task, reflection, and honest reminder UI.

UX north-star:

```txt
Where am I?
What matters right now?
What should I do next?
How long will it take?
Can PATH remember this for me?
How do I get help quickly?
```

---

## 2. Current strongest experiences

Strongest current assets:

1. **Primary nav discipline:** `Today | Reset | My Path | Support` is simple and calm.
2. **Support visibility:** Support remains a primary area, aligned with safety needs.
3. **Source-backed depth:** The 28-day program gives PATH more structure than generic tool libraries.
4. **Non-punitive principle:** Existing docs and state model reject streak pressure and shame.
5. **Privacy caution:** Reflection text and notifications are treated as sensitive/prototype-limited.
6. **Visual mood:** Calm, natural, premium direction is promising.
7. **RESET as a concept:** Immediate-use area is strategically right.
8. **My Path as journey container:** Good place for progress if it stays non-judgmental.
9. **Words Along the Way:** Strong emotional thread if brief and owner-approved.
10. **Owner physical-iPhone evidence:** Real-device feedback has identified the next UX bottleneck.

---

## 3. Current highest-friction experiences

Highest friction:

1. **Day content / DayExperience:** tasks are still visually lumped together.
2. **My Path:** combines progress, map, day picker, tools, reflections, privacy notes, and day details.
3. **ToolRunner:** exposes source metadata and source-copy patterns in the consumer path.
4. **Toolbox:** risk of feeling like a long library instead of a quick finder.
5. **Notification/settings area:** useful but too infrastructure-like for a tired user.
6. **Reflection areas:** still need fully mobile-native writing interactions.
7. **RESET:** concept is right, but it can become a choice tree unless reduced.

Core diagnosis:

```txt
The content is not the problem. The presentation hierarchy is the problem.
```

---

## 4. Current visual-density problems

Observed / documented density causes:

- Too many card-like surfaces stacked together.
- Source banners and source-mode labels visible in normal use.
- Multiple buttons with similar visual weight.
- Long content blocks before the user understands the action.
- 28-day controls competing with current-day action.
- “Why/benefits/source” information competing with “do this now.”
- Repeated status pills, eyebrows, labels, and metadata.
- Large scroll surfaces without clear mode separation.

Design correction:

```txt
Use space, headings, sequence, and one primary action before using more cards, badges, or colour.
```

---

## 5. Current navigation problems

Current nav is mostly correct, but the content inside destinations needs sharper jobs.

Potential problems:

- `Today` is not yet fully “home”; it points toward the day but does not carry the full plan.
- `My Path` can become too many products in one screen.
- `Toolbox` can compete with RESET if it becomes another primary destination.
- Support must stay reachable even if nav is simplified later.
- Adding new capabilities like My Rhythm, Transition Home, Words, Loved Ones, and Reminders as tabs would fail the assignment.

Recommended nav principle:

```txt
Persistent nav stays small. Capabilities appear contextually.
```

---

## 6. Current cognitive-load problems

Cognitive-load failures to avoid:

- asking the user to mentally separate tasks inside long source text;
- making them remember what is next;
- presenting all days and all progress when they only need today;
- showing internal evidence when they need action;
- asking for permissions/configuration before value;
- making RESET require too many choices;
- making reminders feel like a settings system rather than “PATH remembers this for me.”

Tired-brain design target:

```txt
The user should not organize the app. The app organizes the experience.
```

---

## 7. Current differentiation weaknesses

PATH will not differentiate through these alone:

- breathing;
- journaling;
- reminders;
- motivational quotes;
- progress;
- resource lists;
- first-responder copy;
- beautiful visuals.

PATH differentiates when those pieces are organized around:

- today’s source-backed plan;
- shift/rhythm reality;
- 90-second usefulness;
- transition home;
- life beyond the role;
- privacy-first progress;
- memory offloading;
- low cognitive burden.

---

## 8. Proposed experience north star

The product should feel like:

```txt
PATH opens.
I know what today requires.
I see the next useful step.
I can do one thing.
I can ask PATH to remind me.
I can reset quickly.
I can transition from shift to life.
I can continue without shame.
```

Design target:

```txt
Obvious without being basic.
Powerful without being busy.
Personal without being creepy.
Structured without being rigid.
Deep without showing everything at once.
```

---

## 9. Proposed information architecture

Keep the product organized around four persistent destinations:

```txt
Today | Reset | My Path | Support
```

Contextual areas:

| Capability | Where it belongs |
|---|---|
| Today’s Plan | Today |
| Day tasks | Today + Day detail inside My Path |
| Words Along the Way | Today small moment + My Path archive |
| Task reminders | Task cards + My Reminders control centre |
| Toolbox | Reset / My Path / optional More area |
| My Shift / My Rhythm | progressive onboarding + settings/context engine |
| Transition Home | Reset + Today contextual card after approved |
| Life Beyond Uniform | My Path / Week 4 journey |
| Loved Ones | future contextual education area, not private sharing |
| Settings/data controls | secondary area, not primary tab |

---

## 10. Proposed primary navigation

Recommended for Horizon 1:

```txt
Today | Reset | My Path | Support
```

Do not change the current core nav yet.

Why:

- Today answers “what now?”
- Reset answers “I need something quickly.”
- My Path answers “where am I in the journey?”
- Support answers “how do I get help?”

Future option to evaluate later:

```txt
Today | Reset | My Path | More
```

Only consider if Support can remain universally visible and reachable without becoming hidden.

---

## 11. Today/Home wireframe specification

Today should be the app’s home experience.

Above fold target:

```txt
DAY 1 · STABILIZE

Words Along the Way
“You don’t have to rebuild everything today. Take the next step.”

TODAY’S PLAN
0 of 7 complete

NEXT UP
Walk + Stretch
20 min · within 1 hour of waking

[ Start ]

Need something right now?
[ Reset ]
```

Below fold:

```txt
Later Today
○ One-Page Write
○ Silent Breathing
○ 3 Questions
○ One Real Interaction
○ 10-Minute Reset
○ End-of-Day Reflection

[ Manage reminders ]
```

Rules:

- one primary action: Start/Continue.
- no full source blocks;
- no giant dashboard;
- no settings panel above the fold;
- Support remains reachable through nav/context.

---

## 12. Day wireframe specification

Day view is the full day container, but it must not be a document.

Recommended structure:

```txt
Day 1 — Resetting the Baseline
Week 1 · Stabilize

Today’s Plan
0 of 7 complete

Task cards
[Physical]
[Emotional]
[Spiritual]
[Intellectual]
[Social]
[Environmental]
[Reflection]

Complete Day
available only when completion rules are satisfied
```

Source-governance information stays internal or behind an unobtrusive technical disclosure, not in the default experience.

---

## 13. Task Card specification

Collapsed card information budget:

```txt
CATEGORY
Task Name
Short action description
Time / timing if supported
Status
[Primary action]
[Remind me] optional secondary
```

Example:

```txt
PHYSICAL
Walk + Stretch
Move gently, then stretch key areas.
20 min · within 1 hour of waking

[ Start ]
Remind me
○ Not complete
```

Do not include:

- full instructions;
- long benefits;
- source file names;
- source block numbers;
- multiple equal CTAs;
- badges that do not help action.

---

## 14. Task Detail specification

Task detail hierarchy:

```txt
Walk + Stretch
20 min · within 1 hour of waking

DO THIS
1. Walk at a steady, comfortable pace.
2. Do not rush.
3. Put the phone away if safe.
4. After walking, stretch neck, shoulders, hamstrings, and lower back.

[ Mark complete ]
[ Remind me ] secondary

Why this matters ▾
Benefits ▾
More detail ▾
```

Rules:

- action before education;
- mobile-native formatting;
- one primary action;
- safe exit/back;
- no source-document UX.

---

## 15. RESET specification

RESET job:

```txt
Help me quickly choose one useful action.
```

Horizon 1: keep current RESET stable while reducing obvious density where possible.

Future direction:

```txt
I HAVE
30 sec
90 sec
3 min
10 min

What would help?
Settle
Clear my head
Transition
Reconnect
Get moving
Prepare for rest

Recommendation:
Try this one thing.
[ Begin ]
[ Show another option ]
```

Avoid:

- long lists;
- diagnosis;
- 12 simultaneous need choices;
- more than one dominant recommendation.

---

## 16. 90-Second experience

This can become iconic.

Target promise:

```txt
If things are a lot, open PATH and hit 90 Seconds.
```

UX requirements:

- one-tap entry from RESET or Today;
- one recommended practice;
- no setup;
- no journaling requirement;
- clear end state;
- “Done” / “Back to Today” options.

Do not build before Daily Action System unless owner explicitly reprioritizes.

---

## 17. Toolbox specification

Toolbox job:

```txt
Help me find a tool.
```

Recommended organization:

```txt
Recent
Favourites
By time available
By need
All tools
```

Rules:

- do not default to a giant undifferentiated list;
- do not overcategorize;
- use canonical tool model;
- saved/favourite tools should be quick to reach;
- standalone tool use must not advance the 28-day program.

---

## 18. Transition Home specification

Future signature experience.

Target use:

```txt
Shift ended → open PATH → Transition Home → 60–180 seconds → close app
```

Conceptual wireframe:

```txt
Transition Home
Move from role mode back into life.

[ Begin ]

1. Pause
2. Exhale
3. Notice what you’re carrying
4. Decide what does not need to enter the house
5. Remember who/what you are returning to
6. Head in when ready
```

Rules:

- no incident details;
- no forced writing;
- no trauma-cure implication;
- no guilt if skipped;
- privacy-safe reminder copy only if later supported.

---

## 19. My Path specification

My Path job:

```txt
Show where I am without judging me.
```

Recommended default view:

```txt
My Path
Week 1 — Stabilize
Day 1 current
0 of 7 actions complete

[ Open Today’s Plan ]

Journey
Week 1 / Week 2 / Week 3 / Week 4

Review
Reflections
Words Along the Way
Saved tools
```

Rules:

- no “behind” language;
- no streaks;
- no dense 28-button wall on first view;
- no full day reader by default;
- journey map and reflection review are secondary.

---

## 20. Words Along the Way specification

Job:

```txt
Give the user one meaningful thought to carry today.
```

UX:

```txt
WORDS ALONG THE WAY
“You don’t have to rebuild everything today.
You only have to take the next step.”
```

Rules:

- one thought;
- no feed;
- no large quote graphics;
- no quote spam;
- no future-day spoilers by default;
- owner approves all 28 before product entry.

Archive location: My Path, quiet secondary section.

---

## 21. My Shift/My Rhythm specification

Job:

```txt
Help PATH fit real schedules without making setup hard.
```

Progressive approach:

First session optional quick question:

```txt
What best describes your rhythm?
Days / Nights / Rotating / On call / Retired / Custom / Skip
```

Later configuration:

```txt
Wake time
Shift start
Shift end
Sleep time
Days pattern
Timezone
```

Rules:

- not required for first value;
- do not collect employer/unit/location/incident details;
- schedule affects timing, not program meaning.

---

## 22. Reminder UX specification

Reminder job:

```txt
Help PATH remember what the user asked it to remember.
```

Task flow:

```txt
[ Remind me ]

When would help?
Suggested: within 1 hour of waking
Choose time: 3:30 PM

[ Save reminder ]
```

States:

```txt
Reminder off
Reminder set · 3:30 PM
Permission needed
Delivery not verified on this device
```

Never request notification permission until the user asks for a reminder.

---

## 23. Reminder management specification

Job:

```txt
What will PATH remind me about?
```

Wireframe:

```txt
My Reminders

Today’s Activities
Walk + Stretch · 3:30 PM · ON [Edit]
3 Questions · 8:00 PM · OFF [Edit]

Shift Transitions
Transition Home · off

Daily Plan
off

Words Along the Way
off

[ Pause all ]
```

Rules:

- visible;
- editable;
- disableable;
- pause all;
- no hidden reminders;
- no six-reminder default.

---

## 24. Reflection specification

Job:

```txt
Support private writing where source requires it.
```

UX:

```txt
Reflection
Question prompt

[ text area ]

Saved privately on this device in this preview.

[ Save ]
[ Skip for now ]
```

Rules:

- no simulated paper lines;
- no forced journaling unless source requires completion;
- no hidden analysis;
- no home-screen exposure;
- no production privacy claims while localStorage prototype.

Keyboard behavior must be tested on phone.

---

## 25. Loved Ones entry architecture

Future contextual entry, not Horizon 1 build.

Job:

```txt
Help a partner/family member understand the journey without seeing private work.
```

Possible entry:

```txt
Supporting someone on the PATH?
Understand this week’s focus.
[ Learn more ]
```

Hard wall:

- no journal text;
- no RESET selections;
- no completion status;
- no inferred emotional state;
- no partner monitoring.

Loved Ones content should be educational, not surveillance.

---

## 26. Life Beyond Uniform architecture

Strategic pillar, especially Week 4.

Themes:

- identity;
- relationships;
- purpose;
- values;
- play;
- connection;
- retirement;
- who am I now?

UX rule:

```txt
Reveal naturally through the journey, not as a giant content library.
```

Do not frame occupational identity as pathology. Help the user make room for more than the role.

---

## 27. Support architecture

Job:

```txt
Help me find appropriate support.
```

Requirements:

- reachable quickly;
- never paywalled;
- not dependent on account/program completion;
- clear crisis boundary;
- calm, not alarmist on every screen;
- region/resource configuration required before public release.

Support should be one of the few things allowed to break the “only one action” rule when safety requires it.

---

## 28. Onboarding flow

First session should reach value fast.

Recommended first open:

```txt
PATH TO RISE
RESET • REGULATE • RISE
A practical 28-day path built for life in and beyond the uniform.

[ Begin ]
```

Then optional minimal questions:

```txt
What best fits you?
Active / Transitioning / Retired / Prefer not to say

What best describes your schedule?
Days / Nights / Rotating / On call / Custom / Not applicable
```

Rules:

- no account wall;
- no medical history;
- no notification permission;
- no 15-question setup;
- skip allowed.

---

## 29. Returning-user flow

After absence:

```txt
Welcome back.
Continue Day 6.

[ Continue ]
[ Reset now ]
```

Never:

```txt
4 days missed
Streak lost
You're behind
```

Returning user should not relearn the app.

---

## 30. Empty/error/offline/loading states

Empty states:

```txt
No favourites yet.
Save tools you want to find quickly.
[ Browse tools ]
```

Error states:

```txt
We couldn’t load this right now.
Your saved progress has not been changed.
[ Try again ]
```

Only claim preserved state if technically true.

Offline states:

```txt
You’re offline.
Downloaded PATH tools are still available.
```

Only show if verified.

Loading:

- avoid unnecessary spinners;
- Today and RESET should feel immediate;
- use stable layout only when helpful.

---

## 31. Accessibility requirements

Minimum requirements:

- semantic headings;
- 44px+ touch targets;
- readable text size;
- Large Text resilience;
- reflow;
- VoiceOver/TalkBack labels;
- logical focus order;
- reduced motion;
- contrast;
- no color-only state;
- no tiny metadata;
- keyboard/input flows tested.

Automated accessibility checks are not enough. Physical/manual testing remains required.

---

## 32. Mobile ergonomics

Mobile-first rules:

- primary action within comfortable thumb reach;
- no crowded horizontal action rows;
- no precision tapping;
- no unsafe edge controls for critical actions;
- adequate vertical spacing;
- one-hand use considered;
- test common iPhone and Android widths;
- test with keyboard open.

Task cards should feel tappable, separated, and scannable.

---

## 33. Design-system refinements

Audit and refine:

- type scale;
- spacing scale;
- card rules;
- buttons;
- status states;
- inputs;
- disclosures;
- progress indicators;
- empty/error states;
- navigation;
- motion;
- colour tokens.

Key refinement:

```txt
Not everything needs to be a card.
```

Use open space, section headers, and quiet separators.

---

## 34. Content hierarchy rules

Default hierarchy:

1. What is this?
2. What do I do?
3. How long / when?
4. Primary action.
5. What comes next?
6. Why / benefits / examples.
7. Source/governance detail.

If Why appears before Do This, the hierarchy is probably wrong for action screens.

---

## 35. Progressive-disclosure rules

Ask:

```txt
Does the user need this before acting?
```

If no, consider:

- Learn why;
- Benefits;
- Examples;
- More detail;
- Source note.

Do not hide essential instructions.

Avoid tap hell: critical journeys must remain short.

---

## 36. Notification rules

Notifications exist only for cognitive offloading.

Rules:

- user-created;
- contextual permission request;
- discreet copy;
- editable;
- disableable;
- pause all;
- no guilt;
- no automatic multi-reminder spam;
- no sensitive lock-screen content;
- no fake delivery claims.

Every notification earns the interruption.

---

## 37. Privacy UX rules

Privacy must be visible through behavior.

Rules:

- explain sensitive input;
- do not analyze journal text;
- no hidden profiling;
- no employer access;
- no Loved Ones private data sharing;
- no production privacy claims in prototype;
- no confusing deletion controls;
- every data field earns the privacy cost.

Reflection copy example:

```txt
Saved privately on this device in this preview.
```

---

## 38. Source-traceability strategy

Normal users should not see:

- `.docx` filenames;
- source blocks;
- extracted lines;
- “read 69 more source lines.”

Internal model must preserve:

```txt
Program → Week → Day → Task → Source block
```

UX and governance are separate layers. PATH needs both.

---

## 39. Day 1 reference prototype specification

Day 1 should become the gold standard before scaling.

It must demonstrate:

- Today’s Plan;
- Words Along the Way;
- separate task cards;
- task detail;
- completion;
- next task;
- reminders UI;
- reflection input;
- return to Today;
- internal source traceability;
- no source-document UX;
- no shame;
- no fake notification claims.

If Day 1 is not excellent, do not replicate it 27 times.

---

## 40. Before/after Day 1 comparison

Before:

- tasks lumped inside source sections;
- source metadata visible;
- long scroll;
- user must mentally separate activities;
- completion tied to sections, not tasks;
- reminders not per task;
- reflection not fully mobile-native.

After target:

- Day plan visible at a glance;
- every task visually separate;
- one task opens at a time;
- WHAT/WHEN/HOW visible quickly;
- WHY/BENEFITS optional;
- task completion updates plan;
- next task shown calmly;
- reminder UI is contextual;
- source traceability internal.

Comparison metrics to capture later:

- visible decisions;
- visible words;
- scroll burden;
- tap count;
- primary-action clarity;
- task separation;
- source fidelity.

---

## 41. Core journey tap analysis

Target tap budgets:

| Journey | Target |
|---|---:|
| Open app → see next action | 0–1 taps |
| Open app → start next task | 1 tap |
| Today → complete current task | 2–3 taps after doing task |
| Task → set reminder | 2–4 taps |
| Open → RESET | 1 tap |
| RESET → one recommendation | 1–2 taps future target |
| Open → Support | 1 tap |
| Complete task → open next | 1 tap |

These are targets, not artificial constraints. If more taps add clear safety/value, justify them.

---

## 42. Cognitive walkthrough

### Open → Today

- User sees: day, thought, plan, next task.
- User thinks: “I know what to do.”
- User decides: start or reset.
- Confusion risk: too many secondary panels.
- Fix: keep Today focused.

### Task detail

- User sees: task name, do this, time/timing.
- User thinks: “This is one activity.”
- User decides: do it, remind me, or back.
- Confusion risk: why/source text before action.
- Fix: action first.

### RESET

- User sees: time/need choice.
- User thinks: “I can choose quickly.”
- User decides: pick one path.
- Confusion risk: too many needs/tools.
- Fix: one recommendation.

### Returning after absence

- User sees: welcome back, continue.
- User thinks: “I’m not behind.”
- User decides: continue or reset.
- Confusion risk: progress metrics feel punitive.
- Fix: neutral language.

---

## 43. Competitive differentiation analysis

PATH is different only if the experience feels organized around first-responder reality.

Generic wellness says:

```txt
Here are tools.
```

PATH should say through UX:

```txt
Here is what matters today.
Here is one thing to do next.
Here is something useful if you only have 90 seconds.
Here is how to transition from the role back into life.
Here is how to continue without shame.
```

Differentiation comes from:

- time available;
- shift/rhythm context;
- today’s plan;
- transition home;
- source-backed progression;
- privacy restraint;
- short successful sessions;
- life beyond the uniform.

---

## 44. Features/elements to remove

Remove or hide from normal consumer UI:

- source file names;
- source block references;
- “extracted lines” language;
- long source-document previews as default;
- equal-weight button clusters;
- redundant RESET CTAs on same screen;
- unnecessary status pills;
- tiny metadata;
- card wrappers that do not clarify grouping;
- settings controls above the fold on Today;
- destructive data controls from normal daily-use surfaces.

Remove conceptually:

- shame states;
- streak pressure;
- badges/points/coins;
- fake notifications;
- AI therapist framing;
- employer/private-data sharing.

---

## 45. Features to defer

Defer from Horizon 1:

- full My Rhythm system;
- real push/background delivery;
- native/PWA migration;
- Transition Home implementation;
- Loved Ones implementation;
- all 28-day task-card conversion;
- offline architecture;
- production auth/database;
- AI/context engine beyond simple deterministic prototype rules;
- organization/employer features;
- public launch readiness.

Reason:

```txt
Horizon 1 must prove the core daily action experience first.
```

---

## 46. Risks

Major risks:

1. **Overbuilding:** too many signature ideas at once.
2. **Generic wellness drift:** breathing/journaling/quotes without context.
3. **Workbook drift:** source fidelity without mobile action design.
4. **Privacy overclaim:** prototype localStorage mistaken for secure production storage.
5. **Fake capability:** reminder controls imply real push delivery.
6. **Notification fatigue:** too many reminders.
7. **Clinical drift:** transition/identity content sounds like therapy.
8. **Cliché drift:** first-responder language becomes macho/tactical.
9. **Accessibility debt:** visual polish without Large Text/screen-reader testing.
10. **Scaling bad pattern:** converting all 28 days before Day 1 validates.

---

## 47. Technical dependencies

Horizon 1 dependencies:

- Day 1 task model;
- task progress state;
- Today’s Plan rendering;
- TaskCard / TaskDetail components;
- mobile reflection input;
- reminder preference UI state;
- source traceability mapping;
- regression tests;
- browser smoke checks;
- physical iPhone retest.

Future dependencies:

- schedule profile model;
- context engine;
- PWA/native/background reminder decision;
- offline cache;
- secure storage/auth;
- content governance metadata;
- production privacy/security review.

---

## 48. Acceptance criteria

Day 1 reference acceptance:

- User can identify today’s work within 5 seconds.
- User can start next task in 1 tap from Today.
- Each task is visually separate.
- Task detail shows WHAT/WHEN/HOW quickly.
- WHY/BENEFITS do not overwhelm the first view.
- User can mark task complete.
- Today’s Plan updates immediately.
- Next task appears calmly.
- User can return to Today.
- Reflection is mobile-native.
- Reminder UI is clear and honest.
- No source-document metadata dominates consumer UI.
- Support remains reachable.
- No shame/streak/gamification language.
- Full automated gates pass.
- Physical iPhone retest confirms clarity before scale.

---

## 49. Physical-device test plan

Owner iPhone test, Day 1:

1. Open fresh link.
2. State what Today is asking you to do.
3. Start next task.
4. Confirm the task feels separate from other tasks.
5. Confirm WHAT/WHEN/HOW are understandable quickly.
6. Mark complete.
7. Confirm next task appears.
8. Return to Today.
9. Set/edit/disable a reminder UI state if present.
10. Open Support.
11. Report: PASS / FAIL / confusing moments.

Record:

- device;
- browser;
- URL;
- build/commit;
- screenshots if useful;
- exact confusion/friction;
- whether source content felt preserved but less cluttered.

---

## 50. Recommended implementation sequence

After owner approval:

1. Create pre-change checkpoint.
2. Build Day 1 task model from canonical source.
3. Add task progress state without breaking existing progress.
4. Build Today’s Plan for Day 1.
5. Build TaskCard.
6. Build TaskDetail.
7. Build completion + next-task flow.
8. Build mobile reflection input.
9. Add reminder UI/architecture labels without real push claims.
10. Add Words Along the Way placeholder/approved-content slot.
11. Remove consumer-facing source-document metadata from Day 1 path while preserving internal traceability.
12. Run tests/build/lint/final audit.
13. Run browser/mobile viewport smoke checks.
14. Hand owner a fresh iPhone link.
15. Stop until owner physical-device feedback.

---

# PATH UX CONSTITUTION

1. Today answers what matters now.
2. One screen has one primary job.
3. One primary action wins visually.
4. The user never has to remember the program.
5. PATH carries logistics, not emotional judgment.
6. RESET minimizes decisions.
7. Source depth remains available without dominating action.
8. No shame, streak pressure, points, coins, or badges.
9. No fake capability.
10. No unnecessary notification.
11. Private work stays private.
12. Support stays reachable.
13. Shift reality beats 9-to-5 assumptions.
14. Short sessions can be successful sessions.
15. Life outside the role matters.
16. Every tap earns its place.
17. Every notification earns the interruption.
18. Every data field earns the privacy cost.
19. If removing it changes nothing, remove it.
20. If a tired user cannot understand it, simplify it.

---

# TOP 10 HIGHEST-IMPACT UX CHANGES

1. Make Today the daily command centre.
2. Convert Day 1 into task cards.
3. Create focused task detail views.
4. Hide source-document metadata from normal UI.
5. Add completion + next-task flow.
6. Replace workbook-style reflection with mobile input.
7. Add contextual reminder UI with honest delivery state.
8. Simplify My Path default view.
9. Reduce Toolbox/library density through recent/favourites/time/need groupings.
10. Establish Words Along the Way as one short thought, not a content feed.

---

# DAY 1 REFERENCE EXPERIENCE

Target Day 1 flow:

```txt
Open Today
→ see Day 1 / Stabilize
→ read one brief Words Along the Way thought
→ see Today’s Plan
→ start Walk + Stretch
→ view focused WHAT/WHEN/HOW
→ mark complete
→ see Done + Next Up
→ open next task or return to Today
```

Day 1 must prove:

- task separation;
- low cognitive load;
- source fidelity;
- mobile-native formatting;
- reminder clarity;
- calm progress;
- physical iPhone usability.

---

# RECOMMENDED IMPLEMENTATION ORDER

Approved next build should be:

```txt
Horizon 1 — Day 1 Daily Action System Reference Prototype
```

Do **not** start with:

- platform migration;
- backend/auth/database;
- real push delivery;
- all 28 days;
- Loved Ones;
- Transition Home;
- AI personalization;
- full My Rhythm system.

Build the prototype experience first. Make the first usable slice excellent.

---

# FINAL DIFFERENTIATION ANSWER

A first responder would choose PATH over a generic wellness app if PATH does the thing generic apps do not:

```txt
It organizes the next useful step around today, time available, shift reality, source-backed progression, transition from role to life, and privacy — without making the user think harder.
```

Not more content.  
Not prettier quotes.  
Not AI.  
Not more features.

The differentiator is the product experience:

```txt
PATH knows the shape of the journey and quietly carries the plan.
The user remains in control.
```

```txt
READY FOR OWNER REVIEW —
ELITE PATH UX BLUEPRINT COMPLETE
```
