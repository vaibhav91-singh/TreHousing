<template>
  <nav class="header">
    <ul class="menu">
      <li class="dropdown" @click.stop>
        <span @click="toggleDropdown('previousYearPaper')">
          <i class="bi bi-newspaper"></i>Previous Year Paper
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="14px" strokeWidth={1.5}
            stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
        <ul v-if="dropdowns.previousYearPaper" class="dropdown-menu">
          <li><a href="#">2024 Papers</a></li>
          <li><a href="#">2023 Papers</a></li>
          <li><a href="#">2022 Papers</a></li>
        </ul>
      </li>
      <li class="dropdown" @click.stop>
        <span @click="toggleDropdown('exams')">
          <i class="bi bi-pencil-square"></i>Exams
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="14px" strokeWidth={1.5}
            stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
        <ul v-if="dropdowns.exams" class="dropdown-menu">
          <li><a href="#">Upcoming Exams</a></li>
          <li><a href="#">Past Exam Results</a></li>
        </ul>
      </li>
      <li class="dropdown" @click.stop>
        <span @click="toggleDropdown('onlineCourse')">
          <i class="bi bi-laptop"></i>Online Course
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="14px" strokeWidth={1.5}
            stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
        <ul v-if="dropdowns.onlineCourse" class="dropdown-menu">
          <li><a href="#">Web Development</a></li>
          <li><a href="#">Cybersecurity</a></li>
        </ul>
      </li>
      <li class="dropdown" @click.stop>
        <span @click="toggleDropdown('mockTest')">
          <i class="bi bi-calendar"></i>Free Mock Test
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="14px" strokeWidth={1.5}
            stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
        <ul v-if="dropdowns.mockTest" class="dropdown-menu">
          <li><a href="#">Aptitude Test</a></li>
          <li><a href="#">Technical Test</a></li>
        </ul>
      </li>
      <li class="dropdown" @click.stop>
        <span @click="toggleDropdown('allCourses')">
          <i class="bi bi-book"></i>All Courses
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="14px" strokeWidth={1.5}
            stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
        <ul v-if="dropdowns.allCourses" class="dropdown-menu">
          <li><a href="#">Programming</a></li>
          <li><a href="#">Data Science</a></li>
          <li><a href="#">Cloud Computing</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "HeaderDropdown",
  data() {
    return {
      dropdowns: {
        previousYearPaper: false,
        exams: false,
        onlineCourse: false,
        mockTest: false,
        allCourses: false,
      },
    };
  },
  methods: {
    toggleDropdown(menu) {
      for (let key in this.dropdowns) {
        this.dropdowns[key] = key === menu ? !this.dropdowns[key] : false;
      }
    },
    closeDropdowns(event) {
      if (!event.target.closest(".dropdown")) {
        for (let key in this.dropdowns) {
          this.dropdowns[key] = false;
        }
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.closeDropdowns);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropdowns);
  },
};
</script>

<style scoped>
/* @import 'bootstrap-icons/font/bootstrap-icons.css'; */

.header {
  background-color: #fff;
  padding: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid gray;
}

.menu {
  list-style: none;
  display: flex;
  gap: 80px;
  margin: 0;
  padding: 0;
  margin-left: 40px;
}

.dropdown {
  position: relative;
  cursor: pointer;
  font-weight: 500;
}

.dropdown i {
  margin-right: 5px;
}

.dropdown-menu {
  position: absolute;
  background: white;
  list-style: none;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 5px 5px rgba(0, 0, 0, 0.05);
  display: block;
  z-index: 1000;
  width: 170px;
}

.dropdown-menu li {
  padding: 5px 0;
}

.dropdown-menu li:hover {
  cursor: pointer;
  background-color: lightgray;
}

.dropdown-menu li a {
  padding-left: 5px;
  text-decoration: none;
  color: black;
}

@media screen and (max-width: 1024px) {
  .menu {
    gap: 30px;
  }
}

@media screen and (max-width: 768px) {
  .header {
    padding: 10px;
  }

  .menu {
    display: block;
    margin: 0;
    padding: 0;
    gap: 10px;
  }

  .menu .dropdown {
    margin-bottom: 10px;
  }

  .dropdown-menu {
    /* position: static; */
    padding: 5px;
    box-shadow: none;
    margin-left: 100px;
  }
}

@media screen and (max-width: 480px) {
  .header {
    padding: 8px;
  }

  .menu {
    gap: 5px;
  }

  .dropdown-menu {
    font-size: 14px;
  }
}
</style>
