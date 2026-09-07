# 34 Fresnaye — latest walkthrough state

**Level 02 25% source + model acceptance is PASSED.** Canonical Level 02 remains **v23** at 5,769 vertices / 8,907 triangles. OBJ SHA-256: `c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5`. GLB SHA-256: `7a33cc3077cbdcfa3679fe6d6e7bb1fd667e6591f80e958aa2869c67aabcdd49`.

Source Architect **v21 / discrepancy log v41** is current. Walkthrough Engineering has made no architectural geometry changes.

## Walkthrough v57 — Canonical Live Sync

v57 is the latest QA-passed canonical-v23 walkthrough candidate. It truth-synchronizes source/acceptance metadata to SA21/DL41 and the promoted v23 state, fixes stale pre-promotion acceptance wording, and records `viewerGeometryMutation=false` while keeping final acceptance scoped to the verified connected component.

Fresh runtime QA passes desktop WebGL2, forced WebGL1, mobile CPU Canvas2D, desktop keyboard/mouse movement, mobile joystick/touch-look, Reset, source-gate visibility, collision-safe routes to Living/Kitchen/Main Bedroom, and the self-contained portable raw compatibility path. The live-host candidate uses 10 external gzip model assets totaling 97,520 base64 characters; they reconstruct the exact canonical v23 OBJ. Static JavaScript/ZIP/model-integrity QA also passes.

## Permanent hosting boundary

The public GitHub Pages root remains the previously verified **Walkthrough v52 / canonical v19** at https://lgalansky.github.io/34-fresnaye/. A fresh `gh-pages` branch read confirms the root `index.html` is still blob `14b498ca9a4b9b771fcd0afa580b5d358fffd36c` and still identifies v52/canonical-v19. Do not represent the public URL as canonical v23 yet.

v57 is staged, runtime-QA-passed and static-host packaged. The working v52 root is intentionally preserved until the exact generated v57 deployment bytes can be transferred through the connected write path and the multipart/bootstrap deployment path can be verified before and after promotion; the current execution environment blocks production-equivalent browser navigation for that bootstrap verification.

## Acceptance / next milestone

The verified main navigation component remains Entrance → Living → Kitchen → Main Bedroom → Entrance. Second Dwelling and Service Stair remain outside the verified connected component. A human continuous acceptance walk is still outstanding.

Level 02 50% is **NOT STARTED**. Material source blockers remain W09 overall/rough width, G04 front structural opening height, W05 50 mm brickwork/schedule head-interface interpretation, and remaining zone-specific ceiling heights / perimeter-bulkhead drops. No 50% geometry may be created by inference. Site-dependent dimensions require real-world verification; this repository is simulator/model QA, not construction certification.
