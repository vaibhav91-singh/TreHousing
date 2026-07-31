
from rest_framework import serializers
from .models import Course, Subject, Exam_Pattern, Subject_Content, Syllabus, Quiz, Question, Choice, SolvedPaper, PYQ, JobVacancy
class SyllabusSerializer(serializers.ModelSerializer):
    filename = serializers.ReadOnlyField()

    class Meta:
        model = Syllabus
        fields = ['id', 'file', 'filename']

class SubjectContentSerializer(serializers.ModelSerializer):
    reference_links = serializers.SerializerMethodField()

    def get_reference_links(self, obj):
        return [link.strip() for link in obj.reference_links.split(",")] if obj.reference_links else []

    class Meta:
        model = Subject_Content
        fields = ['title', 'description', 'reference_links']

class ExamPatternSerializer(serializers.ModelSerializer):
    sub_topics = serializers.SerializerMethodField()
    no_of_questions = serializers.SerializerMethodField()
    maximum_marks = serializers.SerializerMethodField()

    class Meta:
        model = Exam_Pattern
        fields = ['topics', 'sub_topics', 'no_of_questions', 'total_questions', 'maximum_marks', 'total_marks', 'duration']

    def get_sub_topics(self, obj):
        return obj.sub_topics.split(",") if obj.sub_topics else []

    def get_no_of_questions(self, obj):
        return list(map(int, obj.no_of_questions.split(","))) if obj.no_of_questions else []

    def get_maximum_marks(self, obj):
        return list(map(int, obj.maximum_marks.split(","))) if obj.maximum_marks else []

class SubjectSerializer(serializers.ModelSerializer):
    exam_patterns = ExamPatternSerializer(many=True, read_only=True)  
    subject_contents = SubjectContentSerializer(many=True, read_only=True)
    syllabus_files = SyllabusSerializer(many=True, read_only=True)

    class Meta:
        model = Subject
        fields = ['id', 'title', 'description', 'pdf_link', 'exam_patterns', 'subject_contents', 'syllabus_files']

class CourseSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'banner', 'subjects']


# ==========================================================================
# QUIZ, QUESTION, AND CHOICE SERIALIZERS
# ==========================================================================
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        # React frontend ko text aur correctness state dono chahiye score calculate karne ke liye
        fields = ['id', 'text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    # Ek question ki multiple choices (options) hongi, isliye many=True
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'choices']

class QuizSerializer(serializers.ModelSerializer):
    # Ek quiz ke andar multiple questions honge, isliye nested routing integration
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'subject', 'questions', 'category']


# ==========================================================================
# NEW FEATURE: CLOUD-LINKED SOLVED PAPERS SERIALIZER
# ==========================================================================
class SolvedPaperSerializer(serializers.ModelSerializer):
    # Isse string field me subject ka title (naam) direct pass ho jayega frontend tabs ke liye
    subject_title = serializers.CharField(source='subject.title', read_only=True)

    class Meta:
        model = SolvedPaper
        fields = ['id', 'subject', 'subject_title', 'title', 'year', 'paper_link', 'created_at']

#==============================================================
#JOB VACANCY
#==============================================================

class JobVacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobVacancy
        fields = '__all__'