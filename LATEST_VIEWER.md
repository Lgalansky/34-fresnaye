# 34 Fresnaye — latest walkthrough state

Current permanent hosted reviewer: **Walkthrough v52 — Live Hosted Source Sync** at `https://lgalansky.github.io/34-fresnaye/`, still bound to promoted Level 02 **canonical v19**.

Latest candidate QA viewer: **Walkthrough v54 — v22 Candidate Independent QA** (2026-09-07). It is deliberately **not live** and **not canonical**.

## Canonical / live boundary

- Canonical Level 02: **v19** — 5,689 vertices / 8,787 triangles.
- Canonical OBJ SHA-256: `0c8df8db5db23d16d52172b539f83ba092828366de037499748724ed2a1eef36`.
- Canonical GLB SHA-256: `6afbe438fb40e19d042656fc6498917bbb64fee75adf073c354dde0b04a865ab`.
- Permanent Pages reviewer remains **v52**. Do not rebind the live URL to a candidate model before canonical promotion QA.

## Latest Geometry Builder candidate — v22

Candidate file: `34_Fresnaye_Level02_25pct_v22_iD05_SourceOwnedOpeningRebuildCandidate`.

- OBJ SHA-256: `4d788681c3c92b8d4daf678ba5b5822d47cf558b96b3ec7e56d80b6262dc8cd8`.
- GLB SHA-256: `39a715fafb6970d4ae03da7eaf6e5e40a6e4e54386dc3675544fb7393bb751ac`.
- Topology: **5,721 vertices / 8,835 triangles**, zero degenerate faces.
- v21 parent vertices/faces are preserved exactly as the candidate prefix; v22 adds 24 vertices / 36 triangles for the source-owned iD05 local wall/jamb/header reconstruction.
- Independent iD05 QA: **PASS_LOCAL_iD05_CANDIDATE_QA_WITH_CAVEAT**. Registered jamb span is 1200.144 mm versus written 1200 mm, the local wall band is 400.049 mm versus written 400 mm, the U/S head is 2400 mm, and no triangle centroid intrudes into the below-head opening corridor.
- Caveat: eight inherited parent triangle centroids remain encapsulated inside the new source-owned local solids. They do not intrude into the opening corridor, but final candidate cleanup/review should address the internal-shell duplication before promotion.

## Remaining Level 02 25% model blocker

The **source-evidence gate is PASSED**, but model acceptance remains **NOT PASSED**. iD08 is dimensionally source-closed at **855 / U-S2400 / pocket90**, with a written 750 return chain and registered native vector endpoints. However, the Archilab source represents the L-junction with staggered segmented wall/cavity/finish vectors and does not supply a safe single closed solid boundary. Do **not** invent a bridge, taper, 0.198 m fill strip, or substitute the scheduled 955 mm leaf. A source-owned coherent L-junction boundary or explicit conversion instruction is still required for final integration.

## Walkthrough v54 candidate QA

The self-contained v54 QA viewer is bound to the exact v22 candidate hashes/topology and is marked **CANDIDATE QA ONLY**. Browser regression passed:

- desktop WebGL2: model/hash/topology loaded; keyboard movement and pointer-lock mouse-look exercised;
- forced WebGL1: model/hash/topology loaded; keyboard/mouse controls exercised;
- mobile WebGL2: physical touch joystick moved 1.126 m and touch-look changed 0.309 rad; compact mobile menu tap worked;
- CPU Canvas2D fallback: exact v22 hash/topology loaded and rendered;
- route regression: Entrance→Living, Living→Kitchen, Kitchen→Main Bedroom and Main Bedroom→Entrance all remain collision-safe; Entrance→Second Dwelling and Entrance→Service Stair remain disconnected.

The full viewer contains both gzip and raw-base64 model payloads. Static integrity checks confirm both independently decode to the exact v22 OBJ SHA above; inline JavaScript syntax passes.

## Level 02 50% source exceptions

Do not start final 50% geometry until 25% promotion. Current source exceptions remain: W09 overall width, G04 front structural opening height, the W05 50 mm brickwork/schedule head-interface interpretation, and zone-specific ceiling/bulkhead dimensions pending Archilab's revised issue.

Static renders remain review aids only. Site-dependent dimensions require real-world verification. This repository is not construction certification.