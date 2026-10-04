# PATH TO RISE — ELITE PRODUCT AUDIT & DEVELOPMENT ROADMAP

Generated: 2026-10-03 11:04 PDT
Project: PATH to RISE Wellness for First Responders
Core program: 4-Week Nervous System Reset
Status: Audit and roadmap only. No app code/content/database changes implemented.

## Evidence base

Verified sources inspected:

- Current React/Vite prototype: `C:\Users\I9-10900KF\projects\path-to-rise\app`
- Source program staging folder: `C:\Users\I9-10900KF\projects\path-to-rise\source\programs\28-day-nervous-system-reset\`
- Raw DOCX sources:
  - `raw\week-01-source.docx`
  - `raw\week-02-source.docx`
  - `raw\week-03-source.docx`
  - `raw\week-04-source.docx`
- Extracted staged overview: `overview.json` and `README.md`
- Existing handoff docs:
  - `handoff-package\PATH_to_RISE_Agent_Handoff\docs\02_CONTENT_AND_PROGRAMS.md`
  - `docs\03_SCREENS_AND_FLOWS.md`
  - `docs\04_PRIVACY_SAFETY_ACCESSIBILITY.md`
  - `docs\05_ARCHITECTURE_AND_DATA.md`
- Master Development Prompt #1, Parts 1–3 supplied in Discord attachments.

Verification run:

```txt
npm test
Contract check passed: source labels, 20-tool inventory, four-tab nav, and safety disclaimers present.
vite build passed.

npm run lint
oxlint passed.

Browser opened http://127.0.0.1:5174/
Title: PATH to RISE Prototype
Console: 0 JavaScript errors on initial load.
```

Important scope note: this audit is based on the current prototype and staged source files. It does not claim clinical, legal, privacy, or production approval.

---

# A. EXECUTIVE SUMMARY

## Overall assessment

PATH to RISE has a strong foundation: the product idea is clear, the tone is appropriate, the four-tab structure is simple, and the prototype already protects several important boundaries: support is never paywalled, placeholder guidance is labelled as not approved clinical content, and missed days are framed without shame.

The largest gap is not visual polish. The largest gap is that the real 28-day program content is not yet represented in the app experience. The current app shows a Seven-Day Reset shell and a static 28-Day Nervous System Reset overview card, while the uploaded program contains 28 daily lessons with structured practices, repetitions, reflections, and progression.

The biggest product opportunity is to transform the source document into a calm, phone-first guided experience without flattening it into a PDF/workbook. That means preserving the program’s depth while splitting each day into small, clear, tappable steps: purpose, primary action, guided practice, reflection, completion, and reusable tools.

## Biggest opportunities

1. Build a source-faithful 28-day content model before UI redesign.
2. Convert the daily program into guided morning/afternoon/evening cards with progressive disclosure.
3. Make RESET and Toolbox permanently reachable without forcing users into the 28-day path.
4. Add progress that encourages continuation without streak pressure or shame.
5. Harden safety, privacy, accessibility, and data integrity before any tester-facing release.

---

# B. PROTECT

These parts already work well or align strongly with the product direction and should remain intact.

## Verified strengths

- Four primary tabs are intact: `Today`, `Reset`, `My Path`, `Support`.
- The app avoids extra primary nav clutter such as Journal, Settings, Quick Kit, or Progress as bottom tabs.
- Today screen has a strong emotional entry point: “Leave the shift. Keep yourself.”
- RESET flow is simple: state → need → time → one recommendation.
- Support has a clear boundary: “Support is never paywalled.”
- Prototype disclaimer is visible: “Sample content, no personal data saved.”
- Clinical placeholder warning exists: “Not approved clinical content.”
- Current test contract guards key source labels, tool inventory count, four-tab nav, and safety disclaimers.
- Visual direction is calm, mature, premium, and not tactical/military cliché.

## What not to disrupt

- Do not replace the four-tab navigation unless user testing proves it fails.
- Do not remove repeated practices just because they repeat; the repetition appears intentional for regulation and habit formation.
- Do not turn RESET into a recommendation wall.
- Do not convert the product into a generic meditation app, therapy app, or gamified streak app.
- Do not publish generated wellness guidance as approved PATH content.

---

# C. CONTENT FIDELITY

## Current state

VERIFIED FINDING: the app does not yet contain the real 28-day daily program. The current app contains:

- a Free Seven-Day Reset shell;
- 20 named tool cards in `pathData.ts`;
- a static 28-Day overview card listing week themes only;
- no implemented Day 1–28 lesson screens from the uploaded DOCX program;
- no structured morning/afternoon/evening task model;
- no saved journal/reflection model;
- no source-linked app content records.

## Day 1–28 content fidelity matrix

Legend:

- Source status: verified in staged source overview/DOCX.
- Current app status: whether the day is represented in the app as a real day screen.
- Fidelity result: current implementation state, not a criticism of the source.

| Day | Source title | Current app representation | Fidelity result |
|---:|---|---|---|
| 1 | Resetting the Baseline | Not present as 28-day day screen | Missing from app |
| 2 | Creating Consistency and Control | Not present as 28-day day screen | Missing from app |
| 3 | Increasing Awareness Without Overloading the System | Not present as 28-day day screen | Missing from app |
| 4 | Building Control Through Routine | Not present as 28-day day screen | Missing from app |
| 5 | Releasing Tension Without Losing Control | Not present as 28-day day screen | Missing from app |
| 6 | Strengthening Emotional Control Without Suppressing | Not present as 28-day day screen | Missing from app |
| 7 | Grounding the System and Preparing for the Next Phase | Not present as 28-day day screen | Missing from app |
| 8 | Seeing What Is There Without Avoidance | Not present as 28-day day screen | Missing from app |
| 9 | Recognizing Patterns | Not present as 28-day day screen | Missing from app |
| 10 | Increasing Honesty | Not present as 28-day day screen | Missing from app |
| 11 | Understanding Internal Pressure | Not present as 28-day day screen | Missing from app |
| 12 | Identifying Emotional Avoidance | Not present as 28-day day screen | Missing from app |
| 13 | Taking Ownership | Not present as 28-day day screen | Missing from app |
| 14 | Full Awareness & Preparation for Week 3 | Not present as 28-day day screen | Missing from app |
| 15 | Accepting What Is | Not present as 28-day day screen | Missing from app |
| 16 | Releasing Emotional Resistance | Not present as 28-day day screen | Missing from app |
| 17 | Letting Go of Control | Not present as 28-day day screen | Missing from app |
| 18 | Releasing Guilt & Shame | Not present as 28-day day screen | Missing from app |
| 19 | Processing Anger & Resentment | Not present as 28-day day screen | Missing from app |
| 20 | Self-Compassion & Forgiveness | Not present as 28-day day screen | Missing from app |
| 21 | Week 3 Completion & Preparation for Rebuilding | Not present as 28-day day screen | Missing from app |
| 22 | Rebuilding Self-Trust | Not present as 28-day day screen | Missing from app |
| 23 | Creating Forward Momentum | Not present as 28-day day screen | Missing from app |
| 24 | Reconnecting to Purpose | Not present as 28-day day screen | Missing from app |
| 25 | Building Confidence Through Action | Not present as 28-day day screen | Missing from app |
| 26 | Building Confidence Through Action | Not present as 28-day day screen | Missing from app |
| 27 | Creating Healthier Future Habits | Not present as 28-day day screen | Missing from app |
| 28 | Integration, Reflection & Preparing for Your Next Chapter | Not present as 28-day day screen | Missing from app |

## Key fidelity risks

1. The current app’s Seven-Day Reset can be mistaken for the 28-day program if hierarchy is not clarified.
2. The current 28-Day card is informational only; it does not let the user start, continue, review, or complete the actual program.
3. The source program contains repeated daily domains—physical, emotional, spiritual, intellectual, social, environmental—but the app does not yet preserve that structure.
4. Week 4 contains exercise circuits and identity work that will require careful mobile presentation and safety/claims review.
5. Some source labels and timings need source reconciliation, e.g. Week 1 Day 3 environmental reset table says 10 minutes while the instruction says 15 minutes.

## Recommendation

Before redesigning screens, create a structured content inventory:

```txt
Day → Week → Title → Purpose → Morning tasks → Afternoon tasks → Evening tasks → Reusable tools → Reflection → Safety notes → Source paragraph/table reference → Review status
```

Do not rewrite or shorten the source until this inventory exists.

---

# D. USER EXPERIENCE

## Current UX strengths

- The main UI is quiet and readable.
- RESET starts with one simple question.
- Support is reachable as a primary tab.
- “Welcome back. Start where you are.” and “Missed days never reset program progress” are aligned with the no-shame philosophy.

## Main UX friction

### New user / Day 1

- Current app does not explain the 28-day program journey clearly enough.
- User cannot start Day 1 of the uploaded 28-day program.
- “Seven-Day Reset” is prominent while “28-Day Nervous System Reset” is static and secondary.

### Exhausted after shift

- RESET is appropriately prominent on Today.
- However, the flow still asks three choices before guidance. This is acceptable if every choice is large and fast, but the result must be trustworthy and approved.
- A “last used” or “favourite reset” shortcut would help returning users.

### Needs help now

- RESET is reachable from Today and nav.
- Support is reachable from nav.
- Fast 90-second/3-minute tools are not yet real approved guidance; current guidance is placeholder.

### Missed four days

- Good current copy: “Missed days never reset program progress.”
- Missing: actual resume/repeat/continue decision model.

### Week 3 / deeper emotional content

- Current app has no Week 3 experience.
- Week 3 includes acceptance, emotional release, control, guilt/shame, anger/resentment, self-compassion. This needs more safety framing and gentle pacing than Week 1.

### Day 28

- Current app has no completion experience.
- Missing: summary, tools learned, personal insight, maintenance plan, and next chapter.

---

# E. HOME + INFORMATION ARCHITECTURE

## Recommended four-tab structure

Keep:

```txt
Today | Reset | My Path | Support
```

Do not add Toolbox, Journal, Settings, or Progress as primary bottom tabs yet.

## Recommended hierarchy

### Today — above the fold

- Current day / continue action
- Week X of 4
- Today’s focus
- Estimated time
- Primary CTA: Continue Day X
- Secondary CTA: Reset now

### Today — secondary

- Favourite/Recent tools
- Small progress nudge
- One saved insight or personal win if available

### Hidden until needed

- Full progress details
- Journal history
- Account/privacy settings
- Advanced personalization

## My Path

My Path should become the structured home of:

- 28-Day Nervous System Reset
- day/week overview
- daily lesson
- reflections/journal
- progress
- past days
- completion summary

Seven-Day Reset can remain as a starter/free program but should not overshadow the core 28-day program if this app’s current priority is the full protocol.

---

# F. INTERACTIVITY

## Highest-value interactions

1. Guided day card sequence
   - Current: static source document outside the app.
   - Proposed: daily screen split into Morning / Afternoon / Evening cards.
   - Benefit: preserves depth while reducing cognitive load.

2. Timers for breathing, stillness, movement, and reset tasks
   - Current: durations exist in source but no timers.
   - Proposed: simple timer with pause/exit and no pressure.
   - Benefit: less mental effort.

3. Checklists for daily domains
   - Current: repeated six domains in source.
   - Proposed: physical/emotional/spiritual/intellectual/social/environmental checklist.
   - Benefit: turns the workbook into action.

4. Reflection fields with save/skip
   - Current: source prompts exist; app has no persistence.
   - Proposed: optional private reflection field, autosave, skip allowed.
   - Benefit: preserves therapeutic-style reflection without forcing disclosure.

5. Tool extraction from repeated practices
   - Current: tool names exist; source contains repeated practices.
   - Proposed: identify reusable tools and make approved versions reachable.
   - Benefit: product remains useful beyond Day 28.

6. Before/after check-in only where useful
   - Current: optional feedback exists but not persisted.
   - Proposed: simple helpful/not helpful or activation rating, if privacy-approved.
   - Benefit: user can see what works without diagnosis.

## Interaction cautions

- Do not add interaction for decoration.
- Do not force daily typing to complete a day.
- Do not require ratings when the user is distressed.
- Do not add streak pressure.
- Do not turn each day into too many screens.

---

# G. TOOLBOX + RESET

## Current state

VERIFIED FINDING: `pathData.ts` contains the exact 20 launch tool names, but the prototype does not yet implement real tool content, approved scripts, audio, transcripts, saved favourites, or contextual recommendation rules.

## Recommended Toolbox architecture

Organize by user need, not by program week:

- I’m overwhelmed
- I can’t switch off
- I’m reacting
- I’m stuck in my head
- I’m coming home from shift
- I need to ground
- I need to sleep
- I feel numb
- I’m struggling with control
- I need to connect

## Permanent RESET

Recommendation: yes, include a permanent RESET entry through the existing Reset tab and prominent Today CTA. Consider a small top-level RESET button inside daily lessons only if it does not crowd the screen.

RESET flow should remain:

```txt
What do you need right now? → state → need → time → one approved tool → safety gate → guidance → optional feedback/save/support
```

RESET is not a crisis button. It should calmly route to existing regulation tools or Support when appropriate.

## Tools that likely need permanent access

Needs verification against full source inventory, but high-value candidates include:

- 90-Second Downshift
- End-of-Shift Reset
- Car-Before-Home Transition
- Hypervigilance Downshift
- Control Scan
- Respond vs React
- Nighttime Brain Dump
- Rest vs Numbing Check
- Emotional Pressure Release
- Grounding/breathing practices
- Relationship Reset
- Nature Reset
- Identity/transition tools

---

# H. PERSONALIZATION + PROGRESS

## Rule-based now

- Continue where you left off.
- Repeat a day if desired.
- Suggest recent/favourite tools.
- If user chooses Sleep, show approved sleep tools.
- If user chooses Leave work at work, show approved transition tools.
- If user returns after inactivity: “Welcome back. Start where you are.”

## User-selected

- Favourite tools
- Reminder preferences
- Chosen goals
- Trusted contacts
- Preferred tool formats: text/audio
- Accessibility preferences
- Quick Kit contents

## Future advanced personalization

Only after privacy architecture exists:

- trends in stress/sleep/energy/connection;
- helpful tools over time;
- safe recommendations based on prior user-selected preferences;
- never diagnostic labels.

## Progress philosophy

Use:

- Day X of 28
- Week X of 4
- practices completed
- tools tried
- favourite tools
- personal wins
- gentle weekly summary

Avoid:

- streak punishment
- missed-day shame
- “failed day” language
- leaderboard-style engagement
- clinical interpretation of check-ins

---

# I. DESIGN + ACCESSIBILITY

## Visual system

Current direction is promising: calm green palette, serif display type, soft cards, and a premium quiet feel.

Improve toward:

- Vancouver Island / Pacific coastline / forest / sunrise mood;
- more open space;
- stronger hierarchy on daily action screens;
- less workbook-like content blocks;
- consistent card/component system for program days and tools.

Avoid:

- generic AI wellness imagery;
- tactical/military clichés;
- motivational poster style;
- excessive gradients or animation;
- dense paragraphs on mobile.

## Mobile UX findings

VERIFIED FINDING: My Path renders cleanly on a phone-sized frame and touch targets are generally large. The Day 1–7 horizontal strip is usable, but it becomes less appropriate for a 28-day program. A 28-day journey needs week grouping and a resume-first design.

## Accessibility needs

Needs verification and implementation before release:

- WCAG 2.2 AA contrast review;
- semantic labels for selected state/current day;
- screen reader flow through RESET and daily lessons;
- reduced-motion support for page transitions;
- dynamic text/large font behavior;
- keyboard/focus states where applicable;
- accessible timers/audio controls;
- no colour-only completion states;
- form error/save states for journals/reflections.

---

# J. SAFETY + PRIVACY

## Safety boundaries

Current app does several things right:

- says it does not diagnose, monitor emergencies, or replace professional care;
- shows 9-8-8 and 9-1-1 language in Support;
- labels placeholder guidance as not approved clinical content;
- gates vehicle-related guidance with “park first” copy.

## Safety risks to resolve

- Source content includes trauma/PTSD/addiction/emotional-release language and outcome/research-style claims.
- Some exercises may surface distress, especially Week 3 emotional release content.
- Regional resources must be verified and maintained.
- Unsupported claims need citation/review or softening.
- The app must never imply therapy, diagnosis, treatment, emergency monitoring, or guaranteed outcomes.

## Privacy findings

Current prototype stores no personal data. That is safe for prototype, but production needs explicit design for:

- journal encryption and ownership;
- check-in retention policy;
- account deletion/export;
- offline storage security;
- analytics allowlist;
- no journal text in logs/analytics/crash reports;
- no employer/organization access to individual wellness data.

---

# K. TECHNICAL ARCHITECTURE

## Current implementation

VERIFIED FINDING: current app is a local React/Vite prototype with in-memory state only.

- Frontend: React 19 + Vite + TypeScript.
- Routing: no router; tab state is local React state.
- Backend: none.
- Auth: none.
- Database/storage: none.
- State persistence: none.
- Content: hard-coded in `pathData.ts` and `App.tsx`.
- Tests: contract check + TypeScript build via `npm test`; oxlint passes.

## Strengths

- Simple and easy to inspect.
- Good for prototype validation.
- Existing contract check protects key labels/boundaries.
- No unnecessary dependencies.

## Weaknesses

- Hard-coded content will not scale to 28 days, tools, CMS review, or versioning.
- No data model for progress, journal, Quick Kit, or content approvals.
- No source provenance linking content back to DOCX sections.
- No routing/deep linking/resume states.
- No persistence, auth, or offline model.
- No error/loading/empty states beyond simple prototype shell.

## Technical recommendation

Do not refactor the prototype blindly. First create a content/data architecture that separates:

- approved content;
- draft source inventory;
- daily program structure;
- tool versions;
- user progress;
- private reflections;
- safety/review status.

Then the UI can consume structured data instead of hard-coded placeholder copy.

---

# L. DAY 28 + LONG-TERM VALUE

Day 28 should not feel like “program finished, goodbye.” It should create closure and usefulness.

Recommended completion experience:

- “You completed the 28-Day Reset.”
- What changed: completed practices, tools tried, saved favourites.
- Personal reflection: what helped, what to keep, what warning signs to notice.
- Maintenance plan: favourite reset, sleep tool, connection plan, weekly review.
- Continue options: repeat a day, revisit a week, open Toolbox, schedule check-ins.

Avoid manufacturing dependency. The app should help users carry skills forward, not make them feel they need the app forever.

---

# M. QA + RELIABILITY

## Critical flows that must never break

- Open Today and understand next action.
- Start/continue a 28-day lesson.
- Complete a day without forced journaling.
- Use RESET under stress.
- Reach Support from anywhere important.
- Save and reopen journal/reflection safely.
- Resume after app restart.
- Return after missed days without shame.
- Use favourite/offline tools once implemented.
- Complete Day 28 and see meaningful closure.

## Recommended tests later

Automated:

- content schema validation;
- day count and day ordering;
- source title coverage;
- no forbidden clinical/diagnostic claims without review flag;
- nav contract;
- recommendation rule contract;
- progress idempotency;
- journal save/delete/export tests;
- accessibility smoke checks;
- mobile viewport layout checks.

Manual:

- first-responder exhausted-user walkthrough;
- safety language review;
- clinical/content review;
- accessibility screen-reader test;
- Day 1, Week 3, Day 28 experience review;
- real-device mobile review.

---

# N. WHAT IS MISSING

- Full structured Day 1–28 app content inventory.
- Source-to-app traceability per day/exercise/reflection.
- Real 28-day lesson screens.
- Toolbox implementation with approved tool scripts.
- RESET approved recommendation matrix.
- User progress persistence.
- Private journal/reflection storage.
- Quick Kit implementation.
- Day 28 completion experience.
- Admin/CMS workflow for content review and publication.
- Privacy/security architecture for production data.
- Accessibility verification.
- Clinical/safety/legal claims review.
- Verified support resource catalogue.

---

# O. WHAT NOT TO BUILD

Do not build these yet:

- AI therapist or diagnosis features.
- Employer/department dashboards showing individual wellness activity.
- Social community.
- Provider marketplace.
- Streak leaderboard or pressure mechanics.
- Complex gamification.
- Broad notifications before privacy/tone review.
- Unreviewed mental-health claims.
- Journal surveillance or keyword monitoring.
- Recommendation AI that guesses tools without approved rules.
- A full CMS before the content model and approval workflow are defined.
- Extra primary nav tabs just because features exist.

---

# 29. PRIORITIZED ROADMAP

## P0 — Critical / Foundational

### P0.1 Build the 28-day source-fidelity inventory

- Problem: app does not contain the real Day 1–28 program.
- Recommendation: create structured source inventory before UI implementation.
- Why it matters: prevents rewriting, omissions, wrong-day content, and workbook-to-app drift.
- User benefit: every day stays true to the program and becomes easier to use.
- Technical approach: parse DOCX into reviewed JSON/TS/markdown schema with source references and review status.
- Effort: Medium.
- Risk: content volume and review complexity.
- Dependencies: owner/content review decisions.
- Acceptance criteria: all 28 days have title, purpose, tasks, reflection, tool links, source references, and status.

### P0.2 Define safety/review status for each content item

- Problem: source contains clinical-adjacent language and claims.
- Recommendation: every lesson/tool gets status: draft, needs review, approved, published.
- Why it matters: avoids exposing unreviewed content as approved wellness guidance.
- User benefit: safer, more credible product.
- Technical approach: content schema fields for safety notes, reviewer, approval version, claim/citation flags.
- Effort: Medium.
- Risk: slows publishing but prevents bigger safety problems.
- Dependencies: safety/clinical/legal reviewer workflow.
- Acceptance criteria: no tester-facing content can publish without status and review boundary.

### P0.3 Preserve support/crisis access independent of account/payment

- Problem: support must never be blocked by entitlement, auth, or program state.
- Recommendation: keep Support globally reachable and verify crisis copy/resources.
- Why it matters: safety-critical.
- User benefit: user can get human support quickly.
- Technical approach: public support route/resources, verified resource model, fallback national resources.
- Effort: Medium.
- Risk: stale regional resources.
- Dependencies: resource verification owner.
- Acceptance criteria: Support reachable from app start, RESET, lessons, and offline fallback where feasible.

### P0.4 Decide production data boundaries before collecting private data

- Problem: prototype has no storage; production will handle sensitive reflections/check-ins.
- Recommendation: design privacy, retention, encryption, export/delete before journal/progress launch.
- Why it matters: trust and compliance.
- User benefit: user knows their private material is actually private.
- Technical approach: auth/authorization, encrypted storage strategy, telemetry allowlist, no journal logs.
- Effort: High.
- Risk: wrong architecture is expensive to undo.
- Dependencies: legal/privacy review.
- Acceptance criteria: documented data flow, retention, deletion, analytics allowlist, and security controls.

## P1 — High Impact

### P1.1 Create the real 28-day My Path experience

- Problem: current My Path shows Seven-Day Reset and static 28-day overview only.
- Recommendation: build Day 1–28 journey with week grouping and continue/resume.
- User benefit: core program becomes usable.
- Technical approach: data-driven program screen, weekly sections, current-day card, day detail route.
- Effort: High.
- Risk: content overload if not progressively disclosed.
- Dependencies: P0 content inventory.
- Acceptance criteria: user can start Day 1, continue current day, view weeks, and complete a day.

### P1.2 Turn daily lessons into guided task cards

- Problem: source is workbook-like; phone users need step clarity.
- Recommendation: Morning / Afternoon / Evening or domain-based cards with completion states.
- User benefit: mentally exhausted users know exactly what to do.
- Technical approach: reusable daily task components, timers/checklists/reflection fields.
- Effort: Medium/High.
- Risk: too many taps if over-split.
- Dependencies: daily content schema.
- Acceptance criteria: each day clearly shows focus, why it matters, what to do, time, and next action.

### P1.3 Implement real Toolbox and approved RESET rules

- Problem: tool names exist but not usable approved tools.
- Recommendation: implement reusable tool screens and deterministic recommendation rules.
- User benefit: user can get help in 2–3 taps.
- Technical approach: tool versions, state/need/time mapping, safety gates, favourites.
- Effort: High.
- Risk: inappropriate recommendations if mappings are guessed.
- Dependencies: approved tool content and rules.
- Acceptance criteria: RESET always returns one approved eligible tool or safe no-match/support path.

### P1.4 Add no-shame progress/resume

- Problem: progress is visual placeholder only.
- Recommendation: gentle progress model: continue, repeat, complete, skip reflection, resume after gap.
- User benefit: fewer abandonment/shame moments.
- Technical approach: progress records with idempotent completion events.
- Effort: Medium.
- Risk: premature persistence before privacy design.
- Dependencies: data boundary design.
- Acceptance criteria: missed days never reset progress; user can continue or repeat calmly.

## P2 — Premium Experience

### P2.1 Improve visual system into a recognizable PATH identity

- Problem: current UI is good but still early prototype.
- Recommendation: mature design system inspired by Pacific coastline/forest/open space.
- User benefit: app feels credible, calm, premium, and ownable.
- Technical approach: tokenized colours/type/spacing/cards/buttons; component library.
- Effort: Medium.
- Risk: polish before core UX.
- Dependencies: UX architecture.
- Acceptance criteria: consistent screens, mobile readability, no generic wellness look.

### P2.2 Add private useful personalization

- Problem: current selections do not meaningfully personalize future experience.
- Recommendation: favourites, recent tools, preferred mode, user-selected goals.
- User benefit: app gets easier over time.
- Technical approach: transparent preference storage; no diagnosis.
- Effort: Medium.
- Risk: privacy creep.
- Dependencies: privacy architecture.
- Acceptance criteria: user can see/edit/delete personalization inputs.

### P2.3 Build Day 28 completion and maintenance plan

- Problem: completion experience does not exist.
- Recommendation: completion summary + learned tools + maintenance plan.
- User benefit: program ends with meaning and continued usefulness.
- Technical approach: derived summary from completed practices/favourites/reflections.
- Effort: Medium.
- Risk: overclaiming progress.
- Dependencies: progress/tool data.
- Acceptance criteria: completion feels meaningful without creating dependency.

## P3 — Future / Optional

### P3.1 Guided audio and haptics

- Use only after text tools and safety notes are approved.

### P3.2 Advanced trend summaries

- Use only after privacy, consent, and usefulness are proven.

### P3.3 Admin CMS

- Build after content schema and approval workflow are stable.

### P3.4 Native Expo/React Native production app

- Recommended for real mobile/offline/biometric/audio needs, but do not jump before the content/UX blueprint is locked.

---

# Devil's advocate review

Weak ideas removed or deferred:

- More bottom nav tabs: unnecessary now.
- Heavy gamification: conflicts with trauma-informed tone.
- AI-driven recommendations: risky before approved rules.
- Complex analytics: not worth privacy risk until key decisions are defined.
- Full CMS immediately: premature before content model and review workflow.
- Publishing DOCX content directly: would feel like a workbook and creates safety risk.

Simplest strong direction:

1. Preserve the four-tab shell.
2. Build source-fidelity content inventory.
3. Design the 28-day program as guided daily cards.
4. Extract reusable tools into Toolbox/RESET.
5. Add privacy-safe progress and completion.

---

# Five highest-impact priorities for Phase 2

1. Create the complete Day 1–28 structured source-fidelity inventory.
2. Design the My Path architecture for 28 days: week overview → current day → daily guided cards → completion.
3. Define Toolbox + RESET architecture using approved reusable tools and deterministic rules.
4. Define privacy/progress model before collecting reflections, check-ins, or personal data.
5. Create mobile-first UX blueprint for Day 1, a Week 3 emotional-content day, and Day 28 completion.

READY FOR PHASE 2 — PRODUCT ARCHITECTURE & UX BLUEPRINT
PATH to RISE Wellness for First Responders
RESET • REGULATE • RISE
