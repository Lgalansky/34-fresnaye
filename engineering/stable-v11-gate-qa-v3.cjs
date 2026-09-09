const { chromium } = require('playwright');
const fs = require('fs');

const out = {
  artifact: '34_Fresnaye_Walkthrough_v96_StableV11ReliableGateQA_v3',
  timestampUtc: new Date().toISOString(),
  url: 'https://lgalansky.github.io/34-fresnaye/walkthrough-review.html',
  viewerVersion: 'v96',
  sourceArchitect: 'v70',
  geometryChanged: false,
  pass: false
};

async function text(page, selector) {
  try { return await page.locator(selector).textContent(); }
  catch { return null; }
}

async function run() {
  const browser = await chromium.launch({headless:true,args:['--enable-webgl','--ignore-gpu-blocklist','--use-angle=swiftshader']});
  try {
    const page = await browser.newPage({viewport:{width:1280,height:900}});
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(out.url + '?qa=' + Date.now(), {waitUntil:'domcontentloaded', timeout:90000});
    await page.waitForTimeout(3000);
    out.gate = await text(page, '#gate');
    out.href = await page.locator('#open').getAttribute('href').catch(()=>null);
    out.candidate = await text(page, '#candidate');
    out.qa = await text(page, '#qa');
    out.transport = await text(page, '#transport');
    out.portable = await text(page, '#portable');
    out.source = await text(page, '#source');
    out.pipeline = await text(page, '#pipeline');
    out.acceptance = await text(page, '#acceptance');
    out.detail = await text(page, '#detail');
    out.pageErrors = errors;
    out.pass = Boolean(out.gate && out.gate.includes('VERIFIED REVIEW READY') && out.href === './walkthrough-v96.html' && errors.length === 0);
  } catch (e) {
    out.error = String(e.stack || e);
  } finally {
    await browser.close();
    fs.writeFileSync('stable-v11-reliable-gate-qa-v3.json', JSON.stringify(out,null,2)+'\n');
    console.log(JSON.stringify(out,null,2));
  }
}

run();
