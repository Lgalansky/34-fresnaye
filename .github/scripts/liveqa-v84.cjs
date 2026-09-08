const { chromium, devices } = require('playwright');
const fs=require('fs');
const URL=process.env.TEST_URL;
const OUT=process.env.OUT;
const CAN='c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5';
const CONTRACT='SA37-DL58-v23-PROMOTED';
const ok=(v,m)=>{if(!v)throw new Error(m)};
const xy=t=>{const m=(t||'').match(/x\s+(-?\d+(?:\.\d+)?)\s+m\s+·\s+y\s+(-?\d+(?:\.\d+)?)\s+m/);if(!m)throw new Error('coords '+t);return[+m[1],+m[2]]};
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
async function ready(page){
  const sep=URL.includes('?')?'&':'?';
  await page.goto(URL+sep+'liveqa=1&t='+Date.now(),{waitUntil:'domcontentloaded',timeout:120000});
  await page.waitForFunction(()=>window.__FRESNAYE_QA?.status==='READY',null,{timeout:120000});
  const state=await page.evaluate(async()=>{
    const qa=window.__FRESNAYE_QA;
    const st=await qa.runSelfTest();
    const dq=qa.runDeviceQA();
    const meta=n=>document.querySelector(`meta[name="${n}"]`)?.content||null;
    return {qa:{viewer:qa.viewer,status:qa.status,runtimeSha256:qa.runtimeSha256,vertices:qa.vertices,triangles:qa.triangles,renderer:qa.renderer,controls:qa.controls,mapEdges:qa.map?.projectedEdges||0},selfTest:st,deviceQA:dq,meta:{viewer:meta('fresnaye-viewer'),rich:meta('fresnaye-rich-parity'),canonical:meta('fresnaye-canonical-model'),sha:meta('fresnaye-model-sha256'),source:meta('fresnaye-source-contract'),mutated:meta('fresnaye-geometry-mutated')},sourceGate:qa.sourceGate};
  });
  ok(state.meta.viewer==='v84','viewer meta');
  ok(state.meta.rich==='production','rich parity meta');
  ok(state.meta.canonical==='v23'&&state.meta.sha===CAN&&state.meta.source===CONTRACT&&state.meta.mutated==='false','identity/hash/source meta');
  ok(state.qa.runtimeSha256===CAN&&state.qa.vertices===5769&&state.qa.triangles===8907,'runtime hash/topology');
  ok(/^WebGL[12]$/.test(state.qa.renderer),'public WebGL renderer');
  ok(state.selfTest?.pass===true,'rich self-test');
  ok(Object.values(state.selfTest.tests||{}).every(Boolean),'all rich self-test checks');
  ok(state.selfTest.tests.pocketDoorClearanceSourceStaged===true,'pocket source-stage self-test');
  ok(state.selfTest.tests.liveQABridge===true,'host-tier live QA bridge');
  ok(state.deviceQA?.corePass===true&&state.deviceQA?.durablePass===true&&state.deviceQA?.productionPass===true&&state.deviceQA?.status==='PASS_PRODUCTION','public device QA');
  ok(state.deviceQA.checks.sourceDisplayCurrent===true&&state.deviceQA.checks.richParityIdentity===true,'host-tier source/viewer identity');
  ok(state.deviceQA.checks.navigationMap&&state.deviceQA.checks.guidedReview&&state.deviceQA.checks.deviceSessionQA&&state.deviceQA.checks.adaptivePerformance&&state.deviceQA.checks.cpuFallbackAvailable,'rich parity infrastructure');
  const sg=state.sourceGate;
  ok(sg.contractVersion===CONTRACT&&sg.geometryBlockersCount===4&&sg.geometryAuthorization===false,'source gate blockers/auth');
  ok(sg.items.iD05.pocketOpeningMm===100&&sg.items.iD05.sideClearanceEachMm===25&&sg.items.iD05.exactLeafThicknessAuthorized===false,'iD05 clearance contract');
  ok(sg.items.iD08.pocketOpeningMm===90&&sg.items.iD08.sideClearanceEachMm===20&&sg.items.iD08.exactLeafThicknessAuthorized===false,'iD08 clearance contract');
  ok(sg.referenceComponentAssets.role==='REFERENCE_QA_ONLY_NOT_HOUSE_GEOMETRY'&&sg.referenceComponentAssets.integrationIntoCanonical===false,'reference component boundary');
  return state;
}
async function run(){
  const browser=await chromium.launch({headless:true,args:['--enable-webgl','--ignore-gpu-blocklist','--use-angle=swiftshader','--enable-features=VaapiVideoDecoder']});
  const out={artifact:'34_Fresnaye_Walkthrough_v84_PublicBrowserQA',url:URL,canonicalModel:'v23',canonicalObjSha256:CAN,sourceContract:CONTRACT,timestamp:new Date().toISOString(),desktop:{},mobile:{},pass:false};
  try{
    const dc=await browser.newContext({viewport:{width:1365,height:768}}),p=await dc.newPage();
    const ds=await ready(p);
    const a=xy(await p.locator('#coords').textContent());
    await p.keyboard.down('w');await p.waitForTimeout(800);await p.keyboard.up('w');await p.waitForTimeout(220);
    const b=xy(await p.locator('#coords').textContent()),km=dist(a,b);ok(km>.20,'desktop keyboard movement');
    await p.locator('#reset').click();await p.waitForTimeout(160);ok(dist(xy(await p.locator('#coords').textContent()),[7.9,17.1])<.10,'desktop reset');
    await p.locator('[data-start="living"]').click();await p.waitForTimeout(130);ok(dist(xy(await p.locator('#coords').textContent()),[3.6,13])<.10,'living start');
    await p.locator('#next').click();await p.waitForTimeout(130);ok(dist(xy(await p.locator('#coords').textContent()),[8,8.2])<.10,'next room');
    await p.locator('#reset').click();await p.waitForTimeout(120);
    await p.locator('#enter').click();await p.waitForTimeout(350);
    const locked=await p.evaluate(()=>document.pointerLockElement===document.getElementById('c'));ok(locked,'pointer lock');
    const yaw0=await p.evaluate(()=>window.__FRESNAYE_QA.cameraState().yaw);
    await p.mouse.move(610,380);await p.mouse.move(790,390,{steps:3});await p.waitForTimeout(250);
    const yaw1=await p.evaluate(()=>window.__FRESNAYE_QA.cameraState().yaw);ok(Math.abs(yaw1-yaw0)>.01,'mouse look');
    out.desktop={pass:true,renderer:ds.qa.renderer,keyboardMovementM:+km.toFixed(3),reset:true,roomStarts:true,nextRoom:true,pointerLock:true,mouseLookYawDeltaRad:+(yaw1-yaw0).toFixed(4),hashTopology:true,richSelfTest:true,deviceQA:ds.deviceQA.status};
    await dc.close();

    const mc=await browser.newContext({...devices['iPhone 13'],viewport:{width:390,height:844}}),m=await mc.newPage();
    const ms=await ready(m);
    const touch=await m.evaluate(()=>({coarse:matchMedia('(pointer:coarse)').matches,display:getComputedStyle(document.querySelector('.touch')).display,quick:getComputedStyle(document.getElementById('mobileQuick')).display}));ok(touch.coarse&&touch.display!=='none'&&touch.quick!=='none','mobile touch UI');
    const sb=await m.locator('#stick').boundingBox();ok(sb,'stick box');const client=await mc.newCDPSession(m),sx=sb.x+sb.width/2,sy=sb.y+sb.height/2;
    const ma=xy(await m.locator('#coords').textContent());
    await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:sx,y:sy,id:1,radiusX:4,radiusY:4}]});
    await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:sx,y:sy-48,id:1,radiusX:4,radiusY:4}]});
    await m.waitForTimeout(800);await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await m.waitForTimeout(180);
    const mb=xy(await m.locator('#coords').textContent()),jm=dist(ma,mb);ok(jm>.18,'mobile joystick movement');
    await m.evaluate(()=>document.getElementById('mobileReset').click());await m.waitForTimeout(160);ok(dist(xy(await m.locator('#coords').textContent()),[7.9,17.1])<.10,'mobile reset');
    const lb=await m.locator('#look').boundingBox();ok(lb,'look box');const lx=lb.x+lb.width*.58,ly=lb.y+lb.height*.50;
    const my0=await m.evaluate(()=>window.__FRESNAYE_QA.cameraState().yaw);
    await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:lx,y:ly,id:2,radiusX:4,radiusY:4}]});
    await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:lx+70,y:ly-8,id:2,radiusX:4,radiusY:4}]});
    await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await m.waitForTimeout(220);
    const my1=await m.evaluate(()=>window.__FRESNAYE_QA.cameraState().yaw);ok(Math.abs(my1-my0)>.01,'mobile touch look');
    out.mobile={pass:true,renderer:ms.qa.renderer,joystickMovementM:+jm.toFixed(3),reset:true,touchUi:true,touchLookYawDeltaRad:+(my1-my0).toFixed(4),hashTopology:true,richSelfTest:true,deviceQA:ms.deviceQA.status};
    await mc.close();out.pass=true;
  } finally {await browser.close()}
  fs.writeFileSync(OUT,JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out,null,2));
}
run().catch(e=>{console.error(e.stack||e);process.exit(1)});
