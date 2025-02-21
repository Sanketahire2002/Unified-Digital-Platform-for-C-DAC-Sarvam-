import React from 'react';
import { FaGavel } from 'react-icons/fa'; // Gavel icon for Terms & Conditions

const TermsAndConditionsPage = () => {
  return (
    <div className="container py-5 mt-5">
      <h1 className="text-center mb-4 dark-orange-bold">
        <FaGavel style={{ marginRight: '10px', fontSize: '30px' }} />
        Terms and Conditions of Service
      </h1>

      <section>
        <h3>Introduction</h3>
        <p>
          These Terms and Conditions govern your use of our website and services. By using our services, you agree to be bound by these terms. If you do not agree with any part of these terms, you should not use our services.
        </p>
      </section>

      <section>
        <h3>Acceptance of Terms</h3>
        <p>
          By accessing or using our services, you agree to comply with these Terms and Conditions and all applicable laws and regulations. If you do not agree to these terms, please do not use our services.
        </p>
      </section>

      <section>
        <h3>User Responsibilities</h3>
        <ul>
          <li>You agree to use the services in compliance with all applicable laws.</li>
          <li>You are responsible for maintaining the confidentiality of your account information.</li>
          <li>You agree not to use the services for any unlawful or prohibited purposes.</li>
        </ul>
      </section>

      <section>
        <h3>Account Creation</h3>
        <p>
          In order to access certain features of our services, you may need to create an account. You are responsible for the accuracy of the information you provide during account registration and for keeping your account secure.
        </p>
      </section>

      <section>
        <h3>Intellectual Property</h3>
        <p>
          All content, trademarks, and logos on our website are the property of the company or its licensors. You are granted a limited, non-exclusive license to use our services for personal, non-commercial purposes only.
        </p>
      </section>

      <section>
        <h3>Limitation of Liability</h3>
        <p>
          Our liability to you shall be limited to the maximum extent permitted by law. We are not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services.
        </p>
      </section>

      <section>
        <h3>Termination</h3>
        <p>
          We may suspend or terminate your access to our services at any time if we believe you have violated these terms. You may also terminate your account at any time by following the procedures outlined in the account settings section.
        </p>
      </section>

      <section>
        <h3>Modifications</h3>
        <p>
          We reserve the right to modify or update these Terms and Conditions at any time. Any changes will be posted on this page, and the updated terms will be effective immediately upon posting.
        </p>
      </section>

      <section>
        <h3>Governing Law</h3>
        <p>
          These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is based. Any disputes arising from these terms will be resolved in the appropriate courts of that jurisdiction.
        </p>
      </section>

      <section>
        <h3>Contact Us</h3>
        <p>
          If you have any questions regarding these Terms and Conditions, please contact us at:
        </p>
        <p>
        Email: <a href="mailto: info@sarvam.com"> info@sarvam.com</a>
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;
