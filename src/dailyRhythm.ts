import { deriveDayRoadmapStatus, getRequiredTasks, type DayRoadmap, type RoadmapTask, type SmallWinSection } from './dayRoadmap.ts'

export type RhythmCard = {
  phase: SmallWinSection
  label: string
  tasks: RoadmapTask[]
  completedCount: number
  totalCount: number
  status: 'complete' | 'next' | 'upcoming' | 'unavailable'
  nextTask: RoadmapTask | null
}

// A read-only projection of the canonical roadmap, never a second progress store.
export function deriveDailyRhythm(roadmap: DayRoadmap | null | undefined, completedTaskIds: string[] = [], programComplete = false) {
  const status = roadmap ? deriveDayRoadmapStatus(roadmap, completedTaskIds) : null
  const required = roadmap ? getRequiredTasks(roadmap) : []
  const nextTask = programComplete ? null : status?.nextTask ?? null
  const cards: RhythmCard[] = (['morning', 'daily', 'evening'] as const).map((phase) => {
    const tasks = required.filter((task) => task.winSection === phase)
    const count = status?.sectionCounts[phase] ?? { completed: 0, total: 0 }
    return {
      phase,
      label: phase === 'morning' ? 'Morning' : phase === 'daily' ? 'Daily' : 'Evening',
      tasks,
      completedCount: count.completed,
      totalCount: count.total,
      status: count.total === 0 ? 'unavailable' : count.completed === count.total ? 'complete' : nextTask?.winSection === phase ? 'next' : 'upcoming',
      nextTask: programComplete ? null : tasks.find((task) => !status?.completedTaskIds.includes(task.id)) ?? null,
    }
  })
  return { cards, completedCount: status?.completedRequiredCount ?? 0, totalCount: status?.requiredCount ?? 0, nextTask, dayComplete: status?.dayComplete ?? false }
}
