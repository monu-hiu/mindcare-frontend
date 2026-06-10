import { Link } from "react-router-dom";
import "./legal.css";

function PrivacyPolicy() {
  return (
    <div className="legalPage">
      <div className="legalContainer">

        <div className="legalHeader">
          <Link to="/" className="legalBack">← Back to MindCare</Link>
          <h1>Privacy Policy</h1>
          <p className="legalDate">Last updated: June 2025</p>
        </div>

        <div className="legalBody">

          <section>
            <h2>1. Information We Collect</h2>
            <p>When you create an account on MindCare, we collect the following information:</p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Wellness data you choose to log (mood, sleep, energy, anxiety levels)</li>
              <li>Goals, reflections, and journal entries you create</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use your information solely to:</p>
            <ul>
              <li>Provide and improve the MindCare wellness platform</li>
              <li>Send you important account notifications (OTP, password reset)</li>
              <li>Generate personalized wellness insights and suggestions</li>
              <li>Monitor for high anxiety patterns to offer timely support</li>
            </ul>
          </section>

          <section>
            <h2>3. Data Storage & Security</h2>
            <p>
              Your data is stored securely on encrypted servers. We use industry-standard
              encryption (bcrypt for passwords, JWT for sessions) to protect your information.
              We never store plain-text passwords.
            </p>
          </section>

          <section>
            <h2>4. We Never Sell Your Data</h2>
            <p>
              MindCare will <strong>never</strong> sell, rent, or share your personal data
              with third parties for advertising or marketing purposes. Your mental health
              data is private and belongs to you.
            </p>
          </section>

          <section>
            <h2>5. Google OAuth</h2>
            <p>
              If you choose to sign in with Google, we receive your name and email address
              from Google. We do not receive or store your Google password. You can revoke
              MindCare's access from your Google account settings at any time.
            </p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>
              Your data is retained as long as your account is active. You may request
              deletion of your account and all associated data at any time by contacting
              us at <a href="mailto:supportmindcare@gmail.com">supportmindcare@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2>7. Cookies</h2>
            <p>
              MindCare uses localStorage (not cookies) to store your session token locally
              on your device. No tracking cookies are used.
            </p>
          </section>

          <section>
            <h2>8. Children's Privacy</h2>
            <p>
              MindCare is not intended for children under 13. We do not knowingly collect
              data from children under 13 years of age.
            </p>
          </section>

          <section>
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              any significant changes via email or an in-app notification.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:supportmindcare@gmail.com">supportmindcare@gmail.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;