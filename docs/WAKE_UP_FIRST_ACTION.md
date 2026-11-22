# Today’s Tasks — wake-up to bedtime

## Latest refinement — four-section task rows
Owner instruction `1574129028191752326` retains one downward-expanding **Today’s Tasks** tab for every day and an individually expandable title row for each task. Inside each task, show only **What**, **When**, **How**, **Benefits**, plus the existing completion/undo action and any private writing controls needed by that task. Keep concise copy, correct word spacing and consistent paragraph/list formatting across all 28 days. Preserve chronological order, stable task IDs, the approved 16-action model and saved state. Do not add extra task-detail headings, duplicate shortcuts or infrastructure.

The known Days 8–9 writing-question extraction defect must be fixed and regression-tested, not hidden by summarization. Original questions and exact required affirmation text remain intact within How. Do not invent exact clock times or health claims. Day 16’s three absent source blocks remain explicitly identified; this formatting authorization does not supply missing canonical instructions. Current task content can be rendered with a source-gap notice rather than pretending those instructions exist.

Implementation follows this updated contract; earlier layout/copy details below remain relevant only where compatible. Publishing continues to target the explicitly authorized GitHub functioning version, never the ChatGPT reference.

## Approved current scope
Owner instruction `1572467545762439209` supersedes earlier wording and layout in `1572457581329383485`. Execution target: GitHub **functioning version**, https://guysmileysells.github.io/path-to-rise-prototype/#today. ChatGPT main/design reference remains unchanged.

Implement all 28 days with ONE expandable tab labeled **Today’s Tasks**. Opening it reveals ordered individually expandable task rows with instructions and Mark as Done / Undo. The first row is Day 1 alarm setup or Days 2–28 countdown; remaining existing tasks follow morning → midday → evening → bedtime. Do not repeat the old alarm+get-up pair on every day or duplicate task panels outside the tab.

### Exact Day 1 title and instructions
**Set Your Alarm**

Tonight, set your alarm 15 minutes earlier than you usually wake up. Those extra minutes give you room to start the day at your own pace. If you can, move bedtime 15 minutes earlier too so you keep that sleep time.

### Exact Days 2–28 title and instructions
**First Win — 5–4–3–2–1, Get Up**

When your alarm goes off at the time you set on Day 1, count down 5–4–3–2–1 and get out of bed on 1. Mark it done once you’re up. That’s your first win of the day.

## Progress and compatibility contract
- Consolidate the old two overlapping morning actions into this one day-specific first action, followed by the other four existing morning actions, six day-specific activities and five evening/bedtime actions. Current totals: **16/day, 112/week, 448/program**. Earlier 17/119/476 contracts describe the prior release, not this change.
- Keep existing active task IDs: Day 1 alarm (`morning-01-set-your-alarm`); Days 2–28 countdown (`morning-02-five-four-three-two-one-get-up`); unchanged morning `03..06`, daily and evening IDs.
- Retain valid retired-row completion IDs in browser-local storage as historical records, but do not display/count them or choose them as next task. Never transfer one task’s completion to another or to another day.
- Existing storage keys/schema, saved writing, reminders, legacy completed-program state and no-Day-29 behavior stay intact. No clearing data, no alarm scheduling or real notification claims, no new clinical claims.
- Reflection remains optional and separate from required totals, accessible near bedtime inside Today’s Tasks. Support/Feeling Stuck remain separate and available.
- Task rows are actual accessible expand/collapse controls; instructions open downward in their own row. Completion does not close the row unexpectedly. Keyboard focus returns to its surviving row trigger; closing the outer tab restores its own trigger.
- Existing day-specific source sequence is preserved rather than inventing exact schedules for source activities. Day 1 setup stays first even though it is performed tonight, as explicitly requested.

## Verification plan
1. RED→GREEN model scenarios: latest exact copy, all28 correct first action, active stable IDs,16/112/448 totals, archive records retained but uncounted, all16 complete/undo, invalid IDs/day29 rejected.
2. RED→GREEN browser path: one collapsed Today’s Tasks on each day; expand reveals correct first row; each row expands instructions and independent completion; reload/day switch/undo retain own-day state and private writing.
3. Existing aggregate/build/lint and full browser regression; review model + UI compatibility independently.
4. Publish via existing Pages workflow only after gates pass. Verify deployment terminal success, served assets and rendered first-row/copy/completion on hosted version. Use synthetic contexts, not owner data.

## Baseline / limits
- Baseline `d8186e0cd9a09954646ef17e17edc8085b3fca2f` on master. Existing untracked planning/evidence/review files are unrelated and must stay untouched.
- Implementation/test/deployment evidence to be appended once executed. No claim of real-phone, screen-reader, clinical or legal validation.

## Four-section implementation and source repair
- Shared `getTaskPresentation` projects actual task data into What / When / How / Benefits without changing stored IDs or task objects. The shared renderer uses exactly four headings; affirmations, safety notes and private writing remain within How. Source benefits/rationale are kept concise; no invented schedules or benefits for missing source.
- Fixed paper-answer filtering: remove underscore filler, never the full question. Exact fixtures now cover all 22 lost questions across Days 8–9 Emotional/Intellectual tasks. Presentation scenarios verify all 448 required task views and 469 full source question lines, plus exercise reps/holds/rest timing, quotes and safety notes.
- Week 1’s parser also cut content after Prompt(s):. Baseline comparison of all 42 tasks proved every non-instruction field and existing instruction unchanged; added lines are verbatim from the same canonical task block (questions and writing guidance). `evidence/task-four-sections/preservation.json` records that proof; the Week 1 instruction digest was refreshed only after this comparison.
- Focused mobile browser checks cover all 448 task rows (four headings each), exact 3×/6×/9× cards, Day8/9 private-writing save/reload and independent completion/undo. Full final-source gates and publication remain pending at this checkpoint.

## Final local acceptance — 2026-11-22
Frozen runtime/test source `c689bf84ea793ff705cf643856a89d12392c43bf02ab6c73f08fc0934f7fb7b9` (51 files) passed aggregate scenarios, TypeScript/build, lint (0 warnings/errors), all **52 mobile/desktop browser tests**, all 448 required task presentations and 469 full source question lines. Both viewport projects exercise all 448 rows with four headings, private-writing save/reload and completion/undo. Production-preview verification passed 35 representative day/task/viewport states, with zero captured page errors or horizontal overflow. Read-only independent follow-up passed the same digest with no blocking findings (`review-final.json`). All 40 App state/handler declarations match baseline. Build retains the pre-existing >500KB bundle warning.

Publication authorized only to the functioning-version GitHub Pages target after these gates; hosted verification remains pending here. All evidence is under `evidence/task-four-sections/`. The three known Day16 source gaps remain disclosed; no real-phone, manual screen-reader, clinical/legal or security certification is implied.

## Cross-platform release-test correction
GitHub run `45058961543` stopped before deployment because a new source-preservation test hashed Windows CRLF bytes against Linux LF checkout bytes. Canonical text was independently proved unchanged against baseline `d8186e0`; the LF hash exactly matches CI’s observed value. Only the checksum test now normalizes CRLF→LF, with separate Windows-equivalence and actual-content-mutation rejection assertions. No curriculum, UI, state logic, dependencies or workflow gates changed. Aggregate/build/lint passed again. New release-test checkpoint: `1b01fa55ad00db9f69fe24a5e0886d80fd3fc7c56098630374116279bdedd0b4`; earlier runtime/browser/independent-review results still describe byte-identical app source, and CI will rerun the full suite before deployment.

## Independent-review corrections before final acceptance
The first read-only review found two defects despite passing preliminary checks: a non-forcing caveat in structured affirmation rationale was omitted, and the Day 9 Environmental rationale noun `focus,` appeared as a dangling How step. Both actual-source cases were reproduced RED, fixed in the presentation layer, and covered by regression fixtures. Structured action/goal/safety guidance is retained independently of short benefits; noun fragments are no longer treated as commands. The complete browser suite is rerun against the repaired frozen source; earlier runs are superseded, not release proof. The first review is retained at `evidence/task-four-sections/review-first.json`.

## Source-loading defect discovered during verification
Later weeks use numbered DOMAIN / Wellness / Reset headings, unlike Week 1’s literal Task headings. The prior loader fell back for all 126 later-week domain rows. The scoped loader fix now retains exact source lines for 123 of those rows and keeps stable six-domain task IDs (physical circuit/walk/stretch remain together in their existing Physical row).

**Known pre-existing source gap:** Day 16’s supplied source stops its daily tasks after the Spiritual domain. No Intellectual, Social or Environmental blocks are present there. Their existing fallback rows are retained rather than filled with invented content. These three instruction blocks require owner-supplied canonical content; they are not validated as complete. This is distinct from the 28-day tab/layout/completion behavior.

Original end-of-day reflection sections are now loaded directly when the extractor stores them as their own section, preserving the same existing writing keys.
