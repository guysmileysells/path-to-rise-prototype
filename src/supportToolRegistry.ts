import { realTimeSupportTools } from './realTimeSupportContent'
import { additionalSupportTools } from './additionalSupportContent'
export const allSupportTools = [...realTimeSupportTools, ...additionalSupportTools]
export const supportToolIds = allSupportTools.map(tool => tool.id)
export const additionalToolIds = new Set(additionalSupportTools.map(tool => tool.id))

export const activityOptions = [
  { id: 'movement', title: 'Movement', action: 'If safe and appropriate for your body, stand or take a few comfortable steps.' },
  { id: 'nature', title: 'Nature', action: 'If safe, look outside or spend a brief moment in an accessible outdoor space.' },
  { id: 'connection', title: 'Social connection', action: 'Choose a trusted person and consider a brief check-in when appropriate; you do not need to describe an incident.' },
  { id: 'care', title: 'Personal care', action: 'Choose one immediate need, such as a sip of water or a simple hygiene task, when safe and suitable.' },
  { id: 'enjoyment', title: 'Enjoyment', action: 'Choose a small familiar activity you value, such as listening to a preferred song when off duty.' },
  { id: 'accomplishment', title: 'Accomplishment', action: 'Choose one small manageable task, such as putting one item away; doing more is optional.' },
] as const
