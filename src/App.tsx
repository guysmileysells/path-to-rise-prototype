import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import './todayA.css'
import { RealTimeSupport } from './RealTimeSupport'
import { favouriteStorageKey } from './additionalSupportState'
import { RiseIcon } from './RiseIcon'
import { getTaskPresentation, formatProgramText } from './taskPresentation'
import { Disclosure, InlineExpansion } from './InlineExpansion'
import type { ReactNode } from 'react'
import { programContent, prompt5SourceIssues, type ProgramSection } from './programContent'
import { activationAffirmations, deriveDayRoadmapStatus, feelingStuckOptions, getCompletedRoadmapTaskIds, getChronologicalTaskGroups, getChronologicalWinTasks, getRoadmapForDay, sanitizeTaskProgress, toggleTaskCompletion, type DayRoadmap, type DayTaskProgress, type RoadmapTask } from './dayRoadmap'
import {
  canonicalTools,
  getCanonicalTool,
  getResetNeed,
  getToolSourceSection,
  resetNeeds,
  sanitizeToolIds,
  toolCategories,
  toolKindForAccessibility,
  type CanonicalTool,
  type NeedId,
  type ToolId,
} from './toolContent'
import {
  createPersonalizationContext,
  personalizationSignalInventory,
  resolvePersonalization,
  type PersonalizationRecommendation,
} from './personalizationContent'
import {
  createProgressViewModel,
  progressDataInventory,
  resolveProgressInsights,
  type ProgressInsight,
  type ProgressViewModel,
} from './progressContent'
import {
  buildNotificationPayload,
  defaultNotificationPreferences,
  getActiveReminders,
  getBrowserPermissionState,
  getNextReminderOccurrence,
  notificationCopyRegistry,
  notificationStorageKey,
  normalizeNotificationDestination,
  parseNotificationPreferences,
  reconcilePreferencesForProgramState,
  resolveNotificationPlatformCapability,
  type NotificationPermissionState,
  type NotificationPlatformCapability,
  type NotificationPreferences,
} from './notificationContent.ts'

type Tab = 'today' | 'reset' | 'path' | 'support'
type ProgramStatus = 'not_started' | 'in_progress' | 'program_complete'
type ResetView = 'landing' | 'recommendation' | 'toolbox' | 'tool' | 'complete' | 'error'
type ToolContext = 'reset' | 'toolbox' | 'day' | 'favourite' | 'recent'

type ProgramProgress = {
  currentDay: number
  status: ProgramStatus
  completedDays: number[]
  daySectionProgress: Record<string, string[]>
  dayTaskProgress: DayTaskProgress
  savedReflections: Record<string, string>
  lastReturn: 'today' | 'after_break'
}

type ToolState = {
  favouriteToolIds: ToolId[]
  recentToolIds: ToolId[]
  completedStandaloneToolIds: ToolId[]
}

type HomeModel = {
  eyebrow: string
  title: string
  subtitle: string
  primaryLabel: string
  progressLabel: string
  statusLabel: string
}

type ProgramDay = typeof programContent[number]
type PersonalizationBundle = {
  context: ReturnType<typeof createPersonalizationContext>
  model: ReturnType<typeof resolvePersonalization>
}

const storageKey = 'path-to-rise-program-progress-v1'
const legacyStorageKey = 'path-to-rise-prompt4-progress'
const toolStorageKey = 'path-to-rise-toolbox-state-v1'
const reflectionMaxLength = 5000

type StorageNotice = {
  tone: 'success' | 'warning'
  message: string
} | null
const navItems = [
  { key: 'today', label: 'Today', icon: 'sun' },
  { key: 'reset', label: 'Reset', icon: 'wind' },
  { key: 'path', label: 'My Path', icon: 'route' },
  { key: 'support', label: 'Support', icon: 'heart-handshake' },
] as const

const defaultProgress: ProgramProgress = {
  currentDay: 1,
  status: 'not_started',
  completedDays: [],
  daySectionProgress: {},
  dayTaskProgress: {},
  savedReflections: {},
  lastReturn: 'today',
}

const defaultToolState: ToolState = {
  favouriteToolIds: [],
  recentToolIds: [],
  completedStandaloneToolIds: [],
}

const supportLevels = [
  'Personal tools, education and journal',
  'Trusted person, peer, mentor or chaplain',
  'Counsellor, psychologist, physician, EAP or specialized service',
  '9-8-8 in Canada, emergency services and local crisis resources',
]

function normalizeDay(day: number) {
  return Math.min(28, Math.max(1, Math.round(day)))
}

function uniqueValidDays(days: unknown): number[] {
  if (!Array.isArray(days)) return []
  return [...new Set(days.filter((day): day is number => Number.isInteger(day) && day >= 1 && day <= 28))].sort((left, right) => left - right)
}

function safeRecord(value: unknown): Record<string, string[]> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const validByDay = new Map<string, Set<string>>(programContent.map((day) => [String(day.day), new Set<string>(day.sections.map((section) => section.id))]))
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).flatMap(([key, items]) => {
      const validSections = validByDay.get(key)
      if (!validSections || !Array.isArray(items)) return []
      const filtered = [...new Set(items.filter((item): item is string => typeof item === 'string' && validSections.has(item)))]
      return [[key, filtered]]
    }),
  )
}

function safeStringRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(Object.entries(value as Record<string, unknown>).filter((entry): entry is [string, string] => typeof entry[1] === 'string'))
}

function parseProgress(stored: string | null): ProgramProgress | null {
  if (!stored) return null
  try {
    const parsed = JSON.parse(stored) as Partial<ProgramProgress>
    return {
      currentDay: normalizeDay(typeof parsed.currentDay === 'number' ? parsed.currentDay : defaultProgress.currentDay),
      status: parsed.status === 'in_progress' || parsed.status === 'program_complete' ? parsed.status : defaultProgress.status,
      completedDays: uniqueValidDays(parsed.completedDays),
      daySectionProgress: safeRecord(parsed.daySectionProgress),
      dayTaskProgress: sanitizeTaskProgress(parsed.dayTaskProgress),
      savedReflections: safeStringRecord(parsed.savedReflections),
      lastReturn: parsed.lastReturn === 'after_break' ? 'after_break' : 'today',
    }
  } catch {
    return null
  }
}

function parseToolState(stored: string | null): ToolState {
  if (!stored) return defaultToolState
  try {
    const parsed = JSON.parse(stored) as Partial<ToolState>
    return {
      favouriteToolIds: sanitizeToolIds(parsed.favouriteToolIds, 20),
      recentToolIds: sanitizeToolIds(parsed.recentToolIds, 5),
      completedStandaloneToolIds: sanitizeToolIds(parsed.completedStandaloneToolIds, 20),
    }
  } catch {
    return defaultToolState
  }
}

function getStoredProgress(): ProgramProgress {
  if (typeof window === 'undefined') return defaultProgress
  const current = parseProgress(window.localStorage.getItem(storageKey))
  if (current) return current

  const legacy = parseProgress(window.localStorage.getItem(legacyStorageKey))
  if (legacy) return legacy

  return defaultProgress
}

function getStoredToolState(): ToolState {
  if (typeof window === 'undefined') return defaultToolState
  return parseToolState(window.localStorage.getItem(toolStorageKey))
}


function getStoredNotificationPreferences(): NotificationPreferences {
  if (typeof window === 'undefined') return defaultNotificationPreferences
  return parseNotificationPreferences(window.localStorage.getItem(notificationStorageKey))
}

function getCurrentNotificationPermission(): NotificationPermissionState {
  if (typeof window === 'undefined') return 'unsupported'
  const supported = 'Notification' in window && window.isSecureContext
  return getBrowserPermissionState(supported ? window.Notification.permission : undefined, supported)
}

function getNotificationPlatformCapability(): NotificationPlatformCapability {
  if (typeof window === 'undefined') {
    return resolveNotificationPlatformCapability({ notificationApi: false, secureContext: false, serviceWorker: false, pushManager: false })
  }
  return resolveNotificationPlatformCapability({
    notificationApi: 'Notification' in window,
    secureContext: window.isSecureContext,
    serviceWorker: 'serviceWorker' in navigator,
    pushManager: 'PushManager' in window,
  })
}

function getInitialTab(): Tab {
  if (typeof window === 'undefined') return 'today'
  const route = window.location.hash.replace('#', '').split('/')[0]
  return navItems.some((item) => item.key === route) ? route as Tab : 'today'
}

function getProgramDay(day: number): ProgramDay {
  return programContent.find((candidate) => candidate.day === normalizeDay(day)) ?? programContent[0]
}

function firstIncompleteDay(progress: ProgramProgress) {
  // Legacy completed records may lack per-day history: review Day 28 without fabricating it.
  if (progress.status === 'program_complete') return 28
  const complete = new Set(progress.completedDays)
  const first = programContent.find((day) => !complete.has(day.day))
  return first?.day ?? 28
}

function getSectionKey(day: number, sectionId: string) {
  return `day-${day}:${sectionId}`
}

function getCompletedSections(progress: ProgramProgress, day: number) {
  return progress.daySectionProgress[String(day)] ?? []
}

function getHomeModel(progress: ProgramProgress): HomeModel {
  if (progress.status === 'program_complete' || progress.completedDays.length === 28) {
    return {
      eyebrow: '28-Day Journey complete',
      title: 'Your reset is complete.',
      subtitle: 'Review the skills you practiced and keep the next chapter gentle. There is no Day 29 to chase.',
      primaryLabel: 'Review your path',
      progressLabel: 'Day 28 of 28 complete',
      statusLabel: 'Post-program maintenance',
    }
  }

  const dayNumber = firstIncompleteDay(progress)
  const day = getProgramDay(dayNumber)
  const completedSectionCount = getCompletedSections(progress, dayNumber).length
  const progressPrefix = `Day ${day.day} of 28 · Week ${day.week} of 4`
  const roadmap = getRoadmapForDay(day.day)
  const roadmapStatus = roadmap ? deriveDayRoadmapStatus(roadmap, getCompletedRoadmapTaskIds(progress.dayTaskProgress, day.day)) : null

  if (roadmap && roadmapStatus) {
    const nextLabel = roadmapStatus.nextTask ? `Next up: ${getChronologicalWinTasks(roadmap).findIndex(task => task.id === roadmapStatus.nextTask?.id) + 1}. ${roadmapStatus.nextTask.shortTitle}` : 'Day complete'
    return {
      eyebrow: `${progressPrefix} · ${roadmapStatus.progressLabel}`,
      title: day.title,
      subtitle: roadmapStatus.completedRequiredCount > 0 ? 'PATH remembers where you stopped. Continue with the next ordered task.' : 'Start with Task 1. The Day is organized for you.',
      primaryLabel: roadmapStatus.completedRequiredCount > 0 ? `Continue Day ${day.day}` : 'Start Day 1',
      progressLabel: roadmapStatus.progressLabel,
      statusLabel: nextLabel,
    }
  }

  if (completedSectionCount > 0 || progress.status === 'in_progress') {
    return {
      eyebrow: progressPrefix,
      title: day.title,
      subtitle: progress.lastReturn === 'after_break' ? 'Welcome back. Resume without penalty or pressure.' : 'Pick up inside today’s source-backed experience.',
      primaryLabel: `Continue Day ${day.day}`,
      progressLabel: `${progress.completedDays.length} day${progress.completedDays.length === 1 ? '' : 's'} complete`,
      statusLabel: day.weekTheme,
    }
  }

  return {
    eyebrow: progressPrefix,
    title: day.title,
    subtitle: 'Begin the next source-backed day when you are ready. Opening a day does not mark it complete.',
    primaryLabel: day.day === 1 ? 'Start Day 1' : `Begin Day ${day.day}`,
    progressLabel: `${progress.completedDays.length} day${progress.completedDays.length === 1 ? '' : 's'} complete`,
    statusLabel: day.weekTheme,
  }
}

function closeTodayPanels() {
  const details = document.querySelector<HTMLDetailsElement>('.today-data-settings')
  if (details?.open) details.querySelector<HTMLElement>(':scope > summary')?.click()
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(getInitialTab)
  const [realTimeSupportOpen, setRealTimeSupportOpen] = useState(false)
  const realTimeSupportLaunch = useRef<HTMLButtonElement>(null)
  const [spaceRequest, setSpaceRequest] = useState(0)
  const handledSpaceRequest = useRef(0)

  useLayoutEffect(() => {
    if (spaceRequest === handledSpaceRequest.current || activeTab !== 'today') return
    const details = document.querySelector<HTMLDetailsElement>('.today-data-settings')
    const summary = details?.querySelector<HTMLElement>(':scope > summary')
    if (details && summary) {
      // Enter the overview, even when saved active reminders opened its nested panel.
      // This changes disclosure visibility only, never reminder consent/preferences.
      const reminders = details.querySelector<HTMLDetailsElement>('.notification-settings')
      if (reminders) reminders.open = false
      if (!details.open) summary.click()
      summary.focus({ preventScroll: true })
      summary.scrollIntoView({ block: 'start', behavior: 'instant' })
    }
    handledSpaceRequest.current = spaceRequest
  }, [spaceRequest, activeTab])
  const [progress, setProgress] = useState<ProgramProgress>(getStoredProgress)
  const [toolState, setToolState] = useState<ToolState>(getStoredToolState)
  const [selectedDay, setSelectedDay] = useState<number>(firstIncompleteDay(progress))
  const [pathDayOpen, setPathDayOpen] = useState(false)
  const [draftReflections, setDraftReflections] = useState<Record<string, string>>(() => progress.savedReflections)
  const [resetView, setResetView] = useState<ResetView>('landing')
  const [selectedNeedId, setSelectedNeedId] = useState<NeedId | null>(null)
  const [activeToolId, setActiveToolId] = useState<ToolId | null>(null)
  const [activeToolContext, setActiveToolContext] = useState<ToolContext>('reset')
  const [storageNotice, setStorageNotice] = useState<StorageNotice>(null)
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(getStoredNotificationPreferences)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermissionState>(getCurrentNotificationPermission)
  const reminderTimers = useRef<number[]>([])
  const notificationPlatform = useMemo(() => getNotificationPlatformCapability(), [])
  const programCompleteForNotifications = progress.status === 'program_complete' || progress.completedDays.length === 28
  const activeRemindersForNotificationStatus = useMemo(() => getActiveReminders(notificationPreferences, programCompleteForNotifications), [notificationPreferences, programCompleteForNotifications])
  const notificationDeliveryStatus = useMemo(() => {
    if (activeRemindersForNotificationStatus.length === 0) return 'No reminders are active. Core PATH to RISE flows work normally with notifications off.'
    if (notificationPermission !== 'authorized') return 'Reminder preferences are saved, but delivery is not active because browser/system notification permission is not authorized.'
    return `${activeRemindersForNotificationStatus.length} reminder${activeRemindersForNotificationStatus.length === 1 ? '' : 's'} scheduled for browser-tab delivery. Reliable lock-screen/background delivery requires PWA service worker, push backend or a native wrapper.`
  }, [activeRemindersForNotificationStatus.length, notificationPermission])

  useEffect(() => {
    const onHashChange = () => { setRealTimeSupportOpen(false); setActiveTab(getInitialTab()) }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const refreshPermission = () => setNotificationPermission(getCurrentNotificationPermission())
    window.addEventListener('focus', refreshPermission)
    document.addEventListener('visibilitychange', refreshPermission)
    return () => {
      window.removeEventListener('focus', refreshPermission)
      document.removeEventListener('visibilitychange', refreshPermission)
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(notificationStorageKey, JSON.stringify(notificationPreferences))
    } catch {
      queueMicrotask(() => setStorageNotice({ tone: 'warning', message: 'Reminder preferences could not be saved locally. Existing program progress is unchanged.' }))
    }
  }, [notificationPreferences])

  useEffect(() => {
    const programComplete = progress.status === 'program_complete' || progress.completedDays.length === 28
    const reconciled = reconcilePreferencesForProgramState(notificationPreferences, programComplete)
    if (reconciled !== notificationPreferences) {
      queueMicrotask(() => {
        setNotificationPreferences(reconciled)
        setStorageNotice({ tone: 'success', message: 'Active program reminders were turned off because the 28-Day Journey is complete.' })
      })
    }
  }, [notificationPreferences, progress.completedDays.length, progress.status])

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(progress))
    } catch {
      queueMicrotask(() => setStorageNotice({ tone: 'warning', message: 'Progress could not be saved locally. Your current screen remains usable, but this browser may not preserve changes.' }))
    }
  }, [progress])

  useEffect(() => {
    try {
      window.localStorage.setItem(toolStorageKey, JSON.stringify(toolState))
    } catch {
      queueMicrotask(() => setStorageNotice({ tone: 'warning', message: 'Tool preferences could not be saved locally. This browser may not preserve favourites or recents.' }))
    }
  }, [toolState])

  const goTo = useCallback((tab: Tab) => {
    setRealTimeSupportOpen(false)
    setActiveTab(tab)
    window.location.hash = tab
  }, [])

  const openNotificationDestination = useCallback((destination: string, targetToolId?: ToolId) => {
    const safeDestination = normalizeNotificationDestination(destination as never)
    if (safeDestination === 'toolbox') {
      setResetView('toolbox')
      goTo('reset')
      return
    }
    if (safeDestination === 'reset') {
      if (targetToolId && getCanonicalTool(targetToolId)) {
        setActiveToolId(targetToolId)
        setActiveToolContext('toolbox')
        setResetView('tool')
      } else {
        setResetView('landing')
        setActiveToolId(null)
      }
      goTo('reset')
      return
    }
    if (safeDestination === 'path') {
      setSelectedDay(firstIncompleteDay(progress))
      setPathDayOpen(false)
      goTo('path')
      return
    }
    goTo(safeDestination)
  }, [goTo, progress])

  const requestNotificationPermission = async () => {
    setNotificationPreferences((current) => ({ ...current, permissionExplained: true }))
    if (typeof window === 'undefined' || !('Notification' in window) || !window.isSecureContext) {
      setNotificationPermission('unsupported')
      setStorageNotice({ tone: 'warning', message: 'This browser cannot deliver OS notifications from the current prototype. Reminder settings remain available as architecture only.' })
      return
    }
    try {
      const permission = await window.Notification.requestPermission()
      const nextPermission = getBrowserPermissionState(permission, true)
      setNotificationPermission(nextPermission)
      setStorageNotice({ tone: nextPermission === 'authorized' ? 'success' : 'warning', message: nextPermission === 'authorized' ? 'Browser notification permission is on for this prototype. Delivery still requires this browser environment to support it.' : 'Notification permission was not granted. PATH to RISE remains fully usable without reminders.' })
    } catch {
      setNotificationPermission(getCurrentNotificationPermission())
      setStorageNotice({ tone: 'warning', message: 'Notification permission could not be requested in this browser. PATH to RISE remains fully usable.' })
    }
  }

  useEffect(() => {
    reminderTimers.current.forEach((timer) => window.clearTimeout(timer))
    reminderTimers.current = []

    const programComplete = progress.status === 'program_complete' || progress.completedDays.length === 28
    const activeReminders = getActiveReminders(notificationPreferences, programComplete)

    if (activeReminders.length === 0) return

    if (notificationPermission !== 'authorized' || typeof window === 'undefined' || !('Notification' in window)) return

    activeReminders.forEach((reminder) => {
      const occurrence = getNextReminderOccurrence(new Date(), reminder.schedule.time, notificationPreferences.quietHours, reminder.schedule.frequency)
      const payload = buildNotificationPayload(reminder, programComplete)
      const timer = window.setTimeout(() => {
        const notification = new window.Notification(payload.title, {
          body: payload.body,
          tag: payload.tag,
          silent: true,
        })
        notification.onclick = () => {
          window.focus()
          openNotificationDestination(payload.destination, payload.targetToolId)
          notification.close()
        }
      }, Math.min(occurrence.delayMs, 2_147_483_647))
      reminderTimers.current.push(timer)
    })

    return () => {
      reminderTimers.current.forEach((timer) => window.clearTimeout(timer))
      reminderTimers.current = []
    }
  }, [notificationPermission, notificationPreferences, progress.completedDays.length, progress.status, openNotificationDestination])

  const openCurrentDay = () => {
    const day = firstIncompleteDay(progress)
    setSelectedDay(day)
    setPathDayOpen(true)
    setProgress((current) => ({ ...current, currentDay: day, status: current.completedDays.length === 28 ? 'program_complete' : 'in_progress' }))
    goTo('path')
  }

  const openReset = () => {
    setResetView('landing')
    setActiveToolId(null)
    goTo('reset')
  }

  const clearProgramData = () => {
    if (!window.confirm('Clear local program progress and saved reflections from this browser? This cannot be undone. Toolbox favourites/recents will remain.')) return
    setProgress(defaultProgress)
    setDraftReflections({})
    setSelectedDay(1)
    window.localStorage.removeItem(storageKey)
    window.localStorage.removeItem(legacyStorageKey)
    setStorageNotice({ tone: 'success', message: 'Local program progress and saved reflections were cleared from this browser.' })
    goTo('today')
  }

  const clearToolData = () => {
    if (!window.confirm('Clear local Toolbox favourites, recents and standalone tool history from this browser? Program progress and reflections will remain.')) return
    setToolState(defaultToolState)
    window.localStorage.removeItem(toolStorageKey)
    window.localStorage.removeItem(favouriteStorageKey)
    setStorageNotice({ tone: 'success', message: 'Local Toolbox favourites, recents and standalone tool history were cleared from this browser.' })
  }

  const clearAllLocalData = () => {
    if (!window.confirm('Clear all PATH to RISE prototype data stored in this browser, including program progress, saved reflections, favourites and recents? This cannot be undone.')) return
    setProgress(defaultProgress)
    setToolState(defaultToolState)
    setDraftReflections({})
    setSelectedDay(1)
    window.localStorage.removeItem(storageKey)
    window.localStorage.removeItem(legacyStorageKey)
    window.localStorage.removeItem(toolStorageKey)
    window.localStorage.removeItem(favouriteStorageKey)
    window.localStorage.removeItem(notificationStorageKey)
    setNotificationPreferences(defaultNotificationPreferences)
    reminderTimers.current.forEach((timer) => window.clearTimeout(timer))
    reminderTimers.current = []
    setStorageNotice({ tone: 'success', message: 'All local PATH to RISE prototype data was cleared from this browser.' })
    goTo('today')
  }

  const startTool = (toolId: ToolId, context: ToolContext) => {
    setActiveToolId(toolId)
    setActiveToolContext(context)
    setResetView('tool')
    setToolState((current) => ({
      ...current,
      recentToolIds: [toolId, ...current.recentToolIds.filter((id) => id !== toolId)].slice(0, 5),
    }))
    goTo('reset')
  }

  const completeStandaloneTool = (toolId: ToolId) => {
    setToolState((current) => ({
      ...current,
      completedStandaloneToolIds: [toolId, ...current.completedStandaloneToolIds.filter((id) => id !== toolId)].slice(0, 20),
    }))
    setResetView('complete')
  }

  const toggleFavourite = (toolId: ToolId) => {
    setToolState((current) => {
      const exists = current.favouriteToolIds.includes(toolId)
      return {
        ...current,
        favouriteToolIds: exists ? current.favouriteToolIds.filter((id) => id !== toolId) : [toolId, ...current.favouriteToolIds].slice(0, 20),
      }
    })
  }

  const selectNeed = (needId: NeedId) => {
    setSelectedNeedId(needId)
    setResetView('recommendation')
    setActiveToolId(null)
  }

  const personalization = useMemo(() => {
    const context = createPersonalizationContext(progress, toolState)
    return { context, model: resolvePersonalization(context) }
  }, [progress, toolState])

  const progressViewModel = useMemo(() => createProgressViewModel(progress, toolState), [progress, toolState])

  const openPersonalizedRecommendation = (recommendation: PersonalizationRecommendation) => {
    if (recommendation.action === 'continue-program') {
      openCurrentDay()
      return
    }
    if (recommendation.action === 'open-reset') {
      openReset()
      return
    }
    if (recommendation.action === 'open-toolbox') {
      setResetView('toolbox')
      goTo('reset')
      return
    }
    if (recommendation.action === 'start-tool' && recommendation.toolId) startTool(recommendation.toolId, recommendation.badge === 'FAVOURITE' ? 'favourite' : recommendation.badge === 'RECENT' ? 'recent' : 'toolbox')
  }

  const toggleSection = (day: number, sectionId: string) => {
    setProgress((current) => {
      const key = String(day)
      const currentSections = new Set(current.daySectionProgress[key] ?? [])
      if (currentSections.has(sectionId)) currentSections.delete(sectionId)
      else currentSections.add(sectionId)
      return {
        ...current,
        currentDay: normalizeDay(day),
        status: 'in_progress',
        daySectionProgress: { ...current.daySectionProgress, [key]: [...currentSections] },
      }
    })
  }

  const saveReflection = (key: string, value: string) => {
    const trimmedValue = value.trimEnd()
    if (trimmedValue.length === 0) {
      setStorageNotice({ tone: 'warning', message: 'Nothing was saved because this reflection is empty.' })
      return
    }
    if (trimmedValue.length > reflectionMaxLength) {
      setStorageNotice({ tone: 'warning', message: `Reflection was not saved because it is over the ${reflectionMaxLength.toLocaleString()} character prototype limit.` })
      return
    }
    const nextProgress = {
      ...progress,
      status: 'in_progress' as const,
      savedReflections: { ...progress.savedReflections, [key]: trimmedValue },
    }
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextProgress))
      setDraftReflections((current) => ({ ...current, [key]: trimmedValue }))
      setProgress(nextProgress)
      setStorageNotice({ tone: 'success', message: 'Reflection saved locally on this browser only.' })
    } catch {
      setStorageNotice({ tone: 'warning', message: 'Reflection could not be saved locally. Your draft remains on screen; copy it before closing if you need to keep it.' })
    }
  }

  const deleteReflection = (key: string) => {
    if (!window.confirm('Delete this saved reflection from this browser? This cannot be undone.')) return
    const remainingSaved = { ...progress.savedReflections }
    const remainingDrafts = { ...draftReflections }
    delete remainingSaved[key]
    delete remainingDrafts[key]
    const nextProgress = { ...progress, savedReflections: remainingSaved }
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextProgress))
      setProgress(nextProgress)
      setDraftReflections(remainingDrafts)
      setStorageNotice({ tone: 'success', message: 'Saved reflection deleted from this browser.' })
    } catch {
      setStorageNotice({ tone: 'warning', message: 'Reflection could not be deleted because local storage was unavailable. Try again before sharing this device.' })
    }
  }

  const toggleRoadmapTask = (day: number, taskId: string) => {
    setProgress((current) => {
      const roadmap = getRoadmapForDay(day)
      if (!roadmap) return current
      const key = String(day)
      const nextTaskIds = toggleTaskCompletion(current.dayTaskProgress[key] ?? [], taskId, roadmap)
      const roadmapStatus = deriveDayRoadmapStatus(roadmap, nextTaskIds)
      const completedDays = roadmapStatus.dayComplete
        ? uniqueValidDays([...current.completedDays, day])
        : current.completedDays.filter((completedDay) => completedDay !== day)
      const programComplete = completedDays.length === 28
      return {
        ...current,
        currentDay: roadmapStatus.dayComplete ? normalizeDay(day + 1) : day,
        status: programComplete ? 'program_complete' : nextTaskIds.length > 0 ? 'in_progress' : 'in_progress',
        completedDays,
        dayTaskProgress: { ...current.dayTaskProgress, [key]: nextTaskIds },
        lastReturn: 'today',
      }
    })
  }

  const completeDay = (day: number) => {
    setProgress((current) => {
      const completedDays = uniqueValidDays([...current.completedDays, day])
      const programComplete = completedDays.length === 28 || day === 28
      return {
        ...current,
        currentDay: programComplete ? 28 : normalizeDay(day + 1),
        status: programComplete ? 'program_complete' : 'not_started',
        completedDays,
        lastReturn: 'today',
      }
    })
  }

  return (
    <main className="shell" aria-label="PATH to RISE prototype">
      <p className="concept-note">PATH to RISE · Prototype checkpoint · Progress and saved reflections stay local to this browser for now</p>
      <section className={`phone${activeTab === 'today' ? ' today-phone' : ''}`} aria-live="polite">
        <header className="topbar">
          <button className="brand" type="button" onClick={() => { closeTodayPanels(); goTo('today') }} aria-label="Go to Today">
            PATH <span>to</span> RISE
          </button>
          <button className="today-a-space-button" type="button" onClick={() => { goTo('today'); setSpaceRequest((current) => current + 1) }}><RiseIcon name="lock-keyhole" />Your space</button>
          <button ref={realTimeSupportLaunch} className="secondary rts-launch" type="button" aria-pressed={realTimeSupportOpen} onClick={() => setRealTimeSupportOpen(current => !current)}>{realTimeSupportOpen ? 'Exit Real-Time Support' : 'Real-Time Support'}</button>
        </header>
        {storageNotice && <p className={`storage-status ${storageNotice.tone}`} role="status">{storageNotice.message}</p>}

        <div className="screen">
          <div hidden={realTimeSupportOpen}>
          {activeTab === 'today' && <Today progress={progress} toolState={toolState} personalization={personalization} notificationPreferences={notificationPreferences} notificationPermission={notificationPermission} notificationPlatform={notificationPlatform} notificationDeliveryStatus={notificationDeliveryStatus} onNotificationPreferencesChange={setNotificationPreferences} onRequestNotificationPermission={requestNotificationPermission} onOpenReset={openReset} onOpenPath={() => { setPathDayOpen(false); goTo('path') }} onOpenToolbox={() => { setResetView('toolbox'); goTo('reset') }} onOpenPersonalizedRecommendation={openPersonalizedRecommendation} onClearProgramData={clearProgramData} onClearToolData={clearToolData} onClearAllLocalData={clearAllLocalData} />}
          {activeTab === 'reset' && <ResetExperience view={resetView} selectedNeedId={selectedNeedId} activeToolId={activeToolId} activeToolContext={activeToolContext} toolState={toolState} personalization={personalization} onSelectNeed={selectNeed} onSetView={setResetView} onStartTool={startTool} onCompleteTool={completeStandaloneTool} onToggleFavourite={toggleFavourite} onHome={() => goTo('today')} onSupport={() => goTo('support')} />}
          {activeTab === 'path' && <MyPath progress={progress} progressModel={progressViewModel} toolState={toolState} selectedDay={selectedDay} dayDetailOpen={pathDayOpen} draftReflections={draftReflections} onSelectDay={(day) => { setSelectedDay(day); setPathDayOpen(true) }} onOpenDayDetail={() => setPathDayOpen(true)} onCloseDayDetail={() => setPathDayOpen(false)} onReset={openReset} onStartTool={startTool} onToggleFavourite={toggleFavourite} onToggleSection={toggleSection} onDraftReflection={(key, value) => setDraftReflections((current) => ({ ...current, [key]: value }))} onSaveReflection={saveReflection} onDeleteReflection={deleteReflection} onToggleRoadmapTask={toggleRoadmapTask} onCompleteDay={completeDay} onSupport={() => goTo('support')} />}
          {activeTab === 'support' && <Support />}
          </div>
          {realTimeSupportOpen && <RealTimeSupport onExit={() => { setRealTimeSupportOpen(false); requestAnimationFrame(() => realTimeSupportLaunch.current?.focus()) }} onSupport={() => goTo('support')} />}
        </div>

        <nav className="bottom-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              className={activeTab === item.key ? 'active' : ''}
              type="button"
              key={item.key}
              onClick={() => { if (item.key === 'today') closeTodayPanels(); return item.key === 'reset' ? openReset() : item.key === 'path' ? (setPathDayOpen(false), goTo('path')) : goTo(item.key) }}
              aria-current={activeTab === item.key ? 'page' : undefined}
              aria-label={`Open ${item.label}`}
            >
              <RiseIcon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </section>
    </main>
  )
}

function Today({ progress, toolState, personalization, notificationPreferences, notificationPermission, notificationPlatform, notificationDeliveryStatus, onNotificationPreferencesChange, onRequestNotificationPermission, onOpenReset, onOpenPath, onOpenToolbox, onOpenPersonalizedRecommendation, onClearProgramData, onClearToolData, onClearAllLocalData }: { progress: ProgramProgress; toolState: ToolState; personalization: PersonalizationBundle; notificationPreferences: NotificationPreferences; notificationPermission: NotificationPermissionState; notificationPlatform: NotificationPlatformCapability; notificationDeliveryStatus: string; onNotificationPreferencesChange: (preferences: NotificationPreferences | ((current: NotificationPreferences) => NotificationPreferences)) => void; onRequestNotificationPermission: () => void; onOpenReset: () => void; onOpenPath: () => void; onOpenToolbox: () => void; onOpenPersonalizedRecommendation: (recommendation: PersonalizationRecommendation) => void; onClearProgramData: () => void; onClearToolData: () => void; onClearAllLocalData: () => void }) {
  const model = useMemo(() => getHomeModel(progress), [progress])
  const currentDay = firstIncompleteDay(progress)
  const programComplete = progress.status === 'program_complete' || progress.completedDays.length === 28
  const roadmap = getRoadmapForDay(currentDay)
  const roadmapStatus = roadmap ? deriveDayRoadmapStatus(roadmap, getCompletedRoadmapTaskIds(progress.dayTaskProgress, currentDay)) : null
  const primary = personalization.model.primary
  const shortcut = personalization.model.shortcut
  const permittedSignalCount = personalizationSignalInventory.filter((signal) => signal.permitted).length

  return (
    <section className="stack page-enter today-a" aria-labelledby="today-title">
      <div className="page-kicker today-a-intro">
        <p className="eyebrow">A moment for you</p>
        <h1 id="today-title">Leave the shift.{' '}<br />Keep yourself.</h1>
        <p className="muted">Welcome back. Start where you are.</p>
      </div>

      <article className="hero-card today-a-reset" aria-labelledby="today-reset-title">
        <p className="eyebrow">Right here. Right now.</p>
        <h2 id="today-reset-title">What would help today?</h2>
        <p className="muted">A little space between what happened and what comes next.</p>
        <button className="primary" type="button" onClick={onOpenReset}>Reset me now <span aria-hidden="true">→</span></button>
      </article>

      <article className="today-a-path" aria-labelledby="journey-title">
        <div className="today-a-section-heading">
          <h2>Your path</h2>
          <button className="today-a-text-button" type="button" onClick={onOpenPath}>View program</button>
        </div>
        <p className="today-a-day-label">{programComplete ? '28-day program complete' : `Day ${currentDay} of 28 · Week ${getProgramDay(currentDay).week}`}</p>
        <h3 id="journey-title">{model.title}</h3>
        <p className="today-a-next">{model.statusLabel}</p>
        <div className="today-a-count"><span>{programComplete || !roadmapStatus ? model.progressLabel : `${roadmapStatus.completedRequiredCount} of ${roadmapStatus.requiredCount} actions complete`}</span><span>Move at your pace.</span></div>
        {!programComplete && roadmapStatus && <progress aria-label="Completed actions in current day" max={roadmapStatus.requiredCount} value={roadmapStatus.completedRequiredCount} />}
        <button className="secondary today-a-continue" type="button" onClick={() => onOpenPersonalizedRecommendation(primary)}>{primary.label} <span aria-hidden="true">→</span></button>
        <p className="fineprint left-copy">{primary.reason}</p>
      </article>

      <h2 className="today-a-within-title">Within reach</h2>
      <section className="supporting-grid today-a-within" aria-label="Today supporting actions">
        {shortcut ? <PersonalizedShortcutCard recommendation={shortcut} onOpen={onOpenPersonalizedRecommendation} /> : (
          <article className="list-card static" aria-label="Today source status">
            <span>Source-backed</span>
            <small>Day {currentDay} opens the structured 28-day program extracted from the original DOCX source.</small>
          </article>
        )}
        <button className="list-card today-a-kit" type="button" onClick={onOpenToolbox}>
          <RiseIcon name="bookmark" /><span>My Quick Kit{' '}<small>Your favourites and recent practices.</small></span>{' '}<span aria-hidden="true">›</span>
        </button>
      </section>

      <Disclosure className="calm-disclosure today-data-settings">
        <summary>
          <span className="today-a-settings-closed">Privacy, reminders + local data{' '}<small>Optional settings, when you need them.</small></span>{' '}
          <span className="today-a-settings-open">← Today</span>
        </summary>
        <div className="disclosure-stack">
          <div className="today-a-space-overview">
            <h1>Your space</h1><p className="muted">Privacy, reminders + local data.</p>
            <article className="notice-card"><strong>Stored in this browser</strong>{' '}<span>Progress, saved writing, favourites and recents stay here. No account sync. Clearing site data removes them.</span></article>
          </div>
          <Disclosure className="today-a-scope">
            <summary>How suggestions work</summary>
            <p>Personalization is transparent. RESET + Toolbox active. Uses {permittedSignalCount} permitted signal types: program position, favourites and bounded recents. Private reflections are not analyzed or used for recommendations.</p>
          </Disclosure>
          <NotificationSettings progress={progress} toolState={toolState} preferences={notificationPreferences} permission={notificationPermission} platform={notificationPlatform} deliveryStatus={notificationDeliveryStatus} onChange={onNotificationPreferencesChange} onRequestPermission={onRequestNotificationPermission} />
          <LocalDataControls onClearProgramData={onClearProgramData} onClearToolData={onClearToolData} onClearAllLocalData={onClearAllLocalData} />
        </div>
      </Disclosure>
    </section>
  )
}


function ReminderGroup({ title, enabled, children }: { title: string; enabled: boolean; children: ReactNode }) {
  return <Disclosure className="reminder-group" defaultOpen={enabled}>
    <summary><span>{title}</span>{' '}<small>{enabled ? 'On' : 'Off'}</small></summary>
    <div className="reminder-group-body">{children}</div>
  </Disclosure>
}

function NotificationSettings({ progress, toolState, preferences, permission, platform, deliveryStatus, onChange, onRequestPermission }: { progress: ProgramProgress; toolState: ToolState; preferences: NotificationPreferences; permission: NotificationPermissionState; platform: NotificationPlatformCapability; deliveryStatus: string; onChange: (preferences: NotificationPreferences | ((current: NotificationPreferences) => NotificationPreferences)) => void; onRequestPermission: () => void }) {
  const programComplete = progress.status === 'program_complete' || progress.completedDays.length === 28
  const favouriteTools = toolState.favouriteToolIds.map((id) => getCanonicalTool(id)).filter((tool): tool is CanonicalTool => Boolean(tool))
  const practiceOptions = favouriteTools.length > 0 ? favouriteTools : canonicalTools.slice(0, 6)
  const activeReminderCount = getActiveReminders(preferences, programComplete).length
  const permissionLabel = permission === 'authorized' ? 'Browser permission authorized' : permission === 'denied' ? 'Browser permission denied' : permission === 'unsupported' ? 'Notifications unsupported here' : 'Browser permission not requested'
  const permissionActionLabel = permission === 'authorized' ? 'Permission already on' : permission === 'denied' ? 'Permission denied in browser settings' : permission === 'unsupported' ? 'Unsupported in this browser' : 'Explain + request permission'

  const update = (recipe: (current: NotificationPreferences) => NotificationPreferences) => onChange((current) => recipe(current))
  const updateScheduleTime = (key: 'programReminder' | 'practiceReminder' | 'returnReminder' | 'postProgramReminder', time: string) => {
    update((current) => ({ ...current, [key]: { ...current[key], schedule: { ...current[key].schedule, time } } }))
  }

  return (
    <Disclosure className="notification-settings" defaultOpen={activeReminderCount > 0}>
      <summary><span className="today-a-reminders-closed">Reminders — optional, discreet and shift-work aware</span>{' '}<span className="today-a-reminders-open">← Your space</span></summary>
      <div className="notification-stack">
        <h1>Reminders</h1><p className="muted">Optional. Discreet. Built around your hours.</p>
        <article className="notice-card" aria-label="Notification platform capability">
          <strong>Platform truth</strong>{' '}
          <span>{platform.summary}</span>{' '}
          <span>Current support: {platform.currentSupport}. No push backend, service-worker registration or native wrapper is present in this prototype.</span>
        </article>

        <section className="setting-panel" aria-labelledby="permission-title">
          <div className="status-row">
            <h2 id="permission-title">Permission</h2>
            <span className="status-pill">{permissionLabel}</span>
          </div>
          <p className="muted">PATH to RISE asks only after you choose reminders. Refusing notifications never blocks the program, RESET, Toolbox, reflections or Support.</p>
          <button className="secondary" type="button" onClick={onRequestPermission} disabled={permission === 'authorized' || permission === 'denied' || permission === 'unsupported'}>{permissionActionLabel}</button>
          <p className="fineprint left-copy">{deliveryStatus}</p>
        </section>

        <section className="setting-panel" aria-labelledby="privacy-title">
          <div className="status-row">
            <h2 id="privacy-title">Privacy mode</h2>
            <span className="status-pill">Discreet default</span>
          </div>
          <p className="muted">Lock-screen copy uses neutral wording only. Notifications never include journal/reflection text, RESET need selections, diagnosis language or urgency pressure.</p>
          <Disclosure className="notification-copy-details">
            <summary>Preview notification wording</summary>
            <div className="copy-preview" aria-label="Safe notification copy examples">
              {Object.entries(notificationCopyRegistry).map(([type, copy]) => <span key={type}>{copy.title}: {copy.discreetBody}{' '}</span>)}
            </div>
          </Disclosure>
        </section>

        <ReminderGroup title="Program reminder" enabled={preferences.programReminder.enabled}>
        <section className="setting-panel" aria-labelledby="program-reminder-title">
          <div className="status-row">
            <h2 id="program-reminder-title">Program reminder</h2>
            <button className="secondary" type="button" aria-pressed={preferences.programReminder.enabled} disabled={programComplete} onClick={() => update((current) => ({ ...current, programReminder: { ...current.programReminder, enabled: !current.programReminder.enabled } }))}>{preferences.programReminder.enabled ? 'On' : programComplete ? 'Stopped after Day 28' : 'Off'}</button>
          </div>
          <label className="setting-field">Time
            <input type="time" value={preferences.programReminder.schedule.time} onChange={(event) => updateScheduleTime('programReminder', event.target.value)} />
          </label>
          <p className="fineprint left-copy">Optional continuation only. No streaks, missed-day pressure, escalation or Day 29.</p>
        </section>
        </ReminderGroup>

        <ReminderGroup title="Practice reminder" enabled={preferences.practiceReminder.enabled}>
        <section className="setting-panel" aria-labelledby="practice-reminder-title">
          <div className="status-row">
            <h2 id="practice-reminder-title">User-scheduled practice reminder</h2>
            <button className="secondary" type="button" aria-pressed={preferences.practiceReminder.enabled} disabled={!preferences.practiceReminder.targetToolId} onClick={() => update((current) => ({ ...current, practiceReminder: { ...current.practiceReminder, enabled: !current.practiceReminder.enabled } }))}>{preferences.practiceReminder.enabled ? 'On' : 'Off'}</button>
          </div>
          <label className="setting-field">Practice
            {' '}<select value={preferences.practiceReminder.targetToolId ?? ''} onChange={(event) => update((current) => ({ ...current, practiceReminder: { ...current.practiceReminder, targetToolId: event.target.value as ToolId || null, enabled: current.practiceReminder.enabled && Boolean(event.target.value) } }))}>
              <option value="">Choose a source-backed practice</option>
              {practiceOptions.map((tool) => <option value={tool.id} key={tool.id}>{tool.canonicalName}</option>)}
            </select>
          </label>
          <label className="setting-field">Time
            <input type="time" value={preferences.practiceReminder.schedule.time} onChange={(event) => updateScheduleTime('practiceReminder', event.target.value)} />
          </label>
          <p className="fineprint left-copy">Favourite ≠ consent. A practice reminder starts only after you explicitly choose the practice and turn this on.</p>
        </section>
        </ReminderGroup>

        <ReminderGroup title="Return reminder" enabled={preferences.returnReminder.enabled}>
        <section className="setting-panel" aria-labelledby="return-reminder-title">
          <div className="status-row">
            <h2 id="return-reminder-title">Return reminder</h2>
            <button className="secondary" type="button" aria-pressed={preferences.returnReminder.enabled} disabled={programComplete} onClick={() => update((current) => ({ ...current, returnReminder: { ...current.returnReminder, enabled: !current.returnReminder.enabled } }))}>{preferences.returnReminder.enabled ? 'On' : programComplete ? 'Not needed after Day 28' : 'Off'}</button>
          </div>
          <label className="setting-field">After days away
            <input type="number" min="3" max="30" value={preferences.returnReminder.afterDays} onChange={(event) => update((current) => ({ ...current, returnReminder: { ...current.returnReminder, afterDays: Math.min(30, Math.max(3, Number(event.target.value) || 7)) } }))} />
          </label>
          <label className="setting-field">Time
            <input type="time" value={preferences.returnReminder.schedule.time} onChange={(event) => updateScheduleTime('returnReminder', event.target.value)} />
          </label>
          <p className="fineprint left-copy">Finite and non-shaming. Maximum {preferences.returnReminder.maxAttempts} gentle return reminder, then stop.</p>
        </section>
        </ReminderGroup>

        <ReminderGroup title="Post-program reminder" enabled={preferences.postProgramReminder.enabled}>
        <section className="setting-panel" aria-labelledby="post-program-title">
          <div className="status-row">
            <h2 id="post-program-title">Post-program reminder</h2>
            <button className="secondary" type="button" aria-pressed={preferences.postProgramReminder.enabled} onClick={() => update((current) => ({ ...current, postProgramReminder: { ...current.postProgramReminder, enabled: !current.postProgramReminder.enabled } }))}>{preferences.postProgramReminder.enabled ? 'On' : 'Off'}</button>
          </div>
          <label className="setting-field">Time
            <input type="time" value={preferences.postProgramReminder.schedule.time} onChange={(event) => updateScheduleTime('postProgramReminder', event.target.value)} />
          </label>
          <p className="fineprint left-copy">Only active after Day 28. It opens reusable practices, not another Day.</p>
        </section>
        </ReminderGroup>

        <section className="setting-panel" aria-labelledby="quiet-hours-title">
          <div className="status-row">
            <h2 id="quiet-hours-title">Quiet hours</h2>
            <button className="secondary" type="button" aria-pressed={preferences.quietHours.enabled} onClick={() => update((current) => ({ ...current, quietHours: { ...current.quietHours, enabled: !current.quietHours.enabled } }))}>{preferences.quietHours.enabled ? 'On' : 'Off'}</button>
          </div>
          <div className="button-grid two">
            <label className="setting-field">Start
              <input type="time" value={preferences.quietHours.start} onChange={(event) => update((current) => ({ ...current, quietHours: { ...current.quietHours, start: event.target.value } }))} />
            </label>
            <label className="setting-field">End
              <input type="time" value={preferences.quietHours.end} onChange={(event) => update((current) => ({ ...current, quietHours: { ...current.quietHours, end: event.target.value } }))} />
            </label>
          </div>
          <p className="fineprint left-copy">Overnight ranges are supported. If a reminder falls inside quiet hours, the rule is simple: delay until quiet hours end.</p>
        </section>
      </div>
    </Disclosure>
  )
}

function LocalDataControls({ onClearProgramData, onClearToolData, onClearAllLocalData }: { onClearProgramData: () => void; onClearToolData: () => void; onClearAllLocalData: () => void }) {
  return (
    <Disclosure className="local-data-controls" defaultOpen>
      <summary>Local prototype data controls</summary>
      <p className="fineprint left-copy">Choose what to clear from this browser. Each action asks for confirmation and cannot be undone.</p>
      <div className="button-grid three">
        <button className="secondary" type="button" onClick={onClearProgramData}>Clear progress + reflections</button>
        <button className="secondary" type="button" onClick={onClearToolData}>Clear Toolbox preferences</button>
        <button className="secondary danger" type="button" onClick={onClearAllLocalData}>Clear all local prototype data</button>
      </div>
    </Disclosure>
  )
}

function PersonalizedShortcutCard({ recommendation, onOpen }: { recommendation: PersonalizationRecommendation; onOpen: (recommendation: PersonalizationRecommendation) => void }) {
  return (
    <button className="list-card personalized-card" type="button" onClick={() => onOpen(recommendation)} aria-label={`Open ${recommendation.label}. ${recommendation.reason}`}>
      <span>{recommendation.label}</span>{' '}
      <small>{recommendation.badge ? `${recommendation.badge} · ` : ''}{recommendation.reason}</small>
    </button>
  )
}

function ResetExperience({ view, selectedNeedId, activeToolId, activeToolContext, toolState, personalization, onSelectNeed, onSetView, onStartTool, onCompleteTool, onToggleFavourite, onHome, onSupport }: { view: ResetView; selectedNeedId: NeedId | null; activeToolId: ToolId | null; activeToolContext: ToolContext; toolState: ToolState; personalization: PersonalizationBundle; onSelectNeed: (needId: NeedId) => void; onSetView: (view: ResetView) => void; onStartTool: (toolId: ToolId, context: ToolContext) => void; onCompleteTool: (toolId: ToolId) => void; onToggleFavourite: (toolId: ToolId) => void; onHome: () => void; onSupport: () => void }) {
  const selectedNeed = getResetNeed(selectedNeedId)
  const activeTool = getCanonicalTool(activeToolId)
  const primaryNeeds = resetNeeds.slice(0, 5)
  const secondaryNeeds = resetNeeds.slice(5)

  if (view === 'tool') {
    if (!activeTool) return <ToolError onToolbox={() => onSetView('toolbox')} onReset={() => onSetView('landing')} />
    return <ToolRunner tool={activeTool} context={activeToolContext} favourite={toolState.favouriteToolIds.includes(activeTool.id)} onToggleFavourite={onToggleFavourite} onComplete={onCompleteTool} onBack={() => onSetView(activeToolContext === 'toolbox' ? 'toolbox' : 'recommendation')} onHome={onHome} />
  }

  if (view === 'complete') {
    const completedTool = getCanonicalTool(activeToolId)
    return <ToolCompletion tool={completedTool} onUseAgain={() => completedTool && onStartTool(completedTool.id, activeToolContext)} onToolbox={() => onSetView('toolbox')} onHome={onHome} />
  }

  if (view === 'toolbox') {
    return <Toolbox toolState={toolState} personalization={personalization} onStartTool={onStartTool} onToggleFavourite={onToggleFavourite} onReset={() => onSetView('landing')} />
  }

  if (view === 'recommendation' && selectedNeed) {
    const recommendedIds = [selectedNeed.primaryToolId, ...selectedNeed.alternativeToolIds]
    const tools = recommendedIds.map((id) => getCanonicalTool(id)).filter((tool): tool is CanonicalTool => Boolean(tool))
    if (tools.length === 0) return <ToolError onToolbox={() => onSetView('toolbox')} onReset={() => onSetView('landing')} />
    return (
      <section className="stack page-enter" aria-labelledby="reset-recommendation-title">
        <button className="text-button left" type="button" onClick={() => onSetView('landing')}>← Choose another need</button>
        <div>
          <p className="eyebrow">RESET / {selectedNeed.label}</p>
          <h1 id="reset-recommendation-title">Try this first.</h1>
          <p className="muted">Simple, transparent routing from your selected need to source-backed tools. This is not a diagnosis.</p>
        </div>
        <ToolCard tool={tools[0]} primaryLabel="Start this tool" favourite={toolState.favouriteToolIds.includes(tools[0].id)} onStart={() => onStartTool(tools[0].id, 'reset')} onToggleFavourite={() => onToggleFavourite(tools[0].id)} highlighted />
        {tools.length > 1 && (
          <section className="tool-list" aria-label="Alternative tools">
            <p className="eyebrow">Other options</p>
            {tools.slice(1).map((tool) => <ToolCard key={tool.id} tool={tool} favourite={toolState.favouriteToolIds.includes(tool.id)} onStart={() => onStartTool(tool.id, 'reset')} onToggleFavourite={() => onToggleFavourite(tool.id)} />)}
          </section>
        )}
        <div className="button-grid two">
          <button className="secondary" type="button" onClick={() => onSetView('toolbox')}>Browse Toolbox</button>
          <button className="secondary" type="button" onClick={onSupport}>Support</button>
        </div>
      </section>
    )
  }

  return (
    <section className="stack page-enter" aria-labelledby="reset-title">
      <div>
        <p className="eyebrow">RESET</p>
        <h1 id="reset-title">What do you need right now?</h1>
        <p className="muted">Choose what fits best. RESET routes you to a small set of source-backed options.</p>
      </div>
      <section className="need-grid" aria-label="Primary RESET need choices">
        {primaryNeeds.map((need) => (
          <button className="need-card" type="button" key={need.id} onClick={() => onSelectNeed(need.id)}>
            <span>{need.label}</span>{' '}
            <small>{need.helper}</small>
          </button>
        ))}
      </section>
      {secondaryNeeds.length > 0 && (
        <Disclosure className="calm-disclosure compact-disclosure">
          <summary>
            <span>More RESET needs</span>{' '}
            <small>{secondaryNeeds.length} more source-backed routes.</small>
          </summary>
          <section className="need-grid nested" aria-label="Additional RESET need choices">
            {secondaryNeeds.map((need) => (
              <button className="need-card" type="button" key={need.id} onClick={() => onSelectNeed(need.id)}>
                <span>{need.label}</span>{' '}
                <small>{need.helper}</small>
              </button>
            ))}
          </section>
        </Disclosure>
      )}
      {personalization.model.shortcut?.toolId && (
        <article className="notice-card" aria-label="Optional saved shortcut">
          <strong>{personalization.model.shortcut.badge === 'FAVOURITE' ? 'Saved shortcut' : 'Recent shortcut'}</strong>{' '}
          <span>{personalization.model.shortcut.label} · {personalization.model.shortcut.reason} RESET still starts with your current need.</span>{' '}
          <button className="secondary" type="button" onClick={() => onStartTool(personalization.model.shortcut!.toolId!, personalization.model.shortcut!.badge === 'FAVOURITE' ? 'favourite' : 'recent')}>Open shortcut</button>
        </article>
      )}
      <div className="button-grid two">
        <button className="secondary" type="button" onClick={() => onSetView('toolbox')}>Open Toolbox</button>
        <button className="secondary" type="button" onClick={onSupport}>Support</button>
      </div>
      <p className="fineprint left-copy">RESET is a wellness/self-regulation feature. It is not emergency response, therapy, diagnosis or medical treatment. Not approved clinical content.</p>
    </section>
  )
}

function Toolbox({ toolState, personalization, onStartTool, onToggleFavourite, onReset }: { toolState: ToolState; personalization: PersonalizationBundle; onStartTool: (toolId: ToolId, context: ToolContext) => void; onToggleFavourite: (toolId: ToolId) => void; onReset: () => void }) {
  const favouriteTools = toolState.favouriteToolIds.map((id) => getCanonicalTool(id)).filter((tool): tool is CanonicalTool => Boolean(tool))
  const recentTools = toolState.recentToolIds.map((id) => getCanonicalTool(id)).filter((tool): tool is CanonicalTool => Boolean(tool))
  const currentWeekTools = personalization.model.currentWeekTools

  return (
    <section className="stack page-enter" aria-labelledby="toolbox-title">
      <button className="text-button left" type="button" onClick={onReset}>← Back to RESET</button>
      <div>
        <p className="eyebrow">Toolbox</p>
        <h1 id="toolbox-title">Choose a practice.</h1>
        <p className="muted">Source-backed tools from the 28-Day Journey. Standalone use does not complete a program day.</p>
      </div>
      {!personalization.context.programComplete && currentWeekTools.length > 0 && (
        <ToolShortcutSection title={`From Week ${personalization.context.currentWeek}`} empty="Current-week tools will appear when available." tools={currentWeekTools} context="toolbox" toolState={toolState} onStartTool={onStartTool} onToggleFavourite={onToggleFavourite} />
      )}
      <Disclosure className="calm-disclosure compact-disclosure">
        <summary>
          <span>Saved + recent practices</span>{' '}
          <small>Quick returns when you have them.</small>
        </summary>
        <div className="disclosure-stack">
          <ToolShortcutSection title="Favourites" empty="No favourites yet. Add one from any tool card." tools={favouriteTools} context="favourite" toolState={toolState} onStartTool={onStartTool} onToggleFavourite={onToggleFavourite} />
          <ToolShortcutSection title="Recent" empty="Recent tools will appear here after you start one." tools={recentTools} context="recent" toolState={toolState} onStartTool={onStartTool} onToggleFavourite={onToggleFavourite} />
        </div>
      </Disclosure>
      {personalization.context.programComplete && (
        <article className="notice-card" aria-label="Post-program toolbox note">
          <strong>After Day 28</strong>{' '}
          <span>The full Toolbox stays open for maintenance. There is no Day 29 or endless streak to chase.</span>
        </article>
      )}
      <Disclosure className="calm-disclosure browse-tools-disclosure">
        <summary>
          <span>Browse all Toolbox practices</span>{' '}
          <small>All 10 canonical tools, grouped by purpose.</small>
        </summary>
        <div className="disclosure-stack">
          {toolCategories.map((category) => {
            const tools = canonicalTools.filter((tool) => tool.category === category)
            if (tools.length === 0) return null
            return (
              <section className="tool-list" key={category} aria-labelledby={`tool-category-${category}`}>
                <p className="eyebrow" id={`tool-category-${category}`}>{category}</p>
                {tools.map((tool) => <ToolCard key={tool.id} tool={tool} favourite={toolState.favouriteToolIds.includes(tool.id)} onStart={() => onStartTool(tool.id, 'toolbox')} onToggleFavourite={() => onToggleFavourite(tool.id)} />)}
              </section>
            )
          })}
        </div>
      </Disclosure>
    </section>
  )
}

function ToolShortcutSection({ title, empty, tools, context, toolState, onStartTool, onToggleFavourite }: { title: string; empty: string; tools: CanonicalTool[]; context: ToolContext; toolState: ToolState; onStartTool: (toolId: ToolId, context: ToolContext) => void; onToggleFavourite: (toolId: ToolId) => void }) {
  return (
    <section className="tool-list" aria-label={title}>
      <p className="eyebrow">{title}</p>
      {tools.length === 0 ? <article className="empty-card">{empty}</article> : tools.map((tool) => <ToolCard key={tool.id} tool={tool} favourite={toolState.favouriteToolIds.includes(tool.id)} onStart={() => onStartTool(tool.id, context)} onToggleFavourite={() => onToggleFavourite(tool.id)} />)}
    </section>
  )
}

function ToolCard({ tool, favourite, onStart, onToggleFavourite, primaryLabel = 'Start', highlighted = false }: { tool: CanonicalTool; favourite: boolean; onStart: () => void; onToggleFavourite: () => void; primaryLabel?: string; highlighted?: boolean }) {
  const { day, section } = getToolSourceSection(tool)
  return (
    <article className={`tool-card ${highlighted ? 'highlighted' : ''}`} aria-labelledby={`${tool.id}-title`}>
      <div className="status-row">
        <p className="eyebrow">{tool.category}</p>
        <span className="status-pill">Day {day?.day ?? tool.sourceRefs[0].day}</span>
      </div>
      <h2 id={`${tool.id}-title`}>{tool.canonicalName}</h2>
      <p>{tool.purpose}</p>
      <p className="fineprint left-copy">{tool.duration ? `${tool.duration} · ` : ''}{toolKindForAccessibility(section?.kind ?? 'do')} · {tool.interactionType}</p>
      <div className="button-grid two">
        <button className="primary" type="button" onClick={onStart}>{primaryLabel}</button>
        <button className="secondary" type="button" aria-pressed={favourite} aria-label={`${favourite ? 'Remove' : 'Add'} ${tool.canonicalName} ${favourite ? 'from' : 'to'} favourites`} onClick={onToggleFavourite}>{favourite ? 'Saved' : 'Favourite'}</button>
      </div>
    </article>
  )
}

function ToolRunner({ tool, context, favourite, onToggleFavourite, onComplete, onBack, onHome }: { tool: CanonicalTool; context: ToolContext; favourite: boolean; onToggleFavourite: (toolId: ToolId) => void; onComplete: (toolId: ToolId) => void; onBack: () => void; onHome: () => void }) {
  const { day, section } = getToolSourceSection(tool)
  const preview = section?.content.slice(0, 8) ?? ['Tool content is temporarily unavailable.']
  const remaining = section?.content.slice(8) ?? []

  return (
    <section className="stack page-enter" aria-labelledby="tool-runner-title">
      <button className="text-button left" type="button" onClick={onBack}>← Back</button>
      <article className="lesson-card tool-runner">
        <div className="status-row">
          <p className="eyebrow">{context === 'day' ? 'Day-linked canonical tool' : 'Standalone tool'}</p>
          <span className="status-pill">{day ? `Source Day ${day.day}` : 'Source issue'}</span>
        </div>
        <h1 id="tool-runner-title">{tool.canonicalName}</h1>
        <p>{tool.purpose}</p>
        <div className="source-banner">
          <strong>Source-backed</strong>{' '}
          <span>{day?.sourceLocation ?? 'Missing source location'} · {section?.label ?? 'Missing source section'}</span>
        </div>
        <div className="source-copy">
          {preview.map((line, index) => <p key={`${tool.id}-preview-${index}`}>{formatProgramText(line)}</p>)}
          {remaining.length > 0 && (
            <Disclosure>
              <summary>Read full source instructions ({remaining.length} more lines)</summary>
              {remaining.map((line, index) => <p key={`${tool.id}-remaining-${index}`}>{formatProgramText(line)}</p>)}
            </Disclosure>
          )}
        </div>
        <p className="fineprint left-copy">Standalone tool completion is separate from Day completion. This will not change currentDay or completedDays.</p>
        <div className="button-grid two">
          <button className="primary" type="button" onClick={() => onComplete(tool.id)}>Done</button>
          <button className="secondary" type="button" onClick={() => onToggleFavourite(tool.id)} aria-pressed={favourite}>{favourite ? 'Remove favourite' : 'Favourite'}</button>
        </div>
        <button className="secondary" type="button" onClick={onHome}>Back Home</button>
      </article>
    </section>
  )
}

function ToolCompletion({ tool, onUseAgain, onToolbox, onHome }: { tool?: CanonicalTool; onUseAgain: () => void; onToolbox: () => void; onHome: () => void }) {
  return (
    <section className="stack page-enter" aria-labelledby="tool-complete-title">
      <article className="hero-card pale">
        <p className="eyebrow">Tool complete</p>
        <h1 id="tool-complete-title">Done for now.</h1>
        <p>{tool ? `${tool.canonicalName} is complete as a standalone tool. Program Day progress was not changed.` : 'The tool session is complete.'}</p>
        <div className="button-grid two">
          <button className="primary" type="button" onClick={onUseAgain} disabled={!tool}>Use again</button>
          <button className="secondary" type="button" onClick={onToolbox}>Back to Toolbox</button>
        </div>
        <button className="secondary" type="button" onClick={onHome}>Back Home</button>
      </article>
    </section>
  )
}

function ToolError({ onToolbox, onReset }: { onToolbox: () => void; onReset: () => void }) {
  return (
    <section className="stack page-enter" aria-labelledby="tool-error-title">
      <article className="notice-card">
        <p className="eyebrow">Tool unavailable</p>{' '}
        <h1 id="tool-error-title">This tool cannot be opened right now.</h1>{' '}
        <p>No unsupported or invented replacement was shown. Choose another need or browse the Toolbox.</p>{' '}
        <div className="button-grid two">
          <button className="primary" type="button" onClick={onReset}>Choose need</button>
          <button className="secondary" type="button" onClick={onToolbox}>Toolbox</button>
        </div>
      </article>
    </section>
  )
}

function MyPath({ progress, progressModel, toolState, selectedDay, dayDetailOpen, draftReflections, onSelectDay, onOpenDayDetail, onCloseDayDetail, onReset, onSupport, onStartTool, onToggleFavourite, onToggleSection, onDraftReflection, onSaveReflection, onDeleteReflection, onToggleRoadmapTask, onCompleteDay }: { progress: ProgramProgress; progressModel: ProgressViewModel; toolState: ToolState; selectedDay: number; dayDetailOpen: boolean; draftReflections: Record<string, string>; onSelectDay: (day: number) => void; onOpenDayDetail: () => void; onCloseDayDetail: () => void; onReset: () => void; onSupport: () => void; onStartTool: (toolId: ToolId, context: ToolContext) => void; onToggleFavourite: (toolId: ToolId) => void; onToggleSection: (day: number, sectionId: string) => void; onDraftReflection: (key: string, value: string) => void; onSaveReflection: (key: string, value: string) => void; onDeleteReflection: (key: string) => void; onToggleRoadmapTask: (day: number, taskId: string) => void; onCompleteDay: (day: number) => void }) {
  const selected = getProgramDay(selectedDay)
  const completedSections = getCompletedSections(progress, selected.day)
  const insights = useMemo(() => resolveProgressInsights(progressModel), [progressModel])
  const permittedProgressDataCount = progressDataInventory.filter((item) => item.permittedUse !== 'DO_NOT_USE').length
  const dayDetailRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!dayDetailOpen) return
    dayDetailRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' })
  }, [dayDetailOpen, selected.day])

  return (
    <section className="stack page-enter" aria-labelledby="path-title">
      <div>
        <p className="eyebrow">My Path</p>
        <h1 id="path-title">Progress + Insights</h1>
        <p className="muted">Meaningful progress, reflection and continuity — zero pressure. Missed days never reset program progress. See your next step first; details and the full source-backed day stay available when you ask for them.</p>
      </div>

      <ProgressSummary model={progressModel} selectedDay={selected} onOpenDayDetail={onOpenDayDetail} onReset={onReset} />

      {!dayDetailOpen && (
        <article className="selected-day-card" aria-labelledby="selected-day-title">
          <p className="eyebrow">Selected day</p>
          <h2 id="selected-day-title">Day {selected.day}: {selected.title}</h2>
          <p>{selected.purpose}</p>
          <p className="fineprint left-copy">{completedSections.length} of {selected.sections.length} sections marked done. Full source-backed content opens only when you choose to review it.</p>
          <button className="primary" type="button" onClick={onOpenDayDetail}>{progress.completedDays.includes(selected.day) ? `Review Day ${selected.day}` : `Open Day ${selected.day}`}</button>
        </article>
      )}

      {dayDetailOpen && (
        <div ref={dayDetailRef} className="stack" aria-live="polite">
          <button className="text-button left" type="button" onClick={onCloseDayDetail}>← Back to path overview</button>
          <DayExperience day={selected} progress={progress} completedSections={completedSections} draftReflections={draftReflections} onStartTool={onStartTool} onToggleSection={onToggleSection} onDraftReflection={onDraftReflection} onSaveReflection={onSaveReflection} onDeleteReflection={onDeleteReflection} onToggleRoadmapTask={onToggleRoadmapTask} onCompleteDay={onCompleteDay} onSupport={onSupport} />
        </div>
      )}

      <Disclosure className="calm-disclosure">
        <summary>
          <span>Path map + insights</span>{' '}
          <small>Weeks, day picker and descriptive progress notes.</small>
        </summary>
        <div className="disclosure-stack">
          <ProgressInsights insights={insights} />
          <WeekJourney model={progressModel} />
          <DayProgressGrid model={progressModel} selectedDay={selected.day} onSelectDay={onSelectDay} />
        </div>
      </Disclosure>

      <Disclosure className="calm-disclosure">
        <summary>
          <span>Practices + private reflections</span>{' '}
          <small>Saved tools and local-only reflection review.</small>
        </summary>
        <div className="disclosure-stack">
          <SavedPracticeSummary model={progressModel} toolState={toolState} onStartTool={onStartTool} onToggleFavourite={onToggleFavourite} />
          <ReflectionReview model={progressModel} savedReflections={progress.savedReflections} />
        </div>
      </Disclosure>

      <Disclosure className="calm-disclosure compact-disclosure">
        <summary>
          <span>Progress privacy</span>{' '}
          <small>What this prototype uses and does not use.</small>
        </summary>
        <div className="disclosure-stack">
          <article className="notice-card compact" aria-label="Progress privacy scope">
            <strong>Progress uses minimal data</strong>{' '}
            <span>{permittedProgressDataCount} permitted/caution signal groups are used for display. Reflection text is review-only and never interpreted into insights.</span>
          </article>
          {progressModel.dataIntegrityNotes.length > 0 && <ProgressIntegrityNotes notes={progressModel.dataIntegrityNotes} />}
        </div>
      </Disclosure>
    </section>
  )
}

function ProgressSummary({ model, selectedDay, onOpenDayDetail, onReset }: { model: ProgressViewModel; selectedDay: ProgramDay; onOpenDayDetail: () => void; onReset: () => void }) {
  return (
    <article className="hero-card pale program-overview progress-summary" aria-labelledby="progress-summary-title">
      <div className="status-row">
        <p className="eyebrow">Source-backed program · Your path</p>
        <span className="status-pill">{model.programComplete ? '28-Day journey complete' : model.currentWeekLabel}</span>
      </div>
      <h2 id="progress-summary-title">{model.primarySummary}</h2>
      <p>{model.programComplete ? 'The full 28-Day Journey is complete. This does not mean recovery is finished; it means the source-backed program path is complete and reusable.' : `${model.daysCompleted} of 28 Days complete. Next: ${model.nextActionLabel}.`}</p>
      <div className="summary-metrics" aria-label="Progress summary metrics">
        <span><strong>Week</strong>{' '}{model.programComplete ? '4 complete' : `${model.currentWeek} · ${model.currentWeekTheme}`}</span>
        <span><strong>Day</strong>{' '}{model.programComplete ? '28 / 28' : `${model.currentDay} / 28`}</span>
        <span><strong>Small Wins</strong>{' '}{model.smallWins.today.completed}/{model.smallWins.today.total} today</span>
        <span><strong>This Week</strong>{' '}{model.smallWins.week.completed}/{model.smallWins.week.total}</span>
        <span><strong>Journey</strong>{' '}{model.smallWins.program.completed}/{model.smallWins.program.total}</span>
      </div>
      <div className="button-grid two">
        <button className="primary" type="button" onClick={onOpenDayDetail}>{model.programComplete ? `Review Day ${selectedDay.day}` : `Open Day ${selectedDay.day}`}</button>
        <button className="secondary" type="button" onClick={onReset}>Open RESET</button>
      </div>
      <p className="fineprint left-copy">Progress shows movement through the program. It is not a wellness score, clinical rating or recovery percentage.</p>
    </article>
  )
}

function ProgressInsights({ insights }: { insights: ProgressInsight[] }) {
  const visible = insights.slice(0, 4)
  return (
    <section className="progress-panel" aria-labelledby="insights-title">
      <div className="status-row">
        <p className="eyebrow" id="insights-title">Insights</p>
        <span className="status-pill">Descriptive only</span>
      </div>
      {visible.map((insight) => (
        <article className="insight-card" key={insight.insightId}>
          <p>{insight.message}</p>
          <small>{insight.confidenceLimit}</small>
        </article>
      ))}
    </section>
  )
}

function WeekJourney({ model }: { model: ProgressViewModel }) {
  return (
    <section className="week-map progress-panel" aria-labelledby="week-journey-title">
      <p className="eyebrow" id="week-journey-title">Four-week journey</p>
      {model.weekProgress.map((week) => (
        <article className={`week-card state-${week.state}`} key={week.week}>
          <div className="status-row">
            <p className="eyebrow">Week {week.week} · Days {week.dayRange}</p>
            <span className="status-pill">{week.state}</span>
          </div>
          <h3>{week.theme}</h3>
          <div className="section-progress" aria-label={`Week ${week.week}: ${week.completedDays} of ${week.totalDays} days complete`}>
            <span style={{ width: `${Math.max(week.completedDays === 0 ? 0 : 8, Math.round((week.completedDays / week.totalDays) * 100))}%` }} />
          </div>
          <small>{week.completedDays} of {week.totalDays} Days complete</small>
        </article>
      ))}
    </section>
  )
}

function DayProgressGrid({ model, selectedDay, onSelectDay }: { model: ProgressViewModel; selectedDay: number; onSelectDay: (day: number) => void }) {
  return (
    <section className="progress-panel" aria-labelledby="day-progress-title">
      <p className="eyebrow" id="day-progress-title">Day-level progress</p>
      <div className="day-strip day-progress-grid" aria-label="28-Day progress. Complete, current, available and upcoming states are shown with text labels.">
        {model.dayProgress.map((day) => (
          <button className={`${selectedDay === day.day ? 'day active' : 'day'} state-${day.state}`} type="button" key={day.day} onClick={() => onSelectDay(day.day)} aria-label={`Day ${day.day}: ${day.title}. ${day.state}. ${day.completedSections} of ${day.totalSections} sections marked done.`}>
            <span>{day.day}</span>{' '}
            <small>{day.state}</small>
          </button>
        ))}
      </div>
      <p className="fineprint left-copy">No failed, missed or late state is used for normal progression.</p>
    </section>
  )
}

function SavedPracticeSummary({ model, toolState, onStartTool, onToggleFavourite }: { model: ProgressViewModel; toolState: ToolState; onStartTool: (toolId: ToolId, context: ToolContext) => void; onToggleFavourite: (toolId: ToolId) => void }) {
  const favouriteTools = toolState.favouriteToolIds.map((id) => getCanonicalTool(id)).filter((tool): tool is CanonicalTool => Boolean(tool))
  const learnedTools = model.learnedToolIds.slice(0, 3).map((id) => getCanonicalTool(id)).filter((tool): tool is CanonicalTool => Boolean(tool))
  return (
    <section className="progress-panel" aria-labelledby="practice-title">
      <div className="status-row">
        <p className="eyebrow" id="practice-title">Your practice</p>
        <span className="status-pill">Practiced, not mastered</span>
      </div>
      <p className="muted">Tools shown here are source-backed practices you completed, saved or can return to. This is not a mastery score.</p>
      <ToolShortcutSection title="Saved tools" empty="No saved tools yet. Favourite a practice when it feels useful." tools={favouriteTools} context="favourite" toolState={toolState} onStartTool={onStartTool} onToggleFavourite={onToggleFavourite} />
      <ToolShortcutSection title="Practices available from your path" empty="Complete program sections to see reusable practices here." tools={learnedTools} context="toolbox" toolState={toolState} onStartTool={onStartTool} onToggleFavourite={onToggleFavourite} />
    </section>
  )
}

function ReflectionReview({ model, savedReflections }: { model: ProgressViewModel; savedReflections: Record<string, string> }) {
  return (
    <section className="progress-panel" aria-labelledby="reflection-review-title">
      <div className="status-row">
        <p className="eyebrow" id="reflection-review-title">Reflections</p>
        <span className="status-pill">Private review</span>
      </div>
      <p className="muted">Reflection text is not shown on Home and is not analyzed. Open an item only when you want to review your own writing.</p>
      {model.reflectionReferences.length === 0 ? <article className="empty-card">Saved reflections will appear here by Day when you choose to save them.</article> : model.reflectionReferences.map((reflection) => (
        <Disclosure className="reflection-review" key={reflection.key}>
          <summary>{reflection.title} · {reflection.sectionLabel}</summary>
          <p className="fineprint left-copy">{reflection.previewLabel}</p>
          <p>{savedReflections[reflection.key]}</p>
        </Disclosure>
      ))}
    </section>
  )
}

function ProgressIntegrityNotes({ notes }: { notes: string[] }) {
  return (
    <section className="notice-card" aria-label="Progress data notes">
      <strong>Progress data handled carefully</strong>{' '}
      {notes.map((note) => <span key={note}>{note}{' '}</span>)}
    </section>
  )
}

function DayExperience({ day, progress, completedSections, draftReflections, onStartTool, onToggleSection, onDraftReflection, onSaveReflection, onDeleteReflection, onToggleRoadmapTask, onCompleteDay, onSupport }: { day: ProgramDay; progress: ProgramProgress; completedSections: string[]; draftReflections: Record<string, string>; onStartTool: (toolId: ToolId, context: ToolContext) => void; onToggleSection: (day: number, sectionId: string) => void; onDraftReflection: (key: string, value: string) => void; onSaveReflection: (key: string, value: string) => void; onDeleteReflection: (key: string) => void; onToggleRoadmapTask: (day: number, taskId: string) => void; onCompleteDay: (day: number) => void; onSupport: () => void }) {
  const roadmap = getRoadmapForDay(day.day)
  if (roadmap) {
    return <DayRoadmapExperience key={roadmap.day} roadmap={roadmap} progress={progress} draftReflections={draftReflections} onDraftReflection={onDraftReflection} onSaveReflection={onSaveReflection} onDeleteReflection={onDeleteReflection} onToggleRoadmapTask={onToggleRoadmapTask} onSupport={onSupport} />
  }

  const complete = progress.completedDays.includes(day.day)
  const completedSectionSet = new Set(completedSections)
  const progressText = `${completedSections.length} of ${day.sections.length} sections marked done`
  const canComplete = completedSections.length > 0 || complete
  const dayTools = canonicalTools.filter((tool) => tool.sourceRefs.some((ref) => ref.day === day.day))

  return (
    <article className="lesson-card day-experience" aria-labelledby="day-title">
      <div className="status-row">
        <p className="eyebrow">Day {day.day} · Week {day.week} of 4</p>
        <span className="status-pill">{complete ? 'Complete' : progressText}</span>
      </div>
      <h2 id="day-title">{day.title}</h2>
      <p className="purpose">{day.purpose}</p>
      <div className="day-orientation" aria-label="Today progression">
        <span><strong>Now</strong>{' '}{complete ? 'Review when useful' : 'Work through one section at a time'}</span>
        <span><strong>Progress</strong>{' '}{progressText}</span>
        <span><strong>Next</strong>{' '}{complete ? 'Return to Toolbox or RESET' : 'Mark useful sections done'}</span>
      </div>
      <div className="source-banner">
        <strong>{day.sourceStatus === 'VERIFIED_FROM_DOCX' ? 'Source verified' : 'Requires verification'}</strong>{' '}
        <span>{day.sourceLocation}</span>
      </div>
      {prompt5SourceIssues.length > 0 && <p className="fineprint left-copy">Source issues flagged: {prompt5SourceIssues.join('; ')}</p>}

      {dayTools.length > 0 && (
        <section className="day-tool-links" aria-label="Source-backed tools from this day">
          <p className="eyebrow">Reusable from this day</p>
          {dayTools.map((tool) => <button className="mini-tool" type="button" key={tool.id} onClick={() => onStartTool(tool.id, 'day')}>{tool.canonicalName}</button>)}
          <small>Opening a canonical tool from here does not automatically complete this Day.</small>
        </section>
      )}

      <div className="section-progress" aria-label="Day section progress">
        <span style={{ width: `${Math.max(4, Math.round((completedSections.length / Math.max(1, day.sections.length)) * 100))}%` }} />
      </div>

      <div className="day-sections">
        {day.sections.map((section) => (
          <ProgramSectionCard key={section.id} day={day.day} section={section} done={completedSectionSet.has(section.id)} draftReflections={draftReflections} savedReflections={progress.savedReflections} onToggleSection={onToggleSection} onDraftReflection={onDraftReflection} onSaveReflection={onSaveReflection} onDeleteReflection={onDeleteReflection} />
        ))}
      </div>

      <section className="completion-card" aria-label="Complete day">
        <p className="eyebrow">Complete</p>
        <h3>{complete ? `Day ${day.day} complete.` : `Complete Day ${day.day}`}</h3>
        <p>{complete ? 'You can review this day without changing future progress.' : 'Opening a day does not complete it. Mark at least one source-backed section done, then complete intentionally.'}</p>
        <button className="primary" type="button" disabled={!canComplete || complete} onClick={() => onCompleteDay(day.day)}>{complete ? 'Already complete' : `Complete Day ${day.day}`}</button>
      </section>
    </article>
  )
}


function getTaskReflectionKey(task: RoadmapTask) {
  return `day-${task.day}:task-${task.id}`
}


function DayRoadmapExperience({ roadmap, progress, draftReflections, onDraftReflection, onSaveReflection, onDeleteReflection, onToggleRoadmapTask, onSupport }: { roadmap: DayRoadmap; progress: ProgramProgress; draftReflections: Record<string, string>; onDraftReflection: (key: string, value: string) => void; onSaveReflection: (key: string, value: string) => void; onDeleteReflection: (key: string) => void; onToggleRoadmapTask: (day: number, taskId: string) => void; onSupport: () => void }) {
  const [tasksOpen, setTasksOpen] = useState(false)
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null)
  const taskGroups = getChronologicalTaskGroups(roadmap)
  const completedTaskIds = getCompletedRoadmapTaskIds(progress.dayTaskProgress, roadmap.day)
  const completedSet = new Set(completedTaskIds)
  const roadmapStatus = deriveDayRoadmapStatus(roadmap, completedTaskIds)
  const nextTask = roadmapStatus.nextTask
  const roadmapElement = useRef<HTMLElement>(null)
  const closeTask = () => {
    roadmapElement.current?.querySelector<HTMLButtonElement>('.roadmap-task-card .inline-expansion > button[aria-expanded="true"], .end-of-day-card .inline-expansion > button[aria-expanded="true"]')?.focus({ preventScroll: true })
    setExpandedTaskId(null)
  }
  const taskExpansion = (task: RoadmapTask, label: ReactNode) => (
    <InlineExpansion open={expandedTaskId === task.id} onToggle={() => expandedTaskId === task.id ? closeTask() : setExpandedTaskId(task.id)} label={label} buttonClassName="task-row-trigger">
      <TaskDetail
        task={task}
        complete={completedSet.has(task.id)}
        progressLabel={roadmapStatus.progressLabel}
        nextTask={nextTask}
        reflectionKey={getTaskReflectionKey(task)}
        reflectionValue={draftReflections[getTaskReflectionKey(task)] ?? progress.savedReflections[getTaskReflectionKey(task)] ?? ''}
        savedReflection={progress.savedReflections[getTaskReflectionKey(task)]}
        draftReflections={draftReflections}
        savedReflections={progress.savedReflections}
        onDraftReflection={onDraftReflection}
        onSaveReflection={onSaveReflection}
        onDeleteReflection={onDeleteReflection}
        onMark={() => onToggleRoadmapTask(roadmap.day, task.id)}
        onOpenTask={setExpandedTaskId}
        onBack={closeTask}
      />
    </InlineExpansion>
  )

  return (
    <article ref={roadmapElement} className="lesson-card day-experience roadmap-experience master-day-experience" aria-labelledby="day-roadmap-title">
      <div className="status-row">
        <p className="eyebrow">Day {roadmap.day} · Week {roadmap.week} of 4</p>
        <span className="status-pill">{roadmapStatus.progressLabel}</span>
      </div>
      <h2 id="day-roadmap-title">Day {roadmap.day}: {roadmap.title}</h2>

      <section className="today-tasks" aria-label="Today’s Tasks">
        <InlineExpansion open={tasksOpen} onToggle={() => {
          if (tasksOpen) {
            roadmapElement.current?.querySelector<HTMLButtonElement>('.today-tasks > .inline-expansion > button')?.focus({ preventScroll: true })
            setExpandedTaskId(null)
          }
          setTasksOpen(!tasksOpen)
        }} label="Today’s Tasks">
          <p className="fineprint left-copy">Open a task for instructions. Mark it done when finished; you can undo it at any time.</p>
          {taskGroups.map(group => (
            <ActionGroup key={group.id} title={group.title} progress={`${group.tasks.filter(task => completedSet.has(task.id)).length}/${group.tasks.length}`} description="Follow each task’s original timing. Flexible activities can fit your day." tasks={group.tasks} completedSet={completedSet} currentTaskId={nextTask?.id ?? null} renderExpansion={taskExpansion} />
          ))}
          <section className="end-of-day-card" aria-label="Optional end-of-day reflection">
            <p className="fineprint left-copy">Optional · Separate from task totals</p>
            {taskExpansion(roadmap.reflection, 'Original End-of-Day Reflection')}
          </section>
        </InlineExpansion>
      </section>

      {roadmapStatus.dayComplete && (
        <article className="next-up-card complete" aria-label="Day complete">
          <p className="eyebrow">Day {roadmap.day} complete</p>
          <h4>All {roadmapStatus.requiredCount} Small Wins are complete.</h4>
          <p>RESET, Toolbox and the original reflection remain available without adding extra wins.</p>
        </article>
      )}
      <SmallWinsMeter roadmap={roadmap} status={roadmapStatus} />
      <Disclosure className="day-intro-card">
        <summary>About Day {roadmap.day}</summary>
        <h3>Objective</h3>
        <p>{formatProgramText(roadmap.purpose)}</p>
        {roadmap.whatToExpect.length > 0 && (
          <Disclosure>
            <summary>What to expect</summary>
            <ul className="instruction-list">{roadmap.whatToExpect.map((item) => <li key={item}>{formatProgramText(item)}</li>)}</ul>
          </Disclosure>
        )}
      </Disclosure>
      {roadmap.dailyReminder.length > 0 && (
        <section className="notice-card compact daily-reminder-card" aria-label="Daily reminder">
          <strong>Daily Reminder</strong>{' '}
          {roadmap.dailyReminder.map((line) => <span key={line}>{formatProgramText(line)}{' '}</span>)}
        </section>
      )}
      <FeelingStuckPanel onSupport={onSupport} />
      <Disclosure className="source-banner roadmap-source">
        <summary>Program source</summary>{' '}
        <p>{roadmap.sourceReference}</p>{' '}
        <p>Daily activities remain day-specific source curriculum. The first action uses the owner’s updated instructions. Feeling Stuck, RESET and Toolbox do not affect Small Wins.</p>
      </Disclosure>
    </article>
  )
}

function SmallWinsMeter({ roadmap, status }: { roadmap: DayRoadmap; status: ReturnType<typeof deriveDayRoadmapStatus> }) {
  const percent = Math.round((status.completedRequiredCount / roadmap.expectedWins.total) * 100)
  return (
    <section className="small-wins-card" aria-label={`Today's Small Wins ${status.completedRequiredCount} of ${status.requiredCount}`}>
      <div className="status-row">
        <div>
          <p className="eyebrow">My Small Wins</p>
          <h3>Today: {status.completedRequiredCount}/{status.requiredCount}</h3>
        </div>
        <span className="status-pill">Actions, not recovery score</span>
      </div>
      <div className="section-progress" aria-hidden="true"><span style={{ width: `${Math.max(status.completedRequiredCount === 0 ? 0 : 6, percent)}%` }} /></div>
      <div className="summary-metrics small-win-metrics">
        {getChronologicalTaskGroups(roadmap).map(group => (
          <span key={group.id}><strong>{group.title}</strong>{' '}{group.tasks.filter(task => status.completedTaskIds.includes(task.id)).length}/{group.tasks.length}</span>
        ))}
      </div>
      <p className="fineprint left-copy">Weekly target: {roadmap.expectedWins.weekly} possible Small Wins. Full 28-day journey: {roadmap.expectedWins.program} possible Small Wins. No streaks, rankings, guilt or penalties.</p>
    </section>
  )
}

function ActionGroup({ title, progress, description, tasks, completedSet, currentTaskId, renderExpansion }: { title: string; progress: string; description: string; tasks: RoadmapTask[]; completedSet: Set<string>; currentTaskId: string | null; renderExpansion: (task: RoadmapTask, label: ReactNode) => ReactNode }) {
  return (
    <section className="roadmap-panel action-group" aria-labelledby={`${slugForId(title)}-title`}>
      <div className="status-row">
        <h3 id={`${slugForId(title)}-title`}>{title}</h3>
        <span className="status-pill">{progress}</span>
      </div>
      <p className="fineprint left-copy">{description}</p>
      <div className="roadmap-timeline" aria-label={`${title} actions`}>
        {tasks.map((task) => (
          <article key={task.id} data-task-id={task.id} className={`roadmap-task-card ${completedSet.has(task.id) ? 'complete' : ''} ${currentTaskId === task.id ? 'current' : ''}`} aria-label={task.title}>
            {renderExpansion(task, <span className="task-row-label"><span>{task.title}</span>{' '}<small>{completedSet.has(task.id) ? '✓ Done' : '○ Not done'} · {task.timingLabel}</small></span>)}
          </article>
        ))}
      </div>
    </section>
  )
}

function slugForId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function FeelingStuckPanel({ onSupport }: { onSupport: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const closeChoice = () => {
    document.querySelector<HTMLButtonElement>('.stuck-options button[aria-expanded="true"]')?.focus({ preventScroll: true })
    setSelectedId(null)
  }
  return (
    <section className="feeling-stuck-card" aria-labelledby="feeling-stuck-title">
      <div className="status-row">
        <div>
          <p className="eyebrow">Available anytime</p>
          <h3 id="feeling-stuck-title">Feeling Stuck?</h3>
        </div>
        <span className="status-pill">Optional · 0 wins</span>
      </div>
      <p className="muted">Choose what fits. This does not affect completion, Small Wins, RESET history or private reflections.</p>
      <div className="stuck-options" aria-label="Feeling Stuck choices">
        {feelingStuckOptions.map((option) => (
          <InlineExpansion key={option.id} open={selectedId === option.id} label={option.label} buttonClassName={selectedId === option.id ? 'secondary active-choice' : 'secondary'} onToggle={() => setSelectedId((current) => current === option.id ? null : option.id)}>
            <article className="stuck-response">
              <h4>UNDERSTAND</h4>
              <p>{option.understand}</p>
              <h4>TRY THIS</h4>
              <p>{option.tryThis}</p>
              <h4>ONE SMALL STEP</h4>
              <p>{option.oneSmallStep}</p>
              {option.supportNote && <p className="fineprint left-copy">{option.supportNote}</p>}
              <div className="button-grid two">
                <button className="secondary" type="button" onClick={onSupport}>Open Support</button>
                <button className="secondary" type="button" onClick={closeChoice}>Return to choices</button>
              </div>
            </article>
          </InlineExpansion>
        ))}
      </div>
    </section>
  )
}

function getWritingFieldKey(baseKey: string, index: number) {
  return `${baseKey}:field-${index + 1}`
}

function isAffirmationTask(task: RoadmapTask) {
  return /Affirmations/i.test(task.title)
}

function AffirmationCards() {
  return (
    <section className="affirmation-display" aria-label="Mirror affirmation repetition sequence">
      {activationAffirmations.map((affirmation) => (
        <article className="affirmation-card" key={affirmation.countLabel}>
          <span className="affirmation-count">{affirmation.countLabel}</span>
          <div>
            <p className="eyebrow">{affirmation.label} · {affirmation.repeat}</p>
            <p className="affirmation-text">“{affirmation.text}”</p>
          </div>
        </article>
      ))}
    </section>
  )
}

function TaskWritingFields({ reflectionKey, labels, examples, draftReflections, savedReflections, onDraftReflection, onSaveReflection, onDeleteReflection }: { reflectionKey: string; labels: string[]; examples?: string[]; draftReflections: Record<string, string>; savedReflections: Record<string, string>; onDraftReflection: (key: string, value: string) => void; onSaveReflection: (key: string, value: string) => void; onDeleteReflection: (key: string) => void }) {
  const values = labels.map((_, index) => {
    const fieldKey = getWritingFieldKey(reflectionKey, index)
    return draftReflections[fieldKey] ?? savedReflections[fieldKey] ?? ''
  })
  const totalLength = values.reduce((sum, value) => sum + value.length, 0)
  const hasText = values.some((value) => value.trim().length > 0)
  const overLimit = totalLength > reflectionMaxLength
  const savedAny = labels.some((_, index) => Boolean(savedReflections[getWritingFieldKey(reflectionKey, index)]))

  return (
    <section className="writing-field-set" aria-label="Private writing fields">
      <p className="writing-field-title"><strong>Private writing fields</strong></p>
      <p className="fineprint left-copy">Saved text stays local to this browser for the prototype. It is not used for analytics, profiling or automatic insights.</p>
      {labels.map((label, index) => {
        const fieldKey = getWritingFieldKey(reflectionKey, index)
        const value = values[index]
        const example = examples?.[index]
        return (
          <label className="reflection-field task-writing-field multi-writing-field" key={fieldKey}>
            <span>{label}</span>
            <textarea value={value} onChange={(event) => onDraftReflection(fieldKey, event.target.value)} placeholder={example ? `Example: ${example}` : 'Write only what is useful.'} maxLength={reflectionMaxLength} />
          </label>
        )
      })}
      <span className={`fineprint ${overLimit ? 'warning-text' : ''}`}>{totalLength.toLocaleString()} / {reflectionMaxLength.toLocaleString()} total characters across this task.</span>
      <div className="button-grid two">
        <button className="secondary" type="button" disabled={!hasText || overLimit} onClick={() => labels.forEach((_, index) => {
          const fieldKey = getWritingFieldKey(reflectionKey, index)
          const value = values[index]
          if (value.trim().length > 0) onSaveReflection(fieldKey, value)
          else onDeleteReflection(fieldKey)
        })}>Save fields locally</button>
        {savedAny && <button className="secondary danger" type="button" onClick={() => labels.forEach((_, index) => onDeleteReflection(getWritingFieldKey(reflectionKey, index)))}>Delete saved fields</button>}
      </div>
    </section>
  )
}

function TaskDetail({ task, complete, progressLabel, nextTask, reflectionKey, reflectionValue, savedReflection, draftReflections, savedReflections, onDraftReflection, onSaveReflection, onDeleteReflection, onMark, onOpenTask, onBack }: { task: RoadmapTask; complete: boolean; progressLabel: string; nextTask: RoadmapTask | null; reflectionKey: string; reflectionValue: string; savedReflection?: string; draftReflections: Record<string, string>; savedReflections: Record<string, string>; onDraftReflection: (key: string, value: string) => void; onSaveReflection: (key: string, value: string) => void; onDeleteReflection: (key: string) => void; onMark: () => void; onOpenTask: (taskId: string) => void; onBack: () => void }) {
  const content = getTaskPresentation(task)
  const markLabel = complete ? 'Undo Mark as Done' : 'Mark as Done'
  const affirmationTask = isAffirmationTask(task)
  const howInstructions = affirmationTask ? content.how.filter((instruction) => !/^AFFIRMATION \d/i.test(instruction) && !/^".*"$/.test(instruction)) : content.how
  const writingLabels = task.writingFieldLabels ?? []
  const needsMultiWriting = writingLabels.length > 0
  const needsSingleWriting = !needsMultiWriting && (task.kind === 'DAILY_ACTIVITY' && Boolean(task.prompts?.length) || task.kind === 'REFLECTION')
  const reflectionOverLimit = reflectionValue.length > reflectionMaxLength

  return (
    <section className="task-detail-card" aria-label={`${task.title} instructions`}>
      <section className="task-content-section">
        <h4>What</h4>
        <p>{content.what}</p>
      </section>
      <section className="task-content-section">
        <h4>When</h4>
        <p>{content.when}</p>
      </section>
      <section className="task-content-section">
        <h4>How</h4>
        {content.sourceGap && <p className="warning-text" role="note">Source instructions are missing for this activity. Ask the program owner for the approved content.</p>}
        {!content.sourceGap && <ol className="instruction-list">
          {howInstructions.map((instruction, index) => <li key={`${index}-${instruction}`}>{instruction}</li>)}
        </ol>}
        {affirmationTask && <AffirmationCards />}
        {task.examples && task.examples.length > 0 && !needsMultiWriting && (
          <ul className="benefit-list" aria-label="Examples">{task.examples.map(example => <li key={example}>{example}</li>)}</ul>
        )}
        {task.specialNote && <p className="fineprint task-safety-note">{task.specialNote.replace(/\s+/g, ' ').trim()}</p>}
        {needsMultiWriting && (
          <TaskWritingFields reflectionKey={reflectionKey} labels={writingLabels} examples={task.examples} draftReflections={draftReflections} savedReflections={savedReflections} onDraftReflection={onDraftReflection} onSaveReflection={onSaveReflection} onDeleteReflection={onDeleteReflection} />
        )}
        {needsSingleWriting && (
          <div className="reflection-field task-writing-field">
            <label htmlFor={`${task.id}-writing`}>Private writing field</label>
            <textarea id={`${task.id}-writing`} value={reflectionValue} onChange={(event) => onDraftReflection(reflectionKey, event.target.value)} placeholder="Write only what is useful. Saved text stays local to this browser for the prototype." maxLength={reflectionMaxLength} />
            <span className={`fineprint ${reflectionOverLimit ? 'warning-text' : ''}`}>{reflectionValue.length.toLocaleString()} / {reflectionMaxLength.toLocaleString()} characters. Not used for analytics, profiling or personalization.</span>
            <div className="button-grid two">
              <button className="secondary" type="button" disabled={reflectionValue.trim().length === 0 || reflectionOverLimit} onClick={() => onSaveReflection(reflectionKey, reflectionValue)}>Save locally</button>
              {savedReflection && <button className="secondary danger" type="button" onClick={() => onDeleteReflection(reflectionKey)}>Delete saved text</button>}
            </div>
          </div>
        )}
      </section>
      <section className="task-content-section">
        <h4>Benefits</h4>
        {content.benefits.length > 0
          ? <ul className="benefit-list">{content.benefits.map((benefit, index) => <li key={`${index}-${benefit}`}>{benefit}</li>)}</ul>
          : <p>No benefits were supplied for this activity.</p>}
      </section>
      <p className="fineprint task-completion-status" role="status">{complete ? '✓ Done' : '○ Not done'}{!task.winSection && ' · Optional; separate from task totals'}</p>
      <div className="button-grid two">
        <button className={complete ? 'secondary' : 'primary'} type="button" aria-pressed={complete} onClick={onMark}>{markLabel}</button>
        <button className="secondary" type="button" onClick={onBack}>Return to daily roadmap</button>
      </div>
      {complete && task.winSection && (
        <div className="next-up-card complete" role="status">
          <p className="fineprint">{progressLabel}</p>
          {nextTask ? <button className="primary" type="button" onClick={() => onOpenTask(nextTask.id)}>Open next: {nextTask.shortTitle}</button> : <p>All Small Wins are complete for this day.</p>}
        </div>
      )}
    </section>
  )
}

function ProgramSectionCard({ day, section, done, draftReflections, savedReflections, onToggleSection, onDraftReflection, onSaveReflection, onDeleteReflection }: { day: number; section: ProgramSection; done: boolean; draftReflections: Record<string, string>; savedReflections: Record<string, string>; onToggleSection: (day: number, sectionId: string) => void; onDraftReflection: (key: string, value: string) => void; onSaveReflection: (key: string, value: string) => void; onDeleteReflection: (key: string) => void }) {
  const reflectionKey = getSectionKey(day, section.id)
  const reflectionValue = draftReflections[reflectionKey] ?? savedReflections[reflectionKey] ?? ''
  const savedReflection = savedReflections[reflectionKey]
  const reflectionHelpId = `${section.id}-reflection-help`
  const reflectionOverLimit = reflectionValue.length > reflectionMaxLength
  const preview = section.content.slice(0, 6)
  const remaining = section.content.slice(6)

  return (
    <section className={`program-section ${section.kind}`} aria-labelledby={`${section.id}-title`}>
      <div className="section-row">
        <span className={`type-pill ${section.kind}`}>{section.kind.toUpperCase()}</span>
        <span className="fineprint">{section.sourceMode}</span>
      </div>
      <h3 id={`${section.id}-title`}>{section.label}</h3>
      <div className="source-copy">
        {preview.map((line, index) => <p key={`${section.id}-preview-${index}`}>{formatProgramText(line)}</p>)}
        {remaining.length > 0 && (
          <Disclosure>
            <summary>Read full source section ({remaining.length} more lines)</summary>
            {remaining.map((line, index) => <p key={`${section.id}-remaining-${index}`}>{formatProgramText(line)}</p>)}
          </Disclosure>
        )}
      </div>
      {section.kind === 'reflect' && (
        <label className="reflection-field">
          <span>Private reflection draft</span>
          <textarea
            value={reflectionValue}
            onChange={(event) => onDraftReflection(reflectionKey, event.target.value)}
            placeholder="Write only what is useful. This prototype stores saved text locally on this device."
            maxLength={reflectionMaxLength}
            aria-describedby={reflectionHelpId}
          />
          <span id={reflectionHelpId} className={`fineprint ${reflectionOverLimit ? 'warning-text' : ''}`}>{reflectionValue.length.toLocaleString()} / {reflectionMaxLength.toLocaleString()} characters. Saved reflection text stays local to this browser and is not used for personalization or automatic insights.</span>{' '}
          <div className="button-grid two">
            <button className="secondary" type="button" disabled={reflectionValue.trim().length === 0 || reflectionOverLimit} onClick={() => onSaveReflection(reflectionKey, reflectionValue)}>Save reflection</button>
            {savedReflection && <button className="secondary danger" type="button" onClick={() => onDeleteReflection(reflectionKey)}>Delete saved reflection</button>}
          </div>{' '}
          {savedReflection && <small>Saved locally for this prototype. Do not use this as production privacy architecture.</small>}
        </label>
      )}
      <button className="section-toggle" type="button" onClick={() => onToggleSection(day, section.id)} aria-pressed={done}>{done ? 'Marked done' : `Mark ${section.kind} done`}</button>
    </section>
  )
}

function Support() {
  return (
    <section className="stack page-enter" aria-labelledby="support-title">
      <p className="eyebrow">Support is never paywalled</p>
      <h1 id="support-title">Reach people, not a wall.</h1>
      <p className="muted">The app does not diagnose, monitor emergencies, or replace professional care.</p>
      <div className="support-list">
        {supportLevels.map((level, index) => <article className="support-card" key={level}><strong>Level {index + 1}</strong>{' '}<span>{level}</span></article>)}
      </div>
      <article className="crisis-card">
        <h2>Need urgent help?</h2>
        <p>Canada only: call or text 9-8-8 for suicide crisis support. If there is immediate danger, call 9-1-1. Outside Canada, use your local emergency number or verified local crisis service.</p>
        <p className="fineprint left-copy">Regional resources must be maintained from a canonical support-resource configuration before beta/release.</p>
      </article>
    </section>
  )
}

export default App
