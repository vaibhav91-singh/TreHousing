from django.db import models
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
import os

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    banner = models.ImageField(
        upload_to='banners/',
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])]
    )

    def __str__(self):
        return self.title

class Sub_Courses(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="sub_courses")
    title = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.title}"

class Subject(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='subjects')
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
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='exam_patterns')
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
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="subject_contents")
    title = models.CharField(max_length=255) 
    description = models.TextField()  
    reference_links = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.subject.title} - {self.title}"
    
    class Meta:
        verbose_name_plural = "Subject Content"


class PYQ(models.Model):
    subject = models.ForeignKey(Subject, related_name="pyqs", on_delete=models.CASCADE)
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
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="syllabus_files")
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
# RE-ENGINEERED: ORIGINAL QUIZ SYSTEM INTEGRATION
# ==========================================================================

class Quiz(models.Model):
    # Comma hat gaya hai
    category = models.CharField(max_length=100, default="General") 
    
    subject = models.ForeignKey(
        'Subject', 
        on_delete=models.CASCADE, 
        related_name='quizzes',
        null=True, 
        blank=True
    )
    title = models.CharField(max_length=200) 
    description = models.TextField(blank=True)

    def __str__(self):
        if self.subject:
            return f"[{self.subject.title}] {self.title}"
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    text = models.CharField(max_length=500) 

    def __str__(self):
        return f"{self.quiz.title} - {self.text[:50]}..."

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(max_length=200) 
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

# ==========================================================================
# NEW FEATURE: CLOUD-LINKED SOLVED PAPERS ARCHITECTURE
# ==========================================================================

class SolvedPaper(models.Model):
    # Subject ke sath mapping taaki filtering asaan ho
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="solved_papers")
    title = models.CharField(max_length=255, help_text="e.g. UPSC 2024 Prelims GS Paper")
    year = models.IntegerField(help_text="e.g. 2024") 
    paper_link = models.URLField(max_length=1000, verbose_name="Paper Link", help_text="Google Drive or AWS S3 link for the Question Paper.")
    answer_key_link = models.URLField(max_length=1000, verbose_name="Answer Key Link", help_text="Google Drive or AWS S3 link for the Answer Key.", blank=True, null=True)
    linked_mock = models.ForeignKey('Quiz', on_delete=models.SET_NULL, null=True, blank=True, related_name="linked_papers", verbose_name="Linked Mock Test", help_text="Select a Mock Test to link with this paper.")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} ({self.year})"
        
    class Meta:
        verbose_name = "Past Paper / Answer Key"
        verbose_name_plural = "Past Papers & Answer Keys"

#==============================================================
#JOB VACANCY
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
    apply_date = models.DateField()
    last_date = models.DateField()
    official_website = models.URLField()
    status = models.BooleanField(default=True) # Active/Inactive
    apply_link= models.URLField()
    
    # New fields for Govt Exam Hub UI
    category_badge = models.CharField(max_length=50, blank=True, null=True, help_text="e.g., BPSC, SSC, UPSC")
    vacancy_count = models.CharField(max_length=100, blank=True, null=True, help_text="e.g., 600+ Vacancies")
    qualification = models.CharField(max_length=100, blank=True, null=True, help_text="e.g., Graduation, 10th Pass")
    
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES, default='GOVT')

    class Meta:
        verbose_name_plural = "Job Vacancies"
        ordering = ['-apply_date']

    def __str__(self):
        return f"{self.title} - {self.organization}"

#==============================================================
# RECENT UPDATES (For Job Vacancy Hub)
#==============================================================
class RecentUpdate(models.Model):
    title = models.CharField(max_length=255, help_text="e.g. BPSC 68th Mains Result Declared")
    description = models.CharField(max_length=500, blank=True, null=True, help_text="Check your merit list and cut-off marks")
    link = models.URLField(max_length=1000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

# ==========================================================================
# NEW FEATURE: TOPIC-WISE MCQ SYSTEM
# ==========================================================================

class TopicExam(models.Model):
    name = models.CharField(max_length=200, help_text='e.g., UPSC, SSC CGL')
    
    class Meta:
        verbose_name = 'Topic-wise Exam'
        verbose_name_plural = '1. Topic-wise Exams'
        
    def __str__(self):
        return self.name

class TopicSubject(models.Model):
    exam = models.ForeignKey(TopicExam, on_delete=models.CASCADE, related_name='subjects')
    name = models.CharField(max_length=200, help_text='e.g., History, Geography')
    
    class Meta:
        verbose_name = 'Topic-wise Subject'
        verbose_name_plural = '2. Topic-wise Subjects'
        
    def __str__(self):
        return f'{self.exam.name} - {self.name}'

class TopicName(models.Model):
    subject = models.ForeignKey(TopicSubject, on_delete=models.CASCADE, related_name='topics')
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
        if self.bulk_upload_json:
            import json
            try:
                data = json.loads(self.bulk_upload_json)
                for item in data:
                    text = item.get('text', '')
                    choices = item.get('choices', [])
                    
                    if len(choices) >= 4:
                        opt_a = choices[0]['text']
                        opt_b = choices[1]['text']
                        opt_c = choices[2]['text']
                        opt_d = choices[3]['text']
                        
                        correct_opt = 'A'
                        if choices[1].get('is_correct'): correct_opt = 'B'
                        elif choices[2].get('is_correct'): correct_opt = 'C'
                        elif choices[3].get('is_correct'): correct_opt = 'D'
                        
                        TopicQuestion.objects.create(
                            topic=self,
                            text=text,
                            option_a=opt_a,
                            option_b=opt_b,
                            option_c=opt_c,
                            option_d=opt_d,
                            correct_option=correct_opt
                        )
                # Clear the field after successful upload
                TopicName.objects.filter(id=self.id).update(bulk_upload_json="")
            except Exception as e:
                print(f"Error processing bulk upload JSON: {e}")

class TopicQuestion(models.Model):
    topic = models.ForeignKey(TopicName, on_delete=models.CASCADE, related_name='questions')
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
class Quiz(models.Model):
    # Comma hat gaya hai
    category = models.CharField(max_length=100, default="General") 
    
    subject = models.ForeignKey(
        'Subject', 
        on_delete=models.CASCADE, 
        related_name='quizzes',
        null=True, 
        blank=True
    )
    title = models.CharField(max_length=200) 
    description = models.TextField(blank=True)
    display_questions_limit = models.IntegerField(blank=True, null=True, help_text="Number of questions to show to the user (e.g. 50). Leave blank to show all.")

    def __str__(self):
        if self.subject:
            return f"[{self.subject.title}] {self.title}"
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    text = models.CharField(max_length=500) 

    def __str__(self):
        return f"{self.quiz.title} - {self.text[:50]}..."

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(max_length=200) 
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

# ==========================================================================
# NEW FEATURE: CLOUD-LINKED SOLVED PAPERS ARCHITECTURE
# ==========================================================================

class SolvedPaper(models.Model):
    # Subject ke sath mapping taaki filtering asaan ho
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="solved_papers")
    title = models.CharField(max_length=255, help_text="e.g. UPSC 2024 Prelims GS Paper")
    year = models.IntegerField(help_text="e.g. 2024") 
    paper_link = models.URLField(max_length=1000, verbose_name="Paper Link", help_text="Google Drive or AWS S3 link for the Question Paper.")
    answer_key_link = models.URLField(max_length=1000, verbose_name="Answer Key Link", help_text="Google Drive or AWS S3 link for the Answer Key.", blank=True, null=True)
    linked_mock = models.ForeignKey('Quiz', on_delete=models.SET_NULL, null=True, blank=True, related_name="linked_papers", verbose_name="Linked Mock Test", help_text="Select a Mock Test to link with this paper.")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} ({self.year})"
        
    class Meta:
        verbose_name = "Past Paper / Answer Key"
        verbose_name_plural = "Past Papers & Answer Keys"

#==============================================================
#JOB VACANCY
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
    apply_date = models.DateField()
    last_date = models.DateField()
    official_website = models.URLField()
    status = models.BooleanField(default=True) # Active/Inactive
    apply_link= models.URLField()
    
    # New fields for Govt Exam Hub UI
    category_badge = models.CharField(max_length=50, blank=True, null=True, help_text="e.g., BPSC, SSC, UPSC")
    vacancy_count = models.CharField(max_length=100, blank=True, null=True, help_text="e.g., 600+ Vacancies")
    qualification = models.CharField(max_length=100, blank=True, null=True, help_text="e.g., Graduation, 10th Pass")
    
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES, default='GOVT')

    class Meta:
        verbose_name_plural = "Job Vacancies"
        ordering = ['-apply_date']

    def __str__(self):
        return f"{self.title} - {self.organization}"

#==============================================================
# RECENT UPDATES (For Job Vacancy Hub)
#==============================================================
class RecentUpdate(models.Model):
    title = models.CharField(max_length=255, help_text="e.g. BPSC 68th Mains Result Declared")
    description = models.CharField(max_length=500, blank=True, null=True, help_text="Check your merit list and cut-off marks")
    link = models.URLField(max_length=1000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

# ==========================================================================
# NEW FEATURE: TOPIC-WISE MCQ SYSTEM
# ==========================================================================

class TopicExam(models.Model):
    name = models.CharField(max_length=200, help_text='e.g., UPSC, SSC CGL')
    
    class Meta:
        verbose_name = 'Topic-wise Exam'
        verbose_name_plural = '1. Topic-wise Exams'
        
    def __str__(self):
        return self.name

class TopicSubject(models.Model):
    exam = models.ForeignKey(TopicExam, on_delete=models.CASCADE, related_name='subjects')
    name = models.CharField(max_length=200, help_text='e.g., History, Geography')
    
    class Meta:
        verbose_name = 'Topic-wise Subject'
        verbose_name_plural = '2. Topic-wise Subjects'
        
    def __str__(self):
        return f'{self.exam.name} - {self.name}'

class TopicName(models.Model):
    subject = models.ForeignKey(TopicSubject, on_delete=models.CASCADE, related_name='topics')
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
        if self.bulk_upload_json:
            import json
            try:
                data = json.loads(self.bulk_upload_json)
                for item in data:
                    text = item.get('text', '')
                    choices = item.get('choices', [])
                    
                    if len(choices) >= 4:
                        opt_a = choices[0]['text']
                        opt_b = choices[1]['text']
                        opt_c = choices[2]['text']
                        opt_d = choices[3]['text']
                        
                        correct_opt = 'A'
                        if choices[1].get('is_correct'): correct_opt = 'B'
                        elif choices[2].get('is_correct'): correct_opt = 'C'
                        elif choices[3].get('is_correct'): correct_opt = 'D'
                        
                        TopicQuestion.objects.create(
                            topic=self,
                            text=text,
                            option_a=opt_a,
                            option_b=opt_b,
                            option_c=opt_c,
                            option_d=opt_d,
                            correct_option=correct_opt
                        )
                # Clear the field after successful upload
                TopicName.objects.filter(id=self.id).update(bulk_upload_json="")
            except Exception as e:
                print(f"Error processing bulk upload JSON: {e}")

class TopicQuestion(models.Model):
    topic = models.ForeignKey(TopicName, on_delete=models.CASCADE, related_name='questions')
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
        
    def __str__(self):
        return f'[{self.topic.name}] {self.text[:50]}...'

# ==========================================================================
# NEW FEATURE: STUDY MATERIAL SYSTEM
# ==========================================================================

class StudyMaterialExam(models.Model):
    name = models.CharField(max_length=200, help_text='e.g., UPSC, BPSC, SSC')
    
    class Meta:
        verbose_name = 'Study Material Exam'
        verbose_name_plural = '1. Study Material Exams'
        
    def __str__(self):
        return self.name

class StudyMaterialSubject(models.Model):
    exam = models.ForeignKey(StudyMaterialExam, on_delete=models.CASCADE, related_name='materials_subjects')
    name = models.CharField(max_length=200, help_text='e.g., Modern History, Indian Polity')
    
    class Meta:
        verbose_name = 'Study Material Subject'
        verbose_name_plural = '2. Study Material Subjects'
        
    def __str__(self):
        return f'{self.exam.name} - {self.name}'

class StudyMaterialDocument(models.Model):
    subject = models.ForeignKey(StudyMaterialSubject, on_delete=models.CASCADE, related_name='documents')
    title = models.CharField(max_length=255, help_text='e.g., Chapter 1 Notes')
    file_link = models.URLField(max_length=1000, help_text='Google Drive or AWS S3 link to the PDF or Image')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Study Material Document'
        verbose_name_plural = '3. Study Material Documents'
        
    def __str__(self):
        return f'{self.subject.name} - {self.title}'
