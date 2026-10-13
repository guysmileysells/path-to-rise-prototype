import { programContent, type ProgramDay } from './programContent.ts'

export type DaySequenceType = 'STRICT_SEQUENCE' | 'RECOMMENDED_SEQUENCE' | 'FLEXIBLE'
export type RoadmapTaskKind = 'MORNING' | 'DAILY_ACTIVITY' | 'EVENING' | 'REFLECTION'
export type EvidenceConfidence = 'SUPPORTED' | 'SUPPORTED_WITH_CAREFUL_WORDING' | 'NEEDS_REVIEW' | 'INSUFFICIENT_EVIDENCE'
export type SmallWinSection = 'morning' | 'daily' | 'evening'
export type DailyActivityCategory = 'Physical' | 'Emotional' | 'Spiritual' | 'Intellectual' | 'Social' | 'Environmental'

export type EvidenceSource = {
  label: string
  citation: string
  url?: string
  reviewStatus: 'verified-record' | 'needs-full-review'
}

export type RoadmapTask = {
  id: string
  day: number
  order: number
  kind: RoadmapTaskKind
  category: DailyActivityCategory | 'Morning Activation' | 'Evening Activation' | 'Reflection'
  winSection?: SmallWinSection
  title: string
  shortTitle: string
  shortDescription: string
  timingLabel: string
  durationLabel: string | null
  required: boolean
  sequenceType: DaySequenceType
  what?: string
  instructions: string[]
  prompts?: string[]
  writingFieldLabels?: string[]
  examples?: string[]
  smallWinInstruction?: string
  specialNote?: string
  why?: string
  benefits?: string[]
  scienceSummary?: string
  evidencePrinciple?: string
  whatYouMayNotice?: string
  sources?: EvidenceSource[]
  evidenceConfidence?: EvidenceConfidence
  claimsToAvoid?: string[]
  reminderEligible: boolean
  sourceReference: string
}

export type WordsAlongTheWayEntry = {
  title: string
  message: string
  whyItMatters: string
  tryThisToday: string
  affectsCompletion: false
}

export type FeelingStuckOption = {
  id: string
  label: string
  understand: string
  tryThis: string
  oneSmallStep: string
  supportNote?: string
}

export type DayRoadmap = {
  day: number
  week: number
  title: string
  theme: string
  purpose: string
  whatToExpect: string[]
  sequenceType: DaySequenceType
  sourceSequenceLanguage: string
  sourceReference: string
  resetAffectsCompletion: false
  wordsAlongTheWay: WordsAlongTheWayEntry
  morningActions: RoadmapTask[]
  tasks: RoadmapTask[]
  eveningActions: RoadmapTask[]
  reflection: RoadmapTask
  dailyReminder: string[]
  expectedWins: { morning: 6; daily: 6; evening: 5; total: 17; weekly: 119; program: 476 }
}

export type DayRoadmapStatus = {
  completedRequiredCount: number
  requiredCount: number
  dayComplete: boolean
  nextTask: RoadmapTask | null
  progressLabel: string
  completedTaskIds: string[]
  sectionCounts: Record<SmallWinSection, { completed: number; total: number }>
}

export type SmallWinsSummary = {
  today: { completed: number; total: 17; morning: number; daily: number; evening: number }
  week: { completed: number; total: 119; week: number }
  program: { completed: number; total: 476 }
}

export type DayTaskProgress = Record<string, string[]>

const activityCategories: DailyActivityCategory[] = ['Physical', 'Emotional', 'Spiritual', 'Intellectual', 'Social', 'Environmental']

export const activationAffirmations = [
  { label: 'AFFIRMATION 1', repeat: 'REPEAT 3 TIMES', countLabel: '3×', text: 'Every day in every way I am getting better and better.' },
  { label: 'AFFIRMATION 2', repeat: 'REPEAT 6 TIMES', countLabel: '6×', text: 'I am who I am and that is always enough.' },
  { label: 'AFFIRMATION 3', repeat: 'REPEAT 9 TIMES', countLabel: '9×', text: 'I love you.' },
] as const

const affirmationInstructions = activationAffirmations.flatMap((affirmation) => [
  `${affirmation.label} — ${affirmation.repeat}`,
  `"${affirmation.text}"`,
])

const morningTemplate = [
  {
    slug: 'set-your-alarm',
    title: 'Set Your Alarm',
    short: 'Set your alarm',
    what: 'Set your alarm 15 minutes earlier than your usual wake-up time.',
    timing: 'Wake-relative: before your usual wake-up time',
    duration: '15 min earlier',
    instructions: [
      'Choose the time you normally need to wake up.',
      'Set your alarm 15 minutes earlier.',
      'Place your phone or alarm somewhere you can reach safely.',
      'Give yourself those extra minutes for your morning routine.',
    ],
    why: 'Creating a little extra time can reduce the feeling of rushing and give you an opportunity to begin the day intentionally.',
    smallWinInstruction: 'Once your alarm is set, tap Mark as Done.',
    specialNote: 'For shift workers, use your actual sleep and wake schedule rather than a fixed morning clock time.',
    benefits: ['More room to begin intentionally', 'A simple first Small Win'],
  },
  {
    slug: 'five-four-three-two-one-get-up',
    title: 'The 5–4–3–2–1 Get-Up',
    short: '5–4–3–2–1 get-up',
    what: 'When your alarm sounds, count backward from five and get out of bed without snoozing.',
    timing: 'Immediately when the alarm sounds',
    duration: '1 min',
    instructions: [
      'Hear your alarm.',
      'Begin counting to yourself in a soft voice: 5 … 4 … 3 … 2 … 1.',
      'Then sit up and place your feet on the floor.',
      'Stand up and begin your day.',
    ],
    why: 'The countdown creates a simple cue to move from intention into action, rather than getting caught in hesitation or negotiation with yourself.',
    smallWinInstruction: "Once you're up, tap Mark as Done.",
    benefits: ['A clear action cue', 'Less room for snooze negotiation'],
  },
  {
    slug: 'mirror-breathwork',
    title: 'Mirror Breathwork',
    short: '10 mirror breaths',
    what: 'Complete 10 slow, controlled breaths while looking into the mirror.',
    timing: 'After getting up',
    duration: '10 breaths',
    instructions: [
      'Stand or sit comfortably in front of a mirror.',
      'Relax your shoulders and soften your posture.',
      'Follow the existing approved PATH TO RISE breathing pattern.',
      'Complete 10 comfortable, controlled breaths: breathe in for 4 seconds, hold for 4, breathe out for 4, hold for 4.',
      'Notice how you feel without judging it.',
    ],
    why: 'Gentle, paced breathing may help reduce physiological arousal and create a moment of awareness before starting the day.',
    smallWinInstruction: 'After 10 breaths, tap Mark as Done.',
    specialNote: 'Use the already approved breathing pattern. Do not invent or substitute a new breathing technique. Breathing should never be forced or uncomfortable.',
    benefits: ['A calm starting cue', 'A moment of awareness before the day begins'],
  },
  {
    slug: 'hydrate-your-body',
    title: 'Hydrate Your Body',
    short: 'Drink two glasses of water',
    what: 'Drink two glasses of water.',
    timing: 'Early in the morning routine',
    duration: '2 glasses',
    instructions: [
      'Prepare two glasses of water.',
      'Drink them at a comfortable pace.',
      'Make hydration part of your regular wake-up routine.',
    ],
    why: 'Hydration supports normal physical and cognitive functioning. Beginning the day with water also helps establish a consistent self-care habit.',
    smallWinInstruction: 'Once completed, tap Mark as Done.',
    benefits: ['A practical body-care action', 'A consistent self-care habit'],
  },
  {
    slug: 'brush-with-your-non-dominant-hand',
    title: 'Brush With Your Non-Dominant Hand',
    short: 'Brush teeth differently',
    what: "Brush your teeth using the hand you don't normally use.",
    timing: 'During morning hygiene',
    duration: null,
    instructions: [
      'Pick up your toothbrush with your non-dominant hand.',
      'Brush gently and thoroughly.',
      'Slow down and pay attention to the movement.',
      'Take your time rather than trying to be perfect.',
    ],
    why: 'Changing a familiar routine requires deliberate attention. It offers a simple opportunity to practise awareness rather than operating entirely on autopilot.',
    smallWinInstruction: "Once you've brushed your teeth, tap Mark as Done.",
    benefits: ['Deliberate attention', 'A simple pattern break'],
  },
  {
    slug: 'morning-mirror-affirmations',
    title: 'Morning Mirror Affirmations',
    short: '3 / 6 / 9 mirror affirmations',
    what: 'Look into the mirror and repeat three affirmations in the exact order and number of repetitions below.',
    timing: 'After brushing your teeth',
    duration: '3× / 6× / 9×',
    instructions: [
      'Stand comfortably in front of a mirror.',
      'Look at yourself with kindness rather than criticism.',
      'Speak clearly, at a comfortable pace.',
      'Complete the following affirmations:',
      ...affirmationInstructions,
    ],
    why: 'Affirmations provide an opportunity to practise intentional, supportive self-talk. They may feel unfamiliar at first. The goal is repetition and reflection, not forcing yourself to believe or feel something immediately.',
    smallWinInstruction: 'Once all three affirmations are completed with their correct repetitions, tap Mark as Done.',
    benefits: ['Intentional supportive self-talk', 'A consistent closing action for Morning Activation'],
  },
] as const

const eveningTemplate = [
  {
    slug: 'brush-with-your-non-dominant-hand',
    title: 'Brush With Your Non-Dominant Hand',
    short: 'Brush teeth differently',
    what: 'Brush your teeth using your non-dominant hand.',
    timing: 'During evening hygiene',
    duration: null,
    instructions: [
      "Pick up your toothbrush with the hand you don't normally use.",
      'Brush gently and thoroughly.',
      'Focus your attention on the movement.',
      "Allow this familiar activity to become a cue that you're beginning your evening routine.",
    ],
    why: 'Repeating this mindful action can help reinforce consistency and create a simple transition into your evening.',
    smallWinInstruction: 'Tap Mark as Done when finished.',
    benefits: ['A simple transition into evening', 'A repeated mindful action'],
  },
  {
    slug: 'evening-mirror-affirmations',
    title: 'Evening Mirror Affirmations',
    short: 'Evening 3 / 6 / 9 affirmations',
    what: 'Repeat the exact same three affirmations from Morning Activation.',
    timing: 'After brushing your teeth',
    duration: '3× / 6× / 9×',
    instructions: [
      'Stand comfortably in front of a mirror.',
      'Take a moment to settle.',
      'Look at yourself without judgment.',
      'Repeat the following in the exact order:',
      ...affirmationInstructions,
    ],
    why: 'Practicing supportive self-talk at the end of the day creates another opportunity to reinforce self-acceptance and reflect on your relationship with yourself.',
    smallWinInstruction: 'Tap Mark as Done after completing all affirmations.',
    benefits: ['Supportive self-talk at the end of the day', 'A consistent evening mirror ritual'],
  },
  {
    slug: 'five-things-grateful-for',
    title: "Five Things I'm Grateful For",
    short: 'Five gratitude entries',
    what: "Write five things you're grateful for today.",
    timing: 'Evening activation',
    duration: '5 entries',
    instructions: [
      'Open the private journal book.',
      'Think about your day.',
      'Write five specific things you appreciate.',
      'Include small, ordinary moments if nothing significant comes to mind.',
    ],
    prompts: ['Gratitude 1', 'Gratitude 2', 'Gratitude 3', 'Gratitude 4', 'Gratitude 5'],
    writingFieldLabels: ['Gratitude 1', 'Gratitude 2', 'Gratitude 3', 'Gratitude 4', 'Gratitude 5'],
    examples: ['A warm shower', 'A kind message', 'A meal', 'A quiet moment', 'Time outdoors'],
    why: 'Gratitude reflection can help direct attention toward positive or meaningful aspects of life without denying that difficult experiences also exist.',
    smallWinInstruction: 'Save your five entries and tap Mark as Done.',
    benefits: ['A private record of specific appreciation', 'Attention toward positive or meaningful moments'],
  },
  {
    slug: 'three-small-wins-from-today',
    title: 'Three Small Wins From Today',
    short: 'Three written wins',
    what: 'Write three things you accomplished today, however small.',
    timing: 'Evening activation',
    duration: '3 entries',
    instructions: [
      'Reflect on what you managed to do.',
      "Identify three actions, choices or efforts you're willing to acknowledge.",
      'Write each one in its own field.',
    ],
    prompts: ['Small Win 1', 'Small Win 2', 'Small Win 3'],
    writingFieldLabels: ['Small Win 1', 'Small Win 2', 'Small Win 3'],
    examples: ['I got out of bed when my alarm sounded.', 'I took a short walk.', 'I reached out to someone.', 'I paused before reacting.'],
    why: 'Recognizing small accomplishments can help counter the tendency to overlook effort and focus only on what remains unfinished.',
    smallWinInstruction: 'Save your three entries and tap Mark as Done.',
    specialNote: 'These written wins are reflections; they must not create three additional tracked Small Wins.',
    benefits: ['A realistic record of effort', 'A counterweight to focusing only on what remains unfinished'],
  },
  {
    slug: 'one-thing-proud-of',
    title: "One Thing I'm Proud Of",
    short: 'One pride entry',
    what: "Write one thing you're proud of yourself for today.",
    timing: 'End of evening activation',
    duration: '1 entry',
    instructions: [
      'Consider how you showed up today.',
      'Choose one action, decision or effort that matters to you.',
      'Write it in your own words.',
    ],
    prompts: ["One thing I'm proud of today"],
    writingFieldLabels: ["One thing I'm proud of today"],
    examples: ['I kept going when I felt tired.', 'I set a boundary.', 'I was patient with someone.', 'I made time for myself.'],
    why: 'Acknowledging personal effort offers an opportunity to practise self-recognition and develop a more balanced view of your day.',
    smallWinInstruction: 'Save your response and tap Mark as Done.',
    benefits: ['Self-recognition', 'A more balanced view of the day'],
  },
] as const

export const feelingStuckOptions: FeelingStuckOption[] = [
  {
    id: 'overwhelmed',
    label: "I'm Overwhelmed",
    understand: 'Too many inputs can make even simple steps feel loud. You do not have to solve the whole day at once.',
    tryThis: 'Use one slow breath cycle or open RESET for a short grounding practice.',
    oneSmallStep: 'Put both feet on the floor and name the next one action only.',
    supportNote: 'If you feel unsafe or at risk of harming yourself or someone else, use Support or emergency/crisis resources now.',
  },
  {
    id: 'no-motivation',
    label: 'I Have No Motivation',
    understand: 'Low motivation is not a character flaw. It often means the first step needs to be smaller.',
    tryThis: 'Choose the smallest visible action: drink water, open the next card, or stand up for one minute.',
    oneSmallStep: 'Start a 60-second timer and do only the first instruction on the current card.',
  },
  {
    id: 'overthinking',
    label: "I'm Overthinking",
    understand: 'Overthinking can make the plan feel bigger than it is. The app is here to hold the order for you.',
    tryThis: 'Read only the WHAT and HOW on the current card. Ignore everything else until that is done.',
    oneSmallStep: 'Tap the next card and complete the first line of the HOW section.',
  },
  {
    id: 'emotionally-drained',
    label: "I'm Emotionally Drained",
    understand: 'Drained means capacity is low. The goal is a gentle next step, not a strong performance.',
    tryThis: 'Try a short breathing or grounding tool from RESET if that feels more available than the program card.',
    oneSmallStep: 'Take 10 comfortable breaths and then decide whether to continue or pause.',
  },
  {
    id: 'cant-get-started',
    label: "I Can't Get Started",
    understand: 'Starting is often the hardest part. You only need movement, not momentum.',
    tryThis: 'Use the 5–4–3–2–1 count, then do the smallest first instruction.',
    oneSmallStep: 'Count backward from five and tap the next incomplete action.',
  },
  {
    id: 'disconnected',
    label: "I'm Feeling Disconnected",
    understand: 'Feeling disconnected can make everything feel distant. Keep the next step simple and human.',
    tryThis: 'Choose one simple contact or one grounding action. No big conversation is required.',
    oneSmallStep: 'Send one low-pressure message or name one person you could safely check in with later.',
  },
]


function optionalStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined
  return value.filter((item): item is string => typeof item === 'string')
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function sourceReference(day: ProgramDay, suffix: string) {
  return `${day.sourceLocation} · ${suffix}`
}

function getContinueSection(day: ProgramDay) {
  return day.sections.find((section) => section.label.toLowerCase() === 'continue') ?? day.sections.find((section) => section.content.some((line) => activityCategories.some((category) => line.trim() === `${category} Task`)))
}

function getReminder(day: ProgramDay): string[] {
  return day.sections.find((section) => /reminder/i.test(section.label))?.content ?? []
}

function getWhatToExpect(day: ProgramDay): string[] {
  const objective = day.sections.find((section) => /objective/i.test(section.label))
  if (!objective) return []
  const start = objective.content.findIndex((line) => /what to expect/i.test(line))
  if (start === -1) return []
  return objective.content.slice(start + 1).filter((line) => line.trim().length > 0).slice(0, 8)
}

function lineAfterPrefix(lines: string[], prefix: string) {
  const found = lines.find((line) => line.toUpperCase().startsWith(prefix))
  return found ? found.slice(prefix.length).trim() : ''
}

function splitInstructionText(value: string): string[] {
  return value
    .replace(/\s+/g, ' ')
    .split(/\.\s+|;\s+/)
    .map((line) => line.trim().replace(/\.$/, ''))
    .filter(Boolean)
}

function extractDuration(title: string, lines: string[]): string | null {
  const haystack = [title, ...lines].join(' ')
  const match = haystack.match(/\b(\d+[- ]?(?:minute|minutes|min)|\d+\s*breaths?|\d+\s*sentences?)\b/i)
  return match ? match[1].replace(/minutes?/i, 'min') : null
}

function parseDailyActivity(day: ProgramDay, category: DailyActivityCategory, order: number, block: string[]): RoadmapTask {
  const title = block[1]?.trim() || `${category} Activity`
  const when = lineAfterPrefix(block, 'WHEN:') || 'Use the timing from the approved daily curriculum.'
  const howLine = lineAfterPrefix(block, 'HOW:')
  const whyLine = lineAfterPrefix(block, 'WHY:')
  const benefitIndex = block.findIndex((line) => /^BENEFITS?:?/i.test(line))
  const promptIndex = block.findIndex((line) => /^Prompts?:?/i.test(line))
  const nextMetaIndex = [benefitIndex, promptIndex].filter((index) => index > -1).sort((a, b) => a - b)[0] ?? block.length
  const howExtras = block.slice(2, nextMetaIndex).filter((line) => !/^WHEN:|^HOW:|^WHY:/i.test(line) && !/^After the walk:$/i.test(line))
  const instructions = [...splitInstructionText(howLine), ...howExtras.filter((line) => !line.includes('_____') && !/^Examples:?/i.test(line))]
  const prompts = block.filter((line) => line.includes('?')).flatMap((line) => line.split(/_+/).map((part) => part.trim()).filter((part) => part.endsWith('?')))
  const benefits = benefitIndex === -1
    ? []
    : block.slice(benefitIndex + 1).filter((line) => !activityCategories.some((candidate) => line.trim() === `${candidate} Task`) && !/^End-of-Day Reflection/i.test(line) && !/^WHEN:|^HOW:|^WHY:|^Prompt/i.test(line)).slice(0, 5)
  const shortTitle = title.replace(/\s+/g, ' ').trim()

  return {
    id: `day-${day.day}-daily-${String(order).padStart(2, '0')}-${slugify(category)}`,
    day: day.day,
    order,
    kind: 'DAILY_ACTIVITY',
    category,
    winSection: 'daily',
    title,
    shortTitle: shortTitle || category,
    shortDescription: `${category} activity from Day ${day.day}'s approved curriculum.`,
    what: `${category} activity from Day ${day.day}'s approved curriculum.`,
    timingLabel: when,
    durationLabel: extractDuration(title, block),
    required: true,
    sequenceType: 'RECOMMENDED_SEQUENCE',
    instructions: instructions.length > 0 ? instructions : ['Follow the approved source instructions for this activity.'],
    prompts: prompts.length > 0 ? prompts : undefined,
    why: whyLine || 'This activity is part of the approved daily curriculum for this area.',
    benefits: benefits.length > 0 ? benefits : undefined,
    reminderEligible: true,
    sourceReference: sourceReference(day, `${category} Task`),
  }
}

function parseDailyActivities(day: ProgramDay): RoadmapTask[] {
  const section = getContinueSection(day)
  const lines = section?.content ?? []
  return activityCategories.map((category, index) => {
    const start = lines.findIndex((line) => line.trim() === `${category} Task`)
    const nextStarts = activityCategories
      .slice(index + 1)
      .map((candidate) => lines.findIndex((line) => line.trim() === `${candidate} Task`))
      .filter((candidateIndex) => candidateIndex > start)
    const reflectionIndex = lines.findIndex((line) => /^End-of-Day Reflection/i.test(line))
    const end = Math.min(...[...nextStarts, reflectionIndex > start ? reflectionIndex : lines.length].filter((candidateIndex) => candidateIndex > start))
    const block = start === -1 ? [] : lines.slice(start, end)
    return parseDailyActivity(day, category, index + 1, block)
  })
}

function parseReflection(day: ProgramDay): RoadmapTask {
  const lines = getContinueSection(day)?.content ?? []
  const start = lines.findIndex((line) => /^End-of-Day Reflection/i.test(line))
  const block = start === -1 ? [] : lines.slice(start)
  const prompts = block.filter((line) => line.includes('?')).flatMap((line) => line.split(/_+/).map((part) => part.trim()).filter((part) => part.endsWith('?')))
  return {
    id: `day-${day.day}-reflection-end-of-day`,
    day: day.day,
    order: 18,
    kind: 'REFLECTION',
    category: 'Reflection',
    title: 'Original End-of-Day Reflection',
    shortTitle: 'Daily Reflection',
    shortDescription: 'Original source reflection stays separate from Morning, Daily Activity and Evening Activation wins.',
    timingLabel: 'End of day',
    durationLabel: null,
    required: false,
    sequenceType: 'FLEXIBLE',
    instructions: block.length > 1 ? block.slice(1).filter((line) => !line.includes('_____')) : ['Use the original daily reflection prompt if available.'],
    prompts: prompts.length > 0 ? prompts : undefined,
    why: 'This reflection remains accessible but does not add Small Wins or block completion.',
    benefits: ['A private review point', 'A gentle close to the source day'],
    reminderEligible: false,
    sourceReference: sourceReference(day, 'Original End-of-Day Reflection'),
  }
}

function buildMorningActions(day: ProgramDay): RoadmapTask[] {
  return morningTemplate.map((item, index) => ({
    id: `day-${day.day}-morning-${String(index + 1).padStart(2, '0')}-${item.slug}`,
    day: day.day,
    order: index + 1,
    kind: 'MORNING',
    category: 'Morning Activation',
    winSection: 'morning',
    title: item.title,
    shortTitle: item.short,
    shortDescription: item.what,
    what: item.what,
    timingLabel: item.timing,
    durationLabel: item.duration,
    required: true,
    sequenceType: 'RECOMMENDED_SEQUENCE',
    instructions: [...item.instructions],
    prompts: optionalStringArray((item as Record<string, unknown>).prompts),
    writingFieldLabels: optionalStringArray((item as Record<string, unknown>).writingFieldLabels),
    examples: optionalStringArray((item as Record<string, unknown>).examples),
    smallWinInstruction: item.smallWinInstruction,
    specialNote: 'specialNote' in item ? item.specialNote : undefined,
    why: item.why,
    benefits: [...item.benefits],
    reminderEligible: true,
    sourceReference: 'Owner-approved Master 28-Day Experience · Morning Activation',
  }))
}

function buildEveningActions(day: ProgramDay): RoadmapTask[] {
  return eveningTemplate.map((item, index) => ({
    id: `day-${day.day}-evening-${String(index + 1).padStart(2, '0')}-${item.slug}`,
    day: day.day,
    order: index + 1,
    kind: 'EVENING',
    category: 'Evening Activation',
    winSection: 'evening',
    title: item.title,
    shortTitle: item.short,
    shortDescription: item.what,
    what: item.what,
    timingLabel: item.timing,
    durationLabel: item.duration,
    required: true,
    sequenceType: 'RECOMMENDED_SEQUENCE',
    instructions: [...item.instructions],
    prompts: optionalStringArray((item as Record<string, unknown>).prompts),
    writingFieldLabels: optionalStringArray((item as Record<string, unknown>).writingFieldLabels),
    examples: optionalStringArray((item as Record<string, unknown>).examples),
    smallWinInstruction: item.smallWinInstruction,
    specialNote: 'specialNote' in item ? item.specialNote : undefined,
    why: item.why,
    benefits: [...item.benefits],
    reminderEligible: true,
    sourceReference: 'Owner-approved Master 28-Day Experience · Evening Activation',
  }))
}

function buildWords(day: ProgramDay): WordsAlongTheWayEntry {
  return {
    title: `Day ${day.day} · ${day.weekTheme}`,
    message: day.purpose,
    whyItMatters: 'This keeps the source-backed day framed as one practical step inside the 28-day journey.',
    tryThisToday: 'Work through Morning Activation, one daily activity at a time, then the Evening Activation. Stop and use Feeling Stuck? if capacity drops.',
    affectsCompletion: false,
  }
}

function buildRoadmap(day: ProgramDay): DayRoadmap {
  return {
    day: day.day,
    week: day.week,
    title: day.title,
    theme: day.weekTheme,
    purpose: day.purpose,
    whatToExpect: getWhatToExpect(day),
    sequenceType: 'RECOMMENDED_SEQUENCE',
    sourceSequenceLanguage: 'Morning Activation → Six Daily Wellness Activities → Evening Activation.',
    sourceReference: day.sourceLocation,
    resetAffectsCompletion: false,
    wordsAlongTheWay: buildWords(day),
    morningActions: buildMorningActions(day),
    tasks: parseDailyActivities(day),
    eveningActions: buildEveningActions(day),
    reflection: parseReflection(day),
    dailyReminder: getReminder(day),
    expectedWins: { morning: 6, daily: 6, evening: 5, total: 17, weekly: 119, program: 476 },
  }
}

export const dayRoadmaps: DayRoadmap[] = programContent.map(buildRoadmap)
export const day1Roadmap = dayRoadmaps[0]

export function getRoadmapForDay(day: number): DayRoadmap | null {
  return dayRoadmaps.find((roadmap) => roadmap.day === day) ?? null
}

export function getAllWinTasks(roadmap: DayRoadmap): RoadmapTask[] {
  return [...roadmap.morningActions, ...roadmap.tasks, ...roadmap.eveningActions]
}

export function getAllRoadmapTasks(roadmap: DayRoadmap): RoadmapTask[] {
  return [...getAllWinTasks(roadmap), roadmap.reflection]
}

export function getRoadmapTaskIds(roadmap: DayRoadmap): Set<string> {
  return new Set(getAllRoadmapTasks(roadmap).map((task) => task.id))
}

export function sanitizeTaskProgress(value: unknown): DayTaskProgress {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const validByDay = new Map(dayRoadmaps.map((roadmap) => [String(roadmap.day), getRoadmapTaskIds(roadmap)]))
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).flatMap(([dayKey, taskIds]) => {
      const validIds = validByDay.get(dayKey)
      if (!validIds || !Array.isArray(taskIds)) return []
      const filtered = [...new Set(taskIds.filter((taskId): taskId is string => typeof taskId === 'string' && validIds.has(taskId)))]
      return filtered.length > 0 ? [[dayKey, filtered]] : []
    }),
  )
}

export function getCompletedRoadmapTaskIds(progress: DayTaskProgress | undefined, day: number): string[] {
  return progress?.[String(day)] ?? []
}

export function getRequiredTasks(roadmap: DayRoadmap): RoadmapTask[] {
  return getAllWinTasks(roadmap).filter((task) => task.required)
}

export function getNextRequiredTask(roadmap: DayRoadmap, completedTaskIds: string[]): RoadmapTask | null {
  const completed = new Set(completedTaskIds)
  return getRequiredTasks(roadmap).find((task) => !completed.has(task.id)) ?? null
}

export function deriveDayRoadmapStatus(roadmap: DayRoadmap, completedTaskIds: string[]): DayRoadmapStatus {
  const validIds = getRoadmapTaskIds(roadmap)
  const cleaned = [...new Set(completedTaskIds.filter((taskId) => validIds.has(taskId)))]
  const completed = new Set(cleaned)
  const requiredTasks = getRequiredTasks(roadmap)
  const completedRequiredCount = requiredTasks.filter((task) => completed.has(task.id)).length
  const requiredCount = requiredTasks.length
  const dayComplete = requiredCount > 0 && completedRequiredCount === requiredCount
  const countFor = (section: SmallWinSection) => {
    const tasks = requiredTasks.filter((task) => task.winSection === section)
    return { completed: tasks.filter((task) => completed.has(task.id)).length, total: tasks.length }
  }
  return {
    completedRequiredCount,
    requiredCount,
    dayComplete,
    nextTask: dayComplete ? null : getNextRequiredTask(roadmap, cleaned),
    progressLabel: `${completedRequiredCount} of ${requiredCount} Small Wins complete`,
    completedTaskIds: cleaned,
    sectionCounts: {
      morning: countFor('morning'),
      daily: countFor('daily'),
      evening: countFor('evening'),
    },
  }
}

export function toggleTaskCompletion(completedTaskIds: string[], taskId: string, roadmap: DayRoadmap): string[] {
  const validIds = getRoadmapTaskIds(roadmap)
  if (!validIds.has(taskId)) return completedTaskIds.filter((id) => validIds.has(id))
  const current = new Set(completedTaskIds.filter((id) => validIds.has(id)))
  if (current.has(taskId)) current.delete(taskId)
  else current.add(taskId)
  return getAllRoadmapTasks(roadmap).filter((task) => current.has(task.id)).map((task) => task.id)
}

export function calculateSmallWins(progress: DayTaskProgress | undefined, currentDay: number): SmallWinsSummary {
  const sanitized = sanitizeTaskProgress(progress)
  const safeDay = Math.min(28, Math.max(1, Math.round(currentDay)))
  const roadmap = getRoadmapForDay(safeDay) ?? day1Roadmap
  const todayStatus = deriveDayRoadmapStatus(roadmap, sanitized[String(safeDay)] ?? [])
  const week = roadmap.week
  const weekDays = dayRoadmaps.filter((candidate) => candidate.week === week)
  const weekCompleted = weekDays.reduce((sum, candidate) => sum + deriveDayRoadmapStatus(candidate, sanitized[String(candidate.day)] ?? []).completedRequiredCount, 0)
  const programCompleted = dayRoadmaps.reduce((sum, candidate) => sum + deriveDayRoadmapStatus(candidate, sanitized[String(candidate.day)] ?? []).completedRequiredCount, 0)
  return {
    today: {
      completed: todayStatus.completedRequiredCount,
      total: 17,
      morning: todayStatus.sectionCounts.morning.completed,
      daily: todayStatus.sectionCounts.daily.completed,
      evening: todayStatus.sectionCounts.evening.completed,
    },
    week: { completed: weekCompleted, total: 119, week },
    program: { completed: programCompleted, total: 476 },
  }
}
