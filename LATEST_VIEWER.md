# 34 Fresnaye — latest walkthrough state

Latest QA-approved simulator infrastructure: **Walkthrough v50 — Dual Loader Resilience** (2026-09-07).

- Canonical architectural model: Level 02 v19, unchanged.
- OBJ SHA-256: `0c8df8db5db23d16d52172b539f83ba092828366de037499748724ed2a1eef36`
- GLB SHA-256: `6afbe438fb40e19d042656fc6498917bbb64fee75adf073c354dde0b04a865ab`
- Topology: 5,689 vertices / 8,787 triangles.
- Fresh runtime regression: PASS on desktop WebGL2, forced WebGL1, and mobile CPU Canvas2D.
- v50 adds a hash-verified raw-OBJ compatibility loader for browsers without `DecompressionStream`; forced no-decompress mobile runtime QA passes.
- v50 fixes the mobile controls drawer stacking context so its scrim no longer intercepts drawer controls.
- Source contract remains Source Architect handoff **v15 / discrepancy log v35 / clarification register v7** until Source Architect ingests the newer user-supplied Archilab clarification received 2026-09-07. That clarification appears to conflict with v15 on D21 and provides new W11 evidence, so no Walkthrough Engineer geometry inference or canonical change is permitted.

## Continuity / acceptance

Entrance → Living → Kitchen → Main Bedroom → Entrance remains the verified collision-safe main component. Second Dwelling and Service Stair remain isolated in canonical v19. Acceptance-proof infrastructure is available, but a human full loop has not been completed; Level 02 and whole-house acceptance are not claimed.

## Hosting

GitHub Pages is now enabled from the `gh-pages` branch and the Pages build/deployment completed successfully. The deployment environment URL is `https://lgalansky.github.io/34-fresnaye/`.

However, the exact deployed Pages artifact was downloaded and inspected after deployment: its root `index.html` is still **Walkthrough v23**, SHA-256 `ad237473927a48ed72b7685f36460258d8cbb4a6839acc08dfdf8fb03c7ffce2`. Therefore the public URL is **not a current v50 review/acceptance link**. The current v50 static-host package is persisted in `/34 fresnaye` and Google Drive and must be unpacked to the Pages branch root, followed by live desktop/mobile runtime verification, before a v50 public link is claimed.

Site-dependent dimensions require real-world verification. This repository is not construction certification.
