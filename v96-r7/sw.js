const CACHE='fresnaye-v96-portable-r5';
const EXPECTED='1540afe2fa89196264dcc1ed078f57b132a8a68399e45c2eb9bd9a85df8a3ded';
const SHELL=['./','./index.html','./manifest.webmanifest'];
const DIRECT='../34_Fresnaye_Level02_25pct_v23_Walkthrough_v96_RichProductionParity_Source58_AcceptanceIntegrity.html';
const PARTS=Array.from({length:12},(_,i)=>`../walkthrough-v96.final.part${String(i+1).padStart(2,'0')}.b64`);
const clean=u=>{const x=new URL(u,self.location.href);x.search='';x.hash='';return x.href};
const SHELL_URLS=new Set(SHELL.map(clean));
const DIRECT_URL=clean(DIRECT);
const PART_URLS=new Set(PARTS.map(clean));
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(SHELL);await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('fresnaye-v96-portable-')&&k!==CACHE).map(k=>caches.delete(k)));if(self.registration.navigationPreload)await self.registration.navigationPreload.enable();await self.clients.claim()})()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=clean(e.request.url);if(!SHELL_URLS.has(u)&&u!==DIRECT_URL&&!PART_URLS.has(u))return;
  e.respondWith((async()=>{const c=await caches.open(CACHE);
    if(SHELL_URLS.has(u)){try{let r=e.request.mode==='navigate'&&e.preloadResponse?await e.preloadResponse:null;if(!r)r=await fetch(e.request,{cache:'no-cache'});if(r.ok)await c.put(u,r.clone());return r}catch(err){const hit=await c.match(u);if(hit)return hit;throw err}}
    if(u===DIRECT_URL){const hit=await c.match(DIRECT_URL);if(hit){if(hit.headers.get('X-Fresnaye-Verified-SHA256')===EXPECTED)return hit;await c.delete(DIRECT_URL)}return fetch(e.request,{cache:'no-store'})}
    return fetch(e.request,{cache:'no-store'});
  })());
});
