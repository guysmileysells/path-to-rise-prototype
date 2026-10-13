# PATH TO RISE
## WORDS ALONG THE WAY — IMPLEMENTATION + CONTENT VALIDATION REPORT

Generated: 2026-10-04 PDT  
Status: **PRE-IMPLEMENTATION VALIDATION REPORT — NO PRODUCT CODE CHANGED**  
Source inspected: `src/programContent.ts` exported `programContent` for Days 1–28.  
Owner-proposed content source: Discord attachment `doc_9094b8bf28e7_message.txt`.  
Near-term constraint: build the app prototype and approved/source-backed content; backend/auth/database/real push delivery come later.



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

## 1. Feature architecture
Words Along the Way is a day-linked perspective layer, not a task, RESET tool, Toolbox tool, reflection requirement, completion requirement, score, streak, or gamification surface. Each canonical Day gets one entry with `TODAY'S EDGE`, `WHY IT MATTERS`, and `TRY THIS TODAY`; `CARRY THIS WITH ME` remains optional and can be built later if it adds value without delaying Day 1.

Conceptual model:
```ts
type WordsAlongTheWayEntry = {
  day: number
  week: number
  weekTheme: string
  title: string
  message: string
  whyItMatters: string
  tryThisToday: string
  sourcePrinciple?: string
  evidenceStatus: 'prototype-copy-reviewed' | 'needs-sme-review'
  alignmentStatus: 'PASS' | 'PARTIAL' | 'FAIL'
}
```

## 2. Today placement
Use a collapsed Today presentation so it does not push Today's Plan too far down on mobile:
```txt
WORDS ALONG THE WAY
Start Where You Are
"You don't need to fix your whole life today..."
[ Read today's edge ]

TODAY'S PLAN
...
```
Full Edge/Why/Try content opens in a focused view/sheet and returns to Today. Today's Plan remains the primary practical action area.

## 3. Mobile UX
Mobile presentation should be compact, calm, and action-preserving: one short teaser on Today, one focused opened state, no quote-card social aesthetic, no giant decorative quotation marks, no bright motivational gradients, no military cliché styling, and no completion pressure.

## 4. Content data model
The Words model should be separate from `DailyTask`. It may reference canonical Day metadata but must not participate in task/day completion state. The same entry should power Today, Day intro, and a future archive to avoid content drift.

## 5. Day 1–28 canonical alignment table
| Day | Canonical focus | Proposed edge | Alignment | Science status | Language status | Recommendation |
|---:|---|---|---|---|---|---|
| 1 | Resetting the Baseline — The purpose of Day 1 is to begin resetting the body and mind to a stable baseline. | START WHERE YOU ARE — "You don't need to fix your whole life today. You need one honest starting point and one next step." | PASS | PASS | PASS | Strong match to Day 1 baseline/start/one next step. |
| 2 | Creating Consistency and Control — The purpose of Day 2 is to build consistency. | CONSISTENCY BEATS INTENSITY — "You don't need your best day. You need another day of showing up." | PASS | PASS | PASS | Strong match to Day 2 consistency/control. |
| 3 | Increasing Awareness Without Overloading the System — The purpose of Day 3 is to continue stabilizing the nervous system while increasing awareness in a controlled way. | NOTICE BEFORE YOU CHANGE — "You can't change every reaction in the moment. But you can start noticing what happens before the reaction." | PASS | PASS | PASS | Strong match to Day 3 awareness without overload. |
| 4 | Building Control Through Routine — The purpose of Day 4 is to build a stronger sense of control through routine. | RETURN TO WHAT'S HERE — "Your mind can live in yesterday or race into tomorrow. Your next decision can only happen here." | PARTIAL | PASS | PASS | Useful present-focus message; Day 4 canonical focus is routine/control, so tie copy more explicitly to routine. |
| 5 | Releasing Tension Without Losing Control — The purpose of Day 5 is to begin releasing stored tension in a controlled and safe way. | YOUR BODY IS INFORMATION — "Sometimes your body notices the load before your words do." | PASS | PASS | PASS | Strong match to stored tension/body cues. |
| 6 | Strengthening Emotional Control Without Suppressing — The purpose of Day 6 is to strengthen emotional control without going back to emotional shutdown. | KEEP ONE PROMISE TO YOURSELF — "Confidence isn't only something you feel. Sometimes it's evidence you build." | PARTIAL | PASS | PASS | Self-efficacy is useful, but Day 6 canonical focus is emotional control without suppression; connect promise-keeping to noticing/choosing response. |
| 7 | Grounding the System and Preparing for the Next Phase — The purpose of Day 7 is to ground the system, reinforce the routine you have built this week, and prepare the mind and body for the next phase of the program. | LOOK BACK BEFORE MOVING FORWARD — "Progress can be quiet enough to miss if you never stop to look for it." | PASS | PASS | PASS | Strong match to weekly grounding/review. |
| 8 | Seeing What Is There Without Avoidance — The purpose of Day 1 is to begin observing your internal world more honestly without immediately trying to escape, numb, distract, or fix it. | CURIOSITY OVER JUDGMENT — "Awareness isn't about finding what's wrong with you. It's about noticing what's been running in the background." | PASS | PASS | PASS | Strong match to awareness without avoidance and nonjudgmental observation. |
| 9 | Recognizing Patterns — The purpose of Day 2 is to begin identifying patterns operating beneath your daily behaviors, emotions, thoughts, and reactions. | NAME WHAT'S THERE — "What you can name becomes easier to work with than something you only feel." | PARTIAL | PASS | PASS | Precise emotion naming helps awareness, but Day 9 title is Recognizing Patterns; consider adding pattern language. |
| 10 | Increasing Honesty — Objective: / To remove emotional filtering and begin telling the truth about what is actually happening internally, without shame, judgment, or avoidance. / Today is about honest observation. Not fixing everything. Not blaming yourself. Not forcing emotion. Just telling the truth. | FIND THE PATTERN — "One moment can feel random. Repeated moments can reveal a pattern." | PARTIAL | PASS | PASS | Pattern message is good but overlaps Day 9; Day 10 is Increasing Honesty, so make honesty more explicit. |
| 11 | Understanding Internal Pressure — Objective: / To identify the sources of internal stress, emotional weight, expectations, perfectionism, comparison, fear, and pressure that keep the nervous system activated. / Today is about understanding what pressure is real, what pressure is self-created, and what pressure comes from fear. | THE PAUSE IS POWER — "You don't control every first reaction. You can build more space before the next one." | PARTIAL | PASS | PASS | Pause is useful for internal pressure, but tie to pressure/reaction more directly. |
| 12 | Identifying Emotional Avoidance — Objective: / To recognize the emotional avoidance behaviors, distractions, numbing patterns, and coping mechanisms used to escape discomfort, stress, fear, shame, grief, anger, or emotional overwhelm. / Today is not about judging coping mechanisms. Today is about becoming aware of them. | LOOK AT WHAT YOU AVOID — "What you keep walking around may be worth looking at — not all at once, just honestly." | PASS | PASS | PASS | Strong match to identifying emotional avoidance. |
| 13 | Taking Ownership — Objective: / To increase personal responsibility, self-leadership, and forward movement without shame, self-attack, or perfectionism. / Ownership is not self-blame. | TELL YOURSELF THE TRUTH — "Honesty isn't punishment. It's accurate information about where you are." | PASS | PASS | PASS | Strong match to taking ownership/honesty. |
| 14 | Full Awareness & Preparation For Week 3 — Objective: / To consolidate the awareness, honesty, emotional insight, nervous system understanding, and personal observations developed throughout Week 2 while preparing mentally, emotionally, physically, and spiritually for the deeper emotional release work in Week 3. / Week 2 was never about perfection. | NOTICE WHAT YOU'VE LEARNED — "Two weeks ago you were starting. Today you have evidence." | PASS | PASS | PASS | Strong match to Week 2 review/preparation. |
| 15 | Accepting What Is — Objective: To begin reducing emotional resistance by accepting current emotions, situations, thoughts, and realities instead of constantly fighting them internally. | ACCEPTANCE ISN'T APPROVAL — "Accepting what happened doesn't mean saying it was okay. It means refusing to spend the rest of your life arguing with the fact that it happened." | PASS | PASS | PASS | Strong match to accepting what is, with good distinction from approval. |
| 16 | Releasing Emotional Resistance — Objective: To begin reducing emotional suppression and resistance by allowing emotions to move safely instead of remaining trapped internally. | FEELING IS NOT FAILURE — "Having a feeling doesn't mean the feeling gets to make every decision." | PASS | PASS | PASS | Strong match to emotional movement without being ruled by emotion. |
| 17 | Letting Go Of Control — Objective: To begin recognizing unhealthy control patterns, perfectionism, hypervigilance, and over-responsibility while learning to reduce internal pressure through surrender, flexibility, and nervous system trust. | CONTROL WHAT IS ACTUALLY YOURS — "Trying to control everything can leave you with less energy for the things you actually can influence." | PASS | PASS | PASS | Strong match to letting go of control. |
| 18 | Releasing Guilt & Shame — Objective: To begin identifying, understanding, and reducing the emotional weight of guilt, shame, regret, and self-punishment patterns carried within the nervous system. | YOU ARE MORE THAN YOUR WORST MOMENT — "Accountability says: I own what happened. Shame says: what happened is all I am. Those are not the same thing." | PASS | PASS | PASS | Strong match to guilt/shame/accountability distinction. |
| 19 | Processing Anger & Resentment — Objective: To begin safely identifying, understanding, and processing anger, resentment, frustration, bitterness, and unresolved emotional tension stored within the nervous system. | ANGER MAY HAVE INFORMATION — "Anger can tell you something mattered. Wisdom is deciding what you do with that information." | PASS | PASS | PASS | Strong match to anger/resentment as information without acting automatically. |
| 20 | Self-Compassion & Forgiveness — Objective: To strengthen self-compassion, emotional softness, forgiveness, and nervous system safety while reducing harsh self-judgment and emotional self-attack. | FORGIVENESS DOESN'T REQUIRE FORGETTING — "You can stop carrying something without pretending it never happened." | PASS | PASS | PASS | Strong match to self-compassion/forgiveness boundaries. |
| 21 | Week 3 Completion & Preparation For Rebuilding — Today is about slowing down long enough to acknowledge: / OBJECTIVE OF THE DAY: Today is focused on reflecting on the emotional work completed throughout Week 3 while preparing the nervous system, mindset, habits, and environment for the rebuilding phase beginning in Week 4. / This week challenged emotional suppression, avoidance, hypervigilance, emotional overload, and nervous system exhaustion. | MAKE ROOM — "Letting go isn't only about losing something. Sometimes it's how you make room for what comes next." | PASS | PASS | PASS | Strong match to Week 3 completion/preparation for rebuilding. |
| 22 | Rebuilding Self-Trust — Objective: To begin rebuilding trust in yourself through consistency, discipline, follow-through, emotional honesty, and small daily actions that reinforce nervous system safety and self-respect. | YOU ARE MORE THAN THE ROLE — "The uniform may explain an important part of your story. It was never meant to become the entire story." | PARTIAL | PASS | PASS | Powerful Week 4 identity message; Day 22 canonical focus is rebuilding self-trust, so add self-trust wording. |
| 23 | Creating Forward Momentum — Objective: To begin creating forward movement through intentional actions, healthier routines, and future-focused thinking instead of remaining trapped in survival mode, stagnation, or emotional exhaustion. | VALUES ARE A COMPASS — "When life gets noisy, values can remind you what direction still matters." | PASS | NEEDS SME REVIEW | PASS | Values/direction aligns with forward momentum; self-affirmation research mention needs evidence registry citation. |
| 24 | Reconnecting To Purpose — Objective: To begin reconnecting to purpose, meaning, direction, and values while strengthening emotional resilience, nervous system regulation, and forward-focused identity rebuilding. | BUILD THE PERSON, NOT JUST THE HABIT — "Every repeated choice is a small vote for the kind of person you're becoming." | PARTIAL | PASS | PASS | Useful identity/habit framing, but Day 24 canonical focus is reconnecting to purpose; tie more clearly to purpose/meaning. |
| 25 | Building Confidence Through Action — Objective: To strengthen confidence, self-respect, and emotional resilience by proving to yourself through consistent action that you are capable, trustworthy, and moving forward. | CONNECTION IS PART OF STRENGTH — "Independence can get you through a lot. Connection can help make the life you're protecting worth returning to." | PARTIAL | NEEDS SME REVIEW | PASS | Connection is strategically good, but Day 25 canonical focus is building confidence through action. May fit another day unless revised. |
| 26 | Building Confidence Through Action — Objective: To strengthen confidence, self-respect, and emotional resilience by proving to yourself through consistent action that you are capable, trustworthy, and moving forward. | PURPOSE DOESN'T HAVE TO BE GRAND — "Purpose isn't always a mission statement. Sometimes it's knowing who needs you, what matters to you, and what deserves your energy." | PARTIAL | PASS | PASS | Purpose message is strong, but canonical Day 26 is also Building Confidence Through Action. Needs source check/revision. |
| 27 | Creating Healthier Future Habits — Objective: To strengthen long-term healing by identifying, building, and reinforcing daily habits that support nervous system regulation, emotional resilience, confidence, health, and continued personal growth. | PROTECT WHAT YOU'RE BUILDING — "Growth isn't only knowing what to start. It's knowing what you are no longer willing to keep feeding." | PASS | PASS | PASS | Strong match to healthier future habits/environmental cues. |
| 28 | Integration, Reflection & Preparing For Your Next Chapter — Objective: To consolidate the progress, awareness, habits, emotional growth, and nervous system improvements developed throughout the past four weeks while creating a clear foundation for continued growth moving forward. | THIS ISN'T THE FINISH LINE — "Twenty-eight days didn't create a new you. They gave you 28 days of evidence that you can participate in what comes next." | PASS | PASS | PASS | Strong match to integration and next chapter. |

## 6. Science/evidence review table
Normal mobile UX should not include academic citations. Maintain an internal evidence registry instead. Preliminary science review:
| Day(s) | Principle area | Status | Notes |
|---|---|---|---|
| 1, 4, 8, 11, 13, 15, 17 | attention, pausing, acceptance, controllability | Prototype-copy acceptable / SME review before production | Conservative wording; no guaranteed outcomes. |
| 2, 24, 27 | repetition, habits, environmental cues | Needs evidence registry | Behaviour repetition and cues are defensible but need internal source entries. |
| 6, 22, 25 | self-efficacy, identity, social connection | Needs evidence registry | Good product fit; cite/review before production claims. |
| 23 | values/self-affirmation | Needs evidence registry | The entry explicitly says research suggests; needs citation/source record. |
| All days | trauma-informed language | Needs human/SME review | Copy is careful overall; not clinical-approved. |

## 7. Claims requiring SME review
| Day | Entry | Flag |
|---:|---|---|
| 23 | VALUES ARE A COMPASS | Citation/evidence registry needed for research wording. |
| 25 | CONNECTION IS PART OF STRENGTH | Citation/evidence registry needed for research wording. |

Additional caution: entries should avoid adding unsupported nervous-system, trauma-healing, or guaranteed-change claims during implementation.

## 8. Optional Carry This architecture
`Carry This With Me` should mean `save this thought`, not like/favourite/social reaction/completion. Recommended status: **ARCHITECT NOW / BUILD LATER** unless Day 1 owner testing shows it materially improves the experience. If built, it stores only `day`/`entryId` and never affects task completion or Day progress.

## 9. Words library architecture
Future archive location: My Path → Words Along the Way. Show encountered days only by default. Do not create a quote feed, infinite scroll, social sharing surface, gamified collection, or future-day spoilers without explicit owner approval.

## 10. Reminder feasibility
Optional Words reminder is lower priority than task reminders. Current status: `REMINDER UX / ARCHITECTURE READY; REAL DELIVERY NOT VERIFIED`. Do not request notification permission on first launch. Do not add notification overload.

## 11. Accessibility
Use semantic headings, readable line lengths, adequate contrast, Large Text/reflow support, screen-reader labels such as `Words Along the Way, Day 1, Start Where You Are, read today's edge`, and reduced-motion-safe transitions. Human accessibility testing remains NOT VERIFIED.

## 12. Privacy
Opening, saving, or carrying an entry must not infer emotional state, generate resilience/mindset scores, feed analytics, or change recommendations. No behavioural profiling from motivation content.

## 13. Tests
Recommended tests before implementation/scaling:
- Day 1 maps to entry 1; Day 28 maps to entry 28; no Day 29.
- 28 entries present, no duplicate days, no empty title/message/why/try.
- Correct week mapping.
- Opening Words does not complete task/day or advance currentDay.
- Carry This does not complete task/day or advance currentDay.
- Future-day access follows program rules.
- Today remains usable if Words entry missing.
- Accessibility labels exist for collapsed/opened states.

## 14. Day 1 prototype plan
Prototype Day 1 placement only after/with the Day 1 Daily Action System reference implementation. Collapsed Today state:
```txt
DAY 1 · STABILIZE
WORDS ALONG THE WAY
Start Where You Are
"You don't need to fix your whole life today..."
[ Read today's edge ]

TODAY'S PLAN
0 of 6 complete
...
```
Opened state shows Today's Edge, Why It Matters, Try This Today, optional Carry This, and Back to Today. It must not affect completion state.

## 15. Owner validation criteria
Owner physical-iPhone test should answer: Is it useful? Powerful? Too much text? Does it push Today’s Plan too far down? Does it feel inspiring rather than cheesy? Is it clearly separate from tasks? Is Try This Today clearly optional? Does it improve Day 1?

## 16. Days 2–28 scaling strategy
Do not mass-deploy until Day 1 placement is physically approved. After approval: store all 28 entries in one canonical data module, render with one reusable component, maintain alignment/evidence status per entry, and keep future-day exposure consistent with progression logic.

## 17. Risks
Risks: adding density above Today’s Plan; becoming a quote app; making Try This feel like another task; overclaiming science; misaligning entries with exact Day source; notification overload; future-day spoilers; using saved entries for profiling; delaying Day 1 task-card implementation.

## 18. What this feature will NOT do
Words Along the Way will not complete tasks, complete Days, advance currentDay, affect Daily Plan percentage, become required reading, become a checklist, become RESET/Toolbox, analyze journals, create scores/streaks/badges, fake notifications, expose private data, or replace the Day 1 task-card system.

## Implementation sequence
```txt
CONTENT VALIDATION
→ CANONICAL DAY ALIGNMENT
→ ARCHITECTURE
→ DAY 1 IMPLEMENTATION
→ AUTOMATED TESTS
→ PRIVATE MOBILE PREVIEW
→ PHYSICAL IPHONE OWNER TEST
→ OWNER FEEDBACK
→ DAY 1 REFINEMENT
→ OWNER APPROVAL
→ SCALE REUSABLE COMPONENT TO DAYS 2–28
→ FINAL SOURCE/CONTENT VALIDATION
→ REGRESSION TESTING
```

```txt
WORDS ALONG THE WAY ARCHITECTURE + 28-DAY CONTENT VALIDATION COMPLETE —
DAY 1 READY FOR OWNER REVIEW
```