# 34 Fresnaye — latest walkthrough state

Current permanent hosted reviewer: **Walkthrough v52 — Live Hosted Source Sync**.

Latest QA-passed full simulator host candidate: **Walkthrough v53 — Full Simulator Host Candidate** (2026-09-07). It is intentionally still bound to promoted Level 02 **canonical v19** and does **not** alter architectural geometry.

- OBJ SHA-256: `0c8df8db5db23d16d52172b539f83ba092828366de037499748724ed2a1eef36`
- GLB SHA-256: `6afbe438fb40e19d042656fc6498917bbb64fee75adf073c354dde0b04a865ab`
- Topology: 5,689 vertices / 8,787 triangles.
- v53 viewer SHA-256: `135b03453fb08d6ed18b7e86de5edaf49b943c1ff97012b25c8dd648cf6695e5`.
- Permanent Pages URL: `https://lgalansky.github.io/34-fresnaye/` — still v52 until the exact v53 bytes are deployed and re-verified.

## v53 simulator progress

v53 carries the richer simulator stack into a single-file permanent-host candidate: desktop keyboard/mouse, mobile joystick/touch-look, collision/floor following, room starts/reset, navigation map, collision-aware guide/tour, continuity/nav-gap/floor-island diagnostics, continuous acceptance-walk proof, device/input readiness, adaptive quality, exact-view/session QA, and dual gzip/raw model loading. Optional manifest/icon references were removed so the candidate has no required auxiliary PWA assets.

Fresh runtime QA passes desktop **WebGL2**, forced **WebGL1**, and mobile **CPU Canvas2D** against the exact canonical hashes/topology. Mobile QA moved 1.045 m through the collision pipeline and registered 0.13 rad touch-look. Inline JavaScript syntax passes. Static screenshots are QA aids only; human walkthrough acceptance is still outstanding.

## Geometry / model gate

The Level 02 25% **source evidence** gate remains closed. Canonical v19 remains the only promoted model.

Latest Geometry Builder candidate: **v21**, 5,697 vertices / 8,799 triangles, status **CANDIDATE_NOT_CANONICAL**. W11 and the corrected D22 header have candidate QA, but model acceptance is still NOT PASSED. Remaining 25% model integration is:

1. source-owned iD05 local wall/jamb/header reconstruction around the registered 1200 / U-S2400 opening and 100 mm pocket;
2. source-owned iD08 full local L-junction reconstruction around the registered 855 / U-S2400 opening and 90 mm pocket;
3. combined topology, scale, opening, stair, collision and navigation QA;
4. canonical promotion only after that QA, then viewer/live deployment rebind to the promoted hashes.

No Walkthrough Engineer change may infer or bridge missing architectural geometry.

## Continuity / acceptance

Entrance → Living → Kitchen → Main Bedroom → Entrance remains the verified collision-safe component under canonical v19. Second Dwelling and Service Stair remain isolated. Level 02 and whole-house acceptance are not claimed.

## Hosting boundary

The current public Pages site remains the independently verified v52 deployment. v53 is staged persistently in `/34 fresnaye` and Google Drive. The connected GitHub contents writer does not accept a local generated file reference, so this run did not risk a partial/manual ~932 KB replacement of the live root. Do not claim v53 live until its exact file bytes are deployed, the deployed artifact hash matches `135b0345…695e5`, and desktop/mobile live-origin checks pass.

Site-dependent dimensions require real-world verification. This repository is not construction certification.