# PATH TO RISE — PROMPT #13 STAGE 1 OWNER ACCESS

Generated: 2026-10-03 22:26 PDT
Purpose: private owner/internal real-device validation setup only.

## Scope

This is not Prompt #14, not a first-responder pilot, not TestFlight, not public beta, and not production launch.

The purpose is to let the owner open the current PATH to RISE build on physical devices and report real results.

## Build under test

```txt
Branch: master
Commit under test: ad65585fe38bbbf6f96b1ad940e932d245ca7266
Prompt #1–#12 checkpoint: 045af500ff6901fa56494d33512cfd6e8d3c8311
Prompt #1–#12 tag: path-to-rise-prompt-1-12-rc1
Build command: npm run build
Build result: PASS on 2026-10-03 22:25 PDT
Testing environment: local production preview served over private LAN
Preview process: proc_7c4fa4441422
Private LAN URL: http://192.168.1.65:4173/
Temporary HTTPS tunnel URL: https://41be83e1723a6e.lhr.life/
Anywhere-access temporary Vercel URL: https://temporary-agile-aspen-q6zt546.vercel.app/
```

## Private access boundary

The original LAN URL is a local network preview from the owner machine. It is intended for devices on the same private network/Wi-Fi only. It is not a public deployment, permanent URL, domain, TestFlight build, production release, or production HTTPS deployment.

The temporary HTTPS tunnel exists only to work around iPhone Safari HTTPS-Only blocking of local HTTP testing. It is an unlisted temporary test URL, not a public launch or production deployment. Treat it as share-with-owner-only and stop the tunnel when Stage 1 testing is done.

The temporary Vercel URL is an anonymous hosted deployment for anywhere/mobile access and does **not** depend on the local preview server staying online. It is still not production, not public beta, and not a permanent claimed deployment; Vercel reports this anonymous deployment expires in 60 minutes unless claimed in a Vercel account.

If the phone is not on the same network, the LAN URL may not load. If Windows firewall prompts for Node/Vite access, allow access on private networks only.

## Owner first test

Open on physical iPhone Safari:

```txt
https://temporary-agile-aspen-q6zt546.vercel.app/
```

The prior tunnel URL `https://41be83e1723a6e.lhr.life/` remains useful only while the local tunnel is running. The Vercel URL above is the better anywhere-access link for immediate mobile review. The original LAN URL `http://192.168.1.65:4173/` was blocked on the first iPhone attempt because Safari HTTPS-Only was enabled.

First result to report:

```txt
Does PATH to RISE open and does the Today/Home screen load correctly?
```

Do not mark this PASS until the owner reports the result from the physical iPhone.

## Privacy reminder

Reflection testing must use only:

```txt
TEST REFLECTION — private preview validation only.
```

Do not enter trauma details, diagnoses, medical history, crisis information, employer-sensitive information, incident information, patient information, or private journal material.
