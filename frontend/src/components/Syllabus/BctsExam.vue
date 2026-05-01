<template>
  <div class="container">
    <!-- <div class="left-column">
      <aside class="sidebar">
        <h2 class="explore">Explore All Previous Year Papers</h2>
        <nav>
          <ul class="space-y-2">
            <li
              v-for="(item, index) in menuItems"
              :key="index"
              class="dropdown menu-item syllabus-dropdown"
            >
              <a
                href="#"
                class="block px-4 py-2 text-black rounded-md hover:bg-gray-700 flex items-center no-underline"
                @click.prevent="toggleSyllabusDropdown(index)"
              >
                <span
                  class="dropdown-arrow"
                  :class="{ 'rotate-90': item.isOpen }"
                  >&#8250;</span
                >
                <span class="menu-item-text">{{ item.text }}</span>
              </a>
              <ul v-if="item.isOpen" class="dropdown-menu mt-2 space-y-2">
                <li v-for="(subItem, subIndex) in item.subMenu" :key="subIndex">
                  <a
                    href="#"
                    @click.prevent="handleMenuItemClick(subItem)"
                    class="block px-4 py-2 text-black rounded-md hover:bg-gray-700 no-underline"
                  >
                    {{ subItem.text }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      <div class="container">
        <div class="news-sidebar">
          <h3 class="news-title">Latest Event</h3>
          <ul class="news-list-wrapper">
            <li
              v-for="news in newsLinks"
              :key="news.id"
              class="news-dropdown latest-event-dropdown"
            >
              <div
                class="news-dropdown-btn"
                @click="toggleNewsDropdown(news.id)"
              >
                <span :class="{ 'news-rotate': openDropdown === news.id }">
                  > </span
                >{{ news.title }}
              </div>
              <ul v-if="openDropdown === news.id" class="news-dropdown-content">
                <li v-for="link in news.links" :key="link.id">
                  <a href="#" @click.prevent="handleLinkClick(link)">
                    {{ link.text }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div> -->

    <div v-if="course && subject" class="content">
      <!-- 1. Course Title -->
      <h1 class="course-title">{{ course.title }}</h1>

      <!-- 2. Course Description -->
      <p class="course-description">{{ course.description }}</p>

      <!-- 3. Course Banner -->
      <div class="image-section">
        <img
          :src="getFullUrl(course.banner)"
          alt="Course Banner"
          class="course-banner"
        />
      </div>

      <!-- 4. Subject Section -->
      <div class="download-section">
        <h2>{{ subject.title }}</h2>

        <p>{{ subject.description }}</p>

        <a
          :href="getFullUrl(subject.pdf_link)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button class="download-btn">Download PDF</button>
        </a>
      </div>
    </div>
    <div v-else class="loading">Loading...</div>
    
    <!-- Custom Popup Message -->
    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <div class="popup-header">
          <h3>Notification</h3>
          <button class="close-btn" @click="closePopup">&times;</button>
        </div>
        <div class="popup-body">
          <p>{{ popupMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SyllabusAndNews",
  data() {
    return {
      course: null,
      subject: null,
      showPopup: false,
      popupMessage: "",
      
      menuItems: [
        {
          text: "All subject Syllabus",
          isOpen: false,
          subMenu: [
            { text: "Sub Item 1", link: "#", courseId: 1, subjectId: 1 },
            { text: "Sub Item 2", link: "#", courseId: 1, subjectId: 2 },
          ],
        },
        {
          text: "Bihar Computer Teacher",
          isOpen: false,
          subMenu: [
            { text: "Sub Item 1", link: "#", courseId: 2, subjectId: 1 },
            { text: "Sub Item 2", link: "#", courseId: 2, subjectId: 2 },
          ],
        },
        {
          text: "Intelligence Bureau (IB)",
          isOpen: false,
          subMenu: [
            { text: "Sub Item 1", link: "#", courseId: 3, subjectId: 1 },
            { text: "Sub Item 2", link: "#", courseId: 3, subjectId: 2 },
          ],
        },
        {
          text: "CSIR SP ASO",
          isOpen: false,
          subMenu: [
            { text: "Sub Item 1", link: "#", courseId: 4, subjectId: 1 },
            { text: "Sub Item 2", link: "#", courseId: 4, subjectId: 2 },
          ],
        },
        {
          text: "NAICL Assistant",
          isOpen: false,
          subMenu: [
            { text: "Sub Item 1", link: "#", courseId: 5, subjectId: 1 },
            { text: "Sub Item 2", link: "#", courseId: 5, subjectId: 2 },
          ],
        },
        {
          text: "SSC CGL",
          isOpen: false,
          subMenu: [
            { text: "Sub Item 1", link: "#", courseId: 6, subjectId: 1 },
            { text: "Sub Item 2", link: "#", courseId: 6, subjectId: 2 },
          ],
        },
        {
          text: "Bank SO",
          isOpen: false,
          subMenu: [
            { text: "Sub Item 1", link: "#", courseId: 7, subjectId: 1 },
            { text: "Sub Item 2", link: "#", courseId: 7, subjectId: 2 },
          ],
        },
      ],

      openDropdown: null,

      newsLinks: [
        {
          id: 1,
          title: "REET 2025 Notification",
          links: [
            {
              id: 1,
              text: "Exam Information of REET",
              courseId: 8,
              subjectId: 1
            },
            {
              id: 2,
              text: "Some Other Link",
              courseId: 8,
              subjectId: 2
            },
          ],
        },
        {
          id: 2,
          title: "UGC Answer Key 2025",
          links: [
            {
              id: 1,
              text: "UGC NET Official Answer Key",
              courseId: 9,
              subjectId: 1
            },
            {
              id: 2,
              text: "Important Guidelines",
              courseId: 9,
              subjectId: 2
            },
          ],
        },
        {
          id: 3,
          title: "TS TET Answer Key 2025",
          links: [
            {
              id: 1,
              text: "Exam Information of TS TET",
              courseId: 10,
              subjectId: 1
            },
            {
              id: 2,
              text: "Some Other Link",
              courseId: 10,
              subjectId: 2
            },
          ],
        },
        {
          id: 4,
          title: "Railway Teacher Vacancy 2025",
          links: [
            {
              id: 1,
              text: "Railway Official Teacher",
              courseId: 11,
              subjectId: 1
            },
            {
              id: 2,
              text: "Important Guidelines",
              courseId: 11,
              subjectId: 2
            },
          ],
        },
        {
          id: 5,
          title: "Railway Teacher Syllabus",
          links: [
            {
              id: 1,
              text: "Railway Official Syllabus",
              courseId: 12,
              subjectId: 1
            },
            {
              id: 2,
              text: "Important Guidelines",
              courseId: 12,
              subjectId: 2
            },
          ],
        },
      ],
    };
  },
  methods: {
    getFullUrl(path) {
      if (!path) return "";
      return path.startsWith("http")
        ? path
        : `https://cms.trehousingpublication.com${path}`;
    },

    toggleSyllabusDropdown(index) {
      // Close all other dropdowns first
      this.menuItems.forEach((item, i) => {
        if (i !== index) {
          item.isOpen = false;
        }
      });
      
      // Toggle the selected dropdown
      this.menuItems[index].isOpen = !this.menuItems[index].isOpen;
    },

    toggleNewsDropdown(id) {
      // If clicking the same dropdown that's already open, close it
      // Otherwise, close the current one and open the clicked one
      this.openDropdown = this.openDropdown === id ? null : id;
    },
    
    showPopupMessage(message) {
      this.popupMessage = message;
      this.showPopup = true;
    },
    
    closePopup() {
      this.showPopup = false;
    },

    async checkDataExists(courseId, subjectId) {
      try {
        const response = await axios.get(
          `https://cms.trehousingpublication.com/api/v1/?course_id=${courseId}&subject_id=${subjectId}`
        );
        
        // Check if the response has valid data
        if (
          response.data &&
          response.data.course &&
          response.data.course.subjects &&
          response.data.course.subjects.length > 0
        ) {
          return { exists: true, data: response.data };
        } else {
          return { exists: false };
        }
      } catch (error) {
        console.error("Failed to check data:", error);
        return { exists: false, error };
      }
    },

    async handleMenuItemClick(subItem) {
      if (subItem.courseId && subItem.subjectId) {
        const result = await this.checkDataExists(subItem.courseId, subItem.subjectId);
        
        if (result.exists) {
          // Data exists, redirect to the page
          window.location.href = `?course_id=${subItem.courseId}&subject_id=${subItem.subjectId}`;
        } else {
          // No data, show popup
          this.showPopupMessage("Will be available soon");
        }
      } else {
        this.showPopupMessage("Will be available soon");
      }
    },

    async handleLinkClick(link) {
      if (link.courseId && link.subjectId) {
        const result = await this.checkDataExists(link.courseId, link.subjectId);
        
        if (result.exists) {
          // Data exists, redirect to the page
          window.location.href = `?course_id=${link.courseId}&subject_id=${link.subjectId}`;
        } else {
          // No data, show popup
          this.showPopupMessage("Will be available soon");
        }
      } else {
        this.showPopupMessage("Will be available soon");
      }
    },

    async fetchSyllabus() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('course_id') || 1;
        const subjectId = urlParams.get('subject_id') || 1;
        
        const res = await fetch(
          `https://cms.trehousingpublication.com/api/v1/?course_id=${courseId}&subject_id=${subjectId}`
        );
        const data = await res.json();

        // Make sure response has expected structure
        if (
          data &&
          data.course &&
          data.course.subjects &&
          data.course.subjects.length > 0
        ) {
          this.course = data.course;
          this.subject = data.course.subjects[0];
        } else {
          console.error("Invalid API structure:", data);
        }
      } catch (err) {
        console.error("Failed to fetch syllabus:", err);
      }
    },
  },
  mounted() {
    this.fetchSyllabus();
  },
};
</script>

<style scoped>

/* Loading styles */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

/* Popup styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #f54254;
  color: white;
}

.popup-header h3 {
  margin: 0;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

.popup-body {
  padding: 20px;
  text-align: center;
}

.popup-body p {
  margin: 0;
  font-size: 18px;
  color: #333;
}

/* Keep your existing styles here */
/* Custom styles for dropdowns and rotation */

.heading-icon {
  width: 40px;
  margin-right: 10px;
}
.download-btn {
  background: #1976d2;
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
}
.section-heading {
  margin-top: 20px;
  font-weight: bold;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
}

.rotate-90 {
  transform: rotate(90deg);
}

.news-rotate {
  transform: rotate(90deg);
}

/* General styles for dropdown */
.dropdown-menu {
  padding-left: 20px;
  list-style-type: none;
  display: none;
  position: absolute;
  background-color: transparent; /* Remove the white box background */
  border: none; /* Remove border */
  width: 100%;
  z-index: 10;
  box-shadow: none; /* Remove the box shadow */
}

.dropdown-menu li {
  padding: 5px 0;
}

.menu-item-text {
  margin-left: 8px;
}

.news-dropdown-content {
  padding-left: 20px;
  display: none;
  position: absolute;
  background-color: transparent; /* Remove the white box background */
  border: none; /* Remove border */
  width: 100%;
  z-index: 10;
  box-shadow: none; /* Remove the box shadow */
}

.news-dropdown-content li {
  padding: 5px 0;
}

/* Syllabus and News Dropdown Toggle Button */
.news-dropdown-btn {
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
}

/* Main container and layout */
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 1rem;
  max-width: 1370px;
  margin: 0 auto;
  width: 100%;
}

.sidebar-container {
  flex: 2;
  background-color: whitesmoke;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 8px;
  height: 300px;
  overflow-y: auto;
}

.explore {
  color: black;
  text-align: left;
  font-size: medium;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

.menu-item {
  margin-bottom: 10px;
}

.dropdown-menu {
  padding-left: 0;
  max-height: 200px;
  overflow-y: auto;
  position: relative;
  margin-left: 30px;
}

.dropdown a {
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  text-decoration: none;
  color: black !important;
}

.dropdown a:hover {
  color: orange !important;
  text-decoration: none; /* Prevent underline on the whole link */
}

/* Ensure the arrow is never underlined */
.dropdown-arrow {
  margin-right: 10px;
  font-size: 20px;
  transition: transform 0.3s ease;
  color: black;
  text-decoration: none !important;
  display: inline-block; /* Ensures correct behavior */
}

/* Only underline the text on hover */
.dropdown a:hover .menu-item-text {
  text-decoration: underline;
}

.dropdown-menu a {
  padding-left: 20px;
  color: black;
  text-decoration: none;
}

.dropdown-menu a:hover {
  color: orange;
}

/* Latest Event Section */
.latest-event {
  flex: 2;
  background-color: #f9f9f9;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-left: 1rem;
}

.content {
  flex: 6;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fff;
}

/* Header Styles */
.header h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header .heading-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.header p {
  font-size: 1rem;
  color: #555;
}

/* Image Section */
.image-section img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

/* Button Style */
.download-btn {
  padding: 0.5rem 3rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: #04b8fa;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
  cursor: pointer;
}

.download-btn:hover {
  background-color: #0056b3;
}

/* Overview and Exam Pattern */
.syllabus-overview,
.exam-pattern {
  margin-bottom: 1.5rem;
}

.syllabus-overview h3,
.exam-pattern h3 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2804cb;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: #b1eef6;
  border-radius: 4px;
}

.syllabus-overview p,
.exam-pattern p {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}

/* Link Style */
a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Scrollbar Styles */
.sidebar-container::-webkit-scrollbar,
.dropdown-menu::-webkit-scrollbar {
  width: 8px;
}

.sidebar-container::-webkit-scrollbar-thumb,
.dropdown-menu::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 4px;
}

.sidebar-container::-webkit-scrollbar-thumb:hover,
.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background-color: darkgray;
}

.sidebar-container::-webkit-scrollbar-track,
.dropdown-menu::-webkit-scrollbar-track {
  background-color: whitesmoke;
  border-radius: 4px;
}

/* News Section Styles */
.news-container {
  display: flex;
  gap: 20px;
  padding: 0 30px;
  width: 100%;
}

.news-sidebar {
  width: 100%;
  padding-right: 20px;
}

.news-title {
  background-color: #ff3b5c;
  color: white;
  padding: 10px;
  font-weight: bold;
  margin: 0;
}

.news-list-wrapper {
  list-style: none;
  padding: 10px 0;
  margin: 0;
  border: 1px solid black;
  font-size: 18px;
}

.news-dropdown {
  position: relative;
}

.news-dropdown-btn {
  display: flex;
  align-items: center;
  padding: 8px 8px;
  cursor: pointer;
  font-size: 20px;
  color: black;
  font-weight: 500;
  border-radius: 5px;
}

.news-dropdown-btn span {
  margin-right: 10px;
  transition: transform 0.3s ease;
}

.news-rotate {
  transform: rotate(90deg);
}

.news-dropdown-content {
  padding: 0;
  border-radius: 5px;
  list-style: none;
  position: relative;
  left: 0;
  top: 100%;
  background-color: transparent; /* No background */
  width: 100%;
  z-index: 100;
  border: none; /* No border */
  box-shadow: none; /* No box-shadow */
}

.news-dropdown-content li {
  padding: 5px 25px;
  margin-left: 15px;
  font-size: 18px;
}

.news-dropdown-content li:hover {
  background: #dfdcdc;
  border-radius: 5px;
}

.news-dropdown-content a {
  text-decoration: none;
  color: black;
  display: block;
}

/* Show dropdowns when isOpen is true */
.menu-item > .dropdown-menu {
  display: block;
}

.news-dropdown-content {
  display: block;
}

.news-dropdown-btn span {
  transform: rotate(90deg);
}

/* Responsive Styles */
@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    margin-left: 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .latest-event {
    order: 2;
  }

  .sidebar-container {
    order: 1;
  }

  .content {
    order: 3;
  }

  .news-dropdown-btn {
    font-size: 16px;
  }

  .news-dropdown-content li {
    font-size: 16px;
    padding: 0 10px;
  }

  .dropdown-menu a {
    padding-left: 15px;
  }
}
</style>
