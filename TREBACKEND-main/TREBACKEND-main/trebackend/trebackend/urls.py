
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Alag path
        # Core ke liye alag path (ya yahan bhi 'api/' use kar sakte ho)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)