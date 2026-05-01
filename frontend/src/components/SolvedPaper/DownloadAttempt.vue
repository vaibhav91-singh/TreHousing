<template>
    <div class="attemptpaper">
        <div class="previous">
            <h2>BPSC Previous Year Solved Papers - Download & Attempt</h2>
            <p><i class="bi bi-star" id="ratings"></i>
                <i class="bi bi-star" id="ratings"></i>
                <i class="bi bi-star" id="ratings"></i>
                <i class="bi bi-star" id="ratings"></i>
                <i class="bi bi-star" id="ratings"></i>
                4.5(92441)</p>
            <p>Total Previous Year Paper Available:3 </p>
            <div class="centered-content">
                <i class="bi bi-globe"></i>
                Hindi, English
            </div>
        </div>

        <div class="downloadpapers">
            <h3>Download Previous Year Solved Papers</h3>
            <div class="card-section">
                <div class="paper-card">
                    <h4>BPSC 2021 Previous Year Paper</h4>
                    <div class="info-row">
                        <div class="info-line">
                            <p><i class="bi bi-clock"></i>120 Minutes</p>
                            <p><i class="bi bi-list"></i>200 Questions</p>
                        </div>
                        <div class="info-line">
                            <p><i class="bi bi-pencil-square"></i>200 Marks</p>
                        </div>
                    </div>
                    <hr />
                    <button class="purchase-btn"><i class="bi bi-lock-fill"></i>Buy All Exam Moc Test @Rs.199</button>
                </div>
                <div class="paper-card">
                    <h4>BPSC 2021 Previous Year Paper</h4>
                    <div class="info-row">
                        <div class="info-line">
                            <p><i class="bi bi-clock"></i>120 Minutes</p>
                            <p><i class="bi bi-list"></i>200 Questions</p>
                        </div>
                        <div class="info-line">
                            <p><i class="bi bi-pencil-square"></i>200 Marks</p>
                        </div>
                    </div>
                    <hr />
                    <button class="purchase-btn"><i class="bi bi-lock-fill"></i>Buy All Exam Moc Test @Rs.199</button>
                </div>
                <div class="paper-card">
                    <h4>BPSC 2021 Previous Year Paper</h4>
                    <div class="info-row">
                        <div class="info-line">
                            <p><i class="bi bi-clock"></i>120 Minutes</p>
                            <p><i class="bi bi-list"></i>200 Questions</p>
                        </div>
                        <div class="info-line">
                            <p><i class="bi bi-pencil-square"></i>200 Marks</p>
                        </div>
                    </div>
                    <hr />
                    <button class="purchase-btn"><i class="bi bi-lock-fill"></i>Buy All Exam Moc Test @Rs.199</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'downloadAttempt'
}
</script>

<style scoped>
/* @import 'bootstrap-icons/font/bootstrap-icons.css'; */

.attemptpaper {
    padding: 3vh 5vw 0;
    background: #F6F6F6;
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
}

.previous {
    max-width: 700px;
}

.previous h2 {
    font-size: 28px;
    font-weight: 700;
}

.previous p {
    font-size: 13px;
    color: #000000A1;
}
#ratings{
    /* color: yellow; */
    margin-right: 10px;
}

.centered-content {
    display: flex;
    /* align-items: center; */
    justify-items: center;
    align-content: center;
    gap: 5px;
    fill: #000;
    font-size: 13px;
    color: #000000A1;
}

.paper-card {
    position: relative;
    padding: 16px;
    background-color: #fff;
    z-index: 1;
    max-width: 410px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 410px;
}

.paper-card::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #008AFC 0%, #0F0351 100%);
    z-index: -1;
}

.downloadpapers h3 {
    font-size: 24px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 15px;
}

.paper-card h4 {
    font-size: 20px;
    font-weight: 600;
    margin-top: 0px;
    margin-bottom: 0px;
}

.card-section {
    display: flex;
    gap: 40px;
}

.info-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 15px;
}

.info-line {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.info-line p {
    margin: 0;
    font-size: 14px;
    color: #555;
}

.info-line p i {
    margin-right: 5px;
}

.paper-card hr {
    border: 1px solid #000;
}

.paper-card .purchase-btn {
    width: 100%;
    height: 6vh;
    color: #2600FF;
    border: 3px solid #2600FF;
    font-size: 1rem;
    margin-top: 10px;
    background-color: #fff;
}

@media(max-width:768px) {
    .previous {
        max-width: 100vw;
    }

    .previous h2 {
        font-size: 24px;
    }

    .downloadpapers h3 {
        font-size: 20px;
    }
    .paper-card h4{
        font-size: 16px;
    }
    .info-line p{
        font-size: 10px;
    }
    .paper-card .purchase-btn{
        font-size: 12px;
        height: auto;
    }
    
}
@media(max-width:650px){
    .card-section {
        display: block;
        gap: 20px;
        justify-items: center;
    }
    
    .paper-card {
        margin-bottom: 20px;
        max-width: 90%;
        width: 100%;
        
    }

    .paper-card .purchase-btn {
        font-size: 14px;
        height: auto; 
    }
}
@media(max-width: 430px) {
    .previous h2 {
        font-size: 20px;
    }
    .downloadpapers h3 {
        font-size: 17px;
    }
    .paper-card h4{
        font-size: 14px;
    }
    
}

</style>