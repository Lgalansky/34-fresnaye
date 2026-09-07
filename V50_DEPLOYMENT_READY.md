# Walkthrough v50 deployment staging

Canonical architectural geometry is unchanged at Level 02 v19.

Walkthrough v50 Dual Loader Resilience passed desktop WebGL2, forced WebGL1 and mobile CPU Canvas2D regression. The portable/static-host payload is stored persistently in `/34 fresnaye` and Google Drive `34 Fresnaye`.

v50 infrastructure additions:
- hash-verified raw-OBJ compatibility loading when `DecompressionStream` is unavailable;
- mobile controls drawer stacking fix so the scrim cannot intercept drawer controls.

Canonical OBJ SHA-256: `0c8df8db5db23d16d52172b539f83ba092828366de037499748724ed2a1eef36`
Canonical GLB SHA-256: `6afbe438fb40e19d042656fc6498917bbb64fee75adf073c354dde0b04a865ab`
Topology: 5,689 vertices / 8,787 triangles.

GitHub Pages is not enabled yet. Do not treat this branch as a verified live walkthrough until the current v50 static payload is unpacked to the branch root, Pages is enabled, and the resulting HTTPS URL passes desktop and mobile runtime QA.
