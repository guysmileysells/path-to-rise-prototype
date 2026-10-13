import { programContent } from './programContent.ts'
import { canonicalTools, getCanonicalTool, sanitizeToolIds, type ToolId } from './toolContent.ts'
import { calculateSmallWins, deriveDayRoadmapStatus, getRoadmapForDay, sanitizeTaskProgress, type SmallWinsSummary } from './dayRoadmap.ts'

export type ProgressUseClass = 'SAFE' | 'USE_WITH_CAUTION' | 'DO_NOT_USE'
export type DayProgressState = 'complete' | 'current' | 'available' | 'upcoming'
export type WeekProgressState = 'complete' | 'current' | 'upcoming'
export type InsightPrivacyClass = 'LOW' | 'MODERATE' | 'SENSITIVE_REFERENCE_ONLY'

export type ProgressProgramState = {
  currentDay: number
  status: 'not_started' | 'in_progress' | 'program_complete'
  completedDays: unknown
  daySectionProgress: unknown
  dayTaskProgress?: unknown
  savedReflections: unknown
  lastReturn?: 'today' | 'after_break'
}

export type ProgressToolState = {
  favouriteToolIds?: unknown
  recentToolIds?: unknown
  completedStandaloneToolIds?: unknown
}

export type ProgressDataInventoryItem = {
  field: string
  source: string
  currentStorage: string
  sensitivity: string
  reliability: string
  displayValue: string
  insightValue: string
  permittedUse: ProgressUseClass
}

export type ReflectionReference = {
  key: string
  day: number
  sectionId: string
  sectionLabel: string
  title: string
  previewLabel: string
}

export type WeekProgress = {
  week: number
  label: string
  theme: string
  state: WeekProgressState
  completedDays: number
  totalDays: number
  dayRange: string
}

export type DayProgress = {
  day: number
  week: number
  title: string
  state: DayProgressState
  completedSections: number
  totalSections: number
}

export type ProgressViewModel = {
  currentDay: number
  currentWeek: number
  currentWeekLabel: string
  currentWeekTheme: string
  daysCompleted: number
  sectionsCompleted: number
  totalSections: number
  dayTaskProgressLabel?: string
  nextTaskLabel?: string
  smallWins: SmallWinsSummary
  completedWeeks: number[]
  programComplete: boolean
  nextActionLabel: string
  primarySummary: string
  weekProgress: WeekProgress[]
  dayProgress: DayProgress[]
  favouriteTools: string[]
  recentTools: string[]
  learnedToolIds: ToolId[]
  reflectionReferences: ReflectionReference[]
  dataIntegrityNotes: string[]
}

export type ProgressInsight = {
  insightId: string
  message: string
  priority: number
  destination: 'summary' | 'journey' | 'practice' | 'reflections' | 'post-program'
  inputData: string[]
  rule: string
  userBenefit: string
  privacyClass: InsightPrivacyClass
  confidenceLimit: string
}

export type ProgressInsightRule = {
  insightId: string
  priority: number
  destination: ProgressInsight['destination']
  requiredData: string[]
  privacyClass: InsightPrivacyClass
  eligibility: (model: ProgressViewModel) => boolean
  message: (model: ProgressViewModel) => string
  userBenefit: string
  confidenceLimit: string
}

export const progressDataInventory: ProgressDataInventoryItem[] = [
  {
    field: 'completedDays',
    source: 'path-to-rise-program-progress-v1',
    currentStorage: 'Prototype localStorage',
    sensitivity: 'Moderate wellness-program state',
    reliability: 'High after duplicate/invalid-day sanitization',
    displayValue: 'Days completed, week completion, program completion',
    insightValue: 'Journey position and restrained milestones',
    permittedUse: 'SAFE',
  },
  {
    field: 'currentDay',
    source: 'path-to-rise-program-progress-v1',
    currentStorage: 'Prototype localStorage',
    sensitivity: 'Low/moderate wellness-program state',
    reliability: 'Derived fallback from first incomplete day when contradictory',
    displayValue: 'Current/next Day and Week',
    insightValue: 'Next action only',
    permittedUse: 'SAFE',
  },
  {
    field: 'daySectionProgress',
    source: 'path-to-rise-program-progress-v1',
    currentStorage: 'Prototype localStorage',
    sensitivity: 'Moderate wellness-program state',
    reliability: 'Sanitized by valid day/section IDs',
    displayValue: 'Sections completed in aggregate only',
    insightValue: 'Practice/engagement summary without scores',
    permittedUse: 'SAFE',
  },
  {
    field: 'dayTaskProgress',
    source: 'path-to-rise-program-progress-v1',
    currentStorage: 'Prototype localStorage',
    sensitivity: 'Moderate wellness-program state',
    reliability: 'Sanitized by canonical 28-day roadmap action IDs',
    displayValue: 'Morning Activation, Daily Wellness Activity and Evening Activation Small Wins',
    insightValue: 'Action completion only; no scoring or psychological inference',
    permittedUse: 'SAFE',
  },
  {
    field: 'savedReflections',
    source: 'path-to-rise-program-progress-v1',
    currentStorage: 'Prototype localStorage',
    sensitivity: 'High private writing',
    reliability: 'Use references only; content belongs to user',
    displayValue: 'Intentional reflection review by Day/section',
    insightValue: 'Reference count only; never automatic interpretation',
    permittedUse: 'USE_WITH_CAUTION',
  },
  {
    field: 'favouriteToolIds',
    source: 'path-to-rise-toolbox-state-v1',
    currentStorage: 'Prototype localStorage',
    sensitivity: 'Low/moderate explicit preference',
    reliability: 'Sanitized canonical tool IDs',
    displayValue: 'Saved tools count/names',
    insightValue: 'Explicitly saved practices for reuse',
    permittedUse: 'SAFE',
  },
  {
    field: 'recentToolIds',
    source: 'path-to-rise-toolbox-state-v1',
    currentStorage: 'Prototype localStorage bounded to five IDs',
    sensitivity: 'Low/moderate behavioural state',
    reliability: 'Weak convenience signal only',
    displayValue: 'Optional recent practice names',
    insightValue: 'Descriptive reuse only; no psychological inference',
    permittedUse: 'USE_WITH_CAUTION',
  },
  {
    field: 'completedStandaloneToolIds',
    source: 'path-to-rise-toolbox-state-v1',
    currentStorage: 'Prototype localStorage bounded to twenty IDs',
    sensitivity: 'Moderate behavioural state',
    reliability: 'Standalone use; not program progress',
    displayValue: 'Aggregate practiced tools only if useful',
    insightValue: 'Do not use for deeper claims before Prompt #9 review',
    permittedUse: 'USE_WITH_CAUTION',
  },
  {
    field: 'time spent / streaks / sessions / screen views',
    source: 'Not collected',
    currentStorage: 'None',
    sensitivity: 'Could become behavioural surveillance',
    reliability: 'Unavailable and not needed',
    displayValue: 'None',
    insightValue: 'None',
    permittedUse: 'DO_NOT_USE',
  },
]

function uniqueValidDays(value: unknown): number[] {
  if (!Array.isArray(value)) return []
  return [...new Set(value.filter((day): day is number => Number.isInteger(day) && day >= 1 && day <= 28))].sort((left, right) => left - right)
}

function normalizeDay(day: unknown) {
  if (typeof day !== 'number' || !Number.isFinite(day)) return 1
  return Math.min(28, Math.max(1, Math.round(day)))
}

function safeSectionProgress(value: unknown): Record<string, string[]> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const validByDay = new Map<string, Set<string>>(programContent.map((day) => [String(day.day), new Set<string>(day.sections.map((section) => section.id))]))
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).flatMap(([dayKey, sectionIds]) => {
      const validSections = validByDay.get(dayKey)
      if (!validSections || !Array.isArray(sectionIds)) return []
      const filtered = [...new Set(sectionIds.filter((id): id is string => typeof id === 'string' && validSections.has(id)))]
      return [[dayKey, filtered]]
    }),
  )
}

function safeReflections(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).filter((entry): entry is [string, string] => typeof entry[1] === 'string' && entry[1].trim().length > 0),
  )
}

function firstIncompleteDay(completedDays: number[]) {
  const completed = new Set(completedDays)
  return programContent.find((day) => !completed.has(day.day))?.day ?? 28
}

function getDay(dayNumber: number) {
  return programContent.find((day) => day.day === normalizeDay(dayNumber)) ?? programContent[0]
}

function getWeekDays(week: number) {
  return programContent.filter((day) => day.week === week)
}

function getWeekState(week: number, currentWeek: number, completedDays: Set<number>, programComplete: boolean): WeekProgressState {
  const weekDays = getWeekDays(week)
  const complete = weekDays.every((day) => completedDays.has(day.day))
  if (complete) return 'complete'
  if (!programComplete && week === currentWeek) return 'current'
  return 'upcoming'
}

function getReflectionReferences(reflections: Record<string, string>): ReflectionReference[] {
  return Object.keys(reflections).flatMap((key) => {
    const match = key.match(/^day-(\d+):(.+)$/)
    if (!match) return []
    const dayNumber = Number(match[1])
    const day = programContent.find((candidate) => candidate.day === dayNumber)
    const section = day?.sections.find((candidate) => candidate.id === match[2])
    if (!day || !section) return []
    return [{
      key,
      day: dayNumber,
      sectionId: section.id,
      sectionLabel: section.label,
      title: `Day ${dayNumber} Reflection`,
      previewLabel: `${day.weekLabel} · ${section.label}`,
    }]
  }).sort((left, right) => left.day - right.day || left.sectionLabel.localeCompare(right.sectionLabel))
}

function getLearnedToolIds(completedDays: number[], completedStandaloneToolIds: ToolId[]): ToolId[] {
  const completedDaySet = new Set(completedDays)
  return sanitizeToolIds([
    ...canonicalTools.filter((tool) => tool.sourceRefs.some((ref) => completedDaySet.has(ref.day))).map((tool) => tool.id),
    ...completedStandaloneToolIds,
  ], canonicalTools.length)
}

export function createProgressViewModel(progress: ProgressProgramState, toolState: ProgressToolState = {}): ProgressViewModel {
  const completedDays = uniqueValidDays(progress.completedDays)
  const completedDaySet = new Set(completedDays)
  const sanitizedSections = safeSectionProgress(progress.daySectionProgress)
  const sanitizedTasks = sanitizeTaskProgress(progress.dayTaskProgress)
  const sanitizedReflections = safeReflections(progress.savedReflections)
  const favouriteToolIds = sanitizeToolIds(toolState.favouriteToolIds, 20)
  const recentToolIds = sanitizeToolIds(toolState.recentToolIds, 5)
  const completedStandaloneToolIds = sanitizeToolIds(toolState.completedStandaloneToolIds, 20)
  const programComplete = progress.status === 'program_complete' || completedDays.length === 28
  const currentDay = programComplete ? 28 : firstIncompleteDay(completedDays)
  const currentDayContent = getDay(currentDay)
  const currentWeek = currentDayContent.week
  const totalSections = programContent.reduce((sum, day) => sum + day.sections.length, 0)
  const sectionsCompleted = Object.values(sanitizedSections).reduce((sum, ids) => sum + ids.length, 0)
  const currentRoadmap = getRoadmapForDay(currentDay)
  const currentRoadmapStatus = currentRoadmap ? deriveDayRoadmapStatus(currentRoadmap, sanitizedTasks[String(currentDay)] ?? []) : null
  const smallWins = calculateSmallWins(sanitizedTasks, currentDay)
  const dataIntegrityNotes: string[] = []

  if (Array.isArray(progress.completedDays) && progress.completedDays.length !== completedDays.length) dataIntegrityNotes.push('Duplicate or invalid completed Day values were ignored for display.')
  if (typeof progress.currentDay === 'number' && normalizeDay(progress.currentDay) !== currentDay && !programComplete) dataIntegrityNotes.push('Displayed current Day was derived from the first incomplete Day to avoid contradictory state.')
  if (progress.status === 'program_complete' && completedDays.length < 28) dataIntegrityNotes.push('Program status said complete but fewer than 28 unique Days were present; Day 28 state is shown without erasing stored values.')

  const weekProgress = [1, 2, 3, 4].map((week) => {
    const days = getWeekDays(week)
    const completed = days.filter((day) => completedDaySet.has(day.day)).length
    return {
      week,
      label: days[0]?.weekLabel ?? `Week ${week}`,
      theme: days[0]?.weekTheme ?? '',
      state: getWeekState(week, currentWeek, completedDaySet, programComplete),
      completedDays: completed,
      totalDays: days.length,
      dayRange: `${days[0]?.day ?? 1}–${days.at(-1)?.day ?? week * 7}`,
    }
  })

  const dayProgress = programContent.map((day) => {
    const complete = completedDaySet.has(day.day)
    const state: DayProgressState = complete ? 'complete' : day.day === currentDay && !programComplete ? 'current' : day.day < currentDay || day.day <= currentDay + 1 ? 'available' : 'upcoming'
    return {
      day: day.day,
      week: day.week,
      title: day.title,
      state,
      completedSections: sanitizedSections[String(day.day)]?.length ?? 0,
      totalSections: day.sections.length,
    }
  })

  const completedWeeks = weekProgress.filter((week) => week.state === 'complete').map((week) => week.week)
  const favouriteTools = favouriteToolIds.map((id) => getCanonicalTool(id)?.canonicalName).filter((name): name is string => Boolean(name))
  const recentTools = recentToolIds.map((id) => getCanonicalTool(id)?.canonicalName).filter((name): name is string => Boolean(name))
  const learnedToolIds = getLearnedToolIds(completedDays, completedStandaloneToolIds)
  const dayTaskProgressLabel = !programComplete && currentRoadmapStatus ? currentRoadmapStatus.progressLabel : undefined
  const nextTaskLabel = !programComplete && currentRoadmapStatus?.nextTask ? `${currentRoadmapStatus.nextTask.shortTitle}` : undefined
  const nextActionLabel = programComplete ? 'Reset or revisit a practice' : nextTaskLabel ? `Next up: ${nextTaskLabel}` : completedDays.length === 0 ? 'Start Day 1' : `Continue Day ${currentDay}`

  return {
    currentDay,
    currentWeek,
    currentWeekLabel: currentDayContent.weekLabel,
    currentWeekTheme: currentDayContent.weekTheme,
    daysCompleted: completedDays.length,
    sectionsCompleted,
    totalSections,
    dayTaskProgressLabel,
    nextTaskLabel,
    smallWins,
    completedWeeks,
    programComplete,
    nextActionLabel,
    primarySummary: programComplete ? '28 of 28 Days complete' : `Day ${currentDay} of 28 · Week ${currentWeek}`,
    weekProgress,
    dayProgress,
    favouriteTools,
    recentTools,
    learnedToolIds,
    reflectionReferences: getReflectionReferences(sanitizedReflections),
    dataIntegrityNotes,
  }
}

export const progressInsightRules: ProgressInsightRule[] = [
  {
    insightId: 'journey-position',
    priority: 100,
    destination: 'summary',
    requiredData: ['completedDays', 'currentDay'],
    privacyClass: 'LOW',
    eligibility: () => true,
    message: (model) => model.programComplete ? 'You completed the 28-Day Journey.' : `You are in Week ${model.currentWeek}: ${model.currentWeekTheme}.`,
    userBenefit: 'Answers where the user is now.',
    confidenceLimit: 'Derived only from prototype-local Day completion state.',
  },
  {
    insightId: 'days-completed',
    priority: 90,
    destination: 'journey',
    requiredData: ['completedDays'],
    privacyClass: 'LOW',
    eligibility: (model) => model.daysCompleted > 0,
    message: (model) => `${model.daysCompleted} of 28 Days are complete.`,
    userBenefit: 'Shows movement through the source-backed program without scoring the person.',
    confidenceLimit: 'Counts completed Days only once; it does not measure wellness improvement.',
  },
  {
    insightId: 'week-completion',
    priority: 80,
    destination: 'journey',
    requiredData: ['completedDays'],
    privacyClass: 'LOW',
    eligibility: (model) => model.completedWeeks.length > 0 && !model.programComplete,
    message: (model) => `Week ${model.completedWeeks.at(-1)} complete — ${model.weekProgress.find((week) => week.week === model.completedWeeks.at(-1))?.theme}.`,
    userBenefit: 'Recognizes completed program stages without gamification.',
    confidenceLimit: 'A week is complete only when all seven Days in that week are marked complete.',
  },
  {
    insightId: 'practice-summary',
    priority: 70,
    destination: 'practice',
    requiredData: ['daySectionProgress', 'completedStandaloneToolIds'],
    privacyClass: 'MODERATE',
    eligibility: (model) => model.sectionsCompleted > 0 || model.learnedToolIds.length > 0,
    message: (model) => `You have completed ${model.smallWins.program.completed} of 476 Small Wins, and ${model.learnedToolIds.length} reusable tools are available.`,
    userBenefit: 'Shows what the user has practiced and can return to.',
    confidenceLimit: 'This is engagement/practice history, not proof of clinical improvement.',
  },
  {
    insightId: 'favourite-tools',
    priority: 60,
    destination: 'practice',
    requiredData: ['favouriteToolIds'],
    privacyClass: 'LOW',
    eligibility: (model) => model.favouriteTools.length > 0,
    message: (model) => `${model.favouriteTools.length} tool${model.favouriteTools.length === 1 ? ' is' : 's are'} saved for reuse.`,
    userBenefit: 'Surfaces explicitly saved practices.',
    confidenceLimit: 'Favourites mean saved, not mastered or clinically effective.',
  },
  {
    insightId: 'reflection-review',
    priority: 50,
    destination: 'reflections',
    requiredData: ['savedReflections'],
    privacyClass: 'SENSITIVE_REFERENCE_ONLY',
    eligibility: (model) => model.reflectionReferences.length > 0,
    message: (model) => `${model.reflectionReferences.length} saved reflection${model.reflectionReferences.length === 1 ? '' : 's'} can be reviewed when you choose.`,
    userBenefit: 'Gives private access to user-created writing without interpretation.',
    confidenceLimit: 'The app counts references only; it does not analyze reflection text.',
  },
  {
    insightId: 'post-program-continuity',
    priority: 40,
    destination: 'post-program',
    requiredData: ['completedDays', 'favouriteToolIds'],
    privacyClass: 'LOW',
    eligibility: (model) => model.programComplete,
    message: () => 'After Day 28, RESET, Toolbox, favourites and reflections remain available without creating Day 29.',
    userBenefit: 'Makes the completed program useful without inventing an infinite progression ladder.',
    confidenceLimit: 'Does not claim the user is fixed, healed, recovered, or clinically improved.',
  },
]

export function resolveProgressInsights(model: ProgressViewModel): ProgressInsight[] {
  return progressInsightRules
    .filter((rule) => rule.eligibility(model))
    .sort((left, right) => right.priority - left.priority)
    .map((rule) => ({
      insightId: rule.insightId,
      message: rule.message(model),
      priority: rule.priority,
      destination: rule.destination,
      inputData: rule.requiredData,
      rule: rule.insightId,
      userBenefit: rule.userBenefit,
      privacyClass: rule.privacyClass,
      confidenceLimit: rule.confidenceLimit,
    }))
}
