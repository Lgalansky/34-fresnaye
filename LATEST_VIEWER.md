# 34 Fresnaye — latest walkthrough state

**Status: NOT COMPLETE. Level 02 25% source + model acceptance is PASSED; Level 02 50% remains BLOCKED / NOT STARTED.**

## Canonical Level 02

Canonical geometry remains **v23**, unchanged: **5,769 vertices / 8,907 triangles**.

- OBJ SHA-256: `c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5`
- GLB SHA-256: `7a33cc3077cbdcfa3679fe6d6e7bb1fd667e6591f80e958aa2869c67aabcdd49`
- No architectural geometry was changed in the v69 production synchronization.

## Current source state

The current architectural evidence contract is **Source Architect v27 / discrepancy log v47 / source-revision watch v12 (`SA27-DL47-v23-PROMOTED`)**. A fresh Outlook check still identifies Michael Borgström/Archilab's 2026-09-07T10:00:06Z clarification as the latest architectural source. The anticipated reworked drawings and ceiling/bulkhead issue have not arrived.

The four material Level 02 50% source blockers remain:

1. W09 overall / masonry rough width.
2. G04 front structural-opening height.
3. W05 50 mm brickwork-vs-schedule head/interface interpretation.
4. Remaining zone-specific ceiling heights / perimeter-bulkhead drops.

Do not create new canonical geometry by inference.

## Walkthrough engineering

A Source27-synchronized local rich viewer, **Walkthrough v69 RichHost Source27Sync**, has passed static integrity and CPU runtime regressions against canonical v23. Desktop keyboard movement with collision on measured **0.644785 m**. Mobile joystick movement measured **0.6334 m** and touch-look yaw delta **0.16 rad**. No architectural geometry changed.

The execution environment did not provide a fresh WebGL/public-origin interaction run, so WebGL and public-origin human acceptance remain open rather than being inferred from CPU/static QA.

## Production hosting

The GitHub Pages production root is now **Walkthrough v69 Production Source27 Sync** on canonical v23. Promotion workflow run **34160337591** completed successfully and produced gh-pages commit `46df9cb656e0477cb8994c36b101f6114bd71431`. GitHub Pages deployment run **34160345693** also completed successfully.

Known durable origin: `https://lgalansky.github.io/34-fresnaye/`.

Repository/Pages deployment acceptance is passed for the v69 bytes. A fresh interactive public-origin desktop/mobile run and human continuous acceptance walk are still outstanding, so do not claim final walkthrough acceptance yet.

## Acceptance boundary

The verified main navigation component remains **Entrance → Living → Kitchen → Main Bedroom**. Second Dwelling and Service Stair remain separate inspection starts and must not be bridged in viewer code.

Final acceptance remains open until the Level 02 50%, 75% and 100% architectural gates are legitimately completed, public-origin walkthrough acceptance passes, then remaining levels/exterior/site are built and connected. Do not claim construction certification. Site-dependent dimensions and levels require real-world verification.
