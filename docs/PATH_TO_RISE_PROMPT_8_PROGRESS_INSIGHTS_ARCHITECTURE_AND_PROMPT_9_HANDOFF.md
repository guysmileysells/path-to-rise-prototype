# PATH TO RISE — PROMPT #8 PROGRESS + INSIGHTS ARCHITECTURE AND PROMPT #9 HANDOFF

Generated: 2026-10-03 16:04 PDT
Phase: Prompt #8 — Progress + Insights
Purpose: Canonical progress data inventory, deterministic insight registry, data integrity policy, and Prompt #9 hardening handoff.

---

## 1. Progress philosophy implemented

Progress answers:

```txt
Where have I been?
Where am I now?
What have I practiced?
What can I keep using?
What have I written that I may want to review?
```

Progress does **not** answer:

```txt
How healed am I?
How mentally healthy am I?
How resilient am I?
Am I winning or losing wellness?
```

The screen intentionally uses:

- movement;
- practice;
- reflection;
- continuity;
- learning.

It avoids:

- scores;
- grades;
- rankings;
- streak pressure;
- clinical claims;
- app-usage-as-wellness claims.

---

## 2. Implementation source of truth

```txt
src/progressContent.ts
```

Exports:

```txt
progressDataInventory
createProgressViewModel
progressInsightRules
resolveProgressInsights
```

UI integration:

```txt
src/App.tsx
```

Automated scenario validation:

```txt
scripts/progress-scenarios.mjs
npm run progress
```

Prompt #8 is integrated into the approved `My Path` destination. It does not add a new bottom-nav tab.

---

## 3. Candidate data inventory

| Field | Source | Storage | Sensitivity | Reliability | Display value | Insight value | Permitted use |
|---|---|---|---|---|---|---|---|
| completedDays | Program progress | Prototype localStorage | Moderate wellness-program state | High after duplicate/invalid-day sanitization | Days completed, week completion, program completion | Journey position and restrained milestones | SAFE |
| currentDay | Program progress | Prototype localStorage | Low/moderate wellness-program state | Derived fallback from first incomplete Day when contradictory | Current/next Day and Week | Next action only | SAFE |
| daySectionProgress | Program progress | Prototype localStorage | Moderate wellness-program state | Sanitized by valid day/section IDs | Sections completed in aggregate only | Practice/engagement summary without scores | SAFE |
| savedReflections | Program progress | Prototype localStorage | High private writing | Use references only; content belongs to user | Intentional reflection review by Day/section | Reference count only; never automatic interpretation | USE WITH CAUTION |
| favouriteToolIds | Toolbox state | Prototype localStorage | Low/moderate explicit preference | Sanitized canonical tool IDs | Saved tools count/names | Explicitly saved practices for reuse | SAFE |
| recentToolIds | Toolbox state | Prototype localStorage, max 5 IDs | Low/moderate behavioural state | Weak convenience signal only | Optional recent practice names | Descriptive reuse only; no psychological inference | USE WITH CAUTION |
| completedStandaloneToolIds | Toolbox state | Prototype localStorage, max 20 IDs | Moderate behavioural state | Standalone use; not program progress | Aggregate practiced tools only if useful | Do not use for deeper claims before Prompt #9 review | USE WITH CAUTION |
| time spent / streaks / sessions / screen views | Not collected | None | Could become behavioural surveillance | Unavailable and not needed | None | None | DO NOT USE |

---

## 4. Canonical derived progress model

Prompt #8 derives display state rather than adding parallel storage.

```txt
ProgressViewModel
  currentWeek
  currentDay
  daysCompleted
  sectionsCompleted
  completedWeeks
  programComplete
  weekProgress
  dayProgress
  favouriteTools
  recentTools
  learnedToolIds
  reflectionReferences
  dataIntegrityNotes
```

Single source of truth remains:

```txt
path-to-rise-program-progress-v1
path-to-rise-toolbox-state-v1
```

No new persisted progress field was added.

---

## 5. Week derivation

Week boundaries:

```txt
Week 1: Days 1–7 — Stabilize
Week 2: Days 8–14 — Awareness & Honesty
Week 3: Days 15–21 — Acceptance & Letting Go
Week 4: Days 22–28 — Identity & Purpose
```

Week state is derived from `completedDays`:

- `complete`: all seven Days in that week are complete.
- `current`: active week and not complete.
- `upcoming`: future week.

No failure/missed/late state exists.

---

## 6. Day-level derivation

Day states:

- `complete`
- `current`
- `available`
- `upcoming`

Never used:

- failed;
- missed;
- late.

Repeatedly opening a completed Day does not duplicate completion.

---

## 7. Insight registry

Central registry:

```txt
progressInsightRules
```

| Insight ID | Input data | Rule | Output | User benefit | Privacy | Limitation |
|---|---|---|---|---|---|---|
| journey-position | completedDays, currentDay | Always eligible | Week/current journey message | Shows where the user is now | LOW | Derived only from prototype-local Day completion |
| days-completed | completedDays | eligible if > 0 complete Days | N of 28 Days complete | Shows movement through source-backed program | LOW | Does not measure wellness improvement |
| week-completion | completedDays | eligible if a week is fully complete | Week N complete — Theme | Restrained milestone | LOW | Requires all seven Days in week complete |
| practice-summary | daySectionProgress, completedStandaloneToolIds | eligible if sections/tools exist | practiced N sections / reusable tools | Shows what can be returned to | MODERATE | Practice history, not clinical improvement |
| favourite-tools | favouriteToolIds | eligible if saved tools exist | N tools saved | Surfaces explicit saved practices | LOW | Favourite means saved, not mastered/effective |
| reflection-review | savedReflections | eligible if saved reflection refs exist | N saved reflections can be reviewed | Private access to user writing | SENSITIVE_REFERENCE_ONLY | Counts references only; no text analysis |
| post-program-continuity | completedDays, favouriteToolIds | eligible if program complete | RESET/Toolbox/favourites/reflections remain available | Keeps value after Day 28 | LOW | No healing/recovery claim |

No insight uses AI, ML, sentiment analysis, keyword extraction, emotional scoring, diagnosis, or hidden profiling.

---

## 8. Reflection review boundary

Reflection content is handled as private user writing.

Prompt #8 allows:

- listing saved reflection references by Day/section;
- showing the text only inside intentional details expansion;
- counting saved reflection references.

Prompt #8 prohibits:

- Home reflection previews;
- automatic summaries;
- sentiment analysis;
- keyword extraction;
- trauma interpretation;
- emotional scoring;
- hidden themes.

---

## 9. Data integrity and migration safety

No schema migration was required because no new persistent fields were added.

Deterministic recovery rules:

| State problem | Handling |
|---|---|
| duplicate completed Days | Count once for display |
| Day outside 1–28 | Ignore for display |
| invalid currentDay | Derive current Day from first incomplete Day |
| complete status but < 28 Days | Show Day 28 state and non-destructive integrity note |
| malformed section progress | Ignore invalid Day/section references |
| malformed favourites/recents | Sanitize to canonical tool IDs |
| missing reflections | Show empty private-review state |
| stale optional tool state | Does not alter program progress |

No repair silently destroys underlying stored user data.

---

## 10. Prompt #9 hardening handoff

| Area | Current status | Classification | Prompt #9 action |
|---|---|---|---|
| Personal data stored | Prototype-local program progress and tool IDs | CURRENTLY PROTECTED for prototype | Define production privacy/storage model |
| Wellness-related data stored | Completed Days, sections, favourites, recents, standalone tool IDs | NEEDS HARDENING | Decide secure storage, retention, deletion, backup/sync policy |
| Reflection data | User-written text in localStorage prototype | REQUIRES HUMAN REVIEW | Decide encryption/device lock/export/delete strategy |
| Local storage | Browser localStorage only | NEEDS HARDENING | Replace or wrap for production; document risks |
| Backend storage | None for prototype | CURRENTLY PROTECTED | Do not add without policy/security model |
| Analytics | None added | CURRENTLY PROTECTED | Define safe analytics boundary if needed |
| Authentication | Not changed by Prompt #8 | REQUIRES HUMAN REVIEW | Align with future account/security architecture |
| Delete/reset behavior | Dev reset clears local prototype state | NEEDS HARDENING | Separate dev reset from production delete/archive options |
| Accessibility gaps | Baseline headings/buttons/text labels; no real SR pass | NEEDS HARDENING | Screen-reader, dynamic text, keyboard/focus audit |
| Safety flows | Support route preserved; no diagnosis | CURRENTLY PROTECTED | Verify crisis/support content and jurisdictional resources |
| Error conditions | Derived-state notes for corrupt progress | NEEDS HARDENING | Add user-facing recovery if production persistence exists |
| Security concerns | Sensitive wellness/reflection data in localStorage | REQUIRES POLICY/LEGAL REVIEW | Threat model and secure local/remote storage before launch |

---

## 11. What Prompt #9 should verify

- Private reflection storage and deletion.
- Whether localStorage is acceptable only for prototype.
- Screen privacy for glanceable wellness state.
- Support/crisis language and resource verification.
- Accessibility: screen reader, dynamic text, keyboard/focus, reduced motion.
- Error/recovery behavior for corrupted local state.
- Whether any progress/insight language requires legal/clinical review.
- Production analytics boundary, if any.

---

## 12. Deferred from Prompt #8

- No export/share cards.
- No analytics platform.
- No chart library.
- No notifications.
- No production storage migration.
- No app-lock/encryption work.
- No target-user validation claim.
