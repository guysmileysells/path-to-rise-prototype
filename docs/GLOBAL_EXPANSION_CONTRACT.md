# App-wide inline expansion contract

Owner authorized implementation and verification in Discord message 1569843112078090361.

## Locked behavior
- Every existing expandable control reveals its content directly beneath its own trigger, with easy collapse.
- Opening/switching positions the trigger and content beginning visibly without requiring backward searching. Switching should smoothly position the newly selected content when reduced motion is not requested; reduced motion uses immediate positioning. Avoid repeated scrolling from saves, typing or completion rerenders. Closing from inside a long panel returns focus to its surviving trigger without leaving the user stranded at the previous panel's bottom.
- Preserve all 28 days, content, instructions, completion handlers, saved-data keys/schema and existing normal navigation/full-page routes.
- One shared expansion/positioning behavior for custom panels and native details, including nested disclosures.
- No unrelated UI/copy/content changes. Stop for owner review after verification.

## Inspected inventory / classification
- Daily task cards: Morning (6), daily (6), Evening (5), original reflection on all 28 days. Currently replace roadmap with TaskDetail; convert card-triggered openings to inline detail below that card.
- Next unfinished action shortcut: its expansion must appear under that trigger; switching to another task must use a visible, anchored task host without duplicate IDs. TaskDetail's post-completion `Open next: …` remains a navigation shortcut to the next task's own visible card/trigger, not a recursively nested copy of that task.
- Feeling Stuck options: currently grid plus shared response below all options; move response immediately below selected trigger, with collapse.
- Native details: Today data/settings, reminders, local data controls; RESET more needs; Toolbox saved/recent and browse; ToolRunner full source; My Path map/insights, practices/reflections, progress privacy; saved reflection disclosures; day introduction; legacy program section full source. Keep native keyboard semantics, add shared positioning/collapse behavior.
- Preserve navigation: Today/Reset/My Path/Support, My Path day selection/detail route, RESET need recommendation, Toolbox navigation, tool runner and tool completion are existing screen navigation, not new accordions. Native disclosures inside those screens remain in scope.

## Known / unknown
Known: static React/Vite app; existing data logic and source content must not change. Current repo origin is guysmileysells/path-to-rise-prototype; GitHub Pages preview exists. One pre-existing untracked review doc must be preserved.
Non-blocking: actual physical iPhone/Android results require owner testing. Browser engine/device emulation will be labeled accordingly.
No blocking product decision: owner supplied exact behavior and implementation approval.

## Evidence required
- Failing browser regression before implementation, then passing same test.
- Coverage across all days/task families plus native/nested disclosures, Feeling Stuck, Toolbox source instructions, collapse, switching and reduced motion.
- Completion/undo and writing save/reload preserved; expansion-only events do not mutate persisted progress.
- Mobile geometry: trigger/content placement and viewport visibility, no horizontal overflow or nav-obscured action.
- Full npm test, lint and production build; independent review.
- Record tested browsers, limitations and verified preview status; do not claim physical-device testing.
