from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Course, Subject, Syllabus, PYQ, Sub_Courses
from django.http import FileResponse, JsonResponse, Http404
from django.conf import settings
import os


@api_view(['GET'])
def course_api(request):

    course_id = request.GET.get('course_id')
    subject_id = request.GET.get('subject_id')
    pdf_request = request.GET.get('pdf') == "true"
    syllabus_list = request.GET.get('syllabus_list') == "true"
    syllabus_name = request.GET.get('syllabus')

    if not course_id and not subject_id:
        courses = Course.objects.prefetch_related('subjects').all()
        response_data = [
            {
                "id": course.id,
                "title": course.title,
                "subjects": [
                    {"id": subject.id, "title": subject.title}
                    for subject in course.subjects.all()
                ]
            }
            for course in courses
        ]
        return Response(response_data)


    try:
        course = Course.objects.prefetch_related('subjects').get(id=course_id)
        subject = Subject.objects.prefetch_related('exam_patterns', 'subject_contents').get(id=subject_id, course=course)
    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=404)
    except Subject.DoesNotExist:
        return Response({"error": "Subject not found"}, status=404)

    
    if pdf_request:
        if not subject.pdf_link:
            return Response({"error": "No PDF available for this subject"}, status=404)

        pdf_path = os.path.join(settings.MEDIA_ROOT, subject.pdf_link.name)
        if os.path.exists(pdf_path):
            return FileResponse(open(pdf_path, 'rb'), content_type='application/pdf')
        else:
            return Response({"error": "File not found"}, status=404)

    if syllabus_list:
        syllabi = Syllabus.objects.filter(subject=subject)
        data = [os.path.basename(syllabus.file.name) for syllabus in syllabi]
        return Response({"syllabus_list": data})

    if syllabus_name:
        syllabus_qs = Syllabus.objects.filter(subject=subject)
        for syllabus in syllabus_qs:
            if os.path.basename(syllabus.file.name) == syllabus_name:
                file_path = syllabus.file.path
                if os.path.exists(file_path):
                    return FileResponse(open(file_path, 'rb'), content_type='application/pdf')
                else:
                    return Response({"error": "File not found"}, status=404)
        return Response({"error": "Syllabus file not found for this subject"}, status=404)


    response_data = {
        "course": {
            "id": course.id,
            "title": course.title,
            "description": course.description,
            "banner": course.banner.url if course.banner else None,
            "subjects": [
                {
                    "id": subject.id,
                    "title": subject.title,
                    "description": subject.description,
                    "pdf_link": subject.pdf_link.url if subject.pdf_link else None,
                    "total_questions": subject.total_questions,
                    "total_marks": subject.total_marks,
                    "exam_patterns": [
                        {
                            "topics": ep.topics,
                            "sub_topics": ep.sub_topics,
                            "no_of_questions": ep.no_of_questions,
                            "maximum_marks": ep.maximum_marks,
                            "duration": ep.duration
                        }
                        for ep in subject.exam_patterns.all()
                    ],
                    "subject_contents": [
                        {
                            "title": sc.title,
                            "description": sc.description,
                            "reference_links": sc.reference_links
                        }
                        for sc in subject.subject_contents.all()
                    ]
                }
            ]
        }
    }
    
    return Response(response_data)


@api_view(['GET'])
def pyq_api(request):
    course_id = request.GET.get('course_id')
    sub_courses_id = request.GET.get('sub_courses')
    subject_id = request.GET.get('subject_id')
    file_name = request.GET.get('file')

    # ✅ Case 1: Return Sub-Courses with IDs and Titles
    if course_id and not sub_courses_id and not subject_id:
        try:
            course = Course.objects.get(id=course_id)
            sub_courses = course.sub_courses.all()
            subjects = course.subjects.all()

            subject_data = [{"id": subject.id, "title": subject.title} for subject in subjects]

            sub_course_data = []
            for sc in sub_courses:
                sub_course_data.append({
                    "id": sc.id,
                    "title": sc.title,
                    "subjects": subject_data  # all course subjects (shared)
                })
            return JsonResponse({course.title: sub_course_data})
        except Course.DoesNotExist:
            return JsonResponse({"error": "Course not found"}, status=404)

    # ✅ Case 2: Return PYQs grouped under subjects and sub-course
    if course_id and sub_courses_id and not file_name and not subject_id:
        try:
            course = Course.objects.get(id=course_id)
            sub_course = course.sub_courses.get(id=sub_courses_id)
        except (Course.DoesNotExist, Sub_Courses.DoesNotExist):
            return JsonResponse({"error": "Invalid course or sub-course ID"}, status=404)

        result = {course.title: {sub_course.title: []}}

        subjects = course.subjects.all()
        for subject in subjects:
            pyqs = subject.pyqs.all()
            pyq_files = [os.path.basename(pyq.file.name) for pyq in pyqs if pyq.file]

            if pyq_files:
                result[course.title][sub_course.title].append({
                    "id": subject.id,
                    subject.title: pyq_files
                })

        return JsonResponse(result)

    # ✅ Case 3: Serve a specific file
    if course_id and sub_courses_id and subject_id and file_name:
        try:
            course = Course.objects.get(id=course_id)
            sub_course = course.sub_courses.get(id=sub_courses_id)
            subject = course.subjects.get(id=subject_id)
            pyq = subject.pyqs.get(file__icontains=file_name)
            file_path = pyq.file.path

            if os.path.exists(file_path):
                return FileResponse(open(file_path, 'rb'), content_type='application/pdf')
            else:
                raise Http404("File not found")

        except (Course.DoesNotExist, Sub_Courses.DoesNotExist, Subject.DoesNotExist, PYQ.DoesNotExist):
            return JsonResponse({"error": "Invalid course, sub-course, subject, or file name"}, status=404)

    return JsonResponse({"error": "Invalid query parameters"}, status=400)