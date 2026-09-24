# PATH to RISE preview release checkpoint

Date: 2026-09-23 22:52 PDT

## Shareable preview URL

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
