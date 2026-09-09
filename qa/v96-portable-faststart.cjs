const { chromium, devices } = require('playwright');
const fs = require('fs');
const BASE = process.env.BASE;
const VHASH = process.env.VHASH;
const CAN = process.env.OBJHASH;
const DIRECT = '../34_Fresnaye_Level02_25pct_v23_Walkthrough_v96_RichProductionParity_Source58_AcceptanceIntegrity.html';
function assert(v, m) { if (!v) throw new Error(m); }
function xy(t) {
  const m = (t || '').match(/x\s+(-?\d+(?:\.\d+)?)\s+m\s+·\s+y\s+(-?\d+(?:\.\d+)?)\s+m/);
  if (!m) throw new Error('coords ' + t);
  return [+m[1], +m[2]];
}
const distance = (a,b) => Math.hypot(a[0]-b[0], a[1]-b[1]);
async function ready(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForFunction(() => window.__FRESNAYE_QA && window.__FRESNAYE_QA.status === 'READY', null, { timeout: 90000 });
}
async function main() {
  const out = {
    artifact: '34_Fresnaye_Walkthrough_v96_PortableFastStart_PublicBrowserQA_v3',
    timestampUtc: new Date().toISOString(), url: BASE, viewerSha256: VHASH,
    canonicalObjSha256: CAN, geometryChanged: false,
    desktop: {}, mobile: {}, cache: {}, offline: {}, forcedFallback: {}, pass: false
  };
  const browser = await chromium.launch({ headless: true, args: ['--enable-webgl','--ignore-gpu-blocklist','--use-angle=swiftshader'] });
  try {
    const dc = await browser.newContext({ viewport: { width: 1365, height: 768 } });
    const p = await dc.newPage();
    const errors = [];
    p.on('pageerror', e => errors.push(String(e)));
    await ready(p, BASE + '?qa=' + Date.now());
    const tm = await p.evaluate(() => window.__FRESNAYE_TRANSPORT_META);
    assert(tm && tm.pass && tm.viewerSha256 === VHASH && tm.modelSha256 === CAN && tm.geometryAuthorization === false, 'desktop transport identity');
    await p.evaluate(() => window.__FRESNAYE_QA.runSelfTest());
    const st = await p.evaluate(() => window.__FRESNAYE_QA.selfTest);
    const rr = await p.evaluate(() => window.__FRESNAYE_QA.runReviewReadinessQA());
    assert(st.pass && Object.keys(st.tests).length === 60 && Object.values(st.tests).every(Boolean), 'desktop 60/60');
    assert(rr.pass && rr.mainRoute && rr.mainRoute.collisionValidated === true && /^WebGL[12]$/.test(rr.renderer), 'desktop review/collision/WebGL');
    const a = xy(await p.locator('#coords').textContent());
    await p.keyboard.down('w'); await p.waitForTimeout(720); await p.keyboard.up('w'); await p.waitForTimeout(120);
    const z = xy(await p.locator('#coords').textContent());
    assert(distance(a,z) > .2, 'desktop keyboard');
    await p.locator('#enter').click(); await p.waitForTimeout(180);
    assert(await p.evaluate(() => document.pointerLockElement === document.getElementById('c')), 'pointer lock');
    const y0 = (await p.evaluate(() => window.__FRESNAYE_QA.cameraState())).yaw;
    await p.evaluate(() => document.dispatchEvent(new MouseEvent('mousemove',{movementX:120,movementY:0,bubbles:true})));
    await p.waitForTimeout(100);
    const y1 = (await p.evaluate(() => window.__FRESNAYE_QA.cameraState())).yaw;
    assert(Math.abs(y1-y0) > .02, 'mouse look');
    await p.evaluate(() => document.exitPointerLock());
    await p.waitForFunction(async (direct) => !!(await caches.match(direct)), DIRECT, { timeout: 20000 });
    assert(errors.length === 0, 'desktop page errors');
    out.desktop = { pass:true, renderer:rr.renderer, initialTransportMode:tm.loaderMode, keyboardMovementM:+distance(a,z).toFixed(3), pointerLock:true, mouseLookYawRad:+Math.abs(y1-y0).toFixed(3), selfTests:60, collisionValidated:true, pageErrors:errors };

    const warm = await dc.newPage();
    await ready(warm, BASE + '?warm=' + Date.now());
    const wtm = await warm.evaluate(() => window.__FRESNAYE_TRANSPORT_META);
    assert(wtm.pass && wtm.loaderMode === 'cache-direct-v1' && wtm.viewerSha256 === VHASH, 'warm cache direct');
    const reg = await warm.evaluate(async () => { const r = await navigator.serviceWorker.ready; return { scope:r.scope, script:(r.active && r.active.scriptURL) || '' }; });
    assert(reg.scope.endsWith('/34-fresnaye/v96/') && reg.script.endsWith('/34-fresnaye/v96/sw.js'), 'scoped service worker');
    out.cache = { pass:true, mode:wtm.loaderMode, transportLoadMs:wtm.transportLoadMs, cacheName:wtm.cacheName, serviceWorkerScope:reg.scope };

    await dc.setOffline(true);
    const off = await dc.newPage();
    await ready(off, BASE);
    const otm = await off.evaluate(() => window.__FRESNAYE_TRANSPORT_META);
    const orr = await off.evaluate(() => window.__FRESNAYE_QA.runReviewReadinessQA());
    assert(otm.pass && otm.loaderMode === 'cache-direct-v1' && orr.pass && orr.mainRoute && orr.mainRoute.collisionValidated === true, 'offline cache walkthrough');
    out.offline = { pass:true, mode:otm.loaderMode, renderer:orr.renderer, collisionValidated:true };
    await dc.setOffline(false);
    await dc.close();

    const fc = await browser.newContext({ viewport: { width: 1280, height: 760 } });
    const f = await fc.newPage();
    await ready(f, BASE + '?qaFallback=1&qa=' + Date.now());
    const ftm = await f.evaluate(() => window.__FRESNAYE_TRANSPORT_META);
    const frr = await f.evaluate(() => window.__FRESNAYE_QA.runReviewReadinessQA());
    assert(ftm.pass && ftm.loaderMode === 'parallel-fallback-v4-forced' && ftm.viewerSha256 === VHASH && frr.pass && frr.mainRoute && frr.mainRoute.collisionValidated === true, 'forced fallback');
    out.forcedFallback = { pass:true, mode:ftm.loaderMode, transportLoadMs:ftm.transportLoadMs, collisionValidated:true };
    await fc.close();

    const mc = await browser.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 } });
    const m = await mc.newPage();
    const merr = [];
    m.on('pageerror', e => merr.push(String(e)));
    await ready(m, BASE + '?mobile=' + Date.now());
    const mtm = await m.evaluate(() => window.__FRESNAYE_TRANSPORT_META);
    assert(mtm.pass && mtm.viewerSha256 === VHASH && mtm.modelSha256 === CAN, 'mobile identity');
    await m.evaluate(() => document.querySelector('[data-start=entrance]').click()); await m.waitForTimeout(100);
    const ma = xy(await m.locator('#coords').textContent());
    const sb = await m.locator('#stick').boundingBox(); assert(sb, 'mobile stick');
    const sx = sb.x + sb.width/2, sy = sb.y + sb.height/2;
    await m.dispatchEvent('#stick','pointerdown',{pointerId:11,pointerType:'touch',clientX:sx,clientY:sy-35,isPrimary:true,bubbles:true});
    await m.dispatchEvent('#stick','pointermove',{pointerId:11,pointerType:'touch',clientX:sx,clientY:sy-45,isPrimary:true,bubbles:true});
    await m.waitForTimeout(720);
    await m.dispatchEvent('#stick','pointerup',{pointerId:11,pointerType:'touch',clientX:sx,clientY:sy-45,isPrimary:true,bubbles:true}); await m.waitForTimeout(120);
    const mb = xy(await m.locator('#coords').textContent()); assert(distance(ma,mb) > .18, 'mobile joystick');
    const lb = await m.locator('#look').boundingBox(); assert(lb, 'mobile look');
    const lx=lb.x+lb.width*.6, ly=lb.y+lb.height*.5, cy0=(await m.evaluate(()=>window.__FRESNAYE_QA.cameraState())).yaw;
    await m.dispatchEvent('#look','pointerdown',{pointerId:12,pointerType:'touch',clientX:lx,clientY:ly,isPrimary:true,bubbles:true});
    await m.dispatchEvent('#look','pointermove',{pointerId:12,pointerType:'touch',clientX:lx+70,clientY:ly-8,isPrimary:true,bubbles:true});
    await m.dispatchEvent('#look','pointerup',{pointerId:12,pointerType:'touch',clientX:lx+70,clientY:ly-8,isPrimary:true,bubbles:true}); await m.waitForTimeout(100);
    const cy1=(await m.evaluate(()=>window.__FRESNAYE_QA.cameraState())).yaw; assert(Math.abs(cy1-cy0)>.05,'mobile look');
    await m.locator('#mobileReset').click(); await m.waitForTimeout(100); assert(distance(xy(await m.locator('#coords').textContent()),[7.9,17.1])<.1,'mobile reset');
    const mrr=await m.evaluate(()=>window.__FRESNAYE_QA.runReviewReadinessQA()); assert(mrr.pass&&mrr.mainRoute&&mrr.mainRoute.collisionValidated===true&&/^WebGL[12]$/.test(mrr.renderer),'mobile WebGL route'); assert(merr.length===0,'mobile page errors');
    out.mobile={pass:true,renderer:mrr.renderer,joystickMovementM:+distance(ma,mb).toFixed(3),touchLookYawRad:+Math.abs(cy1-cy0).toFixed(3),reset:true,collisionValidated:true,pageErrors:merr};
    await mc.close();
    out.pass=true;
    fs.writeFileSync('portable-qa-v3.json', JSON.stringify(out,null,2)+'\n');
    console.log(JSON.stringify(out,null,2));
  } finally { await browser.close(); }
}
main().catch(e => { console.error(e.stack || e); process.exit(1); });
