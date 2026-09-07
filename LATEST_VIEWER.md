# 34 Fresnaye — latest walkthrough state

**Status: NOT COMPLETE. Level 02 25% source + model acceptance is PASSED; Level 02 50% is BLOCKED / NOT STARTED.**

## Canonical Level 02

Canonical geometry remains **v23**, unchanged: **5,769 vertices / 8,907 triangles**.

- OBJ SHA-256: `c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5`
- GLB SHA-256: `7a33cc3077cbdcfa3679fe6d6e7bb1fd667e6591f80e958aa2869c67aabcdd49`
- No architectural geometry was changed in the v82 run.

## Current source state

Source Architect **v23 / discrepancy log v43** is current. A fresh mailbox watch found no Archilab message newer than Michael Borgström / Archilab's `2026-09-07T10:00:06Z` clarification.

The four material Level 02 50% source blockers remain:

1. W09 overall / masonry rough width.
2. G04 front structural-opening height.
3. W05 50 mm brickwork-vs-schedule head/interface interpretation.
4. Remaining zone-specific ceiling heights / perimeter-bulkhead drops and pitched-profile ownership.

A precise `34_Fresnaye_Level02_50pct_ArchilabClarificationPack_v1.md` has been prepared in the persistent project workspace and Google Drive. Do not create v24 geometry by inference.

## Walkthrough / navigation QA

The current public Pages root is **Walkthrough v60 Canonical v23 Live Patch** at:

https://lgalansky.github.io/34-fresnaye/

The verified `gh-pages/index.html` blob is `a4f0c281926f6ed8a9c67c1d96a85dac628e88c5`.

Walkthrough **v61 Canonical v23 Inline Live** is a staged static-only candidate. Its static integrity QA passes exact v23 reconstruction/hash/topology and preserves desktop keyboard/mouse, mobile joystick/touch-look, Reset, collision and floor-following implementation. A fresh v61 WebGL browser run is still outstanding because the current QA execution environment cannot initialize a usable WebGL display.

A new runtime-independent CPU navigation-topology harness was run directly against the exact canonical v23 OBJ using the v61 navigation contract (1.65 m eye height, 0.22 m body radius, 0.24 m max step-up, 0.22 m max drop). At a conservative 0.20 m grid it passes the main loop:

- Entrance → Living: **8.6 m**
- Living → Kitchen: **9.2 m**
- Kitchen → Main Bedroom: **22.8 m**
- Main Bedroom → Entrance: **13.8 m**

It finds **NO PATH** from Entrance to Second Dwelling or Service Stair, preserving the known isolation rather than introducing artificial viewer bridges. This CPU topology result is navigation QA only and does not replace fresh public-origin desktop/mobile human acceptance.

## Acceptance boundary

The verified main navigation component remains **Entrance → Living → Kitchen → Main Bedroom → Entrance**. Second Dwelling and Service Stair remain outside the proven connected component.

Do not claim Level 02 50%, 75%, 100%, whole-house completion, construction certification, or public-origin interactive acceptance until their respective source and QA gates are actually passed. Site-dependent dimensions and levels require real-world verification.
