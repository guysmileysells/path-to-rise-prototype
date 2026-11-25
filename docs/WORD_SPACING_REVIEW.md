# App-wide word-spacing review — 2026-11-25

Owner request: Discord `1575167851134849035`: go through entire prototype and ensure correct spacing between words.

## Scope/acceptance
- Target: existing functioning prototype https://guysmileysells.github.io/path-to-rise-prototype/#today, repository `guysmileysells/path-to-rise-prototype`, baseline692217b.
- Audit Today, Your space/reminder/privacy/data panels, RESET's nine need paths, ten Toolbox practices and expanded source instructions, My Path/progress/28 daily task lists and optional reflections, six Feeling Stuck responses and Support. Include text inside controls, headings, prompts, private-writing labels and instruction lists.
- Correct only demonstrated missing/excess word spaces or concatenated adjacent inline text. Do not rewrite wellness advice, change chronology/counts/IDs/storage keys or run transformations on user-authored writing. Valid compounds, apostrophes, acronyms, URLs and measurement notation are not automatically errors.
- Separate source-text, JSX text-boundary and CSS typography causes before fixing. No global word segmentation or dictionary-based automatic rewriting.
- Prove spacing-only equivalence of changed content, stable task identity/order and unchanged storage logic. Preserve original supplied documents and historical evidence; explicitly account for any existing content-fidelity fixtures affected by authorized whitespace corrections.
- Verify actual rendered copy and normal wrapping/geometry on mobile and desktop. Use isolated synthetic browser state only. Physical-device, manual screen-reader and clinical/legal/privacy approvals remain NOT VERIFIED.
- Reuse existing tests/build/Pages workflow; publish only after regression/review gates and verify served assets plus affected rendered text. Reserve capacity for final documentation commit/push, not just app deployment.

## Known/non-blocking
- Existing three Day16 content gaps remain; spacing work does not authorize inventing instructions.
- Previous chronology release is live; its successful hosted/deployment artifacts exist locally while its final documentation closeout was interrupted. Preserve that provenance and reconcile status rather than retesting/redeploying it as a new feature.
- Three canonical docs already contain unrelated uncommitted changes. Preserve their bodies; stage only owned new release sections if touched.

## Findings and result
- Read-only source audit confirmed 58 source-origin passages needing 73 additional spaces: 41 numbered-domain rows, 16 ellipsis-bearing passages and one ampersand join. The source file is kept byte-identical; an explicit, idempotent display-only allowlist handles these defects without changing punctuation or wording.
- Added 49 explicit JSX separators in shared label/count/disclosure/need/support templates. CSS gaps/new lines are not a substitute for actual text boundaries. Typography, CSS, task order and data models remain unchanged.
- Corpus execution PASS: all 4,552 source strings preserve equality after removing whitespace; all 476 actual task presentations are formatted; countdowns, acronyms, URLs, units and repeated affirmations remain intact.
- RED evidence: `evidence/word-spacing/red-source.txt` and `red-browser.txt` reproduce the defects. Final local aggregate/TypeScript/build/lint PASS; 56 full mobile/desktop browser tests PASS, followed by 2 reporting/subpath checks with 59 interface states per viewport. All 476 served panels plus extra widths, spacing/geometry/assets and unchanged synthetic storage PASS. Independent source/AST review PASS. CI/Pages and hosted spacing verification remain pending.
- Prior task-order release closeout checked against its saved deployment/hosted JSON and corrected in its contract/evidence records; this does not claim the current spacing candidate is published.
