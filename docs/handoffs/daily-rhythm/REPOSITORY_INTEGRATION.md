# Repository integration guide

Target: https://github.com/guysmileysells/path-to-rise-prototype

This package is a behavioral handoff, not a claim that the current repository has a particular file structure. **Inspect the current HEAD before editing.**

1. Locate the app's homepage entrypoint, navigation/routing, task detail UI, daily progress selectors, completion mutations, and persistence.
2. Reuse existing task IDs and canonical ordering. Build a view-model for Morning/Daily/Evening from real tasks and their saved completion states.
3. Map each phase to the app's actual content taxonomy. If the content does not explicitly divide into these three phases, document a deterministic mapping and avoid losing tasks.
4. Wire **Open next step** to the existing task detail route or UI, using the correct task/day identifier.
5. Preserve current settings, privacy controls, reflections, reset, support, and any reminder access.
6. Derive progress totals from existing source-of-truth state; do not store a second conflicting progress counter.
7. Preserve URL/deep-link behavior and refresh persistence.
8. Add tests at selector, interaction, and navigation levels where the existing stack permits.

Suggested view-model shape (adapt to app):
```ts
type Phase = 'morning' | 'daily' | 'evening';
type RhythmCard = {
  phase: Phase;
  title: string;
  taskIds: string[];
  completedCount: number;
  totalCount: number;
  status: 'complete' | 'next' | 'upcoming';
  nextTaskId?: string;
};
```

Do not assume the repository's language or framework; use its established conventions.
