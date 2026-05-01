import React from 'react';
import HeaderSec from "../components/Homepage/HeaderSec.jsx";
import FooterSec from "../components/Homepage/FooterSec.jsx";
import './TermsAndConditions.css';

export default function TermsAndConditions() {
  return (
    <>
      <HeaderSec />
      <div className="terms-container">
        <h1 className="sup-heading">Terms and Conditions</h1>

        <section className="terms-section">
          <h2 className="sub-heading">Publisher's Responsibilities</h2>
          <ul className="sub-list">
            <li>
              <strong>Production and Distribution:</strong> The publisher handles
              the printing, binding, and distribution of the work.
            </li>
            <li>
              <strong>Marketing and Advertising:</strong> The publisher is
              responsible for promoting the work through advertising and marketing
              campaigns.
            </li>
            <li>
              <strong>Royalty Payments:</strong> The publisher pays royalties to the
              author, usually a percentage of the book's sales.
            </li>
            <li>
              <strong>Legal Compliance:</strong> The publisher must adhere to all
              relevant laws and regulations related to publishing.
            </li>
          </ul>
        </section>

        <section className="terms-section">
          <h2 className="sub-heading">Author's Responsibilities</h2>
          <ul className="sub-list">
            <li>
              <strong>Originality:</strong> Authors must ensure their work is
              original and does not infringe on any existing copyrights.
            </li>
            <li>
              <strong>Copyright:</strong> Authors typically retain copyright but
              grant the publisher exclusive rights to publish, distribute, and
              reproduce the work.
            </li>
            <li>
              <strong>Accuracy and Responsibility:</strong> Authors are responsible
              for the accuracy of their work, and the publisher generally takes no
              responsibility for the content.
            </li>
            <li>
              <strong>Compliance:</strong> Authors must adhere to ethical guidelines
              and legal requirements related to publication.
            </li>
          </ul>
        </section>

        <section className="terms-section">
          <h2 className="sub-heading">Student Obligations</h2>
          <ul className="sub-list">
            <li>
              <strong>Age and Eligibility:</strong> Some institutions may require
              students to be of a certain age or meet specific eligibility criteria.
            </li>
            <li>
              <strong>Compliance with Rules:</strong> Students are expected to
              follow all rules and regulations outlined by the institution.
            </li>
            <li>
              <strong>Professional Conduct:</strong> This includes maintaining
              respectful behavior during online classes and interactions.
            </li>
            <li>
              <strong>Technical Requirements:</strong> Students need to have a
              reliable internet connection, necessary hardware (computer, webcam,
              headset), and software to participate effectively.
            </li>
            <li>
              <strong>Prohibition of Sharing Content:</strong> Students are
              generally prohibited from sharing course materials or logins with
              others.
            </li>
            <li>
              <strong>Non-Disclosure of Information:</strong> Students may be
              required to keep course content and strategies confidential.
            </li>
          </ul>
        </section>

        <section className="terms-section">
          <h2 className="sub-heading">Course Access and Delivery</h2>
          <ul className="sub-list">
            <li>
              <strong>Access to Learning Materials:</strong> Students are given
              access to the necessary course materials and online platforms.
            </li>
            <li>
              <strong>Online Classes:</strong> Terms may specify how live online
              classes will be conducted, including video conferencing and
              interaction protocols.
            </li>
            <li>
              <strong>Make-Up Policies:</strong> If a class is canceled, the
              institution may outline how make-up sessions will be provided.
            </li>
            <li>
              <strong>Technology Limitations:</strong> The institution may disclaim
              liability for technical issues that prevent students from accessing
              the course.
            </li>
          </ul>
        </section>

        <section className="terms-section">
          <h2 className="sub-heading">Intellectual Property</h2>
          <ul className="sub-list">
            <li>
              <strong>Copyright:</strong> Course materials are typically copyrighted
              and students are not permitted to reproduce, distribute, or modify
              them without permission.
            </li>
            <li>
              <strong>Prohibition of Sharing:</strong> Students are generally
              prohibited from sharing or reselling course materials or logins.
            </li>
            <li>
              <strong>Protection of Content:</strong> The institution may take legal
              action against copyright infringements.
            </li>
          </ul>
        </section>

        <section className="terms-section">
          <h2 className="sub-heading">Payment and Refunds</h2>
          <ul className="sub-list">
            <li>
              <strong>Payment Terms:</strong> The terms will specify how payment for
              the course will be made, including payment plans or installment
              options.
            </li>
            <li>
              <strong>Refund Policy:</strong> The institution will outline the
              circumstances under which refunds are offered, and the conditions for
              receiving a refund.
            </li>
            <li>
              <strong>Withdrawal Policies:</strong> Terms will specify how students
              can withdraw from the course and the implications for refunds or
              penalties.
            </li>
          </ul>
        </section>

        <section className="terms-section">
          <h2 className="sub-heading">Liability and Disclaimer</h2>
          <ul className="sub-list">
            <li>
              <strong>Limited Liability:</strong> The institution may disclaim
              liability for certain events, such as inaccuracies in course content
              or technical issues that may cause delays or interruptions.
            </li>
            <li>
              <strong>No Guarantees:</strong> The institution may not guarantee
              specific results from the course.
            </li>
            <li>
              <strong>Indemnification:</strong> Students may be required to
              indemnify the institution against certain claims or lawsuits arising
              from their actions or content.
            </li>
          </ul>
        </section>

        <section className="terms-section">
          <h2 className="sub-heading">Termination and Suspension</h2>
          <ul className="sub-list">
            <li>
              <strong>Termination of Access:</strong> The institution may reserve
              the right to suspend or terminate a student's access to the course if
              they violate the terms and conditions.
            </li>
            <li>
              <strong>Expulsion:</strong> Students who engage in disruptive or
              harmful behavior may be expelled from the course.
            </li>
            <li>
              <strong>Contractual Obligations:</strong> Both the author and
              publisher have contractual obligations regarding timelines.
            </li>
            <li>
              <strong>Jurisdiction:</strong> All disputes with respect to this
              publication shall be subject to the jurisdiction of the courts,
              tribunals, and forums of Greater Noida, India only.
            </li>
          </ul>
        </section>
      </div>
      <FooterSec />
    </>
  );
}