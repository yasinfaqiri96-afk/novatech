"""Read-only HTTP checks with the server's normal curl client for public TLS."""
import urllib.request, subprocess, tempfile, pathlib
from email.parser import BytesParser

def get(url):
    if not url.startswith('https://novatechsoft.com/'):
        with urllib.request.urlopen(url, timeout=20) as response:
            return response.status, response.headers, response.read()
    with tempfile.TemporaryDirectory(prefix='novatech-http-') as folder:
        headers=pathlib.Path(folder)/'headers'; body=pathlib.Path(folder)/'body'
        result=subprocess.run(['curl','--silent','--show-error','--fail','--max-time','30','--dump-header',str(headers),'--output',str(body),'--write-out','%{http_code}',url],check=True,capture_output=True)
        blocks=[part for part in headers.read_bytes().split(b'\r\n\r\n') if part.startswith(b'HTTP/')]
        parsed=BytesParser().parsebytes(blocks[-1].split(b'\r\n',1)[1])
        return int(result.stdout), parsed, body.read_bytes()
