import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container py-5 mt-5">
      <h1 className="text-center mb-4 dark-orange-bold">Privacy Policy</h1>

      <section>
        <h3>Introduction</h3>
        <p>
          This Privacy Policy outlines the types of personal information we collect, how it is used, and the steps we take to protect your information. By using our website or services, you agree to the collection and use of your personal information in accordance with this policy.
        </p>
      </section>

      <section>
        <h3>Information We Collect</h3>
        <ul>
          <li>Personal Identification Information (name, email, phone number, etc.)</li>
          <li>Usage Data (IP address, browser type, pages viewed, etc.)</li>
          <li>Cookies and Tracking Technologies</li>
        </ul>
      </section>

      <section>
        <h3>How We Use Your Information</h3>
        <p>
          The information we collect is used for the following purposes:
        </p>
        <ul>
          <li>Providing and improving our services</li>
          <li>Personalizing user experience</li>
          <li>Sending updates, newsletters, and promotional material</li>
          <li>Complying with legal obligations</li>
        </ul>
      </section>

      <section>
        <h3>Data Security</h3>
        <p>
          We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
        </p>
      </section>

      <section>
        <h3>Third-Party Services</h3>
        <p>
          We may use third-party services for various purposes, including analytics and marketing. These third-party services may collect information about you through cookies or other tracking technologies.
        </p>
      </section>

      <section>
        <h3>Your Rights</h3>
        <p>
          You have the right to access, update, or delete your personal information. You can also opt-out of receiving marketing communications from us at any time by following the unsubscribe instructions in our emails or contacting us directly.
        </p>
      </section>

      <section>
        <h3>Changes to This Privacy Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. Any changes will be posted on this page, and the updated policy will be effective as soon as it is posted.
        </p>
      </section>

      <section>
        <h3>Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p>
          Email: <a href="mailto: info@sarvam.com"> info@sarvam.com</a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
