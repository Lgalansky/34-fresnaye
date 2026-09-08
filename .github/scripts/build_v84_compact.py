from pathlib import Path
import json,re,hashlib,sys
src=Path(sys.argv[1]); out=Path(sys.argv[2]); s=src.read_text()
CAN='c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5'; assert CAN in s
# Viewer/source identity. Global v81->v84 is intentional: every v81 occurrence in this artifact is viewer/session identity, not geometry.
s=s.replace('v81','v84').replace('Source36','Source37').replace('SA36DL57','SA37DL58').replace('SA36-DL57-v23-PROMOTED','SA37-DL58-v23-PROMOTED')
s=s.replace('handoff v36','handoff v37').replace('discrepancy log v57','discrepancy log v58').replace('revision watch v20','revision watch v21').replace('Source Architect v36','Source Architect v37').replace('Revision watch v20','Revision watch v21')
# Add current iD05/iD08 source-stage evidence to visible panel without authorizing exact leaf geometry.
s=s.replace('pocket opening 100 mm','pocket 100 mm · central leaf roughly 50 mm with 25 mm clear each side · approximate thickness NOT exact',1)
s=s.replace('pocket opening 90 mm','pocket 90 mm · central leaf roughly 50 mm with 20 mm clear each side · approximate thickness NOT exact',1)
# SOURCE_GATE structured contract.
m=re.search(r"const SOURCE_GATE=(\{.*?\});\nconst MODEL_NAME=",s,re.S); assert m
g=json.loads(m.group(1)); assert g['candidateModel']['version']=='v23' and g['geometryBlockersCount']==4 and len(g['geometryBlockers'])==4
g['contractVersion']='SA37-DL58-v23-PROMOTED';g['sourceArchitectHandoff']='34_Fresnaye_SourceArchitect_handoff_v37.json';g['discrepancyLog']='34_Fresnaye_Level02_discrepancy_log_v58.json';g['sourceRevisionWatch']='34_Fresnaye_SourceArchitect_SourceRevisionWatch_v21.json';g['openingEvidenceRegister']='34_Fresnaye_SourceArchitect_Level02_50pct_OpeningEvidenceRegister_v13.json';g['pocketDoorComponentClearanceRegister']='34_Fresnaye_SourceArchitect_Level02_iD05_iD08_PocketDoorComponentClearanceRegister_v1.json'
for k,c,p in [('iD05',25,100),('iD08',20,90)]:
 i=g['items'][k];i['pocketOpeningMm']=p;i['sideClearanceEachMm']=c;i['leafThicknessSourceWording']='roughly 50mm';i['exactLeafThicknessAuthorized']=False;i['componentEvidenceRole']='LATER_COMPONENT_STAGE_SOURCE_EVIDENCE_ONLY'
g['referenceComponentAssets']={'kit':'ComponentEnvelopeKit v2 iD05/iD08','role':'REFERENCE_QA_ONLY_NOT_HOUSE_GEOMETRY','exactLeafThicknessModeled':False,'integrationIntoCanonical':False}
g['latestSourceProgress']['L02_iD05_iD08']='POCKET_CLEARANCES_SOURCE_STAGED_FOR_LATER_COMPONENT_WORK__EXACT_LEAF_THICKNESS_NOT_AUTHORIZED__CANONICAL_V23_UNCHANGED';g['latestSourceProgress']['openingEvidenceRegister']=g['openingEvidenceRegister'];g['futureSourceRevision']['note']='No new Archilab revision found on 2026-09-08. Do not infer W09 width, G04 front height, remaining ceiling zones, bulkhead widths/other drops, or exact iD05/iD08 leaf thickness.'
s=s[:m.start(1)]+json.dumps(g,separators=(',',':'),ensure_ascii=False)+s[m.end(1):]
# Add explicit source-stage regression proof to built-in self-test.
needle='result.tests.reviewCoverageTracking=Array.isArray(sourceGateState().visitedStarts)'; assert needle in s
proof="result.tests.pocketDoorClearanceSourceStaged=SOURCE_GATE.items.iD05.pocketOpeningMm===100&&SOURCE_GATE.items.iD05.sideClearanceEachMm===25&&SOURCE_GATE.items.iD05.exactLeafThicknessAuthorized===false&&SOURCE_GATE.items.iD08.pocketOpeningMm===90&&SOURCE_GATE.items.iD08.sideClearanceEachMm===20&&SOURCE_GATE.items.iD08.exactLeafThicknessAuthorized===false&&SOURCE_GATE.referenceComponentAssets.role==='REFERENCE_QA_ONLY_NOT_HOUSE_GEOMETRY'&&SOURCE_GATE.referenceComponentAssets.integrationIntoCanonical===false;"
s=s.replace(needle,proof+needle,1)
# Host-tier self-test must pass on local, durable candidate, or production when core device QA is valid.
s=s.replace("lq.status==='PASS_LOCAL_HOST_GATES_PENDING'","['PASS_LOCAL_HOST_GATES_PENDING','PASS_DURABLE_CANDIDATE','PASS_PRODUCTION'].includes(lq.status)")
# Make live device source check include current revision watch.
s=s.replace("sourceDisplayCurrent:(document.getElementById('gateMeta')?.textContent||'').includes('handoff v37')&&(document.getElementById('gateMeta')?.textContent||'').includes('discrepancy log v58')","sourceDisplayCurrent:(document.getElementById('gateMeta')?.textContent||'').includes('handoff v37')&&(document.getElementById('gateMeta')?.textContent||'').includes('discrepancy log v58')&&(document.getElementById('gateMeta')?.textContent||'').includes('revision watch v21')")
# Guards: canonical hash stays bound, no legacy source contract/viewer identity survives, no geometry authorization.
assert 'v81' not in s and 'SA36-DL57-v23-PROMOTED' not in s and 'content="v84"' in s and 'SA37-DL58-v23-PROMOTED' in s
assert g['geometryAuthorization'] is False and g['candidateModel']['objSha256']==CAN and g['partialGeometryCandidate']['loadedByThisViewer'] is False
out.write_text(s);print(hashlib.sha256(s.encode()).hexdigest(),len(s.encode()))
