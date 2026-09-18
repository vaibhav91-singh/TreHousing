import json
from django.contrib import admin
from django import forms
from django.urls import path
from django.shortcuts import render, redirect
from django.contrib import messages
from django.db import transaction

from .models import safe_parse_json, Course, Subject, Exam_Pattern, Subject_Content, PYQ, Syllabus, Sub_Courses, SolvedPaper
from .models import Quiz, Question, Choice
from .models import JobVacancy, RecentUpdate
from .models import TopicExam, TopicSubject, TopicName, TopicQuestion
from .models import StudyMaterialExam, StudyMaterialSubject, StudyMaterialDocument

class SyllabusInline(admin.TabularInline):
    model = Syllabus
    extra = 1
    fields = ('title', 'pdf_link', 'file')

@admin.register(Syllabus)
class SyllabusAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'pdf_link', 'file')
    search_fields = ('title', 'subject__title')
    list_filter = ('subject',)

class PYQInline(admin.TabularInline):
    model = PYQ
    extra = 1  

class SubjectContentInline(admin.TabularInline):  
    model = Subject_Content
    extra = 1  

class Sub_CoursesInline(admin.TabularInline):
    model = Sub_Courses
    extra = 1

class SubjectInline(admin.TabularInline): 
    model = Subject
    extra = 1  
    fields = ('title', 'description')
    exclude = ('pdf_link', 'total_questions', 'total_marks')

class ExamPatternInline(admin.TabularInline): 
    model = Exam_Pattern
    extra = 1  

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)
    inlines = [Sub_CoursesInline, SubjectInline]
    ordering = ['id']

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'course')
    search_fields = ('title', 'course__title')
    list_filter = ('course',)
    ordering = ['id']
    fields = ('course', 'title', 'description')
    exclude = ('pdf_link', 'total_questions', 'total_marks')
    inlines = [ExamPatternInline, SubjectContentInline, SyllabusInline, PYQInline] 




class ExamPatternAdminForm(forms.ModelForm):
    class Meta:
        model = Exam_Pattern
        fields = '__all__'

    sub_topics = forms.JSONField(widget=forms.Textarea, required=False)
    no_of_questions = forms.JSONField(widget=forms.Textarea, required=False)
    maximum_marks = forms.JSONField(widget=forms.Textarea, required=False)

# ==========================================================================
# QUIZ SYSTEM ADMIN INTEGRATION (WITH INLINES & TIMER DURATION)
# ==========================================================================

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 4  
    max_num = 10 

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1  

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'quiz')
    list_filter = ('quiz__subject', 'quiz')
    search_fields = ('text', 'quiz__title')
    inlines = [ChoiceInline]  

#==============================================================
# JOB VACANCY
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
    list_display = ('title', 'subject', 'year','paper_link') 
    search_fields = ('title', 'subject__title') 
    list_filter = ('subject', 'year') 

#==============================================================
# Bulk MCQ Question Upload & Quiz Admin
#==============================================================
class QuizJSONUploadForm(forms.Form):
    json_file_or_text = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 10, 'cols': 80, 'placeholder': 'Paste your JSON array of questions here...'}),
        label="Paste Questions JSON"
    )

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    # 'duration_minutes' added for test timer control
    list_display = ('title', 'subject', 'category', 'duration_minutes', 'display_questions_limit') 
    fields = ('subject', 'category', 'title', 'description', 'duration_minutes', 'display_questions_limit', 'bulk_upload_json') 
    list_filter = ('subject', 'category') 
    search_fields = ('title', 'subject__title', 'category')
    inlines = [QuestionInline]
    
    change_form_template = 'admin/quiz_change_form.html'

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('<int:quiz_id>/bulk-count-questions/', self.admin_site.admin_view(self.quiz_bulk_upload_view), name='quiz_bulk_upload_count'),
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
                    data = safe_parse_json(raw_data)
                    if isinstance(data, dict):
                        data = data.get('questions') or data.get('mcqs') or data.get('data') or data.get('items') or [data]

                    q_count = 0
                    c_count = 0

                    if isinstance(data, list):
                        parsed_questions = []

                        for q_item in data:
                            if not isinstance(q_item, dict):
                                continue

                            q_text = (
                                q_item.get('text') or 
                                q_item.get('question_text') or 
                                q_item.get('question') or 
                                q_item.get('title') or 
                                q_item.get('q')
                            )
                            if not q_text or not str(q_text).strip():
                                continue

                            # Normalize unicode arrows and quotes
                            q_text = str(q_text).replace('→', '->').replace('←', '<-').replace('↔', '<->')
                            q_text = q_text.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"').strip()

                            raw_choices = q_item.get('choices') or q_item.get('options') or q_item.get('answers')
                            q_choices_list = []

                            if isinstance(raw_choices, list) and len(raw_choices) > 0:
                                answer_val = q_item.get('answer') or q_item.get('correct_answer') or q_item.get('correct_option') or q_item.get('correct')
                                for idx, c_item in enumerate(raw_choices):
                                    if isinstance(c_item, dict):
                                        c_text = c_item.get('text') or c_item.get('option') or c_item.get('choice') or c_item.get('val')
                                        is_corr = bool(
                                            c_item.get('is_correct') or 
                                            c_item.get('correct') or 
                                            c_item.get('isCorrect') or 
                                            c_item.get('right')
                                        )
                                    else:
                                        c_text = str(c_item)
                                        is_corr = False
                                        if answer_val is not None:
                                            if str(answer_val).strip() == c_text.strip():
                                                is_corr = True
                                            elif isinstance(answer_val, int) and answer_val == idx:
                                                is_corr = True
                                            elif str(answer_val).strip().upper() == chr(65 + idx):
                                                is_corr = True

                                    if c_text and str(c_text).strip():
                                        c_clean = str(c_text).replace('→', '->').replace('←', '<-').replace('’', "'").replace('“', '"').replace('”', '"').strip()
                                        q_choices_list.append((c_clean, is_corr))

                            elif any(k in q_item for k in ['option_a', 'optionA', 'a', 'A']):
                                opt_keys = [
                                    ('option_a', 'optionA', 'a', 'A'),
                                    ('option_b', 'optionB', 'b', 'B'),
                                    ('option_c', 'optionC', 'c', 'C'),
                                    ('option_d', 'optionD', 'd', 'D'),
                                ]
                                correct_marker = str(q_item.get('correct') or q_item.get('correct_option') or q_item.get('answer') or '').strip().upper()
                                for idx, key_tuple in enumerate(opt_keys):
                                    opt_val = None
                                    for k in key_tuple:
                                        if k in q_item:
                                            opt_val = q_item[k]
                                            break
                                    if opt_val and str(opt_val).strip():
                                        letter = chr(65 + idx)
                                        is_corr = (correct_marker == letter) or (correct_marker == str(idx)) or (correct_marker == str(opt_val).strip().upper())
                                        c_clean = str(opt_val).replace('→', '->').replace('←', '<-').replace('’', "'").replace('“', '"').replace('”', '"').strip()
                                        q_choices_list.append((c_clean, is_corr))

                            parsed_questions.append((q_text, q_choices_list))

                        if parsed_questions:
                            with transaction.atomic():
                                choices_to_create = []
                                for q_text, choices_list in parsed_questions:
                                    q_obj = Question.objects.create(quiz=quiz, text=q_text)
                                    q_count += 1
                                    for c_text, is_corr in choices_list:
                                        choices_to_create.append(
                                            Choice(
                                                question_id=q_obj.id,
                                                text=c_text,
                                                is_correct=is_corr
                                            )
                                        )

                                if choices_to_create:
                                    Choice.objects.bulk_create(choices_to_create, batch_size=1000)
                                    c_count = len(choices_to_create)

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
# TOPIC-WISE MCQ SYSTEM ADMIN
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
# STUDY MATERIAL SYSTEM ADMIN
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
