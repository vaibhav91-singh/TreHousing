from core.views import course_api, pyq_api
from django.urls import path

urlpatterns = [
    path('v1/', course_api, name='course-api'),
    path('v2/', pyq_api, name='pyq-api'),
]