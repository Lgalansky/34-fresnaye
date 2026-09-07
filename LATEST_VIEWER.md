# 34 Fresnaye — latest walkthrough state

Current permanent hosted reviewer: **Walkthrough v52 — Live Hosted Source Sync** at `https://lgalansky.github.io/34-fresnaye/`, still bound to promoted Level 02 **canonical v19**.

Latest canonical-model host candidate: **Walkthrough v55 — CanonicalLock SourceSync** (2026-09-07). It has fresh desktop WebGL2, forced WebGL1 and mobile CPU runtime regression passes but is deliberately **not live yet**.

Latest Geometry Builder candidate: **v23 — iD08 Exact Hatch Footprint Subvolumes Candidate**. It is **NOT CANONICAL** and awaits independent QA.

## Canonical / live boundary

- Canonical Level 02: **v19** — 5,689 vertices / 8,787 triangles.
- Canonical OBJ SHA-256: `0c8df8db5db23d16d52172b539f83ba092828366de037499748724ed2a1eef36`.
- Canonical GLB SHA-256: `6afbe438fb40e19d042656fc6498917bbb64fee75adf073c354dde0b04a865ab`.
- Permanent Pages reviewer remains **v52**. Do not rebind the live URL to a candidate geometry model before canonical promotion QA.

## Source contract — SA20 / discrepancy log v40

Level 02 25% **source evidence is PASSED**. Source Architect v20 authorizes iD08 as separate exact source-owned HATCH footprint sub-volumes while preserving source gaps. A single monolithic L-junction wall polygon, convex hull, boolean gap fill, taper/bridge or scheduled 955 mm leaf substitution remains prohibited.

Governing iD08 values remain rough opening **855 mm**, U/S **2400 mm**, pocket **90 mm**, adjacent return **750 mm**. Written nominal dimensions govern; registered native vectors locate the source geometry.

## Latest Geometry Builder candidate — v23

Candidate: `34_Fresnaye_Level02_25pct_v23_iD08_ExactHatchFootprintSubvolumesCandidate`.

- OBJ SHA-256: `c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5`.
- GLB SHA-256: `7a33cc3077cbdcfa3679fe6d6e7bb1fd667e6591f80e958aa2869c67aabcdd49`.
- Topology: **5,769 vertices / 8,907 triangles**, zero degenerate faces.
- Parent v22 is preserved as the candidate prefix; v23 adds 48 vertices / 72 triangles across six exact source-footprint sub-volumes.
- Builder diff QA passes: source perimeters match, no positive-area overlap between new source regions, registered opening-corridor vertex intrusions = 0, bounds unchanged.
- Candidate caveat: inherited parent internal-shell surfaces remain encapsulated in portions of the new patch. Independent QA must decide cleanup/justification before promotion.

## Walkthrough v55 host candidate

Walkthrough v55 remains bound to **canonical v19**, not v23. It is source-synchronized to SA20 / DL40 and contains a canonical deployment guard: runtime deployment is valid only when the loaded OBJ hash equals canonical v19; v23 is explicitly quarantined as NOT CANONICAL.

Fresh runtime QA passes:

- desktop WebGL2: canonical hash/topology verified, embedded self-test passed, keyboard movement exercised (0.5375 m), collision-safe routes within the verified main component passed;
- forced WebGL1: same canonical/hash/self-test and movement checks passed;
- mobile CPU Canvas2D: canonical hash/topology verified, touch joystick moved 1.166325 m, touch-look changed 0.140 rad, compact menu and Reset tap exercised, input returned idle.

Static packaging also passes: viewer JavaScript syntax, exact 95,116-character gzip reconstruction to the 537,394-byte canonical OBJ, ZIP integrity, static-host package and single-file portable package.

## Acceptance / continuity boundary

Entrance → Living → Kitchen → Main Bedroom remains the verified connected component under canonical v19. Second Dwelling and Service Stair remain isolated. Human continuous-walk acceptance remains outstanding. Static renders remain review aids only.

Level 02 25% **model acceptance remains NOT PASSED** until independent v23 QA and explicit canonical promotion. Final 50% geometry must not start before that promotion.

Current 50% source exceptions remain: W09 overall/rough width, G04 front structural opening height, W05 50 mm brickwork/schedule head-interface interpretation, and remaining zone-specific ceiling/bulkhead dimensions pending Archilab revision.

Site-dependent dimensions require real-world verification. This repository is simulator/model QA, not construction certification.
