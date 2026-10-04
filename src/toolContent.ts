import { programContent, type ProgramSectionKind } from './programContent.ts'

export type ToolInteractionType = 'guided-steps' | 'breathing' | 'movement' | 'reflection' | 'routine-checklist' | 'transition'
export type NeedId =
  | 'overwhelmed'
  | 'cant-switch-off'
  | 'stuck-in-head'
  | 'coming-home'
  | 'ground'
  | 'sleep'
  | 'numb'
  | 'control'
  | 'connect'

export type ToolId =
  | 'mirror-breathwork'
  | 'hydration-reset'
  | 'non-dominant-training'
  | 'mirror-work'
  | 'gratitude-reflection'
  | 'immediate-movement'
  | 'evening-reset'
  | 'safe-check-in'
  | 'integration-reflection'
  | 'nature-walk-stretch'

export type SourceRef = {
  day: number
  sectionId: string
}

export type CanonicalTool = {
  id: ToolId
  canonicalName: string
  sourceRefs: SourceRef[]
  purpose: string
  userNeeds: NeedId[]
  category: 'For right now' | 'Transitions' | 'Grounding' | 'Breathing' | 'Thoughts & control' | 'Connection' | 'Rest / wind-down'
  duration?: string
  interactionType: ToolInteractionType
  repeatable: boolean
  toolboxEligible: true
  resetEligible: boolean
  safetyMetadata: string
}

export type ResetNeed = {
  id: NeedId
  label: string
  helper: string
  primaryToolId: ToolId
  alternativeToolIds: ToolId[]
}

export const canonicalTools: CanonicalTool[] = [
  {
    id: 'mirror-breathwork',
    canonicalName: 'Mirror Breathwork',
    sourceRefs: [{ day: 10, sectionId: 'day-section-04-step-2-mirror-breathwork' }],
    purpose: 'A short breathing practice from the program to slow down and regain a little control.',
    userNeeds: ['overwhelmed', 'cant-switch-off', 'ground', 'control'],
    category: 'Breathing',
    duration: '10 controlled breaths',
    interactionType: 'breathing',
    repeatable: true,
    toolboxEligible: true,
    resetEligible: true,
    safetyMetadata: 'Non-diagnostic breathing practice. User can exit any time.',
  },
  {
    id: 'hydration-reset',
    canonicalName: 'Hydration Reset',
    sourceRefs: [{ day: 10, sectionId: 'day-section-05-step-3-hydration-reset' }],
    purpose: 'A simple body-first reset when the next useful step needs to be easy.',
    userNeeds: ['numb', 'overwhelmed', 'ground'],
    category: 'For right now',
    interactionType: 'guided-steps',
    repeatable: true,
    toolboxEligible: true,
    resetEligible: true,
    safetyMetadata: 'Uses source-backed hydration instruction only; no medical claims added.',
  },
  {
    id: 'non-dominant-training',
    canonicalName: 'Non-Dominant Hand Training',
    sourceRefs: [{ day: 10, sectionId: 'day-section-06-step-4-non-dominant-hand-training' }],
    purpose: 'A small intentional-action practice for awareness and control.',
    userNeeds: ['control', 'stuck-in-head', 'ground'],
    category: 'Thoughts & control',
    interactionType: 'routine-checklist',
    repeatable: true,
    toolboxEligible: true,
    resetEligible: true,
    safetyMetadata: 'Low-risk routine practice; does not infer emotional state.',
  },
  {
    id: 'mirror-work',
    canonicalName: 'Mirror Work',
    sourceRefs: [{ day: 15, sectionId: 'day-section-07-step-5-mirror-work-identity-condit' }],
    purpose: 'A familiar program practice for identity, self-trust and intentional language.',
    userNeeds: ['numb', 'control', 'stuck-in-head'],
    category: 'Thoughts & control',
    interactionType: 'guided-steps',
    repeatable: true,
    toolboxEligible: true,
    resetEligible: false,
    safetyMetadata: 'Can feel personal; presented as optional and source-backed, not diagnostic.',
  },
  {
    id: 'gratitude-reflection',
    canonicalName: 'Gratitude & Reflection Journal',
    sourceRefs: [{ day: 10, sectionId: 'day-section-11-step-3-gratitude-reflection-journa' }],
    purpose: 'A short source-backed writing practice when reflection is useful.',
    userNeeds: ['stuck-in-head', 'sleep', 'connect'],
    category: 'Rest / wind-down',
    interactionType: 'reflection',
    repeatable: true,
    toolboxEligible: true,
    resetEligible: true,
    safetyMetadata: 'Optional free text remains local prototype state only if saved; no hidden analysis.',
  },
  {
    id: 'immediate-movement',
    canonicalName: 'Immediate Movement',
    sourceRefs: [{ day: 16, sectionId: 'day-section-03-step-1-immediate-movement' }],
    purpose: 'A quick physical action when the body needs movement before thinking.',
    userNeeds: ['overwhelmed', 'numb', 'coming-home'],
    category: 'Grounding',
    interactionType: 'movement',
    repeatable: true,
    toolboxEligible: true,
    resetEligible: true,
    safetyMetadata: 'Movement practice; user should adapt to physical limits and stop if unsafe.',
  },
  {
    id: 'evening-reset',
    canonicalName: 'Evening Reset Protocol',
    sourceRefs: [{ day: 16, sectionId: 'day-section-09-day-16-evening-reset-protocol' }],
    purpose: 'A structured wind-down practice for closing the day without pressure.',
    userNeeds: ['sleep', 'cant-switch-off', 'coming-home'],
    category: 'Rest / wind-down',
    interactionType: 'transition',
    repeatable: true,
    toolboxEligible: true,
    resetEligible: true,
    safetyMetadata: 'Wind-down support only; does not claim to treat sleep disorders.',
  },
  {
    id: 'safe-check-in',
    canonicalName: 'Check In With Someone Safe',
    sourceRefs: [{ day: 20, sectionId: 'day-section-09-check-in-with-someone-safe' }],
    purpose: 'A connection practice when isolation or pressure is building.',
    userNeeds: ['connect', 'numb', 'stuck-in-head'],
    category: 'Connection',
    interactionType: 'guided-steps',
    repeatable: true,
    toolboxEligible: true,
    resetEligible: true,
    safetyMetadata: 'Connection support, not crisis triage. Support tab remains available.',
  },
  {
    id: 'integration-reflection',
    canonicalName: 'Integration Reflection',
    sourceRefs: [{ day: 28, sectionId: 'day-section-03-reflection-integration' }],
    purpose: 'A post-program reflection practice for noticing what has changed and what to continue.',
    userNeeds: ['stuck-in-head', 'connect', 'control'],
    category: 'Thoughts & control',
    interactionType: 'reflection',
    repeatable: true,
    toolboxEligible: true,
    resetEligible: false,
    safetyMetadata: 'Post-program reflection; not a score or assessment.',
  },
  {
    id: 'nature-walk-stretch',
    canonicalName: 'Walk + Stretch Reset',
    sourceRefs: [{ day: 1, sectionId: 'day-section-04-continue' }],
    purpose: 'A movement-based reset from the early program when time and space allow.',
    userNeeds: ['overwhelmed', 'coming-home', 'cant-switch-off', 'ground'],
    category: 'Transitions',
    duration: '15-minute walk + stretching when source-supported',
    interactionType: 'movement',
    repeatable: true,
    toolboxEligible: true,
    resetEligible: true,
    safetyMetadata: 'Movement practice; user should choose a safe setting and adapt to physical limits.',
  },
]

export const resetNeeds: ResetNeed[] = [
  { id: 'overwhelmed', label: "I'm overwhelmed", helper: 'Start with something body-first and simple.', primaryToolId: 'mirror-breathwork', alternativeToolIds: ['immediate-movement', 'hydration-reset'] },
  { id: 'cant-switch-off', label: "I can't switch off", helper: 'Use a transition or wind-down practice.', primaryToolId: 'evening-reset', alternativeToolIds: ['mirror-breathwork', 'nature-walk-stretch'] },
  { id: 'stuck-in-head', label: "I'm stuck in my head", helper: 'Use a small action or reflection to get unstuck.', primaryToolId: 'gratitude-reflection', alternativeToolIds: ['non-dominant-training', 'integration-reflection'] },
  { id: 'coming-home', label: "I'm coming home from shift", helper: 'Choose a transition tool before you walk into the next part of the day.', primaryToolId: 'nature-walk-stretch', alternativeToolIds: ['evening-reset', 'immediate-movement'] },
  { id: 'ground', label: 'I need to ground', helper: 'Try a repeatable source-backed grounding practice.', primaryToolId: 'hydration-reset', alternativeToolIds: ['mirror-breathwork', 'non-dominant-training'] },
  { id: 'sleep', label: 'I need to sleep', helper: 'Keep it quiet, simple and low-stimulation.', primaryToolId: 'evening-reset', alternativeToolIds: ['gratitude-reflection'] },
  { id: 'numb', label: 'I feel numb', helper: 'Use a low-pressure action that does not require a lot of words.', primaryToolId: 'immediate-movement', alternativeToolIds: ['hydration-reset', 'safe-check-in'] },
  { id: 'control', label: "I'm struggling with control", helper: 'Choose an intentional-action practice.', primaryToolId: 'non-dominant-training', alternativeToolIds: ['mirror-breathwork', 'mirror-work'] },
  { id: 'connect', label: 'I need to connect', helper: 'Start with a simple source-backed connection step.', primaryToolId: 'safe-check-in', alternativeToolIds: ['gratitude-reflection'] },
]

export const toolCategories = [
  'For right now',
  'Transitions',
  'Grounding',
  'Breathing',
  'Thoughts & control',
  'Connection',
  'Rest / wind-down',
] as const

export function getCanonicalTool(id: string | null | undefined) {
  return canonicalTools.find((tool) => tool.id === id)
}

export function getResetNeed(id: string | null | undefined) {
  return resetNeeds.find((need) => need.id === id)
}

export function getToolSourceSection(tool: CanonicalTool) {
  const ref = tool.sourceRefs[0]
  const day = programContent.find((candidate) => candidate.day === ref.day)
  const section = day?.sections.find((candidate) => candidate.id === ref.sectionId)
  return { day, section }
}

export function isToolId(value: string): value is ToolId {
  return canonicalTools.some((tool) => tool.id === value)
}

export function sanitizeToolIds(value: unknown, limit = 6): ToolId[] {
  if (!Array.isArray(value)) return []
  const valid = value.filter((item): item is ToolId => typeof item === 'string' && isToolId(item))
  return [...new Set(valid)].slice(0, limit)
}

export function toolKindForAccessibility(kind: ProgramSectionKind) {
  if (kind === 'do') return 'Practice'
  if (kind === 'reflect') return 'Reflection'
  if (kind === 'complete') return 'Routine'
  return 'Read'
}
