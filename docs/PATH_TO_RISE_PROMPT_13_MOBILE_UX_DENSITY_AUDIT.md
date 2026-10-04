# PATH TO RISE — PROMPT #13 MOBILE UX DENSITY AUDIT

Generated: 2026-10-03 23:05 PDT
Status: AUDIT ONLY — no redesign, feature work, source-content removal, or Prompt #14 work authorized or performed.
Source: owner physical iPhone/Safari report + local rendered preview inspection + DOM density metrics.

## 0. Audit decision

The owner iPhone report is valid Prompt #13 real-device evidence.

Classification:

```txt
CATEGORY: USABILITY FRICTION
FINDING: MOBILE INFORMATION DENSITY + VISUAL HIERARCHY
STATUS: OPEN — AUDIT COMPLETE / AWAITING OWNER DECISION
SEVERITY: P2 overall
```

This is **not** a confirmed P0/P1 blocker yet because:

- owner reported primary buttons/controls tested appear functional and tappable;
- no broken safety/support route was reported;
- no source-content error was reported;
- no privacy leak or clinical/safety claim issue was reported.

It **does** require evaluation before broader Prompt #13 testing because PATH to RISE must work for tired, stressed, distracted, overloaded, low-bandwidth first-responder users.

Overall finding:

```txt
The app has strong content depth and working structure, but several mobile routes currently expose too many legitimate things at once. The biggest issue is not bad content; it is insufficient separation between overview, selection, detail, settings, and long-form source-backed content.
```

Principle applied:

```txt
MAKE EVERY TAP EARN ITS PLACE.
NOT EVERYTHING NEEDS TO BE VISIBLE AT ONCE.
FULL PROGRAM DEPTH + SIMPLER PRESENTATION + LOWER COGNITIVE LOAD.
```

## 1. Evidence used

### 1.1 Owner physical-device evidence

Owner reported from physical iPhone/Safari:

- PASS/PARTIAL: buttons and primary controls tested appear to work and are tappable.
- PARTIAL: app looks good overall.
- USABILITY FRICTION: several screens feel too busy / somewhat all over the place.
- Concern: too much information competing for attention on some mobile screens.

### 1.2 Rendered-screen directional metrics

Measured from the current private preview rendered DOM. These numbers are **not UX scores**; they explain where density comes from.

| Screen / route | Buttons | Visible interactive controls | Card/panel-like elements | Headings | Text chars | Scroll height vs phone viewport | Density read |
|---|---:|---:|---:|---:|---:|---:|---|
| Today / Home | 13 | 23 | 14 | 9 | ~705 | 1234px / 597px | Medium; clear top, but secondary/prototype controls increase page load. |
| RESET need list | 12 | 12 | 12 | 1 | ~1,022 | 1567px / 597px | Medium-high; 9 need choices compete. |
| RESET recommendation | 9 | 9 | 5 | 4 | ~699 | 1210px / 597px | Medium; reasonable, but multiple options after one need. |
| Toolbox | 23 | 23 | 24 | 12 | ~2,247 | 4008px / 597px | High; useful content, but list is long and card-dense. |
| My Path + selected Day | 37 | 40 | 26 | 13 | ~3,901 | 6618px / 597px | Highest; dashboard + 28-day map + full selected day in one route. |
| Day 1 content block only | 7 | 10 | 7 | 7 | ~1,937 | 3112px | High but mostly source-backed and expected for day content. |
| 28-day progress grid only | 28 | 28 | 0 | 0 | ~326 | 693px | High control count; scan burden from 28 small day buttons. |
| Support | 0 | 0 | 6 | 2 | ~682 | 931px / 597px | Moderate; safety info is visible and should remain easy to find. |

### 1.3 Source/code structure inspected

Relevant component structure inspected in `src/App.tsx`:

- `Today(...)`
- `ResetExperience(...)`
- `Toolbox(...)`
- `MyPath(...)`
- `DayExperience(...)`
- `Support()`

Key structural observation:

```txt
MyPath renders the progress dashboard and DayExperience in the same route.
```

That single fact explains much of the owner’s “too much at once” impression.

---

## 2. Screen-by-screen audit

## SCREEN: My Path / Progress + Insights + selected Day

### WHAT CURRENTLY FEELS DENSE

My Path is the highest-density route. It includes:

- progress summary;
- week/day state;
- progress metrics;
- `Return Home` and `Open RESET` CTAs;
- insights;
- four-week journey;
- 28-day progress grid;
- practice summary;
- reflection summary;
- privacy/progress note;
- selected Day 1 content;
- source banner;
- reusable tool link;
- multiple source-backed sections;
- section completion buttons;
- complete-day card.

Measured evidence:

```txt
37 buttons
40 visible interactive controls
26 card/panel-like elements
13 headings
~3,901 text characters
~6618px scroll height for ~597px phone viewport
```

### LIKELY CAUSE

Primary cause: **mixed modes**.

My Path currently tries to be all of these at once:

1. progress dashboard;
2. journey map;
3. day picker;
4. practice/reflection hub;
5. full day reader/workbook.

Each mode is legitimate, but stacked together they create a mobile dashboard/workbook hybrid.

Other causes:

- many repeated card treatments;
- repeated status pills / eyebrows;
- 28 small day controls in one grid;
- multiple CTAs of similar visual weight;
- full DayExperience automatically visible rather than opened deliberately.

### WHAT MUST REMAIN

- My Path as non-punitive progress destination.
- Day/week/program continuity.
- No streak pressure, score, grade, recovery percentage, missed/failed framing.
- Access to the 28-day journey.
- Access to current/selected day.
- Reflection privacy boundary.
- RESET access.
- Source-backed day content.

### WHAT COULD BE SIMPLIFIED

- Default first view can show only:
  - current progress summary;
  - one primary next action: `Open Day 1` / `Continue Day 1`;
  - one secondary: `View journey map` or `View all days`.
- Reduce visible summary metrics from several panels into one compact summary.
- Avoid showing the full selected Day content until a deliberate tap.

### WHAT COULD BE GROUPED

- `Insights`, `Four-week journey`, `Day-level progress`, `Your practice`, `Reflections`, and `Progress data notes` can be grouped as secondary sections.
- Group day-map controls separately from the current-day reading experience.
- Group practice/reflection summaries under `Review` or `Saved items` rather than making them first-order in the default scroll.

### WHAT COULD USE PROGRESSIVE DISCLOSURE

Highest value:

- full selected Day content;
- 28-day grid;
- reflection review;
- progress privacy/data note;
- insights beyond the top one;
- practice summary when empty.

### WHAT COULD MOVE LOWER ON THE PAGE

- Full 28-day grid.
- Empty saved tools/reflections sections.
- Progress data note.
- Full DayExperience, unless user explicitly opens it.

### WHAT COULD BE REMOVED IF DUPLICATED

Do not remove source-backed program content.

Possible duplicated/competing presentation to reduce later:

- multiple labels saying progress is non-punitive;
- repeated `source-backed` labels across cards if they appear close together;
- empty-state sections that add little on Day 1 before any saved content exists.

### RECOMMENDED CHANGE

Create a calmer My Path default state:

```txt
Top: Where am I? — Day 1 of 28 / Week 1
Primary: Continue/Open current Day
Secondary: View all days / View progress details
Supportive: non-punitive reassurance
```

Then move the full DayExperience behind `Open Day`, and place journey/insights/practice/reflection summaries behind accessible disclosures or secondary sections.

### RISK OF CHANGE

Medium.

Risks:

- hiding too much could make source content harder to find;
- disclosures must be accessible and keyboard/screen-reader friendly;
- day selection must remain clear;
- support/RESET access must remain visible.

### PRIORITY

```txt
P2 — highest-priority usability friction
```

---

## SCREEN: Day 1 / source-backed daily content

### WHAT CURRENTLY FEELS DENSE

Day content itself is long and content-heavy:

```txt
7 buttons
10 visible interactive controls
7 panels
7 headings
~1,937 text characters
~3112px height
```

This is less of a visual-design failure and more a natural result of faithfully preserving program content.

### LIKELY CAUSE

- Source-backed daily program has several sections.
- Each section has source-mode labeling, content paragraphs, and completion controls.
- Completion and reflection flows add legitimate controls.

### WHAT MUST REMAIN

- Source fidelity.
- Day title, purpose, source verification, and source-backed content.
- READ / DO / REFLECT / COMPLETE structure.
- Reflection privacy controls.
- Completion must remain intentional, not automatic.

### WHAT COULD BE SIMPLIFIED

- Day header could focus on one next action/section.
- Reduce repeated source/status labels inside a single day once source verification is already established at the top.
- Show only the next/current section first, with remaining sections available below or via stepper/disclosure.

### WHAT COULD BE GROUPED

- Source metadata can group into one compact source/prototype note.
- Section-completion controls can remain near sections, but the full day completion card can stay at bottom.

### WHAT COULD USE PROGRESSIVE DISCLOSURE

- Long source sections already partially use disclosure after preview lines; keep this pattern.
- Consider making inactive later sections less visually loud until the user reaches them.

### WHAT COULD MOVE LOWER ON THE PAGE

- Reusable tool link could move below the first source section if it distracts from beginning Day 1.
- Full completion card stays lower until user engages at least one section.

### WHAT COULD BE REMOVED IF DUPLICATED

- Repeated `SOURCE-DIRECT` labels may be reducible if a top-level source banner already explains provenance.

### RECOMMENDED CHANGE

Do **not** cut day content. If refined, make Day screens feel like a guided sequence:

```txt
Day header → current section → mark done → next section
```

rather than a full workbook displayed all at once.

### RISK OF CHANGE

Medium-high if overdone, because source fidelity is a core constraint.

### PRIORITY

```txt
P2/P3 — important, but secondary to separating Day content from My Path default
```

---

## SCREEN: Toolbox

### WHAT CURRENTLY FEELS DENSE

Toolbox exposes many useful practices and empty/shortcut sections in a long mobile list.

Measured evidence:

```txt
23 buttons
23 visible interactive controls
24 card/panel-like elements
12 headings
~2,247 text characters
~4008px scroll height
```

### LIKELY CAUSE

- Toolbox includes favourites, recent, current-week tools, and all categorized canonical tools.
- Tool cards each include category/day/source/purpose/actions.
- Empty states are visible even when they add little for a first-time user.

### WHAT MUST REMAIN

- Toolbox usefulness.
- Canonical source-backed tool inventory.
- Favourite/recent functionality.
- Standalone tool use must not advance program progress.
- Tool source traceability.

### WHAT COULD BE SIMPLIFIED

- Default Toolbox first view could show:
  - current-week/recommended practices first;
  - `Browse all tools` below;
  - empty favourites/recent sections collapsed or minimized when empty.

### WHAT COULD BE GROUPED

- Group all browse categories behind category headers/disclosures.
- Group favourites/recent into a compact `Your saved/recent tools` section.

### WHAT COULD USE PROGRESSIVE DISCLOSURE

- All categories after the first/current-week group.
- Empty favourites/recent sections.
- Full tool descriptions after a tool card tap.

### WHAT COULD MOVE LOWER ON THE PAGE

- Full canonical browse list.
- Empty sections.
- Secondary metadata.

### WHAT COULD BE REMOVED IF DUPLICATED

- Repeated day/source labels on every tool card could be visually quieter, not removed.

### RECOMMENDED CHANGE

Keep all tools, but reduce first-view load:

```txt
Top: Choose a practice
Primary group: From Week 1 / current path
Secondary: Saved + Recent
Disclosure: Browse all source-backed practices
```

### RISK OF CHANGE

Medium.

If too much is hidden, Toolbox may feel less useful. Must preserve browse access.

### PRIORITY

```txt
P2 — high impact after My Path
```

---

## SCREEN: RESET need list

### WHAT CURRENTLY FEELS DENSE

RESET begins with 9 need cards at once, each with label + helper copy.

Measured evidence:

```txt
12 buttons
12 visible interactive controls
12 card/panel-like elements
1 heading
~1,022 text characters
~1567px scroll height
```

### LIKELY CAUSE

- Too many first-step choices for a low-bandwidth state.
- Need options are legitimate but visually similar, so the user must read many cards before acting.
- Support/Toolbox and fineprint add necessary but competing secondary actions.

### WHAT MUST REMAIN

- RESET speed.
- User-directed need selection.
- No hidden profiling/diagnosis.
- Support access.
- Source-backed routing.
- Ability to choose all approved need states.

### WHAT COULD BE SIMPLIFIED

- Show the most common/urgent low-bandwidth needs first.
- Use shorter card copy in first view.
- Add `Show more needs` or grouped need clusters.

### WHAT COULD BE GROUPED

Possible groups:

- Body first / overwhelmed / ground.
- Transition / switch off / sleep.
- Stuck / numb / control / connect.

### WHAT COULD USE PROGRESSIVE DISCLOSURE

- Less common need options.
- Toolbox browse entry.
- Explanatory fineprint below the primary need-selection area.

### WHAT COULD MOVE LOWER ON THE PAGE

- Toolbox link.
- Safety fineprint, as long as Support remains visible.

### WHAT COULD BE REMOVED IF DUPLICATED

- Repeating the same “source-backed” explanation at multiple levels can be reduced visually, not deleted.

### RECOMMENDED CHANGE

Do a minimal RESET calm-first pass:

```txt
Show 4–5 primary need options first + Show more needs.
Keep Support visible.
Keep Toolbox available but secondary.
```

### RISK OF CHANGE

Medium-high.

RESET is safety-adjacent; do not hide Support or make an urgent need harder to find.

### PRIORITY

```txt
P2 — because RESET is for overloaded users
```

---

## SCREEN: RESET recommendation after selecting a need

### WHAT CURRENTLY FEELS DENSE

This screen is more focused than the need list but still shows:

- back action;
- selected need label;
- primary tool;
- favourite action;
- alternative tools;
- support/home/tool controls depending on state.

Measured evidence:

```txt
9 buttons
9 visible interactive controls
5 card/panel-like elements
4 headings
~699 text characters
~1210px scroll height
```

### LIKELY CAUSE

- Primary recommendation plus alternatives are shown together.
- Tool metadata and actions appear on multiple cards.

### WHAT MUST REMAIN

- Clear primary recommended source-backed tool.
- Alternatives.
- No diagnosis language.
- User agency.
- Support access.

### WHAT COULD BE SIMPLIFIED

- Make `Try this first` visually dominant.
- De-emphasize alternatives until after the primary card.

### WHAT COULD BE GROUPED

- Alternatives under one `Other options` disclosure or compact list.

### WHAT COULD USE PROGRESSIVE DISCLOSURE

- Full alternative tool cards.
- Favourite controls until tool card is opened/started.

### WHAT COULD MOVE LOWER ON THE PAGE

- Alternatives.
- Metadata not needed for the first decision.

### WHAT COULD BE REMOVED IF DUPLICATED

- Repeated category/day labels could be visually reduced if source traceability remains available.

### RECOMMENDED CHANGE

Keep the primary recommendation dominant and make alternatives visually secondary.

### RISK OF CHANGE

Low-medium.

Must not make alternatives feel unavailable.

### PRIORITY

```txt
P3 unless further iPhone testing shows confusion
```

---

## SCREEN: Today / Home

### WHAT CURRENTLY FEELS DENSE

Today is mostly the clearest screen above the fold, but the whole route includes:

- primary day action;
- Reset action;
- My Path shortcut;
- tool shortcut;
- personalization transparency;
- notification settings;
- local data controls.

Measured evidence:

```txt
13 buttons
23 visible interactive controls
14 card/panel-like elements
9 headings
~705 text characters
~1234px scroll height
```

### LIKELY CAUSE

- Trust/prototype/settings material is important but competes with the promise: “One clear next step.”
- Notification/local data controls are valuable but not primary for a tired first-time user.

### WHAT MUST REMAIN

- Start/continue current day.
- Reset now.
- My Path access.
- Privacy/prototype honesty.
- Local data controls discoverable.
- Support remains one bottom-nav tap away.

### WHAT COULD BE SIMPLIFIED

- Keep one dominant primary action.
- Make secondary trust/settings controls more compact.

### WHAT COULD BE GROUPED

- Notification settings and local data controls under one `Prototype settings / local data` disclosure.
- Personalization transparency under one concise privacy/trust note.

### WHAT COULD USE PROGRESSIVE DISCLOSURE

- Notification preferences.
- Local data controls.
- Extended personalization explanation.

### WHAT COULD MOVE LOWER ON THE PAGE

- Data controls.
- Notification settings.
- Detailed trust/prototype copy.

### WHAT COULD BE REMOVED IF DUPLICATED

- Repeated prototype/privacy disclaimers can be consolidated if still accurate and visible enough.

### RECOMMENDED CHANGE

Preserve Today’s top hero and actions. Move lower-frequency controls into a calm disclosure.

### RISK OF CHANGE

Low-medium.

Risk is hiding privacy/data controls too much. They must stay findable.

### PRIORITY

```txt
P3 — useful polish, not first remediation target
```

---

## SCREEN: Support

### WHAT CURRENTLY FEELS DENSE

Support is not the primary density problem. It has four support levels plus urgent-help copy.

Measured evidence:

```txt
0 route-level buttons
6 card/panel-like elements
2 headings
~682 text characters
~931px scroll height
```

### LIKELY CAUSE

- Safety copy and layered support options naturally take space.
- Level cards can feel list-heavy, but purpose is understandable.

### WHAT MUST REMAIN

- Support bottom-nav visibility.
- Crisis/support access not paywalled.
- Urgent help copy.
- Clear Canada-only 9-8-8 limitation.
- No diagnosis/therapy replacement claims.

### WHAT COULD BE SIMPLIFIED

- Slightly tighten level card language if needed.
- Make urgent help visually distinct.

### WHAT COULD BE GROUPED

- Non-urgent levels can remain as level cards.
- Urgent help should remain separate and prominent.

### WHAT COULD USE PROGRESSIVE DISCLOSURE

Be careful. Support should not hide urgent help.

Possible only for non-urgent explanations, not urgent support.

### WHAT COULD MOVE LOWER ON THE PAGE

- Non-urgent explanatory text can sit below urgent access if later testing suggests urgency is buried.

### WHAT COULD BE REMOVED IF DUPLICATED

Nothing obvious right now.

### RECOMMENDED CHANGE

No immediate change recommended before My Path/RESET refinement. Preserve Support visibility.

### RISK OF CHANGE

High if Support is hidden or de-emphasized incorrectly.

### PRIORITY

```txt
P3 / monitor only
```

---

## 3. Five highest-impact mobile UX problems

## 1. My Path combines overview, map, grid, summaries, and full day content in one scroll

Severity:

```txt
P2
```

Why it matters:

This is the clearest real usability problem. A tired user cannot quickly answer all three target questions:

1. Where am I?
2. What matters here?
3. What should I do next?

Greatest reduction / least disruption:

```txt
Separate My Path overview from full DayExperience by requiring a deliberate Open/Continue Day tap.
```

## 2. Toolbox exposes too much of the full practice inventory by default

Severity:

```txt
P2
```

Why it matters:

Toolbox usefulness is high, but first view is a long browse page. The first-time/low-bandwidth user needs a small relevant set before the full catalogue.

Greatest reduction / least disruption:

```txt
Show current-week/relevant tools first; collapse empty and full-browse sections.
```

## 3. RESET need selection has too many equally weighted choices

Severity:

```txt
P2
```

Why it matters:

RESET is specifically for “right now” states. Nine cards may be too many for a stressed, overloaded, or shift-fatigued user.

Greatest reduction / least disruption:

```txt
Keep all need options, but group or progressively reveal secondary options while preserving Support visibility.
```

## 4. Today’s lower-page trust/settings controls compete with the one-next-step promise

Severity:

```txt
P3
```

Why it matters:

Today’s top is good, but lower-page prototype/settings controls make the page feel more administrative.

Greatest reduction / least disruption:

```txt
Place notification/data controls inside one clearly labeled disclosure.
```

## 5. Repeated card/status/eyebrow/button patterns flatten visual hierarchy across screens

Severity:

```txt
P3
```

Why it matters:

Many legitimate sections use similar visual weight. This makes primary vs secondary decisions less obvious.

Greatest reduction / least disruption:

```txt
Make primary action areas visually dominant and reduce secondary metadata/pills/card weight without deleting content.
```

---

## 4. Genuine usability problems vs aesthetic preference

| Item | Classification | Why |
|---|---|---|
| My Path renders dashboard + full day content together | Genuine usability problem | High measured density and mixed task modes create scanning/cognitive burden. |
| RESET starts with 9 similar need cards | Genuine usability risk | RESET is for low-bandwidth moments; too many equivalent choices can slow action. |
| Toolbox full inventory is long by default | Genuine usability risk | Useful content, but heavy browse list before user has favourites/recent context. |
| Today has settings/prototype controls below core action | Moderate usability issue | Controls are needed, but not first-order to “one clear next step.” |
| Support has multiple levels | Mostly acceptable / monitor | Support detail is safety-critical; density should not be solved by hiding support. |
| App “looks good overall but busy” | Owner usability impression, not merely taste | Tied to concrete mobile/low-bandwidth use case and supported by density metrics. |
| Exact visual style/card aesthetics | Personal preference unless repeated by testers or tied to task failure | Current evidence supports hierarchy/density concerns more than pure styling critique. |

---

## 5. Recommended ONE controlled mobile UX refinement pass

A controlled refinement pass is justified, but should not start until owner approves.

Recommended pass:

```txt
Prompt #13 Remediation Pass A — Mobile Calm / Progressive Disclosure Pass
```

Scope:

1. My Path first:
   - calm default overview;
   - one primary current-day action;
   - move full DayExperience behind deliberate tap;
   - secondary progress/insight/practice/reflection sections behind accessible disclosure or lower grouping.
2. RESET second:
   - reduce initial need-choice burden;
   - preserve all need options and Support access;
   - keep no-diagnosis/source-backed language.
3. Toolbox third:
   - current-week/relevant tools first;
   - full browse via grouping/disclosure;
   - empty favourites/recent minimized.
4. Today fourth:
   - keep one clear next step;
   - group prototype settings/data controls.
5. Support only if needed:
   - keep Support visible and urgent copy distinct.

Explicit non-goals:

- Do not remove source-backed 28-day content.
- Do not rewrite the program.
- Do not change bottom nav.
- Do not hide Support.
- Do not add features.
- Do not begin Prompt #14.
- Do not change privacy/safety promises.

Verification required if approved later:

- automated regression: `npm test`, `npm run lint`, `npm run build`, `npm run final-audit`;
- browser smoke: Today → Day → My Path → RESET → Toolbox → Support;
- iPhone Safari retest of affected screens;
- ensure no source content removed;
- ensure Support remains one bottom-nav tap;
- ensure disclosures are accessible and tappable.

---

## 6. Current Prompt #13 validation status

Do **not** mark overall iPhone experience PASS yet.

Current status:

```txt
Physical iPhone Safari: PARTIAL
Controls tested: PASS/PARTIAL
Mobile density/hierarchy: OPEN P2 usability friction
Prompt #13 exit gate: NOT PASSED
Prompt #14: NOT AUTHORIZED / NOT STARTED
```

Stop point:

```txt
Audit complete. Await owner approval before any refinement pass.
```
