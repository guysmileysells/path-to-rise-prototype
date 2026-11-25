export const breathingDurationOptions = [1, 3, 5] as const

export interface BreathingFrame {
  phase: 'inhale' | 'exhale' | 'complete'
  phaseRemainingSeconds: number
  remainingSeconds: number
  elapsedMs: number
  complete: boolean
  /** Zero-based cycle index; at completion, the number of completed cycles. */
  cycle: number
}

/** Pure elapsed-time projection: no clock, timer, or practice state is retained. */
export function getBreathingFrame(elapsedMs: number, durationMinutes: number): BreathingFrame {
  const minutes = durationMinutes === 3 || durationMinutes === 5 ? durationMinutes : 1
  const durationMs = minutes * 60_000
  elapsedMs = Math.min(durationMs, Number.isFinite(elapsedMs) ? Math.max(0, elapsedMs) : 0)
  const complete = elapsedMs >= durationMs
  const cycleElapsedMs = elapsedMs % 10_000
  const phase = complete ? 'complete' : cycleElapsedMs < 4_000 ? 'inhale' : 'exhale'

  return {
    phase,
    phaseRemainingSeconds: complete ? 0 : Math.ceil(((phase === 'inhale' ? 4_000 : 10_000) - cycleElapsedMs) / 1_000),
    remainingSeconds: Math.ceil((durationMs - elapsedMs) / 1_000),
    elapsedMs,
    complete,
    cycle: Math.floor(elapsedMs / 10_000),
  }
}

/** Optional session-only input; accepts numbers or trimmed base-10 integer strings. */
export function sanitizeDistressRating(value: unknown): number | null {
  if (typeof value === 'string') {
    const text = value.trim()
    if (!/^[0-9]+$/.test(text)) return null
    value = Number(text)
  }
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 10
    ? value
    : null
}
