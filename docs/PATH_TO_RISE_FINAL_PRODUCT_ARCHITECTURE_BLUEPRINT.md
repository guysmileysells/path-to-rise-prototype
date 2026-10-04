# PATH TO RISE — FINAL PRODUCT ARCHITECTURE BLUEPRINT

Generated: 2026-10-03 11:15 PDT
Phase: Prompt #2 — Product Architecture Blueprint
Project: PATH to RISE Wellness for First Responders
Standard: Maximum user value. Minimum friction. No unnecessary complexity.
Status: Architecture phase only. No major features implemented. No Days 1–28 rewritten.

## Source authority and baseline

**VERIFIED** Prompt #1 is the baseline. The key baseline finding is that the current app has a strong prototype shell but does not yet contain the real Day 1–28 program experience.

**VERIFIED** Original 4-week source DOCX files are staged under:

```txt
C:\Users\I9-10900KF\projects\path-to-rise\source\programs\28-day-nervous-system-reset\raw\
```

**VERIFIED** Current prototype source is:

```txt
C:\Users\I9-10900KF\projects\path-to-rise\app
```

**FINAL RULE FOR FUTURE WORK** The original 4-week source document remains the content source of truth. The architecture may reshape presentation, flow, components, and interaction, but it must not silently rewrite, delete, or replace the program.

---

# 1. Final app architecture

## Recommended product structure

The app should feel like four simple places, with secondary areas nested inside them:

```txt
Primary nav:
Today | Reset | My Path | Support

Nested / contextual areas:
28-Day Journey → inside My Path
Toolbox → available from Today, Reset, My Path, and Profile/Settings, not necessarily a bottom tab
Progress / Insights → inside My Path and Today summaries
Journal / Reflections → inside daily lessons and My Path
Profile / Settings → header/account area
Help / Support → Support tab + contextual links from tools/daily lessons
```

This protects the current simple four-tab shell while still supporting every required product area.

## Area map

| Area | Purpose | User need | Primary action | Data required | Connection to other areas |
|---|---|---|---|---|---|
| Home / Today | One calm next step | “What do I do now?” | Continue today or Reset now | current day, resume state, recent/favourite tools, optional check-in | connects to My Path, Reset, Toolbox, Progress |
| 28-Day Journey | Core program | “Guide me through the reset.” | Continue / start / complete daily program | source days, task groups, progress, reflections | lives in My Path; extracts tools into Toolbox |
| Reset | Immediate regulation | “I need help right now.” | Select need → start tool | approved tool rules, need, duration, safety gate | uses Toolbox tools; support fallback |
| Toolbox | Reusable skills | “Find the right tool fast.” | Start a saved/relevant tool | approved tool library, favourites, recent tools | connected to Reset, daily lessons, Quick Kit |
| Progress / Insights | Gentle self-tracking | “Am I moving forward?” | View progress without pressure | completion, tools used, optional trends, wins | summarized on Today; detailed in My Path |
| Journal / Reflections | Private processing | “Capture what I noticed.” | Save/skip/edit reflection | encrypted/private entries, mode, day/tool link | daily lessons, My Path, Progress if user chooses |
| Profile / Settings | Control/privacy | “Manage my account and preferences.” | Edit privacy, reminders, accessibility, data controls | preferences, consent, account state | accessible from header, not bottom tab |
| Help / Support | Human and crisis support | “I need more than the app.” | Reach support level/resource | verified resources, region/fallback, trusted contacts | primary tab; available from tools and lessons |

---

# 2. Navigation hierarchy

## Primary navigation

**RECOMMENDED** Keep the current bottom nav:

```txt
Today | Reset | My Path | Support
```

Why:

- It is already implemented.
- It is low cognitive load.
- It keeps immediate regulation and human support one tap away.
- It prevents the app from becoming a dashboard with too many destinations.

## Secondary navigation

Inside primary areas:

```txt
Today
  - Continue Today
  - Reset now
  - Favourite / recent tool
  - View progress summary

Reset
  - Need picker
  - Recommended tool
  - Tool session
  - Optional save / repeat / support

My Path
  - 28-Day Journey
  - Seven-Day Reset / starter program if still kept
  - Progress / Insights
  - Journal / Reflections
  - Day 28 completion / maintenance plan

Support
  - Personal tools
  - Trusted person / peer / chaplain
  - Professional support
  - Crisis support / 9-8-8 / emergency resources

Header / Profile
  - Account
  - Privacy
  - Accessibility
  - Reminders
  - Data export/delete
```

## Contextual navigation

Use contextual entry points instead of extra tabs:

- Daily lesson → `Need a reset?`
- Completed tool → `Save to favourites`, `Use again`, `View related day`
- Journal prompt → `Save`, `Skip`, `Continue`
- Missed days → `Continue where you left off`, `Repeat previous day`, `View week`
- Day 28 → `Build maintenance plan`, `Open Toolbox`, `Review tools learned`

## Screens to combine or avoid

**RECOMMENDED** combine:

- Toolbox and Quick Kit concepts unless there is a strong reason to split them. Quick Kit can be the user’s saved/favourite subset of Toolbox.
- Progress and Insights as one area; avoid separate “analytics” feeling.
- Journal and Reflections as one private writing system with different entry points.

**RECOMMENDED** avoid as primary tabs:

- Toolbox
- Journal
- Progress
- Settings
- Profile

They matter, but they should not crowd the main nav.

---

# 3. Home / Today architecture

Home must feel like a calm command centre, not a dashboard.

## Above the fold — essential

**RECOMMENDED layout:**

1. Warm status line:
   - `Welcome back. Start where you are.`
2. Current journey card:
   - `Week X of 4`
   - `Day X of 28`
   - `Today’s Focus`
   - estimated time
3. Primary CTA:
   - `Continue Today`
4. Secondary CTA:
   - `Reset now`

## Secondary — useful

- Favourite / recent tool
- Small no-pressure progress line:
  - `You’ve completed 6 practices. One practice still counts.`
- Optional daily check-in if useful and not required.

## Contextual — shown only when relevant

- Missed days:
  - `Welcome back. Continue when you’re ready.`
- Unfinished day:
  - `Resume where you stopped.`
- After difficult tool use:
  - `Want to save this to your Toolbox?`
- Day 28 complete:
  - `Review your maintenance plan.`

## Deeper — available when requested

- Full 28-day calendar
- Full progress / insights
- Full journal list
- Profile/settings
- Support resources

## Home rule

**DO NOT** make Home show everything. Home should answer only:

```txt
Where am I?
What do I do today?
What if I need something right now?
```

---

# 4. 28-Day Journey architecture

## Core principle

**RECOMMENDED** The 28-Day Journey should preserve every day’s original purpose and progression while presenting it as guided mobile steps.

Do not force every day into a rigid identical template, but use a consistent container so users know what to expect.

## Reusable daily structure

Each day may include these blocks, as applicable:

```txt
1. Today’s Focus
2. Why It Matters
3. Check-In
4. Practice
5. Real-Life Tool
6. Reflection
7. Evening Reset
8. Daily Win
9. Completion
```

## Day screen hierarchy

Above fold:

- Day X of 28
- Week theme
- Day title from source
- Today’s focus
- Estimated time
- Primary action: `Start today`

During day:

- Morning card
- Afternoon card
- Evening card
- Optional reflection/journal
- Support/Reset always reachable

End of day:

- Completion summary
- Daily win
- Continue / repeat / save tool / return Home

## Start → Save → Pause → Resume → Repeat → Complete → Continue

| State | Required behaviour |
|---|---|
| Start | user sees purpose, expected time, and first action |
| Save | journal/reflection drafts autosave or clearly show unsaved state |
| Pause | user can exit without losing meaningful input |
| Resume | user returns to same day/card, not a generic start screen |
| Repeat | user can repeat a practice/day without shame |
| Complete | completion does not require optional reflection |
| Continue | app suggests next day but never punishes missed days |

## Day content data shape

**RECOMMENDED** future schema:

```ts
type ProgramDay = {
  id: string
  programId: '28-day-reset'
  dayNumber: number
  weekNumber: number
  title: string
  sourceFile: string
  sourceRefs: string[]
  purpose: string
  focus: string
  sections: DaySection[]
  reusableToolRefs: string[]
  reflectionPrompts: Prompt[]
  safetyNotes: string[]
  reviewStatus: 'draft-source' | 'needs-review' | 'approved' | 'published'
}
```

This supports Prompt #5 without rewriting source content.

---

# 5. Toolbox architecture

## Purpose

Toolbox is the permanent home for approved reusable practices. It should be organized around what the user needs, not program week or clinical categories.

## Recommended categories

- I’m Overwhelmed
- I Can’t Switch Off
- I’m Reacting
- I’m Stuck in My Head
- I’m Coming Home From Shift
- I Need to Ground
- I Need to Sleep
- I Feel Numb
- I’m Struggling With Control
- I Need to Connect

## Tool card fields

```txt
Tool title
Need category
Duration
Best moment to use
Start CTA
Favourite control
Source program/day links
Safety precondition if any
Approved text/audio availability
Review status
```

## Favourites and recent tools

**RECOMMENDED**

- Favourites = user-chosen saved tools.
- Recent tools = last used, not a judgement of what is best.
- Quick Kit = curated subset of favourites + personal supports + offline-ready items.

## Tool start/completion flow

```txt
Tool card → safety note/precondition → written/audio guidance → finish/exit → optional helpfulness → favourite/save → related next action
```

## Connection to original days

Every reusable tool should carry source lineage:

```txt
Tool → source day(s) → source section(s) → approved tool version
```

This avoids duplicate content and protects the original program.

---

# 6. RESET architecture

## Goal

RESET should answer:

```txt
What do you need right now?
```

## Shortest responsible flow

**RECOMMENDED for production:**

```txt
RESET
→ Select need
→ Recommended existing tool
→ Start
→ Complete / Exit
→ Optional next step
```

## Need options

Use plain user language, not diagnostic labels:

- Calm down
- Clear my head
- Leave work at work
- Sleep
- Reconnect
- Gain perspective
- Wake up / get moving

## Optional refinement

If needed, use one optional refinement only:

- `How much time do you have?`

Avoid long assessments under stress.

## Recommendation rule

**RECOMMENDED** Reset uses only approved Toolbox tools and approved rules.

No AI guessing.

If no safe match exists:

```txt
We don’t have the right tool for that exact need yet.
Try changing time/need, open Toolbox, or get support.
```

## Crisis separation

RESET is wellness/regulation, not emergency support.

Every Reset session should still provide a clear escape:

- `Get support instead`
- `Need urgent help?` inside Support, not as alarmist copy in every screen.

---

# 7. Core component system

| Component | Purpose | Where used | Data saved | Accessibility | Interruption/error behaviour |
|---|---|---|---|---|---|
| Check-in | Capture current state lightly | Today, Reset, daily lesson | optional state/need/time; retention TBD | large controls, clear labels | skip allowed; no diagnosis |
| Slider | Simple self-rating | progress/trends only if approved | optional trend value | labels at endpoints, not colour-only | unsaved state visible |
| Checklist | Break tasks into steps | daily cards, tool steps | completion per item/day | semantic list/checkbox state | local draft until saved |
| Timer | Support timed practices | breathing, stillness, resets | started/completed, not raw behaviour unless needed | pause/stop, no forced audio | pause/resume; app sleep recovery |
| Breathing guide | Reduce cognitive load | Reset, tools, daily spiritual tasks | optional completion | reduced motion alternative, text fallback | stop anytime |
| Grounding sequence | Fast regulation | Reset, Toolbox | optional completion/helpful | plain steps, screen reader order | exit/support always present |
| Journal field | Private reflection | lessons, journal modes | encrypted/private text | autosave status, large text | preserve draft; edit/delete |
| Expandable education | Keep depth without overload | Why it matters, safety notes | no user data | button state announced | collapsed by default |
| Audio | Hands-free guidance | tools, lessons | playback progress maybe local | transcript, captions, speed controls | pause/resume; no surprise playback |
| Tool card | Find/start practice | Toolbox, Today, Reset result | favourite/recent/session | title, duration, clear CTA | unavailable state explains why |
| Progress indicator | Encourage continuation | Today, My Path | derived from completions | not colour-only | no streak punishment |
| Completion state | Close loop gently | tools/days/weeks | completion event with idempotency | clear status | retry-safe saves |
| Favourite control | Save useful tools | Toolbox, tool complete | favourite ID | labelled toggle | optimistic update only if recoverable |

---

# 8. Data and state requirements

## Existing data to reuse

**VERIFIED in current app:**

- `states`
- `needs`
- `timeChoices`
- exact 20 `toolInventory` titles
- `sevenDayReset` starter mapping
- `twentyEightDayWeeks`
- `lessonParts`
- `quickKitComponents`

## New data required

- 28-day source content records.
- Day section/task structure.
- Source references and provenance.
- Content review status.
- Tool version records.
- Reset recommendation rules.
- User progress/completions.
- Reflection/journal entries.
- Personal wins.
- Favourite tools.
- Recent tool sessions.
- Preferences/accessibility/reminder settings.
- Support resources with verification metadata.

## Data we should not collect by default

- Employer/department/private role details unless required and approved.
- Exact location for support resources; region selection is safer.
- Journal text in analytics/logs.
- Support-click history unless there is a clear user benefit and privacy approval.
- Sensitive push notification content.
- Diagnostic inferences.
- Raw free-text content for product analytics.

## State model

Start simple:

```txt
App session state → current screen/tool/day
Content state → published approved content + draft-source inventory
User state → progress, favourites, journal, preferences
Derived state → progress summaries and insights
```

---

# 9. Critical user flows

## New User → Onboarding → Day 1

```txt
Open app
→ privacy/scope intro
→ optional account/onboarding
→ Today
→ Start Day 1
→ see focus/time/first action
```

Keep onboarding minimal. Do not force deep personal disclosure before the user receives value.

## Returning User → Home → Continue

```txt
Open app
→ Today shows current day/card
→ Continue Today
→ resume exact card or day overview
```

## Home → Today’s Day → Complete → Progress

```txt
Today
→ Continue Day X
→ complete required practice(s)
→ optional reflection
→ Daily Win
→ progress updates gently
```

## Need Regulation → RESET → Tool

```txt
Reset
→ select need
→ optional time
→ one approved tool
→ safety gate if needed
→ start
→ finish / repeat / support
```

## Toolbox → Tool → Complete/Favourite

```txt
Toolbox
→ choose need category
→ choose tool
→ start
→ complete/exit
→ favourite or save to Quick Kit
```

## Missed Days → Return Without Shame → Continue

```txt
Open app after gap
→ Welcome back. Start where you are.
→ Continue Day X / repeat previous day / view week
```

No streak reset. No failure language.

## Day 28 → Completion → Maintenance

```txt
Complete Day 28
→ completion reflection
→ tools learned
→ favourite practices
→ maintenance plan
→ continue Toolbox/check-ins without dependency
```

---

# 10. Technical architecture

## Current architecture

**VERIFIED** Current app is a React/Vite/TypeScript local prototype with:

- local component state;
- hard-coded content in `pathData.ts` and `App.tsx`;
- no backend;
- no auth;
- no database;
- no persistence;
- contract/build/lint checks.

## Recommended near-term architecture

Do not replace stable tech yet. Use the current prototype to define the content and UX architecture.

Recommended next structure inside current app:

```txt
src/content/
  program28/
    days.ts
    weeks.ts
    sourceRefs.ts
  tools/
    toolInventory.ts
    resetRules.ts
src/domain/
  programProgress.ts
  resetRecommendation.ts
  contentStatus.ts
src/components/
  DayCard.tsx
  ToolCard.tsx
  CheckIn.tsx
  Timer.tsx
  ReflectionField.tsx
src/screens/
  TodayScreen.tsx
  ResetScreen.tsx
  MyPathScreen.tsx
  ToolboxScreen.tsx
  SupportScreen.tsx
```

This is not a full refactor command; it is the target architecture for future prompts.

## Future production architecture

When moving beyond prototype, use:

- mobile app: Expo/React Native or equivalent native-capable stack;
- backend: authenticated API with owner-scoped data;
- content system: versioned approved content and source provenance;
- persistence: secure user progress/journal/favourites;
- offline: verified Toolbox/Quick Kit bundle with cache integrity;
- auth: managed identity with secure recovery;
- admin/CMS: later, after content schema is stable.

## Loading/error states

Every user-facing flow needs:

- loading state;
- save pending/saved/failed state;
- offline state;
- unavailable tool state;
- content withdrawn/needs update state;
- auth expired state;
- support fallback.

---

# 11. Protect what works — DO NOT BREAK list

## Non-negotiable protections

- Keep primary nav simple: `Today | Reset | My Path | Support`.
- Support and crisis resources are never paywalled.
- The app does not diagnose, monitor emergencies, or replace professional care.
- Journal/reflections are private by default.
- Employers/organizations never see individual wellness data.
- Missed days never reset progress.
- Optional reflections are not required for completion.
- RESET recommends one useful action, not a wall of options.
- Vehicle-related guidance requires parked/safe confirmation.
- Original source document remains content source of truth.
- Repetition in the program must be understood before changing it.
- Do not publish unreviewed clinical-adjacent content as approved.

## Significant recommendations matrix

| Current | Proposed | Why | User benefit | Technical impact | Risk |
|---|---|---|---|---|---|
| Four-tab prototype | Keep four-tab primary nav | simple and proven | low cognitive load | low | adding hidden complexity elsewhere |
| Static 28-Day card | Real 28-day journey in My Path | core program missing | makes app useful | medium/high | content overload if poorly chunked |
| Hard-coded placeholder content | Source-linked content architecture | preserve fidelity | trustworthy day flow | medium | parsing/review effort |
| Three-step Reset prototype | shorter need-first Reset | faster under stress | quicker help | medium | too little context for recommendation unless rules solid |
| Quick Kit stub | Toolbox + Quick Kit subset | reduce duplication | tools easy to find | medium | naming confusion |
| No persistence | privacy-first progress/journal model | resume and trust | no lost input | high | privacy/security scope |
| Simple progress text | gentle progress/insights | motivate without pressure | less shame | medium | accidental streak pressure |

---

# 12. Prepare for Prompts 3–12

## Decisions needed now to prevent rework

1. Keep four-tab nav as the primary IA.
2. Treat Toolbox as a nested/contextual area, not a primary tab unless future testing proves otherwise.
3. Treat Quick Kit as saved/favourite/offline-ready subset of Toolbox.
4. Build content architecture before full UI implementation.
5. Preserve source lineage per day/tool.
6. Use content status and review gates from the beginning.
7. Design components for mobile and accessibility from the start.
8. Do not collect private data until storage/retention controls are defined.

## Prompt sequence support

| Future prompt | Architecture support |
|---|---|
| Prompt 3 — Design System/UX | needs component hierarchy, nav, mobile states from this doc |
| Prompt 4 — Core Navigation/Home | build Today/Reset/My Path/Support shell and hierarchy |
| Prompt 5 — Day 1–28 Experience | use source-linked day schema and daily card system |
| Prompt 6 — Toolbox/RESET | use tool categories, favourites, reset rules architecture |
| Prompt 7 — Personalization | use transparent rule-based/user-selected data only |
| Prompt 8 — Progress/Insights | use no-shame progress model and derived summaries |
| Prompt 9 — Safety/Privacy/Accessibility | review gates, support boundaries, data controls |
| Prompt 10 — Notifications/Re-engagement | generic opt-in reminders only, no sensitive lock-screen copy |
| Prompt 11 — QA/Performance | critical flows and contract checks defined here |
| Prompt 12 — Final Elite Product Audit | compare final build against Prompt #1/#2 requirements |

---

# 13. Devil’s advocate review

## Are we overengineering?

Potentially, if we build CMS, backend, analytics, and native app before proving the 28-day experience. Keep the next work to architecture + visual/UX + content model before production infrastructure.

## Can anything be simpler?

Yes:

- Four bottom tabs only.
- Today shows one primary action.
- Reset starts with need, not a full assessment.
- Toolbox is need-based categories, not a complex taxonomy.
- Progress is gentle and derived, not a dashboard.

## Are there unnecessary screens?

Potentially:

- Separate Journal tab: no.
- Separate Progress tab: no.
- Separate Toolbox tab: not yet.
- Separate Settings tab: no.

## Is Home too busy?

It will be if it shows check-in, progress, favourites, tools, journal, and program calendar at once. Keep most content secondary/contextual.

## Is RESET fast enough?

The current three-step flow is acceptable for prototype, but production should test a faster need-first flow. A stressed user should not answer more than one or two questions before seeing something useful.

## Are we preserving the original program?

Yes if—and only if—Prompt #3–#5 do not jump into UI rewriting before a full Day 1–28 content inventory exists.

---

# Key risks and dependencies

## Risks

- Turning the program into a workbook/PDF inside an app.
- Accidentally shortening content until meaning changes.
- Overloading Home with too much data.
- Making Reset too slow or too assessment-like.
- Collecting sensitive data before privacy architecture is ready.
- Building advanced features before source fidelity is solved.
- Publishing unreviewed clinical-adjacent claims.

## Dependencies

- Full Day 1–28 structured content inventory.
- Content-owner review.
- Clinical/safety review.
- Legal/privacy review.
- Support resource verification.
- Accessibility review.
- Decision on starter Seven-Day Reset vs core 28-Day prominence.
- Decision on prototype/web vs native mobile build path for production.

---

# Implementation sequence

## Phase A — Architecture/data foundation

1. Create source-linked Day 1–28 inventory.
2. Define content schemas for program days, sections, tools, review status.
3. Define Reset recommendation rule model.
4. Define user state model: progress, favourites, reflections, preferences.
5. Add architecture contract tests for nav/source/content counts.

## Phase B — UX blueprint and design system

1. Mobile design system.
2. Today screen blueprint.
3. 28-day overview and day detail wireframes.
4. Reset flow wireframes.
5. Toolbox/Quick Kit wireframes.
6. Progress/Journaling states.

## Phase C — Prototype implementation

1. Implement content-driven My Path shell.
2. Implement Day 1 sample from source inventory.
3. Implement reusable daily cards.
4. Implement Reset/Toolbox shell with approved placeholder status.
5. Browser/mobile QA.

## Phase D — Production readiness later

1. Auth/storage/security.
2. Real persistence.
3. Offline Quick Kit.
4. Clinical/legal/content approval workflow.
5. Native/TestFlight path.

---

# Acceptance criteria for moving forward

Before Prompt #3 should begin, this architecture is acceptable if:

- Four-tab primary nav is confirmed as the baseline.
- Toolbox/Journal/Progress/Settings are confirmed as nested/contextual, not bottom tabs for now.
- My Path is confirmed as the home for the 28-Day Journey.
- RESET is confirmed as need-first and fast, with Support separate.
- Day 1–28 source fidelity remains mandatory before full implementation.
- No private data collection is approved before privacy/storage decisions.
- Prompt #3 focuses on design system and UX, not rewriting source content.

---

# Exact foundation Prompt #3 should address

Prompt #3 should produce the **Design System / UX Blueprint** for this architecture, specifically:

1. Visual language: calm, strong, premium, first-responder credible, Pacific/Nature-inspired without cliché.
2. Mobile component rules: cards, buttons, typography, spacing, motion, empty/loading/error states.
3. Screen blueprints for:
   - Today
   - Reset need-first flow
   - My Path / 28-Day Journey overview
   - Daily lesson card structure
   - Toolbox category/tool card
   - Support
4. Accessibility baseline: contrast, dynamic text, reduced motion, touch target minimums, screen-reader labels.
5. No implementation beyond design/UX specs unless explicitly requested.

READY FOR PROMPT #3 — DESIGN SYSTEM / UX
PATH to RISE Wellness for First Responders
RESET • REGULATE • RISE
