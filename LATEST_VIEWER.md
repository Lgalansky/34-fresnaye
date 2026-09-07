# 34 Fresnaye — latest walkthrough state

Current permanent hosted reviewer: **Walkthrough v52 — Live Hosted Source Sync** (2026-09-07).

The richer portable/PWA reviewer remains **Walkthrough v51 — Source Gate Closure Sync**. Canonical architectural geometry is still Level 02 **v19, unchanged**.

- OBJ SHA-256: `0c8df8db5db23d16d52172b539f83ba092828366de037499748724ed2a1eef36`
- GLB SHA-256: `6afbe438fb40e19d042656fc6498917bbb64fee75adf073c354dde0b04a865ab`
- Topology: 5,689 vertices / 8,787 triangles.
- Permanent Pages URL: `https://lgalansky.github.io/34-fresnaye/`
- Final hosted `gh-pages` commit: `a914362c726c6198da6380158e7d2643044163fc`.
- GitHub Pages run `34116580888`: build PASS, deploy PASS.

## Hosted deployment QA

The old Pages root has been replaced by v52. Deployment QA found and repaired two real defects before promotion:

1. Three corrupted base64 characters in the split hosted model payload were repaired. The final 95,116-character payload independently decompresses to the canonical 537,394-byte OBJ and verifies the exact SHA-256 above.
2. On mobile, the touch-look layer could intercept Reset / Collision / Full screen taps. The live stacking order was corrected so action controls remain above the touch-look layer.

Fresh browser QA against the exact final hosted code/model bytes passes desktop WebGL2, forced WebGL1 compatibility, and mobile touch. The viewer's model hash gate passes and renders all 8,787 triangles. Keyboard movement, mouse-look, collision toggling, room starts/reset, mobile joystick/touch-look, Source Gate interaction, and mobile action-button targeting pass without JavaScript/page errors.

The automation browser/network policy prevents direct custom-HTTPS navigation to the public Pages origin. Therefore the Pages deployment and the exact deployed artifact are verified independently, but direct live-origin interactive acceptance is not represented as completed by this runtime.

## Source contract

Latest source inspection is **Source Architect v17 / discrepancy log v37 / Level 02 50% readiness register v3**. The v17 re-audit confirms the Level 02 25% **SOURCE EVIDENCE** gate remains passed with zero current 25% source blockers or coordination exceptions. The direct SA16 Archilab clarification continues to govern the closed 25% evidence:

- D09: 1790 / U-S 2400.
- D21: 975 × 2400 at Entrance Lobby / Family Kitchen.
- Former duplicate D21 bay corrected to D22: rough 2980 / U-S 2210; assembly 6240 overall / 3080 inner / 2210 high.
- W11: 400 mm finished/overall wall thickness; opening 1800 / U-S 2090.
- iD05: rough 1200 / U-S 2400; pocket 100.
- iD08: rough 855 / U-S 2400; pocket 90.

Source Architect v17 explicitly makes **no geometry change** and `geometry_authorization=false`. Canonical v19 remains frozen until a separately authorized Geometry Builder candidate is created and independently QA'd. Level 02 25% **MODEL acceptance remains NOT PASSED**.

## Level 02 50% source exceptions

The latest direct plan + schedule + elevation re-audit confirms four remaining source exceptions:

- W09 overall/rough width is genuinely unprinted/unowned; 1500 height and 900 sill/reference are explicit.
- G04 front width is resolved at 3140, but front structural height is genuinely missing; nearby 2200 / 1955 values are profile/flanking dimensions and must not be used.
- W05 remains a 50 mm brickwork-versus-schedule head/interface exception (brickwork 1900 / U-S2450 versus schedule height1500 + sill1000 = top2500); Section K-K context does not resolve ownership.
- Zone-specific ceiling/bulkhead drops and heights remain pending the reworked Archilab issue.

## Continuity / acceptance

Entrance → Living → Kitchen → Main Bedroom → Entrance remains the verified collision-safe main component. Second Dwelling and Service Stair remain isolated in canonical v19. Level 02 and whole-house acceptance are not claimed.

Site-dependent dimensions require real-world verification. This repository is not construction certification.
