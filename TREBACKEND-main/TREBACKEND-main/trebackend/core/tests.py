from django.test import TestCase
from .models import Course, Subject, Quiz, Question, Choice

class QuizBulkUploadTestCase(TestCase):
    def setUp(self):
        self.course = Course.objects.create(title="Test Course", description="Desc")
        self.subject = Subject.objects.create(course=self.course, title="Chemistry", description="Desc")

    def test_quiz_bulk_upload_unicode(self):
        json_str = '''
        [
          {
            "text": "Q.1 If '→' denotes increasing order of intensity, then the meaning of the words [dry → arid → parched] is analogous to [diet → fast → _____ ]. Which one of the given options is appropriate to fill the blank?",
            "choices": [
              {
                "text": "starve",
                "is_correct": true
              },
              {
                "text": "hunger",
                "is_correct": false
              }
            ]
          }
        ]
        '''
        quiz = Quiz.objects.create(
            subject=self.subject,
            title="Unicode Arrow Test Quiz",
            bulk_upload_json=json_str
        )
        # Check questions created
        self.assertEqual(quiz.questions.count(), 1)
        q = quiz.questions.first()
        self.assertIn("->", q.text)
        self.assertEqual(q.choices.count(), 2)
        # Field should be cleared
        quiz.refresh_from_db()
        self.assertEqual(quiz.bulk_upload_json, "")

