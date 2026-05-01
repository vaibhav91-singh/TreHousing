
import React, { useState, useEffect } from 'react';
import bpscImg from '@/assets/PYQ-Image/BPSC-PYQ.png';
import './TreFourZero.css';

export default function FourZero() {
  // TODO: Convert Vue data(), methods, and mounted() manually
  
  return (
    <>
      <div className="main-content">
        <div className="content-bpsc">
            <h2 className="fourZero">BPSC TRE 4.0 Previous Year Question Papers PDF Download</h2>
            <p className="bpsc-italic">BPSC Teacher Previous Year Question Papers have been realeased by BPSC on official
                website. Candidates
                must go through following article to access the BPSC Teacher Previous Year Quetion Papers PDF. Candidate
                may download the TRE Questions Paper from below link.</p>
            <div className="bpscImg">
                <img src={bpscImg} alt="BPSC Previous Year Question Paper" />
            </div>
            <p className="bpsc-normal">Looking to boost your preparation for the BPSC Teacher Recruitment Exam (TRE) in
                Computer Science? Solving previous year question papers is one of the most effective strategies to
                ensure success. These papers provide invaluable insights into the exam pattern, important topics, and
                types of questions frequently asked in the BPSC Computer Science exam.</p>
        </div>
        <div className="content-bpsc">
            <h2 className="threeZero">BPSC TRE 3.0 Question Paper 2024 (July Cycle)</h2>
            <p className="bpsc-normal">The BPSC TRE Computer Science Question Papers are now available on the official BPSC
                website. These question papers are an essential resource for candidates preparing for the exam, as they
                provide a clear understanding of the exam pattern, commonly asked topics, and the overall difficulty
                level.</p>
            <p className="bpsc-normal">This section provides the BPSC TRE Computer Science Question Papers for all relevant
                shifts and posts, making it easier for candidates to streamline their preparation and boost their
                chances of success.</p>
        </div>
        <div className="trePYQtable">
            <table>
                <tr className="tble-hed">
                    <td colspan="2">
                        BPSC TRE 3.0 Question Papers 2024 PDFs
                    </td>
                </tr>
                <tr className="rowData">
                    <td className="cell-text">BPSC TRE Computer Sc</td>
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
                <tr className="rowData">
                    <td className="cell-text">BIHAR STET Computer Sc</td>
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
                <tr className="rowData">
                    <td className="cell-text">KVS Computer Sc</td>
                    <td>
                        <ul>
                            <li>KVS PGT Computer Sc</li>
                            <li>KVS TGT Computer Sc</li>
                        </ul>
                    </td>
                </tr>
                <tr className="rowData">
                    <td className="cell-text">NVS Computer Sc</td>
                    <td>
                        <ul>
                            <li>NVS PGT Computer Sc</li>
                            <li>NVS TGT Computer Sc</li>
                        </ul>
                    </td>
                </tr>
                <tr className="rowData">
                    <td className="cell-text">DSSB Computer Sc</td>
                    <td>
                        <ul>
                            <li>DSSB PGT Computer Sc</li>
                            <li>DSSB TGT Computer Sc</li>
                        </ul>
                    </td>
                </tr>
                <tr className="rowData">
                    <td className="cell-text">HTET LEVEl3 Computer Sc</td>
                    <td></td>
                </tr>
                <tr className="rowData">
                    <td className="cell-text">HPSC PGT Computer Sc</td>
                    <td></td>
                </tr>
                <tr className="rowData">
                    <td className="cell-text">UPPSC LT Grade Computer Sc</td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
    </>
  );
}
  