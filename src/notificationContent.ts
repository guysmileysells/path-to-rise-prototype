import { canonicalTools, type ToolId } from './toolContent.ts'

export const notificationStorageKey = 'path-to-rise-notification-preferences-v1'
export const notificationSchemaVersion = 1

export type NotificationPermissionState = 'unsupported' | 'not_determined' | 'authorized' | 'denied'
export type NotificationPrivacyMode = 'discreet'
export type QuietHourPolicy = 'delay_until_quiet_hours_end'
export type ReminderType = 'program' | 'practice' | 'return' | 'post_program'
export type ReminderFrequency = 'daily' | 'weekly'
export type NotificationDestination = 'today' | 'path' | 'reset' | 'toolbox' | 'support'

export type QuietHours = {
  enabled: boolean
  start: string
  end: string
  policy: QuietHourPolicy
}

export type ReminderSchedule = {
  time: string
  frequency: ReminderFrequency
}

export type ReminderSetting = {
  enabled: boolean
  schedule: ReminderSchedule
}

export type PracticeReminderSetting = ReminderSetting & {
  targetToolId: ToolId | null
}

export type ReturnReminderSetting = ReminderSetting & {
  afterDays: number
  maxAttempts: number
}

export type NotificationPreferences = {
  schemaVersion: 1
  permissionExplained: boolean
  privacyMode: NotificationPrivacyMode
  quietHours: QuietHours
  programReminder: ReminderSetting
  practiceReminder: PracticeReminderSetting
  returnReminder: ReturnReminderSetting
  postProgramReminder: ReminderSetting
}

export type NotificationPlatformCapability = {
  runtime: 'browser-prototype'
  notificationApi: boolean
  secureContext: boolean
  serviceWorker: boolean
  pushManager: boolean
  currentSupport: 'IMPLEMENTABLE_NOW' | 'ARCHITECTURE_READY' | 'REQUIRES_SERVICE_WORKER' | 'REQUIRES_PUSH_BACKEND' | 'REQUIRES_NATIVE_WRAPPER' | 'NOT_CURRENTLY_AVAILABLE'
  summary: string
}

export type ActiveReminder = {
  id: string
  type: ReminderType
  targetToolId?: ToolId
  schedule: ReminderSchedule
  createdByUser: true
}

export type NotificationPayload = {
  tag: string
  title: string
  body: string
  destination: NotificationDestination
  targetToolId?: ToolId
}

export type ResolvedNotificationOpen = {
  destination: NotificationDestination
  targetToolId?: ToolId
  note: string
}

export const defaultNotificationPreferences: NotificationPreferences = {
  schemaVersion: notificationSchemaVersion,
  permissionExplained: false,
  privacyMode: 'discreet',
  quietHours: {
    enabled: true,
    start: '21:00',
    end: '07:00',
    policy: 'delay_until_quiet_hours_end',
  },
  programReminder: {
    enabled: false,
    schedule: { time: '19:00', frequency: 'daily' },
  },
  practiceReminder: {
    enabled: false,
    targetToolId: null,
    schedule: { time: '19:00', frequency: 'daily' },
  },
  returnReminder: {
    enabled: false,
    afterDays: 7,
    maxAttempts: 1,
    schedule: { time: '19:00', frequency: 'weekly' },
  },
  postProgramReminder: {
    enabled: false,
    schedule: { time: '19:00', frequency: 'weekly' },
  },
}

export const notificationCopyRegistry: Record<ReminderType, { title: string; discreetBody: string; detailedBody: string; destination: NotificationDestination; expiryRule: string }> = {
  program: {
    title: 'PATH to RISE',
    discreetBody: 'Your next practice is ready when you are.',
    detailedBody: 'Continue your PATH to RISE practice when it works for you.',
    destination: 'path',
    expiryRule: 'Resolve to the current valid Day at open time; stop after Day 28 is complete.',
  },
  practice: {
    title: 'PATH to RISE',
    discreetBody: 'A few minutes for yourself, when you are ready.',
    detailedBody: 'Your saved practice is available when it works for you.',
    destination: 'reset',
    expiryRule: 'Open the canonical tool when valid; otherwise fall back to Toolbox.',
  },
  return: {
    title: 'PATH to RISE',
    discreetBody: 'Continue when you are ready.',
    detailedBody: 'PATH to RISE is here when you want to continue.',
    destination: 'today',
    expiryRule: 'Finite return reminder; no escalation or repeated chasing.',
  },
  post_program: {
    title: 'PATH to RISE',
    discreetBody: 'Your saved practices are here when you want them.',
    detailedBody: 'You can revisit useful PATH to RISE practices when you choose.',
    destination: 'toolbox',
    expiryRule: 'Only after Day 28 and only if explicitly enabled.',
  },
}

const bannedNotificationTerms = [
  'ptsd',
  'trauma reflection',
  'anxiety practice',
  'overwhelmed',
  'you seem',
  'we noticed',
  'falling behind',
  'missed your',
  'streak',
  'diagnosis',
  'suicide',
  'crisis',
  'journal',
  'reflection answer',
]

export function isSafeNotificationCopy(text: string) {
  const normalized = text.toLowerCase()
  return !bannedNotificationTerms.some((term) => normalized.includes(term))
}

function isClockTime(value: unknown): value is string {
  return typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
}

export function clockTimeToMinutes(value: string) {
  if (!isClockTime(value)) return 0
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

export function isWithinQuietHours(time: string, quietHours: QuietHours) {
  if (!quietHours.enabled) return false
  const candidate = clockTimeToMinutes(time)
  const start = clockTimeToMinutes(quietHours.start)
  const end = clockTimeToMinutes(quietHours.end)
  if (start === end) return false
  if (start < end) return candidate >= start && candidate < end
  return candidate >= start || candidate < end
}

export function resolveQuietHourDeliveryTime(time: string, quietHours: QuietHours) {
  if (!isWithinQuietHours(time, quietHours)) return time
  return quietHours.end
}

function sanitizeReminderSchedule(value: unknown, fallback: ReminderSchedule): ReminderSchedule {
  if (!value || typeof value !== 'object') return fallback
  const partial = value as Partial<ReminderSchedule>
  return {
    time: isClockTime(partial.time) ? partial.time : fallback.time,
    frequency: partial.frequency === 'weekly' ? 'weekly' : fallback.frequency,
  }
}

function sanitizeReminderSetting(value: unknown, fallback: ReminderSetting): ReminderSetting {
  if (!value || typeof value !== 'object') return fallback
  const partial = value as Partial<ReminderSetting>
  return {
    enabled: partial.enabled === true,
    schedule: sanitizeReminderSchedule(partial.schedule, fallback.schedule),
  }
}

function sanitizePracticeReminder(value: unknown, fallback: PracticeReminderSetting): PracticeReminderSetting {
  if (!value || typeof value !== 'object') return fallback
  const partial = value as Partial<PracticeReminderSetting>
  const sanitizedBase = sanitizeReminderSetting(value, fallback)
  const validTool = typeof partial.targetToolId === 'string' && canonicalTools.some((tool) => tool.id === partial.targetToolId)
  return {
    ...sanitizedBase,
    targetToolId: validTool ? partial.targetToolId as ToolId : null,
    enabled: sanitizedBase.enabled && validTool,
  }
}

function sanitizeReturnReminder(value: unknown, fallback: ReturnReminderSetting): ReturnReminderSetting {
  if (!value || typeof value !== 'object') return fallback
  const partial = value as Partial<ReturnReminderSetting>
  const sanitizedBase = sanitizeReminderSetting(value, fallback)
  return {
    ...sanitizedBase,
    afterDays: Number.isInteger(partial.afterDays) && partial.afterDays! >= 3 && partial.afterDays! <= 30 ? partial.afterDays! : fallback.afterDays,
    maxAttempts: Number.isInteger(partial.maxAttempts) && partial.maxAttempts! >= 1 && partial.maxAttempts! <= 2 ? partial.maxAttempts! : fallback.maxAttempts,
  }
}

function sanitizeQuietHours(value: unknown): QuietHours {
  if (!value || typeof value !== 'object') return defaultNotificationPreferences.quietHours
  const partial = value as Partial<QuietHours>
  return {
    enabled: partial.enabled !== false,
    start: isClockTime(partial.start) ? partial.start : defaultNotificationPreferences.quietHours.start,
    end: isClockTime(partial.end) ? partial.end : defaultNotificationPreferences.quietHours.end,
    policy: 'delay_until_quiet_hours_end',
  }
}

export function parseNotificationPreferences(stored: string | null): NotificationPreferences {
  if (!stored) return defaultNotificationPreferences
  try {
    const parsed = JSON.parse(stored) as Partial<NotificationPreferences>
    return sanitizeNotificationPreferences(parsed)
  } catch {
    return defaultNotificationPreferences
  }
}

export function sanitizeNotificationPreferences(value: unknown): NotificationPreferences {
  if (!value || typeof value !== 'object') return defaultNotificationPreferences
  const partial = value as Partial<NotificationPreferences>
  return {
    schemaVersion: notificationSchemaVersion,
    permissionExplained: partial.permissionExplained === true,
    privacyMode: 'discreet',
    quietHours: sanitizeQuietHours(partial.quietHours),
    programReminder: sanitizeReminderSetting(partial.programReminder, defaultNotificationPreferences.programReminder),
    practiceReminder: sanitizePracticeReminder(partial.practiceReminder, defaultNotificationPreferences.practiceReminder),
    returnReminder: sanitizeReturnReminder(partial.returnReminder, defaultNotificationPreferences.returnReminder),
    postProgramReminder: sanitizeReminderSetting(partial.postProgramReminder, defaultNotificationPreferences.postProgramReminder),
  }
}

export function resolveNotificationPlatformCapability(capability: Partial<Pick<NotificationPlatformCapability, 'notificationApi' | 'secureContext' | 'serviceWorker' | 'pushManager'>>): NotificationPlatformCapability {
  const notificationApi = capability.notificationApi === true
  const secureContext = capability.secureContext === true
  const serviceWorker = capability.serviceWorker === true
  const pushManager = capability.pushManager === true
  if (!notificationApi) {
    return {
      runtime: 'browser-prototype',
      notificationApi,
      secureContext,
      serviceWorker,
      pushManager,
      currentSupport: 'NOT_CURRENTLY_AVAILABLE',
      summary: 'This browser/runtime does not expose the Notification API. Settings can be saved, but OS notifications cannot be delivered here.',
    }
  }
  if (!secureContext) {
    return {
      runtime: 'browser-prototype',
      notificationApi,
      secureContext,
      serviceWorker,
      pushManager,
      currentSupport: 'NOT_CURRENTLY_AVAILABLE',
      summary: 'Browser notifications require a secure context. Production needs HTTPS or native delivery.',
    }
  }
  if (serviceWorker && pushManager) {
    return {
      runtime: 'browser-prototype',
      notificationApi,
      secureContext,
      serviceWorker,
      pushManager,
      currentSupport: 'ARCHITECTURE_READY',
      summary: 'The browser exposes notification primitives, but this app has no registered service worker or push backend in the current prototype.',
    }
  }
  return {
    runtime: 'browser-prototype',
    notificationApi,
    secureContext,
    serviceWorker,
    pushManager,
    currentSupport: 'IMPLEMENTABLE_NOW',
    summary: 'Foreground/browser-tab reminder scheduling can be demonstrated here. Reliable lock-screen or closed-app delivery requires PWA service worker, push backend, or native wrapper.',
  }
}

export function getBrowserPermissionState(permission: NotificationPermission | undefined, supported: boolean): NotificationPermissionState {
  if (!supported) return 'unsupported'
  if (permission === 'granted') return 'authorized'
  if (permission === 'denied') return 'denied'
  return 'not_determined'
}

export function getActiveReminders(preferences: NotificationPreferences, programComplete: boolean): ActiveReminder[] {
  const reminders: ActiveReminder[] = []
  const practiceTargetIsCanonical = preferences.practiceReminder.targetToolId
    ? canonicalTools.some((tool) => tool.id === preferences.practiceReminder.targetToolId)
    : false

  if (preferences.programReminder.enabled && !programComplete) {
    reminders.push({ id: 'program-reminder', type: 'program', schedule: preferences.programReminder.schedule, createdByUser: true })
  }
  if (preferences.practiceReminder.enabled && preferences.practiceReminder.targetToolId && practiceTargetIsCanonical) {
    reminders.push({ id: `practice-${preferences.practiceReminder.targetToolId}`, type: 'practice', targetToolId: preferences.practiceReminder.targetToolId, schedule: preferences.practiceReminder.schedule, createdByUser: true })
  }
  if (preferences.returnReminder.enabled && !programComplete) {
    reminders.push({ id: 'return-reminder', type: 'return', schedule: preferences.returnReminder.schedule, createdByUser: true })
  }
  if (preferences.postProgramReminder.enabled && programComplete) {
    reminders.push({ id: 'post-program-reminder', type: 'post_program', schedule: preferences.postProgramReminder.schedule, createdByUser: true })
  }
  return reminders
}

export function reconcilePreferencesForProgramState(preferences: NotificationPreferences, programComplete: boolean): NotificationPreferences {
  if (!programComplete || !preferences.programReminder.enabled) return preferences
  return {
    ...preferences,
    programReminder: { ...preferences.programReminder, enabled: false },
  }
}

export function buildNotificationPayload(reminder: ActiveReminder, programComplete: boolean): NotificationPayload {
  const copy = notificationCopyRegistry[reminder.type]
  const targetExists = reminder.targetToolId ? canonicalTools.some((tool) => tool.id === reminder.targetToolId) : false
  const destination = resolveNotificationOpen(reminder, { programComplete, targetExists }).destination
  return {
    tag: `path-to-rise-${reminder.id}`,
    title: copy.title,
    body: copy.discreetBody,
    destination,
    targetToolId: reminder.type === 'practice' && targetExists ? reminder.targetToolId : undefined,
  }
}

export function resolveNotificationOpen(reminder: ActiveReminder, context: { programComplete: boolean; targetExists: boolean }): ResolvedNotificationOpen {
  if (reminder.type === 'program') {
    return context.programComplete
      ? { destination: 'path', note: 'Program reminder was stale after Day 28; resolved to My Path instead of forcing a Day.' }
      : { destination: 'path', note: 'Program reminder resolves to the current valid Day at open time.' }
  }
  if (reminder.type === 'practice') {
    return context.targetExists && reminder.targetToolId
      ? { destination: 'reset', targetToolId: reminder.targetToolId, note: 'Practice reminder opens the canonical tool only when the target is valid.' }
      : { destination: 'toolbox', note: 'Practice target was invalid or unavailable; resolved to Toolbox.' }
  }
  if (reminder.type === 'post_program') return { destination: 'toolbox', note: 'Post-program reminder resolves to reusable practices, not Day 29.' }
  return { destination: 'today', note: 'Return reminder resolves to Today without pressure.' }
}

export function getNextReminderOccurrence(now: Date, requestedTime: string, quietHours: QuietHours, frequency: ReminderFrequency) {
  const deliveredTime = resolveQuietHourDeliveryTime(requestedTime, quietHours)
  const minutes = clockTimeToMinutes(deliveredTime)
  const next = new Date(now)
  next.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0)
  if (next <= now) next.setDate(next.getDate() + (frequency === 'weekly' ? 7 : 1))
  return {
    requestedTime,
    deliveredTime,
    delayedByQuietHours: deliveredTime !== requestedTime,
    nextAt: next,
    delayMs: Math.max(0, next.getTime() - now.getTime()),
  }
}

export function validateNotificationPrivacyBoundary() {
  const failures = Object.entries(notificationCopyRegistry).flatMap(([type, copy]) => {
    const values = [copy.title, copy.discreetBody, copy.detailedBody]
    return values.filter((value) => !isSafeNotificationCopy(value)).map((value) => `${type}: ${value}`)
  })
  return { pass: failures.length === 0, failures }
}

export function normalizeNotificationDestination(destination: NotificationDestination): NotificationDestination {
  return ['today', 'path', 'reset', 'toolbox', 'support'].includes(destination) ? destination : 'today'
}
