from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
import time

def home(request):
    return JsonResponse({
        "status": "online",
        "message": "TRE Backend API is running successfully!",
        "endpoints": {
            "admin": "/admin/",
            "api_v1": "/api/v1/",
            "jobs": "/api/job/",
            "quiz": "/api/v1/quiz/",
            "solved_papers": "/api/v1/solved-papers/"
        }
    })

def health_check(request):
    """
    Lightweight keep-alive endpoint.
    TheHostMe cPanel me Cron Job se har 5 min is URL ko ping karein
    taaki Passenger process idle hone par kill na kare.
    """
    return JsonResponse({
        "status": "alive",
        "timestamp": int(time.time())
    })

urlpatterns = [
    path('', home, name='home'),
    path('health/', health_check, name='health_check'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
