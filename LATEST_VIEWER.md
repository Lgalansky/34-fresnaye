# 34 Fresnaye — latest walkthrough state

**Status: NOT COMPLETE. Level 02 25% source + model acceptance is PASSED; Level 02 50% remains BLOCKED / NOT STARTED.**

## Canonical Level 02

Canonical geometry remains **v23**, unchanged: **5,769 vertices / 8,907 triangles**.

- OBJ SHA-256: `c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5`
- GLB SHA-256: `7a33cc3077cbdcfa3679fe6d6e7bb1fd667e6591f80e958aa2869c67aabcdd49`
- No architectural geometry was changed by Walkthrough Engineering.

## Current source state

The walkthrough contract is synchronized to **Source Architect v25 / discrepancy log v45 (`SA25-DL45-v23-PROMOTED`)**. No new Level 02 geometry authorization was issued.

The four material Level 02 50% source blockers remain:

1. W09 overall / masonry rough width.
2. G04 front structural-opening height.
3. W05 50 mm brickwork-vs-schedule head/interface interpretation.
4. Remaining zone-specific ceiling heights / perimeter-bulkhead drops.

Do not create new canonical geometry by inference.

## Walkthrough engineering

The latest engineering candidate is **Walkthrough v68 Rich Simulator BlockerSync**. It preserves the canonical v23 model and the richer first-person simulator infrastructure: desktop WASD/arrows + mouse, mobile joystick/touch-look, reset/room starts, collision/floor following, route guide, guided connected-room review, continuous acceptance proof, navigation map, continuity/gap/floor-island diagnostics, performance/adaptive quality, input/orientation recovery, session QA, exact-view recovery and device readiness.

v68 corrects a source-state reporting inconsistency inherited by v67: the readiness list had all four Level 02 50% blockers, but the device/session source-state object reported a blocker count of zero. v68 now explicitly reports **4/4 blockers** and self-tests blocker-count consistency. This is QA/metadata hardening only; no architectural geometry changed.

Fresh v68 QA passes:

- JavaScript syntax and exact canonical v23 model reconstruction/hash/topology.
- Portable desktop CPU runtime; actual W-key frame-loop movement **0.716595 m**.
- Host desktop CPU runtime.
- Mobile CPU/touch runtime at 390×844; joystick movement **0.76986 m**, touch-look yaw delta **0.175 rad**, mobile Controls and Reset verified, input returned idle.
- Embedded self-test including hash/topology, desktop/mobile control math, collision, walking guide, review/acceptance tooling, live-device QA bridge and source-blocker consistency.

The WebGL attempt fell back to CPU because of the current execution environment; this is not classified as a WebGL viewer pass or failure.

## Production hosting

The GitHub Pages production root remains **Walkthrough v65 Durable Host Link Gate**, not v68. The production `gh-pages/index.html` was re-read after the current GitHub changes and still identifies v65 with its existing blob. The legacy model-payload and mobile-control repair workflows have been changed to **manual-only**, so routine `main` pushes no longer needlessly mutate or redeploy the production branch. The live-viewer validation workflow remains read-only.

The Pages deployment is healthy by GitHub evidence and a production `qa.html` exists, but Walkthrough Engineering has not freshly opened the public Pages origin from the current execution environment. Therefore v68 is **not promoted** and public-origin interactive acceptance is still outstanding.

Known durable origin: `https://lgalansky.github.io/34-fresnaye/` — do not present it as newly verified from a run that could not open it.

## Acceptance boundary

The verified main navigation component remains **Entrance → Living → Kitchen → Main Bedroom**. Second Dwelling and Service Stair remain separate inspection starts and must not be bridged in viewer code.

Final acceptance remains open until a real public-origin desktop/mobile run and a human continuous acceptance walk are completed. Do not claim Level 02 50%, whole-house completion, construction certification, or public-origin interactive acceptance before the relevant gates pass. Site-dependent dimensions and levels require real-world verification.
