# PATH TO RISE — PRE-PROMPT #9 TRUST & RISK BASELINE

Generated: 2026-10-03 PDT
Phase: Prompt #9 — Safety + Privacy + Security + Accessibility Hardening
Status: **Pre-change baseline captured before Prompt #9 code changes.**

---

## 1. Baseline scope

Inspected current app as delivered through Prompt #8:

- architecture and routes;
- React components;
- browser storage;
- reflection/journal handling;
- RESET / Toolbox state;
- personalization data;
- progress/insight data;
- support pathway;
- dependencies and npm audit;
- client configuration;
- console/runtime behaviour where inspectable;
- obvious secrets/logging/network/HTML injection patterns;
- Prompt #8 hardening handoff.

This baseline does **not** claim full security, legal, clinical or accessibility certification.

---

## 2. Current architecture baseline

App type:

```txt
Local/front-end React + Vite prototype.
```

Primary route model:

```txt
Hash routes only: #today, #reset, #path, #support
```

Approved bottom navigation preserved:

```txt
Today | Reset | My Path | Support
```

Backend/API:

```txt
None found in current app.
```

Authentication:

```txt
None found in current app.
```

Authorization:

```txt
Not applicable / not implemented because no backend or server resources exist.
```

Analytics:

```txt
None found.
```

Third-party SDKs:

```txt
None found beyond React/Vite tooling.
```

---

## 3. Browser storage baseline

Runtime browser inspection at `http://127.0.0.1:5174/#today` found:

```json
{
  "localStorage": {
    "path-to-rise-program-progress-v1": "program progress object",
    "path-to-rise-toolbox-state-v1": "toolbox state object"
  },
  "sessionStorage": {},
  "cookies": "",
  "indexedDB": [],
  "externalResources": []
}
```

Known localStorage keys:

| Key | Data | Current classification |
|---|---|---|
| `path-to-rise-program-progress-v1` | currentDay, status, completedDays, daySectionProgress, savedReflections, lastReturn | Prototype-only; contains wellness state and possibly highly private reflection text |
| `path-to-rise-toolbox-state-v1` | favouriteToolIds, recentToolIds, completedStandaloneToolIds | Prototype-only; contains preference/behaviour state |
| `path-to-rise-prompt4-progress` | legacy fallback key | Legacy prototype-only migration fallback |

Baseline risk:

- `savedReflections` are highly private user content stored in browser localStorage.
- localStorage is acceptable only for prototype evidence, not production privacy architecture.

---

## 4. Dependency baseline

Production dependencies:

```txt
react
react-dom
```

Development dependencies:

```txt
@types/node
@types/react
@types/react-dom
@vitejs/plugin-react
oxlint
typescript
vite
```

Audit command:

```bash
npm audit --omit=dev --audit-level=low
```

Result:

```txt
found 0 vulnerabilities
```

No dependency removal recommended before Prompt #9 fixes.

---

## 5. Baseline validation before hardening

Command:

```bash
npm test && npm run lint && npm audit --omit=dev --audit-level=low && git status --short
```

Result:

```txt
exit code 0
Contract check passed
Personalization scenarios passed
Progress scenarios passed
tsc build passed
vite build passed
oxlint passed
found 0 vulnerabilities
```

Known non-blocking warnings:

- Node experimental warning for `--experimental-transform-types` in local scenario scripts.
- Vite chunk-size warning after minification.

---

## 6. Static privacy/security pattern baseline

Search results:

| Pattern | Result |
|---|---|
| `console.` in app source | none found |
| `dangerouslySetInnerHTML` / `innerHTML` in app source | none found |
| `fetch` / `XMLHttpRequest` in app source | none found |
| analytics SDK patterns | none found |
| token/secret/password/cookie patterns | no intentional client secret found; only contract-check variable name `token` |
| localStorage/sessionStorage | localStorage used in `src/App.tsx`; sessionStorage not used |

---

## 7. Baseline risk register

| ID | Category | Severity | Affected area | Problem | User impact | Recommended fix | Status |
|---|---|---|---|---|---|---|---|
| P9-R001 | Privacy / Trust | P1 | Global prototype note | UI says “Sample content, no personal data saved” while progress/reflections can be stored locally | False reassurance; privacy expectation mismatch | Replace with accurate local-storage disclosure | OPEN |
| P9-R002 | Privacy / Data control | P1 | Local prototype reset | `Reset local prototype state` only removes program key, not toolbox key, and lacks proportional confirmation | Ambiguous destructive action and incomplete reset | Add explicit local data controls / confirmation and separate progress vs toolbox clearing | OPEN |
| P9-R003 | Privacy | P1 | Reflections | Reflection text stored in localStorage; no delete/clear-per-reflection control | User may not be able to remove sensitive writing easily | Add reflection clear/delete control and document production migration | OPEN |
| P9-R004 | Data integrity | P1 | Persistence | localStorage write failure is not handled explicitly; UI may imply save when persistence failed | False saved state or data-loss confusion | Add safe persistence wrapper and user-visible recovery note | OPEN |
| P9-R005 | Input handling | P2 | Reflection textarea | No explicit length guidance/counter | Very long pasted content may hurt usability/storage reliability | Add reasonable max length and counter without over-restricting normal writing | OPEN |
| P9-R006 | State integrity | P2 | App-level parsed section progress | App parse sanitizes shape but not valid Day/section IDs | Malformed state could inflate section counts in day UI | Sanitize by canonical day/section IDs | OPEN |
| P9-R007 | Support maintainability | P2 | Support resources | Canada-specific crisis line lives inline in component | Harder to maintain/geography risk | Make geography limitation clearer; defer canonical resource config if needed | OPEN |
| P9-R008 | Accessibility | P2 | Dynamic status | Saved/deleted/failure status may not be announced | Assistive-tech users may miss important persistence result | Add restrained status/live region for save/delete/storage messages | OPEN |
| P9-R009 | Security headers/deployment | P2 | Deployment | No deployment-layer headers inspected/configured in repo | Cannot claim production web protection | Document required deployment headers; optionally add safe meta referrer policy | OPEN |
| P9-R010 | External validation | P2 | Accessibility/clinical/legal/security | No manual screen-reader, legal, clinical, or pen-test review | Cannot claim compliance/certification | Document external review owners | OPEN |

---

## 8. Baseline exit

Baseline is complete enough to begin Prompt #9 hardening.

Next controlled step:

```txt
Implement justified P0/P1/P2 fixes that directly reduce privacy, data-control, state-integrity, and accessibility risk without redesigning validated product architecture.
```
