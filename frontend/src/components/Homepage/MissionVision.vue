<!-- Mission Vision is change on to Goverment competitive exam held -->
<template>
  <section class="min-h-screen flex items-center justify-center">
    <div class="box-container bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl text-center">
      
      <!-- Title -->
      <div class="text-center mb-6">
        <!-- <h2 class="text-xl font-bold heading mb-4 underline">Mission & Vision</h2> -->
      </div>

      <!-- Table for Mission, Vision, and Values -->
       <!-- I am commenting this part to hide  -->
      <!-- <div class="overflow-x-auto">
        <table v-if="isDesktop" class="w-3/4 mx-auto text-center">
          <thead>
            <tr>
              <td><div class="image-wrapper"><img src="@/assets/mission.png" alt="Mission Image" class="img-fluid same-size" /></div></td>
              <td><div class="image-wrapper"><img src="@/assets/vision.jpg" alt="Vision Image" class="img-fluid same-size" /></div></td>
              <td><div class="image-wrapper"><img src="@/assets/values.png" alt="Values Image" class="img-fluid same-size" /></div></td>
            </tr>
            <tr>
              <td class="p-3 fw-bold text-dark">
                <span class="our">OUR</span> <span class="mission">MISSION</span>
              </td>
              <td class="p-3 fw-bold text-dark">
                <span class="our">OUR</span> <span class="vision">VISION</span>
              </td>
              <td class="p-3 fw-bold text-dark">
                <span class="our">OUR</span> <span class="values">VALUES</span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-4 text-gray-700 text-sm">
                Empower learners worldwide with accessible, high-quality digital education.
              </td>
              <td class="p-4 text-gray-700 text-sm">
                To be the leading platform for innovative, engaging, and personalized e-learning experiences.
              </td>
              <td class="p-4 text-gray-700 text-sm">
                Accessibility, innovation, lifelong learning, and student success. 🚀
              </td>
            </tr>
          </tbody>
        </table> -->
        
        <!-- Mobile/Table Layout -->
        <!-- <div v-else class="w-full flex flex-col items-center">
          <div class="flex flex-col items-center w-full mb-4"> -->
            <!-- No border above "OUR MISSION" image now -->
            <!-- <div class="image-wrapper"><img src="@/assets/mission.png" alt="Mission Image" class="img-fluid same-size mb-2" /></div>
            <h3 class="fw-bold text-dark mb-2">OUR <span class="mission">MISSION</span></h3>
            <p class="text-secondary px-3">Empower learners worldwide with accessible, high-quality digital education.</p>
          </div> -->

          <!-- <div class="flex flex-col items-center w-full mb-4"> -->
            <!-- Add border above the "OUR VISION" image -->
            <!-- <div class="image-border"></div>
            <div class="image-wrapper"><img src="@/assets/vision.jpg" alt="Vision Image" class="img-fluid same-size mb-2" /></div>
            <h3 class="fw-bold text-dark mb-2">OUR <span class="vision">VISION</span></h3>
            <p class="text-secondary px-3">To be the leading platform for innovative, engaging, and personalized e-learning experiences.</p>
          </div> -->

          <!-- <div class="flex flex-col items-center w-full mb-4"> -->
            <!-- Add border above the "OUR VALUES" image -->
            <!-- <div class="image-border"></div>
            <div class="image-wrapper"><img src="@/assets/values.png" alt="Values Image" class="img-fluid same-size mb-2" /></div>
            <h3 class="fw-bold text-dark mb-2">OUR <span class="values"> VALUES</span></h3>
            <p class="text-secondary px-3">Accessibility, innovation, lifelong learning, and student success. 🚀</p>
          </div>
        </div>
      </div> -->
      <!-- This is the end of commets of hiding -->

       <!-- New Codes for Government Competitive Exam Held -->


  <div class="exam-section-card">
    <h2 class="exam-title">Government Competitive Exam Held</h2>
    
    <div class="button-container">
      <!-- Syllabus part of Goverment competitive exam  -->
      <div class="nav-btn syllabus-btn" src="" alt="Syllabus">
        <span class="btn-text">SYLLABUS</span>
        <span class="icon">📖</span>
        <div class="syllabus">
          <ul>
            <li><a href="#">BPSC</a></li>
            <li><a href="#">BSSC</a></li>
            <li><a href="#">SSC</a></li>
            <li><a href="#">Railway</a></li>
            <li><a href="#">Police</a></li>
            <li><a href="#">More...</a></li>
          </ul>
        </div>
      </div>
      <!-- PYQs part of Goverment competitive exam  -->
      <div class="nav-btn pyqs-btn" src="" alt="PYQs">
        <span class="btn-text">PYQs</span>
        <span class="icon">📝</span>
        <div class="pyqs">
          <ul>
            <li><a href="#">BPSC</a></li>
            <li><a href="#">BSSC</a></li>
            <li><a href="#">SSC</a></li>
            <li><a href="#">Railway</a></li>
            <li><a href="#">Police</a></li>
            <li><a href="#">More...</a></li>
          </ul>
        </div>
      </div>
      <!-- Mock Test part of Goverment competitive exam  -->
      <div class="nav-btn mocktest-btn" src="" alt="Mock Test">
        <span class="btn-text">Mock Test</span>
        <span class="icon">💡</span>
        <div class="mocktest">
          <ul>
            <li><a href="#">BPSC</a></li>
            <li><a href="#">BSSC</a></li>
            <li><a href="#">SSC</a></li>
            <li><a href="#">Railway</a></li>
            <li><a href="#">Police</a></li>
            <li><a href="#">More...</a></li>
          </ul>
        </div>
      </div>
    </div>
      <p class="footer-text">Explore available resources for your competitive exam preparation. <span>⌄</span></p>
  </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MissionVision",
  data() {
    return {
      isDesktop: false,
    };
  },
  mounted() {
    this.checkDevice(); 
    window.addEventListener("resize", this.checkDevice); 
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkDevice); 
  },
  methods: {
    checkDevice() {
      this.isDesktop = window.innerWidth >= 725; 
    },
  },
};
</script>

<style scoped>
.heading {
  color: rgb(31, 31, 185);
  text-decoration: underline;
  font-weight: bold;
}

.our {
  color: black;
  font-weight: bold;
}
.mission {
  color: red;
  font-weight: bold;
}
.vision {
  color: rgb(31, 31, 185);
  font-weight: bold;
}
.values {
  color: yellow;
  font-weight: bold;
}

/* Ensures all images are the same size */
.same-size {
  width: 250px; 
  height: 250px; 
  object-fit: cover; 
}

/* Wrapper for images to add border */
.image-wrapper {
  position: relative;
  display: inline-block; 
}

/* Border above the images in mobile/tablet layout */
.image-border {
  width: 80%; 
  height: 2px; 
  background-color: black; 
  margin-bottom: 10px; 
  margin-left: auto; 
  margin-right: auto; 
  margin-top: 10px; 
}

/* Mobile/Table Layout (<725px) */
@media (max-width: 724px) {
  
  .image-wrapper:first-child {
    margin-top: 0; 
  }

  
  .image-wrapper:not(:first-child) {
    margin-top: 10px;
  }
}


@media (min-width: 725px) {
  
  .image-wrapper {
    border-right: 3px solid black; 
    padding-right: 10px; 
  }
  .image-wrapper:last-child {
    border-right: none; 
  }
}


/* Css for Goverment Competitive Exam Held */

/* Main Card Container */
.exam-section-card {
  /* max-width: 900px; describe the size of */
  margin: 20px auto;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 24px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header Style */
.exam-title {
  color: #1a4a9e;
  font-size: 1.5rem;
  font-weight: 700;
  /* text-decoration: underline; */
  margin-bottom: 30px;
}

/* Button Wrapper - Grid for perfect alignment */
.button-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  background: #f1f3f5; /* Light grey inner box from your image */
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 20px;
}

/* Base Button Styles */
.nav-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.nav-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

/* Specific Button Gradients based on your image */
.syllabus-btn {
  background: linear-gradient(135deg, #2d9233 0%, #1e6b22 100%);
}

.pyqs-btn {
  background: linear-gradient(135deg, #e53935 0%, #b71c1c 100%);
}

.mocktest-btn {
  background: linear-gradient(135deg, #188ca5 0%, #0d5a6a 100%);
}

.btn-text {
  letter-spacing: 0.5px;
}

.icon {
  font-size: 1.4rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  border-radius: 4px;
}

/* Footer Text */
.footer-text {
  color: #666;
  font-size: 0.9rem;
  margin-top: 15px;
}

/* --- Mobile Responsiveness --- */
@media (max-width: 600px) {
  .exam-section-card {
    margin: 10px;
    padding: 15px;
  }
  
  .button-container {
    grid-template-columns: 1fr; /* Stack buttons vertically on small phones */
    padding: 15px;
  }
  
  .exam-title {
    font-size: 1.2rem;
  }
}
ul li a {
  color:yellow;
  font-weight: 500;

}
ul li a:hover {
  color:white;
}
</style>
