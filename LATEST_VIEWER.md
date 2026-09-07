# 34 Fresnaye — latest walkthrough state

**Level 02 25% source + model acceptance is PASSED.** Canonical Level 02 remains **v23** at 5,769 vertices / 8,907 triangles. OBJ SHA-256: `c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5`. GLB SHA-256: `7a33cc3077cbdcfa3679fe6d6e7bb1fd667e6591f80e958aa2869c67aabcdd49`. Walkthrough Engineering has made **no architectural geometry changes**.

## Current source state

Source Architect **v22 / discrepancy log v42** is current. The v22 handoff explicitly reports no canonical geometry change, keeps all Level 02 25% source items closed, and the fresh Run22 re-audit confirms the same four Level 02 50% source exceptions remain open. No newer Archilab revision has been received for those blockers.

## Walkthrough v59 — CacheSafe Canonical Host Candidate

v59 is the latest QA-passed canonical-v23 walkthrough candidate. It binds the rich simulator to source contract **SA22-DL42-v23-PROMOTED**, truth-synchronizes acceptance metadata to the promoted v23 state, and uses a dedicated **`34-fresnaye-v59-v23`** viewer/service-worker cache generation so an earlier staged cache cannot masquerade as the current host candidate. This is infrastructure-only.

Fresh runtime QA passes desktop WebGL2, forced WebGL1, mobile CPU Canvas2D, desktop keyboard/mouse movement, mobile joystick/touch-look, Reset, source-gate visibility, collision-safe routes to Living/Kitchen/Main Bedroom, and the self-contained portable raw compatibility path. The modular live-host candidate uses 10 external gzip model assets totaling 97,520 base64 characters; they reconstruct the exact canonical v23 OBJ. Static JavaScript, current cache generation, ZIP and model-integrity QA also pass.

## Permanent hosting boundary

The public GitHub Pages root remains the previously verified **Walkthrough v52 / canonical v19** at https://lgalansky.github.io/34-fresnaye/. A fresh `gh-pages` branch read confirmed the root `index.html` is still blob `14b498ca9a4b9b771fcd0afa580b5d358fffd36c`. Do not represent the public URL as canonical v23 yet.

v59 is staged, runtime-QA-passed and static-host packaged. The connected GitHub contents writer accepts complete inline UTF-8 but not the generated viewer file directly. A multipart/bootstrap transfer path was explored, but the current execution environment blocks the production-equivalent browser navigation needed to verify that path before promotion. Preserve the verified v52 root until exact v59 deployment bytes and post-deploy runtime can be verified.

## Acceptance / next milestone

The verified main navigation component remains Entrance → Living → Kitchen → Main Bedroom → Entrance. Second Dwelling and Service Stair remain outside the verified connected component. A human continuous acceptance walk is still outstanding.

Level 02 50% is **NOT STARTED**. Material source blockers remain W09 overall/rough width, G04 front structural opening height, W05 50 mm brickwork/schedule head-interface interpretation, and remaining zone-specific ceiling heights / perimeter-bulkhead drops. No 50% geometry may be created by inference. Site-dependent dimensions require real-world verification; this repository is simulator/model QA, not construction certification.
