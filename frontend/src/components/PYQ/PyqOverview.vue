<!-- <template>
    <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading content, please wait...</p>
    </div>
    
    <div v-else-if="!isDataAvailable || error" class="not-available-container">
        <h2>Will be available soon</h2>
    </div>
    
    <div v-else class="content-box">
        <div class="bpscBook">
            <img :src="overviewData.bookImage" alt="BPSC Book Download">
        </div>
        <div class="text-content">
            <h2>{{ overviewData.title }}</h2>
            <p>{{ overviewData.description }}</p>
        </div>
    </div>
</template> -->

<script>
import axios from 'axios';

export default {
    name: 'PyqOverview',
    data() {
        return {
            overviewData: {},
            isLoading: true,
            error: null
        }
    },
    computed: {
        // Check if required data is available including the image
        isDataAvailable() {
            return this.overviewData && 
                   this.overviewData.title && 
                   this.overviewData.description &&
                   this.overviewData.bookImage;
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                this.isLoading = true;
                this.error = null;
                
                // Fetch overview data from API
                const response = await axios.get('https://cms.trehousingpublication.com/api/v2/?course_id=1&subject_id=1');
                this.overviewData = response.data || {};
                
            } catch (error) {
                console.error('Error fetching overview data:', error);
                this.error = true; // Just set error to true, no message needed
            } finally {
                this.isLoading = false;
            }
        }
    }
}
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

/* Not available message styles */
.not-available-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  text-align: center;
}

.not-available-container h2 {
  font-size: 24px;
  color: #6c757d;
}

/* Your existing styles can remain here */

.content-box{
    padding: 3vh 5vw 0;
}
.bpscBook {
    width: 100%;
    height: 420px;
}

.bpscBook img {
    width: 100%;
    height: 100%;
    object-fit: fill;
}
.text-content{
    width: 100%;

}
.text-content h2{
    font-size: 28px;
    color: #333399;
    font-family: 'Inter', sans-serif;
    margin-top: 20px;
    font-weight: 600;
    
}
.text-content p{
    font-size: 20px;
    font-family: 'Inter', sans-serif;

}

@media (max-width:700px){
    .bpscBook{
        height: 350px;
    }
    .text-content h2{
        font-size: 22px;
    }
    .text-content p{
        font-size: 17px;
    }
}
@media (max-width:550px){
    .bpscBook{
        height: 270px;
    }

}
@media (max-width:400px){
    .bpscBook{
        height: 200px;
    }
    .text-content h2{
        font-size: 18px;
    }
    .text-content p{
        font-size: 15px;
    }
}
</style>