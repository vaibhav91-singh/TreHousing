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
