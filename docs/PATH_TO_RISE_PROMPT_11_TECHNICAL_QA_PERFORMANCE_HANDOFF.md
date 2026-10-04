# PATH TO RISE — PROMPT #11 TECHNICAL QA / PERFORMANCE / PRODUCTION RELIABILITY HANDOFF

Generated: 2026-10-03 17:37 PDT
Prepared by: Prompt #10 — Notifications + Re-engagement
Do not begin Prompt #11 until user provides the Prompt #11 package.

---

## 1. Notification architecture

Current architecture:

```txt
NotificationPreferences
  → copy registry
  → reminder eligibility/reconciliation
  → quiet-hours and schedule rules
  → browser-tab Notification adapter when available/authorized
  → safe deep-link resolver
```

Core files:

```txt
src/notificationContent.ts
src/App.tsx
src/App.css
scripts/notification-scenarios.mjs
docs/PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md
```

---

## 2. Platform capabilities

Current runtime:

```txt
Browser-only React/Vite prototype
Hash routes
localStorage persistence
No auth/account system
No backend
No registered service worker
No push backend
No native wrapper
```

Capability truth:

| Capability | Current state |
|---|---|
| Local preference storage | Available now |
| Browser Notification permission read/request | Available only where browser + secure context support it |
| Browser-tab scheduled demo | Available only while app/tab is alive |
| Lock-screen/background reliability | Not available in current architecture |
| Remote push | Requires push backend/provider |
| Native local notification | Requires native wrapper |

---

## 3. Unverified device behaviour

Prompt #10 did not verify:

- physical iPhone delivery;
- physical Android delivery;
- lock-screen appearance;
- notification center behaviour;
- app closed/background delivery;
- device restart survival;
- browser permission settings path;
- OS-level quiet/focus mode interaction;
- timezone travel on physical device;
- daylight-saving transition on physical device;
- native screen-reader interaction.

Owner for Prompt #11/manual validation:

```txt
HUMAN / PLATFORM / DEVICE TESTING
```

---

## 4. Service-worker state

Current state:

```txt
No service worker is registered by the app.
No notificationclick handler exists.
No push subscription lifecycle exists.
```

If Prompt #11 evaluates PWA push, audit:

- service-worker registration/update lifecycle;
- notification click/open route handling;
- stale notification payload recovery;
- subscription creation/expiration/revocation;
- push payload minimization;
- browser compatibility;
- uninstall/reinstall edge cases;
- offline behaviour;
- cache/update interactions.

---

## 5. Push infrastructure

Current state:

```txt
No push backend exists.
No VAPID keys/provider config exists.
No push endpoint storage exists.
No server-side scheduler exists.
```

Production push would require:

- backend scheduler;
- push provider/security model;
- minimal payload design;
- subscription storage/deletion;
- permission revocation handling;
- rate/frequency caps server-side;
- audit logging policy;
- privacy/legal review.

---

## 6. Deep-link routes

Current resolver targets:

| Internal destination | App route/result |
|---|---|
| `today` | `#today` |
| `path` | `#path`, current valid Day selected |
| `reset` with valid tool | `#reset`, tool runner |
| `toolbox` | `#reset`, Toolbox view |
| `support` | `#support` |

Safety rules:

- never deep-link to private reflection text;
- invalid tool target falls back to Toolbox;
- stale program reminder after Day 28 resolves safely;
- malformed destination normalizes to Today.

---

## 7. Timezone/DST logic

Current logic:

- clock times are stored as local `HH:MM` strings;
- quiet-hours checks convert local clock time to minutes;
- `getNextReminderOccurrence` uses local `Date` construction;
- quiet hours can cross midnight;
- reminders inside quiet hours delay until quiet-hours end.

Automated Prompt #10 checks:

```txt
timezone/DST calculation uses local Date and not UTC string arithmetic — PASS
quiet-hour delivery delays to configured end — PASS
```

Prompt #11 should verify:

- DST spring-forward/fall-back on target devices/browsers;
- timezone travel;
- app/tab closed scenarios;
- native/PWA scheduler interpretation if added.

---

## 8. Persistence

Current notification persistence:

```txt
localStorage key: path-to-rise-notification-preferences-v1
```

Current data includes:

- schema version;
- permission-explained flag;
- privacy mode;
- quiet hours;
- reminder enabled flags;
- reminder time/frequency;
- canonical tool ID for explicit practice reminder;
- return reminder days/attempt cap.

Current data excludes:

- journal/reflection text;
- RESET need selections/history;
- inferred emotional state;
- diagnostic labels;
- crisis state;
- notification analytics.

Prompt #11 risk:

```txt
localStorage is prototype-only and not production privacy architecture.
```

---

## 9. Migrations

Current schema:

```txt
notificationSchemaVersion = 1
```

Sanitizer behaviour:

- malformed stored JSON falls back to defaults;
- invalid times fall back to defaults;
- invalid practice tool target disables practice reminder;
- quiet hours fall back to safe defaults;
- unrelated program/reflection/toolbox state is not wiped.

Prompt #11 should add migration tests if schema changes.

---

## 10. Known performance risks

Current build warning:

```txt
(!) Some chunks are larger than 500 kB after minification.
```

Prompt #10 did not add dependencies, but app bundle remains above Vite warning threshold.

Prompt #11 should evaluate:

- bundle composition;
- route-level/component-level code splitting;
- whether program content extraction inflates initial route;
- whether notification code should remain in main chunk or be lazy/isolateable;
- mobile load/interaction timing.

---

## 11. Known reliability risks

- Browser timers stop when tab is closed/suspended.
- Notification delivery is not reliable without service worker/native scheduler.
- OS/browser permission state can change outside app.
- localStorage can be cleared by user/browser or blocked.
- Real lock-screen copy appearance may differ by OS/browser.
- Mobile time input UX varies across devices.
- Daylight-saving/device timezone behaviour needs physical/platform verification.

---

## 12. Known browser/device gaps

Not verified:

- Safari iOS;
- Chrome Android;
- Firefox Android;
- desktop Safari/Firefox/Chrome variations;
- installed PWA mode;
- notification permission revocation from OS/browser settings;
- reduced-motion/large-text on physical device;
- VoiceOver/TalkBack/NVDA/JAWS.

---

## 13. Test coverage

Added automated tests:

```txt
scripts/notification-scenarios.mjs
```

Coverage includes:

- platform truthfulness;
- permission states;
- app preference separate from permission;
- reminder edit/cancel;
- duplicate prevention through stable IDs;
- program reminder current-Day resolution;
- stale Day 28 handling;
- practice reminder valid/invalid target;
- overnight quiet hours;
- non-shaming return copy;
- malformed preference recovery;
- privacy-safe copy/payload;
- local timezone/DST logic-level calculation;
- quiet-hour delivery delay rule.

Final automated result from Prompt #10:

```txt
notification scenarioCount: 18
privacyBoundary.pass: true
failures: []
```

---

## 14. Manual tests still required

Manual test package lives in:

```txt
docs/PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md
```

Priority manual tests for Prompt #11:

1. physical iPhone permission request and denial;
2. physical Android permission request and denial;
3. real lock-screen copy appearance;
4. turn reminder on/change time/turn off;
5. quiet hours 21:00 → 07:00;
6. Day 28 program-reminder reconciliation;
7. stale notification open;
8. invalid practice target fallback;
9. large text;
10. small phone;
11. VoiceOver/TalkBack or equivalent;
12. app closed/background reality check if service worker/native architecture is added.

---

## 15. Prompt #11 recommended focus

Prompt #11 should focus on:

- QA + performance + production reliability;
- honest platform delivery feasibility;
- bundle/performance warning;
- physical device/browser matrix;
- accessibility-device validation;
- notification reliability plan if production notifications remain in scope;
- whether to keep notification architecture as settings-only until native/PWA platform is chosen.

Prompt #11 should not silently add:

- push backend;
- native wrapper;
- analytics;
- advanced shift calendar;
- crisis monitoring;
- AI coaching;
- marketing automation.

---

## 16. Exit condition from Prompt #10

Prompt #10 handed off with:

```txt
PROMPT #10 EXIT GATE PASSED
READY FOR PROMPT #11 — QA + PERFORMANCE + PRODUCTION RELIABILITY
```
