<template>
    <div class="catogories">
        <div class="head-section">
            <h1>Test Series by Categories</h1>
            <input type="text" placeholder="Search for your exam">
        </div>
        <div class="sublink-crads">
            <div class="subcard">
                <p v-for="item in Examtype" :key="item">{{ item }}</p>
            </div>
            <div class="cards-portion">
                <div class="cardDesign" v-for="(item, index) in 6" :key="index">
                    <img :src="require('@/assets/TestSeries/IRB.png')" alt="Logo">
                    <p class="views">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCB00" viewBox="0 0 24 24" stroke-width="0"
                            stroke="none" class="icon">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        </svg>

                        <span id="user">900.4k Users</span>
                    </p>
                    <p id="heading">RRB Group D Mock Test 2024</p>
                    <p>934 Total Tests <span id="free">| Free Tests</span></p>
                    <hr />
                    <p id="lang"><span>
                            <i class="bi bi-translate"></i>
                        </span>
                        English, Hindi + 7 more</p>
                    <hr />
                    <ul>
                        <li v-for="item in content" :key="item">{{ item }}</li>
                    </ul>
                    <button class="btn-view">View Test Series</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'SeriesCategories',
    data() {
        return {
            Examtype: ['All', 'PG Entrance Exam', 'SSC', 'Regulatory Body Exams', 'Teaching Exams', 'AE/Je Exams', 'Judiciary Exams', 'Railways', 'Banking & Insurance'],
            content: ['3 Free Tests', '159 Latest TCS Exam 2024', '26 General Science Special', '+746 more test'],
        }
    }
}

</script>

<style scoped>


.catogories {
    background-color: #E9EFF4;
    padding: 2vh 2vw;

}

.head-section {
    display: flex;
    align-items: center;
    gap: 20px;

}

.head-section h1 {
    width: 50%;
    font-weight: 700;
}

.head-section input {
    margin-right: 0px;
    width: 40%;
    padding: 10px 40px 10px;
    background: url(https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/search.svg) no-repeat left 23px center;
    border: 2px solid #878787;
    border-radius: 5px;
    background-size: 13px;
}

.sublink-crads {
    background-color: #fff;
    margin: 4vh 1vw;
    padding: 3vh 2vh;
    display: flex;
}

.subcard {
    width: 400px;
}

.subcard p {
    padding: 7px 15px;
    padding-left: 15px;
    padding-top: 7px;
    padding-bottom: 7px;
    font-size: 1.2rem;
    margin-top: 0px;
    margin-bottom: 10px;
    color: #606060;

}

.subcard p:first-child {
    background-color: #E9EFF4;
}

/* Card designing */
.cards-portion {
    background-color: #E9EFF4;
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
    width: 32px;
    height: 31px;
    margin-top: 5px;
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
@media screen and (max-width: 600px){
    .head-section {
        flex-direction: column;  
        gap: 0;
        align-items: center;  
        text-align: center;
    }

    .head-section h1 {
        width: 80%;
        font-size: 1.5rem;
        margin-bottom: 10px; 
    }

    .head-section input {
        width: 70%;
        max-width: 300px; 
        height: 40px;
    }
}
@media screen and (max-width: 426px) {
    
    .subcard p{
        font-size: 14px;
        margin-bottom: 6px;
        padding: 2px 29px 2px 10px;
        width: 105px;
    }
    .cards-portion{
        justify-content: space-around;
    }
}
@media screen and (max-width: 376px) {
    .sublink-crads {
        display: block;
        padding: 3vh 0vh 0vh;
    }
    .subcard{
        width: 100%;
    }

    .subcard p {
        width: 100%; 
        /* Ensures full width */
        box-sizing: border-box; /* Includes padding in width calculation */
        text-align: center; /* Centers the text */
    }
    .cards-portion{
        justify-content: space-around;
    }
    .categories{
        padding: 1vh 2vw;
    }
}
</style>