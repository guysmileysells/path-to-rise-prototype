# PATH TO RISE — CONTROLLED PRIVATE PREVIEW HANDOFF

Generated: 2026-10-03 21:52 PDT
Prepared after verified Prompt #1–#12 checkpoint.

Checkpoint commit: `045af500ff6901fa56494d33512cfd6e8d3c8311`
Checkpoint tag: `path-to-rise-prompt-1-12-rc1`
Branch: `master`
Launch classification at checkpoint: `LEVEL B — INTERNAL TESTING READY`

This handoff prepares the next validation phase only. It does not start public launch, TestFlight, production deployment, clinical review, legal/privacy approval, or first-responder testing.

## 1. What is ready to test

Ready for owner/internal/stakeholder testing under prototype limits:

- Four primary destinations: `Today`, `Reset`, `My Path`, `Support`.
- Source-backed 28-Day / 4-Week Nervous System Reset structure.
- Day 1–28 journey, including Day 28 completion and no actionable Day 29.
- RESET need selection to canonical source-backed tools.
- Toolbox/favourites/recent practice state.
- Deterministic personalization that excludes reflection/journal text.
- My Path progress/insights that avoid streaks, scores, shame, diagnosis, or clinical claims.
- Local reflection save/retrieve/delete behaviour in this browser.
- Prototype notification preferences and preview/deep-link logic.
- Support access without paywall/account obstruction.

## 2. What is not yet verified

Do not represent these as complete:

- Physical iPhone testing.
- Physical Android testing.
- iOS Safari behaviour.
- Android Chrome behaviour.
- Tablet behaviour.
- Manual screen-reader testing.
- Formal accessibility audit.
- First-responder target-user validation.
- Clinical / SME approval.
- Legal / privacy approval.
- Penetration/security test.
- Production auth/storage/encryption architecture.
- Real production push notifications.
- Permanent HTTPS deployment/domain.
- Monitoring, incident response, and deployment rollback.
- App Store / TestFlight readiness.

## 3. Real-device testing required

### iPhone

Minimum:

- One modern iPhone on Safari.
- One smaller/older iPhone if available.
- Large Text enabled.
- Reduced Motion enabled.
- VoiceOver basic navigation pass.

Key checks:

- Bottom navigation remains visible and tappable.
- Today → Day 1 / Continue works.
- RESET need selection is fast and understandable.
- My Path content is readable without horizontal scroll.
- Reflection text entry/save/retrieve works.
- Support remains reachable.
- Browser refresh preserves expected local state.

### Android

Minimum:

- One modern Android phone on Chrome.
- One smaller/older Android if available.
- Large font/display size enabled.
- Reduced animations enabled if supported.
- TalkBack basic navigation pass.

Key checks match the iPhone list.

### Tablet

Tablet is not the primary target yet. If tested, treat as compatibility exploration, not release proof.

Minimum tablet checks:

- Layout does not become awkwardly wide or unreadable.
- Cards/buttons keep clear hierarchy.
- No hidden/off-screen navigation.
- Reading experience remains calm and professional.

## 4. Recommended tester group

Private preview should start small:

- 3–5 internal/owner-side testers first.
- Then 5–8 controlled external testers only after internal smoke passes.
- Include at least:
  - one active first responder if appropriate and voluntary,
  - one retired first responder if available,
  - one shift worker or irregular-schedule tester,
  - one non-technical tester,
  - one tester comfortable reporting accessibility/usability friction.

Do not recruit broad public users yet.

## 5. First-responder / shift-worker representation

Ask testers to evaluate whether the app is usable when:

- tired after a shift,
- checking quickly before/after work,
- returning after missing days,
- not wanting motivational pressure,
- needing a quick RESET practice,
- wanting privacy around reflections.

Do not ask testers to disclose trauma details, diagnoses, employer incidents, patient/public details, or private operational information.

## 6. Exact testing tasks

### 10-minute smoke path

1. Open app fresh.
2. Read Today screen.
3. Start Day 1.
4. Complete one read/do section.
5. Save a short reflection.
6. Leave and return to My Path.
7. Open RESET.
8. Select a need and open the recommended tool.
9. Open Support.
10. Refresh browser and confirm state is still understandable.

### 30-minute complete product path

1. Fresh open.
2. Complete Day 1.
3. Confirm Today/My Path update.
4. Favourite one tool.
5. Reopen Toolbox/favourite.
6. Use RESET without advancing a day.
7. Save and retrieve reflection.
8. Explore Progress/Insights.
9. Check notification settings copy without enabling unsupported claims.
10. Check Support route.
11. Use invalid URL/hash and confirm safe recovery.
12. Return after simulated missed-day/partial-day state if available.

### Full pre-launch path

Run the Prompt #12 human validation package from:

`docs/PATH_TO_RISE_FINAL_ELITE_PRODUCT_AUDIT_AND_LAUNCH_READINESS_REPORT.md`

Add real-device, accessibility, privacy/legal, SME, and first-responder review before any move beyond private preview.

## 7. Privacy boundaries

Private preview must disclose:

- Reflections/progress are prototype-local browser storage for now.
- This is not production-secure account storage.
- Clearing browser data may remove local progress/reflections.
- Do not enter highly sensitive, identifiable, operational, or emergency information during testing.
- The app is not a therapist, diagnosis tool, emergency service, or clinical treatment.

## 8. Information we should NOT collect

Do not collect:

- trauma narratives,
- diagnoses,
- medical details,
- employer-sensitive details,
- operational incident details,
- names of patients/public/coworkers,
- exact duty location or agency if unnecessary,
- journal/reflection text,
- crisis-state disclosures,
- biometric/location/device surveillance data,
- screenshots that expose private writing unless the tester intentionally redacts it.

## 9. Usability questions

Ask simple, non-clinical questions:

1. Did you know what to tap first?
2. Did anything feel overwhelming or too wordy?
3. Did the app feel calm and trustworthy?
4. Was RESET fast enough when you wanted a quick practice?
5. Did My Path explain progress without pressure?
6. Did you understand what was private/local to the browser?
7. Was Support easy to find?
8. Did any wording feel shamey, clinical, pushy, or unrealistic?
9. What confused you?
10. What would block you from using this for 28 days?

## 10. Defect reporting format

Use this format for every issue:

```txt
Issue title:
Tester device/browser:
Approx screen size if known:
Where it happened:
Steps to reproduce:
Expected result:
Actual result:
Screenshot/video attached? yes/no
Private info redacted? yes/no
Severity guess: P0/P1/P2/P3
Notes:
```

## 11. Severity rules

### P0 — STOP PREVIEW

Examples:

- private reflection appears in URL/log/notification/analytics,
- primary journey broken,
- severe data loss,
- unsafe support/crisis obstruction,
- production build cannot load,
- app creates harmful clinical/diagnostic inference.

Action: stop testing, preserve evidence, fix before continuing.

### P1 — MUST FIX BEFORE EXPANDING PREVIEW

Examples:

- iPhone/Android primary path broken,
- Day progression unreliable,
- serious accessibility blocker,
- confusing privacy promise,
- Day 28/Day 29 state error,
- RESET advances program progress by mistake.

Action: fix before adding more testers.

### P2 — IMPORTANT

Examples:

- wording confusion,
- minor mobile layout issue with workaround,
- non-critical state edge case,
- notification preference confusion.

Action: prioritize before closed beta/public beta.

### P3 — BACKLOG / POLISH

Examples:

- visual polish,
- preference suggestions,
- nice-to-have content grouping,
- non-blocking copy improvement.

Action: log, triage, avoid scope creep.

## 12. Stopping criteria

Pause private preview if any of these occur:

- Any P0 appears.
- Two or more testers cannot complete the basic Today → Day → RESET → Support path.
- Any privacy promise is contradicted by actual behaviour.
- Any tester reports support/crisis access is blocked or confusing.
- Real-device layout blocks primary actions.
- Manual accessibility tester cannot reach primary actions.
- Feedback shows users misunderstand the app as clinical treatment or diagnosis.

## 13. Success criteria

Private preview is successful enough to consider the next stage only if:

- 90%+ testers complete the smoke path without help.
- No P0 issues.
- No unresolved P1 issues.
- Most testers understand prototype/local privacy limits.
- RESET is described as quick/easy enough.
- My Path feels clear and non-punitive.
- Support is found quickly.
- Real iPhone and Android checks pass.
- Owner/SME flags no unacceptable content/safety issue.

## 14. Regression procedure

After any fix:

1. Re-run `npm test`.
2. Re-run `npm run lint`.
3. Re-run `npm run build`.
4. Re-run `npm audit --omit=dev --audit-level=low` if dependency/package changes occurred.
5. Smoke test Today, Reset, My Path, Support.
6. Re-test the exact failed device/task.
7. Confirm no new Day progression, reflection, RESET, Support, or privacy regression.
8. Record command output and tester evidence.

## 15. Feedback triage method

Triage in this order:

1. Safety/privacy defects.
2. Broken primary journeys.
3. Accessibility blockers.
4. State/persistence defects.
5. Real-device layout blockers.
6. Confusing first-use UX.
7. Copy clarity.
8. Preferences and feature requests.
9. Visual polish.

## 16. Separate defects from preferences / feature requests

A defect means the approved product does not work, misleads, loses data, exposes private data, blocks access, or violates a locked Prompt #1–#12 decision.

A preference means a tester would personally like a different flow, look, setting, or feature.

A feature request means new capability beyond the verified Prompt #1–#12 scope.

Do not implement feature requests during private preview unless the owner explicitly approves a new phase. Feature-request bloat is a launch-risk.

## 17. What must happen before moving beyond private preview

Before closed beta / broader testing:

- Complete iPhone and Android real-device QA.
- Resolve all P0/P1 defects.
- Complete manual screen-reader basics.
- Complete owner/SME content review.
- Approve privacy/legal language and data handling.
- Decide production storage/auth/encryption model.
- Establish private HTTPS deployment with rollback.
- Define monitoring that excludes private reflection content.
- Confirm Support/crisis resources by launch jurisdiction.
- Run a small first-responder usability round and document outcomes.

## 18. What not to do next

Do not:

- start public launch,
- start TestFlight,
- begin Prompt #13,
- add features,
- collect private reflections as research data,
- market this as clinically validated,
- claim production security/privacy,
- broaden tester group before internal real-device checks pass.

## 19. Exact recommended next action

Create or choose a private HTTPS preview path for the checkpoint tag `path-to-rise-prompt-1-12-rc1`, then run the 10-minute owner smoke test on one iPhone and one Android device before inviting external testers.
