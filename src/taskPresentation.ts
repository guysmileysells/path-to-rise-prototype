import type { RoadmapTask } from './dayRoadmap.ts'

export type TaskPresentation = {
  what: string
  when: string
  how: string[]
  benefits: string[]
  sourceGap: boolean
}

type Section = 'when' | 'what' | 'how' | 'why' | 'benefits'

function clean(value: string): string {
  return value.replace(/_{2,}/g, '').replace(/[\t ]+/g, ' ').trim()
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))]
}

export function getTaskPresentation(task: RoadmapTask): TaskPresentation {
  if (task.day === 16 && task.kind === 'DAILY_ACTIVITY' && ['Intellectual', 'Social', 'Environmental'].includes(task.category)) {
    return {
      what: `${task.category} activity — source unavailable`,
      when: 'Timing unavailable in the supplied source.',
      how: [`The supplied Day 16 source does not include instructions for this ${task.category.toLowerCase()} activity.`],
      benefits: [],
      sourceGap: true,
    }
  }
  const sections: Record<Section, string[]> = { when: [], what: [], how: [], why: [], benefits: [] }
  const titles = [task.title, task.shortTitle, ...task.title.split(' + ')].map(clean)
  const scaffold = /^(?:(?:WRITING\s+)?PROMPTS?|QUESTIONS|RULES|PROGRAM|INSTRUCTIONS|CIRCUIT|WALKING INSTRUCTIONS):?$/i
  function isGuidance(value: string) {
    return !/^[a-z-]+[,;]$/i.test(value) && /^(?:the goal\b|do not\b|don't\b|no\b|if\b|stop\b|avoid\b|keep\b|focus\b|move\b|rest\b|breathe\b|exhale\b|inhale\b|hold\b|write\b|repeat\b)/i.test(value)
  }
  function append(section: Section, value: string, explicit = false) {
    if (!value || scaffold.test(value)) return
    // Rationale can contain an important safety/goal note after the WHY label.
    // Do not let the three-benefit display limit hide those or any question/quote.
    const action = isGuidance(value)
    const meaningful = value.includes('?') || /^[“"]/.test(value) || (!explicit && action)
    sections[(section === 'why' || section === 'benefits') && meaningful ? 'how' : section].push(value)
  }
  let current: Section = 'how'
  for (const raw of task.instructions) {
    for (const rawLine of raw.split(/\r?\n/).map(clean).filter(Boolean)) {
      // The source occasionally omits the colon on uppercase HOW. Do not
      // confuse ordinary questions ("How do I…?") with that legacy label.
      const line = rawLine.replace(/^HOW\s+(?!:)/, '')
      if (titles.includes(line) || scaffold.test(line)) continue
      const labels = [...line.matchAll(/(?:^|\s)(WHEN|WHAT|HOW|WHY|BENEFITS?)\s*:/gi)]
      if (!labels.length && /^BENEFITS?$/i.test(line)) {
        current = 'benefits'
        continue
      }
      if (!labels.length) {
        append(current, line)
        continue
      }
      const before = clean(line.slice(0, labels[0].index))
      append(current, before)
      for (const [index, label] of labels.entries()) {
        const section = label[1].toLowerCase().replace(/^benefit$/, 'benefits') as Section
        const value = clean(line.slice(label.index! + label[0].length, labels[index + 1]?.index ?? line.length))
        append(section, value, true)
        current = section === 'when' || section === 'what' ? 'how' : section
      }
    }
  }
  // Structured rationale may contain a non-forcing caveat even when concise
  // benefits already exist. Keep that guidance independently of benefit limits.
  for (const line of clean(task.why ?? '').split(/(?<=[.!?])\s+(?=[A-Z“"])/)) {
    if (isGuidance(line) && !sections.how.includes(line)) sections.how.push(line)
  }
  const what = clean(task.what ?? '')
  const fields = (task.writingFieldLabels ?? []).map(clean)
  for (const prompt of (task.prompts ?? []).map(clean)) {
    if (!prompt || titles.includes(prompt) || fields.includes(prompt)) continue
    if (!sections.how.some(line => line.includes(prompt))) sections.how.push(prompt)
  }
  const rationale = sections.why.length ? sections.why : task.why && !/^The original source instructions/i.test(task.why) ? [clean(task.why)] : []
  return {
    what: unique(sections.what).join(' + ') || (/^(?:Physical|Emotional|Spiritual|Intellectual|Social|Environmental) activity from Day\b/i.test(what) ? clean(task.title) : what) || clean(task.title),
    when: unique(sections.when).join(' → ') || clean(task.timingLabel),
    how: sections.how,
    benefits: unique(sections.benefits.length ? sections.benefits : task.benefits?.length ? task.benefits.map(clean) : rationale.flatMap(line => line.split(/(?<=[.!?])\s+(?=[A-Z“"])/)).filter(line => !line.endsWith(':'))).slice(0, 3),
    sourceGap: false,
  }
}
