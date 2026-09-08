const { chromium, devices } = require('playwright');
const fs=require('fs');
const URL=process.env.TEST_URL, OUT=process.env.OUT;
const CAN='c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5';
const CONTRACT='SA39-DL61-v23-PROMOTED';
const ok=(v,m)=>{if(!v)throw new Error(m)};
const xy=t=>{const m=(t||'').match(/x\s+(-?\d+(?:\.\d+)?)\s+m\s+·\s+y\s+(-?\d+(?:\.\d+)?)\s+m/);if(!m)throw new Error('coords '+t);return[+m[1],+m[2]]};
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
async function ready(page){
  const sep=URL.includes('?')?'&':'?';
  await page.goto(URL+sep+'liveqa=1&t='+Date.now(),{waitUntil:'domcontentloaded',timeout:120000});
  await page.waitForFunction(()=>window.__FRESNAYE_QA?.status==='READY',null,{timeout:120000});
  const s=await page.evaluate(async()=>{
    const qa=window.__FRESNAYE_QA, st=await qa.runSelfTest(), dq=qa.runDeviceQA(), nav=qa.runNavigationMatrixQA();
    const meta=n=>document.querySelector(`meta[name="${n}"]`)?.content||null;
    return {qa:{viewer:qa.viewer,status:qa.status,runtimeSha256:qa.runtimeSha256,vertices:qa.vertices,triangles:qa.triangles,renderer:qa.renderer},selfTest:st,deviceQA:dq,navigation:nav,meta:{viewer:meta('fresnaye-viewer'),rich:meta('fresnaye-rich-parity'),canonical:meta('fresnaye-canonical-model'),sha:meta('fresnaye-model-sha256'),source:meta('fresnaye-source-contract'),mutated:meta('fresnaye-geometry-mutated')},sourceGate:qa.sourceGate};
  });
  ok(s.meta.viewer==='v84'&&s.meta.rich==='production','v84 rich identity');
  ok(s.meta.canonical==='v23'&&s.meta.sha===CAN&&s.meta.source===CONTRACT&&s.meta.mutated==='false','canonical/source metadata');
  ok(s.qa.runtimeSha256===CAN&&s.qa.vertices===5769&&s.qa.triangles===8907,'runtime hash/topology');
  ok(/^WebGL[12]$/.test(s.qa.renderer),'public WebGL renderer');
  ok(s.selfTest?.pass===true&&Object.values(s.selfTest.tests||{}).every(Boolean),'52-check rich self-test');
  ok(s.selfTest.tests.navigationMatrix===true&&s.selfTest.tests.liveQABridge===true,'navigation/live QA bridges');
  ok(s.navigation?.pass===true&&s.navigation.mainSequence.join('>')==='entrance>living>kitchen>bedroom','main navigation contract');
  ok(s.navigation.separateInspectionStarts.join('>')==='second>service'&&s.navigation.plannerAvailable&&s.navigation.floorPlannerAvailable,'separate starts/planners');
  ok(s.deviceQA?.corePass===true&&s.deviceQA?.durablePass===true&&s.deviceQA?.productionPass===true&&s.deviceQA?.status==='PASS_PRODUCTION','public device QA');
  ok(s.deviceQA.checks.sourceDisplayCurrent===true&&s.deviceQA.checks.richParityIdentity===true&&s.deviceQA.checks.navigationMatrix===true,'current source/host/navigation device gates');
  const g=s.sourceGate;
  ok(g.contractVersion===CONTRACT&&g.geometryBlockersCount===5&&g.geometryBlockers.length===5&&g.geometryAuthorization===false,'five-blocker source gate');
  ok(g.candidateModel.version==='v23'&&g.partialGeometryCandidate.version==='v25'&&g.partialGeometryCandidate.loadedByThisViewer===false,'canonical/noncanonical boundary');
  ok(g.sourceIdentityDigest==='7a70964550fad361b5a208b0500d5a8a57d2326434575585bea88474ed4f71c8','source identity digest');
  return s;
}
async function run(){
  const browser=await chromium.launch({headless:true,args:['--enable-webgl','--ignore-gpu-blocklist','--use-angle=swiftshader']});
  const out={artifact:'34_Fresnaye_Walkthrough_v84_PublicBrowserQA_Source39',url:URL,canonicalModel:'v23',canonicalObjSha256:CAN,sourceContract:CONTRACT,timestamp:new Date().toISOString(),desktop:{},mobile:{},pass:false};
  try{
    const dc=await browser.newContext({viewport:{width:1365,height:768}}),p=await dc.newPage(),ds=await ready(p);
    const a=xy(await p.locator('#coords').textContent());await p.keyboard.down('w');await p.waitForTimeout(800);await p.keyboard.up('w');await p.waitForTimeout(220);const b=xy(await p.locator('#coords').textContent()),km=dist(a,b);ok(km>.20,'desktop movement');
    await p.locator('#reset').click();await p.waitForTimeout(160);ok(dist(xy(await p.locator('#coords').textContent()),[7.9,17.1])<.10,'desktop reset');
    await p.locator('[data-start="living"]').click();await p.waitForTimeout(130);ok(dist(xy(await p.locator('#coords').textContent()),[3.6,13])<.10,'living start');
    await p.locator('#next').click();await p.waitForTimeout(130);ok(dist(xy(await p.locator('#coords').textContent()),[8,8.2])<.10,'next room');
    await p.locator('#reset').click();await p.locator('#enter').click();await p.waitForTimeout(350);ok(await p.evaluate(()=>document.pointerLockElement===document.getElementById('c')),'pointer lock');
    const y0=await p.evaluate(()=>window.__FRESNAYE_QA.cameraState().yaw);await p.mouse.move(610,380);await p.mouse.move(790,390,{steps:3});await p.waitForTimeout(250);const y1=await p.evaluate(()=>window.__FRESNAYE_QA.cameraState().yaw);ok(Math.abs(y1-y0)>.01,'mouse look');
    out.desktop={pass:true,renderer:ds.qa.renderer,keyboardMovementM:+km.toFixed(3),reset:true,roomStarts:true,nextRoom:true,pointerLock:true,mouseLookYawDeltaRad:+(y1-y0).toFixed(4),richSelfTest:true,navigationContract:true,deviceQA:ds.deviceQA.status};await dc.close();
    const mc=await browser.newContext({...devices['iPhone 13'],viewport:{width:390,height:844}}),m=await mc.newPage(),ms=await ready(m);
    const touch=await m.evaluate(()=>({coarse:matchMedia('(pointer:coarse)').matches,display:getComputedStyle(document.querySelector('.touch')).display,quick:getComputedStyle(document.getElementById('mobileQuick')).display}));ok(touch.coarse&&touch.display!=='none'&&touch.quick!=='none','touch UI');
    const sb=await m.locator('#stick').boundingBox();ok(sb,'stick');const client=await mc.newCDPSession(m),sx=sb.x+sb.width/2,sy=sb.y+sb.height/2,ma=xy(await m.locator('#coords').textContent());
    await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:sx,y:sy,id:1,radiusX:4,radiusY:4}]});await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:sx,y:sy-48,id:1,radiusX:4,radiusY:4}]});await m.waitForTimeout(800);await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await m.waitForTimeout(180);const mb=xy(await m.locator('#coords').textContent()),jm=dist(ma,mb);ok(jm>.18,'joystick');
    await m.evaluate(()=>document.getElementById('mobileReset').click());await m.waitForTimeout(160);ok(dist(xy(await m.locator('#coords').textContent()),[7.9,17.1])<.10,'mobile reset');
    const lb=await m.locator('#look').boundingBox();ok(lb,'look');const lx=lb.x+lb.width*.58,ly=lb.y+lb.height*.50,my0=await m.evaluate(()=>window.__FRESNAYE_QA.cameraState().yaw);await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:lx,y:ly,id:2,radiusX:4,radiusY:4}]});await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:lx+70,y:ly-8,id:2,radiusX:4,radiusY:4}]});await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await m.waitForTimeout(220);const my1=await m.evaluate(()=>window.__FRESNAYE_QA.cameraState().yaw);ok(Math.abs(my1-my0)>.01,'touch look');
    out.mobile={pass:true,renderer:ms.qa.renderer,joystickMovementM:+jm.toFixed(3),reset:true,touchUi:true,touchLookYawDeltaRad:+(my1-my0).toFixed(4),richSelfTest:true,navigationContract:true,deviceQA:ms.deviceQA.status};await mc.close();out.pass=true;
  } finally {await browser.close()}
  fs.writeFileSync(OUT,JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out,null,2));
}
run().catch(e=>{console.error(e.stack||e);process.exit(1)});
