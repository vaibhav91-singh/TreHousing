from django.contrib import admin
from django import forms
from .models import Course, Subject, Exam_Pattern, Subject_Content, PYQ, Syllabus, Sub_Courses
from .models import Quiz, Question, Choice

class SyllabusInline(admin.TabularInline):
    model = Syllabus
    extra = 1

class PYQInline(admin.TabularInline):
    model = PYQ
    extra = 1  

class SubjectContentInline(admin.TabularInline):  
    model = Subject_Content
    extra = 1  

class Sub_Courses(admin.TabularInline):
    model = Sub_Courses
    extra = 1

class SubjectInline(admin.TabularInline): 
    model = Subject
    extra = 1  

class ExamPatternInline(admin.TabularInline): 
    model = Exam_Pattern
    extra = 1  

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'banner')
    search_fields = ('title',)
    inlines = [Sub_Courses, SubjectInline]  
    ordering = ['id']

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'pdf_link')
    search_fields = ('title', 'course__title')
    list_filter = ('course',)
    ordering = ['id']
    inlines = [ExamPatternInline, SubjectContentInline, SyllabusInline, PYQInline] 

class ExamPatternAdminForm(forms.ModelForm):
    class Meta:
        model = Exam_Pattern
        fields = '__all__'

    sub_topics = forms.JSONField(widget=forms.Textarea, required=False)
    no_of_questions = forms.JSONField(widget=forms.Textarea, required=False)
    maximum_marks = forms.JSONField(widget=forms.Textarea, required=False)

# ==========================================================================
# NEW: QUIZ SYSTEM ADMIN INTEGRATION (WITH INLINES)
# ==========================================================================

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 4  # Default standard 4 options ready-made milenge form mein
    max_num = 10 # Aap maximum 10 options tak add kar sakte hain

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1  # Quiz page par hi question add karne ka option milega

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'description')
    list_filter = ('subject',)
    search_fields = ('title', 'subject__title')
    inlines = [QuestionInline]  # Quiz ke andar direct questions dikhenge

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'quiz')
    list_filter = ('quiz__subject', 'quiz')
    search_fields = ('text', 'quiz__title')
    inlines = [ChoiceInline]  # Question kholte hi uski saari choices niche dikhengi

