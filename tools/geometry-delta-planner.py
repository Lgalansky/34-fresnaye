#!/usr/bin/env python3
"""Fail-closed source-to-geometry delta planner for 34 Fresnaye.

This planner never edits geometry. It converts a Source Architect handoff into a
small deterministic build/QA plan. It deliberately short-circuits when Level 02
has no effect, avoiding unnecessary whole-model regeneration.
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


def level02_effect(handoff: dict[str, Any], version: str) -> str:
    key = f"run{version[1:]}_new_progress"
    progress = handoff.get(key, {})
    effect = str(progress.get("Level02_effect", "")).strip().rstrip(".").upper()
    if not effect:
        raise ValueError(f"missing {key}.Level02_effect")
    return effect


def plan(handoff: dict[str, Any], handoff_sha: str, pipeline: dict[str, Any], pipeline_sha: str) -> dict[str, Any]:
    version = source_version(handoff)
    effect = level02_effect(handoff, version)
    auth = handoff.get("geometry_authorization") is True
    canonical_changed = handoff.get("canonical_geometry_changed") is True

    if canonical_changed:
        raise ValueError("handoff says canonical geometry changed; planner cannot accept an unpromoted canonical mutation")

    base = {
        "artifact": f"34_Fresnaye_GeometryDeltaPlan_Source_{version}_v1",
        "sourceArchitect": version,
        "sourceHandoffSha256": handoff_sha,
        "pipeline": pipeline.get("artifact"),
        "pipelineSha256": pipeline_sha,
        "canonicalParent": pipeline.get("canonical", {}).get("level02"),
        "geometryAuthorization": auth,
        "level02Effect": effect,
        "geometryChanged": False,
    }

    if effect == "NONE" and not auth:
        return {
            **base,
            "decision": "NO_OP_SHORT_CIRCUIT",
            "changedElementIds": [],
            "geometryBuildRequired": False,
            "fullModelRegenerationRequired": False,
            "fullBrowserRegressionRequired": False,
            "qa": ["source_identity", "canonical_identity", "deployment_source_sync"],
            "reason": "Level 02 effect is NONE and geometry authorization is false; preserve canonical model and reuse viewer.",
        }

    changed = handoff.get("changed_element_ids")
    if not isinstance(changed, list) or not changed or not all(isinstance(x, str) and x.strip() for x in changed):
        raise ValueError("source affects/authorizes Level 02 but explicit changed_element_ids are absent; fail closed")

    return {
        **base,
        "decision": "PATCH_PLAN_REQUIRED",
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