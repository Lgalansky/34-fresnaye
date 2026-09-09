#!/usr/bin/env python3
from pathlib import Path
import shutil, re, sys

src = Path(sys.argv[1] if len(sys.argv) > 1 else '/tmp/pages/v96')
dst = Path(sys.argv[2] if len(sys.argv) > 2 else '/tmp/pages/v96-r7')
dst.mkdir(parents=True, exist_ok=True)
shutil.copy2(src/'sw.js', dst/'sw.js')
shutil.copy2(src/'manifest.webmanifest', dst/'manifest.webmanifest')
s = (src/'index.html').read_text()
assert 'v96-portable-r6' in s
assert 'direct-v7' in s
assert 'HEDGE_MS=2000' in s
s = s.replace('v96-portable-r6','v96-portable-r7')
s = s.replace('verified-cache-first-no-speculative-payload-direct-v7-cancelable-hedged-parallel-fallback','verified-cache-first-no-speculative-payload-direct-v8-network-aware-cancelable-hedged-parallel-fallback')
s = s.replace('direct-v7','direct-v8').replace('parallel-fallback-v7','parallel-fallback-v8')
old = "const DIRECT_TIMEOUT_MS=6000,PART_TIMEOUT_MS=8000,HEDGE_MS=2000;\nconst forceFallback=new URLSearchParams(location.search).get('qaFallback')==='1';"
new = "const DIRECT_TIMEOUT_MS=6000,PART_TIMEOUT_MS=8000;\nconst params=new URLSearchParams(location.search),forceFallback=params.get('qaFallback')==='1',conn=navigator.connection||navigator.mozConnection||navigator.webkitConnection,effectiveType=String(params.get('qaEffectiveType')||conn?.effectiveType||'unknown').toLowerCase(),saveData=params.get('qaSaveData')==='1'||conn?.saveData===true,hedgeDelayMs=saveData?null:(effectiveType==='slow-2g'||effectiveType==='2g'?4500:effectiveType==='3g'?3000:2000);"
assert old in s
s = s.replace(old,new)
old = "      let hedgeTimer;\n      const d=direct().then(x=>({x,mode:'direct-v8',winner:'direct'})).catch(async e=>{fallbackReason=String(e?.message||e);return{x:await fallback(),mode:'parallel-fallback-v8',winner:'fallback'}});\n      const h=new Promise((resolve,reject)=>{hedgeTimer=setTimeout(()=>{hedged=true;fallback().then(x=>resolve({x,mode:'parallel-fallback-v8-hedged',winner:'fallback'}),reject)},HEDGE_MS)});\n      const win=await Promise.any([d,h]);clearTimeout(hedgeTimer);r=win.x;mode=win.mode;"
new = "      let hedgeTimer=null;\n      const d=direct().then(x=>({x,mode:'direct-v8',winner:'direct'})).catch(async e=>{fallbackReason=String(e?.message||e);return{x:await fallback(),mode:'parallel-fallback-v8',winner:'fallback'}});\n      const h=hedgeDelayMs==null?new Promise(()=>{}):new Promise((resolve,reject)=>{hedgeTimer=setTimeout(()=>{hedged=true;fallback().then(x=>resolve({x,mode:'parallel-fallback-v8-hedged',winner:'fallback'}),reject)},hedgeDelayMs)});\n      const win=await Promise.any([d,h]);if(hedgeTimer!=null)clearTimeout(hedgeTimer);r=win.x;mode=win.mode;"
assert old in s
s = s.replace(old,new)
old = 'hedgeMs:HEDGE_MS,hedged,cancelledLoser,fallbackReason,cacheName:CACHE'
new = "hedgeMs:hedgeDelayMs,saveData,effectiveType,bandwidthPolicy:saveData?'direct-first-save-data-no-hedge':('hedged-'+effectiveType),hedged,cancelledLoser,fallbackReason,cacheName:CACHE"
assert old in s
s = s.replace(old,new)
assert 'v96-portable-r7' in s and 'direct-first-save-data-no-hedge' in s and 'hedgeDelayMs' in s
(dst/'index.html').write_text(s)
script = re.search(r'<script>\n([\s\S]*?)\n</script>',s)
assert script
Path('/tmp/r7-loader.js').write_text(script.group(1))
print('built', dst/'index.html')
