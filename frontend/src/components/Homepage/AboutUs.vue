<template>
  <div class="about-us-wrapper p-md-5 p-2">
    <div class="heading mx-md-5 mx-sm-3 mx-4">
      <h2 class="about-title">
        About Us <span class="accent-bar"></span>
      </h2>
    </div>

    <div class="parent d-flex flex-column flex-lg-row justify-content-between align-items-center h-auto px-4">
      
      <div class="para container h-auto w-70 flex-grow-1 mb-4 mb-md-0">
        <p
          class="about-description fw-normal"
          style="font-family: 'Inter', sans-serif; text-align: justify"
        >
          TRE Housing Publication Private Limited, established on 19th March
          2024, is a forward-thinking Indian Private Limited Company dedicated
          to advancing education through quality publishing. Specializing in the
          publishing, printing, and distribution of educational books, the
          company operates seamlessly across both online and offline platforms.
          TRE Housing Publication is committed to delivering well-researched,
          accessible, and affordable educational content that empowers learners
          and institutions nationwide. By combining traditional publishing
          excellence with modern distribution strategies, the company aspires to
          set new benchmarks in the educational sector. TRE Housing Publication
          stands as a trusted partner in fostering academic growth and lifelong
          learning.
        </p>

        <div class="mt-4">
          <button class="how-it-works-btn">
            How it works
          </button>
        </div>
      </div>

      <div class="modern-image-container">
        <div class="floating-ui-container">
          <div class="ui-overlay-glass">
            <img
              :src="require('@/assets/Homepage/AboutUs.png')"
              alt="About Us Image"
              class="featured-student-img"
            />
          </div>
          <div class="edu-icon icon-1"><i class="fas fa-book"></i></div>
          <div class="edu-icon icon-2"><i class="fas fa-globe"></i></div>
          <div class="edu-icon icon-3"><i class="fas fa-cog"></i></div>
          <div class="edu-background-pattern"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
};

</script>
<style scoped>
/* Main Wrapper - Now includes the soft pastel base and radial glow spots */
.about-us-wrapper {
  /* Soft background color from image_bb35a6.png */
  background-color: #fdf5f5; 
  overflow: hidden;
  position: relative;
  /* Adding radial gradients to mimic the soft lighting in the provided images */
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.6) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.6) 0%, transparent 40%);
}

/* Background Pattern Layer - Mimics the thin orbital lines and book watermarks */
.about-us-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Adding a very subtle grid/dot pattern as seen in image_bb35a6.png */
  background-image: radial-gradient(#e0d5d5 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.4;
  z-index: 0;
  pointer-events: none;
}

/* Header and content positioning to stay above background effects */
.heading, .parent {
  position: relative;
  z-index: 1;
}

/* Modern Title Styling with the slanted gold accent */
.about-title {
  color: #002b5c;
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 15px;
}

.accent-bar {
  width: 30px;
  height: 6px;
  background: #c5a059; /* Gold accent from image_bb35a6.png */
  transform: skewX(-20deg);
  display: inline-block;
}

.about-description {
  color: #4a4a4a;
  line-height: 1.8;
  font-size: 16px;
}

/* Modern Gradient Button Styling */
.how-it-works-btn {
  padding: 14px 45px;
  font-weight: 700;
  font-size: 16px;
  background: linear-gradient(to right, #003b95, #0152cc);
  color: #fff;
  border: none;
  border-radius: 6px;
  box-shadow: 0 4px 15px rgba(1, 82, 204, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.how-it-works-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(1, 82, 204, 0.4);
}

/* Modern Image Layout with Glassmorphism Overlay */
.modern-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  min-width: 450px;
}

.floating-ui-container {
  position: relative;
  padding: 40px;
}

/* Glass frame mimicking the "floating" UI effect in image_bb35a6.png */
.ui-overlay-glass {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  padding: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.featured-student-img {
  width: 100%;
  max-width: 400px;
  border-radius: 18px;
  display: block;
}

/* Decorative orbital background for the image section */
.edu-background-pattern {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130%;
  height: 130%;
  /* Large faint circular lines as seen in your reference images */
  border: 1px solid rgba(197, 160, 89, 0.1);
  border-radius: 50%;
  z-index: 1;
}

/* Educational icons floating around the image */
.edu-icon {
  position: absolute;
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  z-index: 3;
  color: #0152cc;
  font-size: 1.1rem;
}

.icon-1 { top: 5%; right: 5%; }
.icon-2 { bottom: 15%; left: -5%; }
.icon-3 { top: 45%; left: -25px; }

@media (max-width: 991px) {
  .modern-image-container {
    min-width: 100%;
    margin-top: 40px;
  }
  .about-title {
    justify-content: center;
  }
}
</style>