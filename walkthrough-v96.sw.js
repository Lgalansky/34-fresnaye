const C='fresnaye-v96-r5';
const DIRECT='./34_Fresnaye_Level02_25pct_v23_Walkthrough_v96_RichProductionParity_Source58_AcceptanceIntegrity.html';
const PARTS=['./walkthrough-v96.final.part01.b64','./walkthrough-v96.final.part02.b64','./walkthrough-v96.final.part03.b64','./walkthrough-v96.final.part04.b64','./walkthrough-v96.final.part05.b64','./walkthrough-v96.final.part06.b64','./walkthrough-v96.final.part07.b64','./walkthrough-v96.final.part08.b64','./walkthrough-v96.final.part09.b64','./walkthrough-v96.final.part10.b64','./walkthrough-v96.final.part11.b64','./walkthrough-v96.final.part12.b64'];
const META=['./walkthrough-v96.html','./walkthrough-v96-ready.json','./walkthrough-v96.manifest.webmanifest','./v96-public-browser-qa-v2.json','./v96-direct-primary-qa-v3.json','./v96-reliable-loader-qa-v5.json'];
const IMMUTABLE=[DIRECT,...PARTS];
const OWN=[...META,...IMMUTABLE];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(OWN)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('fresnaye-v96-')&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;const rel='./'+u.pathname.split('/').pop();if(!OWN.includes(rel))return;if(IMMUTABLE.includes(rel)){e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r})));return}e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)))});
