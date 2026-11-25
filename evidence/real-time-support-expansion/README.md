# Ten-tool mobile test preview — hosted acceptance

## Current public mobile-test preview — 2026-11-25
**Live:** https://guysmileysells.github.io/path-to-rise-prototype/#support → **Real-Time Support**. Owner message `1575273174076096513` authorized the existing publicly accessible URL for testing the ten-tool version on phones. This is not private/access-controlled, clinically approved, public-beta or production-ready.

- App source `d905df7f0bace77fbc4209c586320b823fb589c6`, merged as `d37f6c9deff247f0a448fb2ba6d408e62d77dd28` via [PR5](https://github.com/guysmileysells/path-to-rise-prototype/pull/5). [Pages run 45712510668](https://github.com/guysmileysells/path-to-rise-prototype/actions/runs/45712510668) completed successfully: **106/106 Linux browser tests**, aggregate/build/lint PASS. The unchanged mobile settings overflow assertion also passes with the actual select min-width fix; the former failed spacing run is superseded.
- All ten hosted tools passed eight-heading/start-stop/loaded-tab-offline/geometry checks at **320, 390 and 1280px**; no captured page errors, practice storage writes or non-GET app requests. Visible educational/not-clinically-reviewed warning remains; original five and 13 protected source/model/storage files pass preservation gates. Four primary tabs and the 28-day/16-required-task model are unchanged; no owner data was cleared.
- Source/test checkpoint `703565d5ddfde14767885552cadb273ff6f89b765377d6fad343260167d867d2` (71 files). Evidence: `evidence/real-time-support-expansion/release-summary.json`, `release-deployment.json`, `release-browser.txt`, `hosted-verification.json`, `release-ci-proof.txt`. Canonical scope/gates: `docs/REAL_TIME_SUPPORT_EXPANSION.md` and `docs/REAL_TIME_SUPPORT_EXPANSION_VERIFICATION.md`.
- **Still NOT VERIFIED:** clinical/SME, physical phones/Safari, audible device speech, manual screen readers and privacy/legal review. Loaded-page offline is not offline reopening. Day16’s three existing source gaps remain. Older local-only/pending paragraphs below are historical checkpoints, not current publication status.

## Current committed proof
- `release-aggregate.txt`, `release-lint.txt`: fresh aggregate, source-preservation, TypeScript/build and zero-warning lint.
- `release-browser.txt`: fresh 106-case local production-preview PASS; `release-ci-proof.txt` plus linked workflow: 106-case Linux CI PASS.
- `release-manifest.json` / `release-snapshot.mjs --check`: frozen runtime/test identity, CRLF/LF-only text normalization and byte hashes for binary assets.
- `hosted-verification.json`, `release-hosted.txt` and `hosted-*-ten-tools.png` / `hosted-*-pmr.png`: actual live route; ten tools and eight headings at three widths; optional-practice start/stop and no rating writes; screenshots are browser renders, not physical phones.
- `original-five.json`, protected-source fixture and aggregate scenarios: original five/breathing copy and thirteen original source/model/storage files unchanged.
- `independent-review.md`: limited technical review only; its historical local-only/public-gate wording is not clinical approval, and owner test-access authorization is recorded above.

## Historical local evidence index
Some historical files below remain local rather than part of this scoped release; current committed acceptance evidence is listed above.

# Ten-tool expansion evidence

Canonical requirements: `docs/REAL_TIME_SUPPORT_EXPANSION.md`.
Scientific sources/limits: `docs/REAL_TIME_SUPPORT_EXPANSION_EVIDENCE.md`.
Human-readable results/clinical gates: `docs/REAL_TIME_SUPPORT_EXPANSION_VERIFICATION.md`.

- `original-five.json`: immutable pre-expansion original records/guide; never regenerate to hide drift.
- `*-red.txt`: observed missing features/contract violations before implementation.
- `aggregate.txt`, `lint.txt`: final aggregate/build/lint.
- `browser-final-built.txt`, `final-built-results.json`: FINAL PASS — 106 passed, zero failed/flaky/skipped; existing production preview, two workers, no server lifecycle.
- `browser-full.txt`, `final-artifacts/`: superseded port-conflicted/mixed attempt, NOT final proof.
- The JSON reporter originally wrote a nested config-relative path; its exact contents were copied to the indexed final-built-results.json. No results synthesized.
- `browser-before-final-copy-check.txt`: superseded interrupted broad run; NOT a full pass.
- `served-mobile-offline.json`: ten-tool built-page offline/geometry/storage checks at three widths.
- `audio-lifecycle.json`: modelled voice control lifecycle at two widths, not audible device evidence.
- `reference-verification.json`: actual bibliographic and safety-source response results including initial 429 and successful retry.
- `independent-review.md`: limited independent technical acceptance and explicit coverage boundaries.
- `local-*-ten-tools.png`, `local-*-pmr.png`: actual mobile/desktop screenshots; a scrolled viewport does not necessarily display the full ten-row library at once.
- `tracked-status.txt`: preserved tracked work inventory; this task did not reset/stage/commit unrelated WIP.

General/public-beta or production release remains gated on clinical/SME review; the owner-authorized mobile TEST preview above is not that approval. Offline scope is already-loaded tab only.
