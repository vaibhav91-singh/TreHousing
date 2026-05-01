<template>
  <div v-if="isLoading" class="loading-container">
    <div class="loading-spinner"></div>
    <p>Loading content, please wait...</p>
  </div>

  <div v-else class="box">
    <div class="heading-pdf">
      <h4>BPSC TRE Question Papers</h4>
    </div>

    <div v-if="pdfData?.['BPSC TRE']">
      <div
        v-for="(versions, versionKey) in pdfData['BPSC TRE']"
        :key="versionKey"
        class="version-section"
      >
        <h3 class="version-title text-center mt-2">{{ versionKey }}</h3>

        <div v-for="item in versions" :key="item.id" class="category-section">
          <div v-for="(files, categoryName) in nonIdCategories(item)" :key="categoryName">
            <h4 class="category-title center-category-title">
              <u>{{ categoryName }}</u>
            </h4>

            <table class="table-data">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>PDF File Name</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(file, i) in files" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td>{{ file }}</td>
                  <td>
                    <a
                      :href="getPdfUrl(file, item.id)"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>No data available for this selection.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PyqSyPdf",
  data() {
    return {
      pdfData: {},
      isLoading: false,
    };
  },
  watch: {
    "$route.query": {
      immediate: true,
      handler() {
        this.fetchAllData();
      },
    },
  },
  methods: {
    nonIdCategories(item) {
      return Object.entries(item)
        .filter(([key]) => key !== "id")
        .reduce((acc, [key, val]) => {
          acc[key] = val;
          return acc;
        }, {});
    },

    async fetchAllData() {
      const courseId = parseInt(this.$route.query.course_id, 10);
      const subCourseId = parseInt(this.$route.query.sub_courses, 10);

      if (isNaN(courseId) || isNaN(subCourseId)) {
        console.warn("[fetchAllData] Invalid courseId or subCourseId.");
        this.pdfData = {};
        return;
      }

      this.isLoading = true;

      try {
        const url = `https://cms.trehousingpublication.com/api/v2/?course_id=${courseId}&sub_courses=${subCourseId}`;
        const response = await axios.get(url);
        this.pdfData = response.data;
      } catch (error) {
        console.error("[fetchAllData] Error fetching PDF data:", error);
        this.pdfData = {};
      } finally {
        this.isLoading = false;
      }
    },

    getPdfUrl(fileName, subjectId) {
      return `https://cms.trehousingpublication.com/api/v2/?course_id=${this.$route.query.course_id}&sub_courses=${this.$route.query.sub_courses}&subject_id=${subjectId}&file=${encodeURIComponent(fileName)}`;
    },
  },
};
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  text-align: center;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Red and White Table Theme */
.table-data {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  border: 1px solid red;
}

.table-data th,
.table-data td {
  border: 1px solid rgb(244, 48, 104);
  padding: 8px;
  text-align: left;
}

/* Header: white text on red background */
.table-data thead th {
  background-color: rgb(244, 48, 104);
  color: white;
  font-weight: bold;
}

/* Body: red text on white background */
.table-data tbody td {
  background-color: white;
  color: rgb(4, 4, 4);
  font-weight: 500;
}

/* Hover effect for rows */
.table-data tbody tr:hover {
  background-color: #ffe6e6;
}

.no-data-message {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 5px;
  text-align: center;
  margin: 10px 0;
  color: #6c757d;
}

.box {
  padding: 3vh 3vw;
  font-family: "Inter", sans-serif;
}

.heading-pdf {
  padding: 0px;
  border-radius: 5px;
  font-weight: bolder;
}

.heading-pdf h4 {
  text-align: center;
  font-size: 24px;
  margin: 0;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
}

.category-title {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.center-category-title {
  text-align: center;
  color: rgb(208, 5, 35);
  font-weight: bold;
  font-size: 25px;
}

.underline {
  display: flex;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  color: rgb(208, 5, 35);
}

.paragraph-pdf {
  font-size: medium;
  color: #000;
  margin: 14px 0;
}

.table-head {
  margin-bottom: -10px;
  font-size: medium;
  font-weight: bold;
  color: rgb(208, 5, 35);
  text-align: center;
  border: 1px solid black;
}

.table-data .imp-link th {
  font-weight: 700;
  padding: 15px;
  font-size: medium;
  text-align: center;
  border: 1px solid black;
}

.table-data .rowData {
  border: 1.5px solid #000;
}

.table-data .rowData td {
  text-decoration: none;
  font-size: medium;
  font-weight: 550;
  padding: 1.3vw;
  text-align: center;
}

@media (max-width: 1024px) {
  .paragraph-pdf {
    font-size: 17px;
  }

  .table-head {
    font-size: 16px;
  }

  .table-data th,
  .table-data td {
    font-size: 1rem;
  }

  .table-data .rowData td {
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  .box {
    padding: 1vh 4vw;
  }

  .heading-pdf h4 {
    font-size: 20px;
  }

  .paragraph-pdf {
    font-size: 14px;
  }

  .table-head {
    font-size: 1rem;
    font-weight: 700;
  }

  .table-data th,
  .table-data td {
    font-size: 14px;
  }

  .table-data .rowData td {
    font-size: 14px;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .heading-pdf h4 {
    font-size: 16px;
  }

  .paragraph-pdf {
    font-size: 13px;
    line-height: 1.3;
  }

  .table-head {
    font-size: 14px;
  }

  .table-data th,
  .table-data td {
    font-size: 12px;
    padding: 6px;
    border: 0.7px solid red;
  }

  .table-data .rowData td {
    font-size: 11px;
    padding: 10px;
  }
}
</style>
