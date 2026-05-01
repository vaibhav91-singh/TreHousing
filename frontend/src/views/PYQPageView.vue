<template>
  <Header />
  <PYQup />
  <PyqOverview />
  <TextTable />
  <BiharSyllabusComponent />
  <PyqSyPdf />
  <Footer />
</template>

<script>
import Header from "@/components/Homepage/HeaderSec.vue";
import Footer from "@/components/Homepage/FooterSec.vue";
import PyqSyPdf from "@/components/PYQ/PyqSyPdf.vue";
import TextTable from "@/components/PYQ/TextTable.vue";
import PyqOverview from "@/components/PYQ/PyqOverview.vue";
import PYQup from "@/components/PYQ/PYQup.vue";

export default {
  name: "SyllabusView",
  components: {
    Header,
    PYQup,
    PyqSyPdf,
    TextTable,
    PyqOverview,
    Footer,
  },
};
</script>

<style></style>
