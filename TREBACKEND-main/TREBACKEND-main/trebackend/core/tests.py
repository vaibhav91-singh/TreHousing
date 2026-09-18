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
    def test_quiz_bulk_upload_math_mcqs(self):
        json_str = '''
        [
          {
            "text": "Q.1 Let $A$ be a $3 \\\\times 3$ real matrix such that $A^3 = 0$. Which of the following statements is ALWAYS true for $A$?",
            "choices": [
              {
                "text": "The minimal polynomial of $A$ is $m(x) = x^3$",
                "is_correct": false
              },
              {
                "text": "The trace of $A$ is zero and $\\\\det(A) = 0$",
                "is_correct": true
              }
            ]
          }
        ]
        '''
        quiz = Quiz.objects.create(
            subject=self.subject,
            title="Linear Algebra Math Test",
            bulk_upload_json=json_str
        )
        self.assertEqual(quiz.questions.count(), 1)
        self.assertEqual(quiz.questions.first().choices.count(), 2)


