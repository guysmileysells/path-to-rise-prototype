# Whole-prototype word-spacing review — evidence

Owner: Discord `1575167851134849035`. Baseline: `692217b875966fd984877e3a5196701552b7141a`. App: https://guysmileysells.github.io/path-to-rise-prototype/#today.

## Scope / changes
- 49 explicit JSX word separators in existing shared controls, counts, notices and headings. No CSS, typography, wrappers, layout/order, storage or private-writing handler changes.
- `formatProgramText` uses explicit source-proven corrections at canonical-copy render sites only. 58 source strings gain 73 spaces. Source file and 476 task objects remain unchanged; two task presentations gain spaces, preserving every other character and their full structure/order.
- Countdown, acronyms, repetitions, units, numbers, punctuation, URLs, data bindings and user-authored writing are preserved. This is not a redesign, clinical rewrite or missing-source repair.

## Direct evidence
- `red-source.txt`, `red-browser.txt`: demonstrated defects before implementation.
- `source-spacing-report.json`: all 4,552 source strings, 58 corrections / 73 added spaces; idempotence, non-whitespace equality and actual task presentation checks.
- `source-spacing-baseline.json`: original Git source hash and 476 original normalized-presentation digests. Extracted read-only by `extract-baseline.mjs`; not regenerated to approve modified output. Mandatory `npm run word-spacing` verifies this fixture.
- `presentation-whitespace-delta.json`: exact two affected presentations, before/after.
- `source-preservation.json`: 13 protected source files byte-identical to pre-work snapshot, including source/model/CSS/storage.
- `aggregate-final.txt`, `lint-final.txt`: aggregate scenarios, TypeScript and production build PASS; lint PASS. Existing bundle-size advisory remains outside scope.
- `browser.txt`: full 56-test mobile/desktop regression PASS. A subsequent test-only change adds durable per-state JSON, relative URLs for GitHub Pages, and isolated screenshot names; rerun recorded in `browser-reporting-followup.txt`. Runtime source unchanged; CI must rerun the final suite.
- `local-verification.json`: all 28 days, 448 required + 28 optional panels, order/downward geometry/word boundaries, 320/768/1280 extra widths, exact JS/CSS identity, zero page errors, unchanged isolated synthetic storage. The hosted verifier additionally asserts both changed Day 3 paragraphs explicitly.
- `local-visual-check.json` and `local-mobile-*.png`: real mobile-viewport metrics and corrected breathing paragraph, inspected visually. Nested scroll position deliberately set before capture.
- Independent acceptance `deleg_af3afa8e`: PASS; in-memory baseline comparison proves all 476 presentation structures/order/non-whitespace content and raw source unchanged. AST comparison confirms only 49 JSX spaces, seven canonical formatting calls and import. No private-writing transforms, storage/ID/chronology changes or unsafe sinks.

## Publication status
Pending final CI/Pages deployment and hosted asset, all-day and all-interface verification. No hosted spacing-release acceptance claimed yet.

## Limits
Automated Chromium viewport checks are not physical iPhone/Android, manual screen-reader or clinical/legal/privacy/security approval. Existing Day 16 source gaps remain disclosed. Owner writing was not inspected or altered; storage checks use isolated synthetic contexts.
