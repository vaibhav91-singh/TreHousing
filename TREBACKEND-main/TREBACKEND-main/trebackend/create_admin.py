import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'trebackend.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
username = os.environ.get('ADMIN_USERNAME', 'admin')
email = os.environ.get('ADMIN_EMAIL', 'admin@trehousingpublications.com')
password = os.environ.get('ADMIN_PASSWORD', 'admin12345')

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Superuser '{username}' created successfully!")
else:
    print(f"Superuser '{username}' already exists.")
