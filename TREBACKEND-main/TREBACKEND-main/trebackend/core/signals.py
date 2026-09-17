from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache

from .models import (
    Course, Subject, Syllabus, PYQ, Quiz, Question, Choice,
    SolvedPaper, JobVacancy, RecentUpdate,
    TopicExam, TopicSubject, TopicName, TopicQuestion,
    StudyMaterialExam, StudyMaterialSubject, StudyMaterialDocument
)

@receiver([post_save, post_delete], sender=SolvedPaper)
@receiver([post_save, post_delete], sender=RecentUpdate)
@receiver([post_save, post_delete], sender=JobVacancy)
@receiver([post_save, post_delete], sender=Course)
@receiver([post_save, post_delete], sender=Subject)
@receiver([post_save, post_delete], sender=Syllabus)
@receiver([post_save, post_delete], sender=PYQ)
@receiver([post_save, post_delete], sender=Quiz)
@receiver([post_save, post_delete], sender=Question)
@receiver([post_save, post_delete], sender=Choice)
@receiver([post_save, post_delete], sender=TopicExam)
@receiver([post_save, post_delete], sender=TopicSubject)
@receiver([post_save, post_delete], sender=TopicName)
@receiver([post_save, post_delete], sender=TopicQuestion)
@receiver([post_save, post_delete], sender=StudyMaterialExam)
@receiver([post_save, post_delete], sender=StudyMaterialSubject)
@receiver([post_save, post_delete], sender=StudyMaterialDocument)
def invalidate_cache_on_change(sender, **kwargs):
    """
    Clears the application cache whenever any content model is saved or deleted.
    Ensures users immediately see updated data while preserving high cache performance for GET requests.
    """
    try:
        cache.clear()
    except Exception as e:
        print(f"Error clearing cache in signal: {e}")
