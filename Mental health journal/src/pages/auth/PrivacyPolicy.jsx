import "./privacy.css";

function PrivacyPolicy() {
  return (
    <div className="privacyPage">
      <div className="privacyContainer">

        <h1>Privacy Policy</h1>
        <p className="lastUpdated">Last updated: January 2026</p>

        <p className="intro">
          Welcome to <strong>MindCare</strong>. Your privacy is extremely important to us.
          We are committed to providing a safe, secure, and judgment-free space for your mental wellness journey.
        </p>

        {/* SECTION */}
        <section>
          <h2>1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Account Information:</strong> Name and email address</li>
            <li><strong>Wellness Data:</strong> Mood logs, journal entries, goals, and reflections</li>
            <li><strong>Usage Data:</strong> Basic analytics to improve user experience</li>
          </ul>
        </section>

        {/* SECTION */}
        <section>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To provide personalized mental wellness insights</li>
            <li>To improve platform performance and features</li>
            <li>To ensure secure authentication and account recovery</li>
          </ul>
        </section>

        {/* SECTION */}
        <section>
          <h2>3. Data Storage & Privacy</h2>
          <p>
            MindCare follows a <strong>privacy-first approach</strong>:
          </p>
          <ul>
            <li>Your data is primarily stored locally on your device</li>
            <li>We do not sell or share your personal data</li>
            <li>Future secure storage (MongoDB) will use encryption</li>
          </ul>
        </section>

        {/* SECTION */}
        <section>
          <h2>4. Security Measures</h2>
          <ul>
            <li>Encrypted authentication (JWT)</li>
            <li>Secure APIs and HTTPS (planned)</li>
            <li>Protection against unauthorized access</li>
          </ul>
        </section>

        {/* SECTION */}
        <section>
          <h2>5. Password Recovery & OTP</h2>
          <p>
            When you request a password reset:
          </p>
          <ul>
            <li>A One-Time Password (OTP) is sent to your registered email</li>
            <li>The OTP is encrypted and stored temporarily</li>
            <li>It expires within a few minutes for security</li>
          </ul>
        </section>

        {/* SECTION */}
        <section>
          <h2>6. No Data Selling Policy</h2>
          <p>
            We strictly follow a zero data-selling policy:
          </p>
          <ul>
            <li>No third-party tracking</li>
            <li>No ads based on your personal data</li>
            <li>No sharing with external companies</li>
          </ul>
        </section>

        {/* SECTION */}
        <section>
          <h2>7. Mental Health Disclaimer</h2>
          <p>
            MindCare is a self-support tool designed for awareness and reflection.
            It is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </section>

        {/* SECTION */}
        <section>
          <h2>8. Third-Party Services</h2>
          <p>
            We may use trusted services such as email providers (for OTP) and future AI integrations.
            These services follow strict privacy and security standards.
          </p>
        </section>

        {/* SECTION */}
        <section>
          <h2>9. Your Rights</h2>
          <ul>
            <li>You can access your data anytime</li>
            <li>You can delete your data</li>
            <li>You can stop using the service at any time</li>
          </ul>
        </section>

        {/* SECTION */}
        <section>
          <h2>10. Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time.
            Major changes will be communicated to users.
          </p>
        </section>

        {/* SECTION */}
        <section>
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, feel free to contact us:
          </p>
          <p><strong>Email:</strong> support@mindcare.com</p>
        </section>

      </div>
    </div>
  );
}

export default PrivacyPolicy;