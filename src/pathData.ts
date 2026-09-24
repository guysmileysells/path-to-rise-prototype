export const states = [
  'Steady',
  'Activated',
  'Overwhelmed',
  'Shut down',
  'Exhausted',
  'Disconnected',
] as const

export const needs = [
  'Calm down',
  'Wake up',
  'Clear my head',
  'Leave work at work',
  'Sleep',
  'Reconnect',
  'Gain perspective',
] as const

export const timeChoices = ['60 seconds', '3 minutes', '10 minutes', 'Or more'] as const

export const toolInventory = [
  { id: 'TOOL-01', category: 'Immediate regulation', title: 'Reset Me Now' },
  { id: 'TOOL-02', category: 'Immediate regulation', title: '90-Second Downshift' },
  { id: 'TOOL-03', category: 'Immediate regulation', title: 'Hypervigilance Downshift' },
  { id: 'TOOL-04', category: 'Immediate regulation', title: 'Respond vs React' },
  { id: 'TOOL-05', category: 'Immediate regulation', title: 'Control Scan' },
  { id: 'TOOL-06', category: 'Immediate regulation', title: 'Emotional Pressure Release' },
  { id: 'TOOL-07', category: 'Immediate regulation', title: 'Post-Incident Grounding' },
  { id: 'TOOL-08', category: 'Shift and sleep', title: 'End-of-Shift Reset' },
  { id: 'TOOL-09', category: 'Shift and sleep', title: 'Car-Before-Home Transition' },
  { id: 'TOOL-10', category: 'Shift and sleep', title: 'Difficult-Call Decompression' },
  { id: 'TOOL-11', category: 'Shift and sleep', title: 'Sleep After Shift' },
  { id: 'TOOL-12', category: 'Shift and sleep', title: 'Nighttime Brain Dump' },
  { id: 'TOOL-13', category: 'Shift and sleep', title: 'Rest vs Numbing Check' },
  { id: 'TOOL-14', category: 'Relationships and life', title: 'Relationship Reset' },
  { id: 'TOOL-15', category: 'Relationships and life', title: 'Listen Without Fixing' },
  { id: 'TOOL-16', category: 'Relationships and life', title: 'Identity Separation' },
  { id: 'TOOL-17', category: 'Relationships and life', title: 'Retirement and Transition Reset' },
  { id: 'TOOL-18', category: 'Relationships and life', title: 'Moral Injury Grounding' },
  { id: 'TOOL-19', category: 'Relationships and life', title: 'Nature Reset' },
  { id: 'TOOL-20', category: 'Relationships and life', title: 'Get Back Up Plan' },
] as const

export const sevenDayReset = [
  { day: 1, focus: 'Notice', action: 'Identify the current nervous-system state' },
  { day: 2, focus: 'Breathe', action: 'Complete the 90-Second Downshift' },
  { day: 3, focus: 'Transition', action: 'Use the End-of-Shift Reset' },
  { day: 4, focus: 'Move', action: 'Complete a short Nature Reset' },
  { day: 5, focus: 'Control', action: 'Choose one controllable action' },
  { day: 6, focus: 'Connect', action: 'Reach out to one trusted person' },
  { day: 7, focus: 'Plan', action: 'Build a personal Quick Kit' },
] as const

export const twentyEightDayWeeks = [
  { week: 1, theme: 'Stabilize', outcome: 'Recognize activation and use basic regulation tools' },
  { week: 2, theme: 'Awareness and Honesty', outcome: 'Notice triggers, body signals and automatic patterns' },
  { week: 3, theme: 'Acceptance and Letting Go', outcome: 'Separate responsibility from punishment and release what cannot be controlled' },
  { week: 4, theme: 'Identity and Purpose', outcome: 'Build values, relationships and purpose beyond the professional role' },
] as const

export const lessonParts = ['Real Talk', 'Understand It', 'See It', 'Do It', 'Carry It', 'Check It'] as const

export const quickKitComponents = [
  'Favourite resets',
  'Sleep tool',
  'Shift-transition routine',
  'Relationship tool',
  'Warning signs',
  'Trusted contacts',
  'Grounding statement',
  'Support resources',
] as const
