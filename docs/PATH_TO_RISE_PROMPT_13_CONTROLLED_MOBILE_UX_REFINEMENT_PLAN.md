# PATH TO RISE — PROMPT #13 CONTROLLED MOBILE UX REFINEMENT PLAN

Created: 2026-10-03 23:25 PDT
Status: APPROVED PLAN — implementation scoped to this pass only

## Owner-approved objective

Keep the depth. Simplify the experience.

This pass is not a redesign, not a feature expansion, not a 28-day program rewrite, and not Prompt #14.

## Protected baselines

- Prompt #1–#12 checkpoint: `045af500ff6901fa56494d33512cfd6e8d3c8311`
- Tag: `path-to-rise-prompt-1-12-rc1`
- Prompt #13 final package: `ad65585fe38bbbf6f96b1ad940e932d245ca7266`
- Current Stage 1 docs baseline before refinement: `d7beca6af09e34ad9162f6f69c73d8b8a2bee23b`

No checkpoint rewrite or deletion is authorized.

## Change plan

| Screen | Current problem | Change | Why | Expected UX benefit | Source-fidelity risk | Accessibility risk | Regression risk |
|---|---|---|---|---|---|---|---|
| My Path | Highest-density route; mixes dashboard, insights, 4-week map, 28-day grid, saved practice/reflection summaries, privacy note, and full Day content in one scroll. | Create calmer default My Path: keep progress summary visible, add one primary `Open/Review Day` action, move insights/journey/day grid/practice/reflection/privacy into explicit `details` groups, and hide full Day content until deliberate tap. | Separates overview from detail without removing content. | User can answer where they are and what to do next faster. | Medium: full day/source content must remain intact and reachable. | Medium: disclosures must remain semantic, tappable, keyboard/screen-reader friendly. | Medium: My Path flow and Day completion/reflection must still work. |
| Day experience | Daily content can feel like a full workbook/article on mobile. | Keep all sections, but add a compact orientation/header and make section cards read more like steps with clearer current progress and softer repeated metadata. Do not delete source text. | Helps the user understand today’s focus, current step, what remains, and how to continue. | Lower scanning burden while preserving full source-backed day content. | Medium-high: no content loss acceptable. | Low-medium: maintain headings, buttons, reflection fields, touch targets. | Medium: section toggles, reflection save/delete, complete-day logic must still work. |
| RESET | Nine equally visible need cards create decision burden in a low-bandwidth pathway. | Show first five primary need cards immediately; place remaining need options inside `More RESET needs` disclosure; keep Support and Toolbox visible. | Reduces first-view choice load without removing options. | Faster scan and clearer first action. | Low: resetNeeds data unchanged. | Medium: hidden secondary needs must remain accessible. | Medium: every need must still route to valid tools. |
| Toolbox | Full catalogue, empty favourites/recent, and all categories compete simultaneously. | Put current-week tools first; group saved/recent tools and full browse catalogue behind disclosures; keep all canonical tools and categories. | Preserves usefulness but prevents all tool information from competing at once. | User can quickly answer “what tool would help me right now?” | Low-medium: all 10 canonical tools must remain reachable. | Medium: disclosure labels and controls must be clear. | Medium: tool launch/favourite/recent flows must still work. |
| Today/Home | Top is good, but trust/settings/prototype controls add administrative weight below. | Keep primary journey action and Reset visible; group personalization transparency, reminders, and local data controls in one calm `Privacy, reminders + local data` details area. | Supports “What should I do right now?” while preserving privacy and data controls. | Lower visual/admin load on first screen. | Low: no content removal. | Medium: important privacy/local data controls must remain discoverable. | Low-medium: reminder and clear-data controls must still work. |
| Support | Not the main density problem; safety-critical. | No major structural change. Preserve Support as bottom-nav item and keep urgent help visible. | Avoid hiding safety-critical access for aesthetic minimalism. | Support remains easy to find. | Low. | Low if unchanged. | Low. |

## Explicit non-goals

- Do not remove source-backed program content.
- Do not change the 28-day program or source mapping.
- Do not remove Support or hide crisis/urgent help.
- Do not add features.
- Do not change bottom navigation labels/count.
- Do not add streaks, scores, rankings, pressure, or engagement manipulation.
- Do not misrepresent localStorage/privacy limitations.
- Do not begin Prompt #14.

## Verification plan

Required commands after implementation:

```bash
npm test
npm run lint
npm run build
npm run final-audit
```

Additional checks:

- Days 1–28 intact.
- 311 sections represented.
- 10 canonical Toolbox tools intact.
- RESET mappings intact.
- Day 28/no Day 29 intact.
- Reflections still save/delete locally.
- My Path still opens Day content and completion controls.
- Support remains reachable from bottom nav.
- Mobile preview has no obvious clipping/overflow/horizontal scroll.
- Owner physical iPhone retest remains required before resolving P13-F0002.
