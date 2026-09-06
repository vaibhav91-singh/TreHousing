import os
import sys

# Ensure current app directory is in sys.path
cwd = os.path.dirname(os.path.abspath(__file__))
if cwd not in sys.path:
    sys.path.insert(0, cwd)

# Set DJANGO_SETTINGS_MODULE environment variable
os.environ['DJANGO_SETTINGS_MODULE'] = 'trebackend.settings'

# Standard Django WSGI Application Handler for cPanel / Passenger
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
