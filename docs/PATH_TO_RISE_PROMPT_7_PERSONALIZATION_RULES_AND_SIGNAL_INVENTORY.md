# PATH TO RISE — PROMPT #7 PERSONALIZATION RULES + SIGNAL INVENTORY

Generated: 2026-10-03 15:42 PDT
Phase: Prompt #7 — Elite Personalization Engine
Purpose: Privacy-classified signal inventory, deterministic rule registry, priority model, and Prompt #8 handoff inputs.

---

## 1. Personalization philosophy implemented

Prompt #7 personalization uses only:

```txt
WHAT THE USER CHOOSES
+
WHAT THE APP ALREADY NEEDS TO KNOW TO FUNCTION
```

It does **not** use:

- hidden psychological inference;
- AI/ML recommendations;
- diagnosis;
- journal/reflection analysis;
- emotional scoring;
- analytics tracking;
- location, device sensors, or biometrics.

The product posture is:

```txt
The app remembers what I chose and makes it easier to keep going.
```

---

## 2. Implementation source of truth

```txt
src/personalizationContent.ts
```

Exports:

```txt
personalizationSignalInventory
createPersonalizationContext
personalizationRules
resolvePersonalization
```

UI integration:

```txt
src/App.tsx
```

Automated scenario validation:

```txt
scripts/personalization-scenarios.mjs
npm run personalization
```

---

## 3. Signal inventory

| Signal | Source | Why it exists | Sensitivity | Storage | User expectation | Personalization value | Class | Permitted? |
|---|---|---|---|---|---|---|---|---|
| currentDay | Program progress | Identifies active/next program day | Low wellness-program state | localStorage prototype | App remembers program position | Primary CTA | A — functional state | Yes |
| completedDays | Program progress | Tracks intentional Day completion | Moderate wellness-program state | localStorage prototype | Completed days stay completed | Next Day / Day 28 complete | A — functional state | Yes |
| daySectionProgress | Program progress | Tracks marked sections | Moderate wellness-program state | localStorage prototype | Continue unfinished day | Continue where left off | A — functional state | Yes |
| savedReflections | Program progress | Stores private reflection drafts | High private writing | localStorage prototype | Private writing remains private | None for Prompt #7 | E — prohibited | No |
| favouriteToolIds | Toolbox state | Explicit saved shortcuts | Low/moderate explicit preference | localStorage prototype | Saved tools easier to reopen | Strong secondary shortcut | B — explicit preference | Yes |
| recentToolIds | Toolbox state | Bounded recently started tools | Low/moderate behavioural state | localStorage prototype, max 5 IDs | Recent tools easier to reopen | Weak convenience shortcut | C — low-sensitivity behavioural | Yes |
| completedStandaloneToolIds | Toolbox state | Minimal standalone completion memory | Moderate usage history | localStorage prototype, max 20 IDs | Tool may show complete | Not needed for Prompt #7 | D — sensitive | No for recommendations |
| selected RESET need | React session state | Routes current RESET choice | Potentially sensitive current need | Not persisted | Used only for current route | Do not reuse beyond current RESET | D — sensitive | No for stored personalization |

---

## 4. Rule architecture

Conceptual pipeline:

```txt
Program state + explicit preferences + bounded recents
→ PersonalizationContext
→ Eligible rules
→ Priority resolution
→ Primary recommendation + optional shortcut
→ Short explanation
→ User choice
```

Rule object shape:

```txt
ruleId
priority
recommendationType
eligibility(context)
resolve(context)
fallback
```

---

## 5. Rule registry and priority

| Priority | Rule ID | Use | Explanation shown |
|---:|---|---|---|
| 100 | continue-unfinished-day | Resume meaningful unfinished Day | Continue where you left off. |
| 95 | post-program-maintenance | Day 28 complete user | The 28-Day Journey is complete. Keep useful tools available without creating Day 29. |
| 90 | start-current-day | Cold start or next Day | Next source-backed program step. |
| 70 | favourite-tool-shortcut | Explicit user-saved tool | One of your favourites. |
| 60 | recent-tool-shortcut | Bounded recent convenience | Recently used. |
| 50 | current-week-tool-shortcut | Current-week contextual tool | From Week N. |
| 10 | reset-default | Fallback | General source-backed support is available when you need it. |

Resolution rule:

```txt
Primary: unfinished Day > post-program > current Day > RESET fallback
Shortcut: favourite > recent > current-week tool
```

This keeps Home focused on one dominant next action while still providing one useful secondary shortcut.

---

## 6. Home personalization

Home now shows:

- one dominant primary CTA from the deterministic rule engine;
- a short, non-creepy reason;
- one optional secondary shortcut when useful;
- transparent privacy copy explaining that private reflections are not analyzed.

Examples:

```txt
Start Day 1 — Next source-backed program step.
Continue Day 9 — Continue where you left off.
Reset or revisit a practice — The 28-Day Journey is complete.
Mirror Breathwork — FAVOURITE · One of your favourites.
Hydration Reset — RECENT · Recently used.
Walk + Stretch Reset — CURRENT WEEK · From Week 1.
```

---

## 7. RESET boundary

RESET still starts with user selection:

```txt
What do you need right now?
```

Prompt #7 adds only an optional saved/recent shortcut below the need choices when available. It does not infer the user's need and does not replace Prompt #6 deterministic need → tool routing.

---

## 8. Toolbox personalization

Toolbox now includes:

- Favourites;
- Recent;
- From Week N for users still in the program;
- After Day 28 maintenance note for completed users;
- the full canonical source-backed library.

The canonical library remains visible; personalization improves discovery without hiding choices.

---

## 9. Data model and persistence

No new persisted fields were added for Prompt #7.

Prompt #7 reuses:

```txt
path-to-rise-program-progress-v1
path-to-rise-toolbox-state-v1
```

No recommendation history, dismissal history, analytics, scores, or hidden profile was created.

---

## 10. Prompt #8 handoff classification

| Data | Prompt #8 status |
|---|---|
| Program completion data | Can support basic progress/insights if presented without shame |
| Day section completion counts | Safe aggregate candidate; avoid pressure/streak framing |
| Favourite tool IDs | User-selected preference; safe for explicit shortcuts |
| Recent tool IDs | Bounded convenience state; use sparingly |
| Standalone tool completions | Requires Prompt #9 privacy review before deeper insights |
| Saved reflections / journal text | Sensitive data not to use for hidden insights |
| Need selections | Not persisted; do not add without clear value/consent |
| Time/location/sensors | Not available; do not use |

Prompt #8 should focus on simple, explainable progress and avoid turning wellness activity into performance surveillance.
