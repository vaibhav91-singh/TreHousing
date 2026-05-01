<template>
  <HeaderSec />
  <div class="privacy-container">
    <h1 class="privacy-title">Privacy Notice</h1>
    <section
      v-for="(section, index) in policySections"
      :key="index"
      class="privacy-section"
    >
      <h2 class="privacy-section-title">{{ section.title }}</h2>
      <div class="privacy-section-content" v-html="section.content"></div>
    </section>
  </div>
  <FooterSec />
</template>

<script>
import HeaderSec from "@/components/Homepage/HeaderSec.vue";
import FooterSec from "@/components/Homepage/FooterSec.vue";
export default {
  components: { HeaderSec, FooterSec },

  name: "PrivacyPolicy",
  data() {
    return {
      policySections: [
        {
          title: "INTRODUCTION	",
          content: `
            <p class="privacy-text">This Privacy Notice for TRE HOUSING PUBLICATION PVT LTD (doing business as TRE PUBLICATION) ('we', 'us', or 'our'), describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you:	</p>
            <ul class="privacy-list">
              <li>Visit our website at trehousingpublication.com, or any website of ours that links to this Privacy Notice		</li>
              <li>Use Our Mission is Provides Notification, Syllabus, Previous Year Question Paper and Solved Paper to Aspirant whose preparation government school teacher for class 1-12 in India.</li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>
            <p class="privacy-text">Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services.	</p>

          `,
        },
        {
          title: "SUMMARY OF KEY POINTS	",
          content: `
            <p class="privacy-text">This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.	<br><br>
	What personal information do we process? When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about personal information you disclose to us.<br><br>
	Do we process any sensitive personal information? Some of the information may be considered 'special' or 'sensitive' in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.<br><br>
	Do we collect any information from third parties? We do not collect any information from third parties.	<br><br>
	How do we process your information? We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about how we process your information.<br><br>
	In what situations and with which parties do we share personal information? We may share information in specific situations and with specific third parties. Learn more about when and with whom we share your personal information.

</p>
          `,
        },
        {
          title: "How do we keep your information safe? We have adequate",
          content: `
            <p class="privacy-text">organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
             Learn more about how we keep your information safe. <br><br>
            What are your rights? Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about your privacy rights.<br><br>
How do you exercise your rights? The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.<br><br>
Want to learn more about what we do with any information we collect? Review the Privacy Notice in full.
</p>
</p>
          `,
        },
        {
          title: "Table of Contents",
          content: `
            <ol class="privacy-toc-list">
              <li><strong> WHAT INFORMATION DO WE COLLECT?</strong></li>
              <li><strong> HOW DO WE PROCESS YOUR INFORMATION?</strong></li>
              <li><strong> WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</strong></li>
              <li><strong> WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</strong></li>
              <li><strong> DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</strong></li>
              <li><strong> HOW DO WE HANDLE YOUR SOCIAL LOGINS?</strong></li>
              <li><strong> HOW LONG DO WE KEEP YOUR INFORMATION?</strong></li>
              <li><strong> HOW DO WE KEEP YOUR INFORMATION SAFE?</strong></li>
              <li><strong> WHAT ARE YOUR PRIVACY RIGHTS?</strong></li>
              <li><strong> CONTROLS FOR DO-NOT-TRACK FEATURES</strong></li>
              <li><strong> DO WE MAKE UPDATES TO THIS NOTICE?</strong></li>
              <li><strong> HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</strong></li>
              <li><strong> HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</strong></li>
            </ol>
          `,
        },
        {
          title: "1. WHAT INFORMATION DO WE COLLECT?",
          content: `
            <p class="privacy-text">Personal information you disclose to us <br><br>
In Short: We collect personal information that you provide to us.<br><br>
We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.<br><br>
Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use.<br><br>
The personal information we collect may include the following:
</p>
            <ul class="privacy-list">
              <li>Names</li>
              <li>Phone numbers</li>
              <li>Email addresses</li>
            </ul>
             <p class="privacy-text"><strong>Sensitive Information. We do not process sensitive information.</strong></P>
            <p class="privacy-text"><strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by 	. You may find their privacy notice link(s) here: <br><br>
<strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called 'HOW DO WE HANDLE YOUR SOCIAL LOGINS?' below.<br><br>
All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.



</P>

 `,
        },
        {
          title: "2. HOW DO WE PROCESS YOUR INFORMATION?",
          content: `
            <p class="privacy-text">In Short. We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>

    <p class="privacy-text">We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p></p>
            <ul class="privacy-list">
            <li>To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
      <li>To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.</li>
      <li>To respond to user inquiries/offer support to users. We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
      <li>To send administrative information to you. We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</li>
      <li>To fulfil and manage your orders. We may process your information to fulfil and manage your orders, payments, returns, and exchanges made through the Services.</li>
      <li>To enable user-to-user communications. We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
      <li>To request feedback. We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
      <li>To send you marketing and promotional communications. We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time.</li>
      <li>To deliver targeted advertising to you. We may process your information to develop and display personalised content and advertising tailored to your interests, location, and more.</li>
      <li>To post testimonials. We post testimonials on our Services that may contain personal information.</li>
      <li>To protect our Services. We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
      <li>To administer prize draws and competitions. We may process your information to administer prize draws and competitions.</li>
      <li>To evaluate and improve our Services, products, marketing, and your experience. We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.</li>
      <li>To identify usage trends. We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
      <li>To determine the effectiveness of our marketing and promotional campaigns. We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.</li>
      <li>To comply with our legal obligations. We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.</li>
    </ul>

          `,
        },
        {
          title: "3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
          content: `
            <p class="privacy-text" >In Short. We may share information in specific situations described in this section and/or with the following third parties.</p>

    <p class="privacy-text">We may need to share your personal information in the following situations:</p>
    <p class="privacy-text">
      <strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.<br><br>
      <strong>When we use Google Maps Platform APIs.</strong> We may share your information with certain Google Maps Platform APIs (e.g. Google Maps API, Places API). Google Maps uses GPS, Wi-Fi, and cell towers to estimate your location. GPS is accurate to about 20 meters, while Wi-Fi and cell towers help improve accuracy when GPS signals are weak, like indoors. This data helps Google Maps provide directions, but it is not always perfectly precise.
    </p>

 `,
        },
        {
          title: "4. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?",
          content: `
            <p class="privacy-text">In Short: We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.<br><br>
The Services may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites, services, or applications. The inclusion of a link towards a third-party website, service, or application does not imply an endorsement by us. We cannot guarantee the safety and privacy of data you provide to any third-party websites. Any data collected by third parties is not covered by this Privacy Notice. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services, or applications that may be linked to or from the Services. You should review the policies of<br><br>
such third parties and contact them directly to respond to your questions.
</p>
          `,
        },

        {
          title: "5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
          content: `
    <p class="privacy-text">In Short: We may use cookies and other tracking technologies to collect and store your information.</p>

    <p class="privacy-text">We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</p>

    <p class="privacy-text">We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.</p>

    <p class="privacy-text">Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
  `,
        },
        {
          title: "6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?",
          content: `
    <p class="privacy-text">In Short: If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</p>

    <p class="privacy-text">Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.</p>

    <p class="privacy-text">We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.</p>
  `,
        },
        {
          title: "7. HOW LONG DO WE KEEP YOUR INFORMATION?",
          content: `
<p class="privacy-text">In Short. We keep your information for as long as necessary to fulfil the purposes outlined in this Privacy Notice unless otherwise required by law.</p>
            <p class="privacy-text">We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>
            <p class="privacy-text">When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
          `,
        },

        {
          title: "8. HOW DO WE KEEP YOUR INFORMATION SAFE?",
          content: `
            <p class="privacy-text">In Short. We aim to protect your personal information through a system of organisational and technical security measures.</p>
            <p class="privacy-text">We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.</p>
            <p class="privacy-text">Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>
          `,
        },
        {
          title: "9. WHAT ARE YOUR PRIVACY RIGHTS?",
          content: `
            <p class="privacy-text">In Short. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</p>
            <p class="privacy-text"><strong>Withdrawing your consent.</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</p>
            <p class="privacy-text">However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
            <p class="privacy-text"><strong>Opting out of marketing and promotional communications.</strong> You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, replying 'STOP' or 'UNSUBSCRIBE' to the SMS messages that we send, or by contacting us using the details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</p>
            <p class="privacy-text"><strong>Account Information</strong></p>
            <p class="privacy-text">If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
            <ul class="privacy-list">
              <li>Log in to your account settings and update your user account.</li>
            </ul>
            <p class="privacy-text">Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>
            <p class="privacy-text"><strong>Cookies and similar technologies.</strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. You may also opt out of interest-based advertising by advertisers on our Services.</p>
          `,
        },
        {
          title: "10. CONTROLS FOR DO-NOT-TRACK FEATURES",
          content: `
            <p class="privacy-text">Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected.</p>
            <p class="privacy-text">At this stage, no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.</p>
          `,
        },

        {
          title: "11. DO WE MAKE UPDATES TO THIS NOTICE?",
          content: `
            <p class="privacy-text">In Short. Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
            <p class="privacy-text">We may update this Privacy Notice from time to time. The updated version will be indicated by an updated 'Revised' date at the top of this Privacy Notice.</p>
            <p class="privacy-text">If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.</p>
          `,
        },
        {
          title: "12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
          content: `
            <p class="privacy-text">If you have questions or comments about this notice, you may contact us by post at:</p>
            <p class="privacy-text">TRE HOUSING PUBLICATION PVT LTD XU 3<br />
            GREATER NOIDA<br />
            GB NAGAR, UP 201310<br />
            India</p>
          `,
        },
        {
          title:
            "13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?",
          content: `
            <p class="privacy-text">Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information.</p>
            <p class="privacy-text">You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please fill out and submit a data subject access request.</p>
            <p class="privacy-text">Privacy Policy Terms Of Use Disclaimer Cookie Policy Support Limit the use of my sensitive personal information Do not sell or share my personal information Consent Preferences please fill out and submit a data subject access request.</p>
          `,
        },
      ],
    };
  },
};
</script>

<style scoped>
.privacy-container {
  max-width: 1200px;
  margin: auto;
  padding: 2rem 1rem;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  width: 100%;
}

.privacy-title {
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
  color: #222;
}

.privacy-section {
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.privacy-section-title {
  font-size: 1.6rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 600;
  border-bottom: 2px solid #2980b9;
}

.privacy-section-content {
  font-size: 1rem;
  color: #444;
  line-height: 1.7;
}

.privacy-text {
  margin-bottom: 15px;
}

.privacy-list,
.privacy-toc-list {
  padding-left: 20px;
  margin-bottom: 15px;
}

.privacy-list li,
.privacy-toc-list li::marker {
  margin-bottom: 10px;
  line-height: 1.7;
}

/* Responsive Styling */
@media (max-width: 768px) {
  .privacy-container {
    padding: 15px;
  }

  .privacy-title {
    font-size: 1.7rem;
  }

  .privacy-section-title {
    font-size: 1.2rem;
  }

  .privacy-section-content {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .privacy-container {
    padding: 10px;
  }

  .privacy-title {
    font-size: 1.5rem;
  }

  .privacy-section-title {
    font-size: 1rem;
  }

  .privacy-section-content {
    font-size: 0.9rem;
  }

  .privacy-list li,
  .privacy-toc-list li {
    font-size: 0.95rem;
  }
}
</style>
