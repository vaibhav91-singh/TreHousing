<template>
  <div class="main-wrapper">
    <h2 class="text-center">
      <u class="underline" style="font-size: 34px; font-weight: bold">Job Opportunities</u>
    </h2>

    <div class="overflow-hidden px-4">
      <div class="job-cards-container-wrapper">
        
        <button @click="scrollLeft" class="left-click" aria-label="Previous">
          <span class="arrow-icon"></span>
        </button>

        <div
          class="job-cards-container flex gap-4 overflow-x-auto md:overflow-hidden"
          ref="jobCardsWrapper"
          @touchstart="startTouch"
          @touchmove="moveTouch"
        >
          <div v-for="(job, index) in visibleJobs" :key="index" class="job-card">
            <div class="card-content">
              <h3 class="job-title">{{ job.title }}</h3>
              
              <div class="job-details">
                <div class="detail-item">
                  <span class="icon location-icon">📍</span>
                  <span class="detail-text">{{ job.location }}</span>
                </div>
                
                <div class="detail-item">
                  <span class="icon date-icon">📅</span>
                  <span class="detail-text date-val">{{ job.date }}</span>
                </div>
                
                <div class="detail-item">
                  <span class="icon salary-icon">💰</span>
                  <span class="detail-text salary-val">{{ job.salary }}</span>
                </div>
              </div>
            </div>

            <button @click="viewPreviousYearPaper(job)" class="button-text">
              <span class="view-icon">👁</span> View Previous Year Paper
            </button>
            
            <div class="card-footer-line"></div>
          </div>
        </div>

        <button @click="scrollRight" class="right-click" aria-label="Next">
          <span class="arrow-icon right"></span>
        </button>
      </div>

      <div class="pagination-dots">
        <span v-for="(_, i) in jobs" :key="i" :class="['dot', { active: currentIndex === i }]"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobOpportunities",
  data() {
    return {
      // Backend data remains unchanged as requested
      jobs: [
        { title: "Government Clerk SHO", location: "Gujarat Government", date: "03-03-2025", salary: "40k to 50k" },
        { title: "BPSC Assistance Vacancy", location: "Patna, Bihar", date: "03-03-2025", salary: "50k to 60k" },
        { title: "Bihar Police Services", location: "Patna, Bihar", date: "03-03-2025", salary: "40k to 50k" },
        { title: "Railway Engineer", location: "New Delhi", date: "03-03-2025", salary: "60k to 80k" },
        { title: "UPSC Civil Services", location: "India", date: "03-03-2025", salary: "70k to 90k" },
        { title: "Paper 6", location: "India", date: "03-03-2025", salary: "70k to 90k" },
      ],
      currentIndex: 0,
      startX: 0,
      isMobile: false, // Track whether the user is on mobile
    };
  },
  created() {
    this.checkDeviceWidth(); // Check initial device width on page load
    window.addEventListener("resize", this.checkDeviceWidth); // Listen for window resize
  },
  unmounted() {
    window.removeEventListener("resize", this.checkDeviceWidth); // Clean up event listener
  },
  computed: {
    visibleJobs() {
      // Show only 1 job card on mobile and 3 on larger screens
      if (this.isMobile) {
        return this.jobs.slice(this.currentIndex, this.currentIndex + 1); 
      } else {
        // Logic to handle slice wrap-around if needed, currently keeps standard slice
        return this.jobs.slice(this.currentIndex, this.currentIndex + 3);
      }
    },
  },
  methods: {
    checkDeviceWidth() {
      this.isMobile = window.innerWidth <= 768; // Standardized mobile breakpoint
    },
    scrollLeft() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      } else {
        this.currentIndex = this.jobs.length - (this.isMobile ? 1 : 3);
      }
    },
    scrollRight() {
      const maxIndex = this.jobs.length - (this.isMobile ? 1 : 3);
      if (this.currentIndex < maxIndex) {
        this.currentIndex += 1;
      } else {
        this.currentIndex = 0;
      }
    },
    viewPreviousYearPaper(job) {
      const formattedTitle = job.title.replace(/\s+/g, "-").toLowerCase();
      const url = `https://example.com/previous-year-paper/${formattedTitle}`;
      window.open(url, "_blank");
    },
    startTouch(e) {
      this.startX = e.touches[0].clientX;
    },
    moveTouch(e) {
      const touchMoveX = e.touches[0].clientX;
      const moveDistance = this.startX - touchMoveX;
      if (Math.abs(moveDistance) > 50) {
        moveDistance > 0 ? this.scrollRight() : this.scrollLeft();
        this.startX = touchMoveX; // Reset to prevent multiple triggers
      }
    },
  },
};
</script>

<style scoped>
.main-wrapper {
  background-color: #f8fafc;
  padding-bottom: 40px;
}

.overflow-hidden {
  background: linear-gradient(135deg, #0152cc 0%, #003a94 100%);
  padding: 60px 0;
  position: relative;
}

.text-center {
  color: #2600ff;
  padding: 30px 10px;
  background-color: #fff;
  margin: 0;
}

/* Container spacing */
.job-cards-container-wrapper {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Glassmorphism Navigation Buttons */
.left-click, .right-click {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.left-click:hover, .right-click:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-50%) scale(1.1);
}

.left-click { left: 20px; }
.right-click { right: 20px; }

/* Custom Arrow Graphics */
.arrow-icon {
  border: solid white;
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 6px;
  transform: rotate(135deg);
}
.arrow-icon.right { transform: rotate(-45deg); }

/* Updated Job Card Design */
.job-cards-container {
  display: flex;
  justify-content: center;
  gap: 25px;
  padding: 20px;
}

.job-card {
  width: 320px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
}

.job-card:hover {
  transform: translateY(-10px);
}

.card-content {
  padding: 24px;
}

.job-title {
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 18px;
  line-height: 1.4;
  height: 3.2em; /* Keeps height consistent */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Detail Rows */
.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.detail-text {
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
  margin-left: 10px;
}

.date-val { color: #d97706; font-weight: 600; }
.salary-val { color: #2563eb; font-weight: 700; }

/* Professional Button */
.button-text {
  background: linear-gradient(90deg, #2600ff 0%, #1e00cc 100%);
  color: white;
  border: none;
  padding: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 20px 20px 20px;
  border-radius: 8px;
  transition: 0.3s;
}

.button-text:hover {
  filter: brightness(1.2);
  box-shadow: 0 4px 12px rgba(38, 0, 255, 0.3);
  transform: translateY(-2px);
}

/* Decoration */
.card-footer-line {
  height: 5px;
  width: 100%;
  background: linear-gradient(90deg, #463cd7 0%, #ff1702 100%);
}

.pagination-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transition: 0.3s;
}

.dot.active {
  background: white;
  width: 24px;
  border-radius: 4px;
}

/* Responsive Overrides */
@media only screen and (max-width: 768px) {
  .job-card {
    width: 85vw;
    margin: 0 auto;
  }
  .left-click, .right-click {
    width: 40px;
    height: 40px;
  }
  .left-click { left: 5px; }
  .right-click { right: 5px; }
}
</style>