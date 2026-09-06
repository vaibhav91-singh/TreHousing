
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

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

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)