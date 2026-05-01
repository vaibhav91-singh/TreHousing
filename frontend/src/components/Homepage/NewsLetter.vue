<template>
  <div class="newsletter-section">
    <div class="container text-center my-4">
      <p
        class="newsletter-heading"
      >
        View All Educational News
      </p>
    </div>

    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 d-flex justify-content-center image-container">
          <img
            :src="require('@/assets/Homepage/NewsLetter.png')"
            alt="Newsletter Image"
            class="img-fluid floating-img"
          />
        </div>

        <div class="col-lg-6 text-center text-lg-start my-4 content-box">
          <h2 class="main-title">
            Subscribe to Our Premium<br>Educational Newsletter!!
          </h2>
          <p class="sub-title">
            Unlock curated insights, resource guides, and updates for learners and educators
          </p>

          <div class="form-wrapper">
            <div class="input-group-modern">
              <div class="icon-box">
                <i class="bi bi-envelope-fill"></i>
              </div>
              <input
                type="email"
                placeholder="Subscribe to learn"
                class="modern-input"
              />
            </div>

            <button class="btn-subscribe">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsLetter",
};
</script>

<style scoped>
/* Main Background wrapper */
.newsletter-section {
  background: #ffffff;
  padding: 60px 0;
  font-family: 'Inter', sans-serif;
}

/* Updated Top Heading */
.newsletter-heading {
  font-size: 24px;
  font-weight: 500;
  color: #b08d57; /* Gold/Tan color from your new image */
  text-decoration: underline;
  cursor: pointer;
  transition: 0.3s;
}

.newsletter-heading:hover {
  color: #0152cc;
}

/* Typography for the main content */
.main-title {
  font-size: 48px;
  font-weight: 800;
  color: #1a365d;
  line-height: 1.1;
  margin-bottom: 15px;
}

.sub-title {
  font-size: 20px;
  color: #4a5568;
  max-width: 500px;
  margin-bottom: 30px;
}

/* Image Animation */
.floating-img {
  max-height: 450px;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

/* Modern Input Styling */
.form-wrapper {
  max-width: 550px;
}

.input-group-modern {
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 20px;
  overflow: hidden;
  transition: 0.3s;
}

.input-group-modern:focus-within {
  border-color: #0152cc;
  box-shadow: 0 0 0 4px rgba(1, 82, 204, 0.1);
}

.icon-box {
  padding: 0 20px;
  color: #2600ff;
  font-size: 24px;
  border-right: 1px solid #cbd5e1;
}

.modern-input {
  border: none;
  background: transparent;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  font-size: 22px;
  font-weight: 500;
  color: #b08d57;
  outline: none;
}

.modern-input::placeholder {
  color: #b08d57;
  opacity: 0.7;
}

/* Gradient Button as per the gorgeous design */
.btn-subscribe {
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom, #2a4365 0%, #1a202c 100%);
  color: #d4af37; /* Gold text */
  font-size: 36px;
  font-weight: 700;
  border: 2px solid #2d3748;
  border-radius: 12px;
  box-shadow: 0 8px 15px rgba(0,0,0,0.3);
  transition: 0.4s ease;
  cursor: pointer;
}

.btn-subscribe:hover {
  transform: translateY(-3px);
  filter: brightness(1.2);
  box-shadow: 0 12px 20px rgba(0,0,0,0.4);
}

/* Responsive adjustments */
@media (max-width: 991px) {
  .main-title { font-size: 36px; }
  .content-box { margin-top: 40px; }
  .btn-subscribe { height: 70px; font-size: 28px; }
  .modern-input { height: 60px; font-size: 18px; }
}
</style>