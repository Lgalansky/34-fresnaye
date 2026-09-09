#!/usr/bin/env python3
import json,hashlib,datetime,pathlib,re,sys
root=pathlib.Path(sys.argv[1] if len(sys.argv)>1 else '/tmp/pages')
H=lambda p: hashlib.sha256((root/p).read_bytes()).hexdigest()
viewer='1540afe2fa89196264dcc1ed078f57b132a8a68399e45c2eb9bd9a85df8a3ded'
model='c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5'
loader_src=root/'v96-r7/index.html'; sw_src=root/'v96-r7/sw.js'
assert loader_src.exists() and sw_src.exists()
assert H('v96-r7/index.html')=='9240e13dff84bc8f13746636cb43840ed83a2ad2a4f1ed12796947a9b1b82712'
assert H('v96-r7/sw.js')=='d24abf3567e840ac66c4cec2e7f74af49272809f373a3e9971ee77d635d6835e'
(root/'v96/index.html').write_bytes(loader_src.read_bytes());(root/'v96/sw.js').write_bytes(sw_src.read_bytes())
(root/'v96/portable-r7-stable-qa-v1.json').write_bytes(pathlib.Path('/tmp/portable-r7-qa-v2.json').read_bytes())
(root/'v96/r7-starts-qa-v1.json').write_bytes(pathlib.Path('/tmp/r7-starts-qa-v1.json').read_bytes())
m=json.loads((root/'walkthrough-review.json').read_text());c=m['reviewCandidate'];s=m['sourceState'];g=m['geometryPipeline']
assert s['latestSourceArchitectObserved']=='v79' and s['geometryAuthorization'] is False and c['geometryChanged'] is False
assert c['viewerSha256']==viewer and c['modelSha256']==model and c['canonicalModel']=='v23'
m['artifact']='34_Fresnaye_Walkthrough_StableReviewManifest_v21';m['schemaVersion']=21;m['updatedUtc']=datetime.datetime.now(datetime.timezone.utc).isoformat().replace('+00:00','Z')
c.update({'portableLoader':'v96/index.html','portableLoaderRevision':'r7','portableLoaderSha256':H('v96/index.html'),'portableServiceWorker':'v96/sw.js','portableServiceWorkerRevision':'r5','portableServiceWorkerSha256':H('v96/sw.js'),'portableQaEvidence':'v96/portable-r7-stable-qa-v1.json','portableQaSha256':H('v96/portable-r7-stable-qa-v1.json'),'startResetQaEvidence':'v96/r7-starts-qa-v1.json','startResetQaSha256':H('v96/r7-starts-qa-v1.json'),'preferredReviewUrl':'v96/#entrance','automatedPublicCandidateReviewReady':True})
s['browserQaCompatibilitySource']='v79';s['browserQaReuseReason']='Fresh r7 adaptive-network browser QA plus fresh all-six-start/reset/next-room QA executed against unchanged exact v96 viewer and canonical v23 model. No geometry authorization.'
t=(root/'walkthrough-review.html').read_text()
t=t.replace('v18-source79-r6-startlinks-v1','v19-source79-r7-startlinks-v1').replace('Stable gate v18.','Stable gate v19.').replace('review now opens at Entrance and exposes six QA-proven start shortcuts.','adaptive r7 transport is the protected review path; review opens at Entrance with six QA-proven starts.')
t=t.replace("lt.includes('v96-portable-r6')","lt.includes('v96-portable-r7')")
old=re.search(r"const qaOk=.*?;\n const srq=",t,re.S);assert old,'qaOk block not found'
new="const qaOk=qh===c.portableQaSha256&&q.pass===true&&q.loaderRevision==='r7'&&q.serviceWorkerRevision==='r5'&&q.viewerSha256===c.viewerSha256&&q.canonicalObjSha256===c.modelSha256&&q.desktop?.pass===true&&q.desktop?.renderer==='WebGL2'&&q.desktop?.keyboardMovementM>0.1&&q.desktop?.pointerLock===true&&q.desktop?.mouseLookYawRad>0.02&&q.desktop?.collisionValidated===true&&q.desktop?.pageErrors?.length===0&&q.mobile?.pass===true&&q.mobile?.renderer==='WebGL2'&&q.mobile?.joystickMovementM>0.1&&q.mobile?.touchLookYawRad>0.04&&q.mobile?.reset===true&&q.mobile?.collisionValidated===true&&q.mobile?.pageErrors?.length===0&&q.forcedFallback?.pass===true&&q.saveData?.pass===true&&q.saveData?.fallbackPartRequests===0&&q.defaultHedge?.pass===true;\n const srq="
t=t[:old.start()]+new+t[old.end():]
old2=re.search(r"const startResetOk=.*?;\n const r=",t,re.S);assert old2,'startResetOk block not found'
new2="const startResetOk=srh===c.startResetQaSha256&&srj.viewerSha256===c.viewerSha256&&srj.canonicalObjSha256===c.modelSha256&&srj.pass===true&&srj.reset?.pass===true&&srj.nextRoom?.pass===true&&expectedStarts.every(k=>srj.starts?.some(x=>x.key===k&&x.pass===true));\n const r="
t=t[:old2.start()]+new2+t[old2.end():]
t=t.replace("'<span class=\"ok\">HASH-VERIFIED R6/R5</span> · cache first · zero warm payload requests · hedged fallback'","'<span class=\"ok\">HASH-VERIFIED R7/R5</span> · adaptive network · Save-Data aware · verified fallback'")
t=t.replace("'<span class=\"ok\">PASS</span> · fresh public WebGL2 desktop/mobile · collision · offline/fallback'","'<span class=\"ok\">PASS</span> · fresh public WebGL2 desktop/mobile · collision · adaptive fallback'")
t=t.replace("'<span class=\"ok\">PASS</span> · six starts · reset · next-room · Entrance deep link'","'<span class=\"ok\">PASS</span> · six starts · reset · next-room navigation'")
t=t.replace('Public r6 QA ','Public r7 QA ')
(root/'walkthrough-review.html').write_text(t)
m['stableGate']={'path':'walkthrough-review.html','revision':'v19','sha256':H('walkthrough-review.html')}
(root/'walkthrough-review.json').write_text(json.dumps(m,indent=2)+'\n')
print(json.dumps({'loaderSha256':c['portableLoaderSha256'],'serviceWorkerSha256':c['portableServiceWorkerSha256'],'portableQaSha256':c['portableQaSha256'],'startQaSha256':c['startResetQaSha256'],'gateSha256':m['stableGate']['sha256'],'manifestSha256':H('walkthrough-review.json'),'sourceArchitect':'v79','canonicalModel':'v23','viewerSha256':viewer},indent=2))
