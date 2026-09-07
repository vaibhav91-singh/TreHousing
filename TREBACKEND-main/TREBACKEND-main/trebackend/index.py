import os
import sys
import glob
import traceback

# Ensure current app directory is in sys.path
cwd = os.path.dirname(os.path.abspath(__file__))
if cwd not in sys.path:
    sys.path.insert(0, cwd)

# Auto-detect virtualenv site-packages path
venv_base = "/home1/agratas1/virtualenv/TreHousing-main/TREBACKEND-main/TREBACKEND-main/trebackend"
site_packages_pattern = os.path.join(venv_base, "*", "lib", "python*", "site-packages")
for sp in glob.glob(site_packages_pattern):
    if sp not in sys.path:
        sys.path.insert(0, sp)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "trebackend.settings")

try:
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
    app = application
except Exception:
    err_msg = traceback.format_exc()
    def application(environ, start_response):
        status = '500 Internal Server Error'
        output = f"<h1>Django Application Startup Traceback</h1><pre>{err_msg}</pre>".encode('utf-8')
        response_headers = [('Content-Type', 'text/html; charset=utf-8'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output]
    app = application

