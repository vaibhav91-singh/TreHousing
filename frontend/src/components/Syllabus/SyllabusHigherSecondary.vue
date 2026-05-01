<template>
  <div class="container" v-if="syllabusData">
    <div class="header">
      <h4>{{ syllabusData.title }}</h4>
    </div>
    <div class="content">
      <ul>
        <li v-for="(point, index) in parsedDescription" :key="index">
          {{ point }}
        </li>
        <li>
          Read more at:
          <a :href="syllabusData.reference_links" target="_blank">
            {{ syllabusData.reference_links }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SyllabusHigherSecondary",
  data() {
    return {
      syllabusData: null,
    };
  },
  computed: {
    parsedDescription() {
      if (!this.syllabusData?.description) return [];
      // Split the description by newline or \r\n
      return this.syllabusData.description.split(/\r?\n/).filter(Boolean);
    },
  },
  mounted() {
    this.fetchSyllabus();
  },
  methods: {
    async fetchSyllabus() {
      try {
        const res = await axios.get(
          "https://cms.trehousingpublication.com/api/v1/?course_id=1&subject_id=1"
        );
        const subjectContents = res.data.course.subjects[0].subject_contents;

        // Load the first syllabus content item (or use a specific one by title if needed)
        this.syllabusData = subjectContents.find((content) =>
          content.title.includes("Higher Secondary Teacher")
        );
      } catch (error) {
        console.error("Error fetching syllabus data:", error);
      }
    },
  },
};
</script>

<style scoped>
/* General Styles */
.container {
  width: 100%;
  max-width: 100%;
  margin: auto;
  font-family: Arial, sans-serif;
  background: white;
  padding: 0 18px;
}

.header {
  background-color: hsl(193, 63%, 72%);
  padding: 15px;
  margin: 15px;
  color: rgb(39, 39, 209);
  font-size: 18px;
  border-radius: 5px;
  /* text-align: center; */
}

.header h4 {
  margin: 0;
  padding: 0 10px;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
}

.content {
  margin: 0;
  padding: 0 18px;
  font-weight: 500;
  line-height: 1.5;
}

.content ul {
  /* list-style-position: inside; */
  padding: 0 20px;
}

.content ul li {
  margin-bottom: 8px;
}

/* Responsive Styles */

/* For Tablets & Smaller Laptops */
@media (max-width: 1024px) {
  .container {
    padding: 10px;
  }

  .header {
    font-size: 16px;
    padding: 12px;
    margin: 12px;
  }

  .header h4 {
    font-size: 16px;
  }

  .content {
    font-size: 15px;
  }

  .content ul li {
    margin-bottom: 6px;
  }
}

/* For Mobile Devices (up to 768px) */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .header {
    font-size: 16px;
    padding: 10px;
    margin: 10px;
  }

  .header h4 {
    font-size: 15px;
    padding: 0 8px;
  }

  .content {
    font-size: 14px;
    line-height: 1.4;
  }

  .content ul li {
    margin-bottom: 8px;
  }

  .content ul li a {
    font-size: 14px;
    display: block;
    word-wrap: break-word;
  }
}

/* For Small Mobile Devices (up to 480px) */
@media (max-width: 480px) {
  .container {
    /* padding: 10px; */
  }

  .header {
    width: 100%;

    /* padding: 12px;    */
    /* margin: 8px;      */
    text-align: center;
    font-size: 20px;
    margin: 0;
    /* padding: 0; */
  }

  .header h4 {
    font-size: 14px;
    /* padding: 0 5px; */
  }

  .content {
    font-size: 13px;
    line-height: 1.4;
    padding: 0 20px;
  }

  .content ul {
    padding-left: 0;
  }

  .content ul li {
    margin-bottom: 6px;
  }

  .content ul li a {
    font-size: 12px;
    display: block;
    word-wrap: break-word;
    text-align: center;
  }
}
</style>
