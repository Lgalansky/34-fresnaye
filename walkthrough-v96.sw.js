// supersedes fresnaye-v96-r2 after verified direct-v2 loader promotion
const C='fresnaye-v96-r3';
const DIRECT='./34_Fresnaye_Level02_25pct_v23_Walkthrough_v96_RichProductionParity_Source58_AcceptanceIntegrity.html';
const PARTS=Array.from({length:12},(_,i)=>`./walkthrough-v96.final.part${String(i+1).padStart(2,'0')}.b64`);
const META=['./walkthrough-v96.html','./walkthrough-v96-ready.json','./walkthrough-v96.manifest.webmanifest','./v96-public-browser-qa-v2.json'];
const IMMUTABLE=[DIRECT,...PARTS];
const OWN=[...META,...IMMUTABLE];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(OWN)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('fresnaye-v96-')&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;const rel='./'+u.pathname.split('/').pop();if(!OWN.includes(rel))return;if(IMMUTABLE.includes(rel)){e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r})));return}e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)))});
