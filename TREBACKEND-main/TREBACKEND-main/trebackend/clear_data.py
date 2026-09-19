import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'trebackend.settings')
django.setup()

from core.models import TopicExam, Quiz, JobVacancy

def clear_sample_data():
    t_count, _ = TopicExam.objects.all().delete()
    q_count, _ = Quiz.objects.all().delete()
    print(f"Cleared {t_count} topic items and {q_count} quiz items successfully!")

if __name__ == '__main__':
    clear_sample_data()
