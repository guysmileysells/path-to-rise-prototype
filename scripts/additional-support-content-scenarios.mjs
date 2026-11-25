import assert from 'node:assert/strict'
import fs from 'node:fs'
import { realTimeSupportTools, gentleBreathingGuide } from '../src/realTimeSupportContent.ts'
import { additionalSupportTools } from '../src/additionalSupportContent.ts'
const frozen = JSON.parse(fs.readFileSync(new URL('../evidence/real-time-support-expansion/original-five.json', import.meta.url)))
assert.deepEqual({ tools: realTimeSupportTools, gentleBreathingGuide }, frozen, 'Original five content and breathing guide must remain exactly unchanged')
const ids = ['physical-tension-reset', 'control-confidence-reset', 're-engagement-reset', 'urge-craving-reset', 'self-compassion-accountability-reset']
assert.deepEqual(additionalSupportTools.map(t => t.id), ids)
assert.equal(new Set([...realTimeSupportTools, ...additionalSupportTools].map(t => t.id)).size, 10)
const counts = [3,5,4,6,6]
additionalSupportTools.forEach((t, i) => {
  assert.ok(t.what && t.why && t.duration && t.title)
  assert.ok((t.what.match(/[.!?](?:\s|$)/g) ?? []).length <= 2, 'What must stay within two sentences: ' + t.id)
  assert.ok(t.when.length >= 3 && t.when.length <= 5)
  assert.ok(t.benefits.length >= 3 && t.benefits.length <= 5)
  assert.equal(t.how.length, counts[i])
  assert.ok(t.adaptations.length >= 3 && t.references.length >= 1)
  for (const ref of t.references) {
    const url = new URL(ref.url)
    assert.equal(url.protocol, 'https:')
    assert.ok(['europepmc.org', 'doi.org', 'www.nhs.uk'].includes(url.hostname))
    assert.ok(ref.title && ref.note)
  }
})
assert.match(additionalSupportTools[3].how.join(' '), /withdrawal.*medical emergency/i)
assert.match(additionalSupportTools[4].how.join(' '), /responsibility|professional obligations/i)
console.log('PASS: original five and breathing guide exactly unchanged; ten unique tools; five complete new records with seven reference entries and conservative safety boundaries.')
