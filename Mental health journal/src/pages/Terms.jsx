import { Link } from "react-router-dom";
import "./legal.css";

function Terms() {
  return (
    <div className="legalPage">
      <div className="legalContainer">

        <div className="legalHeader">
          <Link to="/" className="legalBack">← Back to MindCare</Link>
          <h1>Terms of Service</h1>
          <p className="legalDate">Last updated: June 2025</p>
        </div>

        <div className="legalBody">

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By creating an account or using MindCare, you agree to these Terms of Service.
              If you do not agree, please do not use the platform.
            </p>
          </section>

          <section>
            <h2>2. What MindCare Is</h2>
            <p>
              MindCare is a personal wellness tracking platform designed to help you
              monitor and improve your mental health through daily tracking, reflections,
              mindfulness exercises, and AI-powered support. MindCare is <strong>not</strong> a
              medical service and is not a substitute for professional mental health care.
            </p>
          </section>

          <section>
            <h2>3. Not a Medical Service</h2>
            <p>
              MindCare does not provide medical advice, diagnosis, or treatment. If you
              are experiencing a mental health crisis, please contact a qualified mental
              health professional or emergency services immediately. In India, you can
              reach iCall at <strong>9152987821</strong>.
            </p>
          </section>

          <section>
            <h2>4. Account Responsibilities</h2>
            <ul>
              <li>You must provide accurate information when creating your account</li>
              <li>You are responsible for maintaining the security of your password</li>
              <li>You must be at least 13 years old to use MindCare</li>
              <li>One person per account — accounts are non-transferable</li>
            </ul>
          </section>

          <section>
            <h2>5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use MindCare for any unlawful purpose</li>
              <li>Attempt to access other users' data</li>
              <li>Attempt to reverse engineer or hack the platform</li>
              <li>Upload harmful, offensive, or inappropriate content</li>
            </ul>
          </section>

          <section>
            <h2>6. Your Data & Content</h2>
            <p>
              All wellness data, journal entries, and reflections you create on MindCare
              belong to you. We do not claim ownership of your personal content. You grant
              us a limited license to store and process your data solely to provide the service.
            </p>
          </section>

          <section>
            <h2>7. Service Availability</h2>
            <p>
              MindCare is provided free of charge. We strive for high availability but
              cannot guarantee uninterrupted service. We reserve the right to modify,
              suspend, or discontinue the service at any time with reasonable notice.
            </p>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>
              MindCare is provided "as is" without warranties of any kind. We are not
              liable for any indirect, incidental, or consequential damages arising from
              your use of the platform.
            </p>
          </section>

          <section>
            <h2>9. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of MindCare
              after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              For any questions about these Terms, contact us at:{" "}
              <a href="mailto:supportmindcare@gmail.com">supportmindcare@gmail.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default Terms;