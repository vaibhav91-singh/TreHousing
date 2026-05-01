<template>
    <div class="main-container">
        <p class="head-title">Popular Test Series</p>
        <div class="cards-portion">
            <div class="cardDesign" v-for="(item, index) in seriesData" :key="index">
                <img :src="require(`@/assets/TestSeries/${item.logo}`)" alt="Logo">
                <p class="views">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCB00" viewBox="0 0 24 24" stroke-width="0" stroke="none" class="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                    <span id="user">{{ item.users }}</span>
                </p>
                <p id="heading">{{ item.title }}</p>
                <p>{{ item.num_test }} Total Tests<span id="free"> | {{ item.price }} Free Tests</span></p>
                <hr />
                <p id="lang">
                    <span><i class="bi bi-translate"></i></span>
                    English, Hindi + {{ item.lang }} More
                </p>
                <hr />
                <ul>
                    <li v-for="(contentItem, i) in item.content" :key="i">{{ contentItem }}</li>
                </ul>
                <button class="btn-view">View Test Series</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SeriesCategories',
    data() {
        return {
            seriesData: [
    {title: "RRB Group D Mock Test Series 2024-25",             users: "900.5K",    num_test: 934,  price: "7", lang: "7", content: ['3 Free Tests', '159 Latest TCS Exam 2024', '26 General Science Special', '+746 more test'],   logo: "rrb.png"},
    {title: "RPF Constable Mock Test Series 2024",              users: "1587.9K",   num_test: 835,  price: "9", lang: "7", content: ['3 Free Tests', '159 Latest TCS Exam 2024', '26 General Science Special', '+746 more test'],   logo: "rpf.png"},
    {title: "RRB NTPC (CBT 1 + CBT 2) 2024 Mock Test Series",   users: "1527.2K",   num_test: 1284, price: "11",lang: "6", content: ['3 Free Tests', '159 Latest TCS Exam 2024', '26 General Science Special', '+746 more test'],   logo: "rrb.png"},
    {title: "SSC GD Constable 2025 Mock Test Series",           users: "923.2K",    num_test: 1256, price: "5", lang: "5", content: ['3 Free Tests', '159 Latest TCS Exam 2024', '26 General Science Special', '+746 more test'],   logo: "ssc.png"},
    {title: "SBI Clerk Mock Test Series 2025 (Pre + Mains)",    users: "413.1K",    num_test: 296,  price: "6", lang: "7", content: ['3 Free Tests', '159 Latest TCS Exam 2024', '26 General Science Special', '+746 more test'],   logo: "sbi.png"},
    {title: "RPF SI Mock Test Series 2024",                     users: "1410.8K",   num_test: 1318, price: "3", lang: "7", content: ['5 Free Tests', '100 Latest SSC CGL Exam 2024', '50 Reasoning Special', '+500 more test'],     logo: "rpf.png"},
    {title: "SSC Selection Post (Phase 13) 2025 Mock Test",     users: "156.2K",    num_test: 386,  price: "1", lang: "7", content: ['2 Free Tests', '120 Bank PO 2024 Exams', '30 Banking Awareness', '+600 more test'],           logo: "ssc.png"},
    {title: "SBI PO Mock Test Series 2025 (New Pattern)",       users: "278.6K",    num_test: 294,  price: "4", lang: "7", content: ['10 Free Tests', '200 UPSC Prelims 2024', '40 Current Affairs Special', '+1000 more test'],    logo: "sbi.png"}
]
        };
    }
};
</script>


<style scoped>
.main-container{
    background-color: #DFE4E8;
}
.head-title{
    background-color: #DFE4E8;
    font-size: 35px;
    font-weight: bold;
    margin-top: 25px;
    margin-bottom: 0px;
}
/* Card designing */
.cards-portion {
    background-color: #DFE4E8;
    display: flex;
    padding: 1vh 2vw 3vh;
    justify-content: space-between;
    flex-wrap: wrap;
}

.cardDesign {
    margin-top: 30px;
    padding: 10px;
    z-index: inherit;
    border-radius: 5px;
    background: linear-gradient(180deg, #DFCCFB 20%, #FFFFFF 35.5%, #FFFFFF 100%);
    width: 240px;
}

.cardDesign img {
    width: 53px;
    height: auto;
    margin-top: 5px;
    background-color: #fff;
    border-radius: 100%;
    padding: 3px;
}

.cardDesign .views {
    float: right;
    background-color: #FFFFFF;
    padding: 5px;
    margin-top: 2px;
    height: 13px;
    font-size: 12px;
    display: flex;
    border-radius: 20px;
    box-sizing: content-box;
}

.views #user {
    color: #86A1AE;
}

.cardDesign #heading {
    font-size: 1.2rem;
    font-weight: 700;
    margin-top: 15px;
}

.cardDesign p {
    margin: 10px;
    font-size: 12px;
}

.cardDesign #free {
    color: #25CD71;

}

.cardDesign #lang {
    color: #0AD0F4;
}

.cardDesign #lang span {
    color: #000;
}

.cardDesign ul {
    padding-left: 20px;
    line-height: 18px;
    margin: 5px 0px;
    font-size: 12px;
}

.cardDesign .btn-view {
    width: 150px;
    height: 33px;
    background: #0AD0FA;
    border: none;
    border-radius: 5px;
    margin: 10px 22px;
    color: #fff;
}

@media screen and (max-width: 426px) {
    
    .cards-portion{
        justify-content: space-around;
    }
}
@media screen and (max-width: 376px) {

    .cards-portion{
        justify-content: space-around;
    }
    .categories{
        padding: 1vh 2vw;
    }
}
</style>