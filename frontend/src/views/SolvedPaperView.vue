<template>
  <Header />

 <TestSeriesHeroSection/>
  <HeaderDropdown />
  <downloadAttempt />
  <faq/>
  <R_M />
  <Footer />
</template>

<script>
import Header from "@/components/Homepage/HeaderSec.vue";
import Footer from "@/components/Homepage/FooterSec.vue";
import faq from'@/components/SolvedPaper/FAQ.vue';
import R_M from '@/components/SolvedPaper/Recomm_mock.vue'
import downloadAttempt from '@/components/SolvedPaper/DownloadAttempt.vue';
import HeaderDropdown from '@/components/SolvedPaper/HeaderDropdown.vue';

import TestSeriesHeroSection from '@/components/SolvedPaper/TestSeriesHeroSection.vue';
export default {
  name: "SolvedPaperView",
  components: {
    Header,
    faq,
    R_M,
    downloadAttempt,
    HeaderDropdown,
    TestSeriesHeroSection,

    Footer,
  },
};
</script>

<style></style>
