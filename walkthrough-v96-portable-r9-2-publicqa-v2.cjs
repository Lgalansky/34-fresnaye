const fs=require('fs');
let s=fs.readFileSync('walkthrough-v96-portable-r9-2-publicqa-v1.cjs','utf8');
s=s.replace("PortableSelfContainedR9_2_PublicBrowserQA_v1","PortableSelfContainedR9_2_PublicBrowserQA_v2")
 .replace("const nc=await browser.newContext({viewport:{width:1280,height:720}})","const nc=await browser.newContext({viewport:{width:1280,height:720},serviceWorkers:'block'})")
 .replace("portable-r9-2-scopeisolation-qa-v1.json","portable-r9-2-scopeisolation-qa-v2.json");
eval(s);
