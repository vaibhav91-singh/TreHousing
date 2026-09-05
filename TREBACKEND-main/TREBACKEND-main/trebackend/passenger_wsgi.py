import os
import sys

# Ensure current directory is in sys.path
cwd = os.path.dirname(os.path.abspath(__file__))
if cwd not in sys.path:
    sys.path.insert(0, cwd)

# Virtualenv site-packages path
virtualenv_site_packages = "/home1/agratas1/virtualenv/TreHousing-main/TREBACKEND-main/TREBACKEND-main/trebackend/3.10/lib/python3.10/site-packages"
if os.path.exists(virtualenv_site_packages) and virtualenv_site_packages not in sys.path:
    sys.path.insert(0, virtualenv_site_packages)

os.environ['DJANGO_SETTINGS_MODULE'] = 'trebackend.settings'

try:
    from trebackend.wsgi import application
except Exception as e:
    def application(environ, start_response):
        status = '500 Internal Server Error'
        output = f'Django Startup Error: {e}\n'.encode('utf-8')
        response_headers = [('Content-type', 'text/plain'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output]

