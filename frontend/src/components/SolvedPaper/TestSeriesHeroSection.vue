<template>
  <div class="hero-section">
    <div class="container">
      <div class="content">
        <h1 class="heading">India's Structured Online Test Series Platform</h1>
        <p class="subheading">
          Boost your exam preparation with Test Series for <br />
          <span class="highlight">Banking, SSC, RRB & All other Govt. Exams</span>
        </p>
        <p class="exam-count">814+ exams covered. Which exam are you preparing for?</p>
      </div>

      <div class="illustration">
        <img :src="require('@/assets/testimg.png')" alt="Illustration" />
      </div>
    </div>

    <!-- Search Bar Positioned Below Content & Image -->
    <div class="search-bar">
      <input type="text" placeholder="Search for your Exam" />
      <span class="search-icon">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="#86A1AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
</span>

    </div>
  </div>
</template>

<script>
export default {
  name: "TestSeriesHeroSection",
};
</script>

<style scoped>


/* Wrapper for better spacing */
.hero-section {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  padding: 3vh 5vw 0;
  background-color: #E9EFF4;

}

/* Content and image in a single row */
.container {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  /* padding: 20px 0; */
  width: 100%;
  max-width: 100%;
  background-color: hsba(207, 5%, 96%, 1);
}

.content {
  max-width: 100%;
}

.heading {
  font-size: 38px;
  font-weight: 700;
  color: #000000;
  font: Inter;
  line-height: 58.09px;
}

.subheading {
  font-size: 26px;
  color: #86A1AE;
  margin-top: 50px;
  font: Inter;
font-weight: 500;
font-size: 30px;
line-height: 36.31px;





}



/* .highlight {
  font-weight: bold;
} */

.exam-count {
  margin-top: 10%;
  font-size: 26px;
  color: #000000;
  font-weight: 500;
  line-height: 31.47px;
}
/* Search Bar Positioned Below Content & Image */


.search-bar {
  position: relative;
  width: 70%;
  padding: 10px 20px;
  /* border: 1px solid #858282; */
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  /* border-radius: 5px; */
  box-sizing: border-box;
margin-bottom: 20px;
  
}

.search-bar input {
  width: 100%;
  padding: 15px;
  outline: none;
  font-size: 20px;
  box-sizing: border-box;
  border: 1px solid #758AAC1F;
  border-radius: 5px; 
  font-weight: 400;
  color: #86A1AE;
}

/* Optional: Change border color on focus */
.search-bar input:focus {
  border: 1px solid rgb(231, 228, 228); /* Darker red when input is focused */
}


/* Search Icon properly positioned inside the bar */
.search-icon {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #999;
  background-color: white;
  cursor: pointer;
}

.illustration{


  /* align-items: center; */
  justify-content: space-between;
  /* background-color: #6c87aa; */
  
  width: 50%;
  border-radius: 100px;

}

/* Ensures the image is responsive */
.illustration img {
  /* width: 500px; */
  height: 441.17645263671875px;
  /* max-width: 450px; */
}


/* ===================== RESPONSIVENESS ===================== */

/* For Tablets: 768px */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .content {
    max-width: 80%;
  }

  .heading {
    font-size: 32px;
    line-height: 45px;
  }

  .subheading {
    font-size: 24px;
    line-height: 30px;
  }

  .exam-count {
    font-size: 20px;
  }

  .illustration {
    width: 80%;
    margin-top: 20px;
  }

  .search-bar {
    width: 100%;
  }
}

/* For Mobile: 480px */
@media (max-width: 480px) {
  .content {
    max-width: 100%;
  }

  .heading {
    font-size: 28px;
    line-height: 40px;
  }

  .subheading {
    font-size: 20px;
    line-height: 26px;
    margin: 0;
  }

  .exam-count {
    font-size: 18px;
    margin: 0;
  }

  .illustration {
    width: 100%;
    margin: 0;
  }

  .illustration img {
    width: 100%;
    margin: 0;
    height: 280px;
  }

  .search-bar {
    width: 100%;
    padding: 0;
  }
}

/* For Small Screens: 325px */
@media (max-width: 325px) {
  .heading {
    font-size: 22px;
    line-height: 30px;
  }

  .subheading {
    font-size: 18px;
    line-height: 22px;
  }

  .exam-count {
    font-size: 16px;
  }

  .search-bar {
    width: 100%;
    padding: 0;
  }

  .search-bar input {
    font-size: 16px;
    padding: 10px;
    margin: 0;
  }

  .search-icon {
    font-size: 14px;
    right: 10px;
  }

  .illustration img {
    width: 100%;
    height: 250px;
  }
}
</style>
