const {chromium,devices}=require('playwright'),fs=require('fs');
const B='https://lgalansky.github.io/34-fresnaye/v96-r9/';
const V='1540afe2fa89196264dcc1ed078f57b132a8a68399e45c2eb9bd9a85df8a3ded';
const M='c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5';
const CACHE='fresnaye-v96-portable-r9';
const out={artifact:'34_Fresnaye_Walkthrough_v96_PortableSelfContainedR9_PublicBrowserQA_v1',timestampUtc:new Date().toISOString(),geometryChanged:false,viewerVersion:'v96',viewerSha256:V,canonicalModel:'v23',canonicalObjSha256:M,loaderRevision:'r9',packageMode:'self-contained-static-host-r9',starts:[],desktop:{},mobile:{},forcedFallback:{},offlineColdStart:{},offlineWarm:{},selfContainedPaths:{},pass:false};
const ok=(v,m)=>{if(!v)throw Error(m)};
const xy=t=>{const m=(t||'').match(/x\s+(-?\d+(?:\.\d+)?)\s+m\s+·\s+y\s+(-?\d+(?:\.\d+)?)\s+m/);if(!m)throw Error('coords '+t);return[+m[1],+m[2]]};
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const inside=u=>{const x=new URL(u),b=new URL(B);return x.origin===b.origin&&x.pathname.startsWith(b.pathname)};
const isPayload=u=>u.endsWith('/viewer.html')||u.includes('/parts/part');
async function ready(p,u){await p.goto(u,{waitUntil:'domcontentloaded',timeout:90000});await p.waitForFunction(()=>window.__FRESNAYE_TRANSPORT_META?.pass===true&&window.__FRESNAYE_QA?.status==='READY',{}, {timeout:90000})}
async function stickMove(p,dy,id){const sb=await p.locator('#stick').boundingBox();ok(sb&&sb.width>20&&sb.height>20,'stick bounds');const sx=sb.x+sb.width/2,sy=sb.y+sb.height/2,a=xy(await p.locator('#coords').textContent());await p.dispatchEvent('#stick','pointerdown',{pointerId:id,pointerType:'touch',clientX:sx,clientY:sy,isPrimary:true,bubbles:true});await p.dispatchEvent('#stick','pointermove',{pointerId:id,pointerType:'touch',clientX:sx,clientY:sy+dy,isPrimary:true,bubbles:true});await p.waitForTimeout(850);await p.dispatchEvent('#stick','pointerup',{pointerId:id,pointerType:'touch',clientX:sx,clientY:sy+dy,isPrimary:true,bubbles:true});await p.waitForTimeout(100);return dist(a,xy(await p.locator('#coords').textContent()))}
(async()=>{const browser=await chromium.launch({headless:true,args:['--enable-webgl','--ignore-gpu-blocklist','--use-angle=swiftshader']});try{
  const dc=await browser.newContext({viewport:{width:1365,height:768}}),p=await dc.newPage(),de=[],du=[];p.on('pageerror',e=>de.push(String(e)));p.on('request',r=>{if(isPayload(r.url()))du.push(r.url())});
  await ready(p,B+'?qaSaveData=1&desktop='+Date.now()+'#entrance');
  let t=await p.evaluate(()=>window.__FRESNAYE_TRANSPORT_META),lm=await p.evaluate(()=>window.__FRESNAYE_LIVE_META),rr=await p.evaluate(()=>window.__FRESNAYE_QA.runReviewReadinessQA());
  ok(t.viewerSha256===V&&t.modelSha256===M&&t.packageMode==='self-contained-static-host-r9'&&lm.renderer==='WebGL2'&&rr.pass&&rr.mainRoute.collisionValidated,'desktop identity/readiness');
  ok(du.some(u=>u.endsWith('/v96-r9/viewer.html'))&&du.every(inside),'direct payload escaped package '+JSON.stringify(du));
  const starts={entrance:[7.9,17.1],living:[3.6,13.0],kitchen:[8.0,8.2],bedroom:[3.5,26.7],second:[-15.4,5.2],service:[-5.08,2.11]};
  for(const [key,exp] of Object.entries(starts)){await p.evaluate(k=>document.querySelector(`[data-start="${k}"]`)?.click(),key);await p.waitForTimeout(80);const got=xy(await p.locator('#coords').textContent()),pass=dist(got,exp)<.14;out.starts.push({key,expected:exp,actual:got,pass});ok(pass,'start '+key+' '+got)}
  await p.evaluate(()=>document.querySelector('[data-start="entrance"]').click());await p.waitForTimeout(100);
  const a=xy(await p.locator('#coords').textContent());await p.keyboard.down('w');await p.waitForTimeout(650);await p.keyboard.up('w');await p.waitForTimeout(100);const b=xy(await p.locator('#coords').textContent());ok(dist(a,b)>.15,'desktop keyboard');
  await p.locator('#enter').click();await p.waitForTimeout(150);ok(await p.evaluate(()=>document.pointerLockElement===document.getElementById('c')),'pointer lock');
  const y0=(await p.evaluate(()=>window.__FRESNAYE_QA.cameraState())).yaw;await p.evaluate(()=>document.dispatchEvent(new MouseEvent('mousemove',{movementX:100,bubbles:true})));await p.waitForTimeout(80);const y1=(await p.evaluate(()=>window.__FRESNAYE_QA.cameraState())).yaw;
  ok(Math.abs(y1-y0)>.02&&!de.length,'desktop mouse/errors');out.desktop={pass:true,renderer:lm.renderer,loaderMode:t.loaderMode,keyboardMovementM:+dist(a,b).toFixed(3),pointerLock:true,mouseLookYawRad:+Math.abs(y1-y0).toFixed(3),collisionValidated:rr.mainRoute.collisionValidated,pageErrors:de};await dc.close();

  const mc=await browser.newContext({...devices['iPhone 13'],viewport:{width:390,height:844}}),m=await mc.newPage(),me=[],mu=[];m.on('pageerror',e=>me.push(String(e)));m.on('request',r=>{if(isPayload(r.url()))mu.push(r.url())});
  await ready(m,B+'?qaSaveData=1&mobile='+Date.now()+'#living');let mt=await m.evaluate(()=>window.__FRESNAYE_TRANSPORT_META),ml=await m.evaluate(()=>window.__FRESNAYE_LIVE_META);
  ok(mt.viewerSha256===V&&mt.modelSha256===M&&mt.packageMode==='self-contained-static-host-r9'&&ml.renderer==='WebGL2'&&mu.every(inside),'mobile identity/paths');
  await m.evaluate(()=>document.querySelector('[data-start="living"]').click());await m.waitForTimeout(100);let jm=await stickMove(m,-48,31);if(jm<=.15){await m.evaluate(()=>document.querySelector('[data-start="living"]').click());await m.waitForTimeout(100);jm=await stickMove(m,48,32)}ok(jm>.15,'joystick movement '+jm);
  const lb=await m.locator('#look').boundingBox();ok(lb&&lb.width>50&&lb.height>50,'look bounds');const lx=lb.x+lb.width*.6,ly=lb.y+lb.height*.5,my0=(await m.evaluate(()=>window.__FRESNAYE_QA.cameraState())).yaw;
  await m.dispatchEvent('#look','pointerdown',{pointerId:33,pointerType:'touch',clientX:lx,clientY:ly,isPrimary:true,bubbles:true});await m.dispatchEvent('#look','pointermove',{pointerId:33,pointerType:'touch',clientX:lx+60,clientY:ly,isPrimary:true,bubbles:true});await m.dispatchEvent('#look','pointerup',{pointerId:33,pointerType:'touch',clientX:lx+60,clientY:ly,isPrimary:true,bubbles:true});
  const my1=(await m.evaluate(()=>window.__FRESNAYE_QA.cameraState())).yaw;ok(Math.abs(my1-my0)>.04,'touch look');await m.locator('#mobileReset').click();await m.waitForTimeout(100);ok(dist(xy(await m.locator('#coords').textContent()),[3.6,13.0])<.12,'mobile reset living');
  let mr=await m.evaluate(()=>window.__FRESNAYE_QA.runReviewReadinessQA());ok(mr.mainRoute.collisionValidated&&!me.length,'mobile collision/errors');out.mobile={pass:true,renderer:ml.renderer,loaderMode:mt.loaderMode,joystickMovementM:+jm.toFixed(3),touchLookYawRad:+Math.abs(my1-my0).toFixed(3),reset:true,resetStart:'living',collisionValidated:mr.mainRoute.collisionValidated,pageErrors:me};await mc.close();

  const fc=await browser.newContext({viewport:{width:1280,height:720}}),f=await fc.newPage(),fe=[],fu=[];f.on('pageerror',e=>fe.push(String(e)));f.on('request',r=>{if(isPayload(r.url()))fu.push(r.url())});
  await ready(f,B+'?qaFallback=1&fallback='+Date.now()+'#entrance');const ft=await f.evaluate(()=>window.__FRESNAYE_TRANSPORT_META),fr=await f.evaluate(()=>window.__FRESNAYE_QA.runReviewReadinessQA());
  const partUrls=[...new Set(fu.filter(u=>u.includes('/parts/part')))];ok(ft.loaderMode==='parallel-fallback-v9-forced'&&ft.viewerSha256===V&&fr.pass&&fr.mainRoute.collisionValidated&&!fe.length,'forced fallback identity/readiness');ok(partUrls.length===12&&partUrls.every(inside)&&!fu.some(u=>u.includes('/walkthrough-v96.final.part')),'fallback escaped self-contained package '+JSON.stringify(fu));
  out.forcedFallback={pass:true,mode:ft.loaderMode,partRequests:partUrls.length,allPayloadRequestsLocal:fu.every(inside),collisionValidated:fr.mainRoute.collisionValidated,pageErrors:fe};await fc.close();

  const oc=await browser.newContext({viewport:{width:1280,height:720}}),o=await oc.newPage(),oe=[];o.on('pageerror',e=>oe.push(String(e)));
  await ready(o,B+'?qaSaveData=1&offlineSeed='+Date.now()+'#entrance');await o.evaluate(()=>navigator.serviceWorker.ready);
  const deleted=await o.evaluate(async CACHE=>{const c=await caches.open(CACHE),u=new URL('./viewer.html',location.href).href;return c.delete(u)},CACHE);ok(deleted===true,'verified payload cache seed delete');
  let viewerRequests=0;o.on('request',r=>{if(isPayload(r.url()))viewerRequests++});
  await oc.setOffline(true);await o.reload({waitUntil:'domcontentloaded',timeout:15000});await o.waitForFunction(()=>window.__FRESNAYE_TRANSPORT_META?.loaderMode==='offline-cold-start-guard-r9',{},{timeout:8000});
  const og=await o.evaluate(()=>window.__FRESNAYE_TRANSPORT_META),txt=await o.locator('#s').textContent();ok(og.pass===false&&og.recoverable===true&&og.offlineColdStartGuard===true&&og.navigatorOnline===false&&viewerRequests===0&&/not cached/i.test(txt)&&await o.locator('#retry').isVisible()&&!oe.length,'offline cold-start guard');
  out.offlineColdStart={pass:true,mode:og.loaderMode,recoverable:og.recoverable,viewerPayloadRequests:viewerRequests,navigatorOnline:og.navigatorOnline,pageErrors:oe};
  await oc.setOffline(false);await o.waitForTimeout(350);if(await o.locator('#retry').isVisible().catch(()=>false))await o.locator('#retry').click({noWaitAfter:true});
  await o.waitForFunction(()=>window.__FRESNAYE_TRANSPORT_META?.pass===true&&window.__FRESNAYE_QA?.status==='READY',{}, {timeout:90000});const recovered=await o.evaluate(()=>window.__FRESNAYE_TRANSPORT_META);ok(recovered.viewerSha256===V&&recovered.modelSha256===M,'online recovery identity');
  await oc.setOffline(true);await o.reload({waitUntil:'domcontentloaded',timeout:15000});await o.waitForFunction(()=>window.__FRESNAYE_TRANSPORT_META?.pass===true&&window.__FRESNAYE_QA?.status==='READY',{}, {timeout:15000});
  const warm=await o.evaluate(()=>window.__FRESNAYE_TRANSPORT_META),wr=await o.evaluate(()=>window.__FRESNAYE_QA.runReviewReadinessQA());ok(warm.loaderMode==='verified-cache-direct-v2'&&warm.viewerSha256===V&&wr.pass&&wr.mainRoute.collisionValidated,'offline warm cache');out.offlineWarm={pass:true,mode:warm.loaderMode,viewerSha256:warm.viewerSha256,collisionValidated:wr.mainRoute.collisionValidated};await oc.close();

  out.selfContainedPaths={pass:true,directLocal:true,fallbackLocal:true,parentDependencies:false};
  out.pass=out.starts.every(x=>x.pass)&&out.desktop.pass&&out.mobile.pass&&out.forcedFallback.pass&&out.offlineColdStart.pass&&out.offlineWarm.pass&&out.selfContainedPaths.pass;
}catch(e){out.error=String(e?.stack||e)}finally{await browser.close();fs.writeFileSync('/tmp/portable-r9-selfcontained-qa-v1.json',JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out,null,2))}if(!out.pass)process.exit(1)})();
