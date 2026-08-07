from django.contrib import admin
from django import forms
from .models import Course, Subject, Exam_Pattern, Subject_Content, PYQ, Syllabus, Sub_Courses,SolvedPaper
from .models import Quiz, Question, Choice
from .models import JobVacancy, RecentUpdate
from .models import TopicExam, TopicSubject, TopicName, TopicQuestion
from .models import StudyMaterialExam, StudyMaterialSubject, StudyMaterialDocument

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
    list_display = ('title', 'course')
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



@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'quiz')
    list_filter = ('quiz__subject', 'quiz')
    search_fields = ('text', 'quiz__title')
    inlines = [ChoiceInline]  # Question kholte hi uski saari choices niche dikhengi

#==============================================================
#JOB VACANCY
#==============================================================
@admin.register(JobVacancy)
class JobVacancyAdmin(admin.ModelAdmin):
    list_display = ('title', 'organization', 'last_date', 'status')
    list_filter = ('status', 'last_date')
    search_fields = ('title', 'organization')
    list_editable = ('status',)

# Solved Paper Section


@admin.register(SolvedPaper)
class SolvedPaperAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'year','paper_link') # Admin table mein ye dikhega
    search_fields = ('title', 'subject__title') # Title aur Subject se search kar sakoge
    list_filter = ('subject', 'year') # Filter karne ke liye asaan hoga

#==============================================================
# Part 2 of Code Upload Bulk MCQ Question
#==============================================================
import json
from django.urls import path
from django.shortcuts import render, redirect
from django.contrib import messages
from django import forms

# 1. Form for JSON upload inside Quiz admin
class QuizJSONUploadForm(forms.Form):
    json_file_or_text = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 10, 'cols': 80, 'placeholder': 'Paste your JSON array of questions here...'}),
        label="Paste Questions JSON"
    )

# 2. Update your QuizAdmin to include the bul   k upload URL & view
@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'category', 'display_questions_limit') 
    fields = ('subject', 'category', 'title', 'description', 'display_questions_limit') 
    list_filter = ('subject', 'category') 
    search_fields = ('title', 'subject__title', 'category')
    inlines = [QuestionInline]
    
    change_form_template = 'admin/quiz_change_form.html'

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('<int:quiz_id>/bulk-upload-questions/', self.admin_site.admin_view(self.quiz_bulk_upload_view), name='quiz_bulk_upload'),
        ]
        return custom_urls + urls

    def quiz_bulk_upload_view(self, request, quiz_id):
        try:
            quiz = Quiz.objects.get(pk=quiz_id)
        except Quiz.DoesNotExist:
            messages.error(request, "Quiz not found!")
            return redirect('..')

        if request.method == 'POST':
            form = QuizJSONUploadForm(request.POST)
            if form.is_valid():
                raw_data = form.cleaned_data['json_file_or_text']
                try:
                    questions_data = json.loads(raw_data)
                    q_count = 0
                    c_count = 0

                    for q_item in questions_data:
                        # Question create karna
                        question_text = q_item.get('text') or q_item.get('question_text')
                        question = Question.objects.create(quiz=quiz, text=question_text)
                        q_count += 1

                        # Choices create karna
                        choices = q_item.get('choices', [])
                        for c_item in choices:
                            Choice.objects.create(
                                question=question,
                                text=c_item.get('text'),
                                is_correct=c_item.get('is_correct', False)
                            )
                            c_count += 1

                    messages.success(request, f"Successfully added {q_count} questions with {c_count} choices!")
                    return redirect(f'/admin/core/quiz/{quiz.id}/change/')
                except Exception as e:
                    messages.error(request, f"JSON parsing error: {e}")
        else:
            form = QuizJSONUploadForm()

        context = {
            'form': form,
            'quiz': quiz,
            'opts': self.model._meta,
            'title': f'Bulk Upload Questions for: {quiz.title}'
        }
        return render(request, 'admin/quiz_bulk_upload.html', context)
 
@admin.register(RecentUpdate)
class RecentUpdateAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title',)
    ordering = ('-created_at',)

# ==========================================================================
# NEW FEATURE: TOPIC-WISE MCQ SYSTEM ADMIN
# ==========================================================================

class TopicQuestionInline(admin.StackedInline):
    model = TopicQuestion
    extra = 1

@admin.register(TopicName)
class TopicNameAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject')
    list_filter = ('subject', 'subject__exam')
    search_fields = ('name', 'subject__name', 'subject__exam__name')
    inlines = [TopicQuestionInline]

@admin.register(TopicSubject)
class TopicSubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'exam')
    list_filter = ('exam',)
    search_fields = ('name', 'exam__name')

@admin.register(TopicExam)
class TopicExamAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

# ==========================================================================
# NEW FEATURE: STUDY MATERIAL SYSTEM ADMIN
# ==========================================================================

class StudyMaterialDocumentInline(admin.TabularInline):
    model = StudyMaterialDocument
    extra = 1

@admin.register(StudyMaterialSubject)
class StudyMaterialSubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'exam')
    list_filter = ('exam',)
    search_fields = ('name', 'exam__name')
    inlines = [StudyMaterialDocumentInline]

@admin.register(StudyMaterialExam)
class StudyMaterialExamAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
