# 34 Fresnaye — latest walkthrough state

Latest QA-approved simulator infrastructure: **Walkthrough v48 — Adaptive Performance Guard** (2026-09-07).

- Canonical architectural model: Level 02 v19, unchanged.
- OBJ SHA-256: `0c8df8db5db23d16d52172b539f83ba092828366de037499748724ed2a1eef36`
- GLB SHA-256: `6afbe438fb40e19d042656fc6498917bbb64fee75adf073c354dde0b04a865ab`
- Topology: 5,689 vertices / 8,787 triangles.
- Fresh core regression: PASS on desktop WebGL2, forced WebGL1, mobile CPU Canvas2D and embedded self-test.
- v48 adds an adaptive render-resolution guard at 100%, 85%, 70% and 55%. It changes renderer backing resolution only; architectural geometry, camera scale, collision and navigation are unchanged.
- Desktop/mobile Auto quality control is available; desktop hotkey is `A`.
- Device/input resilience, compact mobile HUD, review tour, acceptance-walk proof, exact-view links, resume and renderer recovery remain intact.
- A stale internal PWA cache-state marker inherited from v45 was found during release QA, corrected to v48, and the release packages were rebuilt and re-tested.
- Source Gate remains synchronized to Source Architect handoff v13 / discrepancy log v34 / clarification register v5.

## Architectural gate

Level 02 25% is **NOT PASSED**. D09 is closed at 1790 mm / U/S 2400. Open source blockers remain D21 physical instance 1, W11 face-to-face wall thickness, iD05 rough width and iD08 rough width. No architectural inference or viewer bridge is permitted.

## Continuity / acceptance

The verified collision-safe component is Entrance → Living → Kitchen → Main Bedroom → Entrance. Second Dwelling and Service Stair remain disconnected in canonical v19. Acceptance-proof infrastructure is available, but a human full loop has not been completed; Level 02 and whole-house acceptance are not claimed.

## Fresh v48 QA

Desktop WebGL2 and forced WebGL1 each render all 8,787 triangles and preserve both canonical hashes. Keyboard movement was freshly exercised. A 70% render-scale test reduced the canvas from 1365×768 to 955×537 without changing model identity. Mobile CPU Canvas2D QA exercised joystick movement (1.077 m), touch-look (0.13 rad), the actual Auto quality toggle and clean input release. The packaged GLB independently reparses to 5,689 vertices / 8,787 triangles and the exact canonical GLB SHA-256.

Portable and static-host/PWA v48 ZIPs pass JS syntax, manifest/cache-version, canonical hash/topology and ZIP integrity QA. Durable artifacts are stored in `/34 fresnaye` and Google Drive `34 Fresnaye`.

## Hosting

GitHub access is writable, but GitHub Pages remains disabled (`has_pages=false`, `homepage=null`), so no verified public HTTPS walkthrough URL is claimed. The public/root endpoint is not promoted until Pages is enabled and the deployed URL can be opened and tested on desktop and mobile. Service-worker/offline acceptance likewise requires a permitted HTTPS/local test origin.

Site-dependent dimensions require real-world verification. This repository is not construction certification.
