#!/usr/bin/env python3
import argparse,hashlib,json,pathlib,re,sys

def sha256_bytes(b): return hashlib.sha256(b).hexdigest()
def load(p):
    b=p.read_bytes(); return json.loads(b),b
def norm(v): return str(v or '').strip().rstrip('.').upper()
def ver(h):
    a=str(h.get('artifact',''))
    m=re.search(r'_v(\d+)(?:_|$)',a)
    if not m: raise ValueError('invalid Source Architect artifact/version')
    return 'v'+m.group(1)
def explicit_effect(h,v):
    p=h.get('level02_priority_state') or {}; k='effect_of_'+v
    if p.get(k): return norm(p[k]),'level02_priority_state.'+k
    mat=h.get(v+'_material_advance') or {}
    if mat.get('geometry_effect'): return norm(mat['geometry_effect']),v+'_material_advance.geometry_effect'
    run=h.get('run'+v[1:]+'_new_progress') or {}
    if run.get('Level02_effect'): return norm(run['Level02_effect']),'run'+v[1:]+'_new_progress.Level02_effect'
    if h.get('level02_effect'): return norm(h['level02_effect']),'level02_effect'
    return None,None
def classify(h,hsha,v,c):
    e,p=explicit_effect(h,v)
    if e: return e,p
    if c is None: raise ValueError('missing explicit Level02 effect and no classification bridge')
    if c.get('sourceArchitect')!=v or c.get('sourceHandoffSha256')!=hsha: raise ValueError('classification bridge source identity mismatch')
    if c.get('canonicalGeometryChanged') is not False or c.get('geometryAuthorization') is not False: raise ValueError('classification bridge is not geometry-neutral')
    e=norm(c.get('level02Effect'))
    if not e: raise ValueError('classification bridge missing level02Effect')
    return e,'walkthrough_classification.level02Effect'
def plan(h,hsha,p,psha,c=None):
    v=ver(h); auth=h.get('geometry_authorization') is True; changed=h.get('canonical_geometry_changed') is True
    if changed: raise ValueError('unpromoted canonical geometry mutation is not accepted')
    e,ep=classify(h,hsha,v,c)
    canonical=p.get('canonical',{}).get('level02'); viewer=p.get('viewer',{}).get('version')
    if not canonical or not viewer: raise ValueError('pipeline missing canonical/viewer identity')
    base={'artifact':f'34_Fresnaye_GeometryDeltaPlan_Source_{v}_v1','planner':'34_Fresnaye_GeometryDeltaPlanner_v7','sourceArchitect':v,'sourceHandoffSha256':hsha,'level02EffectSchemaPath':ep,'pipeline':p.get('artifact'),'pipelineSha256':psha,'canonicalParent':canonical,'viewerReuseCandidate':viewer,'geometryAuthorization':auth,'level02Effect':e,'geometryChanged':False}
    if not auth:
        decision='NO_OP_SHORT_CIRCUIT' if e=='NONE' or e.startswith('NONE__') else 'SOURCE_ONLY_SHORT_CIRCUIT'
        return {**base,'decision':decision,'changedElementIds':[],'geometryBuildRequired':False,'fullModelRegenerationRequired':False,'fullBrowserRegressionRequired':False,'qa':['source_identity','source_effect_classification','canonical_identity','deployment_source_sync'],'reason':'Source Architect does not authorize geometry; preserve canonical model and reuse exact viewer/browser QA.'}
    ids=h.get('changed_element_ids')
    if not isinstance(ids,list) or not ids or not all(isinstance(x,str) and x.strip() for x in ids): raise ValueError('geometry authorization requires explicit changed_element_ids; fail closed')
    ids=sorted(set(x.strip() for x in ids))
    return {**base,'decision':'PATCH_PLAN_REQUIRED','changedElementIds':ids,'geometryBuildRequired':True,'fullModelRegenerationRequired':False,'fullBrowserRegressionRequired':False,'qa':['targeted_patch_QA','dependency_trigger_evaluation'],'reason':'Build only explicitly authorized changed elements; promote only after QA.'}
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--handoff',type=pathlib.Path,required=True);ap.add_argument('--pipeline',type=pathlib.Path,required=True);ap.add_argument('--classification',type=pathlib.Path);ap.add_argument('--out',type=pathlib.Path,required=True);a=ap.parse_args()
    try:
        h,hb=load(a.handoff);p,pb=load(a.pipeline);c=load(a.classification)[0] if a.classification else None;r=plan(h,sha256_bytes(hb),p,sha256_bytes(pb),c);a.out.write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r,indent=2));return 0
    except Exception as ex: print('BLOCKED: '+str(ex),file=sys.stderr);return 2
if __name__=='__main__': raise SystemExit(main())
