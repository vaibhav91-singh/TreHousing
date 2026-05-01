<template>
  <div class="box" v-if="pdfContent.length">
    <h3 class="table-head">Download Subject PDFs</h3>
    <hr class="horiz-line" />

    <!-- Responsive Table Wrapper -->
    <div class="table-wrapper">
      <table class="table-data">
        <thead>
          <tr class="imp-link">
            <th>Subject</th>
            <th>Download Link</th>
          </tr>
        </thead>
        <tbody>
          <tr class="rowData" v-for="(pdf, index) in pdfContent" :key="index">
            <td>{{ pdf.subject }}</td>
            <td>
              <a :href="pdf.link" target="_blank" class="pdf-link">
                {{ pdf.filename }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-else>
    <p
      v-if="error"
      style="color: red; text-align: center; font-weight: bold; font-size: 24px"
    >
      {{ error }}
    </p>
    <div v-else class="spinner-container">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SyllabusPdf",
  data() {
    return {
      pdfContent: [],
      error: "",
      pdfData: {
        links: [],
        linksTitle: "",
      },
    };
  },
  async mounted() {
    await this.fetchPdfContent();
  },
  methods: {
    async fetchPdfContent() {
      const course_id = this.$route.query.course_id;
      const subject_id = this.$route.query.subject_id;

      if (!course_id || !subject_id) {
        this.error = "Missing course_id or subject_id in URL";
        return;
      }

      try {
        const res = await fetch(
          `https://cms.trehousingpublication.com/api/v1/?course_id=${course_id}&subject_id=${subject_id}&syllabus_list=true`
        );
        const data = await res.json();

        if (!data.syllabus_list || !Array.isArray(data.syllabus_list)) {
          this.error = "Invalid syllabus list format from server.";
          return;
        }

        this.pdfContent = data.syllabus_list.map((file) => {
          let subject = "Unknown";
          const nameWithoutExtension = file.replace(/\.[^/.]+$/, "");
          const dashParts = nameWithoutExtension.split("-");
          if (dashParts.length > 1) {
            subject = dashParts.slice(1).join("-").replace(/_/g, " ");
          }

          return {
            subject,
            filename: file,
            link: `https://cms.trehousingpublication.com/api/v1/?course_id=${course_id}&subject_id=${subject_id}&syllabus=${file}`,
          };
        });

        if (!this.pdfContent.length) {
          this.error = "No syllabus PDF found.";
        }

        this.pdfData = {
          links: this.pdfContent,
          linksTitle: data.title || "Important Links",
        };
      } catch (err) {
        console.error("Error fetching syllabus list:", err);
        this.error = "Failed to fetch syllabus list.";
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchPdfContent();
    next();
  },
};
</script>

<style scoped>
.box {
  padding: 3vh 3vw;
  font-family: "Inter", sans-serif;
}

.table-head {
  margin-bottom: -4px;
  font-size: 1.5rem;
  font-weight: bolder;
  color: #ef5446;
  text-align: center;
}

.horiz-line {
  width: 60vw;
  border-color: #ef5446;
  margin-bottom: 15px;
}

/* Scrollable table wrapper for small screens */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

/* Table Styles */
.table-data {
  width: 100%;
  border-collapse: collapse;
  min-width: 400px;
}

.table-data .imp-link th,
.table-data .imp-link td {
  color: #fff;
  background-color: #d6574b;
  font-weight: 700;
  padding: 5px;
  font-size: 1rem;
  text-align: center;
}

.table-data .rowData td {
  background: #e1f8ff;
  font-size: 1.2rem;
  font-weight: 550;
  padding: 1.3vw;
  color: #ef5446;
  text-align: center;
}

td,
th {
  border: 1px solid black;
}

table tr:first-child th {
  border-top: none;
}

table tr:last-child td {
  border-bottom: none;
}

table tr td:first-child,
table tr th:first-child {
  border-left: none;
}

table tr td:last-child,
table tr th:last-child {
  border-right: none;
}

/* Spinner Styles */
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #ef5446;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive Styling */
@media (max-width: 768px) {
  .box {
    padding: 1vh 4vw;
  }

  .table-head {
    font-size: 1.2rem;
  }

  .table-data .imp-link th,
  .table-data .imp-link td,
  .table-data .rowData td {
    font-size: 1rem;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .table-head {
    font-size: 1rem;
  }

  .table-data .imp-link th,
  .table-data .imp-link td,
  .table-data .rowData td {
    font-size: 0.9rem;
    padding: 8px;
  }

  .table-wrapper {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
}
</style>
