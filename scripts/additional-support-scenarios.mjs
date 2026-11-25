import assert from 'node:assert/strict'

import * as state from '../src/additionalSupportState.ts'

assert.equal(typeof state.getPmrFrame, 'function', 'PMR frame helper must exist')
assert.deepEqual(state.pmrDurationOptions, [2, 5])
assert.deepEqual(state.getPmrFrame(0, 2), {
  phase: 'prepare', area: null, phaseRemainingSeconds: 10,
  remainingSeconds: 120, elapsedMs: 0, complete: false, round: 0,
})
console.log('PASS PMR initial frame and duration options')

const areas = ['hands', 'shoulders', 'legs', 'feet']
function expectedTimeline(minutes, skipped = []) {
  const rounds = minutes === 5 ? 3 : 1
  const slots = [{ phase: 'prepare', area: null, seconds: minutes === 5 ? 20 : 10, round: 0 }]
  for (let round = 1; round <= rounds; round += 1) {
    for (const area of areas) {
      slots.push({ phase: skipped.includes(area) ? 'rest' : 'tense', area, seconds: 5, round })
      slots.push({ phase: skipped.includes(area) ? 'rest' : 'release', area, seconds: 10, round })
    }
  }
  slots.push({ phase: 'jaw', area: null, seconds: minutes === 5 ? 20 : 10, round: rounds })
  slots.push({ phase: 'rest', area: null, seconds: minutes === 5 ? 80 : 40, round: rounds })
  return slots
}

function assertTimeline(minutes, skipped = []) {
  const totalMs = minutes * 60_000
  let startMs = 0
  for (const slot of expectedTimeline(minutes, skipped)) {
    const endMs = startMs + slot.seconds * 1000
    // Exact boundaries, sub-second real elapsed time, and just before each transition.
    for (const elapsedMs of [startMs, startMs + 0.5, startMs + 123.25, endMs - 1]) {
      assert.deepEqual(state.getPmrFrame(elapsedMs, minutes, skipped), {
        phase: slot.phase, area: slot.area,
        phaseRemainingSeconds: Math.ceil((endMs - elapsedMs) / 1000),
        remainingSeconds: Math.ceil((totalMs - elapsedMs) / 1000),
        elapsedMs, complete: false, round: slot.round,
      }, `${minutes} minute ${slot.phase}/${slot.area} at ${elapsedMs}ms`)
    }
    startMs = endMs
  }
  assert.equal(startMs, totalMs, 'schedule must preserve exact selected total')
  for (const elapsedMs of [totalMs, totalMs + 1, totalMs + 60_000]) {
    assert.deepEqual(state.getPmrFrame(elapsedMs, minutes, skipped), {
      phase: 'complete', area: null, phaseRemainingSeconds: 0,
      remainingSeconds: 0, elapsedMs: totalMs, complete: true,
      round: minutes === 5 ? 3 : 1,
    })
  }
}
assertTimeline(2)
assertTimeline(5)
console.log('PASS PMR every phase boundary, fractional elapsed time, both exact totals and final clamping')

for (const minutes of [2, 5]) {
  for (const skipped of [['hands'], ['shoulders', 'feet'], areas]) assertTimeline(minutes, Object.freeze([...skipped]))
  assertTimeline(minutes, ['unknown', 'constructor', '__proto__'])
  for (let elapsedMs = 0; elapsedMs <= minutes * 60_000; elapsedMs += 250) {
    const frame = state.getPmrFrame(elapsedMs, minutes, areas)
    assert.notEqual(frame.phase, 'tense', 'all-skipped sequence must never request tension')
    assert.notEqual(frame.phase, 'release', 'all-skipped sequence must never request active release')
  }
}
console.log('PASS PMR skipped slots preserve area, rounds and totals; all-skipped never tenses; unknown skips ignored')

for (const minutes of [2, 5]) {
  for (const invalid of [-1, -100_000, NaN, Infinity, -Infinity, undefined, null, '1000']) {
    assert.deepEqual(state.getPmrFrame(invalid, minutes), state.getPmrFrame(0, minutes), `invalid elapsed ${String(invalid)}`)
  }
}
for (const invalid of [0, -2, 3, 2.5, 5.1, NaN, Infinity, -Infinity, undefined, null, '5', {}, true]) {
  for (const elapsedMs of [0, 10_000, 30_123.5, 119_999, 120_000, 300_000]) {
    assert.deepEqual(state.getPmrFrame(elapsedMs, invalid), state.getPmrFrame(elapsedMs, 2), `invalid duration ${String(invalid)}`)
  }
}
console.log('PASS PMR invalid elapsed resets to zero; unsupported durations default to two minutes')

const allowed = Object.freeze(['physical-tension-reset', 'control-confidence-reset', 're-engagement-reset'])
assert.equal(typeof state.parseFavouriteTools, 'function', 'favourites parser must exist')
assert.equal(state.favouriteStorageKey, 'path-to-rise-realtime-favourites-v1')
for (const value of [[allowed[1], allowed[0]], JSON.stringify([allowed[1], allowed[0]])]) {
  assert.deepEqual(state.parseFavouriteTools(value, allowed), [allowed[1], allowed[0]])
}
console.log('PASS favourites dedicated key and array/JSON parsing')

const mixed = Object.freeze([allowed[1], 'unknown', allowed[1], null, {}, 3, true, allowed[0], '__proto__', 'constructor', 'prototype', 'toString'])
assert.deepEqual(state.parseFavouriteTools(mixed, allowed), [allowed[1], allowed[0]])
assert.deepEqual(state.parseFavouriteTools(JSON.stringify(mixed), allowed), [allowed[1], allowed[0]])
assert.deepEqual(state.parseFavouriteTools(mixed, []), [])
const prototypeNames = [...Object.getOwnPropertyNames(Object.prototype), 'prototype']
assert.deepEqual(state.parseFavouriteTools(prototypeNames, prototypeNames), [], 'prototype names must never become IDs')
assert.deepEqual(state.parseFavouriteTools(['', ...allowed, ...allowed], ['', ...allowed, allowed[0]]), [...allowed])
const oversized = Array.from({ length: 5000 }, (_, index) => allowed[index % allowed.length])
assert.deepEqual(state.parseFavouriteTools(oversized, allowed), [...allowed])
assert.ok(state.parseFavouriteTools(oversized, allowed).length <= allowed.length)
assert.deepEqual(mixed, [allowed[1], 'unknown', allowed[1], null, {}, 3, true, allowed[0], '__proto__', 'constructor', 'prototype', 'toString'])
console.log('PASS favourites whitelist, stable dedupe, bounded output, immutable inputs and prototype-name rejection')

for (const malformed of ['', 'not json', '[', '{broken}', '["physical-tension-reset",]', '{"__proto__":{"polluted":true}}', 'null', 'true', '123', '"physical-tension-reset"', undefined, null, true, 123, {}, { 0: allowed[0], length: 1 }, Object.create(null)]) {
  assert.deepEqual(state.parseFavouriteTools(malformed, allowed), [], 'malformed/non-array favourites must safely return empty')
}
const returned = state.parseFavouriteTools(Object.freeze([allowed[0]]), allowed)
returned.push(allowed[1])
assert.deepEqual(state.parseFavouriteTools([allowed[0]], allowed), [allowed[0]], 'parser results must be independent')
console.log('PASS favourites missing, corrupt JSON and non-array input safely empty; results independent')

assert.equal(typeof state.toggleFavouriteTool, 'function', 'favourites toggle must exist')
const current = Object.freeze([allowed[0], allowed[0], 'unknown', '__proto__', allowed[1]])
assert.deepEqual(state.toggleFavouriteTool(current, allowed[0], allowed), [allowed[1]])
assert.deepEqual(state.toggleFavouriteTool(current, allowed[2], allowed), [...allowed])
assert.deepEqual(current, [allowed[0], allowed[0], 'unknown', '__proto__', allowed[1]])
for (const id of ['unknown', '', '__proto__', 'constructor', 'prototype', 'toString', null, 123]) {
  const result = state.toggleFavouriteTool(current, id, allowed)
  assert.deepEqual(result, [allowed[0], allowed[1]], 'invalid toggle only normalizes existing preferences')
  assert.notStrictEqual(result, current)
}
assert.deepEqual(state.toggleFavouriteTool(current, allowed[0], []), [])
assert.deepEqual(state.toggleFavouriteTool([], '__proto__', ['__proto__']), [])
assert.deepEqual(state.toggleFavouriteTool([], allowed[0], allowed), [allowed[0]])
const full = Object.freeze([...allowed])
assert.deepEqual(state.toggleFavouriteTool(full, allowed[1], allowed), [allowed[0], allowed[2]])
assert.deepEqual(state.toggleFavouriteTool(state.toggleFavouriteTool(full, allowed[1], allowed), allowed[1], allowed), [allowed[0], allowed[2], allowed[1]])
console.log('PASS favourites valid-only immutable toggle normalizes input, adds/removes, preserves bounded unique results')
console.log('PASS all additional-support scenarios')
