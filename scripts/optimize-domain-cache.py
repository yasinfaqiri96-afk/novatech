#!/usr/bin/env python3
"""Change only this domain's asset location; preserve HTML no-store and TLS."""
import pathlib,subprocess,shutil,time,json,urllib.request
from novatech_http import get
config=pathlib.Path('/etc/nginx/sites-available/novatechsoft.com')
backup=pathlib.Path('/root/novatech-audit-20261010/backup')/('cache-config-'+time.strftime('%Y%m%d_%H%M%S',time.gmtime()))
backup.mkdir(mode=0o700);shutil.copy2(config,backup/config.name)
original=config.read_text()
assert original.count('server_name novatechsoft.com www.novatechsoft.com;')==2
assert original.count('    location / {')==2
location='''    # Static files and optimized images keep Next.js cache headers.
    # HTML below still uses no-store, so releases do not leave stale pages.
    location ~ ^/(?:_next/(?:static/|image$)|images/|fonts/) {
        proxy_pass http://127.0.0.1:4180;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

'''
assert '# Static files and optimized images' not in original
config.write_text(original.replace('    location / {',location+'    location / {'))
try:
 subprocess.run(['nginx','-t'],check=True)
 subprocess.run(['systemctl','reload','nginx'],check=True)
 results=[]
 for route,cache in [('/',False),('/images/web.webp',True),('/_next/image?url=%2Fimages%2Fweb.webp&w=640&q=75',True)]:
  for attempt in range(30):
   status,headers,body=get('https://novatechsoft.com'+route)
   header=headers.get('Cache-Control','')
   if status==200 and (('no-store' not in header) if cache else ('no-store' in header)):break
   time.sleep(1)
  else:raise RuntimeError(f'Cache verification failed for {route}: {status}, {header}')
  results.append({'route':route,'cacheControl':header,'status':status})
 pathlib.Path('/root/novatech-audit-20261010/work/qa-artifacts/cache.json').write_text(json.dumps({'backup':str(backup),'results':results},indent=2));print(json.dumps(results,indent=2))
except Exception:
 shutil.copy2(backup/config.name,config);subprocess.run(['nginx','-t'],check=True);subprocess.run(['systemctl','reload','nginx'],check=True);raise
