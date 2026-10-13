# PATH to RISE preview release checkpoint

Date: 2026-10-13 09:10 PDT

## Durable anywhere-access preview status

Requested outcome: create a review link that does not disconnect during functionality testing.

Current result: **blocked until a real hosting account/deployment target is connected.** The app is a static Vite prototype and is ready to host, but this local repo currently has no durable deployment credentials or remote target configured.

Verified blockers on 2026-10-13:

- Vercel CLI is installed but logged out: `vercel whoami` returned `Logged out`.
- Permanent Vercel deploy failed with `No existing credentials found`.
- No Git remote is configured for this local repo.
- `gh`, `netlify`, `surge`, `wrangler`, and `firebase` CLIs are not available/logged in for durable deploy fallback.
- Cloudflare quick-tunnel links are temporary and can disconnect because they depend on the Windows local preview server and tunnel process staying alive.

Current temporary review URL:

```txt
https://davis-metallica-attacked-indicating.trycloudflare.com/
```

Temporary URL verification on 2026-10-13:

- Public URL returned HTTP 200 and title `PATH to RISE Prototype`.
- Browser opened the app and rendered PATH to RISE.
- Morning Activation / Evening Activation / Small Wins smoke checks passed during owner-preview verification.
- Browser console errors: 0 during smoke check.

Durable-link next step: GitHub CLI has been installed locally under Hermes and the GitHub device-login flow is waiting for owner authorization. After GitHub authorization succeeds, create/push a GitHub repo, connect/deploy the app through Vercel, and verify the resulting stable URL. Do not use anonymous temporary Vercel or Cloudflare quick tunnels as the durable no-disconnect link.

## Prior shareable preview URL

https://pension-disclosure-colleague-mainly.trycloudflare.com/

This is a temporary Cloudflare quick-tunnel URL for mobile and multi-person review. It remains available only while the local Vite preview server and Cloudflare tunnel process are running on this Windows machine.

## Running processes

- Production preview server: `proc_1e40f6eeb66d`, serving `dist` on `http://127.0.0.1:4174/` / network port 4174.
- Cloudflare tunnel: `proc_9bf6c67c85a2`, forwarding the public URL above to `http://127.0.0.1:4174`.
- Earlier dev server remains local only: `proc_fba84e43d505` on port 5174.

## Verification completed

- `npm test` passed after the tunnel-compatible Vite config and title update.
- Contract check passed for source labels, 20-tool inventory, four-tab nav, and safety disclaimers.
- Production build passed with Vite.
- Public URL HTTP check returned status 200 and title `PATH to RISE Prototype`.
- Browser opened the public URL and rendered the PATH to RISE prototype home screen.
- Browser console had 0 JavaScript errors on the public home screen.
- Public browser QA exercised:
  - Today → Reset me now
  - Reset state: Overwhelmed
  - Reset need: Leave work at work
  - Reset time: 3 minutes
  - Recommendation: End-of-Shift Reset
  - Guidance → Feedback → Save to Quick Kit
  - My Path screen
  - Support screen

## Important boundaries

This preview is still a prototype checkpoint, not a production release. It has no real authentication, persistence, secure offline storage, CMS, approved clinical content, subscriptions, app-store wrapper, or legal/privacy/security sign-off.

All sample guidance remains placeholder content for navigation testing only and must not be treated as approved PATH clinical/wellness content.
