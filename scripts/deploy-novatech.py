#!/usr/bin/env python3
"""Publish only novatechsoft.com after saved QA passes; restore its old release on failure."""
import os, pathlib, shutil, subprocess, hashlib, json, time, urllib.request, urllib.parse, pwd, tarfile
from novatech_http import get
work=pathlib.Path('/root/novatech-audit-20261010/work')
site=pathlib.Path('/home/novatechsoft.com')
current=site/'current'
# Roll back to whatever production serves right now, recorded before any change.
old=current.resolve()
expected=os.environ.get('NOVATECH_EXPECTED_CURRENT')
service='novatechsoft-site.service'
assert not subprocess.check_output(['git','status','--porcelain'],cwd=work,text=True).strip(), 'Commit all source changes before deployment'
assert old.parent==site/'releases', 'Production pointer is outside releases/: stop and re-audit'
assert expected and str(old)==expected, 'Production pointer differs from the audited release: stop and re-audit'
assert (old/'node_modules').is_dir()
assert hashlib.sha256((old/'package-lock.json').read_bytes()).digest()==hashlib.sha256((work/'package-lock.json').read_bytes()).digest()
qa=work/'qa-artifacts/after'
media=json.loads((qa/'media.json').read_text());assert not media['failed']
crawl=json.loads((qa/'crawl.json').read_text());assert all(p['status']==200 and not p['errors'] and not p['failed'] and not p['broken'] for p in crawl['pages'])
assert all(not r['overflow'] for v in crawl['visual'] for r in v['results'])
assert all(p['status']<400 and not p.get('error') for p in crawl['linkStatuses'])
assert all(r['status']=='PASS' for r in json.loads((qa/'interactions.json').read_text()))
assert (qa/'seo.log').read_text().strip().endswith('No SEO errors.')
assert all(r['status']=='PASS' for r in json.loads((qa/'round2.json').read_text()))
assert (work/'.next/BUILD_ID').is_file()
stamp=time.strftime('%Y%m%d_%H%M%S',time.gmtime())
backup=pathlib.Path('/root/novatech-audit-20261010/backup')/('predeploy-'+stamp)
backup.mkdir(mode=0o700)
# All public media, source, build and any private env files in this static website.
# No database adapter, uploads outside this release or mutable content store was found.
with tarfile.open(backup/'release.tgz','w:gz') as archive:
 archive.add(old,arcname='release',filter=lambda t: None if '/node_modules' in t.name or '/.next/cache' in t.name else t)
for source in [pathlib.Path('/etc/systemd/system')/(service),pathlib.Path('/etc/nginx/sites-available/novatechsoft.com')]:shutil.copy2(source,backup/source.name)
(backup/'SHA256SUMS').write_text(hashlib.sha256((backup/'release.tgz').read_bytes()).hexdigest()+'  release.tgz\n')
# Re-open and validate the archive before changing production.
with tarfile.open(backup/'release.tgz') as archive:assert archive.getmember('release/.next/BUILD_ID').isfile()
new=site/'releases'/(os.environ.get('NOVATECH_RELEASE_PREFIX','release')+'_'+stamp)
shutil.copytree(work,new,ignore=shutil.ignore_patterns('.git','.codex','.aws','.agents','node_modules','qa-artifacts','.next','tsconfig.tsbuildinfo'))
shutil.copytree(work/'.next',new/'.next',ignore=shutil.ignore_patterns('cache'))
# Reuse only verified public-image optimizer results; omit build tool caches.
if (work/'.next/cache/images').is_dir():
 (new/'.next/cache').mkdir()
 shutil.copytree(work/'.next/cache/images',new/'.next/cache/images')
# Exact unchanged lockfile: retain immutable old dependency tree for rollback.
os.symlink((old/'node_modules').resolve(),new/'node_modules')
for private in old.glob('.env*'):
 if private.name!='.env.example':shutil.copy2(private,new/private.name)
identity=pwd.getpwnam('novat6247')
for root,dirs,files in os.walk(new,followlinks=False):
 os.chown(root,identity.pw_uid,identity.pw_gid)
 for name in dirs+files:os.chown(pathlib.Path(root)/name,identity.pw_uid,identity.pw_gid,follow_symlinks=False)
log=open(backup/'preflight.log','wb')
process=subprocess.Popen(['runuser','-u','novat6247','--','/usr/bin/node',str(new/'node_modules/next/dist/bin/next'),'start','-H','127.0.0.1','-p','4199'],cwd=new,stdout=log,stderr=log)
def check(base):
 for route in ['/', '/accounting-software','/oil-and-gas-software','/portfolio','/sitemap.xml','/privacy']:
  assert get(base+route)[0]==200,route
 for image in ['/images/web.webp','/images/database.webp','/images/graphic.webp','/images/ali.webp','/images/mahdi.webp','/images/portfolio/novatech-team.webp','/images/brand-registration-discount/brand-ownership.png']:
  status,headers,body=get(base+'/_next/image?url='+urllib.parse.quote(image,safe='')+'&w=640&q=75')
  assert status==200 and headers.get_content_type().startswith('image/') and body,image
try:
 for attempt in range(30):
  if process.poll() is not None:raise RuntimeError('Preflight server stopped')
  try:get('http://127.0.0.1:4199/');break
  except Exception:time.sleep(1)
 check('http://127.0.0.1:4199')
finally:
 process.terminate();process.wait(timeout=30);log.close()
record={'old':str(old),'new':str(new),'backup':str(backup),'git':subprocess.check_output(['git','rev-parse','HEAD'],cwd=work,text=True).strip(),'build':(new/'.next/BUILD_ID').read_text().strip(),'status':'PREPARED'}
(backup/'deployment.json').write_text(json.dumps(record,indent=2))
def point(target):
 temporary=site/('current-'+stamp+'.tmp')
 os.symlink(target,temporary);os.replace(temporary,current)
def restart():subprocess.run(['systemctl','restart',service],check=True)
try:
 point(new);restart()
 for attempt in range(30):
  try:get('http://127.0.0.1:4180/');break
  except Exception:time.sleep(1)
 check('http://127.0.0.1:4180');check('https://novatechsoft.com')
 subprocess.run(['systemctl','is-active','--quiet',service],check=True)
 record['status']='DEPLOYED_SMOKE_VERIFIED'
except Exception:
 point(old);restart();record['status']='ROLLED_BACK';raise
finally:
 (backup/'deployment.json').write_text(json.dumps(record,indent=2))
 (work/'qa-artifacts/deployment.json').write_text(json.dumps(record,indent=2))
 print(json.dumps(record,indent=2))
