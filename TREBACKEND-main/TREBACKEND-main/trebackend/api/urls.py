from core import views
from core.views import course_api, pyq_api
from django.urls import path

urlpatterns = [
    path('v1/', course_api, name='course-api'),
    path('v2/', pyq_api, name='pyq-api'),
    # ⬇️ INTEGRATE THIS NEW QUIZ ENDPOINT
    path('v1/quiz/', views.quiz_api, name='quiz_api_endpoint'),
    path('api/solved-papers/', views.get_solved_papers, name='get_solved_papers'),
    path('job/', views.job_list_create, name='job-list-create'),
    path('job/<int:pk>/', views.job_detail_api, name='job-detail-api'),
    
]