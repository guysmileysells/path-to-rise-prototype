# PATH TO RISE — PROMPT #6 CANONICAL TOOL MODEL + RESET MAPPING

Generated: 2026-10-03 15:29 PDT
Phase: Prompt #6 — Toolbox + RESET
Purpose: Canonical source-backed tool model, RESET need taxonomy, persistence boundaries, and Prompt #7 handoff inputs.

---

## 1. Architecture rule

Prompt #6 uses one canonical tool system:

```txt
SOURCE DOCX / Program section
→ src/programContent.ts
→ src/toolContent.ts canonical tool reference
→ RESET / Toolbox / Day-linked launch
→ ToolRunner
```

The app does **not** create separate tool copies for RESET, Toolbox, favourites, recents, or Day entry. Those contexts reference the same canonical tool IDs.

---

## 2. Canonical model file

```txt
src/toolContent.ts
```

Model concepts:

```ts
CanonicalTool
ResetNeed
ToolId
NeedId
SourceRef
```

Canonical tool fields:

```txt
id
canonicalName
sourceRefs
purpose
userNeeds
category
duration if source-supported
interactionType
repeatable
toolboxEligible
resetEligible
safetyMetadata
```

---

## 3. Canonical exposed tools

| Tool ID | Canonical name | Source day | Source section | RESET eligible | Toolbox eligible |
|---|---|---:|---|---|---|
| mirror-breathwork | Mirror Breathwork | 10 | Step 2 - Mirror Breathwork | Yes | Yes |
| hydration-reset | Hydration Reset | 10 | Step 3 - Hydration Reset | Yes | Yes |
| non-dominant-training | Non-Dominant Hand Training | 10 | Step 4 - Non-Dominant Hand Training | Yes | Yes |
| mirror-work | Mirror Work | 15 | Step 5 - Mirror Work & Identity Conditioning | No | Yes |
| gratitude-reflection | Gratitude & Reflection Journal | 10 | Step 3 - Gratitude & Reflection Journal | Yes | Yes |
| immediate-movement | Immediate Movement | 16 | Step 1 - Immediate Movement | Yes | Yes |
| evening-reset | Evening Reset Protocol | 16 | Day 16 Evening Reset Protocol | Yes | Yes |
| safe-check-in | Check In With Someone Safe | 20 | check-in with someone safe | Yes | Yes |
| integration-reflection | Integration Reflection | 28 | reflection & integration | No | Yes |
| nature-walk-stretch | Walk + Stretch Reset | 1 | Continue | Yes | Yes |

All exposed tools reference existing source-backed Day 1–28 sections.

---

## 4. RESET needs and deterministic mappings

| Need | Primary tool | Alternatives |
|---|---|---|
| I'm overwhelmed | Mirror Breathwork | Immediate Movement, Hydration Reset |
| I can't switch off | Evening Reset Protocol | Mirror Breathwork, Walk + Stretch Reset |
| I'm stuck in my head | Gratitude & Reflection Journal | Non-Dominant Hand Training, Integration Reflection |
| I'm coming home from shift | Walk + Stretch Reset | Evening Reset Protocol, Immediate Movement |
| I need to ground | Hydration Reset | Mirror Breathwork, Non-Dominant Hand Training |
| I need to sleep | Evening Reset Protocol | Gratitude & Reflection Journal |
| I feel numb | Immediate Movement | Hydration Reset, Check In With Someone Safe |
| I'm struggling with control | Non-Dominant Hand Training | Mirror Breathwork, Mirror Work |
| I need to connect | Check In With Someone Safe | Gratitude & Reflection Journal |

Mapping is simple, transparent and rule-based. No AI interpretation, psychological profiling, scoring, diagnosis, journal analysis, or hidden emotional-state inference exists.

---

## 5. Toolbox categories

| Category | Tools |
|---|---|
| For right now | Hydration Reset |
| Transitions | Walk + Stretch Reset |
| Grounding | Immediate Movement |
| Breathing | Mirror Breathwork |
| Thoughts & control | Non-Dominant Hand Training, Mirror Work, Integration Reflection |
| Connection | Check In With Someone Safe |
| Rest / wind-down | Gratitude & Reflection Journal, Evening Reset Protocol |

No empty visual categories are shown.

---

## 6. Persisted Prompt #6 state

Prototype-local key:

```txt
path-to-rise-toolbox-state-v1
```

Persisted fields:

| Field | Purpose | Storage | Retention | User benefit | Sensitivity | Delete/reset behavior |
|---|---|---|---|---|---|---|
| favouriteToolIds | Reopen known tools quickly | localStorage prototype | Until local data reset | Faster Toolbox access | Low/moderate wellness preference | Removed if localStorage cleared |
| recentToolIds | Short return path to recently used tools | localStorage prototype | Bounded to 5 IDs | Lower friction for returning users | Low/moderate usage signal | Removed if localStorage cleared |
| completedStandaloneToolIds | Minimal proof a standalone tool completed | localStorage prototype | Bounded to 20 IDs | Enables calm tool-complete state/history if needed | Moderate usage signal | Removed if localStorage cleared |

Not stored:

- need-selection history;
- emotional-state history;
- scores;
- hidden profile;
- journal/reflection text for Toolbox/RESET;
- analytics events;
- crisis/safety flags.

---

## 7. State separation

Prompt #6 explicitly separates:

```txt
DAY PROGRAM STATE       path-to-rise-program-progress-v1
TOOLBOX/RESET STATE     path-to-rise-toolbox-state-v1
RESET SESSION STATE     in-memory React state
USER PREFERENCES        favouriteToolIds only
```

Standalone RESET/Toolbox tool completion does not mutate:

```txt
currentDay
completedDays
daySectionProgress
savedReflections
```

---

## 8. Prompt #7 handoff classification

| Signal/state | Classification | Note |
|---|---|---|
| favouriteToolIds | SAFE FOR RULE-BASED PERSONALIZATION | User-selected preference, minimal and inspectable |
| recentToolIds | SAFE FOR RULE-BASED PERSONALIZATION with bounds | Use only as lightweight shortcut unless user consents to more |
| program position | SAFE FOR RULE-BASED PERSONALIZATION | Existing app state; avoid shame/pressure |
| completedStandaloneToolIds | REQUIRES PROMPT #9 PRIVACY REVIEW before production use | Could become sensitive usage history |
| selectedNeed in active RESET session | REQUIRES USER CONSENT if persisted | Currently not persisted |
| savedReflections | TOO SENSITIVE / DO NOT USE for hidden personalization | Never analyze silently |
| journal/free text | TOO SENSITIVE / DO NOT USE for hidden personalization | No hidden inference |
| crisis/support interactions | REQUIRES PROMPT #9 PRIVACY REVIEW | Do not personalize without explicit safety/privacy architecture |

---

## 9. Deferred / future review

- Full privacy/security hardening remains Prompt #9.
- Advanced personalization remains Prompt #7.
- Advanced progress/insights remains Prompt #8.
- Production persistence requires explicit architecture; current state is prototype-local only.
