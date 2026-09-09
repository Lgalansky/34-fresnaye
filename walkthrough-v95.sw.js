const C='fresnaye-v95-r2';
const A=["./walkthrough-v95.html","./walkthrough-v95-ready.json","./walkthrough-v95.manifest.webmanifest","./v95-public-browser-qa.json","./walkthrough-v95.final.part01.b64","./walkthrough-v95.final.part02.b64","./walkthrough-v95.final.part03.b64","./walkthrough-v95.final.part04.b64","./walkthrough-v95.final.part05.b64","./walkthrough-v95.final.part06.b64","./walkthrough-v95.final.part07.b64","./walkthrough-v95.final.part08.b64","./walkthrough-v95.final.part09.b64","./walkthrough-v95.final.part10.b64","./walkthrough-v95.final.part11.b64","./walkthrough-v95.final.part12.b64"];
const OWN=new Set(A.map(x=>new URL(x,self.registration.scope).href));
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('fresnaye-v95')&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(OWN.has(e.request.url)){
    e.respondWith(caches.open(C).then(async c=>{
      const hit=await c.match(e.request);
      if(hit)return hit;
      const resp=await fetch(e.request);
      if(resp.ok)await c.put(e.request,resp.clone());
      return resp;
    }));
  }
});
