<!-- <template>
  <div v-if="isLoading" class="loading-container">
    <div class="loading-spinner"></div>
    <p>Loading content, please wait...</p>
  </div>
  
  <div v-else class="p-6 bg-white rounded-lg shadow-md ml-3">
    <h2 class="text-xl font-bold mb-4">{{ title || 'Will be available soon' }}</h2>
    
    <ul v-if="syllabusTopics && syllabusTopics.length > 0" class="list-disc pl-5 space-y-2">
      <li v-for="(topic, index) in syllabusTopics" :key="index">
        {{ topic }}
      </li>
    </ul>
    <div v-else class="no-data-message">
      <p>Syllabus topics will be available soon</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BiharSyllabusComponent',
  data() {
    return {
      title: '',
      syllabusTopics: [],
      isLoading: true
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        
        // Fetch syllabus topics from API
        const response = await axios.get('https://cms.trehousingpublication.com/api/v2/?course_id=1&subject_id=1');
        
        if (response.data) {
          this.title = response.data.title || 'Bihar Computer Science Teacher Syllabus';
          this.syllabusTopics = response.data.topics || [];
        }
        
      } catch (error) {
        console.error('Error fetching syllabus topics:', error);
        // No error message shown to user, just empty data
        this.title = 'Bihar Computer Science Teacher Syllabus';
        this.syllabusTopics = [];
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
  height: 200px;
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

/* No data message styles */
.no-data-message {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 5px;
  text-align: center;
  margin: 10px 0;
  color: #6c757d;
}
</style> -->
