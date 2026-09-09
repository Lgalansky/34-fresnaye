#!/usr/bin/env python3
"""Fail-closed source-to-geometry delta planner for 34 Fresnaye.

The planner never edits geometry. It converts the latest Source Architect handoff
into a deterministic build/QA decision. Source-only clarifications are allowed to
short-circuit without a model rebuild when geometry authorization is false; an
authorized geometry change still requires explicit changed_element_ids.
"""
from __future__ import annotations
import argparse, hashlib, json, pathlib, re, sys
from typing import Any


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def load_json(path: pathlib.Path) -> tuple[dict[str, Any], bytes]:
    raw = path.read_bytes()
    return json.loads(raw), raw


def source_version(handoff: dict[str, Any]) -> str:
    m = re.search(r"_v(\d+)$", str(handoff.get("artifact", "")))
    if not m:
        raise ValueError("handoff artifact does not end in _vNN")
    return f"v{m.group(1)}"


def level02_effect(handoff: dict[str, Any], version: str) -> tuple[str, str]:
    """Read current normalized schema first, then the legacy runNN schema."""
    current_path = f"level02_priority_state.effect_of_{version}"
    current = handoff.get("level02_priority_state", {}).get(f"effect_of_{version}")
    if current is not None and str(current).strip():
        return str(current).strip().rstrip(".").upper(), current_path

    legacy_key = f"run{version[1:]}_new_progress"
    legacy = handoff.get(legacy_key, {}).get("Level02_effect")
    if legacy is not None and str(legacy).strip():
        return str(legacy).strip().rstrip(".").upper(), f"{legacy_key}.Level02_effect"

    raise ValueError(f"missing Level 02 effect for {version} in normalized or legacy schema")


def source_affected_ids(handoff: dict[str, Any]) -> list[str]:
    ids = handoff.get("source_affected_element_ids")
    if isinstance(ids, list):
        return sorted(set(x.strip() for x in ids if isinstance(x, str) and x.strip()))
    advance = handoff.get("v70_material_advance") or handoff.get("material_advance") or {}
    subject = str(advance.get("subject", "")).strip()
    if subject:
        return [subject]
    return []


def plan(handoff: dict[str, Any], handoff_sha: str, pipeline: dict[str, Any], pipeline_sha: str) -> dict[str, Any]:
    version = source_version(handoff)
    effect, effect_path = level02_effect(handoff, version)
    auth = handoff.get("geometry_authorization") is True
    canonical_changed = handoff.get("canonical_geometry_changed") is True

    if canonical_changed:
        raise ValueError("handoff says canonical geometry changed; planner cannot accept an unpromoted canonical mutation")

    base = {
        "artifact": f"34_Fresnaye_GeometryDeltaPlan_Source_{version}_v1",
        "planner": "34_Fresnaye_GeometryDeltaPlanner_v3",
        "sourceArchitect": version,
        "sourceHandoffSha256": handoff_sha,
        "level02EffectSchemaPath": effect_path,
        "pipeline": pipeline.get("artifact"),
        "pipelineSha256": pipeline_sha,
        "canonicalParent": pipeline.get("canonical", {}).get("level02"),
        "viewerReuseCandidate": pipeline.get("viewer", {}).get("version"),
        "geometryAuthorization": auth,
        "level02Effect": effect,
        "geometryChanged": False,
    }

    if not auth:
        source_only = effect != "NONE"
        return {
            **base,
            "decision": "SOURCE_ONLY_SHORT_CIRCUIT" if source_only else "NO_OP_SHORT_CIRCUIT",
            "sourceAffectedElementIds": source_affected_ids(handoff),
            "changedElementIds": [],
            "geometryBuildRequired": False,
            "fullModelRegenerationRequired": False,
            "fullBrowserRegressionRequired": False,
            "qa": ["source_identity", "source_effect_classification", "canonical_identity", "deployment_source_sync"],
            "reason": (
                "Source Architect records a Level 02 source clarification but geometry authorization is false; "
                "preserve canonical model and reuse viewer."
                if source_only else
                "Level 02 effect is NONE and geometry authorization is false; preserve canonical model and reuse viewer."
            ),
        }

    changed = handoff.get("changed_element_ids")
    if not isinstance(changed, list) or not changed or not all(isinstance(x, str) and x.strip() for x in changed):
        raise ValueError("geometry is authorized but explicit changed_element_ids are absent; fail closed")

    return {
        **base,
        "decision": "PATCH_PLAN_REQUIRED",
        "sourceAffectedElementIds": source_affected_ids(handoff),
        "changedElementIds": sorted(set(x.strip() for x in changed)),
        "geometryBuildRequired": True,
        "fullModelRegenerationRequired": False,
        "fullBrowserRegressionRequired": False,
        "qa": ["targeted_patch_QA", "dependency_trigger_evaluation"],
        "reason": "Build only explicitly authorized changed elements; promote only after QA and dependency-triggered regression.",
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--handoff", required=True, type=pathlib.Path)
    ap.add_argument("--pipeline", required=True, type=pathlib.Path)
    ap.add_argument("--out", required=True, type=pathlib.Path)
    args = ap.parse_args()

    try:
        handoff, hb = load_json(args.handoff)
        pipeline, pb = load_json(args.pipeline)
        result = plan(handoff, sha256_bytes(hb), pipeline, sha256_bytes(pb))
        args.out.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
        print(json.dumps(result, indent=2))
        return 0
    except Exception as exc:
        print(f"BLOCKED: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
