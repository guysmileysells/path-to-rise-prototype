# PATH TO RISE — FINAL OPEN-ITEM REGISTER

Generated: 2026-10-03 20:30 PDT

This is the canonical Prompt #12 register. It separates product defects from launch risks and preserves older `PARTIAL` / `NOT VERIFIED` items instead of letting them disappear.

## Current P0 status

No unresolved P0 STOP SHIP defect was found for the locally validated browser prototype / internal testing level.

## Canonical open launch items

| # | Severity | Area | Status | Blocks | User impact / reason | Owner | Evidence required to close |
|---:|---|---|---|---|---|---|---|
| 1 | P1-PUBLIC | Real-device testing | NOT VERIFIED | Public launch / TestFlight | No physical iPhone/Android/tablet pass has been performed. Browser viewport checks are not real-device testing. | Owner + QA | Run real-device package and capture failures/screens. |
| 2 | P1-PUBLIC | Privacy/legal review | NOT VERIFIED | Public/commercial launch | Reflection/progress data can be sensitive. No professional privacy notice, terms, consent, retention, deletion, or processor review completed. | Privacy/legal professional | Approved privacy/legal pack and launch policy. |
| 3 | P1-PUBLIC | Production storage architecture | PARTIAL | Public launch with real users | Current sensitive data is browser localStorage only. Suitable for prototype/internal review with disclosure; not production persistence/recovery. | Product/engineering/privacy | Choose local-only/no-account or backend account model; document deletion/recovery. |
| 4 | P1-PUBLIC | SME/content review | NOT VERIFIED | Public/clinical-adjacent release | Source-backed content exists, but qualified final trauma-informed/clinical-boundary review has not occurred. | Program owner + qualified SME | Signed review notes or required text edits. |
| 5 | P1-PUBLIC | Manual accessibility review | NOT VERIFIED | Public launch | Automated/static/keyboard foundations pass; manual screen-reader and large text device review required. | Accessibility specialist | Manual checklist completed with issues closed/accepted. |
| 6 | P1-PUBLIC | Production deployment/rollback/monitoring | NOT IMPLEMENTED | Public launch | No permanent deployment, domain, HTTPS policy, production versioning, error monitoring, or rollback runbook verified. | Engineering/release owner | Deployment proof, smoke test, monitoring, rollback test. |
| 7 | P2 | Vite chunk-size warning | PARTIAL | Closed beta/public beta polish | JS bundle is 556,545 bytes / gzip 130,864. Warning exists but no measured UX blocker in local preview. | Engineering | Real-device load timing or code-splitting if needed. |
| 8 | P2 | Cross-browser matrix | PARTIAL | Beta confidence | Chromium-like local browser exercised; Safari/WebKit, Firefox, Edge matrix not completed. | QA | Browser matrix results recorded. |
| 9 | P2 | Target-user usability | NOT VERIFIED | Product confidence | No first-responder/shift-worker usability sessions completed by agent. | Product owner | Run target-user script with notes. |

## Extracted unresolved/open-item signals from Prompt docs

These excerpts were mechanically scanned from existing PATH docs for `NOT VERIFIED`, `PARTIAL`, `FAIL`, `P0`, `P1`, `KNOWN LIMITATION`, `DEFERRED`, `HUMAN`, `EXTERNAL REVIEW`, `PRODUCTION INFRASTRUCTURE`, `REAL-DEVICE`, `LEGAL`, `SME`, `PENETRATION`, `SCREEN-READER`, and `PUBLIC LAUNCH`.

- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:42` — Important scope note: this audit is based on the current prototype and staged source files. It does not claim clinical, legal, privacy, or production approval.
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:48` — ## Overall assessment
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:84` — - Do not replace the four-tab navigation unless user testing proves it fails.
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:406` — - “failed day” language
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:585` — - accessibility screen-reader test;
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:587` — - real-device mobile review.
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:605` — - Clinical/safety/legal claims review.
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:631` — ## P0 — Critical / Foundational
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:633` — ### P0.1 Build the 28-day source-fidelity inventory
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:645` — ### P0.2 Define safety/review status for each content item
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:654` — - Dependencies: safety/clinical/legal reviewer workflow.
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:657` — ### P0.3 Preserve support/crisis access independent of account/payment
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:662` — - User benefit: user can get human support quickly.
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:669` — ### P0.4 Decide production data boundaries before collecting private data
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:678` — - Dependencies: legal/privacy review.
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:681` — ## P1 — High Impact
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:683` — ### P1.1 Create the real 28-day My Path experience
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:691` — - Dependencies: P0 content inventory.
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:694` — ### P1.2 Turn daily lessons into guided task cards
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:705` — ### P1.3 Implement real Toolbox and approved RESET rules
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:716` — ### P1.4 Add no-shame progress/resume
- `PATH_TO_RISE_ELITE_PRODUCT_AUDIT_AND_ROADMAP.md:784` — Weak ideas removed or deferred:
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:6` — Product standard: Calm enough for an activated user. Simple enough for an exhausted user. Strong enough for a first responder. Polished enough to feel premium. Human enough to build trust.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:41` — - Humanity
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:188` — - Error colour is for failed saves, unavailable actions, and recovery steps.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:286` — - **States:** default, pressed, focused, disabled, loading, error recovery if submission fails.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:337` — - no red failure states for missed days.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:369` — - completion can be partial without shame.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:494` — - No lengthy assessment before usefulness.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:582` — Tap → Processing → Success / Saved → Failure recovery
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:632` — - human;
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:673` — - red missed-day failures;
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:685` — Not failure states.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:764` — - when saving fails;
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:867` — - **States:** ready, active, paused, completed, saved, failed save.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:906` — - **Error/empty:** no red failure missed-day state.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:915` — - **States:** empty, draft, saving, saved, failed save, offline queued.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:927` — - **States:** day complete, tool complete, week complete, program complete, save failed.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:930` — - **Error/empty:** if save fails, explain and retry without losing user input.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:980` — **PASS criteria:** tap/processing/success/failure defined, save status clear, recovery clear, repeated taps do not duplicate submissions, completion unmistakable without excessive celebration.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:1018` — A screen fails if its purpose is hard to understand in the state where it is expected to be used.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:1045` — **PARTIAL RISK.** The current green/cream palette overlaps wellness conventions, but the serif hero, direct first-responder copy, grounded structure, and no-shame tone make it more distinctive. Prompt #4 should avoid gen
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:1061` — **PARTIAL.** Today and RESET are close, but current Reset prototype asks three steps. The production standard should prefer need-first and reduce questions where possible.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:1085` — | Interaction Feedback | PASS | tap → processing → success/failure standard defined |
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:1092` — ## Remaining partial items for implementation phases
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:1153` — - No critical FAIL remains.
- `PATH_TO_RISE_FINAL_DESIGN_SYSTEM_AND_UX_STANDARD.md:1154` — - PARTIAL items are implementation-verification tasks, not missing design decisions.
- `PATH_TO_RISE_FINAL_PRODUCT_ARCHITECTURE_BLUEPRINT.md:61` — | Help / Support | Human and crisis support | “I need more than the app.” | Reach support level/resource | verified resources, region/fallback, trusted contacts | primary tab; available from tools and lessons |
- `PATH_TO_RISE_FINAL_PRODUCT_ARCHITECTURE_BLUEPRINT.md:79` — - It keeps immediate regulation and human support one tap away.
- `PATH_TO_RISE_FINAL_PRODUCT_ARCHITECTURE_BLUEPRINT.md:397` — Avoid long assessments under stress.
- `PATH_TO_RISE_FINAL_PRODUCT_ARCHITECTURE_BLUEPRINT.md:563` — No streak reset. No failure language.
- `PATH_TO_RISE_FINAL_PRODUCT_ARCHITECTURE_BLUEPRINT.md:644` — - save pending/saved/failed state;
- `PATH_TO_RISE_FINAL_PRODUCT_ARCHITECTURE_BLUEPRINT.md:718` — Potentially, if we build CMS, backend, analytics, and native app before proving the 28-day experience. Keep the next work to architecture + visual/UX + content model before production infrastructure.
- `PATH_TO_RISE_FINAL_PRODUCT_ARCHITECTURE_BLUEPRINT.md:726` — - Reset starts with need, not a full assessment.
- `PATH_TO_RISE_FINAL_PRODUCT_ARCHITECTURE_BLUEPRINT.md:760` — - Making Reset too slow or too assessment-like.
- `PATH_TO_RISE_FINAL_PRODUCT_ARCHITECTURE_BLUEPRINT.md:770` — - Legal/privacy review.
- `PATH_TO_RISE_FINAL_PRODUCT_ARCHITECTURE_BLUEPRINT.md:810` — 4. Clinical/legal/content approval workflow.
- `PATH_TO_RISE_FINAL_PRODUCT_ARCHITECTURE_BLUEPRINT.md:842` — 4. Accessibility baseline: contrast, dynamic text, reduced motion, touch target minimums, screen-reader labels.
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:20` — - Browser/platform capability assessment.
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:63` — | Unresolved production issues carried forward | Manual/legal/privacy/security/device validation remain assigned, not claimed | PASS |
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:67` — ## 3. Platform capability assessment
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:93` — | Reliable closed-app/lock-screen delivery | REQUIRES SERVICE WORKER / PUSH BACKEND / NATIVE WRAPPER | NOT VERIFIED |
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:94` — | Remote push | REQUIRES PUSH BACKEND | NOT VERIFIED |
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:95` — | Native local notifications | REQUIRES NATIVE WRAPPER | NOT VERIFIED |
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:96` — | Production privacy/security certification | Requires external review | NOT VERIFIED |
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:283` — Status: PASS for current architecture; NOT VERIFIED for real closed-app/device delivery.
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:327` — Deferred:
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:333` — Status: PASS for flexible manual control; NOT VERIFIED for target-user validation.
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:356` — failures: []
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:395` — | Human/brand voice test | PASS |
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:669` — Manual screen-reader certification:
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:672` — NOT VERIFIED — MANUAL VALIDATION REQUIRED
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:675` — Status: PASS for implemented baseline; NOT VERIFIED for real assistive-device certification.
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:701` — NOT VERIFIED — MANUAL VALIDATION REQUIRED
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:704` — Status: PASS for browser runtime responsive checks; NOT VERIFIED for physical phone.
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:722` — | Closed app delivery | No service worker/native delivery in current prototype | NOT VERIFIED |
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:723` — | Real OS lock-screen display | Requires physical device/manual OS testing | NOT VERIFIED |
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:741` — NOT VERIFIED — requires Prompt #11/platform validation
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:744` — Status: PASS for current logic; NOT VERIFIED for production scheduler/device behaviour.
- `PATH_TO_RISE_PROMPT_10_FINAL_IMPLEMENTATION_AND_VALIDATION_REPORT.md:773` — failures: []

## Register interpretation

- Internal/owner preview can proceed if prototype privacy boundaries are explained and users are instructed not to enter highly sensitive production data.
- Closed beta with real first responders requires at minimum real-device testing, privacy/legal posture, content/SME review, and explicit consent/privacy wording.
- Public launch is blocked until production storage, deployment, monitoring, rollback, accessibility, privacy/legal, and external review gates are complete.
