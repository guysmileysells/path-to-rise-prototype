import { programContent } from './programContent.ts'
import { canonicalTools, getCanonicalTool, sanitizeToolIds, type CanonicalTool, type ToolId } from './toolContent.ts'

export type PersonalizationSignalClass = 'A_FUNCTIONAL_STATE' | 'B_EXPLICIT_USER_PREFERENCE' | 'C_LOW_SENSITIVITY_BEHAVIOURAL_STATE' | 'D_SENSITIVE' | 'E_PROHIBITED_FOR_PERSONALIZATION'
export type RecommendationType = 'program-primary' | 'shortcut' | 'toolbox-context' | 'post-program'
export type RecommendationDestination = 'today' | 'path' | 'reset' | 'toolbox' | 'tool'

export type PersonalizationProgramState = {
  currentDay: number
  status: 'not_started' | 'in_progress' | 'program_complete'
  completedDays: number[]
  daySectionProgress: Record<string, string[]>
  savedReflections: Record<string, string>
  lastReturn: 'today' | 'after_break'
}

export type PersonalizationToolState = {
  favouriteToolIds: ToolId[]
  recentToolIds: ToolId[]
  completedStandaloneToolIds: ToolId[]
}

export type PersonalizationContext = {
  currentDay: number
  currentWeek: number
  currentWeekTheme: string
  programComplete: boolean
  currentDayComplete: boolean
  currentDaySectionCount: number
  currentDayCompletedSectionCount: number
  hasUnfinishedDay: boolean
  favouriteToolIds: ToolId[]
  recentToolIds: ToolId[]
  currentWeekTools: CanonicalTool[]
}

export type PersonalizationRecommendation = {
  ruleId: string
  priority: number
  type: RecommendationType
  destination: RecommendationDestination
  label: string
  reason: string
  action: 'continue-program' | 'open-reset' | 'open-toolbox' | 'start-tool'
  toolId?: ToolId
  badge?: 'FAVOURITE' | 'RECENT' | 'CURRENT WEEK' | 'POST-PROGRAM'
}

export type PersonalizationRule = {
  ruleId: string
  priority: number
  recommendationType: RecommendationType
  eligibility: (context: PersonalizationContext) => boolean
  resolve: (context: PersonalizationContext) => PersonalizationRecommendation
  fallback: string
}

export const personalizationSignalInventory = [
  {
    signal: 'currentDay',
    source: 'path-to-rise-program-progress-v1',
    whyItExists: 'Identifies the active or next program day.',
    sensitivity: 'Low wellness-program state',
    currentStorage: 'Prototype localStorage',
    userExpectation: 'The app remembers where the user is in the program.',
    personalizationValue: 'Supports the primary Continue/Start CTA.',
    classification: 'A_FUNCTIONAL_STATE',
    permitted: true,
  },
  {
    signal: 'completedDays',
    source: 'path-to-rise-program-progress-v1',
    whyItExists: 'Tracks intentional Day completion.',
    sensitivity: 'Moderate wellness-program state',
    currentStorage: 'Prototype localStorage',
    userExpectation: 'Completed days stay completed.',
    personalizationValue: 'Prevents routing to already completed days and supports post-Day-28 state.',
    classification: 'A_FUNCTIONAL_STATE',
    permitted: true,
  },
  {
    signal: 'daySectionProgress',
    source: 'path-to-rise-program-progress-v1',
    whyItExists: 'Tracks marked READ/DO/REFLECT/COMPLETE section progress.',
    sensitivity: 'Moderate wellness-program state',
    currentStorage: 'Prototype localStorage',
    userExpectation: 'The app can continue an unfinished day.',
    personalizationValue: 'Allows “Continue where you left off” without analyzing private writing.',
    classification: 'A_FUNCTIONAL_STATE',
    permitted: true,
  },
  {
    signal: 'savedReflections',
    source: 'path-to-rise-program-progress-v1',
    whyItExists: 'Stores user-written reflection drafts for the prototype.',
    sensitivity: 'High sensitive private writing',
    currentStorage: 'Prototype localStorage',
    userExpectation: 'Private writing remains private writing.',
    personalizationValue: 'None for Prompt #7.',
    classification: 'E_PROHIBITED_FOR_PERSONALIZATION',
    permitted: false,
  },
  {
    signal: 'favouriteToolIds',
    source: 'path-to-rise-toolbox-state-v1',
    whyItExists: 'Explicitly saved tool shortcuts.',
    sensitivity: 'Low/moderate explicit preference',
    currentStorage: 'Prototype localStorage',
    userExpectation: 'Saved tools become easier to reopen.',
    personalizationValue: 'Strong transparent secondary shortcut.',
    classification: 'B_EXPLICIT_USER_PREFERENCE',
    permitted: true,
  },
  {
    signal: 'recentToolIds',
    source: 'path-to-rise-toolbox-state-v1',
    whyItExists: 'Bounded convenience history for recently started tools.',
    sensitivity: 'Low/moderate behavioural state',
    currentStorage: 'Prototype localStorage, bounded to 5 IDs',
    userExpectation: 'Recently used tools may be easier to reopen.',
    personalizationValue: 'Weak transparent convenience shortcut.',
    classification: 'C_LOW_SENSITIVITY_BEHAVIOURAL_STATE',
    permitted: true,
  },
  {
    signal: 'completedStandaloneToolIds',
    source: 'path-to-rise-toolbox-state-v1',
    whyItExists: 'Minimal standalone completion state from Prompt #6.',
    sensitivity: 'Moderate behavioural state',
    currentStorage: 'Prototype localStorage, bounded to 20 IDs',
    userExpectation: 'A tool may show as previously completed.',
    personalizationValue: 'Not needed for Prompt #7 recommendations.',
    classification: 'D_SENSITIVE',
    permitted: false,
  },
  {
    signal: 'selected RESET need',
    source: 'React session state only',
    whyItExists: 'Routes a current RESET session.',
    sensitivity: 'Potentially sensitive current self-described need',
    currentStorage: 'Not persisted',
    userExpectation: 'Used only to show the current RESET recommendation.',
    personalizationValue: 'Do not persist or reuse outside the current RESET flow.',
    classification: 'D_SENSITIVE',
    permitted: false,
  },
] as const

function firstIncompleteDay(completedDays: number[]) {
  const complete = new Set(completedDays)
  const first = programContent.find((day) => !complete.has(day.day))
  return first?.day ?? 28
}

function getProgramDay(dayNumber: number) {
  return programContent.find((day) => day.day === Math.min(28, Math.max(1, Math.round(dayNumber)))) ?? programContent[0]
}

export function createPersonalizationContext(progress: PersonalizationProgramState, toolState: PersonalizationToolState): PersonalizationContext {
  const completedDays = Array.isArray(progress.completedDays) ? progress.completedDays : []
  const programComplete = progress.status === 'program_complete' || completedDays.length === 28
  const currentDay = programComplete ? 28 : firstIncompleteDay(completedDays)
  const day = getProgramDay(currentDay)
  const daySections = progress.daySectionProgress[String(currentDay)] ?? []
  const currentWeekTools = canonicalTools.filter((tool) => tool.sourceRefs.some((ref) => getProgramDay(ref.day).week === day.week))

  return {
    currentDay,
    currentWeek: day.week,
    currentWeekTheme: day.weekTheme,
    programComplete,
    currentDayComplete: completedDays.includes(currentDay),
    currentDaySectionCount: day.sections.length,
    currentDayCompletedSectionCount: daySections.length,
    hasUnfinishedDay: !programComplete && (progress.status === 'in_progress' || daySections.length > 0),
    favouriteToolIds: sanitizeToolIds(toolState.favouriteToolIds, 20),
    recentToolIds: sanitizeToolIds(toolState.recentToolIds, 5),
    currentWeekTools,
  }
}

export const personalizationRules: PersonalizationRule[] = [
  {
    ruleId: 'continue-unfinished-day',
    priority: 100,
    recommendationType: 'program-primary',
    eligibility: (context) => context.hasUnfinishedDay,
    resolve: (context) => ({
      ruleId: 'continue-unfinished-day',
      priority: 100,
      type: 'program-primary',
      destination: 'path',
      label: `Continue Day ${context.currentDay}`,
      reason: 'Continue where you left off.',
      action: 'continue-program',
    }),
    fallback: 'start-current-day',
  },
  {
    ruleId: 'post-program-maintenance',
    priority: 95,
    recommendationType: 'post-program',
    eligibility: (context) => context.programComplete,
    resolve: () => ({
      ruleId: 'post-program-maintenance',
      priority: 95,
      type: 'post-program',
      destination: 'reset',
      label: 'Reset or revisit a practice',
      reason: 'The 28-Day Journey is complete. Keep useful tools available without creating Day 29.',
      action: 'open-reset',
      badge: 'POST-PROGRAM',
    }),
    fallback: 'favourite-tool-shortcut',
  },
  {
    ruleId: 'start-current-day',
    priority: 90,
    recommendationType: 'program-primary',
    eligibility: (context) => !context.programComplete,
    resolve: (context) => ({
      ruleId: 'start-current-day',
      priority: 90,
      type: 'program-primary',
      destination: 'path',
      label: context.currentDay === 1 ? 'Start Day 1' : `Begin Day ${context.currentDay}`,
      reason: 'Next source-backed program step.',
      action: 'continue-program',
    }),
    fallback: 'reset-default',
  },
  {
    ruleId: 'favourite-tool-shortcut',
    priority: 70,
    recommendationType: 'shortcut',
    eligibility: (context) => context.favouriteToolIds.some((id) => Boolean(getCanonicalTool(id))),
    resolve: (context) => {
      const tool = context.favouriteToolIds.map((id) => getCanonicalTool(id)).find(Boolean) as CanonicalTool
      return {
        ruleId: 'favourite-tool-shortcut',
        priority: 70,
        type: 'shortcut',
        destination: 'tool',
        label: tool.canonicalName,
        reason: 'One of your favourites.',
        action: 'start-tool',
        toolId: tool.id,
        badge: 'FAVOURITE',
      }
    },
    fallback: 'recent-tool-shortcut',
  },
  {
    ruleId: 'recent-tool-shortcut',
    priority: 60,
    recommendationType: 'shortcut',
    eligibility: (context) => context.recentToolIds.some((id) => Boolean(getCanonicalTool(id))),
    resolve: (context) => {
      const tool = context.recentToolIds.map((id) => getCanonicalTool(id)).find(Boolean) as CanonicalTool
      return {
        ruleId: 'recent-tool-shortcut',
        priority: 60,
        type: 'shortcut',
        destination: 'tool',
        label: tool.canonicalName,
        reason: 'Recently used.',
        action: 'start-tool',
        toolId: tool.id,
        badge: 'RECENT',
      }
    },
    fallback: 'current-week-tool-shortcut',
  },
  {
    ruleId: 'current-week-tool-shortcut',
    priority: 50,
    recommendationType: 'toolbox-context',
    eligibility: (context) => !context.programComplete && context.currentWeekTools.length > 0,
    resolve: (context) => ({
      ruleId: 'current-week-tool-shortcut',
      priority: 50,
      type: 'toolbox-context',
      destination: 'tool',
      label: context.currentWeekTools[0].canonicalName,
      reason: `From Week ${context.currentWeek}.`,
      action: 'start-tool',
      toolId: context.currentWeekTools[0].id,
      badge: 'CURRENT WEEK',
    }),
    fallback: 'reset-default',
  },
  {
    ruleId: 'reset-default',
    priority: 10,
    recommendationType: 'shortcut',
    eligibility: () => true,
    resolve: () => ({
      ruleId: 'reset-default',
      priority: 10,
      type: 'shortcut',
      destination: 'reset',
      label: 'Reset now',
      reason: 'General source-backed support is available when you need it.',
      action: 'open-reset',
    }),
    fallback: 'none',
  },
]

export function resolvePersonalization(context: PersonalizationContext) {
  const eligible = personalizationRules
    .filter((rule) => rule.eligibility(context))
    .sort((left, right) => right.priority - left.priority)

  const primary = eligible.find((rule) => rule.recommendationType === 'program-primary' || rule.recommendationType === 'post-program')?.resolve(context)
    ?? personalizationRules.find((rule) => rule.ruleId === 'reset-default')!.resolve(context)

  const shortcut = eligible
    .filter((rule) => rule.recommendationType === 'shortcut' || rule.recommendationType === 'toolbox-context')
    .find((rule) => rule.ruleId !== primary.ruleId)
    ?.resolve(context)

  const currentWeekTools = context.currentWeekTools.slice(0, 3)

  return {
    primary,
    shortcut,
    currentWeekTools,
    activeRuleIds: eligible.map((rule) => rule.ruleId),
  }
}
