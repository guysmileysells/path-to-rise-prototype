export const pmrDurationOptions = [2, 5] as const
export const favouriteStorageKey = 'path-to-rise-realtime-favourites-v1'

const reservedFavouriteIds = new Set([...Object.getOwnPropertyNames(Object.prototype), 'prototype'])

export function parseFavouriteTools(value: unknown, allowedIds: readonly string[]): string[] {
  let parsed: unknown = value
  if (typeof value === 'string') {
    try {
      parsed = JSON.parse(value)
    } catch {
      return []
    }
  }
  if (!Array.isArray(parsed)) return []
  const allowed = new Set(allowedIds.filter((id) => typeof id === 'string' && id.length > 0 && !reservedFavouriteIds.has(id)))
  const result: string[] = []
  const seen = new Set<string>()
  for (const id of parsed) {
    if (typeof id === 'string' && allowed.has(id) && !seen.has(id)) {
      result.push(id)
      seen.add(id)
      if (result.length === allowed.size) break
    }
  }
  return result
}

export function toggleFavouriteTool(current: readonly string[], id: string, allowedIds: readonly string[]): string[] {
  const normalized = parseFavouriteTools(current, allowedIds)
  if (parseFavouriteTools([id], allowedIds).length === 0) return normalized
  return normalized.includes(id) ? normalized.filter((toolId) => toolId !== id) : [...normalized, id]
}

export type PmrArea = 'hands' | 'shoulders' | 'legs' | 'feet'
export type PmrPhase = 'prepare' | 'tense' | 'release' | 'jaw' | 'rest' | 'complete'
export type PmrFrame = {
  phase: PmrPhase
  area: PmrArea | null
  phaseRemainingSeconds: number
  remainingSeconds: number
  elapsedMs: number
  complete: boolean
  round: number
}

const pmrAreas: readonly PmrArea[] = ['hands', 'shoulders', 'legs', 'feet']
type PmrSlot = { phase: Exclude<PmrPhase, 'complete'>; area: PmrArea | null; seconds: number; round: number }

/** A pure elapsed-time clock; round is 0 during preparation, then 1-based. */
export function getPmrFrame(elapsedMs: number, minutes: number, skippedAreas: readonly string[] = []): PmrFrame {
  const long = minutes === 5
  const rounds = long ? 3 : 1
  const totalMs = long ? 300_000 : 120_000
  const elapsed = Number.isFinite(elapsedMs) ? Math.min(Math.max(0, elapsedMs), totalMs) : 0
  const slots: PmrSlot[] = [{ phase: 'prepare', area: null, seconds: long ? 20 : 10, round: 0 }]
  for (let round = 1; round <= rounds; round += 1) {
    for (const area of pmrAreas) {
      const skipped = skippedAreas.includes(area)
      slots.push({ phase: skipped ? 'rest' : 'tense', area, seconds: 5, round })
      slots.push({ phase: skipped ? 'rest' : 'release', area, seconds: 10, round })
    }
  }
  slots.push({ phase: 'jaw', area: null, seconds: long ? 20 : 10, round: rounds })
  slots.push({ phase: 'rest', area: null, seconds: long ? 80 : 40, round: rounds })

  let endMs = 0
  for (const slot of slots) {
    endMs += slot.seconds * 1000
    if (elapsed < endMs) {
      return {
        phase: slot.phase, area: slot.area,
        phaseRemainingSeconds: Math.ceil((endMs - elapsed) / 1000),
        remainingSeconds: Math.ceil((totalMs - elapsed) / 1000),
        elapsedMs: elapsed, complete: false, round: slot.round,
      }
    }
  }
  return {
    phase: 'complete', area: null, phaseRemainingSeconds: 0,
    remainingSeconds: 0, elapsedMs: elapsed, complete: true, round: rounds,
  }
}
