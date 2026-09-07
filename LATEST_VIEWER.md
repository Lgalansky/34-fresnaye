# 34 Fresnaye — latest walkthrough state

Latest QA-approved simulator infrastructure: **Walkthrough v50 — Dual Loader Resilience** (2026-09-07).

- Canonical architectural model: Level 02 v19, unchanged.
- OBJ SHA-256: `0c8df8db5db23d16d52172b539f83ba092828366de037499748724ed2a1eef36`
- GLB SHA-256: `6afbe438fb40e19d042656fc6498917bbb64fee75adf073c354dde0b04a865ab`
- Topology: 5,689 vertices / 8,787 triangles.
- Fresh runtime regression: PASS on desktop WebGL2, forced WebGL1, and mobile CPU Canvas2D.
- v50 adds a hash-verified raw-OBJ compatibility loader for browsers without `DecompressionStream`; forced no-decompress mobile runtime QA passes.
- v50 fixes the mobile controls drawer stacking context so its scrim no longer intercepts drawer controls.
- Source contract remains Source Architect handoff **v15 / discrepancy log v35 / clarification register v7**; no geometry was changed by the Walkthrough Engineer.
- Viewer-bound Level 02 25% source gate remains W11 face-to-face wall thickness and iD05 rough-opening width until a newer Source Architect handoff supersedes v15.

## Continuity / acceptance

Entrance → Living → Kitchen → Main Bedroom → Entrance remains the verified collision-safe main component. Second Dwelling and Service Stair remain isolated in canonical v19. Acceptance-proof infrastructure is available, but a human full loop has not been completed; Level 02 and whole-house acceptance are not claimed.

## Hosting

A `gh-pages` branch now exists as deployment staging infrastructure. GitHub Pages is still disabled (`has_pages=false`, `homepage=null`) and the branch root still contains the older v23 payload, so no verified public HTTPS walkthrough URL is claimed. The complete v50 static-host package is persisted in `/34 fresnaye` and Google Drive and is ready for unpacked deployment once a compatible file-upload/deployment path and Pages enablement are available.

Site-dependent dimensions require real-world verification. This repository is not construction certification.
