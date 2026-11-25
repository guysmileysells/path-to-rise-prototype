# Real-Time Support — implementation and acceptance contract

> Expansion update: owner-authorized ten-tool scope and privacy contract are canonical in `REAL_TIME_SUPPORT_EXPANSION.md`; scientific evidence in `REAL_TIME_SUPPORT_EXPANSION_EVIDENCE.md`; current engineering/clinical gates in `REAL_TIME_SUPPORT_EXPANSION_VERIFICATION.md`. Original five are preserved exactly. The owner-authorized ten-tool mobile test preview is now hosted and verified; general/clinical release is not approved. Current status is in `REAL_TIME_SUPPORT_EXPANSION_VERIFICATION.md`.


Status: original-five contract retained as history; the ten-tool mobile test preview is now published and engineering/hosted checks pass. Clinical and physical-device acceptance remain unverified. Owner has authorized expansion to ten; `docs/REAL_TIME_SUPPORT_EXPANSION.md` supersedes the five-tool inventory below while preserving the original five unchanged. Owner-supplied brief: `message.txt`, received in #ronnie after the spacing-release status report.

## Locked owner requirements

Add Real-Time Support on Home, available independently of program enrollment, day and completion. Preserve existing Today / Reset / My Path / Support navigation, all 28 days, original source, IDs, chronology, progress, saved writing, existing 10 canonical tools and RESET need mappings. This is additive, not a replacement or a clinical reclassification of existing content.

Five exact tool names:
1. Physiological Reset — gentle inhale 4 seconds / exhale 6 seconds; interactive 1-, 3-, 5-minute breathing timer.
2. Here and Now Reset — 5 see / 4 feel / 3 hear / 2 smell / 1 taste, followed by present-surroundings orientation.
3. Intrusive Thought Reset — notice, identify, separate from thought, identify controllable action, take constructive action; ACT-informed defusion, not thought suppression.
4. Respond, Don't React — Stop / Take a moment / Observe emotion and immediate urge / Proceed intentionally.
5. Post-Incident Recovery Reset — establish safety, check physical/emotional state, regulate, immediate needs, connect, next constructive action. PFA-informed, never trauma recounting or compulsory debriefing.

Each tool opens downward immediately below its own button. Exact section order: **What → When → How → Why → Benefits → Duration → Adaptations → Scientific References**. What: 1–2 sentences. When and Benefits: 3–5 examples each. How: numbered complete sequence. Mechanisms and potential benefits must be conservative and evidence-informed, not clinical guarantees.

Every tool: Start Guided Practice; one step at a time; optional audio; optional before/after 0–10 distress rating; stop/exit at any time. Separate Connect With Support button. Cream/forest branding, readable mobile layout, accessible names/focus/reduced motion.

## Conservative implementation defaults

- Persistent header entry on Home and all current tabs, without adding a primary navigation tab. Separate standalone screen; returning preserves underlying program state.
- No account, backend, tracking, diagnosis, AI interpretation or new stored wellness history.
- Ratings are optional, initially blank and kept only in this tool's in-memory session. Skipping is equally prominent. No comparison interpreted as clinical improvement. No thought/incident narrative or free-text disclosure required.
- Audio is off by default. Only fixed tool guidance can be spoken, using an available on-device browser voice; no paid TTS, private writing, ratings or incident details sent to a speech API. If unavailable, say so and keep text usable. Stop/collapse/exit/navigation cancels audio and timer; hidden tab pauses practice.
- Browser-only prototype: once loaded, text/guidance/timer may work with the connection off. Cold-start/offline reload, installation and reliable background operation are NOT promised; no new service-worker/PWA infrastructure is implied by 'offline where possible'. External references/support websites and some device voices require connectivity.
- Before practice, confirm stationary/safe setting; never while driving, operating equipment or safety-critical duties. Never require eyes closed, forceful breathing, breath holds, triggering memories, touching/smelling/tasting unsafe objects or substances. Stop if dizzy, uncomfortable or more distressed; return to ordinary breathing/orient externally and connect with support.
- Reuse existing Canada-labeled support boundaries: 9-8-8 suicide crisis support, 9-1-1 immediate danger; outside Canada use verified local resources. Peer/EAP/professional options are real categories, not invented partnerships or monitored chat.
- Guidance is educational prototype draft, not treatment, emergency assistance, clinical approval or validated first-responder-specific efficacy. Research supports mechanisms/principles with limitations; the exact five assembled flows are not presented as tested clinical protocols.

## Current baseline / release blocker

Previous spacing PR #4 merged at `ed0e9a31e8a65dbd50ad1acc729e3a40a2d344ae`. Pages run `45649635917` failed before deployment: 55 browser tests passed, one failed. Expanded Your space/reminder/privacy screen had `scrollWidth=422` versus `clientWidth=390` (allowance 391) on the Linux mobile runner. That historical measured overflow is now resolved by the one-declaration select min-width repair: the original unchanged mobile assertion passed on Linux in run `45712510668`. No overflow hiding or weakened assertion was used. Preserve all unrelated dirty docs/evidence.

## Proof slices / exit gates

1. Record baseline hashes for all source/content/storage/model files that this feature must not change; inspect current support/navigation and failed CI evidence.
2. Verify original research/guidance URLs and bibliographic metadata; create evidence matrix tying each reference to claims and limitations. No invented citations.
3. RED→GREEN independent home/header entry and first downward tool, then deterministic breathing clock (all three durations, pause/resume, late ticks, stop/reset).
4. RED→GREEN remaining four complete flows, exact heading order, numbered steps, safe opt-out, optional session-only ratings, audio availability/cancellation and interruption handling.
5. Browser-test all tools at mobile/desktop/narrow sizes: geometry, each guided step, all duration boundaries using controlled browser clock, finish/stop/exit/collapse/nav, hidden-tab interruption, support access, optional audio capability, in-loaded-tab offline use and unchanged existing storage/program/RESET behavior.
6. Independent read-only review; full aggregate/lint/build + original browser suite with inherited mobile blocker genuinely fixed. No source-baseline regeneration to conceal drift.
7. Publish through existing gated Pages workflow only after checks; verify actual public assets and new functions at same URL. Log raw evidence and separate local, CI, hosted and human/device/clinical approval.
8. Physical phone, audible output on owner devices, manual screen reader, clinical/SME/privacy/legal approval and offline cold start remain NOT VERIFIED unless actually performed.

## Likely implementation files

New: `src/realTimeSupportContent.ts`, `src/realTimeSupportState.ts`, `src/RealTimeSupport.tsx`, `src/realTimeSupport.css`, `scripts/real-time-support-scenarios.mjs`, `tests/browser/real-time-support.spec.ts`, `docs/REAL_TIME_SUPPORT_EVIDENCE.md`, `evidence/real-time-support/`.
Minimal integration: `src/App.tsx` (header entry, standalone screen, support navigation), `package.json` (new scenario gate). Any inherited settings-layout fix must be separately evidenced and documented. Do not modify raw program/task data or existing storage schemas.
