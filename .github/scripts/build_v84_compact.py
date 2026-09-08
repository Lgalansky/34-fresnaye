from pathlib import Path
import base64,hashlib,lzma,subprocess,sys,tempfile

src=Path(sys.argv[1]); out=Path(sys.argv[2])
BASE='b69bccf8783337911513ea5a3eff3d6744224a24c516d963c8365a797442a289'
TARGET='6bea05a656bfd4946cca4380e52ba41090e85c320879d4dff9ddd3b07b43d09e'
CAN='c7e943b4e4c9cf0220fefd11d7c42d4951873fc956d0d56977863c57bbb2bda5'
raw=src.read_bytes(); assert hashlib.sha256(raw).hexdigest()==BASE
parts=[Path(f'/tmp/v84_source39_patch.part{i:02d}.b64') for i in range(1,5)]
for p in parts: assert p.exists(),p
patch=lzma.decompress(base64.b64decode(''.join(p.read_text().strip() for p in parts)))
with tempfile.TemporaryDirectory() as d:
    p=Path(d)/'viewer.html'; p.write_bytes(raw)
    txt=patch.decode().replace('--- v81.html','--- viewer.html',1).replace('+++ v84.html','+++ viewer.html',1)
    subprocess.run(['patch','--batch','--forward',str(p)],input=txt.encode(),check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    result=p.read_bytes()
sha=hashlib.sha256(result).hexdigest(); assert sha==TARGET,sha
s=result.decode()
required=['content="v84"','SA39-DL61-v23-PROMOTED','Walkthrough_v84_v23CanonicalRichProductionParity_SA39DL61_NavMatrix',CAN,'handoff v39','discrepancy log v61','revision watch v23','34-fresnaye-navigation-contract-qa']
assert all(x in s for x in required)
assert all(x not in s for x in ['SA36-DL57-v23-PROMOTED','SA37-DL58-v23-PROMOTED','SA38-DL59-v23-PROMOTED'])
out.write_bytes(result)
print(sha,len(result))
