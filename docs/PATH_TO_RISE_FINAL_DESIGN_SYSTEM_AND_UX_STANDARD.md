# PATH TO RISE — FINAL DESIGN SYSTEM & UX STANDARD

Generated: 2026-10-03 11:53 PDT
Phase: Prompt #3 — Elite Design System + UX Experience
Project: PATH to RISE Wellness for First Responders
Product standard: Calm enough for an activated user. Simple enough for an exhausted user. Strong enough for a first responder. Polished enough to feel premium. Human enough to build trust.
Status: Design/UX standard only. No broad screen redesign implemented. No Days 1–28 rewritten.

---

# 0. Authority and scope

## Source authority

**VERIFIED** Prompt #1 established the audit baseline: the current app has a strong shell, but not the real Day 1–28 program experience.

**VERIFIED** Prompt #2 established the approved architecture:

```txt
Primary nav: Today | Reset | My Path | Support
28-Day Journey lives in My Path
RESET is fast and need-first
Toolbox / Quick Kit / Journal / Progress / Settings are nested/contextual, not extra bottom tabs for now
```

**VERIFIED** Current working app uses a calm green/cream visual direction, large serif hero type, rounded cards, four-tab bottom nav, and a prototype warning that no personal data is saved.

**FINAL SCOPE RULE** Prompt #3 defines design system, UX standards, component behaviour, design tokens, screen specifications, and design acceptance criteria. It does **not** implement broad redesigns, rewrite source content, or change program meaning.

---

# 1. Design principles

PATH to RISE should communicate:

- Calm
- Strength
- Trust
- Clarity
- Grounding
- Humanity
- Quiet confidence

## Product feeling

**RECOMMENDED** The app should feel like a quiet, premium recovery space designed for first responders without turning into a tactical brand, generic meditation app, clinical portal, or gamified wellness tracker.

Use this product filter for every screen:

```txt
Can an exhausted first responder understand the next useful action within about 3 seconds?
```

If not, simplify hierarchy before adding visual polish.

## Avoid list

Do not use:

- generic meditation-app pastels as the primary identity;
- cartoon wellness illustrations;
- tactical/military clichés;
- neon colours;
- excessive badges or rewards;
- confetti or celebration explosions;
- busy gradients;
- cheap stock imagery;
- obvious AI-generated people;
- dense dashboards;
- clinical jargon as primary UI language;
- forced streak language;
- shame, pressure, or productivity framing.

---

# 2. Core UX principle

Design for low cognitive bandwidth.

Assume the user may be exhausted, distracted, overstimulated, irritable, emotionally shut down, sleep deprived, using one hand, or trying to regulate quickly.

## Required screen hierarchy

Every screen should follow:

```txt
Primary purpose
→ Primary action
→ Secondary options
→ Optional depth
```

## One primary purpose per screen

A screen may contain secondary content, but it should have one dominant reason to exist.

Examples:

- Today: continue or reset.
- RESET Entry: choose what you need now.
- Daily Program: do the next part of today.
- Toolbox: find a reusable tool.
- Journal: write/save/skip a reflection.
- Completion: close the loop and continue.

## Read/do distinction

Users should visually distinguish:

```txt
READ — learn why this matters
DO — perform a practice/tool
REFLECT — write or answer privately
SAVE — preserve a choice or note
COMPLETE — close the session/day
```

Do not make users read paragraphs to discover what they are supposed to do.

---

# 3. Visual identity direction

## Brand mood

**RECOMMENDED** Subtle Vancouver Island / Pacific Northwest influence:

- deep forest;
- weathered cedar;
- sea glass;
- mist;
- coastline stone;
- dawn light;
- open space.

This should be felt through colour, spacing, tone, and restraint — not literal decoration on every screen.

## Current → Proposed → Why

| Current | Proposed | Why | User benefit | Implementation impact |
|---|---|---|---|---|
| calm cream/green palette | keep and formalize as tokens | strong existing fit | trusted continuity | low |
| large serif hero | keep for display only | distinctive and premium | brand recognition | low |
| rounded cards/buttons | keep but systematize variants | approachable, touch-friendly | predictable UI | low/medium |
| one-off CSS values | migrate to tokens | easier reuse | future consistency | medium |
| decorative hero ring | keep as subtle optional brand texture | adds softness without clutter | premium feel | low |

---

# 4. Colour system

## Colour token rules

**RECOMMENDED** 100% of core UI colours should map to named tokens before Prompt #4 implementation is considered complete.

Use tokens by role, not by colour name alone.

## Core palette

| Token | Example value | Role | Notes |
|---|---:|---|---|
| `--color-bg-app` | `#f6f4ef` | outer app background | warm off-white, calm |
| `--color-bg-phone` | `#fbfaf5` | main surface | existing app shell |
| `--color-surface-primary` | `#fffef8` | neutral card surface | lists/forms/cards |
| `--color-surface-soft` | `#eef2e9` | low-emphasis card | education/lesson cards |
| `--color-surface-reset` | `#e7f0e2` | signature reset card | calm regulation cue |
| `--color-text-primary` | `#073d3a` | primary copy/headings | deep evergreen |
| `--color-text-secondary` | `#47645f` | supporting copy | readable muted text |
| `--color-text-tertiary` | `#617a74` | captions/fineprint | must still pass contrast where used |
| `--color-action-primary` | `#24684f` | primary CTA | strong green, not alarmist |
| `--color-action-primary-hover` | `#1f5a45` | hover/pressed | future web state |
| `--color-action-primary-disabled` | `rgba(36,104,79,.42)` | disabled | not interactive-looking |
| `--color-border-soft` | `#e2e2d7` | card borders | subtle separation |
| `--color-border-strong` | `#cfdbc8` | secondary button border | visible but quiet |
| `--color-focus-ring` | `#f0b35a` | keyboard/focus | visible non-neon amber |
| `--color-success-bg` | `#e6f2e4` | saved/completed | calm success |
| `--color-success-text` | `#1d5c43` | success copy | AA target |
| `--color-warning-bg` | `#fff8dc` | caution/safety | existing warning card |
| `--color-warning-text` | `#614a00` | warning copy | not panic red |
| `--color-error-bg` | `#fbe8e4` | error surface | only for recoverable problems |
| `--color-error-text` | `#7c2d20` | error copy | clear but not alarming |
| `--color-crisis-bg` | `#f7eadf` | urgent support surface | warmer caution, not flashing emergency |

## Colour usage rules

- Primary green is for the most important safe action.
- Warning amber is for safety prerequisites and non-emergency caution.
- Error colour is for failed saves, unavailable actions, and recovery steps.
- Crisis/support colour should identify urgent support resources without making RESET feel like an emergency alarm.
- Do not communicate status by colour alone; pair with text/icon/shape.

## Contrast requirements

**RECOMMENDED** Target WCAG 2.2 AA:

- normal text: at least 4.5:1;
- large text: at least 3:1;
- focus and interactive boundaries: visible at keyboard and touch sizes;
- document any intentional exception before implementation.

---

# 5. Typography system

## Current type direction

**VERIFIED** Current app uses a large serif hero heading with high contrast against mostly sans-serif UI copy. This is a strong brand direction if used sparingly.

## Typography tokens

| Token | Suggested size / line height | Use | Rule |
|---|---|---|---|
| `--font-display` | Georgia / future premium serif | hero only | not for long text |
| `--font-body` | system sans-serif | most UI | readable, fast-loading |
| `--type-display` | 40–44 / 0.98 | hero | short emotional statements only |
| `--type-page-title` | 30–36 / 1.05 | screen titles | one per screen |
| `--type-section-title` | 20–22 / 1.2 | section heading | clear scannable groups |
| `--type-card-title` | 17–19 / 1.25 | card title | action/lesson/tool titles |
| `--type-body` | 16 / 1.5 | standard text | default reading size |
| `--type-body-secondary` | 14–15 / 1.45 | support copy | not tiny essential text |
| `--type-label` | 12–13 / 1.2 | eyebrow/metadata | letter spacing only for short labels |
| `--type-button` | 15–16 / 1.2 | button labels | strong but not shouty |
| `--type-caption` | 13 / 1.35 | captions/fineprint | never use for essential instructions |
| `--type-data` | 13–15 / 1.25 | progress/time | legible at mobile sizes |

## Typography rules

- Use one hero statement above the fold where appropriate.
- Body text must not drop below 14px for meaningful content; 13px only for non-essential captions.
- Avoid excessive font weights. Use hierarchy through size, spacing, and position before weight.
- Long educational content uses body text with headings, bullets, and progressive disclosure.
- Accessibility text scaling must not break CTAs or bottom nav.

---

# 6. Spacing and layout system

## Layout tokens

| Token | Value | Use |
|---|---:|---|
| `--space-0` | 0 | reset |
| `--space-1` | 4px | micro gap |
| `--space-2` | 8px | tight stack |
| `--space-3` | 12px | card internals |
| `--space-4` | 16px | component gap |
| `--space-5` | 20px | mobile page padding |
| `--space-6` | 24px | card padding |
| `--space-7` | 32px | section break |
| `--space-8` | 40px | major rhythm |

## Radius tokens

| Token | Value | Use |
|---|---:|---|
| `--radius-sm` | 10px | small inputs/chips |
| `--radius-md` | 14px | buttons/choices |
| `--radius-lg` | 18px | list cards |
| `--radius-xl` | 22px | hero cards |
| `--radius-shell` | 28px | phone/web shell only |
| `--radius-pill` | 999px | badges/chips |

## Layout rules

- Mobile page padding: 20px standard, 16px minimum on very small screens if needed.
- Cards: 18–24px internal padding depending on density.
- Section gap: 24–32px.
- Component gap: 10–16px.
- Bottom nav safe area: fixed/reserved; never overlap content.
- Avoid horizontal scroll except intentional day/category strips with visible affordance.

Whitespace is part of the regulation experience: open, breathable, not empty.

---

# 7. Component library standard

Every component must define purpose, visual hierarchy, states, feedback, accessibility, and mobile behaviour.

## Buttons

### Primary button

- **Purpose:** one dominant action on the screen.
- **Visual:** filled `--color-action-primary`, white text, minimum 52px height.
- **States:** default, pressed, focused, disabled, loading, error recovery if submission fails.
- **Feedback:** tap → pressed/loading → success/saved/completed or clear error.
- **Accessibility:** button text describes action, not vague “Next” unless context is explicit.
- **Mobile:** full-width on primary flows.

### Secondary button

- **Purpose:** safe alternate action.
- **Visual:** soft surface with border.
- **States:** same as primary where actionable.
- **Mobile:** may sit below primary or in 2-column grid only if labels remain readable.

### Tertiary/text button

- **Purpose:** low-emphasis navigation or edit link.
- **Visual:** underlined or text-only, still 44x44 touch area when practical.
- **Rule:** never use text-only styling for destructive or critical actions.

### Destructive button

- **Purpose:** delete reflection/data, sign out, clear saved draft.
- **Visual:** subdued red/error treatment; confirmation required for irreversible actions.
- **Rule:** never place directly beside primary continuation without separation.

## Cards

### Daily focus card

- shows Day X, focus, time, primary CTA;
- should be calm and high-priority;
- no more than one primary action.

### Tool card

- shows need category, title, duration, saved/favourite state, start CTA;
- scannable by need and time;
- avoid identical walls of cards.

### Education card

- supports “Why it matters”; collapsed when lengthy;
- no primary CTA unless it leads to next practice.

### Reflection card

- contains prompt, field, save status, skip option;
- never implies required emotional disclosure.

### Progress/insight card

- movement, not performance;
- no red failure states for missed days.

### Support/resource card

- clearly separates personal tools, trusted people, professional support, and crisis support;
- verified resource status shown where needed.

## Inputs

### Text/journal field

- persistent label;
- autosave or explicit save state;
- large enough for comfortable writing;
- delete/export privacy controls later.

### Slider

- endpoints labelled in words;
- current value announced for screen readers;
- not used for diagnosis.

### Single-select / multi-select

- large tappable choice buttons;
- selected state not colour-only;
- continue disabled until required selection made.

### Checkbox / checklist

- semantic list;
- each item 44x44 minimum hit area;
- completion can be partial without shame.

### Rating/check-in

- optional when possible;
- plain language;
- stores only what is useful and consented.

## Interactive wellness components

### Breathing guide

- gentle expansion/contraction only;
- text timer fallback;
- reduced-motion mode replaces animation with count text.

### Timer

- start, pause, resume, stop;
- does not punish stopping early;
- recovery if app sleeps or user leaves.

### Grounding sequence

- one instruction at a time;
- clear next/finish/support actions;
- no long preamble.

### Guided reflection

- prompt → write/think → save/skip;
- never blocks completion if skipped.

### Audio player

- transcript required;
- no autoplay;
- loading/unavailable state;
- controls remain reachable one-handed.

### Completion state

- calm close loop;
- no confetti;
- options: continue, repeat, save tool, return Home.

## Navigation components

### Bottom nav

- labels: Today, Reset, My Path, Support;
- active state visible by fill/text, not colour alone;
- min target 48px current, keep or improve;
- safe-area aware.

### Header

- brand/home control;
- privacy/profile affordance;
- no crowded utility row.

### Back behaviour

- within flows: back returns one step;
- from nested screens: back returns to parent area;
- never lose unsaved input without warning/save.

---

# 8. Daily experience design language

## Standard daily hierarchy

Each Day 1–28 screen should make these immediately recognizable:

```txt
TODAY'S FOCUS
WHY THIS MATTERS
WHAT TO DO
INTERACTIVE PRACTICE
REFLECTION
COMPLETION
```

## Day visual language

- Day header: Day X of 28 + Week X of 4 + source title.
- Focus card: today’s core idea and primary CTA.
- Task cards: Morning / Afternoon / Evening where appropriate.
- Education: expandable “Why it matters.”
- Practice: clear “Do this” block with timer/checklist/guide.
- Reflection: optional, private, save/skip visible.
- Completion: Daily Win + next step.

## Digital content rule

Preserve source meaning. Do not arbitrarily shorten conceptual or clinical-adjacent content. Instead:

- chunk long text;
- add headings;
- collapse optional education;
- separate read/do/reflect;
- preserve source references for review.

---

# 9. RESET design standard

## Visual intent

RESET should feel immediate, steady, and safe — not like an alarm.

## RESET hierarchy

```txt
What do you need right now?
→ large need choices
→ recommended existing tool
→ safety prerequisite if needed
→ start
→ complete/repeat/support
```

## RESET rules

- No lengthy assessment before usefulness.
- No more than one optional refinement after need selection unless evidence shows it helps.
- Always allow Support fallback.
- Tool result must be an approved existing tool, not AI-generated advice.
- Vehicle-related guidance requires parked/safe confirmation.

---

# 10. Toolbox design standard

## Product meaning

Toolbox should feel like:

```txt
Everything I’ve learned that I can use again.
```

## Category presentation

Use need-based category chips/cards:

- I’m Overwhelmed
- I Can’t Switch Off
- I’m Reacting
- I’m Stuck in My Head
- I’m Coming Home From Shift
- I Need to Ground
- I Need to Sleep
- I Feel Numb
- I Need to Connect

## Tool cards

Each tool card needs:

- title;
- need category;
- duration;
- short purpose;
- start action;
- favourite state;
- recent indicator if useful;
- source day/program links later;
- approval/status if not production-ready.

Avoid showing dozens of identical cards. Use category first, then suggested/recent/favourite subsets.

---

# 11. Motion and micro-interactions

## Motion principles

Motion must improve orientation, feedback, calm, understanding, or exercise guidance.

Allowed:

- gentle screen transition under 200ms;
- breathing expansion/contraction;
- save/completion check state;
- expand/collapse;
- button pressed state.

Avoid:

- constant background motion;
- confetti;
- bouncing;
- spinning attention-grabbers;
- animated gradients;
- motion that delays action.

## Reduced motion

Every animated component needs a reduced-motion alternative:

- breathing animation → text count / progress ring without motion;
- page transition → instant fade or none;
- completion → static confirmation.

---

# 12. Feedback and error states

Every important interaction must define:

```txt
Tap → Processing → Success / Saved → Failure recovery
```

## Required states

| State | UX requirement | Example copy |
|---|---|---|
| Loading | show what is loading | `Loading your day…` |
| Saving | make pending state visible | `Saving…` |
| Saved | confirm without noise | `Saved.` |
| Completed | close the loop | `Day saved. Continue when you’re ready.` |
| Empty | explain and offer action | `No favourites yet. Save useful tools here.` |
| Error | problem + recovery | `Couldn’t save. Try again.` |
| Offline | preserve local possibility | `You’re offline. We’ll save when connection returns.` |
| Disabled | explain if not obvious | `Choose a need to continue.` |
| Returning | resume state clear | `You were halfway through this reflection.` |

Never leave users wondering whether input saved.

---

# 13. Content presentation standard

## Preserve source, improve consumption

Use:

- short readable sections;
- strong headings;
- progressive disclosure;
- bullets for instructions;
- visual separation between education and action;
- source-linked internal notes for review.

Do not:

- shorten content until meaning changes;
- decorate every paragraph with icons;
- use excessive emojis;
- turn long daily content into one scrolling workbook page;
- publish unapproved wellness guidance as clinical content.

---

# 14. UX writing standard

## Product voice

PATH to RISE should sound:

- human;
- direct;
- grounded;
- respectful;
- encouraging without hype;
- calm under pressure.

## Preferred language

| Prefer | Avoid |
|---|---|
| `Continue when you’re ready.` | `Don’t break your streak!` |
| `Try a quick reset.` | `Fix your stress now.` |
| `Notice what comes up.` | `You should feel calmer.` |
| `Start where you are.` | `You fell behind.` |
| `Couldn’t save. Try again.` | `Something went wrong.` alone |

## Forbidden tone

No shame, pressure, diagnosis, false certainty, infantilizing language, excessive enthusiasm, or unsupported clinical claims.

---

# 15. Progress design language

Progress communicates movement, not performance.

## Allowed progress elements

- Day X of 28;
- Week X of 4;
- completed days/practices;
- tools learned;
- weekly milestones;
- personal wins;
- optional check-in patterns.

## Avoid

- leaderboards;
- competitive scores;
- red missed-day failures;
- punitive streaks;
- gamified reward pressure.

## Missed days

Missed days are neutral continuation states:

```txt
Welcome back. Continue when you’re ready.
```

Not failure states.

---

# 16. Accessibility standard

## Required baseline

- WCAG 2.2 AA contrast targets.
- Minimum 44x44px touch targets for important controls.
- Persistent labels for forms.
- Meaningful accessible labels.
- Semantic heading order.
- Visible focus states.
- Reduced-motion support.
- Colour never carries meaning alone.
- Error messages identify both problem and recovery action.
- Dynamic text scaling considered from the start.

## Touch target rules

- Primary CTAs: minimum 52px high.
- Bottom nav items: current 48px minimum is acceptable; preserve or improve.
- Icon-only controls: provide 44px hit area and accessible name.
- Adjacent critical controls need spacing to prevent accidental taps.

---

# 17. Responsive and device rules

Design and test at:

- small mobile: ~320px;
- standard mobile: 375–390px;
- large mobile: ~430px;
- tablet where supported.

## Pass conditions

- No normal-use horizontal scroll.
- No clipped primary CTAs.
- No text/component overlap.
- Larger accessibility text remains usable.
- Keyboard does not hide required form actions.
- Safe areas respected.
- Long content remains readable and resumable.

---

# 18. Image and asset standard

Use imagery only when it contributes to orientation, emotion, understanding, or brand identity.

Prefer:

- real environments;
- subtle Pacific coastline/forest/mountain textures;
- abstract natural textures;
- no staged hero stereotypes.

Avoid:

- generic stock first-responder photos;
- AI-generated people;
- decorative filler imagery;
- dramatic emergency scenes;
- tactical badges/flags/skulls/firearms imagery.

---

# 19. Trust and privacy UX

Because users may record private wellness reflections, trust must be visible in the interface.

Users should understand:

- what is private;
- what is optional;
- what is saved;
- when saving fails;
- whether information leaves device/account;
- how to control/export/delete data later.

## Trust rules

- No dark patterns.
- No forced engagement.
- No hidden publication/sharing.
- No employer visibility promises unless implemented and verified.
- No journaling analytics by default.
- Support/crisis resources never gated.

---

# 20. Design tokens and implementation readiness

## SAFE FOUNDATION CHANGES

These are small, safe, foundational changes recommended before Prompt #4 implementation:

1. Add CSS custom properties for colour, typography, spacing, radius, border, shadow, and motion tokens.
2. Replace repeated hard-coded CSS values with tokens without changing visual layout.
3. Document component classes/variants before adding new screens.
4. Add reduced-motion CSS guard for current `page-enter` animation.
5. Add explicit focus-visible styles using `--color-focus-ring`.

These are not broad screen redesigns.

## Existing component recommendations

| Existing piece | Recommendation | Why |
|---|---|---|
| `.shell` / `.phone` | KEEP / REFINE | strong prototype frame; tokenized surfaces later |
| `.topbar` / `.brand` | KEEP | clear brand and privacy affordance |
| `.hero-card` | KEEP / REFINE | strong focal card; needs tokenized variants |
| `.primary`, `.secondary` | KEEP / REFINE | good touch size; define loading/error states |
| `.choice` / `.choice-grid` | KEEP / REFINE | useful for Reset; ensure small-phone fit |
| `.list-card` | KEEP / REFINE | solid card pattern; add interactive/static variants |
| `.day-strip` | REFINE | horizontal scroll acceptable if visible and accessible |
| `.bottom-nav` | KEEP | approved architecture |
| Quick Kit as separate screen | CONSOLIDATE LATER | should become Toolbox subset |
| Hard-coded screen components in `App.tsx` | DEPRECATE LATER | split after Prompt #4/5 needs grow |

---

# 21. Reference screen specifications

## 21.1 Home / Today

- **Primary purpose:** show what to do today and offer immediate Reset.
- **Content hierarchy:** welcome/status → current day card → primary CTA → Reset → recent/favourite tool → progress nudge.
- **Primary CTA:** `Continue Today`.
- **Secondary actions:** `Reset now`, `View My Path`, recent/favourite tool.
- **Components:** header, journey card, primary button, secondary button, tool card, progress text.
- **States:** new user, returning user, missed days, unfinished day, Day 28 complete, offline, loading.
- **Accessibility:** one h1, clear CTA labels, no colour-only progress.
- **Responsive:** primary CTA above fold at 320px if possible; secondary content below.
- **Error/empty:** if no program started, show `Start Day 1`; if data unavailable, offer Reset and Support.

## 21.2 Daily Program Screen

- **Primary purpose:** guide the next part of today’s program.
- **Content hierarchy:** Day/Week metadata → Today’s Focus → Start/Continue → cards for read/do/reflect → completion.
- **Primary CTA:** `Start today` / `Continue practice`.
- **Secondary actions:** `Reset`, `Save reflection`, `Skip reflection`, `View week`.
- **Components:** day header, focus card, expandable education, task cards, checklist, reflection field, completion card.
- **States:** not started, in progress, draft saved, complete, repeated, source needs review.
- **Accessibility:** semantic headings, labelled tasks, skip links for long content.
- **Responsive:** long source content chunks into sections; no full-page PDF feel.
- **Error/empty:** missing content shows safe unavailable state, not guessed content.

## 21.3 Interactive Exercise

- **Primary purpose:** help user do one guided practice.
- **Content hierarchy:** short setup → safety prerequisite if needed → timer/guide → stop/pause → completion.
- **Primary CTA:** `Begin` / `Pause` / `Finish` depending state.
- **Secondary actions:** `Stop`, `Restart`, `Get support`.
- **Components:** timer, breathing guide, checklist/steps, audio option, completion state.
- **States:** ready, running, paused, completed, interrupted, offline, reduced-motion.
- **Accessibility:** transcript/text alternative, no animation-only instructions.
- **Responsive:** large controls one-handed.
- **Error/empty:** media unavailable falls back to written guidance.

## 21.4 RESET Entry

- **Primary purpose:** let user choose what they need now.
- **Content hierarchy:** `What do you need right now?` → large need choices → optional time refinement.
- **Primary CTA:** `Find my reset` or immediate tool if one-step.
- **Secondary actions:** `Get support instead`, `Back Home`.
- **Components:** choice grid, need cards, support fallback.
- **States:** no selection, selected, loading recommendation, unavailable match.
- **Accessibility:** large hit targets, selected state not colour-only.
- **Responsive:** one-column choices at 320px if two-column becomes cramped.
- **Error/empty:** no match explains recovery options.

## 21.5 RESET Guided Tool

- **Primary purpose:** deliver one recommended approved tool.
- **Content hierarchy:** tool title → duration → safety note → start → guide → finish.
- **Primary CTA:** `Start` / `Finish`.
- **Secondary actions:** `Repeat`, `Save to Toolbox`, `Support`.
- **Components:** tool header, safety card, guide/timer, completion card.
- **States:** ready, active, paused, completed, saved, failed save.
- **Accessibility:** reduced motion, transcript, stop anytime.
- **Responsive:** primary controls visible without scrolling during active practice where possible.
- **Error/empty:** tool withdrawn/unapproved state routes to Toolbox/Support.

## 21.6 Toolbox

- **Primary purpose:** find reusable tools quickly.
- **Content hierarchy:** saved/recent tools → need categories → suggested tools → all tools.
- **Primary CTA:** `Start tool`.
- **Secondary actions:** favourite, filter, view details.
- **Components:** category chips/cards, tool cards, favourite toggle, duration badge.
- **States:** empty favourites, recent tools, offline-ready, loading, unavailable.
- **Accessibility:** category labels clear; favourite toggle labelled.
- **Responsive:** no dense multi-column walls on small mobile.
- **Error/empty:** `No favourites yet. Save tools here when they help.`

## 21.7 Tool Detail

- **Primary purpose:** understand and start a specific tool.
- **Content hierarchy:** title → best for → duration → safety notes → start → source/related day.
- **Primary CTA:** `Start tool`.
- **Secondary actions:** favourite, save to Quick Kit, related day.
- **Components:** detail header, safety note, source link, action buttons.
- **States:** approved, draft/unapproved, media available, media unavailable.
- **Accessibility:** no icon-only favourite without label.
- **Responsive:** source metadata stays secondary.
- **Error/empty:** draft tools cannot masquerade as approved.

## 21.8 Progress

- **Primary purpose:** show movement without pressure.
- **Content hierarchy:** Day X/Week X → completed practices → tools learned → personal wins → optional patterns.
- **Primary CTA:** `Continue Today`.
- **Secondary actions:** view journal, review tools, view completed days.
- **Components:** progress ring/bar, milestone card, win card, timeline.
- **States:** no progress, in progress, missed days, complete program.
- **Accessibility:** progress text accompanies visuals.
- **Responsive:** avoid dashboard density.
- **Error/empty:** no red failure missed-day state.

## 21.9 Journal / Reflection

- **Primary purpose:** capture private reflection.
- **Content hierarchy:** prompt → optional guidance → text field → save/skip → saved status.
- **Primary CTA:** `Save reflection`.
- **Secondary actions:** `Skip`, `Clear`, `Continue`.
- **Components:** prompt card, text area, save status, privacy note.
- **States:** empty, draft, saving, saved, failed save, offline queued.
- **Accessibility:** persistent label, keyboard-safe actions.
- **Responsive:** keyboard does not hide save/continue.
- **Error/empty:** unsaved exit warning or autosave.

## 21.10 Completion State

- **Primary purpose:** close the loop calmly and suggest next step.
- **Content hierarchy:** completion confirmation → daily win → saved items → next action.
- **Primary CTA:** `Return Home` or `Continue to next day` depending context.
- **Secondary actions:** repeat, save tool, view progress.
- **Components:** success card, summary list, next CTA.
- **States:** day complete, tool complete, week complete, program complete, save failed.
- **Accessibility:** clear text confirmation, no animation-only success.
- **Responsive:** completion summary short above fold.
- **Error/empty:** if save fails, explain and retry without losing user input.

---

# 22. Measurable acceptance criteria

Prompt #3 is complete only when the system can be implemented by another developer without subjective guessing.

## A. Design system coverage

**PASS criteria:**

- 100% of core UI colours map to defined design tokens.
- 100% of typography styles use defined typography tokens.
- 100% of standard spacing uses the defined spacing scale.
- Buttons, cards, inputs, navigation, progress, and feedback states have documented reusable patterns.
- Core components define default, active, disabled, loading, and error states where applicable.
- Duplicate component patterns are identified for consolidation.
- No new arbitrary styling values are required for Prompt #4.

## B. Mobile usability

Validate representative screens at ~320px, 375–390px, 430px, and tablet where supported.

**PASS criteria:** no horizontal scroll in normal use, no clipped primary CTA, no text overlap, larger accessibility text remains usable, controls remain readable, keyboard does not hide required form actions, safe areas respected.

## C. Touch targets

Target minimum 44x44 CSS pixels for important controls.

**PASS criteria:** primary actions meet target, adjacent controls have separation, small icons have accessible hit areas, critical actions do not require precision tapping.

## D. Readability

**PASS criteria:** body text not intentionally tiny, line lengths comfortable, long education uses hierarchy/progressive disclosure, primary instructions are distinct from education, primary action visible without reading entire screen.

## E. Colour and contrast

**PASS criteria:** WCAG 2.2 AA targets, meaning not colour-only, focus/error/success distinguishable, disabled states understandable.

## F. Cognitive load

**PASS criteria:** one dominant primary action per screen, no unnecessary competing CTAs, essential instructions before optional education, no unnecessary memory burden, tired user can find next action in ~3 seconds.

## G. Navigation clarity

**PASS criteria:** current location clear, back predictable, primary nav consistent, critical actions not buried, RESET discoverable, Home return clear.

## H. Interaction feedback

**PASS criteria:** tap/processing/success/failure defined, save status clear, recovery clear, repeated taps do not duplicate submissions, completion unmistakable without excessive celebration.

## I. Interruption and recovery

**PASS criteria:** screen exit/app close/connection loss/interruption/return behaviours defined, meaningful input not lost, resume clear, incomplete vs complete distinct, no false completion.

## J. Accessibility

**PASS criteria:** semantic requirements, accessible labels, focus states, reduced motion, non-colour-only meaning, persistent form labels, clear error recovery, dynamic text considered.

## K. Motion

**PASS criteria:** every animation has purpose, decorative motion removable, reduced-motion defined, no critical information depends only on animation, motion does not delay action.

## L. UX writing

**PASS criteria:** no punitive streaks, no shame, no unsupported diagnosis, no false outcome promises, CTAs clear, error recovery copy present, missed days neutral/supportive, terminology consistent.

## M. Component reuse

**PASS criteria:** common interactions use shared components, variants documented, component names/purposes clear, future developers can choose components without guessing.

## N. Visual consistency

**PASS criteria:** 10 reference screens share typography, spacing, button behaviour, card patterns, icon language, similar-action behaviour, and feel like one product.

## O. Performance-aware design

**PASS criteria:** no heavy decorative assets required for navigation, animation does not block interaction, core screens function while media loads, loading states for media, polish does not depend on heavy effects.

## P. First-responder reality test

Evaluate each reference screen against:

- normal bandwidth;
- low bandwidth;
- high activation.

A screen fails if its purpose is hard to understand in the state where it is expected to be used.

## Q. Reference screen completion

**PASS criteria:** the 10 reference screens above each define primary purpose, content hierarchy, primary CTA, secondary actions, components, states, accessibility, responsive behaviour, and error/empty states.

## R. Zero-regression requirement

Prompt #3 must not intentionally break:

- Days 1–28 content;
- existing progress;
- authentication;
- saved reflections;
- navigation;
- user data;
- working exercises;
- existing backend functionality.

Any future exception must be explicitly documented before implementation.

---

# 23. Devil’s advocate design review

## Does it look too much like other wellness apps?

**PARTIAL RISK.** The current green/cream palette overlaps wellness conventions, but the serif hero, direct first-responder copy, grounded structure, and no-shame tone make it more distinctive. Prompt #4 should avoid generic nature imagery and generic meditation icon sets.

## Are we using too many cards?

**RISK.** Cards work well, but the app can become a card stack. Use cards for distinct actions or content blocks only; long education should use sections/accordions, not endless cards.

## Too many colours/icons/motion?

**CURRENTLY LOW RISK.** Current prototype is restrained. Future work should keep icons functional and avoid decorative motion.

## Is the interface calm without becoming boring?

**YES, WITH REFINEMENT.** Current visual direction is calm and premium. It needs stronger token consistency and better daily-program hierarchy.

## Could an exhausted user operate it easily?

**PARTIAL.** Today and RESET are close, but current Reset prototype asks three steps. The production standard should prefer need-first and reduce questions where possible.

## Does it respect first responders without stereotyping them?

**YES IF MAINTAINED.** Current copy avoids tactical cliché and speaks to shift transition without role-play imagery.

## Can future developers use this without guessing?

**YES FOR PROMPT #4.** Tokens, component patterns, and reference screen specs now provide implementation direction. Exact final production content still depends on Day 1–28 source inventory in Prompt #5.

---

# 24. Design readiness scorecard

No numeric score is manufactured. Status is evidence-based.

| Category | Status | Evidence / blocker |
|---|---|---|
| Design System | PASS | colour, typography, spacing, radius, motion, component state tokens defined |
| Mobile UX | PASS | mobile-first layout rules and screen specs defined; implementation validation occurs in Prompt #4 |
| Accessibility | PASS | contrast/touch/focus/reduced-motion/form requirements defined |
| Cognitive Load | PASS | one-purpose-per-screen and 3-second tired-user test defined |
| Navigation Clarity | PASS | Prompt #2 four-tab architecture preserved; contextual areas defined |
| Component Consistency | PASS | buttons/cards/inputs/navigation/feedback patterns documented |
| Interaction Feedback | PASS | tap → processing → success/failure standard defined |
| Recovery States | PASS | interruption/recovery and save states defined |
| UX Writing | PASS | voice, preferred/avoid language, forbidden tone documented |
| Visual Consistency | PASS | shared tokens and 10 reference screen specs defined |
| Performance Awareness | PASS | heavy assets/effects avoided; media loading rules defined |
| First-Responder Usability | PASS | normal/low/high activation screen test required |

## Remaining partial items for implementation phases

These are not blockers for Prompt #4, but must be verified when screens are implemented:

- Actual WCAG contrast checks against final rendered tokens.
- Actual 320px / 390px / 430px / tablet layout checks.
- Actual keyboard behaviour for journal/reflection screens.
- Actual dynamic text scaling checks.
- Actual reduced-motion behaviour in code.
- Actual no-horizontal-scroll and bottom-nav safe-area checks.

---

# 25. Acceptance criteria for Prompt #4

Prompt #4 should implement first:

```txt
Core Navigation + Home Experience
```

## Prompt #4 first implementation target

1. Tokenize the existing design foundation.
2. Preserve bottom nav: `Today | Reset | My Path | Support`.
3. Rework Today into the approved hierarchy:
   - current journey/day card;
   - primary CTA: `Continue Today` / `Start Day 1`;
   - secondary CTA: `Reset now`;
   - recent/favourite tool area;
   - gentle progress line.
4. Keep RESET and Support reachable.
5. Add focus/reduced-motion/safe-area design foundations.
6. Do not implement the full Day 1–28 program yet.
7. Do not create extra primary tabs.
8. Validate mobile layout at 320px, 375–390px, and 430px.

## Prompt #4 acceptance gate

Prompt #4 should pass when:

- the current four-tab nav remains intact;
- Home has one dominant primary action;
- Reset remains one tap away;
- no important CTA is clipped on small mobile;
- no normal-use horizontal scroll exists;
- tokens are used for core colours/spacing/type;
- the existing contract checks still pass;
- test/build/lint pass;
- browser smoke check shows no console errors.

---

# 26. Final design gate

**DESIGN GATE PASSED** for Prompt #3 because:

- Core design tokens are defined.
- Core components are specified.
- Ten reference screens are specified.
- Prompt #4 has a concrete implementation target.
- No critical FAIL remains.
- PARTIAL items are implementation-verification tasks, not missing design decisions.
- The system preserves Prompt #1 and Prompt #2 constraints.

DESIGN GATE PASSED — READY FOR PROMPT #4: CORE NAVIGATION + HOME EXPERIENCE
PATH to RISE Wellness for First Responders
RESET • REGULATE • RISE
