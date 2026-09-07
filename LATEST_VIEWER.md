# 34 Fresnaye — latest walkthrough state

Latest QA-approved simulator infrastructure: **Walkthrough v45 — Device & Input Resilience** (2026-09-07).

- Canonical architectural model: Level 02 v19, unchanged.
- OBJ SHA-256: `0c8df8db5db23d16d52172b539f83ba092828366de037499748724ed2a1eef36`
- GLB SHA-256: `6afbe438fb40e19d042656fc6498917bbb64fee75adf073c354dde0b04a865ab`
- Topology: 5,689 vertices / 8,787 triangles.
- Fresh core regression: PASS on desktop WebGL2, forced WebGL1, mobile CPU Canvas2D and embedded self-test.
- v45 adds transient-input cancellation for focus/page/orientation changes, viewport/orientation recovery, a Device Check panel, and device/input readiness in session QA exports.
- Mobile QA verified joystick pointer-cancel cleanup, touch look, and portrait-to-landscape recovery without stuck controls.
- Architectural geometry was not changed.

## Architectural gate

Level 02 25% is **NOT PASSED**. D09 is closed at 1790 mm / U/S 2400. Open source blockers remain D21 physical instance 1, W11 face-to-face wall thickness, iD05 rough width and iD08 rough width. Source Architect v12 / discrepancy log v33 / clarification register v4 authorize no geometry edits for those items.

## Continuity

The verified collision-safe component is Entrance → Living → Kitchen → Main Bedroom → Entrance. Second Dwelling and Service Stair remain disconnected in canonical v19 floor topology; do not bridge these gaps in viewer code.

## Hosting

The durable v45 artifacts are stored in the project's `/34 fresnaye` workspace and Google Drive `34 Fresnaye` folder. GitHub Pages is still disabled (`has_pages=false`, `homepage=null`), so this repository does not yet provide a verified public HTTPS walkthrough URL. The repository root `index.html` remains an older viewer and is not being promoted as a live v45 build.

The v45 static-host/PWA package passes static/syntax/integrity QA. This runtime blocks localhost/file navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`, so service-worker activation/offline reload and direct-file launch are not claimed as fresh browser-verified here. The self-contained viewer itself is independently browser-QA passed using the exact v45 HTML payload.

Site-dependent dimensions require real-world verification. This repository is not construction certification.
