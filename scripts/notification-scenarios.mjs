import assert from 'node:assert/strict'
import {
  buildNotificationPayload,
  clockTimeToMinutes,
  defaultNotificationPreferences,
  getActiveReminders,
  getBrowserPermissionState,
  getNextReminderOccurrence,
  isSafeNotificationCopy,
  isWithinQuietHours,
  notificationCopyRegistry,
  parseNotificationPreferences,
  reconcilePreferencesForProgramState,
  resolveNotificationOpen,
  resolveNotificationPlatformCapability,
  validateNotificationPrivacyBoundary,
} from '../src/notificationContent.ts'

const results = []
function scenario(name, fn) {
  fn()
  results.push({ name, result: 'PASS' })
}

const withProgramReminder = {
  ...defaultNotificationPreferences,
  programReminder: { enabled: true, schedule: { time: '19:00', frequency: 'daily' } },
}
const withPracticeReminder = {
  ...defaultNotificationPreferences,
  practiceReminder: { enabled: true, targetToolId: 'nature-walk-stretch', schedule: { time: '20:00', frequency: 'daily' } },
}

scenario('FLOW A unsupported notifications keep architecture honest', () => {
  const capability = resolveNotificationPlatformCapability({ notificationApi: false, secureContext: true, serviceWorker: false, pushManager: false })
  assert.equal(capability.currentSupport, 'NOT_CURRENTLY_AVAILABLE')
  assert.match(capability.summary, /cannot deliver|does not expose/i)
})

scenario('FLOW B not determined permission is separate from app preference', () => {
  assert.equal(getBrowserPermissionState('default', true), 'not_determined')
  const reminders = getActiveReminders(withProgramReminder, false)
  assert.equal(reminders.length, 1)
})

scenario('FLOW C authorized permission state represented explicitly', () => {
  assert.equal(getBrowserPermissionState('granted', true), 'authorized')
})

scenario('FLOW D denied permission does not erase app preference', () => {
  assert.equal(getBrowserPermissionState('denied', true), 'denied')
  assert.equal(getActiveReminders(withProgramReminder, false).length, 1)
})

scenario('FLOW E reminder edit changes stable reminder schedule without duplicate id', () => {
  const before = getActiveReminders(withProgramReminder, false)[0]
  const afterPrefs = { ...withProgramReminder, programReminder: { enabled: true, schedule: { time: '20:00', frequency: 'daily' } } }
  const after = getActiveReminders(afterPrefs, false)[0]
  assert.equal(before.id, after.id)
  assert.notEqual(before.schedule.time, after.schedule.time)
})

scenario('FLOW F turning reminder off removes active reminder', () => {
  const off = { ...withProgramReminder, programReminder: { ...withProgramReminder.programReminder, enabled: false } }
  assert.equal(getActiveReminders(off, false).some((reminder) => reminder.type === 'program'), false)
})

scenario('FLOW G program notification resolves to current valid Day path', () => {
  const reminder = getActiveReminders(withProgramReminder, false)[0]
  assert.equal(resolveNotificationOpen(reminder, { programComplete: false, targetExists: false }).destination, 'path')
})

scenario('FLOW H stale Day/program notification resolves safely after Day 28', () => {
  const reminder = getActiveReminders(withProgramReminder, false)[0]
  const resolved = resolveNotificationOpen(reminder, { programComplete: true, targetExists: false })
  assert.equal(resolved.destination, 'path')
  assert.match(resolved.note, /stale|current valid|Day 28/i)
})

scenario('FLOW I user-created tool reminder opens canonical tool', () => {
  const reminder = getActiveReminders(withPracticeReminder, false)[0]
  const resolved = resolveNotificationOpen(reminder, { programComplete: false, targetExists: true })
  assert.equal(resolved.destination, 'reset')
  assert.equal(resolved.targetToolId, 'nature-walk-stretch')
})

scenario('FLOW J invalid tool target falls back safely', () => {
  const reminder = { id: 'practice-invalid', type: 'practice', targetToolId: 'missing-tool', schedule: { time: '20:00', frequency: 'daily' }, createdByUser: true }
  assert.equal(resolveNotificationOpen(reminder, { programComplete: false, targetExists: false }).destination, 'toolbox')
})

scenario('FLOW J2 malformed active practice reminder is not scheduled', () => {
  const malformed = {
    ...defaultNotificationPreferences,
    practiceReminder: { enabled: true, targetToolId: 'missing-tool', schedule: { time: '20:00', frequency: 'daily' } },
  }
  assert.equal(getActiveReminders(malformed, false).some((reminder) => reminder.type === 'practice'), false)
})

scenario('FLOW K quiet hours crossing midnight work', () => {
  const quietHours = { enabled: true, start: '21:00', end: '07:00', policy: 'delay_until_quiet_hours_end' }
  assert.equal(isWithinQuietHours('22:00', quietHours), true)
  assert.equal(isWithinQuietHours('06:30', quietHours), true)
  assert.equal(isWithinQuietHours('12:00', quietHours), false)
})

scenario('FLOW L Day 28 reconciliation turns off active program reminder', () => {
  const reconciled = reconcilePreferencesForProgramState(withProgramReminder, true)
  assert.equal(reconciled.programReminder.enabled, false)
})

scenario('FLOW M return copy remains non-shaming', () => {
  const copy = notificationCopyRegistry.return.discreetBody
  assert.equal(isSafeNotificationCopy(copy), true)
  assert.doesNotMatch(copy, /missed|behind|streak|don't quit/i)
})

scenario('FLOW N malformed preference state recovers safely', () => {
  const parsed = parseNotificationPreferences(JSON.stringify({ programReminder: { enabled: true, schedule: { time: '99:99' } }, practiceReminder: { enabled: true, targetToolId: 'bad' }, quietHours: { start: '25:00', end: 'bad' } }))
  assert.equal(parsed.programReminder.schedule.time, defaultNotificationPreferences.programReminder.schedule.time)
  assert.equal(parsed.practiceReminder.enabled, false)
  assert.equal(parsed.quietHours.start, defaultNotificationPreferences.quietHours.start)
})

scenario('FLOW O permission revoked is represented separately from reminder preference', () => {
  assert.equal(getBrowserPermissionState('denied', true), 'denied')
  assert.equal(getActiveReminders(withProgramReminder, false).length, 1)
})

scenario('privacy automation blocks sensitive copy', () => {
  const privacy = validateNotificationPrivacyBoundary()
  assert.equal(privacy.pass, true, privacy.failures.join('\n'))
  const payload = buildNotificationPayload(getActiveReminders(withPracticeReminder, false)[0], false)
  assert.equal(isSafeNotificationCopy(`${payload.title} ${payload.body} ${payload.tag}`), true)
})

scenario('timezone/DST calculation uses local Date and not UTC string arithmetic', () => {
  const now = new Date('2026-03-08T01:30:00')
  const next = getNextReminderOccurrence(now, '02:30', { enabled: false, start: '21:00', end: '07:00', policy: 'delay_until_quiet_hours_end' }, 'daily')
  assert.equal(next.nextAt instanceof Date, true)
  assert.equal(clockTimeToMinutes(next.deliveredTime), 150)
})

scenario('quiet-hour delivery delays to configured end', () => {
  const next = getNextReminderOccurrence(new Date('2026-10-03T20:00:00'), '22:00', { enabled: true, start: '21:00', end: '07:00', policy: 'delay_until_quiet_hours_end' }, 'daily')
  assert.equal(next.delayedByQuietHours, true)
  assert.equal(next.deliveredTime, '07:00')
})

console.log(JSON.stringify({ scenarioCount: results.length, privacyBoundary: validateNotificationPrivacyBoundary(), results }, null, 2))
