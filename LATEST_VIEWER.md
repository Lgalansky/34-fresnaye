# 34 Fresnaye — latest walkthrough state

Latest QA-approved simulator infrastructure: **Walkthrough v51 — Source Gate Closure Sync** (2026-09-07).

- Canonical architectural model: Level 02 v19, unchanged.
- OBJ SHA-256: `0c8df8db5db23d16d52172b539f83ba092828366de037499748724ed2a1eef36`
- GLB SHA-256: `6afbe438fb40e19d042656fc6498917bbb64fee75adf073c354dde0b04a865ab`
- Topology: 5,689 vertices / 8,787 triangles.
- Fresh runtime regression: PASS on desktop WebGL2, forced WebGL1, and mobile CPU Canvas2D.
- v50/v51 simulator resilience remains active: hash-verified raw-OBJ compatibility loading when `DecompressionStream` is unavailable, plus the corrected mobile controls stacking context.

## Source contract

The viewer is synchronized to Source Architect **v16 / discrepancy log v36 / clarification register v8**. The Level 02 25% **SOURCE EVIDENCE** gate is now passed with zero source blockers and zero coordination exceptions. The clarified source values include W11 finished/overall wall thickness 400 mm; iD05 rough opening 1200 / U-S2400 with 100 mm pocket; iD08 855 / U-S2400 with 90 mm pocket; and the former duplicated D21 bay corrected to L02_D22 while retaining explicit brickwork 2980 / U-S2210. L02_D21 itself is 975x2400 at Entrance Lobby / Family Kitchen.

Source Architect v16 explicitly does **not** authorize or make a canonical geometry edit. Canonical v19 therefore remains frozen until a separate authorized Geometry Builder candidate passes independent QA. Level 02 model acceptance is not claimed.

## Continuity / acceptance

Entrance → Living → Kitchen → Main Bedroom → Entrance remains the verified collision-safe main component. Second Dwelling and Service Stair remain isolated in canonical v19. The human full acceptance loop has not been completed; Level 02 and whole-house acceptance are not claimed.

## Hosting

GitHub Pages is enabled from `gh-pages`, and the Pages deployment pipeline has successfully produced `https://lgalansky.github.io/34-fresnaye/`. The exact deployed artifact was downloaded and inspected: root `index.html` is still **Walkthrough v23**, SHA-256 `ad237473927a48ed72b7685f36460258d8cbb4a6839acc08dfdf8fb03c7ffce2`. Therefore the public URL is not a current v51 review/acceptance link. Current v51 portable/static-host packages are persisted in `/34 fresnaye` and Google Drive and require deployment to the Pages root followed by live desktop/mobile QA.

Site-dependent dimensions require real-world verification. This repository is not construction certification.
