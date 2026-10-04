# PATH TO RISE — PROMPT #10 IMPLEMENTATION CONSTRAINTS

Generated: 2026-10-03 PDT
Phase: Prompt #10 — Notifications + Re-engagement
Status: Constraints verified before final Prompt #10 exit-gate decision.

---

## 1. Prompt #9 exit gate

Verified from:

```txt
docs/PATH_TO_RISE_PROMPT_9_FINAL_SAFETY_PRIVACY_SECURITY_ACCESSIBILITY_REPORT.md
```

Prompt #9 status:

```txt
PROMPT #9 EXIT GATE PASSED
READY FOR PROMPT #10 — NOTIFICATIONS + RE-ENGAGEMENT
```

---

## 2. Prompt #9 notification handoff inspected

Verified from:

```txt
docs/PATH_TO_RISE_PROMPT_10_NOTIFICATION_REENGAGEMENT_SAFETY_HANDOFF.md
```

Required constraints carried forward:

- lock-screen content must be generic and discreet;
- no journal/reflection text in notifications;
- no RESET need selections in notifications;
- no inferred mood/stress state;
- no crisis/support seeking state;
- no PTSD/anxiety/trauma/diagnostic labels;
- no missed-day, behind, streak or pressure copy;
- explicit opt-in for reminder categories;
- permission denial must not block core app use;
- quiet hours must be user controlled;
- deep links must avoid private reflection views;
- program reminders must resolve to current valid state;
- no Day 29 loop after completion;
- no hidden personalization, behavioural prediction or emotional inference;
- no analytics or notification-open optimization introduced;
- external legal/privacy/security/clinical/manual a11y reviews remain outside agent verification.

---

## 3. Current platform capability constraint

Current app is:

```txt
Browser-only React/Vite prototype using hash routes.
```

Current app is not:

```txt
Native mobile app
Installed PWA with registered service worker
Push backend
Account/auth system
Production notification service
```

Implementation constraint:

```txt
Build honest notification settings, preference model, safe copy registry, scheduling rules, deep-link resolution and browser-tab adapter only.
Do not claim reliable lock-screen/background production delivery.
```

---

## 4. Capability classification

| Capability | Classification | Reason |
|---|---|---|
| Save reminder preferences locally | IMPLEMENTABLE NOW | localStorage already used for prototype state |
| Separate app preference from browser permission | IMPLEMENTABLE NOW | browser Notification.permission can be read where supported |
| Request browser notification permission | IMPLEMENTABLE NOW where secure Notification API exists | browser API only; user-driven |
| Foreground/browser-tab scheduled reminder demo | IMPLEMENTABLE NOW with limitations | JavaScript timers work only while app/tab is alive |
| Reliable closed-app/lock-screen delivery | REQUIRES SERVICE WORKER / PUSH BACKEND / NATIVE WRAPPER | current app has no registered service worker, push subscription or native scheduler |
| Remote push notifications | REQUIRES PUSH BACKEND | no backend/push provider exists |
| Native local notifications | REQUIRES NATIVE WRAPPER | not a native app |
| Production privacy/security certification | NOT CURRENTLY AVAILABLE | requires legal/privacy/security review |

---

## 5. Implementation boundaries

Allowed in Prompt #10:

- one canonical notification preference model;
- one source of truth in prototype-local storage;
- permission-state display;
- opt-in reminder controls;
- quiet-hours controls with overnight handling;
- safe notification copy registry;
- deep-link resolution logic;
- stale reminder recovery;
- Day 28 reconciliation;
- automated notification scenario tests;
- UI setting nested inside the existing app without adding a bottom nav item.

Not allowed in Prompt #10:

- fake production push;
- generic daily spam;
- RESET inference notifications;
- crisis detection notifications;
- analytics/open-rate optimization;
- hidden personalization-driven nudging;
- streak/shame/fear copy;
- new dependencies unless essential;
- Prompt #11 performance/reliability work beyond validation;
- Prompt #12 launch-readiness audit.

---

## 6. Conflict resolution

No conflict found requiring override of Prompt #9.

Prompt #10 implementation must preserve Prompt #9 privacy/security/accessibility boundaries even if that limits notification functionality.
