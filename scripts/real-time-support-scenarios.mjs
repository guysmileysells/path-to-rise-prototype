import assert from 'node:assert/strict'

let state
try {
  state = await import('../src/realTimeSupportState.ts')
} catch (error) {
  console.error(`FAIL real state module import: ${error.code}`)
  process.exit(1)
}

let passed = 0
function scenario(name, check) {
  try {
    check()
    passed += 1
    console.log(`PASS ${name}`)
  } catch (error) {
    console.error(`FAIL ${name}: ${error.message}`)
    process.exitCode = 1
  }
}

scenario('breathing boundaries for 1, 3, and 5 minutes', () => {
  assert.deepEqual(state.breathingDurationOptions, [1, 3, 5])
  for (const minutes of [1, 3, 5]) {
    const durationMs = minutes * 60_000
    const frame = (elapsedMs, phase, phaseRemainingSeconds, remainingSeconds, cycle) => {
      assert.deepEqual(state.getBreathingFrame(elapsedMs, minutes), {
        phase, phaseRemainingSeconds, remainingSeconds, elapsedMs,
        complete: phase === 'complete', cycle,
      }, `${minutes} minutes at ${elapsedMs}ms`)
    }
    frame(0, 'inhale', 4, minutes * 60, 0)
    frame(1, 'inhale', 4, minutes * 60, 0)
    frame(3_999, 'inhale', 1, minutes * 60 - 3, 0)
    frame(4_000, 'exhale', 6, minutes * 60 - 4, 0)
    frame(9_999, 'exhale', 1, minutes * 60 - 9, 0)
    frame(10_000, 'inhale', 4, minutes * 60 - 10, 1)
    frame(durationMs - 1, 'exhale', 1, 1, durationMs / 10_000 - 1)
    frame(durationMs, 'complete', 0, 0, durationMs / 10_000)
  }
})

scenario('invalid elapsed and duration inputs are normalized', () => {
  for (const minutes of [1, 3, 5]) {
    for (const elapsedMs of [-1, -Infinity, Infinity, NaN]) {
      const actual = state.getBreathingFrame(elapsedMs, minutes)
      assert.ok(Object.is(actual.elapsedMs, 0), 'invalid elapsed must normalize to zero')
      assert.deepEqual(actual, state.getBreathingFrame(0, minutes))
    }
  }
  assert.ok(Object.is(state.getBreathingFrame(-0, 1).elapsedMs, 0))
  for (const minutes of [0, -1, 2, 4, 1.5, NaN, Infinity, -Infinity, '3', null, undefined, true]) {
    assert.deepEqual(state.getBreathingFrame(4_000, minutes), state.getBreathingFrame(4_000, 1),
      'unsupported duration must default to one minute')
  }
})

scenario('delayed callbacks clamp to actual elapsed time, never tick count', () => {
  for (const minutes of [1, 3, 5]) {
    const durationMs = minutes * 60_000
    for (const elapsedMs of [durationMs + 1, durationMs + 123_456, Number.MAX_VALUE]) {
      const actual = state.getBreathingFrame(elapsedMs, minutes)
      assert.equal(actual.elapsedMs, durationMs, 'late callback must clamp elapsed to duration')
      assert.deepEqual(actual, state.getBreathingFrame(durationMs, minutes))
    }
    // Only two callbacks, but elapsed time has advanced through multiple cycles.
    state.getBreathingFrame(0, minutes)
    assert.deepEqual(state.getBreathingFrame(27_250, minutes), {
      phase: 'exhale', phaseRemainingSeconds: 3, remainingSeconds: minutes * 60 - 27,
      elapsedMs: 27_250, complete: false, cycle: 2,
    })
    // Parent owns accumulated elapsed + performance.now(); wall time while paused is excluded.
    const accumulatedElapsedMs = 12_500
    const beforePause = state.getBreathingFrame(accumulatedElapsedMs, minutes)
    assert.deepEqual(state.getBreathingFrame(accumulatedElapsedMs, minutes), beforePause)
    const resumedAt = 100_000
    const now = 102_000
    assert.deepEqual(state.getBreathingFrame(accumulatedElapsedMs + now - resumedAt, minutes), {
      phase: 'exhale', phaseRemainingSeconds: 6, remainingSeconds: minutes * 60 - 14,
      elapsedMs: 14_500, complete: false, cycle: 1,
    })
    // Earlier/restarted projections are unaffected by preceding complete frames.
    assert.deepEqual(state.getBreathingFrame(0, minutes), {
      phase: 'inhale', phaseRemainingSeconds: 4, remainingSeconds: minutes * 60,
      elapsedMs: 0, complete: false, cycle: 0,
    })
  }
})

scenario('optional distress ratings preserve zero and ten without coercion', () => {
  assert.equal(typeof state.sanitizeDistressRating, 'function', 'rating sanitizer must exist')
  for (let rating = 0; rating <= 10; rating += 1) {
    assert.equal(state.sanitizeDistressRating(rating), rating)
    assert.equal(state.sanitizeDistressRating(String(rating)), rating)
  }
  for (const [value, expected] of [[' 0 ', 0], ['\t10\n', 10], ['05', 5]]) {
    assert.equal(state.sanitizeDistressRating(value), expected)
  }
  for (const value of [
    '', ' ', '\t\n', null, undefined, NaN, Infinity, -Infinity, -1, 11, 5.5,
    true, false, [], [0], {}, new Number(5), 0n, Symbol('rating'),
    'NaN', 'Infinity', '-1', '11', '5.5', '5.0', '1e0', '0xA', '+5', '5/10',
    '5 seconds', '5\n0', '１２',
  ]) {
    assert.equal(state.sanitizeDistressRating(value), null, 'invalid or blank rating must be absent')
  }
})

if (!process.exitCode) console.log(`Real-time support: ${passed} scenarios passed.`)
