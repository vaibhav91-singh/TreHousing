<!-- <template>
    <div class="main-content">
        <div class="content-bpsc">
            <h2 class="fourZero">BPSC TRE 4.0 Previous Year Question Papers PDF Download</h2>
            <p class="bpsc-italic">BPSC Teacher Previous Year Question Papers have been realeased by BPSC on official
                website. Candidates
                must go through following article to access the BPSC Teacher Previous Year Quetion Papers PDF. Candidate
                may download the TRE Questions Paper from below link.</p>
            <div class="bpscImg">
                <img :src="bpscImg" alt="BPSC Previous Year Question Paper">
            </div>
            <p class="bpsc-normal">Looking to boost your preparation for the BPSC Teacher Recruitment Exam (TRE) in
                Computer Science? Solving previous year question papers is one of the most effective strategies to
                ensure success. These papers provide invaluable insights into the exam pattern, important topics, and
                types of questions frequently asked in the BPSC Computer Science exam.</p>
        </div>
        <div class="content-bpsc">
            <h2 class="threeZero">BPSC TRE 3.0 Question Paper 2024 (July Cycle)</h2>
            <p class="bpsc-normal">The BPSC TRE Computer Science Question Papers are now available on the official BPSC
                website. These question papers are an essential resource for candidates preparing for the exam, as they
                provide a clear understanding of the exam pattern, commonly asked topics, and the overall difficulty
                level.</p>
            <p class="bpsc-normal">This section provides the BPSC TRE Computer Science Question Papers for all relevant
                shifts and posts, making it easier for candidates to streamline their preparation and boost their
                chances of success.</p>
        </div>
        <div class="trePYQtable">
            <table>
                <tr class="tble-hed">
                    <td colspan="2">
                        BPSC TRE 3.0 Question Papers 2024 PDFs
                    </td>
                </tr>
                <tr class="rowData">
                    <td class="cell-text">BPSC TRE Computer Sc</td>
                    <td>
                        <ul>
                            <li>BPSC TRE 2.0 (11-12) Computer Sc</li>
                            <li>BPSC TRE 1.0 (11-12) Computer Sc</li>
                            <li>BPSC TRE 2.0 (9-10) Computer Sc</li>
                            <li>BPSC TRE 3.0 (11-12) Computer Sc</li>
                            <li>BPSC TRE 3.0 (9-10) Computer Sc</li>
                        </ul>
                    </td>
                </tr>
                <tr class="rowData">
                    <td class="cell-text">BIHAR STET Computer Sc</td>
                    <td>
                        <ul>
                            <li>STET 2011 PGT Computer Sc</li>
                            <li>STET 2019 PGT Compuer Sc</li>
                            <li>STET 2019 PGT Compuer Sc</li>
                            <li>STET 2023 PGT Compuer Sc</li>
                            <li>STET 2024 PGT Compuer Sc</li>
                        </ul>
                    </td>
                </tr>
                <tr class="rowData">
                    <td class="cell-text">KVS Computer Sc</td>
                    <td>
                        <ul>
                            <li>KVS PGT Computer Sc</li>
                            <li>KVS TGT Computer Sc</li>
                        </ul>
                    </td>
                </tr>
                <tr class="rowData">
                    <td class="cell-text">NVS Computer Sc</td>
                    <td>
                        <ul>
                            <li>NVS PGT Computer Sc</li>
                            <li>NVS TGT Computer Sc</li>
                        </ul>
                    </td>
                </tr>
                <tr class="rowData">
                    <td class="cell-text">DSSB Computer Sc</td>
                    <td>
                        <ul>
                            <li>DSSB PGT Computer Sc</li>
                            <li>DSSB TGT Computer Sc</li>
                        </ul>
                    </td>
                </tr>
                <tr class="rowData">
                    <td class="cell-text">HTET LEVEl3 Computer Sc</td>
                    <td></td>
                </tr>
                <tr class="rowData">
                    <td class="cell-text">HPSC PGT Computer Sc</td>
                    <td></td>
                </tr>
                <tr class="rowData">
                    <td class="cell-text">UPPSC LT Grade Computer Sc</td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>

</template> -->
<script>
import bpscImg from '@/assets/PYQ-Image/BPSC-PYQ.png';

export default {
    name: 'FourZero',
    data() {
        return {
            bpscImg,
        };
    }
}
</script>

<style>
.main-content {
    padding: 2vh 5vw;
}

.content-bpsc {
    width: 70%;

}

.bpscImg img{
    width: 90%;
}

.content-bpsc .fourZero {
    font-size: 28px;
    font-weight: bold;
}

.content-bpsc .bpsc-italic {
    font-size: 22px;
    font-style: italic;
}

.content-bpsc .bpsc-normal {
    font-size: 20px;
    margin-top: 15px;
}

.content-bpsc .threeZero {
    font-size: 28px;
    color: #333399;

}

/* TRE 3.0 table  */
table {
    border: 1px solid black;
    border-collapse: collapse;
    width: 70%;
}

table .rowData td {
    border: 1px solid black;
    height: 140px;
}

.tble-hed td {
    text-align: center;
    background: #FC3A52;
    padding: 20px;
    font-weight: 667;
    color: #FFFFFF;
    font-size: 28px;
}

.rowData ul li {
    font-size: 20px;
    text-decoration: underline;
    color: #2600FF;
    cursor: pointer;
    transition-duration: 0.1s;
    width: 350px;
}

.rowData ul li:hover {
    font-weight: 600;
    color: red;
}

.cell-text {
    text-align: center;
    /* Horizontally centers content */
    vertical-align: middle;
    /* Vertically centers content */
    padding: 8px;
    /* Optional: adds space inside cells */
    border: 1px solid #ddd;
    font-size: 20px;
    font-weight: 700;
}

@media(max-width: 880px) {
    .content-bpsc {
        width: 100%;
    }

    table {
        width: 100%;
    }

    .rowData ul li {
        width: auto;
    }
}

@media(max-width: 680px) {
    .content-bpsc {
        width: 100%;
    }

    table {
        width: 100%;
    }

    .content-bpsc .fourZero {
        font-size: 20px;
    }

    .content-bpsc .bpsc-italic {
        font-size: 16px;
    }

    .content-bpsc .bpsc-normal {
        font-size: 15px;
    }

    .content-bpsc .threeZero {
        font-size: 20px;
    }

    .tble-hed td {
        font-size: 20px;
        padding: 10px;
    }

    .rowData ul li {
        font-size: 16px;
    }

    .cell-text {
        font-size: 16px;
    }
}

@media(max-width: 320px) {
    .content-bpsc .fourZero {
        font-size: 16px;
    }

    .content-bpsc .bpsc-italic {
        font-size: 13px;
    }

    .content-bpsc .bpsc-normal {
        font-size: 13px;
    }

    .content-bpsc .threeZero {
        font-size: 16px;
    }

    .tble-hed td {
        font-size: 16px;
        padding: 5px;
    }

    .rowData ul li {
        font-size: 12px;
    }

    .cell-text {
        font-size: 12px;
    }
}
</style>