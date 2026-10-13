# Day 1 Ordered Roadmap Implementation Plan

> Canonical full plan: `docs/PATH_TO_RISE_DAY_1_ORDERED_ROADMAP_IMPLEMENTATION_PLAN.md`

**Goal:** Convert PATH to RISE Day 1 from a collection of activities/manual whole-day completion into a source-backed ordered roadmap with granular task completion, next-task resume, and calculated Day completion.

**Architecture:** Create a canonical Day 1 roadmap/task model from `src/programContent.ts`, add task-level completion state, derive Day completion from required task completion, and render Day 1 as an ordered mobile roadmap. Keep Words Along the Way, RESET, Toolbox, and education separate from numbered task completion.

**Tech Stack:** React 19, TypeScript, Vite, localStorage prototype state, custom Node scenario scripts.

---

## Required stop gate

Do **not** implement until owner explicitly approves the canonical plan.

```txt
DAY 1 ORDERED ROADMAP PLAN COMPLETE —
READY FOR OWNER APPROVAL TO IMPLEMENT
```

## Implementation tasks after approval

1. Create `src/dayRoadmap.ts` with Day 1 task model and helpers.
2. Extend `ProgramProgress` parsing with `dayTaskProgress` while preserving legacy data.
3. Add task completion/undo handlers in `src/App.tsx`.
4. Render Day 1 with ordered `DayRoadmap` instead of legacy source-section cards.
5. Add focused `TaskDetail` for open task instructions.
6. Replace manual Day 1 `Complete Day` button with calculated completion state.
7. Add Today/Home next-task resume state.
8. Update `progressContent.ts` view model to keep My Path/Today/Day page consistent.
9. Add scenario tests in `scripts/day-roadmap-scenarios.mjs` and update existing contract/progress scripts.
10. Run `npm run test`, `npm run lint`, `npm run build`, browser QA, and physical iPhone owner test.

## Critical constraints

- Day 1 source says: `Complete all six. Order matters.`
- Do not hard-code assumptions for Days 2–28.
- Do not scale until Day 1 physical iPhone approval.
- Do not make Words Along the Way, RESET, Toolbox, education, source metadata, or opening a task affect completion.
- No fake notification delivery.
- No shame/gamification/streaks.
