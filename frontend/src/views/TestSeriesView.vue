<template>
    <Header />
    <PopularTest />
    <SeriesCategories />
    <Footer />
</template>

<script>
import Header from "@/components/Homepage/HeaderSec.vue";
import Footer from "@/components/Homepage/FooterSec.vue";
import PopularTest from '@/components/TestSeries/PopularTest.vue';
import SeriesCategories from '@/components/TestSeries/SeriesCategories.vue';

export default{
    name : 'TestSeriesView',
    components : {
        Header,
        PopularTest,
        SeriesCategories,
        Footer,
    }
}
</script>