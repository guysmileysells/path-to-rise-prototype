# Mobile reminder overflow diagnosis (read-only investigation)

## Outcome and limits

The **Practice reminder native select** (`src/App.tsx:878–882`) is the verified intrinsic-width driver in a deterministic local font-stress reproduction. Its grid-item automatic minimum width propagates through nested implicit grid tracks and widens the reminder disclosure. The longest default option is `Choose a source-backed practice`.

Original evidence: `evidence/word-spacing/ci-failed.txt` reports Ubuntu CI at baseline `ed0e9a3`: mobile `word-spacing.spec.ts:39` failed with `.screen.scrollWidth=422`, `.screen.clientWidth=390`; 55 other tests passed. GitHub run `45649635917` is a failure for that baseline. The workflow uses `ubuntu-latest`.

**Do not conflate environments:** this investigation used existing production preview `http://127.0.0.1:4183/` serving existing dist (`index-Bp2e6FtW.js`, `index-B4ME--9u.css`) on Windows Chromium. Default local font metrics give 390/390. Explicit Verdana gives 420/390 and establishes the exact element and mechanism locally; it is a font-metric stress surrogate, **not Linux emulation**, and does not prove which font produced the CI value 422. A Linux rerun remains required before claiming CI is fixed.

No source changes, builds, servers, commits, broad tests, or assertion weakening were performed. Browser CSS/DOM experiments were temporary and isolated in fresh Playwright contexts.

## Canonical source chain

- `src/App.tsx:878–882`: Practice label, native select, placeholder and canonical tool options.
- `src/App.css:439–455`: `.setting-field` is a grid; controls inherit 750-weight 16px font. There is no explicit control minimum width.
- `src/App.css:423–436,728–731`: notification settings, setting panels, disclosure stack use implicit grid columns.
- `src/todayA.css:107–108`: controls have `max-width:100%`, which does not by itself suppress the automatic intrinsic minimum during grid sizing.
- `src/todayA.css:110`: existing `.reminder-group { overflow:hidden }` can conceal an oversized descendant if only its ancestor is constrained.

## Ranked hypotheses and falsification

Initial order before probing:

1. Quiet hours two-column time controls: **not the driver in the reproduced failure**. Removing that panel or every time input leaves 420/390 unchanged; changing Quiet hours to one column also leaves the failure.
2. Practice select longest-option intrinsic minimum: **confirmed locally**. Removing only the select restores 390/390. Temporarily shortening all options restores 390/390. Setting only `min-width:0` on the select restores 390/390 with the native control contained.
3. Permission/status row nonwrapping text: **not the driver here**. Removing the Permission panel leaves 420/390 unchanged.

Additional control: removing the Return reminder panel or its number input leaves 420/390 unchanged.

## Measured geometry and candidate isolation

At 390px viewport with Verdana:

| State | screen client/scroll | Select width | Label width | Select right | Label right | Select height |
|---|---|---|---|---|---|---|
| Unchanged layout | 390 / 420 | 342 | 342 | 392 | 392 | 44 |
| Only select `min-width:0` | 390 / 390 | 290 | 290 | 340 | 340 | 44 |
| Only select `width:100%` | 390 / 390 | 290 | 290 | 340 | 340 | 44 |
| Only label `min-width:0` | 390 / 390 | **342** | **290** | **392** | **340** | 44 |

**Reject label-only minimum-width fixes:** the screen assertion becomes green but the select still exceeds its label by 52px and reaches an ancestor with existing overflow clipping. A fix must constrain the actual control, not just its ancestor.

The widest option text measured by canvas under the inherited stress font is the placeholder (295.578125px), followed by `Gratitude & Reflection Journal` (272.3984375px). The native control also includes its padding, border, and native arrow space.

With only select `min-width:0`, after two animation frames at each resized viewport:

- 390 viewport: screen 390/390, select/label width 290/290, height 44.
- 360 viewport: screen 360/360, select/label width 260/260, height 44.
- 320 viewport: screen 320/320, select/label width 232/232, height 44.
- 1280 viewport: phone width 430, screen 428/428, select/label width 328/328, height 44.

Selecting `mirror-breathwork` and filling Practice time `15:37` both returned those exact values. Native elements, options, event handlers and minimum touch heights were unchanged. No notification consent was requested or enabled.

## Smallest proposed source fix (parent owns integration)

```css
.setting-field select {
  min-width: 0;
}
```

One declaration on the actual intrinsic-size driver was sufficient in the measured case. It can be scoped to `.today-a .notification-stack .setting-field select` if desired. Existing stretch alignment and `max-width:100%` then keep the select within its label. An explicit `width:100%` alongside `min-width:0` is also verified but is not necessary for this reproduction. Do not add overflow hiding or reduce touch targets.

A broader strategy for future native time-control/localization robustness can be considered separately; the current evidence does **not** justify changing time inputs or Quiet hours columns as the root-cause fix for this failure.

## Deterministic, narrow reproduction command

Run from `C:/Users/I9-10900KF/projects/path-to-rise/app`, **only while the existing preview is available**. This creates no files and starts no server. It asserts the unchanged stress case is red, injects the one-declaration candidate in browser memory, then asserts screen width, actual select containment, 44px height, and native input behavior. Real execution returned `RED` 390/420 and `GREEN` 390/390, followed by `Native select/time behavior PASS`.

```bash
node --input-type=module <<'JS'
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const browser=await chromium.launch({channel:'chromium'});
try {
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:4183/?overflow-diagnosis=assert#today');
  await page.getByRole('button',{name:'Your space',exact:true}).click();
  for(const details of await page.locator('details').all())
    if(await details.isVisible()&&await details.getAttribute('open')===null)
      await details.locator(':scope > summary').click();
  await page.addStyleTag({content:'body{font-family:Verdana}'});
  const geometry=()=>page.evaluate(()=>{
    const s=document.querySelector('.screen');s.scrollLeft=0;
    const e=document.querySelector('.setting-field select');
    const r=e.getBoundingClientRect(),p=e.closest('label').getBoundingClientRect();
    return {client:s.clientWidth,scroll:s.scrollWidth,selectWidth:r.width,
      fieldWidth:p.width,height:r.height,right:r.right,fieldRight:p.right};
  });
  const before=await geometry();
  assert(before.scroll>before.client+1,'Baseline should reproduce overflow');
  console.log('RED',before);
  await page.addStyleTag({content:'.setting-field select{min-width:0}'});
  const after=await geometry();
  assert(after.scroll<=after.client+1);
  assert(after.right<=after.fieldRight+1);
  assert(after.height>=44);
  console.log('GREEN',after);
  await page.locator('.setting-field select').selectOption('mirror-breathwork');
  await page.locator('[aria-labelledby="practice-reminder-title"] input').fill('15:37');
  assert.equal(await page.locator('.setting-field select').inputValue(),'mirror-breathwork');
  assert.equal(await page.locator('[aria-labelledby="practice-reminder-title"] input').inputValue(),'15:37');
  console.log('Native select/time behavior PASS');
} finally {await browser.close();}
JS
```

After parent integrates/builds, the same harness should assert the baseline no longer overflows (remove the intentional pre-fix red expectation). For the real Linux regression, parent should run the unchanged targeted test on Ubuntu: `npx playwright test tests/browser/word-spacing.spec.ts --project=mobile`. That command uses the repository's configured dev server; it was deliberately not run by this read-only subagent.
