# 34 Fresnaye — latest walkthrough state

**Status: NOT COMPLETE. Level 02 25% source + model acceptance is PASSED; Level 02 50% remains BLOCKED / NOT STARTED.**

## Canonical Level 02
Canonical geometry remains **v23**, unchanged: **5,769 vertices / 8,907 triangles**.

- OBJ SHA-256: `c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5`
- Historical canonical GLB SHA-256: `7a33cc3077cbdcfa3679fe6d6e7bb1fd667e6591f80e958aa2869c67aabcdd49`
- No architectural geometry is authorized or changed by the Source Architect v29 update.

## Current source state
Current evidence contract: **Source Architect v29 / discrepancy log v49 / revision watch v13 (`SA29-DL49-v23-PROMOTED`)**.

New Level 02 source correction: the co-located **D20/S07** opening is now source-closed for height semantics. FRE_WD_206 gives brickwork rough **2697 mm / U/S 2125 mm**; FRE_WD_401 gives D20 **2700 × 2125 mm**; FRE_WD_402 gives S07 **2700 × 2125 mm**. The prior 2400 mm D20 association is superseded; it belongs to the preceding schedule item. Preserve the **3 mm** rough/component width difference; do not normalize 2697 to 2700. This is source-only progress and does not authorize component geometry.

The four material Level 02 50% blockers remain unchanged: W09 overall/masonry rough width; G04 front structural-opening height; W05 50 mm brickwork-vs-schedule head/interface interpretation; and remaining zone-specific ceiling heights/perimeter-bulkhead drops. No newer Archilab revision has been received; ceiling/bulkhead coordination remains pending.

## Walkthrough engineering
**Walkthrough v72 Rich Simulator / Rich Host Source29 D20-S07 Sync** is the latest staged rich candidate. Both artifacts retain the exact canonical v23 OBJ payload/hash and the four-blocker gate, add the corrected D20/S07 source semantics, and explicitly keep `viewerGeometryMutation=false`.

Static integrity passes. Fresh exact-artifact Chromium document-injection QA passes desktop and mobile CPU Canvas2D for both host and portable simulator; the embedded suite reports **42/42 tests passed** with zero page errors. Direct file/public-origin navigation remains blocked by the execution environment, so this is not a fresh public-origin acceptance claim.

A portable v23 GLB re-export is also generated from the exact canonical OBJ lineage for review portability; it preserves **5,769 vertices / 8,907 triangles and canonical bounds** but has its own export hash and does not replace the historical canonical GLB identity.

## Production hosting
GitHub Pages production remains **v71 Production Source28 Observability** at the known durable origin `https://lgalansky.github.io/34-fresnaye/`. Production continues to bind canonical v23. v72 has not been promoted to the live root in this run.

The known production parity gap remains open: the public v71 engine has core desktop/mobile walkthrough controls, but the full rich simulator feature set is staged rather than live. Public-origin interactive desktop/mobile acceptance and Larry's continuous human walk remain outstanding.

## Acceptance boundary
Verified main navigation component remains **Entrance → Living → Kitchen → Main Bedroom**. Second Dwelling and Service Stair remain separate inspection starts and must not be artificially bridged. Final acceptance remains open until Level 02 50%, 75% and 100% are legitimately completed, then remaining levels/exterior/site are built and connected. Site-dependent dimensions require real-world verification; this is not construction certification.
