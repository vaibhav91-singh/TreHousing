import os
import sys

# Add current directory to python path
sys.path.insert(0, os.path.dirname(__file__))

# Set Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'trebackend.settings'

# Import WSGI application
from trebackend.wsgi import application
