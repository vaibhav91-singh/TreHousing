from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache

from .models import (
    Course, Subject, Syllabus, PYQ, Quiz, Question, Choice,
    SolvedPaper, JobVacancy, RecentUpdate,
    TopicExam, TopicSubject, TopicName, TopicQuestion,
    StudyMaterialExam, StudyMaterialSubject, StudyMaterialDocument
)

# ============================================================
# SMART CACHE INVALIDATION (Instead of cache.clear())
# Only delete specific cache keys related to the changed model.
# This prevents full cache wipe which causes heavy DB re-queries
# and RAM spikes on shared hosting (TheHostMe/cPanel).
# ============================================================

QUIZ_CACHE_PREFIXES = ['quiz_api_data_', 'quiz_api_list_']
TOPIC_CACHE_PREFIXES = ['topic_mcq_', 'topic_mcq_hierarchy_all']
JOB_CACHE_KEYS = ['active_jobs_list']

def _safe_cache_delete(keys):
    """Safely delete a list of cache keys."""
    for key in keys:
        try:
            cache.delete(key)
        except Exception:
            pass


@receiver([post_save, post_delete], sender=Quiz)
@receiver([post_save, post_delete], sender=Question)
@receiver([post_save, post_delete], sender=Choice)
def invalidate_quiz_cache(sender, instance=None, **kwargs):
    """Clear only quiz-related cache keys."""
    try:
        if sender == Quiz and instance:
            cache.delete(f"quiz_api_data_{instance.id}")
        # Always clear the list caches
        cache.delete("quiz_api_list_all")
        # Try to clear subject-specific list if available
        if instance and hasattr(instance, 'subject_id'):
            cache.delete(f"quiz_api_list_sub_{instance.subject_id}")
        elif instance and hasattr(instance, 'quiz'):
            quiz = instance.quiz
            if quiz and quiz.subject_id:
                cache.delete(f"quiz_api_list_sub_{quiz.subject_id}")
                cache.delete(f"quiz_api_data_{quiz.id}")
    except Exception:
        pass


@receiver([post_save, post_delete], sender=TopicExam)
@receiver([post_save, post_delete], sender=TopicSubject)
@receiver([post_save, post_delete], sender=TopicName)
@receiver([post_save, post_delete], sender=TopicQuestion)
def invalidate_topic_cache(sender, instance=None, **kwargs):
    """Clear only topic-wise MCQ cache keys."""
    try:
        cache.delete("topic_mcq_hierarchy_all")
        topic_id = None
        if sender == TopicQuestion and instance:
            topic_id = getattr(instance, 'topic_id', None)
        elif sender == TopicName and instance:
            topic_id = getattr(instance, 'id', None)

        if topic_id:
            for page in range(1, 50):
                for limit in [10, 20, 30, 50, 100]:
                    cache.delete(f"topic_mcq_{topic_id}_p{page}_l{limit}")
    except Exception:
        pass


@receiver([post_save, post_delete], sender=JobVacancy)
@receiver([post_save, post_delete], sender=RecentUpdate)
def invalidate_job_cache(sender, **kwargs):
    """Clear only job-related cache keys."""
    _safe_cache_delete(JOB_CACHE_KEYS)


@receiver([post_save, post_delete], sender=SolvedPaper)
@receiver([post_save, post_delete], sender=Course)
@receiver([post_save, post_delete], sender=Subject)
@receiver([post_save, post_delete], sender=Syllabus)
@receiver([post_save, post_delete], sender=PYQ)
@receiver([post_save, post_delete], sender=StudyMaterialExam)
@receiver([post_save, post_delete], sender=StudyMaterialSubject)
@receiver([post_save, post_delete], sender=StudyMaterialDocument)
def invalidate_content_cache(sender, **kwargs):
    """
    For content models (syllabus, PYQ, study material, solved papers),
    Django's @cache_page uses internal keys that we can't easily target.
    These will naturally expire in 5-10 minutes (as set on the view).
    No action needed here - this avoids the dangerous cache.clear().
    """
    pass
