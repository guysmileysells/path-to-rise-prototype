# Daily Rhythm — implementation specification

## Product intent
Make the current day feel approachable and structured. The home view answers:
- Where am I in the 28-day program?
- What do I do next?
- How do I access a reset or support?

## Visual hierarchy
1. Header: PATH to RISE identity; current day / program status; access to settings.
2. Welcome/hero: heading **Today, in three parts.** and short supportive subtitle.
3. Compact progress summary: current day, number of completed tasks vs available tasks; no invented counts.
4. Vertical daily sequence of three cards: **Morning**, **Daily**, **Evening**.
5. One clear primary CTA on the active / next unfinished card: **Open next step**.
6. Persistent, clearly labeled navigation to **Today**, **Journey**, **Reset**, and **Support** (adapt to actual existing destinations).

## Card behavior
Each card shows its phase label, relevant task title or description from real content, and status: completed, next, or upcoming.
- Completed: checkmark and readable completed label; still openable if app supports revisiting.
- Next: strongest visual emphasis, CTA opens the actual task detail.
- Upcoming: quieter styling; never claim completion.
- If a phase contains multiple tasks, derive status from underlying tasks rather than hardcoding three completions.
- Handle missing content gracefully without fabricated tasks.

## Progress and transitions
- Use the existing state/store/persistence layer.
- Determine next incomplete task in the app's established order.
- Update card emphasis immediately after task completion.
- Preserve the existing logic for advancing to the next day.
- Handle fully completed days, historical days, and completed 28-day program.
- Never reset or overwrite progress during the redesign.

## Style direction
Soft lavender accent, warm off-white background, dark readable text, rounded cards, generous spacing, gentle shadows or borders, restrained motion.
Design tokens are suggestions, not a requirement to override existing brand variables:
- background: #FAF9FD
- surface: #FFFFFF
- primary: #7566B5
- primary-soft: #EEEAF8
- text: #282536
- muted: #666276
- border: #E7E2EF
- radius: 18px
- content max-width: 760px
Use the existing font and icon system when possible.

## Responsive and accessible
Mobile-first single column; desktop centered content with comfortable line length.
Keep navigation usable at 320px width; respect safe-area insets.
Buttons have at least 44px touch targets, visible focus styles, semantic headings, status labels not conveyed by color alone, AA text contrast, reduced-motion support, and keyboard navigation.
Avoid hiding essential Reset/Support actions behind ambiguous icons.

## Out of scope
Do not rewrite program content, change account/privacy behavior, replace data storage, or invent a new backend. Avoid changes to onboarding unless necessary for navigation compatibility.
