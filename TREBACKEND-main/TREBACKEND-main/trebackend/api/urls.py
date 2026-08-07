
from core import views
from core.views import course_api, pyq_api
from django.urls import path

urlpatterns = [
    path('v1/', course_api, name='course-api'),
    path('v2/', pyq_api, name='pyq-api'),
    # ⬇️ INTEGRATE THIS NEW QUIZ ENDPOINT
    path('v1/quiz/', views.quiz_api, name='quiz_api_endpoint'),
    path('v1/topic-wise-mcq/', views.topic_wise_mcq_api, name='topic_wise_mcq_api'),
    path('v1/study-materials/', views.study_materials_api, name='study_materials_api'),
    path('v1/solved-papers/', views.get_solved_papers, name='get_solved_papers'),
    path('job/', views.job_list_create, name='job-list-create'),
    path('job/<int:pk>/', views.job_detail_api, name='job-detail-api'),
    path('recent-updates/', views.recent_updates_list, name='recent-updates-list'),
]
