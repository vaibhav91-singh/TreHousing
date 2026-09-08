from django.db import models, transaction
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
import os

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class Sub_Courses(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="sub_courses", db_index=True)
    title = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.title}"

class Subject(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='subjects', db_index=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    pdf_link = models.FileField(
        upload_to='pdfs/',
        validators=[FileExtensionValidator(allowed_extensions=['pdf'])]
    ) 
    total_questions = models.IntegerField()
    total_marks = models.IntegerField()

    def __str__(self):
        return self.title


class Exam_Pattern(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='exam_patterns', db_index=True)
    topics = models.CharField(max_length=50)  
    sub_topics = models.TextField(blank=False, null=False)
    no_of_questions = models.TextField(blank=False, null=False)
    maximum_marks = models.TextField(blank=False, null=False)
    duration = models.FloatField()
 
    def clean(self):
        """Ensure sub_category and total_questions have the same number of elements."""
        sub_topics_list = [s.strip() for s in self.sub_topics.split(",") if s.strip()] if self.sub_topics else []
        no_of_questions_list = [q.strip() for q in self.no_of_questions.split(",") if q.strip()] if self.no_of_questions else []
        maximum_marks_list = [m.strip() for m in self.maximum_marks.split(",") if m.strip()] if self.maximum_marks else []
        if not (len(sub_topics_list) == len(no_of_questions_list) == len(maximum_marks_list)):
            raise ValidationError("Sub Topics, No of questions, and Maximum marks must have the same number of elements.")

    def save(self, *args, **kwargs):
        """Call clean before saving to enforce validation."""
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.subject.title} exam pattern"
    
    class Meta:
        verbose_name_plural = "Exam Pattern"
    

class Subject_Content(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="subject_contents", db_index=True)
    title = models.CharField(max_length=255) 
    description = models.TextField()  
    reference_links = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.subject.title} - {self.title}"
    
    class Meta:
        verbose_name_plural = "Subject Content"


class PYQ(models.Model):
    subject = models.ForeignKey(Subject, related_name="pyqs", on_delete=models.CASCADE, db_index=True)
    file = models.FileField(
        upload_to="pyqs/",
        validators=[FileExtensionValidator(allowed_extensions=['pdf'])]
    ) 

    def __str__(self):
        return f"{self.subject.title} - {os.path.basename(self.file.name)}"
    
    @property
    def filename(self):
        return os.path.basename(self.file.name)
    
class Syllabus(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="syllabus_files", db_index=True)
    file = models.FileField(
        upload_to="syllabus/",
        validators=[FileExtensionValidator(allowed_extensions=['pdf'])]
    )

    def __str__(self):
        return f"{self.subject.title} - {os.path.basename(self.file.name)}"
    
    @property
    def filename(self):
        return os.path.basename(self.file.name)
    
    class Meta:
        verbose_name_plural = "Syllabus"

# ==========================================================================
# QUIZ SYSTEM INTEGRATION
# ==========================================================================

class Quiz(models.Model):
    category = models.CharField(max_length=100, default="General") 
    
    subject = models.ForeignKey(
        'Subject', 
        on_delete=models.CASCADE, 
        related_name='quizzes',
        null=True, 
        blank=True,
        db_index=True
    )
    title = models.CharField(max_length=200) 
    description = models.TextField(blank=True)
    display_questions_limit = models.IntegerField(blank=True, null=True, help_text="Number of questions to show to the user (e.g. 50). Leave blank to show all.")
    duration_minutes = models.IntegerField(default=60, help_text="Total duration of test in minutes (e.g. 60 for 1 hour, 120 for 2 hours).")
    bulk_upload_json = models.TextField(
        blank=True, 
        null=True, 
        help_text='Paste JSON array here to bulk upload MCQs. e.g. [{"text": "Q1", "choices": [{"text": "A", "is_correct": true}, {"text": "B", "is_correct": false}]}]'
    )

    def __str__(self):
        if self.subject:
            return f"[{self.subject.title}] {self.title}"
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.bulk_upload_json and self.bulk_upload_json.strip():
            import json
            try:
                raw_json = self.bulk_upload_json.strip()
                data = json.loads(raw_json)
                if isinstance(data, dict):
                    data = data.get('questions') or data.get('mcqs') or data.get('data') or data.get('items') or [data]
                
                if isinstance(data, list):
                    parsed_questions = []
                    
                    for q_item in data:
                        if not isinstance(q_item, dict):
                            continue
                        
                        # Question text parsing
                        q_text = (
                            q_item.get('text') or 
                            q_item.get('question_text') or 
                            q_item.get('question') or 
                            q_item.get('title') or 
                            q_item.get('q')
                        )
                        if not q_text or not str(q_text).strip():
                            continue
                        
                        q_text = str(q_text).strip()
                        
                        # Extract choices / options for this question
                        raw_choices = q_item.get('choices') or q_item.get('options') or q_item.get('answers')
                        q_choices_list = []
                        
                        # Case A: List of choices/options
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
                                        elif str(answer_val).strip().upper() == chr(65 + idx): # 'A', 'B', 'C', 'D'
                                            is_corr = True
                                
                                if c_text and str(c_text).strip():
                                    q_choices_list.append((str(c_text).strip(), is_corr))
                        # Case B: Direct option_a, option_b, option_c, option_d keys
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
                                    q_choices_list.append((str(opt_val).strip(), is_corr))
                        
                        parsed_questions.append((q_text, q_choices_list))

                    if parsed_questions:
                        with transaction.atomic():
                            choices_to_create = []
                            for q_text, choices_list in parsed_questions:
                                q_obj = Question.objects.create(quiz=self, text=q_text)
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

                # Clear the field after successful processing
                Quiz.objects.filter(id=self.id).update(bulk_upload_json="")
            except Exception as e:
                print(f"Error processing Quiz bulk upload JSON: {e}")

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions', db_index=True)
    text = models.CharField(max_length=500) 

    def __str__(self):
        return f"{self.quiz.title} - {self.text[:50]}..."

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices', db_index=True)
    text = models.CharField(max_length=200) 
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

# ==========================================================================
# CLOUD-LINKED SOLVED PAPERS ARCHITECTURE
# ==========================================================================

class SolvedPaper(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="solved_papers", db_index=True)
    title = models.CharField(max_length=255, help_text="e.g. UPSC 2024 Prelims GS Paper")
    year = models.IntegerField(help_text="e.g. 2024") 
    paper_link = models.URLField(max_length=1000, verbose_name="Paper Link", help_text="Google Drive or AWS S3 link for the Question Paper.")
    answer_key_link = models.URLField(max_length=1000, verbose_name="Answer Key Link", help_text="Google Drive or AWS S3 link for the Answer Key.", blank=True, null=True)
    linked_mock = models.ForeignKey('Quiz', on_delete=models.SET_NULL, null=True, blank=True, related_name="linked_papers", verbose_name="Linked Mock Test", help_text="Select a Mock Test to link with this paper.")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    
    def __str__(self):
        return f"{self.title} ({self.year})"
        
    class Meta:
        verbose_name = "Past Paper / Answer Key"
        verbose_name_plural = "Past Papers & Answer Keys"
        indexes = [
            models.Index(fields=['subject', '-created_at']),
        ]

#==============================================================
# JOB VACANCY
#==============================================================
class JobVacancy(models.Model):
    JOB_TYPE_CHOICES = [
        ('GOVT', 'Government'),
        ('PRIVATE', 'Private'),
    ]
    
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    eligibility = models.CharField(max_length=255)
    form_fee = models.IntegerField()
    apply_date = models.DateField(db_index=True)
    last_date = models.DateField()
    official_website = models.URLField()
    status = models.BooleanField(default=True, db_index=True)
    apply_link= models.URLField()
    
    category_badge = models.CharField(max_length=50, blank=True, null=True, help_text="e.g., BPSC, SSC, UPSC")
    vacancy_count = models.CharField(max_length=100, blank=True, null=True, help_text="e.g., 600+ Vacancies")
    qualification = models.CharField(max_length=100, blank=True, null=True, help_text="e.g., Graduation, 10th Pass")
    
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES, default='GOVT')

    class Meta:
        verbose_name_plural = "Job Vacancies"
        ordering = ['-apply_date']

    def __str__(self):
        return f"{self.title} - {self.organization}"

    def save(self, *args, **kwargs):
        from django.core.cache import cache
        cache.delete('active_jobs_list')
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        from django.core.cache import cache
        cache.delete('active_jobs_list')
        super().delete(*args, **kwargs)

#==============================================================
# RECENT UPDATES (For Job Vacancy Hub)
#==============================================================
class RecentUpdate(models.Model):
    title = models.CharField(max_length=255, help_text="e.g. BPSC 68th Mains Result Declared")
    description = models.CharField(max_length=500, blank=True, null=True, help_text="Check your merit list and cut-off marks")
    link = models.URLField(max_length=1000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

# ==========================================================================
# TOPIC-WISE MCQ SYSTEM
# ==========================================================================

class TopicExam(models.Model):
    name = models.CharField(max_length=200, help_text='e.g., UPSC, SSC CGL')
    
    class Meta:
        verbose_name = 'Topic-wise Exam'
        verbose_name_plural = '1. Topic-wise Exams'
        
    def __str__(self):
        return self.name

class TopicSubject(models.Model):
    exam = models.ForeignKey(TopicExam, on_delete=models.CASCADE, related_name='subjects', db_index=True)
    name = models.CharField(max_length=200, help_text='e.g., History, Geography')
    
    class Meta:
        verbose_name = 'Topic-wise Subject'
        verbose_name_plural = '2. Topic-wise Subjects'
        
    def __str__(self):
        return f'{self.exam.name} - {self.name}'

class TopicName(models.Model):
    subject = models.ForeignKey(TopicSubject, on_delete=models.CASCADE, related_name='topics', db_index=True)
    name = models.CharField(max_length=200, help_text='e.g., Ancient History, Indian Geography')
    bulk_upload_json = models.TextField(
        blank=True, 
        null=True, 
        help_text='Paste JSON here to bulk upload questions. e.g., [{"text": "Q1", "choices": [{"text": "A", "is_correct": false}, ...]}]'
    )
    
    class Meta:
        verbose_name = 'Topic Name'
        verbose_name_plural = '3. Topic Names'
        
    def __str__(self):
        return f'{self.subject.name} - {self.name}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.bulk_upload_json and self.bulk_upload_json.strip():
            import json
            try:
                raw_json = self.bulk_upload_json.strip()
                data = json.loads(raw_json)
                if isinstance(data, dict):
                    data = data.get('questions') or data.get('mcqs') or data.get('data') or [data]
                
                if isinstance(data, list):
                    questions_objs = []
                    for item in data:
                        if not isinstance(item, dict):
                            continue
                        text = item.get('text') or item.get('question_text') or item.get('question') or ''
                        if not text:
                            continue
                        
                        choices = item.get('choices') or item.get('options') or item.get('answers') or []
                        
                        opt_a = opt_b = opt_c = opt_d = ""
                        correct_opt = 'A'
                        
                        if isinstance(choices, list) and len(choices) >= 4:
                            opt_a = choices[0]['text'] if isinstance(choices[0], dict) else str(choices[0])
                            opt_b = choices[1]['text'] if isinstance(choices[1], dict) else str(choices[1])
                            opt_c = choices[2]['text'] if isinstance(choices[2], dict) else str(choices[2])
                            opt_d = choices[3]['text'] if isinstance(choices[3], dict) else str(choices[3])
                            
                            answer_val = item.get('correct_option') or item.get('answer') or item.get('correct')
                            for idx, c in enumerate(choices[:4]):
                                is_c = False
                                if isinstance(c, dict):
                                    is_c = bool(c.get('is_correct') or c.get('correct'))
                                elif answer_val is not None:
                                    if str(answer_val).strip() == str(c).strip() or str(answer_val).strip().upper() == chr(65 + idx):
                                        is_c = True
                                if is_c:
                                    correct_opt = chr(65 + idx)
                        elif 'option_a' in item or 'optionA' in item or 'a' in item:
                            opt_a = item.get('option_a') or item.get('optionA') or item.get('a') or ""
                            opt_b = item.get('option_b') or item.get('optionB') or item.get('b') or ""
                            opt_c = item.get('option_c') or item.get('optionC') or item.get('c') or ""
                            opt_d = item.get('option_d') or item.get('optionD') or item.get('d') or ""
                            correct_opt = str(item.get('correct_option') or item.get('correct') or item.get('answer') or 'A').strip().upper()
                            if correct_opt not in ['A', 'B', 'C', 'D']:
                                correct_opt = 'A'
                        
                        if text and opt_a and opt_b:
                            questions_objs.append(TopicQuestion(
                                topic=self,
                                text=text,
                                option_a=opt_a,
                                option_b=opt_b,
                                option_c=opt_c or "-",
                                option_d=opt_d or "-",
                                correct_option=correct_opt
                            ))
                    if questions_objs:
                        with transaction.atomic():
                            TopicQuestion.objects.bulk_create(questions_objs, batch_size=1000)
                # Clear the field after successful upload
                TopicName.objects.filter(id=self.id).update(bulk_upload_json="")
            except Exception as e:
                print(f"Error processing bulk upload JSON: {e}")


class TopicQuestion(models.Model):
    topic = models.ForeignKey(TopicName, on_delete=models.CASCADE, related_name='questions', db_index=True)
    text = models.TextField(help_text='The MCQ Question text')
    option_a = models.CharField(max_length=200)
    option_b = models.CharField(max_length=200)
    option_c = models.CharField(max_length=200)
    option_d = models.CharField(max_length=200)
    
    CORRECT_CHOICES = [
        ('A', 'Option A'),
        ('B', 'Option B'),
        ('C', 'Option C'),
        ('D', 'Option D'),
    ]
    correct_option = models.CharField(max_length=1, choices=CORRECT_CHOICES)
    explanation = models.TextField(blank=True, null=True, help_text='Explanation for the correct answer')
    
    class Meta:
        verbose_name = 'Topic-wise Question'
        verbose_name_plural = '4. Topic-wise Questions'
        indexes = [
            models.Index(fields=['topic', 'id']),
        ]
        
    def __str__(self):
        return f'[{self.topic.name}] {self.text[:50]}...'

# ==========================================================================
# STUDY MATERIAL SYSTEM
# ==========================================================================

class StudyMaterialExam(models.Model):
    name = models.CharField(max_length=200, help_text='e.g., UPSC, BPSC, SSC')
    
    class Meta:
        verbose_name = 'Study Material Exam'
        verbose_name_plural = '1. Study Material Exams'
        
    def __str__(self):
        return self.name

class StudyMaterialSubject(models.Model):
    exam = models.ForeignKey(StudyMaterialExam, on_delete=models.CASCADE, related_name='materials_subjects', db_index=True)
    name = models.CharField(max_length=200, help_text='e.g., Modern History, Indian Polity')
    
    class Meta:
        verbose_name = 'Study Material Subject'
        verbose_name_plural = '2. Study Material Subjects'
        
    def __str__(self):
        return f'{self.exam.name} - {self.name}'

class StudyMaterialDocument(models.Model):
    subject = models.ForeignKey(StudyMaterialSubject, on_delete=models.CASCADE, related_name='documents', db_index=True)
    title = models.CharField(max_length=255, help_text='e.g., Chapter 1 Notes')
    file_link = models.URLField(max_length=1000, help_text='Google Drive or AWS S3 link to the PDF or Image')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    
    class Meta:
        verbose_name = 'Study Material Document'
        verbose_name_plural = '3. Study Material Documents'
        indexes = [
            models.Index(fields=['subject', '-created_at']),
        ]
        
    def __str__(self):
        return f'{self.subject.name} - {self.title}'
