# PATH TO RISE — PROMPT #13 MOBILE INFORMATION DENSITY EVALUATION

Generated: 2026-10-03 22:50 PDT
Status: evaluation only — no product/code changes authorized or made.

## Owner finding recorded

Owner physical iPhone/Safari finding:

```txt
USABILITY FRICTION — MOBILE INFORMATION DENSITY / VISUAL HIERARCHY
Status: OPEN — requires evaluation
```

Owner-reported evidence:

- Buttons and primary controls appear functional and tappable.
- Initial usability impression: several screens feel too busy / somewhat all over the place.
- A lot of information appears on each page at once.

## Live-screen density snapshot

Measured from current private preview DOM, not physical-device instrumentation:

| Route | Buttons | Card/panel-like elements | Headings | Text chars in screen | Density read |
|---|---:|---:|---:|---:|---|
| Today | 13 | 3 | 9 | ~659 | Medium; mostly clear, but lower collapsed settings/local controls add latent complexity. |
| Reset | 12 | 10 | 1 | ~1,022 | Medium-high; 9 need options compete in one list. |
| My Path | 37 | 21 | 13 | ~3,901 | Highest density; combines dashboard, map, grid, practice/reflection summaries, and full Day content. |
| Support | 0 | 5 | 2 | ~682 | Moderate; clear purpose but multiple support levels plus crisis copy occupy one scroll. |

## Highest-density screens

### 1. My Path — highest concern

Likely causes:

- Content volume: My Path renders progress summary, insights, four-week journey, 28-day grid, practice summary, reflection summary, progress privacy note, and full selected Day content in one scroll.
- Hierarchy: dashboard information and full lesson content have similar visual weight, so the user has to decide what matters first.
- Grouping: several legitimate sections are stacked, but the route does not clearly separate `overview`, `choose a day`, and `read/do the selected day` modes.
- Progressive disclosure: the full DayExperience is always present after progress sections instead of being opened only when the user asks to review that day.
- Competing calls to action: Return Home, Open RESET, 28 day buttons, tool buttons, section done buttons, reflection controls, and Complete Day controls all live in the same route.
- Repeated elements: many cards use similar visual treatments, status pills, eyebrows, and buttons; this makes the screen feel more like an admin dashboard than a calm mobile wellness path.

### 2. Reset — medium-high concern

Likely causes:

- Nine need choices appear at once.
- Each need card has a label plus helper copy, so scanning requires reading multiple mini-descriptions.
- Optional shortcut, Open Toolbox, Support, and safety fineprint can compete with the primary `choose one need` task.
- For low-cognitive-bandwidth use, the first view may ask too many decisions at once.

### 3. Today — medium concern

Likely causes:

- The above-the-fold hero is clear, but Today includes primary action, Reset action, My Path shortcut, personalization/tool shortcut, transparency note, notification settings, and local data controls.
- Some of those are important trust/prototype controls, but they compete with the stated promise: `One clear next step`.
- The personalization scope note is correct but may feel like internal/explanatory material during an owner/mobile test.

### 4. Support — lower concern

Likely causes:

- Support is easier to understand than My Path/Reset.
- It still presents four levels plus urgent-help copy in one route.
- This is acceptable for safety access, but the design should keep urgent support visually distinct and not hidden below too much explanatory copy.

## Likely root-cause categories

| Cause | Present? | Evidence |
|---|---|---|
| Content volume | Yes | My Path contains ~3,901 text chars and 21 card/panel-like elements. |
| Hierarchy | Yes | Many sections share similar card/status-pill styling. |
| Spacing | Possible | Cards are readable but stacked densely; mobile scroll becomes long quickly. |
| Grouping | Yes | My Path mixes overview, day picker, practice/reflection summaries, and day content. |
| Progressive disclosure | Yes | My Path and Reset expose many choices at once. |
| Navigation | Possible | Bottom nav works, but My Path acts as both progress dashboard and day reader. |
| Repeated elements | Yes | Eyebrows, pills, cards, and buttons repeat heavily. |
| Competing CTAs | Yes | My Path especially has multiple action types in one screen. |

## Smallest evidence-based UX improvement options — not implemented

These recommendations preserve source-backed content and avoid redesigning the product.

### A. Split My Path into calmer default sections using disclosure

Smallest likely improvement:

- Keep the progress summary visible.
- Keep one `Continue Day` / `Open current day` action visible.
- Collapse or tuck away secondary sections:
  - Insights
  - Four-week journey
  - 28-day grid
  - Practice summary
  - Reflection review
  - Progress privacy note
- Show full selected Day content only after an explicit `Open Day` action.

Why this helps:

- Preserves all content.
- Reduces first-screen cognitive load.
- Makes My Path feel like a path, not a dashboard plus workbook plus lesson page.

Risk:

- Must preserve accessibility of collapsed content and not hide critical Support/RESET access.

### B. Make Reset need choices less overwhelming

Smallest likely improvement:

- Group the nine needs into 2–3 visible clusters or use a short first set with `Show more needs`.
- Keep emergency/support access visible but visually secondary.
- Keep the low-cognitive-bandwidth path focused on one tap: `I'm overwhelmed` or equivalent first option.

Why this helps:

- RESET is meant for activated/tired users.
- Fewer initial choices may reduce decision burden without deleting source-backed options.

Risk:

- Do not bury a need someone may urgently recognize.

### C. Simplify Today’s secondary/trust material presentation

Smallest likely improvement:

- Keep primary program action and Reset action prominent.
- Move notification settings/local data controls behind a clear `Settings / prototype data controls` disclosure.
- Keep the privacy/prototype boundary accessible, but avoid making it compete with the first action.

Why this helps:

- Today better matches `One clear next step`.
- Trust controls remain present without making the first screen feel administrative.

Risk:

- Privacy disclosures must remain discoverable and understandable.

### D. Preserve Support visibility while calming support levels

Smallest likely improvement:

- Keep Support as a primary nav item.
- Keep urgent help visible and distinct.
- If needed, make support levels slightly more compact or grouped.

Why this helps:

- Support should remain easy to find and not paywalled.
- This is lower priority than My Path/Reset.

## Recommendation priority

1. Evaluate My Path first.
2. Evaluate Reset second, especially under the low-cognitive-bandwidth scenario.
3. Evaluate Today third for trust/settings density.
4. Leave Support mostly intact unless owner/device testing finds confusion.

## Current decision

Do not implement changes yet.

Continue Prompt #13 physical iPhone testing. Treat this as an open P2 usability-friction finding until screen-specific testing identifies whether the density actually blocks task completion or remains a subjective preference.
