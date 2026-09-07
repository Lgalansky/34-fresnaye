# 34 Fresnaye — latest walkthrough state

**Status: NOT COMPLETE. Level 02 25% source + model acceptance is PASSED; Level 02 50% remains BLOCKED / NOT STARTED.**

## Canonical Level 02

Canonical geometry remains **v23**, unchanged: **5,769 vertices / 8,907 triangles**.

- OBJ SHA-256: `c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5`
- GLB SHA-256: `7a33cc3077cbdcfa3679fe6d6e7bb1fd667e6591f80e958aa2869c67aabcdd49`
- No architectural geometry was changed in the v70 source synchronization.

## Current source state

The current evidence contract is **Source Architect v28 / discrepancy log v48 / source-revision watch v12 (`SA28-DL48-v23-PROMOTED`)**. A fresh Outlook check still identifies Michael Borgström/Archilab's 2026-09-07T10:00:06Z clarification as the latest architectural source; the expected reworked drawings and ceiling/bulkhead coordination remain pending.

The four material Level 02 50% source blockers remain unchanged:

1. W09 overall / masonry rough width.
2. G04 front structural-opening height.
3. W05 50 mm brickwork-vs-schedule head/interface interpretation.
4. Remaining zone-specific ceiling heights / perimeter-bulkhead drops.

Source Architect v28 adds later-level evidence only: Level 01 D06 physical identity is closed at rough 900 / U-S 2100 and the legacy D05=900 evidence is reclassified to D06; Level 01 D05 masonry rough width remains open. Do not generalize that local ID correction or create Level 02 geometry by inference.

## Walkthrough engineering

A source-synchronized **Walkthrough v70 Rich Simulator / Rich Host** was generated from the QA-passed v69 viewer without architectural geometry changes. Its embedded canonical OBJ reconstructs to the exact v23 SHA. JavaScript syntax passes.

Fresh Chromium regressions of the exact v70 artifacts pass the embedded self-test, desktop portable CPU, desktop host CPU and mobile CPU. Desktop keyboard movement measured **0.71681 m**; mobile joystick movement measured **0.76986 m** and touch-look yaw delta **0.175 rad**, with collision remaining on. The attempted WebGL path fell back to CPU in this execution environment, so no fresh WebGL claim is made.

## Production hosting

The GitHub Pages production root is now **Walkthrough v70 Production Source28 Sync** on canonical v23. Promotion workflow run **34160792674** completed successfully and produced gh-pages commit `b068c7c8a3ee6adee8c20bbf83c48c4fd4cea40f`. GitHub Pages deployment run **34160801253** also completed successfully. Production `index.html` blob SHA is `fa7f6145978330d4a8b7b9f60119020b8b751e29`.

Known durable origin: `https://lgalansky.github.io/34-fresnaye/`.

Repository/Pages deployment acceptance is passed for the v70 bytes. A fresh interactive public-origin desktop/mobile run and human continuous acceptance walk remain outstanding, so do not claim final walkthrough acceptance yet.

## Acceptance boundary

The verified main navigation component remains **Entrance → Living → Kitchen → Main Bedroom**. Second Dwelling and Service Stair remain separate inspection starts and must not be bridged in viewer code.

Final acceptance remains open until the Level 02 50%, 75% and 100% architectural gates are legitimately completed, public-origin walkthrough acceptance passes, then remaining levels/exterior/site are built and connected. Do not claim construction certification. Site-dependent dimensions and levels require real-world verification.
