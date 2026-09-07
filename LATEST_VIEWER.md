# 34 Fresnaye — latest walkthrough state

Latest QA-approved simulator infrastructure: **Walkthrough v46 — Evidence-Bound Device Review** (2026-09-07).

- Canonical architectural model: Level 02 v19, unchanged.
- OBJ SHA-256: `0c8df8db5db23d16d52172b539f83ba092828366de037499748724ed2a1eef36`
- GLB SHA-256: `6afbe438fb40e19d042656fc6498917bbb64fee75adf073c354dde0b04a865ab`
- Topology: 5,689 vertices / 8,787 triangles.
- Fresh core regression: PASS on desktop WebGL2, forced WebGL1, mobile CPU Canvas2D and embedded self-test.
- v46 continues from v45 Device & Input Resilience and preserves its focus-loss, pointer-cancel and orientation/viewport recovery plus Device Check.
- Source Gate is synchronized to Source Architect handoff v13 / discrepancy log v34 / clarification register v5.
- Acceptance-walk proof is schema 2 and can be saved directly as JSON; it is bound to both canonical model hashes and the exact source-gate state/open blocker set.
- Architectural geometry was not changed.

## Architectural gate

Level 02 25% is **NOT PASSED**. D09 is closed at 1790 mm / U/S 2400. Open source blockers remain D21 physical instance 1, W11 face-to-face wall thickness, iD05 rough width and iD08 rough width. Source Architect v13 explicitly authorizes no geometry changes and the latest source audit found no Archilab reply.

The new Level 01 labelled schedule transcription is evidence-only; FRE_WD_205 ID-by-ID masonry-opening mapping remains downstream source work and does not authorize Level 01 geometry yet.

## Continuity

The verified collision-safe component is Entrance → Living → Kitchen → Main Bedroom → Entrance. Second Dwelling and Service Stair remain disconnected in canonical v19 floor topology; do not bridge these gaps in viewer code.

## QA / packaging

Fresh v46 WebGL2 renders all 8,787 triangles; forced WebGL1 also renders all 8,787. Mobile CPU QA physically walked 1.254 m with 0.26 rad touch-look, verified pointer-cancel return to idle and orientation/viewport recovery, and successfully downloaded a schema-2 source-bound proof JSON. The embedded self-test passes keyboard-event, desktop-movement, mouse-look, input-safety, source-gate and device-readiness pipelines. Pointer-lock capture itself was not freshly re-exercised in this run; it remains inherited unchanged from QA-passed v45.

Portable and static-host/PWA ZIPs pass hash/topology/manifest/service-worker syntax and ZIP integrity QA. The durable v46 artifacts are stored in the project's `/34 fresnaye` workspace and Google Drive `34 Fresnaye` folder.

## Hosting

GitHub Pages remains disabled (`has_pages=false`, `homepage=null`), so this repository does not yet provide a verified public HTTPS walkthrough URL. The repository root `index.html` is not being promoted as a live v46 build. This runtime also blocks localhost/file navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`, so service-worker activation/offline reload is not claimed as freshly browser-verified. Core viewer browser QA uses the exact v46 HTML payload.

Site-dependent dimensions require real-world verification. This repository is not construction certification.
