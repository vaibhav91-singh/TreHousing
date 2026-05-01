<template>
  <div class="container">


    <div class="content">
      <h2>BPSC TRE 4.0 Previous Year Question Papers PDf Download</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et tenetur fuga repudiandae, non distinctio ea quos aliquam iusto is officia minima nesciunt blanditiis porro qui corporis assumenda voluptatem! Sint tatum amet totam modi! </p>
    </div>





    <div class="sidebar">


      <h3 class="latest-news-title">CSIR NET 2025</h3>
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

<!-- Second NOTIFICATION -->

      <h3 class="latest-news-title">CTET 2024 EXAM</h3>
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
      <div class="test-card blue-card">
      <a href="" target="_blank">
        <img src="@/assets/values.png" alt="BPSC Test 1" />
      </a>
        <p>Mock test series class 11 to12</p>
        <span class="price">Rs. 167.50</span>
      </div>
      <div class="test-card orange-card">
        <a href="" target="_blank">
        <img src="@/assets/values.png" alt="BPSC Test 2" />
      </a>
        <p>Mock test series class 11 to12</p>
        <span class="price">Rs. 167.50</span>
      </div>
   

    </div>


    <!-- Referral Section with Link -->
<div class="referral">
  <a href="" target="_blank">
    <img src="@/assets/values.png" alt="Refer and Earn" />
  </a>
</div>

<!-- BPSC Syllabus Section with Link -->
<div class="syllabus">
  <a href="" target="_blank">
    <img src="@/assets/values.png" alt="BPSC Syllabus 2024" />
  </a>
</div>



     <!-- Recent Posts -->
     <div class="recent-posts">
      <h2>Recent Post</h2>
      <ul>
        <li>
           BPSC TRE 3.0 Scorecard 2025,  <a href="#" target="_blank">Download Link Here</a>
        </li>
        <li>CU Himachal Pradesh Recruitment 2025, Notification Out<a href="#" target="_blank">Apply Link</a>, Salary</li>

        <li>REET Syllabus And Exam Pattern 2025,for Levels 1 and 2  <a href="#" target="_blank">Download Official PDF</a></li>

        <li>REET Previous Year Question Papers,  <a href="#" target="_blank">Download With Solutions</a></li>

        <li>DRDO JRF Recruitment 2025, <a href="#" target="_blank">Check Interview Schedule Here</a></li>

        <li>TS TET Answer Key 2025 Releasing Soon,Paper 1 and 2 Response Sheet</li>

        <li>अलंकार-परिभाषा ,भेद, उदाहरण & प्रकार  Alankar ki Paribhasha</li>

        <li>Railway Teacher Recruitment 2025, <a href="#" target="_blank">Apply Online Link For 753 Posts</a></li>

        <li> स्वर व व्यंजन -परिभाषा ,भेद, और उदाहरण & प्रकार <a href="#" target="_blank">Swar Vyanjan In Hindi PDF</a></li>

        <li> संधि -परिभाषा ,भेद, और उदाहरण & प्रकार <a href="#" target="_blank">Sandhi kise Karte hai</a></li>

      </ul>
    </div>


  </div>

    

   

    
  </div>
  
  
</template>

<script>
export default {
  data() {
    return {
      openDropdown: null,

// Notificatin1 data
      notification1: [
        {
          id: 1,
          title: "CSIR NET 2025",
          links: [
            { id: 1, text: "Exam Information of CSIR NET", url: "#" },
            { id: 2, text: "Some Other Link", url: "#" }
          ]
        },
        {
          id: 2,
          title: "CSIR NET Syllabus",
          links: [
            { id: 1, text: "CSIR NET Syllabus", url: "#" },
            { id: 2, text: "Important Syllabus", url: "#" }
          ]
        },
        {
          id: 3,
          title: "CSIR NET PYQ",
          links: [
            { id: 1, text: "CSIR NET PYQ ", url: "#" },
            { id: 2, text: "Some Other Link", url: "#" }
          ]
        },
        {
          id: 4,
          title: "CSIR NET Cut-off",
          links: [
            { id: 1, text: "CSIR NET Cut-off", url: "#" },
            { id: 2, text: "Important Guidelines", url: "#" }
          ]
        },
        {
          id: 5,
          title: "CSIR NET Eligibility",
          links: [
            { id: 1, text: "CSIR NET Eligibility ", url: "#" },
            { id: 2, text: "Important Guidelines", url: "#" }
          ]
        }

      ],

// Second notification data

      notification2: [
        {
          id: 6,
          title: "CTET 2024 Exam Date",
          links: [
            { id: 1, text: "Exam Information of CTET", url: "#" },
            { id: 2, text: "Some Other Link", url: "#" }
          ]
        },
        {
          id: 7,
          title: "CTET  Syllabus 2024 ",
          links: [
            { id: 1, text: "CTET  Syllabus 2024", url: "#" },
            { id: 2, text: "Important Guidelines", url: "#" }
          ]
        },
        {
          id: 8,
          title: "CTET Eligibility",
          links: [
            { id: 1, text: "Exam Information CTET ", url: "#" },
            { id: 2, text: "Some Other Link", url: "#" }
          ]
        },
        {
          id: 9,
          title: "CTET PYQs",
          links: [
            { id: 1, text: "CTET PYQs 2024", url: "#" },
            { id: 2, text: "Important Guidelines", url: "#" }
          ]
        },
        {
          id: 10,
          title: "CTET Preparation Tips",
          links: [
            { id: 1, text: "CTET Preparation Tips ", url: "#" },
            { id: 2, text: "Important Guidelines", url: "#" }
          ]
        }

      ]
// add another notification data

    };
  },
  methods: {
    toggleDropdown(id) {
      this.openDropdown = this.openDropdown === id ? null : id;
    }
  }
};
</script>

<style scoped>

/* Layout */
.container {
  display: flex;
  /* gap: 70px; */
  padding: 0 30px;
  width: 100%;
  max-width: 100%;
}

/* Sidebar Styling */
.sidebar {
  width: 25%;
  padding-right: 30px;
  margin-top: 30vh;
}

/* Latest News Title */
.latest-news-title {
  background-color: #ff3b5c;
  color: white;
  padding: 5px;
  font-weight: bold;
  margin: 0;
  border:  1px solid black;
  border-bottom: none;
  
}

/* News List */
.news-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid black;
  font-size: 16px;
  padding:10px 0;
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
  padding: 18px;
}

.content p
{
  font-size: 20px;
  
}

/* Ensure proper alignment in the container */

.container {
  align-items: flex-start;
}


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

.test-card p{
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
}

.blue-card {
  background-color: #f9f9f9;
  color: black;
  border: 1px solid black;
}

.orange-card {
  background-color: #f9f9f9;
  color: black;
  border: 1px solid black;
}

.test-card img {
  width: 100%;
  max-height: 200px;
  
}

.price {
  display: block;
  font-size: 18px;
  font-weight: bold;
  /* margin-top: 5px; */
}

.referral,
.syllabus {
  text-align: center;
  margin: 20px 0;
  border: 1px solid black;
}

.referral img,
.syllabus img {
  width: 100%;
  border-radius: 5px;
}


.recent-posts {
  background-color: #f9f9f9;
  /* padding: 15px; */
  border-radius: 5px;
}

.recent-posts h2 {
  background-color: red;
  color: white;
  /* padding: 10px; */
  /* margin: -15px -15px 10px; */
}

.recent-posts ul {
  /* list-style: none; */
  padding: 8px 30px;
}

.recent-posts li {
  margin: 8px 0;
  color: black;
}

.recent-posts a {
  text-decoration: none;
  color: red;
}




/* Responsive Media Queries */
@media screen and (max-width: 768px) {

  .container
  {
    margin: 0;
    padding: 0;
   
  }
  
  .sidebar {
    width: 30%;
    padding-right: 0;
  }


  .dropdown-btn {
    font-size: 16px;
  }

  .dropdown-content li {
    font-size: 16px;
    padding:0 10px;
   
  }

  .latest-news-title {
    font-size: 18px;
  }

  .container {
    padding: 10px;
  }


  .mock-test {
    gap: 5px;
  }

  .test-card {
    padding: 15px;
  }

  .test-card p {
    font-size: 14px;
  }

 
  .price {
    font-size: 16px;
  }

  .referral,
  .syllabus {
    margin: 10px 0;
  }

  .recent-posts h2 {
    font-size: 18px;
    padding: 5px 10px;
  }

  .recent-posts ul {
    padding: 5px 20px;
  }

}

@media screen and (max-width: 480px) {

  .container {
    flex-direction: column;
    padding: 0 15px;
  }
  .sidebar
  {
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
</style>
