# Daily task chronology and downward expansion

## Owner authority and scope
Current instruction: Discord `1574203172476420148`, 2026-11-22. Apply to existing GitHub **functioning version** https://guysmileysells.github.io/path-to-rise-prototype/#today. Main ChatGPT design reference is unchanged.

All28 days: order every existing task from waking through bedtime. Each task title opens instructions **downward directly below its own title**, in normal document flow. No upward/sideways panels, popup/modal, overlap, or covered adjacent buttons. Consistent spacing and formatting. Preserve all existing content, stable task IDs, completion/undo, private writing and reminders.

This supersedes the earlier placement-only exception that showed Day1 alarm setup first. Its unchanged `Tonight, before bed` task belongs at bedtime under the latest literal chronological requirement. Days2–28 still start with their wake-up countdown.

## Known baseline
- Inspected repo branch master, HEAD `c4f4cb1436670c75179f69a514de91fa70822c1e`; functioning version inspected live.
- Source/task presentation already has What / When / How / Benefits; do not rewrite those or repair unrelated content in this task.
- Existing task arrays group morning, six daily domains, evening. Daily source timings vary by week, including relative dependencies (physical → writing → stillness → questions).
- Existing InlineExpansion renders its region after its trigger and scrolls to the short trigger. Add explicit vertical-flow enforcement and geometry regressions; do not substitute portals or dialogs.
- Three existing modified docs and unrelated untracked planning/evidence files must remain preserved. No destructive Git operations or broad staging.

## Chronological display contract
- Shared display-only schedule: Morning → Midday + afternoon → Evening → Bedtime. Counts remain16 required/day; optional reflection stays nonblocking.
- Morning: existing waking/hygiene routine, then physical daily activity; include writing/stillness where the source places them after the morning activity or mid-morning.
- Midday + afternoon: midday or flexible daily activities in source dependency order. Writing → stillness → questions stays ordered where specified. Afternoon-or-evening / anytime tasks retain their original timing labels and remain flexible; these slots are recommended reading order, not new clinical/scheduling instructions.
- Evening: explicit evening daily environment task (when specified), then existing evening hygiene, affirmations, gratitude and small-wins writing.
- Bedtime: existing final pride reflection, Day1 alarm setup (Day1 only), optional original end-of-day reflection. No source content changes.
- Missing Day16 timing/content is not invented; existing explicit missing-source notices remain. Layout acceptance is not content completeness.
- Resume/next-action follows the same display order. Completion keys/counters are unchanged; progress section displays derive from the new display groups without migrating source task identities.

## Acceptance and verification
1. RED→GREEN: Day1 bedtime alarm; all28 complete one-to-one ID/content preservation; relative dependencies; next action agrees with display.
2. Browser test every required row on all28 days: panel below trigger, same column, normal flow, neighbour begins below panel, consistent gaps, no overlay/dialog or horizontal overflow; child switch/collapse/keyboard/long writing/reload/undo.
3. Aggregate/build/lint + full browser regression, independent read-only review, candidate snapshot check.
4. Publish through existing Pages workflow after passing gates. Require terminal deploy success, exact served JS/CSS match and hosted task order/downward-layout checks. Physical devices/manual screen-reader/clinical/legal sign-off remain NOT VERIFIED.

## Execution status
Local implementation verified: aggregate/TypeScript/build PASS; lint0 warnings/errors; **54 mobile+desktop browser tests PASS**; production-preview all28 days/448 downward non-overlapping task rows plus320/768/1280 widths PASS,0 page errors,2 exact asset matches,synthetic storage unchanged. All476 source task/reflection records unchanged, independent review PASS. Evidence: `evidence/task-order-expansion/README.md`, `browser-final.txt`, `local-verification.json`, `task-content-baseline.json`. Pages publication and hosted verification PASSED for merge `692217b875966fd984877e3a5196701552b7141a` ([run 45085345429](https://github.com/guysmileysells/path-to-rise-prototype/actions/runs/45085345429)). `evidence/task-order-expansion/deployment.json` records terminal deployment success; `hosted-verification.json` records all 28 days, 448 required rows, 2 exact served-asset matches and PASS. Historical 52-test/35-layout evidence is not used as acceptance for this change.
