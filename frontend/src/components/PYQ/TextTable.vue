<!-- <template>
  <div v-if="isLoading" class="loading-container">
    <div class="loading-spinner"></div>
    <p>Loading content, please wait...</p>
  </div>
  
  <div v-else-if="!hasData" class="not-available-container">
    <h2>Will be available soon</h2>
  </div>
  
  <div v-else class="syllabus-container">
    
    <div class="syllabus-overview">
      <h2>{{ pageContent.overviewTitle || 'Bihar Computer Teacher Syllabus Overview' }}</h2>
      <p>{{ pageContent.overviewDescription || 'The Bihar Computer Science Teacher Recruitment 2023 is conducted by the Education Department of Bihar. The candidates must refer to the following table for more information on the Bihar Computer Science Teacher Syllabus.' }}</p> <br>
      <h2>{{ pageContent.examPatternTitle || 'Bihar Teacher Exam Pattern For Higher Secondary Teacher' }}</h2>
    </div>
    
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="category-col"></th>
            <th class="subject-col">Subject</th>
            <th class="questions-col">Total Questions</th>
            <th class="marks-col">Total Marks</th>
            <th class="duration-col">Duration</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(pattern, index) in examPatterns" :key="index">
            <template v-for="(item, i) in parsePattern(pattern)" :key="`${index}-${i}`">
              <tr>
                <td v-if="i === 0" :rowspan="parsePattern(pattern).length">{{ pattern.topics }}</td>
                <td>{{ item.sub_topic }}</td>
                <td>{{ item.questions }}</td>
                <td>{{ item.marks }}</td>
                <td v-if="i === 0" :rowspan="parsePattern(pattern).length">{{ pattern.duration }}hr</td>
              </tr>
            </template>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>{{ pageContent.totalQuestions || '220' }}</strong></td>
            <td><strong>{{ pageContent.totalMarks || '220' }}</strong></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
    
   
    <div class="additional-info">
      <h3>{{ pageContent.additionalTitle || 'Bihar Computer Science Teacher Syllabus for Higher Secondary Teacher' }}</h3><br>
      <h4>{{ pageContent.questionPatternTitle || 'Question Pattern - MCQ' }}</h4>
      <ul>
        <template v-if="pageContent.additionalPoints && pageContent.additionalPoints.length > 0">
          <li v-for="(point, index) in pageContent.additionalPoints" :key="index">
            {{ point }}
          </li>
        </template>
        <template v-else>
          <li>Paper 1 Language section is qualifying in nature.</li>
          <li>Paper 2 consists of two parts, Part-I and Part-II.</li>
          <li>
            Part-I is a Subject paper. Candidates have to opt for any one of the papers: Hindi, Urdu, English, Sanskrit, Bengali, Maithili, Magahi, Arabic, Persian, Bhojpuri, Pali, Prakrit, Mathematics, Physics, Chemistry, Botany, Zoology, History, Political Science, Geography, Economics, Sociology, Psychology, Philosophy, Home Science, Computer Science, Commerce Accountancy, Music & Entrepreneurship.
          </li>
          <li>
            The questions of the subject paper will be related to the syllabus of the Higher Secondary School but it's standard according to the prescribed minimum qualification of the candidate.
          </li>
          <li>
            Part-II is General Studies. It consists of Elementary Mathematics, General Awareness, General Science, Indian National Movements, and Geography.
          </li>
          <li>
            The questions of General Studies will be related to the syllabus of the Higher Secondary School but it's standard according to the prescribed minimum qualification of the candidate.
          </li>
          <li>There is no negative marking for the Language Section.</li>
          <li>For General Studies, there is a provision for Negative Marking for a wrong answer.</li>
        </template>
      </ul>
    </div>
  </div>
</template> -->

<script>
import axios from 'axios';

export default {
  name: 'SyllabusComponent',
  data() {
    return {
      examPatterns: [],
      pageContent: {},
      isLoading: true,
      error: null
    };
  },
  computed: {
    hasData() {
      return this.examPatterns && this.examPatterns.length > 0;
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    parsePattern(pattern) {
      const subTopics = pattern.sub_topics.split(",");
      const questions = pattern.total_questions.split(",");
      const marks = pattern.total_marks.split(",");
      
      return subTopics.map((sub, index) => ({
        sub_topic: sub.trim(),
        questions: questions[index]?.trim() || "-",
        marks: marks[index]?.trim() || "-",
      }));
    },
    async fetchData() {
      try {
        this.isLoading = true;
        this.error = null;
        
        // Use the same API endpoint and data structure as your working component
        const response = await axios.get("https://cms.trehousingpublication.com/api/v1/?course_id=1&subject_id=1");
        
        // Log the response to see what we're getting
        console.log('API Response:', response.data);
        
        // Access the exam patterns using the same path as your working component
        if (response.data && 
            response.data.course && 
            response.data.course.subjects && 
            response.data.course.subjects.length > 0 &&
            response.data.course.subjects[0].exam_patterns) {
          
          this.examPatterns = response.data.course.subjects[0].exam_patterns;
          console.log('Exam Patterns:', this.examPatterns);
          
          // Check if the API response contains page content
          if (response.data.course.subjects[0].page_content) {
            this.pageContent = response.data.course.subjects[0].page_content;
          } else if (response.data.page_content) {
            this.pageContent = response.data.page_content;
          } else {
            // Try to extract other content from the API response
            const subject = response.data.course.subjects[0];
            this.pageContent = {
              overviewTitle: subject.name || null,
              overviewDescription: subject.description || null,
              // Try to find other content in the API response
              // This is just a guess - adjust based on actual API structure
              additionalTitle: subject.syllabus_title || null,
              additionalPoints: subject.syllabus_points || []
            };
          }
          
          console.log('Page Content:', this.pageContent);
        } else {
          console.error('API response does not contain expected data structure');
          this.error = true;
        }
        
      } catch (error) {
        console.error('Error fetching syllabus data:', error);
        this.error = true;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
  
  <style scoped>
/* Loading styles */
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Not available message styles */
.not-available-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  text-align: center;
}

.not-available-container h2 {
  font-size: 24px;
  color: #6c757d;
}
/* Your existing styles can remain here */




  /* Table container with adjusted height and overflow */
  .table-container {
    width: 90%;
    max-width: 1200px;
    height: 600px; /* Original height */
    margin: 30px auto;
    overflow-x: auto; /* Enable horizontal scrolling */
  }


 /* Container for the entire syllabus content */
.syllabus-container {
  width: 90%; /* Match the table's width */
  max-width: 1200px;
  margin: 0 auto; /* Center the content */
}

/* Syllabus Overview Section */
.syllabus-overview {
  width: 100%; /* Take full width inside the container */
  text-align: left; /* Align text to the left */
}

.syllabus-overview h2 {
  color: #0073e6; /* Blue color for the upper section heading */
  font-size: 1.5rem; /* Font size for h2 heading */
}

.syllabus-overview p {
  color: #000000; /* Black color for paragraph */
  font-size: 1rem; /* Font size for paragraphs */
}

/* Table Container Styling */
.table-container {
  width: 100%;
  overflow-x: auto;
  margin: 30px auto;
}

/* Additional Information Section */
.additional-info h3 {
  color: #000000; /* Black color for lower section heading h3 */
  font-size: 1.5rem; /* Font size for h3 */
}

.additional-info h4 {
  color: #000000; /* Black color for lower section heading h4 */
  font-size: 1.25rem; /* Font size for h4 */
}

/* Additional Info Text */
.additional-info ul li {
  color: #444; /* Black color for list items */
  font-size: 1rem; /* Font size for list items */
}

/* Align text above and below the table with the table container width */
.text-above, .text-below {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left; /* Left-align the text */
}

/* Fix: Explicitly target the heading under text-below */
.text-below h3 {
  color: #000000; /* Black color for the heading under text-below */
  font-size: 1.5rem; /* Font size for h3 under text-below */
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  table-layout: fixed;
  height: 90%; /* Ensure the table fits inside the container */
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .syllabus-container {
    width: 93%;
    max-width: 100%;
  }
  table {
    font-size: 10px;
  }
  th, td {
    padding: 6px;
    font-size: 12px;
  }
}

  /* Table styling */
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    table-layout: fixed;
    height: 90%; /* Ensure the table fits inside the container */
  }
  
  /* Column width adjustments */
  .category-col {
    width: 45%;
  }
  
  .subject-col {
    width: 50%;
    text-align: left;
  }
  
  .questions-col {
    width: 20%;
  }
  
  .marks-col {
    width: 20%;
  }
  
  .duration-col {
    width: 15%; /* Reduced width */
  }
  
  /* Header styling */
  th {
    background-color: #f54254;
    color: white;
    padding: 18px;
    font-size: 17px;
    font-weight: bold;
  }
  
  /* Table cell styling */
  td {
    border: 1px solid #000;
    padding: 14px;
    font-size: 18px;
    font-weight: bold;
    height: 60px;
    vertical-align: middle;
    word-wrap: break-word; /* Allow text to break and wrap in the cell */
    overflow-wrap: break-word; /* Ensure long words break */
  }
  
  /* Footer (Total row) */
  tfoot td {
    font-weight: bold;
    background-color: #fff;
  }
  
  /* Only mobile adjustments */
  @media (max-width: 768px) {
    .table-container {
      width: 93%; /* Full width for mobile */
      height: auto; /* Allow height to adjust */
      margin: 10px; /* Reduced margin */
      overflow-x: auto; /* Allow horizontal scrolling if needed */
    }
  
    table {
      font-size: 10px; /* Reduce font size for mobile */
    }
  
    th, td {
      padding: 6px; /* Reduce padding */
      font-size: 12px; /* Make font size smaller */
    }
  
    .category-col,
    .subject-col,
    .questions-col,
    .marks-col,
    .duration-col {
      width: auto; /* Allow columns to adjust */
    }
  
    .table-container table {
      max-height: 350px; /* Reduce max height */
    }
  }
  </style>
