# PATH to RISE preview release checkpoint

Date: 2026-10-13 09:58 PDT

## Current non-disconnecting review URL

```txt
https://guysmileysells.github.io/path-to-rise-prototype/
```

This is a durable GitHub Pages hosted preview for owner functionality testing. It does **not** depend on the Windows local preview server or Cloudflare tunnel staying online.

## Source repository

```txt
https://github.com/guysmileysells/path-to-rise-prototype
```

Current deployed commit:

```txt
5110e81 ci: support in-repo source audit files
```

## Deployment path

- GitHub CLI device authorization completed for `guysmileysells`.
- Repository created and pushed: `guysmileysells/path-to-rise-prototype`.
- GitHub Pages was enabled with workflow deployment mode.
- `.github/workflows/pages.yml` runs install, tests, lint, build, and deploys `dist` to Pages.
- Vite was configured with relative asset paths so the static app works under the GitHub Pages subpath.

## Verification completed

Local verification before deploy:

- `npm test` passed.
- `npm run lint` passed with 0 warnings / 0 errors.
- `npm run build` passed.
- `npm run day-roadmap` passed with `{"scenario":"morning-evening-final-activation","result":"PASS","days":28,"dailyWins":17,"programWins":476}`.

GitHub Actions verification:

- Run `38434603130` completed successfully.
- Build job passed: checkout, Node setup, dependency install, `npm test`, `npm run lint`, `npm run build`, Pages artifact upload.
- Deploy job passed: GitHub Pages deployment completed.

Served URL verification:

- `https://guysmileysells.github.io/path-to-rise-prototype/` returned HTTP 200.
- Served title: `PATH to RISE Prototype`.
- Browser opened the hosted URL and rendered the PATH to RISE app.
- Browser smoke confirmed Morning Activation, Daily Wellness Activities, Evening Activation, Feeling Stuck, and `/476` journey total on the hosted build.
- Browser console errors: 0 during hosted smoke check.

## Vercel status

The owner selected the GitHub + Vercel direction. The GitHub side is complete and provides a durable non-disconnecting test link through GitHub Pages now. Vercel remains logged out on this machine, so a Vercel-hosted URL still requires Vercel account authorization or a Vercel token/project connection later.

## Superseded temporary links

Do not use these as the primary owner test link anymore:

```txt
https://davis-metallica-attacked-indicating.trycloudflare.com/
https://temporary-agile-aspen-q6zt546.vercel.app/
```

The Cloudflare URL depends on a local tunnel. The anonymous Vercel URL was temporary and may expire.

## Important boundaries

This preview is still a prototype checkpoint, not a production release. It has no real authentication, backend database, secure production persistence, CMS, approved clinical content, subscriptions, app-store wrapper, or legal/privacy/security sign-off.

Progress and private reflection text remain local to each tester's browser/device in this prototype.
