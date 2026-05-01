<template>
  <div>
    <footer class="footer">
      <div class="footer-inner">
        <div class="logowithcontect">
          <div class="logo">
            <img
              :src="require('@/assets/logo.jpeg')"
              alt="Logo"
              @click.prevent="redirectHome"
              class="modern-logo"
            />
          </div>
          <div class="contact-info">
            <p>
              <strong>Address:</strong> TRE HOUSING PUBLICATION PRIVATE LIMITED <br />
              B-144, SECTOR XU 3, GREATER NOIDA, GB NAGAR, UP-201310
            </p>
            <p><strong>Phone No:</strong> 9458846730</p>
            <p><strong>Email:</strong> trehousingpublication@gmail.com</p>
          </div>
          
          <div class="social-icons">
            <a href="https://twitter.com/trepublication" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://wa.me/9458846730" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-whatsapp"></i>
            </a>
            <a href="https://t.me/trehousingpublication" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-telegram-plane"></i>
            </a>
            <a href="https://www.youtube.com/@trehousingpublication" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div class="footer-links-grid">
          <div class="link-column">
            <h4 class="section-title">Previous Year Paper</h4>
            <ul>
              <li><router-link to="/PYQ?course_id=1&sub_courses=1">BPSC TRE 1.0 <span class="arrow">→</span></router-link></li>
              <li><router-link to="/PYQ?course_id=1&sub_courses=2">BPSC TRE 2.0 <span class="arrow">→</span></router-link></li>
              <li><router-link to="/PYQ?course_id=1&sub_courses=3">BPSC TRE 3.0 <span class="arrow">→</span></router-link></li>
            </ul>
          </div>

          <div class="link-column">
            <h4 class="section-title">Syllabus</h4>
            <ul>
              <li><router-link to="/syllabus?course_id=1&subject_id=17">BPSC TRE (1-5) <span class="arrow">→</span></router-link></li>
              <li><router-link to="/syllabus?course_id=1&subject_id=16">BPSC TRE (6-8) <span class="arrow">→</span></router-link></li>
              <li><router-link to="/syllabus?course_id=1&subject_id=15">BPSC TRE (9-10) <span class="arrow">→</span></router-link></li>
              <li><router-link to="/syllabus?course_id=1&subject_id=14">BPSC TRE (11-12) <span class="arrow">→</span></router-link></li>
            </ul>
          </div>

          <div class="link-column">
            <h4 class="section-title">Solved Paper</h4>
            <ul>
              <li><router-link to="/">BPSC TRE (1-5) <span class="arrow">→</span></router-link></li>
              <li><router-link to="/">BPSC TRE (6-8) <span class="arrow">→</span></router-link></li>
              <li><router-link to="/">BPSC TRE (9-10) <span class="arrow">→</span></router-link></li>
              <li><router-link to="/">BPSC TRE (11-13) <span class="arrow">→</span></router-link></li>
            </ul>
          </div>

          <div class="link-column">
            <h4 class="section-title">Mock Test</h4>
            <ul>
              <li><router-link to="/">BPSC TRE (1-5) <span class="arrow">→</span></router-link></li>
              <li><router-link to="/">BPSC TRE (6-8) <span class="arrow">→</span></router-link></li>
              <li><router-link to="/">BPSC TRE (9-10) <span class="arrow">→</span></router-link></li>
              <li><router-link to="/">BPSC TRE (11-13) <span class="arrow">→</span></router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    <div class="footer-bottom">
      <div class="bottom-inner">
        <div class="left-links">
          <router-link to="/privacy-policy" class="bottom-item">Privacy Policy</router-link>
          <a href="#" class="bottom-item">Cookies Policy</a>
        </div>
        <div class="right-link">
          <router-link to="/terms-and-conditions" class="bottom-item">Terms & Conditions</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterSec",
  methods: {
    redirectHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");

/* Modern Global Reset for the footer */
.footer {
  background: linear-gradient(135deg, #003b95 0%, #001a4d 100%);
  color: #ffffff;
  padding: 60px 20px;
  font-family: 'Inter', sans-serif;
}

.footer-inner {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

/* Contact Section Styling */
.logowithcontect {
  flex: 1;
  min-width: 280px;
}

.modern-logo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  cursor: pointer;
  margin-bottom: 20px;
  /* Glowing effect for the yellow logo as per image */
  filter: drop-shadow(0 0 10px rgba(255, 230, 0, 0.6));
  border: 2px solid #ffe600;
  transition: 0.3s ease;
}

.modern-logo:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 20px rgba(255, 230, 0, 0.8));
}

.contact-info p {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
}

/* Updated Social Icons with circular glow background */
.social-icons {
  display: flex;
  gap: 12px;
  margin-top: 15px;
}

.social-icons a {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: 0.3s;
  font-size: 18px;
}

.social-icons a:hover {
  background: white;
  color: #003b95;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}

/* Links Grid Layout */
.footer-links-grid {
  flex: 3;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 8px;
}

/* Modern underline decoration as seen in the mockup */
.section-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 2px;
  background: #ffe600;
}

.link-column ul {
  list-style: none;
  padding: 0;
}

.link-column ul li {
  margin-bottom: 12px;
}

.link-column ul li a {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: 15px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.link-column ul li a:hover {
  color: #ffe600;
  padding-left: 5px;
}

.arrow {
  opacity: 0;
  transition: 0.3s;
}

.link-column ul li a:hover .arrow {
  opacity: 1;
}

/* Footer Bottom Styling */
.footer-bottom {
  background: #001a4d;
  padding: 20px 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.bottom-inner {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom-item {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 13px;
  margin-right: 20px;
  transition: 0.3s;
}

.bottom-item:hover {
  color: white;
}

.sparkle {
  color: rgba(255, 255, 255, 0.4);
  margin-left: 10px;
}

/* Responsive Fixes */
@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
  .logowithcontect {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
  .link-column ul li a {
    justify-content: center;
  }
  .bottom-inner {
    flex-direction: column;
    gap: 15px;
  }
}
</style>