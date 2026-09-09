#!/usr/bin/env python3
"""34 Fresnaye fail-closed geometry delta planner v4.

Source-only clarifications never force a geometry build when the Source Architect
explicitly reports canonical_geometry_changed=false and geometry_authorization=false.
Authorized geometry changes still require explicit changed_element_ids.
"""
from __future__ import annotations
import argparse, hashlib, json, pathlib, re, sys
from typing import Any

def sha256_bytes(b: bytes)->str: return hashlib.sha256(b).hexdigest()
def load(p:pathlib.Path):
    b=p.read_bytes(); return json.loads(b), b
def ver(h):
    m=re.search(r"_v(\d+)$",str(h.get("artifact","")))
    if not m: raise ValueError("handoff artifact does not end in _vNN")
    return f"v{m.group(1)}"
def norm(v): return str(v or '').strip().rstrip('.').upper()
def effect(h,v):
    d=v[1:]; p=h.get('level02_priority_state')
    if isinstance(p,dict):
        k=f'effect_of_v{d}'; e=norm(p.get(k))
        if e:return e,f'level02_priority_state.{k}'
    k=f'run{d}_new_progress'; r=h.get(k)
    if isinstance(r,dict):
        e=norm(r.get('Level02_effect'))
        if e:return e,f'{k}.Level02_effect'
    e=norm(h.get('level02_effect'))
    if e:return e,'level02_effect'
    raise ValueError('missing explicit Level02 effect')
def plan(h,hsha,p,psha):
    v=ver(h); e,ep=effect(h,v); auth=h.get('geometry_authorization') is True; changed=h.get('canonical_geometry_changed') is True
    if changed: raise ValueError('unpromoted canonical geometry mutation is not accepted')
    canonical=p.get('canonical',{}).get('level02'); viewer=p.get('viewer',{}).get('version')
    if not canonical or not viewer: raise ValueError('pipeline missing canonical/viewer identity')
    base={'artifact':f'34_Fresnaye_GeometryDeltaPlan_Source_{v}_v1','planner':'34_Fresnaye_GeometryDeltaPlanner_v4','sourceArchitect':v,'sourceHandoffSha256':hsha,'level02EffectSchemaPath':ep,'pipeline':p.get('artifact'),'pipelineSha256':psha,'canonicalParent':canonical,'viewerReuseCandidate':viewer,'geometryAuthorization':auth,'level02Effect':e,'geometryChanged':False}
    if not auth:
        return {**base,'decision':'SOURCE_ONLY_SHORT_CIRCUIT' if e!='NONE' else 'NO_OP_SHORT_CIRCUIT','changedElementIds':[],'geometryBuildRequired':False,'fullModelRegenerationRequired':False,'fullBrowserRegressionRequired':False,'qa':['source_identity','source_effect_classification','canonical_identity','deployment_source_sync'],'reason':'Source Architect does not authorize geometry; preserve canonical model and reuse exact viewer/browser QA.'}
    ids=h.get('changed_element_ids')
    if not isinstance(ids,list) or not ids or not all(isinstance(x,str) and x.strip() for x in ids): raise ValueError('geometry authorization requires explicit changed_element_ids; fail closed')
    ids=sorted(set(x.strip() for x in ids))
    return {**base,'decision':'PATCH_PLAN_REQUIRED','changedElementIds':ids,'geometryBuildRequired':True,'fullModelRegenerationRequired':False,'fullBrowserRegressionRequired':False,'qa':['targeted_patch_QA','dependency_trigger_evaluation'],'reason':'Build only explicitly authorized changed elements; promote only after QA.'}
def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--handoff',type=pathlib.Path,required=True); ap.add_argument('--pipeline',type=pathlib.Path,required=True); ap.add_argument('--out',type=pathlib.Path,required=True); a=ap.parse_args()
    try:
        h,hb=load(a.handoff); p,pb=load(a.pipeline); r=plan(h,sha256_bytes(hb),p,sha256_bytes(pb)); a.out.write_text(json.dumps(r,indent=2)+'\n'); print(json.dumps(r,indent=2)); return 0
    except Exception as ex: print('BLOCKED: '+str(ex),file=sys.stderr); return 2
if __name__=='__main__': raise SystemExit(main())
