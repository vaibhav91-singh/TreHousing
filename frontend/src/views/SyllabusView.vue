<template>
  <Header />
  <BctsExam />
  <RedTable />
  <SyllabusHigherSecondary />
  <SyllabusPdf />
  <Footer />
</template>

<script>
import Header from "@/components/Homepage/HeaderSec.vue";
import Footer from "@/components/Homepage/FooterSec.vue";

import SyllabusHigherSecondary from "@/components/Syllabus/SyllabusHigherSecondary.vue";

import SyllabusPdf from "@/components/Syllabus/syllabusPdf.vue";
import BctsExam from "@/components/Syllabus/BctsExam.vue";
import RedTable from "@/components/Syllabus/RedTable.vue";

export default {
  name: "SyllabusView",
  components: {
    Header,

    SyllabusPdf,
    RedTable,
    BctsExam,

    SyllabusHigherSecondary,
    Footer,
  },
};
</script>

<style></style>
