<!-- <template>
  <div class="container">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading content, please wait...</p>
    </div>

    <div v-else-if="!isDataAvailable || error" class="not-available-container">
      <h2>Will be available soon</h2>
    </div>

    <div v-else class="content-wrapper">
      <div class="content">
        <div class="main-content">
          <div class="content-bpsc">
            <h2 class="fourZero">{{ pageData.title }}</h2>
            <p class="bpsc-italic">{{ pageData.description }}</p>
            <div class="bpscImg">
              <img :src="pageData.headerImage" alt="BPSC Previous Year Question Paper">
            </div>
            <p class="bpsc-normal">{{ pageData.introText }}</p>
          </div>
          <div class="content-bpsc">
            <h2 class="threeZero">{{ pageData.secondaryTitle }}</h2>
            <p class="bpsc-normal">{{ pageData.secondaryDescription }}</p>
            <p class="bpsc-normal">{{ pageData.additionalInfo }}</p>
          </div>
          <div class="trePYQtable">
            <table>
              <thead>
                <tr class="tble-hed">
                  <td colspan="2">{{ pageData.tableTitle || 'BPSC TRE 3.0 Question Papers 2024 PDFs' }}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in questionPapers" :key="index" class="rowData">
                  <td class="cell-text">{{ row.category }}</td>
                  <td>
                    <ul>
                      <li v-for="(paper, paperIndex) in row.papers" :key="paperIndex">
                        {{ paper.title }}
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="sidebar">
        <h3 class="latest-news-title">{{ sidebarData.notification1Title || 'CSIR NET 2025' }}</h3>
        <ul class="news-list">
          <li v-for="news in notification1" :key="news.id" class="dropdown">
            <div class="dropdown-btn" @click="toggleDropdown(news.id)">
              <span :class="{ rotate: openDropdown === news.id }"> > </span>{{ news.title }}
            </div>
            <ul v-if="openDropdown === news.id" class="dropdown-content">
              <li v-for="link in news.links" :key="link.id">
                <a :href="link.url" target="_blank">
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <h3 class="latest-news-title">{{ sidebarData.notification2Title || 'CTET 2024 EXAM' }}</h3>
        <ul class="news-list">
          <li v-for="news in notification2" :key="news.id" class="dropdown">
            <div class="dropdown-btn" @click="toggleDropdown(news.id)">
              <span :class="{ rotate: openDropdown === news.id }"> > </span>{{ news.title }}
            </div>
            <ul v-if="openDropdown === news.id" class="dropdown-content">
              <li v-for="link in news.links" :key="link.id">
                <a :href="link.url" target="_blank">
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <div class="mock-test">
          <div v-for="(test, index) in mockTests" :key="index" :class="`test-card ${test.cardClass}`">
            <a :href="test.url" target="_blank">
              <img :src="test.image" :alt="test.alt" />
            </a>
            <p>{{ test.description }}</p>
            <span class="price">{{ test.price }}</span>
          </div>
        </div>

        <div class="referral">
          <a :href="sidebarData.referralLink || '#'" target="_blank">
            <img :src="sidebarData.referralImage" alt="Refer and Earn" />
          </a>
        </div>

        <div class="syllabus">
          <a :href="sidebarData.syllabusLink || '#'" target="_blank">
            <img :src="sidebarData.syllabusImage" alt="BPSC Syllabus 2024" />
          </a>
        </div>

        <div class="recent-posts">
          <h2>Recent Post</h2>
          <ul>
            <li v-for="(post, index) in recentPosts" :key="index">
              {{ post.title }}
              <a v-if="post.link" :href="post.link" target="_blank">{{ post.linkText }}</a>
              {{ post.suffix || '' }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template> -->

  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LeftRIght',
    data() {
        return {
            openDropdown: null,
            // Data that will be populated from API
            pageData: {},
            questionPapers: [],
            sidebarData: {},
            mockTests: [],
            recentPosts: [],
            notification1: [],
            notification2: [],
            isLoading: true,
            error: null
        };
    },
    computed: {
        // Check if ALL required data is available
        isDataAvailable() {
            // Check if pageData has required fields including the image
            const hasPageData = this.pageData && 
                               this.pageData.title && 
                               this.pageData.description && 
                               this.pageData.introText &&
                               this.pageData.headerImage;
            
            // Check if question papers data exists
            const hasQuestionPapers = this.questionPapers && 
                                     this.questionPapers.length > 0;
            
            // Check if notifications data exists
            const hasNotifications = (this.notification1 && this.notification1.length > 0) && 
                                    (this.notification2 && this.notification2.length > 0);
            
            // Check if mock tests data exists with images
            const hasMockTests = this.mockTests && 
                                this.mockTests.length > 0 &&
                                this.mockTests.every(test => test.image);
            
            // Check if recent posts data exists
            const hasRecentPosts = this.recentPosts && 
                                  this.recentPosts.length > 0;
            
            // Check if sidebar images exist
            const hasSidebarImages = this.sidebarData &&
                                    this.sidebarData.referralImage &&
                                    this.sidebarData.syllabusImage;
            
            // Return true only if ALL data is available
            return hasPageData && hasQuestionPapers && hasNotifications && 
                   hasMockTests && hasRecentPosts && hasSidebarImages;
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        toggleDropdown(id) {
            this.openDropdown = this.openDropdown === id ? null : id;
        },
        async fetchData() {
            try {
                this.isLoading = true;
                this.error = null;
                
                // Base API URL
                const baseUrl = 'https://cms.trehousingpublication.com/api/v2/?course_id=1&subject_id=1';
                
                // Fetch all data in parallel for better performance
                const [
                    pageResponse, 
                    papersResponse, 
                    sidebarResponse, 
                    notificationsResponse,
                    mockTestsResponse,
                    recentPostsResponse
                ] = await Promise.all([
                    axios.get(`${baseUrl}/pyq-page`),
                    axios.get(`${baseUrl}/question-papers`),
                    axios.get(`${baseUrl}/sidebar-data`),
                    axios.get(`${baseUrl}/notifications`),
                    axios.get(`${baseUrl}/mock-tests`),
                    axios.get(`${baseUrl}/recent-posts`)
                ]);
                
                // Set data from responses
                this.pageData = pageResponse.data || {};
                this.questionPapers = papersResponse.data || [];
                this.sidebarData = sidebarResponse.data || {};
                
                const notificationsData = notificationsResponse.data || {};
                this.notification1 = notificationsData.csirNet || [];
                this.notification2 = notificationsData.ctet || [];
                
                this.mockTests = mockTestsResponse.data || [];
                this.recentPosts = recentPostsResponse.data || [];
                
            } catch (error) {
                console.error('Error fetching data:', error);
                this.error = true; // Just set error to true, no message needed
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
  
  /* Layout */
  .container {
    display: flex;
    gap: 20px;
    /* padding: 0 30px; */
    width: 100%;
    max-width: 100%;
    padding: 3vh 5vw 0;
  }
  
  /* Sidebar Styling */
  .sidebar {
    width: 25%;
    /* padding-right: 30px; */
    margin-top: 130px;
  /* margin-bottom: 0; */
  }
  
  /* Latest News Title */
  .latest-news-title {
    background-color: #ff3b5c;
    color: white;
    padding: 5px;
    font-weight: bold;
    margin: 0;
    border: 1px solid #7A7A7A;
    border-bottom: none;
  
  }
  
  /* News List */
  .news-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #7A7A7A;
    font-size: 16px;
    padding: 10px 0;
    margin-bottom: 10px;
  }
  
  /* Dropdown Styling */
  .dropdown {
    position: relative;
  }
  
  /* Dropdown Button */
  .dropdown-btn {
    display: flex;
    align-items: center;
    padding: 8px 8px;
    cursor: pointer;
    font-size: 20px;
    color: black;
    font-weight: 500;
    border-radius: 5px;
  
  }
  
  
  .dropdown-btn span {
    margin-right: 10px;
    transition: transform 0.3s ease;
  }
  
  .rotate {
    transform: rotate(90deg);
  }
  
  /* Dropdown Content */
  .dropdown-content {
    padding: 0;
    border-radius: 5px;
    list-style: none;
  }
  
  .dropdown-content li {
    padding: 5px 25px;
    margin-left: 15px;
    font-size: 18px;
  
  }
  
  .dropdown-content li:hover {
    background: #dfdcdc;
    /* padding: 5px; */
    border-radius: 5px;
    width: auto;
  }
  
  .dropdown-content a {
    text-decoration: none;
    color: black;
    display: block;
  }
  
  /* Content Section */
  .content {
    flex: 1;
    /* padding: 18px; */
    
  }
  
  
  
  /* Ensure proper alignment in the container */
  
  
  
  .mock-test {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
   
  }
  
  .test-card {
    width: 100%;
    text-align: center;
    padding: 20px;
    /* border-radius: 8px; */
   
  }
  
  .test-card p {
    font-size: 16px;
    /* font-weight: bold; */
    /* margin-top: 5px; */
  }
  
  .blue-card {
    background-color: #F6FBFF;
    
    color: black;
    border: 1px solid #86A1AE;
    padding: 20px 20px;
    overflow: hidden;
  }
  
  .blue-card img
  {
    width: 70%;
    height: 220px;
    /* border-radius: 0; */
    object-fit: cover;
    
  
  }
  .orange-card {
    background-color: #F6FBFF;
    color: black;
    border: 1px solid #86A1AE;
  }
  
  .orange-card img
  {
    width: 100%;
    max-height: 200px;
    padding: auto;
    object-fit: cover;
    
  
  }
  
  /* .test-card img {
    width: 100%;
    max-height: 200px;
  
  } */
  
  .price {
    display: block;
    font-size: 18px;
    font-weight: bold;
    /* margin-top: 5px; */
  }
  
  .referral,
  .syllabus {
    text-align: center;
    margin: 10px 0;
    border: 1px solid #86A1AE;
  }
  
  .referral img,
  .syllabus img {
    width: 100%;
    /* border-radius: 5px; */
  }
  
  
  .recent-posts {
    background-color: #f9f9f9;
    /* padding: 15px; */
    
    background-color: #D6E0E2;
    
   
  }
  
  .recent-posts h2 {
    background-color: #F94B4B;
    color: white;
    padding: 0 10px;
    /* margin: -15px -15px 10px; */
    
  }
  
  .recent-posts ul {
    /* list-style: none; */
    padding: 0 40px;
   
    /* height:100vh; */
    text-align: justify;
    
  
  }
  
  .recent-posts li {
    margin: 5px 0;
    color: black;
  
    
    
  }
  
  .recent-posts a {
    text-decoration: none;
    color: red;
  }
  
  
  
  
  /* Responsive Media Queries */
  @media screen and (max-width: 768px) {
    .container {
        
        /* padding: 0; */
        flex-direction: row;
        
    
    }
   
  
    .sidebar {
        width: 30%;
        /* padding-right: 0;   */
        
    }
  
  
    .dropdown-btn {
        font-size: 16px;
    }
  
    .dropdown-content li {
        font-size: 16px;
        padding: 0 10px;
  
    }
  
    .latest-news-title {
        font-size: 18px;
    }
  
  
  
    .mock-test {
        gap: 5px;
    }
  
   
  
    .test-card p {
        font-size: 12px;
    }
  
    
  
    .blue-card {
    background-color: #F6FBFF;
    color: black;
    border: 1px solid #86A1AE;
    padding: 20px 20px;
    /* overflow: hidden; */
  }
  
  .blue-card img
  {
    width: 100%;
    height: 200px;
    /* border-radius: 0; */
    object-fit: fill;
    overflow: hidden;
    background-color: #5f4adb;
    
  
  }
  
  .orange-card {
    background-color: #F6FBFF;
    color: black;
    border: 1px solid #86A1AE;
   
  }
  
  .orange-card img
  {
    width: 100%;
    max-height: 200px;
    padding: auto;
    object-fit: cover;
    overflow: hidden;
    background-color: orange;
    
    
  
  }
  
  
    .price {
        font-size: 16px;
    }
  
    .referral,
    .syllabus {
        /* margin: 10px 0; */
        margin-top: 5px;
       
    }
    .recent-posts
    {
      padding: 0;
      
    }
  
    .recent-posts h2 {
        font-size: 18px;
        padding: 5px 10px;
    }
  
    .recent-posts ul {
        padding: 0 30px;  
        /* padding-right: 10px; */
        font-size: 14px;
        /* margin: -5px;     */
       
    }
  
  }
  
  @media screen and (max-width: 480px) {
  
    .container {
        flex-direction: column;
        padding: 0 15px;
    }
  
    .sidebar {
        width: 100%;
        margin: 0;
    }
  
    .content {
        padding-left: 0;
        width: 100%;
    }
  
    .dropdown-btn {
        font-size: 14px;
    }
  
    .dropdown-content li {
        font-size: 14px;
    }
  
  
  
  
    .test-card {
        padding: 10px;
    }
  
    .test-card p {
        font-size: 12px;
    }
  
    
  .blue-card {
    background-color: #F6FBFF;
    /* color: black; */
    border: 1px solid #86A1AE;
    padding: 20px 20px;
    overflow: hidden;
  }
  
  .blue-card img
  {
    width: 100%;
    height: 200px;
    /* border-radius: 0; */
    object-fit: fill;
    
  
  }
  
  
  
  
  
  
    .price {
        font-size: 14px;
    }
  
  
  
    .recent-posts h2 {
        font-size: 16px;
        padding: 5px 10px;
    }
  
    .recent-posts ul {
        padding: 3px 20px;
    }
  
  
  }
  
  /* leftside css */
  
  /* .main-content {
    padding: 2vh 5vw;
  } */
  
  .content-bpsc {
    width: 100%;
  }
  
  .bpscImg img {
    width: 90%;
  }
  
  .content-bpsc .fourZero {
    font-size: 28px;
    font-weight: bold;
  }
  
  .content-bpsc .bpsc-italic {
    font-size: 22px;
    font-style: italic;
    text-align: justify;
  }
  
  .content-bpsc .bpsc-normal {
    font-size: 20px;
    margin-top: 15px;
    text-align: justify;
  }
  
  .content-bpsc .threeZero {
    font-size: 28px;
    color: #333399;
  
  }
  
  /* TRE 3.0 table  */
  table {
    /* border: 1px solid black; */
    border-collapse: collapse;
    width: 98%;
  }
  
  table .rowData td {
    border: 1px solid black;
   
    height: 175px;
  }
  
  
  
  .tble-hed td {
    text-align: center;
    background: #FC3A52;
    padding: 20px;
    font-weight: 667;
    color: #FFFFFF;
    font-size: 28px;
  }
  
  
  
  .rowData ul li {
    font-size: 20px;
    text-decoration: underline;
    color: #2600FF;
    cursor: pointer;
    transition-duration: 0.1s;
    width: 350px;
   
  
  }
  
  .rowData ul li:hover {
    font-weight: 600;
    color: red;
  }
  
  .cell-text {
    text-align: center;
    /* Horizontally centers content */
    vertical-align: middle;
    /* Vertically centers content */
    padding: 8px;
    /* Optional: adds space inside cells */
    border: 1px solid #ddd;
    font-size: 20px;
    font-weight: 700;
   
  }
  
  @media(max-width: 880px) {
    .container {
        
       
        padding: 0 40px;
    }
    .content-bpsc {
        width: 100%;
        /* padding: 50px; */
    }
  
    table {
        width: 100%;
    }
    table .rowData td { 
    height: 100%;
    font-size: 18px;
  
  }
  
    .rowData ul li {
        width: auto;
        font-size: 17px;
    } 
  }
  
  @media(max-width: 680px) {
    .content-bpsc {
        width: 100%;
    }
  
    table {
        width: 100%;
    }
  
    .content-bpsc .fourZero {
        font-size: 20px;
    }
  
    .content-bpsc .bpsc-italic {
        font-size: 16px;
    }
  
    .content-bpsc .bpsc-normal {
        font-size: 15px;
    }
  
    .content-bpsc .threeZero {
        font-size: 20px;
    }
  
    .tble-hed td {
        font-size: 20px;
        padding: 10px;
    }
  
    .rowData ul li {
        font-size: 16px;
    }
  
    .cell-text {
        font-size: 16px;
    }
  }
  
  @media(max-width: 320px) {
    .content-bpsc .fourZero {
        font-size: 16px;
    }
  
    .content-bpsc .bpsc-italic {
        font-size: 13px;
    }
  
    .content-bpsc .bpsc-normal {
        font-size: 13px;
    }
  
    .content-bpsc .threeZero {
        font-size: 16px;
    }
  
    .tble-hed td {
        font-size: 16px;
        padding: 5px;
    }
  
    .rowData ul li {
        font-size: 12px;
    }
  
    .cell-text {
        font-size: 12px;
    }
  }
  </style>