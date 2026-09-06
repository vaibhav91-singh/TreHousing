import os
import sys
import traceback

# Ensure current app directory is in sys.path
cwd = os.path.dirname(os.path.abspath(__file__))
if cwd not in sys.path:
    sys.path.insert(0, cwd)

# Virtualenv site-packages path
virtualenv_site_packages = "/home1/agratas1/virtualenv/TreHousing-main/TREBACKEND-main/TREBACKEND-main/trebackend/3.10/lib/python3.10/site-packages"
if os.path.exists(virtualenv_site_packages) and virtualenv_site_packages not in sys.path:
    sys.path.insert(0, virtualenv_site_packages)

# Set DJANGO_SETTINGS_MODULE environment variable
os.environ['DJANGO_SETTINGS_MODULE'] = 'trebackend.settings'

try:
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
except Exception:
    err_msg = traceback.format_exc()
    def application(environ, start_response):
        status = '500 Internal Server Error'
        output = f"<h1>Django Application Startup Traceback</h1><pre>{err_msg}</pre>".encode('utf-8')
        response_headers = [('Content-Type', 'text/html; charset=utf-8'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output]

