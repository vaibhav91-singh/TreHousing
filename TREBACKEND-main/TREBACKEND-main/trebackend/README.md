# TRE-Backend

---

### Key Endpoints

1. **Fetch All Courses with Subjects**
   - **URL**: `/api/v1/`
   - **Method**: `GET`
   - **Description**: Retrieves a list of all courses along with their subjects.
2. **Fetch Specific Course and Subject Details**
   - **URL**: `/api/v1/?course_id={course_id}&subject_id={subject_id}`
   - **Method**: `GET`
   - **Description**: Retrieves details of a specific course and subject, including exam patterns and subject contents.
3. **Get a PDF File**
   - **URL**: `/api/v1/?course_id={course_id}&subject_id={subject_id}&pdf=true`
   - **Method**: `GET`
   - **Description**: Downloads a PDF file for the requested subject if available.
4. **Fetch List of Syllabus Files**
   - **URL**: `/api/v1/?course_id={course_id}&subject_id={subject_id}&syllabus_list=true`
   - **Method**: `GET`
   - **Description**: Returns a list of syllabus filenames available for the specified subject.
5. **Download a Specific Syllabus PDF**
   - **URL**: `/api/v1/?course_id={course_id}&subject_id={subject_id}&syllabus={filename}`
   - **Method**: `GET`
   - **Description**: Returns the specified syllabus file as a PDF download for the given subject.
6. **Fetch All Sub-Courses of a Course with Subjects**
   - **URL**: `/api/v2/?course_id={course_id}`
   - **Method**: `GET`
   - **Description**: Returns a list of all sub-courses (with IDs and titles) under the specified course.
7. **Fetch All PYQs Categorized by Subject in a Sub-Course**
   - **URL**: `/api/v2/?course_id={course_id}&sub_courses={sub_course_id}`
   - **Method**: `GET`
   - **Description**: Returns a nested dictionary of PYQ files categorized by subject for the specified sub-course.
8. **Get a Specific PYQ PDF**
   - **URL**: `/api/v2/?course_id={course_id}&sub_courses={sub_course_id}&subject_id={subject_id}&file={filename}`
   - **Method**: `GET`
   - **Description**: If all the parameters are provided, returns the requested PDF file.

---

## Example Usage

### Fetch All Courses with Subjects

**Endpoint**: `GET /api/v1/`
**Response**:

```json
[
  {
    "id": 1,
    "title": "BPSC TRE",
    "subjects": [
      {
        "id": 14,
        "title": "PGT (11-12)"
      },
      {
        "id": 15,
        "title": "TGT (9-10)"
      }
    ]
  },
  {
    "id": 2,
    "title": "BIHAR STET",
    "subjects": [
      {
        "id": 12,
        "title": "STET 1 TGT (9-10)"
      },
      {
        "id": 13,
        "title": "STET 2 PGT (11-12)"
      }
    ]
  }
]
```

### Fetch Specific Course and Subject Details

**Endpoint**: `GET /api/v1/?course_id=1&subject_id=14`
**Response**:

```json
{
  "course": {
    "id": 1,
    "title": "BPSC TRE",
    "description": "The Bihar Public Service Commission Teacher Recruitment Exam (BPSC TRE) is a recruitment process conducted by the BPSC to hire teachers for government schools in Bihar. It's a competitive exam that aims to select qualified individuals for various teaching positions, including primary, secondary, and higher secondary levels.",
    "banner": "/media/banners/image.jpg",
    "subjects": [
      {
        "id": 14,
        "title": "PGT (11-12)",
        "description": "The BPSC TRE (Teacher Recruitment Examination) 11-12 refers to the recruitment process for Post Graduate Teachers (PGTs) in higher secondary schools (classes 11 and 12) in Bihar, conducted by the Bihar Public Service Commission (BPSC). The BPSC TRE PGT covers various subjects, including Languages (Hindi, Urdu, English, Sanskrit, Bengali, Maithili, Magahi, Arabic, Persian, Bhojpuri, Pali, Prakrit) Sciences (Mathematics, Physics, Chemistry, Botany, Zoology) Social Sciences (History, Political Science, Geography, Economics, Sociology, Psychology, Philosophy) Professional Subjects (Home Science, Computer Science, Commerce, Accountancy, Music, and Entrepreneurship.) Other Subjects (Fine Arts, Dance, Physical Education.).\r\nThe BPSC TRE (Teacher Recruitment Exam) for classes 11-12 involves three parts: Language (Part I), General Studies (Part II), and Subject Concerned (Part III). The exam is multiple-choice and worth a total of 150 marks.",
        "pdf_link": "/media/pdfs/BPSC_PGT_SYLLABUS_2025_3llyQrg.pdf",
        "total_questions": 150,
        "total_marks": 150,
        "exam_patterns": [
          {
            "topics": "PGT (11-12)",
            "sub_topics": "Part 1-Language, Part 2-General Studies, Part 3-Subject Specification",
            "no_of_questions": "30,40,80",
            "maximum_marks": "30,40,80",
            "duration": 2.3
          }
        ],
        "subject_contents": []
      }
    ]
  }
}
```

### Get a PDF File

**Endpoint**: `GET /api/v1/?course_id=1&subject_id=14&pdf=true`
**Response**: Returns the requested PDF file if found else returns an error.

```json
{
    "error": "No PDF available for this subject"
}
{
    "error": "File not found"
}
```

### Fetch List of Syllabus Files

**Endpoint**: `GET /api/v1/?course_id=2&subject_id=12&syllabus_list=true`
**Response**: Returns a list of syllabus filenames available for the specified subject.

```json
{
  "syllabus_list": [
    "103-Bangla.pdf",
    "104-Maithili.pdf",
    "106-Arabic.pdf",
    "107-Persian.pdf",
    "109-English.pdf",
    "110-Mathematics.pdf",
    "111-Science.pdf",
    "112-Social-Studies.pdf",
    "114-Music.pdf",
    "115-Fine-Arts.pdf",
    "116-Nritya.pdf",
    "101-Hindi.pdf",
    "102-Urdu.pdf",
    "105-Sanskrit.pdf",
    "108-Bhojpuri.pdf"
  ]
}
```

### Download a Specific Syllabus PDF

**Endpoint**: `GET /api/v1/?course_id=2&subject_id=12&syllabus=106-Arabic_pF7Gi5y.pdf`
**Response**: Returns the requested syllabus file if found else returns an error.

```json
{
    "error": "File not found"
}
{
    "error": "Syllabus file not found for this subject"
}
```

### Fetch All Sub-Courses of a Course with Subjects

**Endpoint**: `GET /api/v2/?course_id=1`
**Response**:

```json
{
  "BPSC TRE": [
    {
      "id": 1,
      "title": "BPSC TRE 1.0",
      "subjects": [
        {
          "id": 14,
          "title": "PGT (11-12)"
        }
      ]
    },
    {
      "id": 2,
      "title": "BPSC TRE 2.0",
      "subjects": [
        {
          "id": 14,
          "title": "PGT (11-12)"
        },
        {
          "id": 15,
          "title": "TGT (9-10)"
        }
      ]
    },
    {
      "id": 3,
      "title": "BPSC TRE 3.0",
      "subjects": [
        {
          "id": 14,
          "title": "PGT (11-12)"
        }
      ]
    }
  ]
}
```

### Fetch All PYQs Categorized by Subject in a Sub-Course

**Endpoint**: `GET /api/v2/?course_id=1&sub_courses=1`
**Response**:

```json
{
  "BPSC TRE": {
    "BPSC TRE 1.0": [
      {
        "id": 14,
        "PGT (11-12)": [
          "BPSC-Question-Paper-For-Class-11-12-Chemistry_SnMzKD4.pdf",
          "BPSC-Question-Paper-For-Class-11-12-Zoology_ZERDdqL.pdf"
        ]
      },
      {
        "id": 15,
        "TGT (9-10)": [
          "BPSC-Question-Paper-For-Class-9-10-Maths_LNLYxyz.pdf",
          "BPSC-Question-Paper-For-Class-9-10-Arabic.pdf"
        ]
      },
      {
        "id": 16,
        "UPPER PRT (6-8)": [
          "BPSC-Question-Paper-For-Class-6-8-English_UVQtBRB.pdf",
          "BPSC-Question-Paper-For-Class-6-8-English_1_0sEl3Z5.pdf"
        ]
      },
      {
        "id": 17,
        "PRT (1-5)": [
          "BPSC-Question-Paper-For-Class-1-5-General-Studies_1_ax2Rp8t.pdf"
        ]
      }
    ]
  }
}
```

### Get a Specific PYQ PDF

**Endpoint**: `GET /api/v2/?course_id=1&sub_courses=1&subject_id=14&file=BPSC-Question-Paper-For-Class-11-12-Chemistry_SnMzKD4.pdf`
**Response**: Returns the requested PDF file or an error message.

```json
{
  "error": "File not found"
}
```

---

## Project setup

### Navigate to root of the project

```
cd ./
```

### Create and Activate Virtual Environment

```
python -m venv venv
venv\Scripts\activate
```

### Install Dependencies

```
python -m pip install Django
pip install djangorestframework
pip install pillow
```

### Run the Migrations

Navigate to the Django project directory:

```
cd trebackend
```

Run the following commands:

```
python manage.py makemigrations
python manage.py migrate
```

### Run Django Server

```
python manage.py runserver
```
