# PATH TO RISE — PROMPT #10 NOTIFICATION + RE-ENGAGEMENT SAFETY HANDOFF

Generated: 2026-10-03 PDT
Prepared during: Prompt #9 — Safety + Privacy + Security + Accessibility Hardening
Status: **Handoff only. Prompt #10 has not been implemented.**

---

## 1. Core notification principle

Notifications must help the user return gently when useful. They must never create pressure, shame, surveillance, fear, or dependence.

Prompt #10 should ask:

```txt
What is the minimum reminder that creates real value without exposing private wellness information?
```

Do not ask:

```txt
How do we maximize engagement?
```

---

## 2. Safe lock-screen content

Safe lock-screen content should be generic, discreet, and non-clinical.

Allowed examples:

```txt
PATH to RISE: Your next step is available.
PATH to RISE: A short reset is available when you want it.
PATH to RISE: You can continue when ready.
PATH to RISE: Your saved practices are here.
```

Use generic app identity plus optional neutral action. Do not expose specific reflection, need, emotional state, crisis context, tool history, or clinical-sounding labels.

---

## 3. Sensitive lock-screen content to avoid

Do not show on lock screen or notification previews:

- journal/reflection text;
- reflection titles that reveal sensitive content;
- RESET need selections;
- inferred mood/stress state;
- “you seem anxious / activated / shut down”;
- crisis/support seeking state;
- exact tool-use history if it reveals sensitive behaviour;
- “missed day” / “behind” language;
- any PTSD, anxiety, trauma, diagnosis, treatment or recovery claim;
- Day content that could embarrass the user around coworkers/family.

---

## 4. Permission and consent boundaries

Prompt #10 must use explicit opt-in.

Requirements:

- Explain what notifications will and will not contain.
- Let the user choose reminder categories before enabling them.
- Do not enable reminders by default.
- Do not use dark patterns to obtain permission.
- If notification permission is denied, the app should continue normally.
- Notification permission state must be editable later.

---

## 5. Opt-out requirements

Every reminder category must be easy to disable.

Minimum categories to consider:

- continue current Day;
- gentle RESET availability;
- saved practice reminder;
- optional post-Day-28 maintenance reminder.

User should be able to turn off all reminders without losing program progress, reflections, favourites, or support access.

---

## 6. Frequency boundaries

Default frequency should be low.

Recommended Prompt #10 starting limits:

- no more than one scheduled wellness reminder per day;
- no repeated reminders for the same ignored action in a short window;
- no escalating urgency for ignored reminders;
- no catch-up floods after several days away;
- no “streak rescue” nudges.

Prompt #10 should include a clear frequency control and should not optimize for time-in-app.

---

## 7. Quiet hours

Prompt #10 should include quiet-hour defaults.

Recommended baseline:

- no wellness reminder during common sleep hours unless the user explicitly configures it;
- first-responder schedules vary, so quiet hours must be user-controlled;
- no “wake-up” assumptions based on clock alone;
- urgent/crisis resources remain available inside the app, but the app must not create AI crisis notifications.

---

## 8. Language rules

Allowed tone:

- calm;
- optional;
- discreet;
- non-clinical;
- non-judgmental;
- low-pressure.

Avoid:

- “You missed…”
- “Don’t break your streak”
- “You’re falling behind”
- “Your nervous system needs…”
- “We noticed you…”
- “You seem…”
- fear-based or urgency-based engagement.

---

## 9. Safe deep-link behaviour

Notifications may deep-link only to neutral destinations:

- Today;
- current Day;
- RESET landing;
- Toolbox;
- Support.

Restrictions:

- Do not deep-link directly into a private reflection text view.
- Do not open reflection content from a lock-screen tap without intentional in-app navigation.
- Do not deep-link into crisis support based on inferred risk.
- Do not encode private text, need selection, or sensitive state in URL/hash/query parameters.

---

## 10. First-responder / discreet-use considerations

Prompt #10 should assume the phone may be visible around coworkers/family.

Notifications must be:

- short;
- generic;
- not embarrassing;
- not clinical;
- not crisis-coded unless the user explicitly configures a personal emergency contact workflow in a future, reviewed phase.

---

## 11. Day 1–28 boundaries

Notifications may reference the program only generically:

Allowed:

```txt
Your next PATH to RISE step is available.
Continue when you’re ready.
```

Avoid:

```txt
Day 18: Releasing Guilt & Shame is waiting.
You missed Day 9.
You are behind on your reset.
```

Day progress reminders must not create failure states.

---

## 12. RESET boundaries

RESET notifications may say a reset is available. They must not infer current need.

Allowed:

```txt
A short reset is available when you want one.
```

Avoid:

```txt
You seem overwhelmed. Do a reset now.
```

RESET need selections are session-only sensitive data and must not become notification targeting history unless a future privacy review explicitly approves it.

---

## 13. Post-Day-28 boundaries

After Day 28, reminders should avoid infinite progression pressure.

Allowed:

```txt
Your saved practices are available.
PATH to RISE is here when you want to revisit a reset.
```

Avoid:

```txt
Keep your streak alive.
Start Day 29.
Don’t lose your progress.
```

---

## 14. Data allowed for Prompt #10 consideration

Permitted candidates, with caution:

- current Day / first incomplete Day;
- completedDays count for neutral continuation only;
- favouriteToolIds for explicit saved-practice reminders;
- notification category preferences;
- quiet hours;
- notification permission state.

Use minimally and transparently.

---

## 15. Data that must not be used for notifications

Do not use:

- journal/reflection text;
- reflection keyword/theme/sentiment;
- RESET need history;
- inferred emotional state;
- clinical risk prediction;
- location/sensors/biometrics;
- hidden engagement scoring;
- crisis/support use history;
- “time away” as guilt pressure.

---

## 16. Required Prompt #10 validation

Prompt #10 should validate:

- opt-in state;
- opt-out state;
- permission denied path;
- quiet hours;
- safe lock-screen copy;
- no private text in notification payloads;
- no sensitive state in URLs/deep links;
- no streak/shame/fear language;
- post-Day-28 no-Day-29 reminder behaviour;
- Support remains available but not alarmist;
- mobile/discreet review.

---

## 17. Review ownership

- Agent can implement and validate static/runtime notification boundaries in prototype.
- Human owner must review notification tone and privacy feel.
- Legal/privacy review is required before production notification practices.
- Clinical/trauma-informed SME review is required before any safety-sensitive notification content.
- Security review is required for production push infrastructure, tokens, permissions and payload handling.
