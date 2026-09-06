
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def home_health_check(request):
    return JsonResponse({
        "status": "online",
        "message": "TRE Housing Backend API Server Active",
        "admin_panel": "/admin/",
        "api_endpoints": "/api/job/"
    })

urlpatterns = [
    path('', home_health_check, name='home_health_check'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)