const CACHE='fresnaye-v96-portable-r2';
const SHELL=['./','./index.html','./manifest.webmanifest'];
const DIRECT='../34_Fresnaye_Level02_25pct_v23_Walkthrough_v96_RichProductionParity_Source58_AcceptanceIntegrity.html';
const PARTS=Array.from({length:12},(_,i)=>`../walkthrough-v96.final.part${String(i+1).padStart(2,'0')}.b64`);
const CRITICAL=[...SHELL,DIRECT];
const OWNED=[...CRITICAL,...PARTS];
const SHELL_URLS=new Set(SHELL.map(x=>new URL(x,self.location.href).href));
const OWNED_URLS=new Set(OWNED.map(x=>new URL(x,self.location.href).href));

async function cacheOne(cache,url){
  const r=await fetch(url,{cache:'no-cache'});
  if(!r.ok)throw Error(`${url} ${r.status}`);
  await cache.put(url,r);
}
self.addEventListener('install',e=>e.waitUntil((async()=>{
  const c=await caches.open(CACHE);
  await c.addAll(CRITICAL);
  await Promise.allSettled(PARTS.map(p=>cacheOne(c,p)));
  await self.skipWaiting();
})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith('fresnaye-v96-portable-')&&k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!OWNED_URLS.has(e.request.url))return;
  e.respondWith((async()=>{
    const c=await caches.open(CACHE);
    if(SHELL_URLS.has(e.request.url)){
      try{
        const r=await fetch(e.request,{cache:'no-cache'});
        if(r.ok)await c.put(e.request,r.clone());
        return r;
      }catch(err){
        const hit=await c.match(e.request);
        if(hit)return hit;
        throw err;
      }
    }
    const hit=await c.match(e.request);
    if(hit)return hit;
    const r=await fetch(e.request);
    if(r.ok)await c.put(e.request,r.clone());
    return r;
  })());
});
