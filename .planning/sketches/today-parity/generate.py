from pathlib import Path
import re, json, html
root = Path(__file__).parent
source = (root / 'target-reference.html').read_text(encoding='utf-8')
icons = {}
for match in re.finditer(r'<svg\b[^>]*data-lucide="([^"]+)"[^>]*>.*?</svg>', source, re.S):
    icons.setdefault(match.group(1), match.group(0))
required = {'lock-keyhole', 'arrow-right', 'chevron-right', 'sun', 'wind', 'route', 'bookmark', 'heart-handshake'}
assert required <= icons.keys(), required - icons.keys()
nav = re.search(r'<nav class="pr-nav".*?</nav>', source, re.S).group(0).replace('class="pr-nav"', 'class="nav"')
for old, new in [('today', 'Today'), ('reset', 'Reset'), ('path', 'My Path'), ('support', 'Support')]:
    nav = nav.replace(f'data-page="{old}"', f'data-dest="{new}"')
template = (root / 'template.html').read_text(encoding='utf-8')
app = root.parents[2]
tool_source = (app / 'src/toolContent.ts').read_text(encoding='utf-8')
tools = re.findall(r"canonicalName:\s*'([^']+)'", tool_source)
assert 'Walk + Stretch Reset' in tools
options = ''.join(f'<option>{html.escape(name)}</option>' for name in tools[:6])
variants = [
    ('a-reset-first', 'a', 'home', 'A · RESET FIRST · SELECTED', 'Keep the main prototype’s Reset-led Today and add complete program continuation beneath it.', 'Closest to the selected main prototype. The Continue action is secondary to immediate Reset.'),
    ('b-continue-first', 'b', 'home', 'B · NOT SELECTED', 'Make the current day and next action the dominant task; retain immediate Reset immediately below.', 'Fastest daily program continuation, but changes the existing Reset-first emphasis.'),
    ('c-privacy-data', 'a', 'privacy', 'C · PRIVACY + LOCAL DATA', 'Shared Today settings sheet, reachable from Your space or the Today settings row.', 'All data controls stay available without taking over the daily landing page.'),
    ('d-reminders', 'a', 'reminders', 'D · OPTIONAL REMINDERS', 'Shared Today reminder sheet with four categories, separate permission state and quiet hours.', 'Details expand to reveal timing and practice selectors; nothing requests real permission or schedules delivery.'),
]
for folder, layout, screen, label, stance, tradeoff in variants:
    directory = root / folder
    directory.mkdir(exist_ok=True)
    result = template
    for key, value in {'__META__': label, '__LAYOUT__': layout, '__SCREEN__': screen, '__NAV__': nav, '__LOCK__': icons['lock-keyhole'], '__ICONS__': json.dumps(icons), '__PRACTICE_OPTIONS__': options}.items():
        result = result.replace(key, value)
    assert '__META__' not in result and '__ICONS__' not in result
    (directory / 'index.html').write_text(result, encoding='utf-8')
    (directory / 'README.md').write_text(f'# {label}\n\n## Design stance\n{stance}\n\n## Key choices\n- Target prototype palette, serif headline and original SVG icons.\n- Mobile-first single column; four original navigation destinations.\n- Day 1, 3/17 actions is an illustrative fixture, not user data.\n- Clickable settings, expansions, reminder preferences and scope-specific confirmation previews.\n- No localStorage, network requests, notification permission or live deployment changes.\n\n## Trade-offs\n{tradeoff}\n\n## Review only\nNot a completed app migration. Source coverage and implementation gates: docs/TODAY_FUNCTIONALITY_PARITY_MOCKS.md.\n', encoding='utf-8')
    print(folder)
print('Canonical practice options:', tools[:6])
