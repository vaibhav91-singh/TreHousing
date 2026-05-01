<template>
  <div class="hero-section">
    <div
      class="carousel"
      @mouseenter="pauseAutoSlide"
      @mouseleave="startAutoSlide"
    >
      <div
        class="slide"
        v-for="(slide, index) in slides"
        :key="index"
        v-show="currentSlide === index"
      >
        <div class="content">
          <p class="subtitle">Examinations: The Key to Unlocking Your Future</p>
          <h1 class="title" v-html="highlightTitle(slide.title)"></h1>
          <p class="description">{{ slide.description }}</p>
          <button class="cta">Start Preparation</button>
        </div>

        <div class="image-container">
          <div class="orbital-background">
            <div class="main-image-wrapper">
              <img :src="slide.image" class="main-image" alt="Student studying" />
            </div>
            
            <div class="floating-icon icon-cap"><i class="fas fa-graduation-cap"></i></div>
            <div class="floating-icon icon-book"><i class="fas fa-book-open"></i></div>
            <div class="floating-icon icon-bulb"><i class="fas fa-lightbulb"></i></div>
            <div class="orbital-ring"></div>
          </div>
        </div>
      </div>

      <button class="nav left" @click="prevSlide">&#10094;</button>
      <button class="nav right" @click="nextSlide">&#10095;</button>

      <div class="dots-container">
        <span 
          v-for="(dot, i) in slides" 
          :key="i" 
          class="dot" 
          :class="{ active: currentSlide === i }"
          @click="currentSlide = i"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          title: "Get ready for 100+ government exams, covering both central and state opportunities.",
          description: "Access comprehensive resources designed for a wide range of exams including SSC, UPSC, Bihar Govt, and more. Stay updated with the latest syllabus.",
          image: require("@/assets/Trehousingpublications_UI/hero.png"),
        },
        {
          title: "Ace your exams with expert guidance from top teachers.",
          description: "Learn from experienced educators through detailed courses, video tutorials, and step-by-step solutions. Our expert guidance ensures you understand key concepts.",
          image: require("@/assets/Trehousingpublications_UI/hero2.png"),
        },
        {
          title: "Comprehensive study materials for your success.",
          description: "Explore well-researched books, updated syllabi, and previous year question papers to strengthen your preparation.",
          image: require("@/assets/Trehousingpublications_UI/hero3.jpg"),
        },
        {
          title: "Join the best preparation platform for a brighter future.",
          description: "Be part of a thriving community focused on success through mock tests, live quizzes, and continuous support.",
          image: require("@/assets/Trehousingpublications_UI/hero4.png"),
        },
      ],
      currentSlide: 0,
      autoSlideInterval: null,
    };
  },
  methods: {
    // Helper to colorize part of the title as seen in the mockup
    highlightTitle(title) {
      if(title.includes("Ace your exams")) {
        return title.replace("Ace your exams", '<span class="text-blue">Ace your exams</span>');
      }
      return title;
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(this.nextSlide, 5000); // Increased time for readability
    },
    pauseAutoSlide() {
      clearInterval(this.autoSlideInterval);
    },
  },
  mounted() {
    this.startAutoSlide();
  },
};
</script>

<style scoped>
/* Main Section Background - Matching the soft pinkish-white of the image */
.hero-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fdf5f5; /* Very soft pastel background */
  padding: 80px 0;
  width: 100%;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

.carousel {
  display: flex;
  align-items: center;
  position: relative;
  width: 90%;
  max-width: 1300px;
}

.slide {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* --- Content Styling --- */
.content {
  max-width: 50%;
  z-index: 2;
}

.subtitle {
  font-weight: 600;
  color: #444;
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.title {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.2;
  color: #1a1a1a;
  margin-bottom: 20px;
}

/* Logic for the blue highlighted text */
::v-deep .text-blue {
  color: #1a46e5;
}

.description {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 90%;
}

.cta {
  background: #1a46e5;
  color: white;
  padding: 15px 35px;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(26, 70, 229, 0.3);
  transition: transform 0.2s, background 0.2s;
}

.cta:hover {
  background: #1539bd;
  transform: translateY(-2px);
}

/* --- Image & Orbital Design --- */
.image-container {
  position: relative;
  width: 50%;
  display: flex;
  justify-content: center;
}

.orbital-background {
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* The purple circle behind the girl */
.main-image-wrapper {
  width: 320px;
  height: 320px;
  background: #9d66ff; /* Purple gradient/solid */
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  z-index: 1;
  box-shadow: 0 20px 40px rgba(157, 102, 255, 0.2);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* The dashed ring animation */
.orbital-ring {
  position: absolute;
  width: 110%;
  height: 110%;
  border: 1px dashed rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Floating decorative icons */
.floating-icon {
  position: absolute;
  width: 45px;
  height: 45px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  z-index: 2;
  font-size: 1.2rem;
}

.icon-cap { top: 10%; left: 0; color: #9d66ff; }
.icon-book { top: 20%; right: -5%; color: #ffab2e; }
.icon-bulb { bottom: 15%; right: 10%; color: #ffcc00; }

/* --- Navigation & Dots --- */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  color: #333;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  border: none;
  transition: all 0.3s;
}

.nav:hover { background: #1a46e5; color: white; }
.nav.left { left: -60px; }
.nav.right { right: -60px; }

.dots-container {
  position: absolute;
  bottom: -40px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  background: #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

.dot.active {
  background: #1a46e5;
  width: 25px;
  border-radius: 10px;
}

/* --- Responsive Adjustments --- */
@media (max-width: 1200px) {
  .nav.left { left: 10px; }
  .nav.right { right: 10px; }
}

@media (max-width: 992px) {
  .title { font-size: 2.2rem; }
  .orbital-background { width: 300px; height: 300px; }
  .main-image-wrapper { width: 250px; height: 250px; }
}

@media (max-width: 768px) {
  .slide { flex-direction: column; text-align: center; }
  .content { max-width: 100%; margin-bottom: 50px; }
  .description { max-width: 100%; }
  .image-container { width: 100%; }
}
</style>