const CACHE='fresnaye-v96-portable-r1';
const ASSETS=['./','./index.html','./manifest.webmanifest','../34_Fresnaye_Level02_25pct_v23_Walkthrough_v96_RichProductionParity_Source58_AcceptanceIntegrity.html',...Array.from({length:12},(_,i)=>`../walkthrough-v96.final.part${String(i+1).padStart(2,'0')}.b64`)];
const URLS=new Set(ASSETS.map(x=>new URL(x,self.location.href).href));
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('fresnaye-v96-portable-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!URLS.has(e.request.url))return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(!r.ok)return r;const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r})))});
