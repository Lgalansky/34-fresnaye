# 34 Fresnaye — latest walkthrough state

**Status: NOT COMPLETE. Level 02 25% source + model acceptance is PASSED; Level 02 50% remains BLOCKED / NOT STARTED.**

## Canonical Level 02
Canonical geometry remains **v23**, unchanged: **5,769 vertices / 8,907 triangles**.

- OBJ SHA-256: `c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5`
- Historical canonical GLB SHA-256: `7a33cc3077cbdcfa3679fe6d6e7bb1fd667e6591f80e958aa2869c67aabcdd49`
- No architectural geometry is authorized or changed by the Source Architect v30 update.

## Current source state
Current persistent evidence contract is **Source Architect v30 / discrepancy log v50 / revision watch v14 (`SA30-DL50-v23-PROMOTED`)**.

The corrected D21/D22/D23 ownership is now the forward source contract: **D21 = 975 × 2400** at Entrance Lobby / Family Kitchen; **D22** owns the former duplicate physical bay with brickwork rough **2980 / U-S 2210** and corrected assembly **6240 overall / 3080 inner / 2210 high**; **D23 = 820 × 2032** at Existing Entrance / Stair Landing, but that is component/elevation evidence only and must **not** be promoted to a masonry rough opening without explicit Archilab source. The earlier D20/S07 closure remains current: brickwork **2697 / U-S 2125**, D20/S07 components **2700 × 2125**, preserving the explicit **3 mm** difference.

The four material Level 02 50% blockers remain unchanged: W09 overall/masonry rough width; G04 front structural-opening height; W05 50 mm brickwork-vs-schedule head/interface interpretation; and remaining zone-specific ceiling heights/perimeter-bulkhead drops. No newer Archilab revision has been received beyond 2026-09-07T10:00:06Z; ceiling/bulkhead coordination remains pending.

## Walkthrough engineering
**Walkthrough v73 Rich Simulator / Rich Host Source30 Identity Sync** is the latest persistent workspace candidate. Both retain the exact canonical v23 OBJ payload/hash, the four-blocker gate, the D20/S07 semantics and the corrected D21/D22/D23 source identity while explicitly keeping `viewerGeometryMutation=false`.

Static integrity passes. Fresh exact-artifact Chromium document-injection QA passes the CPU Canvas2D execution path for both rich host and portable simulator with **43/43 tests passed**, canonical hash/topology intact, and zero failed embedded tests. This local test is not used as a WebGL/public-origin claim.

A portable v23 GLB re-export remains available for review portability; it preserves **5,769 vertices / 8,907 triangles and canonical bounds** and does not replace the historical canonical GLB identity.

## Production hosting and live browser acceptance
GitHub Pages production is now **v73 Production Source29 Observability** at `https://lgalansky.github.io/34-fresnaye/`, still binding canonical v23. The promotion workflow was repaired after its first attempt passed browser QA but failed only on missing Git author identity.

The actual production root has now passed automated **desktop and mobile WebGL2** browser QA. Desktop verified canonical hash, **0.933 m** keyboard movement, pointer lock + mouse-look, reset and room starts. Mobile verified canonical hash, **1.075 m** joystick movement, touch-look, reset and touch UI. `health.json` records `AUTOMATED_DESKTOP_MOBILE_WEBGL_CONTROLS_PASS`. **Larry's continuous human room-to-room acceptance walk remains outstanding.**

Production is Source29 while the richer persistent workspace viewer is Source30/DL50. Because canonical v23 geometry is identical and stable, production has not been replaced merely for metadata synchronization; Source30 remains the next staged viewer source contract.

## Acceptance boundary
Verified main navigation component remains **Entrance → Living → Kitchen → Main Bedroom**. Second Dwelling and Service Stair remain separate inspection starts and must not be artificially bridged. Final acceptance remains open until Level 02 50%, 75% and 100% are legitimately completed, then remaining levels/exterior/site are built and connected. Site-dependent dimensions require real-world verification; this is not construction certification.
